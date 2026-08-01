import { createFileRoute } from "@tanstack/react-router";
import { PathwayGateway } from "@/components/course/pathway-gateway";
import yogicGate from "@/assets/pathways/yogic-gate_1784754015269.png";

export const Route = createFileRoute("/_app/pathways/yogic/")({
  head: () => ({ meta: [{ title: "Yogic Pathway · Tantraya" }] }),
  component: YogicGateway,
});

function YogicGateway() {
  return (
    <PathwayGateway
      kicker="The Yogic Pathway"
      title="Yoga (Haṭha)"
      tagline="The union of sun and moon, Piṅgalā and Iḍā, opening the way to Suṣumnā and the rising of Kuṇḍalinī Śakti."
      heroImage={yogicGate}
      heroAlt="A carved stone archway with a sun pillar and a moon pillar, two spiralling currents rising toward a lotus at its crown"
      to="/pathways/yogic/hub"
      ctaLabel="Step through the gate"
      mistColor="238 228 204"
      paragraphs={[
        "Yoga is one of the oldest living contemplative sciences, with roots that reach back through the Upaniṣads and further still, into practices whose origins predate written record. At its core, yoga means union, the joining of individual consciousness with what is ultimate, and every branch of the tradition, from the devotional to the philosophical to the physical, is a different route toward that same joining. Haṭha Yoga is the branch most concerned with the body itself, treating it not as an obstacle to transcendence but as the very vehicle through which transcendence becomes possible.",
        "The name carries the whole teaching: Haṭha, the union of Ha and Tha, sun and moon, Piṅgalā and Iḍā, the two currents that run either side of the spine. Their union is not the goal but the method: bring them into balance and the way opens into Suṣumnā, the central channel, in preparation for, and potential activation of, Kuṇḍalinī Śakti. Everything on this pathway, āsana, prāṇāyāma, bandha, mudrā, serves that one opening.",
        "Haṭha Yoga as a distinct system took shape roughly a thousand years ago, emerging from the Nāth sampradāya founded by Matsyendranāth and Gorakṣanāth, yogis whose lineage carried a strong current from the older cremation ground and Śaiva tantric traditions. This is visible in the texts that eventually codified the system, the Haṭha Yoga Pradīpikā, the Gheraṇḍa Saṃhitā, and the Śiva Saṃhitā, all of which describe a yoga built for the transformation of the body into something capable of holding higher states, rather than a yoga built primarily around ethical restraint or philosophical discrimination.",
        "More weight is given here to the tantric Haṭha lineages than to Patañjali's Rāja Yoga, work that likely runs back through the Nāth yogis and the cremation ground traditions that sit alongside them. Patañjali's eight limbs, Yama, Niyama, Āsana, Prāṇāyāma, Pratyāhāra, Dhāraṇā, Dhyāna, Samādhi, are worth knowing and are outlined here for clarity, but they were built mainly to prepare body and breath for a meditator's stillness. The Haṭha systems go further: a full exposition of the cakra system, and the advanced Kriyā practices.",
        "The cakra system as developed within these lineages offers a complete map of the subtle body, describing not just the seven major centers running along the spine but a wider network of nāḍīs, granthis, and subtle knots that must be worked with directly rather than simply understood conceptually. Kriyā practices take this map and turn it into method, using specific combinations of breath, lock, gesture, and internal focus to move energy through the system in a controlled and repeatable way. This is precise, technical work, closer to an engineering discipline than to stretching or relaxation, and it is this precision that makes Haṭha Yoga such a powerful foundation for serious practice.",
      ]}
    />
  );
}
