import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { tratakaObjects } from "@/data/core/trataka-course";

/* ───────────────────────── shared: a soft bell ───────────────────────── */

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

/* ───────────────────────── Eye Exercises Guide ─────────────────────────
 * Four exercises, each with its own short cue and countdown, run one at a
 * time so a student can actually follow along instead of reading a wall
 * of instructions while trying to move their eyes.
 */

const EYE_EXERCISES = [
  {
    title: "One: Focusing near and far",
    cue: "Inhale, gaze to the horizon. Exhale, gaze to the brow centre.",
    seconds: 60,
    rounds: "9–21 rounds",
  },
  {
    title: "Two: Shen breathing",
    cue: "Brow → crown → occiput → crown → brow. Attention alone, no forcing.",
    seconds: 60,
    rounds: "3–9 rounds",
  },
  {
    title: "Three: Circles with the thumb",
    cue: "Arm out, thumb up. Nine wide circles clockwise, then nine counterclockwise, other arm.",
    seconds: 90,
    rounds: "9 + 9",
  },
  {
    title: "Four: The clock face",
    cue: "Head still. Sweep the eyes along each clock line: 12–6, 3–9, 1–7, 2–8, 10–4, 11–5.",
    seconds: 120,
    rounds: "9 each line",
  },
];

export function EyeExercisesGuide() {
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [remain, setRemain] = useState(EYE_EXERCISES[0].seconds);

  useEffect(() => {
    setRemain(EYE_EXERCISES[idx].seconds);
  }, [idx]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setRemain((r) => {
        if (r > 1) return r - 1;
        playBell();
        if (idx < EYE_EXERCISES.length - 1) {
          setIdx((i) => i + 1);
          return EYE_EXERCISES[idx + 1].seconds;
        }
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, idx]);

  const ex = EYE_EXERCISES[idx];
  const pct = ((ex.seconds - remain) / ex.seconds) * 100;

  return (
    <div className="rounded-xl border border-gold/30 bg-card/70 p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Preparation, head still, eyes only</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {EYE_EXERCISES.map((e, i) => (
          <button
            key={e.title}
            onClick={() => {
              setRunning(false);
              setIdx(i);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition",
              i === idx ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/40",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <h4 className="mt-4 font-serif text-xl text-primary">{ex.title}</h4>
      <p className="mt-1 text-sm text-foreground/85">{ex.cue}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{ex.rounds}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <div className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-center font-mono text-2xl text-primary">{remain}s</p>

      <div className="mt-4 flex justify-center gap-2">
        <Button size="sm" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setRunning(false);
            setRemain(ex.seconds);
          }}
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
}

/* ───────────────────────── Trataka Gallery ─────────────────────────
 * The full list of fourteen traditional objects, browsable one at a time,
 * with the sun-gazing entry visually flagged so the caution actually
 * registers rather than blending into the rest of the list.
 */

export function TratakaGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The list of tratakas</p>
      <h4 className="mt-1 font-serif text-xl text-primary">Fourteen traditional objects of gaze</h4>
      <p className="mt-1 text-sm text-muted-foreground">Tap an object to read what it's traditionally said to develop.</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {tratakaObjects.map((o, i) => (
          <button
            key={o.name}
            onClick={() => setOpen(open === i ? null : i)}
            className={cn(
              "rounded-lg border p-3 text-left transition",
              o.caution
                ? "border-destructive/40 hover:border-destructive/70"
                : open === i
                  ? "border-gold bg-gold/10"
                  : "border-border/60 hover:border-gold/40",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-serif text-base text-foreground">{o.name}</p>
              {o.element && <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{o.element}</span>}
            </div>
            {o.sanskrit && <p className="text-xs italic text-gold/90">{o.sanskrit}</p>}
            {open === i && (
              <div className="mt-2 space-y-2">
                <p className="rounded-md border border-gold/30 bg-gold/5 p-2 text-sm text-foreground/90">{o.description}</p>
                {o.caution && (
                  <p className="rounded-md border border-destructive/40 bg-destructive/5 p-2 text-sm text-destructive-foreground/90">
                    <span className="font-semibold uppercase tracking-[0.15em] text-destructive">Not taught here — </span>
                    {o.caution}
                  </p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Flame Gaze Practice ─────────────────────────
 * Runs the actual two-stage alternation live: open gaze on the wick,
 * closed-eye afterimage at the ajna, repeating for as many rounds as the
 * chosen session length allows.
 */

const STAGES = [
  { key: "open", label: "Stage One: open gaze", cue: "Rest the gaze softly on the tip of the wick. Let the eyelids soften.", seconds: 90 },
  { key: "closed", label: "Stage Two: closed eye, afterimage at ajna", cue: "Close the eyes. Hold the afterimage at the point between the brows, without chasing it.", seconds: 90 },
] as const;

const SESSION_LENGTHS = [
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "20 min", minutes: 20 },
];

export function FlameGazePractice() {
  const [minutes, setMinutes] = useState(15);
  const [active, setActive] = useState(false);
  const [stageIdx, setStageIdx] = useState(0);
  const [remain, setRemain] = useState<number>(STAGES[0].seconds);
  const [elapsed, setElapsed] = useState(0);
  const totalSec = minutes * 60;

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setElapsed((e) => e + 1);
      setRemain((r) => (r > 1 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (elapsed >= totalSec) {
      playBell();
      setActive(false);
      return;
    }
    if (remain === 0) {
      playBell();
      const next = (stageIdx + 1) % STAGES.length;
      setStageIdx(next);
      setRemain(STAGES[next].seconds);
    }
  }, [remain, active, stageIdx, elapsed, totalSec]);

  function start() {
    playBell();
    setElapsed(0);
    setStageIdx(0);
    setRemain(STAGES[0].seconds);
    setActive(true);
  }

  function stop() {
    setActive(false);
    setElapsed(0);
    setStageIdx(0);
  }

  if (!active && elapsed === 0) {
    return (
      <div className="rounded-xl border border-gold/30 bg-card/70 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Jyoti Trataka</p>
        <h4 className="mt-1 font-serif text-2xl text-primary">The open/closed alternation, run live</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Set your candle at eye level, arm's length away, room dark. Choose a length, then begin —
          it will alternate open gaze and closed-eye afterimage on a bell, for the whole session.
        </p>
        <div className="mt-4 flex gap-2">
          {SESSION_LENGTHS.map((d) => (
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
        <Button className="mt-5" onClick={start}>
          <Play className="h-4 w-4" /> Begin
        </Button>
      </div>
    );
  }

  if (!active && elapsed > 0) {
    return (
      <div className="rounded-xl border border-gold/40 bg-gold/5 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Session complete</p>
        <h4 className="mt-2 font-serif text-2xl text-primary">{minutes} minutes</h4>
        <p className="mt-2 text-sm text-muted-foreground">Let the eyes rest. Notice what the room looks like now.</p>
        <Button variant="outline" className="mt-4" onClick={stop}>
          <RotateCcw className="h-4 w-4" /> Set up another session
        </Button>
      </div>
    );
  }

  const stage = STAGES[stageIdx];
  const pct = Math.min(100, (elapsed / totalSec) * 100);

  return (
    <div className="rounded-xl border border-gold/40 bg-card/80 p-8 text-center">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="uppercase tracking-[0.3em] text-gold">{stage.label}</span>
        <span className="font-mono">
          {Math.floor((totalSec - elapsed) / 60)}:{String((totalSec - elapsed) % 60).padStart(2, "0")} left
        </span>
      </div>
      <p className="my-8 font-serif text-xl leading-snug text-primary">{stage.cue}</p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <div className="h-full bg-gradient-to-r from-gold/70 to-gold transition-all" style={{ width: `${pct}%` }} />
      </div>
      <Button variant="ghost" size="sm" className="mt-5" onClick={stop}>
        End session early
      </Button>
    </div>
  );
}

/* ───────────────────────── Hemisphere Convergence ─────────────────────────
 * A guided sequence walking through the neurological + subtle-body frame
 * of the chapter: convergence, corpus callosum, ida/pingala, sushumna.
 */

const CONVERGENCE_BEATS = [
  { label: "The gaze", text: "Return to the candle. Rest the gaze on the wick tip, soft and steady.", seconds: 40 },
  { label: "One instrument", text: "Let there be no 'my two eyes looking.' Just seeing, undivided, at one point.", seconds: 40 },
  { label: "The bridge", text: "Feel the inward turn of both eyes toward the ajna. This convergence itself calls both hemispheres into one field, across the corpus callosum.", seconds: 45 },
  { label: "Ida and pingala", text: "Left, lunar, receptive. Right, solar, active. Feel both drawn, evenly, toward the centre.", seconds: 45 },
  { label: "The two becoming one", text: "\"When the eyes become one, you shall see me.\" Hold the afterimage at the ajna. Nothing to do now but remain.", seconds: 60 },
];

export function HemisphereConvergence() {
  const [idx, setIdx] = useState(-1);
  const [remain, setRemain] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || idx < 0) return;
    const t = setInterval(() => {
      setRemain((r) => {
        if (r > 1) return r - 1;
        if (idx < CONVERGENCE_BEATS.length - 1) {
          playBell();
          setIdx((i) => i + 1);
          return CONVERGENCE_BEATS[idx + 1].seconds;
        }
        playBell();
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, idx]);

  function start() {
    playBell();
    setIdx(0);
    setRemain(CONVERGENCE_BEATS[0].seconds);
    setRunning(true);
  }

  if (idx < 0) {
    return (
      <div className="rounded-xl border border-gold/30 bg-card/70 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Two becoming one</p>
        <h4 className="mt-1 font-serif text-2xl text-primary">A guided convergence sequence</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Five short beats, moving from the physical gaze to the union of ida and pingala at centre.
        </p>
        <Button className="mt-4" onClick={start}>
          <Play className="h-4 w-4" /> Begin
        </Button>
      </div>
    );
  }

  const beat = CONVERGENCE_BEATS[idx];
  const done = idx === CONVERGENCE_BEATS.length - 1 && remain === 0 && !running;

  if (done) {
    return (
      <div className="rounded-xl border border-gold/40 bg-gold/5 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Complete</p>
        <h4 className="mt-2 font-serif text-2xl text-primary">Remain here a while longer if you can</h4>
        <Button variant="outline" className="mt-4" onClick={() => setIdx(-1)}>
          <RotateCcw className="h-4 w-4" /> Run it again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/40 bg-card/80 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">{beat.label}</p>
      <p className="my-8 font-serif text-xl leading-snug text-primary">{beat.text}</p>
      <p className="font-mono text-lg text-muted-foreground">{remain}s</p>
      <Button variant="ghost" size="sm" className="mt-5" onClick={() => setRunning(false)}>
        Pause / stop
      </Button>
    </div>
  );
}

/* ───────────────────────── Second Attention Sequencer ─────────────────────────
 * Five points, base to bindu, held lightly in the background while the
 * gaze continues its own work. Either drawn one per session, or stepped
 * through as a full within-session sequence.
 */

const ATTENTION_POINTS = [
  { name: "Base of the spine", sanskrit: "Muladhara", note: "The root, felt as a point of stillness beneath the seat." },
  { name: "Front, opposite the pubic bone", sanskrit: "Svadhisthana", note: "A soft, watery point low in the pelvis." },
  { name: "Rear point at the level of the heart", sanskrit: "Anahata (rear)", note: "Behind the heart, on the spine itself, not the front." },
  { name: "Rear point at the level of the throat", sanskrit: "Vishuddha (rear)", note: "Behind the throat, on the spine, drawing energy up the central axis." },
  { name: "Bindu, back of the crown", sanskrit: "Bindu", note: "The very back of the crown of the head." },
];

export function SecondAttentionSequencer() {
  const [mode, setMode] = useState<"draw" | "sequence">("draw");
  const [drawn, setDrawn] = useState<number | null>(null);
  const [seqIdx, setSeqIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [remain, setRemain] = useState<number>(90);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setRemain((r) => {
        if (r > 1) return r - 1;
        if (seqIdx < ATTENTION_POINTS.length - 1) {
          playBell();
          setSeqIdx((i) => i + 1);
          return 90;
        }
        playBell();
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, seqIdx]);

  function draw() {
    let next = Math.floor(Math.random() * ATTENTION_POINTS.length);
    if (ATTENTION_POINTS.length > 1 && next === drawn) next = (next + 1) % ATTENTION_POINTS.length;
    setDrawn(next);
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The second attention</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setMode("draw")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs transition",
            mode === "draw" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/40",
          )}
        >
          Draw one point
        </button>
        <button
          onClick={() => {
            setMode("sequence");
            setSeqIdx(0);
            setRemain(90);
            setRunning(false);
          }}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs transition",
            mode === "sequence" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/40",
          )}
        >
          Full within-session sequence
        </button>
      </div>

      {mode === "draw" ? (
        <div className="mt-4 text-center">
          {drawn != null ? (
            <>
              <p className="font-serif text-2xl text-primary">{ATTENTION_POINTS[drawn].name}</p>
              <p className="text-sm italic text-gold/90">{ATTENTION_POINTS[drawn].sanskrit}</p>
              <p className="mt-2 text-sm text-muted-foreground">{ATTENTION_POINTS[drawn].note}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Draw a point to hold lightly for this session, or for the coming week.</p>
          )}
          <Button variant="outline" size="sm" className="mt-4" onClick={draw}>
            {drawn != null ? "Draw another" : "Draw a point"}
          </Button>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Point {seqIdx + 1} of {ATTENTION_POINTS.length}
          </p>
          <p className="mt-2 font-serif text-2xl text-primary">{ATTENTION_POINTS[seqIdx].name}</p>
          <p className="text-sm italic text-gold/90">{ATTENTION_POINTS[seqIdx].sanskrit}</p>
          <p className="mt-2 text-sm text-muted-foreground">{ATTENTION_POINTS[seqIdx].note}</p>
          <p className="mt-3 font-mono text-lg text-muted-foreground">{remain}s</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                if (!running) playBell();
                setRunning((r) => !r);
              }}
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? "Pause" : "Start"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setRunning(false);
                setSeqIdx(0);
                setRemain(90);
              }}
            >
              <RotateCcw className="h-4 w-4" /> Restart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Akasha Descent ─────────────────────────
 * A short guided descent through the chapter's own sequence: gaze,
 * widen to the room, notice the trance quality, rest without a goal.
 */

const AKASHA_BEATS = [
  { text: "Settle into the gaze, on the wick or on the ajna.", seconds: 40 },
  { text: "Without losing the gaze, let awareness widen to include the whole room, the air, the space around your body.", seconds: 50 },
  { text: "If a thickening, a depth, a slowing arises, simply notice it. Don't chase it, don't analyse it.", seconds: 60 },
  { text: "Rest in whatever remains. There is nothing further to do.", seconds: 60 },
];

export function AkashaDescent() {
  const [idx, setIdx] = useState(-1);
  const [remain, setRemain] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || idx < 0) return;
    const t = setInterval(() => {
      setRemain((r) => {
        if (r > 1) return r - 1;
        if (idx < AKASHA_BEATS.length - 1) {
          playBell();
          setIdx((i) => i + 1);
          return AKASHA_BEATS[idx + 1].seconds;
        }
        playBell();
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, idx]);

  function start() {
    playBell();
    setIdx(0);
    setRemain(AKASHA_BEATS[0].seconds);
    setRunning(true);
  }

  if (idx < 0) {
    return (
      <div className="rounded-xl border border-gold/30 bg-card/70 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The akashic trance</p>
        <h4 className="mt-1 font-serif text-2xl text-primary">A short guided descent</h4>
        <p className="mt-2 text-sm text-muted-foreground">Four beats. Nothing to produce, only to notice.</p>
        <Button className="mt-4" onClick={start}>
          <Play className="h-4 w-4" /> Begin
        </Button>
      </div>
    );
  }

  const done = idx === AKASHA_BEATS.length - 1 && remain === 0 && !running;

  if (done) {
    return (
      <div className="rounded-xl border border-gold/40 bg-gold/5 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Complete</p>
        <h4 className="mt-2 font-serif text-2xl text-primary">Stay a while longer if it's still here</h4>
        <Button variant="outline" className="mt-4" onClick={() => setIdx(-1)}>
          <RotateCcw className="h-4 w-4" /> Run it again
        </Button>
      </div>
    );
  }

  const beat = AKASHA_BEATS[idx];

  return (
    <div className="rounded-xl border border-gold/40 bg-card/80 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">
        Step {idx + 1} of {AKASHA_BEATS.length}
      </p>
      <p className="my-8 font-serif text-xl leading-snug text-primary">{beat.text}</p>
      <p className="font-mono text-lg text-muted-foreground">{remain}s</p>
      <Button variant="ghost" size="sm" className="mt-5" onClick={() => setRunning(false)}>
        Pause / stop
      </Button>
    </div>
  );
}
