// Faery Shamanism, course content
// Source: the author's own teaching material, "Faery Shamanism: A One-Day
// Experiential Workshop in the Magick of the Sidhe and the Fae" (Tantraya
// Mystery School). Restructured into the document's own four parts , 
// Lore, Basic Training, Faery Contacts, Faery Magick, with every formula
// kept whole and in its full working order, never condensed into a
// one-line summary. See src/data/magick/faery-formulae.ts for the
// standalone Formulae Codex drawn from the same material.

import type { PracticeVisual, BodyCenter, PracticePhase } from "./egyptian-magick";

export type { PracticeVisual, BodyCenter, PracticePhase };

export type FaeryChapter = {
  slug: string;
  n: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string; image?: string }[];
  widget?:
    | "three-souls"
    | "four-directions"
    | "eight-step-journey"
    | "thunder-cross"
    | "altar-builder"
    | "transition-card";
  practice: {
    intro?: string;
    closingLine?: string;
    steps: {
      title: string;
      detail: string;
      seconds?: number;
      visual?: PracticeVisual;
      center?: BodyCenter;
      phase?: PracticePhase;
    }[];
  };
  quiz: { q: string; options: string[]; answer: number; explain: string }[];
  journalPrompts: string[];
};

export const faeryChapters: FaeryChapter[] = [
  // ═══════════════════════ PART ONE, FAERY LORE ═══════════════════════
  {
    slug: "faery-lore",
    n: "I",
    title: "Faery Lore",
    subtitle: "Tradition, names, the Otherworld, the three souls, and the ballads that encode it",
    intro:
      "Before we journey, we listen. Faery is not a cartoon and it is not a costume. It is a living, cross-cultural tradition of contact with a race of non-corporeal beings deeply attuned to the land and to the Dead. This chapter gathers what the tradition itself says about who the Fae are, where the written record comes from, and the layered cosmology and layered self that the rest of this course assumes you already know.",
    sections: [
      {
        heading: "What Do We Know About Faery?",
        body: "Probably a surprising amount. Our information comes from faery tales, books, and film; from the deep wellspring of the human subconscious; from what Jung called the \"storehouse of images\"; and from ancestral memory and magical memory alike. None of these sources is more \"real\" than the others, they braid together into a single working tradition.",
      },
      {
        heading: "The Faery Tradition",
        body: "Faery is primarily an oral tradition, carried through initiatory ballads and certain older, darker faery tales. Its written record is thinner than the oral current, but it is unbroken, and it matters: Robert Kirk, The Secret Commonwealth of Elves, Fauns and Fairies (1691); Evans Wentz, The Fairy Faith in Celtic Countries (1911); A.E. / George Russell (1853–1919); William Sharp / Fiona Macleod (1855–1905); R.J. Stewart (1949–); Victor Henry Anderson (1917–2001).\n\nOut of this oral and written stream, a perennial inheritance emerges, a set of claims that recur across nearly every culture that has this tradition at all: There is a race of spiritual, non-corporeal Beings that are close to humanity. Like humans, they are varied and many, and vary from country to country and place to place. This race is deeply attuned to and connected with the land, and is associated with the Dead. Human beings can, have, and do communicate with these Beings, and these Beings communicate back. The world of the Fae mirrors the human world to some degree, we share Nature in common. Their dimension is a plane of magic, of Light, and of Transformation.",
      },
      {
        heading: "Misperceptions",
        body: "Faery is popularly imagined as small and cutesy, gossamer-winged, all good and all nice, or as its mirror image: all bad, all evil, to be feared and avoided at all costs. Both pictures are equally partial. The Fae are neither pets nor demons. They are neighbours, with their own laws, their own moods, and their own claims on respect.",
      },
      {
        heading: "Faery Around the World",
        body: "This is not a Celtic peculiarity, every land that has been inhabited long enough seems to have generated its own version of this contact: Ireland, the Aos Sí, the Shee, the Sidhe, the Tuatha Dé Danann, Leprechauns, Elves, and others. Spain / Portugal, the Duende, the Chaneque, the Erking. Wales, the Tylwyth Teg, the Bendith y Mamau. Greece, the Charites, Nymphs, Satyrs. China, the Hui Jing, Mogwai. Malaysia, the Pari-Pari, Peri. Mexico, the Alux, Chaneque. Peru, the Chuachaqi. Nepal, the Ban Jhankri, Yeti. Native North America, the Manitou.",
      },
      {
        heading: "Names, Who Are the Fae?",
        body: "\"Faery\" itself comes down to us from the Greek Fatua and the Roman Fata, meaning \"Fate.\" Different lineages within the tradition answer the question \"who are they?\" in genuinely different ways, and this course does not flatten that difference into a single tidy answer: Nephilim / Fallen Angels. Souls of the Pagan Dead. Devas, Elementals, Nature Spirits. A race of Elder Gods, the Tuatha de Danaan. Celtic Ancestral Spirits. Dakinis. The primal energetic matrix of the Land itself. The \"Elves\" of Norse Mythology. Ourselves, awaiting incarnation.\n\nHold these as genuinely different, competing accounts from genuinely different lineages.",
      },
      {
        heading: "The Underworld, the Otherworld, and the Realms Beneath",
        body: "Nearly every culture that carries this tradition names its own version of the land the Fae dwell in, and the names are worth knowing individually rather than collapsing into a single generic \"Faeryland\": the Otherworld; the Underworld; the Summerland; Tir Andomain (Celtic); Annwvyn (Welsh); the Kingdom of Hel (Teutonic); the Land of Faerie; the Isle of Avalon; Tir Na Nog (Celtic); the Four Cities, Murias, Gorias, Finias, and Falias; Elfhame (Irish / Gaelic); Elfland.",
        image: "/faery/faery-mound.jpg",
      },
      {
        heading: "Three Worlds, Three Souls, Three Walkers",
        body: "This course works with a threefold cosmological map that recurs across shamanic traditions worldwide, and this material aligns Faery's own vocabulary onto it directly:\n\nUpper World, Star World, Transcendent, the Star Walker, whose ally is the Faery Ally, Spiritual work.\nMiddle World, Stone / Green World, Experiential, the Surface Walker, whose ally is the Talker, Elemental work.\nLower World, Sea World, Inner, the Dream Walker, whose ally is the Animal Power, Ancestral / Faery work.\n\nEvery walker carries all three souls and can move as all three Walkers, but most people live almost entirely as the Surface Walker. Faery training is, in large part, the deliberate cultivation of the other two.",
        image: "/faery/three-worlds.jpg",
      },
      {
        heading: "Initiatory Ballads",
        body: "The oral tradition was carried by troubadours and minstrels, and was touched, in its transmission, by the Bogomils, the Cathars, and their heresies. A number of truly magical, truly initiatory ballads survive in English, containing the seeds and remnants of an ancient religion: that of the Dark Goddess. Initiatory lore is encoded within them, including the figure of the Redeemer within the Land, Christ within the Planet, a fusion of Underworld tradition and early Christianity. True Thomas and Tam Lin stand as the two major oral sources of Faery lore.",
      },
      {
        heading: "Thomas the Rhymer",
        body: "Thomas of Ercledoune, 13th century, Lord Learmont. One of the \"Justified Men.\" Recognised as a prophet in his own lifetime. Accurate predictions of his were still being published as late as the 19th century. He gained his visionary power through direct contact with the Underworld. He is possibly the source of the first version of Tristram and Iseult, and was, by more than one account, plagiarized by Shakespeare.",
      },
      {
        heading: "The Ballad of Thomas Rhymer",
        body: "True Thomas lay on a grassy bank, and beheld a lady gay, a lady that was brisk and bold, come riding o'er the ferny brae. Her skirt was of the grass-green silk, her mantle of the velvet fine, and on every lock of her horse's mane hung fifty silver bells, and nine.\n\nTrue Thomas he took off his hat, and bowed low down to his knee: \"All hail, thou Queen of Heaven, for thy like on Earth I ne'er did see.\" \"Oh no, oh no, True Thomas,\" she said, \"that name does not belong to me. I am but the Queen of fair Elfland, that has come for to visit here with thee. And you must go with me now, Thomas, True Thomas, you must go with me. And you must serve me seven years, through good or ill, as chance may be.\"\n\nFor forty days and forty nights they waded through blood red to the knee, and he saw neither sun nor moon, but heard the roaring of the sea. On and further on they rode, until they came to a garden tree. \"Light down, light down, you lady fair, and I'll pull of that fruit for thee.\" \"Oh no, oh no, True Thomas, that fruit may not be touched by thee, for all the plagues that are in hell are upon the fruit of this country. But I have bread here in my lap, likewise red wine, and before we go you may rest and you may dine.\"\n\nWhen he had eaten and drunk his fill, she said, \"lay your head upon my knee, and before we climb yon high hill, I will show you wonders three. Do you see that broad, broad road, that lies by the lily leaven? That is the Road to Wickedness, though some call it the Road to Heaven. And do you see that narrow, narrow road, beset with thorns and briars? That is the way of Righteousness, though after it few enquire. And do you see that bonny, bonny road, which winds about the ferny brae? That is the Road to fair Elfland, and together there you and I will go.\"\n\n\"But Thomas, you must hold your tongue, whatever you may hear or see, for if one word you chance to speak, you will never get back to your own country.\" And he was given a coat of woven cloth, likewise the shoes of velvet green, and till seven years had passed, True Thomas was never on Earth seen.",
      },
      {
        heading: "Ballad Breakdown",
        body: "Read as an initiatory map rather than a simple story, the ballad lays out a sequence every Faery journey still follows: the vision of the Queen of Elfland; the confusion of the Powers (is she the Queen of Heaven, or something else?); the journey through the Underworld; the wading through rivers of blood; the absence of sun and moon, but the sound of the roaring sea; the vision of the tree; the warning concerning the fruit; the giving of wine and bread; the vision of the three roads; the vow of silence; the gifts; and finally, the return.",
      },
      {
        heading: "Protection and Precautions",
        body: "Faery work is real contact with beings who keep their own laws, not a private daydream, and not something to enter carelessly. Hold to a few plain precautions from the outset: never go into a working hungry, exhausted, or in active crisis. Always close what you open, every formula that raises the Green Mist must also lower it, and every journey that opens a door must retrace its steps and close that same door on the way home. Keep your word once given, and be careful what you promise in the Otherworld, the tradition treats a spoken vow there as binding. If a contact ever feels wrong, use Breaking Contact rather than pushing through it. And never treat this material as something you finish once, the vow of silence, the wading through blood, the warning about the fruit: these are recurring conditions of the crossing.",
      },
    ],
    widget: "three-souls",
    practice: {
      intro:
        "Before any deeper contact, the three souls need to be found and heard individually, then aligned so they speak with one voice at the threshold. Find a quiet seat.",
      closingLine:
        "Fetch, Talker, and Watcher now stand aligned on one thread, the working posture every later journey in this course assumes.",
      steps: [
        { title: "Settle", detail: "Sit comfortably, spine easy. Three slow breaths into the belly, letting the outer day fall away.", seconds: 30, phase: "Prepare", visual: "breath" },
        { title: "Greet the Fetch", detail: "Feel your animal body, appetite, tension, restlessness, ease. Name plainly what it wants right now. Do not correct it, just hear it.", seconds: 60, phase: "Invoke", visual: "spiral" },
        { title: "Greet the Talker", detail: "Notice the narrating voice in your head, the one reading these words. Thank it for its work today, and let it quiet without silencing it by force.", seconds: 60, phase: "Invoke", visual: "glyph" },
        { title: "Greet the Watcher", detail: "Sense the witness resting above the crown, the part of you that has watched every version of you without flinching. Rest there a moment.", seconds: 60, phase: "Working", visual: "star", center: "crown" },
        { title: "Align the three on one thread", detail: "Imagine the three souls stacked like beads on a single thread running through your body. Breathe slowly through the whole thread, top to bottom, three times.", seconds: 90, phase: "Integrate", visual: "spine" },
        { title: "Close", detail: "One more full breath. Let the alignment settle without gripping it, you can return to it at will.", seconds: 20, phase: "Close", visual: "seal" },
      ],
    },
    quiz: [
      {
        q: "Which of the three Walkers corresponds to the Middle World and the Talker?",
        options: ["The Star Walker", "The Surface Walker", "The Dream Walker", "The Faery Ally"],
        answer: 1,
        explain: "Middle World / Stone-Green World / Experiential aligns with the Surface Walker, whose ally is the Talker.",
      },
      {
        q: "According to the perennial inheritance named in this chapter, what are the Fae deeply attuned to and connected with?",
        options: ["Only human dreams", "The land, and associated with the Dead", "The stars alone", "Nothing outside their own realm"],
        answer: 1,
        explain: "The tradition holds that this race is deeply attuned to and connected with the land, and associated with the Dead.",
      },
      {
        q: "Who are the two major oral sources of Faery lore named in this chapter?",
        options: ["Robert Kirk and Evans Wentz", "True Thomas and Tam Lin", "A.E. and William Sharp", "Victor Anderson and R.J. Stewart"],
        answer: 1,
        explain: "True Thomas and Tam Lin stand as the two major oral sources of Faery lore, both initiatory ballads.",
      },
      {
        q: "In the Ballad of Thomas Rhymer, what happens if Thomas speaks even one word while in Elfland?",
        options: ["Nothing, speech is unrestricted", "He is instantly returned home", "He will never get back to his own country", "The Queen loses her power"],
        answer: 2,
        explain: "The Queen's condition is explicit: if one word he chances to speak, he will never get back to his own country.",
      },
      {
        q: "What did the word 'Faery' originally come from?",
        options: ["The Old English word for small", "The Greek Fatua and the Roman Fata, meaning 'Fate'", "A Norse word for forest", "A medieval term for illusion"],
        answer: 1,
        explain: "Faery descends from the Greek Fatua and the Roman Fata, meaning 'Fate.'",
      },
    ],
    journalPrompts: [
      "Which of the three souls, Fetch, Talker, or Watcher, feels loudest in you today, and which is quietest?",
      "Of the seven or eight answers to 'who are the Fae' listed in this chapter, which one do you find yourself drawn to, and which do you actively resist? What might that resistance be protecting?",
      "Read the Ballad Breakdown again. Which single stage of that sequence, the wading through blood, the warning about the fruit, the vow of silence, feels most alive or unfinished in your own life right now?",
    ],
  },

  // ═══════════════════════ PART TWO, BASIC TRAINING ═══════════════════════
  {
    slug: "basic-training",
    n: "II",
    title: "Basic Training",
    subtitle: "Faery Fire, Rising Light, the Seven Directions, the Three Suns, DreamWeaving, and the Green Mist",
    intro:
      "Training precedes contact. These six formulae are the energetic exercises that prepare the body and the field before any deeper contact is ever attempted, and every journey in Chapter III opens and closes by running through them in this exact order. They are given here in full, in the order they are meant to be learned, with nothing shortened.",
    sections: [
      {
        heading: "Faery Fire, The Wraith-Force",
        body: "Faery Fire is the living blue flame of Faery, visualised as the same colour as a bright blue gas flame, the hidden light within matter. The formula: imagine you can see into the energetic blueprint of the matter that surrounds you. Imagine diving into the empty spaces between the molecules that make up the objects and things around you. In these empty spaces, begin to perceive an electric blue flame. Feel and sense this Fyre fill the objects, the air, and all around you. Inhale for a count of eight, pulling in this Blue Faery Fire. Hold for a count of eight, and see this fire blaze fiercely within. Exhale for a count of eight, and move this fire into your very cells, molecules, atoms, and the spaces between. Hold the breath outside the body for a count of eight, and see and feel yourself humming and buzzing with power.",
        image: "/faery/faery-fire.jpg",
      },
      {
        heading: "Rising Light Below",
        body: "Spread, melt, and root. Send roots down to deep within the Earth. Wrap the roots around a central orb of power. Increase awareness of this sphere. Draw energy from this sphere up through four levels, four elements, colours, and the Cosmos: Feet, Earth, Green. Genitals, Water, Moon, Blue. Heart, Fire, Sun, Red. Throat, Air, Stars, Yellow. Raise the hands to the appropriate level as the energy reaches it. Then reverse the power, sending it back down through all four levels to the sphere below.",
      },
      {
        heading: "Attunement to the Seven Directions: Anchoring",
        body: "Using a compass, face each direction in turn. Feel, sense, imagine, and contemplate: East, Yellow, Air, Spring, Mind / Intellect. South, Red, Fire, Summer, Passion / Energy. West, Blue, Water, Autumn / Fall, Emotions. North, Black, Earth, Winter, Intuitive / Ancestral Wisdom. Above, White Star-Fyre, Sun, Moon and Stars, Heaven / Sky, God. Below, Electric-Blue Faery Flame, Underworld, Goddess. Return to stillness at the centre, anchored between all seven at once.",
      },
      {
        heading: "Alignment of the Three Suns",
        body: "Visualise a sun above you. Visualise a sun below you. Visualise a sun at the centre of your being. Feel all three suns burning brightly. Imagine them connected by a beam of light. Bring all three suns together at your heart. Expand the light to fill the room.",
        image: "/faery/three-suns.jpg",
      },
      {
        heading: "DreamWeaving",
        body: "Drop down to the \"roots\" of your being. Sense, feel, and recognise that something deep and dark is making your heart beat, your breath breathe. Recognise this place as identical to, and not separate from, yourself. From this place of rootedness, reach out and sense your relationship with the root-powers of air, of the rivers and seas, with the Earth and the sky. Sense the kinship between soil and flesh, between wind and breath, between blood and water. Feel and sense that this same deep darkness lies at the heart of all Nature. Enter the Great Weaving: a deeply felt sense of the interrelationship of yourself and all natural things.",
      },
      {
        heading: "Raising the Green Mist",
        body: "Plunge your senses deep within the land. Feel the presence of the Green Mist, the breath of the Guardian. Raise the Green Mist, filling the area with Magick. Join hands above the head, then lower to the heart. To close any working: raise the joined hands above the head again, and lower the Green Mist back down. Raising and lowering are a matched pair, the Mist is never left standing when a working ends.",
        image: "/faery/green-mist.jpg",
      },
    ],
    widget: "four-directions",
    practice: {
      intro:
        "This is the full training sequence, run in order, exactly as it is meant to be learned: Faery Fire, Rising Light, the Seven Directions, the Three Suns, DreamWeaving, and the raising, then the lowering, of the Green Mist. Do not skip stages even on a day you feel rushed; go slowly the first several times through.",
      closingLine:
        "The Green Mist is lowered, the field is quiet again, and every later formula and journey in this course now has this same sequence underneath it.",
      steps: [
        { title: "See the energetic blueprint", detail: "Imagine you can see into the energetic blueprint of the matter around you, and dive into the empty spaces between molecules.", seconds: 30, phase: "Prepare", visual: "glyph" },
        { title: "Perceive the blue flame", detail: "In those empty spaces, begin to perceive an electric blue flame. Feel and sense this Fyre fill the objects, the air, and all around you.", seconds: 30, phase: "Prepare", visual: "flame" },
        { title: "Inhale the Fyre, count of 8", detail: "Inhale for a count of eight, pulling in this Blue Faery Fire.", seconds: 20, phase: "Prepare", visual: "breath" },
        { title: "Hold and blaze, count of 8", detail: "Hold for a count of eight, and see this fire blaze fiercely within.", seconds: 20, phase: "Prepare", visual: "flame" },
        { title: "Exhale into every cell, count of 8", detail: "Exhale for a count of eight, and move this fire into your very cells, molecules, atoms, and the spaces between.", seconds: 20, phase: "Prepare", visual: "breath" },
        { title: "Hold outside the body, count of 8", detail: "Hold the breath outside the body for a count of eight, and feel yourself humming and buzzing with power. Faery Fire is now called.", seconds: 20, phase: "Prepare", visual: "light" },
        { title: "Spread, melt, and root", detail: "Feel your own edges soften. Send roots down deep into the Earth and wrap them around a central orb of power far below.", seconds: 30, phase: "Invoke", visual: "spiral" },
        { title: "Feet, Earth, Green", detail: "Draw energy up to the feet: Earth, the colour green. Raise your hands to that level.", seconds: 25, phase: "Invoke", center: "base", visual: "spiral" },
        { title: "Genitals, Water, Moon, Blue", detail: "Draw the energy up to the genitals: Water, the Moon, the colour blue. Raise your hands to that level.", seconds: 25, phase: "Invoke", visual: "water" },
        { title: "Heart, Fire, Sun, Red", detail: "Draw the energy up to the heart: Fire, the Sun, the colour red. Raise your hands to that level.", seconds: 25, phase: "Invoke", center: "heart", visual: "flame" },
        { title: "Throat, Air, Stars, Yellow", detail: "Draw the energy up to the throat: Air, the stars, the colour yellow. Raise your hands to that level, then reverse the power back down through all four levels.", seconds: 30, phase: "Invoke", center: "throat", visual: "star" },
        { title: "Face East", detail: "Using a compass if you have one, turn to face East. Feel yellow, air, spring, mind and intellect.", seconds: 25, phase: "Working", visual: "compass" },
        { title: "Face South", detail: "Turn to face South. Feel red, fire, summer, passion and energy.", seconds: 25, phase: "Working", visual: "flame" },
        { title: "Face West", detail: "Turn to face West. Feel blue, water, autumn, emotion.", seconds: 25, phase: "Working", visual: "water" },
        { title: "Face North", detail: "Turn to face North. Feel black, earth, winter, intuitive and ancestral wisdom.", seconds: 25, phase: "Working", visual: "glyph" },
        { title: "Turn to Above", detail: "Bring your attention upward. Feel white star-fire, sun, moon and stars, heaven, sky, God.", seconds: 25, phase: "Working", visual: "star", center: "crown" },
        { title: "Turn to Below", detail: "Bring your attention downward. Feel the electric-blue Faery Flame, the Underworld, the Goddess.", seconds: 25, phase: "Working", visual: "flame" },
        { title: "Three suns, above, below, centre", detail: "Visualise a sun above you, a sun below you, and a sun at the centre of your being. Feel all three burning.", seconds: 40, phase: "Working", visual: "light" },
        { title: "Connect and bring the suns to the heart", detail: "Imagine the three suns joined by a single beam of light, then bring all three together at your heart.", seconds: 30, phase: "Working", center: "heart", visual: "light" },
        { title: "Expand the light", detail: "Let the joined light expand outward from your heart to fill the whole room.", seconds: 30, phase: "Integrate", visual: "light" },
        { title: "Drop to the roots of your being", detail: "Sense the deep, dark something that is already making your heart beat and your breath breathe, beneath any effort of your own.", seconds: 40, phase: "Integrate", visual: "spiral" },
        { title: "Recognise the kinship", detail: "Sense the kinship between soil and flesh, wind and breath, blood and water. This same darkness lies at the root of all Nature.", seconds: 40, phase: "Integrate", visual: "spiral" },
        { title: "Enter the Great Weaving", detail: "Hold this as fact, not metaphor: a deeply felt sense of the interrelationship of yourself and all natural things.", seconds: 40, phase: "Integrate", visual: "spiral" },
        { title: "Raise the Green Mist", detail: "Plunge your senses into the land beneath you. Feel the Green Mist rising, the breath of the Guardian, and let it fill the space with Magick. Join your hands above the head, then lower them to your heart.", seconds: 45, phase: "Integrate", visual: "light" },
        { title: "Lower the Green Mist", detail: "Raise your joined hands above the head once more, then lower the Green Mist back down into the land, returning the space to ordinary stillness.", seconds: 30, phase: "Close", visual: "seal" },
      ],
    },
    quiz: [
      {
        q: "How long is each stage of the Faery Fire breath (inhale, hold, exhale, hold-out)?",
        options: ["A count of four", "A count of eight", "A count of twelve", "There is no fixed count"],
        answer: 1,
        explain: "Each of the four breath stages in Faery Fire is held to a count of eight.",
      },
      {
        q: "In Rising Light Below, which level corresponds to the Heart?",
        options: ["Earth, Green", "Water, Moon, Blue", "Fire, Sun, Red", "Air, Stars, Yellow"],
        answer: 2,
        explain: "Heart, Fire, Sun, Red is the third of the four levels the energy is drawn through.",
      },
      {
        q: "In the Seven Directions formula, what does Below represent?",
        options: ["White Star-Fyre and Heaven", "Electric-Blue Faery Flame, the Underworld, the Goddess", "Black earth and winter", "Nothing, only six directions are used"],
        answer: 1,
        explain: "Below is Electric-Blue Faery Flame, the Underworld, the Goddess, a full seventh direction alongside the four cardinals and Above.",
      },
      {
        q: "What must always accompany the raising of the Green Mist?",
        options: ["Nothing further is needed", "It must eventually be lowered again", "It must be raised twice", "A different formula entirely"],
        answer: 1,
        explain: "Raising and lowering the Green Mist are a matched pair, never leave it raised at the end of a working.",
      },
      {
        q: "DreamWeaving asks you to recognise the deep dark at the root of your being as:",
        options: ["Something to fear and avoid", "Separate from Nature entirely", "Identical to, and not separate from, yourself", "A purely symbolic idea"],
        answer: 2,
        explain: "DreamWeaving's central move is recognising this root-darkness as identical to yourself.",
      },
    ],
    journalPrompts: [
      "Which of the six training formulae came most easily to you, and which resisted? What does that difference tell you about where your attention naturally goes?",
      "Faery Fire asks you to see the electric blue flame hidden within ordinary matter. Where in your daily life might you practice glimpsing that hidden light without formally 'doing a working'?",
      "DreamWeaving says the darkness at your own root is identical to the darkness at the root of all Nature. Where have you felt that kinship most clearly, with soil, water, wind, or something else?",
    ],
  },

  // ═══════════════════════ PART THREE, FAERY CONTACTS ═══════════════════════
  {
    slug: "faery-contacts",
    n: "III",
    title: "Faery Contacts",
    subtitle: "Formulae for inner contact, means of entry, the four full journeys, and the ancestral realm",
    intro:
      "This is the practice chapter, the formulae, journeys, and ancestral workings used to open and close real contact. Every journey below opens and closes with the same six formulae from Chapter II, run \"to the Green Mist,\" and every journey retraces its own steps on the way home. Nothing here is a metaphor for imagination. It is a disciplined technology for crossing and returning.",
    sections: [
      {
        heading: "Formulae for Inner Contact",
        body: "Every deeper contact in this course opens and closes with this same order: Faery Fire. Rising Light. Seven Directions. Three Suns. DreamWeaving. Raising the Green Mist., the visualisation or journey itself happens here, Visualization. Lower the Green Mist. Ground. Learn this order until it needs no thought; every journey below assumes you already know it as \"all formulae to the Green Mist.\"",
      },
      {
        heading: "Visionary Magick Tips",
        body: "Don't try too hard, you already have this ability. Relax. Trust what you perceive. Bring all the images fully to life, vivid and moving. Utilise all your senses. Make it vivid and bright. Allow trance to develop. Don't worry about shifts, or gaps, in imagery. Don't force imagery. Stay on the path, so the wolves don't bite. If challenged or in doubt: \"I come in the name of the Queen!\"",
      },
      {
        heading: "The Basic Journey, Five Stages",
        body: "Every journey below is built on the same five-stage skeleton: visualising a means of entry (a door); passing within (a flight of steps leading down); travelling through the Underworld (emerging into a land within the Earth); encountering places and people (travelling to pre-defined locations); returning (retracing our steps) and closing (dissolving the visualisation and grounding).",
      },
      {
        heading: "Means of Entry",
        body: "Choose one of these and keep to it consistently rather than switching at random: a simple round opening in the ground; a moss door, an oak door, a metal door; an ivy- and rose-covered well; the Moon Bridge; the Crystal Dream-Boat; the Door of Flame; the Upside-Down Tree; an apple rolling up from the Underworld, followed back; a faery ring that falls into Faeryland as you step into it; circling a faery mound nine times, then calling \"Open, door, open\" three times; calling to the seven sacred doves of the Goddess, which come from the seven directions to take you to Elfhame.",
        image: "/faery/means-of-entry.jpg",
      },
      {
        heading: "Journey One: The Dark Goddess",
        body: "All formulae to the Green Mist. Visualise a circular closed door in the floor. Open the door with intention. See a steeply descending stairway to your right, cut from natural rock. On the left is a red, black, and white rope on brass fittings. Pass through an arch with overhanging light. Enter a cave, chamber, or hollow within the Earth. The vision of the pool. The presence of the Goddess. Offering and exchange. Communion with the Light, or the Goddess. The twin serpents. Return the way you came.",
      },
      {
        heading: "Journey Two: Down the Roots of the Enchanted Tree to the Animal Power",
        body: "All formulae to the Green Mist. Visualise a well and its roots. Climb the tree below. Find an Animal Power. Return to the surface world.",
      },
      {
        heading: "Ancestral Lore",
        body: "Found across all shamanic and animistic cultures, as well as in more \"mainstream\" traditions. Your ancestors are the closest spirits to you, and among those with the most vested interest in your happiness and wellbeing. They are the easiest class of spirits to work with, and form the first level of Initiation in the Underworld Tradition.\n\nYou will be an ancestor one day. The ancestors want to help and be of service, but they need energy to do so, and shamanic tradition holds that you are here, in part, to redeem your ancestors. The ancestors, and the ancestral realm, mediate deeper contact within the Underworld: they are the go-betweens.",
      },
      {
        heading: "Journey Three: The Divine Ancestor",
        body: "All formulae to the Green Mist. Visualise a burial mound. Enter within. A dry, arid landscape. The river of blood. The island of bones. The Divine Ancestor. The boat of flesh. Return.",
      },
      {
        heading: "Ancestral Altars and Ancestral Soul Pots",
        body: "Ancestral Altars, build on a Monday; a white tablecloth marked with a + or an X; a white candle; fresh water; incense; food and drink without salt; tobacco; images of your ancestors; pray, sing, drum, dance, talk, laugh, commune.\n\nAncestral Soul Pots, find an earthenware pot with a lid. At the grave of your ancestors, knock three times and ask Ghede to let you in. When you get an affirmative response, go to the grave of your ancestor. Ask your ancestor, in meditation, whether they are happy for you to take dirt from their grave for this purpose. When you get an affirmative reply, dig out a small well at the level you estimate their heart to be. Fill the hole with rum. Take soil from different ancestors until the pot is semi-full. Seal with wax. Every Monday, make offerings and ask for help. Dispose of the offerings after twenty-four hours, at the crossroads.",
        image: "/faery/ancestral-altar.jpg",
      },
      {
        heading: "Journey Four: Faery Halls and Faery Allies",
        body: "All formulae to the Green Mist. See a faery mound. Discover the moss door. Tunnel to the oak door. Tunnel to the metal door. Enter the Faery Hall. Meet the King and Queen. Choose an ally. Receive a gift. Retrace the doors home.",
        image: "/faery/faery-halls.jpg",
      },
      {
        heading: "Breaking Contact",
        body: "Visualise the unwanted contact. Take an iron knife and point it at the being. Move the knife from north to east to south to west to north, around the being. Visualise the contact getting smaller and smaller. Just before reaching north again, it is a tiny speck. As you complete the circle, the space is completely clear.",
      },
      {
        heading: "Contacting the Genius Loci",
        body: "Stillness. Align the three souls / three suns. The seven (or four) directions. Extend to the Otherworld. You sit at the centre. The hosting. A being appears: the Genius Loci. Communicate. Ask permission to pass within. Offer a gift. Give thanks.",
      },
    ],
    widget: "eight-step-journey",
    practice: {
      intro:
        "This working carries you through Journey Four in full: three doors, moss, oak, metal, into the Faery Hall itself, to meet the King and Queen, choose an ally, and receive a gift. Run the full training sequence from Chapter II first in your own time; this practice recaps it briefly, then goes on into the Hall.",
      closingLine:
        "All three doors are closed behind you again, metal, then oak, then moss, the Green Mist is lowered, and you are grounded, carrying whatever gift and ally you were given.",
      steps: [
        { title: "Formulae to the Green Mist", detail: "Run Faery Fire, Rising Light, the Seven Directions, the Three Suns, and DreamWeaving in brief, then raise the Green Mist to open the working.", seconds: 90, phase: "Prepare", visual: "light" },
        { title: "See the faery mound", detail: "A mound rises ahead of you in the land. Let its shape and texture become vivid and specific, grass, stone, the quality of the light around it.", seconds: 40, phase: "Invoke", visual: "gate" },
        { title: "The moss door", detail: "Discover the first door, soft with moss. Open it and step through.", seconds: 40, phase: "Invoke", visual: "gate" },
        { title: "The oak door", detail: "Tunnel onward until you reach the second door, made of solid oak. Open it and step through.", seconds: 40, phase: "Invoke", visual: "gate" },
        { title: "The metal door", detail: "Tunnel onward again to the third door, cold and metal. Open it and step through into the Faery Hall itself.", seconds: 40, phase: "Working", visual: "gate" },
        { title: "Meet the King and Queen", detail: "Stand in the Hall and let the King and Queen become present before you. Greet them as neighbours.", seconds: 60, phase: "Working", visual: "light" },
        { title: "Choose an ally", detail: "From among those present in the Hall, sense which one is offering itself as an ally. Do not force a choice. Let it arrive.", seconds: 60, phase: "Working", visual: "spiral" },
        { title: "Receive a gift", detail: "A gift is offered. Take only what is freely given, and notice exactly what it is and how it feels to hold it.", seconds: 45, phase: "Integrate", visual: "light" },
        { title: "Retrace: metal door", detail: "Bow to the Hall, and retrace your steps back through the metal door, closing it behind you.", seconds: 30, phase: "Integrate", visual: "gate" },
        { title: "Retrace: oak door", detail: "Continue back through the oak door, closing it behind you.", seconds: 30, phase: "Integrate", visual: "gate" },
        { title: "Retrace: moss door", detail: "Continue back through the moss door, closing it behind you, and see the faery mound again from outside.", seconds: 30, phase: "Integrate", visual: "gate" },
        { title: "Lower the Green Mist", detail: "Raise your joined hands above the head, then lower the Green Mist back into the land.", seconds: 30, phase: "Close", visual: "seal" },
        { title: "Ground", detail: "Feel your full weight in your seat or your feet on the floor. Open your eyes when ready.", seconds: 30, phase: "Close", visual: "breath" },
      ],
    },
    quiz: [
      {
        q: "What are the five stages of the Basic Journey?",
        options: [
          "Ground, cast, call, cross, return",
          "Means of entry, passing within, travelling through the Underworld, encountering places and people, returning and closing",
          "Faery Fire, Rising Light, Three Suns, DreamWeaving, Green Mist",
          "Invoke, work, integrate, close, ground",
        ],
        answer: 1,
        explain: "The Basic Journey's five stages are entry, passing within, travelling, encountering, and returning/closing.",
      },
      {
        q: "In Journey Four, what are the three doors, in order, going in?",
        options: ["Oak, metal, moss", "Metal, moss, oak", "Moss, oak, metal", "Stone, iron, glass"],
        answer: 2,
        explain: "The three doors are passed moss, then oak, then metal going in, and retraced metal, oak, moss coming home.",
      },
      {
        q: "In Breaking Contact, from which direction does the iron knife begin its circle?",
        options: ["East", "South", "North", "West"],
        answer: 2,
        explain: "The knife moves from north to east to south to west and back to north.",
      },
      {
        q: "What must you get before taking soil from an ancestor's grave for a Soul Pot?",
        options: [
          "Nothing, soil may be taken freely",
          "Permission from the local council",
          "An affirmative reply from the ancestor, sought in meditation",
          "A blessing from a priest",
        ],
        answer: 2,
        explain: "You ask your ancestor, in meditation, whether they are happy for you to take dirt from their grave, and wait for an affirmative reply.",
      },
      {
        q: "What is offered first in the Contacting the Genius Loci sequence, before the being appears?",
        options: ["A gift", "The hosting, offering welcome, as if to a guest", "A vow of silence", "An iron knife"],
        answer: 1,
        explain: "The hosting comes before the being appears, you offer welcome first, then a being appears as the Genius Loci.",
      },
    ],
    journalPrompts: [
      "Which of the four full journeys, the Dark Goddess, the Animal Power, the Divine Ancestor, or the Faery Halls, do you feel most called to attempt first, and why?",
      "Choose your means of entry now, in writing, and commit to keeping it for the next forty days rather than switching between doors.",
      "If you needed Breaking Contact today, what specifically would you be closing the door on?",
    ],
  },

  // ═══════════════════════ PART FOUR, FAERY MAGICK ═══════════════════════
  {
    slug: "faery-magick",
    n: "IV",
    title: "Faery Magick",
    subtitle: "Altars, offerings, protecting the land, Thunder Crosses, and raising a land wight",
    intro:
      "Faery Magick is reciprocal. You do not take from the land without giving, and you do not bind a wight without first asking. This chapter moves from the personal altar outward to the full protection of a piece of land, and ends with the longest working in this entire course, a raising that unfolds not in an afternoon, but across decades.",
    sections: [
      {
        heading: "Faery Altars and Offerings",
        body: "Traditionally placed in the north, in the northern hemisphere. Tools: wand, blade, chalice, mirror, cauldron, black-handled knife, or, more simply: a candle, a feather, a bowl of water, a bowl of salt, and an incense burner with incense. Three candles: red and white for the Divine Twins, and black for the Star Goddess. Offerings: honey cake, milk, wine, flour, flowers, nuts, seeds, berries, shiny pretty stones, fresh water.",
        image: "/faery/faery-altar-offerings.jpg",
      },
      {
        heading: "To Protect a Field, Forest, Meadow, or Plot",
        body: "Collect soil, leaves, plants, and seeds from the place. Place them in an earthenware pot. Fill with honey, a pinch of salt, and three Thunder Crosses. Seal with wax. Bury it, at the centre if using a single pot, or at the corners if using four. Go around the perimeter, burying milk- and honey-soaked slivers of oak or hazel wood. Go to the centre. Stamp your foot three times, in each of the four directions.",
      },
      {
        heading: "How to Make Thunder Crosses",
        body: "At dawn, on a Thursday, approach a strong oak tree. Pour milk, honey, and wine generously around its base. Ask for a selection of thin but strong twigs. Wrap them in white cloth to carry home. Soak red thread in an infusion of rue and vervain. Tie the sticks in crosses. Place them on a triangle of flour to charge. Hold your triangled hands over them and speak the words.",
      },
      {
        heading: "Generation of a Powerful Land Wight",
        body: "A working carried out over more than thirty years, to give birth to a powerful land wight. In a hidden place that will not be disturbed, where the energies of the land are strong, gather nine perfect stones. Draw three trickle roads in pure water, and a triangle of flour covering them, at the centre. Place the nine stones on top of the triangle, forming a flattish surface. Place a cup of milk, flour, and honey on top. Light a candle or fire. Trace a circle around the cairn. Strike the ground three times in each cardinal direction, beginning in the south. The next day, pour the offering between the rocks. Add one stone on each feast day: of the Bull, April 21st; of the Virgin, August 21st; of the Goat, December 21st; until one hundred and eight stones have been added, over roughly thirty years. This is a real timeline, not a metaphor, the working is understood to unfold across a human lifetime of tending.",
      },
      {
        heading: "The Old Charms",
        body: "Three charm-poems belong to this working and are spoken whole, never paraphrased, when a land-protection formula calls for them: the charm for a field or meadow, beginning \"In this field or meadow, Peace\"; the charm of Great Mother Earth and Father Sky, beginning \"Great Mother Earth and Father Sky\"; and the longer charm invoking the Faery Rede, the Wild Hunt, and the Faery Queen, beginning \"Listen well, thou meadow, hearken.\" The full text of all three is kept in the Formulae Codex below.",
      },
    ],
    widget: "thunder-cross",
    practice: {
      intro:
        "This working combines Protecting a Field with the making of Thunder Crosses to bury within it, run at a real piece of land you have permission to work with, however small.",
      closingLine:
        "The pot is sealed and buried, the perimeter is walked, and the land now carries three charged Thunder Crosses at its heart.",
      steps: [
        { title: "Gather from the land itself", detail: "Collect soil, leaves, plants, and seeds from the place you intend to protect.", seconds: 60, phase: "Prepare", visual: "spiral" },
        { title: "Approach the oak, at dawn on a Thursday", detail: "Approach a strong oak tree and pour milk, honey, and wine generously around its base as an offering.", seconds: 60, phase: "Prepare", visual: "water" },
        { title: "Ask for twigs and carry them home", detail: "Ask the tree for a selection of thin but strong twigs, and wrap them in white cloth to carry home.", seconds: 40, phase: "Prepare", visual: "spiral" },
        { title: "Soak the red thread", detail: "Soak red thread in an infusion of rue and vervain.", seconds: 30, phase: "Prepare", visual: "water" },
        { title: "Bind three Thunder Crosses", detail: "Tie the sticks into crosses using the soaked thread. Make three.", seconds: 90, phase: "Working", visual: "glyph" },
        { title: "Charge the crosses", detail: "Place the crosses on a triangle of flour. Hold your triangled hands over them and speak aloud what they are to refuse and what they are to welcome.", seconds: 60, phase: "Working", visual: "flame" },
        { title: "Fill the pot", detail: "Place the collected soil, leaves, plants, and seeds into an earthenware pot with honey, a pinch of salt, and the three charged Thunder Crosses. Seal with wax.", seconds: 60, phase: "Working", visual: "seal" },
        { title: "Bury the pot", detail: "Bury the pot at the centre of the land, or at the corners if you have made four.", seconds: 45, phase: "Integrate", visual: "spiral" },
        { title: "Walk the perimeter", detail: "Go around the full perimeter of the land, burying milk- and honey-soaked slivers of oak or hazel wood as you go.", seconds: 90, phase: "Integrate", visual: "spiral" },
        { title: "Stamp the four directions", detail: "Return to the centre. Stamp your foot three times, in each of the four directions in turn.", seconds: 45, phase: "Close", visual: "compass" },
      ],
    },
    quiz: [
      {
        q: "In which direction is a Faery altar traditionally placed, in the northern hemisphere?",
        options: ["East", "South", "West", "North"],
        answer: 3,
        explain: "Faery altars are traditionally placed in the north, in the northern hemisphere.",
      },
      {
        q: "What three colours of candle are used on a Faery altar, and for whom?",
        options: [
          "Green and gold, for the land",
          "Red and white for the Divine Twins, and black for the Star Goddess",
          "Blue and silver, for the Moon",
          "White only, for purity",
        ],
        answer: 1,
        explain: "Red and white candles honour the Divine Twins; the black candle honours the Star Goddess.",
      },
      {
        q: "On what day, and at what time, should Thunder Cross wood be gathered?",
        options: ["Midnight on a full moon", "Dawn on a Thursday", "Noon on a Sunday", "Dusk on a Friday"],
        answer: 1,
        explain: "The tree is approached at dawn, on a Thursday, with an offering poured at its base first.",
      },
      {
        q: "How many stones make up the completed cairn in the Generation of a Powerful Land Wight, and over roughly what timescale?",
        options: [
          "Nine stones, over one year",
          "Forty-two stones, over a decade",
          "One hundred and eight stones, over roughly thirty years",
          "There is no set number",
        ],
        answer: 2,
        explain: "One stone is added on each of the three great feast days per year, until 108 stones have been added, roughly thirty years.",
      },
      {
        q: "What must always accompany taking from the land in Faery Magick?",
        options: [
          "Nothing, the land provides freely",
          "Giving something back, the tradition is explicitly reciprocal",
          "A written contract",
          "Payment in coin only",
        ],
        answer: 1,
        explain: "Faery Magick is reciprocal: you do not take from the land without giving, and you do not bind a wight without asking first.",
      },
    ],
    journalPrompts: [
      "Is there a specific piece of land, a garden, a windowbox, a stretch of path you walk daily, that you feel called to formally protect or bless?",
      "The Land Wight working unfolds over roughly thirty years. What is one working or relationship in your own practice you would be willing to tend that patiently?",
      "Of the three Old Charms, which words land most powerfully for you when spoken aloud? Try speaking all three aloud and notice the difference.",
    ],
  },
];

export const chapterBySlug = (slug: string) => faeryChapters.find((c) => c.slug === slug);
