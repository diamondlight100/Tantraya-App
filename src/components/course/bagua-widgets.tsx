import { useState } from "react";
import { cn } from "@/lib/utils";

/* ───────────────────────── Nine Joints ───────────────────────── */

const NINE_JOINTS = [
  { id: "ankles", label: "Ankles", note: "The root of every rotation — if these are locked, nothing above them moves honestly." },
  { id: "knees", label: "Knees", note: "Rotate gently within their safe range only. Never forced, never loaded while turning." },
  { id: "kua", label: "Kua / Hips", note: "Where opening and closing actually happens. Most of the leg-foundation work lives here." },
  { id: "waist", label: "Waist", note: "The hinge between the leg work below and the spiral that travels upward." },
  { id: "shoulders", label: "Shoulders", note: "Wrap inward rather than shrug — this is where the back's rounding continues outward." },
  { id: "elbows", label: "Elbows", note: "Stay heavy and connected; an elbow that floats breaks the coiling line to the hand." },
  { id: "wrists", label: "Wrists", note: "The last joint the spiral reaches before it expresses through the palm." },
  { id: "neck", label: "Neck", note: "Kept alive and unlocked — this is what lets the head gently lift along the Chong Mai line." },
  { id: "spine", label: "Spine (as a whole)", note: "Not one joint but the sum of all of them — the line the rotation is ultimately organizing." },
] as const;

export function NineJointsWheel() {
  const [active, setActive] = useState<string>(NINE_JOINTS[0].id);
  const activeJoint = NINE_JOINTS.find((j) => j.id === active)!;

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Nine joint rotations</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tap a joint. This is a working reference — adjust the order or list to match exactly how you sequence it live.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-9">
        {NINE_JOINTS.map((j) => (
          <button
            key={j.id}
            onClick={() => setActive(j.id)}
            className={cn(
              "rounded-lg border px-2 py-3 text-center text-[11px] leading-tight transition",
              active === j.id
                ? "border-gold bg-gold/15 text-primary"
                : "border-border/60 text-muted-foreground hover:border-gold/40",
            )}
          >
            {j.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-gold/40 bg-gold/5 p-4">
        <p className="font-serif text-lg text-primary">{activeJoint.label}</p>
        <p className="mt-1 text-sm text-foreground/80">{activeJoint.note}</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Polarity flip cards ───────────────────────── */

const POLARITY_PAIRS: Record<string, { front: string; back: string }[]> = {
  orientation: [
    { front: "One hand advances", back: "…while the other withdraws." },
    { front: "One aspect rises", back: "…while the other sinks." },
    { front: "The head lifts", back: "…while the tailbone drops away from it." },
    { front: "Fascia stretches taut", back: "…while the muscle underneath stays relaxed." },
  ],
  "coiling-palms": [
    { front: "The hand goes hard", back: "…meeting or expressing force." },
    { front: "The hand goes soft", back: "…yielding, listening, transforming." },
    { front: "Never fixed one way", back: "Hard, soft, hard again — according to what's in front of it." },
  ],
};

export function PolarityCards({ topicSlug }: { topicSlug: string }) {
  const pairs = POLARITY_PAIRS[topicSlug] ?? POLARITY_PAIRS.orientation;
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Yin / Yang, held together</p>
      <p className="mt-1 text-xs text-muted-foreground">Tap a card to see its other half.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {pairs.map((p, i) => (
          <button
            key={i}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            className="rounded-xl border border-border/60 bg-background/40 p-4 text-left transition hover:border-gold/50"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {flipped[i] ? "Completes as" : "Begins as"}
            </p>
            <p className="mt-1 font-serif text-lg text-primary">
              {flipped[i] ? p.back : p.front}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Cheng lines path ───────────────────────── */

const CHENG_LINE_STOPS = [
  { n: 1, label: "Kai Zhang — Opening Palm", note: "Splitting and dividing open an opponent's defense." },
  { n: 2, label: "Chuan Zhang — Piercing Palm", note: "Penetrating straight through a gap." },
  { n: 3, label: "Tiao Zhang — Lifting Palm", note: "Deflecting upward, unrooting from underneath." },
  { n: 4, label: "Dai Zhang — Pulling Palm", note: "Striking while dragging incoming momentum off balance." },
  { n: 5, label: "Tui Zhang — Pushing Palm", note: "Forward power projected through the whole body." },
  { n: 6, label: "Pi Zhang — Splitting Palm", note: "A descending, axe-like drop that clears a low attack." },
  { n: 7, label: "Bao Zhang — Embracing Palm", note: "Closing distance, wrapping, controlling the core." },
  { n: 8, label: "Fan Zhang — Overturning Palm", note: "A sudden reversal, releasing with a twisting or spiraling strike." },
];

export function ChengLinesPath() {
  const [active, setActive] = useState(1);
  const stop = CHENG_LINE_STOPS.find((s) => s.n === active)!;

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The eight lines, Kai through Fan</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Kou Bu and Bai Bu are the stepping that carries the body through these lines — they aren't lines themselves, so they aren't on this dial.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CHENG_LINE_STOPS.map((s) => (
          <button
            key={s.n}
            onClick={() => setActive(s.n)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-serif transition",
              active === s.n
                ? "border-gold bg-gold text-background"
                : "border-border/60 text-muted-foreground hover:border-gold/50",
            )}
          >
            {s.n}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-gold/40 bg-gold/5 p-4">
        <p className="font-serif text-lg text-primary">{stop.label}</p>
        <p className="mt-1 text-sm text-foreground/80">{stop.note}</p>
      </div>
    </div>
  );
}
