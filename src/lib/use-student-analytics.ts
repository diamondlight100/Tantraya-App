import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRoles } from "@/lib/use-role";
import { computeAlchemy, currentStreak, type AlchemyStatus } from "@/lib/alchemy";

const KARMA_TO_ALCHEMY = 5; // kept in sync with use-overall-alchemy.ts

export type StudentSummary = {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  alchemy: AlchemyStatus;
  streak: number;
  lastPracticeDate: string | null;
  homework: {
    pending: number; // submitted, awaiting grading
    graded: number;
    draft: number; // started but not submitted
  };
  awardsCount: number;
};

type ProfileRow = { id: string; display_name: string | null; avatar_url: string | null };
type LogRow = { user_id: string; practice_id: string; log_date: string; completed: boolean; body_layer: string | null };
type PracticeRow = { id: string; user_id: string; days_of_week: number[] | null; active: boolean };
type SubmissionRow = { student_id: string; status: string; alchemy_marks_awarded: number | null };
type AwardRow = { student_id: string; alchemy_marks: number };
type KarmaRow = { user_id: string; karma_points: number };

/**
 * Teacher-facing roster + per-student analytics, one round trip per table
 * (not per student) so this scales fine for a school-sized roster. Requires
 * the teacher/admin read policies added in
 * 20260722090000_teacher_student_analytics_read.sql — students' own data
 * stays otherwise private (RLS still scopes non-teacher reads to self).
 *
 * Deliberately surfaces only what's useful for "who's practicing, who's
 * stalled, who needs a check-in": overall Alchemy stage/marks, streak, last
 * practice date, and homework status counts. No minute-level practice detail,
 * no journal content, no per-day logs, matching what the teacher actually asked for.
 */
export function useStudentAnalytics() {
  const { isTeacher } = useRoles();

  const { data: studentIds = [], isLoading: loadingRoster } = useQuery({
    queryKey: ["teacher-student-roster"],
    enabled: isTeacher,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("user_id, role").eq("role", "student");
      if (error) throw error;
      return Array.from(new Set((data ?? []).map((r) => r.user_id as string)));
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["teacher-student-profiles", studentIds],
    enabled: isTeacher && studentIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", studentIds);
      if (error) throw error;
      return (data ?? []) as ProfileRow[];
    },
  });

  const { data: practices = [] } = useQuery({
    queryKey: ["teacher-all-practices", studentIds],
    enabled: isTeacher && studentIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("id, user_id, days_of_week, active")
        .in("user_id", studentIds)
        .eq("active", true);
      if (error) throw error;
      return (data ?? []) as PracticeRow[];
    },
  });

  const { data: logs = [] } = useQuery({
    queryKey: ["teacher-all-practice-logs", studentIds],
    enabled: isTeacher && studentIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practice_logs")
        .select("user_id, practice_id, log_date, completed, body_layer")
        .in("user_id", studentIds)
        .order("log_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LogRow[];
    },
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["teacher-all-submissions", studentIds],
    enabled: isTeacher && studentIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homework_submissions")
        .select("student_id, status, alchemy_marks_awarded")
        .in("student_id", studentIds);
      if (error) throw error;
      return (data ?? []) as SubmissionRow[];
    },
  });

  const { data: awards = [] } = useQuery({
    queryKey: ["teacher-all-awards", studentIds],
    enabled: isTeacher && studentIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_awards")
        .select("student_id, alchemy_marks")
        .in("student_id", studentIds);
      if (error) throw error;
      return (data ?? []) as AwardRow[];
    },
  });

  const { data: karma = [] } = useQuery({
    queryKey: ["teacher-all-karma", studentIds],
    enabled: isTeacher && studentIds.length > 0,
    queryFn: async () => {
      const { data, error } = await (supabase.from("karma_logs" as any) as any)
        .select("user_id, karma_points")
        .in("user_id", studentIds);
      if (error) throw error;
      return (data ?? []) as unknown as KarmaRow[];
    },
  });

  const students: StudentSummary[] = studentIds.map((id) => {
    const profile = profiles.find((p) => p.id === id);
    const myPractices = practices.filter((p) => p.user_id === id);
    const myLogs = logs.filter((l) => l.user_id === id);
    const mySubmissions = submissions.filter((s) => s.student_id === id);
    const myAwards = awards.filter((a) => a.student_id === id);
    const myKarma = karma.filter((k) => k.user_id === id).reduce((s, k) => s + (k.karma_points ?? 0), 0);

    const scheduledPerDay: Record<string, number> = {};
    for (const l of myLogs) {
      const wd = new Date(l.log_date + "T00:00:00Z").getUTCDay();
      scheduledPerDay[l.log_date] = myPractices.filter((p) => !p.days_of_week || p.days_of_week.includes(wd)).length;
    }

    const homeworkMarks = mySubmissions
      .filter((s) => s.status === "graded")
      .reduce((s, x) => s + (x.alchemy_marks_awarded ?? 0), 0);
    const awardMarks = myAwards.reduce((s, a) => s + (a.alchemy_marks ?? 0), 0);
    const karmaMarks = myKarma * KARMA_TO_ALCHEMY;
    const bonusMarks = homeworkMarks + awardMarks + karmaMarks;

    const alchemy = computeAlchemy(myLogs, scheduledPerDay, bonusMarks);
    const streak = currentStreak(myLogs);
    const completedDates = myLogs.filter((l) => l.completed).map((l) => l.log_date).sort();
    const lastPracticeDate = completedDates.length ? completedDates[completedDates.length - 1] : null;

    return {
      userId: id,
      displayName: profile?.display_name || "Unnamed student",
      avatarUrl: profile?.avatar_url ?? null,
      alchemy,
      streak,
      lastPracticeDate,
      homework: {
        pending: mySubmissions.filter((s) => s.status === "submitted").length,
        graded: mySubmissions.filter((s) => s.status === "graded").length,
        draft: mySubmissions.filter((s) => s.status === "draft").length,
      },
      awardsCount: myAwards.length,
    };
  });

  return {
    students,
    isLoading: loadingRoster,
  };
}
