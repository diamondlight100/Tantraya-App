import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { mahavidyas } from "@/data/tantric/mahavidyas";
import { Yantra } from "@/components/course/yantra";
import { CourseJournalHistory } from "@/components/course/journal-reflection";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";

export const Route = createFileRoute("/_app/pathways/tantric/mahavidyas/")({
  head: () => ({ meta: [{ title: "The Ten Mahavidyas · Tantraya" }] }),
  component: MahavidyasOverview,
});

function MahavidyasOverview() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Tantric Pathway
      </Link>
      <PageHeader
        title="The Ten Mahavidyas"
        subtitle="Ten faces of the Goddess, moving through death, fear, sacrifice, stillness, and abundance, each a different wisdom, met one at a time."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {mahavidyas.map((m) => (
          <Link
            key={m.slug}
            to="/pathways/tantric/mahavidyas/$goddessSlug"
            params={{ goddessSlug: m.slug }}
            className="group flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-4 text-center transition hover:border-[var(--accent)]"
            style={{ "--accent": m.accentColor } as React.CSSProperties}
          >
            <div className="w-20">
              <Yantra
                color={m.accentColor}
                petals={m.yantra.petals}
                triangle={m.yantra.triangle}
                enclosure={m.yantra.enclosure}
              />
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {m.order.toString().padStart(2, "0")}
            </p>
            <h3 className="mt-0.5 font-serif text-lg text-primary group-hover:text-[var(--accent)]">
              {m.name}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <CourseMaterialsBundle
          pathway="tantric"
          courseSlug="mahavidyas"
          title="The Ten Mahavidyas"
          otherGroupTitle="General Mahavidyas material"
          materialGroups={mahavidyas.map((m) => ({
            title: m.name,
            slugs:
              m.slug === "tripura-sundari"
                ? [m.slug, "tripurasundari", "shodashi"]
                : m.slug === "bhuvaneshvari"
                  ? [m.slug, "bhuvaneswari"]
                  : m.slug === "chinnamasta"
                    ? [m.slug, "chinnamastika"]
                    : m.slug === "bagalamukhi"
                      ? [m.slug, "bagala"]
                      : m.slug === "kamala"
                        ? [m.slug, "kamalatmika"]
                        : [m.slug],
          }))}
          cover={
            <div className="w-12">
              <Yantra color="#eab308" petals={10} triangle="up" enclosure />
            </div>
          }
        />
      </div>

      <div className="mt-10">
        <CourseJournalHistory courseSlug="mahavidyas" />
      </div>
    </div>
  );
}
