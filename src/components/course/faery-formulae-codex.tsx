import { useMemo, useState } from "react";
import { Search, X, ScrollText, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  faeryFormulae,
  formulaCategories,
  type Formula,
  type FormulaCategory,
} from "@/data/magick/faery-formulae";

const CATEGORY_TINT: Record<FormulaCategory, string> = {
  "Basic Training": "border-sky-500/40 text-sky-400",
  "Contact & Journey": "border-violet-500/40 text-violet-400",
  "Ancestral Work": "border-amber-500/40 text-amber-400",
  "Land & Protection": "border-emerald-500/40 text-emerald-400",
  "Charms & Invocations": "border-rose-500/40 text-rose-400",
};

function FormulaCard({ formula, onOpen }: { formula: Formula; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group flex h-full flex-col rounded-xl border border-gold/30 bg-gradient-to-b from-card/80 to-background/60 p-4 text-left transition hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_0_0_1px_rgba(201,162,39,0.3)]"
    >
      <span
        className={cn(
          "mb-2 inline-flex w-fit rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.2em]",
          CATEGORY_TINT[formula.category],
        )}
      >
        {formula.category}
      </span>
      <h3 className="font-serif text-lg text-primary group-hover:text-gold">{formula.name}</h3>
      <p className="mt-1 text-xs italic text-muted-foreground">{formula.epithet}</p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
        {formula.steps.length} stage{formula.steps.length === 1 ? "" : "s"} · read in full →
      </p>
    </button>
  );
}

function FormulaDetail({ formula, onClose }: { formula: Formula; onClose: () => void }) {
  const isCharm = formula.category === "Charms & Invocations";
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({});
  const allOpen = formula.steps.every((_, i) => openSteps[i]);
  const toggleAll = () => {
    if (allOpen) {
      setOpenSteps({});
    } else {
      setOpenSteps(Object.fromEntries(formula.steps.map((_, i) => [i, true])) as Record<number, boolean>);
    }
  };
  const toggleStep = (i: number) => setOpenSteps((prev) => ({ ...prev, [i]: !prev[i] }));
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border/50 p-6 pb-4">
          <div>
            <span
              className={cn(
                "mb-2 inline-flex w-fit rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.2em]",
                CATEGORY_TINT[formula.category],
              )}
            >
              {formula.category}
            </span>
            <h2 className="font-serif text-2xl text-primary">{formula.name}</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">{formula.epithet}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-border/60 p-1.5 text-muted-foreground hover:border-gold hover:text-gold"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6 pt-4">
          <p className="mb-5 text-sm leading-relaxed text-foreground/85">{formula.context}</p>

          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {formula.steps.length} collapsed stage{formula.steps.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={toggleAll}
              className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold hover:bg-gold/10"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          <div className={cn("space-y-2.5", isCharm && "rounded-lg border border-gold/20 bg-background/40 p-3")}>
            {formula.steps.map((s, i) => {
              const open = !!openSteps[i];
              return (
                <div key={i} className="overflow-hidden rounded-lg border border-border/50 bg-background/35">
                  <button
                    type="button"
                    onClick={() => toggleStep(i)}
                    className="flex w-full items-center gap-3 p-3 text-left hover:bg-gold/5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-[10px] text-gold">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground/90">
                      {isCharm ? `Line ${i + 1}` : s.length > 90 ? `${s.slice(0, 90)}…` : s}
                    </span>
                    {open ? <ChevronUp className="h-4 w-4 text-gold" /> : <ChevronDown className="h-4 w-4 text-gold" />}
                  </button>
                  {open && (
                    <div className={cn("border-t border-border/40 px-4 py-3 text-sm leading-relaxed text-foreground/90", isCharm && "italic text-gold/90")}>
                      {s}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {formula.notes && formula.notes.length > 0 && (
            <div className="mt-5 space-y-2 border-t border-border/50 pt-4">
              {formula.notes.map((n, i) => (
                <p key={i} className="text-xs italic leading-relaxed text-muted-foreground">
                  {n}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FaeryFormulaeCodex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FormulaCategory | "All">("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faeryFormulae.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (!q) return true;
      return [f.name, f.epithet, f.context].some((s) => s.toLowerCase().includes(q));
    });
  }, [query, category]);

  const openFormula = faeryFormulae.find((f) => f.slug === openSlug) ?? null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-2xl text-primary">
            <ScrollText className="h-5 w-5 text-gold" /> The Formulae Codex
          </h2>
          <p className="max-w-xl text-xs text-muted-foreground">
            Every named formula, journey, altar-working, and charm from the course, kept whole , 
            full stage-by-stage sequences, not condensed summaries. Use this as your working
            grimoire alongside the chapters.
          </p>
        </div>
        <div className="relative w-full max-w-[220px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search formulae…"
            className="w-full rounded-full border border-border/60 bg-background/60 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {(["All", ...formulaCategories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] transition",
              category === c
                ? "border-gold bg-gold/10 text-primary"
                : "border-border/60 text-muted-foreground hover:border-gold/50",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => (
          <FormulaCard key={f.slug} formula={f} onOpen={() => setOpenSlug(f.slug)} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No formula matches "{query}".
          </p>
        )}
      </div>

      {openFormula && <FormulaDetail formula={openFormula} onClose={() => setOpenSlug(null)} />}
    </section>
  );
}
