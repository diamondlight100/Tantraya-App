import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { sevaSuggestions, randomSevaSuggestion } from "@/data/seva-suggestions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HandHeart, Sparkles, Lock, Shuffle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/seva")({
  head: () => ({ meta: [{ title: "Seva · Tantraya" }] }),
  component: SevaPage,
});

type KarmaLog = { id: string; note: string | null; karma_points: number; created_at: string };

function SevaPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<KarmaLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [suggestion, setSuggestion] = useState(randomSevaSuggestion());

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("karma_logs")
      .select("id, note, karma_points, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setLogs((data as KarmaLog[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, [user]);

  const totalKarma = logs.reduce((s, l) => s + l.karma_points, 0);

  async function logAct() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("karma_logs").insert({
      user_id: user.id,
      note: note.trim() || null,
      karma_points: 1,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    setNote("");
    toast.success("Noted, quietly.");
    load();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Seva"
        subtitle="Service, offered without needing to be seen."
      />

      {/* Teaching */}
      <section className="mb-8 rounded-2xl border border-border/60 bg-card/50 p-6">
        <h2 className="flex items-center gap-2 font-serif text-2xl text-primary">
          <HandHeart className="h-5 w-5 text-gold" /> Why Seva
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/85">
          <p>
            Everything else in this app is about you, your study, your practice, your progress.
            Seva is the other half. A complete practice doesn't stay inside; it moves out into the
            world, in small, ordinary acts of generosity and kindness, for the benefit of other
            beings. This is the bodhisattva orientation: what's cultivated inward is offered outward.
          </p>
          <p>
            None of this needs to be grand. It isn't about saving the world. It's doing the
            washing up when you see it in the sink, whether it's yours or not; helping a stranger
            with their bags; giving someone your full attention for five minutes. The size of the
            act matters far less than the sincerity behind it.
          </p>
          <p className="flex items-start gap-2 rounded-lg border border-gold/40 bg-background/80 p-3 text-xs text-foreground/90">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            What you log here is <strong className="text-gold">private, only you can ever see it.</strong>{" "}
            Nothing here is shared, ranked, or shown to anyone else, including teachers. This exists
            purely to inspire, motivate, and gently remind you, not to keep score for anyone but
            yourself. If keeping a record ever starts to feel like performing rather than practicing,
            stop logging and just keep doing the thing.
          </p>
        </div>
      </section>

      {/* Suggestion */}
      <section className="mb-8 rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">A small idea, if useful</p>
        <p className="mx-auto mt-3 max-w-md font-serif text-lg text-primary">"{suggestion}"</p>
        <button
          onClick={() => setSuggestion(randomSevaSuggestion())}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold"
        >
          <Shuffle className="h-3.5 w-3.5" /> Another idea
        </button>
      </section>

      {/* Log */}
      <section className="mb-8 rounded-2xl border border-border/60 bg-card/50 p-6">
        <h2 className="flex items-center gap-2 font-serif text-xl text-primary">
          <Sparkles className="h-5 w-5 text-gold" /> Quietly note something
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Optional. A word or two is plenty. This isn't for anyone else to read.
        </p>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What did you do? (optional)"
          rows={2}
          className="mt-3"
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={logAct} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <HandHeart className="h-4 w-4" />}
            {" "}I did something
          </Button>
        </div>
      </section>

      {/* Private tally */}
      <section className="mb-8 rounded-xl border border-border/60 bg-card/40 p-5 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your quiet tally</p>
        <p className="mt-1 font-serif text-3xl text-gold">{totalKarma} karma</p>
        <p className="mt-0.5 text-xs text-muted-foreground">= {totalKarma * 5} Alchemy marks, folded into your overall Stone</p>
      </section>

      {/* History */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-gold" /></div>
      ) : logs.length > 0 ? (
        <section>
          <h2 className="mb-3 font-serif text-lg text-primary">Your private record</h2>
          <div className="space-y-2">
            {logs.map((l) => (
              <div key={l.id} className="rounded-lg border border-border/60 bg-card/30 p-3 text-sm">
                <p className="text-foreground/85">{l.note || <span className="text-muted-foreground italic">no note</span>}</p>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
