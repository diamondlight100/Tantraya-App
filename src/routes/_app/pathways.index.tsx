import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";

const paths = [
  { name: "Daoist", desc: "Qigong, internal alchemy, the way of nature.", to: "/pathways/daoist" },
  { name: "Buddhist", desc: "Meditation, mindfulness, the dharma.", to: "/pathways/buddhist" },
  { name: "Yogic", desc: "Āsana, prāṇāyāma, the eight limbs.", to: "/pathways/yogic" },
  { name: "Tantric", desc: "Energy, embodiment, sacred union.", to: "/pathways/tantric" },
  { name: "Magick", desc: "Western magick, faery lore, ritual, will.", to: "/pathways/magick" },
] as const;

export const Route = createFileRoute("/_app/pathways/")({
  head: () => ({ meta: [{ title: "Pathways · Tantraya" }] }),
  component: Pathways,
});

function Pathways() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Pathways" subtitle="Choose a stream of practice. Each pathway gathers its own courses, material, forum and homework." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((p) => (
          <Link
            key={p.name}
            to={p.to}
            className="rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
          >
            <h3 className="font-serif text-2xl text-primary">{p.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <p className="mt-4 text-xs text-gold">Enter pathway →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
