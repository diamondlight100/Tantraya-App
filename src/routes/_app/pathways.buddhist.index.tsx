import { createFileRoute } from "@tanstack/react-router";
import { PathwayGateway } from "@/components/course/pathway-gateway";
import buddhistGate from "@/assets/pathways/buddhist-gate_1784754922865.png";

export const Route = createFileRoute("/_app/pathways/buddhist/")({
  head: () => ({ meta: [{ title: "Buddhist Pathway · Tantraya" }] }),
  component: BuddhistGateway,
});

function BuddhistGateway() {
  return (
    <PathwayGateway
      kicker="The Buddhist Pathway"
      title="Buddhism"
      tagline="A precise map of the nature of reality itself, and a heart trained to walk back into the world rather than away from it."
      heroImage={buddhistGate}
      heroAlt="A stone torana gateway in mist, a single point of warm light glowing at the end of the path beyond it"
      to="/pathways/buddhist/hub"
      ctaLabel="Step through the gate"
      mistColor="222 228 234"
      paragraphs={[
        "Buddhism offers one of the most precise and thoroughly tested descriptions of reality ever developed. At its foundation is a direct investigation into the nature of experience itself: that phenomena are impermanent, that they arise dependently rather than existing as fixed, separate things, and that suffering emerges from our attempt to grasp at what is by nature unstable and interconnected. The teaching of the skandhas breaks the sense of a solid, continuous self into its constituent processes, showing how what we take to be a fixed identity is really a fast-moving aggregation of form, sensation, perception, mental formation, and consciousness. The eightfold path takes this understanding and turns it into a complete framework for living, connecting view, intention, and conduct to the way the mind is trained.",
        "What Buddhism does better than almost any other system on Earth is dissolve false belief. This isn't limited to the obvious layer of inherited opinion or cultural conditioning. Buddhist practice, done properly, reaches into assumptions held at a social level, a psychological level, and even a level so deep it functions almost genetically, the kind of belief that shapes perception before a thought ever fully forms. Few traditions have developed methods this exacting for seeing through what is false. This is one of the reasons Buddhist view and practice form such an important part of our own training, regardless of pathway.",
        "Within Buddhism, we draw most heavily from the Mahayana stream, working with our own lineage of vipassana alongside it. Mahayana's emphasis on the bodhisattva ideal, remaining engaged with the world out of compassion rather than seeking to withdraw from it, sits naturally alongside a tantric orientation that sees the world itself as workable, sacred, and full of potential rather than as a problem to be escaped. This shapes how we practice and what we emphasize, even as we hold deep respect for the full range of the tradition.",
        "We also teach metta and tonglen, two practices central to the cultivation of compassion. Metta cultivates loving-kindness in a systematic, expanding way, while tonglen works directly with the transformation of suffering, taking in what is difficult and breathing out relief and benefit. Of every contemplative system we have studied, Buddhism offers the most refined and effective practices for this kind of heat-based, compassionate transformation, turning what is painful into fuel for awakening rather than something to avoid.",
        "Alongside this, we work with methods from Vajrayana, the tantric branch of Buddhism, which offers some of the most direct and advanced practices found anywhere in the contemplative world. This includes deity yoga, working through the generation and completion stages to dissolve ordinary perception and rebuild experience around an awakened form. It also includes the Six Yogas, a set of methods, representing some of the most sophisticated technologies for working with mind, energy, and consciousness that any tradition has produced.",
      ]}
    />
  );
}
