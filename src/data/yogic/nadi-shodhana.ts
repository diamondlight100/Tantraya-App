// Nadi Shodhana, Alternate Nostril Breathing
// Source: dictated directly by Paul, describing his own taught method , 
// a five-stage progression from bare mechanics through to channel and
// central-channel work, in the Tibetan style (straight channels rather
// than the coiled Hatha-yoga depiction).

export type NadiStage = {
  n: number;
  title: string;
  subtitle: string;
  intro: string;
  instructions: string[];
  /** The breath phase sequence for the guided pacer, in order. */
  phases: {
    label: string;
    nostril: "left" | "right" | "both" | null;
    kind: "inhale" | "exhale" | "hold";
    /** For stage 5's split hold: which half of the hold this phase represents. */
    holdHalf?: "up" | "down";
  }[];
  showChannels: boolean;
  showCentralChannel: boolean;
};

export const posture = {
  title: "Posture and hand position, the same throughout every stage",
  points: [
    "Right hand: index and middle fingers rest lightly at the eyebrow centre. Ring finger and little finger together open and close the left nostril; thumb opens and closes the right nostril. (Left-handed practitioners may swap this entirely.)",
    "No need to press hard, no deviation of the nose is needed or wanted.",
    "Left hand rests in Jñāna Mudrā, thumb tip lightly touching the index fingernail, the other three fingers extending naturally.",
    "Back of the left hand rests on the left knee. Elbow not locked, but the arm stays reasonably straight, keeping the left armpit and chest open.",
    "Right arm held slightly away from the body, enough to keep the armpit (heart meridian) open, without any strain.",
  ],
};

export const nadiStages: NadiStage[] = [
  {
    n: 1,
    title: "Stage 1, Bare mechanics",
    subtitle: "Just breathe, and observe",
    intro: "The simplest possible form: alternate the nostrils, one round, and simply notice what's there. No counting yet, just observation.",
    instructions: [
      "Inhale through the left nostril.",
      "Exhale through the right nostril.",
      "Inhale through the right nostril.",
      "Exhale through the left nostril.",
      "That's one round. Just observe, no counting, no visualization, nothing to achieve.",
    ],
    phases: [
      { label: "Inhale left", nostril: "left", kind: "inhale" },
      { label: "Exhale right", nostril: "right", kind: "exhale" },
      { label: "Inhale right", nostril: "right", kind: "inhale" },
      { label: "Exhale left", nostril: "left", kind: "exhale" },
    ],
    showChannels: false,
    showCentralChannel: false,
  },
  {
    n: 2,
    title: "Stage 2, Counting and balance",
    subtitle: "Find your count, then even it out",
    intro: "Begin counting the length of each inhale and exhale. Once you have a natural count, work toward balancing it, the same count in as out, on both sides.",
    instructions: [
      "Same sequence as Stage 1, inhale left, exhale right, inhale right, exhale left.",
      "This time, silently count the length of each breath.",
      "Once you know your natural count, aim to balance it, the same number of counts on the inhale as the exhale, and the same on both sides.",
      "Set your count below and the pacer will guide the timing for you.",
    ],
    phases: [
      { label: "Inhale left", nostril: "left", kind: "inhale" },
      { label: "Exhale right", nostril: "right", kind: "exhale" },
      { label: "Inhale right", nostril: "right", kind: "inhale" },
      { label: "Exhale left", nostril: "left", kind: "exhale" },
    ],
    showChannels: false,
    showCentralChannel: false,
  },
  {
    n: 3,
    title: "Stage 3, The channels",
    subtitle: "Left red, right white, straight down to the dan tian",
    intro: "Add the subtle-body channels, shown here in the Tibetan style, straight rather than coiled as in Hatha yoga, which is easier to hold in visualization. Left channel is red, right channel is white. Both loop back behind the eyes, run straight down along the eye-lines, and meet at the dan tian (lower belly).",
    instructions: [
      "As you inhale left, for your count, follow the breath down the left (red) channel to the dan tian.",
      "As you exhale, follow the breath up the right (white) channel.",
      "Then reverse: inhale right, following the breath down the right channel; exhale left, following it up the left channel.",
      "The central channel is visible in the diagram but not worked yet at this stage.",
    ],
    phases: [
      { label: "Inhale left, down the red channel", nostril: "left", kind: "inhale" },
      { label: "Exhale right, up the white channel", nostril: "right", kind: "exhale" },
      { label: "Inhale right, down the white channel", nostril: "right", kind: "inhale" },
      { label: "Exhale left, up the red channel", nostril: "left", kind: "exhale" },
    ],
    showChannels: true,
    showCentralChannel: false,
  },
  {
    n: 4,
    title: "Stage 4, Adding the hold",
    subtitle: "Central channel appears, but stays quiet",
    intro: "Same channel work as Stage 3, now with a hold added after each inhale, equal in length to the inhale and exhale. The central channel (blue) appears in the visualization, but is not actively worked yet.",
    instructions: [
      "Inhale left down the red channel, for your count.",
      "Hold, for the same count, simply resting, without directing the breath anywhere in particular.",
      "Exhale right up the white channel.",
      "Reverse for the other side, exactly as in Stage 3, each inhale now followed by an equal hold.",
      "Keep it soft. The hold is not a strain. It's a pause.",
    ],
    phases: [
      { label: "Inhale left, down the red channel", nostril: "left", kind: "inhale" },
      { label: "Hold", nostril: null, kind: "hold" },
      { label: "Exhale right, up the white channel", nostril: "right", kind: "exhale" },
      { label: "Inhale right, down the white channel", nostril: "right", kind: "inhale" },
      { label: "Hold", nostril: null, kind: "hold" },
      { label: "Exhale left, up the red channel", nostril: "left", kind: "exhale" },
    ],
    showChannels: true,
    showCentralChannel: true,
  },
  {
    n: 5,
    title: "Stage 5, Splitting the hold",
    subtitle: "The central channel wakes up",
    intro: "The hold from Stage 4 now divides into two halves. If your count is ten: the first five, follow the breath up the central channel while holding; the second five, follow it back down. Then exhale out of the opposite channel from the one you inhaled on.",
    instructions: [
      "Inhale left down the red channel, for your count.",
      "Begin the hold: for the first half of the count, follow the breath up the central (blue) channel.",
      "For the second half of the hold, follow it back down the central channel.",
      "Exhale, out of the opposite channel from the one you inhaled on (having inhaled left, exhale right).",
      "Reverse for the other side. Do not strain, keep this very relaxed throughout.",
    ],
    phases: [
      { label: "Inhale left, down the red channel", nostril: "left", kind: "inhale" },
      { label: "Hold, up the central channel", nostril: null, kind: "hold", holdHalf: "up" },
      { label: "Hold, down the central channel", nostril: null, kind: "hold", holdHalf: "down" },
      { label: "Exhale right", nostril: "right", kind: "exhale" },
      { label: "Inhale right, down the white channel", nostril: "right", kind: "inhale" },
      { label: "Hold, up the central channel", nostril: null, kind: "hold", holdHalf: "up" },
      { label: "Hold, down the central channel", nostril: null, kind: "hold", holdHalf: "down" },
      { label: "Exhale left", nostril: "left", kind: "exhale" },
    ],
    showChannels: true,
    showCentralChannel: true,
  },
];

export const generalNotes = [
  "Do not strain, at any stage. Keep it very relaxed throughout.",
  "How much, and how long, you practise is up to you.",
  "Stay at least a week on each stage before moving to the next.",
  "Keep the face soft, watch it for tension, and release it whenever you notice any.",
];
