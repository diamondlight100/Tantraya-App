import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

import dongHaichuanTeaching from "@/assets/bagua/dong-haichuan-teaching_1784935653445.png";
import circleWalkingDiagram from "@/assets/bagua/circle-walking-diagram_1784935653445.png";
import turningTraditions from "@/assets/bagua/turning-traditions_1784935653446.png";
import spiralSignature from "@/assets/bagua/spiral-signature_1784935653447.png";
import dragonForce from "@/assets/bagua/dragon-force_1784935653447.png";

export const Route = createFileRoute("/_app/pathways/daoist/bagua-taiji/about")({
  head: () => ({ meta: [{ title: "Baguazhang: Origins & Nature · Daoist · Tantraya" }] }),
  component: BaguaAboutPage,
});

function BaguaAboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/pathways/daoist/bagua-taiji"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> All gates
      </Link>

      <PageHeader
        title="Baguazhang: Origins & Nature"
        subtitle="Where circle walking comes from, and what it actually touches."
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-gold/40">
        <img
          src={dongHaichuanTeaching}
          alt="An elder martial artist walks a slow circle on a misty mountain terrace, disciples of different ages and builds watching and mirroring the stance around its edge."
          className="w-full object-cover"
        />
      </div>

      <div className="mt-8 space-y-10">
        <section>
          <h2 className="font-serif text-2xl text-gold">Dong Haichuan and the Living Root</h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/85">
            Baguazhang traces to Dong Haichuan, a nineteenth-century martial artist whose background is
            still wrapped in stories rather than settled record. Some accounts have him studying with
            Daoist recluses deep in the mountains of Shanxi or Anhui. Some say his boxing was already
            formidable long before he ever encountered circle walking. Some point to his years as a guard
            inside the imperial court in Beijing as the setting where his art first became visible outside
            a small circle of students. This blend of legend and fact is part of how the art was actually
            transmitted — bagua lived inside oral lineages for generations before it was ever written down,
            and its founder's biography carries the same texture as the great teachers of most living
            traditions: part documented history, part story passed hand to hand because the story itself
            was doing work.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-gold">One Root, Many Branches</h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/85">
            Dong Haichuan taught proficient martial artists, not raw beginners — students who arrived
            already carrying a boxing style, a trained body, a set of reflexes built over years. He and his
            senior disciples adapted bagua's circle-walking principles onto what a student already had,
            folding the new method into the existing skill and the existing body type rather than starting
            each student from zero. Each disciple absorbed the same underlying principles through a
            different art and a different frame, and each then taught what emerged from that particular
            fusion. This is the actual, practical reason bagua exists today as a family of related
            lineages — Cheng, Yin, Gao, Liu, and others — rather than as one uniform system: each branch is
            the direct, working result of the same seed adapting to different soil.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-gold">Circle Walking's Monastic Roots</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border/60">
            <img
              src={circleWalkingDiagram}
              alt="Aerial view of a monastery courtyard with a circular walking path marked by the eight trigrams and a star-point stepping pattern."
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">
            Circle walking — moving continuously along the edge of a circle while the body twists, coils,
            and changes direction — has roots reaching further back than Dong Haichuan, into Daoist
            monastic movement and meditation practice. Some monastic lineages describe it as star-stepping:
            walking patterns laid over the eight trigrams, or over constellation-like points, used as
            walking meditation and internal cultivation as much as martial training. Turning shows up
            independently across very different traditions as a technology for reaching a state that
            standing still or walking in a straight line does not reach. The Sufi dervish circles the
            sheikh at the center of the room, spinning in place exactly as the sheikh circles the room's
            center in turn — an echo of planets circling the sun while the sun itself moves through the
            wider turning of the galaxy.
          </p>
        </section>

        <section>
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <img
              src={turningTraditions}
              alt="A whirling dervish in flowing robes beside a golden diagram of planets tracing spiral orbits around a sun."
              className="w-full object-cover"
            />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-gold">The Spiral Signature</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border/60">
            <img
              src={spiralSignature}
              alt="A circular arrangement of natural spirals: a nautilus shell, a sunflower seed head, a whirlpool, a spiral galaxy, and a DNA double helix."
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">
            The spiral and vortex shape that circle walking builds in the body is the same shape found
            throughout the natural world — the chambered curve of a nautilus shell, the seed pattern of a
            sunflower head, the funnel of a whirlwind or draining water, the arms of a spiral galaxy, the
            double helix of DNA itself. The spiral is the practice's actual method, expressed at the scale
            of the body. Circle walking trains the body to generate and move through that exact geometry,
            turning the practitioner into a small working version of a pattern that already organizes
            matter and energy at every scale, from a shell on a beach to a galaxy overhead.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-gold">Awakening the Dragon</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border/60">
            <img
              src={dragonForce}
              alt="A seated practitioner viewed from behind with a luminous golden dragon coiling up the length of the spine."
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">
            Sustained circle walking, over enough time, opens something practitioners across traditions
            recognize under different names. In yoga, prolonged and correct practice can trigger the rise
            of kundalini through the sushumna, arriving as spontaneous kriyas — the body moving on its own
            into asanas, mudras, sounds, or breath patterns nobody taught it. Bagua carries its own version
            of this same current, running along the Chong Mai, and when it moves on its own it moves like a
            dragon: coiling, spiraling, sudden, alive with an intelligence that feels older than the person
            experiencing it. Students who train long and correctly enough eventually reach a shift where
            they stop initiating the movement and start following it. At that point, bagua does you. This
            is a real, repeatable stage of the practice, arrived at the same way every stage before it was
            arrived at: through the accumulated correctness of the principles, walked in a circle, for
            years.
          </p>
        </section>
      </div>

      <div className="mt-10 border-t border-border/60 pt-6">
        <Link
          to="/pathways/daoist/bagua-taiji"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to all gates
        </Link>
      </div>
    </div>
  );
}
