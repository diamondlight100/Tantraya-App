import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Library } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { CourseJournalHistory } from "@/components/course/journal-reflection";
import { titleCaseSlug } from "@/lib/slugify";
import { pathwayLabels } from "@/lib/homework";

export const Route = createFileRoute("/_app/courses/$pathway/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${titleCaseSlug(params.slug)} · Tantraya` }],
  }),
  component: () => {
    const { pathway, slug } = Route.useParams();
    return <SelfStudyCourse pathway={pathway} slug={slug} />;
  },
});

/**
 * The generic page for a "self-study" course, one that exists only because
 * material has been tagged with its course slug, with no hand-built chapter
 * UI of its own. Unlike the interactive course pages, there's nothing else
 * to show but the gathered material itself, so the bundle opens by default
 * rather than making a student click twice to see the one thing here.
 */
export function SelfStudyCourse({ pathway, slug }: { pathway: string; slug: string }) {
  const title = titleCaseSlug(slug);
  const pathwayLabel = pathwayLabels[pathway] ?? titleCaseSlug(pathway);

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/courses"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> {pathwayLabel} · Courses
      </Link>
      <PageHeader
        title={title}
        subtitle="A self-study course, explore the material gathered for it at your own pace."
      />

      <div className="mb-8 rounded-xl border border-border/60 bg-card/50 p-5">
        <p className="text-sm text-foreground/85">
          A self-study course: written teachings, audio and video for it all live together below,
          rather than a chapter-by-chapter path. Open it up and move through it at your own pace.
        </p>
      </div>

      <CourseMaterialsBundle
        pathway={pathway}
        courseSlug={slug}
        title={title}
        cover={
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
            <Library className="h-6 w-6 text-gold" />
          </div>
        }
      />

      <div className="mt-10">
        <CourseJournalHistory courseSlug={slug} />
      </div>
    </div>
  );
}
