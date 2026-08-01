// Yin Qiao Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: The Four Secondary Channels.
// Runs from the heel up the medial leg and body to the inner corner of the eye. Governs inner-body Yin / the ability to fall asleep.

import type { Meridian } from "./ren-mai";

export const yinQiaoMai: Meridian = {
  slug: "yin-qiao-mai",
  code: "YnQ",
  name: "Yin Qiao Mai",
  english: "Yin Bridge Channel",
  chinese: "陰蹻脈",
  summary:
    "Runs from the heel up the medial aspect of the leg and body to the inner corner of the eye. Governs the Yin (inner, receptive) aspect of the body and regulates the ability to fall asleep. Paired with Ren Mai. Master Point: KD-6. Coupled Point: LU-7.",
  chartUrl: null,
  view: "front",
  image: "yin-qiao-mai.png",
  // Traced directly against the actual blue path in yin-qiao-mai.png
  // (896×1200). Both points sit on the same side of the body, previously
  // KD-6 and BL-1 were on opposite sides, which read as two unrelated dots
  // rather than one channel.
  aspect: 896 / 1200,

  points: [
    {
      code: "KD-6", pinyin: "Zhao Hai", chinese: "照海", translation: "Shining Sea",
      x: 54, y: 93,
      location: "In the depression 1 cun below the medial malleolus (inner ankle bone).",
      actions: ["Master Point of the Yin Qiao Mai, nourishes Yin and calms the mind."],
      indications: ["Insomnia (inability to fall asleep), anxiety, dry throat."],
      notes: "Primary point for Yin deficiency. Held together with LU-7 to open the channel (see Practice 11).",
    },
    {
      code: "BL-1", pinyin: "Jing Ming", chinese: "睛明", translation: "Bright Eyes",
      x: 52.5, y: 12,
      location: "In the inner corner of the eye, 0.1 cun superior to the inner canthus.",
      actions: ["Terminal point shared with Yang Qiao Mai, the meeting of Yin and Yang at the eye."],
      indications: ["All eye disorders and visual disturbance."],
    },
  ],
};
