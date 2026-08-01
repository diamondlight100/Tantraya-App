import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Save, GripVertical, CheckCircle2 } from "lucide-react";
import {
  type HomeworkQuestion,
  type ResponseType,
  newQuestion,
  pathwayLabels,
  responseTypeLabels,
} from "@/lib/homework";
import { practiceCatalog, findPathway } from "@/data/practice-catalog";
import { supabase } from "@/integrations/supabase/client";

export type AssignmentDraft = {
  title: string;
  instructions: string;
  pathway: string;
  course_slug: string;
  practice_slug: string;
  response_type: ResponseType;
  target_minutes: string;
  target_reps: string;
  video_url: string;
  audio_url: string;
  attachment_url: string;
  questions: HomeworkQuestion[];
  max_points: number;
  alchemy_marks: number;
  due_at: string;
  group_id: string;
};

const empty: AssignmentDraft = {
  title: "",
  instructions: "",
  pathway: "",
  course_slug: "",
  practice_slug: "",
  response_type: "written",
  target_minutes: "",
  target_reps: "",
  video_url: "",
  audio_url: "",
  attachment_url: "",
  questions: [],
  max_points: 100,
  alchemy_marks: 5,
  due_at: "",
  group_id: "",
};

export function AssignmentEditor({
  initial,
  initialPublished = false,
  onSave,
  saving,
}: {
  initial?: AssignmentDraft;
  initialPublished?: boolean;
  onSave: (draft: AssignmentDraft, published: boolean) => void;
  saving: boolean;
}) {
  const [d, setD] = useState<AssignmentDraft>(initial ?? empty);
  const [published, setPublished] = useState(initialPublished);
  const [browsePathway, setBrowsePathway] = useState("");
  const [browseCourse, setBrowseCourse] = useState("");
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    supabase
      .from("student_groups")
      .select("id,name")
      .order("name")
      .then(({ data }) => setGroups(data ?? []));
  }, []);

  function update<K extends keyof AssignmentDraft>(k: K, v: AssignmentDraft[K]) {
    setD({ ...d, [k]: v });
  }
  function updateQuestion(i: number, q: HomeworkQuestion) {
    const qs = [...d.questions];
    qs[i] = q;
    update("questions", qs);
  }

  const courseList = browsePathway ? (findPathway(browsePathway)?.courses ?? []) : [];
  const practiceList = courseList.find((c) => c.slug === browseCourse)?.practices ?? [];

  function pickPractice(pathwaySlug: string, courseSlug: string, practiceSlug: string) {
    update("pathway", pathwaySlug);
    update("course_slug", courseSlug);
    update("practice_slug", practiceSlug);
  }

  return (
    <div className="space-y-5">
      <Card className="p-5 space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={d.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Week 1, Faery Journey reflection"
          />
        </div>
        <div>
          <Label>Instructions (markdown supported)</Label>
          <Textarea
            rows={5}
            value={d.instructions}
            onChange={(e) => update("instructions", e.target.value)}
            placeholder="What should the student do this week?"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Pathway</Label>
            <Select
              value={d.pathway || "none"}
              onValueChange={(v) => update("pathway", v === "none" ? "" : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All pathways" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">All pathways</SelectItem>
                {Object.entries(pathwayLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Course slug (optional)</Label>
            <Input
              value={d.course_slug}
              onChange={(e) => update("course_slug", e.target.value)}
              placeholder="e.g. faery-shamanism"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Practice slug (optional)</Label>
            <Input
              value={d.practice_slug}
              onChange={(e) => update("practice_slug", e.target.value)}
              placeholder="e.g. faery-journey"
            />
          </div>
          <div>
            <Label>Due date (optional)</Label>
            <Input
              type="datetime-local"
              value={d.due_at}
              onChange={(e) => update("due_at", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Group (optional, restricts this assignment to one cohort)</Label>
          <Select
            value={d.group_id || "none"}
            onValueChange={(v) => update("group_id", v === "none" ? "" : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All students" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All students</SelectItem>
              {groups.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Leave as "All students" for regular homework. Pick a group to make this visible only to
            that cohort's members.
          </p>
        </div>

        <div className="rounded-lg border border-gold/30 bg-background/30 p-3 space-y-2">
          <p className="text-xs text-gold">
            Or pick a practice from a course, instead of typing slugs
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={browsePathway}
              onValueChange={(v) => {
                setBrowsePathway(v);
                setBrowseCourse("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pathway" />
              </SelectTrigger>
              <SelectContent>
                {practiceCatalog.map((p) => (
                  <SelectItem key={p.v} value={p.v}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={browseCourse} onValueChange={setBrowseCourse} disabled={!browsePathway}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courseList.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {browseCourse && (
            <div className="flex flex-wrap gap-1.5">
              {practiceList.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => pickPractice(browsePathway, browseCourse, p.slug)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition ${
                    d.course_slug === browseCourse && d.practice_slug === p.slug
                      ? "border-gold bg-gold/10 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-gold/50"
                  }`}
                >
                  {p.icon ? `${p.icon} ` : ""}
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label>What should the student turn in?</Label>
          <Select
            value={d.response_type}
            onValueChange={(v) => update("response_type", v as ResponseType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(responseTypeLabels) as [ResponseType, string][]).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-1 text-[11px] text-muted-foreground">
            "Practice log" is for things like "do 20 minutes of Ba Gua", no written answer
            required, just an honest self-report of what was done. Written/video/audio show the
            matching upload tool to the student.
          </p>
        </div>

        {d.response_type === "practice" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Target minutes (optional)</Label>
              <Input
                type="number"
                min={0}
                value={d.target_minutes}
                onChange={(e) => update("target_minutes", e.target.value)}
                placeholder="e.g. 20"
              />
            </div>
            <div>
              <Label>Target reps / rounds (optional)</Label>
              <Input
                type="number"
                min={0}
                value={d.target_reps}
                onChange={(e) => update("target_reps", e.target.value)}
                placeholder="e.g. 9"
              />
            </div>
          </div>
        )}
      </Card>

      <Card className="p-5 space-y-3">
        <h3 className="font-serif text-lg text-primary">Media</h3>
        <Input
          value={d.video_url}
          onChange={(e) => update("video_url", e.target.value)}
          placeholder="Video URL (YouTube / Vimeo / direct)"
        />
        <Input
          value={d.audio_url}
          onChange={(e) => update("audio_url", e.target.value)}
          placeholder="Audio URL (mp3 etc.)"
        />
        <Input
          value={d.attachment_url}
          onChange={(e) => update("attachment_url", e.target.value)}
          placeholder="Attachment URL (PDF, doc…)"
        />
      </Card>

      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-primary">Questions ({d.questions.length})</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => update("questions", [...d.questions, newQuestion("mc")])}
            >
              <Plus className="h-3 w-3" /> Multiple choice
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => update("questions", [...d.questions, newQuestion("written")])}
            >
              <Plus className="h-3 w-3" /> Written
            </Button>
          </div>
        </div>
        {d.questions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No questions yet, add a mix of multiple-choice and written.
          </p>
        )}
        {d.questions.map((q, i) => (
          <div
            key={q.id}
            className="rounded-lg border border-border/60 bg-background/30 p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                Q{i + 1} · {q.type === "mc" ? "Multiple choice" : "Written"}
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  className="h-7 w-16"
                  value={q.points ?? 1}
                  onChange={(e) => updateQuestion(i, { ...q, points: Number(e.target.value) })}
                />
                <span className="text-xs text-muted-foreground">pts</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    update(
                      "questions",
                      d.questions.filter((_, j) => j !== i),
                    )
                  }
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </div>
            <Textarea
              rows={2}
              value={q.prompt}
              onChange={(e) => updateQuestion(i, { ...q, prompt: e.target.value })}
              placeholder="Question prompt"
            />
            {q.type === "mc" && (
              <div className="space-y-2">
                {(q.options ?? []).map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuestion(i, { ...q, correct: oi })}
                      title="Mark as correct"
                    >
                      <CheckCircle2
                        className={`h-4 w-4 ${q.correct === oi ? "text-emerald-400" : "text-muted-foreground/40"}`}
                      />
                    </button>
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const opts = [...(q.options ?? [])];
                        opts[oi] = e.target.value;
                        updateQuestion(i, { ...q, options: opts });
                      }}
                      placeholder={`Option ${oi + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const opts = (q.options ?? []).filter((_, j) => j !== oi);
                        updateQuestion(i, {
                          ...q,
                          options: opts,
                          correct: Math.min(q.correct ?? 0, opts.length - 1),
                        });
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updateQuestion(i, { ...q, options: [...(q.options ?? []), ""] })}
                >
                  <Plus className="h-3 w-3" /> Add option
                </Button>
              </div>
            )}
          </div>
        ))}
      </Card>

      <Card className="p-5 space-y-3">
        <h3 className="font-serif text-lg text-primary">Scoring</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Max points</Label>
            <Input
              type="number"
              min={1}
              value={d.max_points}
              onChange={(e) => update("max_points", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Default alchemy marks awarded</Label>
            <Input
              type="number"
              min={0}
              value={d.alchemy_marks}
              onChange={(e) => update("alchemy_marks", Number(e.target.value))}
            />
          </div>
        </div>
      </Card>

      <Card className="p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Label className="inline-flex items-center gap-2">Published</Label>
          <p className="text-xs text-muted-foreground">Students see this only when published.</p>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={published} onCheckedChange={setPublished} />
          <Button onClick={() => onSave(d, published)} disabled={saving || !d.title.trim()}>
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
