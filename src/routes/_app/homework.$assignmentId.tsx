import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ChevronLeft, Save, Send, Video as VideoIcon, Upload, Award, CheckCircle2,
  FileText, Eye, EyeOff, Loader2, Music, Target,
} from "lucide-react";
import { type HomeworkQuestion, type ResponseType, scoreMultipleChoice, pathwayLabels } from "@/lib/homework";
import { findCatalogPractice } from "@/data/practice-catalog";

export const Route = createFileRoute("/_app/homework/$assignmentId")({
  component: HomeworkDetail,
});

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
  video_url: string | null;
  audio_url: string | null;
  attachment_url: string | null;
  questions: HomeworkQuestion[];
  max_points: number;
  alchemy_marks: number;
  due_at: string | null;
};

type Submission = {
  id: string;
  status: "draft" | "submitted" | "graded";
  written_response: string | null;
  video_url: string | null;
  audio_url: string | null;
  practice_minutes_logged: number | null;
  practice_reps_logged: number | null;
  attachments: { name: string; url: string }[];
  answers: Record<string, number | string>;
  shared: boolean;
  feedback: string | null;
  feedback_video_url: string | null;
  points_awarded: number | null;
  alchemy_marks_awarded: number | null;
  graded_at: string | null;
  submitted_at: string | null;
};

function HomeworkDetail() {
  const { assignmentId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [sub, setSub] = useState<Submission | null>(null);
  const [written, setWritten] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [practiceMinutesLogged, setPracticeMinutesLogged] = useState("");
  const [practiceRepsLogged, setPracticeRepsLogged] = useState("");
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [shared, setShared] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; url: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: a } = await supabase
        .from("homework_assignments")
        .select("*")
        .eq("id", assignmentId)
        .maybeSingle();
      if (a) {
        setAssignment({
          ...a,
          questions: (a.questions as any) ?? [],
        } as Assignment);
      }
      const { data: s } = await supabase
        .from("homework_submissions")
        .select("*")
        .eq("assignment_id", assignmentId)
        .eq("student_id", user.id)
        .maybeSingle();
      if (s) {
        const sx = {
          ...s,
          attachments: (s.attachments as any) ?? [],
          answers: (s.answers as any) ?? {},
        } as Submission;
        setSub(sx);
        setWritten(sx.written_response ?? "");
        setVideoUrl(sx.video_url ?? "");
        setAudioUrl(sx.audio_url ?? "");
        setPracticeMinutesLogged(sx.practice_minutes_logged != null ? String(sx.practice_minutes_logged) : "");
        setPracticeRepsLogged(sx.practice_reps_logged != null ? String(sx.practice_reps_logged) : "");
        setAnswers(sx.answers);
        setShared(sx.shared);
        setAttachments(sx.attachments);
      }
    })();
  }, [assignmentId, user]);

  if (!user) {
    return <Link to="/login" className="text-gold underline">Sign in to continue</Link>;
  }
  if (!assignment) return <p className="text-muted-foreground">Loading…</p>;

  const isGraded = sub?.status === "graded";
  const isSubmitted = sub?.status === "submitted" || isGraded;
  const isLocked = isGraded;

  async function save(status: "draft" | "submitted") {
    if (!user || !assignment) return;
    setSaving(true);
    const payload = {
      assignment_id: assignment.id,
      student_id: user.id,
      written_response: written,
      video_url: videoUrl || null,
      audio_url: audioUrl || null,
      practice_minutes_logged: practiceMinutesLogged ? Number(practiceMinutesLogged) : null,
      practice_reps_logged: practiceRepsLogged ? Number(practiceRepsLogged) : null,
      attachments,
      answers,
      shared,
      status,
      submitted_at: status === "submitted" ? new Date().toISOString() : sub?.submitted_at ?? null,
    };
    const { data, error } = await supabase
      .from("homework_submissions")
      .upsert(payload, { onConflict: "assignment_id,student_id" })
      .select()
      .single();
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSub({
      ...(data as any),
      attachments: (data.attachments as any) ?? [],
      answers: (data.answers as any) ?? {},
    } as Submission);
    toast.success(status === "submitted" ? "Submitted for review" : "Draft saved");
  }

  async function uploadFile(kind: "attachment" | "video" | "audio") {
    const input = kind === "video" ? videoFileRef.current : kind === "audio" ? audioFileRef.current : fileRef.current;
    const file = input?.files?.[0];
    if (!file || !user) return;
    if (file.size > 200 * 1024 * 1024) {
      toast.error("File too large (max 200 MB)");
      return;
    }
    setUploading(true);
    const path = `${user.id}/${assignment!.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("homework-media").upload(path, file);
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    const { data: signed } = await supabase.storage
      .from("homework-media")
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    const url = signed?.signedUrl ?? "";
    if (kind === "video") {
      setVideoUrl(url);
    } else if (kind === "audio") {
      setAudioUrl(url);
    } else {
      setAttachments((prev) => [...prev, { name: file.name, url }]);
    }
    setUploading(false);
    if (input) input.value = "";
    toast.success("Upload complete");
  }

  const mc = scoreMultipleChoice(assignment.questions, answers);
  const practiceMatch = findCatalogPractice(assignment.pathway, assignment.course_slug, assignment.practice_slug);
  const practiceLabel = practiceMatch ? `${practiceMatch.practice.name} (${practiceMatch.course.title})` : null;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/homework"
        className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> All homework
      </Link>
      <PageHeader title={assignment.title} subtitle={assignment.instructions ?? undefined} />

      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {assignment.pathway && (
          <Badge variant="outline" className="border-gold/40 text-gold">
            {pathwayLabels[assignment.pathway]}
          </Badge>
        )}
        <span>Max {assignment.max_points} pts</span>
        <span>· {assignment.alchemy_marks} alchemy marks</span>
        {assignment.due_at && (
          <span>· Due {new Date(assignment.due_at).toLocaleDateString()}</span>
        )}
      </div>

      {/* Teacher media */}
      {(assignment.video_url || assignment.audio_url || assignment.attachment_url) && (
        <Card className="mb-6 p-4 space-y-3">
          {assignment.video_url && (
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold">
                <VideoIcon className="h-4 w-4" /> Watch
              </p>
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                <iframe
                  src={youtubeEmbed(assignment.video_url) ?? assignment.video_url}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          {assignment.audio_url && (
            <div>
              <p className="mb-2 text-sm text-gold">Audio</p>
              <audio controls src={assignment.audio_url} className="w-full" />
            </div>
          )}
          {assignment.attachment_url && (
            <a
              href={assignment.attachment_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
            >
              <FileText className="h-4 w-4" /> Download attachment
            </a>
          )}
        </Card>
      )}

      {/* Practice target */}
      {assignment.response_type === "practice" && (
        <Card className="mb-6 border-gold/40 bg-gold/5 p-5">
          <p className="mb-2 inline-flex items-center gap-2 text-sm text-primary">
            <Target className="h-4 w-4" /> Practice target
          </p>
          <p className="text-sm text-foreground/85">
            {practiceLabel ?? "Practice as instructed above."}
            {(assignment.target_minutes || assignment.target_reps) && (
              <>
                {" "}, {" "}
                {assignment.target_minutes ? `${assignment.target_minutes} min` : ""}
                {assignment.target_minutes && assignment.target_reps ? " · " : ""}
                {assignment.target_reps ? `${assignment.target_reps} reps` : ""}
              </>
            )}
          </p>
        </Card>
      )}

      {/* Graded view */}
      {isGraded && sub && (
        <Card className="mb-6 border-gold/40 bg-gold/5 p-5">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-serif text-lg">Graded</p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/70">Score</p>
              <p className="font-serif text-2xl text-primary">
                {sub.points_awarded ?? 0}<span className="text-base text-foreground/70">/{assignment.max_points}</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/70">Alchemy marks awarded</p>
              <p className="font-serif text-2xl text-primary inline-flex items-center gap-1">
                <Award className="h-5 w-5" /> {sub.alchemy_marks_awarded ?? 0}
              </p>
            </div>
          </div>
          {sub.feedback && (
            <div className="mt-4 rounded-lg border border-border/60 bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Feedback from your teacher</p>
              <p className="whitespace-pre-line text-sm text-foreground/85">{sub.feedback}</p>
            </div>
          )}
          {sub.feedback_video_url && (
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Personal video feedback
              </p>
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                <video src={sub.feedback_video_url} controls className="h-full w-full" />
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Questions */}
      {assignment.questions.length > 0 && (
        <Card className="mb-6 p-5 space-y-5">
          <h3 className="font-serif text-lg text-primary">Questions</h3>
          {assignment.questions.map((q, i) => (
            <div key={q.id} className="rounded-lg border border-border/60 bg-background/30 p-4">
              <p className="mb-3 text-sm font-medium">
                <span className="text-gold">Q{i + 1}.</span> {q.prompt}
              </p>
              {q.type === "mc" ? (
                <RadioGroup
                  disabled={isLocked}
                  value={String(answers[q.id] ?? "")}
                  onValueChange={(v) => setAnswers({ ...answers, [q.id]: Number(v) })}
                >
                  {(q.options ?? []).map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <RadioGroupItem value={String(idx)} id={`${q.id}-${idx}`} />
                      <Label htmlFor={`${q.id}-${idx}`} className="cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  disabled={isLocked}
                  value={String(answers[q.id] ?? "")}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  rows={3}
                  placeholder="Your response…"
                />
              )}
            </div>
          ))}
          {mc.mcCount > 0 && (
            <p className="text-xs text-muted-foreground">
              Auto-score (multiple-choice): {mc.correctCount}/{mc.mcCount} correct
            </p>
          )}
        </Card>
      )}

      {/* Practice self-report */}
      {assignment.response_type === "practice" && (
        <Card className="mb-6 p-5 space-y-3">
          <Label className="font-serif text-lg text-primary inline-flex items-center gap-2">
            <Target className="h-4 w-4" /> What did you actually do?
          </Label>
          <p className="text-xs text-muted-foreground">
            An honest self-report, no proof needed, just your own record.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Minutes practiced</Label>
              <Input
                disabled={isLocked}
                type="number"
                min={0}
                value={practiceMinutesLogged}
                onChange={(e) => setPracticeMinutesLogged(e.target.value)}
                placeholder={assignment.target_minutes ? String(assignment.target_minutes) : "0"}
              />
            </div>
            <div>
              <Label className="text-xs">Reps / rounds completed</Label>
              <Input
                disabled={isLocked}
                type="number"
                min={0}
                value={practiceRepsLogged}
                onChange={(e) => setPracticeRepsLogged(e.target.value)}
                placeholder={assignment.target_reps ? String(assignment.target_reps) : "0"}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Written response */}
      {assignment.response_type !== "video" && assignment.response_type !== "audio" && (
        <Card className="mb-6 p-5 space-y-3">
          <Label className="font-serif text-lg text-primary">
            {assignment.response_type === "practice" ? "Optional written reflection" : "Written reflection"}
          </Label>
          <Textarea
            disabled={isLocked}
            value={written}
            onChange={(e) => setWritten(e.target.value)}
            rows={assignment.response_type === "practice" ? 4 : 10}
            placeholder="Share your reflections, insights, observations from practice…"
          />
        </Card>
      )}

      {/* Video */}
      {(assignment.response_type === "video" || assignment.response_type === "any") && (
        <Card className="mb-6 p-5 space-y-3">
          <Label className="font-serif text-lg text-primary inline-flex items-center gap-2">
            <VideoIcon className="h-4 w-4" /> Video submission{assignment.response_type === "any" ? " (optional)" : ""}
          </Label>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <Input
              disabled={isLocked}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube / Vimeo URL"
            />
            <div className="flex gap-2">
              <input
                ref={videoFileRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={() => uploadFile("video")}
              />
              <Button
                type="button"
                variant="outline"
                disabled={isLocked || uploading}
                onClick={() => videoFileRef.current?.click()}
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload
              </Button>
            </div>
          </div>
          {videoUrl && (
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              {youtubeEmbed(videoUrl) ? (
                <iframe src={youtubeEmbed(videoUrl)!} className="h-full w-full" allowFullScreen />
              ) : (
                <video src={videoUrl} controls className="h-full w-full" />
              )}
            </div>
          )}
        </Card>
      )}

      {/* Audio */}
      {(assignment.response_type === "audio" || assignment.response_type === "any") && (
        <Card className="mb-6 p-5 space-y-3">
          <Label className="font-serif text-lg text-primary inline-flex items-center gap-2">
            <Music className="h-4 w-4" /> Audio submission{assignment.response_type === "any" ? " (optional)" : ""}
          </Label>
          <input
            ref={audioFileRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={() => uploadFile("audio")}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isLocked || uploading}
            onClick={() => audioFileRef.current?.click()}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload audio
          </Button>
          {audioUrl && <audio src={audioUrl} controls className="w-full" />}
        </Card>
      )}

      {/* Attachments */}
      <Card className="mb-6 p-5 space-y-3">
        <Label className="font-serif text-lg text-primary">Attachments</Label>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={() => uploadFile("attachment")}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isLocked || uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Add file
        </Button>
        {attachments.length > 0 && (
          <ul className="space-y-1 text-sm">
            {attachments.map((a, i) => (
              <li key={i} className="flex items-center justify-between rounded border border-border/40 bg-background/30 px-3 py-2">
                <a href={a.url} target="_blank" rel="noreferrer" className="truncate text-gold hover:underline">
                  {a.name}
                </a>
                {!isLocked && (
                  <button
                    onClick={() => setAttachments(attachments.filter((_, j) => j !== i))}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Sharing */}
      <Card className="mb-6 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Label className="inline-flex items-center gap-2 font-serif text-base text-primary">
              {shared ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              Share with classmates
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              When on, others on this course can read your submission. Off by default.
            </p>
          </div>
          <Switch checked={shared} onCheckedChange={setShared} disabled={isLocked} />
        </div>
      </Card>

      {/* Actions */}
      {!isLocked && (
        <div className="sticky bottom-4 flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-border/60 bg-card/90 p-3 backdrop-blur">
          <span className="mr-auto text-xs text-muted-foreground">
            {isSubmitted ? "Submitted, awaiting feedback" : sub ? "Draft saved" : "Not yet saved"}
          </span>
          <Button variant="outline" onClick={() => save("draft")} disabled={saving}>
            <Save className="h-4 w-4" /> Save draft
          </Button>
          <Button onClick={() => save("submitted")} disabled={saving}>
            <Send className="h-4 w-4" /> {isSubmitted ? "Resubmit" : "Submit for review"}
          </Button>
        </div>
      )}
    </div>
  );
}

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      return `https://player.vimeo.com/video/${u.pathname.slice(1)}`;
    }
  } catch { /* ignore */ }
  return null;
}
