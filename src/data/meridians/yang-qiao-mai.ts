// Yang Qiao Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: The Four Secondary Channels.
// Runs from the heel up the lateral leg and body to the inner corner of the eye. Governs outer-body Yang / wakefulness.

import type { Meridian } from "./ren-mai";

export const yangQiaoMai: Meridian = {
  slug: "yang-qiao-mai",
  code: "YQ",
  name: "Yang Qiao Mai",
  english: "Yang Bridge Channel",
  chinese: "陽蹻脈",
  summary:
    "Runs from the heel up the lateral aspect of the leg and body to the inner corner of the eye. Governs the Yang (outer, active) aspect of the body and regulates wakefulness. Paired with Du Mai. Master Point: BL-62. Coupled Point: SI-3.",
  chartUrl: null,
  view: "front",
  image: "yang-qiao-mai.png",
  // Traced directly against the actual green path in yang-qiao-mai.png
  // (896×1200), the earlier pass's eye/ankle estimates were off; these are
  // measured from the path's actual pixel positions.
  aspect: 896 / 1200,

  points: [
    {
      code: "BL-62", pinyin: "Shen Mai", chinese: "申脈", translation: "Extending Vessel",
      x: 49, y: 93,
      location: "In the depression directly below the lateral malleolus (outer ankle bone).",
      actions: ["Master Point of the Yang Qiao Mai, regulates the outer Yang of the body."],
      indications: ["Insomnia (inability to sleep), epilepsy, lateral leg pain."],
      notes: "Held together with SI-3 to open the channel (see Practice 11, Master and Coupled Points).",
    },
    {
      code: "BL-1", pinyin: "Jing Ming", chinese: "睛明", translation: "Bright Eyes",
      x: 55, y: 8,
      location: "In the inner corner of the eye, 0.1 cun superior to the inner canthus.",
      actions: ["Terminal point of the Yang Qiao Mai; brightens the eyes."],
      indications: ["All eye disorders."],
      notes: "The meeting point of all Yang channels at the face, shared terminal point with Yin Qiao Mai.",
    },
  ],
};
