import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
import type { FaeryChapter } from "@/data/magick/faery-shamanism";
import { useCourseProgress } from "@/lib/course-progress";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { PracticeTimer, Quiz, JournalEntry } from "@/components/course/eem-widgets";

export const Route = createFileRoute("/_app/pathways/yogic/$courseSlug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.courseSlug} · Yogic · Tantraya` }],
  }),
  component: YogicCourse,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
      Course not found.
    </div>
  ),
});

type YogicChapter = FaeryChapter;
type YogicCourseDef = {
  title: string;
  subtitle: string;
  youtubeId?: string;
  chapters: YogicChapter[];
};

// Add the pathway's first course here, e.g.:
//   import { eightLimbsChapters } from "@/data/yogic/eight-limbs";
//   "eight-limbs": { title: "The Eight Limbs", subtitle: "...", chapters: eightLimbsChapters },
const courses: Record<string, YogicCourseDef> = {};

function ChapterCard({ chapter, courseSlug }: { chapter: YogicChapter; courseSlug: string }) {
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
              <h4 className="font-serif text-lg text-primary">{s.heading}</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {s.body}
              </p>
            </section>
          ))}
        </TabsContent>

        <TabsContent value="practice" className="mt-5 space-y-5">
          <PracticeTimer steps={chapter.practice.steps} />
          <RelatedPractices
            pathway="yogic"
            courseSlug={courseSlug}
            lessonSlug={chapter.slug}
            defaultName={`${chapter.title}. Practice`}
            defaultDescription={chapter.subtitle}
            defaultBodyLayer="physical"
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

function YogicCourse() {
  const { courseSlug } = Route.useParams();
  const course = courses[courseSlug];
  if (!course) throw notFound();

  const progress = useCourseProgress(courseSlug);
  const completed = course.chapters.filter((c) => progress.isComplete(c.slug)).length;
  const pct = Math.round((completed / course.chapters.length) * 100);
  const [activeSlug, setActiveSlug] = useState(course.chapters[0]?.slug ?? "");
  const active = course.chapters.find((c) => c.slug === activeSlug);

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/yogic/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Yogic Pathway
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

      <CourseMaterialsBundle
        pathway="yogic"
        courseSlug={courseSlug}
        title={course.title}
        cover={
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
            <Library className="h-6 w-6 text-gold" />
          </div>
        }
      />

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
      {course.chapters.length > 0 && (
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
      )}

      {/* Active chapter */}
      {active && (
        <section className="mb-10">
          <ChapterCard chapter={active} courseSlug={courseSlug} />
        </section>
      )}
    </div>
  );
}
