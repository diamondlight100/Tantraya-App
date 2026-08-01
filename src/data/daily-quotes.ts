// A quiet rotation of teaching lines for the homepage, one per day. Sourced
// from figures and texts spanning the pathways this school actually draws
// from, real self-realization teachers (Ramana, Balsekar), the bhakti/Neem
// Karoli Baba–Ram Dass lineage, the two unrelated Krishnamurtis (J. and
// U.G., deliberately kept distinct, they taught very different things),
// classical Buddhist, Daoist, and yogic scripture, traditional tantric
// verse, and mystics from outside the Indian/Asian frame.
//
// Where a line is a specific translator's rendering of a Sanskrit or
// Chinese verse rather than a single fixed English "original", the
// translator or edition is named so nothing is presented as more literal
// than it is. Where a saying is transmitted orally rather than published in
// the teacher's own writing (Neem Karoli Baba left no books), it is marked
// "(attributed)".

export type DailyQuote = {
  text: string;
  source: string;
  tradition: string;
};

export const dailyQuotes: DailyQuote[] = [
  // --- Ramana Maharshi ---
  {
    text: "Happiness is your own nature. It is not wrong to desire it. What is wrong is seeking it outside when it is inside.",
    source: "Ramana Maharshi",
    tradition: "Advaita",
  },
  {
    text: "There is neither creation nor destruction, neither destiny nor free will, neither path nor achievement. This is the final truth.",
    source: "Ramana Maharshi, Ulladu Narpadu",
    tradition: "Advaita",
  },
  {
    text: "The Self is that where there is absolutely no 'I' thought. That is called silence.",
    source: "Ramana Maharshi, Who Am I?",
    tradition: "Advaita",
  },
  {
    text: "Your duty is to be, and not to be this or that.",
    source: "Ramana Maharshi",
    tradition: "Advaita",
  },
  {
    text: "The mind will subside only by means of the enquiry 'Who am I?' Every other question only strengthens the mind.",
    source: "Ramana Maharshi, Who Am I?",
    tradition: "Advaita",
  },

  // --- Buddha / Dhammapada ---
  {
    text: "We are what we think. All that we are arises with our thoughts. With our thoughts we make the world.",
    source: "The Buddha, Dhammapada 1",
    tradition: "Buddhist",
  },
  {
    text: "To avoid all evil, to cultivate good, and to purify one's mind, this is the teaching of the Buddhas.",
    source: "The Buddha, Dhammapada 183",
    tradition: "Buddhist",
  },
  {
    text: "Hatred does not cease by hatred, but only by love. This is the eternal rule.",
    source: "The Buddha, Dhammapada 5",
    tradition: "Buddhist",
  },
  {
    text: "One who takes the unreal to be real will never see the Real, being beguiled by the unreal.",
    source: "The Buddha, Dhammapada 11",
    tradition: "Buddhist",
  },
  {
    text: "All conditioned things are impermanent. When one sees this with wisdom, one turns away from suffering.",
    source: "The Buddha, Dhammapada 277",
    tradition: "Buddhist",
  },

  // --- Neem Karoli Baba (oral tradition, no writings of his own) ---
  {
    text: "Love everyone, serve everyone, remember God.",
    source: "Neem Karoli Baba (attributed)",
    tradition: "Bhakti",
  },
  {
    text: "Love is the strongest medicine. It is more powerful than electricity.",
    source: "Neem Karoli Baba (attributed)",
    tradition: "Bhakti",
  },
  {
    text: "Love all men as God, even if they hurt you or shame you.",
    source: "Neem Karoli Baba (attributed)",
    tradition: "Bhakti",
  },

  // --- Ram Dass ---
  {
    text: "Be here now.",
    source: "Ram Dass, Be Here Now",
    tradition: "Bhakti",
  },
  {
    text: "The quieter you become, the more you can hear.",
    source: "Ram Dass",
    tradition: "Bhakti",
  },
  {
    text: "We're all just walking each other home.",
    source: "Ram Dass",
    tradition: "Bhakti",
  },
  {
    text: "I am loving awareness. That is what I am beneath every role I play.",
    source: "Ram Dass",
    tradition: "Bhakti",
  },

  // --- J. Krishnamurti (distinct from U.G., unrelated teachers) ---
  {
    text: "Truth is a pathless land.",
    source: "J. Krishnamurti, 1929 dissolution of the Order of the Star",
    tradition: "Krishnamurti (J.)",
  },
  {
    text: "The ability to observe without evaluating is the highest form of intelligence.",
    source: "J. Krishnamurti",
    tradition: "Krishnamurti (J.)",
  },
  {
    text: "Freedom from the desire for an answer is essential to the understanding of a problem.",
    source: "J. Krishnamurti, Think on These Things",
    tradition: "Krishnamurti (J.)",
  },
  {
    text: "The observer is the observed.",
    source: "J. Krishnamurti",
    tradition: "Krishnamurti (J.)",
  },

  // --- U.G. Krishnamurti (no relation to J. Krishnamurti) ---
  {
    text: "Don't follow me, I'm lost.",
    source: "U.G. Krishnamurti",
    tradition: "Krishnamurti (U.G.)",
  },
  {
    text: "There is no such thing as enlightenment. What you are calling enlightenment is basically a physical, biological change, a mutation.",
    source: "U.G. Krishnamurti, The Mystique of Enlightenment",
    tradition: "Krishnamurti (U.G.)",
  },
  {
    text: "Thought is our enemy number one. It has destroyed everything, all our natural instincts.",
    source: "U.G. Krishnamurti",
    tradition: "Krishnamurti (U.G.)",
  },

  // --- Ramesh Balsekar ---
  {
    text: "Consciousness is all there is. Everything else is a concept appearing in it.",
    source: "Ramesh Balsekar",
    tradition: "Advaita",
  },
  {
    text: "Nothing happens unless it is God's will, and do what you like. What can be simpler than that?",
    source: "Ramesh Balsekar",
    tradition: "Advaita",
  },
  {
    text: "You are not an object in consciousness. You are consciousness itself.",
    source: "Ramesh Balsekar",
    tradition: "Advaita",
  },

  // --- Traditional Tantric texts ---
  {
    text: "Wherever the mind wanders, whether to the external or the internal, right there is the state of Bhairava, since He is all-pervading, present everywhere.",
    source: "Vijnana Bhairava Tantra, dharana 116",
    tradition: "Tantric",
  },
  {
    text: "Beloved, this universe pours out of you like fine wine from a crystal glass. Break the glass. Disappear into the wine.",
    source: "Vijnana Bhairava Tantra, trans. Lorin Roche",
    tradition: "Tantric",
  },
  {
    text: "At the point where two breaths meet, the space between exhale and inhale, there the Goddess reveals herself.",
    source: "Vijnana Bhairava Tantra, dharana 24",
    tradition: "Tantric",
  },
  {
    text: "By the fullness of contemplation on the void of one's own body, the void becomes manifest, and one enters the void.",
    source: "Vijnana Bhairava Tantra, dharana 49",
    tradition: "Tantric",
  },

  // --- Daoist texts ---
  {
    text: "The Tao that can be told is not the eternal Tao.",
    source: "Lao Tzu, Tao Te Ching 1, trans. Stephen Mitchell",
    tradition: "Daoist",
  },
  {
    text: "When I let go of what I am, I become what I might be.",
    source: "Lao Tzu, Tao Te Ching 44, trans. Stephen Mitchell",
    tradition: "Daoist",
  },
  {
    text: "Empty yourself of everything. Let the mind rest at peace.",
    source: "Lao Tzu, Tao Te Ching 16, trans. Stephen Mitchell",
    tradition: "Daoist",
  },
  {
    text: "Flow with whatever may happen, and let your mind be free. Stay centered by accepting whatever you are doing. This is the ultimate.",
    source: "Zhuangzi",
    tradition: "Daoist",
  },

  // --- Yogic texts ---
  {
    text: "Yoga is the stilling of the fluctuations of the mind.",
    source: "Patanjali, Yoga Sutra 1.2",
    tradition: "Yogic",
  },
  {
    text: "I am not the body. I am not the body's. The body appears in me. The body is not mine.",
    source: "Ashtavakra Gita 1.4",
    tradition: "Yogic",
  },
  {
    text: "All things arise, suffer change, and pass away. This is their nature. When you know this, nothing perturbs you, nothing hurts you. You become still.",
    source: "Ashtavakra Gita",
    tradition: "Yogic",
  },
  {
    text: "If you wish to be free, know you are the Self, the witness of all these, the heart of awareness.",
    source: "Ashtavakra Gita 1.3",
    tradition: "Yogic",
  },

  // --- Mystics from other world traditions ---
  {
    text: "The wound is the place where the light enters you.",
    source: "Rumi, trans. Coleman Barks",
    tradition: "Mystic",
  },
  {
    text: "Between the poles of conscious and unconscious, there the mind has made a swing.",
    source: "Kabir, trans. Rabindranath Tagore",
    tradition: "Mystic",
  },
  {
    text: "The eye with which I see God is the same eye with which God sees me.",
    source: "Meister Eckhart",
    tradition: "Mystic",
  },
  {
    text: "Not knowing how near the truth is, people seek it far away. What a pity!",
    source: "Hakuin Ekaku, Song of Zazen",
    tradition: "Mystic",
  },
  {
    text: "In fear of death I went to the mountains, again and again meditating on its uncertain hour. Now all fear of death is over and done.",
    source: "Milarepa",
    tradition: "Mystic",
  },
];
