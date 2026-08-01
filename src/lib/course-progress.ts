import { useCallback, useEffect, useState } from "react";

/**
 * Course progress + journal, localStorage backed.
 * Keyed per courseSlug so multiple courses can coexist.
 */

const KEY = (course: string) => `tantraya.course.${course}`;

type CourseState = {
  completed: Record<string, boolean>;        // lessonSlug -> done
  quizScores: Record<string, number>;        // lessonSlug -> correct/total*100
  journal: Record<string, string>;           // lessonSlug -> text
};

const empty: CourseState = { completed: {}, quizScores: {}, journal: {} };

function read(course: string): CourseState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY(course));
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

function write(course: string, state: CourseState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY(course), JSON.stringify(state));
}

export function useCourseProgress(course: string) {
  const [state, setState] = useState<CourseState>(empty);

  useEffect(() => {
    setState(read(course));
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY(course)) setState(read(course));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [course]);

  const update = useCallback(
    (mut: (s: CourseState) => CourseState) => {
      setState((prev) => {
        const next = mut(prev);
        write(course, next);
        return next;
      });
    },
    [course],
  );

  return {
    state,
    isComplete: (slug: string) => !!state.completed[slug],
    score: (slug: string) => state.quizScores[slug] ?? null,
    journal: (slug: string) => state.journal[slug] ?? "",
    markComplete: (slug: string, complete = true) =>
      update((s) => ({ ...s, completed: { ...s.completed, [slug]: complete } })),
    setScore: (slug: string, pct: number) =>
      update((s) => ({ ...s, quizScores: { ...s.quizScores, [slug]: pct } })),
    setJournal: (slug: string, text: string) =>
      update((s) => ({ ...s, journal: { ...s.journal, [slug]: text } })),
    reset: () => update(() => empty),
  };
}
