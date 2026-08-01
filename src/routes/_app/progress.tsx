import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles, TrendingUp, Target, BookOpen, Flame } from "lucide-react";
import { alchemyStages, currentStreak } from "@/lib/alchemy";
import { useOverallAlchemy } from "@/lib/use-overall-alchemy";

export const Route = createFileRoute("/_app/progress")({
  head: () => ({ meta: [{ title: "Progress · Tantraya" }] }),
  component: ProgressPage,
});

function ProgressPage() {
  const { user } = useAuth();
  const [subs, setSubs] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const { overall, practiceMarks, homeworkMarks, awardMarks, karmaMarks, logs } = useOverallAlchemy();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: s }, { data: a }] = await Promise.all([
        supabase
          .from("homework_submissions")
          .select("id,points_awarded,alchemy_marks_awarded,status,graded_at,assignment_id,homework_assignments(title,max_points)")
          .eq("student_id", user.id)
          .order("graded_at", { ascending: false }),
        supabase
          .from("student_awards")
          .select("*")
          .eq("student_id", user.id)
          .order("created_at", { ascending: false }),
      ]);
      setSubs(s ?? []);
      setAwards(a ?? []);
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="text-muted-foreground">
        <Link to="/login" className="text-gold underline">Sign in</Link> to see your progress.
      </div>
    );
  }

  const totalMarks = overall.marks;
  const currentStage = overall.currentStage;
  const nextStage = overall.nextStage;
  const pct = Math.round(overall.progressToNext * 100);

  const graded = subs.filter((s) => s.status === "graded");
  const streak = currentStreak(logs);
  const avg = graded.length
    ? Math.round(
        graded.reduce((s, x) => s + ((x.points_awarded ?? 0) / (x.homework_assignments?.max_points || 100)) * 100, 0) /
          graded.length,
      )
    : 0;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="My progress" subtitle="A record of practice, study, and growth." />

      {/* Hero stage */}
      <Card className="mb-6 border-gold/40 bg-gradient-to-br from-card to-card/40 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-6xl">{currentStage.symbol}</div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Current stage</p>
            <h2 className="font-serif text-3xl text-primary">{currentStage.name}</h2>
            <p className="text-xs italic text-muted-foreground">{currentStage.latin}</p>
            <p className="mt-2 text-sm text-foreground/80">{currentStage.teaching}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Alchemy marks</p>
            <p className="font-serif text-4xl text-gold">{totalMarks}</p>
            <p className="text-[10px] text-muted-foreground">
              {practiceMarks} practice · {homeworkMarks} homework · {awardMarks} awards · {karmaMarks} karma
            </p>
          </div>
        </div>
        {nextStage && (
          <div className="mt-5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentStage.name}</span>
              <span>{nextStage.name} at {nextStage.threshold}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary/40">
              <div className="h-full bg-gradient-to-r from-gold/60 to-gold" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          This is the same Stone shown on your Practice Organiser's Alchemy tab, see it there for the Five Bodies breakdown.
        </p>
      </Card>

      {/* Stats grid */}
      <div className="mb-6 grid gap-3 sm:grid-cols-5">
        <Stat
          icon={<Flame className="h-4 w-4" />}
          label="Current streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
          hint={streak < 7 ? `${7 - streak} to a bonus` : streak < 30 ? `${30 - streak} to next bonus` : "at the max bonus"}
        />
        <Stat icon={<Target className="h-4 w-4" />} label="Practice marks" value={practiceMarks} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label="Homework graded" value={graded.length} />
        <Stat icon={<TrendingUp className="h-4 w-4" />} label="Average score" value={`${avg}%`} />
        <Stat icon={<Award className="h-4 w-4" />} label="Awards" value={awards.length} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent grades */}
        <Card className="p-5">
          <h3 className="mb-4 font-serif text-xl text-primary inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" /> Recent grades
          </h3>
          {graded.length === 0 ? (
            <p className="text-sm text-muted-foreground">No graded homework yet.</p>
          ) : (
            <ul className="space-y-2">
              {graded.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded border border-border/40 bg-background/30 px-3 py-2 text-sm">
                  <span className="truncate">{s.homework_assignments?.title ?? ", "}</span>
                  <Badge className="bg-gold/20 text-primary hover:bg-gold/20">
                    {s.points_awarded}/{s.homework_assignments?.max_points}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Awards */}
        <Card className="p-5">
          <h3 className="mb-4 font-serif text-xl text-primary inline-flex items-center gap-2">
            <Award className="h-4 w-4 text-gold" /> Awards
          </h3>
          {awards.length === 0 ? (
            <p className="text-sm text-muted-foreground">No awards yet, keep practicing.</p>
          ) : (
            <ul className="space-y-2">
              {awards.map((a) => (
                <li key={a.id} className="flex gap-3 rounded border border-gold/30 bg-gold/5 px-3 py-2 text-sm">
                  <span className="text-2xl">{a.icon ?? "🏅"}</span>
                  <div className="flex-1">
                    <p className="font-serif text-base text-primary">{a.title}</p>
                    {a.description && <p className="text-xs text-foreground/80">{a.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Stage ladder */}
      <Card className="mt-6 p-5">
        <h3 className="mb-4 font-serif text-xl text-primary">The seven operations</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {alchemyStages.map((s) => {
            const unlocked = totalMarks >= s.threshold;
            return (
              <div
                key={s.key}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  s.key === currentStage.key
                    ? "border-gold bg-gold/10"
                    : unlocked
                    ? "border-border/60 bg-card/50"
                    : "border-border/30 bg-card/20 opacity-50"
                }`}
              >
                <span className="text-3xl">{s.symbol}</span>
                <div className="flex-1">
                  <p className="font-serif text-base text-primary">{s.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {unlocked ? "Unlocked" : `Unlocks at ${s.threshold}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Stat({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: React.ReactNode; hint?: string }) {
  return (
    <Card className="p-4">
      <p className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1 font-serif text-2xl text-primary">{value}</p>
      {hint && <p className="mt-0.5 text-[10px] text-muted-foreground">{hint}</p>}
    </Card>
  );
}
