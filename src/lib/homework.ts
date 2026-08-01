// Shared types & helpers for the homework system.
export type QuestionType = "mc" | "written";

export type ResponseType = "written" | "video" | "audio" | "practice" | "any";

export const responseTypeLabels: Record<ResponseType, string> = {
  written: "Written response",
  video: "Video response",
  audio: "Audio response",
  practice: "Practice log (no written response needed)",
  any: "Student's choice, written, video, or audio",
};

export interface HomeworkQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];      // mc only
  correct?: number;         // mc only, index of correct option
  points?: number;          // optional weight (defaults 1)
}

export function newQuestion(type: QuestionType): HomeworkQuestion {
  return {
    id: crypto.randomUUID(),
    type,
    prompt: "",
    points: 1,
    ...(type === "mc" ? { options: ["", ""], correct: 0 } : {}),
  };
}

export function scoreMultipleChoice(
  questions: HomeworkQuestion[],
  answers: Record<string, number | string>,
): { auto: number; max: number; correctCount: number; mcCount: number } {
  let auto = 0, max = 0, correctCount = 0, mcCount = 0;
  for (const q of questions) {
    const w = q.points ?? 1;
    max += w;
    if (q.type === "mc") {
      mcCount++;
      const a = answers[q.id];
      if (typeof a === "number" && a === q.correct) {
        auto += w;
        correctCount++;
      }
    }
  }
  return { auto, max, correctCount, mcCount };
}

export const pathwayLabels: Record<string, string> = {
  daoist: "Daoist",
  buddhist: "Buddhist",
  yogic: "Yogic",
  tantric: "Tantric",
  magick: "Magick",
  bhakti: "Bhakti",
  general: "Core",
};
