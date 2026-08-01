// Curated, self-chosen student flairs, shown beside a display name in the
// Forum. Grouped by tradition purely for browsing; any student may pick any
// flair regardless of which pathway they're actually studying.

export type Flair = {
  key: string;
  glyph: string;
  label: string;
  group: "Tantric" | "Alchemical" | "Yogic" | "General";
};

export const flairs: Flair[] = [
  // Tantric
  { key: "sadhaka",              glyph: "ॐ", label: "Sādhaka",                 group: "Tantric" },
  { key: "kaula",                glyph: "✦", label: "Kaula Initiate",          group: "Tantric" },
  { key: "shakti-current",       glyph: "🜄", label: "Rider of the Shakti Current", group: "Tantric" },
  { key: "kundalini-rising",     glyph: "🜂", label: "Kuṇḍalinī Rising",        group: "Tantric" },
  { key: "dakini-student",       glyph: "☾", label: "Ḍākinī's Student",        group: "Tantric" },
  { key: "mantra-keeper",        glyph: "🔔", label: "Keeper of the Mantra",    group: "Tantric" },
  { key: "yantra-gazer",         glyph: "◈", label: "Yantra Gazer",            group: "Tantric" },
  { key: "householder-tantrika", glyph: "🏠", label: "Householder Tāntrika",    group: "Tantric" },
  { key: "fierce-grace",         glyph: "🗡", label: "Devotee of Fierce Grace", group: "Tantric" },
  { key: "chakra-wanderer",      glyph: "🌀", label: "Chakra Wanderer",         group: "Tantric" },
  { key: "left-hand-wanderer",   glyph: "🌒", label: "Walker of the Left-Hand Path", group: "Tantric" },
  { key: "goddess-eyed",         glyph: "👁", label: "Goddess-Eyed",            group: "Tantric" },

  // Alchemical
  { key: "prima-materia",           glyph: "○", label: "Prima Materia",            group: "Alchemical" },
  { key: "calcinatio",              glyph: "🜂", label: "Burning in Calcinatio",    group: "Alchemical" },
  { key: "solutio",                 glyph: "🜄", label: "Dissolving in Solutio",    group: "Alchemical" },
  { key: "coniunctio",              glyph: "☿", label: "Seeking the Coniunctio",   group: "Alchemical" },
  { key: "philosophers-apprentice", glyph: "🜚", label: "Philosopher's Apprentice", group: "Alchemical" },
  { key: "black-sun",               glyph: "🜍", label: "Walker of the Black Sun",  group: "Alchemical" },
  { key: "stone-in-progress",       glyph: "🜔", label: "The Stone, Still Forming", group: "Alchemical" },
  { key: "gold-from-lead",          glyph: "⚗", label: "Making Gold from Lead",    group: "Alchemical" },
  { key: "phoenix-ash",             glyph: "🔥", label: "Rising from Phoenix Ash",  group: "Alchemical" },
  { key: "crucible-tender",         glyph: "🜃", label: "Tender of the Crucible",   group: "Alchemical" },

  // Yogic
  { key: "hatha-yogi",         glyph: "🕉", label: "Haṭha Yogi",              group: "Yogic" },
  { key: "breath-worker",      glyph: "🌬", label: "Weaver of Breath",         group: "Yogic" },
  { key: "asana-practitioner", glyph: "🧘", label: "Sculptor of Āsana",        group: "Yogic" },
  { key: "kriya-student",      glyph: "🔥", label: "Kriyā Student",            group: "Yogic" },
  { key: "turiya-seeker",      glyph: "◐", label: "Seeker of Turīya",         group: "Yogic" },
  { key: "eight-limbs",        glyph: "✧", label: "Walking the Eight Limbs",  group: "Yogic" },
  { key: "sun-salutant",       glyph: "☀", label: "Sun Salutant",             group: "Yogic" },
  { key: "stillness-hunter",   glyph: "🪷", label: "Hunter of Stillness",      group: "Yogic" },
  { key: "prana-tender",       glyph: "💨", label: "Tender of the Prāṇa",      group: "Yogic" },

  // General / cross-tradition
  { key: "beginners-mind",   glyph: "🌱", label: "Beginner's Mind",          group: "General" },
  { key: "quiet-practice",   glyph: "☯", label: "Quiet, Steady Practice",   group: "General" },
  { key: "lifelong-student", glyph: "📖", label: "Lifelong Student",         group: "General" },
  { key: "between-worlds",   glyph: "🜁", label: "One Foot Between Worlds",  group: "General" },
  { key: "night-owl-yogi",   glyph: "🦉", label: "Night-Owl Yogi",           group: "General" },
  { key: "early-riser",      glyph: "🌅", label: "Early Riser",              group: "General" },
  { key: "still-arriving",   glyph: "🚶", label: "Still Arriving",           group: "General" },
  { key: "faithful-wobbler", glyph: "🌊", label: "Faithful Wobbler",         group: "General" },
];

export const flairByKey = (key: string | null | undefined) =>
  key ? flairs.find((f) => f.key === key) ?? null : null;
