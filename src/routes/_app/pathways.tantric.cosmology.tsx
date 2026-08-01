import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CosmologyMap } from "@/components/cosmology-map";

import embraceImg from "@/assets/tantric/hotspot-embrace_1784949566019.png";
import tattvasImg from "@/assets/tantric/hotspot-tattvas_1784949566019.png";
import kalaImg from "@/assets/tantric/hotspot-kala_1784949566019.png";
import shivaImg from "@/assets/tantric/hotspot-shiva_1784949566019.png";
import desireImg from "@/assets/tantric/hotspot-desire_1784949566019.png";
import { tantricCosmologyHotspots, tantricCosmologyIntro } from "@/data/tantric/cosmology";

export const Route = createFileRoute("/_app/pathways/tantric/cosmology")({
  head: () => ({ meta: [{ title: "Cosmological Map · Tantric · Tantraya" }] }),
  component: TantricCosmologyPage,
});

const IMAGES: Record<string, string> = {
  embrace: embraceImg,
  tattvas: tattvasImg,
  kala: kalaImg,
  shiva: shivaImg,
  desire: desireImg,
};

function TantricCosmologyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Tantric Pathway
      </Link>

      <PageHeader
        title="The Cosmological Map"
        subtitle="The Thirty-Six Tattvas: Śiva and Śakti, Consciousness and Energy, in eternal embrace."
      />

      <CosmologyMap
        intro={tantricCosmologyIntro}
        hotspots={tantricCosmologyHotspots}
        images={IMAGES}
      />

      <div className="mt-10 border-t border-border/60 pt-6">
        <Link
          to="/pathways/tantric/hub"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Tantric Pathway
        </Link>
      </div>
    </div>
  );
}
