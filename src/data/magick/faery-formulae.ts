// Faery Shamanism, the Formulae Codex
// Every named formula, journey, altar-working, and charm from the source
// teaching material, kept whole and in its full working order. Nothing here
// is condensed into a one-line summary, each entry carries every stage as
// it was given.

export type FormulaCategory =
  | "Basic Training"
  | "Contact & Journey"
  | "Ancestral Work"
  | "Land & Protection"
  | "Charms & Invocations";

export type Formula = {
  slug: string;
  name: string;
  category: FormulaCategory;
  epithet: string; // one-line orientation, not a substitute for the steps
  context: string; // paragraph of framing / lore behind the formula
  steps: string[]; // the full, undiluted sequence, nothing dropped
  notes?: string[]; // additional lore, cautions, or variants
};

export const faeryFormulae: Formula[] = [
  // ───────────────────────── Basic Training ─────────────────────────
  {
    slug: "faery-fire",
    name: "Faery Fire",
    category: "Basic Training",
    epithet: "The Wraith-Force, the living blue flame hidden within matter",
    context:
      "Faery Fire is the first and most fundamental formula in this training, and every later working assumes it. It is visualised as the same electric blue as a bright gas flame: the actual hidden light within matter itself, the Wraith-Force that Faery tradition holds to underlie the physical world.",
    steps: [
      "Imagine you can see into the energetic blueprint of the matter that surrounds you, the room, the objects in it, your own body.",
      "Imagine diving into the empty spaces between the molecules that make up the objects and things around you.",
      "In these empty spaces, begin to perceive an electric blue flame.",
      "Feel and sense this Fyre fill the objects, the air, and all around you.",
      "Inhale for a count of eight, pulling in this Blue Faery Fire.",
      "Hold for a count of eight, and see this fire blaze fiercely within.",
      "Exhale for a count of eight, and move this fire into your very cells, molecules, atoms, and the spaces between.",
      "Hold the breath outside the body for a count of eight, and see and feel yourself humming and buzzing with power.",
    ],
    notes: [
      "This is a foundational, repeatable formula. Every one of the later Formulae for Inner Contact begins by calling Faery Fire first.",
    ],
  },
  {
    slug: "rising-light-below",
    name: "Rising Light Below",
    category: "Basic Training",
    epithet: "Spread, melt, and root, drawing power up through four levels",
    context:
      "Where Faery Fire fills the space around and within you, Rising Light Below establishes your own rootedness in the Earth as the source the power is drawn from, level by level, before it is ever sent outward.",
    steps: [
      "Spread, melt, and root: feel your own edges soften and your weight sink downward.",
      "Send roots down to deep within the Earth.",
      "Wrap the roots around a central orb of power, sensed far below.",
      "Increase your awareness of this sphere until it is vivid and steady.",
      "Draw energy from this sphere up through four levels, four elements, and four colours, correspondingly: Feet, Earth, Green. Genitals, Water, Moon, Blue. Heart, Fire, Sun, Red. Throat, Air, Stars, Yellow.",
      "As the energy reaches each level in turn, raise the hands to that level.",
      "Once all four levels have been filled and the hands have risen to the throat, reverse the power, sending it back down through all four levels to the sphere below.",
    ],
  },
  {
    slug: "seven-directions",
    name: "Attunement to the Seven Directions",
    category: "Basic Training",
    epithet: "Anchoring, turning to face each power in turn, compass in hand",
    context:
      "This formula anchors the walker at the centre of a living compass, in which Above and Below stand as fully weighted directions alongside the four cardinal points, Above is the Sky-Father current, Below is the Faery and Goddess current.",
    steps: [
      "Take up a compass, and turn to face East. Feel, sense, and contemplate: Yellow, Air, Spring, Mind and Intellect.",
      "Turn to face South. Feel, sense, and contemplate: Red, Fire, Summer, Passion and Energy.",
      "Turn to face West. Feel, sense, and contemplate: Blue, Water, Autumn (Fall), Emotions.",
      "Turn to face North. Feel, sense, and contemplate: Black, Earth, Winter, Intuitive and Ancestral Wisdom.",
      "Turn your attention Above. Feel, sense, and contemplate: White Star-Fyre, Sun, Moon, and Stars, Heaven and Sky, God.",
      "Turn your attention Below. Feel, sense, and contemplate: Electric-Blue Faery Flame, the Underworld, the Goddess.",
      "Return to stillness at the centre, now anchored between all seven directions at once.",
    ],
  },
  {
    slug: "three-suns",
    name: "Alignment of the Three Suns",
    category: "Basic Training",
    epithet: "Above, below, and at the centre of your being, one column of light",
    context:
      "The Three Suns formula establishes the vertical axis of the working body: sky, underworld, and the self, aligned as one continuous column of light rather than three separate points.",
    steps: [
      "Visualise a sun above you.",
      "Visualise a sun below you.",
      "Visualise a sun at the centre of your being.",
      "Feel all three suns burning brightly, each with its own distinct quality.",
      "Imagine them connected by a single beam of light running through you.",
      "Bring all three suns together at your heart.",
      "Expand the light outward from your heart to fill the entire room.",
    ],
  },
  {
    slug: "dreamweaving",
    name: "DreamWeaving (The Great Weaving)",
    category: "Basic Training",
    epithet: "The deep dark at the root of your being, identical to, not separate from, yourself",
    context:
      "DreamWeaving is the formula that dissolves the felt boundary between self and land. It does not ask you to imagine a connection with Nature, it asks you to recognise a connection that Faery tradition holds was never actually absent.",
    steps: [
      "Drop down to the \"roots\" of your own being.",
      "Sense, feel, and recognise that something deep and dark is making your heart beat, your breath breathe, beneath any conscious effort of your own.",
      "Recognise this place as identical to, and not separate from, yourself.",
      "From this place of rootedness, reach out and sense your relationship with the root-powers of air, of the rivers and seas, with the Earth and the sky.",
      "Sense the kinship between soil and flesh, between wind and breath, between blood and water.",
      "Feel and sense that this same deep darkness lies at the heart of all Nature.",
      "Enter the Great Weaving: a deeply felt sense of the interrelationship of yourself and all natural things, held as fact rather than metaphor.",
    ],
  },
  {
    slug: "raising-green-mist",
    name: "Raising the Green Mist",
    category: "Basic Training",
    epithet: "The breath of the Guardian, filling the working space with Magick",
    context:
      "The Green Mist is called at the close of the basic training sequence and at the opening of every deeper contact and journey. It is the formula that makes a space workable, and it must always be lowered again at the close of the working.",
    steps: [
      "Plunge your senses deep within the land beneath and around you.",
      "Feel the presence of the Green Mist: the breath of the Guardian of the place.",
      "Raise the Green Mist, letting it fill the whole area with Magick.",
      "Join your hands above the head, then lower them slowly to the heart, drawing the Mist down with them.",
      "To close: raise the joined hands above the head once more, and lower the Green Mist back down into the land, returning the space to ordinary stillness.",
    ],
    notes: [
      "Raising and lowering the Green Mist are a matched pair, never raise it without also lowering it before ending a working.",
    ],
  },

  // ───────────────────────── Contact & Journey ─────────────────────────
  {
    slug: "formulae-for-inner-contact",
    name: "Formulae for Inner Contact",
    category: "Contact & Journey",
    epithet: "The full opening-and-closing sequence for any deeper contact work",
    context:
      "This is the master sequence: every journey and every contact in this course opens and closes with this same order of formulae. Learn this order until it needs no thought.",
    steps: [
      "Faery Fire.",
      "Rising Light.",
      "Seven Directions.",
      "Three Suns.",
      "DreamWeaving.",
      "Raising the Green Mist.",
      ",  The visualisation, journey, or contact itself happens here , ",
      "Lower the Green Mist.",
      "Ground.",
    ],
    notes: [
      "\"All formulae to the Green Mist\", the phrase used throughout this material for this exact six-step opening, means: run this full sequence before beginning the visualisation proper.",
    ],
  },
  {
    slug: "visionary-magick-tips",
    name: "Visionary Magick: Working Guidelines",
    category: "Contact & Journey",
    epithet: "How to hold the visualisation once you are inside it",
    context:
      "These are not optional stylistic preferences. They are the working conditions that make visionary contact reliable rather than a strained act of imagination.",
    steps: [
      "Don't try too hard, you already have this ability.",
      "Relax.",
      "Trust what you perceive.",
      "Bring all the images fully to life, vivid and moving.",
      "Utilise all your senses. Make it vivid and bright.",
      "Allow trance to develop in its own time.",
      "Don't worry about shifts, or gaps, in the imagery.",
      "Don't force imagery that isn't arising.",
      "Stay on the path, so the wolves don't bite.",
      "If challenged or in doubt, speak: \"I come in the name of the Queen!\"",
    ],
  },
  {
    slug: "basic-journey",
    name: "The Basic Journey, Five Stages",
    category: "Contact & Journey",
    epithet: "The skeleton every journey in this course is built on",
    context:
      "Whatever the specific journey, Dark Goddess, Animal Power, Divine Ancestor, or Faery Halls, it moves through these same five stages. Learn the skeleton, then hang each journey's own imagery on it.",
    steps: [
      "Visualising a means of entry, for example, a door.",
      "Passing within, for example, a flight of steps leading down.",
      "Travelling through the Underworld, for example, emerging into a land within the Earth.",
      "Encountering places and people, for example, travelling to pre-defined locations.",
      "Returning, retracing your steps exactly, then closing: dissolving the visualisation and grounding.",
    ],
  },
  {
    slug: "means-of-entry",
    name: "Means of Entry",
    category: "Contact & Journey",
    epithet: "Eleven traditional doors into the Otherworld",
    context:
      "Any of these may serve as the first stage of the Basic Journey. Choose one and work with it consistently rather than switching between them at random, the body and the imagination both learn a door with repetition.",
    steps: [
      "A simple round opening in the ground.",
      "A moss door, an oak door, a metal door.",
      "An ivy- and rose-covered well.",
      "The Moon Bridge.",
      "The Crystal Dream-Boat.",
      "The Door of Flame.",
      "The Upside-Down Tree.",
      "Envision an apple rolling up from the Underworld, follow it back down.",
      "A faery ring that falls into Faeryland as you step into it.",
      "Circle a faery mound nine times, then call \"Open, door, open\" three times.",
      "Call to the seven sacred doves of the Goddess, which come from the seven directions to take you to Elfhame.",
    ],
  },
  {
    slug: "journey-one-dark-goddess",
    name: "Journey One: The Dark Goddess",
    category: "Contact & Journey",
    epithet: "The deepest crossing, pool, presence, offering, and the twin serpents",
    context:
      "This is the first of the four full journeys, and the deepest. It descends directly to the Dark Goddess herself and should not be undertaken casually or without the full opening formulae in place.",
    steps: [
      "Run all formulae to the Green Mist.",
      "Visualise a circular closed door in the floor.",
      "Open the door with intention.",
      "See a steeply descending stairway to your right, cut from natural rock.",
      "On the left is a red, black, and white rope, hung on brass fittings.",
      "Pass through an arch with overhanging light.",
      "Enter a cave, chamber, or hollow within the Earth.",
      "The vision of the pool.",
      "The presence of the Goddess.",
      "Offering and exchange.",
      "Communion with the Light, or with the Goddess herself.",
      "The vision of the twin serpents.",
      "Return the way you came, retracing every stage.",
      "Lower the Green Mist. Ground.",
    ],
  },
  {
    slug: "journey-two-animal-power",
    name: "Journey Two: Down the Roots of the Enchanted Tree, to the Animal Power",
    category: "Contact & Journey",
    epithet: "Well, roots, and the finding of an Animal Power",
    context:
      "This journey descends through the root-system of a tree rather than through a door, a different entry into the same underworld territory, oriented toward meeting an Animal Power rather than the Goddess directly.",
    steps: [
      "Run all formulae to the Green Mist.",
      "Visualise a well, and the roots that surround and descend beneath it.",
      "Climb down the tree below the well.",
      "Find an Animal Power waiting among the roots.",
      "Return to the surface world, retracing your path.",
      "Lower the Green Mist. Ground.",
    ],
  },
  {
    slug: "journey-three-divine-ancestor",
    name: "Journey Three: The Divine Ancestor",
    category: "Contact & Journey",
    epithet: "Burial mound, river of blood, the island of bones",
    context:
      "This journey opens contact with the Divine Ancestor, the elevated ancestral figure who stands behind the individual dead of your own line, reached through a landscape of bone and blood rather than growth and green.",
    steps: [
      "Run all formulae to the Green Mist.",
      "Visualise a burial mound.",
      "Enter within it.",
      "A dry, arid landscape opens before you.",
      "The river of blood.",
      "The island of bones.",
      "The Divine Ancestor appears.",
      "The boat of flesh.",
      "Return, retracing every stage.",
      "Lower the Green Mist. Ground.",
    ],
  },
  {
    slug: "journey-four-faery-halls",
    name: "Journey Four: Faery Halls and Faery Allies",
    category: "Contact & Journey",
    epithet: "Three doors deep, moss, oak, and metal, to the King and Queen",
    context:
      "This is the fullest contact journey in the course: a passage through three successive doors into the Faery Hall itself, culminating in an audience with the King and Queen and the offer of an ally and a gift. It should only be undertaken once the Basic Journey and at least one of the other three journeys are familiar territory.",
    steps: [
      "Run all formulae to the Green Mist.",
      "See a faery mound rising ahead of you.",
      "Discover the first door: the moss door.",
      "Tunnel onward to the second door: the oak door.",
      "Tunnel onward to the third door: the metal door.",
      "Enter the Faery Hall beyond the third door.",
      "Meet the King and Queen of the Hall.",
      "Choose an ally from among those present.",
      "Receive a gift, offered freely, take only what is offered.",
      "Retrace your steps through all three doors, in reverse: metal, then oak, then moss.",
      "Lower the Green Mist. Ground.",
    ],
    notes: [
      "The three doors are passed in the same order both ways, moss, oak, metal going in; metal, oak, moss coming home. Never leave a door unclosed behind you.",
    ],
  },
  {
    slug: "breaking-contact",
    name: "Breaking Contact",
    category: "Contact & Journey",
    epithet: "The iron knife and the closing circle, for an unwanted presence",
    context:
      "Kept for the occasions when a contact needs to be firmly and cleanly ended. This is a banishing formula, not a punitive one: its aim is a clear space.",
    steps: [
      "Visualise the unwanted contact clearly in front of you.",
      "Take up an iron knife (real or visualised) and point it at the being.",
      "Move the knife from north to east to south to west and back to north, tracing a full circle around the being.",
      "Visualise the contact getting smaller and smaller as the knife circles.",
      "Just before the knife reaches north again, the contact is reduced to a tiny speck.",
      "As you complete the circle back at north, the space is completely clear.",
    ],
  },
  {
    slug: "genius-loci",
    name: "Contacting the Genius Loci",
    category: "Contact & Journey",
    epithet: "The presiding spirit of a particular place",
    context:
      "Where the four journeys reach toward Faery, the Ancestors, and the Dark Goddess in the Underworld proper, this formula is used to contact the presiding spirit of a specific place in the ordinary world, a house, a grove, a piece of land you intend to work with or live on.",
    steps: [
      "Come to stillness.",
      "Align the three souls / three suns.",
      "Attune to the seven (or four) directions.",
      "Extend your awareness to the Otherworld.",
      "Sit at the centre of the place, holding that centre.",
      "The hosting: offer welcome, as if hosting a guest.",
      "A being appears, the Genius Loci of the place.",
      "Communicate with it, and ask permission to pass within, or to work with the place.",
      "Offer a gift.",
      "Give thanks, and close.",
    ],
  },

  // ───────────────────────── Ancestral Work ─────────────────────────
  {
    slug: "ancestral-altars",
    name: "Building an Ancestral Altar",
    category: "Ancestral Work",
    epithet: "White cloth, candle, water, food without salt",
    context:
      "Ancestors are held to be the closest spirits to the living, and the easiest class of spirit to work with, they form the first level of Initiation in the Underworld Tradition, and the altar is the ongoing point of contact with them.",
    steps: [
      "Build the altar on a Monday.",
      "Lay a white tablecloth, marked with a + or an X.",
      "Set a white candle upon it.",
      "Set out fresh water.",
      "Set out incense.",
      "Set out food and drink without salt.",
      "Set out tobacco.",
      "Place images of your ancestors on the altar.",
      "Pray, sing, drum, dance, talk, laugh, and commune at the altar as ongoing practice. This is a living relationship.",
    ],
    notes: [
      "\"You will be an ancestor one day. The ancestors want to help and be of service, but they need energy to do so, shamanic tradition holds that you are here, in part, to redeem your ancestors. The ancestors, and the ancestral realm, mediate deeper contact within the Underworld: they are the go-betweens.\"",
    ],
  },
  {
    slug: "ancestral-soul-pots",
    name: "Ancestral Soul Pots",
    category: "Ancestral Work",
    epithet: "Grave soil, rum, and a sealed vessel tended every Monday",
    context:
      "A soul pot is a physical vessel built to house and honour a specific ancestor's presence, made with soil gathered from their own grave and their explicit permission, sought first through meditation.",
    steps: [
      "Find an earthenware pot with a lid.",
      "At the grave of your ancestors, knock three times and ask Ghede to let you in.",
      "When you get an affirmative response, go to the grave of your ancestor.",
      "Ask your ancestor, in meditation, whether they are happy for you to take dirt from their grave for this purpose.",
      "When you get an affirmative reply, dig out a small well at the level you estimate their heart to be.",
      "Fill the hole with rum.",
      "Take soil from different ancestors in this way, until the pot is semi-full.",
      "Seal the pot with wax.",
      "Every Monday, make offerings at the pot and ask for help.",
      "Dispose of used offerings after twenty-four hours, at a crossroads.",
    ],
  },

  // ───────────────────────── Land & Protection ─────────────────────────
  {
    slug: "faery-altars-offerings",
    name: "Faery Altars and Offerings",
    category: "Land & Protection",
    epithet: "Traditionally placed to the north, in the northern hemisphere",
    context:
      "Where the ancestral altar faces the Beloved Dead, the Faery altar faces the Fae directly, and carries its own traditional tools, candles, and offerings.",
    steps: [
      "Place the altar in the north (in the northern hemisphere).",
      "Tools: wand, blade, chalice, mirror, cauldron, black-handled knife, or, more simply: a candle, a feather, a bowl of water, a bowl of salt, and an incense burner with incense.",
      "Light three candles: red and white for the Divine Twins, and black for the Star Goddess.",
      "Offerings: honey cake, milk, wine, flour, flowers, nuts, seeds, berries, shiny pretty stones, and fresh water.",
    ],
  },
  {
    slug: "protect-a-field",
    name: "To Protect a Field, Forest, Meadow, or Plot",
    category: "Land & Protection",
    epithet: "Buried pot, perimeter offerings, and the fourfold stamp",
    context:
      "A full land-protection working, moving from a buried charged vessel at the centre (or corners) out to the perimeter and back to the centre again.",
    steps: [
      "Collect soil, leaves, plants, and seeds from the place itself.",
      "Place them in an earthenware pot.",
      "Fill the pot with honey, a pinch of salt, and three Thunder Crosses.",
      "Seal the pot with wax.",
      "Bury it: at the centre of the land if using a single pot, or at the four corners if using four.",
      "Go around the perimeter, burying milk- and honey-soaked slivers of oak or hazel wood as you go.",
      "Return to the centre.",
      "Stamp your foot three times, in each of the four directions in turn.",
    ],
  },
  {
    slug: "thunder-crosses",
    name: "How to Make Thunder Crosses",
    category: "Land & Protection",
    epithet: "Oak twigs, red thread soaked in rue and vervain, bound and charged",
    context:
      "The Thunder Cross is the standard warding object of this tradition, used both on its own above a doorway and buried in threes as part of the field-protection working.",
    steps: [
      "At dawn, on a Thursday, approach a strong oak tree.",
      "Pour milk, honey, and wine generously around its base as an offering.",
      "Ask the tree for a selection of thin but strong twigs.",
      "Wrap the twigs in white cloth to carry home.",
      "Soak red thread in an infusion of rue and vervain.",
      "Tie the sticks together into crosses using the soaked thread.",
      "Place the finished crosses on a triangle of flour to charge.",
      "Hold your triangled hands over them and speak the charge-words.",
    ],
  },
  {
    slug: "land-wight-generation",
    name: "Generation of a Powerful Land Wight",
    category: "Land & Protection",
    epithet: "A working carried out over more than thirty years",
    context:
      "This is the longest and most patient working in the entire course, the deliberate, decades-long raising of a powerful land wight, one stone added at a time on the great feast days. It is included in full because a condensed version would misrepresent both its scale and its seriousness.",
    steps: [
      "In a hidden place that will not be disturbed, and where the energies of the land are strong, gather nine perfect stones.",
      "Draw three trickle roads in pure water, and a triangle of flour covering them, at the centre of the working site.",
      "Place the nine stones on top of the triangle, forming a flattish surface.",
      "Place a cup of milk, flour, and honey on top of the stones.",
      "Light a candle or a small fire.",
      "Trace a circle around the whole cairn.",
      "Strike the ground three times in each cardinal direction, beginning in the south.",
      "The next day, pour the offering out between the rocks.",
      "Add one further stone on each of the three great feast days, of the Bull, April 21st; of the Virgin, August 21st; of the Goat, December 21st, continuing until one hundred and eight stones have been added, over roughly thirty years.",
    ],
    notes: [
      "This is not a metaphorical timeline. The working is understood to unfold across a human lifetime of tending, in step with the same three feast days, year after year.",
    ],
  },

  // ───────────────────────── Charms & Invocations ─────────────────────────
  {
    slug: "charm-field-peace",
    name: "Charm for a Field or Meadow (Peace)",
    category: "Charms & Invocations",
    epithet: "\"A charm of mighty providence is buried in these roots so deep\"",
    context:
      "One of three traditional charm-poems used in land protection and blessing work. Speak it whole, as given, when a working calls for it, do not paraphrase it.",
    steps: [
      "In this field or meadow, Peace,",
      "Where Nature finds its calm release,",
      "A charm of mighty providence",
      "Is buried in these roots so deep.",
      "People of Peace, who watch and ward,",
      "Forbid here harmful turn of chance",
      "And every evil circumstance;",
      "Keep guard, sweet ladies, with unseen eyes,",
      "Till this ground be harmed",
      "And thy fires rise",
      "To act upon those so unwise.",
      "Hoo'im-lei-an. Ara-oo-an.",
      "Huat, huat, huat.",
      "Nona decima morta.",
    ],
  },
  {
    slug: "charm-earth-sky",
    name: "Charm of Great Mother Earth and Father Sky",
    category: "Charms & Invocations",
    epithet: "\"Thunder below, lightning above\"",
    context:
      "A shorter warding charm invoking Earth and Sky together against anyone who would approach the crossed oak with harmful intent, traditionally spoken while charging or placing Thunder Crosses.",
    steps: [
      "Great Mother Earth and Father Sky,",
      "Thunder below, lightning above,",
      "Never crashed and roared so hard",
      "As they would, should those mean harm",
      "Who approach these crossed woods and potent threads.",
      "Hear all: that fire awaits the wicked one",
      "Who would confront these holy shards of oak.",
    ],
  },
  {
    slug: "charm-meadow-hearken",
    name: "Charm: Listen Well, Thou Meadow",
    category: "Charms & Invocations",
    epithet: "In the name of the Faery Rede, the Wild Hunt, the Faery Queen",
    context:
      "The longest of the three charms, invoking the field's own wards, the plough blade, the scarecrow, the unseen marching hare, and calling explicitly on the Faery Rede, the Wild Hunt, and the Faery Queen for renewal and protection.",
    steps: [
      "Listen well, thou meadow, hearken,",
      "Ye of ancient field, of moss and bracken,",
      "All signs thereof of Wyrdling deep,",
      "The tears that Nature weeps.",
      "Wards of plough blade and scarecrow,",
      "Unseen marching hare, and he who walks the furrow,",
      "Protecting acres from depths below,",
      "Hearken ye, in Earth's good name; listen well, and hearken.",
      "In the name of the Faery Rede, the Wild Hunt,",
      "In the name of the Faery Queen,",
      "Take this milk, flour, honey,",
      "From these piled stones, and meal, and water;",
      "Be thou renewed, and strongly soothed,",
      "And fly renewed to thy task at hand.",
      "From land so fair, let all depart;",
      "Let no harm here make a single mark.",
      "From the land so fair, let grist appear,",
      "And forbid such harm; let none appear.",
    ],
  },
];

export const formulaBySlug = (slug: string) => faeryFormulae.find((f) => f.slug === slug);

export const formulaCategories: FormulaCategory[] = [
  "Basic Training",
  "Contact & Journey",
  "Ancestral Work",
  "Land & Protection",
  "Charms & Invocations",
];
