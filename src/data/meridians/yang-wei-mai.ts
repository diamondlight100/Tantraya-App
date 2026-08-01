// Yang Wei Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: The Four Secondary Channels.
// Links and integrates all Yang channels, maintaining coherence of the exterior over time.

import type { Meridian } from "./ren-mai";

export const yangWeiMai: Meridian = {
  slug: "yang-wei-mai",
  code: "YW",
  name: "Yang Wei Mai",
  english: "Yang Linking Channel",
  chinese: "陽維脈",
  summary:
    "Links and integrates all Yang channels of the body, maintaining coherence of the exterior over time. Governs the body's relationship with the external world. Paired with Dai Mai. Master Point: TH-5. Coupled Point: GB-41.",
  chartUrl: null,
  view: "front",
  image: "yang-wei-mai.png",
  // Traced directly against the actual orange path in yang-wei-mai.png
  // (896×1200), the earlier pass extrapolated these from Yang Qiao Mai's
  // proportions, but the two images are centered differently, which put
  // both points off. These are now measured against this image's own path.
  aspect: 896 / 1200,

  points: [
    {
      code: "TH-5", pinyin: "Wai Guan", chinese: "外關", translation: "Outer Pass",
      x: 52, y: 47,
      location: "On the outer forearm, 2 cun above the wrist crease, between the radius and ulna.",
      actions: ["Master Point of the Yang Wei Mai, integrates all Yang channels."],
      indications: ["Fever, chills, lateral headache, shoulder pain."],
      notes: "The primary point for exterior conditions. Held together with GB-41 to open the channel (see Practice 11).",
    },
    {
      code: "GB-35", pinyin: "Yang Jiao", chinese: "陽交", translation: "Yang Intersection",
      x: 47, y: 81,
      location: "7 cun above the tip of the lateral malleolus, on the posterior border of the fibula.",
      actions: ["Xi-cleft point of the Yang Wei Mai, treats acute conditions of the Yang Wei."],
      indications: ["Chest fullness, leg pain."],
    },
  ],
};
