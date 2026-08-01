import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarPlus, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLinkedPractices } from "@/lib/use-linked-practices";

type Pathway = "daoist" | "buddhist" | "yogic" | "tantric" | "magick" | "bhakti" | "general";

const bodyOptions = [
  { v: "physical",  label: "Physical" },
  { v: "etheric",   label: "Etheric" },
  { v: "emotional", label: "Emotional" },
  { v: "mental",    label: "Mental" },
  { v: "general",   label: "Integration" },
] as const;

const bodyLabels: Record<string, string> = {
  physical: "Physical",
  etheric: "Etheric",
  emotional: "Emotional",
  mental: "Mental",
  general: "Integration",
};

/**
 * Drop into any chapter/lesson "Practice" tab. Shows practices the current
 * user has already linked to this exact chapter, and lets them add this
 * chapter to their Practice Organiser schedule in one tap, the reverse of
 * picking "From a course" when adding a practice on the Schedule page.
 */
export function RelatedPractices({
  pathway,
  courseSlug,
  lessonSlug,
  defaultName,
  defaultDescription,
  defaultBodyLayer = "general",
  defaultMinutes = 15,
  defaultIcon,
}: {
  pathway: Pathway;
  courseSlug: string;
  lessonSlug: string;
  defaultName: string;
  defaultDescription?: string;
  defaultBodyLayer?: "physical" | "etheric" | "emotional" | "mental" | "general";
  defaultMinutes?: number;
  defaultIcon?: string;
}) {
  const { practices, loading, signedIn, addToSchedule, removeFromSchedule } =
    useLinkedPractices(pathway, courseSlug, lessonSlug);
  const [selectedBody, setSelectedBody] = useState<string>(defaultBodyLayer);
  const [isAdding, setIsAdding] = useState(false);

  if (!signedIn) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your practice schedule</p>
        <Link to="/schedule" className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-gold">
          Practice Organiser <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {loading ? (
        <p className="mt-2 text-xs text-muted-foreground">Checking…</p>
      ) : practices.length === 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">
          This chapter isn't in your schedule yet.
        </p>
      ) : (
        <ul className="mt-3 space-y-1.5">
          {practices.map((p) => (
            <li key={p.id} className="flex items-center gap-2 rounded-md border border-gold/30 bg-gold/5 px-3 py-1.5">
              <span className="flex-1 truncate text-sm text-foreground">{p.name}</span>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {bodyLabels[p.body_layer] ?? p.body_layer}
                {p.target_minutes ? ` · ${p.target_minutes} min` : ""}
              </span>
              <button
                onClick={() => removeFromSchedule.mutate(p.id)}
                disabled={removeFromSchedule.isPending}
                className="shrink-0 text-muted-foreground hover:text-rose-400"
                aria-label="Remove from schedule"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {isAdding ? (
        <>
          <p className="mt-3 mb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Which body does this work on for you?
          </p>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {bodyOptions.map((b) => (
              <button
                key={b.v}
                type="button"
                onClick={() => setSelectedBody(b.v)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] transition",
                  selectedBody === b.v ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                addToSchedule.mutate(
                  {
                    name: defaultName,
                    description: defaultDescription ?? "",
                    body_layer: selectedBody,
                    target_minutes: defaultMinutes,
                    icon: defaultIcon,
                  },
                  { onSuccess: () => setIsAdding(false) },
                )
              }
              disabled={addToSchedule.isPending}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1.5 text-[11px] uppercase tracking-widest text-gold transition hover:bg-gold/10",
                addToSchedule.isPending && "opacity-60",
              )}
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Confirm
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="text-[11px] text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1.5 text-[11px] uppercase tracking-widest text-gold transition hover:bg-gold/10"
        >
          <CalendarPlus className="h-3.5 w-3.5" />
          {practices.length > 0 ? "Add another variant" : "Add to my practice schedule"}
        </button>
      )}
    </div>
  );
}
