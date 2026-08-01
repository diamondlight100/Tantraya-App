// Reusable geometric yantra, triangle, lotus-petal ring, bindu point, and
// an optional enclosing square, composed from a goddess's YantraSpec and
// recolored via a single `color` prop. Deliberately geometric, never
// figurative: see the Mahavidya course brief for why.

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function petalPath(cx: number, cy: number, angleDeg: number, rBase: number, rTip: number) {
  const halfWidthDeg = Math.min(16, 140 / Math.max(1, 360 / 24));
  const [baseLx, baseLy] = polar(cx, cy, rBase, angleDeg - halfWidthDeg);
  const [baseRx, baseRy] = polar(cx, cy, rBase, angleDeg + halfWidthDeg);
  const [tipX, tipY] = polar(cx, cy, rTip, angleDeg);
  const rMid = (rBase + rTip) / 2 + (rTip - rBase) * 0.15;
  const [ctrlLx, ctrlLy] = polar(cx, cy, rMid, angleDeg - halfWidthDeg * 0.55);
  const [ctrlRx, ctrlRy] = polar(cx, cy, rMid, angleDeg + halfWidthDeg * 0.55);
  return `M ${baseLx} ${baseLy} Q ${ctrlLx} ${ctrlLy} ${tipX} ${tipY} Q ${ctrlRx} ${ctrlRy} ${baseRx} ${baseRy} Z`;
}

function trianglePoints(cx: number, cy: number, size: number, direction: "up" | "down") {
  const h = size * 0.866; // equilateral height
  return direction === "up"
    ? `${cx},${cy - h * 0.62} ${cx - size / 2},${cy + h * 0.38} ${cx + size / 2},${cy + h * 0.38}`
    : `${cx},${cy + h * 0.62} ${cx - size / 2},${cy - h * 0.38} ${cx + size / 2},${cy - h * 0.38}`;
}

export function Yantra({
  color,
  petals,
  triangle,
  enclosure,
  className,
}: {
  color: string;
  petals: number;
  triangle: "up" | "down";
  enclosure?: boolean;
  className?: string;
}) {
  const cx = 100;
  const cy = 100;

  return (
    <svg viewBox="0 0 200 200" className={className} role="presentation" aria-hidden="true">
      {enclosure && (
        <>
          <rect
            x={16}
            y={16}
            width={168}
            height={168}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0.55}
          />
          <rect
            x={26}
            y={26}
            width={148}
            height={148}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={0.35}
          />
        </>
      )}

      <circle cx={cx} cy={cy} r={78} fill="none" stroke={color} strokeWidth={1} opacity={0.3} />

      {petals > 0 &&
        Array.from({ length: petals }).map((_, i) => {
          const angle = (360 / petals) * i;
          return (
            <path
              key={i}
              d={petalPath(cx, cy, angle, 58, 84)}
              fill="none"
              stroke={color}
              strokeWidth={1.25}
              opacity={0.6}
            />
          );
        })}

      <polygon
        points={trianglePoints(cx, cy, 66, triangle)}
        fill={color}
        fillOpacity={0.14}
        stroke={color}
        strokeWidth={1.75}
      />

      <circle cx={cx} cy={cy} r={4.5} fill={color} />
    </svg>
  );
}
