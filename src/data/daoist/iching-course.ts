// The I Ching course, chapter content. Written in the interpretive
// register of Stephen Karcher and Benebell Wen, oracular, image-first,
// non-moralizing, and explicitly not in the Wilhelm/Baynes-via-Jung
// psychological-Confucian voice. The I Ching is treated here as a living
// oracle and a Daoist-shamanic technology of divination, not a self-help
// text or a museum piece.

export type IChingChapter = {
  slug: string;
  n: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  widget?:
    | "trigram-explorer"
    | "bagua-arrangement"
    | "hexagram-builder"
    | "yarrow-walkthrough"
    | "coin-divination"
    | "hexagram-atlas";
  practice: { steps: { title: string; detail: string; seconds?: number }[] };
  quiz: { q: string; options: string[]; answer: number; explain: string }[];
  journalPrompts: string[];
};

export const ichingChapters: IChingChapter[] = [
  {
    slug: "about-the-i-ching",
    n: "I",
    title: "About the I Ching",
    subtitle: "The Book of Changes as a living oracle",
    intro:
      "The Yijing, the Classic of Changes, is one of the oldest continuously consulted oracles on earth, older than its own commentaries, older than the philosophical schools that later claimed it. Before it was a philosophy book, it was a technology: a way of putting a real question to the pattern of the moment and receiving a real, image-based answer. That is the register this course works in.",
    sections: [
      {
        heading: "An oracle before it was a text",
        body: "Long before the layered commentaries of the Ten Wings, the Yijing existed as a divination practice, cracking heated bone and turtle shell to read the pattern of a crack, later refined into the casting of yarrow stalks and, later still, coins. The 64 hexagrams are the vocabulary of this older, oracular language: each one a snapshot of a moment's actual configuration of yin and yang.",
      },
      {
        heading: "Two very different lineages of reading it",
        body: "In the twentieth century, the Yijing reached the West largely through Richard Wilhelm's translation, filtered further through Carl Jung's psychological framing, synchronicity, archetype, the wise old man giving moral counsel. That reading is not wrong, but it is one reading, and it leans heavily on a Confucian layer of virtue and correct hierarchy that was added centuries after the oracle's oldest layer. This course follows instead the line of scholars and diviners, Stephen Karcher and Benebell Wen chief among them, who read the Yijing as a shamanic, image-based, oracular technology: something closer to what it actually was for the diviners who first cracked shell and split stalks, a spirit-technology for consulting the pattern of Heaven, Earth, and the ancestors directly.",
      },
      {
        heading: "What 'change' actually means here",
        body: "Yi, change, does not mean chaos or randomness. It means the intelligible, cyclical transformation of yin into yang and yang into yin, the way winter becomes spring, the way a held breath becomes an exhale. The Yijing maps the 64 recognizable configurations this transformation can take, and gives each one an image, a judgment, and six lines describing how that configuration itself continues to move. To consult it is to ask: what is the actual shape of this moment, and which way is it already turning?",
      },
      {
        heading: "How this course will use it",
        body: "You will learn the eight trigrams that are the oracle's basic alphabet, the two classical arrangements of those trigrams (Pre-Heaven and Post-Heaven), the 64 hexagrams built from them, how a hexagram's lines can move and turn it into a second, resulting hexagram, and finally the two classical methods of consultation, the yarrow stalks and the coin toss, the second of which you will be able to actually perform, right here, with a built-in casting tool that saves your readings.",
      },
    ],
    widget: undefined,
    practice: {
      steps: [
        { title: "Settle", detail: "Sit and let the breath find its own natural rhythm, no counting, no shaping it.", seconds: 45 },
        { title: "Bring a real question to mind", detail: "Not yes/no, not a test question, a genuine open question about a real situation you are actually inside.", seconds: 60 },
        { title: "Notice what you already assume", detail: "Before consulting anything, notice what answer you already expect, and set it aside without arguing with it.", seconds: 45 },
        { title: "Sit with not-knowing", detail: "Stay a moment longer in genuine uncertainty before moving to the next chapter, this is the actual ground the oracle speaks from.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "What predates the Yijing's philosophical commentaries?",
        options: ["Nothing, the philosophy came first", "An oracular divination practice, cracking bone and shell", "A purely literary tradition", "A Buddhist meditation manual"],
        answer: 1,
        explain: "Divination by cracked bone and shell, later yarrow stalks, is older than the Ten Wings commentaries layered on top of it.",
      },
      {
        q: "Which interpretive lineage does this course deliberately follow?",
        options: ["Wilhelm/Jung's psychological-Confucian frame", "Karcher/Wen's image-based, oracular, Daoist-shamanic frame", "A purely academic linguistic frame", "A Western tarot-derived frame"],
        answer: 1,
        explain: "This course favors the oracular, image-first, non-moralizing register of Karcher and Benebell Wen over the psychological/Confucian filter most Western readers received via Wilhelm and Jung.",
      },
      {
        q: "What does 'Yi', change, refer to in the Yijing?",
        options: ["Random chaos with no pattern", "The intelligible, cyclical transformation of yin into yang and back", "A single historical event", "The changing of dynasties only"],
        answer: 1,
        explain: "Change here means the recognizable, cyclical movement of yin and yang into each other, the pattern the 64 hexagrams map.",
      },
    ],
    journalPrompts: [
      "What is your own prior experience, if any, with the I Ching, and what do you actually expect from it?",
      "Where did your existing picture of this oracle come from, and does it lean psychological, philosophical, or genuinely oracular?",
      "Name one real, open question in your life right now that you would actually want to bring to this oracle by the end of the course.",
    ],
  },

  {
    slug: "the-eight-trigrams",
    n: "II",
    title: "The Eight Trigrams",
    subtitle: "Bagua, the oracle's basic alphabet",
    intro:
      "Every hexagram is built from two trigrams, three-line figures stacked one above the other. The eight trigrams are the actual vocabulary of the whole system, each one an image drawn directly from nature, Heaven, Earth, Thunder, Water, Mountain, Wind, Fire, Lake, and each one carries a family position, a direction, a body part, and a temperament. Learn these eight well and the 64 hexagrams stop being 64 things to memorize and become 8 things combined 8 ways.",
    sections: [
      {
        heading: "Reading a trigram bottom to top",
        body: "A trigram's three lines are read, and were originally cast, from the bottom up: the bottom line is drawn first, the top line last. A solid line is yang, a broken line is yin. This bottom-to-top order matters later, when you cast an actual hexagram, since the first coin toss becomes the foundation the rest of the figure is built on.",
      },
      {
        heading: "The family of trigrams",
        body: "Qian, Heaven, pure yang, and Kun, Earth, pure yin, are the father and mother, the two trigrams from which the other six are generated. The other six are their children: Zhen (Thunder, eldest son), Kan (Water, middle son), Gen (Mountain, youngest son), Xun (Wind, eldest daughter), Li (Fire, middle daughter), and Dui (Lake, youngest daughter). Each child trigram carries exactly one line different from a pure parent, the position of that single different line is what actually determines their role and temperament.",
      },
      {
        heading: "Trigrams are not moods, they are dynamics",
        body: "It is tempting to read Qian as simply 'strong' and Kun as simply 'soft'. Better to read them as dynamics: Qian is the dynamic of unopposed initiation, Kun is the dynamic of total capacity to receive. Zhen is the dynamic of the startling jolt, Kan is the dynamic of moving through real danger rather than around it, Gen is the dynamic of the boundary that holds, Xun is the dynamic of gradual, penetrating influence, Li is the dynamic of dependent, revealing brightness, Dui is the dynamic of open exchange. Use the Trigram Explorer below to sit with each one directly.",
      },
    ],
    widget: "trigram-explorer",
    practice: {
      steps: [
        { title: "Trace a trigram", detail: "Pick one trigram and trace its three lines in the air with a finger, bottom to top, feeling the yin/yang sequence as a real gesture.", seconds: 45 },
        { title: "Feel its dynamic in the body", detail: "Where in your own body does this trigram's dynamic actually live right now, in the belly, the jaw, the feet?", seconds: 60 },
        { title: "Find its opposite", detail: "Locate the trigram whose lines are the exact inverse (yin for yang, yang for yin), and feel the difference between the two dynamics.", seconds: 60 },
        { title: "Name the family", detail: "Say out loud which family member each of the eight trigrams represents, father, mother, three sons, three daughters.", seconds: 45 },
      ],
    },
    quiz: [
      {
        q: "In which direction is a trigram's line sequence read and originally cast?",
        options: ["Top to bottom", "Bottom to top", "Left to right", "It has no fixed order"],
        answer: 1,
        explain: "The bottom line is drawn/cast first, the top line last, matching how a real casting builds a figure upward.",
      },
      {
        q: "Which two trigrams are the 'parents' that generate the other six?",
        options: ["Zhen and Xun", "Kan and Li", "Qian and Kun", "Gen and Dui"],
        answer: 2,
        explain: "Qian (pure yang, Heaven, Father) and Kun (pure yin, Earth, Mother) generate the six child trigrams.",
      },
      {
        q: "Which trigram carries the dynamic of moving through real danger rather than around it?",
        options: ["Gen, Mountain", "Kan, Water", "Dui, Lake", "Li, Fire"],
        answer: 1,
        explain: "Kan, the doubled hexagram of which is The Abysmal, is water in a gorge, a current that keeps moving through its own danger.",
      },
    ],
    journalPrompts: [
      "Which trigram's dynamic do you recognize most in your own teaching or ceremonial work right now?",
      "Which trigram's dynamic do you resist or avoid, and what would it mean to actually work with it instead?",
      "Pick one trigram as a companion for the coming week's practice, and note why you chose it.",
    ],
  },

  {
    slug: "pre-heaven-and-post-heaven",
    n: "III",
    title: "Pre-Heaven and Post-Heaven Arrangements",
    subtitle: "Fuxi's cosmic order and King Wen's living cycle",
    intro:
      "The eight trigrams can be arranged around a circle in two entirely different, both traditional, sequences. The Pre-Heaven (Xiantian) arrangement, attributed to the legendary sage-king Fuxi, is the arrangement of pure structural principle, opposite trigrams sit directly across from each other. The Post-Heaven (Houtian) arrangement, attributed to King Wen, is the arrangement of actual function and cycle, how energy really moves through the seasons and the compass in the manifest world. Knowing both, and the real difference between them, is essential to reading this oracle with any depth.",
    sections: [
      {
        heading: "Fuxi's Pre-Heaven bagua: the blueprint",
        body: "In the Pre-Heaven arrangement, Qian (Heaven) sits at the top (south, in the traditional Chinese compass orientation) and Kun (Earth) directly opposite at the bottom (north), with Li (Fire) and Kan (Water) at east and west, and the remaining four trigrams paired by exact structural opposition across the circle. This is the arrangement of the cosmos as pure, unmoving principle, before time, before the seasons, before anything actually happens. It describes what is.",
      },
      {
        heading: "King Wen's Post-Heaven bagua: the working cycle",
        body: "In the Post-Heaven arrangement, the trigrams are repositioned to map onto the Luo Shu magic square and the actual cycle of the seasons: Li (Fire) at the south for the height of summer, Kan (Water) at the north for the depth of winter, Zhen (Thunder) at the east for spring's first stirring, Dui (Lake) at the west for autumn's harvest. This is the arrangement of function, how energy genuinely moves and transforms through real time, and it is the arrangement used for Feng Shui, for seasonal practice, and for reading how a situation is actually, presently unfolding.",
      },
      {
        heading: "Why the difference actually matters",
        body: "Pre-Heaven gives you the structure beneath a situation, its unmoving, cosmic bones. Post-Heaven gives you the situation as it is actually moving right now, in real time and season. A skilled reading of a hexagram often uses both: what does this configuration mean in principle (Pre-Heaven), and what is it actually doing, this week, this season, in the world (Post-Heaven)? Use the Bagua Arrangement widget below to toggle between the two and feel the real difference in each trigram's position.",
      },
    ],
    widget: "bagua-arrangement",
    practice: {
      steps: [
        { title: "Face the Pre-Heaven pole", detail: "Orient yourself, even loosely, toward where Qian sits in the Pre-Heaven arrangement, and feel it as pure, unmoving origin.", seconds: 45 },
        { title: "Turn to the Post-Heaven pole", detail: "Now orient toward where Li sits in the Post-Heaven arrangement (south, the height of the day), and feel it as active, present function.", seconds: 45 },
        { title: "Trace this season's trigram", detail: "Using the Post-Heaven wheel, find the trigram that governs the actual current season, and sit with its dynamic for a full minute.", seconds: 60 },
        { title: "Hold both maps at once", detail: "See if you can feel the unmoving Pre-Heaven structure and the moving Post-Heaven cycle as two layers of the very same present moment.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "The Pre-Heaven (Fuxi) arrangement is best described as the arrangement of...",
        options: ["The actual seasonal cycle", "Pure, unmoving cosmic structure and principle", "Modern Feng Shui practice only", "Random trigram placement"],
        answer: 1,
        explain: "Pre-Heaven places opposite trigrams directly across from each other, describing structural principle before any actual movement or time.",
      },
      {
        q: "The Post-Heaven (King Wen) arrangement maps the trigrams onto...",
        options: ["A straight line", "The Luo Shu magic square and the real cycle of the seasons", "A random shuffle each year", "Only the northern hemisphere's winter"],
        answer: 1,
        explain: "Post-Heaven follows the Luo Shu number square and matches each trigram to its actual seasonal and directional function.",
      },
      {
        q: "Which trigram sits at the south in the Post-Heaven arrangement?",
        options: ["Kan, Water", "Li, Fire", "Gen, Mountain", "Xun, Wind"],
        answer: 1,
        explain: "Li, Fire, governs the south and the height of summer in the Post-Heaven, functional arrangement.",
      },
    ],
    journalPrompts: [
      "Where in your own teaching do you already distinguish structural principle from actual seasonal function, without having named it this way before?",
      "What does your current season (by the Post-Heaven wheel) actually feel like in your body and your practice right now?",
      "If your life's deepest structure is Pre-Heaven, and your present unfolding is Post-Heaven, what tension or harmony do you notice between the two right now?",
    ],
  },

  {
    slug: "the-64-hexagrams",
    n: "IV",
    title: "The 64 Hexagrams",
    subtitle: "Every possible configuration of trigram upon trigram",
    intro:
      "Stack any one of the eight trigrams above any other (including itself) and you get one of 64 possible six-line figures, a hexagram. The King Wen sequence, the traditional 1-64 ordering used in almost every printed edition, is itself an ancient structure, not something this course invented, though the interpretive voice describing each hexagram here is original. This chapter is your first real pass through the whole atlas.",
    sections: [
      {
        heading: "Upper and lower trigram, inner and outer situation",
        body: "Every hexagram has a lower trigram (lines 1-3, the situation as it actually is, close to you, the ground you stand on) and an upper trigram (lines 4-6, the situation as it is developing, moving outward, toward others or toward the future). Reading a hexagram as 'upper trigram over lower trigram', Water over Fire, Thunder over Earth, and so on, is the fastest way to actually remember what it means without rote memorization of all 64 names.",
      },
      {
        heading: "Judgment and image, two different kinds of guidance",
        body: "Each hexagram carries a judgment (a direct oracular statement about the overall situation, success or difficulty, what furthers and what does not) and an image (a short, poetic description of the natural scene the trigram-pair evokes, paired with how a person of real character responds to that scene). The judgment tells you what the moment is. The image tells you how to actually stand inside it.",
      },
      {
        heading: "Using the Hexagram Atlas as a real reference",
        body: "You do not need to memorize all 64 entries before moving on. Use the Hexagram Atlas below the way a diviner actually uses it: browse it now to get a feel for the range and voice of the whole system, then return to it again and again, once you are actually casting real hexagrams in the later chapters, as your working reference.",
      },
    ],
    widget: "hexagram-atlas",
    practice: {
      steps: [
        { title: "Browse without a question", detail: "Open the atlas and read five hexagrams at random, purely to get a feel for the range of images and tones present.", seconds: 90 },
        { title: "Find your own trigram pair", detail: "Pick the trigram you feel most identified with right now, and the trigram you feel your current situation most needs, and find that exact hexagram.", seconds: 60 },
        { title: "Read judgment before image", detail: "For that hexagram, read the judgment first, sit with it, then read the image, and notice how the two layers actually differ.", seconds: 60 },
        { title: "Let one line stand out", detail: "Read all six lines of that same hexagram, and notice which single line, even unprompted, catches your attention the most.", seconds: 45 },
      ],
    },
    quiz: [
      {
        q: "In a hexagram, what does the lower trigram (lines 1-3) generally represent?",
        options: ["A random, meaningless half", "The situation as it currently, actually stands, close at hand", "Only the distant future", "The reader's own name"],
        answer: 1,
        explain: "The lower trigram is the ground of the present situation, the ongoing developing movement is read in the upper trigram above it.",
      },
      {
        q: "What is the practical difference between a hexagram's judgment and its image?",
        options: ["There is no real difference", "The judgment states the situation directly, the image shows how to stand inside it through a natural scene", "The image is only decorative", "The judgment is always about money"],
        answer: 1,
        explain: "The judgment is the oracular verdict on the moment, the image is the poetic, natural scene and corresponding right conduct.",
      },
      {
        q: "How many total hexagrams exist, given 8 trigrams stacked in every combination (including on themselves)?",
        options: ["16", "32", "64", "128"],
        answer: 2,
        explain: "8 upper trigrams times 8 lower trigrams gives the traditional 64 hexagrams.",
      },
    ],
    journalPrompts: [
      "Which hexagram, on first browse, did you feel most drawn to, and why do you think that is?",
      "Which hexagram's image made you genuinely uncomfortable, and what might that discomfort actually be pointing at?",
      "Note the trigram pair (upper/lower) of the hexagram you feel most describes your school and your work right now.",
    ],
  },

  {
    slug: "moving-lines-and-changing-hexagrams",
    n: "V",
    title: "Moving Lines and Changing Hexagrams",
    subtitle: "How a single cast hexagram becomes two",
    intro:
      "A cast hexagram is never fully static. Each of its six lines is cast not simply as yin or yang, but as one of four possible values, young yin, young yang (stable), or old yin, old yang (moving, about to turn into their opposite). A hexagram with moving lines is genuinely mid-transformation, already becoming a second, resulting hexagram, and reading both together, the situation as it is and the situation it is turning into, is where this oracle's real depth lives.",
    sections: [
      {
        heading: "The four line values",
        body: "Traditionally numbered 6, 7, 8, 9: a 6 is old yin (drawn as broken, but changing, about to become solid), a 7 is young yang (solid, stable, not changing), an 8 is young yin (broken, stable, not changing), and a 9 is old yang (solid, but changing, about to become broken). Only the old lines, 6 and 9, actually move. A hexagram cast entirely of 7s and 8s is simply itself, with nothing yet in transformation.",
      },
      {
        heading: "Reading the changing lines",
        body: "Each of the 64 hexagrams' six lines carries its own individual text, and it is specifically the changing lines, the 6s and 9s, whose texts you read closely in a real consultation. A line's text describes the particular, textured way that position within the larger situation is right now turning into its opposite. Multiple changing lines in one casting are read together as a related cluster of movement.",
      },
      {
        heading: "The resulting hexagram",
        body: "Once you flip every changing line to its opposite value (old yin becomes young yang, old yang becomes young yin) and leave the stable lines untouched, you get a second hexagram, the resulting or 'transformed' hexagram. This resulting figure describes where the situation is actually heading, the destination implied by the movement already underway in the changing lines. Read the primary hexagram as the present configuration, the changing lines as the particular quality of its motion, and the resulting hexagram as the shape that motion is heading toward.",
      },
      {
        heading: "No changing lines, and six changing lines",
        body: "A hexagram cast with no changing lines at all is read purely through its own judgment and image, a genuinely static, settled situation, nothing yet in motion. A hexagram with all six lines changing is a special, complete transformation, traditionally read through the resulting hexagram's judgment rather than through six individual line texts, since the entire figure is turning at once, in the two purest hexagrams, Qian and Kun, an even more specific line applies (the 'all nines' or 'all sixes' text some editions carry, reflecting total, complete transformation).",
      },
    ],
    widget: "hexagram-builder",
    practice: {
      steps: [
        { title: "Build one hexagram by hand", detail: "Using the Hexagram Builder below, click through six lines, choosing values freely, and watch which hexagram resolves.", seconds: 90 },
        { title: "Mark it as changing", detail: "Mark two of the six lines as changing (old), and observe the second, resulting hexagram that appears alongside the first.", seconds: 60 },
        { title: "Read the arc", detail: "Read the primary hexagram's judgment, then the two changing lines' texts, then the resulting hexagram's judgment, as one continuous arc.", seconds: 90 },
        { title: "Try all six changing", detail: "Set all six lines to changing, and notice how the reading shifts to the resulting hexagram's judgment as a whole.", seconds: 45 },
      ],
    },
    quiz: [
      {
        q: "Which line values are actually 'moving' or 'changing'?",
        options: ["7 and 8", "6 and 9", "Only 9", "All four move equally"],
        answer: 1,
        explain: "6 (old yin) and 9 (old yang) are the moving lines, about to flip into their opposite, 7 (young yang) and 8 (young yin) are stable.",
      },
      {
        q: "What does the resulting (transformed) hexagram represent?",
        options: ["A completely unrelated hexagram picked at random", "The direction the situation is turning toward, once the changing lines flip", "The reader's zodiac sign", "It is only used in the coin method, never yarrow"],
        answer: 1,
        explain: "Flipping every changing line to its opposite value, and leaving stable lines as they are, produces the resulting hexagram, the situation's actual destination.",
      },
      {
        q: "How is a hexagram with zero changing lines read?",
        options: ["It cannot be read at all", "Through its own judgment and image alone, as a settled, static situation", "Only through the resulting hexagram", "It always means bad fortune"],
        answer: 1,
        explain: "No changing lines means nothing is currently in motion, the hexagram is read simply and directly, on its own terms.",
      },
    ],
    journalPrompts: [
      "Think of a real situation in your own life right now that feels 'static', with nothing moving, and one that feels actively 'in transformation'. What is the actual difference in how each one feels?",
      "If your current teaching work were a hexagram with two changing lines, which two areas of it do you sense are actually already turning into something else?",
      "What would it mean, practically, to read your own life's 'resulting hexagram', the shape things seem to be heading toward, honestly, right now?",
    ],
  },

  {
    slug: "methods-of-consultation",
    n: "VI",
    title: "Methods of Consultation",
    subtitle: "The yarrow stalks, the three coins, and casting your own reading",
    intro:
      "Two classical methods exist for actually casting a hexagram, the ancient yarrow stalk method, and the later, faster three-coin method most people use today. They are not interchangeable in a purely mechanical sense, they produce real, different probability distributions for how often old (changing) lines appear, a genuine, known distinction worth understanding rather than glossing over. This final chapter walks both methods clearly, and gives you a real, working divination tool to cast and save your own readings.",
    sections: [
      {
        heading: "The yarrow stalk method: slow, and differently weighted",
        body: "The traditional method uses forty-nine yarrow stalks (one of an original fifty set aside, unused, representing the unmanifest source), divided, counted off in groups of four, and reduced through several rounds of division per line, a genuinely slow, deliberate, almost meditative process, each of the six lines taking several minutes of real counting. Because of the specific mathematics of this division process, the yarrow method produces old yin (6) roughly 1 time in 16, young yang (7) roughly 5 times in 16, young yin (8) roughly 7 times in 16, and old yang (9) roughly 3 times in 16, a distribution genuinely weighted differently than the coin method below. This slowness is not incidental, the diviner's whole attention is occupied by the counting itself for the entire casting.",
      },
      {
        heading: "The three-coin method: fast, and differently weighted again",
        body: "The later, widely used shortcut assigns each of three coins a value (commonly tails = 2, heads = 3) and sums all three per toss: three tails gives 6 (old yin), two tails and one head gives 7 (young yang), one tail and two heads gives 8 (young yin), three heads gives 9 (old yang). Tossed six times, once per line, bottom to top. This produces old yin and old yang each roughly 1 time in 8, and young yin and young yang each roughly 3 times in 8, a real, different, more evenly split distribution of moving lines than the yarrow method above, meaning the two methods genuinely feel different in how often real change shows up in a casting.",
      },
      {
        heading: "Preparing a real question",
        body: "Before casting, in either method, take real time to actually word the question. A vague question gets a vague answer, a genuinely specific, honestly-held question, framed around a real situation rather than a demand for a yes or no, gets a reading with real, usable texture. That is simply how an oracular image-language works: the sharper the question, the more precisely the image can actually land.",
      },
      {
        heading: "Using the coin divination tool",
        body: "The tool below lets you cast a real, working three-coin reading: it tosses three virtual coins six times, resolves the primary hexagram, any changing lines, and the resulting hexagram if there is one, and saves the full reading, with your own question and any note you add, to your own private reading log on this device, so you can return to past castings and watch how they actually played out over time.",
      },
    ],
    widget: "coin-divination",
    practice: {
      steps: [
        { title: "Word a real question", detail: "Take real time, write out one honest, open, specific question you actually want to bring to this casting.", seconds: 90 },
        { title: "Cast your reading", detail: "Use the divination tool below to actually toss the coins six times and see your primary and resulting hexagrams.", seconds: 90 },
        { title: "Read slowly", detail: "Read the judgment and image of the primary hexagram first, then each changing line in order, then the resulting hexagram if present.", seconds: 120 },
        { title: "Save it with a note", detail: "Add a short honest note about what actually struck you, and save the reading to your own log for later review.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "Roughly how often does the yarrow stalk method produce an old yang (9) line, compared to the coin method?",
        options: ["Exactly the same rate as coins", "Roughly 3 in 16 with yarrow versus roughly 1 in 8 with coins, genuinely different distributions", "Yarrow never produces old yang", "Coins never produce old yang"],
        answer: 1,
        explain: "The two methods are not mechanically interchangeable, yarrow gives roughly 3/16 for old yang, coins give roughly 1/8 (2/16), a real, if modest, difference worth knowing.",
      },
      {
        q: "In the common three-coin convention used here, what does three tails (all 2s) sum to?",
        options: ["9, old yang", "6, old yin", "7, young yang", "8, young yin"],
        answer: 1,
        explain: "Tails = 2 each, three tails sums to 6, old yin, a changing line about to become yang.",
      },
      {
        q: "Why does this course emphasize wording a real, specific question before casting?",
        options: ["It's just superstition with no real effect", "A sharper question lets the oracle's image-language land with real, usable precision", "The oracle ignores the question entirely", "Only yes/no questions are valid"],
        answer: 1,
        explain: "The Yijing answers through image, not literal statement, a genuinely specific question gives the image something precise to actually meet.",
      },
    ],
    journalPrompts: [
      "What real question did you actually bring to your first casting, and why that one, right now?",
      "What in the primary hexagram, the changing lines, or the resulting hexagram genuinely surprised you?",
      "Looking back at your reading a day later, has anything in it already started to show itself in your actual life?",
    ],
  },
];
