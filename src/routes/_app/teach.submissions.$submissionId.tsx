import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ChevronLeft, Award, Save, Sparkles, FileText, Video as VideoIcon, Music, Target, Upload, Loader2 } from "lucide-react";
import { type HomeworkQuestion, type ResponseType, scoreMultipleChoice } from "@/lib/homework";
import { findCatalogPractice } from "@/data/practice-catalog";

export const Route = createFileRoute("/_app/teach/submissions/$submissionId")({
  component: GradeSubmission,
});

type Submission = {
  id: string;
  assignment_id: string;
  student_id: string;
  written_response: string | null;
  video_url: string | null;
  audio_url: string | null;
  practice_minutes_logged: number | null;
  practice_reps_logged: number | null;
  attachments: { name: string; url: string }[];
  answers: Record<string, number | string>;
  shared: boolean;
  status: "draft" | "submitted" | "graded";
  submitted_at: string | null;
  feedback: string | null;
  feedback_video_url: string | null;
  points_awarded: number | null;
  alchemy_marks_awarded: number | null;
};
type Assignment = {
  id: string;
  title: string;
  instructions: string | null;
  pathway: string | null;
  course_slug: string | null;
  practice_slug: string | null;
  response_type: ResponseType;
  target_minutes: number | null;
  target_reps: number | null;
  questions: HomeworkQuestion[];
  max_points: number;
  alchemy_marks: number;
};

function GradeSubmission() {
  const { submissionId } = Route.useParams();
  const { isTeacher, loading } = useRoles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sub, setSub] = useState<Submission | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [studentName, setStudentName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [points, setPoints] = useState(0);
  const [marks, setMarks] = useState(0);
  const [awardTitle, setAwardTitle] = useState("");
  const [awardDesc, setAwardDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedbackVideoUrl, setFeedbackVideoUrl] = useState("");
  const [uploadingFeedback, setUploadingFeedback] = useState(false);
  const feedbackVideoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isTeacher) return;
    (async () => {
      const { data: s } = await supabase
        .from("homework_submissions")
        .select("*")
        .eq("id", submissionId)
        .maybeSingle();
      if (!s) return;
      const sub: Submission = {
        ...(s as any),
        attachments: (s.attachments as any) ?? [],
        answers: (s.answers as any) ?? {},
      };
      setSub(sub);
      setFeedback(sub.feedback ?? "");
      setFeedbackVideoUrl(sub.feedback_video_url ?? "");
      const { data: a } = await supabase
        .from("homework_assignments")
        .select("id,title,instructions,pathway,course_slug,practice_slug,response_type,target_minutes,target_reps,questions,max_points,alchemy_marks")
        .eq("id", sub.assignment_id)
        .maybeSingle();
      if (a) {
        const ax: Assignment = {
          ...(a as any),
          questions: (a.questions as any) ?? [],
        };
        setAssignment(ax);
        // Suggest score if not graded yet
        if (sub.points_awarded == null) {
          const mc = scoreMultipleChoice(ax.questions, sub.answers);
          const suggested = mc.max > 0 ? Math.round((mc.auto / mc.max) * ax.max_points) : ax.max_points;
          setPoints(suggested);
          setMarks(ax.alchemy_marks);
        } else {
          setPoints(sub.points_awarded ?? 0);
          setMarks(sub.alchemy_marks_awarded ?? 0);
        }
      }
      const { data: p } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", sub.student_id)
        .maybeSingle();
      setStudentName(p?.display_name ?? sub.student_id.slice(0, 8));
    })();
  }, [submissionId, isTeacher]);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isTeacher) return <p className="text-muted-foreground">Teachers only.</p>;
  if (!sub || !assignment) return <p className="text-muted-foreground">Loading…</p>;

  async function grade() {
    if (!user || !sub) return;
    setSaving(true);
    const { error } = await supabase
      .from("homework_submissions")
      .update({
        feedback,
        feedback_video_url: feedbackVideoUrl || null,
        points_awarded: points,
        alchemy_marks_awarded: marks,
        status: "graded",
        graded_by: user.id,
        graded_at: new Date().toISOString(),
      })
      .eq("id", sub.id);
    if (error) {
      setSaving(false);
      return toast.error(error.message);
    }
    if (awardTitle.trim()) {
      await supabase.from("student_awards").insert({
        student_id: sub.student_id,
        awarded_by: user.id,
        title: awardTitle.trim(),
        description: awardDesc.trim() || null,
        icon: "🏅",
        color: "gold",
        submission_id: sub.id,
        alchemy_marks: 0,
      });
    }
    setSaving(false);
    toast.success("Feedback delivered");
    navigate({ to: "/teach/homework/$assignmentId", params: { assignmentId: assignment!.id } });
  }

  async function uploadFeedbackVideo() {
    const file = feedbackVideoRef.current?.files?.[0];
    if (!file || !user || !sub) return;
    if (file.size > 200 * 1024 * 1024) {
      toast.error("File too large (max 200 MB)");
      return;
    }
    setUploadingFeedback(true);
    const path = `${user.id}/feedback/${sub.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("homework-media").upload(path, file);
    if (error) {
      toast.error(error.message);
      setUploadingFeedback(false);
      return;
    }
    const { data: signed } = await supabase.storage
      .from("homework-media")
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    setFeedbackVideoUrl(signed?.signedUrl ?? "");
    setUploadingFeedback(false);
    if (feedbackVideoRef.current) feedbackVideoRef.current.value = "";
    toast.success("Feedback video uploaded");
  }

  const mc = scoreMultipleChoice(assignment.questions, sub.answers);
  const practiceMatch = findCatalogPractice(assignment.pathway, assignment.course_slug, assignment.practice_slug);
  const practiceLabel = practiceMatch ? `${practiceMatch.practice.name} (${practiceMatch.course.title})` : null;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/teach/homework/$assignmentId"
        params={{ assignmentId: assignment.id }}
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold"
      >
        <ChevronLeft className="h-3 w-3" /> Back to assignment
      </Link>
      <PageHeader title={`Grading: ${studentName}`} subtitle={assignment.title} />

      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline">
          {sub.status === "graded" ? "Graded" : "Submitted"}
        </Badge>
        {sub.submitted_at && <span>Submitted {new Date(sub.submitted_at).toLocaleString()}</span>}
      </div>

      {/* Practice target vs self-report */}
      {assignment.response_type === "practice" && (
        <Card className="mb-4 border-gold/30 bg-gold/5 p-5">
          <p className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold">
            <Target className="h-3 w-3" /> Practice target vs. self-report
          </p>
          <p className="text-sm text-foreground/85">
            {practiceLabel ? <>{practiceLabel}, </> : null}
            Target: {assignment.target_minutes ? `${assignment.target_minutes} min` : ", "}
            {assignment.target_reps ? ` · ${assignment.target_reps} reps` : ""}
          </p>
          <p className="mt-1 text-sm text-foreground/85">
            Reported: {sub.practice_minutes_logged ?? ", "} min
            {sub.practice_reps_logged != null ? ` · ${sub.practice_reps_logged} reps` : ""}
          </p>
        </Card>
      )}

      {/* Student response */}
      {sub.written_response && (
        <Card className="mb-4 p-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Written reflection</p>
          <p className="whitespace-pre-line text-sm text-foreground/85">{sub.written_response}</p>
        </Card>
      )}

      {sub.video_url && (
        <Card className="mb-4 p-5">
          <p className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <VideoIcon className="h-3 w-3" /> Video submission
          </p>
          {youtubeEmbed(sub.video_url) ? (
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe src={youtubeEmbed(sub.video_url)!} className="h-full w-full" allowFullScreen />
            </div>
          ) : (
            <video src={sub.video_url} controls className="w-full rounded-lg" />
          )}
        </Card>
      )}

      {sub.audio_url && (
        <Card className="mb-4 p-5">
          <p className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <Music className="h-3 w-3" /> Audio submission
          </p>
          <audio src={sub.audio_url} controls className="w-full" />
        </Card>
      )}

      {sub.attachments.length > 0 && (
        <Card className="mb-4 p-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Attachments</p>
          <ul className="space-y-1 text-sm">
            {sub.attachments.map((a, i) => (
              <li key={i}>
                <a href={a.url} target="_blank" rel="noreferrer" className="text-gold hover:underline inline-flex items-center gap-1">
                  <FileText className="h-3 w-3" /> {a.name}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Quiz answers */}
      {assignment.questions.length > 0 && (
        <Card className="mb-4 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-serif text-lg text-primary">Quiz responses</p>
            {mc.mcCount > 0 && (
              <Badge className="bg-gold/10 text-primary">
                Auto: {mc.correctCount}/{mc.mcCount} MC correct
              </Badge>
            )}
          </div>
          {assignment.questions.map((q, i) => {
            const ans = sub.answers[q.id];
            const isCorrect = q.type === "mc" && typeof ans === "number" && ans === q.correct;
            return (
              <div key={q.id} className="rounded-lg border border-border/60 bg-background/30 p-3">
                <p className="text-sm font-medium">
                  <span className="text-gold">Q{i + 1}.</span> {q.prompt}
                </p>
                {q.type === "mc" ? (
                  <p className="mt-1 text-sm">
                    Answer:{" "}
                    <span className={isCorrect ? "text-emerald-400" : "text-amber-400"}>
                      {typeof ans === "number" ? q.options?.[ans] ?? ", " : ", "}
                    </span>{" "}
                    {isCorrect ? "✓" : `(correct: ${q.options?.[q.correct ?? 0] ?? ", "})`}
                  </p>
                ) : (
                  <p className="mt-1 whitespace-pre-line text-sm text-foreground/85">
                    {String(ans ?? ", ")}
                  </p>
                )}
              </div>
            );
          })}
        </Card>
      )}

      {/* Grading panel */}
      <Card className="mb-4 border-gold/40 p-5 space-y-4">
        <h3 className="font-serif text-lg text-primary inline-flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" /> Feedback & grade
        </h3>
        <div>
          <Label>Feedback to student</Label>
          <Textarea rows={5} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Offer guidance, encouragement, corrections…" />
        </div>
        <div>
          <Label className="inline-flex items-center gap-2"><VideoIcon className="h-3.5 w-3.5" /> Personal video feedback (optional)</Label>
          <p className="mb-2 text-xs text-muted-foreground">
            A short correction or demonstration filmed for this student specifically.
          </p>
          <input
            ref={feedbackVideoRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={uploadFeedbackVideo}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploadingFeedback}
              onClick={() => feedbackVideoRef.current?.click()}
            >
              {uploadingFeedback ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Upload video
            </Button>
            {feedbackVideoUrl && (
              <button
                type="button"
                onClick={() => setFeedbackVideoUrl("")}
                className="text-xs text-muted-foreground underline hover:text-rose-400"
              >
                Remove
              </button>
            )}
          </div>
          {feedbackVideoUrl && (
            <video src={feedbackVideoUrl} controls className="mt-2 w-full rounded-lg" />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Points (0–{assignment.max_points})</Label>
            <Input type="number" min={0} max={assignment.max_points} value={points} onChange={(e) => setPoints(Number(e.target.value))} />
          </div>
          <div>
            <Label className="inline-flex items-center gap-1"><Award className="h-3 w-3 text-gold" /> Alchemy marks</Label>
            <Input type="number" min={0} value={marks} onChange={(e) => setMarks(Number(e.target.value))} />
          </div>
        </div>
      </Card>

      {/* Optional award */}
      <Card className="mb-6 p-5 space-y-3">
        <h3 className="font-serif text-lg text-primary">Grant an award (optional)</h3>
        <Input placeholder="Award title (e.g. 'Deep insight')" value={awardTitle} onChange={(e) => setAwardTitle(e.target.value)} />
        <Input placeholder="Short description" value={awardDesc} onChange={(e) => setAwardDesc(e.target.value)} />
      </Card>

      <div className="flex justify-end gap-2">
        <Button onClick={grade} disabled={saving}>
          <Save className="h-4 w-4" /> {sub.status === "graded" ? "Update grade" : "Deliver feedback & grade"}
        </Button>
      </div>
    </div>
  );
}

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video/${u.pathname.slice(1)}`;
  } catch { /* ignore */ }
  return null;
}
