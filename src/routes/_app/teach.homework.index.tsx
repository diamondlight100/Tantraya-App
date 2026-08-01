import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useRoles } from "@/lib/use-role";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ClipboardList, Users, Eye, EyeOff, Pencil } from "lucide-react";
import { pathwayLabels } from "@/lib/homework";

export const Route = createFileRoute("/_app/teach/homework/")({
  head: () => ({ meta: [{ title: "Teach · Homework · Tantraya" }] }),
  component: TeachHomework,
});

type Row = {
  id: string;
  title: string;
  pathway: string | null;
  course_slug: string | null;
  published: boolean;
  created_at: string;
  due_at: string | null;
  submission_count: number;
  ungraded_count: number;
};

function TeachHomework() {
  const { isTeacher, loading } = useRoles();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!isTeacher) return;
    (async () => {
      const { data: a } = await supabase
        .from("homework_assignments")
        .select("id,title,pathway,course_slug,published,created_at,due_at")
        .order("created_at", { ascending: false });
      const { data: s } = await supabase
        .from("homework_submissions")
        .select("assignment_id,status");
      const counts: Record<string, { total: number; ungraded: number }> = {};
      (s ?? []).forEach((row: any) => {
        const c = counts[row.assignment_id] ?? (counts[row.assignment_id] = { total: 0, ungraded: 0 });
        c.total++;
        if (row.status === "submitted") c.ungraded++;
      });
      setRows(
        (a ?? []).map((x: any) => ({
          ...x,
          submission_count: counts[x.id]?.total ?? 0,
          ungraded_count: counts[x.id]?.ungraded ?? 0,
        })),
      );
    })();
  }, [isTeacher]);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isTeacher) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card/50 p-10 text-center">
        <p className="text-muted-foreground">This area is for teachers only.</p>
        <Link to="/homework" className="mt-3 inline-block text-gold underline">Go to homework</Link>
      </div>
    );
  }

  const totalUngraded = rows.reduce((s, r) => s + r.ungraded_count, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Teach, Homework" subtitle="Create assignments, review submissions, give feedback and marks." />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm">
          {totalUngraded > 0 ? (
            <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/20">
              {totalUngraded} awaiting review
            </Badge>
          ) : (
            <Badge variant="outline">All caught up</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Link to="/teach/events"><Button variant="outline" size="sm">Manage events</Button></Link>
          <Button onClick={() => navigate({ to: "/teach/homework/new" })}>
            <Plus className="h-4 w-4" /> New assignment
          </Button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-10 text-center">
          <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <p className="mt-4 text-muted-foreground">No assignments yet, create your first one.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-border/60 bg-card/50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {r.pathway && <span className="text-gold">{pathwayLabels[r.pathway]}</span>}
                    {r.course_slug && <span>· {r.course_slug.replace(/-/g, " ")}</span>}
                  </div>
                  <h3 className="mt-1 font-serif text-xl text-primary">{r.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {r.published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400"><Eye className="h-3 w-3" /> Published</span>
                    ) : (
                      <span className="inline-flex items-center gap-1"><EyeOff className="h-3 w-3" /> Draft</span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" /> {r.submission_count} submissions
                    </span>
                    {r.ungraded_count > 0 && (
                      <span className="text-amber-400">{r.ungraded_count} to grade</span>
                    )}
                    {r.due_at && <span>· Due {new Date(r.due_at).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/teach/homework/$assignmentId"
                    params={{ assignmentId: r.id }}
                  >
                    <Button variant="outline" size="sm"><Pencil className="h-3 w-3" /> Edit & submissions</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
