import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { useAuth } from "@/lib/auth-context";
import { quoteOfTheDay } from "@/lib/daily-quote";
import { Compass, GraduationCap, NotebookPen, Calendar, MessagesSquare } from "lucide-react";
import { SacredCalendarWidget } from "@/components/dashboard/sacred-calendar-widget";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Tantraya" }] }),
  component: Dashboard,
});

const quick = [
  { to: "/journal", icon: NotebookPen, label: "Open Journal", desc: "Reflect on today" },
  { to: "/schedule", icon: Calendar, label: "Today's Practice", desc: "Mark what you completed" },
  { to: "/courses", icon: GraduationCap, label: "Continue Course", desc: "Pick up where you left off" },
  { to: "/forum", icon: MessagesSquare, label: "Community", desc: "Recent threads" },
  { to: "/pathways", icon: Compass, label: "Explore Pathways", desc: "Daoist · Buddhist · Tantric · …" },
];

function Dashboard() {
  const { user } = useAuth();
  const name = (user?.user_metadata as { display_name?: string } | undefined)?.display_name ?? user?.email?.split("@")[0];
  const quote = quoteOfTheDay();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title={`Welcome, ${name ?? "friend"}.`}
          subtitle="A quiet place to return to your practice. Begin where you are."
        />
        <div className="w-24 shrink-0 sm:w-32">
          <SacredCalendarWidget />
        </div>
      </div>

      <p className="mb-8 border-l border-gold/30 pl-4 font-serif text-sm italic leading-relaxed text-muted-foreground/80">
        "{quote.text}"
        <span className="mt-1 block text-[11px] not-italic uppercase tracking-wider text-muted-foreground/60">
          — {quote.source}
        </span>
      </p>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quick.map(({ to, icon: Icon, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-xl border border-border/60 bg-card/70 p-5 transition hover:border-gold/40 hover:bg-card"
          >
            <Icon className="h-5 w-5 text-gold" />
            <p className="mt-3 font-serif text-lg text-primary">{label}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
