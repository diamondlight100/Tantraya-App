import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Dice5, Sparkles, Skull, ShieldCheck, Flame, Play, RotateCcw, X, Zap, GitFork, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  duatSquares,
  majorDefs,
  majorGlyphs,
  pawnGlyph,
  pawnName,
  TRACK_LENGTH,
  CARD_POOL,
  cardById,
  buildDeck,
  type DuatSquare,
  type Team,
  type KaCard,
} from "@/data/magick/duat-race";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Piece {
  id: string;
  team: Team;
  kind: "major" | "pawn";
  name: string;
  position: number; // 0 = yard, 1..40 = track, 41 = home (finished)
  shielded: boolean;
  neutralizeNext: boolean;
  heldTurns: number;
  removed: boolean; // permanently devoured by Ammit
}

interface EventLine {
  kind: "lore" | "capture" | "power" | "system";
  text: string;
}

interface PendingEvent {
  title: string;
  lines: EventLine[];
  /** Whether dismissing this event should pass the turn (a completed move) or not (a power/card cast). */
  endsTurn: boolean;
  /** For turn-ending events: true once the acting team has dismissed it once, meaning it's now
   * being re-shown to the other house as a handoff recap before the turn actually changes hands.
   * Ensures both players (online, or passing one device back and forth) always see what happened,
   * not just whoever was on the move. */
  acknowledged?: boolean;
}

type TurnPhase =
  | "pre-roll"
  | "post-roll"
  | "power-target"
  | "card-target"
  | "capture-response"
  | "fork-choice"
  | "gameover";

const ENERGY_CAP = 8;
const HAND_LIMIT = 4;
const STARTING_HAND = 3;

interface PendingCapture {
  attackerId: string;
  landing: number;
}

interface PendingFork {
  pieceId: string;
  squareIndex: number;
}

export interface GameState {
  seq: number;
  pieces: Piece[];
  currentTeam: Team;
  dice: number | null;
  skipTurns: Record<Team, number>;
  pendingEvent: PendingEvent | null;
  extraTurnFor: Team | null;
  winner: Team | null;
  phase: TurnPhase;
  activePowerMajorId: string | null;
  kaEnergy: Record<Team, number>;
  hands: Record<Team, string[]>;
  decks: Record<Team, string[]>;
  discards: Record<Team, string[]>;
  activeCardId: string | null;
  activeCardTeam: Team | null;
  swapFirstId: string | null;
  pendingCapture: PendingCapture | null;
  pendingFork: PendingFork | null;
}

export type Action =
  | { type: "ROLL" }
  | { type: "MOVE"; pieceId: string }
  | { type: "OPEN_POWER"; majorId: string }
  | { type: "CANCEL_POWER" }
  | { type: "USE_POWER"; majorId: string; targetId?: string }
  | { type: "PLAY_CARD"; cardId: string }
  | { type: "CANCEL_CARD" }
  | { type: "RESOLVE_CARD_TARGET"; targetId: string }
  | { type: "RESOLVE_CAPTURE"; block: boolean }
  | { type: "RESOLVE_FORK"; choice: "safe" | "risky" }
  | { type: "DISMISS_EVENT" }
  | { type: "RESTART" }
  | { type: "HYDRATE"; state: GameState };

const otherTeam = (t: Team): Team => (t === "osiris" ? "set" : "osiris");

/** Which team must act right now, usually currentTeam, but a capture-response is
 * decided by the defender (the *other* team) and a card-target step by whoever
 * played the card. Used to gate controls in online play. */
export function actingTeam(state: GameState): Team {
  if (state.phase === "capture-response" && state.pendingCapture) {
    const attacker = state.pieces.find((p) => p.id === state.pendingCapture!.attackerId);
    if (attacker) return otherTeam(attacker.team);
  }
  if (state.phase === "card-target" && state.activeCardTeam) return state.activeCardTeam;
  return state.currentTeam;
}

/** Wraps the pure reducer: bumps `seq` on every real transition (skipped for
 * no-ops that return the same state reference), and passes HYDRATE through
 * untouched since a hydrated remote state already carries its own seq. */
function versionedReducer(state: GameState, action: Action): GameState {
  if (action.type === "HYDRATE") return action.state;
  const next = reducer(state, action);
  if (next === state) return state;
  return { ...next, seq: state.seq + 1 };
}

function makeInitialPieces(): Piece[] {
  const pieces: Piece[] = [];
  for (const team of ["osiris", "set"] as Team[]) {
    for (const def of majorDefs.filter((m) => m.team === team)) {
      pieces.push({
        id: `${team}-major-${def.name}`,
        team,
        kind: "major",
        name: def.name,
        position: 0,
        shielded: false,
        neutralizeNext: false,
        heldTurns: 0,
        removed: false,
      });
    }
    for (let i = 1; i <= 4; i++) {
      pieces.push({
        id: `${team}-pawn-${i}`,
        team,
        kind: "pawn",
        name: `${pawnName(team)} ${i}`,
        position: 0,
        shielded: false,
        neutralizeNext: false,
        heldTurns: 0,
        removed: false,
      });
    }
  }
  return pieces;
}

export function initialState(): GameState {
  const decks: Record<Team, string[]> = { osiris: buildDeck(), set: buildDeck() };
  const hands: Record<Team, string[]> = { osiris: [], set: [] };
  const discards: Record<Team, string[]> = { osiris: [], set: [] };
  for (const team of ["osiris", "set"] as Team[]) {
    for (let i = 0; i < STARTING_HAND; i++) {
      const drawn = decks[team].shift();
      if (drawn) hands[team].push(drawn);
    }
  }
  return {
    seq: 0,
    pieces: makeInitialPieces(),
    currentTeam: "osiris",
    dice: null,
    skipTurns: { osiris: 0, set: 0 },
    pendingEvent: null,
    extraTurnFor: null,
    winner: null,
    phase: "pre-roll",
    activePowerMajorId: null,
    kaEnergy: { osiris: 1, set: 1 },
    hands,
    decks,
    discards,
    activeCardId: null,
    activeCardTeam: null,
    swapFirstId: null,
    pendingCapture: null,
    pendingFork: null,
  };
}

function squareAt(index: number): DuatSquare {
  return duatSquares[Math.max(0, Math.min(index, TRACK_LENGTH) - 1)];
}

function teamLabel(t: Team) {
  return t === "osiris" ? "House of Osiris" : "House of Set";
}

/** A single Major reaching the Duat Gate wins the game for their house, pawns can never win on their own. */
function checkWinner(pieces: Piece[], team: Team): boolean {
  return pieces.some((p) => p.team === team && p.kind === "major" && p.position === 41);
}

function decrementHeld(pieces: Piece[], team: Team): Piece[] {
  return pieces.map((p) =>
    p.team === team && p.heldTurns > 0 ? { ...p, heldTurns: p.heldTurns - 1 } : p,
  );
}

function canBlock(state: GameState, team: Team): boolean {
  return state.hands[team].includes("shield_of_maat") && state.kaEnergy[team] >= cardById("shield_of_maat").cost;
}

function drawOne(deck: string[], discard: string[]): { deck: string[]; discard: string[]; drawn: string | null } {
  if (deck.length === 0) {
    if (discard.length === 0) return { deck, discard, drawn: null };
    const reshuffled = [...discard];
    for (let i = reshuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reshuffled[i], reshuffled[j]] = [reshuffled[j], reshuffled[i]];
    }
    return drawOne(reshuffled, []);
  }
  const [drawn, ...rest] = deck;
  return { deck: rest, discard, drawn };
}

function passTurn(state: GameState): GameState {
  const next = otherTeam(state.currentTeam);
  const kaEnergy = { ...state.kaEnergy, [next]: Math.min(state.kaEnergy[next] + 1, ENERGY_CAP) };
  let hand = [...state.hands[next]];
  let deck = state.decks[next];
  let discard = state.discards[next];
  if (hand.length < HAND_LIMIT) {
    const result = drawOne(deck, discard);
    deck = result.deck;
    discard = result.discard;
    if (result.drawn) hand = [...hand, result.drawn];
  }
  return {
    ...state,
    currentTeam: next,
    dice: null,
    phase: "pre-roll",
    pieces: decrementHeld(state.pieces, next),
    activePowerMajorId: null,
    activeCardId: null,
    activeCardTeam: null,
    swapFirstId: null,
    pendingCapture: null,
    pendingFork: null,
    kaEnergy,
    hands: { ...state.hands, [next]: hand },
    decks: { ...state.decks, [next]: deck },
    discards: { ...state.discards, [next]: discard },
  };
}

/** Finishes a move: attaches the win check and builds the turn-ending event. */
function finalizeMove(
  state: GameState,
  pieces: Piece[],
  piece: Piece,
  lines: EventLine[],
  kaEnergy: Record<Team, number>,
  landingName: string,
): GameState {
  const idx = pieces.findIndex((p) => p.id === piece.id);
  pieces[idx] = piece;
  let winner: Team | null = null;
  if (piece.position === 41 && checkWinner(pieces, piece.team)) {
    winner = piece.team;
    lines.push({ kind: "system", text: `${piece.name} has reached the Duat Gate, ${teamLabel(piece.team)} is victorious!` });
  }
  return {
    ...state,
    pieces,
    kaEnergy,
    winner,
    phase: winner ? "gameover" : "post-roll",
    pendingCapture: null,
    pendingFork: null,
    pendingEvent: { title: `${piece.name}, ${landingName}`, lines, endsTurn: true },
  };
}

/** Resolves everything that happens once a piece's landing square is settled: capture, square
 * effect (including pausing for a fork choice), and hands off to finalizeMove. */
function resolveMoveLanding(state: GameState, pieceId: string, landing: number, opts?: { blocked?: boolean }): GameState {
  const pieces = [...state.pieces];
  const idx = pieces.findIndex((p) => p.id === pieceId);
  const piece = { ...pieces[idx] };
  const lines: EventLine[] = [];
  const sq = squareAt(landing);

  if (opts?.blocked) {
    lines.push({ kind: "power", text: `Shield of Ma'at negates the capture entirely, ${piece.name} lands safely.` });
  } else if (sq.kind !== "sanctuary") {
    for (let i = 0; i < pieces.length; i++) {
      const other = pieces[i];
      if (other.team !== piece.team && !other.removed && other.position === landing) {
        if (other.shielded) {
          pieces[i] = { ...other, shielded: false };
          lines.push({ kind: "power", text: `${other.name}'s shield absorbs the blow and is spent.` });
        } else {
          pieces[i] = { ...other, position: 0, heldTurns: 0 };
          lines.push({ kind: "capture", text: `${piece.name} strikes down ${other.name}, sent back to the muster yard.` });
        }
      }
    }
  }

  lines.push({ kind: "lore", text: sq.lore });

  let kaEnergy = state.kaEnergy;
  const neutralized = piece.neutralizeNext;
  if (neutralized) piece.neutralizeNext = false;

  if (neutralized) {
    lines.push({ kind: "power", text: `Anubis's Weighing of the Heart neutralises this square's effect.` });
    piece.position = landing;
    return finalizeMove(state, pieces, piece, lines, kaEnergy, sq.name);
  }

  if (sq.kind === "fork") {
    piece.position = landing;
    pieces[idx] = piece;
    return {
      ...state,
      pieces,
      phase: "fork-choice",
      pendingCapture: null,
      pendingFork: { pieceId, squareIndex: landing },
      pendingEvent: null,
    };
  }

  let pos = landing;
  switch (sq.kind) {
    case "blessing":
    case "judgment":
      pos = Math.min(landing + (sq.amount ?? 0), TRACK_LENGTH);
      lines.push({ kind: "system", text: `Advances ${sq.amount} further squares.` });
      kaEnergy = { ...kaEnergy, [piece.team]: Math.min(kaEnergy[piece.team] + 1, ENERGY_CAP) };
      lines.push({ kind: "system", text: `${teamLabel(piece.team)} gains 1 Ka Energy.` });
      break;
    case "curse":
      pos = Math.max(landing - (sq.amount ?? 0), 1);
      lines.push({ kind: "system", text: `Falls back ${sq.amount} squares.` });
      break;
    case "trap":
      piece.heldTurns = sq.holdTurns ?? 0;
      lines.push({ kind: "system", text: `Held for ${sq.holdTurns} of ${piece.name}'s turn(s).` });
      break;
    case "apep":
      pos = 0;
      lines.push({ kind: "system", text: `Dragged back to the muster yard.` });
      break;
    case "power": {
      const radius = sq.radius ?? 0;
      for (let i = 0; i < pieces.length; i++) {
        const other = pieces[i];
        if (
          other.team !== piece.team &&
          !other.removed &&
          other.position > 0 &&
          other.position < 41 &&
          other.position >= landing - radius &&
          other.position < landing
        ) {
          if (other.shielded) {
            pieces[i] = { ...other, shielded: false };
          } else {
            pieces[i] = { ...other, position: 0, heldTurns: 0 };
            lines.push({ kind: "capture", text: `${other.name} is swept from the board.` });
          }
        }
      }
      break;
    }
    default:
      break;
  }

  if (pos >= TRACK_LENGTH) pos = 41;
  piece.position = pos;
  return finalizeMove(state, pieces, piece, lines, kaEnergy, sq.name);
}

function resolveCardEffect(
  state: GameState,
  cardId: string,
  team: Team,
  targetId?: string,
  targetId2?: string,
): GameState {
  const card = cardById(cardId);
  const hand = [...state.hands[team]];
  const cardIdx = hand.indexOf(cardId);
  if (cardIdx === -1) return state;
  hand.splice(cardIdx, 1);
  const discards = { ...state.discards, [team]: [...state.discards[team], cardId] };
  const kaEnergy = { ...state.kaEnergy, [team]: state.kaEnergy[team] - card.cost };
  const pieces = [...state.pieces];
  const lines: EventLine[] = [{ kind: "lore", text: card.lore }];
  let dice = state.dice;

  switch (card.effect) {
    case "reroll_dice": {
      if (dice == null) return state;
      dice = 1 + Math.floor(Math.random() * 6);
      lines.push({ kind: "power", text: `${card.name}: re-rolled to ${dice}.` });
      break;
    }
    case "adjust_dice_1": {
      if (dice == null) return state;
      dice = Math.min(dice + 1, 6);
      lines.push({ kind: "power", text: `${card.name}: dice adjusted to ${dice}.` });
      break;
    }
    case "gain_energy_2": {
      kaEnergy[team] = Math.min(kaEnergy[team] + 2, ENERGY_CAP);
      lines.push({ kind: "power", text: `${card.name}: gained 2 Ka Energy.` });
      break;
    }
    case "advance_piece_2": {
      if (!targetId) return state;
      const idx = pieces.findIndex((p) => p.id === targetId);
      if (idx === -1) return state;
      const p = { ...pieces[idx] };
      p.position = Math.min(p.position + 2, TRACK_LENGTH);
      pieces[idx] = p;
      lines.push({ kind: "power", text: `${card.name}: ${p.name} advances 2 squares.` });
      break;
    }
    case "retreat_enemy_2": {
      if (!targetId) return state;
      const idx = pieces.findIndex((p) => p.id === targetId);
      if (idx === -1) return state;
      const p = { ...pieces[idx] };
      if (p.shielded) {
        pieces[idx] = { ...p, shielded: false };
        lines.push({ kind: "power", text: `${p.name}'s shield absorbs ${card.name}.` });
      } else {
        p.position = Math.max(p.position - 2, 1);
        pieces[idx] = p;
        lines.push({ kind: "power", text: `${card.name}: ${p.name} pushed back 2 squares.` });
      }
      break;
    }
    case "cleanse_status": {
      if (!targetId) return state;
      const idx = pieces.findIndex((p) => p.id === targetId);
      if (idx === -1) return state;
      pieces[idx] = { ...pieces[idx], heldTurns: 0 };
      lines.push({ kind: "power", text: `${card.name}: ${pieces[idx].name} is freed.` });
      break;
    }
    case "banish_nearby": {
      if (!targetId) return state;
      const idx = pieces.findIndex((p) => p.id === targetId);
      if (idx === -1) return state;
      const p = { ...pieces[idx] };
      if (p.shielded) {
        pieces[idx] = { ...p, shielded: false };
        lines.push({ kind: "power", text: `${p.name}'s shield absorbs ${card.name}.` });
      } else {
        pieces[idx] = { ...p, position: 0, heldTurns: 0 };
        lines.push({ kind: "capture", text: `${card.name}: ${p.name} is dragged back to the yard.` });
      }
      break;
    }
    case "swap_any_two": {
      if (!targetId || !targetId2) return state;
      const i1 = pieces.findIndex((p) => p.id === targetId);
      const i2 = pieces.findIndex((p) => p.id === targetId2);
      if (i1 === -1 || i2 === -1) return state;
      const pos1 = pieces[i1].position;
      const pos2 = pieces[i2].position;
      pieces[i1] = { ...pieces[i1], position: pos2 };
      pieces[i2] = { ...pieces[i2], position: pos1 };
      lines.push({ kind: "power", text: `${card.name}: ${pieces[i1].name} and ${pieces[i2].name} swap positions.` });
      break;
    }
    case "temp_shield_major": {
      if (!targetId) return state;
      const idx = pieces.findIndex((p) => p.id === targetId);
      if (idx === -1) return state;
      pieces[idx] = { ...pieces[idx], shielded: true };
      lines.push({ kind: "power", text: `${card.name}: ${pieces[idx].name} is shielded.` });
      break;
    }
    default:
      return state;
  }

  return {
    ...state,
    pieces,
    dice,
    kaEnergy,
    hands: { ...state.hands, [team]: hand },
    discards,
    activeCardId: null,
    activeCardTeam: null,
    swapFirstId: null,
    phase: dice != null ? "post-roll" : "pre-roll",
    pendingEvent: { title: card.name, lines, endsTurn: false },
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "RESTART":
      return initialState();

    case "HYDRATE":
      return action.state;

    case "ROLL": {
      if (state.phase !== "pre-roll" || state.winner) return state;
      if (state.skipTurns[state.currentTeam] > 0) {
        return {
          ...state,
          skipTurns: { ...state.skipTurns, [state.currentTeam]: state.skipTurns[state.currentTeam] - 1 },
          phase: "post-roll",
          pendingEvent: {
            title: "World-Ender",
            lines: [
              { kind: "system", text: `${teamLabel(state.currentTeam)}'s turn is consumed by Apep's chaos, skipped entirely.` },
            ],
            endsTurn: true,
          },
        };
      }
      const dice = 1 + Math.floor(Math.random() * 6);
      const movable = state.pieces.some(
        (p) => p.team === state.currentTeam && !p.removed && p.position < 41 && p.heldTurns === 0,
      );
      if (!movable) {
        return {
          ...state,
          dice,
          phase: "post-roll",
          pendingEvent: {
            title: `Rolled a ${dice}`,
            lines: [{ kind: "system", text: "No pieces are free to move this turn." }],
            endsTurn: true,
          },
        };
      }
      return { ...state, dice, phase: "post-roll" };
    }

    case "MOVE": {
      if (state.phase !== "post-roll" || state.dice == null || state.winner) return state;
      const dice = state.dice;
      const pieces = [...state.pieces];
      const idx = pieces.findIndex((p) => p.id === action.pieceId);
      if (idx === -1) return state;
      const piece = { ...pieces[idx] };
      if (piece.team !== state.currentTeam || piece.position >= 41 || piece.heldTurns > 0) return state;

      const raw = piece.position + dice;
      const landing = Math.min(raw, TRACK_LENGTH);
      const isGate = raw >= TRACK_LENGTH;

      if (isGate) {
        const lines: EventLine[] = [];
        const gateSq = squareAt(TRACK_LENGTH);
        lines.push({ kind: "lore", text: gateSq.lore });
        piece.position = 41;
        return finalizeMove(state, pieces, piece, lines, state.kaEnergy, gateSq.name);
      }

      const sq = squareAt(landing);
      const defenders = sq.kind !== "sanctuary"
        ? pieces.filter((p) => p.team !== piece.team && !p.removed && p.position === landing)
        : [];
      const blockable = defenders.some((d) => !d.shielded) && canBlock(state, otherTeam(piece.team));

      if (blockable) {
        return { ...state, phase: "capture-response", pendingCapture: { attackerId: piece.id, landing } };
      }

      return resolveMoveLanding(state, piece.id, landing);
    }

    case "RESOLVE_CAPTURE": {
      if (state.phase !== "capture-response" || !state.pendingCapture) return state;
      const { attackerId, landing } = state.pendingCapture;
      const attacker = state.pieces.find((p) => p.id === attackerId);
      if (!attacker) return state;
      const defenderTeam = otherTeam(attacker.team);
      if (action.block) {
        if (!canBlock(state, defenderTeam)) return state;
        const hand = [...state.hands[defenderTeam]];
        const cardIdx = hand.indexOf("shield_of_maat");
        hand.splice(cardIdx, 1);
        const discards = { ...state.discards, [defenderTeam]: [...state.discards[defenderTeam], "shield_of_maat"] };
        const kaEnergy = { ...state.kaEnergy, [defenderTeam]: state.kaEnergy[defenderTeam] - cardById("shield_of_maat").cost };
        const withCardSpent: GameState = {
          ...state,
          hands: { ...state.hands, [defenderTeam]: hand },
          discards,
          kaEnergy,
          pendingCapture: null,
        };
        return resolveMoveLanding(withCardSpent, attackerId, landing, { blocked: true });
      }
      return resolveMoveLanding({ ...state, pendingCapture: null }, attackerId, landing);
    }

    case "RESOLVE_FORK": {
      if (state.phase !== "fork-choice" || !state.pendingFork) return state;
      const { pieceId, squareIndex } = state.pendingFork;
      const sq = squareAt(squareIndex);
      if (sq.kind !== "fork" || !sq.forkOptions) return state;
      const option = action.choice === "safe" ? sq.forkOptions[0] : sq.forkOptions[1];
      const pieces = [...state.pieces];
      const idx = pieces.findIndex((p) => p.id === pieceId);
      if (idx === -1) return state;
      const piece = { ...pieces[idx] };
      const lines: EventLine[] = [{ kind: "lore", text: option.lore }];
      let kaEnergy = state.kaEnergy;

      const triggered = !!(option.riskChance && Math.random() < option.riskChance);
      let pos = Math.min(squareIndex + option.advance, TRACK_LENGTH);
      lines.push({ kind: "system", text: `Advances ${option.advance} squares.` });

      if (option.energyReward) {
        kaEnergy = { ...kaEnergy, [piece.team]: Math.min(kaEnergy[piece.team] + option.energyReward, ENERGY_CAP) };
        lines.push({ kind: "system", text: `${teamLabel(piece.team)} gains ${option.energyReward} Ka Energy.` });
      }

      if (triggered && option.riskPenalty) {
        if (option.riskPenalty.kind === "fallback") {
          pos = Math.max(pos - option.riskPenalty.amount, 1);
          lines.push({ kind: "system", text: `Chaos strikes, falls back ${option.riskPenalty.amount} squares.` });
        } else {
          piece.heldTurns = option.riskPenalty.amount;
          lines.push({ kind: "system", text: `Chaos strikes, held for ${option.riskPenalty.amount} turn(s).` });
        }
      } else if (option.riskChance) {
        lines.push({ kind: "system", text: `Fortune favours you, no mishap this time.` });
      }

      if (pos >= TRACK_LENGTH) pos = 41;
      piece.position = pos;
      return finalizeMove({ ...state, pendingFork: null }, pieces, piece, lines, kaEnergy, option.label);
    }

    case "OPEN_POWER": {
      if (!["pre-roll", "post-roll"].includes(state.phase) || state.winner) return state;
      const major = state.pieces.find((p) => p.id === action.majorId);
      if (!major) return state;
      const def = majorDefs.find((m) => m.name === major.name);
      if (!def || state.kaEnergy[major.team] < def.energyCost) return state;
      return { ...state, phase: "power-target", activePowerMajorId: action.majorId };
    }

    case "CANCEL_POWER":
      return { ...state, phase: state.dice != null ? "post-roll" : "pre-roll", activePowerMajorId: null };

    case "USE_POWER": {
      const pieces = [...state.pieces];
      const idx = pieces.findIndex((p) => p.id === action.majorId);
      if (idx === -1) return state;
      const major = { ...pieces[idx] };
      if (major.position < 1 || major.position > 40) return state;
      const def = majorDefs.find((m) => m.name === major.name)!;
      if (state.kaEnergy[major.team] < def.energyCost) return state;
      const lines: EventLine[] = [{ kind: "lore", text: def.lore }];
      let extraTurnFor: Team | null = state.extraTurnFor;
      const skipTurns = { ...state.skipTurns };

      switch (def.powerName) {
        case "Resurrection": {
          const targetIdx = pieces.findIndex((p) => p.team === major.team && p.id !== major.id && p.position === 0 && !p.removed);
          if (targetIdx === -1) return state;
          pieces[targetIdx] = { ...pieces[targetIdx], position: Math.max(major.position - 3, 1) };
          lines.push({ kind: "power", text: `${pieces[targetIdx].name} rises and re-enters the board.` });
          break;
        }
        case "Isis's Protection":
          major.shielded = true;
          lines.push({ kind: "power", text: `${major.name} is shielded from the next capture or curse.` });
          break;
        case "Weighing of the Heart":
          major.neutralizeNext = true;
          lines.push({ kind: "power", text: `${major.name}'s next square effect is neutralised.` });
          break;
        case "Eye of Horus":
          extraTurnFor = major.team;
          lines.push({ kind: "power", text: `${teamLabel(major.team)} takes an extra turn.` });
          break;
        case "Betrayal": {
          if (!action.targetId) return state;
          const tIdx = pieces.findIndex((p) => p.id === action.targetId);
          if (tIdx === -1) return state;
          const target = pieces[tIdx];
          const majorPos = major.position;
          pieces[tIdx] = { ...target, position: majorPos };
          major.position = target.position;
          lines.push({ kind: "power", text: `${major.name} swaps places with ${target.name}.` });
          break;
        }
        case "World-Ender":
          skipTurns[otherTeam(major.team)] += 1;
          lines.push({ kind: "power", text: `${teamLabel(otherTeam(major.team))} will lose their next turn.` });
          break;
        case "Crocodile Strike": {
          if (!action.targetId) return state;
          const tIdx = pieces.findIndex((p) => p.id === action.targetId);
          if (tIdx === -1) return state;
          pieces[tIdx] = { ...pieces[tIdx], position: 0, heldTurns: 0, shielded: false };
          lines.push({ kind: "power", text: `${pieces[tIdx].name} is dragged into the water and back to the yard.` });
          break;
        }
        case "Devourer of the Damned": {
          if (!action.targetId) return state;
          const tIdx = pieces.findIndex((p) => p.id === action.targetId);
          if (tIdx === -1) return state;
          pieces[tIdx] = { ...pieces[tIdx], removed: true, position: 0 };
          lines.push({ kind: "power", text: `${pieces[tIdx].name} is devoured, gone from the game entirely.` });
          break;
        }
        default:
          return state;
      }

      pieces[idx] = major;
      const kaEnergy = { ...state.kaEnergy, [major.team]: state.kaEnergy[major.team] - def.energyCost };

      return {
        ...state,
        pieces,
        skipTurns,
        extraTurnFor,
        kaEnergy,
        phase: state.dice != null ? "post-roll" : "pre-roll",
        activePowerMajorId: null,
        pendingEvent: { title: `${major.name}, ${def.powerName}`, lines, endsTurn: false },
      };
    }

    case "PLAY_CARD": {
      if (!["pre-roll", "post-roll"].includes(state.phase) || state.winner) return state;
      const team = state.currentTeam;
      const card = cardById(action.cardId);
      if (!card || !state.hands[team].includes(action.cardId)) return state;
      if (state.kaEnergy[team] < card.cost) return state;
      if (card.effect === "shield_block") return state; // reactive only
      if ((card.effect === "reroll_dice" || card.effect === "adjust_dice_1") && state.dice == null) return state;
      if (card.needsTarget) {
        return { ...state, phase: "card-target", activeCardId: action.cardId, activeCardTeam: team, swapFirstId: null };
      }
      return resolveCardEffect(state, action.cardId, team);
    }

    case "CANCEL_CARD":
      return {
        ...state,
        phase: state.dice != null ? "post-roll" : "pre-roll",
        activeCardId: null,
        activeCardTeam: null,
        swapFirstId: null,
      };

    case "RESOLVE_CARD_TARGET": {
      if (state.phase !== "card-target" || !state.activeCardId || !state.activeCardTeam) return state;
      const card = cardById(state.activeCardId);
      if (card.needsTarget === "any-two" && !state.swapFirstId) {
        return { ...state, swapFirstId: action.targetId };
      }
      return resolveCardEffect(state, state.activeCardId, state.activeCardTeam, action.targetId, state.swapFirstId ?? undefined);
    }

    case "DISMISS_EVENT": {
      const pe = state.pendingEvent;
      const endsTurn = pe?.endsTurn ?? true;
      if (state.winner) {
        return { ...state, pendingEvent: null, phase: "gameover" };
      }
      if (!endsTurn) {
        return { ...state, pendingEvent: null };
      }
      if (state.extraTurnFor === state.currentTeam) {
        return {
          ...state,
          pendingEvent: null,
          extraTurnFor: null,
          dice: null,
          phase: "pre-roll",
          activePowerMajorId: null,
        };
      }
      // Turn-ending event: the acting team's first dismissal re-shows the exact same
      // recap, now addressed to the other house, before the turn actually changes
      // hands, so whatever happened (a capture, a curse, a fork) is never missed by
      // the player it happened to, whether they're passing one device back and forth
      // or playing online.
      if (pe && !pe.acknowledged) {
        return { ...state, pendingEvent: { ...pe, acknowledged: true } };
      }
      return { ...passTurn(state), pendingEvent: null };
    }

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Board geometry                                                      */
/* ------------------------------------------------------------------ */

/**
 * Equal arc-length spiral layout.
 *
 * A naive spiral that steps the angle by a constant amount each square
 * crowds squares together near the center, because arc-length between
 * consecutive squares is approximately r * deltaTheta: as r shrinks toward
 * the center, that arc-length shrinks too even though deltaTheta stays
 * fixed. Instead we solve for theta so that the arc length between every
 * consecutive pair of squares is constant, giving even visual spacing
 * from the outer rim all the way to the center.
 *
 * Derivation: with radius(theta) = maxR - k * theta (k = (maxR - minR) / totalTheta),
 * and requiring r * dTheta = arcStep, integrating gives a closed-form
 * quadratic solution for theta_i in terms of the previous theta.
 */
function useSpiralLayout() {
  return useMemo(() => {
    const map = new Map<number, { x: number; y: number }>();
    const maxR = 44;
    const minR = 15;
    const arcStep = 10;
    const n = TRACK_LENGTH;
    const totalTheta = (2 * (n - 1) * arcStep) / (maxR + minR);
    const k = (maxR - minR) / totalTheta;
    for (let i = 0; i < n; i++) {
      const inner = maxR * maxR - 2 * k * i * arcStep;
      const theta = (maxR - Math.sqrt(Math.max(inner, 0))) / k;
      const radius = maxR - k * theta;
      const angle = theta - Math.PI / 2;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      map.set(i + 1, { x, y });
    }
    return map;
  }, []);
}

/** Builds an SVG polyline "points" string tracing the spiral through every
 * square's center, in board order, so players can visually follow the track. */
function useSpiralPath(layout: Map<number, { x: number; y: number }>) {
  return useMemo(() => {
    const pts: string[] = [];
    for (let i = 1; i <= TRACK_LENGTH; i++) {
      const p = layout.get(i);
      if (p) pts.push(`${p.x},${p.y}`);
    }
    return pts.join(" ");
  }, [layout]);
}

const kindColor: Record<DuatSquare["kind"], string> = {
  plain: "border-border/50 bg-background/60",
  blessing: "border-emerald-400/60 bg-emerald-400/10",
  curse: "border-destructive/60 bg-destructive/10",
  trap: "border-orange-400/60 bg-orange-400/10",
  power: "border-gold bg-gold/15",
  apep: "border-red-600/70 bg-red-900/20",
  sanctuary: "border-sky-400/60 bg-sky-400/10",
  judgment: "border-violet-400/60 bg-violet-400/10",
  gate: "border-gold bg-gold/25",
  fork: "border-blue-400/60 bg-blue-400/10",
};

/* ------------------------------------------------------------------ */
/* Small presentational bits                                           */
/* ------------------------------------------------------------------ */

function EnergyPips({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: ENERGY_CAP }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < value ? "bg-gold" : "bg-border/40",
          )}
        />
      ))}
    </span>
  );
}

function CardMini({ card, cost, playable, onClick }: { card: KaCard; cost: number; playable: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={!playable}
      title={card.description}
      className={cn(
        "flex w-full flex-col items-start gap-0.5 rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition",
        playable
          ? "border-gold/50 bg-gold/5 hover:bg-gold/15"
          : "cursor-not-allowed border-border/40 bg-background/30 opacity-50",
      )}
    >
      <span className="flex w-full items-center justify-between">
        <span className="font-medium text-primary">{card.name}</span>
        <span className="flex items-center gap-0.5 text-gold"><Zap className="h-3 w-3" />{cost}</span>
      </span>
      <span className="text-muted-foreground">{card.description}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface DuatRaceGameProps {
  /** "local" is the classic same-device pass & play. "online" hands turn-gating
   * and state sync control to the parent (see remoteState/onLocalChange). */
  mode?: "local" | "online";
  /** Online only: which house the local player controls. Controls are disabled
   * when it isn't that house's move. */
  myTeam?: Team;
  /** Online only: seed the reducer from a resumed/joined game's saved state. */
  initialGameState?: GameState;
  /** Online only: called after every local state change so the parent can push
   * it to the opponent. Not called for changes caused by HYDRATE (remote). */
  onLocalChange?: (state: GameState) => void;
  /** Online only: the latest state pushed by the opponent. Applied via HYDRATE
   * whenever its seq is newer than the local one. */
  remoteState?: GameState | null;
  /** Skip the "Play the game" cover screen (online games open straight in). */
  skipIntro?: boolean;
  /** Online only: label for the opponent, shown in the waiting-for-turn banner. */
  opponentLabel?: string;
  /** Online only: replaces the local Restart button with a "Leave game" action. */
  onExit?: () => void;
}

export function DuatRaceGame({
  mode = "local",
  myTeam,
  initialGameState,
  onLocalChange,
  remoteState,
  skipIntro = false,
  opponentLabel,
  onExit,
}: DuatRaceGameProps = {}) {
  const [open, setOpen] = useState(skipIntro);
  const [state, dispatch] = useReducer(versionedReducer, undefined, () => initialGameState ?? initialState());
  const layout = useSpiralLayout();
  const spiralPath = useSpiralPath(layout);
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  // Online sync: apply a newer remote state, and skip echoing that same
  // change back out through onLocalChange.
  const justHydrated = useRef(false);
  useEffect(() => {
    if (mode === "online" && remoteState && remoteState.seq > state.seq) {
      justHydrated.current = true;
      dispatch({ type: "HYDRATE", state: remoteState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteState]);

  useEffect(() => {
    if (mode !== "online" || !onLocalChange) return;
    if (justHydrated.current) {
      justHydrated.current = false;
      return;
    }
    onLocalChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Local pass & play: hide the board behind a handoff screen whenever the
  // turn passes to the other house, so the outgoing player's hand/cards
  // aren't visible to the incoming player until they choose to reveal it.
  const prevTeamRef = useRef(state.currentTeam);
  const [handoff, setHandoff] = useState<Team | null>(null);
  useEffect(() => {
    if (mode === "local" && open && state.currentTeam !== prevTeamRef.current) {
      setHandoff(state.currentTeam);
    }
    prevTeamRef.current = state.currentTeam;
  }, [state.currentTeam, mode, open]);

  const isMyTurn = mode !== "online" || !myTeam || actingTeam(state) === myTeam;

  if (!open) {
    return (
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-5 sm:p-7">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-gold">2-player · pass &amp; play · tactical</p>
            <h2 className="font-serif text-2xl text-primary">The Trial of the Duat</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Set vs. Osiris race a spiral path to the Duat Gate, a Senet-inspired board packed with
              real Egyptian myth. Build Ka Energy, cast each Major's power again and again, play tactical
              Ka Cards, block captures with Shield of Ma'at, and choose Ma'at's safe road or Chaos's risky
              shortcut at the two Forks.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold bg-gold/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-gold/20"
          >
            <Play className="h-4 w-4" /> Play the game
          </button>
        </div>
      </section>
    );
  }

  if (handoff) {
    return (
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-gold/20 bg-background/60 px-6 py-16 text-center">
          <ShieldCheck className="h-8 w-8 text-gold" />
          <h2 className="font-serif text-xl text-primary">Pass the device</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Hand it to <b className="text-primary">{teamLabel(handoff)}</b>. Their hand and Ka Cards stay
            hidden until they tap below, so the other player doesn't see them first.
          </p>
          <button
            onClick={() => setHandoff(null)}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-gold/20"
          >
            <Play className="h-4 w-4" /> I am {teamLabel(handoff)}, reveal my turn
          </button>
        </div>
      </section>
    );
  }

  const currentTeam = state.currentTeam;
  const teamPieces = (team: Team) => state.pieces.filter((p) => p.team === team && !p.removed);
  const yardPieces = (team: Team) => teamPieces(team).filter((p) => p.position === 0);
  const homePieces = (team: Team) => teamPieces(team).filter((p) => p.position === 41);
  const onBoardAt = (index: number) => state.pieces.filter((p) => !p.removed && p.position === index);

  const movablePieces = teamPieces(currentTeam).filter((p) => p.position < 41 && p.heldTurns === 0);
  const availableMajors = teamPieces(currentTeam).filter((p) => p.kind === "major" && p.position >= 1 && p.position <= 40);
  const canAct = ["pre-roll", "post-roll"].includes(state.phase) && !state.winner;

  const activeMajor = state.activePowerMajorId
    ? state.pieces.find((p) => p.id === state.activePowerMajorId)
    : undefined;
  const activeDef = activeMajor ? majorDefs.find((m) => m.name === activeMajor.name) : undefined;
  const needsTarget = activeDef && ["Betrayal", "Crocodile Strike", "Devourer of the Damned"].includes(activeDef.powerName);

  const powerTargets = (() => {
    if (!activeMajor || !activeDef) return [];
    if (activeDef.powerName === "Betrayal") {
      return state.pieces.filter((p) => p.team !== activeMajor.team && !p.removed && p.position >= 1 && p.position <= 40);
    }
    if (activeDef.powerName === "Crocodile Strike") {
      return state.pieces.filter(
        (p) =>
          p.team !== activeMajor.team &&
          !p.removed &&
          p.position >= 1 &&
          p.position <= 40 &&
          Math.abs(p.position - activeMajor.position) <= 4,
      );
    }
    if (activeDef.powerName === "Devourer of the Damned") {
      return state.pieces.filter((p) => {
        if (p.team === activeMajor.team || p.removed || p.kind !== "pawn") return false;
        if (p.position < 1 || p.position > 40) return false;
        const kind = squareAt(p.position).kind;
        return kind === "curse" || kind === "trap";
      });
    }
    return [];
  })();

  // Capture-response context
  const pendingAttacker = state.pendingCapture ? state.pieces.find((p) => p.id === state.pendingCapture!.attackerId) : undefined;
  const defenderTeam = pendingAttacker ? otherTeam(pendingAttacker.team) : undefined;
  const pendingDefenders = state.pendingCapture
    ? state.pieces.filter((p) => !p.removed && p.position === state.pendingCapture!.landing && p.team !== pendingAttacker?.team)
    : [];

  // Fork context
  const forkSquare = state.pendingFork ? squareAt(state.pendingFork.squareIndex) : undefined;
  const forkPiece = state.pendingFork ? state.pieces.find((p) => p.id === state.pendingFork!.pieceId) : undefined;

  // Card-target context
  const activeCard = state.activeCardId ? cardById(state.activeCardId) : undefined;
  const cardTargets = (() => {
    if (!activeCard || !state.activeCardTeam) return [];
    const team = state.activeCardTeam;
    if (activeCard.needsTarget === "own") {
      return state.pieces.filter((p) => p.team === team && !p.removed && p.position >= 1 && p.position <= 40);
    }
    if (activeCard.needsTarget === "own-major") {
      return state.pieces.filter((p) => p.team === team && p.kind === "major" && !p.removed && p.position >= 1 && p.position <= 40);
    }
    if (activeCard.needsTarget === "own-held") {
      return state.pieces.filter((p) => p.team === team && !p.removed && p.heldTurns > 0);
    }
    if (activeCard.needsTarget === "enemy-onboard") {
      return state.pieces.filter((p) => p.team !== team && !p.removed && p.position >= 1 && p.position <= 40);
    }
    if (activeCard.needsTarget === "enemy-nearby") {
      const mine = state.pieces.filter((p) => p.team === team && !p.removed && p.position >= 1 && p.position <= 40);
      return state.pieces.filter(
        (p) =>
          p.team !== team &&
          !p.removed &&
          p.position >= 1 &&
          p.position <= 40 &&
          mine.some((m) => Math.abs(m.position - p.position) <= 3),
      );
    }
    if (activeCard.needsTarget === "any-two") {
      const pool = state.pieces.filter((p) => !p.removed && p.position >= 1 && p.position <= 40);
      return state.swapFirstId ? pool.filter((p) => p.id !== state.swapFirstId) : pool;
    }
    return [];
  })();

  return (
    <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Trial of the Duat</p>
          <h2 className="font-serif text-xl text-primary">Set vs. Osiris</h2>
        </div>
        <div className="flex items-center gap-2">
          {mode === "online" ? (
            onExit && (
              <button
                onClick={onExit}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/50 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" /> Leave game
              </button>
            )
          ) : (
            <>
              <button
                onClick={() => dispatch({ type: "RESTART" })}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/50 hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </button>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/50 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" /> Close
              </button>
            </>
          )}
        </div>
      </div>

      {mode === "online" && !isMyTurn && !state.winner && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-border/50 bg-background/40 p-3 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-gold" /> Waiting for {opponentLabel ?? teamLabel(actingTeam(state))}'s move…
        </div>
      )}

      <div className={cn(mode === "online" && !isMyTurn && "pointer-events-none select-none opacity-50")}>
      {/* Turn banner */}
      {!state.winner && (
        <div
          className={cn(
            "mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3",
            currentTeam === "osiris" ? "border-gold/50 bg-gold/10" : "border-destructive/50 bg-destructive/10",
          )}
        >
          <div className="flex items-center gap-3">
            <Sparkles className={cn("h-4 w-4", currentTeam === "osiris" ? "text-gold" : "text-destructive")} />
            <span className="font-serif text-lg text-primary">{teamLabel(currentTeam)}'s turn</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-gold" /> {state.kaEnergy[currentTeam]}/{ENERGY_CAP}
              <EnergyPips value={state.kaEnergy[currentTeam]} />
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {state.phase === "pre-roll" && (
              <button
                onClick={() => dispatch({ type: "ROLL" })}
                className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold/15 px-4 py-2 text-sm font-medium text-primary hover:bg-gold/25"
              >
                <Dice5 className="h-4 w-4" /> Roll the dice
              </button>
            )}
            {canAct &&
              availableMajors.map((m) => {
                const def = majorDefs.find((d) => d.name === m.name)!;
                const affordable = state.kaEnergy[currentTeam] >= def.energyCost;
                return (
                  <button
                    key={m.id}
                    onClick={() => affordable && dispatch({ type: "OPEN_POWER", majorId: m.id })}
                    disabled={!affordable}
                    title={def.powerDescription}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs",
                      affordable
                        ? "border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground"
                        : "cursor-not-allowed border-border/30 text-muted-foreground/40",
                    )}
                  >
                    <Flame className="h-3 w-3" /> {m.name}: {def.powerName}
                    <span className="flex items-center gap-0.5 text-gold"><Zap className="h-3 w-3" />{def.energyCost}</span>
                  </button>
                );
              })}
            {state.phase === "post-roll" && state.dice != null && !state.pendingEvent && (
              <span className="text-sm text-foreground/80">
                Rolled <b className="text-gold">{state.dice}</b>, choose a piece to move:
              </span>
            )}
          </div>
        </div>
      )}

      {state.phase === "power-target" && activeMajor && activeDef && (
        <div className="mb-4 rounded-xl border border-gold/40 bg-gold/5 p-3">
          <p className="mb-2 text-sm">
            <b className="text-primary">{activeMajor.name}</b>, {activeDef.powerDescription}
          </p>
          {needsTarget ? (
            powerTargets.length ? (
              <div className="flex flex-wrap gap-2">
                {powerTargets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => dispatch({ type: "USE_POWER", majorId: activeMajor.id, targetId: t.id })}
                    className="rounded-full border border-gold/50 bg-background/60 px-3 py-1.5 text-xs hover:bg-gold/15"
                  >
                    {t.name} (sq. {t.position})
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No valid target right now.</p>
            )
          ) : (
            <button
              onClick={() => dispatch({ type: "USE_POWER", majorId: activeMajor.id })}
              className="rounded-full border border-gold bg-gold/15 px-4 py-1.5 text-xs font-medium hover:bg-gold/25"
            >
              Confirm power
            </button>
          )}
          <button
            onClick={() => dispatch({ type: "CANCEL_POWER" })}
            className="ml-2 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      )}

      {state.phase === "card-target" && activeCard && (
        <div className="mb-4 rounded-xl border border-gold/40 bg-gold/5 p-3">
          <p className="mb-2 text-sm">
            <b className="text-primary">{activeCard.name}</b>, {activeCard.description}
            {activeCard.needsTarget === "any-two" && state.swapFirstId && (
              <span className="ml-1 text-xs text-muted-foreground">
                (first piece chosen: {state.pieces.find((p) => p.id === state.swapFirstId)?.name}, pick the second)
              </span>
            )}
          </p>
          {cardTargets.length ? (
            <div className="flex flex-wrap gap-2">
              {cardTargets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => dispatch({ type: "RESOLVE_CARD_TARGET", targetId: t.id })}
                  className="rounded-full border border-gold/50 bg-background/60 px-3 py-1.5 text-xs hover:bg-gold/15"
                >
                  {t.name} (sq. {t.position})
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No valid target right now.</p>
          )}
          <button
            onClick={() => dispatch({ type: "CANCEL_CARD" })}
            className="mt-2 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      )}

      {state.phase === "capture-response" && pendingAttacker && defenderTeam && (
        <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/5 p-3">
          <p className="mb-2 flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-sky-400" />
            <b className="text-primary">{teamLabel(defenderTeam)}</b>: {pendingAttacker.name} is about to capture{" "}
            {pendingDefenders.map((d) => d.name).join(", ")}. Play <b>Shield of Ma'at</b> (cost 1 Ka Energy) to block it?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: "RESOLVE_CAPTURE", block: true })}
              className="rounded-full border border-sky-400/60 bg-sky-400/10 px-4 py-1.5 text-xs font-medium hover:bg-sky-400/20"
            >
              Block with Shield of Ma'at
            </button>
            <button
              onClick={() => dispatch({ type: "RESOLVE_CAPTURE", block: false })}
              className="rounded-full border border-border/60 px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Allow the capture
            </button>
          </div>
        </div>
      )}

      {state.phase === "fork-choice" && forkSquare && forkPiece && forkSquare.forkOptions && (
        <div className="mb-4 rounded-xl border border-blue-400/40 bg-blue-400/5 p-3">
          <p className="mb-2 flex items-center gap-2 text-sm">
            <GitFork className="h-4 w-4 text-blue-400" />
            <b className="text-primary">{forkSquare.name}</b>, {forkPiece.name} must choose a route.
          </p>
          <p className="mb-2 text-xs italic text-muted-foreground">{forkSquare.lore}</p>
          <div className="flex flex-wrap gap-2">
            {(["safe", "risky"] as const).map((choice, i) => {
              const opt = forkSquare.forkOptions![i];
              return (
                <button
                  key={choice}
                  onClick={() => dispatch({ type: "RESOLVE_FORK", choice })}
                  className={cn(
                    "max-w-xs rounded-lg border px-3 py-2 text-left text-xs",
                    choice === "safe"
                      ? "border-emerald-400/50 bg-emerald-400/10 hover:bg-emerald-400/20"
                      : "border-destructive/50 bg-destructive/10 hover:bg-destructive/20",
                  )}
                >
                  <span className="mb-0.5 block font-medium text-primary">
                    {opt.label} · +{opt.advance} sq{opt.riskChance ? ` · ${Math.round(opt.riskChance * 100)}% risk` : ""}
                  </span>
                  <span className="text-muted-foreground">{opt.lore}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {state.winner && (
        <div className="mb-4 rounded-xl border border-gold bg-gold/15 p-4 text-center">
          <p className="font-serif text-2xl text-primary">{teamLabel(state.winner)} is victorious!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            One of their Majors has crossed the Duat Gate and entered the Field of Reeds.
          </p>
        </div>
      )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* Board */}
        <div className="relative mx-auto aspect-square w-full max-w-xl rounded-2xl border border-gold/20 bg-background/40">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <polyline
              points={spiralPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              className="text-gold/30"
            />
          </svg>
          {Array.from({ length: TRACK_LENGTH }, (_, i) => i + 1).map((i) => {
            const pos = layout.get(i)!;
            const sq = squareAt(i);
            const here = onBoardAt(i);
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredSquare(i)}
                onMouseLeave={() => setHoveredSquare((h) => (h === i ? null : h))}
                className={cn(
                  "absolute flex h-[6.6%] w-[6.6%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border text-center",
                  kindColor[sq.kind],
                )}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span className="pointer-events-none text-[7px] font-medium text-foreground/70 sm:text-[8px]">
                  {i}
                </span>
                {here.length > 0 && (
                  <div className="pointer-events-none absolute -top-1.5 flex -translate-y-full flex-wrap justify-center gap-0.5">
                    {here.map((p) => (
                      <span
                        key={p.id}
                        title={p.name}
                        style={{ fontFamily: "'Noto Sans Egyptian Hieroglyphs', serif" }}
                        className={cn(
                          "flex items-center justify-center rounded-full border shadow leading-none",
                          p.team === "osiris"
                            ? "border-gold bg-gold/90 text-background"
                            : "border-destructive bg-destructive/90 text-background",
                          p.kind === "major" ? "h-4 w-4 text-[11px] sm:h-5 sm:w-5 sm:text-[13px]" : "h-3 w-3 text-[9px] sm:h-3.5 sm:w-3.5 sm:text-[10px]",
                        )}
                      >
                        {p.kind === "major" ? majorGlyphs[p.name] ?? "★" : pawnGlyph(p.team)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {hoveredSquare && (
            <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-lg border border-gold/30 bg-background/95 p-2 text-[11px] text-muted-foreground shadow-lg">
              <b className="text-gold">{squareAt(hoveredSquare).name}</b>: {squareAt(hoveredSquare).lore}
            </div>
          )}
        </div>

        {/* Side panel: yards, home, movable pieces, hand */}
        <div className="space-y-4">
          {(["osiris", "set"] as Team[]).map((team) => (
            <div
              key={team}
              className={cn(
                "rounded-xl border p-3",
                team === "osiris" ? "border-gold/40 bg-gold/5" : "border-destructive/40 bg-destructive/5",
              )}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">{teamLabel(team)}</p>
                <span className="flex items-center gap-1 text-[11px] text-gold">
                  <Zap className="h-3 w-3" /> {state.kaEnergy[team]}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Home: {homePieces(team).length}/4 majors ·{" "}
                {homePieces(team).map((p) => p.name).join(", ") || "none yet"}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                In yard: {yardPieces(team).map((p) => p.name).join(", ") || "none"}
              </p>
            </div>
          ))}

          {state.phase === "post-roll" && !state.pendingEvent && !state.winner && (
            <div className="rounded-xl border border-gold/30 bg-background/50 p-3">
              <p className="mb-2 text-xs uppercase tracking-wider text-gold">Move which piece?</p>
              <div className="flex flex-col gap-1.5">
                {movablePieces.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => dispatch({ type: "MOVE", pieceId: p.id })}
                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-1.5 text-xs hover:border-gold/50 hover:bg-gold/10"
                  >
                    <span>
                      {p.kind === "major" ? <ShieldCheck className="mr-1 inline h-3 w-3 text-gold" /> : null}
                      {p.name}
                    </span>
                    <span className="text-muted-foreground">
                      sq. {p.position} → {Math.min(p.position + (state.dice ?? 0), TRACK_LENGTH)}
                    </span>
                  </button>
                ))}
                {movablePieces.length === 0 && (
                  <p className="text-xs text-muted-foreground">No pieces available, continue below.</p>
                )}
              </div>
            </div>
          )}

          {canAct && !state.pendingEvent && (
            <div className="rounded-xl border border-border/50 bg-background/40 p-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold">
                <Zap className="h-3.5 w-3.5" /> {teamLabel(currentTeam)}'s hand
              </p>
              <div className="flex flex-col gap-1.5">
                {state.hands[currentTeam].map((cardId, i) => {
                  const card = cardById(cardId);
                  const isReactiveOnly = card.effect === "shield_block";
                  const diceGated = (card.effect === "reroll_dice" || card.effect === "adjust_dice_1") && state.dice == null;
                  const playable = !isReactiveOnly && !diceGated && state.kaEnergy[currentTeam] >= card.cost;
                  return (
                    <CardMini
                      key={`${cardId}-${i}`}
                      card={card}
                      cost={card.cost}
                      playable={playable}
                      onClick={() => dispatch({ type: "PLAY_CARD", cardId })}
                    />
                  );
                })}
                {state.hands[currentTeam].length === 0 && (
                  <p className="text-[11px] text-muted-foreground">No cards in hand, one draws each turn.</p>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-border/50 bg-background/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
            <p className="mb-1 font-medium text-foreground/80">Legend</p>
            <p><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-emerald-400/60" />Blessing · <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-destructive/60" />Curse · <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-orange-400/60" />Trap</p>
            <p><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-gold" />Power · <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-red-700/60" />Apep · <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-sky-400/60" />Sanctuary · <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-blue-400/60" />Fork
            </p>
            <p>
              Get any single Major to square 40 (the Duat Gate) to win instantly, the game ends the moment one
              crosses. Pawns can never win on their own, they can only clear the way and harass the other house.
              Ka Energy (+1 each turn, +1 on blessings) fuels Major powers and Ka Cards, spend it wisely. Landing
              on a Fork lets you choose Ma'at's safe road or Chaos's risky shortcut.
            </p>
          </div>
        </div>
      </div>

      {/* Event modal. For a turn-ending event, it shows twice: first to the team that just
          moved, then again (acknowledged) addressed to the team about to take over, so
          whatever happened to their pieces is never missed, whether that's one device
          passed back and forth or two people online. */}
      {state.pendingEvent && (() => {
        const pe = state.pendingEvent;
        const isHandoff = pe.endsTurn && !state.winner && pe.acknowledged;
        const modalTeam = isHandoff ? otherTeam(state.currentTeam) : state.currentTeam;
        const canDismiss = state.winner || mode !== "online" || !myTeam || myTeam === modalTeam;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-card p-5 shadow-2xl">
              {isHandoff && (
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                  {teamLabel(modalTeam)}, here's what just happened
                </p>
              )}
              <div className="mb-3 flex items-center gap-2">
                {pe.lines.some((l) => l.kind === "capture") ? (
                  <Skull className="h-5 w-5 text-destructive" />
                ) : (
                  <Sparkles className="h-5 w-5 text-gold" />
                )}
                <h3 className="font-serif text-lg text-primary">{pe.title}</h3>
              </div>
              <div className="space-y-2">
                {pe.lines.map((l, i) => (
                  <p
                    key={i}
                    className={cn(
                      "text-sm leading-relaxed",
                      l.kind === "lore" && "text-foreground/85 italic",
                      l.kind === "capture" && "text-destructive",
                      l.kind === "power" && "text-gold",
                      l.kind === "system" && "text-muted-foreground",
                    )}
                  >
                    {l.text}
                  </p>
                ))}
              </div>
              <button
                onClick={() => canDismiss && dispatch({ type: "DISMISS_EVENT" })}
                disabled={!canDismiss}
                className={cn(
                  "mt-4 w-full rounded-full border border-gold bg-gold/15 px-4 py-2 text-sm font-medium",
                  canDismiss ? "hover:bg-gold/25" : "cursor-not-allowed opacity-50",
                )}
              >
                {state.winner
                  ? "See result"
                  : !canDismiss
                    ? `Waiting for ${teamLabel(modalTeam)}…`
                    : isHandoff
                      ? "Understood, begin turn"
                      : "Continue"}
              </button>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
