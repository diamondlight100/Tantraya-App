// Chong Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: Chong Mai / Thrusting Channel.
// The central vertical axis, running through the absolute core from perineum to crown, along which the Three Dan Tian sit.

import type { Meridian } from "./ren-mai";

export const chongMai: Meridian = {
  slug: "chong-mai",
  code: "CM",
  name: "Chong Mai",
  english: "Thrusting Channel",
  chinese: "衝脈",
  summary:
    "The Sea of Blood and the Sea of the Twelve Meridians, the most fundamental of all the Extraordinary Meridians. It runs from the perineum through the absolute center of the body to the crown, passing through all Three Dan Tian. Its Master Point is SP-4; its Coupled Point is PC-6.",
  chartUrl: null,
  view: "front",
  image: "chong-mai.png",
  // Recalibrated against the real chong-mai.png (896×1200). Note this crop
  // doesn't extend down to the feet, so SP-4 (a foot point) is shown near
  // the bottom edge as an approximation and marked off-path rather than
  // placed somewhere on the body that would misrepresent it.
  aspect: 896 / 1200,

  points: [
    {
      code: "CV-1", pinyin: "Hui Yin", chinese: "會陰", translation: "Meeting of Yin",
      x: 50, y: 84.7,
      location: "Between the genitals and the anus, at the center of the perineum.",
      actions: ["The root of the Chong Mai, the Yin pole of the central axis.", "Meeting point of Ren Mai, Du Mai and Chong Mai."],
      indications: ["Foundational grounding point for the entire energy system."],
      notes: "Anchoring this point grounds the entire column (see Practice 9, The Thrusting Channel).",
    },
    {
      code: "KD-11", pinyin: "Heng Gu", chinese: "橫骨", translation: "Pubic Bone",
      x: 47, y: 80.8,
      location: "On the superior border of the pubic symphysis, 0.5 cun lateral to the midline.",
      actions: ["The lowest point of the Chong Mai on the Kidney channel."],
      indications: ["Connects the central axis to the reproductive organs and the Jing."],
    },
    {
      code: "CV-6", pinyin: "Qi Hai", chinese: "氣海", translation: "Sea of Qi",
      x: 50, y: 76.9,
      location: "On the midline, 1.5 cun below the navel.",
      actions: ["The Lower Dan Tian reservoir on the Chong Mai.", "Primary storehouse of post-natal Qi; tonifies the central axis at the physical level."],
      indications: ["Fatigue, deficiency of all kinds."],
    },
    {
      code: "KD-21", pinyin: "You Men", chinese: "幽門", translation: "Dark Gate",
      x: 52, y: 56.3,
      location: "6 cun above the navel, 0.5 cun lateral to the midline.",
      actions: ["Upper Kidney channel point of the Chong Mai, connects the central axis to the chest and Heart."],
      indications: ["Digestive and cardiac disorders."],
    },
    {
      code: "CV-17", pinyin: "Shan Zhong", chinese: "膻中", translation: "Chest Center",
      x: 50, y: 44.8,
      location: "On the midline, at the level of the 4th intercostal space.",
      actions: ["The Middle Dan Tian on the Chong Mai, governs emotional Qi and the breath."],
      indications: ["Chest oppression, palpitations, anxiety from qi stagnation."],
      notes: "The heart of the central column.",
    },
    {
      code: "PC-6", pinyin: "Nei Guan", chinese: "內關", translation: "Inner Pass",
      x: 78, y: 54,
      location: "On the inner forearm, 2 cun above the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.",
      actions: ["Coupled Point of the Chong Mai with the Yin Wei Mai.", "Calms the Heart and settles the Shen; amplifies the opening of SP-4."],
      indications: ["Anxiety, nausea, chest oppression."],
      onPath: false,
    },
    {
      code: "SP-4", pinyin: "Gong Sun", chinese: "公孫", translation: "Grandfather Grandson",
      x: 50, y: 97,
      location: "On the medial aspect of the foot, in the depression distal and inferior to the base of the 1st metatarsal bone.",
      actions: ["Master Point of the Chong Mai, opens the channel and regulates the central axis."],
      indications: ["Digestive disorders, heart pain, menstrual irregularity."],
      notes: "The primary entry point for all Chong Mai work (see Practice 11, Master and Coupled Points). This figure is cropped above the feet, so the marker sits at the bottom edge as an approximation.",
      onPath: false,
    },
    {
      code: "GV-20", pinyin: "Bai Hui", chinese: "百會", translation: "Hundred Meetings",
      x: 50, y: 5,
      location: "At the crown of the head, on the midline.",
      actions: ["The crown apex of the Chong Mai, the Heaven connection point."],
      indications: ["Where the central axis opens to the cosmos; the seat of Shen at the top of the column."],
    },
  ],
};
