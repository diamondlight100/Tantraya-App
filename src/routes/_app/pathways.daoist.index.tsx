import { createFileRoute } from "@tanstack/react-router";
import { PathwayGateway } from "@/components/course/pathway-gateway";
import daoistGate from "@/assets/pathways/daoist-gate_1784751993834.png";

export const Route = createFileRoute("/_app/pathways/daoist/")({
  head: () => ({ meta: [{ title: "Daoist Pathway · Tantraya" }] }),
  component: DaoistGateway,
});

function DaoistGateway() {
  return (
    <PathwayGateway
      kicker="The Daoist Pathway"
      title="Daoism"
      tagline="Qigong, internal alchemy, and the cultivation of the current that moves through mountain and marrow alike."
      heroImage={daoistGate}
      heroAlt="A stone moon-gate opening onto misted mountains, carved dragons coiled along its pillars"
      to="/pathways/daoist/hub"
      ctaLabel="Step through the gate"
      paragraphs={[
        "Daoism is one of the oldest continuous traditions of practice on Earth, stretching back to the Wu, the shamanic practitioners of ancient China who worked directly with the forces of heaven, earth, and the human being as a single continuous field. Long before Daoism became a formal religion or philosophy, the Wu were already mapping the relationship between the visible and invisible worlds, using trance, ritual, and direct perception to understand how qi moves through nature and through the body. This shamanic root is still present underneath everything that later developed, even in schools that look far more monastic or philosophical on the surface.",
        "Over the centuries, Daoism organized itself into distinct schools, each with its own emphasis and lineage transmission. Zheng Yi Dao carries forward the ritual and talismanic tradition, working closely with the Wu inheritance of ceremony and cosmic administration. Longmen, part of the Quanzhen or Complete Reality school, is monastic in structure and places internal alchemy, or neidan, at the center of practice. Maoshan is a Shangqing-derived tradition known for its visionary and meditative depth, its close relationship with the stars and the internal gods of the body, and its refined approach to inner cultivation. These are three of the most significant schools within the broader landscape, and Maoshan and Xheng Yi in particular form the backbone of our own training.",
        "Sitting alongside these schools is the practice of qigong, which is best understood not as one thing but as a family of practices organized around three main branches. Martial qigong develops power, structure, and internal strength for use in combat and physical mastery. Medical qigong works with the body's energetic architecture to heal, balance, and regulate physiological and energetic function. Monastic or meditational qigong, sometimes called nei gong when it moves into deeper internal work, is oriented toward spiritual cultivation, the refinement of consciousness, and the pursuit of longevity and immortality in the classical Daoist sense.",
        "Within the martial branch, three internal arts stand out for their sophistication. Baguazhang trains the practitioner through circle walking, spiraling movement, and constant directional change, developing an extraordinary relationship with rotation, evasion, and internal power generation. Taijiquan works with slow, continuous movement to cultivate sensitivity, structure, and the ability to yield and redirect force, and it forms part of our own training. Xing Yi Quan is a third major internal art, built on linear, direct force expressed through five fundamental movements tied to the five elements, though we will not go deep into it here.",
        "Our school draws from all three branches of qi study rather than specializing narrowly in one. Our practices are assembled from a wide range of qigong and neigong lineages, chosen for depth and authenticity rather than convenience, giving students access to martial structure, medical understanding, and meditative refinement within a single coherent training path.",
        "What makes Daoist energy work worth deep study is its sheer sophistication. This is, quite simply, some of the most advanced energetic science ever developed by any human tradition. Where many systems around the world have mapped the energy body in broad terms, the Daoists went further, cataloguing individual points across the entire body, inside and out, understanding not just their location but their specific function, their behavior under different conditions, and their precise effects when engaged. This is a tradition that treats the body as a complete cosmos, worthy of the same rigor and attention a scientist would bring to any complex system, and it is this level of precision that makes Daoist practice such a powerful foundation for serious energetic work.",
      ]}
    />
  );
}
