import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { tattwas } from "@/data/tantric/tattwa";
import { TattvaShape, type TattvaShapeKey } from "@/components/course/tattva-shapes";
import { TattwaDissolution } from "@/components/course/tattwa-dissolution";
import { RelatedPractices } from "@/components/course/related-practices";

export const Route = createFileRoute("/_app/pathways/tantric/tattwa-shuddhi")({
  head: () => ({ meta: [{ title: "Tattwa Shuddhi · Tantric · Tantraya" }] }),
  component: TattwaShuddhiPage,
});

function TattwaShuddhiPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Tantric Pathway
      </Link>
      <PageHeader
        title="Tattwa Shuddhi"
        subtitle="Purification of the five elements, dissolving earth into water, water into fire, fire into air, and air into space, each with its own bīja, shape, colour, and chakra."
      />

      <div className="mb-8 rounded-xl border border-gold/40 bg-gold/5 p-5 text-sm text-muted-foreground">
        <p>
          Tattwa Shuddhi is done before japa or pūjā, to purify the gross elements that make up the
          body before working with anything subtler. Each element is sounded with its own bīja,
          visualised in its own shape and colour, then dissolved into the element above it, earth
          liquefying into water, water evaporating into fire, fire thinning into air, air dispersing
          into space. Step through the sequence below, or press Dissolve to let it run on its own.
        </p>
      </div>

      <TattwaDissolution />

      <div className="mt-8">
        <RelatedPractices
          pathway="tantric"
          courseSlug="tattwa-shuddhi"
          lessonSlug="overview"
          defaultName="Tattwa Shuddhi"
          defaultDescription="Purification of the five elements, dissolving earth into water, water into fire, fire into air, and air into space."
          defaultBodyLayer="etheric"
          defaultMinutes={10}
        />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-serif text-2xl text-primary">The Five Tattwas, reference</h2>
        <div className="space-y-3">
          {tattwas.map((t) => (
            <div key={t.key} className="flex items-start gap-4 rounded-xl border border-border/60 bg-card/60 p-4">
              <div className="shrink-0">
                <TattvaShape shape={t.shape as TattvaShapeKey} color={t.color} dimension="2d" size={56} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h3 className="font-serif text-xl text-primary">
                    {t.sanskrit} <span className="text-sm text-muted-foreground">({t.element})</span>
                  </h3>
                  <span className="font-serif text-lg text-primary">{t.bijaDevanagari}</span>
                  <span className="text-sm italic text-muted-foreground">{t.bijaTransliteration}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {t.chakraSanskrit} ({t.chakra}) · {t.colorName} · Presiding deity: {t.presidingDeity}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{t.quality}</p>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-muted-foreground/80 sm:grid-cols-4">
                  <span>Sense: {t.sense}</span>
                  <span>Organ: {t.senseOrgan}</span>
                  <span>Action: {t.actionOrgan}</span>
                  <span>Dissolves into: {t.dissolvesInto}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
