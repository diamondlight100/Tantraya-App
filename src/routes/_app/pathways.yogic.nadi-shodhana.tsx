import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { NadiShodhanaWidget } from "@/components/course/nadi-shodhana-widget";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { ChevronLeft, Library } from "lucide-react";

export const Route = createFileRoute("/_app/pathways/yogic/nadi-shodhana")({
  head: () => ({ meta: [{ title: "Nāḍī Śodhana · Tantraya" }] }),
  component: NadiShodhanaPage,
});

function NadiShodhanaPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/pathways/yogic/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Yogic Pathway
      </Link>
      <PageHeader
        title="Nāḍī Śodhana"
        subtitle="Alternate nostril breathing, a five-stage progression from bare mechanics to the subtle channels."
      />

      <CourseMaterialsBundle
        pathway="yogic"
        courseSlug="nadi-shodhana"
        title="Nāḍī Śodhana"
        cover={
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
            <Library className="h-6 w-6 text-gold" />
          </div>
        }
      />

      <NadiShodhanaWidget />

      <div className="mt-8">
        <RelatedPractices
          pathway="yogic"
          courseSlug="nadi-shodhana"
          lessonSlug="full-practice"
          defaultName="Nāḍī Śodhana"
          defaultDescription="Alternate nostril breathing."
          defaultBodyLayer="etheric"
          defaultMinutes={10}
        />
      </div>
    </div>
  );
}
