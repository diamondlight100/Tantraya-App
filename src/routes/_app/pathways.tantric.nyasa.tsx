import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronDown, ChevronUp, Hand, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { nyasaDeities, karanyasaLimbs, anganyasaLimbs, type NyasaLimb } from "@/data/tantric/nyasa";
import { RelatedPractices } from "@/components/course/related-practices";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/pathways/tantric/nyasa")({
  head: () => ({ meta: [{ title: "Nyasa · Tantric · Tantraya" }] }),
  component: NyasaPage,
});

function LimbRow({
  limb,
  bijaDevanagari,
  bijaTransliteration,
  accentColor,
}: {
  limb: NyasaLimb;
  bijaDevanagari: string;
  bijaTransliteration: string;
  accentColor: string;
}) {
  return (
    <div className="rounded-lg border border-border/50 p-3">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          {limb.order}
        </span>
        <p className="text-sm font-medium text-foreground/90">{limb.bodyPart}</p>
      </div>
      <p className="mb-1 font-serif text-lg leading-relaxed text-primary">
        ॐ {bijaDevanagari} {limb.devanagari}
      </p>
      <p className="mb-2 text-sm italic text-foreground/80">
        Oṃ {bijaTransliteration} {limb.transliteration}
      </p>
      <p className="text-xs text-muted-foreground">{limb.instruction}</p>
    </div>
  );
}

function NyasaPage() {
  const [open, setOpen] = useState<string | null>(nyasaDeities[0]?.slug ?? null);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Tantric Pathway
      </Link>
      <PageHeader
        title="Nyasa"
        subtitle="Karanyāsa and aṅganyāsa for Ganesh, Shiva, Lakshmi, Durga, Saraswati, Hanuman, and the Ten Mahavidyas, installing the deity's own bīja into the hands, then the body, before japa or pūjā."
      />

      <div className="mb-8 rounded-xl border border-gold/40 bg-gold/5 p-5 text-sm text-muted-foreground">
        <p className="mb-2">
          Nyāsa means "placing", the deity's seed-sound is sounded while touching a sequence of
          points, so that the deity's presence is installed in the practitioner's own hands and body
          before the mantra is used further. The same six-part pattern (Namaḥ, Svāhā, Vaṣaṭ, Huṃ,
          Vauṣaṭ, Phaṭ over six points) is used for every deity here, what changes is only the bīja
          sounded first, drawn from each deity's own seed mantra on the Mantra page.
        </p>
        <p>
          Do karanyāsa (the hand) first, in order, then aṅganyāsa (the body) in order. The final
          "weapon" clap seals the sequence.
        </p>
      </div>

      <div className="space-y-3">
        {nyasaDeities.map((d) => {
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
                <div className="space-y-6 border-t border-border/50 p-5 pt-4">
                  {d.note && (
                    <p className="rounded-md border border-amber-400/40 bg-amber-400/5 p-2 text-xs text-amber-200/90">
                      {d.note}
                    </p>
                  )}

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <Hand className="h-3.5 w-3.5" style={{ color: d.accentColor }} />
                      Karanyāsa, the hand
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {karanyasaLimbs.map((limb) => (
                        <LimbRow
                          key={limb.key}
                          limb={limb}
                          bijaDevanagari={d.bijaDevanagari}
                          bijaTransliteration={d.bijaTransliteration}
                          accentColor={d.accentColor}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <Sparkles className="h-3.5 w-3.5" style={{ color: d.accentColor }} />
                      Aṅganyāsa, the body
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {anganyasaLimbs.map((limb) => (
                        <LimbRow
                          key={limb.key}
                          limb={limb}
                          bijaDevanagari={d.bijaDevanagari}
                          bijaTransliteration={d.bijaTransliteration}
                          accentColor={d.accentColor}
                        />
                      ))}
                    </div>
                  </div>

                  <RelatedPractices
                    pathway="tantric"
                    courseSlug="nyasa"
                    lessonSlug={d.slug}
                    defaultName={`${d.name} Nyāsa`}
                    defaultDescription={`Karanyāsa and aṅganyāsa for ${d.name}.`}
                    defaultBodyLayer="etheric"
                    defaultMinutes={10}
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
