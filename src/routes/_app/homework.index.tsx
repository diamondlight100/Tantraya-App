import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { pathwayLabels } from "@/lib/homework";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Award,
  Video,
  Music,
  Target,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ResponseType } from "@/lib/homework";

export const Route = createFileRoute("/_app/homework/")({
  head: () => ({ meta: [{ title: "Homework · Tantraya" }] }),
  component: HomeworkList,
});

type Assignment = {
  id: string;
  title: string;
  instructions: string | null;
  pathway: string | null;
  course_slug: string | null;
  practice_slug: string | null;
  response_type: ResponseType;
  due_at: string | null;
  max_points: number;
  alchemy_marks: number;
  group_id: string | null;
};

type Submission = {
  id: string;
  assignment_id: string;
  status: "draft" | "submitted" | "graded";
  points_awarded: number | null;
  alchemy_marks_awarded: number | null;
  submitted_at: string | null;
};

function HomeworkList() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({});
  const [groupNames, setGroupNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: a }, { data: s }, { data: g }] = await Promise.all([
        supabase
          .from("homework_assignments")
          .select(
            "id,title,instructions,pathway,course_slug,practice_slug,response_type,due_at,max_points,alchemy_marks,group_id",
          )
          .eq("published", true)
          .order("created_at", { ascending: false }),
        supabase
          .from("homework_submissions")
          .select("id,assignment_id,status,points_awarded,alchemy_marks_awarded,submitted_at")
          .eq("student_id", user.id),
        supabase.from("student_groups").select("id,name"),
      ]);
      setAssignments((a ?? []) as Assignment[]);
      const map: Record<string, Submission> = {};
      (s ?? []).forEach((x: any) => (map[x.assignment_id] = x as Submission));
      setSubmissions(map);
      const gMap: Record<string, string> = {};
      (g ?? []).forEach((x: { id: string; name: string }) => (gMap[x.id] = x.name));
      setGroupNames(gMap);
      setLoading(false);
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="text-muted-foreground">
        Please{" "}
        <Link to="/login" className="text-gold underline">
          sign in
        </Link>{" "}
        to view homework.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Homework"
        subtitle="Weekly practice, reflection, and study set by your teachers."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading assignments…</p>
      ) : assignments.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-10 text-center">
          <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <p className="mt-4 text-muted-foreground">No homework yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {assignments.map((a) => {
            const sub = submissions[a.id];
            const status = sub?.status ?? "not-started";
            return (
              <Link
                key={a.id}
                to="/homework/$assignmentId"
                params={{ assignmentId: a.id }}
                className="group rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-gold/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {a.group_id && groupNames[a.group_id] && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold">
                          {groupNames[a.group_id]}
                        </span>
                      )}
                      {a.pathway && <span className="text-gold">{pathwayLabels[a.pathway]}</span>}
                      {a.course_slug && <span>· {a.course_slug.replace(/-/g, " ")}</span>}
                      <ResponseTypeIcon type={a.response_type} />
                    </div>
                    <h3 className="mt-1 font-serif text-xl text-primary group-hover:text-gold">
                      {a.title}
                    </h3>
                    {a.instructions && (
                      <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
                        {a.instructions}
                      </p>
                    )}
                  </div>
                  <StatusBadge
                    status={status}
                    points={sub?.points_awarded}
                    maxPoints={a.max_points}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {a.due_at && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Due {new Date(a.due_at).toLocaleDateString()}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Award className="h-3 w-3 text-gold" /> {a.alchemy_marks} alchemy marks
                  </span>
                  <span>· {a.max_points} pts</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ResponseTypeIcon({ type }: { type: ResponseType }) {
  if (type === "video") return <Video className="h-3 w-3" />;
  if (type === "audio") return <Music className="h-3 w-3" />;
  if (type === "practice") return <Target className="h-3 w-3" />;
  if (type === "any") return null;
  return <FileText className="h-3 w-3" />;
}

function StatusBadge({
  status,
  points,
  maxPoints,
}: {
  status: string;
  points?: number | null;
  maxPoints: number;
}) {
  if (status === "graded") {
    return (
      <Badge className="bg-gold/20 text-primary hover:bg-gold/20">
        <CheckCircle2 className="mr-1 h-3 w-3" /> Graded · {points ?? 0}/{maxPoints}
      </Badge>
    );
  }
  if (status === "submitted") {
    return <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/20">Submitted</Badge>;
  }
  if (status === "draft") {
    return <Badge variant="outline">Draft</Badge>;
  }
  return (
    <Badge variant="outline" className={cn("text-muted-foreground")}>
      Not started
    </Badge>
  );
}
