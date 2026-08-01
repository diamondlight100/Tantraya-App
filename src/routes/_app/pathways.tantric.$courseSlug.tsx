import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import {
  ChevronLeft,
  BookOpen,
  Wind,
  ClipboardCheck,
  NotebookPen,
  CheckCircle2,
  Circle,
  Sparkles,
  Flower2,
  Library,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tantraChapters, type TantraChapter } from "@/data/tantric/way-of-the-goddess";
import { useCourseProgress } from "@/lib/course-progress";
import { PracticeTimer, Quiz, JournalEntry } from "@/components/course/eem-widgets";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { CourseExtras } from "@/components/course/course-extras";
import {
  CorePrinciplesWheel,
  TantraTimeline,
  PathCompass,
  PracticeArcStepper,
  OmVisualizer,
  KoshaPyramid,
  ChakraExplorer,
  DakiniGallery,
  SoundCircuits,
  DigitalMala,
  MatrikaChant,
  KaraNyasa,
} from "@/components/course/tantra-widgets";

export const Route = createFileRoute("/_app/pathways/tantric/$courseSlug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.courseSlug} · Tantric · Tantraya` }],
  }),
  component: TantricCourse,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
      Course not found.
    </div>
  ),
});

const courses = {
  "way-of-the-goddess": {
    title: "The Way of the Goddess",
    subtitle:
      "An exploration of the history, philosophy, and living practices of Tantra, from its ancient roots in the Indus Valley to the intricate cosmology of the chakra system, the sacred power of mantra, and the transformative rituals of the Goddess traditions.",
    youtubeId: undefined as string | undefined,
    chapters: tantraChapters,
  },
} as const;

function ChapterWidget({ kind }: { kind?: TantraChapter["widget"] }) {
  switch (kind) {
    case "core-principles":
      return <CorePrinciplesWheel />;
    case "timeline":
      return <TantraTimeline />;
    case "path-compass":
      return <PathCompass />;
    case "practice-arc":
      return <PracticeArcStepper />;
    case "om-visualizer":
      return <OmVisualizer />;
    case "kosha-pyramid":
      return <KoshaPyramid />;
    case "chakra-explorer":
      return <ChakraExplorer />;
    case "dakini-gallery":
      return <DakiniGallery />;
    case "sound-circuits":
      return <SoundCircuits />;
    case "digital-mala":
      return <DigitalMala />;
    case "matrika-chant":
      return <MatrikaChant />;
    case "kara-nyasa":
      return <KaraNyasa />;
    default:
      return null;
  }
}

function ChapterCard({ chapter, courseSlug }: { chapter: TantraChapter; courseSlug: string }) {
  const progress = useCourseProgress(courseSlug);
  const done = progress.isComplete(chapter.slug);
  const score = progress.score(chapter.slug);

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

      <Tabs defaultValue="read" className="w-full">
        <TabsList className={cn("grid w-full", chapter.practice ? "grid-cols-4" : "grid-cols-3")}>
          <TabsTrigger value="read">
            <BookOpen className="mr-1 h-3.5 w-3.5" />
            Read
          </TabsTrigger>
          {chapter.practice && (
            <TabsTrigger value="practice">
              <Wind className="mr-1 h-3.5 w-3.5" />
              Practice
            </TabsTrigger>
          )}
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
              <h4 className="font-serif text-lg text-primary">{s.heading}</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {s.body}
              </p>
            </section>
          ))}
          {!chapter.practice && <ChapterWidget kind={chapter.widget} />}
        </TabsContent>

        {chapter.practice && (
          <TabsContent value="practice" className="mt-5 space-y-5">
            <ChapterWidget kind={chapter.widget} />
            {chapter.practice.steps.length > 0 && <PracticeTimer steps={chapter.practice.steps} />}
            <RelatedPractices
              pathway="tantric"
              courseSlug={courseSlug}
              lessonSlug={chapter.slug}
              defaultName={`${chapter.title}. Practice`}
              defaultDescription={chapter.subtitle}
              defaultBodyLayer="etheric"
            />
          </TabsContent>
        )}

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
          onClick={() => progress.markComplete(chapter.slug, !done)}
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

function TantricCourse() {
  const { courseSlug } = Route.useParams();
  const course = courses[courseSlug as keyof typeof courses];
  if (!course) throw notFound();

  const progress = useCourseProgress(courseSlug);
  const completed = course.chapters.filter((c) => progress.isComplete(c.slug)).length;
  const pct = Math.round((completed / course.chapters.length) * 100);
  const [activeSlug, setActiveSlug] = useState(course.chapters[0].slug);
  const active = course.chapters.find((c) => c.slug === activeSlug)!;
  const [toolsTab, setToolsTab] = useState<"chakras" | "mala">("chakras");
  const toolsUnlockCondition = {
    type: "chapter" as const,
    chapterSlug: "scripture-and-cosmology",
    label: "Complete Chapter III to unlock",
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Tantric Pathway
      </Link>
      <PageHeader title={course.title} subtitle={course.subtitle} />

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

      <CourseExtras
        courseSlug={courseSlug}
        items={[
          {
            key: "materials",
            title: "Course materials",
            mode: "open",
            render: (
              <CourseMaterialsBundle
                pathway="tantric"
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
            key: "tools",
            title: "Chakra Explorer & Digital Mālā",
            mode: "carrot",
            teaser: "Interactive chakra map and mālā practice tools, unlock as you move through the material.",
            condition: toolsUnlockCondition,
            render: (
              <div>
                <h2 className="mb-3 flex items-center gap-2 font-serif text-2xl text-primary">
                  <Flower2 className="h-5 w-5" /> Explore
                </h2>
                <div className="mb-3 flex gap-2">
                  <button
                    onClick={() => setToolsTab("chakras")}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition",
                      toolsTab === "chakras"
                        ? "border-gold bg-gold/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-gold/50",
                    )}
                  >
                    Chakra Explorer
                  </button>
                  <button
                    onClick={() => setToolsTab("mala")}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition",
                      toolsTab === "mala"
                        ? "border-gold bg-gold/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-gold/50",
                    )}
                  >
                    Digital Mālā
                  </button>
                </div>
                {toolsTab === "chakras" ? <ChakraExplorer /> : <DigitalMala />}
              </div>
            ),
          },
        ]}
      />

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
        <ChapterCard chapter={active} courseSlug={courseSlug} />
      </section>
    </div>
  );
}
