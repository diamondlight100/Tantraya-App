import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRoles } from "@/lib/use-role";
import { useStudentAnalytics, type StudentSummary } from "@/lib/use-student-analytics";
import { Flame, Search, TriangleAlert } from "lucide-react";

export const Route = createFileRoute("/_app/teach/students")({
  head: () => ({ meta: [{ title: "Teach · Students · Tantraya" }] }),
  component: TeachStudents,
});

type SortKey = "name" | "marks" | "streak" | "last" | "pending";

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00Z");
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return Math.round((now.getTime() - d.getTime()) / 86400000);
}

function lastPracticeLabel(s: StudentSummary): string {
  const days = daysSince(s.lastPracticeDate);
  if (days === null) return "Never";
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function isStalled(s: StudentSummary): boolean {
  const days = daysSince(s.lastPracticeDate);
  return s.streak === 0 && (days === null || days > 7);
}

function TeachStudents() {
  const { isTeacher, loading } = useRoles();
  const { students, isLoading } = useStudentAnalytics();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [stalledOnly, setStalledOnly] = useState(false);

  const rows = useMemo(() => {
    let list = students;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((s) => s.displayName.toLowerCase().includes(q));
    }
    if (stalledOnly) list = list.filter(isStalled);
    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (sortKey) {
        case "marks":
          return b.alchemy.marks - a.alchemy.marks;
        case "streak":
          return b.streak - a.streak;
        case "last": {
          const da = daysSince(a.lastPracticeDate);
          const db = daysSince(b.lastPracticeDate);
          if (da === null) return 1;
          if (db === null) return -1;
          return da - db;
        }
        case "pending":
          return b.homework.pending - a.homework.pending;
        default:
          return a.displayName.localeCompare(b.displayName);
      }
    });
    return sorted;
  }, [students, query, sortKey, stalledOnly]);

  const stalledCount = students.filter(isStalled).length;

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isTeacher) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card/50 p-10 text-center">
        <p className="text-muted-foreground">This area is for teachers only.</p>
        <Link to="/dashboard" className="mt-3 inline-block text-gold underline">Go to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Teach, Students" subtitle="Overall progress, homework status, last practice, and streaks for every student, at a glance." />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm">
          <Badge variant="outline">{students.length} students</Badge>
          {stalledCount > 0 && (
            <button
              onClick={() => setStalledOnly((v) => !v)}
              className={
                stalledOnly
                  ? "inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-300"
                  : "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400 hover:bg-amber-500/20"
              }
            >
              <TriangleAlert className="h-3 w-3" /> {stalledCount} need a check-in
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students…"
              className="h-9 w-48 pl-8 text-sm"
            />
          </div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="h-9 rounded-md border border-border/60 bg-card/50 px-2 text-sm text-foreground"
          >
            <option value="name">Sort: Name</option>
            <option value="marks">Sort: Alchemy marks</option>
            <option value="streak">Sort: Streak</option>
            <option value="last">Sort: Last practice</option>
            <option value="pending">Sort: Homework pending</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading students…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-10 text-center">
          <p className="text-muted-foreground">
            {students.length === 0 ? "No students yet." : "No students match your search."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/50">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Alchemy stage</th>
                <th className="px-4 py-3">Marks</th>
                <th className="px-4 py-3">Streak</th>
                <th className="px-4 py-3">Last practice</th>
                <th className="px-4 py-3">Homework</th>
                <th className="px-4 py-3">Awards</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const stalled = isStalled(s);
                return (
                  <tr key={s.userId} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">{s.displayName}</span>
                        {stalled && (
                          <TriangleAlert className="h-3.5 w-3.5 text-amber-400" aria-label="Needs check-in" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="mr-1.5">{s.alchemy.currentStage.symbol}</span>
                      {s.alchemy.currentStage.name}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{s.alchemy.marks}</td>
                    <td className="px-4 py-3">
                      {s.streak > 0 ? (
                        <span className="inline-flex items-center gap-1 text-gold">
                          <Flame className="h-3.5 w-3.5" /> {s.streak}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className={stalled ? "px-4 py-3 text-amber-400" : "px-4 py-3 text-muted-foreground"}>
                      {lastPracticeLabel(s)}
                    </td>
                    <td className="px-4 py-3">
                      {s.homework.pending > 0 && (
                        <span className="mr-2 text-amber-400">{s.homework.pending} to grade</span>
                      )}
                      <span className="text-muted-foreground">{s.homework.graded} graded</span>
                      {s.homework.draft > 0 && (
                        <span className="ml-2 text-muted-foreground">· {s.homework.draft} draft</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.awardsCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
