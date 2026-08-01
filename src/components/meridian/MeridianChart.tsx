import { useMemo, useState } from "react";
import { X, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Meridian, AcupuncturePoint } from "@/data/meridians/ren-mai";
import { MeridianBodyImage } from "./MeridianBodyImage";

interface Props {
  meridian: Meridian;
}

export function MeridianChart({ meridian }: Props) {
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const active = useMemo(
    () => meridian.points.find((p) => p.code === activeCode) ?? null,
    [meridian, activeCode],
  );

  const idx = active ? meridian.points.findIndex((p) => p.code === active.code) : -1;
  const goPrev = () => idx > 0 && setActiveCode(meridian.points[idx - 1].code);
  const goNext = () =>
    idx >= 0 && idx < meridian.points.length - 1 && setActiveCode(meridian.points[idx + 1].code);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Figure */}
      <div className="relative mx-auto w-full max-w-[340px]">
        <MeridianBodyImage
          view={meridian.view}
          image={meridian.image}
          images={meridian.images}
        />
        <p className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Info className="h-3 w-3" /> Select a point from the list to read its details.
        </p>
      </div>

      {/* Detail / list */}
      <div className="space-y-4">
        {active ? (
          <article className="rounded-xl border border-gold/40 bg-card/60 p-5">
            <header className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  {active.code}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-primary">
                  {active.pinyin}{" "}
                  <span className="ml-1 text-base text-muted-foreground">
                    {active.chinese}
                  </span>
                </h3>
                <p className="text-xs italic text-muted-foreground">
                  "{active.translation}"
                </p>
              </div>
              <button
                onClick={() => setActiveCode(null)}
                aria-label="Close"
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <Section title="Location">{active.location}</Section>
            <SectionList title="Actions" items={active.actions} />
            <SectionList title="Indications" items={active.indications} />
            {active.notes && (
              <p className="mt-4 border-l-2 border-gold pl-3 text-xs italic text-muted-foreground">
                {active.notes}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
              <button
                onClick={goPrev}
                disabled={idx <= 0}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-gold disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>
              <span className="text-muted-foreground">
                {idx + 1} / {meridian.points.length}
              </span>
              <button
                onClick={goNext}
                disabled={idx >= meridian.points.length - 1}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-gold disabled:opacity-30"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-6 text-sm text-muted-foreground">
            <p className="font-serif text-lg text-primary">{meridian.name}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-gold">
              {meridian.english} · {meridian.chinese}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {meridian.summary}
            </p>
            <p className="mt-4 text-xs">Select a point to begin.</p>
          </div>
        )}

        {/* Quick list */}
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <p className="px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-gold">
            All points
          </p>
          <ul className="max-h-72 overflow-y-auto">
            {meridian.points.map((p) => (
              <PointRow
                key={p.code}
                p={p}
                active={p.code === activeCode}
                onSelect={() => setActiveCode(p.code)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── helpers ───────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/85">{children}</p>
    </div>
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-1 space-y-1 text-sm text-foreground/85">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-gold" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PointRow({
  p,
  active,
  onSelect,
}: {
  p: AcupuncturePoint;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          "flex w-full items-baseline justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm transition",
          active
            ? "bg-gold/10 text-primary"
            : "text-foreground/80 hover:bg-secondary/40",
        )}
      >
        <span className="flex items-baseline gap-2">
          <span className="w-12 text-[10px] uppercase tracking-widest text-muted-foreground">
            {p.code}
          </span>
          <span className="font-serif">{p.pinyin}</span>
          <span className="text-xs text-muted-foreground">{p.chinese}</span>
        </span>
        <span className="truncate text-[11px] text-muted-foreground">
          {p.translation}
        </span>
      </button>
    </li>
  );
}
