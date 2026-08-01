import { useEffect, useRef, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAudioContext, ringBell } from "@/lib/bell-chime";

const audioCtxRef: { current: AudioContext | null } = { current: null };
function chime() {
  try {
    ringBell(getAudioContext(audioCtxRef), 264, "soft");
  } catch {
    // Web Audio unsupported, silently skip; the visual cue still fires.
  }
}

/**
 * Bagalamukhi's stambhana practice: a randomized bell through the day, cueing
 * "what's already in motion right now." Purely client-side, no account or
 * server state, just a toggle for the current browser session.
 */
export function PauseBell() {
  const [running, setRunning] = useState(false);
  const [rangs, setRangs] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!running) return;
    function scheduleNext() {
      const minMs = 20 * 60 * 1000;
      const maxMs = 70 * 60 * 1000;
      const delay = minMs + Math.random() * (maxMs - minMs);
      timeoutRef.current = setTimeout(() => {
        chime();
        setRangs((n) => n + 1);
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [running]);

  return (
    <div className="rounded-xl border border-gold/30 bg-card/40 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Pause bell</p>
      <p className="mt-1 font-serif text-lg text-primary">Stambhana, through the day</p>
      <p className="mt-1 text-sm text-muted-foreground">
        A soft chime at random moments while this tab stays open, every 20 to 70 minutes, as a cue
        to notice what's already in motion before you've agreed to it. No account, no schedule; just
        leave this page open.
      </p>
      <div className="mt-3 flex items-center gap-3">
        <Button
          size="sm"
          variant={running ? "outline" : "default"}
          onClick={() => setRunning((v) => !v)}
        >
          {running ? (
            <>
              <BellOff className="h-3.5 w-3.5" /> Stop
            </>
          ) : (
            <>
              <Bell className="h-3.5 w-3.5" /> Start for today
            </>
          )}
        </Button>
        {running && (
          <span className="text-xs text-muted-foreground">
            Listening, {rangs} chime{rangs === 1 ? "" : "s"} so far
          </span>
        )}
      </div>
    </div>
  );
}
