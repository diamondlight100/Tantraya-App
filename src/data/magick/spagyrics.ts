// Alchemy: Spagyrics — a standalone Magick pathway course.
//
// Two related but distinct structures are covered here, and it's worth being
// clear about the difference up front:
//
// 1. The seven alchemical Operations (Calcination through Coagulation) and
//    the four colour phases of the Magnum Opus (Nigredo, Albedo, Citrinitas,
//    Rubedo) — the broad philosophical map of the Great Work, applicable to
//    any working, spiritual or material.
// 2. The actual, practical, three-stage Spagyric process (Separation,
//    Purification/Calcination, Cohabitation) used to make an actual herbal
//    spagyric tincture on a stovetop — a specific application of that map.
//
// The colour-phase groupings below (which Operations belong to which of the
// four colours) follow one commonly cited scheme; other authors group them
// slightly differently, since none of this was ever standardized by a single
// central authority. Treat it as a teaching map.
//
// The photographs referenced in ProcessStep documentation are the user's own
// original photos of an actual calcination/distillation they performed,
// stored at /magick/spagyrics/*.jpg

export type ColorPhase = "nigredo" | "albedo" | "citrinitas" | "rubedo";

export const COLOR_PHASES: {
  key: ColorPhase;
  name: string;
  meaning: string;
  blurb: string;
}[] = [
  {
    key: "nigredo",
    name: "Nigredo",
    meaning: "The Blackening",
    blurb:
      "Everything is broken down before it can be rebuilt. The original substance, and the original sense of self brought to the work, is dissolved, burned, and reduced to something unrecognizable. Nothing here is yet the medicine; it's the necessary undoing that makes the medicine possible.",
  },
  {
    key: "albedo",
    name: "Albedo",
    meaning: "The Whitening",
    blurb:
      "What survived the blackening is washed, purified, and recombined. A first, fragile clarity appears — not yet the finished gold, but the raw material is now workable, honest, and clean.",
  },
  {
    key: "citrinitas",
    name: "Citrinitas",
    meaning: "The Yellowing",
    blurb:
      "A transitional gold-tinged stage, less consistently used across different alchemical authors than the other three, often folded into the run-up to Rubedo. Where it's marked, it signals the first appearance of solar, conscious light within the work.",
  },
  {
    key: "rubedo",
    name: "Rubedo",
    meaning: "The Reddening",
    blurb:
      "Completion. Body, soul, and spirit stand recombined as a single, stable substance capable of doing work in the world — the Stone, or, on the herbal bench in front of you, the finished Spagyric.",
  },
];

export type Operation = {
  key: string;
  number: number;
  name: string;
  colorPhase: ColorPhase;
  tagline: string;
  materials: string;
  psychological: string;
};

export const OPERATIONS: Operation[] = [
  {
    key: "calcination",
    number: 1,
    name: "Calcination",
    colorPhase: "nigredo",
    tagline: "Burn the matter down to ash.",
    materials:
      "The raw material, plant marc or metal, is subjected to direct, sustained heat until nothing remains but a fine grey or white ash. In spagyrics this is where the plant's Salt is liberated from its Body: alcohol-soaked herb is set alight, burned down, then ground and reheated repeatedly until the carbon and blackness are gone.",
    psychological:
      "Whatever in you is rigid, defended, or simply excess gets burned away here, often without your consent in the timing. It rarely feels dignified while it's happening; it's meant to reduce you to what's actually essential.",
  },
  {
    key: "dissolution",
    number: 2,
    name: "Dissolution",
    colorPhase: "nigredo",
    tagline: "Return the ash to water.",
    materials:
      "The calcined ash is dissolved back into distilled water, so that whatever is truly soluble, the Salt of Salts, can separate from whatever is inert waste, the caput mortuum, or 'dead head'.",
    psychological:
      "The hardened, ash-like parts of a person get softened back into feeling. What was too solid to be worked with becomes fluid again, which is uncomfortable in a different way than the burning was, more like grief than pain.",
  },
  {
    key: "separation",
    number: 3,
    name: "Separation",
    colorPhase: "nigredo",
    tagline: "Filter out what is not needed.",
    materials:
      "Filtration, repeated as necessary, divides the dissolved solution from the insoluble sludge left behind. What's kept and what's discarded is a real, consequential decision at this stage.",
    psychological:
      "A conscious sorting of what you're willing to keep integrating into your evolving self, and what you're willing to finally let go of. Nothing gets thrown away by accident here; it's decided.",
  },
  {
    key: "conjunction",
    number: 4,
    name: "Conjunction",
    colorPhase: "albedo",
    tagline: "Recombine the separated parts.",
    materials:
      "The purified Salt is reunited with the plant's Sulphur (its essential oil) and Mercury (its volatile, alcohol-soluble spirit), recombining the three essentials that had been drawn apart during distillation.",
    psychological:
      "Body, feeling, and mind, which had to be pulled apart to be examined honestly, are deliberately brought back together. This is a marriage, not a return to how things were before, the parts have changed in the separating.",
  },
  {
    key: "fermentation",
    number: 5,
    name: "Fermentation",
    colorPhase: "albedo",
    tagline: "Let the recombined matter come alive.",
    materials:
      "The recombined tincture is left to sit and further integrate, sometimes over days or weeks of regular shaking, so the reunited essentials can settle into a single, stable, living compound rather than a mechanical mixture.",
    psychological:
      "A quiet incubation period. Whatever was recombined in Conjunction has to be given time to actually become one thing, rather than three things sitting near each other. Rushing this stage is the most common way to waste all the work that came before it.",
  },
  {
    key: "distillation",
    number: 6,
    name: "Distillation",
    colorPhase: "citrinitas",
    tagline: "Refine the volatile spirit further.",
    materials:
      "The volatile portions (the Mercury, then the watery Phlegm, then the golden, oil-bearing Sulphur) are separated out from the plant by heat, in order of how readily each 'comes over', leaving a solid residue behind for Calcination.",
    psychological:
      "A further refinement, drawing off what is most subtle and essential from what is merely raw material. This is where clarity, in the ordinary sense of the word, actually starts to appear in the work.",
  },
  {
    key: "coagulation",
    number: 7,
    name: "Coagulation",
    colorPhase: "rubedo",
    tagline: "Fix the finished substance into stable form.",
    materials:
      "The final, recombined Spagyric is stabilized: no longer volatile in the way its separate parts once were, but a single fixed medicine that can be stored, dosed, and taken.",
    psychological:
      "Whatever was refined through the whole process becomes a stable, usable trait rather than a fleeting insight. This is the difference between having had an experience and having actually changed.",
  },
];

export type Essential = {
  key: string;
  name: string;
  latin: string;
  corresponds: string;
  symbol: string;
  extraction: string;
  description: string;
};

export const ESSENTIALS: Essential[] = [
  {
    key: "mercury",
    name: "Mercury",
    latin: "Mercurius",
    corresponds: "Spirit",
    symbol: "☿",
    extraction:
      "The first, most volatile fraction to come off in distillation, the airy, alcohol-soluble portion of the plant that carries scent and subtle effect.",
    description:
      "The active, connective, animating principle. In a plant it's the volatile essence; in a person, the part that moves between body and mind, carrying information both ways.",
  },
  {
    key: "sulphur",
    name: "Sulphur",
    latin: "Sulphur",
    corresponds: "Soul",
    symbol: "🜍",
    extraction:
      "The golden, oil-bearing fraction that appears mixed with the watery Phlegm partway through distillation, essentially the plant's essential oil.",
    description:
      "The soul, or the individual character and virtue of a thing, its particular medicinal or magical signature. Where Mercury moves, Sulphur gives that movement its distinct flavor.",
  },
  {
    key: "salt",
    name: "Salt",
    latin: "Sal",
    corresponds: "Body",
    symbol: "🜔",
    extraction:
      "What remains after full calcination and dissolution: the mineral, structural residue of the plant, its 'Sal Salis', or Salt of Salts.",
    description:
      "The body, the fixed, physical substrate that holds the other two essentials in place. Without Salt, Mercury and Sulphur have nothing to inhabit; the finished Spagyric needs all three recombined to be complete.",
  },
];

export type PlanetHerbs = {
  planet: string;
  symbol: string;
  day: string;
  qualities: string;
  herbs: { name: string; note: string }[];
};

export const PLANET_HERBS: PlanetHerbs[] = [
  {
    planet: "Saturn",
    symbol: "♄",
    day: "Saturday",
    qualities: "Boundary, structure, discipline, ancestry, endings, time itself",
    herbs: [
      { name: "Comfrey", note: "Bone-knitting, structural, deeply grounding" },
      { name: "Mullein", note: "Long, upright stalk; boundary and protection" },
      { name: "Solomon's Seal", note: "Traditional 'binder', joint and structure work" },
      { name: "Cypress", note: "Funerary tree, endings, ancestral grief" },
      { name: "Horsetail", note: "Mineral-rich, ancient, skeletal" },
    ],
  },
  {
    planet: "Jupiter",
    symbol: "♃",
    day: "Thursday",
    qualities: "Expansion, abundance, generosity, growth, the liver, good fortune",
    herbs: [
      { name: "Dandelion", note: "Liver and expansion, root to flower usable" },
      { name: "Meadowsweet", note: "Sweetness, ease, gentle abundance" },
      { name: "Sage", note: "Wisdom, expansive clarity" },
      { name: "Borage", note: "Traditionally 'gladdens the heart'" },
      { name: "Oak", note: "The king of the forest, generosity of shelter" },
    ],
  },
  {
    planet: "Mars",
    symbol: "♂",
    day: "Tuesday",
    qualities: "Will, drive, heat, courage, the immune response, cutting through",
    herbs: [
      { name: "Nettle", note: "Iron-rich, stinging, fierce and nourishing at once" },
      { name: "Ginger", note: "Heat, circulation, drive" },
      { name: "Basil", note: "Sharp, protective, activating" },
      { name: "Hawthorn (thorn and leaf)", note: "The Mars side of the heart, boundary with love in it" },
      { name: "Cayenne", note: "Pure fire, used sparingly" },
    ],
  },
  {
    planet: "Sun",
    symbol: "☉",
    day: "Sunday",
    qualities: "Vitality, identity, the heart, confidence, life force itself",
    herbs: [
      { name: "St John's Wort", note: "Solar herb of light, taken at Midsummer" },
      { name: "Rosemary", note: "Memory, clarity, solar warmth" },
      { name: "Chamomile", note: "Gentle solar gold, easing and centering" },
      { name: "Bay Laurel", note: "Victory, recognition, the crown" },
      { name: "Angelica", note: "Protective, radiant, traditionally 'of the angels'" },
    ],
  },
  {
    planet: "Venus",
    symbol: "♀",
    day: "Friday",
    qualities: "Love, beauty, relationship, pleasure, the kidneys and reproductive system",
    herbs: [
      { name: "Rose", note: "The Venus herb without rival, heart-opening" },
      { name: "Yarrow", note: "Boundary within relationship, the 'love and protection' herb" },
      { name: "Vervain", note: "Sacred to many Venus and love workings historically" },
      { name: "Lady's Mantle", note: "Traditional women's herb, gathering and holding" },
      { name: "Thyme", note: "Courage in love, small and enduring" },
    ],
  },
  {
    planet: "Mercury",
    symbol: "☿",
    day: "Wednesday",
    qualities: "Communication, intellect, quickness, the nervous system, travel",
    herbs: [
      { name: "Lavender", note: "Calms and clarifies the nervous system at once" },
      { name: "Fennel", note: "Traditional herb of eloquence and clear speech" },
      { name: "Dill", note: "Quick-growing, associated with mental agility" },
      { name: "Marjoram", note: "Mercurial ease, joy in thought" },
      { name: "Parsley", note: "Common but genuinely Mercury-ruled, digestive and mental" },
    ],
  },
  {
    planet: "Moon",
    symbol: "☽",
    day: "Monday",
    qualities: "Emotion, intuition, cycles, dreams, the unconscious, water itself",
    herbs: [
      { name: "Jasmine", note: "Night-blooming, lunar, dream-opening" },
      { name: "Willow", note: "Grows by water, flexible, deeply lunar" },
      { name: "Chickweed", note: "Cooling, soothing, unassuming lunar herb" },
      { name: "Poppy (culinary seed only)", note: "Sleep and dream, handled carefully and respectfully" },
      { name: "Cucumber", note: "Traditionally lunar, cooling and watery" },
    ],
  },
];

export type EquipmentItem = {
  name: string;
  use: string;
};

export const EQUIPMENT: EquipmentItem[] = [
  {
    name: "A stovetop still, or a simple stockpot with a domed lid and a collection point",
    use: "For distillation. A dedicated glass alembic or retort is traditional and beautiful, but a stainless stockpot with its lid turned upside down (so condensation runs to a low central point) and a heatproof bowl set inside to catch the distillate works perfectly well on a home stovetop.",
  },
  {
    name: "Glass mason jars, several",
    use: "For tincturing the herb in alcohol, and later for storing ash, salt, and the finished Spagyric at each stage. Label everything with the herb, planet, and date.",
  },
  {
    name: "A heatproof pan or cast-iron pot, dedicated to this work",
    use: "For Calcination. This pan will be exposed to direct open flame and heavy carbon buildup, keep it separate from your ordinary cookware.",
  },
  {
    name: "A mortar and pestle",
    use: "For grinding calcined ash between reheatings, repeatedly, until it lightens from black to grey to (ideally) white.",
  },
  {
    name: "Coffee filters or fine cheesecloth",
    use: "For filtering the dissolved ash solution to separate the true, soluble Salt of Salts from the insoluble caput mortuum.",
  },
  {
    name: "Distilled water",
    use: "For dissolving ash and, ideally, for the tincturing menstruum itself. Traditionally made or consecrated at specific planetary hours, though plain distilled water works for the chemistry regardless.",
  },
  {
    name: "High-proof drinking alcohol (vodka or grain spirit)",
    use: "The menstruum that draws the plant's Mercury and Sulphur out during the initial tincture, before the marc is set aside for Calcination.",
  },
  {
    name: "A heat source that can go from stovetop-warm to open-flame hot",
    use: "A gas ring or portable camp burner outdoors is ideal for the Calcination stage itself, which genuinely involves setting alcohol-soaked plant matter alight.",
  },
  {
    name: "A razor blade or thin metal scraper",
    use: "For lifting the finished, dried Salt of Salts crystals cleanly off the evaporating dish.",
  },
  {
    name: "Small dark glass dropper bottles",
    use: "For storing each finished planetary Spagyric out of the light, ready to dose.",
  },
  {
    name: "A warm, low, steady heat surface (a mug warmer or very low oven works)",
    use: "For the slow evaporation of the dissolved Salt solution down to dry crystal, without scorching it.",
  },
];

export type ProcessStep = {
  key: string;
  stage: "separation" | "calcination" | "cohobation";
  order: number;
  title: string;
  body: string;
  images?: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    key: "tincture",
    stage: "separation",
    order: 1,
    title: "Tincture the herb",
    body:
      "Cover your chosen planetary herb in high-proof alcohol, in a sealed jar, and let it sit for a full lunar month, shaking it regularly with clear intention. This draws the volatile Mercury and Sulphur out of the plant body.",
  },
  {
    key: "filter-marc",
    stage: "separation",
    order: 2,
    title: "Filter and separate",
    body:
      "After the month is up, shake the jar one last time with intention, then filter the liquid off through a coffee filter, separating the alcohol tincture from the spent herb (the marc). The sludge left in the filter paper, the 'Caput Mortem' or Dead Head, can be discarded, its useful essence has already moved into the liquid.",
  },
  {
    key: "distill-setup",
    stage: "separation",
    order: 3,
    title: "Set up a simple stovetop still",
    body:
      "A stockpot with its lid turned upside down, and a heatproof bowl set in the center of the lid to catch condensation, makes a workable stovetop still. Distillation draws off the volatile Mercury first, then the watery Phlegm, then the golden, oil-bearing Sulphur.",
    images: ["distill-1", "distill-2", "distill-3"],
  },
  {
    key: "distill-collect",
    stage: "separation",
    order: 4,
    title: "Collect the distillate",
    body:
      "As the still runs, the collected liquid changes character: airy and volatile first, then watery, then increasingly golden as the plant's essential oil comes over. What's left in the pot afterward, essentially coal, becomes the raw material for Calcination.",
    images: ["distill-4", "distill-5"],
  },
  {
    key: "burn",
    stage: "calcination",
    order: 5,
    title: "Set the spent marc alight",
    body:
      "The alcohol-soaked plant matter left after distillation still holds some alcohol, which is exactly what you want. In a heatproof pan, carefully set light to it. It catches fast, burns hot, and smokes heavily at first. Do this outdoors, away from anything flammable.",
    images: ["calcination-fire-2"],
  },
  {
    key: "reduce-to-ash",
    stage: "calcination",
    order: 6,
    title: "Burn down, grind, repeat",
    body:
      "Once the alcohol has fully burned away, keep the heat going from beneath. As the carbon and blackness reduce, take the ash and grind it in a mortar and pestle, then reheat and grind again. Repeat this over several hours until the ash lightens to a pale grey, or, ideally, white.",
    images: ["calcination-fire-1", "step-01"],
  },
  {
    key: "oven-rest",
    stage: "calcination",
    order: 7,
    title: "A slow overnight rest",
    body:
      "Place the ground ash in the oven at a medium temperature and leave it overnight. This final gentle heat helps finish what the open flame and grinding started.",
  },
  {
    key: "dissolve-ash",
    stage: "cohobation",
    order: 8,
    title: "Dissolve the ash",
    body:
      "Dissolve the finished ash in distilled water, ideally made on a day and hour appropriate to the herb's ruling planet, though this isn't strictly required for the chemistry to work. Cover tightly and shake regularly over the next several hours, up to a full day.",
    images: ["step-02", "step-03"],
  },
  {
    key: "double-filter",
    stage: "cohobation",
    order: 9,
    title: "Filter, then filter again",
    body:
      "Filter the dissolved ash through a coffee filter, then filter it a second time. What's left on the filter paper, the Corpus Mortem, is discarded, it's inert mineral waste that never dissolved.",
    images: ["step-04", "step-05", "step-06"],
  },
  {
    key: "evaporate",
    stage: "cohobation",
    order: 10,
    title: "Evaporate slowly",
    body:
      "Place the filtered liquid somewhere warm and let it evaporate slowly, on a low warm surface such as a mug warmer works well. A white Salt will gradually appear in the vessel. Don't be discouraged if there isn't much of it, this is the Sal Salis, the Salt of Salts, and it's meant to be small, potent, sharp-tasting, and penetrating.",
    images: ["step-07", "step-08", "step-09"],
  },
  {
    key: "recombine",
    stage: "cohobation",
    order: 11,
    title: "Recombine, or take further",
    body:
      "Scrape the dried Salt up carefully with a razor blade and add it back into your distilled tincture (the reunited Mercury and Sulphur), or continue with more advanced circulation if you're taking the work further. Cover, shake, and you may want to let it sit for a further week or month, shaking daily, to let it fully cohere.",
    images: ["step-10", "step-11", "step-12", "step-13", "step-14", "step-15", "step-16", "step-17", "step-18"],
  },
  {
    key: "finished",
    stage: "cohobation",
    order: 12,
    title: "The Spagyric is ready",
    body:
      "What you're left with is a potent, initiatory medicine, aligned to a specific planetary sphere, ready to store in a dark dropper bottle and take according to the How to Take guidance below.",
  },
];

export const HOW_TO_TAKE = {
  intro:
    "How you take a Spagyric matters as much as how it was made. This isn't a supplement you swallow absent-mindedly, it's a small, deliberate rite.",
  steps: [
    "Take it in the correct planetary hour, on the correct day of the week, whenever that's practical for you.",
    "Sit quietly for a few moments beforehand. If you keep an alchemical altar, meditate briefly in front of it first.",
    "Contemplate the planet and the qualities it represents. Consider those same qualities in yourself, and picture the relevant sphere of your being becoming a little more harmonized, balanced, and evolved.",
    "Take the Spagyric in hand and offer a brief word of thanks for the gift before dosing.",
    "Take half to one teaspoon in water. Hold it under your tongue for around three minutes, it may burn a little; add more water if you need to.",
    "Swallow, and actually notice the change, rather than moving straight on to the next thing.",
  ],
  dosing:
    "For general health support, once or twice a day is generally enough. For initiatory work, actually attuning yourself to a particular planetary sphere's wisdom, three times a day (or four, if you're willing to wake for a middle-of-the-night dose) over one to three months is the traditional regimen. Keep a dream and experience diary across that period.",
  safety:
    "Confirm any herb you choose is safe to take at this dose and frequency before starting; if there's any doubt, reduce the amount rather than the regimen. This is medicine, treat it with the same care you'd want from any other.",
};

export type OptionalPractice = {
  key: string;
  title: string;
  subtitle: string;
  body: string[];
};

export const OPTIONAL_PRACTICES: OptionalPractice[] = [
  {
    key: "guide-pathworking",
    title: "Meeting Your Guide in the Alchemical Garden",
    subtitle: "A pathworking, useful before beginning the practical work below",
    body: [
      "Imagine yourself as an Alchemist, dressed in the clothes and apparel of the Masters. From this imagined Alchemical self, imagine a better version still, everything about you clearer, more defined, richer, more alive.",
      "See yourself standing outside an ornate gate leading to a walled garden. The gate is locked, but its ornate key sits in the keyhole. Above the gate are the words 'Solve et Coagula', to separate (purify) and recombine. Stand with that for a moment before you unlock and enter.",
      "The garden is immaculate: trellised roses, neat hedges, statues, fountains, streams. Find the central meeting point, where three figures stand: Thoth, Egyptian and ibis-headed, holding the unwound Caduceus; a winged Mercurius, helmet and sandals winged, holding the intertwined Caduceus aloft; and an elderly, bearded Hermes Trismegistus in the robes of a Sage, an astrolabe in one hand.",
      "One of the three will draw you in some unmistakable, magnetic way. This is your guide in the Alchemical planes for now. Approach, simply sense and feel their energy, and let them feel yours. Converse if they wish to.",
      "Thank your guide, and bow gently to the other two, they may become your guide another time. Leave the way you came, and lock the gate behind you.",
    ],
  },
  {
    key: "water-salt-blessing",
    title: "Distilled Water and Salt Blessing",
    subtitle: "A two-part consecration rite for your working water and salt, done across a Sunday and the Thursday and Friday that follow",
    body: [
      "On a Sunday, in the first hour after sunrise, make some distilled water. As you make it, charge it with your eyes, hands, and breath, so it becomes a Holy Water capable of blessing and banishing.",
      "On the Thursday that follows, in the eighth hour after sunrise, buy some Basil, or Hyssop if you can find it. Soak it in the water. Point your first two fingers at the water, and wherever a + appears below, trace an equal-armed cross with them: 'I conjure thee, oh Creature of Water, by the living Gods+ by the holy Gods+ by the omnipotent Gods+ that thou mayest be purified of all evil influence in the name of Elohim Sabaoth, lord of all Angels and men.' Then hold the flat of your hand over it and say: 'Creature of Water, adore thy Creator. In the name of God the Father+ God the Mother+ I consecrate thee to the service of the Most High.' Leave the herbs in overnight, filter the next morning, and store in a dark bottle.",
      "On the Friday that follows, again in the eighth hour after sunrise, get a new, unglazed earthenware pot and a fresh container of salt. Pour some salt into the pot and recite, tracing the cross at each +: 'I conjure thee, oh Creature of Earth, by the living Gods+ and by the holy Gods+ and by the omnipotent Gods+ that thou mayest be purified of all evil influence in the name of Adonai, Lord of all Angels and Men.' Then, hand flat over it: 'Oh Creature of Earth, adore thy Creator. In the name of God the Father+ God the Mother+ I consecrate thee to the service of the Most High.'",
      "Gently pour the water over the salt, saying: 'Lord of the Heavens above and great Goddess below, grant this salt will make for the health of the body, and the water for the health of the soul.' Pour a little more water while saying: 'Grant that there may be banished, from where they are used, all powers of adversity and darkness. Let every artifice of evil be banished into the outer darkness by thy holy names.' Your Holy Water is now ready to bless, banish, cleanse, and consecrate, keep it in a dark bottle, somewhere cool.",
    ],
  },
];

export const spagyricsIntro =
  "Spagyrics is the alchemical art of extracting a plant's three essentials, Mercury, Sulphur, and Salt, and recombining them into a single, more potent medicine than the raw herb alone. The word itself comes from the Greek span (to draw out) and ageirein (to collect), draw out and recombine is the whole method in two words. Everything below assumes you already understand the three essentials aren't a metaphor here so much as an actual, repeatable laboratory process, one that also happens to track precisely with a real inner transformation if you're paying attention while you do it.";
