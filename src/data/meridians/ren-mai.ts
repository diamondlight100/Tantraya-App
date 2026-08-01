// Ren Mai data, figure-based (no external image required)

export type AcupuncturePoint = {
  code: string;          // e.g. "CV 8"
  pinyin: string;        // e.g. "Shenque"
  chinese: string;       // 神闕
  translation: string;   // English meaning
  /** Hotspot coordinates as % of the chart image (0–100). */
  x: number;
  y: number;
  location: string;
  actions: string[];
  indications: string[];
  notes?: string;
  /** false = a Master/Coupled "opening" point (often on a wrist/ankle, far
   *  from the channel's actual course), shown but not wired into the
   *  connecting line, and rendered with a visually distinct dashed ring so
   *  it doesn't read as if it's part of the channel's physical path. */
  onPath?: boolean;
};

export type Meridian = {
  slug: string;
  code: string;          // "CV" / "REN"
  name: string;          // "Ren Mai"
  english: string;       // "Conception Vessel"
  chinese: string;       // 任脈
  summary: string;
  chartUrl: string | null;
  /** Which reference image this channel's points are plotted against. */
  view: "front" | "back";
  /** Optional channel-specific illustration (filename in /public/meridians/)
   *  with its own line already painted in. Takes priority over `view` when set. */
  image?: string;
  /** For channels worth showing from more than one angle (e.g. Dai Mai
   *  wraps the waist), a map of available views. Points are calibrated
   *  against whichever key appears first; other views are illustration-only.
   *  Takes priority over `image` and `view` when set. */
  images?: Partial<Record<"front" | "back" | "side", string>>;
  /** Image aspect (w/h) so the container can reserve space without layout shift. */
  aspect: number;
  points: AcupuncturePoint[];
};

/**
 * Ren Mai, Conception Vessel.
 * Point information condensed from standard TCM references
 * (Deadman, Al-Khafaji & Baker; WHO Standard Acupuncture Point Locations).
 * Coordinates are first-pass estimates on the chart and can be nudged.
 */
export const renMai: Meridian = {
  slug: "ren-mai",
  code: "CV",
  name: "Ren Mai",
  english: "Conception Vessel",
  chinese: "任脈",
  summary:
    "The Sea of Yin. Rising along the anterior midline from the perineum to the lower lip, Ren Mai governs and unites all yin channels, nourishes the womb, and anchors the breath, blood and essence at the front of the body.",
  chartUrl: null,
  view: "front",
  image: "ren-mai.png",
  // Recalibrated against the real ren-mai.png (896×1200): the previous
  // coordinates were plotted on an older, differently-proportioned figure.
  aspect: 896 / 1200,

  points: [
    {
      code: "CV 1", pinyin: "Huiyin", chinese: "會陰", translation: "Meeting of Yin",
      x: 50, y: 84.6,
      location:
        "On the perineum. In men, midway between the scrotum and anus; in women, between the posterior commissure of the labia majora and the anus.",
      actions: [
        "Meeting point of Ren, Du and Chong Mai, opens all three extraordinary vessels at their root.",
        "Restores consciousness, drains damp-heat from the lower jiao.",
        "Regulates the anterior and posterior yin (genitals, urination, defecation).",
      ],
      indications: [
        "Drowning, coma, near-death revival (classical use).",
        "Genital itching/sweating, prolapse, hemorrhoids.",
        "Irregular menstruation, vaginal discharge, impotence.",
        "Difficult urination or defecation.",
      ],
      notes: "Foundational point for internal alchemy, root of the Microcosmic Orbit.",
    },
    { code: "CV 2", pinyin: "Qugu", chinese: "曲骨", translation: "Curved Bone",
      x: 50, y: 80.6,
      location: "On the midline of the lower abdomen, at the superior border of the pubic symphysis.",
      actions: ["Benefits the bladder and regulates urination.", "Warms the lower jiao and strengthens kidney yang."],
      indications: ["Retention of urine, incontinence.", "Impotence, seminal emission.", "Leucorrhoea, dysmenorrhoea."],
    },
    { code: "CV 3", pinyin: "Zhongji", chinese: "中極", translation: "Central Pole",
      x: 50, y: 77.7,
      location: "On the midline of the lower abdomen, 4 cun below the umbilicus, 1 cun above the pubic symphysis.",
      actions: ["Front-mu of the Bladder.", "Regulates the lower jiao and benefits the uterus.", "Clears damp-heat."],
      indications: ["Cystitis, urinary retention, painful urination.", "Amenorrhoea, infertility, uterine bleeding.", "Impotence, seminal emission, prostatitis."],
    },
    { code: "CV 4", pinyin: "Guanyuan", chinese: "關元", translation: "Gate of Origin",
      x: 50, y: 74.8,
      location: "On the midline of the lower abdomen, 3 cun below the umbilicus.",
      actions: [
        "Front-mu of the Small Intestine.",
        "Root point of original qi, tonifies yuan qi, yang, and kidney essence.",
        "Nourishes blood and yin; warms and stabilises the lower jiao.",
      ],
      indications: [
        "Exhaustion, collapse, deficiency cold of any kind.",
        "Impotence, infertility, irregular menstruation.",
        "Chronic diarrhoea, frequent urination.",
        "Post-partum recovery; foundational tonification point.",
      ],
      notes: "Primary dantian point, central to Qigong, moxibustion and longevity practice.",
    },
    { code: "CV 5", pinyin: "Shimen", chinese: "石門", translation: "Stone Gate",
      x: 50, y: 72.1,
      location: "On the midline, 2 cun below the umbilicus.",
      actions: ["Front-mu of the Triple Burner.", "Regulates water passages and the lower jiao."],
      indications: ["Oedema, ascites, dysuria.", "Post-partum haemorrhage, amenorrhoea.", "Classically contraindicated for moxa in women wishing to conceive."],
    },
    { code: "CV 6", pinyin: "Qihai", chinese: "氣海", translation: "Sea of Qi",
      x: 50, y: 70.6,
      location: "On the midline, 1.5 cun below the umbilicus.",
      actions: ["Tonifies and raises qi; rescues yang.", "Regulates the lower jiao and the uterus.", "Foundational point for fatigue and qi deficiency."],
      indications: ["Exhaustion, collapse, shock.", "Abdominal pain, hernia.", "Irregular menstruation, infertility, post-partum weakness.", "Nocturnal emission, impotence."],
      notes: "Lower dantian palpation point. Pair with CV 4 for deep tonification.",
    },
    { code: "CV 7", pinyin: "Yinjiao", chinese: "陰交", translation: "Yin Intersection",
      x: 50, y: 69.2,
      location: "On the midline, 1 cun below the umbilicus.",
      actions: ["Meeting point of Ren and Chong Mai.", "Regulates the uterus and benefits the lower jiao."],
      indications: ["Irregular menstruation, uterine bleeding.", "Hernia, abdominal masses.", "Pruritus of the genitals."],
    },
    { code: "CV 8", pinyin: "Shenque", chinese: "神闕", translation: "Spirit Gate",
      x: 50, y: 66.3,
      location: "At the centre of the umbilicus.",
      actions: ["Warms and rescues yang; restores consciousness.", "Tonifies original qi; stops chronic diarrhoea."],
      indications: ["Collapse with cold limbs and weak pulse (yang collapse).", "Chronic or sudden diarrhoea.", "Borborygmus, abdominal pain, prolapse of the rectum."],
      notes: "Needling forbidden, treated only with moxibustion (classically on salt or ginger).",
    },
    { code: "CV 9", pinyin: "Shuifen", chinese: "水分", translation: "Water Divide",
      x: 50, y: 63.8,
      location: "On the midline, 1 cun above the umbilicus.",
      actions: ["Regulates water passages and resolves oedema."],
      indications: ["Oedema, ascites.", "Diarrhoea with undigested food.", "Borborygmus."],
    },
    { code: "CV 10", pinyin: "Xiawan", chinese: "下脘", translation: "Lower Cavity",
      x: 50, y: 61.3,
      location: "On the midline, 2 cun above the umbilicus.",
      actions: ["Harmonises the stomach and relieves food stagnation."],
      indications: ["Indigestion, undigested food in the stool.", "Epigastric and abdominal pain, distension."],
    },
    { code: "CV 11", pinyin: "Jianli", chinese: "建里", translation: "Strengthen the Interior",
      x: 50, y: 58.8,
      location: "On the midline, 3 cun above the umbilicus.",
      actions: ["Harmonises the stomach and resolves dampness."],
      indications: ["Stomach pain, vomiting, no appetite.", "Oedema."],
    },
    { code: "CV 12", pinyin: "Zhongwan", chinese: "中脘", translation: "Central Cavity",
      x: 50, y: 56.1,
      location: "On the midline, 4 cun above the umbilicus (midway between umbilicus and the sternocostal angle).",
      actions: [
        "Front-mu of the Stomach; influential point for the Fu organs.",
        "Harmonises the middle jiao, tonifies stomach and spleen qi, resolves dampness and phlegm.",
      ],
      indications: [
        "Any stomach disorder: pain, distension, nausea, reflux, vomiting.",
        "Poor appetite, indigestion, diarrhoea.",
        "Phlegm conditions, insomnia from food stagnation.",
      ],
      notes: "One of the most clinically used points on the body.",
    },
    { code: "CV 13", pinyin: "Shangwan", chinese: "上脘", translation: "Upper Cavity",
      x: 50, y: 53.6,
      location: "On the midline, 5 cun above the umbilicus.",
      actions: ["Descends rebellious stomach qi, dissolves phlegm."],
      indications: ["Acid reflux, hiccup, vomiting.", "Epigastric pain with anxiety."],
    },
    { code: "CV 14", pinyin: "Juque", chinese: "巨闕", translation: "Great Palace",
      x: 50, y: 51.1,
      location: "On the midline, 6 cun above the umbilicus (1 cun below the sternocostal angle).",
      actions: ["Front-mu of the Heart.", "Calms the spirit, unbinds the chest, transforms phlegm in the Heart."],
      indications: ["Palpitations, anxiety, mania, manic-depression.", "Chest pain, oppression, cardiac pain.", "Acid regurgitation."],
    },
    { code: "CV 15", pinyin: "Jiuwei", chinese: "鳩尾", translation: "Dove Tail",
      x: 50, y: 48.6,
      location: "Below the xiphoid process, 7 cun above the umbilicus.",
      actions: ["Luo-connecting point of Ren Mai.", "Calms the spirit and benefits the chest."],
      indications: ["Anxiety, palpitations, manic-depression.", "Asthma, pain in the chest."],
    },
    { code: "CV 16", pinyin: "Zhongting", chinese: "中庭", translation: "Central Courtyard",
      x: 50, y: 44.0,
      location: "On the midline of the sternum, at the level of the 5th intercostal space.",
      actions: ["Unbinds the chest and descends rebellious qi."],
      indications: ["Fullness of chest, hiccup, vomiting in infants."],
    },
    { code: "CV 17", pinyin: "Shanzhong", chinese: "膻中", translation: "Chest Centre",
      x: 50, y: 41.0,
      location: "On the midline of the sternum, level with the 4th intercostal space (between the nipples in men).",
      actions: [
        "Front-mu of the Pericardium; influential point for qi; Sea of Qi point.",
        "Tonifies and regulates the qi of the chest; descends rebellious qi.",
        "Benefits the breasts and promotes lactation.",
      ],
      indications: [
        "Chest oppression, asthma, cough, shortness of breath.",
        "Palpitations and anxiety from qi stagnation in the chest.",
        "Insufficient lactation, mastitis.",
      ],
      notes: "Middle dantian, the seat of Shen and emotional resonance in Qigong.",
    },
    { code: "CV 18", pinyin: "Yutang", chinese: "玉堂", translation: "Jade Hall",
      x: 50, y: 37.9,
      location: "On the midline of the sternum, level with the 3rd intercostal space.",
      actions: ["Unbinds the chest, descends rebellious lung qi."],
      indications: ["Cough, asthma, chest pain.", "Vomiting of cold phlegm."],
    },
    { code: "CV 19", pinyin: "Zigong", chinese: "紫宮", translation: "Purple Palace",
      x: 50, y: 34.9,
      location: "On the midline of the sternum, level with the 2nd intercostal space.",
      actions: ["Unbinds the chest, descends rebellious qi."],
      indications: ["Cough, asthma, chest pain, difficulty swallowing."],
    },
    { code: "CV 20", pinyin: "Huagai", chinese: "華蓋", translation: "Florid Canopy",
      x: 50, y: 31.8,
      location: "On the midline of the sternum, level with the 1st intercostal space.",
      actions: ["Descends lung qi, unbinds the chest."],
      indications: ["Cough, asthma, throat painful and swollen.", "Chest fullness."],
    },
    { code: "CV 21", pinyin: "Xuanji", chinese: "璇璣", translation: "Jade Pivot",
      x: 50, y: 27.8,
      location: "On the midline of the sternum, 1 cun below CV 22 in the centre of the manubrium.",
      actions: ["Descends rebellious qi; benefits throat and chest."],
      indications: ["Cough, asthma, throat painful and swollen.", "Food stagnation in the chest."],
    },
    { code: "CV 22", pinyin: "Tiantu", chinese: "天突", translation: "Heavenly Chimney",
      x: 50, y: 23.8,
      location: "In the centre of the suprasternal fossa, 0.5 cun above the suprasternal notch.",
      actions: ["Descends rebellious qi, benefits the throat and voice, transforms phlegm."],
      indications: ["Asthma, cough, plum-pit qi (globus sensation).", "Loss of voice, sudden hoarseness.", "Goitre, throat painful and swollen."],
      notes: "Needling angle critical, first perpendicular ~0.2 cun, then redirect inferiorly behind the sternum.",
    },
    { code: "CV 23", pinyin: "Lianquan", chinese: "廉泉", translation: "Ridge Spring",
      x: 50, y: 19.6,
      location: "On the anterior midline of the neck, in the depression above the hyoid bone.",
      actions: ["Benefits the tongue and voice; clears wind from the tongue."],
      indications: ["Stiff or swollen tongue, sudden loss of voice.", "Post-stroke aphasia, excessive salivation, difficulty swallowing."],
    },
    { code: "CV 24", pinyin: "Chengjiang", chinese: "承漿", translation: "Container of Fluids",
      x: 50, y: 15.6,
      location: "In the depression in the centre of the mentolabial groove (below the lower lip).",
      actions: ["Meeting point of Ren, Du, Stomach and Large Intestine.", "Expels wind from the face; benefits the gums, mouth and tongue."],
      indications: ["Facial paralysis, deviation of the mouth, facial pain.", "Toothache (especially lower), gingivitis, mouth ulcers.", "Excessive salivation."],
      notes: "In Qigong, the tongue touching the upper palate bridges CV 24 to GV 26, completing the Microcosmic Orbit circuit.",
    },
  ],
};
