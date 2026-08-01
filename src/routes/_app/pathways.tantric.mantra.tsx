import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { mantraDeities, type MantraRole } from "@/data/tantric/mantras";
import { MantraAudio } from "@/components/course/mantra-audio";
import { RelatedPractices } from "@/components/course/related-practices";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/pathways/tantric/mantra")({
  head: () => ({ meta: [{ title: "Mantra · Tantric · Tantraya" }] }),
  component: MantraPage,
});

const ROLE_LABEL: Record<MantraRole, string> = {
  bija: "Bīja",
  gayatri: "Gāyatrī",
  namaha: "Namaḥ",
  swaha: "Svāhā",
  extra: "Further",
};

function MantraPage() {
  const [open, setOpen] = useState<string | null>(mantraDeities[0]?.slug ?? null);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Tantric Pathway
      </Link>
      <PageHeader
        title="Mantra"
        subtitle="Bīja, gāyatrī, and worship mantras for Ganesh, Shiva, Lakshmi, Durga, Saraswati, Hanuman, and the Ten Mahavidyas, with a reference recording for each, and a place to record your own."
      />

      <div className="mb-8 rounded-xl border border-gold/40 bg-gold/5 p-5 text-sm text-muted-foreground">
        <p>
          Mantra forms genuinely vary between lineages, texts, and oral transmission, what's given
          here is the openly published, commonly taught material for each deity. Where a mantra is
          traditionally reserved for direct initiation, that's noted rather than printed. Chant along
          with the reference recording where one exists, then record your own attempt underneath it
          to compare.
        </p>
      </div>

      <div className="space-y-3">
        {mantraDeities.map((d) => {
          const isOpen = open === d.slug;
          return (
            <div
              key={d.slug}
              className="rounded-xl border border-border/60 bg-card/60 transition"
              style={{ "--accent": d.accentColor } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : d.slug)}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
              >
                <div>
                  <h3 className="font-serif text-2xl text-primary" style={{ color: isOpen ? d.accentColor : undefined }}>
                    {d.name}
                  </h3>
                  {d.epithet && <p className="text-xs italic text-muted-foreground">{d.epithet}</p>}
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-border/50 p-5 pt-4">
                  {d.mantras.map((m) => (
                    <div key={m.key} className="rounded-lg border border-border/50 p-4">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]"
                          style={{ borderColor: d.accentColor, color: d.accentColor }}
                        >
                          {ROLE_LABEL[m.role]}
                        </span>
                        <p className="text-sm font-medium text-foreground/90">{m.label}</p>
                      </div>
                      {m.devanagari && (
                        <p className="mb-1 font-serif text-xl leading-relaxed text-primary">{m.devanagari}</p>
                      )}
                      <p className="mb-2 text-sm italic text-foreground/80">{m.transliteration}</p>
                      <p className="text-sm text-muted-foreground">{m.meaning}</p>
                      {m.note && (
                        <p className={cn("mt-2 rounded-md border border-amber-400/40 bg-amber-400/5 p-2 text-xs text-amber-200/90")}>
                          {m.note}
                        </p>
                      )}
                      <MantraAudio mantraKey={m.key} />
                    </div>
                  ))}

                  <RelatedPractices
                    pathway="tantric"
                    courseSlug="mantra"
                    lessonSlug={d.slug}
                    defaultName={`${d.name} Mantra`}
                    defaultDescription={`Bīja, gāyatrī, and worship mantras for ${d.name}.`}
                    defaultBodyLayer="mental"
                    defaultMinutes={15}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
