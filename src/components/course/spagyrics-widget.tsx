import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  COLOR_PHASES,
  OPERATIONS,
  ESSENTIALS,
  type ColorPhase,
  type Operation,
  type Essential,
} from "@/data/magick/spagyrics";

type Selection =
  | { type: "operation"; key: string }
  | { type: "essential"; key: string }
  | { type: "phase"; key: ColorPhase }
  | null;

const PHASE_COLOR: Record<ColorPhase, string> = {
  nigredo: "#2b2b2b",
  albedo: "#e8e6e0",
  citrinitas: "#d9a441",
  rubedo: "#a3272c",
};

const PHASE_TEXT_ON_DARK: Record<ColorPhase, boolean> = {
  nigredo: true,
  albedo: false,
  citrinitas: false,
  rubedo: true,
};

function OperationDetail({ op }: { op: Operation }) {
  const phase = COLOR_PHASES.find((p) => p.key === op.colorPhase)!;
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold shadow-inner"
          style={{
            background: PHASE_COLOR[op.colorPhase],
            color: PHASE_TEXT_ON_DARK[op.colorPhase] ? "#f5f0e6" : "#1a1a1a",
          }}
        >
          {op.number}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
            Operation {op.number} · {phase.name}
          </p>
          <h3 className="font-serif text-2xl text-primary leading-tight">{op.name}</h3>
        </div>
      </div>

      <p className="mt-3 text-sm italic text-muted-foreground">{op.tagline}</p>

      <div className="mt-4 rounded-lg border border-border/50 bg-secondary/20 p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">On the bench</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{op.materials}</p>
      </div>

      <div className="mt-3 rounded-lg border border-gold/30 bg-gold/5 p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">In the psyche</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{op.psychological}</p>
      </div>
    </div>
  );
}

function EssentialDetail({ e }: { e: Essential }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-lg text-gold">
          {e.symbol}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Corresponds to {e.corresponds}</p>
          <h3 className="font-serif text-2xl text-primary leading-tight">
            {e.name} <span className="text-base text-muted-foreground">— {e.latin}</span>
          </h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{e.description}</p>
      <div className="mt-3 rounded-lg border border-border/50 bg-secondary/20 p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Where it comes from in distillation</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{e.extraction}</p>
      </div>
    </div>
  );
}

function PhaseDetail({ phase }: { phase: (typeof COLOR_PHASES)[number] }) {
  const members = OPERATIONS.filter((o) => o.colorPhase === phase.key);
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-8 w-8 shrink-0 rounded-full border border-white/20 shadow-inner"
          style={{ background: PHASE_COLOR[phase.key] }}
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Colour phase</p>
          <h3 className="font-serif text-2xl text-primary leading-tight">
            {phase.name} <span className="text-base text-muted-foreground">— {phase.meaning}</span>
          </h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{phase.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {members.map((m) => (
          <span
            key={m.key}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-xs text-foreground/80"
          >
            <span className="text-[10px] font-bold text-gold">{m.number}</span> {m.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SpagyricsWidget() {
  const [selection, setSelection] = useState<Selection>(null);

  const highlightedOps = useMemo(() => {
    if (selection?.type === "phase") {
      return new Set(OPERATIONS.filter((o) => o.colorPhase === selection.key).map((o) => o.key));
    }
    return new Set<string>();
  }, [selection]);

  return (
    <div className="rounded-2xl border border-gold/40 bg-card/60 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="mr-2 text-[10px] uppercase tracking-[0.3em] text-gold">Jump to a colour phase</p>
        {COLOR_PHASES.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelection({ type: "phase", key: p.key })}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
              selection?.type === "phase" && selection.key === p.key
                ? "border-gold bg-gold/15 text-primary"
                : "border-border/50 text-muted-foreground hover:border-gold/50 hover:text-primary",
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full border border-white/20" style={{ background: PHASE_COLOR[p.key] }} />
            {p.name}
          </button>
        ))}
        {selection && (
          <button
            onClick={() => setSelection(null)}
            className="ml-auto rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold/50 hover:text-primary"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* The seven Operations, in order, plus the three Essentials */}
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
            The Seven Operations of the Great Work
          </p>
          <div className="flex flex-col gap-1.5">
            {OPERATIONS.map((op) => {
              const isSelected = selection?.type === "operation" && selection.key === op.key;
              const isHighlighted = highlightedOps.has(op.key);
              const dimmed = selection && selection.type === "phase" && !isHighlighted;
              return (
                <button
                  key={op.key}
                  onClick={() => setSelection({ type: "operation", key: op.key })}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition",
                    isSelected ? "border-gold bg-gold/10" : "border-border/50 hover:border-gold/50",
                    dimmed && "opacity-35",
                  )}
                >
                  <span
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] font-bold"
                    style={{
                      background: PHASE_COLOR[op.colorPhase],
                      color: PHASE_TEXT_ON_DARK[op.colorPhase] ? "#f5f0e6" : "#1a1a1a",
                    }}
                  >
                    {op.number}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-base leading-tight text-primary">{op.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{op.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mb-2 mt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
            The Three Essentials
          </p>
          <div className="flex flex-wrap gap-2">
            {ESSENTIALS.map((e) => {
              const isSelected = selection?.type === "essential" && selection.key === e.key;
              return (
                <button
                  key={e.key}
                  onClick={() => setSelection({ type: "essential", key: e.key })}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                    isSelected ? "border-gold bg-gold/10 text-primary" : "border-border/50 text-foreground/80 hover:border-gold/50",
                  )}
                >
                  <span className="text-base text-gold">{e.symbol}</span>
                  {e.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="min-h-[20rem] rounded-xl border border-border/50 bg-background/40 p-5">
          {!selection && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif text-xl text-primary">Solve et Coagula</p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Click any of the seven Operations for what it means on the bench and what it means in you, click
                Mercury, Sulphur or Salt for the three essentials they recombine, or click a colour phase above
                to see which Operations belong to it.
              </p>
            </div>
          )}
          {selection?.type === "operation" && <OperationDetail op={OPERATIONS.find((o) => o.key === selection.key)!} />}
          {selection?.type === "essential" && <EssentialDetail e={ESSENTIALS.find((e) => e.key === selection.key)!} />}
          {selection?.type === "phase" && <PhaseDetail phase={COLOR_PHASES.find((p) => p.key === selection.key)!} />}
        </div>
      </div>
    </div>
  );
}
