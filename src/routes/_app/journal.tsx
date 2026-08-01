import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/app-shell";
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
import { moonPhases, moonPhaseForDate, moonPhaseInfo } from "@/lib/moon-phase";
import { titleCaseSlug } from "@/lib/slugify";
import { pathwayLabels } from "@/lib/homework";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DreamDiary } from "@/components/course/dream-diary";
import { MalaCounterLauncher } from "@/components/course/mala-counter";
import {
  ChevronDown, ChevronUp, Droplets, Moon, Bed, Zap, Brain,
  AlertTriangle, Utensils, CloudSun, Clock, Search, Shuffle,
  Pencil, Trash2, X, Check, BookOpen,
} from "lucide-react";

// Categorized so the daily prompt actually draws from the range of work a
// serious practice covers, not just generic "how do you feel" journaling.
// Grouped only for maintainability, presented to the student as one pool.
const promptGroups: Record<string, string[]> = {
  Shadow: [
    "Name one truth you have been avoiding.",
    "Where have you performed spiritual bypass this week, softening something that needed to stay sharp?",
    "What part of yourself would you be ashamed for your teacher to see today, and why?",
    "What pattern keeps returning no matter how many times you have 'worked on it'?",
  ],
  Embodiment: [
    "Where in the body is contraction living right now? Describe it without naming an emotion.",
    "What is your breath doing when no one is watching?",
    "Which part of your body have you not consciously felt in days?",
    "If today's tension had a shape, what would it be?",
  ],
  "Shakti / Power": [
    "Where did you leak energy today, and to whom or what?",
    "What would it look like to take up the full amount of space you actually occupy?",
    "Where in your life are you asking permission you do not need?",
    "What are you afraid would happen if you stopped managing everyone's comfort but your own?",
  ],
  Devotion: [
    "What would devotion look like in the next hour, concretely, not as an idea?",
    "Who or what have you actually surrendered to this week, if anything?",
    "What are you worshipping with your attention right now, whether you meant to or not?",
  ],
  "Death / Impermanence": [
    "What is ending in you right now that you have not admitted is ending?",
    "If this practice period were your last, what would you stop postponing?",
    "What have you outgrown but keep carrying out of loyalty?",
  ],
  "Teaching / Transmission": [
    "What did you understand today that you could not have explained a year ago?",
    "Where did your own practice contradict something you teach, and what does that mean?",
    "What question from a student is still working on you?",
  ],
  Relationship: [
    "Where did you perform harmony today instead of telling the truth?",
    "Who did you actually see clearly today, without projection?",
    "What are you resenting that you have not said out loud?",
  ],
  "Dreams / the Unconscious": [
    "What image from a recent dream or vision has not let go of you?",
    "What keeps showing up uninvited in meditation lately?",
  ],
  Integration: [
    "What practice has been calling to you this week, and what have you actually done about it?",
    "What did you learn in ceremony or retreat that you have quietly let go slack on since?",
    "What is one small, concrete way today's practice showed up in an ordinary moment?",
  ],
};

const allPrompts = Object.entries(promptGroups).flatMap(([group, list]) =>
  list.map((text) => ({ group, text })),
);

function seededIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
}

function todaysPromptIndex(offset: number): number {
  const today = new Date().toISOString().slice(0, 10);
  return seededIndex(today + "|" + offset, allPrompts.length);
}

const moodFaces = ["😞", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩", "✨"];

const pathwayOptions = Object.keys(pathwayLabels) as (keyof typeof pathwayLabels)[];

export const Route = createFileRoute("/_app/journal")({
  head: () => ({ meta: [{ title: "Journal · Tantraya" }] }),
  component: Journal,
});

function Scale10({
  label, value, onChange, icon: Icon,
}: { label: string; value: number; onChange: (v: number) => void; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <Label className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-gold" /> {label}: {value}/10
      </Label>
      <input
        type="range" min={1} max={10} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--gold)]"
      />
    </div>
  );
}

type HolisticState = {
  moonPhase: string;
  sleepHours: string;
  sleepQuality: number;
  hydration: number;
  diet: string;
  energyLevel: number;
  mentalClarity: number;
  stressLevel: number;
  practiceMinutes: string;
  weather: string;
};

function defaultHolistic(): HolisticState {
  return {
    moonPhase: moonPhaseForDate(new Date()),
    sleepHours: "", sleepQuality: 5, hydration: 5, diet: "",
    energyLevel: 5, mentalClarity: 5, stressLevel: 5,
    practiceMinutes: "", weather: "",
  };
}

function HolisticFields({ state, onChange }: { state: HolisticState; onChange: (s: HolisticState) => void }) {
  const set = <K extends keyof HolisticState>(k: K, v: HolisticState[K]) => onChange({ ...state, [k]: v });
  return (
    <div className="space-y-4 rounded-lg border border-gold/30 bg-gold/5 p-4">
      <p className="text-xs text-foreground/80">
        Nothing here is required. Filling these in over time can help you notice what actually
        affects your practice, mood, and body, the moon, sleep, diet, and so on.
      </p>

      <div>
        <Label className="flex items-center gap-1.5"><Moon className="h-3.5 w-3.5 text-gold" /> Moon phase</Label>
        <Select value={state.moonPhase} onValueChange={(v) => set("moonPhase", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {moonPhases.map((m) => (
              <SelectItem key={m.key} value={m.key}>{m.glyph} {m.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5 text-gold" /> Sleep (hours)</Label>
          <Input type="number" min={0} max={24} step={0.5} value={state.sleepHours} onChange={(e) => set("sleepHours", e.target.value)} placeholder="e.g. 7.5" />
        </div>
        <div>
          <Label className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" /> Practice today (minutes)</Label>
          <Input type="number" min={0} value={state.practiceMinutes} onChange={(e) => set("practiceMinutes", e.target.value)} placeholder="e.g. 30" />
          <p className="mt-1 text-[11px] text-muted-foreground">Also tracked automatically on your Practice page. This is just for your own notes alongside the entry.</p>
        </div>
      </div>

      <Scale10 label="Sleep quality" value={state.sleepQuality} onChange={(v) => set("sleepQuality", v)} icon={Bed} />
      <Scale10 label="Hydration" value={state.hydration} onChange={(v) => set("hydration", v)} icon={Droplets} />
      <Scale10 label="Energy level" value={state.energyLevel} onChange={(v) => set("energyLevel", v)} icon={Zap} />
      <Scale10 label="Mental clarity" value={state.mentalClarity} onChange={(v) => set("mentalClarity", v)} icon={Brain} />
      <Scale10 label="Stress level" value={state.stressLevel} onChange={(v) => set("stressLevel", v)} icon={AlertTriangle} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="flex items-center gap-1.5"><Utensils className="h-3.5 w-3.5 text-gold" /> Diet notes</Label>
          <Input value={state.diet} onChange={(e) => set("diet", e.target.value)} placeholder="e.g. light, fasting, heavy meal…" />
        </div>
        <div>
          <Label className="flex items-center gap-1.5"><CloudSun className="h-3.5 w-3.5 text-gold" /> Weather</Label>
          <Input value={state.weather} onChange={(e) => set("weather", e.target.value)} placeholder="e.g. overcast, storm coming…" />
        </div>
      </div>
    </div>
  );
}

function Journal() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const [promptOffset, setPromptOffset] = useState(0);
  const prompt = useMemo(() => allPrompts[todaysPromptIndex(promptOffset)], [promptOffset]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [goals, setGoals] = useState("");
  const [mood, setMood] = useState(5);
  const [pathway, setPathway] = useState<string>("none");
  const [showHolistic, setShowHolistic] = useState(false);
  const [holistic, setHolistic] = useState<HolisticState>(() => defaultHolistic());

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: entries } = useQuery({
    queryKey: ["journal"],
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_entries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredEntries = useMemo(() => {
    if (!entries) return entries;
    const q = search.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e: any) =>
      (e.title ?? "").toLowerCase().includes(q) ||
      (e.content ?? "").toLowerCase().includes(q) ||
      (e.goals ?? "").toLowerCase().includes(q) ||
      (e.reflection_prompt ?? "").toLowerCase().includes(q),
    );
  }, [entries, search]);

  // Simple journaling streak, consecutive days (including today or yesterday)
  // with at least one entry, mirrors the spirit of the practice streak on
  // the Practice page without duplicating any of that logic.
  const journalStreak = useMemo(() => {
    if (!entries || entries.length === 0) return 0;
    const days = new Set(entries.map((e: any) => new Date(e.created_at).toISOString().slice(0, 10)));
    let streak = 0;
    const cursor = new Date();
    cursor.setUTCHours(0, 0, 0, 0);
    if (!days.has(cursor.toISOString().slice(0, 10))) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    while (days.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return streak;
  }, [entries]);

  function resetForm() {
    setTitle(""); setContent(""); setGoals(""); setMood(5); setPathway("none");
    setHolistic(defaultHolistic()); setShowHolistic(false);
  }

  const create = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("journal_entries").insert({
        user_id: user.id, title, content, reflection_prompt: prompt.text, mood, goals,
        pathway: pathway === "none" ? null : pathway,
        moon_phase: showHolistic ? holistic.moonPhase : null,
        sleep_hours: showHolistic && holistic.sleepHours ? Number(holistic.sleepHours) : null,
        sleep_quality: showHolistic ? holistic.sleepQuality : null,
        hydration: showHolistic ? holistic.hydration : null,
        diet: showHolistic ? holistic.diet.trim() || null : null,
        energy_level: showHolistic ? holistic.energyLevel : null,
        mental_clarity: showHolistic ? holistic.mentalClarity : null,
        stress_level: showHolistic ? holistic.stressLevel : null,
        practice_minutes: showHolistic && holistic.practiceMinutes ? Number(holistic.practiceMinutes) : null,
        weather: showHolistic ? holistic.weather.trim() || null : null,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Entry saved.");
      resetForm();
      qc.invalidateQueries({ queryKey: ["journal"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("journal_entries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Entry deleted.");
      setDeletingId(null);
      qc.invalidateQueries({ queryKey: ["journal"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Journal" subtitle="Reflect, set intentions, track the inner weather." />

      <div className="mb-6 flex justify-end">
        <MalaCounterLauncher />
      </div>

      <Tabs defaultValue="journal">
        <TabsList>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="dreams">Dream Diary</TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="mt-6">
      <section className="rounded-xl border border-border/60 bg-card/70 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold">Today's prompt · {prompt.group}</p>
            <p className="mt-1 font-serif text-2xl text-primary">{prompt.text}</p>
          </div>
          {journalStreak > 0 && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs text-gold">
              <BookOpen className="h-3.5 w-3.5" /> {journalStreak} day{journalStreak === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setPromptOffset((n) => n + 1)}
          className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold"
        >
          <Shuffle className="h-3 w-3" /> Not today, give me another
        </button>

        <div className="mt-5 space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A few words…" />
          </div>
          <div>
            <Label>Reflection</Label>
            <Textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            <Label>Intention or goal</Label>
            <Input value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="What I am moving toward…" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Mood: {moodFaces[mood - 1]} {mood}/10</Label>
              <input type="range" min={1} max={10} value={mood} onChange={(e) => setMood(Number(e.target.value))} className="w-full accent-[var(--gold)]" />
            </div>
            <div>
              <Label>Pathway this relates to (optional)</Label>
              <Select value={pathway} onValueChange={setPathway}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {pathwayOptions.map((p) => (
                    <SelectItem key={p} value={p}>{pathwayLabels[p]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowHolistic((s) => !s)}
            className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground/90 hover:border-gold/50"
          >
            <span>Holistic check-in <span className="text-muted-foreground">(optional, sleep, diet, moon, and more)</span></span>
            {showHolistic ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showHolistic && <HolisticFields state={holistic} onChange={setHolistic} />}

          <Button onClick={() => create.mutate()} disabled={create.isPending || !content.trim()} className="bg-gold text-gold-foreground hover:bg-gold/90">
            {create.isPending ? "Saving…" : "Save entry"}
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-primary">Past entries</h2>
          <div className="relative w-full max-w-xs sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entries…"
              className="pl-8"
            />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {filteredEntries?.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {search ? "No entries match your search." : "No entries yet."}
            </p>
          )}
          {filteredEntries?.map((e: any) => {
            const isOpen = expanded.has(e.id);
            const isEditing = editingId === e.id;
            const moon = moonPhaseInfo(e.moon_phase);
            const preview = e.content?.length > 140 ? e.content.slice(0, 140) + "…" : e.content;
            const hasHolistic = e.sleep_hours != null || e.sleep_quality != null || e.hydration != null
              || e.energy_level != null || e.mental_clarity != null || e.stress_level != null
              || e.practice_minutes != null || e.diet || e.weather;

            if (isEditing) {
              return (
                <EntryEditor
                  key={e.id}
                  entry={e}
                  onCancel={() => setEditingId(null)}
                  onSaved={() => {
                    setEditingId(null);
                    qc.invalidateQueries({ queryKey: ["journal"] });
                  }}
                />
              );
            }

            return (
              <article key={e.id} className="rounded-lg border border-border/60 bg-card/60 p-4">
                <button type="button" onClick={() => toggleExpanded(e.id)} className="flex w-full items-start justify-between gap-3 text-left">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-serif text-lg text-primary">{e.title || "Untitled"}</p>
                      {e.mood != null && <span className="text-base" title={`Mood: ${e.mood}/10`}>{moodFaces[e.mood - 1]}</span>}
                      {moon && <span title={moon.label}>{moon.glyph}</span>}
                      {e.pathway && (
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
                          {pathwayLabels[e.pathway] ?? e.pathway}
                        </span>
                      )}
                      {e.course_slug && (
                        <span className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                          {titleCaseSlug(e.course_slug)}{e.lesson_slug ? ` · ${titleCaseSlug(e.lesson_slug)}` : ""}
                        </span>
                      )}
                      {e.sleep_hours != null && <span className="text-xs text-muted-foreground" title="Sleep hours">😴 {e.sleep_hours}h</span>}
                      {e.hydration != null && <Droplets className="h-3.5 w-3.5 text-blue-400" />}
                      {e.energy_level != null && <Zap className="h-3.5 w-3.5 text-amber-400" />}
                    </div>
                    {e.reflection_prompt && <p className="mt-1 text-xs italic text-gold">{e.reflection_prompt}</p>}
                    {!isOpen && preview && <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{preview}</p>}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 space-y-3 border-t border-border/50 pt-3">
                    <p className="whitespace-pre-wrap text-sm text-foreground/85">{e.content}</p>
                    {e.goals && (
                      <p className="text-sm text-foreground/80"><span className="text-gold">Intention:</span> {e.goals}</p>
                    )}
                    {hasHolistic && (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {e.mood != null && <p className="text-xs text-muted-foreground">Mood: {moodFaces[e.mood - 1]} {e.mood}/10</p>}
                        {moon && <p className="text-xs text-muted-foreground">Moon: {moon.glyph} {moon.label}</p>}
                        {e.sleep_hours != null && <p className="text-xs text-muted-foreground">Sleep: {e.sleep_hours}h</p>}
                        {e.sleep_quality != null && <p className="text-xs text-muted-foreground">Sleep quality: {e.sleep_quality}/10</p>}
                        {e.hydration != null && <p className="text-xs text-muted-foreground">Hydration: {e.hydration}/10</p>}
                        {e.energy_level != null && <p className="text-xs text-muted-foreground">Energy: {e.energy_level}/10</p>}
                        {e.mental_clarity != null && <p className="text-xs text-muted-foreground">Mental clarity: {e.mental_clarity}/10</p>}
                        {e.stress_level != null && <p className="text-xs text-muted-foreground">Stress: {e.stress_level}/10</p>}
                        {e.practice_minutes != null && <p className="text-xs text-muted-foreground">Practice: {e.practice_minutes} min</p>}
                        {e.diet && <p className="text-xs text-muted-foreground">Diet: {e.diet}</p>}
                        {e.weather && <p className="text-xs text-muted-foreground">Weather: {e.weather}</p>}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(e.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      {deletingId === e.id ? (
                        <span className="inline-flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Delete this entry?</span>
                          <button
                            type="button"
                            onClick={() => remove.mutate(e.id)}
                            disabled={remove.isPending}
                            className="text-destructive hover:underline"
                          >
                            Yes, delete
                          </button>
                          <button type="button" onClick={() => setDeletingId(null)} className="text-muted-foreground hover:underline">
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeletingId(e.id)}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
        </TabsContent>

        <TabsContent value="dreams" className="mt-6">
          <DreamDiary />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EntryEditor({
  entry, onCancel, onSaved,
}: { entry: any; onCancel: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(entry.title ?? "");
  const [content, setContent] = useState(entry.content ?? "");
  const [goals, setGoals] = useState(entry.goals ?? "");
  const [mood, setMood] = useState<number>(entry.mood ?? 5);
  const [pathway, setPathway] = useState<string>(entry.pathway ?? "none");
  const hadHolistic = entry.sleep_hours != null || entry.sleep_quality != null || entry.hydration != null
    || entry.energy_level != null || entry.mental_clarity != null || entry.stress_level != null
    || entry.practice_minutes != null || !!entry.diet || !!entry.weather || !!entry.moon_phase;
  const [showHolistic, setShowHolistic] = useState(hadHolistic);
  const [holistic, setHolistic] = useState<HolisticState>({
    moonPhase: entry.moon_phase ?? moonPhaseForDate(new Date()),
    sleepHours: entry.sleep_hours != null ? String(entry.sleep_hours) : "",
    sleepQuality: entry.sleep_quality ?? 5,
    hydration: entry.hydration ?? 5,
    diet: entry.diet ?? "",
    energyLevel: entry.energy_level ?? 5,
    mentalClarity: entry.mental_clarity ?? 5,
    stressLevel: entry.stress_level ?? 5,
    practiceMinutes: entry.practice_minutes != null ? String(entry.practice_minutes) : "",
    weather: entry.weather ?? "",
  });

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("journal_entries").update({
        title, content, goals, mood,
        pathway: pathway === "none" ? null : pathway,
        moon_phase: showHolistic ? holistic.moonPhase : null,
        sleep_hours: showHolistic && holistic.sleepHours ? Number(holistic.sleepHours) : null,
        sleep_quality: showHolistic ? holistic.sleepQuality : null,
        hydration: showHolistic ? holistic.hydration : null,
        diet: showHolistic ? holistic.diet.trim() || null : null,
        energy_level: showHolistic ? holistic.energyLevel : null,
        mental_clarity: showHolistic ? holistic.mentalClarity : null,
        stress_level: showHolistic ? holistic.stressLevel : null,
        practice_minutes: showHolistic && holistic.practiceMinutes ? Number(holistic.practiceMinutes) : null,
        weather: showHolistic ? holistic.weather.trim() || null : null,
        updated_at: new Date().toISOString(),
      } as any).eq("id", entry.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Entry updated.");
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <article className="rounded-lg border border-gold/40 bg-card/70 p-4">
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label>Reflection</Label>
          <Textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <Label>Intention or goal</Label>
          <Input value={goals} onChange={(e) => setGoals(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Mood: {moodFaces[mood - 1]} {mood}/10</Label>
            <input type="range" min={1} max={10} value={mood} onChange={(e) => setMood(Number(e.target.value))} className="w-full accent-[var(--gold)]" />
          </div>
          <div>
            <Label>Pathway this relates to (optional)</Label>
            <Select value={pathway} onValueChange={setPathway}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {pathwayOptions.map((p) => (
                  <SelectItem key={p} value={p}>{pathwayLabels[p]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHolistic((s) => !s)}
          className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground/90 hover:border-gold/50"
        >
          <span>Holistic check-in</span>
          {showHolistic ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showHolistic && <HolisticFields state={holistic} onChange={setHolistic} />}

        <div className="flex items-center gap-2">
          <Button onClick={() => save.mutate()} disabled={save.isPending || !content.trim()} className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Check className="h-3.5 w-3.5" /> {save.isPending ? "Saving…" : "Save changes"}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-3.5 w-3.5" /> Cancel
          </Button>
        </div>
      </div>
    </article>
  );
}
