import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { PathwayMaterials } from "@/components/course/pathway-materials";

export const Route = createFileRoute("/_app/pathways/magick/hub")({
  head: () => ({ meta: [{ title: "Magick Pathway · Tantraya" }] }),
  component: MagickPathway,
});

const courses = [
  {
    slug: "faery-shamanism",
    title: "Faery Shamanism",
    blurb:
      "A journey into the living world between worlds, where magick breathes and the Old Ones wait. Faery lore, the Otherworld, initiatory ballads, the Green Mist, ancestral work and the practical magick of the land.",
    sections: 5,
    level: "Foundational → Intermediate",
  },
  {
    slug: "lucid-dreaming",
    title: "Lucid Dreaming & the Yogas of Dream and Sleep",
    blurb:
      "The science, history, and sacred practice of conscious dreaming, from Western neuroscience and induction technique, through shamanic and Taoist dreamwork, to Tibetan Dream Yoga.",
    sections: 5,
    level: "Foundational → Intermediate",
  },
  {
    slug: "egyptian-magick",
    title: "Ancient Egyptian Magick",
    blurb:
      "A deep journey into the Mysteries of Khem, Heka and Ma'at, the cosmic architecture of temple and Duat, the Neteru and the eight-fold soul, and living ritual with Isis, Osiris, Anubis, Sekhmet, and Thoth.",
    sections: 9,
    level: "Foundational → Intermediate",
  },
  {
    slug: "spagyrics",
    title: "Alchemy: Spagyrics",
    blurb:
      "The seven Operations of the Great Work and the three Essentials, fully clickable, plus equipment, planetary herbs, a real step-by-step Spagyric process with photos, how to take the finished medicine, and two optional practices.",
    sections: 7,
    level: "Foundational → Intermediate",
    customPath: "/pathways/magick/spagyrics",
  },
];

const selfStudyCourses = [
  {
    slug: "talismans-amulets-charms",
    title: "How to Make Talismans, Amulets and Charms",
    blurb:
      "Coursebook, build-and-charge checklist, kameas and magick squares, and a master correspondence table, gathered as one self-study bundle.",
    level: "For students who train or have trained live",
    href: "/courses/magick/talismans-amulets-charms",
  },
  {
    slug: "astral-projection",
    title: "Astral Projection",
    blurb:
      "Supplementary material on the astral body, projection technique, and safe practice, gathered as one self-study bundle.",
    level: "For students who train or have trained live",
    href: "/courses/magick/astral-projection",
  },
  {
    slug: "astral-magick",
    title: "Astral Magick",
    blurb:
      "Working ritually and magically once on the astral plane, distinct from the technique of projection itself, gathered as one self-study bundle.",
    level: "For students who train or have trained live",
    href: "/courses/magick/astral-magick",
  },
];

function MagickPathway() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="The Magick Pathway"
        subtitle="Western magick, faery shamanism, ritual, and the disciplined will. Practices that work with land, ancestor, and the unseen worlds beside our own."
      />

      <h2 className="font-serif text-2xl text-primary mb-4">Courses</h2>
      <div className="grid gap-5">
        {courses.map((c) => (
          <Link
            key={c.slug}
            {...(c.customPath
              ? { to: c.customPath }
              : { to: "/pathways/magick/$courseSlug", params: { courseSlug: c.slug } })}
            className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Interactive</span>
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

        {selfStudyCourses.map((c) => (
          <Link
            key={c.slug}
            to={c.href}
            className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Self-Study</span>
              <span className="text-xs text-muted-foreground">{c.level}</span>
            </div>
            <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> Self-study bundle
              </span>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Reference</h2>
      <div className="grid gap-5">
        <Link
          to="/pathways/magick/hours"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3 w-3" /> Reference
            </span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
            Magical Hours
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The current planetary hour wherever you are, all 24 hours of the day, their ruling angels from the
            Heptameron, and a live ephemeris of what the planets are doing right now. Used across the whole
            Magick pathway for timing ritual, talisman, and spagyric work.
          </p>
        </Link>

        <Link
          to="/pathways/magick/tree-of-life"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3 w-3" /> Reference
            </span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
            The Qabalistic Tree of Life
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Every Sephirah and Path, fully clickable: deities, archangels, planets, tarot, colours, gems, plants,
            animals, and what each sphere and path actually does in practice. Correspondences from Crowley's 777
            and Godwin's Cabalistic Encyclopedia.
          </p>
        </Link>
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Materials</h2>
      <PathwayMaterials
        pathway="magick"
        includeCourseTagged
        otherGroupTitle="Other Magick material"
        materialGroups={[
          { title: "Faery Shamanism", slugs: ["faery-shamanism"] },
          {
            title: "Lucid Dreaming & the Yogas of Dream and Sleep",
            // Also catches the "Lucid DReming" typo a document was tagged
            // with, so Dream Sign Bingo lands here instead of the leftover
            // bucket at the bottom of the page.
            slugs: ["lucid-dreaming", "lucid-dreming"],
          },
          { title: "Ancient Egyptian Magick", slugs: ["egyptian-magick"] },
          { title: "Alchemy: Spagyrics", slugs: ["spagyrics"] },
          { title: "How to Make Talismans, Amulets and Charms", slugs: ["talismans-amulets-charms"] },
          { title: "Astral Projection", slugs: ["astral-projection"] },
          // A distinct course from Astral Projection, ritual/magical work
          // on the astral plane rather than the technique of getting there.
          { title: "Astral Magick", slugs: ["astral-magick"] },
        ]}
      />
    </div>
  );
}
