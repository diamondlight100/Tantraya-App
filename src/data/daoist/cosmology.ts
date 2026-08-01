export type CosmologyHotspot = {
  id: string;
  label: string;
  /** Position of the hotspot marker as a percentage of the map image's width/height. */
  x: number;
  y: number;
  body: string;
};

export const daoistCosmologyIntro =
  "The diagram is the standard Daoist generative sequence, Wu Chi unfolding down into the Ba Gua. Tap any marker on the map to open that tier.";

export const daoistCosmologyHotspots: CosmologyHotspot[] = [
  {
    id: "wuchi",
    label: "Wu Chi: the Great Void",
    x: 49.8,
    y: 6,
    body: "Wu Chi names the state before any distinction has been drawn: an undifferentiated wholeness in which yin and yang are already present, simply not yet separated out. It is full, not empty — every later tier of this map is already latent here. The empty circle is drawn without any yin-yang division for exactly this reason.",
  },
  {
    id: "taichi",
    label: "Tai Chi: the Ridgepole",
    x: 51.4,
    y: 22,
    body: "Where Wu Chi is undifferentiated wholeness, Tai Chi is that same wholeness the moment yin and yang become distinguishable within it and begin moving relative to each other. The word carries the sense of a ridgepole, a central pivot holding two things in relation without either cancelling the other. The yin-yang symbol pictures this turning, each half already carrying the seed of the other at its own centre.",
  },
  {
    id: "trigrams",
    label: "The bigrams and trigrams",
    x: 49.8,
    y: 49.5,
    body: "From Yang and Yin, each divides again into itself and its opposite, giving the four bigrams, and again into the eight trigrams. Each division simply makes explicit what the tier above already held implicitly. By three lines, every possible combination of yin and yang across three positions has appeared — the eight trigrams are that complete set, full stop. Heaven, lake, fire, thunder, wind, water, mountain, and earth are read onto a structure that was already comprehensive before the images were attached to it.",
  },
  {
    id: "bagua",
    label: "The circle: Ba Gua",
    x: 49.8,
    y: 63,
    body: "Laid out in a line, the eight trigrams look like a sequence with two ends. Folded into the Ba Gua circle, that appearance disappears — the same eight trigrams, now arranged around Tai Chi at the centre, each trigram's opposite sitting directly across from it. The line and the circle are the same eight trigrams; the circle simply shows what was true of them all along.",
  },
  {
    id: "dao",
    label: "What the map points beyond",
    x: 51.4,
    y: 81.5,
    body: "It's tempting to read this as one movement, once, from void down into the ten thousand things. Wu Chi differentiating into the ten thousand things and the ten thousand things resolving back into Wu Chi are the same single activity, happening at once, everywhere, continuously — the way the folded circle's two ends turn out to be the same point met from both directions. None of this waits in time or crosses space the way a journey does; at the very same time, it is exactly what shows up as time and space. The Dao De Jing's opening line says the Dao that can be spoken is not the constant Dao, and the Dao, unnamed, is nonetheless entirely present as this: the void differentiating, yin and yang turning into each other, every apparent end a beginning met from the other side.",
  },
];
