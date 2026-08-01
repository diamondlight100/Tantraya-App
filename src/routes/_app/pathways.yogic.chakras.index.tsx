import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { chakraList } from "@/data/yogic/chakras";
import { ChakraGlyph } from "@/components/course/chakra-glyph";

export const Route = createFileRoute("/_app/pathways/yogic/chakras/")({
  head: () => ({ meta: [{ title: "The Chakras · Tantraya" }] }),
  component: ChakrasOverview,
});

function ChakrasOverview() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/yogic/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Yogic Pathway
      </Link>
      <PageHeader
        title="The Chakras"
        subtitle="The seven main energy centers along the spine, and Soma, the hidden reservoir within the crown, each with its own carrier, presiding deities, colors, and the traditional effects of meditating there."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {chakraList.map((c) => (
          <Link
            key={c.slug}
            to="/pathways/yogic/chakras/$chakraSlug"
            params={{ chakraSlug: c.slug }}
            className="group flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-4 text-center transition hover:border-gold/60"
          >
            <div className="w-24">
              <ChakraGlyph
                petals={c.petals}
                shape={c.tattvaShapeKey}
                tattvaColor={c.tattvaColor}
                ringColor={c.visualColor}
              />
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.order.toString().padStart(2, "0")}
            </p>
            <h3 className="mt-0.5 font-serif text-lg text-primary group-hover:text-gold">
              {c.sanskrit}
            </h3>
            <p className="text-xs text-muted-foreground">{c.english}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
