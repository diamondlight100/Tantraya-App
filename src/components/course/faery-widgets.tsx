import { useState } from "react";
import { cn } from "@/lib/utils";

/* ───────────────────────── Three Souls Explorer ───────────────────────── */

const souls = [
  {
    key: "fetch",
    label: "The Fetch",
    sub: "Animal · Instinct · Body",
    body: "The Fetch is your animal self, appetite, fear, desire, the body's own knowing. It speaks in sensation, never in sentences.",
    color: "from-rose-500/30 to-rose-500/5",
    ring: "ring-rose-500/60",
  },
  {
    key: "talker",
    label: "The Talker",
    sub: "Daily · Voice · Story",
    body: "The Talker is the everyday narrating self, the one reading this. It mediates, names, and chooses. It can lie. It can also tell the truth.",
    color: "from-amber-500/30 to-amber-500/5",
    ring: "ring-amber-500/60",
  },
  {
    key: "watcher",
    label: "The Watcher",
    sub: "Witness · Sky · Higher self",
    body: "The Watcher rests above the crown. It does not interfere. It sees the long pattern. In Faery work, it is the soul that remembers why you came.",
    color: "from-sky-500/30 to-sky-500/5",
    ring: "ring-sky-500/60",
  },
];

export function ThreeSoulsExplorer() {
  const [active, setActive] = useState(1);
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Three Souls</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Tap each soul to feel into it. Notice which one answered first.
      </p>

      <div className="mt-5 flex flex-col items-center gap-3">
        {souls.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            className={cn(
              "w-full max-w-md rounded-full border bg-gradient-to-r px-5 py-3 text-left transition",
              s.color,
              active === i ? `ring-2 ${s.ring} border-transparent` : "border-border/60 opacity-70 hover:opacity-100",
            )}
          >
            <p className="font-serif text-lg text-primary">{s.label}</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.sub}</p>
          </button>
        ))}
      </div>

      <p className="mt-5 border-l-2 border-gold/60 pl-4 text-sm italic text-foreground/85">
        {souls[active].body}
      </p>
    </div>
  );
}

/* ───────────────────────── Four Directions Wheel ───────────────────────── */

const dirs = [
  { k: "E", label: "East",  ele: "Air",   gift: "Thought · Beginnings",  angle: 0 },
  { k: "S", label: "South", ele: "Fire",  gift: "Action · Will",         angle: 90 },
  { k: "W", label: "West",  ele: "Water", gift: "Feeling · Memory",      angle: 180 },
  { k: "N", label: "North", ele: "Earth", gift: "Endurance · Bone",      angle: 270 },
];

export function FourDirectionsWheel() {
  const [active, setActive] = useState(0);
  const cx = 160, cy = 160, r = 110;
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Four Directions</p>
      <div className="mt-3 flex flex-col items-center gap-4 md:flex-row md:items-start">
        <svg viewBox="0 0 320 320" className="h-64 w-64">
          <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" className="text-gold/40" strokeWidth="1" />
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="currentColor" className="text-border" strokeWidth="0.5" />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="currentColor" className="text-border" strokeWidth="0.5" />
          {dirs.map((d, i) => {
            const rad = (d.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * r;
            const y = cy + Math.sin(rad) * r;
            return (
              <g key={d.k} onClick={() => setActive(i)} className="cursor-pointer">
                <circle cx={x} cy={y} r={active === i ? 26 : 20} className={cn("transition-all", active === i ? "fill-gold" : "fill-card stroke-gold/60")} strokeWidth="1.5" />
                <text x={x} y={y + 5} textAnchor="middle" className={cn("font-serif text-base", active === i ? "fill-gold-foreground" : "fill-primary")}>
                  {d.k}
                </text>
              </g>
            );
          })}
          <text x={cx} y={cy + 6} textAnchor="middle" className="fill-muted-foreground text-[10px] uppercase tracking-[0.3em]">
            wheel
          </text>
        </svg>
        <div className="flex-1">
          <p className="font-serif text-2xl text-primary">{dirs[active].label}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{dirs[active].ele}</p>
          <p className="mt-2 text-sm text-foreground/80">{dirs[active].gift}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Click each cardinal to call it. In ritual, name the direction aloud and one ancestor or ally who teaches its gift.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Eight-Step Journey ───────────────────────── */

const journeySteps = [
  { t: "Ground", d: "Roots into the earth. Three breaths." },
  { t: "Cast",   d: "Open sacred space sunwise." },
  { t: "Call the ally", d: "Speak the name aloud." },
  { t: "Descend through the hedge", d: "Push gently through the green wall." },
  { t: "Meet the guardian", d: "Bow. Wait. Listen." },
  { t: "Cross", d: "Pass only when the answer is yes." },
  { t: "Receive", d: "Take only what is offered." },
  { t: "Return", d: "Every gate, in reverse." },
];

export function EightStepJourney() {
  const [reached, setReached] = useState(0);
  const [returning, setReturning] = useState(false);

  const forward = () => {
    if (reached < journeySteps.length - 1) setReached((r) => r + 1);
    else setReturning(true);
  };
  const back = () => {
    if (reached > 0) setReached((r) => r - 1);
    else setReturning(false);
  };
  const reset = () => { setReached(0); setReturning(false); };

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
        {returning ? "Returning" : "Crossing"} · Step {reached + 1} of 8
      </p>
      <h4 className="mt-2 font-serif text-2xl text-primary">{journeySteps[reached].t}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{journeySteps[reached].d}</p>

      <ol className="mt-4 grid grid-cols-8 gap-1">
        {journeySteps.map((_, i) => (
          <li
            key={i}
            className={cn(
              "h-2 rounded-full transition-all",
              i < reached && "bg-gold/70",
              i === reached && "bg-gold",
              i > reached && "bg-border",
            )}
          />
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <button onClick={back} className="rounded-md border border-border/60 px-3 py-1.5 hover:border-gold/60">
          ← Back
        </button>
        <button onClick={forward} className="rounded-md bg-gold px-3 py-1.5 text-gold-foreground hover:opacity-90">
          {reached === journeySteps.length - 1 && !returning ? "Begin return" : "Next →"}
        </button>
        <button onClick={reset} className="rounded-md border border-border/60 px-3 py-1.5 text-muted-foreground hover:border-gold/60">
          Reset
        </button>
      </div>
      <p className="mt-3 text-[11px] italic text-muted-foreground">
        Never leave a step behind on the return. The same gates, in reverse order.
      </p>
    </div>
  );
}

/* ───────────────────────── Thunder Cross Builder ───────────────────────── */

export function ThunderCrossBuilder() {
  const [winds, setWinds] = useState(0); // 0..9
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Thunder Cross · {winds}/9 winds</p>
      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
        <svg viewBox="0 0 200 200" className="h-48 w-48">
          {/* Two sticks */}
          <rect x="20" y="92" width="160" height="16" rx="6" className="fill-amber-900/70" />
          <rect x="92" y="20" width="16" height="160" rx="6" className="fill-amber-900/70" />
          {/* Red thread winds, animated by count */}
          {Array.from({ length: winds }).map((_, i) => {
            const r = 18 + i * 2.5;
            const angle = i * 40;
            return (
              <circle
                key={i}
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke="hsl(0 75% 45%)"
                strokeWidth="1.2"
                strokeDasharray="6 3"
                transform={`rotate(${angle} 100 100)`}
                opacity={0.85}
              />
            );
          })}
          <circle cx="100" cy="100" r="6" className="fill-gold" />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-foreground/85">
            Add red thread sunwise, nine winds in each direction. With each wind, name what the cross is to refuse.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setWinds((w) => Math.min(9, w + 1))}
              className="rounded-md bg-gold px-3 py-1.5 text-xs text-gold-foreground hover:opacity-90"
            >
              + Wind
            </button>
            <button
              onClick={() => setWinds(0)}
              className="rounded-md border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60"
            >
              Reset
            </button>
          </div>
          {winds === 9 && (
            <p className="mt-3 border-l-2 border-gold pl-3 text-xs italic text-gold">
              Bound. Hold to your heart, speak what it welcomes, and set it above the door.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
