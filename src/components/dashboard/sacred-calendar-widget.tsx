import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  type SacredCalendarDay,
  type SacredTradition,
  sacredDayToday,
  upcomingSacredDays,
} from "@/data/sacred-calendar";

const traditionLabel: Record<SacredTradition, string> = {
  tantric: "Tantric",
  yogic: "Yogic",
  buddhist: "Buddhist",
  daoist: "Daoist",
  shamanic: "Shamanic",
};

const traditionClass: Record<SacredTradition, string> = {
  tantric: "border-red-500/30 bg-red-500/10 text-red-300",
  yogic: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  buddhist: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  daoist: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  shamanic: "border-purple-500/30 bg-purple-500/10 text-purple-300",
};

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function daysUntil(iso: string, from: Date) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const target = new Date(`${iso}T00:00:00`);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

function SacredDayRow({ day, from }: { day: SacredCalendarDay; from: Date }) {
  const [open, setOpen] = useState(false);
  const delta = daysUntil(day.date, from);
  const whenLabel = delta === 0 ? "Today" : delta === 1 ? "Tomorrow" : `in ${delta} days`;

  return (
    <div className="rounded-lg border border-border/60 bg-card/50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
      >
        <div className="w-14 shrink-0 font-serif text-sm text-gold">{formatDate(day.date)}</div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-sm text-primary">{day.name}</p>
          <p className="text-[11px] text-muted-foreground">{whenLabel}</p>
        </div>
        <div className="hidden shrink-0 gap-1 sm:flex">
          {day.tradition.map((t) => (
            <Badge key={t} variant="outline" className={cn("text-[10px]", traditionClass[t])}>
              {traditionLabel[t]}
            </Badge>
          ))}
        </div>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="space-y-2 border-t border-border/60 px-3 py-3 text-sm">
          <div className="flex flex-wrap gap-1 sm:hidden">
            {day.tradition.map((t) => (
              <Badge key={t} variant="outline" className={cn("text-[10px]", traditionClass[t])}>
                {traditionLabel[t]}
              </Badge>
            ))}
            {day.deity && (
              <Badge variant="outline" className="text-[10px] border-gold/30 bg-gold/10 text-gold">
                {day.deity}
              </Badge>
            )}
          </div>
          {day.sanskritOrNative && (
            <p className="font-serif text-base text-primary/90">{day.sanskritOrNative}</p>
          )}
          <p className="leading-relaxed text-muted-foreground">{day.summary}</p>
          <p className="border-l border-gold/30 pl-3 italic leading-relaxed text-muted-foreground/80">
            {day.practiceNote}
          </p>
        </div>
      )}
    </div>
  );
}

export function SacredCalendarWidget() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const now = useMemo(() => new Date(), []);
  const today = useMemo(() => sacredDayToday(now), [now]);
  const upcoming = useMemo(() => upcomingSacredDays(now, 8), [now]);
  const next = today ?? upcoming[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="group flex aspect-square w-full max-w-[9.5rem] flex-col justify-between rounded-xl border border-gold/30 bg-card/70 p-3 text-left transition hover:border-gold/50 hover:bg-card sm:ml-auto"
      >
        <div className="flex items-center justify-between">
          <CalendarDays className="h-4 w-4 text-gold" />
          {today && (
            <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold">
              Today
            </span>
          )}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
            {today ? "Observed today" : "Coming up"}
          </p>
          {next ? (
            <>
              <p className="mt-0.5 line-clamp-2 font-serif text-sm leading-tight text-primary">
                {next.name}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{formatDate(next.date)}</p>
            </>
          ) : (
            <p className="mt-0.5 font-serif text-sm text-primary">Sacred calendar</p>
          )}
        </div>
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-primary">Sacred Calendar</DialogTitle>
            <DialogDescription>
              Tantric, yogic, Buddhist, and Daoist observance days. Tap any day for what it's about.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {upcoming.map((day) => (
              <SacredDayRow key={day.slug} day={day} from={now} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
