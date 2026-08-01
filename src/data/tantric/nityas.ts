// The Sixteen Nityas — static birth-tithi readings (Shri Vidya). Content is fixed and
// authored in full; the surrounding feature personalizes only with the framing copy
// (birth date, tithi number, paksha, aspect), never by rewriting or generating this text.
// Source: Nitya_Devi_Readings.md.

export type NityaProfile = {
  /** 1..15, position in the fifteen-fold cycle. Tripura Sundari (16) is handled separately. */
  position: number;
  slug: string;
  name: string;
  meaning: string;
  alsoIdentifiedWith?: string;
  tithiLabel: string;
  nature: string;
  forThoseBornUnder: string;
  practice: string;
};

export const NITYAS: NityaProfile[] = [
  {
    position: 1,
    slug: "kameshvari",
    name: "Kameshvari",
    meaning: "Mistress of Desire",
    alsoIdentifiedWith: "Parvati",
    tithiLabel: "Tithi 1 (Pratipad)",
    nature:
      "Kameshvari is the first stirring, desire before it has taken any particular shape. Not desire as lack, but desire as the will that makes a beginning possible at all: the reason anything is attempted rather than left undone. Her mantra, like all Nitya mantras, opens with the seed syllables Aim Hrim Shrim, the root sounds of Shri Vidya itself, before continuing to name her directly.",
    forThoseBornUnder:
      "A pull toward starting things, and a discomfort with staying still. The practical lesson she offers is learning to trust the first impulse without needing to justify it immediately.",
    practice:
      "Before beginning anything, real work or a small daily task, pause and notice the desire underneath it. Not the reason you'd give someone else. The actual want. Start from there.",
  },
  {
    position: 2,
    slug: "bhagamalini",
    name: "Bhagamalini",
    meaning: "Garlanded with Fortune",
    alsoIdentifiedWith: "Saraswati",
    tithiLabel: "Tithi 2",
    nature:
      "Bhaga carries a double meaning in Sanskrit: fortune, and the feminine generative principle. Bhagamalini is often described in terms of beauty and magnetism, but the deeper reading is about what draws things toward a person: a kind of ripeness that makes good fortune want to arrive.",
    forThoseBornUnder:
      "A natural charisma that isn't always consciously wielded, and a tendency for things to come rather than needing to be chased. The shadow side is complacency, letting attraction substitute for effort.",
    practice: "Notice one thing today that came to you easily. Before using it, ask what it's for.",
  },
  {
    position: 3,
    slug: "nityaklinna",
    name: "Nityaklinna",
    meaning: "Ever-Flowing, or Always Moist",
    tithiLabel: "Tithi 3",
    nature:
      "Nityaklinna governs the capacity to be moved, literally: her name describes a state that never fully dries out. Tantric sources associate her with tenderness, compassion, and forgiveness, qualities that require staying soft rather than hardening in self-protection.",
    forThoseBornUnder:
      "Deep feeling, and a strong pull toward empathy. This can tip into absorbing other people's pain as your own, so the discipline she asks for is staying open without losing your own shape.",
    practice:
      "When you feel moved by someone else's difficulty, name it as theirs before deciding whether or how to help. This is compassion, held with a clear boundary.",
  },
  {
    position: 4,
    slug: "bherunda",
    name: "Bherunda",
    meaning: "The Fierce One",
    tithiLabel: "Tithi 4",
    nature:
      "Bherunda is described in the Tantraraja Tantra with three eyes and eight arms, molten gold in complexion, holding a noose, goad, shield, sword, mace, thunderbolt, bow, and arrow. Her mantra is said to counter poison. She is a protector goddess in the most direct sense: the one who clears what's actually in the way.",
    forThoseBornUnder:
      "An instinct to confront problems head-on rather than manage around them, and real strength in a crisis. Left undirected, this can read as combativeness where patience would serve better.",
    practice:
      "The next time you feel the urge to fight something, ask whether it needs removing or simply needs time. Save Bherunda's force for the former.",
  },
  {
    position: 5,
    slug: "vahnivasini",
    name: "Vahnivasini",
    meaning: "She Who Dwells in Fire",
    tithiLabel: "Tithi 5",
    nature:
      "Vahnivasini is purification through heat: the fire that burns away what's already dead so something cleaner can take its place. This is close to the yogic concept of tapas, disciplined inner heat used deliberately.",
    forThoseBornUnder:
      "A capacity for real transformation, often arriving through periods that feel uncomfortable while they're happening. The lesson is trusting the process while it's still burning, before the result is visible.",
    practice:
      "Identify one habit or attachment you already know isn't serving you. Don't fix it today. Just let yourself feel the discomfort of continuing to carry it.",
  },
  {
    position: 6,
    slug: "mahavajreshvari",
    name: "Mahavajreshvari",
    meaning: "Great Mistress of the Thunderbolt",
    alsoIdentifiedWith: "Lakshmi",
    tithiLabel: "Tithi 6",
    nature:
      "The vajra is both weapon and symbol: indestructible, and used to cut through illusion in a single stroke. Mahavajreshvari represents sudden, decisive breakthrough rather than gradual accumulation, the moment something becomes unmistakably clear.",
    forThoseBornUnder:
      "Flashes of insight and an aptitude for decisive action once the moment arrives. The risk is impatience with anything that unfolds slowly, including your own growth.",
    practice:
      "The next time clarity strikes suddenly, write it down before acting on it. Let the insight prove itself over a day before you commit.",
  },
  {
    position: 7,
    slug: "shivaduti",
    name: "Shivaduti",
    meaning: "She Who Makes Shiva Her Messenger",
    tithiLabel: "Tithi 7",
    nature:
      "Described richly in the Tantraraja: red-clad, eight arms, three eyes, nine jewels in her crown, bright as midday summer sun. Her name is a genuine theological statement: in this current, Shakti (power, agency) does not serve Shiva (pure awareness); she commands him. It's a corrective to any reading of tantra where the feminine principle is passive.",
    forThoseBornUnder:
      "Natural authority, and discomfort taking a back seat, even in situations where you're not formally in charge. The teaching is using that authority in service of something, rather than for its own sake.",
    practice: "Notice today where you naturally take the lead. Ask what you're actually directing that energy toward.",
  },
  {
    position: 8,
    slug: "tvarita",
    name: "Tvarita",
    meaning: "The Swift One",
    alsoIdentifiedWith: "Totala Devi",
    tithiLabel: "Tithi 8 (Ashtami)",
    nature:
      "Ashtami is unusual among the tithis: it's the one day whose position is identical whether counted from the new moon or the full moon, which is why tradition places her \"at the crown\" of the other Nityas rather than simply in sequence. She is described as youthful, dark-complexioned, three-eyed, four-armed, with a gentle smile. Her defining trait is speed: she is said to grant the results of practice quickly, without the usual wait.",
    forThoseBornUnder:
      "A low tolerance for delay, and results that do tend to arrive faster than average once you commit to something. The corresponding risk is giving up too early on anything that isn't Tvarita-fast.",
    practice:
      "Pick one thing you've been putting off specifically because it feels slow. Start it today. Notice whether it's actually as slow as you assumed.",
  },
  {
    position: 9,
    slug: "kulasundari",
    name: "Kulasundari",
    meaning: "Beautiful One of the Lineage",
    tithiLabel: "Tithi 9",
    nature:
      "Kula refers to the body, the clan, the tantric community, that which holds and transmits practice. Where some tantric language reaches for transcendence away from the body, Kulasundari represents beauty and divinity found within embodiment itself: in lineage, in physical form, in belonging to a specific community and tradition rather than floating free of one.",
    forThoseBornUnder:
      "A strong sense of belonging, to family, tradition, or community, and discomfort with rootlessness. The growth edge is making sure that belonging is actively chosen, rather than simply inherited.",
    practice:
      "Name one tradition, family pattern, or community you belong to. Ask what part of it you'd keep even if nobody expected you to.",
  },
  {
    position: 10,
    slug: "nitya",
    name: "Nitya",
    meaning: "The Eternal One, or Mother of Eternity",
    alsoIdentifiedWith: "Nityamba",
    tithiLabel: "Tithi 10",
    nature:
      "Named simply for the quality that defines the whole system: what doesn't change while everything around it does. Positioned at the center of the sequence, she represents the constant thread running underneath the other fourteen faces.",
    forThoseBornUnder:
      "Steadiness, and a role others rely on precisely because you don't fluctuate with the mood of the room. The risk is mistaking rigidity for constancy.",
    practice:
      "Notice one thing about yourself that has genuinely stayed the same over many years. Ask whether it's still serving you, or whether you're just used to it.",
  },
  {
    position: 11,
    slug: "nilapataka",
    name: "Nilapataka",
    meaning: "Sapphire Banner, or Blue Flag",
    tithiLabel: "Tithi 11",
    nature:
      "A banner is raised to be seen: Nilapataka represents a position taken openly, visible commitment rather than private conviction. Deep blue, in Indian iconography, often carries the meaning of vastness, sky, ocean, Krishna, Shiva's throat: something that holds without being contained.",
    forThoseBornUnder:
      "A willingness to stand for something publicly, and discomfort with staying neutral. The discipline is choosing carefully what you raise the banner for, since you won't want to lower it easily once it's up.",
    practice:
      "Name one thing you believe but haven't said out loud recently. Consider what it would cost, and what it would free, to say it.",
  },
  {
    position: 12,
    slug: "vijaya",
    name: "Vijaya",
    meaning: "Victory",
    tithiLabel: "Tithi 12",
    nature:
      "Vijaya's triumph is specifically the yogic kind: overcoming an obstacle on the path. She marks the tithi where accumulated effort starts to show real results.",
    forThoseBornUnder:
      "Persistence that eventually pays off, and a strong relationship to achievement. The shadow is defining yourself too heavily by winning, so that ordinary, un-triumphant days feel like failure.",
    practice: "Notice a small win today that has nothing to do with beating anyone or anything. Let it count.",
  },
  {
    position: 13,
    slug: "sarvamangala",
    name: "Sarvamangala",
    meaning: "All-Auspicious",
    tithiLabel: "Tithi 13",
    nature:
      "Sarvamangala represents wellbeing that touches every area of life simultaneously rather than one part flourishing at the expense of another: a blessing without a cost attached.",
    forThoseBornUnder:
      "A genuine wish for things to go well, for yourself and others, and often an instinct for making situations more harmonious. The risk is smoothing things over before they've actually been resolved.",
    practice:
      "The next time you feel the urge to make an uncomfortable situation feel better quickly, sit with the discomfort a little longer first.",
  },
  {
    position: 14,
    slug: "jvalamalini",
    name: "Jvalamalini",
    meaning: "Garlanded with Flames",
    tithiLabel: "Tithi 14",
    nature:
      "The tithi immediately before the full moon, and the most intense of the fourteen: a threshold burning away whatever separateness remains right before union. Fire here is close and personal, worn like an ornament rather than kept at a distance.",
    forThoseBornUnder:
      "Intensity that others notice, and a comfort with heat, conflict, passion, extremity, that many people avoid. The lesson is learning when intensity serves the moment and when it simply consumes it.",
    practice:
      "Notice one place in your life running hotter than it needs to. Let it burn down to useful heat rather than putting it out entirely.",
  },
  {
    position: 15,
    slug: "chitra",
    name: "Chitra",
    meaning: "The Variegated, or the Painter",
    tithiLabel: "Tithi 15 (the eve of Purnima)",
    nature:
      "Chitra's name shares a root with chit, consciousness, and with the act of painting: she represents the vast variety of the manifest world as Devi's own brushwork, every form a stroke in a single painting. She is the last sliver of visible moon before wholeness.",
    forThoseBornUnder:
      "A wide-ranging, curious mind, and difficulty settling on one form or one identity for very long. The gift is genuine range; the discipline is finishing what you start before moving to the next color.",
    practice:
      "Look at your life today the way you'd look at a single painting rather than a list of separate parts. Notice what the whole composition is actually depicting.",
  },
];

export const TRIPURA_SUNDARI_NITYA = {
  name: "Maha Tripura Sundari",
  meaning: "The Great Beauty of the Three Worlds",
  tithiLabel: "Purnima (the full moon) and Amavasya (the new moon)",
  nature:
    "Tripura Sundari isn't one of the fifteen; she's their source, the fullness the other Nityas are partial expressions of. Purnima and Amavasya both belong to her, the moment of complete visibility and the moment of complete concealment, two faces of the same wholeness.",
  radiantAspect:
    "Her radiant aspect, fullness made visible, drawn toward completion and culmination.",
  hiddenAspect:
    "Her hidden aspect, fullness held in potential, drawn toward depth and what isn't yet shown.",
  practice: "See the full Tripura Sundari workbook.",
};

export function nityaByPosition(position: number): NityaProfile | undefined {
  return NITYAS.find((n) => n.position === position);
}
