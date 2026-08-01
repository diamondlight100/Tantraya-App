import { flairByKey } from "@/data/flairs";
import { cn } from "@/lib/utils";

export function FlairBadge({ flairKey, className }: { flairKey: string | null | undefined; className?: string }) {
  const flair = flairByKey(flairKey);
  if (!flair) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gold bg-gold px-2 py-0.5 text-[10px] font-semibold text-gold-foreground",
        className,
      )}
    >
      <span aria-hidden>{flair.glyph}</span> {flair.label}
    </span>
  );
}
