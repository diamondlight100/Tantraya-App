import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Sun, Wind, Sparkles, Eye } from "lucide-react";
import { PathwayMaterials } from "@/components/course/pathway-materials";

export const Route = createFileRoute("/_app/pathways/yogic/hub")({
  head: () => ({ meta: [{ title: "Yogic Pathway · Tantraya" }] }),
  component: YogicPathway,
});

function YogicPathway() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="The Yogic Pathway"
        subtitle="Āsana, prāṇāyāma, and the eight limbs, the yoga of the body and the breath."
      />

      {/* Featured interactive tool */}
      <Link
        to="/pathways/yogic/surya-namaskara"
        className="group mb-4 block rounded-xl border border-gold/50 bg-gold/5 p-6 transition hover:border-gold"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Interactive practice
          </span>
        </div>
        <h3 className="mt-3 flex items-center gap-2 font-serif text-3xl text-primary group-hover:text-gold">
          <Sun className="h-7 w-7 text-gold" /> Sūrya Namaskāra
        </h3>
        <p className="mt-2 text-sm text-foreground/90">
          The full sun salutation, built in layers, posture, breath, chakra colour, tattva symbol,
          element, bīja mantra, the sun's names, and devotion. Click any of the twelve positions to
          begin.
        </p>
      </Link>

      <Link
        to="/pathways/yogic/nadi-shodhana"
        className="group mb-8 block rounded-xl border border-gold/50 bg-gold/5 p-6 transition hover:border-gold"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Interactive practice
          </span>
        </div>
        <h3 className="mt-3 flex items-center gap-2 font-serif text-3xl text-primary group-hover:text-gold">
          <Wind className="h-7 w-7 text-gold" /> Nāḍī Śodhana
        </h3>
        <p className="mt-2 text-sm text-foreground/90">
          Alternate nostril breathing, built as a five-stage progression, from bare mechanics,
          through counting and balance, to the subtle channels and the breath-hold work. A guided
          pacer walks you through each stage at your own count.
        </p>
      </Link>

      <Link
        to="/core/trataka"
        className="group mb-8 block rounded-xl border border-gold/50 bg-gold/5 p-6 transition hover:border-gold"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Interactive practice
          </span>
        </div>
        <h3 className="mt-3 flex items-center gap-2 font-serif text-3xl text-primary group-hover:text-gold">
          <Eye className="h-7 w-7 text-gold" /> Trataka
        </h3>
        <p className="mt-2 text-sm text-foreground/90">
          The discipline of the steady gaze: eye preparation, the full list of traditional gazing
          objects, the two-stage candle practice, and the neuroscience and subtle-body meaning of
          the two eyes becoming one.
        </p>
      </Link>

      <Link
        to="/pathways/yogic/chakras"
        className="group mb-8 block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
        </div>
        <h3 className="mt-3 flex items-center gap-2 font-serif text-3xl text-primary group-hover:text-gold">
          <Sparkles className="h-7 w-7 text-gold" /> The Chakras
        </h3>
        <p className="mt-2 text-sm text-foreground/90">
          The seven main centers along the spine, plus Soma, each with its carrier, presiding
          deities, colors, petal count, and the traditional effects of meditation.
        </p>
      </Link>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Materials</h2>
      <PathwayMaterials pathway="yogic" />
    </div>
  );
}
