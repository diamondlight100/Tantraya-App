import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PlanetaryHoursWidget } from "@/components/course/planetary-hours-widget";

export const Route = createFileRoute("/_app/pathways/magick/hours")({
  head: () => ({ meta: [{ title: "Magical Hours · Magick Pathway · Tantraya" }] }),
  component: HoursPage,
});

function HoursPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/magick/hub"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to the Magick Pathway
      </Link>

      <PageHeader
        title="Magical Hours"
        subtitle="The planetary hours, their ruling angels, and what the planets are doing right now — a working timing tool for any ritual, talisman, or spagyric work across the whole Magick pathway."
      />

      <PlanetaryHoursWidget />

      <div className="mt-8 rounded-xl border border-gold/40 bg-card/60 p-5">
        <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
          <Sparkles className="h-3 w-3" /> Use it with
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            to="/pathways/magick/spagyrics"
            className="rounded-lg border border-border/50 bg-secondary/20 p-4 text-sm transition hover:border-gold/50"
          >
            <span className="font-medium text-foreground/90">Alchemy: Spagyrics</span>
            <p className="mt-1 text-muted-foreground">
              Begin calcinations and distillations in the hour of the planet that governs the herb or Operation.
            </p>
          </Link>
          <Link
            to="/pathways/magick/tree-of-life"
            className="rounded-lg border border-border/50 bg-secondary/20 p-4 text-sm transition hover:border-gold/50"
          >
            <span className="font-medium text-foreground/90">The Qabalistic Tree of Life</span>
            <p className="mt-1 text-muted-foreground">
              Match a Sephirah's planet to its ruling hour for pathworking, talismans, or invocation.
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border/50 bg-card/40 p-5 text-sm text-muted-foreground">
        <p>
          A note on sources and scope: the hour sequence follows the standard Chaldean order (Saturn, Jupiter, Mars,
          Sun, Venus, Mercury, Moon, repeating), with each day's own ruling planet always opening its first hour —
          the method given by every classical and modern source on planetary hours. The ruling angel for each hour
          comes from the Heptameron of Pietro d'Abano (printed together with Agrippa's Fourth Book), whose angel
          sequence (Michael/Sun, Anael/Venus, Raphael/Mercury, Gabriel/Moon, Cassiel/Saturn, Sachiel/Jupiter,
          Samael/Mars) was checked directly against its own printed hour tables rather than assumed. Sunrise, sunset,
          and the planetary positions shown are calculated for the exact moment you load this page, from real
          astronomical data, not looked up from a fixed table — so they stay accurate wherever and whenever you use
          it. Positions are tropical, geocentric, apparent.
        </p>
      </div>
    </div>
  );
}
