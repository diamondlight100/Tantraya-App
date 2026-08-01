import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Wind,
  ClipboardCheck,
  NotebookPen,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lessons, lessonBySlug, type Lesson } from "@/data/eem-course";
import { useCourseProgress } from "@/lib/course-progress";
import {
  PracticeTimer,
  BaGuaWidget,
  PearlBreath,
  FiveElementWheel,
  HealingSoundsPlayer,
  CollectionPointsWidget,
  VirtuesWheel,
  MicrocosmicOrbit,
  DaiMaiRings,
  ChongMaiColumn,
  MacrocosmicOrbit,
  PointsTable,
  HeavenEarth,
  Quiz,
  JournalEntry,
} from "@/components/course/eem-widgets";
import { RelatedPractices } from "@/components/course/related-practices";

export const Route = createFileRoute(
  "/_app/pathways/daoist/$courseSlug/$lessonSlug",
)({
  loader: ({ params }) => {
    const lesson = lessonBySlug(params.lessonSlug);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.lesson.title} · Eight Extraordinary Meridians` },
          { name: "description", content: loaderData.lesson.intro.slice(0, 150) },
        ]
      : [],
  }),
  component: LessonPage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">
      Lesson not found.
    </div>
  ),
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">
      Something went wrong loading this lesson.
    </div>
  ),
});

function Widget({ kind, gender }: { kind?: Lesson["widget"]; gender: "male" | "female" }) {
  switch (kind) {
    case "ba-gua":            return <BaGuaWidget gender={gender} />;
    case "pearl-breath":      return <PearlBreath />;
    case "five-element-wheel":return <FiveElementWheel />;
    case "healing-sounds":    return <HealingSoundsPlayer />;
    case "collection-points": return <CollectionPointsWidget />;
    case "virtues-wheel":     return <VirtuesWheel />;
    case "microcosmic-orbit": return <MicrocosmicOrbit />;
    case "dai-mai-rings":     return <DaiMaiRings />;
    case "chong-mai-column":  return <ChongMaiColumn />;
    case "macrocosmic-orbit": return <MacrocosmicOrbit />;
    case "points-table":      return <PointsTable />;
    case "heaven-earth":      return <HeavenEarth />;
    default:                  return null;
  }
}

function LessonPage() {
  const { courseSlug, lessonSlug } = Route.useParams();
  const lesson = lessonBySlug(lessonSlug)!;
  const progress = useCourseProgress(courseSlug);
  const done = progress.isComplete(lessonSlug);
  const [gender, setGender] = useState<"male" | "female">("male");

  const idx = lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Link
        to="/pathways/daoist/$courseSlug"
        params={{ courseSlug }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Course overview
      </Link>

      <header>
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
          Practice {lesson.number} of {lessons.length}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
          {lesson.subtitle}
        </p>
        <p className="mt-5 max-w-2xl text-base text-foreground/80">
          {lesson.intro}
        </p>
      </header>

      <Tabs defaultValue="read" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="read"><BookOpen className="mr-1 h-3.5 w-3.5" />Read</TabsTrigger>
          <TabsTrigger value="practice"><Wind className="mr-1 h-3.5 w-3.5" />Practice</TabsTrigger>
          <TabsTrigger value="quiz"><ClipboardCheck className="mr-1 h-3.5 w-3.5" />Quiz</TabsTrigger>
          <TabsTrigger value="journal"><NotebookPen className="mr-1 h-3.5 w-3.5" />Journal</TabsTrigger>
        </TabsList>

        <TabsContent value="read" className="mt-6 space-y-5">
          {lesson.sections.map((s, i) => (
            <section key={i} className="rounded-xl border border-border/60 bg-card/40 p-5">
              <h3 className="font-serif text-xl text-primary">{s.heading}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {s.body}
              </p>
            </section>
          ))}
          {lesson.closing && (
            <p className="border-l-2 border-gold pl-4 font-serif text-base italic text-muted-foreground">
              {lesson.closing}
            </p>
          )}
        </TabsContent>

        <TabsContent value="practice" className="mt-6 space-y-5">
          {lesson.widget === "ba-gua" && (
            <div className="flex justify-end">
              <div className="inline-flex rounded-full border border-border/60 p-1 text-xs">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={cn(
                      "rounded-full px-3 py-1 capitalize",
                      gender === g ? "bg-gold/15 text-primary" : "text-muted-foreground",
                    )}
                  >
                    {g === "male" ? "Men" : "Women"}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Widget kind={lesson.widget} gender={gender} />
          <PracticeTimer steps={lesson.practice.steps} />
          <RelatedPractices
            pathway="daoist"
            courseSlug={courseSlug}
            lessonSlug={lessonSlug}
            defaultName={lesson.title}
            defaultDescription={lesson.subtitle}
            defaultBodyLayer="etheric"
          />
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <Quiz
            questions={lesson.quiz}
            onScore={(pct) => progress.setScore(lessonSlug, pct)}
          />
        </TabsContent>

        <TabsContent value="journal" className="mt-6">
          <JournalEntry
            value={progress.journal(lessonSlug)}
            onChange={(v) => progress.setJournal(lessonSlug, v)}
            prompts={lesson.journalPrompts}
          />
        </TabsContent>
      </Tabs>

      {/* Completion + nav */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-5">
        <Button
          variant={done ? "outline" : "default"}
          onClick={() => progress.markComplete(lessonSlug, !done)}
        >
          {done ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Completed, mark unfinished
            </>
          ) : (
            <>
              <Circle className="h-4 w-4" /> Mark practice complete
            </>
          )}
        </Button>
        <div className="flex gap-2">
          {prev && (
            <Link
              to="/pathways/daoist/$courseSlug/$lessonSlug"
              params={{ courseSlug, lessonSlug: prev.slug }}
              className="inline-flex items-center gap-1 rounded-md border border-border/60 px-3 py-1.5 text-sm hover:border-gold/60"
            >
              <ChevronLeft className="h-4 w-4" /> {prev.title}
            </Link>
          )}
          {next && (
            <Link
              to="/pathways/daoist/$courseSlug/$lessonSlug"
              params={{ courseSlug, lessonSlug: next.slug }}
              className="inline-flex items-center gap-1 rounded-md bg-gold px-3 py-1.5 text-sm text-gold-foreground hover:opacity-90"
            >
              {next.title} <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
