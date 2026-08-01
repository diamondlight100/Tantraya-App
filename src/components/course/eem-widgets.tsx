import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Play, Pause, RotateCcw, SkipForward, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { elements, healingSounds, eightExtras, type Element } from "@/data/eem-course";

/* ─────────────────────────── Practice Timer ─────────────────────────── */

export function PracticeTimer({
  steps,
}: {
  steps: { title: string; detail: string; seconds?: number }[];
}) {
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [remain, setRemain] = useState(steps[0]?.seconds ?? 60);

  const total = steps.reduce((a, s) => a + (s.seconds ?? 60), 0);
  const done =
    steps.slice(0, idx).reduce((a, s) => a + (s.seconds ?? 60), 0) +
    ((steps[idx]?.seconds ?? 60) - remain);

  useEffect(() => {
    setRemain(steps[idx]?.seconds ?? 60);
  }, [idx, steps]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setRemain((r) => {
        if (r > 1) return r - 1;
        if (idx < steps.length - 1) {
          setIdx((i) => i + 1);
          return steps[idx + 1]?.seconds ?? 60;
        }
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, idx, steps]);

  const step = steps[idx];
  const pct = Math.min(100, (done / total) * 100);

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Step {idx + 1} of {steps.length}
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          {String(Math.floor(remain / 60)).padStart(1, "0")}:
          {String(remain % 60).padStart(2, "0")}
        </p>
      </div>
      <h4 className="mt-2 font-serif text-2xl text-primary">{step?.title}</h4>
      <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
        {step?.detail}
      </p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <div
          className="h-full bg-gradient-to-r from-gold/70 to-gold transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => setRunning((r) => !r)} size="sm">
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            idx < steps.length - 1
              ? setIdx((i) => i + 1)
              : (setIdx(0), setRunning(false))
          }
        >
          <SkipForward className="h-4 w-4" /> Next
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIdx(0);
            setRemain(steps[0]?.seconds ?? 60);
            setRunning(false);
          }}
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Breath Visualizer ─────────────────────────── */

function useBreathCycle(seconds = 8) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setT(((now - start) / 1000) % seconds);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seconds]);
  return t / seconds; // 0..1
}

/* ─────────────────────────── Ba Gua Spiral ─────────────────────────── */

export function BaGuaWidget({ gender = "male" }: { gender?: "male" | "female" }) {
  const [dir, setDir] = useState<"out" | "in">("out");
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const target = dir === "out" ? 9 : 6;
  const sign =
    (gender === "male" && dir === "out") || (gender === "female" && dir === "in")
      ? 1
      : -1;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setCount((c) => {
        if (c + 1 >= target) {
          if (dir === "out") {
            setDir("in");
            return 0;
          }
          setRunning(false);
          return c + 1;
        }
        return c + 1;
      });
    }, 1800);
    return () => clearInterval(t);
  }, [running, dir, target]);

  // build octagon path
  const octagon = (r: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
      pts.push(`${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`);
    }
    return pts.join(" ");
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            {dir === "out" ? "Open · spiral out" : "Close · spiral in"}
          </p>
          <p className="mt-1 font-serif text-xl text-primary">
            Revolution {count} / {target}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <button
            className={cn(
              "rounded-full border px-3 py-1",
              gender === "male" && "border-gold/60 text-gold",
            )}
            onClick={() => location.reload()}
            disabled
          >
            {gender === "male" ? "Men" : "Women"}
          </button>
        </div>
      </div>

      <svg viewBox="0 0 200 200" className="mt-4 w-full max-w-xs mx-auto">
        <defs>
          <radialGradient id="navelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="60" fill="url(#navelGlow)" />
        {[60, 42, 24].map((r) => (
          <polygon
            key={r}
            points={octagon(r)}
            fill="none"
            stroke="var(--gold)"
            strokeOpacity="0.6"
            strokeWidth="0.8"
          />
        ))}
        {/* spiral indicator */}
        <g
          style={{
            transformOrigin: "100px 100px",
            transform: `rotate(${sign * count * 40}deg)`,
            transition: "transform 1.6s cubic-bezier(.4,.0,.2,1)",
          }}
        >
          <circle cx="100" cy="35" r="4" fill="var(--gold)" />
        </g>
        <circle cx="100" cy="100" r="3" fill="var(--primary)" />
      </svg>

      <div className="mt-4 flex justify-center gap-2">
        <Button size="sm" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Begin"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setDir("out");
            setCount(0);
            setRunning(false);
          }}
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Always close. {gender === "male" ? "Men" : "Women"}:{" "}
        {gender === "male" ? "out clockwise × 9, in counter-clockwise × 6" : "out counter-clockwise × 9, in clockwise × 6"}.
      </p>
    </div>
  );
}

/* ─────────────────────────── Pearl Breath ─────────────────────────── */

export function PearlBreath() {
  const phase = useBreathCycle(8); // 4s in, 4s out
  // ease in/out
  const e = 0.5 - Math.cos(phase * Math.PI * 2) / 2;
  const r = 30 + e * 50;
  const opacity = 0.35 + e * 0.55;
  const label = phase < 0.5 ? "Inhale, expand" : "Exhale, condense";

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Pearl of Golden Light
      </p>
      <p className="mt-1 font-serif text-xl text-primary">{label}</p>
      <svg viewBox="0 0 200 200" className="mt-4 w-full max-w-xs mx-auto">
        <defs>
          <radialGradient id="pearl" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9a8" />
            <stop offset="60%" stopColor="#e8b84a" />
            <stop offset="100%" stopColor="#9b6c2a" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="pearlGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r={r + 30} fill="url(#pearlGlow)" opacity={opacity * 0.6} />
        <circle cx="100" cy="100" r={r} fill="url(#pearl)" opacity={opacity} />
        <circle cx="85" cy="85" r={r * 0.25} fill="#fff" opacity={opacity * 0.7} />
      </svg>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Follow the Pearl with your breath. 9 cycles to begin, 18 to deepen, 36 to settle.
      </p>
    </div>
  );
}

/* ─────────────────────────── Five Element Wheel ─────────────────────────── */

export function FiveElementWheel() {
  const [active, setActive] = useState<Element>("fire");
  const order: Element[] = ["fire", "earth", "metal", "water", "wood"];
  const el = elements[active];

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Five Element Wheel
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-[auto,1fr] sm:items-center">
        <svg viewBox="0 0 200 200" className="mx-auto h-56 w-56">
          {order.map((k, i) => {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const cx = 100 + 70 * Math.cos(angle);
            const cy = 100 + 70 * Math.sin(angle);
            const e = elements[k];
            const isActive = k === active;
            return (
              <g key={k} onClick={() => setActive(k)} className="cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 26 : 22}
                  fill={e.color}
                  stroke={isActive ? "var(--gold)" : "transparent"}
                  strokeWidth="2"
                  opacity={isActive ? 1 : 0.78}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  className="fill-white text-[9px] font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {e.label}
                </text>
              </g>
            );
          })}
          {/* generating cycle arrows */}
          {order.map((_, i) => {
            const a1 = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const a2 = (Math.PI * 2 * ((i + 1) % 5)) / 5 - Math.PI / 2;
            const x1 = 100 + 50 * Math.cos(a1);
            const y1 = 100 + 50 * Math.sin(a1);
            const x2 = 100 + 50 * Math.cos(a2);
            const y2 = 100 + 50 * Math.sin(a2);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--gold)"
                strokeOpacity="0.4"
                strokeWidth="0.6"
              />
            );
          })}
        </svg>

        <dl className="space-y-1.5 text-sm">
          <Row k="Element" v={el.label} />
          <Row k="Season" v={el.season} />
          <Row k="Yin organ" v={el.yinOrgan} />
          <Row k="Yang organ" v={el.yangOrgan} />
          <Row k="Sense / Window" v={el.sense} />
          <Row k="Healing sound" v={el.sound} />
          <Row k="Negative" v={el.emotionNeg} />
          <Row k="Positive" v={el.emotionPos} />
          <Row k="Spirit" v={el.spirit} />
          <Row k="Virtue" v={el.virtue} />
        </dl>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right text-foreground">{v}</dd>
    </div>
  );
}

/* ─────────────────────────── Healing Sounds Player ─────────────────────────── */

export function HealingSoundsPlayer() {
  const [idx, setIdx] = useState(0);
  const [reps, setReps] = useState(0);
  const [running, setRunning] = useState(false);
  const target = 6;
  const phase = useBreathCycle(6);
  const sound = healingSounds[idx];

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setReps((r) => {
        if (r + 1 >= target) {
          if (idx < healingSounds.length - 1) {
            setIdx((i) => i + 1);
            return 0;
          }
          setRunning(false);
          return r + 1;
        }
        return r + 1;
      });
    }, 6000);
    return () => clearInterval(t);
  }, [running, idx, target]);

  const el = elements[sound.element as Element];
  const inhale = phase < 0.5;

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Six Healing Sounds · {idx + 1} / {healingSounds.length}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: el.color, opacity: inhale ? 0.7 : 1, transition: "all 1.5s" }}
        >
          <span className="text-xs font-medium">{el.label}</span>
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-2xl text-primary">{sound.organ}</h4>
          <p className="mt-1 font-mono text-lg tracking-widest text-gold">
            {sound.sound}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {sound.color} energy exits {sound.exit}.
          </p>
        </div>
      </div>

      <p className="mt-4 text-center font-serif text-lg text-foreground">
        {inhale ? "Inhale, focus on the organ" : "Exhale, release the sound"}
      </p>
      <div className="mt-2 flex justify-center gap-1.5">
        {Array.from({ length: target }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-6 rounded-full",
              i < reps ? "bg-gold" : "bg-secondary/60",
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <Button size="sm" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Begin"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setReps(0);
            if (idx < healingSounds.length - 1) setIdx((i) => i + 1);
          }}
        >
          <SkipForward className="h-4 w-4" /> Skip
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setIdx(0);
            setReps(0);
            setRunning(false);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Collection Points (torso) ─────────────────────────── */

const collectionPoints = [
  { id: 1, label: "Perineum",        x: 50, y: 92, organ: "Kidneys", emotion: "Fear",    sense: "Ears" },
  { id: 2, label: "Centre of Chest", x: 50, y: 32, organ: "Heart",   emotion: "Anxiety", sense: "Tongue" },
  { id: 3, label: "Right of Navel",  x: 66, y: 56, organ: "Liver",   emotion: "Anger",   sense: "Eyes" },
  { id: 4, label: "Left of Navel",   x: 34, y: 56, organ: "Lungs",   emotion: "Grief",   sense: "Nose" },
  { id: 5, label: "Below Left Ribs", x: 40, y: 48, organ: "Spleen",  emotion: "Worry",   sense: "Mouth" },
];

export function CollectionPointsWidget() {
  const [active, setActive] = useState(1);
  const cur = collectionPoints.find((p) => p.id === active)!;
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Five Collection Points
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-[auto,1fr] sm:items-center">
        <svg viewBox="0 0 100 100" className="mx-auto h-64 w-44">
          {/* simplified torso silhouette */}
          <path
            d="M40 8 q10 -6 20 0 q4 4 2 10 q8 6 8 18 v34 q0 8 -4 14 l-6 12 h-20 l-6 -12 q-4 -6 -4 -14 v-34 q0 -12 8 -18 q-2 -6 2 -10z"
            fill="var(--secondary)"
            opacity="0.35"
            stroke="var(--gold)"
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
          {collectionPoints.map((p) => (
            <g key={p.id} onClick={() => setActive(p.id)} className="cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r={p.id === active ? 4 : 2.5}
                fill={p.id === active ? "var(--gold)" : "var(--primary)"}
              />
              <text
                x={p.x + 6}
                y={p.y + 1.5}
                className="fill-foreground text-[3.2px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {p.id}
              </text>
            </g>
          ))}
        </svg>

        <div className="text-sm">
          <h4 className="font-serif text-2xl text-primary">{cur.label}</h4>
          <p className="mt-2 text-muted-foreground">
            Collection point for{" "}
            <span className="text-foreground">{cur.emotion}</span> /{" "}
            <span className="text-foreground">{cur.organ}</span>.
          </p>
          <p className="mt-2 text-muted-foreground">
            Replace cleared Qi by drawing fresh in through the{" "}
            <span className="text-foreground">{cur.sense}</span>.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Sequence: organ → collection point → Ba Gua at navel → vortex →
            fresh Qi in through the sense Window. Always close.
          </p>
          <div className="mt-3 flex gap-1">
            {collectionPoints.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={cn(
                  "h-7 w-7 rounded-full border text-xs",
                  p.id === active
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border text-muted-foreground hover:border-gold/60",
                )}
              >
                {p.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Virtues Wheel ─────────────────────────── */

export function VirtuesWheel() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Five Virtues, Spirit Level
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(["wood", "fire", "earth", "metal", "water"] as Element[]).map((k) => {
          const e = elements[k];
          return (
            <div
              key={k}
              className="rounded-lg border border-border/60 p-3"
              style={{ background: `${e.color}14` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: e.color }}
                />
                <p className="font-serif text-base text-primary">{e.yinOrgan}</p>
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {e.spirit} · {e.virtue}
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                {e.emotionNeg} → {e.emotionPos}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── Orbits (Micro / Macro / Chong / Dai / Heaven-Earth) ─────────────────────────── */

function FigurePath({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 320" className="mx-auto h-80 w-auto">
      <defs>
        <radialGradient id="aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="320" fill="url(#aura)" />
      {/* silhouette */}
      <path
        d="M100 16 q-12 0 -14 14 q-2 12 4 18 q-14 8 -16 28 v40 q0 6 4 12 l-4 60 q0 8 2 14 l-8 70 q-1 8 4 12 q5 4 12 4 q3 0 4 -4 l4 -76 q1 -6 4 -6 q3 0 4 6 l4 76 q1 4 4 4 q7 0 12 -4 q5 -4 4 -12 l-8 -70 q2 -6 2 -14 l-4 -60 q4 -6 4 -12 v-40 q-2 -20 -16 -28 q6 -6 4 -18 q-2 -14 -14 -14z"
        fill="var(--secondary)"
        opacity="0.25"
        stroke="var(--gold)"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
      {children}
    </svg>
  );
}

export function MicrocosmicOrbit() {
  // Animated dot travels around the orbit
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (n: number) => {
      setT((((n - start) / 12000) % 1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // simple ellipse approximating orbit
  const cx = 100;
  const cy = 160;
  const rx = 22;
  const ry = 130;
  const angle = -Math.PI / 2 + t * Math.PI * 2;
  const x = cx + rx * Math.cos(angle);
  const y = cy + ry * Math.sin(angle);

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Microcosmic Orbit
      </p>
      <FigurePath>
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.85"
        />
        {/* stations */}
        {[
          { y: 30,  label: "Bai Hui" },
          { y: 76,  label: "Yin Tang" },
          { y: 140, label: "Shan Zhong" },
          { y: 180, label: "Qi Hai" },
          { y: 230, label: "Ming Men", side: -1 },
          { y: 290, label: "Hui Yin" },
        ].map((s, i) => (
          <g key={i}>
            <circle cx={cx + (s.side ?? 1) * (i % 2 ? rx : -rx)} cy={s.y} r="2.4" fill="var(--primary)" />
            <text x={cx + 30} y={s.y + 2} className="fill-muted-foreground text-[7px]">{s.label}</text>
          </g>
        ))}
        <circle cx={x} cy={y} r="5" fill="var(--gold)">
          <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
        </circle>
      </FigurePath>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Tongue to palate. Up the spine (Du Mai), down the front (Ren Mai).
      </p>
    </div>
  );
}

export function MacrocosmicOrbit() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Macrocosmic Orbit
      </p>
      <FigurePath>
        <ellipse cx="100" cy="160" rx="22" ry="130" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* legs */}
        <path d="M90 220 Q70 260 84 305" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 3" />
        <path d="M110 220 Q130 260 116 305" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 3" />
        {/* arms */}
        <path d="M88 130 Q60 180 50 230" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 3" />
        <path d="M112 130 Q140 180 150 230" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 3" />
        {/* points */}
        <circle cx="100" cy="24" r="3" fill="var(--gold)" /><text x="106" y="26" className="fill-muted-foreground text-[7px]">Bai Hui</text>
        <circle cx="50" cy="232" r="3" fill="var(--gold)" /><text x="20" y="234" className="fill-muted-foreground text-[7px]">Laogong</text>
        <circle cx="150" cy="232" r="3" fill="var(--gold)" /><text x="156" y="234" className="fill-muted-foreground text-[7px]">Laogong</text>
        <circle cx="84" cy="307" r="3" fill="var(--gold)" /><text x="40" y="318" className="fill-muted-foreground text-[7px]">Yongquan</text>
        <circle cx="116" cy="307" r="3" fill="var(--gold)" /><text x="122" y="318" className="fill-muted-foreground text-[7px]">Yongquan</text>
      </FigurePath>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Heaven (crown) ↔ Human (core) ↔ Earth (soles). Arms branch from the chest.
      </p>
    </div>
  );
}

export function ChongMaiColumn() {
  const phase = useBreathCycle(8);
  const inhale = phase < 0.5;
  const e = 0.5 - Math.cos(phase * Math.PI * 2) / 2;
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Chong Mai, Central Column
      </p>
      <FigurePath>
        <line x1="100" y1="20" x2="100" y2="300" stroke="var(--gold)" strokeWidth="2" />
        {[
          { y: 86, label: "Upper Dan Tian" },
          { y: 160, label: "Middle Dan Tian" },
          { y: 220, label: "Lower Dan Tian" },
        ].map((d) => (
          <g key={d.y}>
            <circle cx="100" cy={d.y} r="8" fill="var(--gold)" opacity="0.35" />
            <circle cx="100" cy={d.y} r="4" fill="var(--gold)" />
            <text x="114" y={d.y + 2} className="fill-muted-foreground text-[7px]">{d.label}</text>
          </g>
        ))}
        {/* pulse */}
        <circle
          cx="100"
          cy={inhale ? 300 - e * 280 : 20 + e * 280}
          r="6"
          fill="var(--gold)"
          opacity="0.9"
        />
      </FigurePath>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {inhale ? "Inhale, rising" : "Exhale, descending"} · Hui Yin ↔ Bai Hui
      </p>
    </div>
  );
}

export function DaiMaiRings() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Dai Mai, The Belt
      </p>
      <FigurePath>
        {[170, 195, 220].map((y, i) => (
          <ellipse
            key={y}
            cx="100"
            cy={y}
            rx={32 - i * 2}
            ry="7"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            opacity={0.6 + i * 0.12}
          >
            <animate attributeName="rx" values={`${32 - i * 2};${36 - i * 2};${32 - i * 2}`} dur="4s" repeatCount="indefinite" />
          </ellipse>
        ))}
      </FigurePath>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Horizontal bands stack at the waist, the only horizontal channel.
      </p>
    </div>
  );
}

export function HeavenEarth() {
  const phase = useBreathCycle(8);
  const inhale = phase < 0.5;
  const e = 0.5 - Math.cos(phase * Math.PI * 2) / 2;
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        Drawing In Heaven &amp; Earth
      </p>
      <FigurePath>
        {/* Heaven down */}
        <g>
          <circle cx="100" cy={inhale ? 4 + e * 200 : 4} r="4" fill="var(--gold)" />
          <text x="106" y="10" className="fill-muted-foreground text-[7px]">Heaven · Bai Hui</text>
        </g>
        {/* Earth up */}
        <g>
          <circle cx="100" cy={inhale ? 316 - e * 200 : 316} r="4" fill="var(--primary)" />
          <text x="106" y="316" className="fill-muted-foreground text-[7px]">Earth · Yongquan</text>
        </g>
        <circle cx="100" cy="220" r={10 + e * 8} fill="var(--gold)" opacity="0.6" />
        <text x="114" y="222" className="fill-muted-foreground text-[7px]">Lower Dan Tian</text>
      </FigurePath>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {inhale ? "Inhale, both currents descending and rising to meet" : "Settle and overflow up the Chong Mai"}
      </p>
    </div>
  );
}

/* ─────────────────────────── Points Table ─────────────────────────── */

export function PointsTable() {
  const [filter, setFilter] = useState<"all" | "primary" | "secondary">("all");
  const rows = useMemo(
    () => eightExtras.filter((e) => (filter === "all" ? true : e.group === filter)),
    [filter],
  );
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Master &amp; Coupled Points
        </p>
        <div className="flex gap-1 text-xs">
          {(["all", "primary", "secondary"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 capitalize",
                filter === f
                  ? "border-gold bg-gold/10 text-primary"
                  : "border-border text-muted-foreground hover:border-gold/60",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="px-2 py-2 text-left">Channel</th>
              <th className="px-2 py-2 text-left">Master</th>
              <th className="px-2 py-2 text-left">Coupled</th>
              <th className="px-2 py-2 text-left">Pair</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/30">
                <td className="px-2 py-2">
                  <p className="font-serif text-base text-primary">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.english}</p>
                </td>
                <td className="px-2 py-2 font-mono text-xs">{r.master}</td>
                <td className="px-2 py-2 font-mono text-xs">{r.coupled}</td>
                <td className="px-2 py-2 text-xs text-muted-foreground">{r.pair}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────── Eight Extras Map (overview) ─────────────────────────── */

export function EightExtrasMap() {
  const [active, setActive] = useState<string>("du");
  const cur = eightExtras.find((e) => e.id === active)!;
  const { courseSlug } = useParams({ strict: false });

  // Maps the overview map's short ids to the interactive chart route slugs.
  const chartSlugs: Record<string, string> = {
    du: "du-mai",
    ren: "ren-mai",
    dai: "dai-mai",
    chong: "chong-mai",
    yangqiao: "yang-qiao-mai",
    yinqiao: "yin-qiao-mai",
    yangwei: "yang-wei-mai",
    yinwei: "yin-wei-mai",
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex flex-wrap gap-1.5">
        {eightExtras.map((e) => (
          <button
            key={e.id}
            onClick={() => setActive(e.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              e.id === active
                ? "border-gold bg-gold/10 text-primary"
                : "border-border text-muted-foreground hover:border-gold/60",
            )}
          >
            {e.name}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          {cur.group === "primary" ? "Primary set · torso" : "Secondary set · limbs"}
        </p>
        <h4 className="mt-1 font-serif text-2xl text-primary">{cur.name}</h4>
        <p className="text-sm text-muted-foreground">{cur.english}</p>
        <p className="mt-3 text-sm text-foreground/80">{cur.note}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div><dt className="text-muted-foreground">Master</dt><dd className="font-mono">{cur.master}</dd></div>
          <div><dt className="text-muted-foreground">Coupled</dt><dd className="font-mono">{cur.coupled}</dd></div>
          <div className="col-span-2"><dt className="text-muted-foreground">Pairs with</dt><dd>{cur.pair}</dd></div>
        </dl>
        {courseSlug && (
          <Link
            to="/pathways/daoist/$courseSlug/meridians/$meridianSlug"
            params={{ courseSlug, meridianSlug: chartSlugs[cur.id] }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-gold/15"
          >
            <Sparkles className="h-3.5 w-3.5" /> Open the {cur.name} interactive chart
          </Link>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── Quiz ─────────────────────────── */

export function Quiz({
  questions,
  onScore,
}: {
  questions: { q: string; options: string[]; answer: number; explain: string }[];
  onScore?: (pct: number) => void;
}) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const correct = submitted
    ? questions.filter((q, i) => picks[i] === q.answer).length
    : 0;

  useEffect(() => {
    if (submitted) onScore?.(Math.round((correct / questions.length) * 100));
  }, [submitted, correct, questions.length, onScore]);

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-lg border border-border/60 bg-card/60 p-4">
          <p className="font-serif text-base text-foreground">
            {qi + 1}. {q.q}
          </p>
          <div className="mt-3 space-y-1.5">
            {q.options.map((opt, oi) => {
              const picked = picks[qi] === oi;
              const isAnswer = q.answer === oi;
              const showRight = submitted && isAnswer;
              const showWrong = submitted && picked && !isAnswer;
              return (
                <button
                  key={oi}
                  onClick={() => !submitted && setPicks((p) => ({ ...p, [qi]: oi }))}
                  className={cn(
                    "block w-full rounded-md border px-3 py-2 text-left text-sm transition",
                    picked && !submitted && "border-gold/60 bg-gold/10",
                    !picked && !submitted && "border-border hover:border-gold/40",
                    showRight && "border-emerald-500/60 bg-emerald-500/10",
                    showWrong && "border-rose-500/60 bg-rose-500/10",
                    submitted && !picked && !isAnswer && "opacity-60",
                  )}
                  disabled={submitted}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-2 text-xs text-muted-foreground">{q.explain}</p>
          )}
        </div>
      ))}

      {!submitted ? (
        <Button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(picks).length < questions.length}
        >
          Check answers
        </Button>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-gold/40 bg-gold/10 px-4 py-3">
          <p className="font-serif text-base text-foreground">
            {correct} / {questions.length} correct
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPicks({});
              setSubmitted(false);
            }}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Journal ─────────────────────────── */

export function JournalEntry({
  value,
  onChange,
  prompts,
}: {
  value: string;
  onChange: (v: string) => void;
  prompts: string[];
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Journal</p>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {prompts.map((p, i) => (
          <li key={i}>· {p}</li>
        ))}
      </ul>
      <textarea
        ref={ta}
        className="mt-3 w-full min-h-[140px] rounded-md border border-border/60 bg-background/60 p-3 text-sm focus:border-gold/60 focus:outline-none"
        placeholder="Write what you noticed…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Saved automatically to this device.
      </p>
    </div>
  );
}
