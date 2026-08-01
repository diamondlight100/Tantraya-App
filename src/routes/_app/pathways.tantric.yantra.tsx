import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { mahavidyas } from "@/data/tantric/mahavidyas";
import { RelatedPractices } from "@/components/course/related-practices";

import kaliImg from "@/assets/yantras/kali-original.jpeg";
import taraImg from "@/assets/yantras/tara-line.png";
import tripuraSundariImg from "@/assets/yantras/tripura-sundari-original.jpeg";
import bhuvaneshvariImg from "@/assets/yantras/bhuvaneshvari-line.png";
import chinnamastaImg from "@/assets/yantras/chinnamasta-line.png";
import bhairaviImg from "@/assets/yantras/bhairavi-line.png";
import dhumavatiImg from "@/assets/yantras/dhumavati-line.png";
import bagalamukhiImg from "@/assets/yantras/bagalamukhi-line.png";
import matangiImg from "@/assets/yantras/matangi-line.png";
import kamalaImg from "@/assets/yantras/kamala-original.jpeg";

export const Route = createFileRoute("/_app/pathways/tantric/yantra")({
  head: () => ({ meta: [{ title: "Yantra · Tantric · Tantraya" }] }),
  component: YantraPage,
});

const yantraImages: Record<string, string> = {
  kali: kaliImg,
  tara: taraImg,
  "tripura-sundari": tripuraSundariImg,
  bhuvaneshvari: bhuvaneshvariImg,
  chinnamasta: chinnamastaImg,
  bhairavi: bhairaviImg,
  dhumavati: dhumavatiImg,
  bagalamukhi: bagalamukhiImg,
  matangi: matangiImg,
  kamala: kamalaImg,
};

function YantraPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/tantric/hub"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Tantric Pathway
      </Link>
      <PageHeader
        title="Yantra"
        subtitle="The Ten Mahavidyas, each in her own sacred geometry."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mahavidyas
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((m) => (
            <div
              key={m.slug}
              className="group flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-5 text-center transition hover:border-[var(--accent)]"
              style={{ "--accent": m.accentColor } as React.CSSProperties}
            >
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-white p-3">
                <img
                  src={yantraImages[m.slug]}
                  alt={`${m.name} yantra`}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {m.order.toString().padStart(2, "0")}
              </p>
              <h3 className="mt-0.5 font-serif text-xl text-primary group-hover:text-[var(--accent)]">
                {m.name}
              </h3>
              {m.epithet && (
                <p className="text-xs italic text-muted-foreground">{m.epithet}</p>
              )}
              <div className="mt-4 w-full">
                <RelatedPractices
                  pathway="tantric"
                  courseSlug="yantra"
                  lessonSlug={m.slug}
                  defaultName={`${m.name} Yantra`}
                  defaultDescription={`Yantra contemplation for ${m.name}.`}
                  defaultBodyLayer="etheric"
                  defaultMinutes={15}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
