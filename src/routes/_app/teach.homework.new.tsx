import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { AssignmentEditor, type AssignmentDraft } from "@/components/homework/assignment-editor";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_app/teach/homework/new")({
  component: NewAssignment,
});

function NewAssignment() {
  const { isTeacher, loading } = useRoles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isTeacher) return <p className="text-muted-foreground">Teachers only.</p>;

  async function handleSave(draft: AssignmentDraft, published: boolean) {
    if (!user) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("homework_assignments")
      .insert({
        title: draft.title,
        instructions: draft.instructions,
        pathway: (draft.pathway || null) as any,
        course_slug: draft.course_slug || null,
        practice_slug: draft.practice_slug || null,
        response_type: draft.response_type,
        target_minutes: draft.target_minutes ? Number(draft.target_minutes) : null,
        target_reps: draft.target_reps ? Number(draft.target_reps) : null,
        video_url: draft.video_url || null,
        audio_url: draft.audio_url || null,
        attachment_url: draft.attachment_url || null,
        questions: draft.questions as any,
        max_points: draft.max_points,
        alchemy_marks: draft.alchemy_marks,
        due_at: draft.due_at || null,
        group_id: draft.group_id || null,
        published,
        created_by: user.id,
      })
      .select()
      .single();
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Assignment created");
    navigate({ to: "/teach/homework/$assignmentId", params: { assignmentId: data.id } });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/teach/homework"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold"
      >
        <ChevronLeft className="h-3 w-3" /> Back
      </Link>
      <PageHeader
        title="New assignment"
        subtitle="Compose homework with video, written prompts, quizzes."
      />
      <AssignmentEditor onSave={handleSave} saving={saving} />
    </div>
  );
}
