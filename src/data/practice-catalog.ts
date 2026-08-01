// Practice catalog, hierarchical browser for the Practice Organiser.
// Pulled from the course content files so adding a course updates the picker.
// Each catalog practice's slug matches its source chapter/lesson slug exactly , 
// that's what lets a practices row link back to its source via
// (pathway, course_slug, lesson_slug).

import { lessons as eemLessons } from "@/data/eem-course";
import { faeryChapters } from "@/data/magick/faery-shamanism";
import { lucidChapters } from "@/data/magick/lucid-dreaming";
import { mettaTonglenChapters } from "@/data/buddhist/metta-tonglen";
import { tantraChapters } from "@/data/tantric/way-of-the-goddess";

export type CatalogPractice = {
  slug: string;
  name: string;
  description: string;
  body_layer: "physical" | "etheric" | "emotional" | "mental" | "general";
  icon?: string;
  target_minutes?: number;
};

export type CatalogCourse = {
  slug: string;
  title: string;
  practices: CatalogPractice[];
};

export type CatalogPathway = {
  v: "daoist" | "buddhist" | "yogic" | "tantric" | "magick" | "bhakti" | "general";
  label: string;
  courses: CatalogCourse[];
};

// Rough body-layer mapping for EEM lessons
const eemBody: Record<string, CatalogPractice["body_layer"]> = {
  "ba-gua": "etheric",
  "lower-dan-tian": "etheric",
  "inner-smile": "emotional",
  "healing-sounds": "physical",
  "cleansing-emotions": "emotional",
  "five-virtues": "mental",
  "microcosmic-orbit": "etheric",
  "dai-mai": "etheric",
  "chong-mai": "etheric",
  "macrocosmic-orbit": "etheric",
  "master-coupled-points": "physical",
  "heaven-and-earth": "general",
  "sexual-qigong": "etheric",
};

const faeryBody: Record<string, CatalogPractice["body_layer"]> = {
  "ancestral-work": "emotional",
  "faery-lore": "emotional",
  "faery-journey": "mental",
};

const lucidBody: Record<string, CatalogPractice["body_layer"]> = {
  foundations: "mental",
  "western-methods": "mental",
  "shamanic-dreamwork": "etheric",
  "taoist-dreaming": "etheric",
  "tibetan-dream-yoga": "general",
};

const mettaBody: Record<string, CatalogPractice["body_layer"]> = {
  metta: "emotional",
  tonglen: "emotional",
};

const tantraBody: Record<string, CatalogPractice["body_layer"]> = {
  "what-is-tantra": "mental",
  "timeline-of-tantra": "mental",
  "scripture-and-cosmology": "mental",
  "two-paths": "mental",
  "kubjikamata-and-practice-arc": "etheric",
  "sacred-sound": "mental",
  "nyasa-and-koshas": "etheric",
  "seven-chakras": "etheric",
  "dakinis-and-goddesses": "emotional",
  "sound-circuits": "etheric",
  "mantra-yantra-mala": "mental",
};

const sumSeconds = (steps: { seconds?: number }[]) =>
  Math.max(5, Math.round(steps.reduce((s, x) => s + (x.seconds ?? 60), 0) / 60));

export const practiceCatalog: CatalogPathway[] = [
  {
    v: "daoist",
    label: "Daoist",
    courses: [
      {
        slug: "eem",
        title: "Eight Extraordinary Meridians Qigong",
        practices: eemLessons.map((l) => ({
          slug: l.slug,
          name: l.title,
          description: l.subtitle,
          body_layer: eemBody[l.slug] ?? "etheric",
          icon: "☯",
          target_minutes: sumSeconds(l.practice.steps),
        })),
      },
    ],
  },
  {
    v: "buddhist",
    label: "Buddhist",
    courses: [
      {
        slug: "metta-tonglen",
        title: "Mettā & Tonglen",
        practices: mettaTonglenChapters.map((c) => ({
          slug: c.slug,
          name: `${c.title}. Practice`,
          description: c.subtitle,
          body_layer: mettaBody[c.slug] ?? "emotional",
          icon: "❀",
          target_minutes: sumSeconds(c.practice.steps),
        })),
      },
    ],
  },
  {
    v: "tantric",
    label: "Tantric",
    courses: [
      {
        slug: "way-of-the-goddess",
        title: "The Way of the Goddess",
        practices: tantraChapters
          .filter((c) => c.practice)
          .map((c) => ({
            slug: c.slug,
            name: `${c.title}. Practice`,
            description: c.subtitle,
            body_layer: tantraBody[c.slug] ?? "etheric",
            icon: "✦",
            target_minutes: sumSeconds(c.practice!.steps),
          })),
      },
    ],
  },
  {
    v: "magick",
    label: "Magick",
    courses: [
      {
        slug: "faery-shamanism",
        title: "Faery Shamanism",
        practices: faeryChapters.map((c) => ({
          slug: c.slug,
          name: `${c.title}. Practice`,
          description: c.subtitle,
          body_layer: faeryBody[c.slug] ?? "general",
          icon: c.slug === "faery-fire" ? "🜂" : c.slug === "faery-journey" ? "☽" : "✦",
          target_minutes: sumSeconds(c.practice.steps),
        })),
      },
      {
        slug: "lucid-dreaming",
        title: "Lucid Dreaming & the Yogas of Dream and Sleep",
        practices: lucidChapters.map((c) => ({
          slug: c.slug,
          name: `${c.title}. Practice`,
          description: c.subtitle,
          body_layer: lucidBody[c.slug] ?? "mental",
          icon: "☾",
          target_minutes: sumSeconds(c.practice.steps),
        })),
      },
    ],
  },
];

export const findPathway = (v: string) => practiceCatalog.find((p) => p.v === v);

/** Find one catalog practice by its (pathway, courseSlug, lessonSlug) triple , 
 *  the same triple stored on a linked `practices` row. */
export const findCatalogPractice = (
  pathway: string | null | undefined,
  courseSlug: string | null | undefined,
  lessonSlug: string | null | undefined,
) => {
  if (!pathway || !courseSlug || !lessonSlug) return null;
  const course = findPathway(pathway)?.courses.find((c) => c.slug === courseSlug);
  const practice = course?.practices.find((p) => p.slug === lessonSlug);
  return course && practice ? { course, practice } : null;
};
