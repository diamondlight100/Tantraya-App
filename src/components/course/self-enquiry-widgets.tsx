import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ───────────────────────── shared: a soft bell, no audio file needed ───────────────────────── */

function playBell() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [1, 2.4, 4].forEach((mult, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 220 * mult;
      gain.gain.value = i === 0 ? 0.18 : 0.06;
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.3);
    });
    setTimeout(() => ctx.close(), 3500);
  } catch {
    // Audio not available in this environment, session still works silently.
  }
}

/* ───────────────────────── Enquiry Cycle: the real practice ─────────────────────────
 * This is not a set of labeled minutes to sit through. It runs the actual
 * mechanic taught in the chapter, live, on a loop, for as long as the
 * session lasts: a thought is noticed, "to whom has this arisen" is asked,
 * the answer "to me" is registered, and "Who am I?" is held for a real
 * stretch of silence before the cycle repeats. The only fixed, one-off step
 * is a short settle at the start, everything after that is the practice
 * itself, not a countdown toward it.
 */

const BEATS: { text: string; seconds: number; hold?: boolean }[] = [
  { text: "Notice whatever is here right now, a thought, a feeling, a sensation.", seconds: 6 },
  { text: "To whom has this arisen?", seconds: 4 },
  { text: "To me.", seconds: 2 },
  { text: "Who am I?", seconds: 0, hold: true },
];

const DURATIONS = [
  { label: "10 min", minutes: 10 },
  { label: "20 min", minutes: 20 },
  { label: "30 min", minutes: 30 },
];

const HOLDS = [
  { label: "Shorter holds", seconds: 20 },
  { label: "Longer holds", seconds: 45 },
];

type Phase = "idle" | "settle" | "cycle" | "done";

export function EnquiryCycle() {
  const [minutes, setMinutes] = useState(20);
  const [holdSeconds, setHoldSeconds] = useState(20);
  const [phase, setPhase] = useState<Phase>("idle");
  const [beatIdx, setBeatIdx] = useState(0);
  const [remain, setRemain] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const totalSec = minutes * 60;

  const beat = BEATS[beatIdx];
  const beatLength = beat?.hold ? holdSeconds : beat?.seconds ?? 0;

  useEffect(() => {
    if (phase === "idle" || phase === "done") return;
    const t = setInterval(() => {
      setElapsedSec((e) => e + 1);
      setRemain((r) => {
        if (r > 1) return r - 1;
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // advance settle -> cycle
  useEffect(() => {
    if (phase === "settle" && remain === 0 && elapsedSec > 0) {
      setPhase("cycle");
      setBeatIdx(0);
      setRemain(BEATS[0].seconds);
    }
  }, [phase, remain, elapsedSec]);

  // advance through beats, looping, until total time is used up
  useEffect(() => {
    if (phase !== "cycle") return;
    if (elapsedSec >= totalSec) {
      playBell();
      setPhase("done");
      return;
    }
    if (remain === 0) {
      const nextIdx = (beatIdx + 1) % BEATS.length;
      setBeatIdx(nextIdx);
      setRemain(nextIdx === 3 ? holdSeconds : BEATS[nextIdx].seconds);
    }
  }, [remain, phase, beatIdx, elapsedSec, totalSec, holdSeconds]);

  function start() {
    playBell();
    setElapsedSec(0);
    setPhase("settle");
    setRemain(20);
  }

  function stop() {
    setPhase("idle");
    setBeatIdx(0);
    setElapsedSec(0);
  }

  const pct = Math.min(100, (elapsedSec / totalSec) * 100);

  if (phase === "idle") {
    return (
      <div className="rounded-xl border border-gold/30 bg-card/70 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Enquiry session</p>
        <h4 className="mt-1 font-serif text-2xl text-primary">Sit and run the question</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          This runs the actual mechanic, live: notice, ask "to whom", answer "to me", ask "Who am I?"
          and hold it. It repeats for the whole session. Nothing to click through, just sit with it.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Session length</p>
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.minutes}
                  onClick={() => setMinutes(d.minutes)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    minutes === d.minutes ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/40",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">How long to hold "Who am I?"</p>
            <div className="flex gap-2">
              {HOLDS.map((h) => (
                <button
                  key={h.seconds}
                  onClick={() => setHoldSeconds(h.seconds)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    holdSeconds === h.seconds ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/40",
                  )}
                >
                  {h.label} ({h.seconds}s)
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button className="mt-5" onClick={start}>
          <Play className="h-4 w-4" /> Begin
        </Button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="rounded-xl border border-gold/40 bg-gold/5 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Session complete</p>
        <h4 className="mt-2 font-serif text-2xl text-primary">{minutes} minutes</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Don't reach for a conclusion. Whatever is present right now is enough. Use the reflection
          below while it's still close.
        </p>
        <Button variant="outline" className="mt-4" onClick={stop}>
          <RotateCcw className="h-4 w-4" /> Set up another session
        </Button>
      </div>
    );
  }

  const isSettle = phase === "settle";
  const label = isSettle ? "Settle" : beat?.hold ? "Hold" : "";

  return (
    <div className="rounded-xl border border-gold/40 bg-card/80 p-8 text-center">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="uppercase tracking-[0.3em] text-gold">{label || `Step ${beatIdx + 1} of ${BEATS.length}`}</span>
        <span className="font-mono">
          {Math.floor((totalSec - elapsedSec) / 60)}:{String((totalSec - elapsedSec) % 60).padStart(2, "0")} left
        </span>
      </div>

      <p
        className={cn(
          "my-10 font-serif leading-snug text-primary transition-all",
          isSettle ? "text-xl" : beat?.hold ? "text-4xl" : "text-2xl",
        )}
      >
        {isSettle ? "Let the breath find its own rhythm. No counting, no shaping it." : beat?.text}
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <div className="h-full bg-gradient-to-r from-gold/70 to-gold transition-all" style={{ width: `${pct}%` }} />
      </div>

      <Button variant="ghost" size="sm" className="mt-5" onClick={stop}>
        End session early
      </Button>
    </div>
  );
}

/* ───────────────────────── Obstacle → Redirect ─────────────────────────
 * A real reference tool for the moment an obstacle actually shows up, not
 * a wall of paragraphs. Pick what's happening, get the exact redirect.
 */

const OBSTACLES = [
  {
    name: "Mental distraction",
    what: "The mind won't settle, especially early on.",
    redirect: "Each time it wanders, calmly bring attention back to the 'I'-thought. That's the whole move, repeated.",
  },
  {
    name: "Intellectualization",
    what: "\"Who am I?\" turns into a philosophical debate instead of a direct look.",
    redirect: "Drop the thinking about it. Go to the felt sense of 'I' itself, not a concept of it.",
  },
  {
    name: "Resistance or procrastination",
    what: "Uncomfortable material surfaces and part of you wants to stop.",
    redirect: "Stay with it. Courage and self-compassion, not force. The discomfort is the material working, not a sign to quit.",
  },
  {
    name: "Spiritual ego",
    what: "Progress starts to feel like something \"I\" achieved.",
    redirect: "Apply the question to this too: who is the one who progressed?",
  },
  {
    name: "Fear of ego dissolution",
    what: "A real fear of losing control, or of some kind of annihilation.",
    redirect: "What's being lost is only the illusion of a separate self, not you. Trust the process and keep going.",
  },
  {
    name: "A dark stretch",
    what: "Desolation or upheaval as old structures loosen, before anything clearer arrives.",
    redirect: "This is a known phase, not a wrong turn. Get support from someone experienced if it's heavy. Keep practicing.",
  },
  {
    name: "Expecting a specific experience",
    what: "Waiting for bliss, vastness, or some dramatic shift that isn't showing up.",
    redirect: "There's nothing to wait for. Trust the direct seeing you're actually having, however ordinary it feels.",
  },
  {
    name: "Doubt about the method",
    what: "\"Am I even doing this right?\"",
    redirect: "Turn the enquiry on the doubt itself: to whom is this doubt occurring? Who is doubting?",
  },
];

export function ObstacleRedirect() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">In the moment</p>
      <h4 className="mt-1 font-serif text-xl text-primary">What's happening right now?</h4>
      <p className="mt-1 text-sm text-muted-foreground">Tap what's actually going on. Get the exact redirect, not a paragraph to search through.</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {OBSTACLES.map((o, i) => (
          <button
            key={o.name}
            onClick={() => setOpen(open === i ? null : i)}
            className={cn(
              "rounded-lg border p-3 text-left transition",
              open === i ? "border-gold bg-gold/10" : "border-border/60 hover:border-gold/40",
            )}
          >
            <p className="font-serif text-base text-foreground">{o.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{o.what}</p>
            {open === i && (
              <p className="mt-2 rounded-md border border-gold/30 bg-gold/5 p-2 text-sm text-foreground/90">
                {o.redirect}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Daily Prompt ─────────────────────────
 * One prompt to carry into the day, drawn at random from the real list of
 * during-activity, in-relationship, and journaling prompts. Not a list to
 * read, a single thing to actually go do.
 */

const DAILY_PROMPTS = [
  { context: "While showering", prompt: "Who feels the water?" },
  { context: "While eating", prompt: "Who tastes this food?" },
  { context: "While walking", prompt: "Who is walking?" },
  { context: "In conversation", prompt: "Who is speaking these words? Who is listening?" },
  { context: "When emotion rises", prompt: "To whom does this feeling occur?" },
  { context: "When a strong thought hits", prompt: "To whom is this occurring? … Who am I?" },
  { context: "Journaling tonight", prompt: "What remains when all thoughts cease?" },
  { context: "Journaling tonight", prompt: "What is aware of my current experience?" },
  { context: "Journaling tonight", prompt: "What about me has never changed since childhood?" },
];

export function DailyPrompt() {
  const [idx, setIdx] = useState<number | null>(null);
  const draw = () => {
    let next = Math.floor(Math.random() * DAILY_PROMPTS.length);
    if (DAILY_PROMPTS.length > 1 && next === idx) next = (next + 1) % DAILY_PROMPTS.length;
    setIdx(next);
  };
  const item = idx != null ? DAILY_PROMPTS[idx] : null;

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Carry this into the day</p>
      {item ? (
        <>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.context}</p>
          <p className="mt-1 font-serif text-2xl text-primary">{item.prompt}</p>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Draw one prompt and actually use it today, not the whole list at once.</p>
      )}
      <Button variant="outline" size="sm" className="mt-4" onClick={draw}>
        {item ? "Draw another" : "Draw a prompt"}
      </Button>
    </div>
  );
}
