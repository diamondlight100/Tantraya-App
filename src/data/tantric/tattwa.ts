// Tattwa Shuddhi, content for the Tantric pathway.
// The five gross elements (pañca mahābhūta), each with its own bīja, yantra
// shape, colour, presiding chakra, presiding deity, and sense. Tattwa Shuddhi
// ("purification of the elements") is the practice of dissolving each
// element into the one that is subtler than it, earth into water, water
// into fire, fire into air, air into space, as a purification done before
// japa or pūjā, and as a laya (dissolution) meditation in its own right.
//
// Chakra/deity correspondences follow the standard table used across most
// tantric and haṭha-yogic sources (as in Woodroffe's Serpent Power and
// widely corroborated elsewhere): Pṛthvī–Mūlādhāra–Brahmā, Apas–Svādhiṣṭhāna
// –Viṣṇu, Tejas–Maṇipūra–Rudra, Vāyu–Anāhata–Īśa, Ākāśa–Viśuddha–Sadāśiva.
// Ājñā and Sahasrāra sit beyond the five gross elements, mind (manas) and
// pure awareness (cit) respectively, noted briefly as the sequence's end.

export type TattwaShape = "square" | "crescent" | "triangle" | "hexagram" | "circle" | "egg";

export type Tattwa = {
  key: string;
  order: number;
  element: string;
  sanskrit: string;
  bijaDevanagari: string;
  bijaTransliteration: string;
  shape: TattwaShape;
  color: string;
  colorName: string;
  chakra: string;
  chakraSanskrit: string;
  presidingDeity: string;
  sense: string;
  senseOrgan: string;
  actionOrgan: string;
  quality: string;
  dissolvesInto: string;
  dissolutionNote: string;
};

export const tattwas: Tattwa[] = [
  {
    key: "prithvi",
    order: 1,
    element: "Earth",
    sanskrit: "Pṛthvī",
    bijaDevanagari: "लं",
    bijaTransliteration: "Laṃ",
    shape: "square",
    color: "#C9A227",
    colorName: "Yellow",
    chakra: "Root",
    chakraSanskrit: "Mūlādhāra",
    presidingDeity: "Brahmā",
    sense: "Smell (Gandha)",
    senseOrgan: "Nose",
    actionOrgan: "Anus (excretion)",
    quality: "Solid, dense, stable, gives form and structure to everything built upon it.",
    dissolvesInto: "Apas (Water)",
    dissolutionNote:
      "Feel the square of earth at the base of the spine soften and liquefy, solidity giving way, the ground itself turning fluid.",
  },
  {
    key: "apas",
    order: 2,
    element: "Water",
    sanskrit: "Apas",
    bijaDevanagari: "वं",
    bijaTransliteration: "Vaṃ",
    shape: "crescent",
    color: "#DCE7EC",
    colorName: "White",
    chakra: "Sacral",
    chakraSanskrit: "Svādhiṣṭhāna",
    presidingDeity: "Viṣṇu",
    sense: "Taste (Rasa)",
    senseOrgan: "Tongue",
    actionOrgan: "Genitals (reproduction)",
    quality: "Fluid, cohesive, adaptive, what flows, binds, and takes the shape of its container.",
    dissolvesInto: "Tejas (Fire)",
    dissolutionNote:
      "Feel the crescent of water at the sacrum evaporate upward, fluidity giving way to heat, moisture rising as vapour into flame.",
  },
  {
    key: "tejas",
    order: 3,
    element: "Fire",
    sanskrit: "Tejas",
    bijaDevanagari: "रं",
    bijaTransliteration: "Raṃ",
    shape: "triangle",
    color: "#B5432C",
    colorName: "Red",
    chakra: "Navel",
    chakraSanskrit: "Maṇipūra",
    presidingDeity: "Rudra",
    sense: "Sight (Rūpa)",
    senseOrgan: "Eyes",
    actionOrgan: "Feet (locomotion)",
    quality: "Transformative, radiant, what digests, illuminates, and gives form its visible colour.",
    dissolvesInto: "Vāyu (Air)",
    dissolutionNote:
      "Feel the upward triangle of fire at the navel cool and thin into smoke, heat giving way to motion, flame dispersing into moving air.",
  },
  {
    key: "vayu",
    order: 4,
    element: "Air",
    sanskrit: "Vāyu",
    bijaDevanagari: "यं",
    bijaTransliteration: "Yaṃ",
    shape: "circle",
    color: "#5C6B73",
    colorName: "Smoke-grey",
    chakra: "Heart",
    chakraSanskrit: "Anāhata",
    presidingDeity: "Īśa (Rudra)",
    sense: "Touch (Sparśa)",
    senseOrgan: "Skin",
    actionOrgan: "Hands (grasping)",
    quality: "Mobile, pervasive, what moves, carries, and connects without any fixed shape of its own.",
    dissolvesInto: "Ākāśa (Space)",
    dissolutionNote:
      "Feel the grey circle of air at the heart thin out and disperse in every direction at once, even motion dissolving, until only open space remains.",
  },
  {
    key: "akasha",
    order: 5,
    element: "Space",
    sanskrit: "Ākāśa",
    bijaDevanagari: "हं",
    bijaTransliteration: "Haṃ",
    shape: "egg",
    color: "#171420",
    colorName: "Black",
    chakra: "Throat",
    chakraSanskrit: "Viśuddha",
    presidingDeity: "Sadāśiva",
    sense: "Sound (Śabda)",
    senseOrgan: "Ears",
    actionOrgan: "Mouth (speech)",
    quality: "Unbounded, containing, the field within which all four other elements arise and are held.",
    dissolvesInto: "Manas (Mind), then Cit (Awareness itself)",
    dissolutionNote:
      "Feel even the black egg of space at the throat thin into transparency, until nothing remains but the mind that was aware of it, and beyond that, awareness with nothing left to be aware of.",
  },
];

export function findTattwa(key: string): Tattwa | undefined {
  return tattwas.find((t) => t.key === key);
}
