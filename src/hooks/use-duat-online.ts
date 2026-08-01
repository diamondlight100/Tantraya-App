import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useAuth } from "@/lib/auth-context";
import { initialState, type GameState } from "@/components/course/duat-race-game";
import type { Team } from "@/data/magick/duat-race";

export type DuatGameRow = {
  id: string;
  code: string;
  host_id: string;
  guest_id: string | null;
  host_team: Team;
  status: "waiting" | "active" | "finished";
  state: GameState;
  updated_at: string;
};

function randomCode(): string {
  // Unambiguous alphabet (no 0/O/1/I), easy to read out loud or type.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

/**
 * Owns the lifecycle of one online Duat game: finding a game to resume,
 * creating one, joining by code, and keeping local state in sync with the
 * `duat_games` row via Supabase Realtime. Sync is client-authoritative , 
 * whichever player just acted writes the new state, the other side's
 * subscription picks it up.
 */
export function useDuatOnline() {
  const { user } = useAuth();
  const [loadingResume, setLoadingResume] = useState(true);
  const [game, setGame] = useState<DuatGameRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastPushedSeq = useRef<number>(-1);

  const applyRow = useCallback((row: any): DuatGameRow => ({
    id: row.id,
    code: row.code,
    host_id: row.host_id,
    guest_id: row.guest_id,
    host_team: row.host_team,
    status: row.status,
    state: row.state as GameState,
    updated_at: row.updated_at,
  }), []);

  // Look for an existing game to resume on mount.
  useEffect(() => {
    if (!user) { setLoadingResume(false); return; }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("duat_games")
        .select("*")
        .or(`host_id.eq.${user.id},guest_id.eq.${user.id}`)
        .neq("status", "finished")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!cancelled && data) {
        setGame(applyRow(data));
        lastPushedSeq.current = (data as any).state?.seq ?? 0;
      }
      if (!cancelled) setLoadingResume(false);
    })();
    return () => { cancelled = true; };
  }, [user, applyRow]);

  // Realtime subscription on the active game row.
  useEffect(() => {
    if (!game) return;
    const channel = supabase
      .channel(`duat-game-${game.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "duat_games", filter: `id=eq.${game.id}` },
        (payload) => {
          setGame(applyRow(payload.new));
        },
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.id]);

  const createGame = useCallback(async (hostTeam: Team = "osiris") => {
    if (!user) return;
    setError(null);
    const code = randomCode();
    const { data, error: err } = await supabase
      .from("duat_games")
      .insert({ code, host_id: user.id, host_team: hostTeam, status: "waiting", state: initialState() as unknown as Json })
      .select("*")
      .single();
    if (err || !data) { setError("Couldn't create a game. Try again."); return; }
    lastPushedSeq.current = 0;
    setGame(applyRow(data));
  }, [user, applyRow]);

  const joinGame = useCallback(async (codeInput: string) => {
    if (!user) return;
    setError(null);
    const code = codeInput.trim().toUpperCase();
    const { data: found, error: findErr } = await supabase
      .from("duat_games")
      .select("*")
      .eq("code", code)
      .maybeSingle();
    if (findErr || !found) { setError("No game found with that code."); return; }
    if (found.host_id === user.id) { setGame(applyRow(found)); return; }
    if (found.guest_id && found.guest_id !== user.id) { setError("That game already has two players."); return; }
    if (found.guest_id === user.id) { setGame(applyRow(found)); return; }
    const { data, error: joinErr } = await supabase
      .from("duat_games")
      .update({ guest_id: user.id, status: "active" })
      .eq("id", found.id)
      .eq("status", "waiting")
      .is("guest_id", null)
      .select("*")
      .single();
    if (joinErr || !data) { setError("That game was just taken by someone else. Ask for a fresh code."); return; }
    lastPushedSeq.current = (data as any).state?.seq ?? 0;
    setGame(applyRow(data));
  }, [user, applyRow]);

  const pushState = useCallback(async (state: GameState) => {
    if (!game) return;
    lastPushedSeq.current = state.seq;
    const nextStatus = game.status === "waiting" ? "waiting" : "active";
    await supabase.from("duat_games").update({ state: state as unknown as Json, status: nextStatus }).eq("id", game.id);
  }, [game]);

  const leaveGame = useCallback(async () => {
    if (game) await supabase.from("duat_games").update({ status: "finished" }).eq("id", game.id);
    setGame(null);
  }, [game]);

  const myTeam: Team | undefined = game && user
    ? (game.host_id === user.id ? game.host_team : game.host_team === "osiris" ? "set" : "osiris")
    : undefined;

  const waitingForOpponent = game?.status === "waiting" && !game.guest_id;
  // Only apply a remote state as newer if we didn't just write that exact seq ourselves.
  const remoteState = game && game.state.seq !== lastPushedSeq.current ? game.state : null;

  return {
    user,
    loadingResume,
    game,
    error,
    myTeam,
    waitingForOpponent,
    remoteState,
    createGame,
    joinGame,
    pushState,
    leaveGame,
    clearGame: () => setGame(null),
  };
}
