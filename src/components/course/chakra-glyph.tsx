import { TattvaShape, type TattvaShapeKey } from "@/components/course/tattva-shapes";

// Same lotus-petal-ring construction as the Mahavidya yantras, wrapped
// around the app's existing, traditionally accurate tattva shape (square,
// crescent, triangle, circle, egg, winged circle) rather than a generic
// triangle, chakras already have real geometry defined elsewhere.

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function petalPath(cx: number, cy: number, angleDeg: number, rBase: number, rTip: number) {
  const halfWidthDeg = 8;
  const [baseLx, baseLy] = polar(cx, cy, rBase, angleDeg - halfWidthDeg);
  const [baseRx, baseRy] = polar(cx, cy, rBase, angleDeg + halfWidthDeg);
  const [tipX, tipY] = polar(cx, cy, rTip, angleDeg);
  const rMid = (rBase + rTip) / 2 + (rTip - rBase) * 0.15;
  const [ctrlLx, ctrlLy] = polar(cx, cy, rMid, angleDeg - halfWidthDeg * 0.55);
  const [ctrlRx, ctrlRy] = polar(cx, cy, rMid, angleDeg + halfWidthDeg * 0.55);
  return `M ${baseLx} ${baseLy} Q ${ctrlLx} ${ctrlLy} ${tipX} ${tipY} Q ${ctrlRx} ${ctrlRy} ${baseRx} ${baseRy} Z`;
}

export function ChakraGlyph({
  petals,
  shape,
  tattvaColor,
  ringColor,
  className,
}: {
  petals: number;
  shape: TattvaShapeKey;
  tattvaColor: string;
  ringColor: string;
  className?: string;
}) {
  const cx = 100;
  const cy = 100;
  // Cap the drawn petal count for legibility, Sahasrāra's "thousand petals"
  // is represented, not literally rendered.
  const drawnPetals = Math.min(petals, 24);
  const shapeSize = 56;

  return (
    <svg viewBox="0 0 200 200" className={className} role="presentation" aria-hidden="true">
      <circle cx={cx} cy={cy} r={78} fill="none" stroke={ringColor} strokeWidth={1} opacity={0.3} />

      {drawnPetals > 0 &&
        Array.from({ length: drawnPetals }).map((_, i) => {
          const angle = (360 / drawnPetals) * i;
          return (
            <path
              key={i}
              d={petalPath(cx, cy, angle, 58, 84)}
              fill="none"
              stroke={ringColor}
              strokeWidth={1.25}
              opacity={0.6}
            />
          );
        })}

      <g transform={`translate(${cx - shapeSize / 2}, ${cy - shapeSize / 2})`}>
        <TattvaShape shape={shape} color={tattvaColor} dimension="3d" size={shapeSize} />
      </g>
    </svg>
  );
}
