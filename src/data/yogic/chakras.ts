// The seven main chakras, plus Sōma (a minor chakra within Sahasrāra) , 
// the single, complete source of chakra facts for this app. Used by both
// the Sūrya Namaskāra tool (which only needs a handful of fields per pose)
// and the standalone Chakras pages under the Yogic pathway (which show
// everything). Filling in one shared file rather than duplicating facts
// across two is the actual fix for "the Sūrya Namaskāra chakra info needs
// completing", both places now read from the same complete record.
//
// Sat-Cakra-Nirupāṇa correspondences (element, petals, bīja, tattva) are the
// standard classical set already used elsewhere in this app. Animal/carrier,
// dākinī/śakti, presiding deities, and meditation effects are Paul's
// supplied source material.

import type { TattvaShapeKey } from "@/components/course/tattva-shapes";

export type ChakraKey =
  | "muladhara"
  | "svadhisthana"
  | "manipura"
  | "anahata"
  | "vishuddha"
  | "ajna"
  | "soma"
  | "sahasrara";

export type Chakra = {
  slug: ChakraKey;
  order: number;
  sanskrit: string;
  english: string;
  location: string;
  petals: number;
  element: string;
  elementSanskrit: string;
  tattvaShape: string;
  tattvaShapeKey: TattvaShapeKey;
  tattvaColor: string;
  bija: string;
  bijaTranslit: string;
  /** Representative hex for the interactive tools' color visualizations, tuned toward the petal color below. */
  visualColor: string;
  animalCarrier: string;
  dakiniShakti: string;
  deities: string;
  colors: { element: string; seed: string; petals: string };
  attributes: string;
  effects: string;
};

export const chakras: Record<ChakraKey, Chakra> = {
  muladhara: {
    slug: "muladhara",
    order: 1,
    sanskrit: "Mūlādhāra",
    english: "Root Support",
    location: "Base of the spine / perineum",
    petals: 4,
    element: "Earth",
    elementSanskrit: "Pṛthvī",
    tattvaShape: "Yellow square",
    tattvaShapeKey: "square",
    tattvaColor: "#eab308",
    bija: "Laṁ",
    bijaTranslit: "Lahm",
    visualColor: "#dc2626",
    animalCarrier: "Elephant (Airāvata)",
    dakiniShakti: "Ḍākinī",
    deities: "Brahmā (Creator) and Gaṇeśa (Ruler)",
    colors: { element: "Yellow", seed: "Gold", petals: "Vermilion / blood red" },
    attributes: "Security, smell (predominant sense), earth (element)",
    effects:
      "Induces awareness, stability, security, lightness (levitation), and freedom from disease. It brings vitality, physical strength, intellectual power, inner purity, and prolongs life.",
  },
  svadhisthana: {
    slug: "svadhisthana",
    order: 2,
    sanskrit: "Svādhiṣṭhāna",
    english: "Her Special Abode",
    location: "Opposite the pubic bone",
    petals: 6,
    element: "Water",
    elementSanskrit: "Apas",
    tattvaShape: "Silver upward-facing crescent moon",
    tattvaShapeKey: "crescent",
    tattvaColor: "#e5e7eb",
    bija: "Vaṁ",
    bijaTranslit: "Vahm",
    visualColor: "#ea580c",
    animalCarrier: "Crocodile (Makara)",
    dakiniShakti: "Rākiṇī",
    deities: "Viṣṇu",
    colors: {
      element: "Transparent / white / light blue",
      seed: "Gold",
      petals: "Red / vermilion with carmine",
    },
    attributes:
      "Procreation, family, fantasy, creativity, sensuality, taste (predominant sense), water (element)",
    effects:
      "Frees the body from disease, increases vitality, personal magnetism, and artistic ability. It frees the mind from lust, anger, greed, and jealousy, elevating the practitioner to refined arts and pure relationships.",
  },
  manipura: {
    slug: "manipura",
    order: 3,
    sanskrit: "Maṇipūra",
    english: "City of Jewels",
    location: "Navel / solar plexus",
    petals: 10,
    element: "Fire",
    elementSanskrit: "Agni",
    tattvaShape: "Red upward-pointing triangle",
    tattvaShapeKey: "triangle",
    tattvaColor: "#dc2626",
    bija: "Raṁ",
    bijaTranslit: "Rahm",
    visualColor: "#eab308",
    animalCarrier: "Ram (Meṣha)",
    dakiniShakti: "Lākinī Devī",
    deities: "Braddha Rudra (Old Śiva)",
    colors: { element: "Red", seed: "Gold", petals: "Blue" },
    attributes: "Vision, form, colour, ego, sight (predominant sense), fire (element)",
    effects:
      "Gives natural immunity, a long healthy life, and releases uncommon powers of command, organization, and leadership. It destroys the ego, ends indigestion, and grants the ability to walk on fire or enter another body.",
  },
  anahata: {
    slug: "anahata",
    order: 4,
    sanskrit: "Anāhata",
    english: "Unstruck Sound",
    location: "Heart center",
    petals: 12,
    element: "Air",
    elementSanskrit: "Vāyu",
    tattvaShape: "Blue circle",
    tattvaShapeKey: "circle",
    tattvaColor: "#3b82f6",
    bija: "Yaṁ",
    bijaTranslit: "Yahm",
    visualColor: "#22c55e",
    animalCarrier: "Black antelope or musk deer",
    dakiniShakti: "Kākinī (Kuṇḍalinī Śakti also appears here as a beautiful goddess)",
    deities: "Īśāna Rudra Śiva",
    colors: {
      element: "Colourless / grey / smoky green",
      seed: "Gold",
      petals: "Deep red / vermilion",
    },
    attributes: "Balance, touch (predominant sense), air (element)",
    effects:
      "Develops inner beauty, personal magnetism, extra-sensory perception (ESP), and poetic abilities. It awakens renunciation and bestows eight super powers (siddhis) such as levitation, becoming extremely small or large, and the ability to accomplish all desires.",
  },
  vishuddha: {
    slug: "vishuddha",
    order: 5,
    sanskrit: "Viśuddha",
    english: "Especially Pure",
    location: "Throat",
    petals: 16,
    element: "Ether / Space",
    elementSanskrit: "Ākāśa",
    tattvaShape: "Black egg (or smoke-grey circle)",
    tattvaShapeKey: "egg",
    tattvaColor: "#374151",
    bija: "Haṁ",
    bijaTranslit: "Hahm",
    visualColor: "#0ea5e9",
    animalCarrier: "Elephant (Gaja)",
    dakiniShakti: "Śākinī",
    deities: "Pañcavaktra Śiva",
    colors: { element: "Smoky purple", seed: "Gold", petals: "Lavender grey / smoky purple" },
    attributes: "Knowledge, hearing (predominant sense), ākāśa/void (element)",
    effects:
      "Generates adamantine hardness, pure knowledge, and deep meditation. It gives serenity, a melodious voice, command of speech and mantras, youthfulness, and the ability to travel through space and interpret dreams.",
  },
  ajna: {
    slug: "ajna",
    order: 6,
    sanskrit: "Ājñā",
    english: "Command",
    location: "Between the eyebrows",
    petals: 2,
    element: "Beyond the elements, mind and light itself",
    elementSanskrit: "Manas",
    tattvaShape: "White winged circle",
    tattvaShapeKey: "winged-circle",
    tattvaColor: "#f8fafc",
    bija: "Oṁ",
    bijaTranslit: "Ohm",
    visualColor: "#6366f1",
    animalCarrier: "Nāda, in the form of a crescent",
    dakiniShakti: "Hākinī",
    deities: "Ardhanārīśvara (half-Śiva, half-Śakti)",
    colors: {
      element: "Transparent / luminescent bluish or camphor white",
      seed: "Gold",
      petals: "Transparent / luminescent bluish or camphor white",
    },
    attributes: "Self-realization, mahat/mahātattva (supreme element)",
    effects:
      "Eradicates sins/impurities, develops intuition and healing powers, and allows one to see the past, present, and future. Duality ceases, and the yogi achieves nondual consciousness.",
  },
  soma: {
    slug: "soma",
    order: 7,
    sanskrit: "Soma Cakra",
    english: "Minor chakra within Sahasrāra",
    location: "Just above and behind the crown, within Sahasrāra",
    petals: 12,
    element: "Nectar of immortality (Soma), the Moon",
    elementSanskrit: "Soma",
    tattvaShape: "A lotus holding a silver/white crescent",
    tattvaShapeKey: "crescent",
    tattvaColor: "#cfe3ea",
    bija: ", ",
    bijaTranslit: ", ",
    visualColor: "#a8c6d4",
    animalCarrier:
      "Kāmadhenu (the wish-fulfilling cow, with a crow's face, horse's neck, peacock's tail, and swan's wings)",
    dakiniShakti: "Kāmeśvarī (Kuṇḍalinī)",
    deities: "Kāmeśvara (Śiva) and Kāmeśvarī (Kuṇḍalinī)",
    colors: { element: "Light blue-white (lotus)", seed: ", ", petals: "Silver / white (crescent)" },
    attributes: "Nectar of immortality (Soma), the Moon",
    effects:
      "Stops the downward flow of nectar, granting victory over disease, decay, and death. The yogi remains ever young, full of vitality, and enjoys eternal bliss.",
  },
  sahasrara: {
    slug: "sahasrara",
    order: 8,
    sanskrit: "Sahasrāra",
    english: "Thousand-Petaled",
    location: "Crown of the head",
    petals: 1000,
    element: "Beyond all elements, pure consciousness",
    elementSanskrit: ", ",
    tattvaShape: "Radiant thousand-petaled lotus",
    tattvaShapeKey: "circle",
    tattvaColor: "#f8fafc",
    bija: "Silence (visarga)",
    bijaTranslit: ", ",
    visualColor: "#a855f7",
    animalCarrier: "The motion of bindu",
    dakiniShakti: "Chaitanya (Paramātmā / Mahāśakti)",
    deities: "The guru within",
    colors: {
      element: "Variegated colours of the rainbow (petals)",
      seed: "Gold",
      petals: "Variegated colours of the rainbow",
    },
    attributes: "Void, the dwelling place without support",
    effects:
      "Achieves immortality, dissolves the illusion of the individual self, and allows the yogi to attain a state of totally inactive pure bliss (samādhi). The practitioner transcends all elements and qualities (guṇas).",
  },
};

export const chakraList: Chakra[] = Object.values(chakras).sort((a, b) => a.order - b.order);

export const chakraBySlug = (slug: string) => chakras[slug as ChakraKey];
