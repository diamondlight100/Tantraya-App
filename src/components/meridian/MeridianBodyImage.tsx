import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders the reference body image for a channel. Static only, no
 * clickable point overlay. Point details are read from the "All points"
 * list next to the figure instead of by tapping the image.
 */
export function MeridianBodyImage({
  view,
  image,
  images,
}: {
  // Generic fallback figure, used only if a channel has no dedicated art.
  view: "front" | "back";
  // Single channel-specific illustration (filename in /public/meridians/).
  image?: string;
  // For channels with more than one angle worth showing (Dai Mai wraps the
  // waist, so front/back/side all help), renders a small toggle above the
  // figure to switch between them.
  images?: Partial<Record<"front" | "back" | "side", string>>;
}) {
  const [imageOk, setImageOk] = useState(true);
  const viewKeys = images ? (Object.keys(images) as Array<"front" | "back" | "side">) : [];
  const [activeView, setActiveView] = useState<"front" | "back" | "side" | undefined>(viewKeys[0]);

  const src = images
    ? `/meridians/${images[activeView ?? viewKeys[0]]}`
    : image
      ? `/meridians/${image}`
      : `/meridians/${view}-view.png`;

  const label = images ? activeView ?? viewKeys[0] : view;

  return (
    <div>
      {viewKeys.length > 1 && (
        <div className="mb-2 flex justify-center gap-1">
          {viewKeys.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setActiveView(v)}
              className={cn(
                "rounded-full px-3 py-1 text-[10px] uppercase tracking-widest transition",
                (activeView ?? viewKeys[0]) === v
                  ? "bg-gold text-gold-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-xl border border-border/60 bg-[oklch(0.98_0.02_85)]">
        {imageOk ? (
          <img
            src={src}
            alt={`${label} body reference`}
            className="block w-full select-none"
            draggable={false}
            onError={() => setImageOk(false)}
          />
        ) : (
          <div className="flex aspect-[1/2] w-full items-center justify-center p-6 text-center text-xs text-muted-foreground">
            Reference image not added yet, drop {images ? images[activeView ?? viewKeys[0]] : (image ?? `${view}-view.png`)} into /public/meridians/.
          </div>
        )}
      </div>
    </div>
  );
}
