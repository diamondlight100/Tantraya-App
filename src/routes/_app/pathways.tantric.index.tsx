import { createFileRoute } from "@tanstack/react-router";
import { PathwayGateway } from "@/components/course/pathway-gateway";
import tantricGate from "@/assets/pathways/tantric-gate_1784755457114.png";

export const Route = createFileRoute("/_app/pathways/tantric/")({
  head: () => ({ meta: [{ title: "Tantric Pathway · Tantraya" }] }),
  component: TantricGateway,
});

function TantricGateway() {
  return (
    <PathwayGateway
      kicker="The Tantric Pathway"
      title="Tantra"
      tagline="Mahā-Śakti, all things, felt directly once the veils of confusion clear."
      heroImage={tantricGate}
      heroAlt="A dark stone temple doorway carved with interlocking triangle yantras, radiant red-gold light glowing from within"
      to="/pathways/tantric/hub"
      ctaLabel="Step through the doorway"
      mistColor="40 12 10"
      paragraphs={[
        "Tantra is a non-dual path, one that does not divide the world into sacred and profane, spiritual and mundane, but sees all of it as a single field of conscious energy in motion. Where many traditions ask the practitioner to withdraw from the senses, from desire, from the body, in order to reach what is real, Tantra takes the opposite route. It engages directly with experience, using the very things other paths ask you to renounce, the body, the senses, emotion, relationship, as the raw material of realization itself.",
        "This orientation has deep roots in the Śaiva and Śākta traditions of India, lineages that developed largely outside the Vedic mainstream, transmitted through the Āgamas and Tantras rather than the Vedas, and carried forward by practitioners who worked in cremation grounds, wilderness, and other spaces conventional society considered impure or dangerous. It was precisely in these spaces, beyond the reach of social convention, that the tradition's central insight took shape: nothing is excluded from the Divine, and nothing needs to be transcended in order to reach it, because there was never anywhere else to go.",
        "Tantric deities are worked with here because they are, quite literally, what's found once the veils of confusion fall away: Mahā-Śakti. She is all things. Mind, emotion, thought, sensation, body, every apparent object, all of it Her, the way a dream appears as countless different things while remaining wholly one, and that one is Śakti at play as name and form.",
        "The ground from which that play, that spanda, that first stirring, arises, is Śiva, Consciousness itself, prior to and inseparable from what moves within it. Mantra, on this pathway, is the actual sonic vibration of a deity's own nature, not a phrase composed by any person; yantra is that same nature in geometric form. Neither is a symbol pointing at something else. Each is the thing itself, in a different register.",
        "The senses are doorways, and beauty one of the most direct of them, into unmediated experience of the Goddess. The inner work of Kuṇḍalinī reveals what was already true: that you are, were, and always will be the Goddess herself. Nothing here is impure, and nothing is left over that isn't Divine.",
      ]}
    />
  );
}
