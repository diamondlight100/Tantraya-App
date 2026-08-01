import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { GraduationCap, BookOpen } from "lucide-react";
import { PathwayMaterials } from "@/components/course/pathway-materials";

export const Route = createFileRoute("/_app/pathways/buddhist/hub")({
  head: () => ({ meta: [{ title: "Buddhist Pathway · Tantraya" }] }),
  component: BuddhistPathway,
});

const courses = [
  {
    slug: "metta-tonglen",
    title: "Mettā & Tonglen",
    blurb:
      "Two core practices of the heart: Mettā, the systematic cultivation of loving-kindness through five widening stages, and Tonglen, the traditional Tibetan practice of breathing in suffering and breathing out relief.",
    sections: 2,
    level: "Foundational",
  },
  {
    slug: "phowa",
    title: "Beyond the Threshold: Phowa for Modern Times",
    blurb:
      "The transference of consciousness at the moment of death, adapted for practitioners of any background, the subtle body, the ethical and devotional ground, and every stage of the practice itself, closing with the complete sequence, a printable Conscious Transition card, and further reading.",
    sections: 17,
    level: "Foundational → Advanced",
  },
];

function BuddhistPathway() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="The Buddhist Pathway"
        subtitle="Meditation, mindfulness, and the dharma. Practices that train the heart and steady the mind."
      />

      <h2 className="font-serif text-2xl text-primary mb-4">Courses</h2>
      <div className="grid gap-5">
        {courses.map((c) => (
          <Link
            key={c.slug}
            to="/pathways/buddhist/$courseSlug"
            params={{ courseSlug: c.slug }}
            className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Course</span>
              <span className="text-xs text-muted-foreground">{c.level}</span>
            </div>
            <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" /> {c.sections} chapters
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> Written
              </span>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Reference</h2>
      <div className="grid gap-5">
        <Link
          to="/pathways/buddhist/deities"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
            <span className="text-xs text-muted-foreground">4 figures</span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">"Deities"</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Bodhisattvas, yidams, and buddhas worked with in this pathway, Green Tara, Padmasambhava,
            Medicine Buddha, and Vajrakilaya.
          </p>
        </Link>
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Materials</h2>
      <PathwayMaterials pathway="buddhist" />
    </div>
  );
}
