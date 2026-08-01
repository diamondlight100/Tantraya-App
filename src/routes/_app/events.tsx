import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useRoles } from "@/lib/use-role";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Sparkles, Loader2, Globe, ExternalLink, Settings } from "lucide-react";

export const Route = createFileRoute("/_app/events")({
  head: () => ({ meta: [{ title: "Live Events · Tantraya" }] }),
  component: EventsPage,
});

type EventKind = "retreat" | "class" | "workshop";

type EventRow = {
  id: string;
  title: string;
  kind: EventKind;
  summary: string | null;
  description: string | null;
  cover_image_url: string | null;
  location: string | null;
  is_online: boolean;
  starts_at: string;
  ends_at: string | null;
  external_url: string | null;
};

const KIND_LABEL: Record<EventKind, string> = {
  retreat: "Retreat",
  class: "Class",
  workshop: "Workshop",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(key: string) {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString(undefined, { month: "long", year: "numeric" });
}

function EventsPage() {
  const { isTeacher } = useRoles();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const nowIso = new Date().toISOString();
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .gte("starts_at", nowIso)
        .order("starts_at", { ascending: true });
      setEvents((data as EventRow[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const { startingSoon, byMonth } = useMemo(() => {
    const soonCutoff = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const soon: EventRow[] = [];
    const later: EventRow[] = [];
    for (const e of events) {
      if (new Date(e.starts_at).getTime() <= soonCutoff) soon.push(e);
      else later.push(e);
    }
    const groups: Record<string, EventRow[]> = {};
    for (const e of later) {
      const k = monthKey(e.starts_at);
      (groups[k] ??= []).push(e);
    }
    const orderedKeys = Object.keys(groups).sort();
    return { startingSoon: soon, byMonth: orderedKeys.map((k) => ({ key: k, events: groups[k] })) };
  }, [events]);

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-gold" /></div>;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          title="Tantraya Live Events"
          subtitle="Retreats, classes, and workshops with Paul and the Tantraya community."
        />
        {isTeacher && (
          <Link to="/teach/events">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" /> Manage events
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-8 rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm text-foreground/90">
        These are announcements only, booking and payment happen on{" "}
        <a href="https://tantraya.com" target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
          tantraya.com
        </a>.
      </div>

      {startingSoon.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl text-primary">
            <Sparkles className="h-5 w-5 text-gold" /> Starting soon
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startingSoon.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
      )}

      {byMonth.map(({ key, events: evs }) => (
        <section key={key} className="mb-10">
          <h2 className="mb-4 font-serif text-2xl text-primary">{monthLabel(key)}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {evs.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
      ))}

      {events.length === 0 && (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
          <p className="text-muted-foreground">No upcoming events yet, check back soon.</p>
        </div>
      )}
    </div>
  );
}

function EventCard({ event: e }: { event: EventRow }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/70 transition hover:border-gold/40">
      {e.cover_image_url ? (
        <img src={e.cover_image_url} alt={e.title} className="h-44 w-full object-cover" />
      ) : (
        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/20 to-gold/10">
          <Sparkles className="h-10 w-10 text-gold/60" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{KIND_LABEL[e.kind]}</Badge>
          {e.is_online && <Badge variant="outline" className="text-xs"><Globe className="mr-1 h-3 w-3" />Online</Badge>}
        </div>
        <h3 className="mt-2 font-serif text-xl text-primary">{e.title}</h3>
        {e.summary && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{e.summary}</p>}
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmtDate(e.starts_at)}</p>
          {e.location && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{e.location}</p>}
        </div>
        {e.description && <p className="mt-3 line-clamp-3 text-sm text-foreground/80">{e.description}</p>}
        <div className="mt-auto pt-4">
          <a
            href={e.external_url || "https://tantraya.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-gold/15"
          >
            Learn more & book <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
