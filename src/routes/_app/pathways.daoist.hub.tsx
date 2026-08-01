import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { GraduationCap, BookOpen, Headphones, Video, Compass } from "lucide-react";
import { PathwayMaterials } from "@/components/course/pathway-materials";

export const Route = createFileRoute("/_app/pathways/daoist/hub")({
  head: () => ({ meta: [{ title: "Daoist Pathway · Tantraya" }] }),
  component: DaoistPathway,
});

const courses = [
  {
    slug: "eight-extraordinary-meridians",
    title: "The Eight Extraordinary Meridians Qigong",
    blurb:
      "A complete journey into the deep reservoirs of the body, the Eight Extraordinary Vessels, the architecture of your constitutional energy and the foundation of internal alchemy.",
    lessons: 12,
    level: "Foundational → Intermediate",
  },
  {
    slug: "iching",
    title: "The I Ching, Book of Changes",
    blurb:
      "The eight trigrams, the 64 hexagrams, the Pre-Heaven and Post-Heaven arrangements, moving lines and changing hexagrams, and the living practice of yarrow stalk and coin divination, read in a Daoist-shamanic, oracular voice.",
    lessons: 6,
    level: "Foundational → Intermediate",
    customPath: "/pathways/daoist/iching",
  },
  {
    slug: "bagua-taiji",
    title: "Baguazhang",
    blurb:
      "Yin and Cheng style, as we train it: foundations and building the bagua body first. A reference companion for live/retreat students, organized by principle rather than by lesson number.",
    lessons: 8,
    level: "For students who train or have trained live",
    customPath: "/pathways/daoist/bagua-taiji",
  },
];

function DaoistPathway() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="The Daoist Pathway"
        subtitle="Qigong, internal alchemy, and the way of nature. Practices that root, refine and return the spirit to its source."
      />

      <section className="mb-10 rounded-2xl border border-border/60 bg-card/60 p-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Orientation</p>
        <h2 className="mt-2 font-serif text-2xl text-primary">Three streams within the Dao</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-muted-foreground">
          <div>
            <p className="font-serif text-base text-foreground">Jing, Essence</p>
            <p className="mt-1">Body, breath, structure. Root the practice in the marrow.</p>
          </div>
          <div>
            <p className="font-serif text-base text-foreground">Qi, Vitality</p>
            <p className="mt-1">Circulation, meridians, the felt currents of life.</p>
          </div>
          <div>
            <p className="font-serif text-base text-foreground">Shen, Spirit</p>
            <p className="mt-1">Stillness, presence, the luminous mind behind the work.</p>
          </div>
        </div>
      </section>

      <Link
        to="/pathways/daoist/cosmology"
        className="group mb-10 block rounded-xl border border-gold/40 bg-card/70 p-6 transition hover:border-gold/70"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
            <Compass className="h-3.5 w-3.5" /> Cosmological Map
          </span>
        </div>
        <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
          Wu Chi to Ba Gua
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The generative sequence underneath every practice in this pathway: the Great Void, Tai Chi,
          the four bigrams, the eight trigrams, and the circle they fold into.
        </p>
      </Link>

      <h2 className="font-serif text-2xl text-primary mb-4">Courses</h2>
      <div className="grid gap-5">
        {courses.map((c) => (
          <Link
            key={c.slug}
            {...(c.customPath
              ? { to: c.customPath }
              : { to: "/pathways/daoist/$courseSlug", params: { courseSlug: c.slug } })}
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
                <GraduationCap className="h-3.5 w-3.5" /> {c.lessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> Written
              </span>
              <span className="flex items-center gap-1.5">
                <Headphones className="h-3.5 w-3.5" /> Audio
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5" /> Video
              </span>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Materials</h2>
      <PathwayMaterials pathway="daoist" />
    </div>
  );
}
