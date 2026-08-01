import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CosmologyMap } from "@/components/cosmology-map";

import wuchiImg from "@/assets/daoist/hotspot-wuchi_1784949566019.png";
import taichiImg from "@/assets/daoist/hotspot-taichi_1784949566019.png";
import trigramsImg from "@/assets/daoist/hotspot-trigrams_1784949566019.png";
import baguaImg from "@/assets/daoist/hotspot-bagua_1784949566019.png";
import daoImg from "@/assets/daoist/hotspot-dao_1784949566019.png";
import { daoistCosmologyHotspots, daoistCosmologyIntro } from "@/data/daoist/cosmology";

export const Route = createFileRoute("/_app/pathways/daoist/cosmology")({
  head: () => ({ meta: [{ title: "Cosmological Map · Daoist · Tantraya" }] }),
  component: DaoistCosmologyPage,
});

const IMAGES: Record<string, string> = {
  wuchi: wuchiImg,
  taichi: taichiImg,
  trigrams: trigramsImg,
  bagua: baguaImg,
  dao: daoImg,
};

function DaoistCosmologyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/pathways/daoist/hub"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Daoist Pathway
      </Link>

      <PageHeader
        title="The Cosmological Map"
        subtitle="Wu Chi to Ba Gua: how the ten thousand things unfold from the Great Void, and what that unfolding actually is."
      />

      <CosmologyMap
        intro={daoistCosmologyIntro}
        hotspots={daoistCosmologyHotspots}
        images={IMAGES}
      />

      <div className="mt-10 border-t border-border/60 pt-6">
        <Link
          to="/pathways/daoist/hub"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Daoist Pathway
        </Link>
      </div>
    </div>
  );
}
