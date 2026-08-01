import { useEffect, useState } from "react";
import { Play, Users, Copy, Check, Loader2, ArrowLeft, Maximize2 } from "lucide-react";
import { DuatRaceGame } from "@/components/course/duat-race-game";
import { useDuatOnline } from "@/hooks/use-duat-online";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

type Screen = "closed" | "menu" | "join" | "waiting" | "game" | "local";

/** Path of the standalone, chrome-free window the game opens into. */
export const DUAT_RACE_WINDOW_PATH = "/play/duat-race";

/**
 * Entry point for "The Trial of the Duat", lets a student play the classic
 * same-device pass & play, or start/join an online game against a friend via
 * a short invite code, synced live through Supabase Realtime.
 *
 * Pass `standalone` when this is mounted inside its own dedicated window
 * (see /play/duat-race), it skips the inline teaser card and opens
 * straight into the mode menu, since the window itself IS the "opened"
 * state.
 */
export function DuatRaceLauncher({ standalone }: { standalone?: boolean } = {}) {
  const { user } = useAuth();
  const online = useDuatOnline();
  const [screen, setScreen] = useState<Screen>(standalone ? "menu" : "closed");
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);

  // This component only mounts in the course page once the "easter-egg"
  // unlock condition (finishing the-neteru chapter) is actually met, so
  // reaching this point at all IS the unlock event. Record it once per
  // student (idempotent, repeat visits are silently ignored) so other
  // already-unlocked students get notified there's a new opponent to
  // challenge. Skipped in the standalone popup window, since that can be
  // reached by a direct link without the gate ever having been checked.
  useEffect(() => {
    if (standalone || !user) return;
    supabase
      .from("duat_unlocks")
      .upsert({ user_id: user.id }, { onConflict: "user_id", ignoreDuplicates: true })
      .then(({ error }) => {
        if (error) console.error("Failed to record Duat unlock:", error.message);
      });
  }, [standalone, user]);

  // Auto-resume: if we found an existing game on load, jump straight to it.
  const effectiveScreen: Screen =
    screen === "closed" && online.game
      ? online.waitingForOpponent
        ? "waiting"
        : "game"
      : screen;

  // Guest just joined (or host refreshed after guest joined), jump into the game.
  useEffect(() => {
    if (effectiveScreen === "waiting" && online.game && !online.waitingForOpponent) {
      setScreen("game");
    }
  }, [effectiveScreen, online.game, online.waitingForOpponent]);

  if (effectiveScreen === "closed") {
    return (
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-5 sm:p-7">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-gold">2-player · pass &amp; play or online · tactical</p>
            <h2 className="font-serif text-2xl text-primary">The Trial of the Duat</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Set vs. Osiris race a spiral path to the Duat Gate, a Senet-inspired board packed with
              real Egyptian myth. Build Ka Energy, cast each Major's power again and again, play tactical
              Ka Cards, block captures with Shield of Ma'at, and choose Ma'at's safe road or Chaos's risky
              shortcut at the two Forks. Play together on one device, or invite a friend to play online.
            </p>
          </div>
          {online.loadingResume ? (
            <button
              disabled
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold bg-gold/10 px-5 py-2.5 text-sm font-medium text-primary opacity-60"
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Checking for a game…
            </button>
          ) : (
            <a
              href={DUAT_RACE_WINDOW_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold bg-gold/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-gold/20"
            >
              <Maximize2 className="h-4 w-4" /> Play the game, opens full screen
            </a>
          )}
        </div>
      </section>
    );
  }

  if (effectiveScreen === "menu") {
    return (
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-5 sm:p-7">
        <button
          onClick={() => setScreen("closed")}
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <h2 className="mb-4 font-serif text-xl text-primary">How do you want to play?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <button
            onClick={() => setScreen("local")}
            className="rounded-xl border border-border/60 bg-background/40 p-4 text-left transition hover:border-gold/50"
          >
            <p className="font-medium text-primary">Pass &amp; play</p>
            <p className="mt-1 text-xs text-muted-foreground">Same device, two players take turns. Hands stay hidden between turns.</p>
          </button>
          <button
            onClick={async () => { await online.createGame("osiris"); setScreen("waiting"); }}
            disabled={!user}
            className="rounded-xl border border-border/60 bg-background/40 p-4 text-left transition hover:border-gold/50 disabled:opacity-50"
          >
            <p className="font-medium text-primary">Create online game</p>
            <p className="mt-1 text-xs text-muted-foreground">Get a code to send a friend. You play the House of Osiris.</p>
          </button>
          <button
            onClick={() => setScreen("join")}
            disabled={!user}
            className="rounded-xl border border-border/60 bg-background/40 p-4 text-left transition hover:border-gold/50 disabled:opacity-50"
          >
            <p className="font-medium text-primary">Join with a code</p>
            <p className="mt-1 text-xs text-muted-foreground">Enter a friend's invite code. You play the House of Set.</p>
          </button>
        </div>
        {!user && <p className="mt-3 text-xs text-destructive">Log in to play online, pass &amp; play works without an account.</p>}
        {online.error && <p className="mt-3 text-xs text-destructive">{online.error}</p>}
      </section>
    );
  }

  if (effectiveScreen === "join") {
    return (
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-5 sm:p-7">
        <button
          onClick={() => setScreen("menu")}
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <h2 className="mb-3 font-serif text-xl text-primary">Join a game</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="e.g. K7QX2M"
            maxLength={6}
            className="w-40 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm tracking-widest text-foreground outline-none focus:border-gold/50"
          />
          <button
            onClick={async () => { await online.joinGame(joinCode); setScreen("waiting"); }}
            disabled={joinCode.trim().length < 4}
            className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-gold/20 disabled:opacity-50"
          >
            <Users className="h-4 w-4" /> Join
          </button>
        </div>
        {online.error && <p className="mt-3 text-xs text-destructive">{online.error}</p>}
      </section>
    );
  }

  if (effectiveScreen === "waiting" && online.game) {
    if (!online.waitingForOpponent) {
      return null;
    }
    return (
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-5 sm:p-7 text-center">
        <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-gold" />
        <h2 className="font-serif text-xl text-primary">Waiting for your opponent…</h2>
        <p className="mt-1 text-sm text-muted-foreground">Send them this code, it works from the same page.</p>
        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-5 py-3">
          <span className="font-serif text-2xl tracking-[0.3em] text-primary">{online.game.code}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(online.game!.code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="rounded-full border border-gold/40 p-1.5 hover:bg-gold/10"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4 text-gold" />}
          </button>
        </div>
        <button
          onClick={async () => { await online.leaveGame(); setScreen("menu"); }}
          className="mt-5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Cancel
        </button>
      </section>
    );
  }

  if (effectiveScreen === "game" && online.game && online.myTeam) {
    // Inline on the course page, a resumed online game should reopen in the
    // dedicated fullscreen window rather than render the raw board embedded
    // with no expand control. The standalone window pulls this same
    // in-progress game via useDuatOnline() itself, so this is just a doorway.
    if (!standalone) {
      return (
        <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/70 to-background/50 p-5 sm:p-7">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-gold">Game in progress</p>
              <h2 className="font-serif text-2xl text-primary">The Trial of the Duat</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                You have a game underway. Reopen it in its own fullscreen window to keep playing.
              </p>
            </div>
            <a
              href={DUAT_RACE_WINDOW_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold bg-gold/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-gold/20"
            >
              <Maximize2 className="h-4 w-4" /> Resume game, opens full screen
            </a>
          </div>
        </section>
      );
    }
    return (
      <DuatRaceGame
        mode="online"
        myTeam={online.myTeam}
        initialGameState={online.game.state}
        remoteState={online.remoteState}
        onLocalChange={online.pushState}
        skipIntro
        onExit={async () => { await online.leaveGame(); setScreen("menu"); }}
      />
    );
  }

  // Local pass & play, the original single-device experience.
  return <DuatRaceGame skipIntro onExit={() => setScreen("closed")} mode="local" />;
}
