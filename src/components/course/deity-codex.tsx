import { useMemo, useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { egyptianDeities, type Deity } from "@/data/magick/egyptian-deities";

/**
 * The Deity Codex, a browsable grid of "God Cards" for the Egyptian
 * Magick course. Front: name, epithet, colors, symbols. Click to flip /
 * expand into the full profile: role, appearance, myth, offerings,
 * incense, sacred days, and a short invocation line.
 */

function SwatchRow({ colors }: { colors: Deity["colors"] }) {
  return (
    <div className="flex items-center gap-1.5">
      {colors.map((c) => (
        <span
          key={c.hex}
          title={c.name}
          className="h-3.5 w-3.5 rounded-full border border-white/20"
          style={{ backgroundColor: c.hex }}
        />
      ))}
    </div>
  );
}

function DeityCardFront({ deity, onOpen }: { deity: Deity; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-b from-card/80 to-background/60 text-left transition hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_0_0_1px_rgba(201,162,39,0.3)]"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-48">
        <img
          src={deity.image}
          alt={deity.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 pt-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
            {deity.domain[0]}
          </p>
          <h3 className="mt-1 font-serif text-2xl text-primary group-hover:text-gold">
            {deity.name}
          </h3>
          <p className="mt-1 text-xs italic text-muted-foreground">{deity.epithets[0]}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <SwatchRow colors={deity.colors} />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-gold">
            Open card →
          </span>
        </div>
      </div>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{label}</p>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function DeityDetail({ deity, onClose }: { deity: Deity; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-2xl"
      >
        <div className="relative h-56 w-full sm:h-64">
          <img
            src={deity.image}
            alt={deity.name}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-white/30 bg-background/60 p-1.5 text-white backdrop-blur hover:border-gold hover:text-gold"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 pt-0 sm:p-8 sm:pt-0">
        <div className="mb-5 -mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              {deity.domain.join(" · ")}
            </p>
            <h2 className="mt-1 font-serif text-3xl text-primary drop-shadow">{deity.name}</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">
              {deity.epithets.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-lg border border-gold/20 bg-background/40 p-3 text-sm italic text-gold/90">
          "{deity.invocation}"
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role">{deity.role}</Field>
          <Field label="Appearance">{deity.appearance}</Field>

          <Field label="Symbols">
            <ul className="list-inside list-disc space-y-0.5">
              {deity.symbols.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Field>
          <Field label="Sacred animals">{deity.sacredAnimals.join(", ")}</Field>

          <Field label="Colors">
            <div className="flex flex-wrap gap-2">
              {deity.colors.map((c) => (
                <span key={c.hex} className="inline-flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </span>
              ))}
            </div>
          </Field>
          {deity.family && <Field label="Family">{deity.family}</Field>}

          <Field label="Offerings">
            <ul className="list-inside list-disc space-y-0.5">
              {deity.offerings.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Field>
          <Field label="Incense / smells">{deity.incense.join(", ")}</Field>

          <Field label="Sacred days">{deity.sacredDays}</Field>
        </div>

        <div className="mt-5 border-t border-border/50 pt-4">
          <Field label="Myth">
            <p className="whitespace-pre-line leading-relaxed">{deity.myth}</p>
          </Field>
        </div>
        </div>
      </div>
    </div>
  );
}

export function DeityCodex() {
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return egyptianDeities;
    return egyptianDeities.filter((d) =>
      [d.name, ...d.epithets, ...d.domain, ...d.symbols].some((s) =>
        s.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  const openDeity = egyptianDeities.find((d) => d.slug === openSlug) ?? null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-2xl text-primary">
            <Sparkles className="h-5 w-5 text-gold" /> The Deity Codex
          </h2>
          <p className="text-xs text-muted-foreground">
            Twelve Neteru, role, symbols, colors, offerings, myth, and a working invocation for
            each. A quick-reference grimoire alongside the chapters.
          </p>
        </div>
        <div className="relative w-full max-w-[220px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, symbol…"
            className="w-full rounded-full border border-border/60 bg-background/60 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-gold"
          />
        </div>
      </div>

      <div
        className={cn(
          "grid gap-3",
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
        )}
      >
        {filtered.map((d) => (
          <div key={d.slug} className="h-80 sm:h-96">
            <DeityCardFront deity={d} onOpen={() => setOpenSlug(d.slug)} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No deity matches "{query}".
          </p>
        )}
      </div>

      {openDeity && <DeityDetail deity={openDeity} onClose={() => setOpenSlug(null)} />}
    </section>
  );
}
