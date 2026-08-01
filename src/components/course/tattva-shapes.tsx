// The five classical tattva shapes (plus a sixth, non-elemental form for
// Ājñā), rendered as actual geometry, in both flat 2D and a shaded,
// dimensional 3D treatment via SVG gradients. No image assets needed.

export type TattvaShapeKey = "square" | "crescent" | "triangle" | "circle" | "egg" | "winged-circle" | "hexagram";

export function tattvaShapeKeyFor(chakraKey: string): TattvaShapeKey {
  switch (chakraKey) {
    case "muladhara": return "square";
    case "svadhisthana": return "crescent";
    case "manipura": return "triangle";
    case "anahata": return "circle";
    case "vishuddha": return "egg";
    case "ajna": return "winged-circle";
    default: return "circle";
  }
}

const GRAD_ID_PREFIX = "tattva-grad-";

function Defs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <radialGradient id={id} cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.85} />
        <stop offset="35%" stopColor={color} stopOpacity={0.95} />
        <stop offset="100%" stopColor={color} stopOpacity={1} />
      </radialGradient>
      <linearGradient id={id + "-side"} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.6} />
        <stop offset="100%" stopColor="#000000" stopOpacity={0.35} />
      </linearGradient>
    </defs>
  );
}

export function TattvaShape({
  shape, color, dimension, size = 64,
}: {
  shape: TattvaShapeKey;
  color: string;
  dimension: "2d" | "3d";
  size?: number;
}) {
  const id = GRAD_ID_PREFIX + shape + "-" + dimension;
  const fill3d = `url(#${id})`;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <Defs id={id} color={color} />

      {shape === "square" && dimension === "2d" && (
        <rect x="20" y="20" width="60" height="60" fill={color} stroke="currentColor" strokeOpacity={0.2} />
      )}
      {shape === "square" && dimension === "3d" && (
        <g>
          <polygon points="20,35 55,20 90,35 55,50" fill={fill3d} />
          <polygon points="20,35 55,50 55,85 20,70" fill={`url(#${id}-side)`} />
          <polygon points="55,50 90,35 90,70 55,85" fill={color} fillOpacity={0.75} />
        </g>
      )}

      {shape === "crescent" && dimension === "2d" && (
        <path d="M15 45 Q50 78 85 45 Q50 58 15 45 Z" fill={color} />
      )}
      {shape === "crescent" && dimension === "3d" && (
        <g>
          <path d="M15 45 Q50 78 85 45 Q50 58 15 45 Z" fill={fill3d} />
          <path d="M15 45 Q50 68 85 45 Q50 58 15 45 Z" fill="#000000" opacity={0.18} />
        </g>
      )}

      {shape === "triangle" && dimension === "2d" && (
        <polygon points="50,15 85,80 15,80" fill={color} />
      )}
      {shape === "triangle" && dimension === "3d" && (
        <g>
          <polygon points="50,15 85,80 15,80" fill={fill3d} />
          <polygon points="50,15 85,80 55,80" fill={`url(#${id}-side)`} opacity={0.7} />
        </g>
      )}

      {shape === "circle" && dimension === "2d" && (
        <circle cx="50" cy="50" r="35" fill={color} />
      )}
      {shape === "circle" && dimension === "3d" && (
        <circle cx="50" cy="50" r="35" fill={fill3d} />
      )}

      {shape === "egg" && dimension === "2d" && (
        <ellipse cx="50" cy="50" rx="26" ry="35" fill={color} />
      )}
      {shape === "egg" && dimension === "3d" && (
        <ellipse cx="50" cy="50" rx="26" ry="35" fill={fill3d} />
      )}

      {shape === "winged-circle" && dimension === "2d" && (
        <g fill={color}>
          <circle cx="50" cy="50" r="16" />
          <path d="M34 50 Q10 35 5 50 Q10 65 34 50 Z" />
          <path d="M66 50 Q90 35 95 50 Q90 65 66 50 Z" />
        </g>
      )}
      {shape === "winged-circle" && dimension === "3d" && (
        <g>
          <path d="M34 50 Q10 35 5 50 Q10 65 34 50 Z" fill={color} opacity={0.6} />
          <path d="M66 50 Q90 35 95 50 Q90 65 66 50 Z" fill={color} opacity={0.6} />
          <circle cx="50" cy="50" r="16" fill={fill3d} />
        </g>
      )}

      {shape === "hexagram" && dimension === "2d" && (
        <g fill={color}>
          <polygon points="50,18 77.7,66 22.3,66" fillOpacity={0.85} />
          <polygon points="50,82 22.3,34 77.7,34" fillOpacity={0.85} />
        </g>
      )}
      {shape === "hexagram" && dimension === "3d" && (
        <g>
          <polygon points="50,18 77.7,66 22.3,66" fill={fill3d} fillOpacity={0.9} />
          <polygon points="50,82 22.3,34 77.7,34" fill={`url(#${id}-side)`} fillOpacity={0.85} />
        </g>
      )}
    </svg>
  );
}
