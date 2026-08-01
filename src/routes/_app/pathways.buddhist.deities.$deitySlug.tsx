import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { buddhistDeityBySlug } from "@/data/buddhist/deities";
import { RichLessonLayout, type RichLessonSection } from "@/components/course/rich-lesson-layout";
import { JournalReflection } from "@/components/course/journal-reflection";
import { RelatedPractices } from "@/components/course/related-practices";

export const Route = createFileRoute("/_app/pathways/buddhist/deities/$deitySlug")({
  head: ({ params }) => ({ meta: [{ title: `${params.deitySlug} · "Deities" · Tantraya` }] }),
  component: DeityPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
      This figure wasn't found.
    </div>
  ),
});

function DeityPage() {
  const { deitySlug } = Route.useParams();
  const d = buddhistDeityBySlug(deitySlug);
  if (!d) throw notFound();

  const sections: RichLessonSection[] = [
    d.myth && { heading: "Origin and Story", body: d.myth },
    d.symbolism && { heading: "Symbolism and Image", body: d.symbolism },
    d.energy && { heading: "Understanding the Energy", body: d.energy },
    d.forPractitioner && { heading: "What This Means for a Practitioner", body: d.forPractitioner },
  ].filter((s): s is RichLessonSection => !!s);

  if (d.atAGlance) {
    sections.unshift({ heading: "At a Glance", body: d.atAGlance });
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/buddhist/deities"
        className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> "Deities"
      </Link>

      <RichLessonLayout
        eyebrow={`${d.order.toString().padStart(2, "0")} · Buddhist Pathway`}
        title={d.name}
        epithet={d.epithet}
        accentColor={d.accentColor}
        comingSoon={!d.atAGlance}
        hero={
          <img
            src={d.image}
            alt={d.name}
            className="aspect-square w-full rounded-lg border border-[var(--accent)]/40 object-cover object-top"
            style={{ "--accent": d.accentColor } as React.CSSProperties}
          />
        }
        sections={sections}
        practices={
          d.practices && (
            <>
              {d.practices.map((p) => (
                <div key={p.title}>
                  <h3 className="font-serif text-base text-primary">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{p.detail}</p>
                </div>
              ))}
              <RelatedPractices
                pathway="buddhist"
                courseSlug={`deity-${d.slug}`}
                lessonSlug={d.slug}
                defaultName={`${d.name} Practice`}
                defaultDescription={d.epithet ?? `Practices for ${d.name}.`}
                defaultBodyLayer="general"
                defaultMinutes={20}
              />
              <JournalReflection
                courseSlug={`deity-${d.slug}`}
                lessonSlug={d.slug}
                prompt={`Practices for ${d.name}`}
              />
            </>
          )
        }
      />
    </div>
  );
}
