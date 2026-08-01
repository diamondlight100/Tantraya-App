import { useEffect, useState } from "react";
import type { BodyCenter, PracticeVisual } from "@/data/magick/egyptian-magick";

/**
 * Small animated SVG cues shown behind/above each ritual practice step.
 * Purely decorative, driven by a `visual` tag on the step data, keyed to
 * the tradition's own symbol set (breath, compass, flame, water, scale,
 * glyph, star, seal, heart, light, gate, spiral).
 */

function useClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 140" className="mx-auto h-32 w-full max-w-xs">
      {children}
    </svg>
  );
}

function Breath() {
  const t = useClock();
  const e = 0.5 - Math.cos(((t % 8) / 8) * Math.PI * 2) / 2;
  const r = 18 + e * 22;
  return (
    <Frame>
      <defs>
        <radialGradient id="pv-breath" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="70" r={r + 16} fill="url(#pv-breath)" />
      <circle cx="100" cy="70" r={r} fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity={0.85} />
    </Frame>
  );
}

function Compass() {
  const t = useClock();
  const angle = (t * 14) % 360;
  return (
    <Frame>
      <circle cx="100" cy="70" r="38" fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" />
      {["N", "E", "S", "W"].map((d, i) => {
        const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
        return (
          <text
            key={d}
            x={100 + 50 * Math.cos(a)}
            y={70 + 50 * Math.sin(a) + 4}
            textAnchor="middle"
            className="fill-current text-[9px]"
            style={{ fill: "var(--muted-foreground)" }}
          >
            {d}
          </text>
        );
      })}
      <g style={{ transformOrigin: "100px 70px", transform: `rotate(${angle}deg)` }}>
        <line x1="100" y1="70" x2="100" y2="36" stroke="var(--gold)" strokeWidth="2" />
        <circle cx="100" cy="36" r="3" fill="var(--gold)" />
      </g>
      <circle cx="100" cy="70" r="3" fill="var(--primary)" />
    </Frame>
  );
}

function Flame() {
  const t = useClock();
  const wob = Math.sin(t * 3) * 4;
  const wob2 = Math.cos(t * 2.3) * 3;
  return (
    <Frame>
      <defs>
        <linearGradient id="pv-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#b8501f" />
          <stop offset="55%" stopColor="#e8912a" />
          <stop offset="100%" stopColor="#ffdf8a" />
        </linearGradient>
      </defs>
      <path
        d={`M100 100 C ${70 + wob} 80, ${75 + wob2} 45, 100 20 C ${125 - wob2} 45, ${130 - wob} 80, 100 100 Z`}
        fill="url(#pv-flame)"
        opacity="0.9"
      />
    </Frame>
  );
}

function Water() {
  const t = useClock();
  return (
    <Frame>
      {[0, 1, 2].map((i) => {
        const o = (t * 24 + i * 30) % 90;
        return (
          <ellipse
            key={i}
            cx="100"
            cy={100 - o}
            rx={10 + o * 0.6}
            ry={4 + o * 0.15}
            fill="none"
            stroke="var(--gold)"
            strokeOpacity={Math.max(0, 0.55 - o / 160)}
            strokeWidth="1.5"
          />
        );
      })}
      <rect x="20" y="100" width="160" height="2" fill="var(--gold)" opacity="0.4" />
    </Frame>
  );
}

function Scale() {
  return (
    <Frame>
      <line x1="100" y1="20" x2="100" y2="35" stroke="var(--gold)" strokeWidth="2" />
      <line x1="55" y1="35" x2="145" y2="35" stroke="var(--gold)" strokeWidth="2" />
      <line x1="55" y1="35" x2="45" y2="70" stroke="var(--gold)" strokeWidth="1.2" />
      <line x1="145" y1="35" x2="155" y2="70" stroke="var(--gold)" strokeWidth="1.2" />
      <path d="M30 70 A15 15 0 0 0 60 70 Z" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <path d="M140 70 A15 15 0 0 0 170 70 Z" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <path d="M100 35 L100 100" stroke="var(--gold)" strokeOpacity="0.3" strokeWidth="1" />
    </Frame>
  );
}

function Glyph() {
  return (
    <Frame>
      <text x="100" y="90" textAnchor="middle" fontSize="52" fill="var(--gold)" opacity="0.85">
        𓂀
      </text>
    </Frame>
  );
}

function Star() {
  const t = useClock();
  return (
    <Frame>
      {Array.from({ length: 14 }).map((_, i) => {
        const seed = i * 137.5;
        const x = (Math.sin(seed) * 0.5 + 0.5) * 190 + 5;
        const y = (Math.cos(seed * 1.3) * 0.5 + 0.5) * 110 + 10;
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.5 + i));
        return <circle key={i} cx={x} cy={y} r={1.4} fill="var(--gold)" opacity={twinkle} />;
      })}
      <circle cx="100" cy="70" r="4" fill="var(--primary)" />
    </Frame>
  );
}

function Seal() {
  const t = useClock();
  const scale = 0.9 + Math.sin(t * 1.2) * 0.04;
  return (
    <Frame>
      <g style={{ transformOrigin: "100px 70px", transform: `scale(${scale})` }}>
        <circle cx="100" cy="70" r="40" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="30" fill="none" stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M80 70 L96 86 L124 54" stroke="var(--gold)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

function HeartVisual() {
  const t = useClock();
  const pulse = 1 + Math.sin(t * 2) * 0.05;
  return (
    <Frame>
      <g style={{ transformOrigin: "100px 70px", transform: `scale(${pulse})` }}>
        <path
          d="M100 95 C 70 72, 55 52, 68 38 C 80 27, 95 34, 100 46 C 105 34, 120 27, 132 38 C 145 52, 130 72, 100 95 Z"
          fill="var(--gold)"
          opacity="0.75"
        />
      </g>
    </Frame>
  );
}

function Light() {
  const t = useClock();
  const glow = 0.5 + Math.sin(t * 1.4) * 0.3;
  return (
    <Frame>
      <defs>
        <radialGradient id="pv-light" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity={glow} />
          <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="140" fill="url(#pv-light)" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="10"
          x2={100 + (i - 2.5) * 24}
          y2="120"
          stroke="var(--gold)"
          strokeOpacity={0.25}
          strokeWidth="1"
        />
      ))}
    </Frame>
  );
}

function GateVisual() {
  return (
    <Frame>
      <rect x="55" y="25" width="14" height="90" fill="var(--gold)" opacity="0.8" />
      <rect x="131" y="25" width="14" height="90" fill="var(--gold)" opacity="0.8" />
      <path d="M55 25 Q100 5 145 25" fill="none" stroke="var(--gold)" strokeWidth="6" opacity="0.8" />
      <rect x="90" y="60" width="20" height="55" fill="none" stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1.5" />
    </Frame>
  );
}

function Spiral() {
  const t = useClock();
  const rot = (t * 22) % 360;
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const a = i * 0.28;
    const r = i * 0.6;
    pts.push(`${100 + r * Math.cos(a)},${70 + r * Math.sin(a)}`);
  }
  return (
    <Frame>
      <g style={{ transformOrigin: "100px 70px", transform: `rotate(${rot}deg)` }}>
        <polyline points={pts.join(" ")} fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.8" />
      </g>
    </Frame>
  );
}

const CENTER_Y: Record<BodyCenter, number> = {
  crown: 12,
  "third-eye": 28,
  skull: 28,
  throat: 46,
  heart: 68,
  base: 118,
};

const CENTER_LABEL: Record<BodyCenter, string> = {
  crown: "Crown",
  "third-eye": "Third Eye",
  skull: "Back of Head",
  throat: "Throat",
  heart: "Heart",
  base: "Base",
};

function Spine({ center }: { center?: BodyCenter }) {
  const t = useClock();
  const active = center ?? "crown";
  const cy = CENTER_Y[active];
  const isSkull = active === "skull";
  const pulse = 6 + Math.sin(t * 2.4) * 2;
  return (
    <Frame>
      {/* spine line */}
      <line x1="100" y1="8" x2="100" y2="124" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* head outline for skull/crown/third-eye legibility */}
      <circle cx="100" cy="20" r="14" fill="none" stroke="var(--gold)" strokeOpacity="0.3" strokeWidth="1" />
      {/* all six centres, dim */}
      {(Object.keys(CENTER_Y) as BodyCenter[]).map((c) => (
        <circle
          key={c}
          cx={c === "skull" ? 112 : 100}
          cy={CENTER_Y[c]}
          r={4}
          fill="var(--gold)"
          opacity={c === active ? 0 : 0.25}
        />
      ))}
      {/* active centre, glowing */}
      <g>
        <circle
          cx={isSkull ? 112 : 100}
          cy={cy}
          r={pulse + 8}
          fill="var(--gold)"
          opacity={0.18}
        />
        <circle cx={isSkull ? 112 : 100} cy={cy} r={pulse} fill="var(--gold)" opacity={0.9} />
        <circle cx={isSkull ? 112 : 100} cy={cy} r={pulse + 4} fill="none" stroke="var(--gold)" strokeWidth="1" opacity={0.6} />
      </g>
      <text x="100" y="136" textAnchor="middle" className="fill-current text-[9px]" style={{ fill: "var(--muted-foreground)" }}>
        {CENTER_LABEL[active]}
      </text>
    </Frame>
  );
}

const registry: Record<Exclude<PracticeVisual, "spine">, () => React.JSX.Element> = {
  breath: Breath,
  compass: Compass,
  flame: Flame,
  water: Water,
  scale: Scale,
  glyph: Glyph,
  star: Star,
  seal: Seal,
  heart: HeartVisual,
  light: Light,
  gate: GateVisual,
  spiral: Spiral,
};

export function PracticeVisualCue({
  visual,
  center,
}: {
  visual?: PracticeVisual;
  center?: BodyCenter;
}) {
  if (!visual) return null;
  if (visual === "spine") {
    return (
      <div className="rounded-lg border border-gold/25 bg-background/30 py-3">
        <Spine center={center} />
      </div>
    );
  }
  const Cmp = registry[visual];
  if (!Cmp) return null;
  return (
    <div className="rounded-lg border border-gold/25 bg-background/30 py-3">
      <Cmp />
    </div>
  );
}
