import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { ArrowLeft } from "lucide-react";
import { TreeOfLifeWidget } from "@/components/course/tree-of-life-widget";
import { RelatedPractices } from "@/components/course/related-practices";

export const Route = createFileRoute("/_app/pathways/magick/tree-of-life")({
  head: () => ({ meta: [{ title: "The Tree of Life · Magick Pathway · Tantraya" }] }),
  component: TreeOfLifePage,
});

function TreeOfLifePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/magick/hub"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to the Magick Pathway
      </Link>

      <PageHeader
        title="The Qabalistic Tree of Life"
        subtitle="An interactive map of the ten Sephiroth and twenty-two Paths, with correspondences drawn from Crowley's 777 and Godwin's Cabalistic Encyclopedia. Click any sphere or path to open its full correspondence table."
      />

      <TreeOfLifeWidget />

      <div className="mt-8">
        <RelatedPractices
          pathway="magick"
          courseSlug="tree-of-life"
          lessonSlug="overview"
          defaultName="Tree of Life pathworking"
          defaultDescription="Meditation on a Sephirah or Path from the Tree."
          defaultBodyLayer="mental"
          defaultMinutes={20}
        />
      </div>

      <div className="mt-8 rounded-xl border border-border/50 bg-card/40 p-5 text-sm text-muted-foreground">
        <p>
          A note on sources and scope: the correspondences here follow the standard Golden Dawn attribution
          tables as reorganized and expanded by Crowley in 777, cross-checked against Godwin's Cabalistic
          Encyclopedia. Where Crowley deliberately revised the older Golden Dawn scheme, most notably swapping
          The Emperor and The Star between paths 15 and 28, that revision is used here and noted directly on
          those two paths. As with any correspondence table inherited from several centuries of synthesis
          between Hebrew Qabalah, Hermeticism, and post-Renaissance ceremonial magick, some entries (especially
          animals, plants, and gems) vary between authors; what's given here reflects the most commonly cited
          attribution in each case.
        </p>
      </div>
    </div>
  );
}
