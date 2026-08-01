// Trataka: The Discipline of the Steady Gaze. Condensed and reworked from
// Tantraya's own study document "A Manual of Trataka" and a companion set
// of teaching notes on eye exercises and Shambhavi Mudra. Screen-based
// gazing is deliberately excluded as a practice object throughout; the eye
// exercises are kept, reframed away from "computer eyestrain" and back
// toward their own value as preparation for the gaze itself.

export type TratakaChapter = {
  slug: string;
  n: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  widget?:
    | "eye-exercises"
    | "tratakas-list"
    | "flame-gaze"
    | "hemisphere-convergence"
    | "second-attention"
    | "akasha-descent";
  practice: { steps: { title: string; detail: string; seconds?: number }[] };
  quiz: { q: string; options: string[]; answer: number; explain: string }[];
  journalPrompts: string[];
};

export type TratakaObject = {
  name: string;
  sanskrit?: string;
  element?: string;
  description: string;
  caution?: string;
};

export const tratakaObjects: TratakaObject[] = [
  {
    name: "Candle Flame (wick tip)",
    sanskrit: "Jyoti Trataka",
    element: "Fire",
    description:
      "Our own central practice. Gaze rests on the tip of the wick, not the body of the flame, which moves and flickers. Builds awareness of the subtle element of light within the body.",
  },
  {
    name: "A Point or Dot on the Wall",
    sanskrit: "Bindu Trataka",
    element: "Earth",
    description:
      "A small dark dot at eye level, arm's length away. The plainest form of the practice, and often the first one taught, since nothing but a wall and a mark is required.",
  },
  {
    name: "Tip of the Nose",
    sanskrit: "Nasagra Drishti",
    element: "Earth",
    description:
      "Both eyes converge slightly downward and inward toward the nose-tip. Common in seated postures and certain pranayama practices, where the head stays level and the gaze alone does the work.",
  },
  {
    name: "The Eyebrow Centre",
    sanskrit: "Bhrumadhya Drishti",
    element: "—",
    description:
      "The point between and slightly above the brows, ajna. This is where the candle's afterimage is held in Jyoti Trataka's second stage, and is itself a complete gazing point on its own, eyes open or closed.",
  },
  {
    name: "The Navel",
    sanskrit: "Nabi Drishti",
    element: "Earth",
    description:
      "Used in some hatha postures to draw attention down into the centre of the body rather than out or up, balancing gazing practices that otherwise pull attention toward the head.",
  },
  {
    name: "The Thumb or a Raised Hand",
    sanskrit: "Angustha Drishti",
    element: "—",
    description:
      "Used in various asana, and in the eye-circle exercises in this course. The thumb is linked, by meridian, to the chakras of the head and neck.",
  },
  {
    name: "A Yantra",
    sanskrit: "Yantra Trataka",
    element: "Space",
    description:
      "A geometric diagram, most famously the Sri Yantra, gazed on with attention resting at the central bindu while the surrounding geometry holds the peripheral field steady. A structured field for the eye and mind to rest within and move through.",
  },
  {
    name: "An Image of a Deity or Teacher",
    sanskrit: "Murti / Guru Drishti",
    element: "—",
    description:
      "A statue, painted image, or photograph, gazed on the same way as the candle, tip of the wick swapped for the eyes of the image. Devotional gazing of this kind is one of the oldest and most widespread forms across the tradition.",
  },
  {
    name: "A Mandala",
    element: "Space",
    description:
      "Related to yantra but often more pictorial than purely geometric. Attention rests at the centre while the surrounding field is allowed to remain present at the edge of vision.",
  },
  {
    name: "Still Water",
    sanskrit: "Jala Trataka",
    element: "Water",
    description:
      "A tranquil pool, a bowl of water, or simply the image of one. Traditionally said to lead toward a tranquil flexibility and expansiveness of perception, the character of the water element itself.",
  },
  {
    name: "The Moon",
    sanskrit: "Chandra Trataka",
    element: "Water",
    description:
      "The full or near-full moon, gazed at directly in a way the sun cannot safely be. Cooling and receptive in character, traditionally associated with the ida nadi and the lunar, feminine current of the subtle body.",
  },
  {
    name: "High Clouds and the Open Sky",
    sanskrit: "Akasha Trataka / Skygazing",
    element: "Air / Space",
    description:
      "Shambhavi Mudra performed using the emptiness of the sky, or high clouds, as the resting point rather than an object. Skygazing on empty sky increases awareness of the subtle element of space; on high clouds, of air. This is the practice that can, with time, lead into skywalking, the most secret meaning of Kechari Mudra, in which awareness itself is suspended in space, both the inner space of the sushumna and the physical space at the back of the throat and sinuses.",
  },
  {
    name: "A Crystal or Gemstone",
    element: "Earth",
    description:
      "A clear or lightly coloured stone, held or set at eye level. Adds a steady, faceted quality to the gaze, and is used in some lineages as a bridge object between candle work and the more demanding emptiness of skygazing.",
  },
  {
    name: "One's Own Reflection or a Mirror",
    element: "—",
    description:
      "Trataka on the eyes of one's own reflection, or on a point just above the reflected brow-centre. A demanding and revealing practice, usually taken up only once the candle method is well established, since it tends to surface self-image material directly.",
  },
  {
    name: "The Rising or Setting Sun",
    sanskrit: "Surya Trataka",
    element: "Fire",
    description:
      "Named in the classical texts among the traditional objects of gaze, taken only in the brief window at the very edge of the horizon when the disc can be looked at without discomfort.",
    caution:
      "We do not teach or recommend this one. The margin between the traditional \"safe\" window and real retinal damage is far smaller than the old texts suggest, and the risk is permanent. Every benefit attributed to sun-gazing is also available through Chandra Trataka (the moon) or Jyoti Trataka (the candle) without that risk. If a student wants to work with solar symbolism, do it through visualisation, not the physical eyes.",
  },
];

export const tratakaChapters: TratakaChapter[] = [
  {
    slug: "foundations",
    n: "I",
    title: "Foundations of Trataka",
    subtitle: "The discipline of the steady gaze, and why the eyes come first",
    intro:
      "Trataka means steady gazing. It is counted among the shatkarmas, the six purificatory practices of hatha yoga, alongside Neti, Dhauti, Basti, Nauli, and Kapalabhati. Where those six work on the body, Trataka works directly on the eyes, and through the eyes, on the mind. It is usually introduced as a beginner's practice, a stepping stone before subtler work. That is true, but incomplete: it remains a full practice in its own right long after mastery, and it is the one piece of Core Curriculum this school has not yet given a proper home to.",
    sections: [
      {
        heading: "Why the eyes come first",
        body: "The eyes are the most restless organs of the body. Even in seated meditation, with the body still and the breath slow, the eyes continue their small movements beneath closed lids, and the mind moves with them. Steady the eyes, and the mind has far less left to hold onto. This is the principle underneath every gazing practice in this course, whichever object is eventually chosen.",
      },
      {
        heading: "The descending formula",
        body: "The whole of the practice can be stated as a single sequence, one condition giving rise to the next: when the eyes are still, the mind is still. When the mind is still, the breath slows. When the breath slows, we enter the akasha. When the akasha is rested in, samadhi awakens. This is a sequence you can verify directly, on your own cushion, with your own chosen object. Every chapter in this course returns to some part of it.",
      },
      {
        heading: "What this course will and won't include",
        body: "The classical texts describe gazing at a point on a wall, the sun or moon, the tip of the nose, a yantra, a deity's image, or a candle flame. We will look at a proper list of these, more than the average student is ever shown. This school does not practise trataka on a screen: a flame, a wall-dot, and the moon are genuinely fixed points, while a monitor flickers at a refresh rate and emits light rather than reflecting it, training exactly the wrong relationship with the eyes that this whole discipline is built to cultivate. The eye exercises that follow are kept here for their own real value.",
      },
      {
        heading: "Our central practice",
        body: "Within this school, the form we return to again and again is Jyoti Trataka, candle gazing, with attention held at the tip of the wick rather than the body of the flame. It is simple to set up, safe to practise alone, and rich enough to occupy a lifetime of refinement. Chapter Four builds the full two-stage method around it. Everything before that chapter is preparation, and everything after it is depth.",
      },
    ],
    widget: undefined,
    practice: {
      steps: [
        { title: "Sit", detail: "Find an upright seat, spine long, without straining to hold it there.", seconds: 30 },
        { title: "Notice your eyes, closed", detail: "With eyes closed, notice any small movement still happening beneath the lids. Don't stop it, just notice it is there.", seconds: 45 },
        { title: "Say the formula once, slowly", detail: "In your own mind: eyes still, mind still. Mind still, breath slows. Breath slow, akasha entered. Akasha rested in, samadhi awakens.", seconds: 40 },
        { title: "Open your eyes", detail: "Simply notice what the room looks like right now, without commentary, before moving on with your day.", seconds: 30 },
      ],
    },
    quiz: [
      {
        q: "Trataka is counted among which classical group of practices?",
        options: ["The eight limbs of Patanjali", "The shatkarmas, the six purificatory practices of hatha yoga", "The five niyamas", "The ten Mahavidyas"],
        answer: 1,
        explain: "Trataka sits among the shatkarmas alongside Neti, Dhauti, Basti, Nauli, and Kapalabhati, the one of the six that works on the eyes rather than the rest of the body.",
      },
      {
        q: "What is the correct order of the descending formula taught in this chapter?",
        options: [
          "Breath slows, eyes still, mind still, akasha, samadhi",
          "Eyes still, mind still, breath slows, akasha entered, samadhi awakens",
          "Mind still, eyes still, samadhi, breath slows, akasha",
          "Akasha entered, eyes still, breath slows, mind still, samadhi",
        ],
        answer: 1,
        explain: "The sequence runs eyes, then mind, then breath, then akasha, then samadhi, each condition arising from the one before it.",
      },
      {
        q: "Why does this course deliberately exclude screens as a trataka object?",
        options: [
          "Screens are too expensive for most students",
          "A screen flickers at a refresh rate and emits rather than reflects light, training the opposite of a steady gaze",
          "There is a religious prohibition against screens",
          "Screens are only excluded for children",
        ],
        answer: 1,
        explain: "A flame, a wall-dot, and the moon are genuinely fixed, steady points of light; a monitor flickers and works against the exact relationship with the eyes this practice is meant to build.",
      },
    ],
    journalPrompts: [
      "Where in your own daily life do your eyes rarely, if ever, come to rest on one fixed point for more than a few seconds?",
      "Read the descending formula once more. Which step, in your own experience, is hardest for you: stilling the eyes, the mind, or the breath?",
    ],
  },

  {
    slug: "preparing-the-eyes",
    n: "II",
    title: "Preparing the Eyes",
    subtitle: "Four exercises to strengthen, relax, and prepare the eye muscles before any gazing begins",
    intro:
      "Before fixing the gaze on anything, it helps to work the eye muscles directly: strengthening them, releasing tension and built-up lactic acid, and improving the raw brain-muscle connection that any steady gazing practice depends on. These four exercises are preparation for trataka, done with the head held still and only the eyes moving, ideally daily, and always before a longer gazing session.",
    sections: [
      {
        heading: "One: Focusing near and far",
        body: "Inhale slowly, deeply, and gently, while looking as far out toward the horizon as possible. Exhale slowly, deeply, and gently, and look as close in toward the brow centre as possible. Repeat nine, eighteen, or twenty-one times. This single exercise does more for the eyes' basic flexibility than almost anything else in this list, simply by asking them to actually change focal length, something most days give them very little reason to do.",
      },
      {
        heading: "Two: Shen breathing",
        body: "Shen refers to spirit, and to the upper dantien. Breathe in through the brow centre, and exhale out through the centre of the crown, the anterior fontanelle. Then inhale in through the crown and out through the bony bump at the back of the skull, directly opposite the brow centre. Then inhale in through that same bony bump and out through the crown. Finally inhale in through the crown and out through the brow centre. Repeat the full round three or nine times. This is breath directed by attention alone, no physical current is claimed, only where the awareness is asked to travel.",
      },
      {
        heading: "Three: Circles, guided by the thumb",
        body: "Sweep the eyes in the widest possible circles, clockwise nine times, then counterclockwise nine times. To help the eyes track smoothly, stretch the right arm all the way out to the side, thumb raised as if hitchhiking, and follow the thumb with the eyes alone while the face stays pointed forward. Moving only from the shoulder, sweep the arm in a slow, wide circle, following it with the eyes for nine full clockwise rotations, then switch arms for nine counterclockwise. Notice which part of each circle is hardest for the eyes to track smoothly, and give that portion extra, gentle attention. The thumb is a significant target: it is linked, by meridian, to the chakras of the head and neck.",
      },
      {
        heading: "Four: The clock face, back and forth",
        body: "With the head held still and facing forward, sweep the eyes up to twelve o'clock on an imagined, oversized clock face, then down to six o'clock, nine times, slowly. Repeat the same back-and-forth movement along the three and nine o'clock line, then one and seven, two and eight, ten and four, and finally eleven and five. Move slowly throughout, paying attention to whichever lines are hardest to hold steady, without straining or forcing past real discomfort.",
      },
    ],
    widget: "eye-exercises",
    practice: {
      steps: [
        { title: "One: Near and far", detail: "Inhale gazing to the horizon, exhale gazing to the brow centre. 9–21 rounds.", seconds: 60 },
        { title: "Two: Shen breathing", detail: "Brow to crown, crown to occiput, occiput to crown, crown to brow. 3–9 rounds.", seconds: 60 },
        { title: "Three: Circles with the thumb", detail: "Nine wide circles clockwise following the outstretched thumb, then nine counterclockwise with the other arm.", seconds: 90 },
        { title: "Four: The clock face", detail: "Sweep eyes along each of the six clock lines, nine repetitions each, head held still throughout.", seconds: 120 },
      ],
    },
    quiz: [
      {
        q: "In the near/far focusing exercise, what happens on the inhale?",
        options: ["Looking as close in to the brow centre as possible", "Looking as far out toward the horizon as possible", "Closing the eyes completely", "Rolling the eyes in a circle"],
        answer: 1,
        explain: "The inhale pairs with the far gaze toward the horizon; the exhale pairs with the close gaze toward the brow centre.",
      },
      {
        q: "In the circles exercise, why is the thumb specifically used as the tracking point rather than, say, a fingertip?",
        options: ["It's simply easier to see", "The thumb is linked by meridian to the chakras of the head and neck", "There is no particular reason", "It is a modern addition with no traditional basis"],
        answer: 1,
        explain: "The thumb carries a specific meridian connection to the head and neck chakras, which is why it, rather than any raised finger, is the traditional choice here.",
      },
      {
        q: "What is the one rule that applies to the head throughout all four exercises?",
        options: ["It should tilt gently with the eye movement", "It stays completely still; only the eyes move", "It should be tucked forward", "It rotates opposite to the eyes"],
        answer: 1,
        explain: "Every exercise in this set works the eye muscles in isolation. The head does not move at all, only the eyes.",
      },
    ],
    journalPrompts: [
      "Which of the four exercises was hardest for your eyes to do smoothly? What does that tell you about where tension tends to sit?",
      "Notice, over the coming week, whether doing this sequence before a gazing session changes how quickly your eyes settle once the gazing itself begins.",
    ],
  },

  {
    slug: "the-list-of-tratakas",
    n: "III",
    title: "The List of Tratakas",
    subtitle: "Fourteen traditional objects of gaze, and what each is said to develop",
    intro:
      "Candle gazing is our central form, but it is one member of a much wider family. Different objects are said to draw out different qualities: steadiness from solid things, flexibility from water, light from flame, and an increasing subtlety as the object itself becomes less and less solid, ending in the open sky. Knowing the range matters even for a student who never leaves the candle, because it places Jyoti Trataka correctly: one complete, sufficient form among many.",
    sections: [
      {
        heading: "How the objects are organised here",
        body: "The full list below is grouped loosely by the classical elements, earth through space, since several of the old texts describe gazing this way: solid objects for perceptual steadiness, water for a tranquil flexibility, flame for an inner light, clouds for the element of air, and the open sky itself for space. A gemstone, a mirror, and a devotional image are included as well, since all three are genuinely traditional even where they don't map neatly onto one element.",
      },
      {
        heading: "One caution, stated plainly",
        body: "The sun appears on the list because the classical texts name it. We do not teach it, for the reasons given directly on that entry. Everything the old texts attribute to sun-gazing is reachable through the moon or the candle without the risk. This is ordinary care applied to a practice whose whole aim is long-term, cumulative refinement rather than a single dramatic session that costs a student their eyesight.",
      },
      {
        heading: "Choosing an object of your own",
        body: "A student does not need to work through all fourteen. Most will do best staying with the candle for a long stretch of time before ever trying another object, since depth in one form teaches more than breadth across many. But knowing the range means an informed choice can be made later: toward water if flame feels too active, toward the sky once solid objects have grown easy, toward a teacher's image if devotion is the stronger door for that particular student.",
      },
    ],
    widget: "tratakas-list",
    practice: {
      steps: [
        { title: "Read the full list", detail: "Look through each entry in the gallery above before choosing.", seconds: 60 },
        { title: "Pick one, honestly", detail: "Choose the object that genuinely draws you right now, not the one that sounds most advanced.", seconds: 30 },
        { title: "Sit with it, briefly", detail: "If you have the object to hand, spend two or three minutes simply resting the gaze on it, softly, without any further instruction yet.", seconds: 150 },
      ],
    },
    quiz: [
      {
        q: "According to this chapter, what is traditionally said to develop from gazing on still water, Jala Trataka?",
        options: ["Perceptual steadiness", "A tranquil flexibility and expansiveness of perception", "An increase in the element of fire", "Nothing measurable"],
        answer: 1,
        explain: "Water's traditional association is with a tranquil flexibility and expansiveness of perception, distinct from the steadiness attributed to solid objects.",
      },
      {
        q: "What does this course say about Surya Trataka, gazing at the sun?",
        options: [
          "It is fully taught and encouraged as the most powerful form",
          "It is named among the classical objects but not taught here, due to the real risk of permanent eye damage",
          "It was never a traditional practice at all",
          "It is only safe at midday",
        ],
        answer: 1,
        explain: "Sun-gazing is acknowledged as classically named, but explicitly not taught, since the margin for safety is smaller than the old texts suggest and the risk is permanent, with the moon and candle offering the same benefits without it.",
      },
      {
        q: "What does skygazing on the open sky, taken far enough, traditionally lead toward?",
        options: [
          "Nothing beyond ordinary relaxation",
          "Skywalking, the most secret meaning of Kechari Mudra, where awareness is suspended in space",
          "A faster mastery of the candle practice",
          "Physical levitation",
        ],
        answer: 1,
        explain: "Skygazing using the emptiness of the sky is described as capable of leading toward skywalking, the innermost meaning given to Kechari Mudra in this teaching.",
      },
    ],
    journalPrompts: [
      "Which object on the list did you find yourself drawn to before reading any explanation of it? What might that tell you?",
      "Is there an object here you were taught to fear or dismiss in another context? Where does that reaction come from?",
    ],
  },

  {
    slug: "jyoti-trataka",
    n: "IV",
    title: "Jyoti Trataka: The Candle Practice",
    subtitle: "The full two-stage method: the open gaze, and the held afterimage",
    intro:
      "This is the complete engine of our central practice, and nothing beyond it is required. Set a candle at eye level, roughly an arm's length away, in a room dark enough that the flame is the brightest thing in your field of vision. Sit in whatever posture lets the spine stay upright without effort. Ten to twenty minutes is a full session for most practitioners; consistency across weeks matters more than length on any single day.",
    sections: [
      {
        heading: "Why an arm's length",
        body: "This distance carries real significance. It is the limit of your physical interaction with the environment without tools, the edge of what is usually called personal space, the zone reserved for family and loved ones, and it relates to the rest of your body's proportions through the golden mean. The brain already has a special relationship with this exact distance before the practice ever begins.",
      },
      {
        heading: "Stage One: the open gaze",
        body: "Begin with the eyes open. Rest your gaze on the tip of the wick, the small point where flame meets wax, rather than the body of the flame itself. This is deliberate: the wick tip is fixed, while the flame around it moves and flickers, and a gaze that follows the flame's motion lets the mind follow it too. Keep the gaze relaxed rather than forced. Let the eyelids soften. Do not blink deliberately, but do not fight the urge to blink either. Simply hold the gaze as steadily and for as long as is comfortable, letting the periphery of vision fall away. In time the flame itself will seem to still, your own attention settling into the steadiness it is being asked to hold.",
      },
      {
        heading: "Stage Two: the closed eye and the held afterimage",
        body: "Close the eyes. An afterimage of the flame appears, usually a small point or disc of light. Bring this afterimage to rest at the ajna, the point between and slightly above the eyebrows, and hold the inner gaze there. This is Shambhavi Mudra: with the physical eyes closed, the inner eyes turn upward and inward to the same point, and the afterimage is held steady rather than allowed to drift. The afterimage will move, change colour, shrink, or fade, sometimes returning two or three times before finally disappearing for good. Don't chase it if it moves; simply return attention to the ajna and let it come back or not, as it will.",
      },
      {
        heading: "The alternation",
        body: "Once the afterimage is completely gone and does not return, the closed-eye stage is finished. Rather than straining to hold an image that is no longer there, allow a few soft blinks with the eyes still closed if needed, then open the eyes and return to Stage One, gazing again at the physical flame. Repeat the two stages for as many rounds as the session allows. Open gaze, closed gaze and held afterimage, open gaze again: this alternation is the entire practice.",
      },
    ],
    widget: "flame-gaze",
    practice: {
      steps: [
        { title: "Set up", detail: "Candle at eye level, arm's length away, room dark enough that the flame is the brightest thing you see.", seconds: 30 },
        { title: "Stage One: open gaze", detail: "Rest the gaze softly on the tip of the wick. Let the eyelids soften. Hold as long as comfortable.", seconds: 90 },
        { title: "Stage Two: closed eye, afterimage at ajna", detail: "Close the eyes. Bring the afterimage to the point between the brows and hold it there without chasing it.", seconds: 90 },
        { title: "Repeat the alternation", detail: "Once the afterimage is gone, open the eyes and return to Stage One. Continue for as many rounds as the session allows.", seconds: 120 },
      ],
    },
    quiz: [
      {
        q: "Why is the gaze held on the tip of the wick rather than the body of the flame?",
        options: [
          "The wick is brighter than the flame",
          "The wick tip is a fixed point, while the flame around it moves and flickers, pulling the mind along with it if followed",
          "It is easier on the eyes",
          "There is no particular reason, either works equally well",
        ],
        answer: 1,
        explain: "The wick's tip stays put; the flame's motion does not. Fixing on the moving flame lets the mind follow the movement instead of settling.",
      },
      {
        q: "What is Shambhavi Mudra, as described in Stage Two?",
        options: [
          "A breathing technique performed with the eyes open",
          "Holding the closed-eye afterimage steady at the ajna, the inner eyes turned upward and inward to that point",
          "A hand gesture with no relation to the eyes",
          "Physically pressing on the eyebrow centre",
        ],
        answer: 1,
        explain: "Shambhavi Mudra here is specifically the closed-eye gesture of holding the inner gaze, and the afterimage, steady at the eyebrow centre.",
      },
      {
        q: "What should be done once the afterimage has completely disappeared and does not return?",
        options: [
          "Keep straining to hold the image in place",
          "End the session immediately",
          "Allow a few soft blinks if needed, open the eyes, and return to Stage One for another round",
          "Switch immediately to a different object"
        ],
        answer: 2,
        explain: "The closed-eye stage is complete once the afterimage is truly gone; rather than forcing an absent image, the practitioner returns to the open gaze and continues the alternation.",
      },
    ],
    journalPrompts: [
      "How many rounds of the open/closed alternation did you complete this session, and how did the afterimage change across them?",
      "Describe, in your own words, the moment the flame itself seemed to still. What had actually changed?",
    ],
  },

  {
    slug: "shambhavi-and-the-two-becoming-one",
    n: "V",
    title: "Shambhavi Mudra & the Two Becoming One",
    subtitle: "Non-dual awareness, and what happens in the brain and the subtle body when the two eyes converge",
    intro:
      "Shambu is another name for Shiva, the original yogi, whose primordial form is neither male nor female, form nor formless. Shambhavi is the power, the feminine aspect, the shakti, of Shambu. When Shambhavi Mudra is accomplished and held, the yogi no longer mentally divides experience into 'I' and 'that': there is no conceptual separation between the one meditating, the object meditated on, whether a candle flame, a dot on a wall, a flower, a statue, a mandala, or a deity, and the act of meditating itself. Subject, object, and act collapse into a single, undivided 'is'.",
    sections: [
      {
        heading: "How the mudra is accomplished",
        body: "Shambhavi Mudra is accomplished by doing trataka on an object, a body part such as the tip of the nose or the space between the eyebrows, or on the empty space between an object and the yogi, the open sky, or the abyss of a deep well, and then gradually withdrawing the consciousness, chitta, and the energy, prana, associated with looking, into the yogi's own central channel, the sushumna nadi, while maintaining the same gaze. Meditating with the eyes closed and staring blankly at the darkness achieves the same withdrawal, pratyahara, by keeping the prana tranquilly resting in the sushumna.",
      },
      {
        heading: "When the eyes become one",
        body: "A saying attributed to the Gospel of Thomas puts a strikingly similar instruction into different language: 'when you make the two into one... and when you make the eyes as a single eye... then you will enter the kingdom.' Different tradition, different vocabulary, the same structural claim: ordinary seeing is split, two eyes producing two slightly different images that the brain fuses into one, and a specific inward turning of that same apparatus opens onto something usually hidden behind the division itself.",
      },
      {
        heading: "What is actually happening in the brain",
        body: "Binocular convergence, the inward turning of both eyes toward a single near point such as the ajna or the tip of the nose, is one of the few voluntary acts that simultaneously engages the visual, oculomotor, and attentional systems of both cerebral hemispheres at once, and drives signal traffic across the corpus callosum, the dense band of fibres that is the brain's own literal bridge between its two halves. Ordinary daily vision rarely calls on convergence this deliberately or holds it this long. Sustained, soft convergence toward a single inner point is, quite literally, a practice of asking the two hemispheres to work as one integrated field rather than two loosely coordinated ones. Devotion pointed at a single ajna point is, among other things, a direct neurological exercise in hemispheric integration, whatever else it is as well.",
      },
      {
        heading: "The same pattern in the subtle body",
        body: "The tradition's own language for a very similar structure is ida and pingala, the two curving channels flanking the central sushumna, ida cool, lunar, receptive, associated with the left side and the feminine current, pingala hot, solar, active, associated with the right side and the masculine current. Ordinary experience runs along one or the other, alternating, rarely both at once and rarely resolved into the centre. The entire aim of hatha yoga, the union named in its own word, hatha, sun and moon, is exactly this resolution: ida and pingala brought into balance and drawn up into sushumna, the same structural move as two eyes drawn into one gaze, and two hemispheres drawn into one field. Trataka, approached this way, is a direct, physical entry point into that same union, available through the simplest possible means: a candle, a dark room, and a single fixed point.",
      },
    ],
    widget: "hemisphere-convergence",
    practice: {
      steps: [
        { title: "Settle into the candle gaze", detail: "Return to Stage One of Jyoti Trataka, gaze soft on the wick tip.", seconds: 60 },
        { title: "Feel both eyes as one instrument", detail: "Rather than 'my two eyes looking', let there simply be seeing, undivided, happening at one point.", seconds: 60 },
        { title: "Hold the closed-eye afterimage at the ajna", detail: "As in Stage Two, but this time hold the intention: the two becoming one, ida and pingala meeting at centre.", seconds: 90 },
        { title: "Rest without a further goal", detail: "Let go of trying to make anything happen. Simply remain at the point where the gaze, the mind, and the breath are no longer three separate things.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "In Shambhavi Mudra, what is the defining feature common to all its versions?",
        options: [
          "A specific hand position held throughout",
          "Non-dual awareness: no conceptual separation between meditator, meditation, and the object meditated on",
          "It can only be done with a candle",
          "It requires the eyes to remain fully open at all times",
        ],
        answer: 1,
        explain: "Every version of Shambhavi Mudra shares the same core: the collapse of the ordinary conceptual split between subject, object, and the act of meditating.",
      },
      {
        q: "What does binocular convergence toward a single near point, such as the ajna, do neurologically?",
        options: [
          "It has no measurable effect on the brain",
          "It engages the visual, oculomotor, and attentional systems of both hemispheres at once and drives traffic across the corpus callosum",
          "It only affects the left hemisphere",
          "It suppresses activity in both hemispheres equally",
        ],
        answer: 1,
        explain: "Sustained convergence is one of the few voluntary acts that recruits both hemispheres' visual and attentional systems together, via the corpus callosum, the brain's direct bridge between its two halves.",
      },
      {
        q: "How do ida and pingala relate to the 'two becoming one' theme of this chapter?",
        options: [
          "They are unrelated concepts from an entirely separate tradition",
          "Ida and pingala are the subtle-body version of the same structural move: two currents, lunar/feminine and solar/masculine, resolved into the central sushumna",
          "Ida and pingala only relate to digestion",
          "They describe two different candles used in trataka",
        ],
        answer: 1,
        explain: "Ida (lunar, receptive) and pingala (solar, active) flanking the central sushumna mirror the same pattern as two eyes drawn into one gaze and two hemispheres drawn into one field, all pointing at the same underlying resolution.",
      },
    ],
    journalPrompts: [
      "Where else in your own teaching do you already use the 'two becoming one' pattern (sun/moon, male/female, two channels, two hemispheres)? Write down at least two examples.",
      "Sit with the phrase 'when the eyes become one' for a few minutes before writing. What comes up beyond an intellectual gloss on the phrase?",
    ],
  },

  {
    slug: "the-second-attention",
    n: "VI",
    title: "The Second Attention: Holding the Chakras",
    subtitle: "A quieter thread of awareness held along the spine, underneath the gaze itself",
    intro:
      "Once the two-stage rhythm of Jyoti Trataka is familiar, a second thread of attention can be added alongside it. This runs underneath the existing gaze, a quieter awareness held at one point along the spine while the eyes continue their own work at the wick and at the ajna.",
    sections: [
      {
        heading: "Five points, base to crown",
        body: "This second attention is held at five points, moving from the base of the spine upward: the base of the spine itself (muladhara), the point opposite the pubic bone on the front of the body (svadhisthana), a point on the back at the level of the heart (the rear point of anahata), a point on the back at the level of the throat (the rear point of vishuddha), and finally the bindu, at the very back of the crown of the head. Notice that three of the five are held at the rear of the body rather than their more familiar front-facing positions. This is deliberate: holding attention at the back of the heart and throat, rather than the front, draws energy along the spine itself rather than out into the more commonly worked frontal centres.",
      },
      {
        heading: "Two ways to sequence it",
        body: "Both approaches are used within this school. Within a single session, move through all five points in one sitting, spending a portion of the session at each, base to bindu, before returning to ordinary gazing to close the practice. Across a week, hold a single point for an entire week of daily practice, then move to the next point the following week; after the fifth week, at the bindu, begin again at the base. Choose whichever suits the season of practice you are in, and feel free to move between the two approaches.",
      },
      {
        heading: "Held lightly",
        body: "In either approach, the second attention stays in the background. The primary task remains the gaze itself, at the wick and then at the ajna. The point along the spine is felt rather than stared at, the way you might remain aware of your own hands resting in your lap without looking at them. Over time this second attention tends to draw a subtle current with it, a felt sense of movement or warmth tracing the spine between whichever point is held and the ajna where the gaze rests. Let this happen without forcing it.",
      },
    ],
    widget: "second-attention",
    practice: {
      steps: [
        { title: "Begin Jyoti Trataka as usual", detail: "Stage One, gaze on the wick, settling in.", seconds: 60 },
        { title: "Add the second attention", detail: "Choose a point (or let the widget above choose it for you) and hold a light background awareness there while the gaze continues its own work.", seconds: 120 },
        { title: "Notice any current", detail: "Without forcing anything, notice whether a felt sense of movement or warmth arises between the held point and the ajna.", seconds: 60 },
        { title: "Close with plain gazing", detail: "Let the second attention go, and finish the session with a round or two of ordinary open/closed alternation.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "How many points make up the second attention sequence, and where does it begin and end?",
        options: [
          "Three points, from the heart to the crown",
          "Five points, from the base of the spine to the bindu at the back of the crown",
          "Seven points, one per classical chakra",
          "A single point held throughout, the ajna",
        ],
        answer: 1,
        explain: "The sequence runs five points from muladhara at the base of the spine up to the bindu at the back of the crown.",
      },
      {
        q: "Why are the heart and throat points held at the rear of the body rather than the front?",
        options: [
          "It's easier to feel the back of the body",
          "Holding attention at the rear draws energy along the spine itself rather than out into the more commonly worked frontal centres",
          "There is no reason given; it's arbitrary",
          "The front points are considered unsafe",
        ],
        answer: 1,
        explain: "The rear placement is deliberate, keeping the energetic pull along the spinal axis rather than out toward the frontal centres most students already work with elsewhere.",
      },
      {
        q: "How should the second attention be held in relation to the primary gaze?",
        options: [
          "As the primary focus, replacing the gaze entirely",
          "Lightly, in the background, the way you might stay aware of your hands without looking at them, while the gaze remains the primary task",
          "It should be stared at as intensely as the candle itself",
          "It can only be added after the candle practice is abandoned",
        ],
        answer: 1,
        explain: "The second attention runs underneath the gaze as a light, felt background awareness. The gaze at the wick and ajna remains the primary task throughout.",
      },
    ],
    journalPrompts: [
      "If you tried the within-session sequence, which of the five points was easiest to feel, and which was hardest?",
      "Which sequencing style, one session covering all five points, or one point per week, appeals more to how you already like to structure your own practice?",
    ],
  },

  {
    slug: "the-akashic-trance",
    n: "VII",
    title: "The Akashic Trance",
    subtitle: "How stillness of the eyes leads to stillness of mind, breath, and the opening into akasha",
    intro:
      "As the practice deepens, a further quality often appears on its own: an awareness of the space surrounding the body itself, alongside the gaze and the second attention at the spine. This is worth naming directly, because many practitioners feel it before they have any language for it, and mistake it for a distraction rather than the practice doing exactly what it is meant to do.",
    sections: [
      {
        heading: "Feeling the space around you",
        body: "We want this. Feel the space around you, the room, the air, the quiet volume that contains the body sitting in front of the candle. Let this felt sense of space be included in the practice rather than pushed aside in favour of a narrower focus.",
      },
      {
        heading: "Recognising the trance",
        body: "As the eyes still, the mind stills, and the second attention settles along the spine, a trance state tends to arise on its own. It may feel like a thickening of the space around you, a sense of depth or weight in the silence, or simply a marked slowing of thought. Recognise it when it comes. Do not analyse it or try to hold onto it by force. Simply notice it is here, and allow yourself to deepen into it, the way you might sink further into a warm bath once you notice you are already in it.",
      },
      {
        heading: "Akasha, understood directly",
        body: "Akasha is usually translated as space or ether, but within this practice it is better understood directly rather than through translation. It is the felt quality of open space that appears once the ordinary business of the eyes, the mind, and the breath has quieted enough to stop obscuring it. It was always here. The practice simply stops covering it over, letting it be recognised.",
      },
      {
        heading: "The Unforced Opening",
        body: "Samadhi arises by allowing, not by will. It is what remains once every layer standing in front of it, the moving eye, the moving mind, the moving breath, has been allowed to settle on its own. This is why the practice asks so little of you beyond patience: gaze, allow the afterimage its returns, hold the second attention lightly, and let the rest happen in its own time.",
      },
    ],
    widget: "akasha-descent",
    practice: {
      steps: [
        { title: "Settle into the gaze", detail: "Begin Jyoti Trataka as usual, or use the guided descent above.", seconds: 60 },
        { title: "Widen to include the room", detail: "Without losing the gaze itself, let awareness expand to include the space around your body along with the point of focus.", seconds: 60 },
        { title: "Notice, don't chase", detail: "If a trance-like quality arises, a thickening, a depth, a slowing, simply notice it and let yourself deepen into it.", seconds: 90 },
        { title: "Rest in whatever remains", detail: "Let go of any goal beyond this. Sit in whatever quality of space or stillness is here, for as long as the session allows.", seconds: 90 },
      ],
    },
    quiz: [
      {
        q: "What should a practitioner do when a felt sense of the surrounding space arises during gazing?",
        options: [
          "Push it aside and return to a narrower focus on the object alone",
          "Include it, letting the felt sense of space be part of the practice rather than a distraction from it",
          "Stop the session immediately",
          "Analyse it in detail before continuing",
        ],
        answer: 1,
        explain: "This felt sense of surrounding space is described as exactly what the practice is meant to open onto, and should be welcomed as it arises.",
      },
      {
        q: "How is akasha best understood, according to this chapter?",
        options: [
          "As a metaphor with no direct experiential referent",
          "As the felt quality of open space that was always present, uncovered once the eyes, mind, and breath quiet down",
          "As a physical substance that can be measured",
          "As identical to ordinary boredom",
        ],
        answer: 1,
        explain: "Akasha is described as always already present, simply obscured by the ordinary activity of eyes, mind, and breath, rather than something newly created by the practice.",
      },
      {
        q: "How does this chapter describe the arising of samadhi?",
        options: [
          "It must be forced open through sheer will and effort",
          "It is what remains once the moving eye, mind, and breath have each been allowed to settle on their own",
          "It only occurs after years of intense sun-gazing",
          "It cannot occur through gazing practices at all",
        ],
        answer: 1,
        explain: "Samadhi is presented as an unforced result, arising by allowing rather than by will, what is left once every obscuring layer, eye, mind, breath, has settled by itself.",
      },
    ],
    journalPrompts: [
      "Describe, as precisely as you can, any felt sense of 'space' or trance quality that has already arisen in your own gazing sessions, even before reading this chapter.",
      "What is your own relationship, over the years, with states that are 'recognised' rather than 'produced'? Where else in your practice does that distinction matter?",
    ],
  },

  {
    slug: "drishti-yantra-and-your-practice",
    n: "VIII",
    title: "Drishti, Yantra, and Building Your Own Practice",
    subtitle: "A first word on yantra, and putting the whole course into a sustainable weekly rhythm",
    intro:
      "Alongside the candle, the wall point, and the tip of the nose, tantric practice also gazes on the yantra, a geometric diagram that serves as a structured field for the eye and mind to rest within and move through. This closing chapter takes a first look at yantra, then turns to the practical question every student eventually asks: how does this actually fit into a week?",
    sections: [
      {
        heading: "A first word on yantra",
        body: "The Sri Yantra, most celebrated of the tantric yantras, is built from nine interlocking triangles surrounding a central point, the bindu, understood as the seed from which the entire diagram, and the entire manifest universe it represents, unfolds. A yantra is gazed on much as the candle is gazed on, attention resting on the central bindu while the surrounding geometry holds the peripheral field steady. The same descending sequence applies: stillness of eye, stillness of mind, slowing of breath, entry into akasha. A full account of yantra practice deserves, and will receive, its own dedicated study at a later point; this is only the first word on it.",
      },
      {
        heading: "Building a sustainable rhythm",
        body: "Ten to twenty minutes, most days of the week, with a candle and a dark room, will outperform a single long, dramatic session followed by weeks of nothing. Consistency, not intensity, is what actually deepens this practice. A useful default: five days a week on Jyoti Trataka itself, one day given over to a different object from the List of Tratakas to keep the wider field alive, and one day genuinely free, without any obligation to sit at all.",
      },
      {
        heading: "Care and common sense",
        body: "A softened, steady gaze should never become a painful stare. Blink naturally whenever the eyes ask for it; forcing the eyes to stay perfectly open past real discomfort teaches strain. Students with a history of migraine or photosensitive seizures should avoid any flickering flame and work instead with a steady point, such as the wall dot, rather than the candle. Contact lens wearers generally do fine with this practice but may notice more dryness; a moment of eye rest or a lubricating drop before or after a session is entirely appropriate. If real pain ever arises, distinct from ordinary tearing or mild fatigue, stop the session outright rather than pushing through it.",
      },
      {
        heading: "Where this practice actually leads",
        body: "Trataka is often taught as a stepping stone, useful only until concentration is established. In this school it is kept as a full, standing practice, because the descending formula it teaches, eyes, mind, breath, akasha, samadhi, is the same formula underneath meditation of every other kind taught here. A student who has genuinely mastered the candle has, in a very real sense, already learned the mechanics of stillness itself, in the plainest, most self-contained form this tradition offers.",
      },
    ],
    widget: undefined,
    practice: {
      steps: [
        { title: "Look at a yantra image", detail: "Bring to mind or find an image of the Sri Yantra. Rest the gaze on its central point for a minute or two.", seconds: 90 },
        { title: "Sketch your own week", detail: "Decide, right now, which five days will carry your Jyoti Trataka practice, which day will use a different object, and which day is genuinely free.", seconds: 60 },
        { title: "Say the descending formula once more", detail: "Eyes still, mind still. Mind still, breath slows. Breath slow, akasha entered. Akasha rested in, samadhi awakens.", seconds: 40 },
      ],
    },
    quiz: [
      {
        q: "What is a yantra, as described in this chapter?",
        options: [
          "Purely decorative art with no functional role in practice",
          "A geometric diagram understood as a structured field for the eye and mind to rest within and move through, gazed on with attention at the central bindu",
          "A physical object that must be burned like a candle",
          "A synonym for the eyebrow centre",
        ],
        answer: 1,
        explain: "Yantra is explicitly framed as a structured field for gazing, with attention resting at the central bindu just as it rests on the wick tip in Jyoti Trataka.",
      },
      {
        q: "What does this chapter recommend for students with a history of migraine or photosensitive seizures?",
        options: [
          "Practise the candle more often to build tolerance",
          "Avoid the flickering flame and use a steady point, such as a wall dot, instead",
          "There is no need for any adjustment",
          "Only practise at night",
        ],
        answer: 1,
        explain: "A flickering flame is specifically flagged as unsuitable for these students, who are directed toward a genuinely steady point such as the wall dot instead.",
      },
      {
        q: "According to the closing section, what does mastering the candle practice actually teach a student?",
        options: [
          "Nothing beyond basic relaxation",
          "The same descending formula, eyes, mind, breath, akasha, samadhi, that underlies meditation of every other kind taught in this school",
          "A skill useful only for other gazing practices, unrelated to meditation generally",
          "How to gaze at screens without strain",
        ],
        answer: 1,
        explain: "The chapter closes by naming the descending formula as the same mechanic underneath every other meditation taught here, making the candle practice a complete, self-contained training in stillness itself.",
      },
    ],
    journalPrompts: [
      "Write your actual weekly rhythm for this practice: which five days, which alternate object, and which day is free. Be specific enough to hold yourself to it.",
      "Looking back across all eight chapters, what is the single idea from this course you most want to bring into how you already teach meditation to your own students?",
    ],
  },
];
