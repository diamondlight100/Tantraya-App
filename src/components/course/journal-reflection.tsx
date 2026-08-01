import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { NotebookPen, CheckCircle2 } from "lucide-react";

type Entry = { id: string; content: string; created_at: string };

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Drop under any practice. Ties directly into the Journal feature, a saved
 * reflection is a real journal_entries row, tagged with course_slug +
 * lesson_slug + this exact practice's prompt, so it shows up in the
 * student's own Journal too, not just here.
 */
export function JournalReflection({
  courseSlug,
  lessonSlug,
  prompt,
}: {
  courseSlug: string;
  lessonSlug: string;
  prompt: string;
}) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!user) return;
    const { data } = await supabase
      .from("journal_entries")
      .select("id, content, created_at")
      .eq("user_id", user.id)
      .eq("course_slug", courseSlug)
      .eq("lesson_slug", lessonSlug)
      .eq("reflection_prompt", prompt)
      .order("created_at", { ascending: false });
    setEntries((data as Entry[]) ?? []);
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, courseSlug, lessonSlug, prompt]);

  if (!user) return null;

  const workedToday = entries.some((e) => isToday(e.created_at));

  async function save() {
    if (!text.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("journal_entries").insert({
      user_id: user!.id,
      content: text.trim(),
      reflection_prompt: prompt,
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved to your journal");
    setText("");
    setOpen(false);
    load();
  }

  return (
    <div className="mt-3 border-t border-border/40 pt-3">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          <NotebookPen className="h-3.5 w-3.5" /> Reflect on this
        </Button>
        {workedToday && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Worked with this today
          </span>
        )}
        {entries.length > 0 && (
          <span className="text-[11px] text-muted-foreground">
            {entries.length} past reflection{entries.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {open && (
        <div className="mt-2 space-y-2">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you notice?"
            rows={3}
          />
          <Button size="sm" onClick={save} disabled={saving || !text.trim()}>
            Save to journal
          </Button>
        </div>
      )}

      {entries.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {entries.slice(0, 5).map((e) => (
            <li
              key={e.id}
              className="rounded-md border border-border/50 bg-background/40 p-2 text-xs"
            >
              <span className="text-muted-foreground">
                {new Date(e.created_at).toLocaleDateString()}
              </span>{" "}
             , <span className="text-foreground/90">{e.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Aggregate view, every reflection saved anywhere in one course, newest first. Satisfies the "look back across the whole course" ask. */
export function CourseJournalHistory({ courseSlug }: { courseSlug: string }) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<
    (Entry & { lesson_slug: string | null; reflection_prompt: string | null })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("journal_entries")
        .select("id, content, created_at, lesson_slug, reflection_prompt")
        .eq("user_id", user.id)
        .eq("course_slug", courseSlug)
        .order("created_at", { ascending: false });
      if (!cancelled) {
        setEntries((data as typeof entries) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, courseSlug]);

  if (!user || loading || entries.length === 0) return null;

  return (
    <div className="rounded-xl border border-gold/30 bg-card/40 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your reflections</p>
      <p className="mt-1 font-serif text-lg text-primary">
        {entries.length} saved across this course
      </p>
      <ul className="mt-3 space-y-2">
        {entries.slice(0, 8).map((e) => (
          <li
            key={e.id}
            className="rounded-md border border-border/50 bg-background/40 p-3 text-sm"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
              <span>{e.lesson_slug ?? ", "}</span>
              <span>{new Date(e.created_at).toLocaleDateString()}</span>
            </div>
            {e.reflection_prompt && (
              <p className="mt-1 text-xs italic text-muted-foreground">{e.reflection_prompt}</p>
            )}
            <p className="mt-1 text-foreground/90">{e.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
