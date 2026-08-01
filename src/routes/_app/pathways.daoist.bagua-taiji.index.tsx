import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { baguaTopics } from "@/data/daoist/bagua-taiji-course";
import baguaAboutCover from "@/assets/bagua/dong-haichuan-teaching_1784935653445.png";

export const Route = createFileRoute("/_app/pathways/daoist/bagua-taiji/")({
  head: () => ({ meta: [{ title: "Baguazhang · Daoist · Tantraya" }] }),
  component: BaguaTaijiHub,
});

function BaguaTaijiHub() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/daoist/hub"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Daoist pathway
      </Link>

      <PageHeader
        title="Baguazhang"
        subtitle="Yin and Cheng style, as we train it: foundations and building the bagua body first, martial application always secondary. A reference for those who train or have trained with us live — not a substitute for it."
      />

      <section className="mb-8 rounded-2xl border border-gold/50 bg-gold/5 p-5 text-sm text-foreground/85">
        This module doesn't teach baguazhang. It names and contextualizes what's corrected hands-on in
        class, so it can be read in any order, revisited on its own terms, and used to jog memory between
        sessions. Start wherever is useful to you right now.
      </section>

      <Link
        to="/pathways/daoist/bagua-taiji/about"
        className="group mb-8 block overflow-hidden rounded-2xl border border-gold/50 bg-card/70 transition hover:border-gold"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5">
            <img
              src={baguaAboutCover}
              alt="An elder martial artist walks a slow circle on a misty mountain terrace, disciples watching and mirroring the stance."
              className="h-40 w-full object-cover sm:h-full"
            />
          </div>
          <div className="p-5 sm:w-3/5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Before the gates</span>
            <h3 className="mt-2 font-serif text-2xl text-primary group-hover:text-gold">
              Baguazhang: Origins & Nature
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dong Haichuan, the monastic roots of circle walking, the spiral found everywhere from
              seashells to galaxies, and the dragon force this practice awakens.
            </p>
          </div>
        </div>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2">
        {baguaTopics.map((t) => (
          <Link
            key={t.slug}
            to="/pathways/daoist/bagua-taiji/$topicSlug"
            params={{ topicSlug: t.slug }}
            className="group block rounded-xl border border-border/60 bg-card/70 p-5 transition hover:border-gold/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Gate {t.gate}</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-primary group-hover:text-gold">{t.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.standsFor}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
