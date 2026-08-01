// Prasad — what comes back when something is offered.
// The poem lines below are genuine, sourced translations.
// Blessings are original short lines written for this altar.

export type PoemPrasad = {
  kind: "poem";
  text: string;
  attribution: string; // e.g. "Rumi, trans. Coleman Barks"
};

export type BlessingPrasad = {
  kind: "blessing";
  text: string;
};

export type ImagePrasad = {
  kind: "image";
  // resolved at render time from the shared altar images already loaded on the page
};

export type SoundPrasad = {
  kind: "sound";
  text: string; // the line shown alongside the bell + golden light
};

export type Prasad = PoemPrasad | BlessingPrasad | ImagePrasad | SoundPrasad;

export const POEMS: PoemPrasad[] = [
  {
    kind: "poem",
    text: "The wound is the place where the Light enters you.",
    attribution: "Rumi, trans. Coleman Barks",
  },
  {
    kind: "poem",
    text: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.",
    attribution: "Rumi, trans. Coleman Barks & John Moyne",
  },
  {
    kind: "poem",
    text: "Let the beauty of what you love be what you do.",
    attribution: "Rumi, trans. Coleman Barks",
  },
  {
    kind: "poem",
    text: "Sell your cleverness and buy bewilderment.",
    attribution: "Rumi, trans. Coleman Barks",
  },
  {
    kind: "poem",
    text: "You were born with wings, why prefer to crawl through life?",
    attribution: "Rumi, trans. Coleman Barks",
  },
  {
    kind: "poem",
    text: "The lamps are different, but the Light is the same.",
    attribution: "Rumi, trans. R. A. Nicholson",
  },
];

export const BLESSINGS: BlessingPrasad[] = [
  {
    kind: "blessing",
    text: "May what you have offered be received, and what you need find its way back to you.",
  },
  { kind: "blessing", text: "The flame you lit is still burning, somewhere it is being seen." },
  { kind: "blessing", text: "What is given with an open hand returns with an open heart." },
  {
    kind: "blessing",
    text: "Let this offering be enough, for this moment, exactly as it is.",
  },
  { kind: "blessing", text: "You are known here. Whatever you carried in, you may set down." },
  {
    kind: "blessing",
    text: "Om Namah Shivaya — the offering and the one who offers dissolve into one.",
  },
];

export const SOUND_LINES: string[] = [
  "The bell rings once, and for a moment there is nothing to do.",
  "Let the sound finish before the next thought begins.",
  "Golden light, briefly, is not a metaphor.",
  "This is what being received sounds like.",
];

const POOL_WEIGHTS: Prasad["kind"][] = [
  "poem",
  "poem",
  "blessing",
  "blessing",
  "image",
  "sound",
  "sound",
];

export function pickPrasad(hasImages: boolean): Prasad {
  const pool = hasImages ? POOL_WEIGHTS : POOL_WEIGHTS.filter((k) => k !== "image");
  const kind = pool[Math.floor(Math.random() * pool.length)];
  switch (kind) {
    case "poem": {
      const p = POEMS[Math.floor(Math.random() * POEMS.length)];
      return { kind: "poem", text: p.text, attribution: p.attribution };
    }
    case "blessing": {
      const b = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
      return { kind: "blessing", text: b.text };
    }
    case "image":
      return { kind: "image" };
    case "sound":
    default:
      return {
        kind: "sound",
        text: SOUND_LINES[Math.floor(Math.random() * SOUND_LINES.length)],
      };
  }
}
