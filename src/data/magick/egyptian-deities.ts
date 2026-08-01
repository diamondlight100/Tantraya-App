// Ancient Egyptian Magick, Deity Codex
// Hardcoded "God Card" reference profiles: role, appearance, symbols,
// colors, sacred animals, myth, offerings, incense, sacred days, and a
// short invocation line for each. Written to sit alongside, not replace , 
// the course chapters; this is the quick-reference "grimoire" layer.

export type Deity = {
  slug: string;
  image: string;
  name: string;
  epithets: string[];
  role: string;
  domain: string[];
  appearance: string;
  symbols: string[];
  sacredAnimals: string[];
  colors: { name: string; hex: string }[];
  family?: string;
  myth: string;
  offerings: string[];
  incense: string[];
  sacredDays: string;
  invocation: string;
};

export const egyptianDeities: Deity[] = [
  {
    slug: "heka",
    image: "/deities/heka.jpg",
    name: "Heka",
    epithets: ["Lord of Magic", "The Power Before the Gods"],
    role: "The primordial force of magic itself, the substance power is made of rather than a god who merely wields it.",
    domain: ["Magic", "Creative word", "Vital force"],
    appearance:
      "Depicted as a man, sometimes twinned with the ka-signs of two entwined arms; often shown holding two serpents, one in each hand, mastering rather than being mastered.",
    symbols: ["Two entwined serpents", "The ka-arms sign", "The uas sceptre"],
    sacredAnimals: ["Serpent"],
    colors: [
      { name: "Deep gold", hex: "#b8860b" },
      { name: "Void black", hex: "#14110d" },
    ],
    myth:
      "In the Coffin Texts, Heka declares: \"To me belonged the universe before you gods had come into being. You have come afterwards because I am HEKA.\" Heka exists prior to creation itself, the raw current that Atum, Ptah, and every other creator-god draws on to speak the world into being. Every spell, every ritual gesture, every divine name is understood as a channel for this one prior force.",
    offerings: ["Candle flame lit in silence", "A spoken vow kept afterward", "Incense with no other petition attached"],
    incense: ["Frankincense", "Storax"],
    sacredDays: "No fixed feast, traditionally invoked first, before any other working, at the very opening of a rite.",
    invocation: "I call not from outside, but recognise what was already here before the gods themselves. HEKA.",
  },
  {
    slug: "maat",
    image: "/deities/maat.jpg",
    name: "Ma'at",
    epithets: ["She Who Holds the Balance", "Daughter of Ra"],
    role: "Truth, justice, cosmic and moral order, the principle without which the sun could not rise.",
    domain: ["Truth", "Balance", "Justice", "Cosmic order"],
    appearance:
      "A woman wearing a single ostrich feather upright on her head, sometimes winged; occasionally shown simply as the feather alone.",
    symbols: ["The single ostrich feather", "The scales of judgment"],
    sacredAnimals: ["Ostrich"],
    colors: [
      { name: "White", hex: "#f5f2e8" },
      { name: "Sky blue", hex: "#7ea6c9" },
    ],
    family: "Daughter of Ra",
    myth:
      "Every heart, upon death, is weighed on a scale against Ma'at's single feather before Osiris and the Council of 42 Assessors in the Hall of Two Truths. A heart heavier than the feather, burdened with wrongdoing, is devoured by Ammit and denied continuation. Ma'at is also the order Ra re-establishes each dawn, pushing back the chaos of Isfet for one more day; without her, even the sun's rising is not guaranteed.",
    offerings: ["A small dish of clean water", "White linen or cloth", "An honestly-kept promise"],
    incense: ["Plain white sage or local dried herb, nothing ornate"],
    sacredDays: "Invoked at any moment of judgment, decision, or reckoning; no single fixed festival, but closely tied to the New Year's re-founding of order.",
    invocation: "Let my heart be light as your feather. May I deal truly, and be dealt with truly in turn.",
  },
  {
    slug: "isis",
    image: "/deities/isis.jpg",
    name: "Isis",
    epithets: ["Great of Magic", "Mistress of the House of Life", "Mother of Horus", "Throne"],
    role: "The supreme magician-goddess, mistress of Heka, healer, protector of the vulnerable, and the archetypal devoted mother and wife.",
    domain: ["Magic", "Healing", "Motherhood", "Protection", "Resurrection"],
    appearance:
      "A woman wearing the throne-glyph (her own name) as a crown, or later the horns-and-sun-disc headdress she shares with Hathor; often shown with outstretched wings, or nursing the infant Horus.",
    symbols: ["The tyet (Isis knot)", "The throne glyph", "Outstretched protective wings", "The sistrum"],
    sacredAnimals: ["Kite (the bird she becomes to fan life into Osiris)", "Cow (via Hathor overlap)"],
    colors: [
      { name: "Deep red", hex: "#8c1c2c" },
      { name: "Lapis blue", hex: "#1f3a63" },
      { name: "Gold", hex: "#c9a227" },
    ],
    family: "Daughter of Nuit and Geb; sister-wife of Osiris; sister of Nephthys and Set; mother of Horus",
    myth:
      "When Set murdered and dismembered Osiris, scattering his body across Egypt, Isis searched every province and gathered the pieces, using her magic to temporarily reanimate him, transforming into a kite and conceiving Horus from his restored form. She then hid and raised Horus in the marshes of Chemmis, protecting him from Set's agents until he was strong enough to claim his father's throne. Her magic is famously described as greater than a million ordinary men's, she once tricked Ra himself into revealing his secret name by crafting a serpent from his own spittle and the earth.",
    offerings: ["Milk", "Blue and white lotus flowers", "Myrrh", "Small images of children or mothers"],
    incense: ["Myrrh", "Lotus attar"],
    sacredDays: "Her mysteries were celebrated widely in the Greco-Roman world at the Navigium Isidis (5 March); in Egypt proper, linked to the annual mourning-and-finding cycle around the flooding of the Nile.",
    invocation: "Isis, Great of Magic, who gathered what was scattered and made it whole, gather what is scattered in me.",
  },
  {
    slug: "osiris",
    image: "/deities/osiris.jpg",
    name: "Osiris",
    epithets: ["Foremost of the Westerners", "Lord of the Duat", "Wennefer (the Perfect One)"],
    role: "God of the dead, resurrection, and the fertile cycle of the Nile, ruler and judge of the underworld.",
    domain: ["Death and resurrection", "The afterlife", "Fertility of the land", "Kingship"],
    appearance:
      "A mummified king, skin green or black (fertility and decay/rebirth), holding the crook and flail crossed over his chest, wearing the white Atef crown flanked by ostrich feathers.",
    symbols: ["The crook and flail", "The Djed pillar (his spine)", "The Atef crown"],
    sacredAnimals: ["Bull (as Apis overlap)"],
    colors: [
      { name: "Fertile green", hex: "#3f6b3a" },
      { name: "Black Nile silt", hex: "#1c1712" },
      { name: "White", hex: "#eae6da" },
    ],
    family: "Son of Nuit and Geb; brother-husband of Isis; brother of Set and Nephthys; father of Horus",
    myth:
      "Osiris ruled Egypt as a wise, civilizing king until his jealous brother Set trapped him in a bejewelled coffin sized exactly to his body, sealed it, and cast it into the Nile. Set later dismembered the recovered body into pieces scattered across the land. Isis and Nephthys recovered and reassembled him; Isis's magic and Anubis's embalming restored him enough to conceive Horus, and Osiris then passed into the Duat to reign as judge of the dead, his own death and restoration becoming the model every soul's mummification and afterlife journey re-enacts.",
    offerings: ["Barley or emmer wheat", "Beer", "Green plants or shoots (an Osiris bed)", "Water from the Nile or any living river"],
    incense: ["Kyphi (the classical temple-incense blend)"],
    sacredDays: "The Khoiak festival (roughly November), re-enacting his death, mourning, and resurrection, tied to the Nile flood's retreat and the planting of new crops.",
    invocation: "Osiris Wennefer, Perfect One, who rose after the deepest dismemberment, teach me what in me is ready to rise.",
  },
  {
    slug: "anubis",
    image: "/deities/anubis.jpg",
    name: "Anubis",
    epithets: ["Lord of the Sacred Land", "Master of Secrets (Hery Seshta)", "Mighty One of Magic (Wer-Hekau)", "He Who is Upon His Mountain"],
    role: "God of embalming, mummification, and the guide of souls through the first stages of the Duat.",
    domain: ["Embalming", "Guardianship of the dead", "Guiding souls", "Protection of sacred space"],
    appearance:
      "A jackal-headed man, or a full black jackal reclining atop a shrine or tomb; his black colouring is symbolic (fertile Nile silt, the colour of a preserved mummified body) rather than descriptive of an actual jackal's coat.",
    symbols: ["The was sceptre", "The flail", "The imiut fetish (a headless animal skin on a pole)"],
    sacredAnimals: ["Jackal", "Black dog"],
    colors: [
      { name: "Black", hex: "#161311" },
      { name: "Gold", hex: "#c9a227" },
    ],
    family: "Son of Nephthys (in most late traditions, by Osiris); associated closely with Isis and Osiris's restoration",
    myth:
      "Anubis performed the first embalming in myth, preserving the body of Osiris and thereby inventing the mummification rite every Egyptian afterward relied on. As Opener of the Ways, he is invoked at the threshold of every temple working and every funerary rite, and he alone conducts the newly dead through the earliest, most dangerous stretches of the Duat toward the Hall of Two Truths, where he personally performs the Weighing of the Heart against Ma'at's feather.",
    offerings: ["Dark bread", "Black beer", "Meat set aside at a boundary or threshold", "A closed door left symbolically open"],
    incense: ["Frankincense", "A little pine or cedar resin"],
    sacredDays: "Invoked at the opening and closing of any working, and central to the Khoiak funerary rites alongside Osiris.",
    invocation: "Anubis, Opener of the Ways, Walker Between Worlds, stand at my threshold and let only what is true pass through.",
  },
  {
    slug: "sekhmet",
    image: "/deities/sekhmet.jpg",
    name: "Sekhmet",
    epithets: ["The Powerful One", "Eye of Ra", "Lady of Pestilence", "Mistress of Dread"],
    role: "Lioness goddess of war, plague, and fierce protective power, and, in her healing aspect, the patroness of physicians.",
    domain: ["Ferocity", "Protection", "Disease and its cure", "Righteous destruction"],
    appearance:
      "A lioness-headed woman crowned with the solar disc and uraeus, often holding an ankh; her breath was said to have formed the desert.",
    symbols: ["The solar disc", "The uraeus (rearing cobra)", "The ankh"],
    sacredAnimals: ["Lioness"],
    colors: [
      { name: "Blood red", hex: "#7a1220" },
      { name: "Solar gold", hex: "#d9a13a" },
    ],
    family: "Daughter of Ra; consort of Ptah; mother of Nefertem",
    myth:
      "When humanity rebelled against aging Ra, he sent his Eye, Sekhmet, to punish them, and she began a slaughter so total that it threatened to end humanity outright. To stop her, Ra had beer dyed red as blood and flooded the fields; Sekhmet, mistaking it for blood, drank herself into a stupor and woke as gentle Hathor, her rage spent. Physician-priests of Sekhmet were considered among the most skilled in Egypt, since the goddess who sends plague is also the one who can be petitioned to withhold or lift it.",
    offerings: ["Red beer or red wine", "Raw meat left at a private altar", "A fierce boundary honestly set and kept"],
    incense: ["Dragon's blood resin", "Red myrrh"],
    sacredDays: "Her many 'wrathful' feast days were marked with intentional intoxication rites echoing the beer-flood myth, historically clustered around the New Year.",
    invocation: "Sekhmet, Eye of Ra, whose rage can also heal, burn away only what must be burned, and no further.",
  },
  {
    slug: "thoth",
    image: "/deities/thoth.jpg",
    name: "Thoth",
    epithets: ["Lord of Divine Words", "Reckoner of Time", "Scribe of the Gods", "Thrice-Great (later, as Hermes Trismegistus)"],
    role: "God of writing, wisdom, magic, the moon, and mediation, the divine record-keeper and the inventor of Heka's spoken formulae.",
    domain: ["Writing and language", "Wisdom", "Magic", "The moon", "Mediation and judgment"],
    appearance:
      "An ibis-headed man holding a scribe's palette and reed pen, or a full baboon; often shown recording the outcome of the Weighing of the Heart.",
    symbols: ["The scribe's palette", "The ibis", "The lunar disc and crescent"],
    sacredAnimals: ["Ibis", "Baboon"],
    colors: [
      { name: "Silver-white (moon)", hex: "#dfe3e8" },
      { name: "Deep blue-black (ibis)", hex: "#1c2733" },
    ],
    myth:
      "Thoth is credited with inventing writing and speech itself, and with mediating the conflict between Horus and Set before the divine tribunal, ensuring the rightful outcome. At the Weighing of the Heart, it is Thoth who records the verdict. The truth must be witnessed and written. In the Hellenistic era he was fused with Hermes as Hermes Trismegistus, becoming the mythic author of the entire Hermetic corpus that shaped Western esotericism for two thousand years.",
    offerings: ["Ink or a freshly-written page", "A fair, documented account of a dispute", "Moonlit water left overnight"],
    incense: ["Sandalwood", "A little camphor"],
    sacredDays: "Feast on the New Moon; his month (Thoth, the first month of the Egyptian calendar) opens the year.",
    invocation: "Thoth, who weighed the word before it was spoken. Give me the right word, and the discipline to write it down truly.",
  },
  {
    slug: "ptah",
    image: "/deities/ptah.jpg",
    name: "Ptah",
    epithets: ["The Great Craftsman", "Lord of Truth", "He Who Made All"],
    role: "The creator-god of Memphis, who brings the universe into being through thought and speech alone, patron of craftsmen and architects.",
    domain: ["Creation through thought and word", "Craftsmanship", "Architecture", "Metalworking"],
    appearance:
      "A mummiform man in tight-fitting garments, holding a composite sceptre (djed + was + ankh), often shown with a shaved head under a skullcap, standing on a Ma'at-plinth.",
    symbols: ["The djed-was-ankh composite sceptre", "The Ma'at plinth"],
    sacredAnimals: ["Apis bull (his living herald)"],
    colors: [
      { name: "Deep blue-green", hex: "#25534a" },
      { name: "Gold", hex: "#c9a227" },
    ],
    family: "Consort of Sekhmet; father of Nefertem",
    myth:
      "The Memphite Theology holds that Ptah conceived the entire universe in his heart (the seat of thought) and then brought it into being simply by naming it aloud with his tongue, creation as pure Heka, thought and word alone, with no need for physical crafting at all. This made him the patron of every craftsman who shapes an idea into physical form, from stonemasons to jewellers, since their work mirrors his original act.",
    offerings: ["A finished piece of one's own handiwork", "Blue faience or turquoise", "Bread baked with intention"],
    incense: ["Cedar", "Frankincense"],
    sacredDays: "Closely tied to Memphis's own New Year and craft-guild festivals; no single pan-Egyptian date survives clearly.",
    invocation: "Ptah, who thought the world and spoke it whole. Let what I make begin as clearly in my heart as it will end in my hands.",
  },
  {
    slug: "horus",
    image: "/deities/horus.jpg",
    name: "Horus",
    epithets: ["The Falcon", "Lord of the Sky", "Avenger of His Father", "Horus of the Two Horizons (Horakhty)"],
    role: "The falcon sky-god and rightful king, the model every living pharaoh embodied, and the avenger who won back his father's throne.",
    domain: ["Kingship", "The sky", "Vengeance and rightful rule", "Healing (via the Eye)"],
    appearance:
      "A falcon, or a falcon-headed man wearing the Double Crown of Upper and Lower Egypt, his eyes the sun and moon.",
    symbols: ["The Utchat (Eye of Horus)", "The Double Crown (Pschent)", "The falcon"],
    sacredAnimals: ["Falcon"],
    colors: [
      { name: "Sky blue", hex: "#3c6e9e" },
      { name: "Gold", hex: "#d9a13a" },
    ],
    family: "Son of Isis and Osiris; nephew and rival of Set",
    myth:
      "Raised in hiding by Isis in the marshes to protect him from Set, Horus grew to challenge his uncle for Egypt's throne in a series of trials before the divine tribunal, losing an eye in the contest (restored, in most versions, by Thoth or Hathor). His eventual victory installed him as legitimate king, and every living pharaoh was thereafter considered his earthly embodiment, Egypt's kingship itself is, mythologically, an unbroken chain of Horus's rule.",
    offerings: ["A falcon feather or image", "Sunlit water", "A restored or repaired object (echoing his restored Eye)"],
    incense: ["Frankincense"],
    sacredDays: "Associated with the summer solstice and with royal coronation rites generally rather than one fixed calendar feast.",
    invocation: "Horus, whose wounded eye was made whole again. Let what was taken from me be restored, and let me rise into what is rightly mine.",
  },
  {
    slug: "set",
    image: "/deities/set.jpg",
    name: "Set",
    epithets: ["Lord of the Red Land", "He Who Causes Confusion", "Great of Strength"],
    role: "God of the desert, storms, chaos, and foreign lands, Osiris's murderer, but also Ra's essential defender against the serpent Apep.",
    domain: ["The desert and storms", "Chaos (Isfet) held in productive tension", "Foreign lands", "Raw strength"],
    appearance:
      "A man with the head of the unidentified 'Set-animal', a composite creature with a curved snout and squared ears; associated with the hostile red desert beyond the fertile black land.",
    symbols: ["The was sceptre (which he originated)", "The Set-animal head"],
    sacredAnimals: ["The Set-animal (no known real-world counterpart)", "Donkey (in later, more hostile depictions)"],
    colors: [
      { name: "Desert red", hex: "#a8492c" },
      { name: "Black", hex: "#171310" },
    ],
    family: "Son of Nuit and Geb; brother of Osiris and Isis; husband of Nephthys",
    myth:
      "Set's murder and dismemberment of Osiris is Egypt's central myth of chaos disrupting order, yet Set is not a simple devil-figure. In the solar barque, it is Set who stands at the prow each night to fight off Apep, the serpent of pure non-being, protecting Ra's journey through the Duat; without Set's violence turned outward, the sun would not rise. Egyptian theology generally treats Set as a necessary force that must be rightly directed rather than denied, never simply as evil to be eliminated.",
    offerings: ["Red items left outside sacred space", "A boundary explicitly named and defended", "Unrefined salt"],
    incense: ["Storax", "A little sulphurous resin, used sparingly"],
    sacredDays: "Feasts associated with storms and the inhospitable months of the desert calendar; deliberately not softened into a 'friendly' festival in most periods.",
    invocation: "Set, whose force turned outward guards the sun itself. Let what is fierce in me be turned to guarding.",
  },
  {
    slug: "nephthys",
    image: "/deities/nephthys.jpg",
    name: "Nephthys",
    epithets: ["Lady of the House", "The Excellent Goddess", "Friend of the Dead"],
    role: "Goddess of mourning, the night, and hidden or liminal things, Isis's constant companion at every threshold, especially death.",
    domain: ["Mourning and grief", "Night and hidden things", "Protection of the dead", "Transition"],
    appearance:
      "A woman wearing the hieroglyphs for her name (a basket atop the sign for 'house') as a crown; frequently shown as a kite, mirroring Isis, standing at the opposite end of the funeral bier.",
    symbols: ["The house-and-basket name-glyph", "The kite"],
    sacredAnimals: ["Kite"],
    colors: [
      { name: "Deep twilight blue", hex: "#232c47" },
      { name: "Silver", hex: "#c9cdd4" },
    ],
    family: "Daughter of Nuit and Geb; sister of Isis and Osiris; wife of Set",
    myth:
      "Though married to Set, Nephthys sided with her sister Isis in mourning and searching for Osiris's scattered body, and the two goddesses are shown together at either end of the coffin in nearly every funerary depiction, Isis at the head, Nephthys at the feet. She is the quieter, less mythologically prominent sister, but ritually indispensable: no proper mourning or embalming rite is complete without invoking both sisters together.",
    offerings: ["A single lit candle at dusk", "Something quietly set aside for someone grieving", "Dark cloth"],
    incense: ["Myrrh", "A trace of storax"],
    sacredDays: "Paired with Isis's mourning rites in the Khoiak festival cycle; especially honoured at dusk.",
    invocation: "Nephthys, quiet sister at the far end of the bier. Stay with me in what I am not ready to say aloud yet.",
  },
  {
    slug: "cosmology-trio",
    image: "/deities/nuit-geb-shu.jpg",
    name: "Nuit, Geb & Shu",
    epithets: ["The Sky, the Earth, and the Air Between"],
    role: "The three deities whose bodies form the physical architecture of the cosmos: sky above, air between, earth below.",
    domain: ["The structure of the visible universe", "Day and night", "The separation of order from primordial chaos"],
    appearance:
      "Nuit: a star-covered woman arched overhead on hands and feet, swallowing the sun each evening and birthing it each dawn. Shu: a man standing between earth and sky with arms raised, physically holding them apart, sometimes shown with an ostrich feather (his name means 'emptiness/air'). Geb: a man reclining beneath them both, often shown with green skin or vegetation growing from his body, sometimes laughing (said to cause earthquakes).",
    symbols: ["The star-arched sky (Nuit)", "The raised, separating arms (Shu)", "The reclining, vegetation-covered ground (Geb)"],
    sacredAnimals: ["Sow (Nuit, in some regional traditions)", "Goose (Geb, 'the Great Cackler')"],
    colors: [
      { name: "Star-black (Nuit)", hex: "#0d1224" },
      { name: "Pale air-white (Shu)", hex: "#eceff2" },
      { name: "Living green (Geb)", hex: "#33532e" },
    ],
    family: "Children of Tefnut and Shu's own lineage from Atum; Nuit and Geb are the parents of Osiris, Isis, Set, and Nephthys",
    myth:
      "Nuit and Geb were once locked together in permanent embrace until their father Shu forced himself between them, lifting Nuit into the sky and pressing Geb down as the earth, the primal act of separation that makes a livable, ordered cosmos possible at all. Nuit's nightly swallowing and rebirth of the sun is the origin of day and night; Geb's laughter is said to cause earthquakes, and grain was thought to grow from his body directly. Together the three are the physical stage on which every other myth in the tradition takes place.",
    offerings: ["Grain or bread (for Geb)", "Incense smoke released outdoors at night (for Nuit and Shu together)", "A window opened to fresh air"],
    incense: ["Frankincense released into open air, ideally at night"],
    sacredDays: "Invoked together at cosmological framing moments, solstices and equinoxes, rather than a single dedicated feast.",
    invocation: "Nuit above, Geb below, Shu holding the space between. Let there be room enough in me for the world to happen.",
  },
];
