// Nyasa page, content for the Tantric pathway.
// Nyāsa ("placing/depositing") is the ritual of touching specific points on
// the hands and then the body while sounding the deity's own bīja, so as to
// install that deity's presence into oneself before japa or pūjā. Two
// stages, done in this order:
//
//   1. Karanyāsa , six points across the fingers and hand.
//   2. Aṅganyāsa , six points across the body (heart up to the crown, then
//      out to the limbs and the eyes), finishing with the "weapon" clap that
//      seals the whole installation.
//
// The six-part (ṣaḍaṅga) scheme below, Namaḥ / Svāhā / Vaṣaṭ / Huṃ / Vauṣaṭ
// / Phaṭ, over Aṅguṣṭha–Tarjanī–Madhyamā–Anāmikā–Kaniṣṭhikā–Karatala for the
// hand, and Hṛdaya–Śiras–Śikhā–Kavaca–Netratraya–Astra for the body, is the
// standard pattern used across nearly every deity's worship, from the Gāyatrī
// to the Devī mantras. What changes deity to deity is simply which bīja
// (seed-sound) is sounded before each of the twelve points; the anga words
// and their closing particles stay constant. That bīja is drawn directly
// from the same seed mantra given on the Mantra page for each deity.

export type NyasaLimb = {
  key: string;
  order: number;
  bodyPart: string;
  devanagari: string;
  transliteration: string;
  instruction: string;
};

// Karanyāsa, the six points of the hand.
export const karanyasaLimbs: NyasaLimb[] = [
  {
    key: "angushtha",
    order: 1,
    bodyPart: "Thumbs",
    devanagari: "अंगुष्ठाभ्यां नमः",
    transliteration: "Aṅguṣṭhābhyāṃ Namaḥ",
    instruction: "Touch the tips of both thumbs together.",
  },
  {
    key: "tarjani",
    order: 2,
    bodyPart: "Index fingers",
    devanagari: "तर्जनीभ्यां स्वाहा",
    transliteration: "Tarjanībhyāṃ Svāhā",
    instruction: "Touch the tips of both index fingers together.",
  },
  {
    key: "madhyama",
    order: 3,
    bodyPart: "Middle fingers",
    devanagari: "मध्यमाभ्यां वषट्",
    transliteration: "Madhyamābhyāṃ Vaṣaṭ",
    instruction: "Touch the tips of both middle fingers together.",
  },
  {
    key: "anamika",
    order: 4,
    bodyPart: "Ring fingers",
    devanagari: "अनामिकाभ्यां हुं",
    transliteration: "Anāmikābhyāṃ Huṃ",
    instruction: "Touch the tips of both ring fingers together.",
  },
  {
    key: "kanishthika",
    order: 5,
    bodyPart: "Little fingers",
    devanagari: "कनिष्ठिकाभ्यां वौषट्",
    transliteration: "Kaniṣṭhikābhyāṃ Vauṣaṭ",
    instruction: "Touch the tips of both little fingers together.",
  },
  {
    key: "karatala",
    order: 6,
    bodyPart: "Palm and back of hand",
    devanagari: "करतलकरपृष्ठाभ्यां फट्",
    transliteration: "Karatala-Karapṛṣṭhābhyāṃ Phaṭ",
    instruction: "Strike the palm of one hand against the back of the other, then reverse.",
  },
];

// Aṅganyāsa, the six points of the body.
export const anganyasaLimbs: NyasaLimb[] = [
  {
    key: "hridaya",
    order: 1,
    bodyPart: "Heart",
    devanagari: "हृदयाय नमः",
    transliteration: "Hṛdayāya Namaḥ",
    instruction: "Touch the fingertips of the right hand to the centre of the chest.",
  },
  {
    key: "shiras",
    order: 2,
    bodyPart: "Head",
    devanagari: "शिरसे स्वाहा",
    transliteration: "Śirase Svāhā",
    instruction: "Touch the top of the head.",
  },
  {
    key: "shikha",
    order: 3,
    bodyPart: "Crown-tuft",
    devanagari: "शिखायै वषट्",
    transliteration: "Śikhāyai Vaṣaṭ",
    instruction: "Touch the back of the head, where the tuft (śikhā) is worn or would be.",
  },
  {
    key: "kavacha",
    order: 4,
    bodyPart: "Armour",
    devanagari: "कवचाय हुं",
    transliteration: "Kavacāya Huṃ",
    instruction: "Cross both arms over the chest, hands to opposite shoulders, as if drawing on armour.",
  },
  {
    key: "netratraya",
    order: 5,
    bodyPart: "Three eyes",
    devanagari: "नेत्रत्रयाय वौषट्",
    transliteration: "Netratrayāya Vauṣaṭ",
    instruction: "Touch the two physical eyes and then the point between the brows, with the first three fingers.",
  },
  {
    key: "astra",
    order: 6,
    bodyPart: "Weapon",
    devanagari: "अस्त्राय फट्",
    transliteration: "Astrāya Phaṭ",
    instruction: "Clap the hands once, sharply, to seal the whole installation.",
  },
];

export type NyasaDeity = {
  slug: string;
  name: string;
  epithet?: string;
  accentColor: string;
  bijaDevanagari: string;
  bijaTransliteration: string;
  note?: string;
};

export const nyasaDeities: NyasaDeity[] = [
  { slug: "ganesh", name: "Ganesh", epithet: "Gaṇapati", accentColor: "#B5652C", bijaDevanagari: "गं", bijaTransliteration: "Gaṃ" },
  { slug: "shiva", name: "Shiva", accentColor: "#3F5B6B", bijaDevanagari: "हौं", bijaTransliteration: "Hauṃ" },
  { slug: "lakshmi", name: "Lakshmi", epithet: "Mahālakṣmī", accentColor: "#B08A3E", bijaDevanagari: "श्रीं", bijaTransliteration: "Śrīṃ" },
  { slug: "durga", name: "Durga", accentColor: "#8C2F2F", bijaDevanagari: "दुं", bijaTransliteration: "Duṃ" },
  { slug: "saraswati", name: "Saraswati", accentColor: "#5C7A8A", bijaDevanagari: "ऐं", bijaTransliteration: "Aiṃ" },
  { slug: "hanuman", name: "Hanuman", accentColor: "#B5432C", bijaDevanagari: "हुं", bijaTransliteration: "Huṃ" },
  { slug: "kali", name: "Kali", accentColor: "#332F42", bijaDevanagari: "क्रीं", bijaTransliteration: "Krīṃ" },
  { slug: "tara", name: "Tara", accentColor: "#5B7C93", bijaDevanagari: "स्त्रीं", bijaTransliteration: "Strīṃ" },
  {
    slug: "tripura-sundari",
    name: "Tripura Sundari",
    epithet: "Ṣoḍaśī",
    accentColor: "#C7A0A0",
    bijaDevanagari: "ऐं",
    bijaTransliteration: "Aiṃ",
    note: "Uses the openly-taught introductory bīja, as on the Mantra page, rather than the guru-transmitted mūla.",
  },
  { slug: "bhuvaneshvari", name: "Bhuvaneshvari", accentColor: "#7A8C6B", bijaDevanagari: "ह्रीं", bijaTransliteration: "Hrīṃ" },
  { slug: "bhairavi", name: "Bhairavi", epithet: "Tripura Bhairavi", accentColor: "#6B2F3A", bijaDevanagari: "ह्स्रैं", bijaTransliteration: "Hsraiṃ" },
  { slug: "chinnamasta", name: "Chinnamasta", accentColor: "#8C1F1F", bijaDevanagari: "श्रीं", bijaTransliteration: "Śrīṃ" },
  { slug: "dhumavati", name: "Dhumavati", accentColor: "#5A5347", bijaDevanagari: "धूं", bijaTransliteration: "Dhūṃ" },
  { slug: "bagalamukhi", name: "Bagalamukhi", accentColor: "#C79B2E", bijaDevanagari: "ह्लीं", bijaTransliteration: "Hlīṃ" },
  { slug: "matangi", name: "Matangi", accentColor: "#4A5C3A", bijaDevanagari: "ह्रीं", bijaTransliteration: "Hrīṃ" },
  { slug: "kamala", name: "Kamala", accentColor: "#C77B3E", bijaDevanagari: "श्रीं", bijaTransliteration: "Śrīṃ" },
];

export function findNyasaDeity(slug: string): NyasaDeity | undefined {
  return nyasaDeities.find((d) => d.slug === slug);
}
