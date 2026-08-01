import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { computeAlchemy, bodyLayers, type AlchemyStatus } from "@/lib/alchemy";

type PracticeRow = { id: string; days_of_week: number[] | null; active: boolean };
type LogRow = { log_date: string; completed: boolean; practice_id: string; body_layer: string | null };

/**
 * The one place "how many Alchemy marks does this student have" gets
 * computed. Used by both the Practice Organiser's Alchemy tab and the
 * Progress page, so they always agree, previously they used two different
 * calculations and could show two different stages for the same student.
 *
 * Total = practice completions (with streak/perfect-day/balance bonuses)
 *       + graded homework's awarded alchemy marks
 *       + teacher-given award marks.
 *
 * The Five Bodies breakdown stays practice-only by nature, homework and
 * awards aren't tagged to a body, so they only affect the overall Stone.
 */
export function useOverallAlchemy() {
  const { user } = useAuth();

  const { data: practices = [] } = useQuery({
    queryKey: ["practices", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("id, days_of_week, active")
        .eq("active", true);
      if (error) throw error;
      return (data ?? []) as PracticeRow[];
    },
  });

  const { data: logs = [] } = useQuery({
    queryKey: ["practice_logs", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practice_logs")
        .select("id, practice_id, log_date, completed, body_layer")
        .order("log_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LogRow[];
    },
  });

  const { data: homeworkMarks = 0 } = useQuery({
    queryKey: ["homework-alchemy-marks", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homework_submissions")
        .select("alchemy_marks_awarded")
        .eq("student_id", user!.id)
        .eq("status", "graded");
      if (error) throw error;
      return (data ?? []).reduce((s, x) => s + (x.alchemy_marks_awarded ?? 0), 0);
    },
  });

  const { data: awardMarks = 0 } = useQuery({
    queryKey: ["student-award-marks", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_awards")
        .select("alchemy_marks")
        .eq("student_id", user!.id);
      if (error) throw error;
      return (data ?? []).reduce((s, x) => s + (x.alchemy_marks ?? 0), 0);
    },
  });

  const KARMA_TO_ALCHEMY = 5;
  const { data: karmaPoints = 0 } = useQuery({
    queryKey: ["karma-points", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("karma_logs")
        .select("karma_points")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).reduce((s, x) => s + (x.karma_points ?? 0), 0);
    },
  });
  const karmaMarks = karmaPoints * KARMA_TO_ALCHEMY;

  const scheduledPerDay = useMemo(() => {
    const m: Record<string, number> = {};
    for (const l of logs) {
      const wd = new Date(l.log_date + "T00:00:00Z").getUTCDay();
      m[l.log_date] = practices.filter((p) => !p.days_of_week || p.days_of_week.includes(wd)).length;
    }
    return m;
  }, [logs, practices]);

  const bonusMarks = homeworkMarks + awardMarks + karmaMarks;

  const overall: AlchemyStatus = useMemo(
    () => computeAlchemy(logs, scheduledPerDay, bonusMarks),
    [logs, scheduledPerDay, bonusMarks],
  );

  const practiceOnly: AlchemyStatus = useMemo(
    () => computeAlchemy(logs, scheduledPerDay),
    [logs, scheduledPerDay],
  );

  const bodyAlchemy = useMemo(
    () =>
      bodyLayers.map((b) => ({
        ...b,
        status: computeAlchemy(logs.filter((l) => l.body_layer === b.key)),
      })),
    [logs],
  );

  return {
    overall,
    practiceMarks: practiceOnly.marks,
    homeworkMarks,
    awardMarks,
    karmaPoints,
    karmaMarks,
    bodyAlchemy,
    logs,
    practices,
  };
}
