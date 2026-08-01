// Metta & Tonglen, course content
// Source: dictated directly by Paul, describing his own taught method.
// Reuses the same chapter shape as the Faery Shamanism / Lucid Dreaming courses.

import type { FaeryChapter } from "@/data/magick/faery-shamanism";

export type BuddhistChapter = FaeryChapter;

export const mettaTonglenChapters: BuddhistChapter[] = [
  {
    slug: "metta",
    n: "I",
    title: "Mettā, Loving-Kindness",
    subtitle: "The five stages, the phrases of mettā, and radiating from the heart space",
    intro:
      "Mettā is the deliberate cultivation of unconditional loving-kindness, first toward yourself, then outward in ever-widening circles, until it holds every being without exception. It is trained, not merely felt: a structured practice with clear stages, so the heart has somewhere real to stand before it reaches for what's hardest to love.",
    sections: [
      {
        heading: "What Is Mettā?",
        body: "Mettā means loving-kindness, benevolence, or unconditional friendliness. Rather than trying to manufacture a feeling directly, the practice works by systematically directing warm wishes toward a sequence of people, each stage a little harder than the last, training the heart to extend genuine goodwill further and further, until it no longer distinguishes between friend, stranger, and difficulty.",
      },
      {
        heading: "The Five Stages",
        body: "Mettā is traditionally practiced in a fixed sequence, each stage building the capacity for the next:\n\n1. **Self**. The practice always begins here. It is not selfish to wish yourself well; it is the ground everything else stands on. If you cannot find genuine warmth for yourself, extending it convincingly to others becomes much harder.\n2. **A loved one**, someone easy to love: a close friend, a family member, a teacher. Let the warmth here be full and uncomplicated, and use it to calibrate what genuine mettā actually feels like in the body.\n3. **A neutral person**, someone you neither like nor dislike; a shopkeeper, a person you pass on the street, someone whose name you might not even know. This stage stretches the practice beyond people you already have feeling for.\n4. **A difficult person**, someone you have real friction with. Start gently here; you're not forcing forgiveness or pretending the difficulty isn't real, only offering the same basic wish for wellbeing you'd offer anyone. This is often the hinge-point of the whole practice.\n5. **All beings**, the circle opens all the way out, holding self, loved one, neutral person, difficult person, and everyone else at once, without exception.\n\n*A traditional variation, if useful: within the \"all beings\" stage, you can optionally divide the wish into all men and all women, offering it to each in turn before uniting them again.*",
      },
      {
        heading: "Widening the Circle",
        body: "Once the five stages feel stable, the circle of \"all beings\" can be widened deliberately, in its own stages:\n\n1. Begin with **all human beings alive right now**, the whole of humanity, as it exists in this present moment, exactly as it is.\n2. Extend outward to **other beings**, animals, and all sentient life.\n3. Extend further to **ancestors**, those who came before, known and unknown.\n4. Finally, extend to **all beings, everywhere**, across all times, all realms, without limit.\n\nEach widening is its own small practice of trust: can the heart actually hold this much? You're not required to feel it perfectly, the sincere gesture of extending the wish is the practice itself.",
      },
      {
        heading: "The Phrases of Mettā",
        body: "At each stage, the wish is carried by simple, repeated phrases, adjust the pronoun (I / you / they / all beings) to match who you're holding in that moment:\n\n- May I/you/all beings be **happy**\n- May I/you/all beings be **nourished**\n- May I/you/all beings be **healthy**\n- May I/you/all beings be **peaceful**\n- May I/you/all beings be **at rest**\n- May I/you/all beings be **free of pain**\n- May I/you/all beings be **free of difficult emotions**\n- May I/you/all beings be **liberated**\n\nThe phrases don't need to be recited mechanically. Let them slow down, let each one land before moving to the next. Some sessions one phrase will carry more weight than the others; there's no need to force the rest.",
      },
      {
        heading: "Generating and Radiating Loving Energy",
        body: "Beyond the verbal phrases, mettā can also be practiced as a direct, felt cultivation of warmth, generating a loving energy in the body (most often sensed at the heart space) and actively radiating it outward, like light or warmth spreading from a source. Spend time simply resting in the heart space itself: noticing what's already there, letting warmth gather and build, and then extending it outward in all directions, to the person or beings currently held in the practice, and eventually without any particular object at all, simply as an emanation.",
      },
    ],
    practice: {
      steps: [
        { title: "Arrive and settle", detail: "Sit comfortably. A few slow breaths. Let your attention settle at the heart space.", seconds: 60 },
        { title: "Stage 1, Self", detail: "Silently offer the phrases to yourself: may I be happy, nourished, healthy, peaceful, at rest, free of pain and difficult emotions, may I be liberated.", seconds: 120 },
        { title: "Stage 2, A loved one", detail: "Bring a loved one clearly to mind. Offer the same phrases to them, in full.", seconds: 120 },
        { title: "Stage 3, A neutral person", detail: "Bring to mind someone neutral, a stranger, someone you see but don't know. Offer the same phrases.", seconds: 120 },
        { title: "Stage 4, A difficult person", detail: "Gently bring to mind someone you have friction with. Offer the same basic wish for their wellbeing, no need to force anything beyond sincerity.", seconds: 120 },
        { title: "Stage 5, All beings", detail: "Let the circle open to hold all five, self, loved one, neutral, difficult, and all beings. Together, without exception.", seconds: 120 },
        { title: "Widen the circle", detail: "Extend the wish outward in stages: all humans alive now → animals and other beings → ancestors → all beings everywhere.", seconds: 180 },
        { title: "Radiate from the heart space", detail: "Rest in the heart space itself. Let warmth gather there, and simply radiate it outward, without needing a specific object.", seconds: 90 },
      ],
    },
    quiz: [
      {
        q: "Why does mettā practice always begin with oneself?",
        options: [
          "It's the easiest stage to skip",
          "It's the ground the rest of the practice stands on, without warmth for yourself, extending it convincingly outward is harder",
          "Tradition requires it arbitrarily",
          "It isn't actually necessary",
        ],
        answer: 1,
        explain: "Self-mettā is foundational, not selfish, it establishes what genuine loving-kindness actually feels like before extending it further.",
      },
      {
        q: "What is the traditional order of the five stages of mettā?",
        options: [
          "All beings, self, loved one, neutral, difficult",
          "Self, loved one, neutral person, difficult person, all beings",
          "Difficult person first, to get it out of the way",
          "There is no fixed order",
        ],
        answer: 1,
        explain: "The sequence deliberately builds capacity, from the easiest object (self, loved one) toward the hardest (difficult person) before opening to all beings.",
      },
      {
        q: "After the five stages, how does the practice widen the circle of \"all beings\"?",
        options: [
          "It doesn't, all beings is the final stage",
          "All humans alive now → animals/other beings → ancestors → all beings everywhere",
          "Straight from self to all beings everywhere, in one step",
          "Only to people the practitioner already knows",
        ],
        answer: 1,
        explain: "The widening happens in its own stages, extending trust and capacity gradually rather than all at once.",
      },
    ],
    journalPrompts: [
      "Which of the five stages feels easiest for you right now, and which feels hardest? What does that tell you?",
      "Sit with the phrase \"may I be free of difficult emotions.\" What arises when you offer that to yourself specifically?",
      "Try radiating from the heart space without a specific person in mind. What did that feel like, compared to the phrase-based stages?",
    ],
  },
  {
    slug: "tonglen",
    n: "II",
    title: "Tonglen, Taking and Sending",
    subtitle: "Flash bodhichitta, working with texture, and breathing for all beings",
    intro:
      "Tonglen, \"taking and sending\", is the traditional Tibetan practice of breathing in suffering and breathing out relief. It runs in the opposite direction to most people's instinct (which is to avoid pain, not breathe it in), and that reversal is precisely the point: it trains the heart to meet suffering directly, without flinching, from a place of genuine compassion rather than aversion.",
    sections: [
      {
        heading: "Stage 1, Flash Bodhichitta",
        body: "The practice opens with a brief flash of bodhichitta, a moment of genuine awareness of some root of compassion already present in you. This isn't manufactured; it's a recognition. It might arise from remembering a moment of real kindness, a natural tenderness toward suffering you've witnessed, or simply a quiet turning of the heart toward care. This flash doesn't need to be sustained or dramatic, just a brief, honest touch of the compassion that's already there, which the rest of the practice will be breathed from.",
      },
      {
        heading: "Stage 2, Working with Texture",
        body: "Choose a specific subject of suffering, something you feel personally affected by or connected to. This might be something concrete like addiction, abuse, grief, or a specific fear, or it can be simply \"general suffering\" if nothing specific calls to be worked with today. Spend time exploring the actual **texture** of this particular suffering: not analyzing it intellectually, but feeling its quality directly, is it heavy, sharp, hot, hollow, tight? This stage is about genuine, felt familiarity with the specific shape of this pain, before working with it on behalf of others.",
      },
      {
        heading: "Stage 3, The Particular Person",
        body: "Bring to mind a particular person experiencing this same kind of suffering, they don't need to be someone you know personally; an imagined or archetypal person is entirely valid. Deliberately **breathe in** their suffering, in the texture you explored in Stage 2. On the out-breath, **breathe out** some appropriate relief for them, this doesn't need to be the exact logical opposite of what you took in; whatever feels like a genuine offering of ease, comfort, or care is enough.",
      },
      {
        heading: "Stage 4, All Beings",
        body: "Extrapolate outward: now breathe in the same kind of suffering, or suffering in general, on behalf of **all beings** who carry it, anywhere. As it arrives on the in-breath, let it **completely evaporate in the emptiness of the Self**, meeting a spaciousness with no fixed place for it to lodge, leaving no residue or trace behind. From that same open, spacious place, the bodhichitta touched in Stage 1. Breathe out whatever feels good: care, compassion, relief, ease, for all beings who carry this suffering.",
      },
    ],
    practice: {
      steps: [
        { title: "Settle and flash bodhichitta", detail: "Sit comfortably. Let a brief, honest flash of your own root of compassion arise, no need to force or sustain it, just touch it.", seconds: 60 },
        { title: "Choose your texture", detail: "Pick a subject you feel personally connected to (addiction, grief, a specific fear, or simply \"general suffering\"). Spend a moment feeling its actual quality: heavy, sharp, hot, tight, hollow.", seconds: 90 },
        { title: "Breathe for one person", detail: "Bring a particular person to mind, known or imagined. Breathe in their version of this suffering. Breathe out whatever relief feels genuine.", seconds: 120 },
        { title: "Breathe for all beings", detail: "Widen to all beings carrying this suffering, anywhere. Breathe it in, letting it evaporate completely in the emptiness of the Self, no trace left behind. Breathe out care, compassion, relief, or ease, from that same open place.", seconds: 180 },
        { title: "Rest", detail: "Let the breath return to normal. Rest for a moment in whatever is present, without needing to do anything further.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "What is \"flash bodhichitta\" at the start of tonglen?",
        options: [
          "A visualization of a flashing light",
          "A brief, honest recognition of a root of compassion already present in you",
          "The moment suffering is fully released",
          "A mantra recited three times",
        ],
        answer: 1,
        explain: "It's a recognition, not a manufactured feeling, a brief touch of compassion the rest of the practice is breathed from.",
      },
      {
        q: "In the \"texture\" stage, what is the practitioner exploring?",
        options: [
          "The intellectual causes of the suffering",
          "The felt, sensory quality of the specific suffering chosen, heavy, sharp, hot, tight, etc.",
          "Ways to avoid the feeling entirely",
          "A different person's unrelated suffering",
        ],
        answer: 1,
        explain: "Texture work is about direct, felt familiarity with the specific shape of the suffering.",
      },
      {
        q: "In the final stage, what happens to the suffering breathed in on behalf of all beings?",
        options: [
          "It is held and stored in the heart",
          "It is transformed into its logical opposite before being exhaled",
          "It completely evaporates in the emptiness of the Self, leaving no trace",
          "It is redirected back to its source",
        ],
        answer: 2,
        explain: "The suffering meets spaciousness with nowhere to lodge, it dissolves entirely, and the out-breath comes from that same open, bodhichitta place rather than from processing or transforming the pain.",
      },
    ],
    journalPrompts: [
      "What subject of suffering did you choose to work with today, and why that one?",
      "Describe the texture you found, in plain, sensory language.",
      "What did you notice in the moment the in-breath was meant to \"evaporate in the emptiness of the Self\"? Did that feel real, aspirational, or somewhere in between, and either is fine to sit with honestly.",
    ],
  },
];

export const mettaTonglenChapterBySlug = (slug: string) =>
  mettaTonglenChapters.find((c) => c.slug === slug);
