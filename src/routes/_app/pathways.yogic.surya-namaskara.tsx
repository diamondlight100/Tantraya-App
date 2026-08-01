import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { SuryaNamaskaraWidget } from "@/components/course/surya-namaskara-widget";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import { ChevronLeft, Library } from "lucide-react";

export const Route = createFileRoute("/_app/pathways/yogic/surya-namaskara")({
  head: () => ({ meta: [{ title: "Sūrya Namaskāra · Tantraya" }] }),
  component: SuryaNamaskaraPage,
});

function SuryaNamaskaraPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/pathways/yogic/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Yogic Pathway
      </Link>
      <PageHeader
        title="Sūrya Namaskāra"
        subtitle="Sun Salutation, a single, complete practice, built in layers. Click any position to begin; adjust the depth as your practice grows."
      />

      <CourseMaterialsBundle
        pathway="yogic"
        courseSlug="surya-namaskara"
        title="Sūrya Namaskāra"
        cover={
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
            <Library className="h-6 w-6 text-gold" />
          </div>
        }
      />

      <SuryaNamaskaraWidget />

      <div className="mt-8">
        <RelatedPractices
          pathway="yogic"
          courseSlug="surya-namaskara"
          lessonSlug="full-sequence"
          defaultName="Sūrya Namaskāra"
          defaultDescription="Sun Salutation, the full twelve-position round."
          defaultBodyLayer="physical"
          defaultMinutes={15}
        />
      </div>
    </div>
  );
}
