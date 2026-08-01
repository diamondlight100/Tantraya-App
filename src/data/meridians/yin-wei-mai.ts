// Yin Wei Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: The Four Secondary Channels.
// Links and integrates all Yin channels, maintaining coherence of the interior over time.

import type { Meridian } from "./ren-mai";

export const yinWeiMai: Meridian = {
  slug: "yin-wei-mai",
  code: "YnW",
  name: "Yin Wei Mai",
  english: "Yin Linking Channel",
  chinese: "陰維脈",
  summary:
    "Links and integrates all Yin channels of the body, maintaining coherence of the interior over time. Governs the body's relationship with its own inner life, particularly the Heart and emotional continuity. Paired with Chong Mai. Master Point: PC-6. Coupled Point: SP-4.",
  chartUrl: null,
  view: "front",
  image: "yin-wei-mai.png",
  // Recalibrated against the real yin-wei-mai.png (896×1200, front view) , 
  // throat points aligned with the same landmark used on Ren Mai.
  aspect: 896 / 1200,

  points: [
    {
      code: "KI-9", pinyin: "Zhu Bin", chinese: "築賓", translation: "Guest House",
      x: 54, y: 85,
      location: "On the medial calf, roughly 5 cun above the medial malleolus, in line with the Achilles tendon.",
      actions: ["Xi-cleft point of the Yin Wei Mai, the channel's root on the leg."],
      indications: ["Calf pain, anxiety, detoxification."],
      notes: "The lower origin of the pathway traced up through the torso to the throat.",
    },
    {
      code: "LV-14", pinyin: "Qi Men", chinese: "期門", translation: "Cycle Gate",
      x: 54, y: 34,
      location: "Directly below the nipple, in the 6th intercostal space.",
      actions: ["Meeting point of the Yin Wei Mai on the chest, smooths the flow of Liver Qi."],
      indications: ["Chest and rib pain, emotional constriction."],
    },
    {
      code: "CV-23", pinyin: "Lian Quan", chinese: "廉泉", translation: "Ridge Spring",
      x: 50, y: 13.5,
      location: "Above the Adam's apple, in the depression above the hyoid bone.",
      actions: ["Upper meeting point of the Yin Wei Mai, treats throat disorders and difficulty speaking."],
      indications: ["Connects the Yin interior to the voice."],
    },
    {
      code: "CV-22", pinyin: "Tian Tu", chinese: "天突", translation: "Celestial Chimney",
      x: 50, y: 16,
      location: "In the center of the suprasternal fossa, at the base of the throat.",
      actions: ["Terminal meeting point of the Yin Wei Mai with the Ren Mai, opens the throat."],
      indications: ["Cough, emotional constriction in the chest."],
    },
    {
      code: "PC-6", pinyin: "Nei Guan", chinese: "內關", translation: "Inner Pass",
      x: 80, y: 48,
      location: "On the inner forearm, 2 cun above the wrist crease, between the tendons.",
      actions: ["Master Point of the Yin Wei Mai, integrates all Yin channels.", "Calms the Heart and settles the Shen."],
      indications: ["Anxiety, chest pain, nausea."],
      notes: "Held together with SP-4 to open the channel (see Practice 11, Master and Coupled Points). Not on the throat-to-leg course itself, an activation point on the wrist.",
      onPath: false,
    },
  ],
};
