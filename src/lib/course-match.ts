// Shared "is this freehand tag actually this course" matching, used anywhere
// a teacher's freehand course_slug/folder-name text (typed in the Materials
// admin page) needs to be matched against a real course. Teachers don't
// always type the exact slug, "mahavidya" instead of "mahavidyas", "the
// ten mahavidyas" instead of "mahavidyas", "eem" instead of
// "eight-extraordinary-meridians", etc. An exact string/slug match alone
// silently drops material into "no materials yet", which is the whole
// reason this exists.

import { slugify } from "@/lib/slugify";

// Loose title match, titles drift over time ("Eight Extraordinary
// Meridians Qigong" vs. "The Eight Extraordinary Meridians Qigong"), so an
// exact-lowercase comparison alone misses near-duplicates like that.
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/^(the|a|an)\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function titleWords(title: string): string[] {
  return normalizeTitle(title)
    .split(" ")
    .filter((w) => w.length > 2); // drop "of", "an", "&" leftovers etc.
}

// Naive singular/plural equivalence, "mahavidya" vs "mahavidyas" is the
// same word, just typed without the trailing "s".
export function wordMatches(a: string, b: string): boolean {
  return a === b || a + "s" === b || b + "s" === a;
}

export function wordInList(word: string, list: string[]): boolean {
  return list.some((w) => wordMatches(word, w));
}

// Deliberately loose in the same way as the Courses page's own dedup check:
// every significant word of one title must appear (allowing singular/plural)
// in the other, not a substring check, since a word can sit in the middle
// ("Eight Meridians" vs. "Eight Extraordinary Meridians") and still be
// obviously the same course.
function titleWordsOverlap(a: string, b: string): boolean {
  const aWords = titleWords(a);
  const bWords = titleWords(b);
  if (aWords.length === 0 || bWords.length === 0) return false;
  if (aWords.every((w) => wordInList(w, bWords))) return true;
  if (bWords.every((w) => wordInList(w, aWords))) return true;
  return false;
}

export type MatchableCourse = {
  slug: string;
  title?: string;
  /** Other course_slug values (or freehand phrases) known to mean this
   *  course, exact slugified equality, not word matching. */
  aliases?: string[];
};

/**
 * Whether a freehand-typed tag (a material's course_slug, or a folder name)
 * should count as belonging to `course`. Tries, in order: exact slug match,
 * exact match against a registered alias, then a loose word-based title
 * match (tolerant of reordering, partial titles, and singular/plural
 * drift) between the tag and the course's real title.
 */
export function matchesCourse(taggedValue: string, course: MatchableCourse): boolean {
  if (!taggedValue.trim()) return false;
  const tagged = slugify(taggedValue);
  const acceptedSlugs = new Set([course.slug, ...(course.aliases ?? [])].map(slugify));
  if (acceptedSlugs.has(tagged)) return true;
  if (course.title && titleWordsOverlap(taggedValue.replace(/[-_]+/g, " "), course.title)) {
    return true;
  }
  return false;
}
