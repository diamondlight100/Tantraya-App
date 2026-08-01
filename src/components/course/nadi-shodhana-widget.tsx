import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { posture, nadiStages, generalNotes } from "@/data/yogic/nadi-shodhana";
import { Play, Pause, RotateCcw, Wind, Info } from "lucide-react";
import { getAudioContext, ringBell } from "@/lib/bell-chime";

/**
 * The exact same bell as the meditation timer, same base pitch (220) and
 * partials. Earlier this varied the base frequency per breath phase, which
 * pushed the overtones high enough to sound thin; a single warm bell reads
 * better for frequent phase-change chimes anyway.
 */
function useBell() {
  const ctxRef = useRef<AudioContext | null>(null);
  function ensureCtx() {
    return getAudioContext(ctxRef);
  }
  function chime() {
    ringBell(ensureCtx(), 220, "soft");
  }
  return { chime, unlock: ensureCtx };
}

function ChannelDiagram({
  showChannels,
  showCentral,
  activeSide,
  holdHalf,
}: {
  showChannels: boolean;
  showCentral: boolean;
  activeSide: "left" | "right" | "both" | null;
  holdHalf?: "up" | "down";
}) {
  return (
    <svg viewBox="0 0 200 260" className="mx-auto h-56 w-auto">
      <circle
        cx="100"
        cy="35"
        r="24"
        fill="none"
        stroke="currentColor"
        className="text-border"
        strokeWidth="1"
      />
      <line
        x1="100"
        y1="59"
        x2="100"
        y2="230"
        stroke="currentColor"
        className="text-border"
        strokeWidth="1"
      />
      {showChannels && (
        <>
          <path
            d="M92 44 Q70 32 70 58 L70 205 Q71 226 100 230"
            fill="none"
            stroke="#e05050"
            strokeWidth={activeSide === "left" ? 3.5 : 2}
            opacity={activeSide === "left" || activeSide === null ? 1 : 0.3}
          />
          <path
            d="M108 44 Q130 32 130 58 L130 205 Q129 226 100 230"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={activeSide === "right" ? 3.5 : 2}
            opacity={activeSide === "right" || activeSide === null ? 1 : 0.3}
          />
        </>
      )}
      {showCentral && (
        <line
          x1="100"
          y1="59"
          x2="100"
          y2="230"
          stroke="#4488dd"
          strokeWidth={activeSide === "both" ? 3.5 : 2}
          opacity={activeSide === "both" ? 1 : 0.35}
        />
      )}
      {activeSide === "both" && holdHalf && (
        <circle cx="100" cy={holdHalf === "up" ? 200 : 90} r="5" fill="#f2c94c" />
      )}
      <circle cx="100" cy="230" r="9" fill="#f2c94c" opacity={0.85} />
      <text x="100" y="252" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        dan tian
      </text>
    </svg>
  );
}

export function NadiShodhanaWidget() {
  const { chime, unlock } = useBell();
  const [stageIdx, setStageIdx] = useState(0);
  const stage = nadiStages[stageIdx];

  const [countSeconds, setCountSeconds] = useState(4);
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(countSeconds);

  const phase = stage.phases[phaseIdx];

  useEffect(() => {
    setPhaseIdx(0);
    setPhaseSecondsLeft(countSeconds);
    setRunning(false);
  }, [stageIdx]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setPhaseSecondsLeft((s) => {
        if (s <= 1) {
          setPhaseIdx((pi) => {
            const next = (pi + 1) % stage.phases.length;
            chime();
            return next;
          });
          return countSeconds;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, countSeconds, stage.phases.length]);

  function start() {
    unlock();
    chime();
    setRunning(true);
  }
  function pause() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setPhaseIdx(0);
    setPhaseSecondsLeft(countSeconds);
  }

  const activeSide: "left" | "right" | "both" | null =
    phase.kind === "hold" ? "both" : phase.nostril;

  return (
    <div>
      {/* Posture reference, always visible */}
      <div className="mb-6 rounded-xl border border-border/60 bg-card/50 p-5">
        <p className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
          <Info className="h-4 w-4 text-gold" /> {posture.title}
        </p>
        <ul className="space-y-1.5 text-sm text-foreground/85">
          {posture.points.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-gold">•</span> {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Stage selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {nadiStages.map((s, i) => (
          <button
            key={s.n}
            onClick={() => setStageIdx(i)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition",
              i === stageIdx
                ? "border-gold bg-gold/10 text-primary"
                : "border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground",
            )}
          >
            {s.n}. {s.subtitle}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Instructions */}
        <div className="rounded-xl border border-border/60 bg-card/50 p-5">
          <h3 className="font-serif text-2xl text-primary">{stage.title}</h3>
          <p className="mt-1 text-sm text-foreground/85">{stage.intro}</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/85">
            {stage.instructions.map((ins, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gold">{i + 1}.</span> {ins}
              </li>
            ))}
          </ul>
        </div>

        {/* Pacer */}
        <div className="rounded-xl border border-gold/40 bg-gold/5 p-5 text-center">
          <ChannelDiagram
            showChannels={stage.showChannels}
            showCentral={stage.showCentralChannel}
            activeSide={activeSide}
            holdHalf={phase.holdHalf}
          />
          <p className="mt-2 font-serif text-xl text-primary">{phase.label}</p>
          <p className="mt-1 font-serif text-4xl text-gold">{phaseSecondsLeft}</p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Count
              <input
                type="number"
                min={2}
                max={20}
                value={countSeconds}
                onChange={(e) => {
                  setCountSeconds(Math.max(2, Number(e.target.value) || 4));
                  reset();
                }}
                className="w-14 rounded border border-border/60 bg-background/60 px-2 py-1 text-center text-foreground"
                disabled={running}
              />
              seconds
            </label>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {!running ? (
              <button
                onClick={start}
                className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-gold-foreground hover:bg-gold/90"
              >
                <Play className="h-3.5 w-3.5" /> Start
              </button>
            ) : (
              <button
                onClick={pause}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-4 py-2 text-xs text-primary hover:bg-gold/10"
              >
                <Pause className="h-3.5 w-3.5" /> Pause
              </button>
            )}
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground hover:border-gold/50 hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* General notes */}
      <div className="mt-6 rounded-xl border border-border/60 bg-card/40 p-5">
        <p className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
          <Wind className="h-4 w-4 text-gold" /> A few general notes
        </p>
        <ul className="space-y-1.5 text-sm text-foreground/85">
          {generalNotes.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-gold">•</span> {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
