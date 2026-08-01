import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronLeft, Plus, Pencil, Trash2, X, Save, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_app/teach/events")({
  head: () => ({ meta: [{ title: "Manage Events · Tantraya" }] }),
  component: ManageEvents,
});

type EventKind = "retreat" | "class" | "workshop";

type EventRow = {
  id: string;
  author_id: string;
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
  published: boolean;
};

function ManageEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<EventRow | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("starts_at", { ascending: true });
    setEvents((data as EventRow[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(ev: EventRow) {
    if (!confirm(`Delete "${ev.title}"?`)) return;
    const { error } = await supabase.from("events").delete().eq("id", ev.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/events" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to events
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <PageHeader title="Manage Events" subtitle="Announcements only, booking happens on tantraya.com." />
        {!showForm && (
          <Button onClick={() => { setEditing(null); setShowForm(true); }}>
            <Plus className="h-4 w-4" /> New event
          </Button>
        )}
      </div>

      {showForm && (
        <EventForm
          existing={editing}
          onCancel={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
          <p className="font-serif text-xl text-primary">No events yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Add your first one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="text-gold">{ev.kind}</span>
                  <span>· {new Date(ev.starts_at).toLocaleString()}</span>
                  {!ev.published && (
                    <span className="inline-flex items-center gap-1"><EyeOff className="h-3 w-3" /> Draft</span>
                  )}
                </div>
                <h3 className="mt-1 font-serif text-lg text-primary">{ev.title}</h3>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => { setEditing(ev); setShowForm(true); }}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(ev)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventForm({
  existing, onCancel, onSaved,
}: {
  existing: EventRow | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [kind, setKind] = useState<EventKind>(existing?.kind ?? "class");
  const [summary, setSummary] = useState(existing?.summary ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(existing?.cover_image_url ?? "");
  const [location, setLocation] = useState(existing?.location ?? "");
  const [isOnline, setIsOnline] = useState(existing?.is_online ?? false);
  const [startsAt, setStartsAt] = useState(
    existing?.starts_at ? new Date(existing.starts_at).toISOString().slice(0, 16) : "",
  );
  const [endsAt, setEndsAt] = useState(
    existing?.ends_at ? new Date(existing.ends_at).toISOString().slice(0, 16) : "",
  );
  const [externalUrl, setExternalUrl] = useState(existing?.external_url ?? "");
  const [published, setPublished] = useState(existing?.published ?? true);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!user) return;
    if (!title.trim()) { toast.error("Add a title"); return; }
    if (!startsAt) { toast.error("Set a start date/time"); return; }

    setSaving(true);
    const payload = {
      author_id: user.id,
      title: title.trim(),
      kind,
      summary: summary.trim() || null,
      description: description.trim() || null,
      cover_image_url: coverImageUrl.trim() || null,
      location: location.trim() || null,
      is_online: isOnline,
      starts_at: new Date(startsAt).toISOString(),
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
      external_url: externalUrl.trim() || null,
      published,
    };

    const { error } = existing
      ? await supabase.from("events").update(payload).eq("id", existing.id)
      : await supabase.from("events").insert(payload);

    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(existing ? "Updated" : "Event added");
    onSaved();
  }

  return (
    <div className="mb-8 rounded-2xl border border-gold/40 bg-card/70 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-xl text-primary">{existing ? "Edit event" : "New event"}</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}><X className="h-4 w-4" /></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Autumn Qigong Retreat" />
        </div>
        <div>
          <Label>Kind</Label>
          <Select value={kind} onValueChange={(v) => setKind(v as EventKind)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="retreat">Retreat</SelectItem>
              <SelectItem value="class">Class</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Starts</Label>
          <Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        </div>
        <div>
          <Label>Ends (optional)</Label>
          <Input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <Label>Short summary (shown on the card)</Label>
        <Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="One line" />
      </div>

      <div className="mt-4">
        <Label>Full description (optional)</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Location (optional)</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Sacred Valley, Peru" />
        </div>
        <div>
          <Label>Cover image URL (optional)</Label>
          <Input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="https://…" />
        </div>
      </div>

      <div className="mt-4">
        <Label>Booking link (optional, defaults to tantraya.com if left blank)</Label>
        <Input value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://tantraya.com/…" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          <Label className="!mt-0">Online event</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={published} onCheckedChange={setPublished} />
          <Label className="!mt-0">Published (visible to students)</Label>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
