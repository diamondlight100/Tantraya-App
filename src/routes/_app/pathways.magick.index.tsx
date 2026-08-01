import { createFileRoute } from "@tanstack/react-router";
import { PathwayGateway } from "@/components/course/pathway-gateway";
import magickGate from "@/assets/pathways/magick-gate_1784754512594.png";

export const Route = createFileRoute("/_app/pathways/magick/")({
  head: () => ({ meta: [{ title: "Magick Pathway · Tantraya" }] }),
  component: MagickGateway,
});

function MagickGateway() {
  return (
    <PathwayGateway
      kicker="The Magick Pathway"
      title="The Western Way"
      tagline="A Golden Chain running from before the sands of Egypt to the Golden Dawn to us, unbroken, mostly forgotten, and still very much here."
      heroImage={magickGate}
      heroAlt="An engraved stone doorway flanked by chained pillars marked with planetary glyphs, opening onto a single receding point of light"
      to="/pathways/magick/hub"
      ctaLabel="Step through the door"
      mistColor="236 224 196"
      paragraphs={[
        "There is a Western Way, and it is old: older than than even the sands of Egypt and alive since even the Sphinx was young… Threading through those starlit Temples, to the  Greek Magical Papyri, to  Neoplatonism, and the Hermetic corpus, into the Renaissance, and from there into the Golden Dawn and those traditions descending from it in the late 1900's.",
        "Carried by initiates across the centuries: a lineage of transmission handed link to link, generation to generation, rarely advertised and never quite broken.",
        "Magick, on this pathway, is method, not manipulation. It is a deep and precise understanding of the laws and mechanics underlying the nature of reality, and the skill to work with those laws directly.",
        "As a foundation, Qabalah here is worked through its Hermetic inheritance and is made practical and direct. The Tree of Life, approached this way, is less a religious doctrine than a meta-map, a single structure capable of holding every plane of manifestation, every force, and every correspondence within one single glyph as cosmic-filing system, and practical path to this Western Way.  Symbol runs through all of it as languag: a doorway into the deep unconscious, which already speaks fluently in image, geometry, and correspondence long before it speaks in words.",
        "Alongside this sits the West's own otherworld lore, the Fae, the land-spirits, and the ancestral and shamanic work that never needed an eastern import to be genuine.",
      ]}
    />
  );
}
