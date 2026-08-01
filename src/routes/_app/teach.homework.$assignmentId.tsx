import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useRoles } from "@/lib/use-role";
import { AssignmentEditor, type AssignmentDraft } from "@/components/homework/assignment-editor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronLeft, Trash2, Users } from "lucide-react";

export const Route = createFileRoute("/_app/teach/homework/$assignmentId")({
  component: EditAssignment,
});

type Submission = {
  id: string;
  student_id: string;
  status: "draft" | "submitted" | "graded";
  submitted_at: string | null;
  points_awarded: number | null;
  shared: boolean;
};

function EditAssignment() {
  const { assignmentId } = Route.useParams();
  const { isTeacher, loading } = useRoles();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<AssignmentDraft | null>(null);
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [subs, setSubs] = useState<Submission[]>([]);
  const [profiles, setProfiles] = useState<Record<string, { display_name: string | null }>>({});

  useEffect(() => {
    if (!isTeacher) return;
    (async () => {
      const { data } = await supabase
        .from("homework_assignments")
        .select("*")
        .eq("id", assignmentId)
        .maybeSingle();
      if (data) {
        setDraft({
          title: data.title,
          instructions: data.instructions ?? "",
          pathway: data.pathway ?? "",
          course_slug: data.course_slug ?? "",
          practice_slug: data.practice_slug ?? "",
          response_type: (data.response_type as AssignmentDraft["response_type"]) ?? "written",
          target_minutes: data.target_minutes != null ? String(data.target_minutes) : "",
          target_reps: data.target_reps != null ? String(data.target_reps) : "",
          video_url: data.video_url ?? "",
          audio_url: data.audio_url ?? "",
          attachment_url: data.attachment_url ?? "",
          questions: (data.questions as any) ?? [],
          max_points: data.max_points,
          alchemy_marks: data.alchemy_marks,
          due_at: data.due_at ?? "",
          group_id: (data as { group_id?: string | null }).group_id ?? "",
        });
        setPublished(data.published);
      }
      const { data: s } = await supabase
        .from("homework_submissions")
        .select("id,student_id,status,submitted_at,points_awarded,shared")
        .eq("assignment_id", assignmentId)
        .order("submitted_at", { ascending: false });
      const ss = (s ?? []) as Submission[];
      setSubs(ss);
      if (ss.length) {
        const { data: p } = await supabase
          .from("profiles")
          .select("id,display_name")
          .in(
            "id",
            ss.map((x) => x.student_id),
          );
        const map: Record<string, any> = {};
        (p ?? []).forEach((row: any) => (map[row.id] = row));
        setProfiles(map);
      }
    })();
  }, [assignmentId, isTeacher]);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isTeacher) return <p className="text-muted-foreground">Teachers only.</p>;
  if (!draft) return <p className="text-muted-foreground">Loading assignment…</p>;

  async function handleSave(d: AssignmentDraft, pub: boolean) {
    setSaving(true);
    const { error } = await supabase
      .from("homework_assignments")
      .update({
        title: d.title,
        instructions: d.instructions,
        pathway: (d.pathway || null) as any,
        course_slug: d.course_slug || null,
        practice_slug: d.practice_slug || null,
        response_type: d.response_type,
        target_minutes: d.target_minutes ? Number(d.target_minutes) : null,
        target_reps: d.target_reps ? Number(d.target_reps) : null,
        video_url: d.video_url || null,
        audio_url: d.audio_url || null,
        attachment_url: d.attachment_url || null,
        questions: d.questions as any,
        max_points: d.max_points,
        alchemy_marks: d.alchemy_marks,
        due_at: d.due_at || null,
        group_id: d.group_id || null,
        published: pub,
      })
      .eq("id", assignmentId);
    setSaving(false);
    if (error) return toast.error(error.message);
    setPublished(pub);
    toast.success("Saved");
  }

  async function handleDelete() {
    if (!confirm("Delete this assignment and all its submissions?")) return;
    const { error } = await supabase.from("homework_assignments").delete().eq("id", assignmentId);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    navigate({ to: "/teach/homework" });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/teach/homework"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold"
      >
        <ChevronLeft className="h-3 w-3" /> Back
      </Link>
      <PageHeader title="Edit assignment" />

      <AssignmentEditor
        initial={draft}
        initialPublished={published}
        onSave={handleSave}
        saving={saving}
      />

      <div className="my-8 flex justify-end">
        <Button
          variant="outline"
          onClick={handleDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" /> Delete assignment
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl text-primary">
          <Users className="h-5 w-5" /> Submissions ({subs.length})
        </h2>
        {subs.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">No submissions yet.</Card>
        ) : (
          <div className="grid gap-2">
            {subs.map((s) => (
              <Link
                key={s.id}
                to="/teach/submissions/$submissionId"
                params={{ submissionId: s.id }}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 bg-card/50 p-4 transition hover:border-gold/50"
              >
                <div>
                  <p className="font-serif text-base text-primary">
                    {profiles[s.student_id]?.display_name ?? s.student_id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.submitted_at
                      ? `Submitted ${new Date(s.submitted_at).toLocaleString()}`
                      : "Draft"}
                    {s.shared && " · shared with class"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {s.status === "graded" ? (
                    <Badge className="bg-gold/20 text-primary hover:bg-gold/20">
                      Graded · {s.points_awarded ?? 0}
                    </Badge>
                  ) : s.status === "submitted" ? (
                    <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/20">
                      Review
                    </Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
