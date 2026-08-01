import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { flairs, type Flair } from "@/data/flairs";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile · Tantraya" }] }),
  component: Profile,
});

const groups: Flair["group"][] = ["Tantric", "Alchemical", "Yogic", "General"];

function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [flair, setFlair] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [forumNotifications, setForumNotifications] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("notification_preferences").select("forum_notifications_enabled").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (data) setForumNotifications(data.forum_notifications_enabled);
    });
  }, [user]);

  async function toggleForumNotifications(next: boolean) {
    setForumNotifications(next);
    if (!user) return;
    const { error } = await supabase
      .from("notification_preferences")
      .upsert({ user_id: user.id, forum_notifications_enabled: next }, { onConflict: "user_id" });
    if (error) toast.error(error.message);
  }

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      setName(data?.display_name ?? "");
      setBio(data?.bio ?? "");
      setFlair(data?.flair ?? null);
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      display_name: name,
      bio,
      flair,
      updated_at: new Date().toISOString(),
    });
    setBusy(false);
    if (error) toast.error(error.message); else toast.success("Saved");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Profile" />
      <div className="space-y-4 rounded-xl border border-border/60 bg-card/70 p-6">
        <div>
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>
        <div>
          <Label>Display name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div>
          <Label>Flair</Label>
          <p className="mb-2 text-xs text-muted-foreground">
            Shown beside your name in the Forum. Pick whatever feels true right now, you can change it any time.
          </p>
          <div className="space-y-3">
            {groups.map((g) => (
              <div key={g}>
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.25em] text-gold">{g}</p>
                <div className="flex flex-wrap gap-1.5">
                  {flairs.filter((f) => f.group === g).map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFlair(flair === f.key ? null : f.key)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition",
                        flair === f.key
                          ? "border-gold bg-gold text-gold-foreground font-semibold"
                          : "border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground",
                      )}
                    >
                      <span aria-hidden>{f.glyph}</span> {f.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {flair && (
            <button
              type="button"
              onClick={() => setFlair(null)}
              className="mt-2 text-[11px] text-muted-foreground underline hover:text-rose-400"
            >
              Clear flair
            </button>
          )}
        </div>

        <div className="rounded-xl border border-border/60 bg-card/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="!mt-0 flex items-center gap-2">
                <Bell className="h-4 w-4 text-gold" /> Forum notifications
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Get notified when someone replies to your threads{" "}
               , and, if you're a teacher, of all new forum activity.
              </p>
            </div>
            <Switch checked={forumNotifications} onCheckedChange={toggleForumNotifications} />
          </div>
        </div>

        <Button onClick={save} disabled={busy} className="bg-gold text-gold-foreground hover:bg-gold/90">
          {busy ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
