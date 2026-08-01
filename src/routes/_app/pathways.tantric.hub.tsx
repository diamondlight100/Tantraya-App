import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { GraduationCap, BookOpen, Headphones, Video, Lock, Sparkles, ChevronRight, Compass } from "lucide-react";
import { PathwayMaterials } from "@/components/course/pathway-materials";
import { useCourseProgress } from "@/lib/course-progress";
import { tantraChapters } from "@/data/tantric/way-of-the-goddess";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NityaReading } from "@/components/course/nitya-reading";

export const Route = createFileRoute("/_app/pathways/tantric/hub")({
  head: () => ({ meta: [{ title: "Tantric Pathway · Tantraya" }] }),
  component: TantricPathway,
});

const courses = [
  {
    slug: "way-of-the-goddess",
    title: "The Way of the Goddess",
    blurb:
      "A full teaching arc through the history, philosophy, and living practice of Tantra, from its roots in the Indus Valley, through the chakra system and sacred sound, into mantra, yantra, and the mālā. Includes an interactive chakra explorer and a digital mālā for daily japa.",
    sections: 11,
    level: "Foundational → Intermediate",
  },
];

const NITYA_UNLOCK_LABEL = "Complete the Way of the Goddess to unlock";

function NityaThresholdCard() {
  const [open, setOpen] = useState(false);
  const progress = useCourseProgress("way-of-the-goddess");
  const completed = tantraChapters.filter((c) => progress.isComplete(c.slug)).length;
  const total = tantraChapters.length;
  const unlocked = completed >= total;
  const pct = Math.min(1, completed / total);

  if (!unlocked) {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-gold/20 bg-card/60 p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <Lock className="h-4.5 w-4.5 text-gold" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Coming into reach</span>
          <h3 className="mt-1 font-serif text-xl text-primary">Your Nitya</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A personal reading drawn from your birth date, one of the Sixteen Nityas of the lunar
            month. It reveals itself once the path behind it has actually been walked.
          </p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{NITYA_UNLOCK_LABEL}</span>
              <span>{completed} / {total}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
              <div
                className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
                style={{ width: `${pct * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-4 rounded-xl border border-gold/30 bg-card/60 p-6 text-left transition hover:border-gold/60 hover:bg-card/80"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <Sparkles className="h-4.5 w-4.5 text-gold" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Unlocked</span>
          <h3 className="mt-1 font-serif text-xl text-primary">Your Nitya</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A personal reading, drawn from your birth date, one of the Sixteen Nityas of the lunar
            month.
          </p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary">Your Nitya</DialogTitle>
          </DialogHeader>
          <NityaReading />
        </DialogContent>
      </Dialog>
    </>
  );
}

function TantricPathway() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="The Tantric Pathway"
        subtitle="Energy, embodiment, and sacred union, practices that work directly with the body and its subtle currents."
      />

      <section className="mb-10 rounded-2xl border border-border/60 bg-card/60 p-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Orientation</p>
        <h2 className="mt-2 font-serif text-2xl text-primary">Consciousness and energy in union</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-muted-foreground">
          <div>
            <p className="font-serif text-base text-foreground">Cosmology</p>
            <p className="mt-1">Śiva and Śakti, non-duality, and the body as a sacred microcosm.</p>
          </div>
          <div>
            <p className="font-serif text-base text-foreground">Sound</p>
            <p className="mt-1">
              Mantra, the Mātṛkā, and the chakras as living centers of vibration.
            </p>
          </div>
          <div>
            <p className="font-serif text-base text-foreground">Practice</p>
            <p className="mt-1">Nyāsa, yantra, mālā, and ritual as the tools that make it real.</p>
          </div>
        </div>
      </section>

      <Link
        to="/pathways/tantric/cosmology"
        className="group mb-10 block rounded-xl border border-gold/40 bg-card/70 p-6 transition hover:border-gold/70"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
            <Compass className="h-3.5 w-3.5" /> Cosmological Map
          </span>
        </div>
        <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
          The Thirty-Six Tattvas
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Śiva and Śakti in eternal embrace, Spanda as the first ripple, and the thirty-six tattvas
          this cascades into, drawn as a yantra, with Kālī as Time and Śiva as the Eternal beneath her feet.
        </p>
      </Link>

      <h2 className="font-serif text-2xl text-primary mb-4">Courses</h2>
      <div className="grid gap-5">
        {courses.map((c) => (
          <Link
            key={c.slug}
            to="/pathways/tantric/$courseSlug"
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
          to="/pathways/tantric/mahavidyas"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
            <span className="text-xs text-muted-foreground">Foundational → Advanced</span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">
            The Ten Mahavidyas
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Ten faces of the Goddess, moving through death, fear, sacrifice, stillness, and
            abundance, each with her own myth, symbolism, and a set of direct practices.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> 10 goddesses
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Written
            </span>
          </div>
        </Link>
        <Link
          to="/pathways/tantric/yantra"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
            <span className="text-xs text-muted-foreground">Foundational → Advanced</span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">Yantra</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The Ten Mahavidyas, each in her own sacred geometry.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> 10 yantras
            </span>
          </div>
        </Link>
        <Link
          to="/pathways/tantric/mantra"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
            <span className="text-xs text-muted-foreground">Foundational → Advanced</span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">Mantra</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Bīja, gāyatrī, and worship mantras for Ganesh, Shiva, Lakshmi, Durga, Saraswati, Hanuman, and
            the Ten Mahavidyas, with reference recordings and a place to record your own.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> 16 deities
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" /> Audio
            </span>
          </div>
        </Link>
        <Link
          to="/pathways/tantric/nyasa"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
            <span className="text-xs text-muted-foreground">Foundational → Advanced</span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">Nyasa</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Karanyāsa and aṅganyāsa, installing each deity's bīja into the hands, then the body , 
            for Ganesh, Shiva, Lakshmi, Durga, Saraswati, Hanuman, and the Ten Mahavidyas.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> 16 deities
            </span>
          </div>
        </Link>
        <Link
          to="/pathways/tantric/tattwa-shuddhi"
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Reference</span>
            <span className="text-xs text-muted-foreground">Foundational → Advanced</span>
          </div>
          <h3 className="mt-3 font-serif text-3xl text-primary group-hover:text-gold">Tattwa Shuddhi</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            An interactive dissolution, earth into water, water into fire, fire into air, air into
            space, with each element's bīja, shape, colour, and chakra.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> 5 elements
            </span>
          </div>
        </Link>
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Threshold</h2>
      <div className="grid gap-5">
        <NityaThresholdCard />
      </div>

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Materials</h2>
      <PathwayMaterials pathway="tantric" />
    </div>
  );
}
