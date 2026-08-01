import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, ChevronRight, Sparkles, Lock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/lib/course-progress";
import { useOverallAlchemy } from "@/lib/use-overall-alchemy";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/**
 * Simple, hardcoded-per-item unlock config for a course's "extras", no
 * teacher-facing config UI (that was agreed skippable if it got too
 * complex). To add/change an item's visibility, edit EXTRA_ITEMS below.
 *
 * Three modes:
 *  - "open"       always visible.
 *  - "easter-egg" fully hidden (not even a locked tile) until the unlock
 *                 condition is met, a surprise that appears once earned.
 *  - "carrot"     visible as a locked preview/teaser with progress shown,
 *                 until the unlock condition is met.
 *
 * Condition is either a chapter-completion slug or an alchemy-marks
 * threshold (reusing the real Practice Organiser alchemy system).
 */
export type UnlockMode = "open" | "easter-egg" | "carrot";

export type UnlockCondition =
  | { type: "chapter"; chapterSlug: string; label: string }
  | { type: "alchemy"; marks: number; label: string };

function useUnlockState(courseSlug: string, condition?: UnlockCondition) {
  const progress = useCourseProgress(courseSlug);
  const { overall } = useOverallAlchemy();

  if (!condition) return { unlocked: true, progressLabel: null as string | null, pct: 1 };

  if (condition.type === "chapter") {
    const unlocked = progress.isComplete(condition.chapterSlug);
    return { unlocked, progressLabel: condition.label, pct: unlocked ? 1 : 0 };
  }

  const unlocked = overall.marks >= condition.marks;
  const pct = Math.min(1, overall.marks / condition.marks);
  return { unlocked, progressLabel: condition.label, pct };
}

/**
 * One row in the tray. Locked items ("carrot") show a progress teaser
 * inline and aren't clickable. Unlocked items are a compact button that
 * opens their actual content (the codex, the game, whatever it is) in a
 * modal, so opening one thing never pushes the rest of the course page
 * down, everything stays reachable from the same short list.
 */
function ExtraRow({
  courseSlug,
  mode,
  condition,
  title,
  teaser,
  onOpen,
}: {
  courseSlug: string;
  mode: UnlockMode;
  condition?: UnlockCondition;
  title: string;
  teaser?: string;
  onOpen: () => void;
}) {
  const { unlocked, progressLabel, pct } = useUnlockState(courseSlug, condition);

  if (mode === "easter-egg" && !unlocked) return null;

  if (mode === "carrot" && !unlocked) {
    return (
      <div className="flex items-start gap-4 rounded-lg border border-gold/20 bg-card/30 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <Lock className="h-4 w-4 text-gold" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Coming into reach</p>
          <h3 className="mt-0.5 font-serif text-base text-primary">{title}</h3>
          {progressLabel && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{progressLabel}</span>
                <span>{Math.round(pct * 100)}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
                <div
                  className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-4 rounded-lg border border-gold/20 bg-card/30 p-4 text-left transition-colors hover:border-gold/50 hover:bg-card/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
        {mode === "easter-egg" ? (
          <Sparkles className="h-4 w-4 text-gold" />
        ) : (
          <Gift className="h-4 w-4 text-gold" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-base text-primary">{title}</h3>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
    </button>
  );
}

/**
 * The collapsed-by-default "extras" tray, sitting above the Read/Practice/
 * Quiz/Reflect chapter area. The tray itself just lists compact rows;
 * clicking a row opens that one item's content in a modal overlay instead
 * of stacking every item's full content inline on the page (which used to
 * make the course page very long and hard to scroll back out of once a
 * couple of items, e.g. a codex and a game, were both expanded at once).
 */
export function CourseExtras({
  courseSlug,
  items,
  defaultOpen = false,
}: {
  courseSlug: string;
  items: {
    key: string;
    title: string;
    mode: UnlockMode;
    condition?: UnlockCondition;
    teaser?: string;
    render: ReactNode;
  }[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const activeItem = items.find((it) => it.key === activeKey) ?? null;

  return (
    <section className="mb-8 rounded-xl border border-gold/30 bg-card/40 p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 text-left"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <Gift className="h-5 w-5 text-gold" />
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
            <Sparkles className="h-3 w-3" /> Extras
          </p>
          <h3 className="mt-0.5 font-serif text-lg text-primary">More to discover</h3>
          <p className="mt-1 text-xs text-muted-foreground">Click to open.</p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-gold" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-gold" />
        )}
      </button>

      {open && (
        <div className={cn("mt-5 space-y-3 border-t border-border/40 pt-5")}>
          {items.map((it) => (
            <ExtraRow
              key={it.key}
              courseSlug={courseSlug}
              mode={it.mode}
              condition={it.condition}
              title={it.title}
              teaser={it.teaser}
              onOpen={() => setActiveKey(it.key)}
            />
          ))}
        </div>
      )}

      <Dialog open={!!activeItem} onOpenChange={(v) => !v && setActiveKey(null)}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-5xl overflow-y-auto sm:rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-primary">
              {activeItem?.title}
            </DialogTitle>
          </DialogHeader>
          {activeItem?.render}
        </DialogContent>
      </Dialog>
    </section>
  );
}
