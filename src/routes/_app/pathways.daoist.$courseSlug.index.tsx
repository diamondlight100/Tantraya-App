import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, CheckCircle2, Circle, Compass, Sparkles, Library } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { lessons } from "@/data/eem-course";
import { useCourseProgress } from "@/lib/course-progress";
import { EightExtrasMap, FiveElementWheel } from "@/components/course/eem-widgets";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/_app/pathways/daoist/$courseSlug/",
)({
  head: () => ({
    meta: [
      { title: "Eight Extraordinary Meridians Qigong · Tantraya" },
      {
        name: "description",
        content:
          "A 12-week interactive Qigong training program on the Eight Extraordinary Meridians, taught at Tantraya Center.",
      },
    ],
  }),
  component: CourseOverview,
});

function CourseOverview() {
  const { courseSlug } = Route.useParams();
  const { state, isComplete, score } = useCourseProgress(courseSlug);
  const completedCount = Object.values(state.completed).filter(Boolean).length;
  const pct = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <Link
        to="/pathways/daoist/hub"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Daoist pathway
      </Link>

      <PageHeader
        title="The Eight Extraordinary Meridians Qigong"
        subtitle="A developmental sequence of thirteen practices, from internal smiling and centering, through sound and emotional alchemy, into the full circulation of the Microcosmic Orbit, the Belt and Thrusting channels, and beyond."
      />

      {/* Progress strip */}
      <section className="rounded-2xl border border-gold/40 bg-gold/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Your progress
            </p>
            <p className="mt-1 font-serif text-2xl text-primary">
              {completedCount} of {lessons.length} practices · {pct}%
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Work through them in sequence. Stay with each practice until it is
            genuinely felt, not just understood.
          </p>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
          <div
            className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </section>

      <CourseMaterialsBundle
        pathway="daoist"
        courseSlug={courseSlug}
        title="The Eight Extraordinary Meridians Qigong"
        courseSlugAliases={["eem", "eight-meridians", "8-meridians", "8-extraordinary-meridians"]}
        cover={
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
            <Library className="h-6 w-6 text-gold" />
          </div>
        }
      />

      {/* Eight Extras interactive map */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Orientation
        </p>
        <h2 className="mt-1 font-serif text-3xl text-primary">
          The Eight Extras
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Of the twenty major channels, eight form the deep structural
          foundation. Hover or tap a name to trace its pathway.
        </p>
        <div className="mt-5">
          <EightExtrasMap />
        </div>
      </section>


      {/* Five Elements */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Operating system
        </p>
        <h2 className="mt-1 font-serif text-3xl text-primary">
          The Five Elements in practice
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every practice in this program draws on the Five Element
          correspondences. Tap an element to read its full chord , 
          season, organ, sense, emotion, sound, virtue, spirit.
        </p>
        <div className="mt-5">
          <FiveElementWheel />
        </div>
      </section>

      {/* Lessons grid */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl text-primary">The 13 practices</h2>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Interactive
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {lessons.map((l) => {
            const done = isComplete(l.slug);
            const sc = score(l.slug);
            return (
              <Link
                key={l.slug}
                to="/pathways/daoist/$courseSlug/$lessonSlug"
                params={{ courseSlug, lessonSlug: l.slug }}
                className={cn(
                  "group block rounded-xl border bg-card/60 p-5 transition",
                  done
                    ? "border-gold/60 hover:border-gold"
                    : "border-border/60 hover:border-gold/60",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-gold" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/60" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                        Practice {l.number}
                      </p>
                      {sc !== null && (
                        <span className="text-[10px] text-muted-foreground">
                          Quiz {sc}%
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-serif text-xl text-primary group-hover:text-gold">
                      {l.title}
                    </h3>
                    <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                      {l.subtitle}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {l.intro}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card/50 p-6">
        <div className="flex items-start gap-3">
          <Compass className="mt-1 h-5 w-5 text-gold" />
          <p className="text-sm text-muted-foreground">
            Some oral instruction lives only in the live class. Return to
            earlier practices whenever later ones feel unstable, the
            foundations are always worth reinforcing.
          </p>
        </div>
      </section>
    </div>
  );
}
