// The Eight Extraordinary Meridians Qigong, course content
// Source: The-Eight-Extraordinary-Meridians-Qigong.pdf (Tantraya Center)

export type Element = "wood" | "fire" | "earth" | "metal" | "water";

export const elements: Record<
  Element,
  {
    label: string;
    color: string;          // tailwind/utility hex for swatch
    season: string;
    yinOrgan: string;
    yangOrgan: string;
    emotionNeg: string;
    emotionPos: string;
    sound: string;
    sense: string;
    virtue: string;
    spirit: string;
  }
> = {
  wood:  { label: "Wood",  color: "#4f7a4a", season: "Spring",      yinOrgan: "Liver",            yangOrgan: "Gall Bladder",                emotionNeg: "Anger",   emotionPos: "Kindness",       sound: "SHHHHHHH", sense: "Eyes",             virtue: "Kindness",     spirit: "Hun" },
  fire:  { label: "Fire",  color: "#b94a3a", season: "Summer",      yinOrgan: "Heart / Pericardium", yangOrgan: "Small Intestine / Triple Heater", emotionNeg: "Anxiety", emotionPos: "Joy / Honor",    sound: "HAAAWWW",  sense: "Tongue",           virtue: "Honor & Respect", spirit: "Shen" },
  earth: { label: "Earth", color: "#c9a84c", season: "Late Summer", yinOrgan: "Spleen",           yangOrgan: "Stomach",                     emotionNeg: "Worry",   emotionPos: "Sympathy / Fairness", sound: "WHHOOOO", sense: "Mouth cavity",     virtue: "Fairness",     spirit: "Yi" },
  metal: { label: "Metal", color: "#d6d3cd", season: "Autumn",      yinOrgan: "Lungs",            yangOrgan: "Large Intestine",             emotionNeg: "Grief",   emotionPos: "Letting Go / Righteousness", sound: "SSSSSSSS", sense: "Nose",      virtue: "Righteousness",spirit: "Po" },
  water: { label: "Water", color: "#345a7a", season: "Winter",      yinOrgan: "Kidneys",          yangOrgan: "Bladder",                     emotionNeg: "Fear",    emotionPos: "Awe / Gentleness", sound: "HOOOOOOO",   sense: "Ears",             virtue: "Gentleness",   spirit: "Zhi" },
};

export const healingSounds = [
  { id: "lungs",    organ: "Lungs",          element: "metal", sound: "SSSSSSSS", color: "Whiteish",   exit: "through the nose" },
  { id: "kidneys",  organ: "Kidneys",        element: "water", sound: "HOOOOOOO", color: "Blue / Black", exit: "through the ears" },
  { id: "liver",    organ: "Liver",          element: "wood",  sound: "SHHHHHHH", color: "Green",      exit: "through the eyes" },
  { id: "heart",    organ: "Heart",          element: "fire",  sound: "HAAAWWW",  color: "Red",        exit: "through the tip of the tongue" },
  { id: "spleen",   organ: "Spleen",         element: "earth", sound: "WHHOOOO",  color: "Yellow",     exit: "through the cavity of the mouth" },
  { id: "triple",   organ: "Triple Heater",  element: "fire",  sound: "HHHEEEE",  color: "Red",        exit: "through the open mouth" },
] as const;

export const eightExtras = [
  { id: "du",       name: "Du Mai",       english: "Governor Channel",   group: "primary",   master: "SI-3 (Hou Xi)",         coupled: "BL-62 (Shen Mai)",   pair: "Yang Qiao Mai", note: "Up the spine, over crown, to upper lip. Sea of all Yang." },
  { id: "ren",      name: "Ren Mai",      english: "Conception Channel", group: "primary",   master: "LU-7 (Lie Que)",        coupled: "KD-6 (Zhao Hai)",    pair: "Yin Qiao Mai",  note: "Up the front midline from perineum to lower lip. Sea of all Yin." },
  { id: "dai",      name: "Dai Mai",      english: "Belt Channel",       group: "primary",   master: "GB-41 (Zu Lin Qi)",     coupled: "TH-5 (Wai Guan)",    pair: "Yang Wei Mai",  note: "The only horizontal channel. Binds the vertical channels at the waist." },
  { id: "chong",    name: "Chong Mai",    english: "Thrusting Channel",  group: "primary",   master: "SP-4 (Gong Sun)",       coupled: "PC-6 (Nei Guan)",    pair: "Yin Wei Mai",   note: "Central vertical axis from perineum to crown. The Sea of Blood." },
  { id: "yangqiao", name: "Yang Qiao Mai",english: "Yang Bridge",        group: "secondary", master: "BL-62 (Shen Mai)",      coupled: "SI-3 (Hou Xi)",      pair: "Du Mai",        note: "Lateral pathway, heel to crown, outer-body Yang dynamics." },
  { id: "yinqiao",  name: "Yin Qiao Mai", english: "Yin Bridge",         group: "secondary", master: "KD-6 (Zhao Hai)",       coupled: "LU-7 (Lie Que)",     pair: "Ren Mai",       note: "Medial pathway, heel to inner eye, inner-body Yin dynamics." },
  { id: "yangwei",  name: "Yang Wei Mai", english: "Yang Linking",       group: "secondary", master: "TH-5 (Wai Guan)",       coupled: "GB-41 (Zu Lin Qi)",  pair: "Dai Mai",       note: "Links and integrates all Yang (outer) channels." },
  { id: "yinwei",   name: "Yin Wei Mai",  english: "Yin Linking",        group: "secondary", master: "PC-6 (Nei Guan)",       coupled: "SP-4 (Gong Sun)",    pair: "Chong Mai",     note: "Links and integrates all Yin (inner) channels." },
] as const;

export type LessonKey =
  | "ba-gua" | "lower-dan-tian" | "inner-smile" | "healing-sounds"
  | "cleansing-emotions" | "five-virtues" | "microcosmic-orbit"
  | "dai-mai" | "chong-mai" | "macrocosmic-orbit" | "master-coupled-points"
  | "heaven-and-earth" | "sexual-qigong";

export interface QuizQ {
  q: string;
  options: string[];
  answer: number;          // index
  explain: string;
}

export interface Lesson {
  slug: LessonKey;
  number: number;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  bullets?: string[];
  practice: {
    label: string;
    steps: { title: string; detail: string; seconds?: number }[];
  };
  /** which interactive widget to render */
  widget?:
    | "ba-gua"
    | "pearl-breath"
    | "five-element-wheel"
    | "healing-sounds"
    | "collection-points"
    | "virtues-wheel"
    | "microcosmic-orbit"
    | "dai-mai-rings"
    | "chong-mai-column"
    | "macrocosmic-orbit"
    | "points-table"
    | "heaven-earth";
  quiz: QuizQ[];
  journalPrompts: string[];
  closing?: string;
}

export const lessons: Lesson[] = [
  {
    slug: "ba-gua",
    number: 1,
    title: "Focus at Your Center",
    subtitle: "Ba Gua / Navel Centering",
    intro:
      "This practice creates a Ba Gua, three concentric octagons, around the navel, first with your fingertip, then with your mind alone. The Ba Gua forms a net at your physical center that collects and stabilizes Qi. The navel is where prenatal Qi first entered through the umbilical cord; it is home base.",
    sections: [
      {
        heading: "Creating the Three Octagons",
        body:
          "Looking down at your navel as a clock-face, draw three concentric 8-sided shapes with a fingertip:\n\n• Outer octagon, 3 in / 7.5 cm from navel, each line ~2.5 in / 6 cm\n• Middle octagon, 2 in / 5 cm from navel, each line ~1.75 in / 4 cm\n• Inner octagon, 1 in / 2.5 cm from navel, each line ~0.75 in / 2 cm\n\nDraw each octagon clockwise, line by line. Then repeat with the mind alone.",
      },
      {
        heading: "Spiralling, Opening and Closing",
        body:
          "Men open by spiralling out clockwise × 9 (navel → pubic bone → sternum), then reverse counter-clockwise × 6 to seal.\n\nWomen open by spiralling out counter-clockwise × 9, then reverse clockwise × 6 to seal.\n\nFinish by placing both palms over the navel. Always close.",
      },
      {
        heading: "Advanced Ba Gua",
        body:
          "Once mastered, condense the rings (1.5 in / 1 in / 0.5 in) and spiral out 36, in 24 for significantly deeper concentration. Build in thirds: 12+12+12 out, 8+8+8 in.",
      },
    ],
    practice: {
      label: "Guided Ba Gua",
      steps: [
        { title: "Sit and settle", detail: "Front edge of chair, feet flat, hands clasped in lap (right over left).", seconds: 30 },
        { title: "Draw the outer octagon", detail: "Trace clockwise, line by line, 3 in / 7.5 cm from the navel.", seconds: 40 },
        { title: "Middle octagon", detail: "2 in / 5 cm from navel.", seconds: 30 },
        { title: "Inner octagon", detail: "1 in / 2.5 cm from navel.", seconds: 25 },
        { title: "Spiral OPEN × 9", detail: "Men clockwise, women counter-clockwise. Slow, deliberate revolutions.", seconds: 90 },
        { title: "Spiral CLOSE × 6", detail: "Reverse direction. Seal with both palms over the navel.", seconds: 60 },
      ],
    },
    widget: "ba-gua",
    quiz: [
      { q: "How many concentric octagons form the Ba Gua at the navel?", options: ["1", "2", "3", "8"], answer: 2, explain: "Three concentric octagons, outer, middle, inner." },
      { q: "Which direction does a woman spiral OUT to open?", options: ["Clockwise", "Counter-clockwise"], answer: 1, explain: "Women open counter-clockwise × 9 and close clockwise × 6." },
      { q: "Why is closing the Ba Gua critical?", options: ["It looks nice", "It seals the Qi and prevents leaking the energy you cultivated", "It changes the spiral colour", "It is optional"], answer: 1, explain: "Always close. Sealing keeps the energy gathered at the navel." },
    ],
    journalPrompts: [
      "After closing, what word, image, or phrase describes the state at your navel?",
      "Where did your attention slip during the spiralling? What pulled it away?",
    ],
    closing: "Return to the Ba Gua any time your energy feels scattered, excessive, or unstable.",
  },

  {
    slug: "lower-dan-tian",
    number: 2,
    title: "Awakening the Lower Dan Tian",
    subtitle: "Jing Cultivation, The Pearl of Golden Light",
    intro:
      "The Lower Dan Tian sits three finger-widths below the navel and three to four finger-widths inside, toward the spine. It is a specific location that can be felt, filled, and directed. It is the seat of Jing, the most primary, dense form of energy in the body.",
    sections: [
      {
        heading: "Place the Mind",
        body: "Sit in standard posture. Close the eyes. Rest your full attention deep in the lower abdomen, in the precise location of the Lower Dan Tian. No forcing, simply hold the mind there and breathe.",
      },
      {
        heading: "Visualise the Pearl",
        body: "Inside the Lower Dan Tian, visualise a small sphere of golden light, warm, luminous, self-contained. Start at the size of a marble. Quality matters more than size.",
      },
      {
        heading: "Breathe with the Pearl",
        body: "Inhale, the Pearl expands, brightens, warms. Exhale, it contracts, condenses, radiates. A gentle pulsing. 9, 18, or 36 breath cycles.",
      },
      {
        heading: "Seal and Gather",
        body: "Place both palms over the lower abdomen (Daoist hand seal, right over left). Hold for several breaths and feel the warmth.",
      },
    ],
    practice: {
      label: "Pearl Breathing",
      steps: [
        { title: "Settle", detail: "Find the Lower Dan Tian with your mind.", seconds: 30 },
        { title: "Form the Pearl", detail: "A warm sphere of golden light, marble-sized.", seconds: 20 },
        { title: "Pulse 9 breaths", detail: "Inhale expand, exhale condense. Follow the on-screen circle.", seconds: 90 },
        { title: "Pulse 18 breaths", detail: "Continue, deeper.", seconds: 180 },
        { title: "Seal", detail: "Both palms over the lower abdomen.", seconds: 45 },
      ],
    },
    widget: "pearl-breath",
    quiz: [
      { q: "Where is the Lower Dan Tian?", options: ["At the navel", "3 finger-widths below the navel, 3–4 inside toward the spine", "At the heart", "At the perineum"], answer: 1, explain: "Below and behind the navel, deep in the lower abdomen." },
      { q: "What expands on the inhale?", options: ["The whole abdomen", "The Pearl of Golden Light", "The crown", "Nothing"], answer: 1, explain: "The Pearl gently expands on the inhale and contracts on the exhale." },
      { q: "Which Treasure does the Lower Dan Tian house?", options: ["Shen", "Qi", "Jing"], answer: 2, explain: "Jing, Essence. The densest, most primary form of energy." },
    ],
    journalPrompts: [
      "Could you feel the Pearl as warmth, light, weight, or something else? Describe it.",
      "How did 9 breaths differ from 18? What changed?",
    ],
  },

  {
    slug: "inner-smile",
    number: 3,
    title: "Smile at Yourself",
    subtitle: "Quiescent Qigong, The Inner Smile",
    intro:
      "Send warm, loving energy to your five Yin organs, Heart, Lungs, Liver, Kidneys, Spleen, releasing tension, calming the emotions, generating deep internal relaxation. Active practice of energy direction through the Five Element system.",
    sections: [
      {
        heading: "Activate the Smile",
        body: "Call up an image that produces a soft, warm smile. Feel warmth at the corners of the mouth, these are Stomach 4 / Earth Granary, meeting points of Du Mai and Ren Mai.",
      },
      {
        heading: "Brow & Tongue",
        body: "Lead the smiling energy to Yin Tang (between the eyebrows). Place the tongue on the roof of the mouth at the spot that 'tingles', this completes the internal circuit.",
      },
      {
        heading: "Smile Into Each Organ",
        body: "Draw the energy from the brow, down through tongue and throat, to each organ in turn, Heart, Lungs, Liver, Kidneys, Spleen. Breathe 3, 6, or 9 times per organ. See each organ's colour, feel its temperature, acknowledge its emotion, silently sound its word.",
      },
      {
        heading: "Gather at the Navel",
        body: "Spiral the energy back to the navel and seal it with both palms. Find a word, image, or phrase that captures this state, your internal key to your Qi.",
      },
    ],
    practice: {
      label: "Five-Organ Inner Smile",
      steps: [
        { title: "Activate the smile", detail: "Warmth at Stomach 4 (corners of the mouth).", seconds: 30 },
        { title: "Heart / Fire", detail: "Red, hot, summer, Joy, Laughing.", seconds: 60 },
        { title: "Lungs / Metal", detail: "White, cool, autumn, Letting Go, Weeping.", seconds: 60 },
        { title: "Liver / Wood", detail: "Green, warm, spring, Power, Shouting.", seconds: 60 },
        { title: "Kidneys / Water", detail: "Blue/black, cold, winter, Awe, Groaning.", seconds: 60 },
        { title: "Spleen / Earth", detail: "Yellow, mild, late summer, Sympathy, Singing.", seconds: 60 },
        { title: "Seal at the navel", detail: "Spiral back, palms over navel.", seconds: 30 },
      ],
    },
    widget: "five-element-wheel",
    quiz: [
      { q: "Which acupuncture points sit at the corners of the mouth?", options: ["LI-20", "ST-4 (Earth Granary)", "GV-26", "CV-24"], answer: 1, explain: "Stomach 4 / Earth Granary, meeting points of Du Mai and Ren Mai." },
      { q: "Which element corresponds to the Liver?", options: ["Wood", "Fire", "Earth"], answer: 0, explain: "Liver, Wood, Spring, green, Hun." },
      { q: "What colour is associated with the Kidneys?", options: ["Red", "Yellow", "Blue / Black"], answer: 2, explain: "Water element, blue/black, cold, winter." },
    ],
    journalPrompts: [
      "Which organ felt most receptive to the smile? Which was hardest to reach?",
      "Capture today's 'key', a word, image or phrase for this state.",
    ],
  },

  {
    slug: "healing-sounds",
    number: 4,
    title: "The Six Healing Sounds",
    subtitle: "Discharging Stagnant Qi",
    intro:
      "Use vibrational sound frequency to release stagnant Qi, internal heat, from specific organs. Each sound can be made aloud, whispered, or done entirely sub-vocally, making it usable anywhere.",
    sections: [
      {
        heading: "How to do it",
        body: "Breathe in deeply, focus on the named organ, and on the slow exhale release the sound. Visualise the corresponding colour leaving through that organ's sense gateway. Repeat 3, 6, or 9 times per sound.",
      },
      {
        heading: "Use before sleep",
        body: "Performing the Six Healing Sounds before sleep significantly deepens relaxation and improves sleep quality.",
      },
    ],
    practice: {
      label: "Six Healing Sounds Player",
      steps: [
        { title: "Lungs, SSSSSSSS", detail: "White exits through the nose. ×6.", seconds: 60 },
        { title: "Kidneys, HOOOOOOO", detail: "Blue/black exits through the ears. ×6.", seconds: 60 },
        { title: "Liver, SHHHHHHH", detail: "Green exits through the eyes. ×6.", seconds: 60 },
        { title: "Heart, HAAAWWW", detail: "Red exits through the tip of the tongue. ×6.", seconds: 60 },
        { title: "Spleen, WHHOOOO", detail: "Yellow exits through the mouth. ×6.", seconds: 60 },
        { title: "Triple Heater, HHHEEEE", detail: "Red exits through the open mouth. ×6.", seconds: 60 },
      ],
    },
    widget: "healing-sounds",
    quiz: [
      { q: "Which organ uses the sound SHHHHHHH?", options: ["Lungs", "Liver", "Heart", "Spleen"], answer: 1, explain: "Liver, Wood. Green energy exits through the eyes." },
      { q: "Through which gateway does kidney Qi exit?", options: ["Eyes", "Nose", "Ears", "Mouth"], answer: 2, explain: "Kidneys / Water, sound HOOOO, blue/black exiting through the ears." },
      { q: "What sound clears the Triple Heater?", options: ["HAAAWWW", "HHHEEEE", "WHHOOOO", "SSSSSSSS"], answer: 1, explain: "HHHEEEE, clears stagnant heat from the entire torso." },
    ],
    journalPrompts: [
      "Which sound produced the most felt release? What did it feel like?",
      "Try the sequence before sleep tonight, note its effect tomorrow.",
    ],
  },

  {
    slug: "cleansing-emotions",
    number: 5,
    title: "Cleansing the Emotions",
    subtitle: "Internal Alchemy, Emotional Level",
    intro:
      "Each of the five Yin organs carries a specific primary emotion. When the organ is stagnant, the negative pole accumulates. When the organ is cleared, the positive virtue arises. This is a complete system of self-directed emotional alchemy.",
    sections: [
      {
        heading: "Emotional Polarity Map",
        body:
          "Liver, Anger / Power · Kindness\nHeart, Anxiety / Joy · Honor\nSpleen, Worry / Sympathy · Fairness\nLungs, Grief / Letting Go · Righteousness\nKidneys, Fear / Awe · Gentleness",
      },
      {
        heading: "Five Collection Points",
        body:
          "1. Perineum, Fear / Kidneys\n2. Centre of Chest (mid-sternum), Anxiety / Heart\n3. Right side of navel (⅔ to right waist), Anger / Liver\n4. Left side of navel (⅔ to left waist), Grief / Lungs\n5. Below left rib cage (above the spleen), Worry / Spleen",
      },
      {
        heading: "The Recycling Process",
        body:
          "Draw the negative emotion from organ → Collection Point → Ba Gua at the navel. At the navel, spin a high-speed vortex with the mind, breaking the emotional charge back into clean Qi. Replace what was cleared by drawing fresh Qi in through the organ's sense Window (Liver/Eyes, Heart/Tongue, Spleen/Mouth, Lungs/Nose, Kidneys/Ears). Always close the Ba Gua to finish.",
      },
    ],
    practice: {
      label: "Guided Cleansing",
      steps: [
        { title: "Open the Ba Gua", detail: "Centre at the navel.", seconds: 30 },
        { title: "Kidneys → Perineum → Navel", detail: "Draw Fear down to the perineum, then to the Ba Gua. Vortex. Fresh Qi in through the ears.", seconds: 90 },
        { title: "Heart → Centre-Chest → Navel", detail: "Anxiety. Fresh Qi in through the tongue.", seconds: 90 },
        { title: "Liver → Right-of-navel → Navel", detail: "Anger. Fresh Qi in through the eyes.", seconds: 90 },
        { title: "Lungs → Left-of-navel → Navel", detail: "Grief. Fresh Qi in through the nose.", seconds: 90 },
        { title: "Spleen → Below-left-ribs → Navel", detail: "Worry. Fresh Qi in through the mouth.", seconds: 90 },
        { title: "Close and seal", detail: "Always close the Ba Gua.", seconds: 45 },
      ],
    },
    widget: "collection-points",
    quiz: [
      { q: "Which collection point holds Fear before recycling?", options: ["Mid-sternum", "Below left ribs", "Perineum", "Right of navel"], answer: 2, explain: "Perineum, collection point for Fear / Kidneys, the Yin pole of the Chong Mai." },
      { q: "Where is fresh Qi drawn in to replace cleared Anger?", options: ["Through the eyes", "Through the ears", "Through the tongue", "Through the nose"], answer: 0, explain: "Liver / Wood, the sense Window is the eyes." },
      { q: "What happens at the navel after collection?", options: ["The emotion is suppressed", "A vortex breaks the charge back into clean Qi", "The emotion is sent outside the body", "The session ends"], answer: 1, explain: "A mind-spun vortex recycles the charge into harmless components." },
    ],
    journalPrompts: [
      "Which negative emotion was clearest to find in its organ today?",
      "What changed at the organ after the vortex and the fresh Qi inflow?",
    ],
  },

  {
    slug: "five-virtues",
    number: 6,
    title: "Cultivating the Virtues",
    subtitle: "Spirit Level, The Five Virtues",
    intro:
      "Once the negative charge has been cleared, positive virtuous qualities arise spontaneously. Not a moral exercise, a direct energetic phenomenon. Each Yin organ has a spirit (Hun, Shen, Yi, Po, Zhi) whose natural expression is the corresponding virtue.",
    sections: [
      { heading: "Liver, Hun / Kindness",      body: "When Wood is clear, Kindness emanates from the organ's correct function, not performed, but arising." },
      { heading: "Heart, Shen / Honor & Respect", body: "When Fire is balanced, the Shen radiates authentic Joy and lights the eyes with presence." },
      { heading: "Spleen, Yi / Fairness",      body: "When Earth is stable, worry dissolves into compassion without depletion." },
      { heading: "Lungs, Po / Righteousness",  body: "When Metal is clear, grief releases and ethical clarity emerges as discernment." },
      { heading: "Kidneys, Zhi / Gentleness",  body: "When Water is unobstructed, Fear becomes Gentleness, quiet inner strength without force." },
    ],
    practice: {
      label: "Virtue Activation",
      steps: [
        { title: "Open the Ba Gua", detail: "Settle at the navel.", seconds: 30 },
        { title: "Liver, Hun · Kindness", detail: "Smile in. Feel Kindness arising of itself.", seconds: 60 },
        { title: "Heart, Shen · Honor", detail: "Feel the eyes light, Joy and dignity rise.", seconds: 60 },
        { title: "Spleen, Yi · Fairness", detail: "Steady, balanced compassion.", seconds: 60 },
        { title: "Lungs, Po · Righteousness", detail: "Clear discernment, the capacity to let go.", seconds: 60 },
        { title: "Kidneys, Zhi · Gentleness", detail: "Quiet, unstoppable yielding strength.", seconds: 60 },
        { title: "Seal", detail: "Both palms over the navel.", seconds: 30 },
      ],
    },
    widget: "virtues-wheel",
    quiz: [
      { q: "Which spirit lives in the Heart?", options: ["Hun", "Shen", "Yi", "Po"], answer: 1, explain: "Shen, the primary spirit, residing also in the Upper Dan Tian." },
      { q: "Which virtue arises when the Lungs are clear?", options: ["Kindness", "Fairness", "Righteousness", "Gentleness"], answer: 2, explain: "Po, Corporeal Soul, ethical clarity and the capacity to let go." },
      { q: "Cultivating virtue means…", options: ["Forcing yourself to be good", "Clearing energetic conditions so virtue arises naturally", "Repeating affirmations"], answer: 1, explain: "Clear the ground; the virtue emerges of itself." },
    ],
    journalPrompts: [
      "Which virtue felt most immediate today?",
      "Where in daily life does that virtue most want to express itself?",
    ],
  },

  {
    slug: "microcosmic-orbit",
    number: 7,
    title: "The Microcosmic Orbit",
    subtitle: "Du Mai + Ren Mai, The Central Circuit",
    intro:
      "Circulation of Qi through the two primary Extraordinary Meridians, Du Mai (Governor, up the spine and over the crown) and Ren Mai (Conception, down the front midline). The single most important foundation practice in internal Qigong.",
    sections: [
      {
        heading: "The Pathway",
        body:
          "From Hui Yin (perineum) Qi rises up the Du Mai along the spine, through the base of the skull, over Bai Hui at the crown, and down through Yin Tang, nose and tongue to the palate. With the tongue touching the palate, the circuit closes, Du Mai bridges to Ren Mai. The Qi then descends down the throat, Heart centre, Solar Plexus, navel and Lower Dan Tian, back to the perineum.",
      },
      {
        heading: "Key Stations",
        body:
          "Hui Yin (CV-1) · Perineum, foundation\nMing Men (GV-4) · Gate of Life, Kidneys' Yang fire\nDa Zhui (GV-14) · Great Vertebra, junction of all Yang\nBai Hui (GV-20) · Hundred Meetings, crown / Heaven\nYin Tang · Third Eye, Shen gateway\nShan Zhong (CV-17) · Middle Dan Tian\nQi Hai (CV-6) · Lower Dan Tian reservoir",
      },
    ],
    practice: {
      label: "Microcosmic Orbit Circulation",
      steps: [
        { title: "Tongue to palate", detail: "Close the circuit. Both palms on the lower abdomen.", seconds: 30 },
        { title: "Rise up the spine", detail: "Hui Yin → Ming Men → Da Zhui → base of skull → Bai Hui.", seconds: 90 },
        { title: "Descend the front", detail: "Yin Tang → tongue → throat → Shan Zhong → navel → Qi Hai → Hui Yin.", seconds: 90 },
        { title: "Continuous circulation", detail: "Let the orbit develop its own momentum.", seconds: 180 },
        { title: "Gather at the navel", detail: "Settle and seal.", seconds: 45 },
      ],
    },
    widget: "microcosmic-orbit",
    quiz: [
      { q: "Which channel runs up the spine and over the crown?", options: ["Ren Mai", "Du Mai", "Chong Mai", "Dai Mai"], answer: 1, explain: "Du Mai, the Governor, sea of all Yang." },
      { q: "What completes the bridge between Du and Ren channels?", options: ["Closing the eyes", "Holding the breath", "Tongue touching the palate", "Pressing CV-17"], answer: 2, explain: "The tongue on the palate bridges the two channels." },
      { q: "Which station sits at GV-20?", options: ["Hui Yin", "Bai Hui", "Yin Tang", "Ming Men"], answer: 1, explain: "Bai Hui, Hundred Meetings, the crown." },
    ],
    journalPrompts: [
      "Where along the orbit did the Qi flow easily? Where did it stall?",
      "What sensation tells you the orbit is closing into a circuit?",
    ],
  },

  {
    slug: "dai-mai",
    number: 8,
    title: "The Belt Channel, Dai Mai",
    subtitle: "The Horizontal Axis",
    intro:
      "The Dai Mai is the only horizontal channel in the entire energy system. It encircles the waist like a belt, binding all the vertical channels together. Its function maintains the structural integrity of the whole system.",
    sections: [
      {
        heading: "Function & Clinical Significance",
        body:
          "Governs the lower back, hips and lateral legs (Gall Bladder territory). Stagnation: heaviness at the waist 'as if sitting in water', weak lower back, things 'falling apart'. Strong & clear: profound integration and containment. Critical for sexual and reproductive function, directly connected to uterus / ovaries in women and lower Jing in men.",
      },
      {
        heading: "Opening the Dai Mai",
        body:
          "Master Point: GB-41 (Zu Lin Qi) on the top of the foot, between 4th and 5th metatarsals.\nCoupled Point: TH-5 (Wai Guan), outer forearm, 2 cun above wrist crease.\n\nAfter establishing the Ba Gua and Microcosmic Orbit, feel a band of Qi encircling the waist at navel level. Inhale it slightly outward, exhale it back. Then stack horizontal bands from hips to lower ribs.",
      },
    ],
    practice: {
      label: "Stacking the Belt",
      steps: [
        { title: "Activate GB-41 & TH-5", detail: "Hold both points for 30–60s, then release with mind alone.", seconds: 60 },
        { title: "First band at navel", detail: "A complete horizontal ring, front, sides, back.", seconds: 60 },
        { title: "Add bands above and below", detail: "Hips → ribs, stacking horizontal ovals.", seconds: 120 },
        { title: "Pulse the belt", detail: "Inhale slightly outward, exhale consolidate.", seconds: 120 },
        { title: "Gather at the navel and seal", detail: "Close the Ba Gua.", seconds: 45 },
      ],
    },
    widget: "dai-mai-rings",
    quiz: [
      { q: "How many horizontal channels exist in the system?", options: ["Zero", "One, the Dai Mai", "Four", "Eight"], answer: 1, explain: "Dai Mai is the only horizontal channel." },
      { q: "Master Point of the Dai Mai?", options: ["LU-7", "GB-41", "SI-3", "SP-4"], answer: 1, explain: "GB-41 (Zu Lin Qi). Coupled with TH-5 (Wai Guan)." },
      { q: "Which symptom suggests Dai Mai stagnation?", options: ["Heavy 'sitting in water' sensation at the waist", "Cold hands", "Bright vision", "Stiff neck"], answer: 0, explain: "Heaviness at the waist, weak lower back, 'things falling apart'." },
    ],
    journalPrompts: [
      "How does the belt feel today, tight, loose, slipping, integrated?",
      "Notice the Dai Mai through the day: when does it 'hold' you?",
    ],
  },

  {
    slug: "chong-mai",
    number: 9,
    title: "The Thrusting Channel, Chong Mai",
    subtitle: "The Central Axis, Core of the System",
    intro:
      "Called the Sea of Blood and the Sea of the Twelve Meridians, the Chong Mai is the central vertical axis of the body. From Hui Yin (perineum) through the core to Bai Hui (crown). All Three Dan Tian lie along it.",
    sections: [
      {
        heading: "Surface vs Core",
        body:
          "The Microcosmic Orbit circulates around the surface (Du / Ren). The Chong Mai moves through the absolute centre, a column rather than a pathway. Working with it develops a qualitatively different order of internal perception and power.",
      },
      {
        heading: "Practice, Opening the Core Column",
        body:
          "1. Establish the perineum.\n2. Rise through the Lower Dan Tian.\n3. Rise through the Middle Dan Tian.\n4. Rise through the Upper Dan Tian to Bai Hui.\n\nHold all three Dan Tian simultaneously, then pulse Qi up the column on inhale, down on exhale.",
      },
    ],
    practice: {
      label: "Core Column Activation",
      steps: [
        { title: "Anchor at Hui Yin", detail: "Warm, alive, located.", seconds: 45 },
        { title: "Rise through Lower Dan Tian", detail: "Density and vitality of Jing.", seconds: 60 },
        { title: "Rise through Middle Dan Tian", detail: "Warmth and expansion of Qi at the heart.", seconds: 60 },
        { title: "Rise through Upper Dan Tian", detail: "Clear, still, luminous Shen.", seconds: 60 },
        { title: "Pulse the column", detail: "Up on inhale, down on exhale.", seconds: 180 },
        { title: "Settle and seal", detail: "Return to the navel.", seconds: 45 },
      ],
    },
    widget: "chong-mai-column",
    quiz: [
      { q: "The Chong Mai is best described as…", options: ["A surface pathway", "A central column through the core", "A horizontal belt"], answer: 1, explain: "Central vertical axis, a column rather than a surface pathway." },
      { q: "How many Dan Tian lie along the Chong Mai?", options: ["1", "2", "3", "5"], answer: 2, explain: "Three, Lower, Middle, Upper." },
      { q: "Two classical names for the Chong Mai?", options: ["Sea of Yin / Sea of Yang", "Sea of Blood / Sea of the Twelve Meridians", "Sea of Marrow / Sea of Bone"], answer: 1, explain: "Sea of Blood and Sea of the Twelve Meridians." },
    ],
    journalPrompts: [
      "Which Dan Tian was clearest along the column today?",
      "What changes in your sense of self when the column is present?",
    ],
  },

  {
    slug: "macrocosmic-orbit",
    number: 10,
    title: "The Macrocosmic Orbit",
    subtitle: "Full Body Circulation, Heaven, Human, Earth",
    intro:
      "Extends the Microcosmic Orbit beyond the torso to include arms and legs, incorporating the secondary Eight Extras (Yang/Yin Qiao Mai, Yang/Yin Wei Mai) and the twelve organ meridians. Establishes the three-level connection: Heaven (crown), Human (core), Earth (feet).",
    sections: [
      {
        heading: "Pathway",
        body:
          "From the Lower Dan Tian, Qi descends the front of the legs (Stomach, Spleen) to KD-1 Yongquan (Bubbling Spring) in the centre of the foot-sole. From the soles it rises up the back of the legs (Bladder, Kidney) to the perineum, up the spine (Du Mai), over the crown, and back down the front.\n\nThe arm circuit branches from the chest: Qi descends the inner arms (Heart, Pericardium, Lung) to PC-8 Laogong (Palace of Toil) in the centre of the palm and the fingertips. From the fingertips it rises up the outer arms (SI, TH, LI) to the shoulders and face, back to the crown.",
      },
      {
        heading: "Key Activation Points",
        body:
          "KD-1 Yongquan, Earth Qi entry, sole of foot.\nPC-8 Laogong, emit/receive Qi from the palms.\nGV-20 Bai Hui, Heaven Qi entry, crown.",
      },
    ],
    practice: {
      label: "Macrocosmic Orbit",
      steps: [
        { title: "Open Bai Hui, Yongquan, Laogong", detail: "Crown, soles, palms.", seconds: 60 },
        { title: "Leg circuit", detail: "Down front of legs to KD-1, up back of legs to perineum.", seconds: 90 },
        { title: "Spine and crown", detail: "Up Du Mai to Bai Hui.", seconds: 60 },
        { title: "Arm circuit", detail: "Chest → inner arm → PC-8 → fingertips → outer arm → shoulders → crown.", seconds: 90 },
        { title: "Full body orbit", detail: "Let Heaven, Human and Earth circulate together.", seconds: 180 },
        { title: "Gather and seal", detail: "Return to the navel.", seconds: 45 },
      ],
    },
    widget: "macrocosmic-orbit",
    quiz: [
      { q: "Where is Yongquan (KD-1)?", options: ["Centre of the palm", "Crown of head", "Centre of the foot-sole", "Behind the knee"], answer: 2, explain: "Centre of the sole, Bubbling Spring, Earth Qi entry." },
      { q: "Which point emits and receives Qi from the hand?", options: ["LU-7", "PC-8 Laogong", "PC-6 Nei Guan", "HT-7"], answer: 1, explain: "Laogong, Palace of Toil, centre of the palm." },
      { q: "The Macrocosmic Orbit integrates which three levels?", options: ["Past / Present / Future", "Heaven / Human / Earth", "Jing / Qi / Shen"], answer: 1, explain: "Heaven (crown), Human (core), Earth (feet)." },
    ],
    journalPrompts: [
      "Which of the three levels feels most established? Which least?",
      "How did the palms and soles feel when first opened?",
    ],
  },

  {
    slug: "master-coupled-points",
    number: 11,
    title: "Master and Coupled Points",
    subtitle: "Accessing the Eight Extras Directly",
    intro:
      "Each of the Eight Extraordinary Meridians is opened through a pair of acupuncture points: the Master Point opens the channel, the Coupled Point supports and amplifies. All pairs sit on wrists, hands, ankles, and feet, easily reached for self-practice.",
    sections: [
      {
        heading: "How to Use",
        body:
          "Apply gentle, firm finger pressure to the Master Point for 30–60 seconds, then add the Coupled Point and hold both. The sensation to wait for is a warm, spreading flow along the channel. Once felt, reduce pressure and continue with mind alone, transitioning into the practice for that channel.",
      },
      {
        heading: "Pairing Note",
        body:
          "Du Mai (Yang, back) ↔ Yang Qiao Mai (lateral Yang). Ren Mai (Yin, front) ↔ Yin Qiao Mai (medial Yin). Chong Mai (central axis) ↔ Yin Wei Mai (internal linking). Dai Mai (horizontal belt) ↔ Yang Wei Mai (external linking).",
      },
    ],
    practice: {
      label: "Point Activation Sequence",
      steps: [
        { title: "Choose a channel", detail: "Use the table to pick the channel you'll work with today.", seconds: 30 },
        { title: "Hold Master Point", detail: "30–60s gentle firm pressure.", seconds: 60 },
        { title: "Add Coupled Point", detail: "Hold both simultaneously.", seconds: 60 },
        { title: "Wait for the channel sensation", detail: "Warm, spreading flow along the pathway.", seconds: 90 },
        { title: "Release and continue with mind", detail: "Transition into the channel's practice.", seconds: 120 },
      ],
    },
    widget: "points-table",
    quiz: [
      { q: "Master Point of the Du Mai?", options: ["SI-3 (Hou Xi)", "LU-7 (Lie Que)", "SP-4 (Gong Sun)", "GB-41"], answer: 0, explain: "SI-3 (Hou Xi). Coupled with BL-62 (Shen Mai)." },
      { q: "Which pair opens the Chong Mai?", options: ["GB-41 / TH-5", "SP-4 / PC-6", "KD-6 / LU-7"], answer: 1, explain: "Master SP-4 (Gong Sun), Coupled PC-6 (Nei Guan)." },
      { q: "How do you know the channel has opened?", options: ["Local tingling at the point only", "A warm, spreading flow along the pathway", "A click in the joint"], answer: 1, explain: "The pathway-wide warmth or flow is the confirmation." },
    ],
    journalPrompts: [
      "Which channel called you today? What happened when both points were held?",
      "Were you able to maintain the opening with mind alone after releasing pressure?",
    ],
  },

  {
    slug: "heaven-and-earth",
    number: 12,
    title: "Drawing In Heaven and Earth",
    subtitle: "Standing Practice, Human as the Bridge",
    intro:
      "This practice explicitly positions you as the living bridge between Heaven (Tian) and Earth (Di), the classical definition of the human being in Daoist cosmology.",
    sections: [
      {
        heading: "The Practice",
        body:
          "Stand in a relaxed upright posture, feet shoulder-width apart. Activate the Ba Gua at the navel. Open Bai Hui at the crown and Yongquan at the soles. Breathe: Heaven Qi descends through the crown on the inhale, Earth Qi rises to meet it. Both mix and accumulate at the Lower Dan Tian. Excess overflows up the Chong Mai to nourish Middle and Upper Dan Tian.",
      },
    ],
    practice: {
      label: "Heaven & Earth",
      steps: [
        { title: "Stand and root", detail: "Feet shoulder-width, knees soft, crown lifting.", seconds: 60 },
        { title: "Open the three gates", detail: "Bai Hui, both Yongquan, Ba Gua at navel.", seconds: 60 },
        { title: "Inhale Heaven down", detail: "Yang Qi through the crown into the Upper Dan Tian.", seconds: 90 },
        { title: "Inhale Earth up", detail: "Yin Qi through the soles into the lower body.", seconds: 90 },
        { title: "Mix at Lower Dan Tian", detail: "Both currents meet and accumulate.", seconds: 180 },
        { title: "Overflow up the Chong Mai", detail: "Excess rises to Middle and Upper Dan Tian.", seconds: 120 },
        { title: "Close and seal", detail: "Settle hands at the navel.", seconds: 45 },
      ],
    },
    widget: "heaven-earth",
    quiz: [
      { q: "Through which point does Heaven Qi enter?", options: ["Yongquan", "Bai Hui", "Hui Yin"], answer: 1, explain: "Bai Hui, Hundred Meetings, the crown." },
      { q: "Where do Heaven and Earth Qi mix in this practice?", options: ["Upper Dan Tian", "Middle Dan Tian", "Lower Dan Tian"], answer: 2, explain: "They meet and accumulate at the Lower Dan Tian, overflowing upward as the Chong Mai opens." },
      { q: "Posture for this practice?", options: ["Lying down", "Seated cross-legged", "Relaxed standing"], answer: 2, explain: "Standing, feet shoulder-width apart." },
    ],
    journalPrompts: [
      "Which current was easier to draw in, Heaven or Earth?",
      "When the Lower Dan Tian overflowed, where did the energy go first?",
    ],
  },

  {
    slug: "sexual-qigong",
    number: 13,
    title: "Sexual Qigong",
    subtitle: "Cultivation & Refinement of Jing",
    intro:
      "Sexual energy is Jing, the most primary, dense, and powerful form of energy available, rooted in the Kidneys and the Lower Dan Tian. The cultivation of Jing, rather than its depletion, is essential for progression in any higher practice.",
    sections: [
      {
        heading: "Solo & Dual Cultivation",
        body:
          "Solo cultivation works one's own Jing through directed attention, breath and internal movement. Dual cultivation is practiced with a partner with the mutual intention of raising and refining sexual energy rather than simply releasing it. Solo cultivation is the foundation and must be established first.",
      },
      {
        heading: "The Inner Alchemy Movement",
        body:
          "Draw Jing energy from its seat in the reproductive organs up through the core of the body via the Chong Mai, through each Dan Tian in sequence, ultimately refining it toward Shen at the Upper Dan Tian. This is the foundational movement of Inner Alchemy: Jing → Qi → Shen.",
      },
    ],
    practice: {
      label: "Jing Refinement",
      steps: [
        { title: "Settle and seal", detail: "Open Ba Gua. Tongue to palate.", seconds: 45 },
        { title: "Activate Jing at the source", detail: "Awareness in the reproductive area, warm and contained.", seconds: 90 },
        { title: "Rise through Lower Dan Tian", detail: "Up the Chong Mai, Jing.", seconds: 90 },
        { title: "Refine to Middle Dan Tian", detail: "Jing → Qi.", seconds: 90 },
        { title: "Refine to Upper Dan Tian", detail: "Qi → Shen.", seconds: 90 },
        { title: "Return and seal", detail: "Bring excess back to the Lower Dan Tian and close.", seconds: 60 },
      ],
    },
    widget: "chong-mai-column",
    quiz: [
      { q: "Jing is rooted in which organ system?", options: ["Heart", "Spleen", "Kidneys", "Lungs"], answer: 2, explain: "Kidneys and the Lower Dan Tian, the seat of Jing." },
      { q: "Which channel is used to refine Jing upward?", options: ["Du Mai", "Dai Mai", "Chong Mai"], answer: 2, explain: "The Chong Mai, the central axis along which all three Dan Tian lie." },
      { q: "Inner Alchemy sequence?", options: ["Shen → Qi → Jing", "Jing → Qi → Shen", "Qi → Jing → Shen"], answer: 1, explain: "Refine Essence into Energy, Energy into Spirit." },
    ],
    journalPrompts: [
      "How does the quality of attention shift as Jing rises through each Dan Tian?",
      "What did refinement (rather than release) feel like in the body?",
    ],
    closing: "Solo first. Steady. The Pearl is patient.",
  },
];

export const lessonBySlug = (slug: string) =>
  lessons.find((l) => l.slug === slug);
