// Du Mai data, figure-based (shares the reusable body figure with Ren Mai)
// Source: The Eight Extraordinary Meridians Qigong, Tantraya Center training manual, Appendix: Du Mai / Governor Channel.
// Runs from the perineum up the spine, over the crown, down the face to the upper lip.
// Represented on the shared front-view figure along the vertical centerline (schematic, the true pathway is posterior along the spine).

import type { Meridian } from "./ren-mai";

export const duMai: Meridian = {
  slug: "du-mai",
  code: "GV",
  name: "Du Mai",
  english: "Governor Channel",
  chinese: "督脈",
  summary:
    "The Sea of Yang. Rising from the perineum up the spine, over the crown, and down the face to the upper lip, Du Mai governs, commands and regulates the Yang energy of the entire body. Its paired channel in practice is the Yang Qiao Mai; its Master Point is SI-3.",
  chartUrl: null,
  view: "back",
  image: "du-mai.png",
  // Recalibrated against the real du-mai.png (896×1200, true back view).
  // GV-24 and GV-26 are front-of-face points that simply aren't visible on
  // a back view, shown near the crown for reference and marked off-path
  // rather than placed somewhere on the body that would misrepresent them.
  aspect: 896 / 1200,

  points: [
    {
      code: "GV-1", pinyin: "Chang Qiang", chinese: "長強", translation: "Lasting Strength",
      x: 50, y: 54.0,
      location: "At the base of the coccyx, between the tip of the tailbone and the anus.",
      actions: ["Root of the Du Mai, anchors Yang energy at the base of the spine."],
      indications: ["Prolapse, hemorrhoids.", "Lower back pain."],
      notes: "The root point of all rising Yang in the Microcosmic Orbit.",
    },
    {
      code: "GV-4", pinyin: "Ming Men", chinese: "命門", translation: "Gate of Life",
      x: 50, y: 40.4,
      location: "On the spine between the 2nd and 3rd lumbar vertebrae, directly opposite the navel.",
      actions: [
        "The primary Yang fire of the Kidneys.",
        "Warms the Lower Dan Tian; governs vitality, willpower and reproductive function.",
      ],
      indications: ["Fatigue, cold limbs, low vitality.", "Impotence, infertility, weak lower back."],
      notes: "One of the most important points in the body, the back counterpart of CV-4/CV-6.",
    },
    {
      code: "GV-14", pinyin: "Da Zhui", chinese: "大椎", translation: "Great Vertebra",
      x: 50, y: 13.7,
      location: "Below the spinous process of the 7th cervical vertebra, at the base of the neck.",
      actions: ["Meeting point of all six Yang channels.", "Clears heat and strengthens Wei Qi (defensive energy)."],
      indications: ["Fever, stiff neck.", "Immune deficiency, recurring colds."],
    },
    {
      code: "GV-16", pinyin: "Feng Fu", chinese: "風府", translation: "Wind Mansion",
      x: 50, y: 7.8,
      location: "In the depression at the base of the skull, directly below the occipital protuberance.",
      actions: ["Entry point of Wind into the brain.", "Calms the mind."],
      indications: ["Headache, dizziness.", "Mental agitation."],
      notes: "Gateway between the spine and the brain.",
    },
    {
      code: "GV-20", pinyin: "Bai Hui", chinese: "百會", translation: "Hundred Meetings",
      x: 50, y: 4,
      location: "At the crown of the head, on the midline, 5 cun posterior to the anterior hairline.",
      actions: ["Meeting point of all Yang channels.", "Raises Yang and lifts the spirit."],
      indications: ["Prolapse, depression, dizziness."],
      notes: "The Heaven connection point, primary point for raising Shen. Central to the Macrocosmic Orbit (Practice 10).",
    },
    {
      code: "GV-24", pinyin: "Shen Ting", chinese: "神庭", translation: "Spirit Court",
      x: 44, y: 5.7,
      location: "On the midline, 0.5 cun within the anterior hairline.",
      actions: ["Calms the mind and settles the Shen.", "Entry point of Heaven Qi into the frontal brain."],
      indications: ["Anxiety, insomnia, mental restlessness."],
      notes: "On the front hairline.",
      onPath: false,
    },
    {
      code: "GV-26", pinyin: "Ren Zhong", chinese: "人中", translation: "Middle of the Person",
      x: 56, y: 5.7,
      location: "In the philtrum, one-third of the way from the nose to the upper lip.",
      actions: ["Emergency resuscitation point, revives consciousness.", "Connects Du Mai to Ren Mai at the face."],
      indications: ["Collapse, fainting.", "Acute mental disturbance."],
      notes: "In Qigong, the tongue rising to meet the palate completes the Du Mai → Ren Mai bridge (see Practice 7, the Microcosmic Orbit). On the face.",
      onPath: false,
    },
  ],
};
