import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type CosmologyHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  body: string;
};

export function CosmologyMap({
  intro,
  hotspots,
  images,
}: {
  mapImage?: string;
  mapAlt?: string;
  intro: string;
  hotspots: CosmologyHotspot[];
  images: Record<string, string>;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = hotspots.find((h) => h.id === activeId) ?? null;

  return (
    <>
      <p className="mt-6 text-center text-sm text-muted-foreground italic">{intro}</p>

      <div className="relative mx-auto mt-8 flex max-w-sm flex-col items-center">
        <div
          className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent"
          aria-hidden="true"
        />
        {hotspots.map((h, i) => (
          <div key={h.id} className="relative z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setActiveId(h.id)}
              className="group flex flex-col items-center gap-2 rounded-2xl p-2 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <span className="h-20 w-20 overflow-hidden rounded-full border-2 border-gold/70 bg-card shadow-md ring-4 ring-background transition-colors group-hover:border-gold">
                <img
                  src={images[h.id]}
                  alt={h.label}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="max-w-[220px] text-center text-sm font-medium text-foreground/90 group-hover:text-gold">
                {h.label}
              </span>
            </button>
            {i < hotspots.length - 1 && (
              <span className="my-1 h-6 w-px bg-gold/40" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent className="w-[90vw] max-w-md max-h-[80vh] overflow-y-auto rounded-2xl border-gold/40">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl text-gold">{active.label}</DialogTitle>
              </DialogHeader>
              <div className="mt-2 overflow-hidden rounded-xl border border-gold/30 bg-card/30 mx-auto w-[200px]">
                <img src={images[active.id]} alt={active.label} className="block w-full h-auto object-contain" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{active.body}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
