// Dai Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: Dai Mai / Belt Channel.
// The only horizontal channel in the system, encircles the waist. Points shown spread across the waistline.

import type { Meridian } from "./ren-mai";

export const daiMai: Meridian = {
  slug: "dai-mai",
  code: "GB/DM",
  name: "Dai Mai",
  english: "Belt Channel",
  chinese: "帶脈",
  summary:
    "The only horizontal channel in the body. It encircles the waist like a belt, binding and regulating all vertical channels. It originates at the Liver channel (LV-13), encircles the waist, and connects to the Gall Bladder channel. Its Master Point is GB-41; its Coupled Point is TH-5.",
  chartUrl: null,
  view: "front",
  // Recalibrated against the real dai-mai-front.png (896×1200), LV-13 through
  // GB-28 now sit on the same flank, tracking down the actual rib-to-hip line
  // in this image, instead of straddling two different sides of the body.
  images: { front: "dai-mai-front.png", back: "dai-mai-back.png", side: "dai-mai-side.png" },
  aspect: 896 / 1200,

  points: [
    {
      code: "LV-13", pinyin: "Zhang Men", chinese: "章門", translation: "Camphorwood Gate",
      x: 66, y: 33,
      location: "On the lateral side of the abdomen, below the free end of the 11th rib.",
      actions: ["Origin point of the Dai Mai.", "Front-mu of the Spleen; meeting point of all Yin organs.", "Regulates the Liver and Spleen."],
      indications: ["Hypochondriac pain.", "Digestive disorders."],
    },
    {
      code: "GB-26", pinyin: "Dai Mai", chinese: "帶脈", translation: "Belt Vessel",
      x: 68, y: 38,
      location: "Directly below the free end of the 11th rib, level with the navel.",
      actions: ["The named point of the Dai Mai, regulates the belt channel directly."],
      indications: ["Leucorrhoea, lower abdominal distension.", "Weakness of the lumbar region."],
    },
    {
      code: "GB-27", pinyin: "Wu Shu", chinese: "五樞", translation: "Five Pivots",
      x: 70, y: 44,
      location: "Anterior to the superior iliac spine, 3 cun below the level of the navel.",
      actions: ["Regulates the lower Dai Mai."],
      indications: ["Lower abdominal pain, hernia, constipation."],
      notes: "Pivotal point for the lateral hip region.",
    },
    {
      code: "GB-28", pinyin: "Wei Dao", chinese: "維道", translation: "Linking Path",
      x: 69, y: 46.5,
      location: "Anterior and inferior to the anterior superior iliac spine, 0.5 cun below GB-27.",
      actions: ["Links the Dai Mai to the lower body."],
      indications: ["Prolapse of the uterus, leucorrhoea, hip pain."],
      notes: "The most inferior point of the Dai Mai pathway.",
    },
    {
      code: "TH-5", pinyin: "Wai Guan", chinese: "外關", translation: "Outer Pass",
      x: 22, y: 45,
      location: "On the outer forearm, 2 cun above the wrist crease, between the radius and ulna.",
      actions: ["Coupled point of the Dai Mai with the Yang Wei Mai.", "Opens the lateral body; amplifies the opening of GB-41."],
      indications: ["Shoulder and neck pain, lateral headache, fever."],
      notes: "Held together with GB-41 to open the Dai Mai (see Practice 11, Master and Coupled Points).",
      onPath: false,
    },
    {
      code: "GB-41", pinyin: "Zu Lin Qi", chinese: "足臨泣", translation: "Foot Governor of Tears",
      x: 56, y: 97,
      location: "On the dorsum of the foot, in the groove between the 4th and 5th metatarsals.",
      actions: ["Master Point of the Dai Mai, opens the channel and regulates the horizontal axis."],
      indications: ["Lateral costal pain, hip pain.", "Menstrual irregularity."],
      notes: "The primary entry point for all Dai Mai work, held for 30–60 seconds to open the channel before practice.",
      onPath: false,
    },
  ],
};
