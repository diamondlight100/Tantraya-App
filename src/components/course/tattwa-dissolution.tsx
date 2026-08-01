import { useEffect, useRef, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { tattwas } from "@/data/tantric/tattwa";
import { TattvaShape, type TattvaShapeKey } from "@/components/course/tattva-shapes";
import { cn } from "@/lib/utils";

// The six points the tattvas dissolve up through, plotted on a single
// meditating-figure silhouette (viewBox 200 x 320, same house style as the
// microcosmic-orbit figure): the five gross-element chakras, root to
// throat, plus the crown, greyed out as "beyond the elements" since mind
// and pure awareness aren't tattvas.
const CHAKRA_POINTS = [
  { key: "muladhara", y: 272, label: "Mūlādhāra" },
  { key: "svadhisthana", y: 228, label: "Svādhiṣṭhāna" },
  { key: "manipura", y: 182, label: "Maṇipūra" },
  { key: "anahata", y: 138, label: "Anāhata" },
  { key: "vishuddha", y: 94, label: "Viśuddha" },
  { key: "beyond", y: 30, label: "Sahasrāra" },
];

const AUTO_PLAY_MS = 4200;
const TRANSITION_MS = 1100;
const TOTAL_STAGES = tattwas.length + 1; // + the final "beyond" stage

type Transition = { from: number; to: number; progress: number };

// Each element dissolves in a way appropriate to its own nature rather
// than a uniform fade. Every function takes progress 0..1 and returns the
// outgoing element's transform/opacity/blur at that point.
function outgoingStyle(elementKey: string, p: number): { transform: string; opacity: number; filter: string } {
  switch (elementKey) {
    case "prithvi": // earth liquefies: sinks and flattens
      return {
        transform: `translateY(${18 * p}px) scaleY(${1 - 0.85 * p})`,
        opacity: 1 - p,
        filter: `blur(${4 * p}px)`,
      };
    case "apas": // water evaporates: rises, wavers, thins
      return {
        transform: `translate(${Math.sin(p * Math.PI * 2) * 5}px, ${-46 * p}px) scale(${1 - 0.7 * p})`,
        opacity: 1 - p,
        filter: `blur(${5 * p}px)`,
      };
    case "tejas": // fire thins to smoke: stretches upward, narrows
      return {
        transform: `translateY(${-60 * p}px) scale(${1 + 0.7 * p}, ${1 - 0.6 * p})`,
        opacity: 1 - p,
        filter: `blur(${7 * p}px)`,
      };
    case "vayu": // air disperses: expands outward in every direction
      return {
        transform: `scale(${1 + 1.6 * p})`,
        opacity: 1 - p,
        filter: `blur(${9 * p}px)`,
      };
    case "akasha": // space thins to transparency: gently contracts, fades
      return {
        transform: `scale(${1 - 0.85 * p})`,
        opacity: 1 - p,
        filter: `blur(${2 * p}px)`,
      };
    default:
      return { transform: "scale(1)", opacity: 1 - p, filter: "blur(0px)" };
  }
}

// The incoming form condenses into being at its chakra point, same shape
// for every element since what's arising is common to all of them.
function incomingStyle(p: number): { transform: string; opacity: number; filter: string } {
  return {
    transform: `scale(${0.3 + 0.7 * p})`,
    opacity: p,
    filter: `blur(${(1 - p) * 6}px)`,
  };
}

function elementKeyForStage(stage: number): string | null {
  return stage < tattwas.length ? tattwas[stage].key : null;
}

function StageVisual({ stage, size = 30 }: { stage: number; size?: number }) {
  const isFinal = stage === tattwas.length;
  if (isFinal) {
    return (
      <div
        className="flex items-center justify-center rounded-full border border-gold/50 bg-gradient-to-br from-background to-gold/10"
        style={{ width: size * 4, height: size * 4 }}
      >
        <span className="font-serif text-lg text-gold">Cit</span>
      </div>
    );
  }
  const t = tattwas[stage];
  return (
    <div className="relative flex items-center justify-center">
      <TattvaShape shape={t.shape as TattvaShapeKey} color={t.color} dimension="3d" size={size * 4} />
      <span
        className="pointer-events-none absolute font-serif text-2xl text-white"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.55)" }}
      >
        {t.bijaDevanagari}
      </span>
    </div>
  );
}

function MeditatorSilhouette({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 320" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="tattwa-aura" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="320" fill="url(#tattwa-aura)" />
      {/* seated meditator silhouette: head, torso, robe flaring out into a
          wide cross-legged base, symmetric around the x=100 spine so the
          chakra points and dissolving tattva shapes line up with the body */}
      <path
        d="M100 18
           Q118 18 120 30
           Q122 42 118 50
           Q114 56 108 60
           Q124 70 132 88
           Q136 110 130 150
           Q127 178 145 205
           Q168 220 172 230
           Q176 246 150 258
           Q124 267 100 267
           Q76 267 50 258
           Q24 246 28 230
           Q32 220 55 205
           Q73 178 70 150
           Q64 110 68 88
           Q76 70 92 60
           Q86 56 82 50
           Q78 42 80 30
           Q82 18 100 18
           Z"
        fill="var(--secondary)"
        opacity="0.25"
        stroke="var(--gold)"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
      {/* subtle spine guide */}
      <line x1="100" y1="30" x2="100" y2="267" stroke="var(--gold)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2 4" />
      {children}
    </svg>
  );
}

export function TattwaDissolution() {
  const [stage, setStage] = useState(0);
  const [transition, setTransition] = useState<Transition | null>(null);
  const [playing, setPlaying] = useState(false);

  const stageRef = useRef(stage);
  stageRef.current = stage;
  const transitionRef = useRef<Transition | null>(null);
  transitionRef.current = transition;
  const rafRef = useRef<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goTo(next: number) {
    if (transitionRef.current) return; // ignore nav while a transition is in flight
    const clamped = Math.max(0, Math.min(TOTAL_STAGES - 1, next));
    if (clamped === stageRef.current) return;
    const from = stageRef.current;
    const start = performance.now();
    setTransition({ from, to: clamped, progress: 0 });

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TRANSITION_MS);
      setTransition({ from, to: clamped, progress: p });
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setStage(clamped);
        setTransition(null);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (playing) {
      autoplayRef.current = setInterval(() => {
        const next = stageRef.current + 1;
        if (next >= TOTAL_STAGES) {
          setPlaying(false);
          return;
        }
        goTo(next);
      }, AUTO_PLAY_MS);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const displayFrom = transition ? transition.from : stage;
  const displayTo = transition ? transition.to : stage;
  const progress = transition ? transition.progress : 1;

  const activePointIndex = transition
    ? transition.progress < 0.5
      ? transition.from
      : transition.to
    : stage;

  // Info panel dips out and back in across the transition, switching
  // content at the midpoint, rather than hard-cutting.
  const infoStage = transition ? (progress < 0.5 ? transition.from : transition.to) : stage;
  const infoOpacity = transition ? 1 - Math.abs(progress - 0.5) * 2 : 1;
  const isInfoFinal = infoStage === tattwas.length;
  const infoTattwa = isInfoFinal ? null : tattwas[infoStage];

  const fromPoint = CHAKRA_POINTS[displayFrom];
  const toPoint = CHAKRA_POINTS[displayTo];
  const sparkY = fromPoint.y + (toPoint.y - fromPoint.y) * progress;

  const fromElementKey = elementKeyForStage(displayFrom);
  const outStyle = fromElementKey ? outgoingStyle(fromElementKey, progress) : outgoingStyle("", progress);
  const inStyle = incomingStyle(progress);

  return (
    <div className="rounded-2xl border border-gold/40 bg-card/60 p-5 sm:p-8">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center">
        {/* Meditator figure with chakra points */}
        <div className="relative mx-auto" style={{ width: 200, height: 320 }}>
          <MeditatorSilhouette>
            {CHAKRA_POINTS.map((c, i) => {
              const isActive = activePointIndex === i;
              return (
                <g key={c.key}>
                  <circle
                    cx={100}
                    cy={c.y}
                    r={isActive ? 5 : 3}
                    fill={isActive ? "var(--gold)" : "transparent"}
                    stroke="var(--gold)"
                    strokeOpacity={isActive ? 1 : 0.4}
                    strokeWidth="1"
                    style={{ transition: "r 0.4s ease, fill 0.4s ease" }}
                  />
                  <text
                    x={c.key === "muladhara" || c.key === "manipura" || c.key === "vishuddha" ? 60 : 140}
                    y={c.y + 3}
                    textAnchor={c.key === "muladhara" || c.key === "manipura" || c.key === "vishuddha" ? "end" : "start"}
                    className={cn(
                      "font-serif text-[9px] transition-colors duration-500",
                      isActive ? "fill-gold" : "fill-muted-foreground/40"
                    )}
                  >
                    {c.label}
                  </text>
                </g>
              );
            })}
          </MeditatorSilhouette>

          {/* traveling spark during a transition */}
          {transition && (
            <div
              className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
              style={{
                left: "50%",
                top: `${(sparkY / 320) * 100}%`,
                boxShadow: "0 0 10px 3px var(--gold)",
                opacity: 0.9,
              }}
            />
          )}

          {/* outgoing shape, dissolving at its own chakra point */}
          {transition && (
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: "50%",
                top: `${(fromPoint.y / 320) * 100}%`,
                transform: `translate(-50%, -50%) ${outStyle.transform}`,
                opacity: outStyle.opacity,
                filter: outStyle.filter,
              }}
            >
              <StageVisual stage={displayFrom} />
            </div>
          )}

          {/* incoming / settled shape at its chakra point */}
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: "50%",
              top: `${(toPoint.y / 320) * 100}%`,
              transform: `translate(-50%, -50%) ${transition ? inStyle.transform : "scale(1)"}`,
              opacity: transition ? inStyle.opacity : 1,
              filter: transition ? inStyle.filter : "blur(0px)",
            }}
          >
            <StageVisual stage={displayTo} />
          </div>
        </div>

        {/* Info + controls */}
        <div className="flex flex-col items-center text-center">
          <div className="min-h-[9rem] max-w-md transition-opacity" style={{ opacity: infoOpacity }}>
            {isInfoFinal ? (
              <>
                <h3 className="font-serif text-2xl text-primary">Manas → Cit</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Beyond the five elements</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Space itself thins into transparency. What remains is the mind that was aware of it, and beyond
                  that, awareness with nothing left to be aware of. This isn't a sixth tattva; it's what's left when
                  all five have dissolved.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-primary">
                  {infoTattwa!.sanskrit} <span className="text-base text-muted-foreground">, {infoTattwa!.element}</span>
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {infoTattwa!.bijaTransliteration} · {infoTattwa!.chakraSanskrit} · {infoTattwa!.presidingDeity}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{infoTattwa!.dissolutionNote}</p>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => goTo(stage - 1)}
              disabled={stage === 0 || !!transition}
              className="rounded-full border border-border/60 p-2 text-muted-foreground transition hover:border-gold/60 hover:text-primary disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-xs uppercase tracking-wider text-primary transition hover:bg-gold/20"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "Pause" : "Dissolve"}
            </button>
            <button
              onClick={() => goTo(stage + 1)}
              disabled={stage === TOTAL_STAGES - 1 || !!transition}
              className="rounded-full border border-border/60 p-2 text-muted-foreground transition hover:border-gold/60 hover:text-primary disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setPlaying(false);
                goTo(0);
              }}
              disabled={!!transition}
              className="rounded-full border border-border/60 p-2 text-muted-foreground transition hover:border-gold/60 hover:text-primary disabled:opacity-30"
              aria-label="Restart"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: TOTAL_STAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPlaying(false);
                  goTo(i);
                }}
                disabled={!!transition}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === stage ? "w-6 bg-gold" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to stage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
