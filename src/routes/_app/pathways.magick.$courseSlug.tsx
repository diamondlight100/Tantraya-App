import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import {
  Video,
  ChevronLeft,
  BookOpen,
  Wind,
  ClipboardCheck,
  NotebookPen,
  CheckCircle2,
  Circle,
  Sparkles,
  Library,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faeryChapters, type FaeryChapter } from "@/data/magick/faery-shamanism";
import { lucidChapters } from "@/data/magick/lucid-dreaming";
import { egyptianChapters, type EgyptianChapter } from "@/data/magick/egyptian-magick";
import { useCourseProgress } from "@/lib/course-progress";
import { PracticeTimer, Quiz, JournalEntry } from "@/components/course/eem-widgets";
import { RitualPracticePlayer } from "@/components/course/ritual-practice-player";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { CourseExtras } from "@/components/course/course-extras";
import { DeityCodex } from "@/components/course/deity-codex";
import { FaeryFormulaeCodex } from "@/components/course/faery-formulae-codex";
import { HollowRoad } from "@/components/course/hollow-road";
import { DuatRaceLauncher } from "@/components/course/duat-race-online";
import {
  CourseOrientation,
  type CourseOrientationData,
} from "@/components/course/course-orientation";
import {
  ThreeSoulsExplorer,
  FourDirectionsWheel,
  EightStepJourney,
  ThunderCrossBuilder,
} from "@/components/course/faery-widgets";
import {
  EightFoldSoulExplorer,
  NeteruWheel,
  DuatGatesJourney,
  GatheringOfHeka,
} from "@/components/course/egyptian-widgets";

type AnyChapter = FaeryChapter | EgyptianChapter;

export const Route = createFileRoute("/_app/pathways/magick/$courseSlug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.courseSlug} · Magick · Tantraya` }],
  }),
  component: MagickCourse,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
      Course not found.
    </div>
  ),
});

const courses = {
  "faery-shamanism": {
    title: "Faery Shamanism",
    subtitle:
      "A journey into the living world between worlds, where magick breathes and the Old Ones wait.",
    youtubeId: "Lt5UgXgcsGA",
    chapters: faeryChapters,
    orientation: {
      heading: "Three threads of the Work",
      threads: [
        {
          title: "Land",
          description: "Place, spirits, the green mist, magick that begins where you stand.",
        },
        {
          title: "Ancestor",
          description: "Lineage, the Beloved Dead, and the altars that keep them close.",
        },
        {
          title: "Otherworld",
          description: "Faery, vision, and the disciplined journey between worlds.",
        },
      ],
    } as CourseOrientationData | undefined,
  },
  "lucid-dreaming": {
    title: "Lucid Dreaming & the Yogas of Dream and Sleep",
    subtitle:
      "A comprehensive journey through the science, history, and sacred practices of conscious dreaming, from Western neuroscience to Tibetan Dream Yoga, Taoist Sleeping Gong, and Shamanic pathways into the Otherworld.",
    youtubeId: undefined as string | undefined,
    chapters: lucidChapters,
    orientation: undefined as CourseOrientationData | undefined,
  },
  "egyptian-magick": {
    title: "Ancient Egyptian Magick",
    subtitle:
      "A deep journey into the Mysteries of Khem, cosmology, the Neteru, and living ritual, from the Pyramid Texts to the Hermetic tradition they gave rise to.",
    youtubeId: undefined as string | undefined,
    chapters: egyptianChapters,
    orientation: undefined as CourseOrientationData | undefined,
  },
} as const;

// Chapter-completion unlocks that should surface a celebratory toast the
// moment a student marks the gating chapter complete. Keep in sync with the
// matching chapter-gated entries passed to <CourseExtras> below.
const CHAPTER_UNLOCK_ALERTS: { courseSlug: string; chapterSlug: string; title: string }[] = [
  { courseSlug: "egyptian-magick", chapterSlug: "the-neteru", title: "Trial of the Duat" },
];

function ChapterWidget({ kind }: { kind?: AnyChapter["widget"] }) {
  switch (kind) {
    case "three-souls":
      return <ThreeSoulsExplorer />;
    case "four-directions":
      return <FourDirectionsWheel />;
    case "eight-step-journey":
      return <EightStepJourney />;
    case "thunder-cross":
      return <ThunderCrossBuilder />;
    case "gathering-of-heka":
      return <GatheringOfHeka />;
    case "duat-gates":
      return <DuatGatesJourney />;
    case "eight-fold-soul":
      return <EightFoldSoulExplorer />;
    default:
      return null;
  }
}

function ChapterCard({ chapter, courseSlug }: { chapter: AnyChapter; courseSlug: string }) {
  const progress = useCourseProgress(courseSlug);
  const done = progress.isComplete(chapter.slug);
  const score = progress.score(chapter.slug);
  const useRitualPlayer = courseSlug === "egyptian-magick" || courseSlug === "faery-shamanism";
  const [tab, setTab] = useState("read");

  return (
    <article className="rounded-2xl border border-border/60 bg-card/50 p-5 sm:p-6">
      <header className="mb-5 flex items-start gap-4">
        <span className="font-serif text-3xl text-gold">{chapter.n}</span>
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-primary">{chapter.title}</h3>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {chapter.subtitle}
          </p>
        </div>
        {done && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
      </header>

      <p className="mb-5 text-sm text-foreground/85">{chapter.intro}</p>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="read">
            <BookOpen className="mr-1 h-3.5 w-3.5" />
            Read
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Wind className="mr-1 h-3.5 w-3.5" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <ClipboardCheck className="mr-1 h-3.5 w-3.5" />
            Quiz
            {score != null && <span className="ml-1 text-[10px] text-gold">{score}%</span>}
          </TabsTrigger>
          <TabsTrigger value="reflect">
            <NotebookPen className="mr-1 h-3.5 w-3.5" />
            Reflect
          </TabsTrigger>
        </TabsList>

        <TabsContent value="read" className="mt-5 space-y-4">
          {chapter.sections.map((s, i) => (
            <section key={i} className="rounded-lg border border-border/60 bg-background/40 p-4">
              {(s as { image?: string }).image && (
                <img
                  src={(s as { image?: string }).image}
                  alt={s.heading}
                  className="mx-auto mb-4 max-h-[32rem] w-auto max-w-full rounded-md object-contain"
                />
              )}
              <h4 className="font-serif text-lg text-primary">{s.heading}</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {s.body}
              </p>
            </section>
          ))}
        </TabsContent>

        <TabsContent value="practice" className="mt-5 space-y-5">
          <ChapterWidget kind={chapter.widget} />
          {useRitualPlayer ? (
            <RitualPracticePlayer
              steps={chapter.practice.steps}
              intro={(chapter.practice as { intro?: string }).intro}
              closingLine={(chapter.practice as { closingLine?: string }).closingLine}
              onFinish={() => setTab("reflect")}
            />
          ) : (
            <PracticeTimer steps={chapter.practice.steps} />
          )}
          <RelatedPractices
            pathway="magick"
            courseSlug={courseSlug}
            lessonSlug={chapter.slug}
            defaultName={`${chapter.title}. Practice`}
            defaultDescription={chapter.subtitle}
            defaultBodyLayer="general"
          />
        </TabsContent>

        <TabsContent value="quiz" className="mt-5">
          <Quiz questions={chapter.quiz} onScore={(pct) => progress.setScore(chapter.slug, pct)} />
        </TabsContent>

        <TabsContent value="reflect" className="mt-5">
          <JournalEntry
            value={progress.journal(chapter.slug)}
            onChange={(v) => progress.setJournal(chapter.slug, v)}
            prompts={chapter.journalPrompts}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-5 flex justify-end">
        <Button
          variant={done ? "outline" : "default"}
          size="sm"
          onClick={() => {
            const next = !done;
            progress.markComplete(chapter.slug, next);
            if (next) {
              for (const u of CHAPTER_UNLOCK_ALERTS) {
                if (u.courseSlug === courseSlug && u.chapterSlug === chapter.slug) {
                  toast.success(`You've unlocked "${u.title}"!`, {
                    description: `Head to "More to discover" below to explore it.`,
                  });
                }
              }
            }
          }}
        >
          {done ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Completed, mark unfinished
            </>
          ) : (
            <>
              <Circle className="h-4 w-4" /> Mark chapter complete
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

function MagickCourse() {
  const { courseSlug } = Route.useParams();
  const course = courses[courseSlug as keyof typeof courses];
  if (!course) throw notFound();

  const progress = useCourseProgress(courseSlug);
  const completed = course.chapters.filter((c) => progress.isComplete(c.slug)).length;
  const pct = Math.round((completed / course.chapters.length) * 100);
  const [activeSlug, setActiveSlug] = useState(course.chapters[0].slug);
  const active = course.chapters.find((c) => c.slug === activeSlug)!;

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/magick/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Magick Pathway
      </Link>
      <PageHeader title={course.title} subtitle={course.subtitle} />

      {course.orientation && <CourseOrientation {...course.orientation} />}

      {/* Progress */}
      <div className="mb-6 rounded-xl border border-gold/30 bg-card/40 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Your progress
          </span>
          <span>
            {completed} / {course.chapters.length} chapters
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
          <div
            className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {courseSlug === "egyptian-magick" ? (
        <CourseExtras
          courseSlug={courseSlug}
          items={[
            {
              key: "deity-codex",
              title: "Deity Codex",
              mode: "open",
              render: <DeityCodex />,
            },
            {
              key: "materials",
              title: "Course materials",
              mode: "open",
              render: (
                <CourseMaterialsBundle
                  pathway="magick"
                  courseSlug={courseSlug}
                  title={course.title}
                  cover={
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                      <Library className="h-6 w-6 text-gold" />
                    </div>
                  }
                />
              ),
            },
            {
              key: "duat-race",
              title: "Trial of the Duat",
              mode: "easter-egg",
              condition: {
                type: "chapter",
                chapterSlug: "the-neteru",
                label: "Complete Chapter III to reveal this",
              },
              render: <DuatRaceLauncher />,
            },
            {
              key: "travelers-guide",
              title: "Traveler's Guide to the Duat",
              mode: "carrot",
              teaser: "A field companion for the Twelve Hours of the night journey. Unlocks at 30 Alchemy marks.",
              condition: { type: "alchemy", marks: 30, label: "30 Alchemy marks to unlock" },
              render: (
                <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
                  <p className="font-serif text-lg text-primary">Traveler's Guide to the Duat</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drawn from the Amduat, "That Which Is in the Underworld," the night journey of the sun
                    through twelve hours of the Duat, from sunset to sunrise, each hour its own gate,
                    guardians, and trial.
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-foreground/85">
                    <p>
                      <span className="font-serif text-gold">Hour I, The Gate of the West.</span> The sun
                      barque enters the underworld at the horizon, Ra's day-form giving way to his
                      ram-headed night-form, Auf. The dead and the baboons of the western horizon greet
                      the barque's arrival.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hours II & III, The Waters of Osiris.</span>{" "}
                      The barque is towed through fertile waters, fields and abundant crops on either
                      bank, an image of the Duat's own version of the sustaining Nile.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour IV, The Sand of Sokar.</span> The
                      landscape turns to jagged desert, the barque must transform into a serpent to
                      cross the zigzag path guarded by fire-breathing serpents, the domain of Sokar,
                      god of the necropolis.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour V, The Cavern of Sokar.</span> The
                      deepest and most hidden hour, Sokar's cavern conceals the mystery of resurrection
                      itself, guarded so completely that even Ra's barque cannot see directly into it.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour VI, Union with Osiris.</span> At the
                      lowest point of the journey, Ra's ba unites with Osiris's corpse in the deepest part
                      of the Duat, the moment life and death briefly become a single act, the true source
                      of the sun's power to rise again.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour VII, Apep's Ambush.</span> The serpent
                      of chaos, Apep, attacks the barque directly. Isis and Set together hold him back
                      with magical restraints while Ra passes.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hours VIII & IX, The Cries of the Dead.</span>{" "}
                      The barque passes through caverns where the blessed dead call out for light and
                      air, briefly receiving both as Ra passes their gate.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour X, Restoration of Sight.</span> The
                      drowned and those who died by water are healed, and the Eye of Ra is restored to
                      wholeness, preparing the sun for its return to the visible sky.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour XI, Fire for the Damned.</span> Enemies
                      of Ra, and those judged unfit to continue toward rebirth, are cast into pits of
                      fire tended by serpent-goddesses, final destruction rather than any further
                      transformation.
                    </p>
                    <p>
                      <span className="font-serif text-gold">Hour XII, The Gate of the East.</span> The
                      barque is towed through the body of a vast serpent, entering old and worn at the
                      tail, emerging renewed at the mouth as Khepri, the scarab, the rising sun, reborn
                      to begin the day again.
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Held together, the twelve hours describe a single teaching: descent, confrontation,
                    union with what has died, and renewal, the same cycle the Duat Race asks a player to
                    live out one square at a time.
                  </p>
                </div>
              ),
            },
          ]}
        />
      ) : courseSlug === "faery-shamanism" ? (
        <CourseExtras
          courseSlug={courseSlug}
          items={[
            {
              key: "formulae-codex",
              title: "Formulae Codex",
              mode: "open",
              render: <FaeryFormulaeCodex />,
            },
            {
              key: "hollow-road",
              title: "The Hollow Road",
              mode: "open",
              render: <HollowRoad />,
            },
            {
              key: "materials",
              title: "Course materials",
              mode: "open",
              render: (
                <CourseMaterialsBundle
                  pathway="magick"
                  courseSlug={courseSlug}
                  title={course.title}
                  cover={
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                      <Library className="h-6 w-6 text-gold" />
                    </div>
                  }
                />
              ),
            },
          ]}
        />
      ) : (
        <CourseMaterialsBundle
          pathway="magick"
          courseSlug={courseSlug}
          title={course.title}
          cover={
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
              <Library className="h-6 w-6 text-gold" />
            </div>
          }
        />
      )}

      {/* Embedded video */}
      {course.youtubeId && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-2xl text-primary">
            <Video className="h-5 w-5" /> Course video
          </h2>
          <div className="overflow-hidden rounded-xl border border-border/60 bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${course.youtubeId}?rel=0&modestbranding=1`}
                title={`${course.title}, course video`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Chapter selector */}
      <nav className="mb-6 flex flex-wrap gap-2">
        {course.chapters.map((c) => {
          const done = progress.isComplete(c.slug);
          const isActive = c.slug === activeSlug;
          return (
            <button
              key={c.slug}
              onClick={() => setActiveSlug(c.slug)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
                isActive
                  ? "border-gold bg-gold/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground",
              )}
            >
              <span className="font-serif text-sm">{c.n}</span>
              <span>{c.title}</span>
              {done && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
            </button>
          );
        })}
      </nav>

      {/* Active chapter */}
      <section className="mb-10">
        <ChapterCard key={active.slug} chapter={active} courseSlug={courseSlug} />
      </section>
    </div>
  );
}
