import { createFileRoute, Link } from "@tanstack/react-router";
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
  Library,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tratakaChapters, type TratakaChapter } from "@/data/core/trataka-course";
import { useCourseProgress } from "@/lib/course-progress";
import { PracticeTimer, Quiz, JournalEntry } from "@/components/course/eem-widgets";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseExtras } from "@/components/course/course-extras";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import {
  EyeExercisesGuide,
  TratakaGallery,
  FlameGazePractice,
  HemisphereConvergence,
  SecondAttentionSequencer,
  AkashaDescent,
} from "@/components/course/trataka-widgets";

export const Route = createFileRoute("/_app/core/trataka")({
  head: () => ({ meta: [{ title: "Trataka: The Steady Gaze · Yogic · Tantraya" }] }),
  component: TratakaCourse,
});

const COURSE_SLUG = "trataka";

function ChapterWidget({ kind }: { kind?: TratakaChapter["widget"] }) {
  switch (kind) {
    case "eye-exercises":
      return <EyeExercisesGuide />;
    case "tratakas-list":
      return <TratakaGallery />;
    case "flame-gaze":
      return <FlameGazePractice />;
    case "hemisphere-convergence":
      return <HemisphereConvergence />;
    case "second-attention":
      return <SecondAttentionSequencer />;
    case "akasha-descent":
      return <AkashaDescent />;
    default:
      return null;
  }
}

function ChapterCard({ chapter }: { chapter: TratakaChapter }) {
  const progress = useCourseProgress(COURSE_SLUG);
  const done = progress.isComplete(chapter.slug);
  const score = progress.score(chapter.slug);

  return (
    <article className="rounded-2xl border border-border/60 bg-card/50 p-5 sm:p-6">
      <header className="mb-5 flex items-start gap-4">
        <span className="font-serif text-3xl text-gold">{chapter.n}</span>
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-primary">{chapter.title}</h3>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{chapter.subtitle}</p>
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
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{s.body}</p>
            </section>
          ))}
        </TabsContent>

        <TabsContent value="practice" className="mt-5 space-y-5">
          <ChapterWidget kind={chapter.widget} />
          <PracticeTimer steps={chapter.practice.steps} />
          <RelatedPractices
            pathway="yogic"
            courseSlug={COURSE_SLUG}
            lessonSlug={chapter.slug}
            defaultName={`${chapter.title}. Practice`}
            defaultDescription={chapter.subtitle}
            defaultBodyLayer="etheric"
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

function TratakaCourse() {
  const progress = useCourseProgress(COURSE_SLUG);
  const completed = tratakaChapters.filter((c) => progress.isComplete(c.slug)).length;
  const pct = Math.round((completed / tratakaChapters.length) * 100);
  const [activeSlug, setActiveSlug] = useState(tratakaChapters[0].slug);
  const active = tratakaChapters.find((c) => c.slug === activeSlug)!;

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/core"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Core Curriculum
      </Link>
      <PageHeader
        title="Trataka: The Steady Gaze"
        subtitle="The discipline of the fixed gaze, from eye preparation through the full candle practice, the neuroscience and subtle-body meaning of the two eyes becoming one, and the deeper thread of the second attention and the akashic trance."
      />

      <div className="mb-6 rounded-xl border border-gold/30 bg-card/40 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Your progress
          </span>
          <span>
            {completed} / {tratakaChapters.length} chapters
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
          <div className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <CourseExtras
        courseSlug={COURSE_SLUG}
        items={[
          {
            key: "materials",
            title: "Course materials",
            mode: "open",
            render: (
              <CourseMaterialsBundle
                pathway="yogic"
                courseSlug={COURSE_SLUG}
                title="Trataka: The Steady Gaze"
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

      <nav className="mb-6 mt-6 flex flex-wrap gap-2">
        {tratakaChapters.map((c) => {
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

      <section className="mb-10">
        <ChapterCard chapter={active} />
      </section>
    </div>
  );
}
