import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronUp, ChevronDown, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, ringBell } from "@/lib/bell-chime";

export const Route = createFileRoute("/_app/timer")({
  head: () => ({ meta: [{ title: "Meditation Timer · Tantraya" }] }),
  component: TimerPage,
});

const PRESETS = [5, 10, 15, 20, 30, 45, 60];

type Segment = { id: string; minutes: number };

const defaultSegments: Segment[] = [{ id: "seg-1", minutes: 20 }];

/**
 * Plays a warm, singing-bowl-style bell entirely synthesized in the
 * browser via the Web Audio API, no audio file needed.
 */
function useBell() {
  const ctxRef = useRef<AudioContext | null>(null);

  function ensureCtx() {
    return getAudioContext(ctxRef);
  }

  function ring(strength: "soft" | "full" = "full") {
    ringBell(ensureCtx(), 220, strength);
  }

  return { ring, unlock: ensureCtx };
}

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function TimerPage() {
  const { ring, unlock } = useBell();

  const [segments, setSegments] = useState<Segment[]>(defaultSegments);
  const segmentsRef = useRef(segments);
  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(segments[0].minutes * 60);
  const [customMin, setCustomMin] = useState(10);

  const active = segments[activeIdx] ?? segments[0];
  const complete = !running && activeIdx === segments.length - 1 && secondsLeft === 0;

  // The interval effect below only reschedules when `running` changes, not
  // on every stage advance, so it reads the current stage index via a ref.
  const activeIdxRef = useRef(activeIdx);
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // If the sequence itself changes while stopped, start over cleanly at stage 1.
  useEffect(() => {
    if (running) return;
    setActiveIdx(0);
    setSecondsLeft(segments[0].minutes * 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;

        const segs = segmentsRef.current;
        const nextIdx = activeIdxRef.current + 1;
        if (nextIdx >= segs.length) {
          ring("full");
          setRunning(false);
          return 0;
        }
        ring("full");
        setActiveIdx(nextIdx);
        return segs[nextIdx].minutes * 60;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function start() {
    unlock();
    if (complete) {
      setActiveIdx(0);
      setSecondsLeft(segments[0].minutes * 60);
    }
    ring("full");
    setRunning(true);
  }
  function pause() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setActiveIdx(0);
    setSecondsLeft(segments[0].minutes * 60);
  }

  function addSegment(minutes: number) {
    if (minutes < 1) return;
    setSegments((s) => [...s, { id: `seg-${Date.now()}-${Math.random()}`, minutes }]);
  }
  function removeSegment(id: string) {
    setSegments((s) => (s.length > 1 ? s.filter((seg) => seg.id !== id) : s));
  }
  function updateSegment(id: string, minutes: number) {
    setSegments((s) =>
      s.map((seg) => (seg.id === id ? { ...seg, minutes: Math.max(1, minutes) } : seg)),
    );
  }
  function moveSegment(index: number, dir: -1 | 1) {
    setSegments((s) => {
      const next = [...s];
      const target = index + dir;
      if (target < 0 || target >= next.length) return s;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const totalSeconds = active.minutes * 60;
  const pct = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader
        title="Meditation Timer"
        subtitle="Build a sequence of stages, different lengths, one after another, with a bell marking each transition."
      />

      {/* Circular progress + countdown */}
      <div className="mb-8 flex flex-col items-center">
        {segments.length > 1 && (
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Stage {activeIdx + 1} of {segments.length}
          </p>
        )}
        <div className="relative flex h-64 w-64 items-center justify-center">
          <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-secondary/40"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - pct / 100)}
              className="text-gold transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-center">
            <p className="font-serif text-5xl text-primary">{fmt(secondsLeft)}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {running ? "sitting" : complete ? "complete" : "ready"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {!running ? (
            <Button size="lg" onClick={start}>
              <Play className="h-4 w-4" />{" "}
              {complete
                ? "Begin again"
                : activeIdx === 0 && secondsLeft === active.minutes * 60
                  ? "Begin"
                  : "Resume"}
            </Button>
          ) : (
            <Button size="lg" variant="outline" onClick={pause}>
              <Pause className="h-4 w-4" /> Pause
            </Button>
          )}
          <Button size="lg" variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      {/* Sequence builder */}
      <div className="space-y-6 rounded-2xl border border-border/60 bg-card/50 p-6">
        <div>
          <Label>Sequence</Label>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Add as many stages as you like, in any lengths, the bell rings at every transition, and
            again at the end.
          </p>

          <ul className="mt-3 space-y-2">
            {segments.map((seg, i) => (
              <li
                key={seg.id}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-2",
                  i === activeIdx && (running || complete)
                    ? "border-gold bg-gold/10"
                    : "border-border/60",
                )}
              >
                <span className="w-5 text-center text-xs text-muted-foreground">{i + 1}</span>
                <Input
                  type="number"
                  min={1}
                  max={180}
                  value={seg.minutes}
                  disabled={running}
                  onChange={(e) => updateSegment(seg.id, Number(e.target.value) || 1)}
                  className="w-20"
                />
                <span className="text-xs text-muted-foreground">min</span>
                <div className="ml-auto flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={running || i === 0}
                    onClick={() => moveSegment(i, -1)}
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={running || i === segments.length - 1}
                    onClick={() => moveSegment(i, 1)}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={running || segments.length === 1}
                    onClick={() => removeSegment(seg.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <span className="text-xs text-muted-foreground">Add a stage:</span>
            {PRESETS.map((m) => (
              <button
                key={m}
                disabled={running}
                onClick={() => addSegment(m)}
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-gold/50 hover:text-foreground disabled:opacity-40"
              >
                + {m} min
              </button>
            ))}
            <div className="flex items-center gap-1.5">
              <Input
                type="number"
                min={1}
                max={180}
                value={customMin}
                disabled={running}
                onChange={(e) => setCustomMin(Math.max(1, Number(e.target.value) || 1))}
                className="w-16"
              />
              <Button
                size="sm"
                variant="outline"
                disabled={running}
                onClick={() => addSegment(customMin)}
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>
          </div>
        </div>

        <p className="border-t border-border/60 pt-4 text-xs text-muted-foreground">
          The bell is generated in your browser, so it works offline and needs no download. Keep
          this tab open and your device unmuted for the chimes to sound.
        </p>
      </div>
    </div>
  );
}
