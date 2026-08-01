import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { RotateCcw, Info } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TAP_VALUES = [1, 108, 1008] as const;
type TapValue = (typeof TAP_VALUES)[number];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function useMalaState() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [tapValue, setTapValue] = useState<TapValue>(1);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("mala_counts").select("count").eq("user_id", user.id).eq("count_date", todayISO()).maybeSingle(),
      supabase.from("mala_settings").select("tap_value").eq("user_id", user.id).maybeSingle(),
    ]).then(([{ data: c }, { data: s }]) => {
      if (c) setCount(c.count);
      if (s?.tap_value) setTapValue(s.tap_value as TapValue);
      setLoaded(true);
    });
  }, [user]);

  async function persistCount(next: number) {
    if (!user) return;
    setSaving(true);
    await supabase.from("mala_counts").upsert(
      { user_id: user.id, count_date: todayISO(), count: next },
      { onConflict: "user_id,count_date" },
    );
    setSaving(false);
  }

  async function persistTapValue(next: TapValue) {
    if (!user) return;
    setTapValue(next);
    await supabase.from("mala_settings").upsert(
      { user_id: user.id, tap_value: next },
      { onConflict: "user_id" },
    );
  }

  function tap() {
    const next = count + tapValue;
    setCount(next);
    persistCount(next);
  }

  function reset() {
    if (!confirm("Reset today's count to zero?")) return;
    setCount(0);
    persistCount(0);
  }

  return { count, tapValue, setTapValue: persistTapValue, tap, reset, saving, loaded };
}

const TAP_LABEL: Record<TapValue, string> = {
  1: "1 = one recitation",
  108: "1 = one full mala (108)",
  1008: "1 = ten malas (1008)",
};

export function MalaCounterDialogContent() {
  const { count, tapValue, setTapValue, tap, reset, saving } = useMalaState();
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 max-w-xs text-left">
        <Label className="text-xs">Each tap counts as</Label>
        <Select value={String(tapValue)} onValueChange={(v) => setTapValue(Number(v) as TapValue)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {TAP_VALUES.map((v) => (
              <SelectItem key={v} value={String(v)}>{TAP_LABEL[v]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="mt-1 flex items-start gap-1 text-[11px] text-muted-foreground">
          <Info className="mt-0.5 h-3 w-3 shrink-0" />
          Set this to match how you're actually reciting, one bead at a time, a full mala per tap, or ten malas per tap, rather than tapping for every single mantra.
        </p>
      </div>

      <button
        onClick={tap}
        className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold bg-background/40 font-serif text-3xl text-primary transition active:scale-95"
      >
        {count}
      </button>
      <p className="mt-2 text-xs text-muted-foreground">{saving ? "Saving…" : "Tap the bead to count"}</p>
      {count > 0 && (
        <button onClick={reset} className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-rose-400">
          <RotateCcw className="h-3 w-3" /> Reset today
        </button>
      )}
    </div>
  );
}

// Small optional entry point, a compact box rather than a page-width tab,
// that opens the counter as a popup when the student actually wants it.
export function MalaCounterLauncher() {
  const [open, setOpen] = useState(false);
  const { count } = useMalaState();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-xs text-foreground/80 hover:border-gold/50"
        >
          <span className="font-serif text-base text-gold">☸</span>
          Mala count, today: <span className="font-medium text-primary">{count}</span>
          <span className="text-muted-foreground">(optional)</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Mala Counter</DialogTitle>
        </DialogHeader>
        <MalaCounterDialogContent />
      </DialogContent>
    </Dialog>
  );
}
