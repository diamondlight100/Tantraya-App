/**
 * The Trial of the Duat, a 2-player, same-device board game for the
 * Egyptian Magick course. Team Osiris vs. Team Set race a shared spiral
 * track (Senet-inspired) of 40 squares toward the Duat Gate at the centre.
 *
 * Every square that isn't plain carries a genuine myth/teaching beat , 
 * the "lore" field is shown to both players when a piece lands there.
 */

export type SquareKind =
  | "plain"
  | "blessing"
  | "curse"
  | "trap"
  | "power"
  | "apep"
  | "sanctuary"
  | "judgment"
  | "gate"
  | "fork";

/** One branch of a fork square, a tactical risk/safety choice. */
export interface ForkOption {
  label: string; // "Path of Ma'at" / "Path of Chaos"
  lore: string;
  advance: number; // squares to move forward from the fork square
  /** Chance (0-1) the risky penalty triggers. Omit/0 for guaranteed-safe options. */
  riskChance?: number;
  riskPenalty?: { kind: "fallback" | "hold"; amount: number };
  energyReward?: number;
}

export interface DuatSquare {
  index: number; // 1..40 (40 = the Gate / finish)
  kind: SquareKind;
  name: string;
  lore: string;
  /** Squares forward to add (blessing/judgment) or subtract (curse), where relevant. */
  amount?: number;
  /** Turns a piece is held in the Duat (trap). */
  holdTurns?: number;
  /** Radius (in squares, behind the landing square) cleared by a power square. */
  radius?: number;
  /** Present when kind === "fork": the two route choices offered here. */
  forkOptions?: [ForkOption, ForkOption];
}

export const duatSquares: DuatSquare[] = [
  { index: 1, kind: "plain", name: "The Riverbank", lore: "Your army sets out from the black soil of Kemet, where the Nile's yearly flood renews the land, the Egyptians called their country simply 'Kemet', the Black Land." },
  { index: 2, kind: "blessing", name: "The Inundation", lore: "The Nile floods on schedule and the fields will be rich this year. Blessing of Hapi, god of the flood, advance 2 squares.", amount: 2 },
  { index: 3, kind: "plain", name: "Reed Fields", lore: "Papyrus reeds line the banks, from this plant the Egyptians made paper, boats, and sandals." },
  { index: 4, kind: "curse", name: "Scorpion's Sting", lore: "A scorpion, sacred to Serqet, guards this ground fiercely. Your piece falters, fall back 3 squares.", amount: 3 },
  { index: 5, kind: "sanctuary", name: "Shrine of Bastet", lore: "A small roadside shrine to Bastet, protector of the home and of women. No piece may be captured here." },
  { index: 6, kind: "plain", name: "The Market Road", lore: "Traders carry grain, linen, and faience beads toward the temple town ahead." },
  { index: 7, kind: "power", name: "Feast of Sekhmet", lore: "Sekhmet's bloodlust festival was once held to appease her wrath after she nearly destroyed humanity. She was calmed only by beer dyed red as blood. Any enemy pieces within 4 squares behind you are swept away.", radius: 4 },
  {
    index: 8,
    kind: "fork",
    name: "The Fork in the Reeds",
    lore: "The canal splits ahead. A steady poled channel, or a faster crocodile-haunted backwater, choose your route.",
    forkOptions: [
      {
        label: "Path of Ma'at",
        lore: "You keep to the known channel, poled carefully by a steady hand. Slow, but certain.",
        advance: 1,
      },
      {
        label: "Path of Chaos",
        lore: "You risk the crocodile-haunted backwater for a faster current.",
        advance: 4,
        riskChance: 0.5,
        riskPenalty: { kind: "fallback", amount: 3 },
      },
    ],
  },
  { index: 9, kind: "trap", name: "Quicksand of the Delta", lore: "The marshy Delta ground gives way beneath you. Held fast for 1 turn.", holdTurns: 1 },
  { index: 10, kind: "blessing", name: "House of Thoth", lore: "Thoth, god of writing and wisdom, invented hieroglyphs and kept the records of the gods. Advance 3 squares.", amount: 3 },
  { index: 11, kind: "plain", name: "Scribes' Quarter", lore: "Only about 1% of ancient Egyptians could read and write, scribes held real power at court." },
  { index: 12, kind: "curse", name: "The Evil Eye of Envy", lore: "Egyptians wore amulets against the 'evil eye', jealousy believed to curse the fortunate. Fall back 2 squares.", amount: 2 },
  { index: 13, kind: "apep", name: "Shadow of Apep", lore: "Apep, the great serpent of chaos, coils in the dark waters beneath the world, forever trying to swallow Ra's sun-boat before dawn. Your piece is dragged back to the muster yard." },
  { index: 14, kind: "plain", name: "Obelisk Row", lore: "Obelisks were carved from single blocks of granite and tipped in electrum to catch the first light of Ra." },
  { index: 15, kind: "sanctuary", name: "Temple Forecourt", lore: "Only priests and the Pharaoh could enter a temple's inner sanctuary, the public stopped here, at the forecourt. Safe from capture." },
  { index: 16, kind: "blessing", name: "Gift of Hathor", lore: "Hathor, goddess of love, music, and joy, was honoured with sistrum rattles and dancing. Advance 2 squares.", amount: 2 },
  { index: 17, kind: "plain", name: "The Sphinx Road", lore: "Avenues of sphinxes, lion bodies with human or ram heads, lined processional roads to major temples." },
  { index: 18, kind: "trap", name: "The Embalmer's House", lore: "Mummification took 70 days: the body was dried in natron salt for 40 days, then wrapped in linen. Held fast for 2 turns.", holdTurns: 2 },
  { index: 19, kind: "plain", name: "Granary Stores", lore: "Grain was Egypt's currency of survival, state granaries stored surplus wheat and barley against famine years." },
  { index: 20, kind: "judgment", name: "The Scales of Ma'at", lore: "In the Hall of Two Truths, Anubis weighs the heart against the feather of Ma'at, truth itself. A heart heavier than the feather is devoured by Ammit. Your heart is light, advance 3 squares.", amount: 3 },
  { index: 21, kind: "curse", name: "The Forty-Two Judges", lore: "The dead had to recite the 'Negative Confession' before forty-two judges, denying forty-two specific sins. You falter under questioning. Fall back 2 squares.", amount: 2 },
  { index: 22, kind: "plain", name: "The Ferryman's Post", lore: "A ferryman named Aken piloted souls across the waters of the Duat, but only if they knew the right words." },
  { index: 23, kind: "power", name: "Wrath of Set", lore: "Set, lord of storms, the desert, and chaos, murdered his brother Osiris out of jealousy for the throne. Any enemy pieces within 3 squares behind you are struck down.", radius: 3 },
  { index: 24, kind: "plain", name: "The Lake of Fire", lore: "The Duat's fiery lake burned the wicked but was said to refresh the blessed dead, the same fire, two fates." },
  { index: 25, kind: "sanctuary", name: "Sanctuary of Isis", lore: "Isis was the great protector, her name meant 'throne', and she was said to shield her devotees with wings of magic. Safe from capture." },
  { index: 26, kind: "blessing", name: "The Djed Pillar Raised", lore: "Raising the Djed pillar, backbone of Osiris, symbolised stability and resurrection, a real festival performed by the Pharaoh himself. Advance 3 squares.", amount: 3 },
  { index: 27, kind: "trap", name: "The Fourteen Pieces", lore: "Set tore Osiris's body into fourteen pieces and scattered them across Egypt so he could never be whole again. Held fast for 2 turns.", holdTurns: 2 },
  {
    index: 28,
    kind: "fork",
    name: "The Second Fork: Order or Chaos",
    lore: "Ahead, the temple road bends around Set's red desert, or you could cut straight through it.",
    forkOptions: [
      {
        label: "Path of Ma'at",
        lore: "You keep to the temple road, slower but blessed by the priests along the way.",
        advance: 2,
        energyReward: 1,
      },
      {
        label: "Path of Chaos",
        lore: "You cut through Set's red desert to save time.",
        advance: 5,
        riskChance: 0.5,
        riskPenalty: { kind: "hold", amount: 2 },
      },
    ],
  },
  { index: 29, kind: "curse", name: "The Crocodile Pool", lore: "Sobek's sacred crocodiles were both feared and worshipped, some temples kept live crocodiles adorned with jewels. Fall back 3 squares.", amount: 3 },
  { index: 30, kind: "blessing", name: "Isis Gathers the Pieces", lore: "Isis and her sister Nephthys searched Egypt to recover Osiris's scattered body, reassembling and wrapping it, the first mummification. Advance 4 squares.", amount: 4 },
  { index: 31, kind: "plain", name: "The Field of Reeds Road", lore: "The Field of Reeds (Aaru) was the Egyptian paradise, a perfect mirror of the Nile valley, where the justified dead farmed forever in abundance." },
  { index: 32, kind: "apep", name: "Apep Strikes the Sun-Boat", lore: "Each night Ra's boat sailed through the Duat and Apep attacked it; only the defender-god Set, ironically, and the magic of Isis kept the sun rising each dawn. Your piece is hurled back to the yard." },
  { index: 33, kind: "plain", name: "The Weighing Hall Threshold", lore: "Above the Hall of Judgment's door was inscribed a warning: none may pass whose heart is not true of voice." },
  { index: 34, kind: "sanctuary", name: "Shrine of Nephthys", lore: "Nephthys, sister of Isis and wife of Set, was a mourner and protector of the dead, standing guard at the head of the coffin. Safe from capture." },
  { index: 35, kind: "power", name: "Horus Avenges His Father", lore: "Horus fought Set for eighty years to avenge Osiris and reclaim the throne of Egypt, losing an eye and winning it back transformed. Any enemy pieces within 4 squares behind you are driven off.", radius: 4 },
  { index: 36, kind: "curse", name: "The Eye Torn Out", lore: "In their great battle, Set tore out Horus's eye and Horus tore off Set's testicles, the eye was healed by Thoth and became the Wedjat, symbol of protection and wholeness. Fall back 2 squares.", amount: 2 },
  { index: 37, kind: "blessing", name: "Osiris Crowned Lord of the Dead", lore: "Though killed, Osiris was resurrected just long enough to father Horus, then became Lord and Judge of the Duat, king of the afterlife forever. Advance 3 squares.", amount: 3 },
  { index: 38, kind: "trap", name: "The Second Death", lore: "Egyptians feared the 'second death' more than death itself, being forgotten, one's name erased, ending existence utterly. Held fast for 1 turn.", holdTurns: 1 },
  { index: 39, kind: "plain", name: "The Gate's Threshold", lore: "So close now, beyond this stands the Duat Gate itself, and the Field of Reeds beyond it." },
  { index: 40, kind: "gate", name: "The Duat Gate", lore: "Your piece passes the gate justified, an akh, a transfigured spirit, welcomed into the Field of Reeds forever." },
];

export type PieceKind = "major" | "pawn";
export type Team = "osiris" | "set";

export interface MajorDef {
  name: string;
  team: Team;
  powerName: string;
  powerDescription: string;
  lore: string;
  /** Ka Energy cost to cast this power. Powers are repeatable -- gated by energy. */
  energyCost: number;
}

export const majorDefs: MajorDef[] = [
  {
    name: "Osiris",
    team: "osiris",
    powerName: "Resurrection",
    energyCost: 4,
    powerDescription:
      "Instead of moving, return one of your captured pieces from the yard straight onto the board, 3 squares behind Osiris's current position.",
    lore: "Osiris, murdered and dismembered by Set, was the first being ever to be resurrected, becoming Lord of the Duat and judge of the dead.",
  },
  {
    name: "Isis",
    team: "osiris",
    powerName: "Isis's Protection",
    energyCost: 2,
    powerDescription:
      "Shield this piece from capture and curses for its next 3 landings.",
    lore: "Isis was the great magician-goddess whose spells reassembled and revived Osiris, and who hid and protected the infant Horus from Set.",
  },
  {
    name: "Anubis",
    team: "osiris",
    powerName: "Weighing of the Heart",
    energyCost: 2,
    powerDescription:
      "Before this piece's next move, neutralise the effect of whatever square it lands on (still shows the lore, but no penalty).",
    lore: "Anubis, jackal-headed god of embalming, guided souls through the Duat and personally weighed each heart against the feather of Ma'at.",
  },
  {
    name: "Horus",
    team: "osiris",
    powerName: "Eye of Horus",
    energyCost: 3,
    powerDescription: "Immediately take one extra full turn (roll and move again).",
    lore: "Horus's restored eye, the Wedjat, became ancient Egypt's most powerful protective symbol, representing healing and wholeness after his battle with Set.",
  },
  {
    name: "Set",
    team: "set",
    powerName: "Betrayal",
    energyCost: 3,
    powerDescription: "Swap this piece's position with any one opponent piece currently on the board.",
    lore: "Set murdered his own brother Osiris to seize the throne, luring him into a jewelled chest and sealing him inside, the ultimate act of betrayal.",
  },
  {
    name: "Apep",
    team: "set",
    powerName: "World-Ender",
    energyCost: 4,
    powerDescription: "Force your opponent to skip their entire next turn.",
    lore: "Apep was chaos itself, a serpent so vast that even the gods feared that one night it might finally succeed and unmake the world.",
  },
  {
    name: "Sobek",
    team: "set",
    powerName: "Crocodile Strike",
    energyCost: 3,
    powerDescription: "Drag one opponent piece within 4 squares of this one back to the yard.",
    lore: "Sobek, the crocodile god of the Nile, embodied both the river's deadly power and its fertility, feared, but also petitioned by farmers for good harvests.",
  },
  {
    name: "Ammit",
    team: "set",
    powerName: "Devourer of the Damned",
    energyCost: 3,
    powerDescription:
      "Permanently remove one opponent pawn from the game, if it is currently on a curse or trap square (it never returns).",
    lore: "Ammit, part crocodile, lion, and hippo, waited beside the Scales of Ma'at to devour any heart found heavier than truth, ending that soul's existence for good.",
  },
];

export const pawnName = (team: Team) => (team === "osiris" ? "Ka-Servant" : "Sand-Wraith");

/**
 * Small glyph shown on each major god's board piece, so they read as distinct figures rather than dots.
 * These are authentic Unicode Egyptian Hieroglyphs (U+13000-U+1342F), not emoji -- rendered via the
 * "Noto Sans Egyptian Hieroglyphs" webfont loaded in the root route.
 */
export const majorGlyphs: Record<string, string> = {
  Osiris: "𓋚", // U+132DA, Gardiner S008, Atef crown -- Osiris's iconic crown
  Isis: "𓊨", // U+132A8, Gardiner Q001, throne/seat -- literally the glyph that spells her name
  Anubis: "𓃤", // U+130E4, Gardiner E016A, jackal-on-shrine -- classifier for Anubis
  Horus: "𓅃", // U+13143, Gardiner G005, falcon on standard -- logogram for Horus
  Set: "𓃩", // U+130E9, Gardiner E020, the Set-animal -- the classic glyph for Set
  Apep: "𓆙", // U+13199, Gardiner I014, coiling serpent
  Sobek: "𓆋", // U+1318B, Gardiner I004, crocodile classifier for Sobek
  Ammit: "𓃯", // U+130EF, Gardiner E025, hippopotamus classifier -- Devourer's dominant form
};

/** Small glyph shown on each pawn's board piece (authentic hieroglyphs. */
export const pawnGlyph = (team: Team) => (team === "osiris" ? "𓀎" : "𓈉");
// Ka-Servant: U+1300E, Gardiner A012, marching man (army/servant figure)
// Sand-Wraith: U+13209, Gardiner N025, desert hill-country sign (foreign/hostile sands)

export const TRACK_LENGTH = 40;

/* ------------------------------------------------------------------ */
/* Ka Cards -- the small tactical hand each team plays from            */
/* ------------------------------------------------------------------ */

export type CardEffect =
  | "shield_block" // reactive: negate an incoming capture
  | "reroll_dice" // post-roll: re-roll your dice
  | "advance_piece_2" // move one of your pieces forward 2
  | "retreat_enemy_2" // push one enemy piece back 2
  | "cleanse_status" // free one of your held/trapped pieces
  | "adjust_dice_1" // post-roll: +1 to your just-rolled dice
  | "gain_energy_2" // +2 Ka Energy instantly
  | "banish_nearby" // send a nearby enemy piece back to the yard
  | "swap_any_two" // swap the positions of any two on-board pieces
  | "temp_shield_major"; // shield one of your Majors from the next capture/curse

export interface KaCard {
  id: string;
  name: string;
  cost: number;
  effect: CardEffect;
  description: string;
  lore: string;
  /** Whether resolving this card requires picking a target piece. */
  needsTarget?: "own" | "own-held" | "own-major" | "enemy-nearby" | "enemy-onboard" | "any-two";
}

export const CARD_POOL: KaCard[] = [
  {
    id: "shield_of_maat",
    name: "Shield of Ma'at",
    cost: 1,
    effect: "shield_block",
    description: "Reactive -- when an enemy piece would capture one of yours, play this to negate the capture entirely.",
    lore: "Ma'at's feather-light truth turns aside even the harshest blow.",
  },
  {
    id: "scarabs_whisper",
    name: "Scarab's Whisper",
    cost: 2,
    effect: "reroll_dice",
    description: "Re-roll your dice after seeing the result.",
    lore: "The scarab Khepri rolls the sun anew each dawn -- try your fortune again.",
  },
  {
    id: "reed_raft",
    name: "Reed Raft",
    cost: 2,
    effect: "advance_piece_2",
    description: "Move one of your pieces forward 2 squares.",
    lore: "A swift reed raft cuts across the flood, saving days of travel.",
    needsTarget: "own",
  },
  {
    id: "sandstorm",
    name: "Sandstorm",
    cost: 2,
    effect: "retreat_enemy_2",
    description: "Push one enemy piece back 2 squares.",
    lore: "Set stirs the desert winds against his enemies.",
    needsTarget: "enemy-onboard",
  },
  {
    id: "amulet_of_wadjet",
    name: "Amulet of Wadjet",
    cost: 1,
    effect: "cleanse_status",
    description: "Free one of your held/trapped pieces immediately.",
    lore: "The Eye of Wadjet wards off harm and breaks any snare.",
    needsTarget: "own-held",
  },
  {
    id: "scribes_boon",
    name: "Scribe's Boon",
    cost: 1,
    effect: "adjust_dice_1",
    description: "Add 1 to your just-rolled dice (after rolling, before moving).",
    lore: "Thoth's scribes record fate -- and sometimes correct it.",
  },
  {
    id: "feast_offering",
    name: "Feast Offering",
    cost: 0,
    effect: "gain_energy_2",
    description: "Gain 2 Ka Energy instantly.",
    lore: "Offerings of bread and beer sustain the Ka, the vital spirit.",
  },
  {
    id: "ambush",
    name: "Ambush",
    cost: 3,
    effect: "banish_nearby",
    description: "Send an enemy piece within 3 squares of one of yours back to the yard.",
    lore: "Bandits of the desert roads strike travellers unprepared.",
    needsTarget: "enemy-nearby",
  },
  {
    id: "maats_judgment",
    name: "Ma'at's Judgment",
    cost: 2,
    effect: "swap_any_two",
    description: "Swap the positions of any two pieces on the board.",
    lore: "Ma'at reorders all things toward their true balance.",
    needsTarget: "any-two",
  },
  {
    id: "veil_of_nut",
    name: "Veil of Nut",
    cost: 2,
    effect: "temp_shield_major",
    description: "Shield one of your Majors from the next capture or curse.",
    lore: "Nut's starry body arches overhead, hiding her children from harm.",
    needsTarget: "own-major",
  },
];

export const cardById = (id: string) => CARD_POOL.find((c) => c.id === id)!;

/** Builds a shuffled deck: 2 copies of each card. */
export function buildDeck(): string[] {
  const deck: string[] = [];
  for (const card of CARD_POOL) {
    deck.push(card.id, card.id);
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
