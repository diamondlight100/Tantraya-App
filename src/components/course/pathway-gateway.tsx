import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * A pathway's opening gateway page: full hero image of that tradition's
 * threshold (gate / door / portal in its own visual language), an intro to
 * the tradition, and a "step through" animation that zooms into the
 * threshold and dissolves to mist before landing on the pathway's hub.
 *
 * Reused per pathway (Daoist, Buddhist, Yogic, Tantric, Magick) with each
 * tradition's own image and copy — the mechanism is shared, the content and
 * mood are not.
 */
export function PathwayGateway({
  kicker,
  title,
  tagline,
  paragraphs,
  heroImage,
  heroAlt,
  ctaLabel = "Step through",
  to,
  mistColor = "245 240 224", // warm parchment mist, works across pathways; override per-pathway if needed
  footNote,
}: {
  kicker: string;
  title: string;
  tagline: string;
  paragraphs: string[];
  heroImage: string;
  heroAlt: string;
  ctaLabel?: string;
  to: string;
  mistColor?: string;
  /** One short, quiet line (not a paragraph) on how this pathway relates to the others. Same brief line on every pathway page, not repeated as a full paragraph. */
  footNote?: string;
}) {
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();

  function enter() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      navigate({ to });
    }, 900);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60">
        <div className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[520px]">
          <img
            src={heroImage}
            alt={heroAlt}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-in",
              opening && "scale-[2.4]",
            )}
            style={{ transformOrigin: "50% 42%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-in"
            style={{
              backgroundColor: `rgb(${mistColor})`,
              opacity: opening ? 1 : 0,
              transitionDelay: opening ? "150ms" : "0ms",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{kicker}</p>
            <h1 className="heading-ornament mt-2 break-words font-serif text-4xl text-primary sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{tagline}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={enter}
          disabled={opening}
          className={cn(
            "group inline-flex items-center gap-3 rounded-full border border-gold/60 bg-card/70 px-8 py-4 font-serif text-lg text-primary transition",
            "hover:border-gold hover:bg-gold/10",
            opening && "opacity-60",
          )}
        >
          {opening ? "Crossing the threshold…" : ctaLabel}
          <ArrowRight className="h-4 w-4 text-gold transition group-hover:translate-x-1" />
        </button>
      </div>

      {footNote && (
        <p className="mt-6 text-center text-xs italic text-muted-foreground/70">{footNote}</p>
      )}
    </div>
  );
}
