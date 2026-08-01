// The Qabalistic Tree of Life — the ten Sephiroth and twenty-two Paths,
// with correspondences drawn primarily from Crowley's 777 (and its
// revision, 777 and Other Qabalistic Writings) and Godwin's Cabalistic
// Encyclopedia, cross-checked against the standard Golden Dawn attribution
// tables. Where Crowley deliberately broke from the older Golden Dawn
// scheme — most famously swapping The Emperor and The Star between paths
// 15 and 28 to fix the Hebrew-letter/astrological correspondence he felt
// Mathers had gotten backwards — Crowley's version is used, since that's
// what was asked for; the older Golden Dawn assignment is noted alongside
// for reference.

export type Tier = "supernal" | "ethical" | "astral" | "material";
export type Pillar = "mercy" | "severity" | "mildness";

export type Sephirah = {
  key: string;
  number: number; // 1-10
  name: string;
  hebrew: string;
  translation: string;
  tier: Tier;
  pillar: Pillar;
  x: number;
  y: number;
  colorKingScale: string; // hex, used for the node fill
  colorName: string;
  planet: string;
  magicalImage: string;
  titles: string[];
  deities: string[];
  archangel: string;
  choirOfAngels: string;
  mundaneChakra: string; // the "physical" correspondence, GD term
  tarot: string;
  virtue: string;
  vice: string;
  metal: string;
  incense: string;
  gem: string;
  plant: string;
  animal: string;
  element?: string;
  description: string;
  whatItDoes: string;
};

export const sephiroth: Sephirah[] = [
  {
    key: "kether",
    number: 1,
    name: "Kether",
    hebrew: "כתר",
    translation: "The Crown",
    tier: "supernal",
    pillar: "mildness",
    x: 200,
    y: 40,
    colorKingScale: "#ffffff",
    colorName: "Brilliance (pure white light)",
    planet: "Primum Mobile — the First Swirlings, the sphere of pure undifferentiated motion, prior to any fixed star",
    magicalImage: "An ancient bearded king seen in profile, since Kether can never be looked at directly, only from the side",
    titles: ["Existence of Existences", "Concealed of the Concealed", "The Point Within the Circle", "The Vast Countenance (Arikh Anpin)"],
    deities: ["No personified deity — this is Ain Soph Or itself first contracting into a point, prior to any god having a face"],
    archangel: "Metatron",
    choirOfAngels: "Chaioth ha Qadesh — the Holy Living Creatures",
    mundaneChakra: "Rashith ha Gilgalim — the First Swirlings, the Sphere of the Zodiac's own outer rim",
    tarot: "The four Aces (the root-power of each suit, undifferentiated)",
    virtue: "Attainment / Completion of the Great Work",
    vice: "None assigned — Kether is beyond both virtue and vice, being prior to the moral pairs of opposites",
    metal: "None — or, by extension, all of them, unresolved",
    incense: "Ambergris",
    gem: "Diamond",
    plant: "Almond in flower (the flowering almond rod of Aaron)",
    animal: "None assigned",
    description:
      "The first point, the crown of the Tree, where the infinite light of Ain Soph Or first contracts to a single dimensionless point. Kether is unity before number, will before intention, the bare fact of existence before existence has anything to say about itself.",
    whatItDoes:
      "Every other sephirah is Kether differentiating itself one further step. Meditated on directly, Kether dissolves the sense of a separate self back into first cause — closer to samadhi than to any 'working', which is why it has no vice, no metal, and only the barest attribution of an animal or deity: there is nothing yet for those to be about.",
  },
  {
    key: "chokmah",
    number: 2,
    name: "Chokmah",
    hebrew: "חכמה",
    translation: "Wisdom",
    tier: "supernal",
    pillar: "mercy",
    x: 320,
    y: 130,
    colorKingScale: "#a9a9a9",
    colorName: "Pure soft blue-grey",
    planet: "The Zodiac (Mazloth), the sphere of the fixed stars",
    magicalImage: "A bearded male figure, seen full-face",
    titles: ["Abba, the Supernal Father", "The Great Stimulator", "The Dynamic Force of the Universe"],
    deities: ["Odin", "Zeus in his oldest sky-father aspect", "Brahma", "Any pure, unpartnered begetting-god"],
    archangel: "Ratziel",
    choirOfAngels: "Auphanim — the Wheels",
    mundaneChakra: "The Zodiac itself, as the wheel of fixed stars",
    tarot: "The four Twos (Kings) — Dominion",
    virtue: "Devotion",
    vice: "None (or, in excess, indifference to consequence)",
    metal: "None assigned distinctly",
    incense: "Musk",
    gem: "Star ruby, turquoise",
    plant: "Amaranth",
    animal: "Man, in the sense of humanity as a species rather than an individual",
    description:
      "The second point: force without form, the Yod of the divine name, pure outward-thrusting energy that has not yet met anything to shape it. Where Kether simply is, Chokmah moves — the first stirring, the flash of dynamic will.",
    whatItDoes:
      "In practical work Chokmah governs the moment of pure inspiration before it has content — the 'yes' before you know yet what you're saying yes to. It's invoked when a working needs raw force and momentum rather than structure.",
  },
  {
    key: "binah",
    number: 3,
    name: "Binah",
    hebrew: "בינה",
    translation: "Understanding",
    tier: "supernal",
    pillar: "severity",
    x: 80,
    y: 130,
    colorKingScale: "#000000",
    colorName: "Black (the fertile dark, not the dark of absence)",
    planet: "Saturn",
    magicalImage: "A mature woman, dark-robed, as a figure of both fertility and grief",
    titles: ["Aima, the Dark Sterile Mother", "Ama, the Bright Fertile Mother", "The Great Sea", "Understanding"],
    deities: ["Binah herself as Supernal Mother", "Isis", "Cybele", "Demeter/Ceres in her mourning aspect", "Marah, 'the bitter sea'"],
    archangel: "Tzaphkiel",
    choirOfAngels: "Aralim — the Thrones",
    mundaneChakra: "Shabbathai — Saturn",
    tarot: "The four Threes — Understanding",
    virtue: "Silence",
    vice: "Avarice",
    metal: "Lead",
    incense: "Myrrh, civet",
    gem: "Pearl, black star sapphire",
    plant: "Opium poppy, cypress, lotus",
    animal: "None assigned distinctly (occasionally the sphinx, shared with Binah's role as Great Sea of forms)",
    description:
      "Binah receives Chokmah's raw force and gives it its first form — the great womb-sea in which every subsequent shape is cast. Binah is where limitation, structure, sorrow, and time itself first appear: form is always also a kind of grief, since to become a thing is to no longer be everything else.",
    whatItDoes:
      "Binah governs the Great Work's necessary discipline: silence, restriction, the willingness to be shaped and to grieve what shaping costs. Workings for deep understanding, for structure, for Saturnine endurance and the mysteries of death and gestation draw here.",
  },
  {
    key: "chesed",
    number: 4,
    name: "Chesed",
    hebrew: "חסד",
    translation: "Mercy",
    tier: "ethical",
    pillar: "mercy",
    x: 320,
    y: 265,
    colorKingScale: "#3b5bdb",
    colorName: "Deep blue",
    planet: "Jupiter",
    magicalImage: "A mighty crowned and throned king",
    titles: ["Gedulah, Greatness", "Love", "The Master of All the Spirits"],
    deities: ["Zeus/Jupiter as benevolent king", "Amun", "Indra", "Brihaspati"],
    archangel: "Tzadkiel",
    choirOfAngels: "Chasmalim — the Shining Ones / Brilliant Ones",
    mundaneChakra: "Tzedek — Jupiter",
    tarot: "The four Fours — Lordship",
    virtue: "Obedience",
    vice: "Bigotry, tyranny, gluttony",
    metal: "Tin",
    incense: "Cedar",
    gem: "Amethyst, sapphire",
    plant: "Olive, shamrock",
    animal: "Unicorn",
    element: "Water",
    description:
      "The first sphere below the Abyss, where the supernal light finally becomes usable, organizational force: law, abundance, memory, and the building of institutions and lineages. Chesed is expansive and generous almost without limit — its danger is precisely that it has no built-in check.",
    whatItDoes:
      "Chesed is invoked for expansion, growth, protection, the founding of durable structures (a school, a lineage, a family), and for the generosity that holds a community together. Its elemental attribution of Water below the Abyss reflects its receptive, all-encompassing largesse.",
  },
  {
    key: "geburah",
    number: 5,
    name: "Geburah",
    hebrew: "גבורה",
    translation: "Severity / Strength",
    tier: "ethical",
    pillar: "severity",
    x: 80,
    y: 265,
    colorKingScale: "#c92a2a",
    colorName: "Bright scarlet red",
    planet: "Mars",
    magicalImage: "A mighty warrior in his chariot",
    titles: ["Din, Justice", "Pachad, Fear", "The Left Hand of God"],
    deities: ["Mars/Ares", "Horus in his warrior aspect", "Sekhmet", "Kali", "Durga"],
    archangel: "Khamael",
    choirOfAngels: "Seraphim — the Fiery Serpents",
    mundaneChakra: "Madim — Mars",
    tarot: "The four Fives — Strife",
    virtue: "Energy, courage",
    vice: "Cruelty, destructiveness",
    metal: "Iron",
    incense: "Tobacco, dragon's blood",
    gem: "Ruby",
    plant: "Nettle, oak, red poppy",
    animal: "Basilisk, wolf",
    element: "Fire",
    description:
      "The necessary counterweight to Chesed: judgment, restriction, the pruning-back of what has overgrown. Where Chesed builds without limit, Geburah destroys what needs destroying, the fire that clears the field. This is the sphere of the wrathful goddesses and gods — Kali and Sekhmet both sit naturally here.",
    whatItDoes:
      "Geburah is invoked for courage, for the severing of what no longer serves, for justice, and for protective aggression when protection genuinely requires force. In ceremonial practice it's the sphere to work with consciously rather than avoid, since unexamined Geburah becomes plain cruelty.",
  },
  {
    key: "tiphareth",
    number: 6,
    name: "Tiphareth",
    hebrew: "תפארת",
    translation: "Beauty",
    tier: "ethical",
    pillar: "mildness",
    x: 200,
    y: 330,
    colorKingScale: "#ffd43b",
    colorName: "Clear rose-pink / gold-yellow",
    planet: "The Sun",
    magicalImage: "A majestic king; a child; a sacrificed god",
    titles: ["Zoar Anpin, the Lesser Countenance", "The Son", "Melekh, the King"],
    deities: ["Ra", "Apollo", "Osiris (in his death/resurrection aspect)", "Christ", "Krishna", "Vishnu"],
    archangel: "Raphael",
    choirOfAngels: "Malachim — the Kings",
    mundaneChakra: "Shemesh — the Sun",
    tarot: "The four Sixes — Victory",
    virtue: "Devotion to the Great Work",
    vice: "Pride",
    metal: "Gold",
    incense: "Olibanum (frankincense)",
    gem: "Topaz, yellow diamond",
    plant: "Acacia, laurel, vine, sunflower",
    animal: "Phoenix, lion, child, sacrificed and resurrected king",
    element: "Air",
    description:
      "The exact center of the Tree, balanced between every pillar and every tier, reachable from six of the other nine sephiroth. Tiphareth is where the higher and lower halves of the Tree meet — the seat of the healed, harmonized self, and traditionally where the dying-and-rising god-forms of many traditions are placed, since this is the sphere of sacrifice that transforms rather than destroys.",
    whatItDoes:
      "Tiphareth is the sphere of the Holy Guardian Angel working, of solar devotion, of the harmonization of the whole personality around a true center. Almost every path of serious inner work in Western magick passes through here at some point, since it's the mid-point between the personal self below and the transpersonal supernals above.",
  },
  {
    key: "netzach",
    number: 7,
    name: "Netzach",
    hebrew: "נצח",
    translation: "Victory",
    tier: "astral",
    pillar: "mercy",
    x: 320,
    y: 420,
    colorKingScale: "#2f9e44",
    colorName: "Emerald green",
    planet: "Venus",
    magicalImage: "A beautiful naked woman",
    titles: ["Firmness", "The Sphere of Love"],
    deities: ["Venus/Aphrodite", "Hathor", "Freya", "Lakshmi"],
    archangel: "Haniel",
    choirOfAngels: "Elohim — the Gods and Goddesses",
    mundaneChakra: "Nogah — Venus",
    tarot: "The four Sevens — Valour",
    virtue: "Unselfishness",
    vice: "Unchastity, lust, indulgence for its own sake",
    metal: "Copper",
    incense: "Rose, sandalwood, benzoin",
    gem: "Emerald",
    plant: "Rose",
    animal: "Lynx, dove, sparrow",
    element: "Fire",
    description:
      "The sphere of emotion, instinct, art, sexuality, and the natural drive to relate, create, and enjoy. Netzach is closer to raw nature than to intellect, love and desire in their most direct, embodied register.",
    whatItDoes:
      "Invoked for love workings, for artistic inspiration, for reconnecting with instinct and pleasure after too much time spent in Hod's abstraction. Netzach without Hod becomes indulgence without form; the two are meant to balance each other across the Tree.",
  },
  {
    key: "hod",
    number: 8,
    name: "Hod",
    hebrew: "הוד",
    translation: "Splendour / Glory",
    tier: "astral",
    pillar: "severity",
    x: 80,
    y: 420,
    colorKingScale: "#f08c00",
    colorName: "Orange",
    planet: "Mercury",
    magicalImage: "A hermaphrodite figure",
    titles: ["The Sphere of the Mind", "Absolute Intelligence"],
    deities: ["Hermes/Mercury", "Thoth", "Odin as rune-master"],
    archangel: "Michael",
    choirOfAngels: "Beni Elohim — the Sons of the Gods",
    mundaneChakra: "Kokab — Mercury",
    tarot: "The four Eights — Swiftness",
    virtue: "Truthfulness",
    vice: "Falsehood, dishonesty",
    metal: "Quicksilver / Mercury",
    incense: "Storax",
    gem: "Opal",
    plant: "Fennel, moly",
    animal: "Jackal, hybrid/composite creatures, the ibis",
    element: "Water",
    description:
      "The sphere of intellect, language, ritual form, ceremonial magick itself, and all forms of exact communication — writing, mathematics, spellcraft's precise structure rather than its raw force. Hod is where magick becomes technical: the grimoire-mind rather than the ecstatic one.",
    whatItDoes:
      "Invoked for study, for the correct structuring of a ritual, for divination, for clear communication, and for any working that needs precision more than passion. Ceremonial magick as a formal discipline, with its careful correspondences and exact wording, is very much Hod's natural home — which is, not incidentally, also where this whole chart belongs.",
  },
  {
    key: "yesod",
    number: 9,
    name: "Yesod",
    hebrew: "יסוד",
    translation: "Foundation",
    tier: "astral",
    pillar: "mildness",
    x: 200,
    y: 480,
    colorKingScale: "#9775fa",
    colorName: "Violet-purple",
    planet: "The Moon",
    magicalImage: "A beautiful naked man, very strong",
    titles: ["The Treasure House of Images", "The Machinery of the Universe"],
    deities: ["Selene", "Chandra", "Khonsu", "Artemis"],
    archangel: "Gabriel",
    choirOfAngels: "Kerubim — the Cherubim",
    mundaneChakra: "Levanah — the Moon",
    tarot: "The four Nines — Strength",
    virtue: "Independence",
    vice: "Idleness",
    metal: "Silver",
    incense: "Jasmine",
    gem: "Quartz, moonstone",
    plant: "Mandrake, damiana, banana",
    animal: "Elephant",
    element: "Air",
    description:
      "The astral foundation just above the physical world, the sphere of the etheric/astral body, dream, the subconscious, and the accumulated 'treasure house of images' that all magical imagery, sigils, and visualization actually work through. Nearly every practical technique — pathworking, astral projection, sigil charging — operates in Yesod before it ever reaches Malkuth.",
    whatItDoes:
      "Yesod is where imagination becomes efficacious rather than merely fanciful: it's the gate any working must pass through to move from intention into form. Lunar, receptive, reflective work — dreamwork, scrying, astral travel — is Yesod's proper domain.",
  },
  {
    key: "malkuth",
    number: 10,
    name: "Malkuth",
    hebrew: "מלכות",
    translation: "The Kingdom",
    tier: "material",
    pillar: "mildness",
    x: 200,
    y: 580,
    colorKingScale: "#c9a06b",
    colorName: "Citrine, olive, russet, and black (quartered)",
    planet: "The Earth, and, within it, the four classical elements enthroned together",
    magicalImage: "A young woman, crowned and throned; sometimes shown veiled",
    titles: ["The Bride", "The Gate", "The Inferior Mother", "The Gate of Death (its lowest path)", "The Gate of Tears"],
    deities: ["Persephone", "Ceres/Demeter", "Prithvi", "Gaia"],
    archangel: "Sandalphon",
    choirOfAngels: "Ashim — Souls of Fire",
    mundaneChakra: "Cholem Yesodoth — the Breaker of the Foundations, the physical elements themselves",
    tarot: "The four Tens — Wealth / completion of each suit",
    virtue: "Discrimination",
    vice: "Avarice, inertia",
    metal: "All metals; lead is sometimes given as the closing metal here as it opened at Kether's furthest remove",
    incense: "Dittany of Crete",
    gem: "Rock crystal",
    plant: "Lily, ivy, all cultivated plants",
    animal: "Sphinx",
    element: "Earth — quartered within Malkuth's own disc into Air (NE), Fire (SE), Water (SW), and Earth proper (NW), the only sephirah where all four elements appear together, fully differentiated",
    description:
      "The final sephirah, the material world itself, where the light that began as a single point in Kether has descended through nine prior stages to become fully, densely manifest — soil, body, coin, and stone. Malkuth is not lesser for being lowest; it's the only sphere where the whole Tree's work is actually tested against resistance.",
    whatItDoes:
      "All grounding, embodiment, and manifestation work happens here — bringing a working fully into physical result, consecrating physical tools, and honoring the body and the earth as sacred rather than as something to escape. The classical teaching that 'the elements below the Abyss find their full, separate expression only in Malkuth' matters practically: everything above is elemental in tendency only, but here the four are concrete and distinct.",
  },
];

export type PathTier = "supernal" | "ethical" | "astral" | "involutionary";

export type Path = {
  number: number; // 11-32
  letter: string;
  letterMeaning: string;
  hebrewGematria: number;
  tarot: string;
  crowleyNote?: string;
  astrological: string;
  from: string; // sephirah key
  to: string; // sephirah key
  color: string; // hex, for the connecting line
  whatItDoes: string;
};

export const paths: Path[] = [
  {
    number: 11,
    letter: "Aleph (א)",
    letterMeaning: "Ox",
    hebrewGematria: 1,
    tarot: "The Fool",
    astrological: "Air (element)",
    from: "kether",
    to: "chokmah",
    color: "#f1f3f5",
    whatItDoes:
      "Connects the Crown to Wisdom directly at the top of the Tree — pure, unweighted potential stepping into the first breath of movement. Working this path means approaching a matter with total beginner's mind, unattached to any outcome, which is exactly what The Fool depicts.",
  },
  {
    number: 12,
    letter: "Beth (ב)",
    letterMeaning: "House",
    hebrewGematria: 2,
    tarot: "The Magus / The Magician",
    astrological: "Mercury",
    from: "kether",
    to: "binah",
    color: "#adb5bd",
    whatItDoes:
      "Connects the Crown to Understanding: the will of Kether given articulate, focused form through Mercury's cunning and speech. This is the path of the magician's core skill — taking pure intention and making it precisely spoken, so it can be received and given shape.",
  },
  {
    number: 13,
    letter: "Gimel (ג)",
    letterMeaning: "Camel",
    hebrewGematria: 3,
    tarot: "The High Priestess",
    astrological: "The Moon",
    from: "kether",
    to: "tiphareth",
    color: "#d0bfff",
    whatItDoes:
      "The direct, vertical path down the Middle Pillar connecting the Crown straight to the harmonized self of Tiphareth, crossing the Abyss entirely. This is the path of pure contemplative receptivity — the veil between the seen and unseen, worked through silence and lunar reflection rather than through any active technique.",
  },
  {
    number: 14,
    letter: "Daleth (ד)",
    letterMeaning: "Door",
    hebrewGematria: 4,
    tarot: "The Empress",
    astrological: "Venus",
    from: "chokmah",
    to: "binah",
    color: "#63e6be",
    whatItDoes:
      "Connects Wisdom to Understanding along the top of the Tree, the doorway through which raw force first meets receptive form and becomes fertile — the union that produces the whole manifest cosmos below. Fertility, creativity, and embodied love workings sit here.",
  },
  {
    number: 15,
    letter: "Heh (ה)",
    letterMeaning: "Window",
    hebrewGematria: 5,
    tarot: "The Star",
    crowleyNote: "Crowley's deliberate swap: in the older Golden Dawn scheme this path carries The Emperor instead (which Crowley reassigned to path 28).",
    astrological: "Aquarius",
    from: "chokmah",
    to: "tiphareth",
    color: "#66d9e8",
    whatItDoes:
      "Connects Wisdom down to Beauty: the influx of hope, clear vision, and renewal after the ordeal of the Abyss has been crossed. This is a path of unveiling and quiet, steady illumination rather than sudden force.",
  },
  {
    number: 16,
    letter: "Vav (ו)",
    letterMeaning: "Nail",
    hebrewGematria: 6,
    tarot: "The Hierophant",
    astrological: "Taurus",
    from: "chokmah",
    to: "chesed",
    color: "#8ce99a",
    whatItDoes:
      "Connects Wisdom to Mercy: raw force settling into teachable, transmissible tradition. This is the path of initiation properly given, doctrine and lineage passed from teacher to student in stable, embodied form.",
  },
  {
    number: 17,
    letter: "Zayin (ז)",
    letterMeaning: "Sword",
    hebrewGematria: 7,
    tarot: "The Lovers",
    astrological: "Gemini",
    from: "binah",
    to: "tiphareth",
    color: "#ffe066",
    whatItDoes:
      "Connects Understanding to Beauty: the choice and union that follows differentiation, the sword that both divides and joins. This is a path of conscious choice between apparent opposites, and the marriage that becomes possible once a real choice has actually been made.",
  },
  {
    number: 18,
    letter: "Cheth (ח)",
    letterMeaning: "Fence",
    hebrewGematria: 8,
    tarot: "The Chariot",
    astrological: "Cancer",
    from: "binah",
    to: "geburah",
    color: "#e0e0e0",
    whatItDoes:
      "Connects Understanding to Severity: the disciplined, armored vehicle that carries the work forward under Binah's restriction and Geburah's force. Protection, willed direction, and victory through controlled momentum belong here.",
  },
  {
    number: 19,
    letter: "Teth (ט)",
    letterMeaning: "Serpent",
    hebrewGematria: 9,
    tarot: "Lust (Strength)",
    astrological: "Leo",
    from: "chesed",
    to: "geburah",
    color: "#f76707",
    whatItDoes:
      "Directly connects Mercy and Severity, the two arms of the ethical triad, without passing through Tiphareth — the raw, serpent fire that reconciles gentleness and force by simply riding both at once rather than choosing between them.",
  },
  {
    number: 20,
    letter: "Yod (י)",
    letterMeaning: "Hand",
    hebrewGematria: 10,
    tarot: "The Hermit",
    astrological: "Virgo",
    from: "chesed",
    to: "tiphareth",
    color: "#94d82d",
    whatItDoes:
      "Connects Mercy to Beauty: the solitary lamp of self-examination and careful discernment that refines Chesed's abundance down into Tiphareth's true center. A path of inner retreat, discrimination, and patient inner work rather than outward action.",
  },
  {
    number: 21,
    letter: "Kaph (כ)",
    letterMeaning: "Palm of the hand",
    hebrewGematria: 20,
    tarot: "Wheel of Fortune",
    astrological: "Jupiter",
    from: "chesed",
    to: "netzach",
    color: "#5c7cfa",
    whatItDoes:
      "Connects Mercy down to Victory: Jupiter's expansive fortune meeting Venus's instinctual drive. This is the path of cyclical change, luck, and the turning of circumstance, worked with rather than fought.",
  },
  {
    number: 22,
    letter: "Lamed (ל)",
    letterMeaning: "Ox-goad",
    hebrewGematria: 30,
    tarot: "Adjustment (Justice)",
    astrological: "Libra",
    from: "geburah",
    to: "tiphareth",
    color: "#12b886",
    whatItDoes:
      "Connects Severity to Beauty: force brought into exact balance by the demand for genuine equity rather than mere restraint. This path governs karmic balancing, fair judgment, and the correction of what has swung too far to one side.",
  },
  {
    number: 23,
    letter: "Mem (מ)",
    letterMeaning: "Water",
    hebrewGematria: 40,
    tarot: "The Hanged Man",
    astrological: "Water (element)",
    from: "geburah",
    to: "hod",
    color: "#1971c2",
    whatItDoes:
      "Connects Severity to Splendour: the suspended, surrendered state that follows a real reversal of ordinary effort — force giving way, willingly, to reflection and a different order of understanding. Sacrifice-for-vision workings belong here.",
  },
  {
    number: 24,
    letter: "Nun (נ)",
    letterMeaning: "Fish",
    hebrewGematria: 50,
    tarot: "Death",
    astrological: "Scorpio",
    from: "tiphareth",
    to: "netzach",
    color: "#862e2e",
    whatItDoes:
      "Connects Beauty to Victory: the necessary death of an old form of the self so that instinct and desire (Netzach) can be re-entered honestly rather than through the ego's old habits. Transformation-through-ending work, not literal death, belongs on this path.",
  },
  {
    number: 25,
    letter: "Samekh (ס)",
    letterMeaning: "Prop/support",
    hebrewGematria: 60,
    tarot: "Art (Temperance)",
    astrological: "Sagittarius",
    from: "tiphareth",
    to: "yesod",
    color: "#4263eb",
    whatItDoes:
      "Connects Beauty directly down to Foundation: the alchemical mixing-path, tempering the harmonized solar self with the lunar unconscious below. This is the classic path of the Holy Guardian Angel's continued integration into the astral and dream life, and of skillful synthesis generally.",
  },
  {
    number: 26,
    letter: "Ayin (ע)",
    letterMeaning: "Eye",
    hebrewGematria: 70,
    tarot: "The Devil",
    astrological: "Capricorn",
    from: "tiphareth",
    to: "hod",
    color: "#343a40",
    whatItDoes:
      "Connects Beauty to Splendour: the confrontation with matter, bondage, and one's own compulsions seen clearly — the eye that looks directly at what enslaves it. Shadow-work and the honest examination of one's own conditioning belong here.",
  },
  {
    number: 27,
    letter: "Peh (פ)",
    letterMeaning: "Mouth",
    hebrewGematria: 80,
    tarot: "The Tower",
    astrological: "Mars",
    from: "netzach",
    to: "hod",
    color: "#e03131",
    whatItDoes:
      "Directly connects Victory and Splendour, the two arms of the astral triad, without passing through Yesod — sudden, forceful speech or event that breaks a false structure built from instinct and intellect misaligned with each other. Necessary destruction of illusion.",
  },
  {
    number: 28,
    letter: "Tzaddi (צ)",
    letterMeaning: "Fish-hook",
    hebrewGematria: 90,
    tarot: "The Emperor",
    crowleyNote: "Crowley's deliberate swap: in the older Golden Dawn scheme this path carries The Star instead (which Crowley reassigned to path 15).",
    astrological: "Aries",
    from: "netzach",
    to: "yesod",
    color: "#e8590c",
    whatItDoes:
      "Connects Victory to Foundation: instinct and desire given firm, ordering structure — the disciplined, fatherly authority that channels Netzach's raw feeling into a stable foundation rather than letting it dissipate.",
  },
  {
    number: 29,
    letter: "Qoph (ק)",
    letterMeaning: "Back of the head",
    hebrewGematria: 100,
    tarot: "The Moon",
    astrological: "Pisces",
    from: "netzach",
    to: "malkuth",
    color: "#748ffc",
    whatItDoes:
      "Connects Victory directly to the Kingdom: the deep instinctual, oceanic, dreaming mind meeting the physical world without the mediation of intellect. Old, primal magic — glamour, illusion, deep body-instinct work — belongs on this path.",
  },
  {
    number: 30,
    letter: "Resh (ר)",
    letterMeaning: "Head",
    hebrewGematria: 200,
    tarot: "The Sun",
    astrological: "The Sun",
    from: "hod",
    to: "yesod",
    color: "#fcc419",
    whatItDoes:
      "Connects Splendour to Foundation: intellect illuminated and simplified into plain, radiant clarity, the mind finally at rest in unclouded understanding rather than restless analysis. A path of joy, vitality, and simple, direct seeing.",
  },
  {
    number: 31,
    letter: "Shin (ש)",
    letterMeaning: "Tooth",
    hebrewGematria: 300,
    tarot: "The Aeon (Judgement)",
    astrological: "Fire / Spirit (element)",
    from: "hod",
    to: "malkuth",
    color: "#d9480f",
    whatItDoes:
      "Connects Splendour directly down to the Kingdom: the fire of final reckoning and awakening entering matter itself, an ending that is also a resurrection into a new order. Radical transformation of the whole material situation.",
  },
  {
    number: 32,
    letter: "Tav (ת)",
    letterMeaning: "Cross / mark",
    hebrewGematria: 400,
    tarot: "The Universe (The World)",
    astrological: "Saturn",
    from: "yesod",
    to: "malkuth",
    color: "#495057",
    whatItDoes:
      "The final path, connecting Foundation to the Kingdom: the completion and closing of the whole circuit, the astral finally fully anchored into physical form. Consecration, completion of a long working, and the closing of any cycle belong here.",
  },
];

export const sephirahByKey = (key: string) => sephiroth.find((s) => s.key === key)!;

export const supernals = sephiroth.filter((s) => s.tier === "supernal");
export const ethicalTriad = sephiroth.filter((s) => s.tier === "ethical");
export const astralTriad = sephiroth.filter((s) => s.tier === "astral");
