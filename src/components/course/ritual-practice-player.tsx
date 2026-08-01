import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { PracticePhase } from "@/data/magick/egyptian-magick";
import { PracticeVisualCue } from "@/components/course/practice-visuals";

type RitualStep = {
  title: string;
  detail: string;
  seconds?: number;
  visual?: import("@/data/magick/egyptian-magick").PracticeVisual;
  center?: import("@/data/magick/egyptian-magick").BodyCenter;
  phase?: PracticePhase;
};

const PHASES: PracticePhase[] = ["Prepare", "Invoke", "Working", "Integrate", "Close"];

function PhaseBreadcrumb({ current }: { current?: PracticePhase }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {PHASES.map((p, i) => {
        const active = p === current;
        const currentIdx = current ? PHASES.indexOf(current) : -1;
        const passed = currentIdx > i;
        return (
          <div key={p} className="flex items-center gap-1.5">
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] transition-colors",
                active
                  ? "border-gold bg-gold/15 text-gold"
                  : passed
                    ? "border-gold/40 text-gold/60"
                    : "border-border/50 text-muted-foreground/50",
              )}
            >
              {p}
            </span>
            {i < PHASES.length - 1 && (
              <span className={cn("h-px w-3", passed ? "bg-gold/50" : "bg-border/40")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function RitualPracticePlayer({
  steps,
  intro,
  closingLine,
  onFinish,
}: {
  steps: RitualStep[];
  intro?: string;
  closingLine?: string;
  onFinish?: () => void;
}) {
  const [stage, setStage] = useState<"intro" | "running" | "done">("intro");
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [remain, setRemain] = useState(steps[0]?.seconds ?? 60);

  const total = steps.reduce((a, s) => a + (s.seconds ?? 60), 0);
  const totalMinutes = Math.max(1, Math.round(total / 60));
  const done =
    steps.slice(0, idx).reduce((a, s) => a + (s.seconds ?? 60), 0) +
    ((steps[idx]?.seconds ?? 60) - remain);

  useEffect(() => {
    setRemain(steps[idx]?.seconds ?? 60);
  }, [idx, steps]);

  useEffect(() => {
    if (stage !== "running" || !running) return;
    const t = setInterval(() => {
      setRemain((r) => {
        if (r > 1) return r - 1;
        if (idx < steps.length - 1) {
          setIdx((i) => i + 1);
          return steps[idx + 1]?.seconds ?? 60;
        }
        setRunning(false);
        setStage("done");
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, stage, idx, steps]);

  const step = steps[idx];
  const pct = Math.min(100, (done / total) * 100);

  if (stage === "intro") {
    return (
      <div className="rounded-xl border border-gold/30 bg-gradient-to-b from-card/80 to-background/40 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Ritual Practice</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/85">
          {intro ?? "A guided working for this chapter."}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {steps.length} steps · about {totalMinutes} minute{totalMinutes === 1 ? "" : "s"}
        </p>
        <PhaseBreadcrumb current={undefined} />
        <Button
          className="mt-5"
          onClick={() => {
            setStage("running");
            setRunning(true);
            setIdx(0);
          }}
        >
          <Play className="h-4 w-4" /> Begin the working
        </Button>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="rounded-xl border border-gold/30 bg-gradient-to-b from-card/80 to-background/40 p-6 text-center">
        <Sparkles className="mx-auto h-6 w-6 text-gold" />
        <p className="mt-3 font-serif text-xl text-primary">The working is complete</p>
        <p className="mx-auto mt-2 max-w-md whitespace-pre-line text-sm text-foreground/85">
          {closingLine ?? "Let the practice settle. Return to it whenever you need to."}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIdx(0);
              setRemain(steps[0]?.seconds ?? 60);
              setStage("intro");
              setRunning(false);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Do it again
          </Button>
          {onFinish && (
            <Button size="sm" onClick={onFinish}>
              Reflect on it <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/30 bg-card/70 p-5">
      <PhaseBreadcrumb current={step?.phase} />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Step {idx + 1} of {steps.length}
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          {String(Math.floor(remain / 60)).padStart(1, "0")}:
          {String(remain % 60).padStart(2, "0")}
        </p>
      </div>

      <h4 className="mt-2 text-center font-serif text-2xl text-primary">{step?.title}</h4>

      <PracticeVisualCue visual={step?.visual} center={step?.center} />

      <p className="mt-3 whitespace-pre-line text-center text-sm text-muted-foreground">
        {step?.detail}
      </p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <div
          className="h-full bg-gradient-to-r from-gold/70 to-gold transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button onClick={() => setRunning((r) => !r)} size="sm">
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Resume"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (idx < steps.length - 1) {
              setIdx((i) => i + 1);
            } else {
              setRunning(false);
              setStage("done");
            }
          }}
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
            setStage("intro");
          }}
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </Button>
      </div>
    </div>
  );
}
