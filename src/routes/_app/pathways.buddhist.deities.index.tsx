import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { buddhistDeities } from "@/data/buddhist/deities";

export const Route = createFileRoute("/_app/pathways/buddhist/deities/")({
  head: () => ({ meta: [{ title: '"Deities" · Buddhist Pathway · Tantraya' }] }),
  component: BuddhistDeitiesOverview,
});

function BuddhistDeitiesOverview() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/buddhist/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Buddhist Pathway
      </Link>
      <PageHeader
        title={'"Deities"'}
        subtitle="Bodhisattvas, yidams, and buddhas, not deities in the theistic sense, hence the quotation marks. Each one a figure to work with, not to worship as separate from mind itself."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {buddhistDeities.map((d) => (
          <Link
            key={d.slug}
            to="/pathways/buddhist/deities/$deitySlug"
            params={{ deitySlug: d.slug }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/60 text-center transition hover:border-[var(--accent)]"
            style={{ "--accent": d.accentColor } as React.CSSProperties}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
            </div>
            <div className="p-4 pt-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {d.order.toString().padStart(2, "0")}
              </p>
              <h3 className="mt-0.5 font-serif text-lg text-primary group-hover:text-[var(--accent)]">
                {d.name}
              </h3>
              {d.epithet && (
                <p className="mt-0.5 text-[11px] italic text-muted-foreground">{d.epithet}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
