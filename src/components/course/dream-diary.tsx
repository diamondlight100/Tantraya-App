import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Mic, Square, PenLine, ChevronDown, ChevronUp, Loader2, Tag, BookOpen,
  Sparkles, Moon, Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DreamEntry = {
  id: string; title: string | null; content: string | null; audio_path: string | null; created_at: string;
  dream_type: string | null; lucidity_level: number | null; induction_technique: string | null;
  stabilization_technique: string | null; emotional_tone: number | null; hours_before_waking: number | null;
};
type DreamSign = { id: string; dream_entry_id: string; phrase: string; category: string; created_at: string };

const CATEGORIES = [
  { key: "awareness", label: "Awareness" },
  { key: "action", label: "Action" },
  { key: "form", label: "Form" },
  { key: "context", label: "Context" },
  { key: "other", label: "Other" },
] as const;

const CATEGORY_COLOR: Record<string, string> = {
  awareness: "border-sky-400/50 text-sky-300",
  action: "border-amber-400/50 text-amber-300",
  form: "border-emerald-400/50 text-emerald-300",
  context: "border-fuchsia-400/50 text-fuchsia-300",
  other: "border-border/60 text-muted-foreground",
};

// Drawn from the Lucid Dreaming pathway: dream typology spans ordinary
// dreams through the shamanic/Jungian "big dream" and nightmares, not just
// lucid vs. not.
const DREAM_TYPES: Record<string, string> = {
  ordinary: "Ordinary",
  big_dream: "Big dream (unusual weight or significance)",
  nightmare: "Nightmare",
  recurring: "Recurring",
  precognitive: "Precognitive",
  healing: "Healing / shamanic journey",
  lucid: "Lucid",
};
const DREAM_TYPE_COLOR: Record<string, string> = {
  ordinary: "border-border/60 text-muted-foreground",
  big_dream: "border-violet-400/50 text-violet-300",
  nightmare: "border-rose-400/50 text-rose-300",
  recurring: "border-amber-400/50 text-amber-300",
  precognitive: "border-cyan-400/50 text-cyan-300",
  healing: "border-emerald-400/50 text-emerald-300",
  lucid: "border-gold/60 text-gold",
};

// The Dreamsign Awareness Scale (0–4) from the Western Methods chapter,
// rating how far in-dream recognition actually went.
const LUCIDITY_LEVELS: { value: number; label: string }[] = [
  { value: 0, label: "0 — No recognition" },
  { value: 1, label: "1 — Vague sense something was off" },
  { value: 2, label: "2 — Noticed a dreamsign, didn't act" },
  { value: 3, label: "3 — Brief lucidity" },
  { value: 4, label: "4 — Full, stable lucidity" },
];

const INDUCTION_TECHNIQUES: Record<string, string> = {
  none: "None / not attempted",
  dild: "DILD (dreamsign-induced)",
  mild: "MILD (mnemonic)",
  wild: "WILD (waking-induced)",
  fild: "FILD (finger-induced)",
  sild: "SILD (sensory-induced)",
  ess: "ESS (extended subconscious stimulation)",
};

const STABILIZATION_TECHNIQUES: Record<string, string> = {
  none: "None used",
  hand_check: "Hand check",
  spinning: "Spinning the dream body",
  rubbing_hands: "Rubbing hands together",
  verbal_command: "Verbal command (\"Clarity now!\")",
  math: "Simple math",
  falling_backward: "Falling backward",
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function DreamDiary() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [signs, setSigns] = useState<DreamSign[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showLibrary, setShowLibrary] = useState(false);

  const [mode, setMode] = useState<"write" | "record">("write");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [dreamType, setDreamType] = useState("ordinary");
  const [lucidityLevel, setLucidityLevel] = useState<string>("none");
  const [inductionTechnique, setInductionTechnique] = useState<string>("none");
  const [stabilizationTechnique, setStabilizationTechnique] = useState<string>("none");
  const [emotionalTone, setEmotionalTone] = useState(5);
  const [hoursBeforeWaking, setHoursBeforeWaking] = useState("");

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function load() {
    if (!user) return;
    setLoading(true);
    const [{ data: e }, { data: s }] = await Promise.all([
      supabase.from("dream_entries").select("*").order("created_at", { ascending: false }),
      supabase.from("dream_signs").select("*").order("created_at", { ascending: false }),
    ]);
    setEntries((e as DreamEntry[]) ?? []);
    setSigns((s as DreamSign[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, [user]);

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Recall streak, consecutive days with at least one recorded dream,
  // mirroring the streak on the main Journal tab.
  const recallStreak = useMemo(() => {
    if (entries.length === 0) return 0;
    const days = new Set(entries.map((e) => new Date(e.created_at).toISOString().slice(0, 10)));
    let streak = 0;
    const cursor = new Date();
    cursor.setUTCHours(0, 0, 0, 0);
    if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1);
    while (days.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return streak;
  }, [entries]);

  const lucidCount = useMemo(
    () => entries.filter((e) => e.dream_type === "lucid" || (e.lucidity_level ?? 0) >= 3).length,
    [entries],
  );

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        setAudioBlob(new Blob(chunksRef.current, { type: "audio/webm" }));
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setAudioBlob(null);
    } catch {
      toast.error("Couldn't access the microphone, check your browser permissions.");
    }
  }
  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  function resetDetails() {
    setShowDetails(false);
    setDreamType("ordinary");
    setLucidityLevel("none");
    setInductionTechnique("none");
    setStabilizationTechnique("none");
    setEmotionalTone(5);
    setHoursBeforeWaking("");
  }

  async function saveEntry() {
    if (!user) return;
    if (mode === "write" && !content.trim()) { toast.error("Write something, or switch to recording."); return; }
    if (mode === "record" && !audioBlob) { toast.error("Record something first."); return; }

    setSaving(true);
    let audioPath: string | null = null;
    if (mode === "record" && audioBlob) {
      const path = `${user.id}/${Date.now()}.webm`;
      const { error: upErr } = await supabase.storage.from("personal-audio").upload(path, audioBlob);
      if (upErr) { toast.error(upErr.message); setSaving(false); return; }
      audioPath = path;
    }

    const { error } = await supabase.from("dream_entries").insert({
      user_id: user.id,
      title: title.trim() || null,
      content: mode === "write" ? content.trim() : null,
      audio_path: audioPath,
      dream_type: showDetails ? dreamType : null,
      lucidity_level: showDetails && lucidityLevel !== "none" ? Number(lucidityLevel) : null,
      induction_technique: showDetails && inductionTechnique !== "none" ? inductionTechnique : null,
      stabilization_technique: showDetails && stabilizationTechnique !== "none" ? stabilizationTechnique : null,
      emotional_tone: showDetails ? emotionalTone : null,
      hours_before_waking: showDetails && hoursBeforeWaking ? Number(hoursBeforeWaking) : null,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Dream recorded.");
    setTitle(""); setContent(""); setAudioBlob(null);
    resetDetails();
    load();
  }

  async function markSelection(entryId: string, category: string, selectedText: string) {
    if (!user || !selectedText.trim()) return;
    const { error } = await supabase.from("dream_signs").insert({
      dream_entry_id: entryId, user_id: user.id, phrase: selectedText.trim(), category,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Dream sign saved.");
    load();
  }

  // Aggregate signs into a frequency-sorted library.
  const library = Object.values(
    signs.reduce((acc, s) => {
      const key = s.phrase.trim().toLowerCase();
      if (!acc[key]) acc[key] = { phrase: s.phrase, category: s.category, count: 0 };
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { phrase: string; category: string; count: number }>),
  ).sort((a, b) => b.count - a.count);

  return (
    <div>
      <p className="mb-3 text-sm text-muted-foreground">
        Write or record a dream. In written dreams, select any phrase afterward to tag it as a dream sign , 
        a recurring marker that tells you you're dreaming. Over time these build into your own personal library.
      </p>

      {entries.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-3">
          {recallStreak > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold">
              <BookOpen className="h-3.5 w-3.5" /> {recallStreak} day{recallStreak === 1 ? "" : "s"} recall streak
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <Moon className="h-3.5 w-3.5" /> {entries.length} dream{entries.length === 1 ? "" : "s"} recorded
          </span>
          {lucidCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
              <Sparkles className="h-3.5 w-3.5" /> {lucidCount} lucid
            </span>
          )}
        </div>
      )}

      {/* New entry */}
      <div className="mb-6 rounded-xl border border-border/60 bg-card/50 p-5">
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setMode("write")}
            className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs", mode === "write" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground")}
          >
            <PenLine className="h-3.5 w-3.5" /> Write
          </button>
          <button
            onClick={() => setMode("record")}
            className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs", mode === "record" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground")}
          >
            <Mic className="h-3.5 w-3.5" /> Record audio
          </button>
        </div>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" className="mb-3" />

        {mode === "write" ? (
          <Textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} placeholder="What happened in the dream…" />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border/60 p-6">
            {!recording && !audioBlob && (
              <button onClick={startRecording} className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
                <Mic className="h-6 w-6" />
              </button>
            )}
            {recording && (
              <button onClick={stopRecording} className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-rose-500 text-white">
                <Square className="h-6 w-6" />
              </button>
            )}
            {audioBlob && !recording && (
              <div className="w-full">
                <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                <button onClick={() => setAudioBlob(null)} className="mt-2 text-xs text-muted-foreground hover:text-rose-400">Discard and re-record</button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {recording ? "Recording, tap to stop." : audioBlob ? "Ready to save." : "Tap to start recording."}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          className="mt-3 flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground/90 hover:border-gold/50"
        >
          <span>Dream details <span className="text-muted-foreground">(optional, type, lucidity, technique used)</span></span>
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showDetails && (
          <div className="mt-3 space-y-4 rounded-lg border border-gold/30 bg-gold/5 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Dream type</Label>
                <Select value={dreamType} onValueChange={setDreamType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(DREAM_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Lucidity (Dreamsign Awareness Scale)</Label>
                <Select value={lucidityLevel} onValueChange={setLucidityLevel}>
                  <SelectTrigger><SelectValue placeholder="Not rated" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not rated</SelectItem>
                    {LUCIDITY_LEVELS.map((l) => <SelectItem key={l.value} value={String(l.value)}>{l.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Induction technique attempted</Label>
                <Select value={inductionTechnique} onValueChange={setInductionTechnique}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(INDUCTION_TECHNIQUES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Stabilization technique used</Label>
                <Select value={stabilizationTechnique} onValueChange={setStabilizationTechnique}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(STABILIZATION_TECHNIQUES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Emotional tone: {emotionalTone}/10</Label>
              <input type="range" min={1} max={10} value={emotionalTone} onChange={(e) => setEmotionalTone(Number(e.target.value))} className="w-full accent-[var(--gold)]" />
            </div>

            <div className="max-w-xs">
              <Label>Hours slept before this dream</Label>
              <Input type="number" min={0} max={24} step={0.5} value={hoursBeforeWaking} onChange={(e) => setHoursBeforeWaking(e.target.value)} placeholder="e.g. 6" />
              <p className="mt-1 text-[11px] text-muted-foreground">REM windows lengthen across the night, worth tracking whether your vivid or lucid dreams cluster late.</p>
            </div>
          </div>
        )}

        <div className="mt-3 flex justify-end">
          <Button onClick={saveEntry} disabled={saving} className="bg-gold text-gold-foreground hover:bg-gold/90">
            {saving ? "Saving…" : "Save dream"}
          </Button>
        </div>
      </div>

      {/* Dream sign library */}
      {signs.length > 0 && (
        <div className="mb-6 rounded-xl border border-gold/40 bg-gold/5 p-5">
          <button onClick={() => setShowLibrary((v) => !v)} className="flex w-full items-center justify-between text-left">
            <span className="flex items-center gap-2 font-serif text-lg text-primary">
              <BookOpen className="h-4 w-4 text-gold" /> Your dream sign library ({library.length})
            </span>
            {showLibrary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showLibrary && (
            <div className="mt-4 flex flex-wrap gap-2">
              {library.map((l) => (
                <span key={l.phrase} className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs", CATEGORY_COLOR[l.category])}>
                  <Tag className="h-3 w-3" /> {l.phrase}
                  {l.count > 1 && <span className="ml-1 rounded-full bg-background/40 px-1.5 text-[10px]">×{l.count}</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Past dream entries */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-gold" /></div>
      ) : entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">No dreams recorded yet.</p>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <DreamEntryCard
              key={e.id}
              entry={e}
              isOpen={expanded.has(e.id)}
              onToggle={() => toggleExpanded(e.id)}
              onMarkSign={(category, text) => markSelection(e.id, category, text)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DreamEntryCard({
  entry, isOpen, onToggle, onMarkSign,
}: {
  entry: DreamEntry;
  isOpen: boolean;
  onToggle: () => void;
  onMarkSign: (category: string, text: string) => void;
}) {
  const [selectedText, setSelectedText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && entry.audio_path && !audioUrl) {
      supabase.storage.from("personal-audio").createSignedUrl(entry.audio_path, 60 * 60).then(({ data }) => {
        if (data?.signedUrl) setAudioUrl(data.signedUrl);
      });
    }
  }, [isOpen, entry.audio_path, audioUrl]);

  function handleMouseUp() {
    const sel = window.getSelection()?.toString() ?? "";
    setSelectedText(sel.trim());
  }

  const hasDetails = entry.dream_type || entry.lucidity_level != null || entry.induction_technique
    || entry.stabilization_technique || entry.emotional_tone != null || entry.hours_before_waking != null;

  return (
    <article className="rounded-lg border border-border/60 bg-card/60 p-4">
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-3 text-left">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-serif text-lg text-primary">{entry.title || "Untitled dream"}</p>
            {entry.dream_type && entry.dream_type !== "ordinary" && (
              <span className={cn("rounded-full border px-2 py-0.5 text-[10px]", DREAM_TYPE_COLOR[entry.dream_type])}>
                {DREAM_TYPES[entry.dream_type]}
              </span>
            )}
            {entry.lucidity_level != null && entry.lucidity_level >= 3 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
                <Sparkles className="h-3 w-3" /> Lucid ({entry.lucidity_level}/4)
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{new Date(entry.created_at).toLocaleString()}</p>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="mt-3 border-t border-border/50 pt-3">
          {entry.content && (
            <>
              <p className="mb-2 text-xs text-muted-foreground">Select any phrase below to tag it as a dream sign.</p>
              <p onMouseUp={handleMouseUp} className="cursor-text select-text whitespace-pre-wrap rounded bg-background/30 p-3 text-sm text-foreground/85">
                {entry.content}
              </p>
              {selectedText && (
                <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-gold/40 bg-gold/5 p-3">
                  <span className="text-xs text-foreground/85">Tag “{selectedText}” as:</span>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => { onMarkSign(c.key, selectedText); setSelectedText(""); window.getSelection()?.removeAllRanges(); }}
                      className={cn("rounded-full border px-2.5 py-1 text-[11px] hover:bg-background/40", CATEGORY_COLOR[c.key])}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
          {entry.audio_path && (
            audioUrl ? <audio src={audioUrl} controls className="mt-2 w-full" /> : <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {hasDetails && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border/40 pt-3 text-xs text-muted-foreground">
              {entry.dream_type && <span>Type: {DREAM_TYPES[entry.dream_type]}</span>}
              {entry.lucidity_level != null && <span>Lucidity: {entry.lucidity_level}/4</span>}
              {entry.induction_technique && entry.induction_technique !== "none" && (
                <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3" /> {INDUCTION_TECHNIQUES[entry.induction_technique]}</span>
              )}
              {entry.stabilization_technique && entry.stabilization_technique !== "none" && (
                <span>Stabilized with: {STABILIZATION_TECHNIQUES[entry.stabilization_technique]}</span>
              )}
              {entry.emotional_tone != null && <span>Emotional tone: {entry.emotional_tone}/10</span>}
              {entry.hours_before_waking != null && <span>{entry.hours_before_waking}h into sleep</span>}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
