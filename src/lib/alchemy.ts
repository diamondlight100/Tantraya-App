/**
 * Alchemy progression, the seven operations of the Magnum Opus.
 *
 * Marks are earned from practice_logs:
 *   • +1  for each day with ≥1 completed practice
 *   • +3  bonus when a 7-day streak is reached (once per streak)
 *   • +10 bonus when a 30-day streak is reached (once per streak)
 *   • +2  bonus when all scheduled practices for a day are completed
 *   • +3  "balance" bonus the first time a rolling 7-day window touches
 *         3 or more of the Five Bodies (once per window, re-armed after a gap)
 *
 * Stages unlock at cumulative mark thresholds. The same stage ladder is also
 * used per-body: each of the Five Bodies climbs its own copy of these seven
 * operations, counting only the completions logged under that body layer , 
 * see computeAlchemy's optional third argument.
 */

export type AlchemyStage = {
  key: string;
  name: string;
  latin: string;
  symbol: string;          // unicode glyph
  threshold: number;       // marks required to enter this stage
  teaching: string;
};

export const alchemyStages: AlchemyStage[] = [
  {
    key: "prima-materia",
    name: "Prima Materia",
    latin: "The Unworked Stone",
    symbol: "○",
    threshold: 0,
    teaching: "The raw, unworked self. Every alchemist begins here. Practice has chosen you, not the other way round.",
  },
  {
    key: "calcinatio",
    name: "Calcination",
    latin: "Calcinatio",
    symbol: "🜂",
    threshold: 3,
    teaching: "The first fire. The dry burning away of pride and inertia. You have shown up enough times that practice is real to you.",
  },
  {
    key: "solutio",
    name: "Dissolution",
    latin: "Solutio",
    symbol: "🜄",
    threshold: 10,
    teaching: "The waters rise. What was burned is now softened. Old habits loosen their grip; the work begins to feel like its own current.",
  },
  {
    key: "separatio",
    name: "Separation",
    latin: "Separatio",
    symbol: "🜁",
    threshold: 25,
    teaching: "What is essential is sorted from what is not. You now know which practices feed you and which were borrowed.",
  },
  {
    key: "coniunctio",
    name: "Conjunction",
    latin: "Coniunctio",
    symbol: "☿",
    threshold: 55,
    teaching: "The sacred marriage. Opposites within you begin to converse, sun and moon, breath and body, will and surrender.",
  },
  {
    key: "putrefactio",
    name: "Putrefaction",
    latin: "Putrefactio · Fermentatio",
    symbol: "🜍",
    threshold: 100,
    teaching: "The black sun. The work descends into the long dark, the only stage that cannot be hurried. Faith carries what enthusiasm cannot.",
  },
  {
    key: "sublimatio",
    name: "Sublimation",
    latin: "Sublimatio",
    symbol: "🜔",
    threshold: 175,
    teaching: "Vapour rises clean from the matter. The practice has become subtler than thought, present even when you are not thinking of it.",
  },
  {
    key: "coagulatio",
    name: "Coagulation",
    latin: "Coagulatio · The Stone",
    symbol: "🜚",
    threshold: 300,
    teaching: "The Philosopher's Stone. Practice and practitioner are no longer two. You are not finished. You are begun.",
  },
];

/** The Five Bodies, the same body_layer a practice is tagged with, framed
 *  through the Kośa model that already runs through the course content
 *  (see the Tantra course's Nyāsa & Koshas chapter). Purely a display frame;
 *  the underlying enum values are unchanged. */
export type BodyLayer = "physical" | "etheric" | "emotional" | "mental" | "general";

export const bodyLayers: {
  key: BodyLayer;
  label: string;
  kosha: string;
  symbol: string;
  hint: string;
}[] = [
  { key: "physical",  label: "Physical",    kosha: "Annamaya Kośa",    symbol: "🜃", hint: "asana, qigong, movement" },
  { key: "etheric",   label: "Etheric",     kosha: "Prāṇamaya Kośa",   symbol: "🜁", hint: "pranayama, energy work" },
  { key: "emotional", label: "Emotional",   kosha: "Manomaya Kośa",    symbol: "🜄", hint: "metta, devotion, heart" },
  { key: "mental",    label: "Mental",      kosha: "Vijñānamaya Kośa", symbol: "🜂", hint: "mantra, mindfulness" },
  { key: "general",   label: "Integration", kosha: "Ānandamaya Kośa",  symbol: "🜔", hint: "ritual, integration" },
];

export type AlchemyStatus = {
  marks: number;
  currentStage: AlchemyStage;
  nextStage: AlchemyStage | null;
  progressToNext: number; // 0..1
  unlockedKeys: string[];
};

/**
 * Computes marks + current stage from raw practice log rows.
 * Each row: { log_date: 'YYYY-MM-DD', completed: boolean, practice_id: string }
 * scheduledPerDay: optional map of "YYYY-MM-DD" -> count of practices scheduled
 *   that day (used for the perfect-day bonus). Pass {} if unknown.
 * Rows may optionally carry `body_layer`, when present, a "balance" bonus is
 * added the first time a rolling 7-day window touches 3+ distinct bodies.
 * Pass a body-filtered log array (see bodyLayers above) to get that one
 * body's own progression instead of the student's overall Alchemy.
 */
export function computeAlchemy(
  logs: { log_date: string; completed: boolean; practice_id: string; body_layer?: string | null }[],
  scheduledPerDay: Record<string, number> = {},
  bonusMarks = 0,
): AlchemyStatus {
  // Group completions by date
  const byDay = new Map<string, Set<string>>();
  const bodiesByDay = new Map<string, Set<string>>();
  for (const l of logs) {
    if (!l.completed) continue;
    if (!byDay.has(l.log_date)) byDay.set(l.log_date, new Set());
    byDay.get(l.log_date)!.add(l.practice_id);
    if (l.body_layer) {
      if (!bodiesByDay.has(l.log_date)) bodiesByDay.set(l.log_date, new Set());
      bodiesByDay.get(l.log_date)!.add(l.body_layer);
    }
  }

  const days = Array.from(byDay.keys()).sort();
  let marks = 0;

  // Daily mark + perfect-day bonus
  for (const day of days) {
    marks += 1;
    const scheduled = scheduledPerDay[day];
    const completed = byDay.get(day)!.size;
    if (scheduled && completed >= scheduled) marks += 2;
  }

  // Streak bonuses, every distinct streak of 7 or 30, plus the rolling
  // balance bonus, which looks back across the trailing 7 days of activity
  // (not necessarily calendar-consecutive) for 3+ distinct bodies touched.
  let streak = 0;
  let prev: Date | null = null;
  let weeklyBonusAwarded = false;
  let monthlyBonusAwarded = false;
  let balanceBonusAwarded = false;
  const recentBodies: string[][] = []; // sliding window of the last 7 active days' body sets
  for (const day of days) {
    const d = new Date(day + "T00:00:00Z");
    if (prev) {
      const diff = (d.getTime() - prev.getTime()) / 86400000;
      if (diff === 1) {
        streak += 1;
      } else {
        streak = 1;
        weeklyBonusAwarded = false;
        monthlyBonusAwarded = false;
      }
      if (diff > 3) balanceBonusAwarded = false; // gap resets the balance window
    } else {
      streak = 1;
    }
    if (streak >= 7 && !weeklyBonusAwarded) {
      marks += 3;
      weeklyBonusAwarded = true;
    }
    if (streak >= 30 && !monthlyBonusAwarded) {
      marks += 10;
      monthlyBonusAwarded = true;
    }

    recentBodies.push(Array.from(bodiesByDay.get(day) ?? []));
    if (recentBodies.length > 7) recentBodies.shift();
    const distinctBodies = new Set(recentBodies.flat());
    if (distinctBodies.size >= 3 && !balanceBonusAwarded) {
      marks += 3;
      balanceBonusAwarded = true;
    }

    prev = d;
  }

  // Homework grades and teacher-given awards are flat additions to the same
  // total, they don't participate in the day/streak/balance logic above
  // (which only makes sense for repeatable daily practice), but they count
  // toward the same Stone and the same stage thresholds.
  marks += bonusMarks;

  let currentStage = alchemyStages[0];
  for (const s of alchemyStages) {
    if (marks >= s.threshold) currentStage = s;
  }
  const idx = alchemyStages.indexOf(currentStage);
  const nextStage = alchemyStages[idx + 1] ?? null;
  const progressToNext = nextStage
    ? Math.min(1, (marks - currentStage.threshold) / (nextStage.threshold - currentStage.threshold))
    : 1;

  const unlockedKeys = alchemyStages.filter((s) => marks >= s.threshold).map((s) => s.key);

  return { marks, currentStage, nextStage, progressToNext, unlockedKeys };
}

/** Current streak (consecutive days through today). */
export function currentStreak(logs: { log_date: string; completed: boolean }[]): number {
  const days = new Set(logs.filter((l) => l.completed).map((l) => l.log_date));
  let streak = 0;
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  // If today not done, count from yesterday so users don't lose streak mid-day
  if (!days.has(toISO(d))) d.setUTCDate(d.getUTCDate() - 1);
  while (days.has(toISO(d))) {
    streak += 1;
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return streak;
}

export function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}
