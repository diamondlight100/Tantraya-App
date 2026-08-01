import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  suryaNamaskaraSequence, chakras, roundMantras, type PoseStep,
} from "@/data/yogic/surya-namaskara";
import { TattvaShape, tattvaShapeKeyFor } from "./tattva-shapes";
import { Sun, Wind, Sparkles, Shapes, Box, Flame, Volume2, Music, HandHeart, ChevronLeft, ChevronRight } from "lucide-react";

const STAGES = [
  { n: 1, label: "Posture", icon: Sparkles, hint: "Just the shape and the alignment." },
  { n: 2, label: "+ Breath", icon: Wind, hint: "Inhale, exhale, and the one held breath." },
  { n: 3, label: "+ Chakra colour", icon: Sparkles, hint: "A simple colour held at each chakra." },
  { n: 4, label: "+ Tattva symbol", icon: Shapes, hint: "The element's shape, seen at the chakra." },
  { n: 5, label: "+ Tattva in 3D", icon: Box, hint: "The same shape, felt with depth and volume." },
  { n: 6, label: "+ Element", icon: Flame, hint: "The quality of the element itself, up to Viśuddha and beyond." },
  { n: 7, label: "+ Bīja mantra", icon: Volume2, hint: "Spoken aloud first, then silently, internally." },
  { n: 8, label: "+ Sūrya mantra", icon: Music, hint: "The sun's name, spoken at the start of each side." },
  { n: 9, label: "+ Devotion", icon: HandHeart, hint: "The felt offering to the sun as source of life." },
] as const;

const BREATH_LABEL: Record<PoseStep["breath"], string> = {
  inhale: "Inhale",
  exhale: "Exhale",
  retention: "Hold, breath out",
  neutral: "Natural breath",
};

export function SuryaNamaskaraWidget() {
  const [activeSlug, setActiveSlug] = useState(suryaNamaskaraSequence[0].slug);
  const [stage, setStage] = useState(1);

  const active = useMemo(
    () => suryaNamaskaraSequence.find((p) => p.slug === activeSlug)!,
    [activeSlug],
  );
  const activeIndex = suryaNamaskaraSequence.findIndex((p) => p.slug === activeSlug);

  function go(delta: number) {
    const next = (activeIndex + delta + suryaNamaskaraSequence.length) % suryaNamaskaraSequence.length;
    setActiveSlug(suryaNamaskaraSequence[next].slug);
  }

  const primaryChakra = chakras[active.chakraFocus[0]];
  const isPranamasana = active.slug === "pranamasana" || active.slug === "pranamasana-return";
  const roundMantra = active.slug === "pranamasana" ? roundMantras.right
    : active.slug === "pranamasana-return" ? roundMantras.left
    : null;

  return (
    <div>
      {/* Stage depth selector */}
      <div className="mb-8 rounded-2xl border border-gold/30 bg-card/40 p-4">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.3em] text-gold">
          Depth of practice
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {STAGES.map((s) => (
            <button
              key={s.n}
              onClick={() => setStage(s.n)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
                stage === s.n
                  ? "border-gold bg-gold/10 text-primary"
                  : stage > s.n
                    ? "border-border/60 bg-card/60 text-foreground/70 hover:border-gold/50"
                    : "border-border/40 text-muted-foreground/60 hover:border-gold/40 hover:text-foreground",
              )}
            >
              <s.icon className="h-3.5 w-3.5" /> {s.n}. {s.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">{STAGES[stage - 1].hint}</p>
      </div>

      {/* Pose picker */}
      <div className="relative mx-auto mb-8 grid max-w-2xl grid-cols-4 gap-3 sm:grid-cols-6">
        {suryaNamaskaraSequence.map((p) => {
          const isActive = p.slug === activeSlug;
          return (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-2 transition",
                isActive
                  ? "border-gold bg-gold/10"
                  : "border-border/50 bg-card/40 hover:border-gold/40",
              )}
            >
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.english} className="h-14 w-14 rounded-lg object-cover" />
              ) : (
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full border font-serif text-xl",
                    isActive ? "border-gold text-gold" : "border-border/60 text-foreground/60",
                  )}
                >
                  {p.order}
                </span>
              )}
              <span className="text-center text-[9px] uppercase tracking-wide text-muted-foreground">
                {p.english}
                {p.side && <span className="block text-gold/80">({p.side})</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => go(-1)} className="rounded-full p-2 text-muted-foreground hover:bg-card hover:text-gold">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Position {active.order} of 12{active.side ? ` · ${active.side} side` : ""}
            </p>
            <h3 className="font-serif text-3xl text-primary">{active.sanskrit}</h3>
            <p className="text-sm text-muted-foreground">{active.english}</p>
          </div>
          <button onClick={() => go(1)} className="rounded-full p-2 text-muted-foreground hover:bg-card hover:text-gold">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {active.imageUrl && (
            <img src={active.imageUrl} alt={active.english} className="mx-auto max-h-72 rounded-xl border border-border/60 object-contain" />
          )}

          {/* Stage 1: Alignment */}
          <section className="rounded-lg border border-border/60 bg-background/40 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
              <Sparkles className="h-4 w-4 text-gold" /> Alignment
            </h4>
            <ul className="space-y-1.5 text-sm text-foreground/85">
              {active.alignment.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-gold">•</span> {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Stage 2: Breath */}
          {stage >= 2 && (
            <section className="rounded-lg border border-border/60 bg-background/40 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <Wind className="h-4 w-4 text-gold" /> Breath
              </h4>
              <p className="text-sm font-semibold text-gold">{BREATH_LABEL[active.breath]}</p>
              {active.breathNote && (
                <p className="mt-1 text-sm text-foreground/85">{active.breathNote}</p>
              )}
            </section>
          )}

          {/* Stage 3: Chakra colour */}
          {stage >= 3 && (
            <section className="rounded-lg border border-border/60 bg-background/40 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <Sparkles className="h-4 w-4 text-gold" /> Chakra colour
              </h4>
              <div className="flex flex-wrap gap-3">
                {active.chakraFocus.map((key) => {
                  const c = chakras[key];
                  return (
                    <div key={key} className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-2">
                      <span className="h-5 w-5 shrink-0 rounded-full" style={{ backgroundColor: c.visualColor }} />
                      <span className="text-sm text-foreground/85">{c.sanskrit}, {c.english}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Visualise a soft glow of this colour resting at the chakra location as you hold or move through the pose.
              </p>
            </section>
          )}

          {/* Stage 4 & 5: Tattva */}
          {stage >= 4 && (
            <section className="rounded-lg border border-border/60 bg-background/40 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <Shapes className="h-4 w-4 text-gold" /> Tattva symbol{stage >= 5 ? ", in three dimensions" : ""}
              </h4>
              <div className="flex flex-wrap gap-4">
                {active.chakraFocus.map((key) => {
                  const c = chakras[key];
                  return (
                    <div key={key} className="flex flex-col items-center gap-2">
                      <div className={cn("rounded-lg border border-border/40 bg-background/60 p-2", stage >= 5 && "shadow-[0_6px_14px_rgba(0,0,0,0.35)]")}>
                        <TattvaShape
                          shape={tattvaShapeKeyFor(key)}
                          color={c.tattvaColor}
                          dimension={stage >= 5 ? "3d" : "2d"}
                          size={64}
                        />
                      </div>
                      <p className="max-w-[8rem] text-center text-xs text-muted-foreground">{c.tattvaShape}</p>
                    </div>
                  );
                })}
              </div>
              {stage >= 5 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Let the flat shape gain depth, not a drawing of the form, but a felt volume of it, resting at the chakra location.
                </p>
              )}
            </section>
          )}

          {/* Stage 6: Element */}
          {stage >= 6 && (
            <section className="rounded-lg border border-border/60 bg-background/40 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <Flame className="h-4 w-4 text-gold" /> Element
              </h4>
              {active.chakraFocus.map((key) => {
                const c = chakras[key];
                return (
                  <p key={key} className="text-sm text-foreground/85">
                    <span className="font-semibold text-gold">{c.elementSanskrit}, {c.element}</span>
                    {" "}at {c.sanskrit}.{" "}
                    {key === "ajna" || key === "sahasrara"
                      ? "Beyond the five elements, the quality here is mind and light themselves, not a physical element at all."
                      : `Feel the specific quality of ${c.element.toLowerCase()} as you hold this position.`}
                  </p>
                );
              })}
            </section>
          )}

          {/* Stage 7: Bija */}
          {stage >= 7 && (
            <section className="rounded-lg border border-border/60 bg-background/40 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <Volume2 className="h-4 w-4 text-gold" /> Bīja mantra
              </h4>
              {active.chakraFocus.map((key) => {
                const c = chakras[key];
                return (
                  <p key={key} className="text-sm text-foreground/85">
                    <span className="font-serif text-xl text-gold">{c.bija}</span>{" "}
                    <span className="text-muted-foreground">({c.bijaTranslit})</span>, spoken aloud first,
                    then repeated silently, internally, once it feels familiar.
                  </p>
                );
              })}
            </section>
          )}

          {/* Stage 8: Sun mantra */}
          {stage >= 8 && isPranamasana && roundMantra && (
            <section className="rounded-lg border border-gold/40 bg-gold/5 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <Music className="h-4 w-4 text-gold" /> Sūrya mantra, start of this side
              </h4>
              <p className="font-serif text-2xl text-primary">{roundMantra.sanskrit}</p>
              <p className="mt-1 text-sm text-foreground/80">{roundMantra.meaning}</p>
              <p className="mt-2 text-xs text-foreground/80">
                Visualise the sun rising over the horizon as this name is spoken, held in prayer position before the round begins.
              </p>
            </section>
          )}
          {stage >= 8 && !isPranamasana && (
            <section className="rounded-lg border border-border/40 bg-background/20 p-4 opacity-60">
              <p className="text-xs text-muted-foreground">
                The Sūrya mantra is spoken at the two prayer-position points only, the start of each side's half-round.
              </p>
            </section>
          )}

          {/* Stage 9: Devotion */}
          {stage >= 9 && (
            <section className="rounded-lg border border-gold/40 bg-gold/5 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-primary">
                <HandHeart className="h-4 w-4 text-gold" /> Devotion
              </h4>
              <p className="text-sm text-foreground/85">
                {active.devotional ??
                  "Let this movement be an offering, the body given in gratitude to the sun as the source and sustainer of all life on Earth."}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
