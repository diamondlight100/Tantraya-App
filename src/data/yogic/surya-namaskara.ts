// Sūrya Namaskāra, full data model for the interactive practice tool.
// Sequence and breath pattern read directly from Paul's own reference chart
// (classical 12-position Ashtanga-style round, right side then mirrored left).
//
// Chakra facts themselves now live in one shared, complete file , 
// src/data/yogic/chakras.ts, used both here and by the standalone Chakras
// pages under the Yogic pathway, so the two never drift out of sync.
//
// NOTE on chakra-per-pose emphasis and the specific sun-mantra pairing
// below: these follow common, defensible teaching choices, but this is
// exactly the kind of lineage-specific detail worth reviewing against what
// you actually teach before treating it as final. Everything here is easy
// to edit in this one file.

import { chakras as chakraLore, type ChakraKey as ChakraLoreKey } from "@/data/yogic/chakras";

export type ChakraKey = Exclude<ChakraLoreKey, "soma">;

export type ChakraInfo = {
  key: ChakraKey;
  sanskrit: string;
  english: string;
  location: string;
  petals: number;
  element: string;
  elementSanskrit: string;
  tattvaShape: string;
  tattvaColor: string;
  bija: string;
  bijaTranslit: string;
  visualColor: string; // hex, for the Stage 3 color visualization
};

const POSE_CHAKRA_KEYS: ChakraKey[] = [
  "muladhara",
  "svadhisthana",
  "manipura",
  "anahata",
  "vishuddha",
  "ajna",
  "sahasrara",
];

export const chakras: Record<ChakraKey, ChakraInfo> = Object.fromEntries(
  POSE_CHAKRA_KEYS.map((key) => {
    const c = chakraLore[key];
    return [
      key,
      {
        key,
        sanskrit: c.sanskrit,
        english: c.english,
        location: c.location,
        petals: c.petals,
        element: c.element,
        elementSanskrit: c.elementSanskrit,
        tattvaShape: c.tattvaShape,
        tattvaColor: c.tattvaColor,
        bija: c.bija,
        bijaTranslit: c.bijaTranslit,
        visualColor: c.visualColor,
      },
    ];
  }),
) as Record<ChakraKey, ChakraInfo>;

export const sunNames: { sanskrit: string; meaning: string }[] = [
  { sanskrit: "Oṁ Mitrāya Namaḥ", meaning: "Salutations to the Friend of All" },
  { sanskrit: "Oṁ Ravaye Namaḥ", meaning: "Salutations to the Shining One" },
  { sanskrit: "Oṁ Sūryāya Namaḥ", meaning: "Salutations to the Dispeller of Darkness" },
  { sanskrit: "Oṁ Bhānave Namaḥ", meaning: "Salutations to the One Who Illumines" },
  { sanskrit: "Oṁ Khagāya Namaḥ", meaning: "Salutations to the One Who Moves Through the Sky" },
  { sanskrit: "Oṁ Puṣṇe Namaḥ", meaning: "Salutations to the Nourisher of All" },
  { sanskrit: "Oṁ Hiraṇyagarbhāya Namaḥ", meaning: "Salutations to the Golden Cosmic Womb" },
  { sanskrit: "Oṁ Marīcaye Namaḥ", meaning: "Salutations to the Lord of the Dawn" },
  { sanskrit: "Oṁ Ādityāya Namaḥ", meaning: "Salutations to the Son of Aditi" },
  { sanskrit: "Oṁ Savitre Namaḥ", meaning: "Salutations to the One Who Stimulates and Awakens" },
  { sanskrit: "Oṁ Arkāya Namaḥ", meaning: "Salutations to the One Fit to Be Praised" },
  { sanskrit: "Oṁ Bhāskarāya Namaḥ", meaning: "Salutations to the Giver of Light and Wisdom" },
];

export type Breath = "inhale" | "exhale" | "retention" | "neutral";

export type PoseStep = {
  order: number;
  slug: string;
  sanskrit: string;
  english: string;
  side: "right" | "left" | null;
  breath: Breath;
  breathNote?: string;
  alignment: string[];
  chakraFocus: ChakraKey[];
  devotional?: string;
  /** Optional photo/illustration URL for this exact position, once set,
   *  it replaces the plain number+name tile in the pose picker and the
   *  detail panel. Leave unset until you have real photos of the sequence. */
  imageUrl?: string;
};

export const suryaNamaskaraSequence: PoseStep[] = [
  {
    order: 1,
    slug: "pranamasana",
    sanskrit: "Prāṇāmāsana",
    english: "Prayer Pose",
    side: null,
    breath: "neutral",
    breathNote:
      "A natural, settled breath. This is the still point the round begins and returns to.",
    alignment: [
      "Stand at the front of the mat, feet together or hip-width apart, weight even across both feet.",
      "Palms together at the heart center in Añjali Mudrā, thumbs lightly touching the sternum.",
      "Shoulders relaxed down away from the ears, crown of the head lifting gently upward.",
      "Eyes soften and close, or gaze at a fixed point ahead.",
    ],
    chakraFocus: ["anahata"],
    devotional:
      "Face the rising sun if possible. Feel yourself as a small, willing offering before a vast, life-giving source.",
    imageUrl: "/yogic/surya-namaskara/pranamasana.webp",
  },
  {
    order: 2,
    slug: "hasta-uttanasana",
    sanskrit: "Hasta Uttānāsana",
    english: "Raised Arms Pose",
    side: null,
    breath: "inhale",
    alignment: [
      "Sweep the arms out and overhead, palms facing forward or together.",
      "Lengthen up through the whole spine before beginning a gentle backbend from the upper back.",
      "Keep the ribs drawn in rather than thrusting them forward, the lower belly stays lightly engaged.",
      "Gaze follows the thumbs, neck long rather than crunched.",
    ],
    chakraFocus: ["vishuddha", "ajna"],
    imageUrl: "/yogic/surya-namaskara/hasta-uttanasana.webp",
  },
  {
    order: 3,
    slug: "hasta-padasana",
    sanskrit: "Hasta Pādāsana",
    english: "Hand to Foot Pose",
    side: null,
    breath: "exhale",
    alignment: [
      "Hinge from the hips, not the waist, folding the torso over the legs.",
      "Hands come to the floor beside the feet, or to the shins; knees may soften if the hamstrings are tight.",
      "Let the crown of the head release toward the floor, back of the neck long.",
      "Draw the lower belly gently toward the spine to support the fold.",
    ],
    chakraFocus: ["svadhisthana", "manipura"],
    imageUrl: "/yogic/surya-namaskara/hasta-padasana.webp",
  },
  {
    order: 4,
    slug: "ashwa-sanchalanasana-right",
    sanskrit: "Aśva Sañcālanāsana",
    english: "Equestrian Pose",
    side: "right",
    breath: "inhale",
    alignment: [
      "Step the right foot back into a deep lunge, left knee stacked over the left ankle.",
      "Right knee lowers toward the floor, top of the right foot relaxed.",
      "Lift through the chest and gaze forward or slightly up, spine lengthening rather than collapsing into the lower back.",
      "Fingertips or palms stay grounded either side of the left foot.",
    ],
    chakraFocus: ["ajna"],
    imageUrl: "/yogic/surya-namaskara/ashwa-sanchalanasana.webp",
  },
  {
    order: 5,
    slug: "phalakasana",
    sanskrit: "Phalakāsana",
    english: "Plank Pose",
    side: null,
    breath: "retention",
    breathNote:
      "Breath is held here, the natural pause between the inhale that brought you in and the exhale to come.",
    alignment: [
      "Step the other foot back to meet the first, body forms one long line from crown to heels.",
      "Shoulders stack directly over the wrists, palms pressing evenly into the floor.",
      "Engage the belly and thighs to keep the hips level, not sagging.",
      "Neck stays a natural extension of the spine, gaze down or slightly forward.",
    ],
    chakraFocus: ["manipura"],
    imageUrl: "/yogic/surya-namaskara/phalakasana.webp",
  },
  {
    order: 6,
    slug: "ashtanga-namaskara",
    sanskrit: "Aṣṭāṅga Namaskāra",
    english: "Eight-Limbed Salute",
    side: null,
    breath: "exhale",
    breathNote:
      "Exhale completely into this pose, then hold with the breath fully out, no inhale or exhale happens here. The next inhale carries you directly into the following posture.",
    alignment: [
      "Lower the knees, chest, and chin to the floor, keeping the hips lifted.",
      "Only eight points touch the ground: two feet (base of the toes, not the soles), two knees, two hands, the chest, and the chin.",
      "Elbows stay hugged in close to the body rather than splaying outward.",
      "This is a pose of humility and offering, the body bows low while the hips remain slightly raised.",
    ],
    chakraFocus: ["anahata"],
    devotional:
      "A pose of surrender, the whole body touching the earth in offering before rising again toward the sun.",
    imageUrl: "/yogic/surya-namaskara/ashtanga-namaskara.webp",
  },
  {
    order: 7,
    slug: "bhujangasana",
    sanskrit: "Bhujaṅgāsana",
    english: "Cobra Pose",
    side: null,
    breath: "inhale",
    alignment: [
      "Slide forward, uncurl the toes, and lower the hips to the floor.",
      "Press the tops of the feet and pubic bone down as the chest lifts.",
      "Elbows stay soft and close to the ribs. This is a backbend led by the upper back.",
      "Shoulders draw down away from the ears; the lift comes from the heart.",
    ],
    chakraFocus: ["svadhisthana", "manipura"],
    imageUrl: "/yogic/surya-namaskara/bhujangasana.webp",
  },
  {
    order: 8,
    slug: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Śvānāsana",
    english: "Downward-Facing Dog",
    side: null,
    breath: "exhale",
    alignment: [
      "Lift the hips up and back, forming an inverted V shape.",
      "Hands press evenly into the floor, fingers spread; heels reach toward (not necessarily touching) the floor.",
      "Let the spine lengthen, knees may bend generously if that keeps the back long rather than rounded.",
      "Head relaxes between the upper arms, gaze toward the navel or the feet.",
    ],
    chakraFocus: ["vishuddha", "ajna"],
    imageUrl: "/yogic/surya-namaskara/adho-mukha-svanasana.webp",
  },
  {
    order: 9,
    slug: "ashwa-sanchalanasana-left",
    sanskrit: "Aśva Sañcālanāsana",
    english: "Equestrian Pose",
    side: "left",
    breath: "inhale",
    alignment: [
      "Step the left foot forward between the hands, mirroring the earlier lunge on the other side.",
      "Right knee lowers toward the floor, top of the right foot relaxed.",
      "Lift through the chest, gaze forward, spine lengthening rather than collapsing into the lower back.",
    ],
    chakraFocus: ["ajna"],
    imageUrl: "/yogic/surya-namaskara/ashwa-sanchalanasana.webp",
  },
  {
    order: 10,
    slug: "hasta-padasana-return",
    sanskrit: "Hasta Pādāsana",
    english: "Hand to Foot Pose",
    side: null,
    breath: "exhale",
    alignment: [
      "Step the back foot forward to meet the front, returning to the standing forward fold.",
      "Hinge from the hips, hands to the floor or shins, knees soft if needed.",
      "Crown of the head releases toward the floor, back of the neck long.",
    ],
    chakraFocus: ["svadhisthana", "manipura"],
    imageUrl: "/yogic/surya-namaskara/hasta-padasana.webp",
  },
  {
    order: 11,
    slug: "hasta-uttanasana-return",
    sanskrit: "Hasta Uttānāsana",
    english: "Raised Arms Pose",
    side: null,
    breath: "inhale",
    alignment: [
      "Sweep the arms forward and overhead as the torso rises, rolling up through the spine one vertebra at a time.",
      "Lengthen up before beginning the gentle backbend from the upper back.",
      "Gaze follows the thumbs, ribs drawn in rather than thrust forward.",
    ],
    chakraFocus: ["vishuddha", "ajna"],
    imageUrl: "/yogic/surya-namaskara/hasta-uttanasana.webp",
  },
  {
    order: 12,
    slug: "pranamasana-return",
    sanskrit: "Prāṇāmāsana",
    english: "Prayer Pose",
    side: null,
    breath: "exhale",
    alignment: [
      "Return to standing, palms together at the heart center.",
      "Feel the effects of the round completed, warmth, breath, the pulse of the body.",
      "This is also the starting point for the second half of the round, on the left side.",
    ],
    chakraFocus: ["anahata"],
    devotional:
      "One round complete. Pause here, in gratitude, before beginning the mirrored round on the left side.",
    imageUrl: "/yogic/surya-namaskara/pranamasana.webp",
  },
];

/** The two Pranamasana positions (start of each half-round) are where the
 *  sun mantras are spoken, one name per side, as Paul teaches it. Defaults
 *  to the first two of the twelve traditional names; freely swap which two
 *  are used here, or extend to use a different name for every round if
 *  practicing the fuller twelve-name form. */
export const roundMantras = {
  right: sunNames[0], // Om Mitraya Namah
  left: sunNames[1], // Om Ravaye Namah
};
