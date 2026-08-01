// Phowa (Conscious Transition), course content
// Source: adapted from Paul Diamond's manuscript "Beyond the Threshold of
// Death: Phowa for Modern Times," itself grounded in Chagdud Tulku
// Rinpoche's P'howa Commentary (Rigdzin Longsal Nyingpo lineage).
// Reuses the same chapter shape as Mettā & Tonglen / Faery Shamanism.

import type { FaeryChapter } from "@/data/magick/faery-shamanism";

export type BuddhistChapter = FaeryChapter;

// Illustrations live in /public/buddhist/phowa/ (static, unhashed, same
// convention as the meridian diagrams in /public/meridians/).
const img = (name: string) => `/buddhist/phowa/${name}.webp`;
const imgCentralChannel = img("central-channel");
const imgChakras = img("chakras");
const imgHeartCultivation = img("heart-cultivation");
const imgSpiritualFocus = img("spiritual-focus");
const imgConsciousnessEssence = img("consciousness-essence");
const imgSealingTheGates = img("sealing-the-gates");
const imgAwakeningTheCrown = img("awakening-the-crown");
const imgTheAscent = img("the-ascent");
const imgEjectionAndMerging = img("ejection-and-merging");
const imgShowerOfBlessings = img("shower-of-blessings");

export const phowaChapters: BuddhistChapter[] = [
  {
    slug: "what-is-phowa",
    n: "I",
    title: "What Is Phowa?",
    subtitle:
      "The art of conscious dying, its mechanics, and why death is a liberating perspective",
    intro:
      'Phowa, literally "transference" or "ejection", is a practice designed for the single most critical moment a mind will ever face: the moment of death. It offers a way to meet that moment on purpose, directing awareness toward liberation or a favorable rebirth, rather than by accident.',
    sections: [
      {
        heading: "The Art of Conscious Dying",
        body: "Traditional Phowa focuses on a specific deity visualized above the head. This adapted approach keeps that structure but personalizes the destination: instead of a fixed deity, you work with a spiritual focus that resonates with your own heart, a deity you love, a teacher who inspires you, divine light, unconditional love, or a sacred flame. The objective does not change: to transfer your mind-stream directly from the body, at death, into a state of freedom and clarity, bypassing the disorienting intermediate states that can otherwise follow.",
      },
      {
        heading: "The Essential Mechanics",
        body: 'Four moves make up the technique: clear the central channel, merge the red and white bindus, open the crown, and consciously eject awareness through the central channel into the heart of your chosen focus. Done well, it is said to offer "enlightenment without meditation", a doorway available even to someone who has not reached deep meditative realization. The skill is not limited to your own transition, either: adept practitioners are traditionally understood to be able to perform Phowa for others who are dying or have recently died, extending the practice from a personal technique into an act of service.\n\nAs the Tibetan translator and yogi Marpa Chökyi Lodrö put it: "If you study Phowa, then at the time when death is approaching you will have no despair. If beforehand you have become accustomed to the path of Phowa, then at the time of death you will be full of cheerful confidence."',
      },
      {
        heading: "Death and Rebirth, A Liberating Perspective",
        body: "Death, in this view, is a transition within an ongoing continuum rather than annihilation, a river changing banks, a flame passed from one lamp to another. Between death and whatever comes next, traditions describe transitional states, bardos in Tibetan, antarabhava in Sanskrit, that can last moments or weeks, and can be experienced as luminous or as disorienting, depending on how familiar the mind already is with letting go. Phowa exists to give consciousness a direct route through, or at least a more skillful passage.",
      },
      {
        heading: "The Journey of Consciousness",
        body: 'Karma, the ripening of intentional action, shapes the direction consciousness travels after death. Every thought, word, and deed leaves an imprint; Phowa is one way to positively influence that trajectory at the most decisive juncture of all. "Our life, death, and rebirth all depend upon the mind."\n\nBeyond death-preparation, this practice quietly changes ordinary life too: less aversion to mortality, more presence, and a felt appreciation for the fact that everything here is passing through.',
      },
    ],
    practice: {
      steps: [
        {
          title: "Settle into the Lion Posture",
          detail:
            "Sit with a straight spine, in full lotus or any stable comfortable position. Rest your hands on your knees or in your lap.",
          seconds: 30,
        },
        {
          title: "Open the chest",
          detail: "Draw your shoulders slightly back and down, opening the chest area.",
          seconds: 20,
        },
        {
          title: "Lift the chin slightly",
          detail:
            "Tilt your head very slightly upward, as if a thread gently drew the crown of your head toward the sky.",
          seconds: 20,
        },
        {
          title: "Tongue and breath",
          detail:
            "Rest your tongue lightly against the roof of the mouth, just behind the upper front teeth. Breathe naturally through the nose.",
          seconds: 30,
        },
        {
          title: "Rest here",
          detail:
            "Simply hold this posture, noticing the sense of alignment along your central axis, before moving into any other practice.",
          seconds: 90,
        },
      ],
    },
    quiz: [
      {
        q: 'What does "Phowa" literally mean?',
        options: ["Liberation", "Transference or ejection", "Rebirth", "Compassion"],
        answer: 1,
        explain:
          "Phowa translates as the transference, or ejection, of consciousness, the technical heart of the practice.",
      },
      {
        q: "In this adapted approach, what replaces the fixed traditional deity above the head?",
        options: [
          "Nothing, the visualization is dropped entirely",
          "A personalized spiritual focus chosen by the practitioner",
          "A random deity assigned by a teacher",
          "A physical object held in the hand",
        ],
        answer: 1,
        explain:
          "The mechanics stay the same; the destination becomes whatever spiritual focus genuinely resonates with you.",
      },
      {
        q: "How is death framed in this course?",
        options: [
          "As an annihilation to be feared",
          "As a natural transition within an ongoing continuum",
          "As something to avoid thinking about",
          "As purely a medical event",
        ],
        answer: 1,
        explain:
          "Death is presented as a transition, not an ending, a liberating reframe that is central to why Phowa is practiced at all.",
      },
    ],
    journalPrompts: [
      "What is your own honest relationship to the idea of your own death, right now, before this course changes anything?",
      'Marpa said familiarity with Phowa brings "cheerful confidence" at death. What would cheerful confidence at that moment actually feel like for you?',
    ],
  },
  {
    slug: "setting-your-intention",
    n: "II",
    title: "Setting Your Intention",
    subtitle:
      "The power of a personalized spiritual focus, and cultivating a real relationship with it",
    intro:
      "Two qualities determine how much Phowa can do for you: compassion, the wish for realization on behalf of all beings, not only yourself, and devotion, an unwavering trust in whatever you choose as your spiritual focus. This chapter is about choosing that focus honestly, and beginning to build a real relationship with it.",
    sections: [
      {
        heading: "The Power of a Personalized Spiritual Focus",
        body: "Devotion is what opens a practitioner to receive the guidance that carries the transference through. It is worth taking seriously before anything else in this course, not as an abstract virtue, but as the actual engine of the technique.",
      },
      {
        heading: "Personalizing Your Spiritual Focus",
        body: "Choose whatever, for you, represents ultimate truth, boundless love, and the source of liberation. Three broad categories, drawn straight from the source teaching, may help:\n\nA deity, Shiva, Kali, Buddha, Christ, or another divine expression you deeply revere.\n\nA revered teacher, your own guru if you have one, or an inspiring historical spiritual figure.\n\nA universal quality or symbol, for those who do not resonate with a specific figure: Pure Light (a brilliant golden sphere), Unconditional Love (a boundless presence), a Sacred Flame (wisdom and purification), or Vast Space (limitlessness).\n\nAuthenticity matters more than tradition here. Pick what genuinely moves you.",
      },
      {
        heading: "Cultivating a Relationship with Your Focus",
        body: 'Choosing a focus is itself a practice, it fosters self-reflection and nurtures the quality of devotion this whole path depends on. Strengthen the bond with a short personal prayer, recited daily, so the connection is already a habit long before it is needed at the threshold. A traditional shape for such a prayer: "Through the guidance and blessing of [my chosen focus], may all my negative karma and blockages be purified. May I know when it is time to release attachment, with courage and grace. May I move through every transition, including the final one, with confidence and ease."\n\nAs one teaching puts it: "When you receive a teaching, your intention should be to put it into practice, to apply it single-mindedly... If you truly hold that attitude in your heart and mind, it is said to generate an infinite amount of merit."',
      },
    ],
    practice: {
      steps: [
        {
          title: "Sit with the question",
          detail:
            "Settle comfortably. Ask yourself plainly: what, for me, represents ultimate truth, boundless love, and the source of liberation?",
          seconds: 90,
        },
        {
          title: "Try on a category",
          detail:
            "Consider each in turn, a deity, a teacher, or a universal quality like Light, Love, Flame, or Space. Notice which one your heart actually leans toward, rather than which one you think you should choose.",
          seconds: 120,
        },
        {
          title: "Name it",
          detail:
            "Settle on a name or image for your focus, even provisionally. It's allowed to change later. The point right now is to have something real to work with.",
          seconds: 60,
        },
        {
          title: "Draft your prayer",
          detail:
            "In your own words, write a short prayer or affirmation addressed to this focus, using the traditional shape above as a starting template.",
          seconds: 180,
        },
        {
          title: "Recite it once",
          detail:
            "Read your prayer slowly, out loud or silently, and notice what it's like to address it to someone or something specific.",
          seconds: 60,
        },
      ],
    },
    quiz: [
      {
        q: "Which two qualities most determine how much Phowa can do for a practitioner?",
        options: [
          "Physical fitness and flexibility",
          "Compassion and devotion",
          "Memorization and repetition",
          "Wealth and social status",
        ],
        answer: 1,
        explain:
          "Compassion (the altruistic motivation) and devotion (trust in the chosen focus) are named as the two decisive factors.",
      },
      {
        q: "What matters most when choosing a personalized spiritual focus?",
        options: [
          "Choosing whatever a teacher assigns you",
          "Picking the most traditionally 'correct' deity",
          "Authenticity, what genuinely moves you",
          "Choosing something impressive to others",
        ],
        answer: 2,
        explain:
          "The course is explicit that authenticity matters more than tradition, pick what you actually feel.",
      },
      {
        q: "Why cultivate a relationship with your focus well before death?",
        options: [
          "It has no real effect either way",
          "So the connection is already a habit, ready to arise on its own when other faculties are failing",
          "Purely as a memory exercise",
          "Because tradition requires a minimum number of recitations",
        ],
        answer: 1,
        explain:
          "The mind at death is unusually impressionable; a habit built now is what tends to arise spontaneously later, without needing to be improvised.",
      },
    ],
    journalPrompts: [
      "Write down your chosen spiritual focus and why you chose it. Be honest about whether it was truly your own pull or someone else's expectation.",
      "Read your personal prayer back to yourself after a few days. Does anything in it feel like it needs to be truer?",
    ],
  },
  {
    slug: "prana-and-the-nadis",
    n: "III",
    title: "Prana and the Nadis",
    subtitle:
      "The vital force, its five expressions, and the three channels that matter most for Phowa",
    intro:
      "Prana is the vital force animating everything from the cosmos down to a single cell, breath is only its most tangible expression. It travels through 72,000 subtle channels, or nadis, that make up the infrastructure of the subtle body Phowa works with.",
    sections: [
      {
        heading: "Understanding Prana",
        body: "In the yogic and tantric traditions underlying this practice, prana is the universal energy responsible for all physiological, mental, emotional, and spiritual function, not merely physical breath, though breath is its most accessible doorway. Simple pranayama (breath regulation) is how a student begins to feel these energies directly, rather than only understanding them intellectually.",
      },
      {
        heading: "The Five Pranas",
        body: "Prana Vayu, in the chest, moving upward, governs inhalation, perception, and the intake of all substances into the system.\n\nApana Vayu, in the lower abdomen, moving downward, governs elimination, reproduction, and releasing what is no longer needed.\n\nSamana Vayu, at the navel, governs digestion and assimilation, balancing the upward and downward forces.\n\nUdana Vayu, in the throat, moving upward, governs speech and spiritual elevation. This is, significantly, the energy that leaves through the crown at death.\n\nVyana Vayu, pervading the whole body, governs circulation, coordinating movement and connection between all parts.",
      },
      {
        heading: "The Three Principal Nadis",
        body: "Of the thousands of nadis, three matter most for Phowa. Ida Nadi is the left channel, terminating at the left nostril, cooling, receptive, lunar, feminine. Pingala Nadi is the right channel, terminating at the right nostril, heating, active, solar, masculine. Sushumna Nadi is the central channel, running from the base of the spine to the crown, the primary conduit for Phowa's transference.\n\nNote: the sushumna sits within the spine in hatha yoga, but is visualized just in front of the spine for this practice, either seems to work, but it is the traditional central channel, not the spinal channel itself, that this course uses. Balancing Ida and Pingala, through practices like alternate-nostril breathing, is considered a precursor to fully activating the Sushumna.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Settle and place your hands",
          detail:
            "Sit comfortably with an erect spine. Place one hand on the abdomen, one on the chest.",
          seconds: 30,
        },
        {
          title: "Inhale in three parts",
          detail:
            "Inhale slowly: fill the lower abdomen first, then the ribcage, then the upper chest.",
          seconds: 60,
        },
        {
          title: "Exhale in reverse",
          detail: "Exhale in reverse order: upper chest, ribcage, then abdomen.",
          seconds: 60,
        },
        {
          title: "Continue the rhythm",
          detail: "Continue for several rounds, feeling the movement of energy through the torso.",
          seconds: 120,
        },
        {
          title: "Add the visualization",
          detail:
            "Once a rhythm feels established, visualize the breath as luminous energy rising along the central channel on the inhale, and descending on the exhale.",
          seconds: 120,
        },
      ],
    },
    quiz: [
      {
        q: "Which of the five pranas leaves through the crown at the moment of death?",
        options: ["Apana Vayu", "Samana Vayu", "Udana Vayu", "Vyana Vayu"],
        answer: 2,
        explain:
          "Udana Vayu, seated in the throat and moving upward, is specifically identified as the energy that exits through the crown at death.",
      },
      {
        q: "Which nadi is the primary conduit for Phowa's transference of consciousness?",
        options: [
          "Ida Nadi",
          "Pingala Nadi",
          "Sushumna Nadi",
          "None of the nadis matter for Phowa",
        ],
        answer: 2,
        explain:
          "The Sushumna, the central channel, is the dedicated pathway consciousness travels in Phowa.",
      },
      {
        q: "What is traditionally considered a precursor to fully activating the Sushumna?",
        options: [
          "Fasting for several days",
          "Balancing Ida and Pingala, e.g. through alternate-nostril breathing",
          "Reciting the alphabet backward",
          "Avoiding all breathwork entirely",
        ],
        answer: 1,
        explain:
          "Balance between the two side channels is described as the ground from which the central channel can fully activate.",
      },
    ],
    journalPrompts: [
      "During the Three-Part Breath, where in your body did you feel the movement most clearly, abdomen, ribs, or chest?",
      "Did the visualization of luminous energy rising and falling change how the breath itself felt? Describe it plainly.",
    ],
  },
  {
    slug: "the-central-channel",
    n: "IV",
    title: "The Central Channel",
    subtitle:
      "The Sushumna as the highway to liberation, its mystical significance, and its key attributes",
    intro:
      "The Sushumna Nadi runs from the perineum straight up through the core of the body to the crown, visualized as a hollow tube, luminous, brilliant white or crystal-clear, and perfectly straight, unlike the winding Ida and Pingala. A clear, familiar central channel is the single most essential piece of groundwork for everything that follows.",
    sections: [
      {
        heading: "Your Highway to Liberation",
        image: imgCentralChannel,
        body: "In Phowa, the Sushumna is the dedicated channel through which the consciousness-essence is projected out of the body at death. The point is not to mentally construct a picture of a tube, but to cultivate a felt sense of this central axis, something you can locate in the body.",
      },
      {
        heading: "The Mystical Significance of the Channel",
        body: "The Sushumna is often called the highway to liberation because it transcends the duality of Ida and Pingala, offers the most direct route to higher consciousness, and functions as the most sacred inner space in the body, the site where the alchemy of transformation actually happens. Much of this course deliberately returns to the same channel again and again, seen a little more vividly each time; that repetition is the training.",
      },
      {
        heading: "Key Attributes for Phowa",
        body: "Origin: this course guides the consciousness-sphere from the heart, with the channel understood to run the length of the torso, sealed below. Path: perfectly straight, just in front of the spine. Width: like a drinking straw or a reed, thin at the base and widening toward the crown. Luminosity: translucent, crystal-clear, or filled with radiant white light. Upper opening: wide open at the crown, a skylight, a trumpet's mouth, an unfolding lotus. Lower end: completely sealed, so consciousness has only one way out, up.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Settle",
          detail: "Sit with a straight, relaxed spine and close your eyes.",
          seconds: 30,
        },
        {
          title: "Find the spark",
          detail:
            "Bring awareness to the base of the spine, near the perineum, and imagine a tiny spark of light there.",
          seconds: 60,
        },
        {
          title: "Let the channel rise",
          detail:
            "From that spark, visualize a hollow, luminous channel about the width of your thumb, rising upward.",
          seconds: 60,
        },
        {
          title: "See its qualities",
          detail:
            "See it as pure, clear light, a crystal tube, or filled with radiant white light.",
          seconds: 60,
        },
        {
          title: "Trace it with breath",
          detail:
            "With your breath, gently trace the channel upward through the center of the torso, in front of the spine.",
          seconds: 90,
        },
        {
          title: "Pass the centers",
          detail: "Feel the channel pass the navel, the heart, the throat.",
          seconds: 60,
        },
        {
          title: "Reach the crown",
          detail: "Continue to the crown, opening like a lotus or a clear skylight.",
          seconds: 60,
        },
        {
          title: "Rest",
          detail:
            "Rest, becoming familiar with the channel's presence, without needing to do anything further.",
          seconds: 120,
        },
      ],
    },
    quiz: [
      {
        q: "Why is the Sushumna called the 'highway to liberation'?",
        options: [
          "Because it is the widest of the nadis",
          "Because it transcends duality and offers the most direct route to higher consciousness",
          "Because it only exists in the imagination",
          "Because it connects to the stomach",
        ],
        answer: 1,
        explain:
          "Unlike the winding Ida and Pingala, the Sushumna is the direct, non-dual channel, hence the name.",
      },
      {
        q: "Why is the lower end of the central channel visualized as sealed?",
        options: [
          "For no particular reason. It's arbitrary",
          "So consciousness has only one way out: upward, through the crown",
          "Because the lower body is unimportant",
          "To make the visualization more difficult",
        ],
        answer: 1,
        explain:
          "Sealing the lower end is a deliberate safeguard, ensuring the only available exit is the crown.",
      },
      {
        q: "What shape does this course generally use to describe the channel's width?",
        options: [
          "As wide as the torso itself",
          "Like a drinking straw or reed, narrow at the base and widening toward the crown",
          "Perfectly uniform in width, top to bottom",
          "It has no defined width",
        ],
        answer: 1,
        explain:
          "The channel is described as thin at the base and gradually widening as it ascends.",
      },
    ],
    journalPrompts: [
      "Where in your body did the channel feel most vivid today, the base, the heart, or the crown?",
      "What does 'a felt sense' of the central axis mean to you, concretely, after this sitting?",
    ],
  },
  {
    slug: "the-bindus",
    n: "V",
    title: "The Bindus",
    subtitle: "Seeds of consciousness and bliss, the white and red bindus, and their union",
    intro:
      'Bindus (Sanskrit: "drop"), or thigle in Tibetan, are concentrated spheres of energy and consciousness, the seeds of psycho-physical existence. Giving your own awareness a symbolic shape, a sphere or a syllable, is what makes it possible to actually move it in visualization.',
    sections: [
      {
        heading: "Seeds of Consciousness and Bliss",
        body: 'The visualization of consciousness as a distinct, mobile entity, sphere or syllable, is crucial for Phowa\'s final stage of "ejection." By giving consciousness a symbolic form, a practitioner has something concrete to actually work with. The experience of working with bindus is often blissful, not incidental pleasure, but traditionally understood as a sign of consciousness being refined.',
      },
      {
        heading: "The White and Red Bindus",
        body: "The White Bindu (Shukla Bindu) is associated with the paternal principle, the Moon, and water, coolness, bliss, stillness, and clarity, moving downward, often placed at the crown or forehead. The Red Bindu (Rakta Bindu) is associated with the maternal principle, the Sun, and fire, warmth, vitality, dynamism, and mastery, moving upward, often placed at the navel or root.",
      },
      {
        heading: "Universal Subtle Energies",
        body: "In this approach both bindus are understood as universal energies present in everyone, regardless of gender, the stable, receptive dimension and the dynamic, active dimension of your own being. Their union creates the potent consciousness-sphere the Phowa ejection actually uses; the fuller union practice, later in this course, builds directly on the sensing you begin here.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Settle",
          detail: "Sit comfortably with a straight spine and close your eyes.",
          seconds: 30,
        },
        {
          title: "Find the White Bindu",
          detail:
            "Bring attention to the crown or the center of the forehead. Imagine a tiny, luminous sphere of pure white light, shimmering like a pearl, or glowing like the moon.",
          seconds: 90,
        },
        {
          title: "Feel its qualities",
          detail:
            "Invite the feeling of its qualities: profound peace, soothing coolness, deep stillness, an expansive sense of clarity.",
          seconds: 60,
        },
        {
          title: "Find the Red Bindu",
          detail:
            "Shift attention to the navel center, or slightly below it. Imagine a tiny, radiant sphere of vibrant red light, glowing like a ruby, or carrying the warmth of the sun.",
          seconds: 90,
        },
        {
          title: "Feel its qualities",
          detail:
            "Invite the feeling of its qualities: invigorating warmth, dynamic energy, a sense of vitality and potent aliveness.",
          seconds: 60,
        },
        {
          title: "Rest with both, gently",
          detail:
            "Throughout, favor gentle awareness and sensing over forceful creation. Let both spheres simply be present.",
          seconds: 60,
        },
      ],
    },
    quiz: [
      {
        q: "What quality is the White Bindu traditionally associated with?",
        options: [
          "Heat and dynamism",
          "Coolness, bliss, stillness, and clarity",
          "Speed and urgency",
          "Sound and vibration",
        ],
        answer: 1,
        explain:
          "The White Bindu carries lunar, cooling, still qualities, often visualized at the crown or forehead.",
      },
      {
        q: "In this course's approach, how are the red and white bindus understood across genders?",
        options: [
          "Only men have a White Bindu and only women a Red Bindu",
          "As universal energies present in everyone, regardless of gender",
          "They don't apply to embodied practitioners at all",
          "Only advanced practitioners possess them",
        ],
        answer: 1,
        explain:
          "Both are treated as universal, the stable/receptive and dynamic/active dimensions present in every practitioner.",
      },
      {
        q: "Why does Phowa give consciousness a symbolic shape like a sphere or syllable?",
        options: [
          "Purely for decoration",
          "Because an abstract 'I-am-ness' is too abstract to actually move in visualization; a shape gives it something concrete",
          "Tradition requires exactly one shape for everyone",
          "It has no functional purpose",
        ],
        answer: 1,
        explain:
          "A concrete form is what makes the later stages of guiding and projecting consciousness actually workable.",
      },
    ],
    journalPrompts: [
      "Which bindu was easier for you to sense today, white or red, and what might that suggest about your current state?",
      "Describe the felt quality of blissful sensation, if any arose, in your own words rather than the course's.",
    ],
  },
  {
    slug: "the-chakras",
    n: "VI",
    title: "The Chakras",
    subtitle: "The seven energy centers along the Sushumna, from root to crown",
    intro:
      'Chakras, "wheels", are junctures where numerous nadis intersect along the Sushumna. A full study of the chakra system is outside the scope of a Phowa-focused course, but the Heart and Crown chakras matter directly: consciousness ascends from the heart, through the channel, and exits at the crown.',
    sections: [
      {
        heading: "Energy Centers Along the Sushumna",
        body: "Each chakra is understood to govern physical, emotional, mental, and spiritual aspects of experience. For Phowa specifically, two matter most: the Heart chakra (Anahata), the initial seat of the consciousness-essence before its ascent, and the Crown chakra (Sahasrara), the ultimate exit point.",
      },
      {
        heading: "The Seven Main Chakras, Root to Crown",
        image: imgChakras,
        body: "Muladhara (Root), base of the spine. Stability, grounding, survival.\n\nSvadhisthana (Sacral), lower abdomen, below the navel. Creativity, emotion, pleasure.\n\nManipura (Solar Plexus), upper abdomen, behind the navel. Personal power, will, transformation.\n\nAnahata (Heart), center of the chest. Love, compassion, balance, union. The initial seat of the consciousness-essence.\n\nVishuddha (Throat), the throat. Communication, self-expression, truth.\n\nAjna (Third Eye), between the eyebrows. Intuition, insight, direct perception.\n\nSahasrara (Crown), top of the head. Enlightenment, unity, pure consciousness, the exit point for consciousness in Phowa.\n\nThat order, root to crown, is the order that matters for this practice: the ascent always moves upward through this exact sequence, never skipping or reversing a center.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Root",
          detail:
            "Bring awareness to the base of the spine, an earthen doorway where your body connects to the physical world.",
          seconds: 45,
        },
        {
          title: "Sacral",
          detail:
            "Move to the lower abdomen, below the navel, a sacred pool reflecting this life and beyond.",
          seconds: 45,
        },
        {
          title: "Solar Plexus",
          detail:
            "Shift to the upper abdomen, behind the navel, a transformative fire that purifies attachment.",
          seconds: 45,
        },
        {
          title: "Heart",
          detail:
            "Center attention in the chest, a boundless sky where consciousness can expand freely.",
          seconds: 60,
        },
        {
          title: "Throat",
          detail: "Move to the throat, a gateway of sacred sound and clear expression.",
          seconds: 45,
        },
        {
          title: "Third Eye",
          detail:
            "Bring focus between the eyebrows, the wisdom-eye that perceives beyond ordinary sight.",
          seconds: 45,
        },
        {
          title: "Crown",
          detail:
            "Finally, awareness rises to the crown, the cosmic portal to the clear light of ultimate reality. Rest here.",
          seconds: 90,
        },
      ],
    },
    quiz: [
      {
        q: "Which chakra is considered the initial seat of the consciousness-essence before its ascent in Phowa?",
        options: [
          "Muladhara (Root)",
          "Manipura (Solar Plexus)",
          "Anahata (Heart)",
          "Sahasrara (Crown)",
        ],
        answer: 2,
        explain:
          "The Heart chakra is where the consciousness-essence is understood to rest before beginning its ascent.",
      },
      {
        q: "What is the correct order of the seven chakras, moving from the base of the spine to the top of the head?",
        options: [
          "Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown",
          "Root, Solar Plexus, Sacral, Heart, Third Eye, Throat, Crown",
          "Crown, Third Eye, Throat, Heart, Solar Plexus, Sacral, Root",
          "Root, Sacral, Heart, Solar Plexus, Throat, Crown, Third Eye",
        ],
        answer: 0,
        explain:
          "Root to crown runs: Muladhara, Svadhisthana, Manipura, Anahata, Vishuddha, Ajna, Sahasrara, in exactly that order, with no swapping of Heart and Solar Plexus.",
      },
      {
        q: "Which chakra is the exit point for consciousness in Phowa?",
        options: ["Root", "Solar Plexus", "Throat", "Crown"],
        answer: 3,
        explain:
          "Sahasrara, the crown chakra, is the sole designated exit point for the consciousness-essence.",
      },
    ],
    journalPrompts: [
      "Which of the seven centers was easiest to feel today, and which was hardest to locate at all?",
      "Sit for a moment with the Heart-to-Crown relationship specifically, what does that particular stretch of the journey feel like?",
    ],
  },
  {
    slug: "ethical-foundations",
    n: "VII",
    title: "Ethical Foundations",
    subtitle: "Purifying mind and conduct, the five precepts as training, not commandment",
    intro:
      "A mind agitated by guilt or clouded by unwholesome habits will struggle to find the clarity and concentration Phowa asks for. Ethical living is not decoration on the practice. It is one of its load-bearing supports.",
    sections: [
      {
        heading: "Purifying Mind and Conduct",
        body: "The Five Precepts offer universal guidelines for a compassionate, harmless, mindful way of life. Here they are presented as conscious aspirations and training principles.",
      },
      {
        heading: "The Five Precepts as Training Principles",
        body: "Abstain from killing, cultivating reverence for life and deep respect for all beings.\n\nAbstain from stealing, cultivating honesty, integrity, and generosity.\n\nAbstain from sexual misconduct, cultivating respect and responsibility in relationships.\n\nAbstain from false speech, cultivating truthfulness, kindness, and clear communication.\n\nAbstain from intoxicants that cloud the mind, cultivating a clear, focused, mindful mind.",
      },
      {
        heading: "Benefits of Ethical Living for Phowa",
        body: "Ethical living calms the mind by reducing guilt and anxiety, leaving more capacity for sustained visualization. It purifies karma, lessening obstacles to a favorable transition. It naturally cultivates compassion, since non-harming is itself an expression of care for others. And it strengthens mindfulness, since upholding any ethical principle requires the same ongoing awareness that meditation itself depends on.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Killing",
          detail:
            "Sit quietly with the aspiration to hold reverence for all life. Notice where this feels easy, and where it feels tested.",
          seconds: 45,
        },
        {
          title: "Stealing",
          detail:
            "Reflect on honesty, integrity, and generosity in your own recent conduct, without judgment, just noticing.",
          seconds: 45,
        },
        {
          title: "Sexual conduct",
          detail:
            "Consider respect and responsibility in your relationships as they actually stand right now.",
          seconds: 45,
        },
        {
          title: "Speech",
          detail:
            "Reflect on truthfulness and kindness in your recent speech, what you've said, and how.",
          seconds: 45,
        },
        {
          title: "Clarity of mind",
          detail:
            "Consider what clouds your own mind's clarity most often, and what it would mean to reduce that.",
          seconds: 45,
        },
      ],
    },
    quiz: [
      {
        q: "How are the Five Precepts framed in this course?",
        options: [
          "As rigid commandments with punishment for failure",
          "As conscious aspirations and training principles",
          "As irrelevant to Phowa practice",
          "As rules only for monks",
        ],
        answer: 1,
        explain:
          "The course explicitly reframes them as aspirations you train toward.",
      },
      {
        q: "Why does ethical living support Phowa specifically?",
        options: [
          "It has no real connection to meditation practice",
          "It calms the mind, purifies karma, and strengthens the same mindfulness meditation requires",
          "It is only a social nicety, unrelated to inner practice",
          "It replaces the need for visualization entirely",
        ],
        answer: 1,
        explain:
          "Ethical conduct is presented as a direct support system for the clarity and concentration Phowa depends on.",
      },
      {
        q: "Which precept concerns intoxicants?",
        options: [
          "Abstaining from false speech",
          "Abstaining from stealing",
          "Abstaining from substances that cloud mental clarity and mindfulness",
          "Abstaining from killing",
        ],
        answer: 2,
        explain:
          "The fifth precept specifically addresses intoxicants, in service of a clear, mindful mind.",
      },
    ],
    journalPrompts: [
      "Which of the five precepts feels most naturally easy for you right now, and which asks the most of you?",
      "Has holding any of these as an aspiration (rather than a rule) changed how you relate to it?",
    ],
  },
  {
    slug: "heart-essence-bodhicitta-and-bhakti",
    n: "VIII",
    title: "Heart-Essence: Bodhicitta and Bhakti",
    subtitle: "Love, compassion, and devotion as the swift path",
    intro:
      'Bodhicitta, the "awakened heart-mind," is the aspiration to attain full realization for the benefit of all beings. Bhakti is trust, love, and surrender toward your chosen focus. Together, Tibetan masters call the combination "the swift path."',
    sections: [
      {
        heading: "Bodhicitta",
        image: imgHeartCultivation,
        body: 'Bodhicitta has two faces: relative bodhicitta, love, compassion, engaged practice, and ultimate bodhicitta, direct insight into the nature of reality. The 14th Dalai Lama describes it this way: "The awakening mind of bodhicitta is like a seed which, when cultivated, gives rise to the state of perfect enlightenment... rooted in compassion and sustained by devotion and wisdom."',
      },
      {
        heading: "Bhakti, The Path of Devotion",
        body: "In Phowa specifically, strong devotion is what opens the practitioner to receive blessing and guidance, and supplies the emotional force that propels consciousness at the moment of transition. Devotion is not naive dependence, at its highest, it is trust in your own capacity for awakening, reflected back to you by whatever you have chosen as your focus.",
      },
      {
        heading: "Bodhicitta and Bhakti Together",
        body: "One keeps the practice from becoming self-interest; the other supplies the one-pointed emotional fuel to carry it through. Three practices build both qualities at once: Loving-kindness, extending goodwill from yourself outward in ever-widening circles; Guru Yoga, visualizing your focus at the crown and letting devotion and gratitude arise naturally; and Tonglen, breathing in others' suffering and breathing out light and healing. (For a fuller treatment of loving-kindness and tonglen specifically, see the Mettā & Tonglen course elsewhere in the Buddhist pathway, this chapter's version is deliberately brief, tuned for Phowa.)",
      },
    ],
    practice: {
      steps: [
        {
          title: "Loving-kindness, briefly",
          detail:
            "Extend goodwill silently: from yourself, to a loved one, to a neutral person, to a difficult person, to all beings.",
          seconds: 120,
        },
        {
          title: "Guru Yoga",
          detail:
            "Visualize your chosen focus at your crown. Recall their wisdom and compassion. Let devotion and gratitude arise naturally, without forcing it.",
          seconds: 120,
        },
        {
          title: "Tonglen, briefly",
          detail:
            "On the in-breath, take in the suffering of others as smoke. Transform it with compassion. On the out-breath, send back light and healing.",
          seconds: 120,
        },
      ],
    },
    quiz: [
      {
        q: "What are the two faces of bodhicitta?",
        options: [
          "Physical and mental",
          "Relative bodhicitta (compassionate aspiration) and ultimate bodhicitta (direct insight)",
          "Male and female",
          "Ancient and modern",
        ],
        answer: 1,
        explain:
          "Relative bodhicitta is the engaged, compassionate aspiration; ultimate bodhicitta is direct wisdom into reality's nature.",
      },
      {
        q: "What do Tibetan masters call the combination of bodhicitta and bhakti?",
        options: ["The slow path", "The swift path", "The forgotten path", "The optional path"],
        answer: 1,
        explain:
          "Altruism supplies direction and bhakti supplies fuel. Together called 'the swift path.'",
      },
      {
        q: "What role does devotion (bhakti) play specifically in Phowa?",
        options: [
          "None. It is irrelevant to the technique",
          "It opens the practitioner to blessing and supplies the emotional force for transference",
          "It is only relevant for advanced teachers",
          "It replaces the need for the central channel visualization",
        ],
        answer: 1,
        explain:
          "Devotion is described as what opens a practitioner to guidance and what propels consciousness at the moment of transition.",
      },
    ],
    journalPrompts: [
      "Which of the three practices today, loving-kindness, guru yoga, or tonglen, felt most alive for you, and why?",
      "Where do you notice bodhicitta (concern for others) and bhakti (devotion to your focus) reinforcing each other in your own practice?",
    ],
  },
  {
    slug: "taking-refuge",
    n: "IX",
    title: "Taking Refuge",
    subtitle: "Finding stability in your chosen focus, and why it matters at the threshold",
    intro:
      "Taking refuge means turning the mind toward a source of ultimate safety and guidance, in this course, your own personalized focus. It is an inner alignment.",
    sections: [
      {
        heading: "Finding Stability in Your Chosen Focus",
        body: "At the highest level, taking refuge means taking refuge in your own capacity for awakening, reflected back to you by whatever you have chosen. It is a deliberate turning of the mind and heart toward your focus as the embodiment of liberation, peace, and ultimate reality, an aspiration to draw strength and guidance from it in daily life, and, crucially, at the moment of death.",
      },
      {
        heading: "Why Refuge Matters for Phowa",
        body: "The mind at death is unusually impressionable. Whatever habit of refuge you have built during life tends to arise spontaneously when other faculties are failing, which is exactly why refuge is practiced now, repeatedly, rather than improvised later. A strong, heartfelt refuge provides a clear direction and destination, instills confidence and reduces fear, and invokes the blessings and connection the rest of Phowa depends on.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Settle",
          detail:
            "Sit comfortably, close your eyes, and settle your mind with a few focused breaths.",
          seconds: 45,
        },
        {
          title: "Bring your focus to mind",
          detail: "Bring your chosen spiritual focus vividly into awareness.",
          seconds: 60,
        },
        {
          title: "Contemplate its qualities",
          detail:
            "Contemplate the qualities this focus embodies for you, boundless wisdom, unconditional love, radiant light, unshakeable peace.",
          seconds: 90,
        },
        {
          title: "Cultivate trust",
          detail: "Cultivate a deep sense of trust, faith, and reliance on this focus.",
          seconds: 60,
        },
        {
          title: "Recite your refuge affirmation",
          detail:
            'Silently repeat: "To [my chosen focus], I turn for ultimate refuge. You are my unwavering guide, my deepest protection. In life, in death, and in all that lies beyond, I take refuge in you."',
          seconds: 60,
        },
        {
          title: "Rest",
          detail:
            "Rest, feeling completely held by this presence, without needing to do anything further.",
          seconds: 90,
        },
      ],
    },
    quiz: [
      {
        q: "At the highest level, what are you actually taking refuge in?",
        options: [
          "A physical object",
          "Your own capacity for awakening, reflected by your chosen focus",
          "Nothing, refuge is purely symbolic",
          "A specific building or temple",
        ],
        answer: 1,
        explain:
          "Refuge is ultimately an inner alignment with your own potential, mirrored back by the focus you've chosen.",
      },
      {
        q: "Why is refuge practiced repeatedly during life, rather than saved for the moment of death?",
        options: [
          "Because it has no effect at the moment of death anyway",
          "Because the mind at death is impressionable, and a built habit tends to arise on its own when needed",
          "Purely as a daily ritual obligation",
          "Because death cannot be anticipated at all",
        ],
        answer: 1,
        explain:
          "A habit of refuge built over time is what surfaces spontaneously when conscious effort becomes difficult.",
      },
      {
        q: "What does a strong refuge provide for Phowa specifically?",
        options: [
          "Nothing measurable",
          "A clear direction, reduced fear, and access to blessing and connection",
          "A replacement for the central channel practice",
          "Physical strength for the posture",
        ],
        answer: 1,
        explain:
          "Refuge functions as the emotional and directional anchor the rest of the technique depends on.",
      },
    ],
    journalPrompts: [
      "What does 'being completely held' by your chosen focus actually feel like in the body, if anything?",
      "Has your sense of your own focus shifted at all since Chapter II? Note the difference, if any.",
    ],
  },
  {
    slug: "invoking-your-spiritual-focus",
    n: "X",
    title: "Invoking Your Spiritual Focus",
    subtitle: "Creating a sacred inner space above the crown, and inviting its presence",
    intro:
      "Here the visualization shifts in a way specific to Phowa: your chosen focus is placed directly above your crown, the exit point for consciousness, and so the immediate destination for it.",
    sections: [
      {
        heading: "Creating a Sacred Inner Space",
        image: imgSpiritualFocus,
        body: "The creation of an inner sacred space through focused visualization concentrates the mind, invites presence and blessing, and establishes an environment suited to the work of conscious transition. You are recalling and deepening the connection with the same personalized focus you identified in Chapter II, now placed directly above your crown.",
      },
      {
        heading: "Visualizing Your Chosen Focus",
        body: "If your focus is a deity or teacher, imagine them radiant and compassionate, perhaps seated on a lotus and moon disc. If your focus is light, love, or flame, imagine an intensely pure, benevolent presence above the crown. Either way, give your focus a luminous heart center. The point your own consciousness will eventually merge into.",
      },
      {
        heading: "Invoking the Presence and Blessings",
        body: "Recite your personal prayer toward the focus above your head, and cultivate the felt sense that the connection is real, benevolent attention, ready to guide you. If the image will not come clearly, that is fine: open your heart to the presence and trust it is there. The connection matters more than the picture.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Begin",
          detail:
            "Begin in a comfortable posture, taking a few breaths to relax the body and calm the mind.",
          seconds: 30,
        },
        {
          title: "Recall your focus",
          detail: "Recall your chosen spiritual focus and its qualities.",
          seconds: 60,
        },
        {
          title: "Place it above the crown",
          detail:
            "Imagine this focus appearing directly above the crown of your head, luminous and powerful, yet gentle and loving.",
          seconds: 90,
        },
        {
          title: "Find its heart center",
          detail:
            "Within your visualized focus, identify or imagine its radiant heart center, a point of concentrated wisdom and compassion.",
          seconds: 60,
        },
        {
          title: "Sense the connecting beam",
          detail: "Sense a beam of light or energy connecting your crown to this focus above.",
          seconds: 60,
        },
        {
          title: "Recite your prayer",
          detail:
            "Silently recite your personalized prayer or affirmation, directing it to the focus above.",
          seconds: 60,
        },
        {
          title: "Remain in connection",
          detail:
            "Remain in this state, feeling the connection, the qualities of your focus, and its compassionate energy.",
          seconds: 90,
        },
      ],
    },
    quiz: [
      {
        q: "Where is the chosen spiritual focus visualized in this stage of Phowa?",
        options: [
          "At the base of the spine",
          "Directly above the crown of the head",
          "In front of the heart",
          "Behind the practitioner",
        ],
        answer: 1,
        explain:
          "This is the specific shift of this stage: the focus sits above the crown, the exit point for consciousness.",
      },
      {
        q: "What is the 'heart center' given to the visualized focus for?",
        options: [
          "Decoration only",
          "It is the point your own consciousness will eventually merge into",
          "It has no functional purpose",
          "It represents the practitioner's own body",
        ],
        answer: 1,
        explain:
          "The focus's heart center is the eventual destination for the projected consciousness-essence later in the practice.",
      },
      {
        q: "What should you do if the visualization won't come clearly?",
        options: [
          "Stop the whole course",
          "Force the image through sheer effort",
          "Open your heart to the presence and trust it is there, connection matters more than the picture",
          "Switch to a completely different focus every time",
        ],
        answer: 2,
        explain: "The course is explicit that felt connection outweighs a perfect mental image.",
      },
    ],
    journalPrompts: [
      "What was easier for you today: picturing the focus clearly, or feeling its presence without a clear picture?",
      "Describe the beam or thread of connection between your crown and your focus, in whatever terms feel true to your own experience.",
    ],
  },
  {
    slug: "the-consciousness-essence",
    n: "XI",
    title: "Your Consciousness-Essence",
    subtitle:
      "Establishing the connection to your focus, and finding the luminous sphere or syllable at your heart",
    intro:
      "Rather than leave 'I-am-ness' as an abstraction, Phowa gives it a shape: a tiny, radiant sphere of light, or a seed syllable such as HRIH (compassion, the lotus family) or AH (primordial purity), resting at the heart, within the central channel.",
    sections: [
      {
        heading: "Establishing the Connection",
        body: "A bridge of light is imagined joining the open crown of the channel to the heart center of the focus above, a direct, unobstructed pathway from inside you to your refuge. This bridge is what the consciousness-essence will eventually travel.",
      },
      {
        heading: "The Luminous Sphere or Syllable",
        image: imgConsciousnessEssence,
        body: "Whichever form you choose, sphere or syllable, the qualities matter more than the exact shape: luminosity, purity, and an almost weightless buoyancy, like a feather or a bubble, capable of rising without effort. This luminous essence is visualized resting within the central channel at the level of the heart chakra, the primary seat of consciousness and subtle energy in this practice.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Visualize your focus above",
          detail: "Visualize your chosen focus above your crown, with its radiant heart center.",
          seconds: 45,
        },
        {
          title: "See the channel as light",
          detail:
            "Bring awareness to the center of your body and visualize the Sushumna as a straight, hollow tube of light.",
          seconds: 60,
        },
        {
          title: "Trace the path",
          detail:
            "Mentally trace its path from the sealed lower end, upward through the navel, heart, and throat.",
          seconds: 60,
        },
        {
          title: "Brighten with breath",
          detail:
            "With each gentle inhalation, draw luminous energy into the channel, making it brighter and more vibrant.",
          seconds: 60,
        },
        {
          title: "Open the crown",
          detail:
            "Visualize the upper end of the channel at the crown as wide open, like a radiant aperture.",
          seconds: 45,
        },
        {
          title: "Connect crown to focus",
          detail: "Connect that open crown directly to the heart center of the focus above.",
          seconds: 60,
        },
        {
          title: "Invite your essence",
          detail:
            "At your heart, within the channel, invite your consciousness-essence to appear as a tiny, brilliant sphere of white light, or a radiant white syllable.",
          seconds: 60,
        },
        {
          title: "Rest as this essence",
          detail:
            "Rest your attention here. Identify with this luminous essence, light and free, resting peacefully at your heart.",
          seconds: 90,
        },
      ],
    },
    quiz: [
      {
        q: "What two seed syllables are named in this course as options for the consciousness-essence?",
        options: ["OM and HUM", "HRIH and AH", "SO and HAM", "RAM and YAM"],
        answer: 1,
        explain:
          "HRIH (associated with compassion and the lotus family) and AH (primordial purity) are the two named options.",
      },
      {
        q: "What qualities matter most in visualizing the consciousness-essence, regardless of chosen form?",
        options: [
          "Size and color scheme",
          "Luminosity, purity, and weightless buoyancy",
          "Exact anatomical placement only",
          "Matching a specific tradition precisely",
        ],
        answer: 1,
        explain:
          "The course emphasizes the felt qualities of light, purity, and lightness over any single 'correct' form.",
      },
      {
        q: "Where does the consciousness-essence rest before its later ascent?",
        options: [
          "At the throat",
          "At the crown",
          "At the heart, within the central channel",
          "At the base of the spine",
        ],
        answer: 2,
        explain:
          "The heart chakra is the seat of the consciousness-essence prior to the ascent stages later in this course.",
      },
    ],
    journalPrompts: [
      "Did you find yourself drawn to a sphere of light, a syllable, or something else entirely? Describe it in your own words.",
      "What did 'identifying' with this essence, rather than just picturing it, actually feel like?",
    ],
  },
  {
    slug: "sealing-the-gates-and-awakening-the-crown",
    n: "XII",
    title: "Sealing the Gates and Awakening the Crown",
    subtitle: "Ensuring the correct pathway, and gently opening the Brahmarandhra",
    intro:
      "Traditional physiology counts nine gates through which consciousness or vital energy can exit the body at death. Eight lead nowhere useful for this practice; only the crown leads to liberation, so this stage seals the eight and gently opens the one.",
    sections: [
      {
        heading: "Ensuring the Correct Pathway",
        image: imgSealingTheGates,
        body: 'The nine gates: the two eyes, two ears, two nostrils, the mouth, the navel, and the lower orifice, plus the Brahmarandhra at the crown, the one gate this practice keeps open. As the yogi Naropa put it: "There are nine Gates which are of the world but there is only one which is the gate of Mahamudra. If you shut the nine Gates then you will get the Path of liberation without any doubt."',
      },
      {
        heading: "Gentle Opening of the Brahmarandhra",
        image: imgAwakeningTheCrown,
        body: 'The Brahmarandhra, at the fontanelle, is the "gate of Nirvana", often pictured as a thousand-petaled lotus. Working with it calls for extreme gentleness: sensation and receptivity, never force or physical pressure. If you experience persistent discomfort, headaches, dizziness, or unusual sensations, stop the specific visualization immediately, this stage should never be pushed through discomfort.',
      },
    ],
    practice: {
      steps: [
        {
          title: "Set the intention",
          detail:
            "With the focus above, the channel lit, and your essence resting at the heart, form a clear intention: consciousness will only travel upward and exit at the crown.",
          seconds: 45,
        },
        {
          title: "Seal the lower gates",
          detail:
            "Bring awareness to each lower gate in turn, eyes, ears, nostrils, mouth, navel, lower opening. As you focus on each, imagine it gently and completely sealed with soft, protective light.",
          seconds: 90,
        },
        {
          title: "Affirm the one open gate",
          detail:
            'Intensify the crown aperture as the one gate that remains brilliantly open. Silently affirm: "My awareness gathers at my heart and ascends only through the central path of light. All other pathways are sealed. My crown is open and receptive."',
          seconds: 60,
        },
        {
          title: "The Unfolding Lotus",
          detail:
            "Visualize a closed, thousand-petaled lotus bud at the crown. With each inhale it receives light from the focus above; with each exhale, its petals unfold, layer by layer.",
          seconds: 90,
        },
        {
          title: "The Dissolving Veil",
          detail:
            "Imagine a thin veil at the crown becoming transparent, thinning into particles of light that merge with the space above.",
          seconds: 60,
        },
        {
          title: "Receive light gently",
          detail:
            "Receive light and nectar streaming gently down from the focus above, permeating the crown. No force, no pressure, sensation and receptivity only.",
          seconds: 60,
        },
      ],
    },
    quiz: [
      {
        q: "How many gates does traditional physiology count for consciousness or vital energy to exit the body?",
        options: ["Three", "Six", "Nine", "Twelve"],
        answer: 2,
        explain:
          "Nine gates are counted: two eyes, two ears, two nostrils, the mouth, the navel, and the lower orifice, plus the crown.",
      },
      {
        q: "What is the essential safety rule when working with the crown in this stage?",
        options: [
          "Apply firm physical pressure to encourage opening",
          "No force or physical pressure, stop immediately if there is persistent discomfort, dizziness, or headache",
          "Continue regardless of any discomfort, since discomfort is expected",
          "Skip this stage entirely for all practitioners",
        ],
        answer: 1,
        explain:
          "This stage is explicit that gentleness is mandatory, and any real discomfort is a signal to stop.",
      },
      {
        q: "According to Naropa's teaching quoted in this chapter, what happens if the nine gates are shut?",
        options: [
          "Nothing in particular",
          "You get the Path of liberation without any doubt",
          "The practitioner becomes ill",
          "The practice must be restarted from the beginning",
        ],
        answer: 1,
        explain:
          "Naropa's quote directly links shutting the nine gates to certainty of the liberating path.",
      },
    ],
    journalPrompts: [
      "Did you notice any sensation at all at the crown today, warmth, tingling, spaciousness? Describe it plainly, without embellishing.",
      "Which of the two crown visualizations, the Unfolding Lotus or the Dissolving Veil, suited you better, and why?",
    ],
  },
  {
    slug: "union-of-the-bindus-and-the-ascent",
    n: "XIII",
    title: "Union of the Bindus and the Ascent",
    subtitle: "Igniting the consciousness-essence, and guiding it upward in three stages",
    intro:
      "The conscious union of the red and white bindus at the heart is understood as a real energetic event, not mere symbol, it balances opposing forces, purifies obscuration, and forges the potent vehicle consciousness will ride upward through the three stages of the ascent.",
    sections: [
      {
        heading: "Igniting the Consciousness-Essence",
        body: "The heart chakra, as the center of love, compassion, and integration, is the ideal location for this alchemical union to occur before consciousness begins its ascent. The merging transforms the individual bindus into a unified, more powerful vehicle for consciousness.",
      },
      {
        heading: "Guiding the Consciousness-Sphere Upward",
        image: imgTheAscent,
        body: "After the bindus unite at the heart, gentle breath and clear intention, not force, carry the sphere upward in three stages: heart to throat, throat to third eye, third eye to crown. Breaking the ascent into waypoints makes it learnable, rather than an all-at-once leap.",
      },
      {
        heading: "Qualities of the Ascent",
        body: 'Practiced regularly, this stage builds a well-worn energetic pathway, so the actual moment of transference feels familiar rather than sudden. As Marpa the Translator advised: "If beforehand you have become accustomed to this Path of Phowa then at the time of death you will be full of cheerful confidence."',
      },
    ],
    practice: {
      steps: [
        {
          title: "Build the sacred space",
          detail:
            "Settle into your posture. Visualize your body as a sacred temple, the central channel a crystalline pathway of light.",
          seconds: 45,
        },
        {
          title: "Place the two seeds",
          detail:
            "At the root, see the Red Bindu as a glowing seed of vital energy. At the crown, see the White Bindu as a luminous pearl of pure awareness.",
          seconds: 60,
        },
        {
          title: "Activate the Red Bindu",
          detail: "Activate the Red Bindu: it rises upward, burning away attachment as it ascends.",
          seconds: 45,
        },
        {
          title: "Let the White Bindu descend",
          detail:
            "The White Bindu dissolves into cooling nectar, flowing downward, purifying the pathway.",
          seconds: 45,
        },
        {
          title: "Let them merge at the heart",
          detail:
            "At the heart, the two converge and merge in a flash of light. What remains is a single radiant sphere, luminous, indestructible, your deathless mind.",
          seconds: 60,
        },
        {
          title: "Feel it as light as a feather",
          detail:
            "With a gentle inhale, feel the sphere become as light as a feather at the heart.",
          seconds: 45,
        },
        {
          title: "Stage 1, heart to throat",
          detail: "Guide the sphere from the heart to the throat chakra. Rest there a few breaths.",
          seconds: 60,
        },
        {
          title: "Stage 2, throat to third eye",
          detail:
            "Guide the sphere from the throat to the third eye (Ajna). Rest there a few breaths.",
          seconds: 60,
        },
        {
          title: "Stage 3, third eye to crown",
          detail:
            "Guide the sphere from the third eye to the crown. Feel its lightness and readiness.",
          seconds: 60,
        },
        {
          title: "Practice the descent too",
          detail:
            "For training, practice the descent as well, crown to third eye, to throat, back to the heart, to build control before moving on.",
          seconds: 90,
        },
      ],
    },
    quiz: [
      {
        q: "Where does the union of the red and white bindus take place?",
        options: ["At the crown", "At the throat", "At the heart chakra", "At the root chakra"],
        answer: 2,
        explain:
          "The heart, as the seat of love and integration, is where the alchemical union of the bindus occurs.",
      },
      {
        q: "What are the three named stages of the ascent?",
        options: [
          "Root to heart, heart to throat, throat to crown",
          "Heart to throat, throat to third eye, third eye to crown",
          "Crown to heart in a single stage",
          "Root to crown directly, with no waypoints",
        ],
        answer: 1,
        explain:
          "The ascent is broken into exactly these three waypoint stages, making a large leap into a learnable sequence.",
      },
      {
        q: "Why does this course also recommend practicing the descent, not only the ascent?",
        options: [
          "It has no purpose and is optional filler",
          "To build control and prevent the energy from becoming stuck, before moving on to further stages",
          "Because the ascent alone is dangerous",
          "Tradition requires an equal number of repetitions",
        ],
        answer: 1,
        explain:
          "The descent is training in control, ensuring the practitioner isn't simply pushing upward without genuine mastery.",
      },
    ],
    journalPrompts: [
      "Describe the moment of union at the heart in your own words, what, if anything, did 'a flash of light' actually feel like?",
      "Which waypoint, throat or third eye, did the sphere rest at most naturally for you today?",
    ],
  },
  {
    slug: "the-ejection-and-completing-the-practice",
    n: "XIV",
    title: "The Ejection and Completing the Practice",
    subtitle: "The training simulation, the required return and grounding, and the final blessings",
    intro:
      "A critical distinction opens this chapter: the 'ejection' of consciousness described here is a training visualization, meant to build skill and confidence, like a pilot rehearsing in a simulator. The actual, irreversible ejection of consciousness is reserved for the real moment of death.",
    sections: [
      {
        heading: "Projecting Consciousness to Your Focus",
        image: imgEjectionAndMerging,
        body: "Having built the channel, invoked the focus, sealed the gates, opened the crown, and raised the consciousness-sphere to the crown, a practitioner stands at the threshold. The ejection itself is a swift, complete transfer through the crown into union with the chosen focus, traditionally described as 'shooting like an arrow,' or a bird released from its cage.",
      },
      {
        heading: "Choosing Your Method of Release",
        body: "A focused exhalation: a short, sharp exhalation paired with intense upward intention. A sacred sound: mentally projecting, or softly voicing, 'AH!' or 'OM!'. A personal word: a single word that, for you, encapsulates release, surrender, or union with your focus. The sound matters less than the forceful, unwavering intention behind it.",
      },
      {
        heading: "The Required Return and Grounding",
        body: "Every training session must end with a conscious return: the consciousness-essence re-forms as a sphere within the heart of the focus, then descends back down the pathway of light, re-entering the crown, and settling again at the heart. This is not optional. It is what distinguishes practice from the final, real application of Phowa at death, and it is the safeguard against dissociation or energetic imbalance.",
      },
      {
        heading: "The Shower of Blessings",
        image: imgShowerOfBlessings,
        body: "After merging with the focus (in training) or as part of completing any session, a stream of luminous nectar is visualized flowing back down through the crown, filling the central channel and radiating through the body, purifying, healing, and bestowing wisdom, compassion, and longevity.",
      },
    ],
    practice: {
      steps: [
        {
          title: "Reaffirm intention",
          detail:
            "With the sphere resting at the crown, and your focus vividly present above, reaffirm your intention for this training session.",
          seconds: 45,
        },
        {
          title: "Choose your method",
          detail:
            "Choose a sharp exhalation with upward intent, a sacred sound ('AH' or 'OM'), or a personal word of release.",
          seconds: 30,
        },
        {
          title: "The training ejection",
          detail:
            "On your chosen signal, project the sphere upward with strong, decisive intention, visualizing it merging into the heart of your focus.",
          seconds: 30,
        },
        {
          title: "Rest in union",
          detail:
            "Rest in the sense of union for a few minutes, absorbing its peace. Remember: this is a training visualization only.",
          seconds: 120,
        },
        {
          title: "Re-form the sphere",
          detail:
            "Gently visualize your consciousness-essence re-forming as a sphere of light within the heart of your focus.",
          seconds: 45,
        },
        {
          title: "Descend and re-enter",
          detail:
            "Visualize this sphere descending back down the pathway of light, re-entering your crown, and settling again in your heart chakra.",
          seconds: 60,
        },
        {
          title: "Ground fully",
          detail:
            "Feel your body, your breath, your surroundings. Take a few deeper breaths. Gently move your fingers and toes. This return step is required for every training session.",
          seconds: 60,
        },
        {
          title: "Receive the shower of blessings",
          detail:
            "Visualize a stream of luminous nectar flowing down from the heart of your focus, entering through your crown, filling the channel, and radiating through your whole body.",
          seconds: 90,
        },
        {
          title: "Close",
          detail:
            "Rest for a few final breaths, letting the nectar's purifying, healing quality settle, before opening your eyes.",
          seconds: 60,
        },
      ],
    },
    quiz: [
      {
        q: "What is the essential distinction this chapter opens with?",
        options: [
          "There is no difference between training and the real moment of death",
          "The ejection described here is a training visualization; the real, irreversible ejection is reserved for actual death",
          "Ejection should never be practiced under any circumstances",
          "Only advanced teachers may attempt any part of this stage",
        ],
        answer: 1,
        explain:
          "This is the single most important safety distinction in the entire course, stated explicitly at the start of the chapter.",
      },
      {
        q: "What is required at the end of every training session, without exception?",
        options: [
          "Nothing further is needed",
          "The return and grounding, re-forming the sphere, descending it back to the heart, and physically grounding",
          "Repeating the ejection a second time",
          "Standing up immediately",
        ],
        answer: 1,
        explain:
          "The return and grounding step is described as mandatory, distinguishing safe training from the final real application.",
      },
      {
        q: "What does the final Shower of Blessings visualization involve?",
        options: [
          "Nothing. The practice simply ends after grounding",
          "Luminous nectar flowing down through the crown, filling the channel and radiating through the body",
          "A second full ejection",
          "Returning immediately to ordinary activity with no closing step",
        ],
        answer: 1,
        explain:
          "The session closes with nectar visualized as purifying, healing, and bestowing wisdom and compassion.",
      },
    ],
    journalPrompts: [
      "Which method of release, exhalation, sacred sound, or personal word, felt most natural to you, and why?",
      "Describe what grounding actually felt like today: the return to body, breath, and surroundings, in plain physical terms.",
      "If you were to write your own Conscious Transition card today, a short note asking whoever finds you to remind you of this practice, what would you want it to say?",
    ],
  },
  {
    slug: "the-complete-sequence",
    n: "XV",
    title: "The Complete Sequence",
    subtitle: "Every stage of the sadhana, gathered into one continuous sitting",
    intro:
      "This closing chapter strings every stage from Chapters I through XIV into a single, ordered practice session, posture through breath, through the central channel, chakras, refuge, heart cultivation, invoking your focus, sealing the gates, awakening the crown, uniting the bindus, the ascent, the ejection, and the required return and blessings. Use it once the individual stages feel familiar on their own; a full run takes roughly 45 to 60 minutes.",
    sections: [
      {
        heading: "How to Use This Chapter",
        body: "There is no new material here, every stage below was taught, in full, in an earlier chapter. What changes is the pacing: rather than lingering deeply on one stage per sitting, this practice moves through all sixteen in sequence, so the whole arc of the practice, from settling the body to the final blessings, can be felt as one continuous whole, the way it would actually be used at the threshold.",
      },
      {
        heading: "A Note on Safety",
        body: "The same cautions from every earlier chapter still apply here: no force at the crown, no forcing the ejection stage beyond a gentle training intention, and never skip the Return and Grounding step. This is a training simulation from beginning to end.",
      },
    ],
    practice: {
      steps: [
        {
          title: "The Lion Posture",
          detail:
            "Straight spine, open chest, chin very slightly lifted, tongue resting behind the upper front teeth. Any stable seated position works.",
          seconds: 90,
        },
        {
          title: "Three-Part Breath",
          detail:
            "Fill the abdomen, then the ribcage, then the chest on the inhale; reverse on the exhale. Once steady, visualize the breath as light rising and falling along the central channel.",
          seconds: 180,
        },
        {
          title: "Central Channel Meditation",
          detail:
            "From a spark at the base of the spine, let a hollow, luminous channel rise through navel, heart, and throat, opening at the crown like a lotus.",
          seconds: 240,
        },
        {
          title: "Chakra Awareness",
          detail:
            "Move attention root to crown: an earthen doorway, a sacred pool, a transformative fire, a boundless sky, a gateway of sound, a wisdom-eye, a cosmic portal.",
          seconds: 240,
        },
        {
          title: "Refuge",
          detail:
            "Bring your chosen focus to mind. Contemplate its qualities. Recite your refuge affirmation and rest, held.",
          seconds: 150,
        },
        {
          title: "Heart Cultivation",
          detail:
            "Loving-kindness outward in widening circles; Guru Yoga at the crown; Tonglen, breathing in suffering and out light.",
          seconds: 240,
        },
        {
          title: "Invoking Your Focus Above the Crown",
          detail:
            "Place your focus above your crown, luminous and gentle. Find its heart center. Sense the connecting beam. Recite your prayer.",
          seconds: 210,
        },
        {
          title: "Establishing the Connection",
          detail:
            "Light the central channel with breath. Open the crown wide. Connect it directly to the heart center of the focus above.",
          seconds: 180,
        },
        {
          title: "Finding Your Consciousness-Essence",
          detail:
            "At the heart, within the channel, invite your essence, a tiny sphere of white light, or a radiant syllable. Rest, identifying with it.",
          seconds: 150,
        },
        {
          title: "Sealing the Lower Gates",
          detail:
            "Seal eyes, ears, nostrils, mouth, navel, and lower opening with soft protective light. Affirm the crown as the one open gate.",
          seconds: 150,
        },
        {
          title: "Awakening the Crown",
          detail:
            "The thousand-petaled lotus unfolds gently with the breath, or a veil at the crown thins into light. No force, ever.",
          seconds: 180,
        },
        {
          title: "Union of the Bindus",
          detail:
            "Red Bindu rises from the root, White Bindu descends from the crown. They merge at the heart in a flash of light, your deathless mind.",
          seconds: 210,
        },
        {
          title: "The Ascent",
          detail:
            "Guide the sphere from heart to throat, throat to third eye, third eye to crown, resting a few breaths at each waypoint.",
          seconds: 210,
        },
        {
          title: "The Ejection (training)",
          detail:
            "With the sphere at the crown and your focus vividly present above, release with your chosen method, exhalation, sacred sound, or personal word, into union with your focus. Training only.",
          seconds: 120,
        },
        {
          title: "Return and Grounding",
          detail:
            "Re-form the sphere, descend it back through the crown to the heart. Feel your body, your breath. Move your fingers and toes. Required, every time.",
          seconds: 90,
        },
        {
          title: "The Shower of Blessings",
          detail:
            "Receive luminous nectar down through the crown, filling the channel, radiating through the whole body, before resting and opening your eyes.",
          seconds: 120,
        },
      ],
    },
    quiz: [
      {
        q: "What comes immediately after the Ascent, before the Shower of Blessings?",
        options: [
          "Sealing the Gates",
          "The Ejection (training), followed by Return and Grounding",
          "The Three-Part Breath",
          "Taking Refuge",
        ],
        answer: 1,
        explain:
          "The Ejection and its mandatory Return and Grounding sit directly between the Ascent and the final Blessings.",
      },
      {
        q: "What is the one step in this sequence that must never be skipped, in any training session?",
        options: [
          "Chakra Awareness",
          "Return and Grounding",
          "Heart Cultivation",
          "The Lion Posture",
        ],
        answer: 1,
        explain:
          "Return and Grounding is the mandatory safety step distinguishing a training session from the real, final application of Phowa.",
      },
      {
        q: "Roughly how long does a full run of the Complete Sequence take?",
        options: ["5 to 10 minutes", "45 to 60 minutes", "3 to 4 hours", "A full day"],
        answer: 1,
        explain:
          "The chapter intro estimates a full sitting at roughly 45 to 60 minutes, once every stage is already familiar on its own.",
      },
    ],
    journalPrompts: [
      "Running the whole arc in one sitting, what changed, compared to practicing single stages on their own?",
      "Which single stage, in this full run, still felt the least familiar? Consider returning to that chapter on its own before your next full sitting.",
      "After finishing, and after grounding fully, what is your honest, current relationship to your own eventual death?",
    ],
  },
  {
    slug: "for-the-moment-of-death",
    n: "XVI",
    title: "For the Moment of Death",
    subtitle: "The Phowa practitioner's final request, and preparing a card of your own",
    intro:
      "Traditional wisdom holds that consciousness may remain present for some time after clinical death, a window in which appropriate reminders from those present can meaningfully help a practitioner complete their practice. This chapter closes the course with a practical tool for that moment.",
    sections: [
      {
        heading: "The Practitioner's Final Request",
        body: "A Final Request Card serves as both a personal declaration and a practical guide for whoever is present at the time of death. It communicates your wishes regarding the handling of your body and consciousness during the critical transition period, reducing the chance of well-intentioned but counterproductive intervention.\n\nA comprehensive card typically includes: your chosen spiritual focus, instructions on positioning the body and creating a peaceful atmosphere, specific reminder phrases to be spoken aloud, and contact details for a teacher or fellow practitioner who should be notified.",
      },
      {
        heading: "Practical Considerations",
        body: "Traditional practice might call for extended periods without disturbing the body; contemporary medical and legal settings may not allow for that. Balance the spiritual ideal with what is realistically honorable in a hospital, hospice, or emergency setting. Keep the card with your identification, wallet, purse, or travel bag, and consider laminating it. Most importantly, tell the people most likely to be present at your transition that it exists, what it means, and where to find it.",
      },
    ],
    widget: "transition-card",
    practice: {
      steps: [
        {
          title: "Reflect",
          detail:
            "Sit for a few minutes with the plain fact of your own eventual death, not abstractly, but as a real, ordinary event that will happen.",
          seconds: 90,
        },
        {
          title: "Choose your words",
          detail:
            "Consider the reminder phrases on the card. Would you want them exactly as written, or in your own words? Adjust them until they feel true.",
          seconds: 90,
        },
        {
          title: "Fill in your card",
          detail:
            "Complete the Conscious Transition Card above with your name, chosen focus, and the contacts who should be notified.",
          seconds: 120,
        },
        {
          title: "Save and print",
          detail:
            "Save your details, then print the card and place it somewhere you will actually carry it.",
          seconds: 60,
        },
      ],
    },
    quiz: [
      {
        q: "Why might a Final Request Card matter even in a modern hospital or hospice setting?",
        options: [
          "It has no relevance in modern settings",
          "It communicates your wishes clearly, reducing well-intentioned but counterproductive intervention",
          "It replaces the need for any other advance directive",
          "It is only relevant for monastics",
        ],
        answer: 1,
        explain:
          "The card is a practical communication tool for whoever is present, spiritual or not, at a critical moment.",
      },
      {
        q: "What is recommended about telling others the card exists?",
        options: [
          "Keep it entirely secret",
          "Tell the people most likely to be present at your transition, and where to find it",
          "Only tell your spiritual teacher",
          "It is unnecessary to tell anyone",
        ],
        answer: 1,
        explain: "A card no one knows about, or can't find, cannot do its job.",
      },
    ],
    journalPrompts: [
      "What did it feel like to fill in your own name on a card meant to be read after your death?",
      "Who, specifically, will you tell about this card, and when will you actually tell them?",
    ],
  },
  {
    slug: "resources",
    n: "XVII",
    title: "Resources & Further Reading",
    subtitle: "Where this course's sources came from, for anyone who wants to go deeper",
    intro:
      "This course draws on a wide field of teaching on Phowa, the bardo states, and conscious dying more broadly. None of it is required reading. The practice itself is complete on its own, but each of these is a door further in, for whenever you're ready to walk through it.",
    sections: [
      {
        heading: "Core Phowa Sources",
        body: "Chagdud Tulku Rinpoche, P'howa Commentary: Instructions for the Practice of Consciousness Transference as Revealed by Rigdzin Longsal Nyingpo (Padma Publishing, 1998), the root source this course is grounded in.\n\nChagdud Tulku Rinpoche, Life in Relation to Death (Padma Publishing, 2000).\n\nSogyal Rinpoche, The Tibetan Book of Living and Dying (HarperOne, 2002).\n\nEvans-Wentz, W. Y., The Tibetan Book of the Dead (Oxford University Press, 2000).\n\nFremantle, F. & Trungpa, C., The Tibetan Book of the Dead: The Great Liberation Through Hearing in the Bardo (Shambhala, 2000).\n\nAndrew Holecek, Preparing to Die: Practical Advice and Spiritual Wisdom from the Tibetan Buddhist Tradition (Snow Lion, 2013).",
      },
      {
        heading: "On Conscious Living and Dying More Broadly",
        body: "The Dalai Lama, Advice on Dying: And Living a Better Life (Atria Books, 2002).\n\nPema Chödrön, When Things Fall Apart: Heart Advice for Difficult Times (Shambhala, 2002).\n\nStephen Levine, Who Dies?: An Investigation of Conscious Living and Conscious Dying (Anchor Books, 1989).\n\nTulku Thondup, Peaceful Death, Joyful Rebirth: A Tibetan Buddhist Guidebook (Shambhala, 2005).",
      },
      {
        heading: "The Wider Subtle Body Tradition",
        body: "Glenn H. Mullin. The Practice of the Six Yogas of Naropa (Snow Lion, 2009).\n\nLongchenpa, Finding Rest in Illusion: The Trilogy of Rest, Volume 3 (Shambhala, 2012).\n\nPatrul Rinpoche, Words of My Perfect Teacher (Yale University Press, 2011).",
      },
      {
        heading: "Beyond Any Single Tradition",
        body: "Elisabeth Kübler-Ross, On Death and Dying (Scribner, 1997).\n\nRaymond A. Moody, Life After Life (HarperOne, 2001).\n\nPim van Lommel, Consciousness Beyond Life: The Science of the Near-Death Experience (HarperOne, 2011).\n\nHuston Smith, The World's Religions (HarperOne, 2003).",
      },
    ],
    practice: {
      steps: [
        {
          title: "Browse without pressure",
          detail:
            "Read back through the list above. Notice which single title you're actually drawn to.",
          seconds: 90,
        },
        {
          title: "Choose one",
          detail:
            "Pick exactly one book or source to actually pursue next. Resist the urge to try to read all of them at once.",
          seconds: 60,
        },
        {
          title: "Set a date",
          detail:
            "Decide, concretely, when you'll obtain or start it, this week, this month. A vague intention rarely becomes a real one.",
          seconds: 60,
        },
      ],
    },
    quiz: [
      {
        q: "Which text is described as the root source this course is grounded in?",
        options: [
          "The Tibetan Book of the Dead",
          "Chagdud Tulku Rinpoche's P'howa Commentary",
          "On Death and Dying",
          "Life After Life",
        ],
        answer: 1,
        explain:
          "The P'howa Commentary, in the Rigdzin Longsal Nyingpo lineage, is the course's grounding source.",
      },
      {
        q: "Is any of this further reading required to complete the practice taught in this course?",
        options: [
          "Yes, all of it must be read first",
          "No. The practice is complete on its own; these are optional doors further in",
          "Only the first title is required",
          "Only the multi-tradition sources are required",
        ],
        answer: 1,
        explain:
          "The course is explicit that this reading list is optional depth.",
      },
    ],
    journalPrompts: [
      "Which single source from this list are you actually going to pursue, and by when?",
      "Looking back over the whole course, what is the one idea or practice you're most likely to still be doing a year from now?",
    ],
  },
];

export const phowaChapterBySlug = (slug: string) => phowaChapters.find((c) => c.slug === slug);
