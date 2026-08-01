import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bell, BellOff, Check, Flame, Plus, Sparkles, Trash2, Pencil,
  Sun, Moon, Calendar as CalendarIcon, Award, ListChecks, Settings2,
  Link2, Unlink, Scale, HelpCircle, ChevronDown, PauseCircle, PlayCircle,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  alchemyStages, computeAlchemy, currentStreak, toISO,
} from "@/lib/alchemy";
import { useOverallAlchemy } from "@/lib/use-overall-alchemy";
import { practiceCatalog, findPathway, findCatalogPractice } from "@/data/practice-catalog";

export const Route = createFileRoute("/_app/schedule")({
  head: () => ({ meta: [{ title: "Practice Organiser · Tantraya" }] }),
  component: PracticePage,
});

/* ───────── constants ───────── */

const bodies = [
  { v: "physical",  label: "Physical",  hint: "asana, qigong, movement" },
  { v: "etheric",   label: "Etheric",   hint: "pranayama, energy work" },
  { v: "emotional", label: "Emotional", hint: "metta, devotion, heart" },
  { v: "mental",    label: "Mental",    hint: "mantra, mindfulness" },
  { v: "general",   label: "Integration", hint: "ritual, integration" },
] as const;

const pathways = [
  { v: "daoist",   label: "Daoist" },
  { v: "buddhist", label: "Buddhist" },
  { v: "yogic",    label: "Yogic" },
  { v: "tantric",  label: "Tantric" },
  { v: "magick",   label: "Magick" },
  { v: "bhakti",   label: "Bhakti" },
  { v: "general",  label: "Core" },
] as const;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const iconOptions = ["☉","☽","☿","♀","♂","♃","♄","🜂","🜄","🜁","🜃","☯","✦","✧","❀","☘"];

type Practice = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  pathway: string | null;
  body_layer: string;
  target_minutes: number | null;
  days_of_week: number[] | null;
  preferred_time: string | null; // "HH:MM:SS"
  icon: string | null;
  active: boolean;
  course_slug: string | null;
  lesson_slug: string | null;
  material_id: string | null;
  removed_at: string | null;
};

type LogRow = {
  id: string;
  practice_id: string;
  log_date: string;
  completed: boolean;
  body_layer: string | null;
};

/* ───────── page ───────── */

function PracticePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const today = toISO(new Date());
  const dow = new Date().getDay();
  const [showHelp, setShowHelp] = useState(false);

  const { data: rawPractices = [] } = useQuery({
    queryKey: ["practices", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("*")
        .is("removed_at", null)
        .order("preferred_time", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as Practice[];
    },
  });

  // Local, render-level overrides for Pause/Remove. Applied on click, before
  // the network round-trip resolves. These are intentionally STICKY for the
  // lifetime of this page/component: they are never auto-cleared by incoming
  // query data, because a stale/out-of-order background refetch can otherwise
  // momentarily look like "the server doesn't have this change yet" and
  // un-hide something that was already removed/paused. The DB is always the
  // source of truth on the next fresh page load, so clearing only on
  // unmount (natural useState reset) is safe and avoids the flicker/revert bug.
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [activeOverrides, setActiveOverrides] = useState<Record<string, boolean>>({});

  const allPractices = useMemo(() => {
    return rawPractices
      .filter((p) => !removedIds.has(p.id))
      .map((p) => (p.id in activeOverrides ? { ...p, active: activeOverrides[p.id] } : p));
  }, [rawPractices, removedIds, activeOverrides]);

  // Active practices are what count toward Today, This Week, and Alchemy.
  // Paused practices (active: false) still exist and are shown in Manage so they can be resumed.
  const practices = useMemo(() => allPractices.filter((p) => p.active), [allPractices]);

  const { data: logs = [] } = useQuery({
    queryKey: ["practice_logs", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practice_logs")
        .select("id, practice_id, log_date, completed, body_layer")
        .order("log_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LogRow[];
    },
  });

  const toggle = useMutation({
    mutationFn: async (p: { practice_id: string; date: string; completed: boolean; body_layer?: string | null }) => {
      if (!user) throw new Error("Not authenticated");
      if (p.completed) {
        const { error } = await supabase
          .from("practice_logs")
          .upsert(
            { user_id: user.id, practice_id: p.practice_id, log_date: p.date, completed: true, body_layer: (p.body_layer ?? null) as "general" | "physical" | "etheric" | "emotional" | "mental" | null },
            { onConflict: "user_id,practice_id,log_date" },
          );
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("practice_logs")
          .delete()
          .eq("practice_id", p.practice_id)
          .eq("log_date", p.date);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["practice_logs"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  // Derived: practices scheduled for today
  const todaysPractices = useMemo(
    () => practices.filter((p) => !p.days_of_week || p.days_of_week.includes(dow)),
    [practices, dow],
  );

  const isDone = (practiceId: string, date: string) =>
    logs.some((l) => l.practice_id === practiceId && l.log_date === date && l.completed);

  // Scheduled per-day counts (for alchemy perfect-day bonus)
  const scheduledPerDay = useMemo(() => {
    const m: Record<string, number> = {};
    for (const l of logs) {
      // Use unique days seen in logs as approximate scope
      const wd = new Date(l.log_date + "T00:00:00Z").getUTCDay();
      const scheduledCount = practices.filter(
        (p) => !p.days_of_week || p.days_of_week.includes(wd),
      ).length;
      m[l.log_date] = scheduledCount;
    }
    return m;
  }, [logs, practices]);

  const { overall: alchemy, homeworkMarks, awardMarks, bodyAlchemy } = useOverallAlchemy();
  const streak = useMemo(() => currentStreak(logs), [logs]);
  const materialTitles = useMaterialTitles(
    allPractices.filter((p) => p.material_id).map((p) => p.material_id!),
  );

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Practice Organiser"
        subtitle="Design your sādhanā by pathway or by body. Tick the work as you do it. The Stone is built one day at a time."
      />

      <button
        type="button"
        onClick={() => setShowHelp((v) => !v)}
        className="mb-6 flex w-full items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left text-sm text-muted-foreground transition hover:border-gold/40"
      >
        <span className="inline-flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-gold" /> How the Practice Organiser works
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", showHelp && "rotate-180")} />
      </button>

      {showHelp && (
        <div className="mb-8 -mt-3 space-y-3 rounded-xl border border-gold/30 bg-card/40 p-5 text-sm text-foreground/85">
          <p>
            A <span className="text-gold">practice</span> is anything you want to track and repeat, a form, a
            meditation, a chant. You can build one three ways: write it yourself in <b>Manage</b>, pick "From a
            course" to link it to a specific chapter (browsable by pathway or, across every pathway at once, by
            body), or pick "From a document" to link it to something a teacher has uploaded. You can also add a
            practice directly from any course chapter or uploaded material's own Practice section, it appears here
            automatically either way, and stays linked in both directions: edit it here and jump back to its source,
            or find it from the source and see it's already in your schedule.
          </p>
          <p>
            Whichever way you add a practice, <span className="text-gold">you choose which of the Five Bodies it
            works on</span>, Physical, Etheric, Emotional, Mental, or Integration. Nothing is assigned for you
            silently; any suggested body is just a starting point you can change before saving, and again later from
            Manage.
          </p>
          <p>
            <b>Today</b> shows what's scheduled for today with a tick to mark it done. <b>This Week</b> is a
            read-only grid of the week so far. <b>Manage</b> is where you add, edit, retime, or unlink practices.
            <b> Alchemy</b> is where completions become marks: your overall Stone climbs the seven operations from
            Prima Materia to Coagulation, counting practice completions, graded homework's awarded marks, and any
            marks a teacher gives you directly, and because you chose a body for each practice, each of the Five
            Bodies climbs that same ladder in parallel, counted only from the completions tagged with it. Touch
            three or more bodies within a week and you earn a balance bonus toward the overall Stone too, so range
            is rewarded, not just repetition in one body. This same total also appears on your Progress page.
          </p>
        </div>
      )}

      {/* Top status bar */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <StatusCard
          icon={<Flame className="h-4 w-4 text-gold" />}
          label="Current streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
        />
        <StatusCard
          icon={<Sparkles className="h-4 w-4 text-gold" />}
          label="Alchemy stage"
          value={`${alchemy.currentStage.symbol}  ${alchemy.currentStage.name}`}
        />
        <StatusCard
          icon={<Award className="h-4 w-4 text-gold" />}
          label="Marks earned"
          value={`${alchemy.marks}${alchemy.nextStage ? `  /  ${alchemy.nextStage.threshold}` : ""}`}
          sub={alchemy.nextStage ? `Next: ${alchemy.nextStage.name}` : "Stone achieved"}
        />
      </div>

      <Tabs defaultValue="today">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today"><Sun className="mr-1 h-3.5 w-3.5" />Today</TabsTrigger>
          <TabsTrigger value="week"><CalendarIcon className="mr-1 h-3.5 w-3.5" />This Week</TabsTrigger>
          <TabsTrigger value="manage"><Settings2 className="mr-1 h-3.5 w-3.5" />Manage</TabsTrigger>
          <TabsTrigger value="alchemy"><Sparkles className="mr-1 h-3.5 w-3.5" />Alchemy</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <TodayPanel
            practices={todaysPractices}
            isDone={(id) => isDone(id, today)}
            onToggle={(id, c) => {
              const p = todaysPractices.find((x) => x.id === id);
              toggle.mutate({ practice_id: id, date: today, completed: c, body_layer: p?.body_layer ?? null });
            }}
            allPracticesEmpty={allPractices.length === 0}
            materialTitles={materialTitles}
            onRemoved={(id) => setRemovedIds((prev) => new Set(prev).add(id))}
          />
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <WeekPanel practices={practices} logs={logs} materialTitles={materialTitles} />
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <ManagePanel
            practices={allPractices}
            materialTitles={materialTitles}
            onRemoved={(id) => setRemovedIds((prev) => new Set(prev).add(id))}
            onActiveChanged={(id, active) => setActiveOverrides((prev) => ({ ...prev, [id]: active }))}
          />
        </TabsContent>

        <TabsContent value="alchemy" className="mt-6">
          <AlchemyPanel alchemy={alchemy} bodyAlchemy={bodyAlchemy} homeworkMarks={homeworkMarks} awardMarks={awardMarks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ───────── Today ───────── */

function StatusCard({
  icon, label, value, sub,
}: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-gold/30 bg-card/60 p-4">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
        {icon} {label}
      </p>
      <p className="mt-1 font-serif text-lg text-primary">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function TodayPanel({
  practices, isDone, onToggle, allPracticesEmpty, materialTitles, onRemoved,
}: {
  practices: Practice[];
  isDone: (id: string) => boolean;
  onToggle: (id: string, completed: boolean) => void;
  allPracticesEmpty: boolean;
  materialTitles: Record<string, string>;
  onRemoved: (id: string) => void;
}) {
  const remaining = practices.filter((p) => !isDone(p.id));
  const completed = practices.length - remaining.length;

  return (
    <div className="space-y-4">
      <ReminderBar practices={practices} isDone={isDone} />

      {practices.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-card/40 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Today's sādhanā</span>
            <span>{completed} / {practices.length} complete</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
            <div
              className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
              style={{ width: `${(completed / Math.max(1, practices.length)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {allPracticesEmpty && (
        <EmptyState
          title="No practices yet"
          body="Head to the Manage tab to add your first practice. Begin with one or two, the alchemist's work is slow."
        />
      )}

      {practices.length === 0 && !allPracticesEmpty && (
        <EmptyState
          title="Nothing scheduled today"
          body="Your practices are scheduled for other days. Enjoy the rest, or visit Manage to add one for today."
        />
      )}

      {practices.length > 0 && (
        <ul className="space-y-2">
          {practices.map((p) => {
            const done = isDone(p.id);
            const href = sourceHref(p);
            const label = sourceLabel(p, materialTitles);
            return (
              <li
                key={p.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg border bg-card/60 p-3 transition",
                  done ? "border-emerald-500/40 bg-emerald-500/5" : "border-border/60 hover:border-gold/40",
                )}
              >
                <Checkbox
                  checked={done}
                  onCheckedChange={(v) => onToggle(p.id, !!v)}
                />
                <span className="text-xl">{p.icon || "•"}</span>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium text-foreground truncate", done && "line-through text-muted-foreground")}>
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.preferred_time ? formatTime(p.preferred_time) + " · " : ""}
                    {p.body_layer}
                    {p.pathway && p.pathway !== "general" ? ` · ${p.pathway}` : ""}
                    {p.target_minutes ? ` · ${p.target_minutes} min` : ""}
                  </p>
                  {label && (
                    href ? (
                      <Link
                        to={href}
                        className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gold hover:underline"
                      >
                        <Link2 className="h-3 w-3" /> {label}
                      </Link>
                    ) : (
                      <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gold">
                        <Link2 className="h-3 w-3" /> {label}
                      </span>
                    )
                  )}
                </div>
                {done && <Check className="h-4 w-4 text-emerald-500" />}
                <RemoveButton id={p.id} name={p.name} onRemoved={onRemoved} />
              </li>
            );
          })}
        </ul>
      )}

      {practices.length > 0 && completed === practices.length && (
        <div className="rounded-xl border border-gold/40 bg-gold/10 p-4 text-center">
          <p className="font-serif text-lg text-primary">The day's work is complete.</p>
          <p className="text-xs text-foreground/80">Rest in what you have done.</p>
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-8 text-center">
      <p className="font-serif text-lg text-primary">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

/* ───────── Reminder bar (in-app + browser notification) ───────── */

function ReminderBar({
  practices, isDone,
}: { practices: Practice[]; isDone: (id: string) => boolean }) {
  const [granted, setGranted] = useState<NotificationPermission>("default");
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("tantraya.reminders") === "1";
  });

  useEffect(() => {
    if (typeof Notification !== "undefined") setGranted(Notification.permission);
  }, []);

  // Schedule notifications for today's preferred times while the tab is open
  useEffect(() => {
    if (!enabled || granted !== "granted") return;
    const timers: number[] = [];
    const now = new Date();
    for (const p of practices) {
      if (!p.preferred_time || isDone(p.id)) continue;
      const [h, m] = p.preferred_time.split(":").map(Number);
      const at = new Date();
      at.setHours(h, m ?? 0, 0, 0);
      const delay = at.getTime() - now.getTime();
      if (delay > 0 && delay < 12 * 3600 * 1000) {
        const id = window.setTimeout(() => {
          new Notification("Time to practise", {
            body: `${p.icon ? p.icon + " " : ""}${p.name}`,
            icon: "/favicon.ico",
          });
        }, delay);
        timers.push(id);
      }
    }
    return () => timers.forEach((t) => clearTimeout(t));
  }, [enabled, granted, practices, isDone]);

  const askPermission = async () => {
    if (typeof Notification === "undefined") {
      toast.error("Notifications not supported on this device.");
      return;
    }
    const res = await Notification.requestPermission();
    setGranted(res);
    if (res === "granted") {
      setEnabled(true);
      localStorage.setItem("tantraya.reminders", "1");
      toast.success("Reminders enabled");
    }
  };

  const toggle = (v: boolean) => {
    setEnabled(v);
    localStorage.setItem("tantraya.reminders", v ? "1" : "0");
    if (v && granted !== "granted") askPermission();
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-2.5 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        {enabled && granted === "granted"
          ? <Bell className="h-3.5 w-3.5 text-gold" />
          : <BellOff className="h-3.5 w-3.5" />}
        <span>
          {enabled && granted === "granted"
            ? "Daily reminders on for practices with a set time"
            : "Daily reminders are off"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {granted === "denied" && <span className="text-rose-400">Blocked in browser</span>}
        <Switch checked={enabled && granted === "granted"} onCheckedChange={toggle} />
      </div>
    </div>
  );
}

/* ───────── Week ───────── */

function WeekPanel({
  practices, logs, materialTitles,
}: { practices: Practice[]; logs: LogRow[]; materialTitles: Record<string, string> }) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const isDone = (pid: string, date: string) =>
    logs.some((l) => l.practice_id === pid && l.log_date === date && l.completed);

  if (practices.length === 0) {
    return <EmptyState title="No practices to show" body="Add practices in Manage to see your week." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-card/60 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Practice</th>
            {week.map((d, i) => (
              <th key={i} className={cn("p-3 text-center", toISO(d) === toISO(today) && "text-gold")}>
                <div>{dayNames[i]}</div>
                <div className="text-[10px] font-normal">{d.getDate()}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {practices.map((p) => {
            const href = sourceHref(p);
            const label = sourceLabel(p, materialTitles);
            return (
            <tr key={p.id} className="border-t border-border/40">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span>{p.icon || "•"}</span>
                  <div>
                    <p className="font-medium text-foreground">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.body_layer}</p>
                    {label && (
                      href ? (
                        <Link
                          to={href}
                          className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gold hover:underline"
                        >
                          <Link2 className="h-3 w-3" /> {label}
                        </Link>
                      ) : (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gold">
                          <Link2 className="h-3 w-3" /> {label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </td>
              {week.map((d) => {
                const dateStr = toISO(d);
                const wd = d.getDay();
                const scheduled = !p.days_of_week || p.days_of_week.includes(wd);
                const done = isDone(p.id, dateStr);
                if (!scheduled) {
                  return <td key={dateStr} className="p-3 text-center text-muted-foreground/40">, </td>;
                }
                return (
                  <td key={dateStr} className="p-3 text-center">
                    <span className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      done ? "bg-emerald-500/20 text-emerald-400" : "border border-border/60 text-muted-foreground",
                    )}>
                      {done ? "✓" : ""}
                    </span>
                  </td>
                );
              })}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ───────── Manage ───────── */

function useMaterialTitles(ids: string[]) {
  const key = [...new Set(ids)].sort().join(",");
  const { data } = useQuery({
    queryKey: ["material-titles", key],
    enabled: ids.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("id, title")
        .in("id", [...new Set(ids)]);
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((m) => [m.id, m.title])) as Record<string, string>;
    },
  });
  return data ?? {};
}

function ManagePanel({
  practices, materialTitles, onRemoved, onActiveChanged,
}: {
  practices: Practice[];
  materialTitles: Record<string, string>;
  onRemoved: (id: string) => void;
  onActiveChanged: (id: string, active: boolean) => void;
}) {
  const [editing, setEditing] = useState<Practice | null>(null);
  const [open, setOpen] = useState(false);

  const activePractices = practices.filter((p) => p.active);
  const pausedPractices = practices.filter((p) => !p.active);

  const renderRow = (p: Practice) => {
    const href = sourceHref(p);
    const label = sourceLabel(p, materialTitles);
    return (
      <li
        key={p.id}
        className={cn(
          "flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 p-3",
          !p.active && "opacity-60",
        )}
      >
        <span className="text-xl">{p.icon || "•"}</span>
        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-2 font-medium text-foreground">
            {p.name}
            {!p.active && (
              <span className="rounded-full border border-border/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                Paused
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {p.body_layer}
            {p.pathway && p.pathway !== "general" ? ` · ${p.pathway}` : ""}
            {p.target_minutes ? ` · ${p.target_minutes} min` : ""}
            {p.preferred_time ? ` · ${formatTime(p.preferred_time)}` : ""}
            {p.days_of_week && p.days_of_week.length < 7
              ? ` · ${p.days_of_week.map((d) => dayNames[d]).join(" ")}`
              : ""}
          </p>
          {label && (
            href ? (
              <Link
                to={href}
                className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gold hover:underline"
              >
                <Link2 className="h-3 w-3" /> {label}
              </Link>
            ) : (
              <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gold">
                <Link2 className="h-3 w-3" /> {label}
              </span>
            )
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setOpen(true); }} title="Edit">
          <Pencil className="h-4 w-4" />
        </Button>
        <PauseResumeButton id={p.id} active={p.active} onChanged={onActiveChanged} />
        <RemoveButton id={p.id} name={p.name} onRemoved={onRemoved} />
      </li>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {activePractices.length} active practice{activePractices.length === 1 ? "" : "s"}
          {pausedPractices.length > 0
            ? ` · ${pausedPractices.length} paused`
            : ""}
        </p>
        <Button
          onClick={() => { setEditing(null); setOpen(true); }}
          className="bg-gold text-gold-foreground hover:bg-gold/90"
        >
          <Plus className="h-4 w-4" /> Add practice
        </Button>
      </div>

      {practices.length === 0 ? (
        <EmptyState
          title="No practices yet"
          body="Begin with one. Choose the body layer it serves and (optionally) the pathway it belongs to."
        />
      ) : (
        <>
          <ul className="space-y-2">
            {activePractices.map(renderRow)}
          </ul>

          {pausedPractices.length > 0 && (
            <div className="pt-2">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Paused</p>
              <ul className="space-y-2">
                {pausedPractices.map(renderRow)}
              </ul>
            </div>
          )}
        </>
      )}

      <PracticeDialog
        open={open}
        onOpenChange={setOpen}
        practice={editing}
      />
    </div>
  );
}

/** Pause keeps the practice around (hidden from Today/This Week/Alchemy, shown dimmed in Manage) so it can be resumed later. */
function PauseResumeButton({
  id, active, onChanged,
}: { id: string; active: boolean; onChanged: (id: string, active: boolean) => void }) {
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("practices").update({ active: !active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(active ? "Practice paused" : "Practice resumed");
    },
    onError: (e: Error) => {
      toast.error(e.message);
      onChanged(id, active); // revert the instant UI flip
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["practices"] });
    },
  });
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        onChanged(id, !active); // flip instantly, don't wait on the network
        m.mutate();
      }}
      disabled={m.isPending}
      title={active ? "Pause (stop scheduling, keep for later)" : "Resume"}
    >
      {active ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4 text-emerald-500" />}
    </Button>
  );
}

/**
 * Remove from schedule hides the practice everywhere in the app (Today,
 * This Week, Alchemy, Manage) but keeps the row and its completion history
 * in the database — it's a soft delete (removed_at), not a hard delete.
 * Distinct from Pause: pause stays visible/resumable in Manage, remove does not.
 */
function RemoveButton({
  id, name, onRemoved,
}: { id: string; name: string; onRemoved: (id: string) => void }) {
  const qc = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const m = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("practices").update({ removed_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Practice removed from schedule");
    },
    onError: (e: Error) => {
      toast.error(`Couldn't remove it, please try again: ${e.message}`);
      // Note: it stays hidden locally until the page is reloaded even though
      // the removal failed server-side; rare case, a refresh will restore it.
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["practices"] });
    },
  });
  return (
    <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <Button variant="ghost" size="icon" onClick={() => setConfirmOpen(true)} title="Remove from schedule">
        <Trash2 className="h-4 w-4 text-rose-400" />
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove "{name}" from your schedule?</AlertDialogTitle>
          <AlertDialogDescription>
            It will no longer appear anywhere on your schedule or in Manage. Your completion history for it is kept,
            not deleted. If you want it back, add it again (e.g. from Manage or its source course/material) as a
            fresh practice. If you just want to stop it temporarily, use Pause instead, it stays here and you can
            resume it anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onRemoved(id); // hide instantly, don't wait on the network
              setConfirmOpen(false);
              m.mutate();
            }}
            disabled={m.isPending}
            className="bg-rose-500 text-white hover:bg-rose-600"
          >
            Remove from schedule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PracticeDialog({
  open, onOpenChange, practice,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  practice: Practice | null;
}) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const editing = !!practice;

  const [mode, setMode] = useState<"course" | "material" | "custom">("course");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pathway, setPathway] = useState<string>("general");
  const [body, setBody] = useState<string>("physical");
  const [minutes, setMinutes] = useState<number>(20);
  const [time, setTime] = useState<string>("");
  const [days, setDays] = useState<number[]>([0,1,2,3,4,5,6]);
  const [icon, setIcon] = useState<string>("");

  // the source link, at most one of (course+lesson) or material is set
  const [linkCourseSlug, setLinkCourseSlug] = useState<string | null>(null);
  const [linkLessonSlug, setLinkLessonSlug] = useState<string | null>(null);
  const [linkMaterialId, setLinkMaterialId] = useState<string | null>(null);

  // browse-from-course state
  const [browsePathway, setBrowsePathway] = useState<string>("");
  const [browseCourse, setBrowseCourse] = useState<string>("");
  const [browsePractice, setBrowsePractice] = useState<string>("");

  // "From a course" can be browsed pathway-first (drill down) or body-first
  // (see every practice tagged with one body, across every pathway at once)
  const [browseAxis, setBrowseAxis] = useState<"pathway" | "body">("pathway");
  const [browseBody, setBrowseBody] = useState<string>("");
  const flatByBody = useMemo(() => {
    if (!browseBody) return [];
    return practiceCatalog.flatMap((pw) =>
      pw.courses.flatMap((c) =>
        c.practices
          .filter((p) => p.body_layer === browseBody)
          .map((p) => ({
            key: `${pw.v}::${c.slug}::${p.slug}`,
            pathwayV: pw.v,
            pathwayLabel: pw.label,
            courseTitle: c.title,
            practice: p,
          })),
      ),
    );
  }, [browseBody]);

  // browse-from-document state
  const [browseMaterialPathway, setBrowseMaterialPathway] = useState<string>("");
  const [browseMaterialId, setBrowseMaterialId] = useState<string>("");
  const { data: browsableMaterials = [] } = useQuery({
    queryKey: ["browse-materials", browseMaterialPathway],
    enabled: mode === "material" && !!browseMaterialPathway,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("id, title, description, format")
        .eq("pathway", browseMaterialPathway)
        .eq("published", true)
        .order("title", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    if (practice) {
      setMode("custom");
      setName(practice.name);
      setDescription(practice.description ?? "");
      setPathway(practice.pathway ?? "general");
      setBody(practice.body_layer);
      setMinutes(practice.target_minutes ?? 20);
      setTime(practice.preferred_time?.slice(0,5) ?? "");
      setDays(practice.days_of_week ?? [0,1,2,3,4,5,6]);
      setIcon(practice.icon ?? "");
      setLinkCourseSlug(practice.course_slug);
      setLinkLessonSlug(practice.lesson_slug);
      setLinkMaterialId(practice.material_id);
    } else {
      setMode("course");
      setName(""); setDescription(""); setPathway("general"); setBody("physical");
      setMinutes(20); setTime(""); setDays([0,1,2,3,4,5,6]); setIcon("");
      setBrowsePathway(""); setBrowseCourse(""); setBrowsePractice("");
      setBrowseMaterialPathway(""); setBrowseMaterialId("");
      setBrowseAxis("pathway"); setBrowseBody("");
      setLinkCourseSlug(null); setLinkLessonSlug(null); setLinkMaterialId(null);
    }
  }, [practice, open]);

  // When a catalog practice is picked, prefill the form fields AND record the link
  const courseList = browsePathway ? findPathway(browsePathway)?.courses ?? [] : [];
  const practiceList =
    courseList.find((c) => c.slug === browseCourse)?.practices ?? [];

  useEffect(() => {
    if (mode !== "course" || !browsePractice) return;
    const cp = practiceList.find((p) => p.slug === browsePractice);
    if (!cp) return;
    setName(cp.name);
    setDescription(cp.description);
    setPathway(browsePathway);
    setBody(cp.body_layer);
    if (cp.target_minutes) setMinutes(cp.target_minutes);
    if (cp.icon) setIcon(cp.icon);
    setLinkCourseSlug(browseCourse);
    setLinkLessonSlug(browsePractice);
    setLinkMaterialId(null);
  }, [browsePractice, browseCourse, browsePathway, mode]);

  // When a document/material is picked, prefill fields AND record the link
  useEffect(() => {
    if (mode !== "material" || !browseMaterialId) return;
    const m = browsableMaterials.find((x) => x.id === browseMaterialId);
    if (!m) return;
    setName(m.title);
    setDescription(m.description ?? "");
    setPathway(browseMaterialPathway);
    setLinkMaterialId(browseMaterialId);
    setLinkCourseSlug(null);
    setLinkLessonSlug(null);
  }, [browseMaterialId, browseMaterialPathway, mode, browsableMaterials]);

  const unlink = () => {
    setLinkCourseSlug(null);
    setLinkLessonSlug(null);
    setLinkMaterialId(null);
  };

  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const payload = {
        user_id: user.id,
        name: name.trim(),
        description: description.trim() || null,
        pathway: pathway as "daoist"|"buddhist"|"yogic"|"tantric"|"magick"|"bhakti"|"general",
        body_layer: body as "physical"|"etheric"|"emotional"|"mental"|"general",
        target_minutes: minutes,
        preferred_time: time ? `${time}:00` : null,
        days_of_week: days.length === 7 ? null : days,
        icon: icon || null,
        course_slug: linkCourseSlug,
        lesson_slug: linkLessonSlug,
        material_id: linkMaterialId,
      };
      if (editing && practice) {
        const { error } = await supabase.from("practices").update(payload).eq("id", practice.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("practices").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["practices"] });
      qc.invalidateQueries({ queryKey: ["linked-practices"] });
      toast.success(editing ? "Practice updated" : "Practice added");
      onOpenChange(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleDay = (d: number) =>
    setDays((ds) => ds.includes(d) ? ds.filter((x) => x !== d) : [...ds, d].sort());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif">{editing ? "Edit practice" : "New practice"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!editing && (
            <div className="flex gap-1 rounded-lg border border-border/60 bg-card/40 p-1 text-xs">
              <button
                type="button"
                onClick={() => setMode("course")}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 transition",
                  mode === "course" ? "bg-gold/20 text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                From a course
              </button>
              <button
                type="button"
                onClick={() => setMode("material")}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 transition",
                  mode === "material" ? "bg-gold/20 text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                From a document
              </button>
              <button
                type="button"
                onClick={() => setMode("custom")}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 transition",
                  mode === "custom" ? "bg-gold/20 text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Custom
              </button>
            </div>
          )}

          {!editing && mode === "course" && (
            <div className="space-y-3 rounded-lg border border-gold/30 bg-card/40 p-3">
              <div className="flex gap-1 rounded-md border border-border/60 bg-background/40 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => { setBrowseAxis("pathway"); setBrowseBody(""); setBrowsePractice(""); }}
                  className={cn(
                    "flex-1 rounded px-2 py-1 transition",
                    browseAxis === "pathway" ? "bg-gold/20 text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Browse by pathway
                </button>
                <button
                  type="button"
                  onClick={() => { setBrowseAxis("body"); setBrowsePathway(""); setBrowseCourse(""); setBrowsePractice(""); }}
                  className={cn(
                    "flex-1 rounded px-2 py-1 transition",
                    browseAxis === "body" ? "bg-gold/20 text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Browse by body
                </button>
              </div>

              {browseAxis === "pathway" ? (
                <>
                  <div>
                    <Label>Pathway</Label>
                    <Select value={browsePathway} onValueChange={(v) => { setBrowsePathway(v); setBrowseCourse(""); setBrowsePractice(""); }}>
                      <SelectTrigger><SelectValue placeholder="Choose a pathway" /></SelectTrigger>
                      <SelectContent>
                        {practiceCatalog.map((p) => (
                          <SelectItem key={p.v} value={p.v}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {browsePathway && (
                    <div>
                      <Label>Course</Label>
                      <Select value={browseCourse} onValueChange={(v) => { setBrowseCourse(v); setBrowsePractice(""); }}>
                        <SelectTrigger><SelectValue placeholder="Choose a course" /></SelectTrigger>
                        <SelectContent>
                          {courseList.map((c) => (
                            <SelectItem key={c.slug} value={c.slug}>{c.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {browseCourse && (
                    <div>
                      <Label>Chapter / lesson</Label>
                      <Select value={browsePractice} onValueChange={setBrowsePractice}>
                        <SelectTrigger><SelectValue placeholder="Choose a chapter" /></SelectTrigger>
                        <SelectContent>
                          {practiceList.map((p) => (
                            <SelectItem key={p.slug} value={p.slug}>
                              {p.icon ? `${p.icon}  ` : ""}{p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <Label>Body</Label>
                    <Select value={browseBody} onValueChange={(v) => { setBrowseBody(v); setBrowsePractice(""); }}>
                      <SelectTrigger><SelectValue placeholder="Choose a body" /></SelectTrigger>
                      <SelectContent>
                        {bodies.map((b) => (
                          <SelectItem key={b.v} value={b.v}>{b.label}, {b.hint}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {browseBody && (
                    <div>
                      <Label>Practice, every pathway</Label>
                      <Select
                        value={browsePractice ? `${browsePathway}::${browseCourse}::${browsePractice}` : ""}
                        onValueChange={(v) => {
                          const [pv, cs, ps] = v.split("::");
                          setBrowsePathway(pv);
                          setBrowseCourse(cs);
                          setBrowsePractice(ps);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={flatByBody.length ? "Choose a practice" : "No practices tagged with this body yet"} />
                        </SelectTrigger>
                        <SelectContent>
                          {flatByBody.map((item) => (
                            <SelectItem key={item.key} value={item.key}>
                              {item.practice.icon ? `${item.practice.icon}  ` : ""}{item.practice.name}
                              <span className="text-muted-foreground">, {item.pathwayLabel} · {item.courseTitle}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              {browsePractice && (
                <p className="text-[11px] text-muted-foreground">
                  Fields below have been prefilled and linked to this chapter, adjust time, days, or minutes to suit you.
                </p>
              )}
            </div>
          )}

          {!editing && mode === "material" && (
            <div className="space-y-3 rounded-lg border border-gold/30 bg-card/40 p-3">
              <div>
                <Label>Pathway</Label>
                <Select value={browseMaterialPathway} onValueChange={(v) => { setBrowseMaterialPathway(v); setBrowseMaterialId(""); }}>
                  <SelectTrigger><SelectValue placeholder="Choose a pathway" /></SelectTrigger>
                  <SelectContent>
                    {pathways.map((p) => (
                      <SelectItem key={p.v} value={p.v}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {browseMaterialPathway && (
                <div>
                  <Label>Document</Label>
                  <Select value={browseMaterialId} onValueChange={setBrowseMaterialId}>
                    <SelectTrigger>
                      <SelectValue placeholder={browsableMaterials.length ? "Choose a document" : "No published material for this pathway yet"} />
                    </SelectTrigger>
                    <SelectContent>
                      {browsableMaterials.map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Only material you've published for this pathway (via the Materials page) appears here.
                  </p>
                </div>
              )}
              {browseMaterialId && (
                <p className="text-[11px] text-muted-foreground">
                  Fields below have been prefilled and linked to this document, adjust as you like.
                </p>
              )}
            </div>
          )}

          {(linkCourseSlug || linkMaterialId) && (
            <div className="flex items-center justify-between rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-xs">
              <span className="inline-flex items-center gap-1.5 text-gold">
                <Link2 className="h-3.5 w-3.5" />
                {linkCourseSlug
                  ? `Linked to ${findPathway(pathway)?.courses.find((c) => c.slug === linkCourseSlug)?.title ?? linkCourseSlug}`
                  : "Linked to an uploaded document"}
              </span>
              <button type="button" onClick={unlink} className="inline-flex items-center gap-1 text-muted-foreground hover:text-rose-400">
                <Unlink className="h-3.5 w-3.5" /> Unlink
              </button>
            </div>
          )}

          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Morning qigong" />
          </div>

          <div>
            <Label>Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this practice involves…"
              rows={2}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Pathway</Label>
              <Select value={pathway} onValueChange={setPathway}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {pathways.map((p) => <SelectItem key={p.v} value={p.v}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Body layer</Label>
              <Select value={body} onValueChange={setBody}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {bodies.map((b) => (
                    <SelectItem key={b.v} value={b.v}>
                      {b.label} <span className="text-muted-foreground">,  {b.hint}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Completions here feed this body's own progression on the Alchemy tab.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Target minutes</Label>
              <Input type="number" min={1} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
            </div>
            <div>
              <Label>Preferred time (optional)</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Days of week</Label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {dayNames.map((n, i) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleDay(i)}
                  className={cn(
                    "h-9 w-12 rounded-md border text-xs transition",
                    days.includes(i)
                      ? "border-gold bg-gold/10 text-primary"
                      : "border-border text-muted-foreground hover:border-gold/50",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Symbol (optional)</Label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setIcon("")}
                className={cn(
                  "h-9 w-9 rounded-md border text-xs",
                  icon === "" ? "border-gold bg-gold/10 text-primary" : "border-border text-muted-foreground",
                )}
              >
                , 
              </button>
              {iconOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setIcon(c)}
                  className={cn(
                    "h-9 w-9 rounded-md border text-lg",
                    icon === c ? "border-gold bg-gold/10" : "border-border hover:border-gold/50",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="bg-gold text-gold-foreground hover:bg-gold/90"
            disabled={!name.trim() || save.isPending}
            onClick={() => save.mutate()}
          >
            {editing ? "Save changes" : "Add practice"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ───────── Alchemy ───────── */

function AlchemyPanel({
  alchemy,
  bodyAlchemy,
  homeworkMarks,
  awardMarks,
}: {
  alchemy: ReturnType<typeof computeAlchemy>;
  bodyAlchemy: { key: string; label: string; kosha: string; symbol: string; hint: string; status: ReturnType<typeof computeAlchemy> }[];
  homeworkMarks: number;
  awardMarks: number;
}) {
  const practiceMarks = alchemy.marks - homeworkMarks - awardMarks;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-card/40 to-card/60 p-6 text-center">
        <p className="text-6xl">{alchemy.currentStage.symbol}</p>
        <p className="mt-2 font-serif text-3xl text-primary">{alchemy.currentStage.name}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{alchemy.currentStage.latin}</p>
        <p className="mx-auto mt-4 max-w-lg text-sm italic text-foreground/80">
          “{alchemy.currentStage.teaching}”
        </p>

        <div className="mx-auto mt-5 flex max-w-sm justify-center gap-4 text-xs text-muted-foreground">
          <span>Practice <b className="text-foreground">{practiceMarks}</b></span>
          <span>Homework <b className="text-foreground">{homeworkMarks}</b></span>
          <span>Awards <b className="text-foreground">{awardMarks}</b></span>
        </div>

        {alchemy.nextStage && (
          <div className="mt-4">
            <div className="mx-auto h-2 w-full max-w-sm overflow-hidden rounded-full bg-secondary/40">
              <div
                className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
                style={{ width: `${alchemy.progressToNext * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {alchemy.marks} / {alchemy.nextStage.threshold} marks, next: {alchemy.nextStage.name}
            </p>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-1 font-serif text-xl text-primary">The Five Bodies</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Every practice you tag with a body, physical, etheric, emotional, mental, or integration, climbs its own
          copy of the seven operations below, counted only from completions logged under that body. Touch three or
          more bodies within a week and you earn a balance bonus toward your overall Stone.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {bodyAlchemy.map((b) => (
            <div key={b.key} className="rounded-xl border border-border/60 bg-card/50 p-4 text-center">
              <p className="text-2xl">{b.status.currentStage.symbol}</p>
              <p className="mt-1 font-serif text-sm text-primary">{b.label}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold">{b.kosha}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">{b.status.currentStage.name}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary/40">
                <div
                  className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
                  style={{ width: `${b.status.progressToNext * 100}%` }}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">{b.status.marks} marks</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-xl text-primary">The Seven Operations</h3>
        <ol className="space-y-2">
          {alchemyStages.map((s) => {
            const unlocked = alchemy.unlockedKeys.includes(s.key);
            const isCurrent = alchemy.currentStage.key === s.key;
            return (
              <li
                key={s.key}
                className={cn(
                  "flex items-start gap-4 rounded-xl border p-4 transition",
                  isCurrent && "border-gold bg-gold/10",
                  !isCurrent && unlocked && "border-emerald-500/30 bg-card/60",
                  !unlocked && "border-border/60 bg-card/30 opacity-60",
                )}
              >
                <span className={cn("text-3xl", !unlocked && "grayscale")}>{s.symbol}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-serif text-lg text-primary">{s.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {unlocked ? (isCurrent ? "current" : "achieved") : `${s.threshold} marks`}
                    </p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{s.latin}</p>
                  <p className="mt-1 text-sm text-foreground/80">{s.teaching}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/40 p-5 text-sm text-muted-foreground">
        <p className="mb-2 font-serif text-base text-primary">How marks are earned</p>
        <ul className="space-y-1 text-xs">
          <li className="flex items-center gap-2"><ListChecks className="h-3.5 w-3.5 text-gold" /> +1 for every day you complete at least one practice</li>
          <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-gold" /> +2 bonus for a perfect day (all scheduled practices done)</li>
          <li className="flex items-center gap-2"><Flame className="h-3.5 w-3.5 text-gold" /> +3 bonus when a 7-day streak is reached</li>
          <li className="flex items-center gap-2"><Moon className="h-3.5 w-3.5 text-gold" /> +10 bonus when a 30-day streak is reached</li>
          <li className="flex items-center gap-2"><Scale className="h-3.5 w-3.5 text-gold" /> +3 balance bonus the first time a rolling week touches 3+ of the Five Bodies</li>
          <li className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-gold" /> Whatever alchemy marks your teacher awards for graded homework</li>
          <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-gold" /> Whatever alchemy marks a teacher gives you directly as an award</li>
        </ul>
        <p className="mt-3 text-[11px]">
          This is the same total shown on your Progress page, one Stone, counted the same way everywhere.
          Marks toward each of the Five Bodies above are counted the same way as practice, but only from
          completions you tagged with that body; homework and awards aren't body-specific, so they only affect
          the overall Stone.
        </p>
      </div>
    </div>
  );
}

/* ───────── utils ───────── */

function sourceHref(p: Practice): string | null {
  if (p.pathway && p.course_slug && p.lesson_slug) {
    return p.pathway === "daoist"
      ? `/pathways/daoist/${p.course_slug}/${p.lesson_slug}`
      : `/pathways/${p.pathway}/${p.course_slug}`;
  }
  if (p.pathway && p.material_id) return `/pathways/${p.pathway}`;
  return null;
}

function sourceLabel(p: Practice, materialTitles: Record<string, string>): string | null {
  if (p.pathway && p.course_slug && p.lesson_slug) {
    const found = findCatalogPractice(p.pathway, p.course_slug, p.lesson_slug);
    return found ? `${found.course.title}` : `${p.course_slug} · ${p.lesson_slug}`;
  }
  if (p.material_id) return materialTitles[p.material_id] ?? "Linked document";
  return null;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}
