// The Eight Trigrams (Bagua), original material informed by a Daoist /
// shamanic-oracular reading of the tradition (Karcher, Benebell Wen lineage
// sensibility) rather than the Wilhelm/Jung psychological-Confucian frame.
// Lines are stored bottom-to-top, as they are drawn and read: 1 = yang
// (solid), 0 = yin (broken). This is the order the line is "born" in
// divination, from the ground up.

export type TrigramKey = "qian" | "kun" | "zhen" | "kan" | "gen" | "xun" | "li" | "dui";

export type Trigram = {
  key: TrigramKey;
  lines: [0 | 1, 0 | 1, 0 | 1]; // bottom, middle, top
  glyph: string;
  chinese: string;
  pinyin: string;
  english: string;
  family: string;
  attribute: string;
  image: string;
  animal: string;
  direction: string;
  bodyPart: string;
  preHeaven: { position: string; number: number };
  postHeaven: { position: string; number: number };
  note: string;
};

export const trigrams: Trigram[] = [
  {
    key: "qian",
    lines: [1, 1, 1],
    glyph: "☰",
    chinese: "乾",
    pinyin: "Qián",
    english: "Heaven / The Creative",
    family: "Father",
    attribute: "Strong, unyielding, initiating",
    image: "Heaven, pure yang turned all the way through itself",
    animal: "Dragon / Horse",
    direction: "Northwest (Post-Heaven) / South (Pre-Heaven)",
    bodyPart: "Head",
    preHeaven: { position: "South", number: 1 },
    postHeaven: { position: "Northwest", number: 6 },
    note: "Three unbroken lines, force with nothing left to push against. Qian is the origin-impulse, the first outward push of spirit into form. In a reading it is rarely gentle, it is the moment a thing simply begins, unopposed and total.",
  },
  {
    key: "kun",
    lines: [0, 0, 0],
    glyph: "☷",
    chinese: "坤",
    pinyin: "Kūn",
    english: "Earth / The Receptive",
    family: "Mother",
    attribute: "Yielding, nourishing, containing",
    image: "Earth, pure yin, the field that receives every seed without judging it",
    animal: "Mare / Ox",
    direction: "Southwest (Post-Heaven) / North (Pre-Heaven)",
    bodyPart: "Belly",
    preHeaven: { position: "North", number: 8 },
    postHeaven: { position: "Southwest", number: 2 },
    note: "Three broken lines, the ground that carries everything Qian starts. Not weak, this is the strength of a riverbed rather than a river, the strength that shapes by yielding first.",
  },
  {
    key: "zhen",
    lines: [1, 0, 0],
    glyph: "☳",
    chinese: "震",
    pinyin: "Zhèn",
    english: "Thunder / The Arousing",
    family: "Eldest son",
    attribute: "Shock, movement, sudden awakening",
    image: "Thunder breaking out of the earth, one bolt of yang driving up under two lines of yin",
    animal: "Dragon",
    direction: "East (Post-Heaven) / Northeast (Pre-Heaven)",
    bodyPart: "Feet",
    preHeaven: { position: "Northeast", number: 4 },
    postHeaven: { position: "East", number: 3 },
    note: "Movement that starts underneath and startles what is above it. Zhen is the trigram of the jolt, the thing that wakes the body before the mind has agreed to wake, useful when a reading needs to break inertia rather than soothe it.",
  },
  {
    key: "kan",
    lines: [0, 1, 0],
    glyph: "☵",
    chinese: "坎",
    pinyin: "Kǎn",
    english: "Water / The Abysmal",
    family: "Middle son",
    attribute: "Danger, depth, the moving current",
    image: "Water in a gorge, one line of yang trapped and moving between two lines of yin",
    animal: "Pig / Wild boar",
    direction: "North (Post-Heaven) / West (Pre-Heaven)",
    bodyPart: "Ears",
    preHeaven: { position: "West", number: 6 },
    postHeaven: { position: "North", number: 1 },
    note: "The only trigram that keeps moving inside its own danger rather than around it. Kan does not promise safety, it promises that the current knows its own way through, if you stop fighting the walls of the gorge.",
  },
  {
    key: "gen",
    lines: [0, 0, 1],
    glyph: "☶",
    chinese: "艮",
    pinyin: "Gèn",
    english: "Mountain / Keeping Still",
    family: "Youngest son",
    attribute: "Stillness, boundary, the place a thing stops",
    image: "A mountain, one line of yang capping two lines of yin, immovable at the top",
    animal: "Dog",
    direction: "Northeast (Post-Heaven) / Northwest (Pre-Heaven)",
    bodyPart: "Hands",
    preHeaven: { position: "Northwest", number: 7 },
    postHeaven: { position: "Northeast", number: 8 },
    note: "Where movement is asked to stop and hold its own edge. Gen is the discipline of a boundary that does not move, the place in a reading that says: this far, and here you rest.",
  },
  {
    key: "xun",
    lines: [0, 1, 1],
    glyph: "☴",
    chinese: "巽",
    pinyin: "Xùn",
    english: "Wind / Wood / The Gentle",
    family: "Eldest daughter",
    attribute: "Penetration, gradual influence, flexibility",
    image: "Wind moving through everything without forcing any of it, one yin line entering from below two yang",
    animal: "Cock / Fowl",
    direction: "Southeast (both arrangements)",
    bodyPart: "Thighs",
    preHeaven: { position: "Southwest", number: 5 },
    postHeaven: { position: "Southeast", number: 4 },
    note: "Influence that works by entering quietly rather than by striking. Xun is patience with teeth, change so gradual it is mistaken for nothing happening, until the whole shape of a thing has shifted.",
  },
  {
    key: "li",
    lines: [1, 0, 1],
    glyph: "☲",
    chinese: "離",
    pinyin: "Lí",
    english: "Fire / The Clinging",
    family: "Middle daughter",
    attribute: "Clarity, illumination, dependent brightness",
    image: "Fire, one dark line held and made visible between two lines of light",
    animal: "Pheasant",
    direction: "South (both arrangements)",
    bodyPart: "Eyes",
    preHeaven: { position: "East", number: 3 },
    postHeaven: { position: "South", number: 9 },
    note: "Fire has no fuel of its own, it clings to what burns and reveals it. Li is the trigram of clear sight and exposure, what a reading shows you can no longer be unseen.",
  },
  {
    key: "dui",
    lines: [1, 1, 0],
    glyph: "☱",
    chinese: "兌",
    pinyin: "Duì",
    english: "Lake / Marsh / The Joyous",
    family: "Youngest daughter",
    attribute: "Openness, exchange, pleasure, speech",
    image: "A lake, an open surface, one yin line resting at the top of two yang",
    animal: "Sheep / Goat",
    direction: "West (Post-Heaven) / Southeast (Pre-Heaven)",
    bodyPart: "Mouth",
    preHeaven: { position: "Southeast", number: 2 },
    postHeaven: { position: "West", number: 7 },
    note: "The open water that reflects, exchanges, and speaks. Dui rules mouths, markets, and mirrors, whatever passes between two parties, and reminds a reading that joy shared is also joy tested.",
  },
];

export const trigramByKey: Record<TrigramKey, Trigram> = Object.fromEntries(
  trigrams.map((t) => [t.key, t]),
) as Record<TrigramKey, Trigram>;

// Bit-key helper: "111" style string from a trigram's lines, bottom to top.
export function trigramBits(t: Trigram): string {
  return t.lines.join("");
}

export function trigramByBits(bits: string): Trigram | undefined {
  return trigrams.find((t) => trigramBits(t) === bits);
}

// Pre-Heaven (Fuxi / Early Heaven) arrangement: the structural, cosmic order,
// opposite trigrams sit opposite each other across the circle. This is the
// arrangement of pure principle, before movement, the blueprint.
export const preHeavenOrder: TrigramKey[] = [
  "li", "qian", "xun", // reference only, see preHeavenCircle below for placement
];

// Circle position, clockwise from South (traditional top of the Chinese
// compass rose), for rendering the Pre-Heaven bagua diagram.
export const preHeavenCircle: { key: TrigramKey; angleDeg: number }[] = [
  { key: "qian", angleDeg: 90 },   // South, top
  { key: "dui", angleDeg: 45 },
  { key: "li", angleDeg: 0 },      // East
  { key: "zhen", angleDeg: -45 },
  { key: "kun", angleDeg: -90 },   // North, bottom
  { key: "gen", angleDeg: -135 },
  { key: "kan", angleDeg: 180 },   // West
  { key: "xun", angleDeg: 135 },
];

// Post-Heaven (King Wen / Later Heaven) arrangement: the arrangement of
// function and cycle, how the trigrams actually act on each other through
// time, mapped onto the Luo Shu magic square. This is the arrangement used
// for Feng Shui, seasonal cycles, and how energy actually moves in the
// manifest world.
export const postHeavenCircle: { key: TrigramKey; angleDeg: number }[] = [
  { key: "li", angleDeg: 90 },     // South
  { key: "kun", angleDeg: 45 },    // Southwest
  { key: "dui", angleDeg: 0 },     // West
  { key: "qian", angleDeg: -45 },  // Northwest
  { key: "kan", angleDeg: -90 },   // North
  { key: "gen", angleDeg: -135 },  // Northeast
  { key: "zhen", angleDeg: 180 },  // East
  { key: "xun", angleDeg: 135 },   // Southeast
];
