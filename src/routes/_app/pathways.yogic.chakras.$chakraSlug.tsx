import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { chakraBySlug } from "@/data/yogic/chakras";
import { ChakraGlyph } from "@/components/course/chakra-glyph";
import { RichLessonLayout, type RichLessonSection } from "@/components/course/rich-lesson-layout";
import { RelatedPractices } from "@/components/course/related-practices";

export const Route = createFileRoute("/_app/pathways/yogic/chakras/$chakraSlug")({
  head: ({ params }) => ({ meta: [{ title: `${params.chakraSlug} · Chakras · Tantraya` }] }),
  component: ChakraPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
      That chakra wasn't found.
    </div>
  ),
});

function ChakraPage() {
  const { chakraSlug } = Route.useParams();
  const c = chakraBySlug(chakraSlug);
  if (!c) throw notFound();

  const sections: RichLessonSection[] = [
    {
      heading: "At a Glance",
      body: `Location: ${c.location}\nPetals: ${c.petals}\nElement: ${c.element}${c.elementSanskrit !== ", " ? ` (${c.elementSanskrit})` : ""}\nTattva: ${c.tattvaShape}\nBīja: ${c.bija}${c.bijaTranslit !== ", " ? ` (${c.bijaTranslit})` : ""}`,
    },
    {
      heading: "Carrier and Presiding Deities",
      body: `Animal / carrier: ${c.animalCarrier}\nḌākinī / Śakti: ${c.dakiniShakti}\nDeities: ${c.deities}`,
    },
    {
      heading: "Colors",
      body: `Element: ${c.colors.element}\nSeed sound: ${c.colors.seed}\nPetals: ${c.colors.petals}`,
    },
    { heading: "Attributes", body: c.attributes },
    { heading: "Effects of Meditation", body: c.effects },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/yogic/chakras"
        className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> The Chakras
      </Link>

      <RichLessonLayout
        eyebrow={`Chakra ${c.order} of 8`}
        title={c.sanskrit}
        epithet={c.english}
        accentColor={c.visualColor}
        hero={
          <ChakraGlyph
            petals={c.petals}
            shape={c.tattvaShapeKey}
            tattvaColor={c.tattvaColor}
            ringColor={c.visualColor}
          />
        }
        sections={sections}
        practices={
          <RelatedPractices
            pathway="yogic"
            courseSlug="chakras"
            lessonSlug={c.slug}
            defaultName={`${c.sanskrit} Meditation`}
            defaultDescription={`Chakra meditation on ${c.sanskrit} (${c.english}).`}
            defaultBodyLayer="etheric"
            defaultMinutes={15}
          />
        }
      />
    </div>
  );
}
