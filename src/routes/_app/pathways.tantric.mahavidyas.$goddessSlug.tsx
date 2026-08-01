import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { mahavidyaBySlug } from "@/data/tantric/mahavidyas";
import { Yantra } from "@/components/course/yantra";
import { RichLessonLayout, type RichLessonSection } from "@/components/course/rich-lesson-layout";
import { JournalReflection } from "@/components/course/journal-reflection";
import { PauseBell } from "@/components/course/pause-bell";
import { RelatedPractices } from "@/components/course/related-practices";

export const Route = createFileRoute("/_app/pathways/tantric/mahavidyas/$goddessSlug")({
  head: ({ params }) => ({ meta: [{ title: `${params.goddessSlug} · Mahavidyas · Tantraya` }] }),
  component: MahavidyaPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
      This Mahavidya wasn't found.
    </div>
  ),
});

function MahavidyaPage() {
  const { goddessSlug } = Route.useParams();
  const m = mahavidyaBySlug(goddessSlug);
  if (!m) throw notFound();

  const sections: RichLessonSection[] = [
    m.myth && { heading: "The Myth", body: m.myth },
    m.symbolism && { heading: "Symbolism and Image", body: m.symbolism },
    m.energy && { heading: "Understanding the Energy", body: m.energy },
    m.forPractitioner && { heading: "What This Means for a Practitioner", body: m.forPractitioner },
  ].filter((s): s is RichLessonSection => !!s);

  // "At a glance" leads as its own short section when present.
  if (m.atAGlance) {
    sections.unshift({ heading: "At a Glance", body: m.atAGlance });
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/tantric/mahavidyas"
        className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> The Ten Mahavidyas
      </Link>

      <RichLessonLayout
        eyebrow={`Mahavidya ${m.order} of 10`}
        title={m.name}
        epithet={m.epithet}
        accentColor={m.accentColor}
        comingSoon={!m.atAGlance}
        hero={
          <Yantra
            color={m.accentColor}
            petals={m.yantra.petals}
            triangle={m.yantra.triangle}
            enclosure={m.yantra.enclosure}
          />
        }
        sections={sections}
        practices={
          m.practices && (
            <>
              {m.practices.map((p) => (
                <div key={p.title}>
                  <h3 className="font-serif text-base text-primary">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{p.detail}</p>
                </div>
              ))}
              <RelatedPractices
                pathway="tantric"
                courseSlug="mahavidyas"
                lessonSlug={m.slug}
                defaultName={`${m.name} practice`}
                defaultDescription={m.epithet ?? undefined}
                defaultBodyLayer="general"
                defaultMinutes={20}
              />
              <JournalReflection
                courseSlug="mahavidyas"
                lessonSlug={m.slug}
                prompt={`Practices for ${m.name}`}
              />
            </>
          )
        }
        extra={m.slug === "bagalamukhi" ? <PauseBell /> : undefined}
      />
    </div>
  );
}
