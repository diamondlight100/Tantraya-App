import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { SephirahLibrary } from "@/components/course/sephirah-library";
import {
  sephiroth,
  paths,
  sephirahByKey,
  type Sephirah,
  type Path,
} from "@/data/magick/tree-of-life";

type Selection = { type: "sephirah"; key: string } | { type: "path"; number: number } | { type: "group"; group: GroupKey } | null;

type GroupKey = "supernal" | "ethical" | "astral" | "material";

const GROUPS: { key: GroupKey; label: string; blurb: string }[] = [
  {
    key: "supernal",
    label: "The Supernals",
    blurb:
      "Kether, Chokmah, and Binah sit above the Abyss, the great gap that separates pure, unconditioned being from everything that can actually be experienced as a self. The Supernals aren't really three separate 'things' so much as three ways of describing the single act by which the absolute becomes able to have any qualities at all: Kether is the bare point of existence, Chokmah the first outward thrust of force, Binah the first receiving of that force into form. Nothing here has yet become a 'someone' — no ego, no story, no vice, which is why these three have thin or absent attributions for things like animals and metals. Traditionally this triad is approached only after real work has been done lower on the Tree; it isn't a shortcut to enlightenment so much as the ground everything else stands on.",
  },
  {
    key: "ethical",
    label: "The Ethical Triad",
    blurb:
      "Chesed, Geburah, and Tiphareth form the middle triad: Mercy, Severity, and the Beauty that balances them. This is the triad of the fully individuated moral self — expansion and generosity on one side, discipline and necessary destruction on the other, and in the center, Tiphareth's harmonized, sacrificial heart that can hold both without collapsing into either. Most of what's ordinarily called 'character' is built and tested here: knowing when to give without limit, when to cut something off cleanly, and how to keep a center that doesn't get pulled entirely to either extreme.",
  },
  {
    key: "astral",
    label: "The Astral Triad",
    blurb:
      "Netzach, Hod, and Yesod sit just above the physical world: instinct and desire, intellect and language, and the astral/dream foundation that holds the images both are made of. This is the triad where nearly all practical magical technique actually operates — sigils, pathworking, ritual, divination, and dreamwork all live in this astral layer before (if ever) they reach all the way down into Malkuth. Netzach and Hod are natural opposites, feeling versus form, and Yesod beneath them is where those two get stored, combined, and eventually made ready to manifest.",
  },
  {
    key: "material",
    label: "Malkuth Alone",
    blurb:
      "Malkuth stands apart from every triad above it, the only sephirah where the four elements appear fully separated out rather than blended: Air, Fire, Water, and Earth each occupy their own quarter of Malkuth's disc, with Earth itself as the sephirah's overall root note. Everything above Malkuth is elemental only by tendency or association; here, the four are concrete, distinct, and literally underfoot. This is why grounding, embodiment, and the honoring of the physical world as sacred (not as something to transcend) is Malkuth's whole teaching.",
  },
];

const TIER_LABEL: Record<Sephirah["tier"], string> = {
  supernal: "Supernal",
  ethical: "Ethical triad",
  astral: "Astral triad",
  material: "The Kingdom",
};

function CorrespondenceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-1.5 text-sm">
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 pt-0.5">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}

function SephirahDetail({ s }: { s: Sephirah }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-8 w-8 shrink-0 rounded-full border border-white/20 shadow-inner"
          style={{ background: s.colorKingScale }}
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
            {s.number}. {TIER_LABEL[s.tier]}
          </p>
          <h3 className="font-serif text-2xl text-primary leading-tight">
            {s.name} <span className="text-base text-muted-foreground">— {s.translation}</span>
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{s.description}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
        <span className="font-semibold text-gold">What it does: </span>
        {s.whatItDoes}
      </p>

      <div className="mt-4 divide-y divide-border/40 rounded-lg border border-border/50 bg-secondary/20 px-3">
        <CorrespondenceRow label="Hebrew" value={`${s.hebrew} · ${s.number}`} />
        <CorrespondenceRow label="Titles" value={s.titles.join("; ")} />
        <CorrespondenceRow label="Planet / sphere" value={s.planet} />
        <CorrespondenceRow label="Colour" value={s.colorName} />
        <CorrespondenceRow label="Deities" value={s.deities.join("; ")} />
        <CorrespondenceRow label="Archangel" value={s.archangel} />
        <CorrespondenceRow label="Choir of angels" value={s.choirOfAngels} />
        <CorrespondenceRow label="Tarot" value={s.tarot} />
        {s.element && <CorrespondenceRow label="Element" value={s.element} />}
        <CorrespondenceRow label="Virtue" value={s.virtue} />
        <CorrespondenceRow label="Vice" value={s.vice} />
        <CorrespondenceRow label="Metal" value={s.metal} />
        <CorrespondenceRow label="Incense" value={s.incense} />
        <CorrespondenceRow label="Gem" value={s.gem} />
        <CorrespondenceRow label="Plant" value={s.plant} />
        <CorrespondenceRow label="Animal" value={s.animal} />
        <CorrespondenceRow label="Magical image" value={s.magicalImage} />
      </div>

      <div className="mt-6">
        <SephirahLibrary sephirah={s.key} sephirahName={s.name} />
      </div>
    </div>
  );
}

function PathDetail({ p }: { p: Path }) {
  const from = sephirahByKey(p.from);
  const to = sephirahByKey(p.to);
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-8 w-8 shrink-0 rounded-full border border-white/20"
          style={{ background: p.color }}
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Path {p.number}</p>
          <h3 className="font-serif text-2xl text-primary leading-tight">
            {p.tarot} <span className="text-base text-muted-foreground">— {p.letter}</span>
          </h3>
        </div>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Connects <span className="text-primary">{from.name}</span> to{" "}
        <span className="text-primary">{to.name}</span>
      </p>

      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
        <span className="font-semibold text-gold">What it does: </span>
        {p.whatItDoes}
      </p>
      {p.crowleyNote && (
        <p className="mt-2 rounded-md border border-gold/30 bg-gold/5 px-3 py-2 text-xs text-muted-foreground">
          <span className="font-semibold text-gold">Crowley's revision: </span>
          {p.crowleyNote}
        </p>
      )}

      <div className="mt-4 divide-y divide-border/40 rounded-lg border border-border/50 bg-secondary/20 px-3">
        <CorrespondenceRow label="Letter" value={`${p.letter} — "${p.letterMeaning}"`} />
        <CorrespondenceRow label="Gematria value" value={String(p.hebrewGematria)} />
        <CorrespondenceRow label="Tarot trump" value={p.tarot} />
        <CorrespondenceRow label="Astrology" value={p.astrological} />
      </div>
    </div>
  );
}

function GroupDetail({ g }: { g: (typeof GROUPS)[number] }) {
  const members = sephiroth.filter((s) => {
    if (g.key === "supernal") return s.tier === "supernal";
    if (g.key === "ethical") return s.tier === "ethical";
    if (g.key === "astral") return s.tier === "astral";
    return s.tier === "material";
  });
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Triad</p>
      <h3 className="font-serif text-2xl text-primary leading-tight">{g.label}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{g.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {members.map((m) => (
          <span
            key={m.key}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-xs text-foreground/80"
          >
            <span className="h-2.5 w-2.5 rounded-full border border-white/20" style={{ background: m.colorKingScale }} />
            {m.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TreeOfLifeWidget() {
  const [selection, setSelection] = useState<Selection>(null);

  const highlightedKeys = useMemo(() => {
    if (!selection) return new Set<string>();
    if (selection.type === "sephirah") return new Set([selection.key]);
    if (selection.type === "path") {
      const p = paths.find((x) => x.number === selection.number)!;
      return new Set([p.from, p.to]);
    }
    if (selection.type === "group") {
      return new Set(
        sephiroth
          .filter((s) => {
            if (selection.group === "supernal") return s.tier === "supernal";
            if (selection.group === "ethical") return s.tier === "ethical";
            if (selection.group === "astral") return s.tier === "astral";
            return s.tier === "material";
          })
          .map((s) => s.key),
      );
    }
    return new Set<string>();
  }, [selection]);

  const highlightedPathNumbers = useMemo(() => {
    if (selection?.type === "path") return new Set([selection.number]);
    return new Set<number>();
  }, [selection]);

  return (
    <div className="rounded-2xl border border-gold/40 bg-card/60 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="mr-2 text-[10px] uppercase tracking-[0.3em] text-gold">Jump to a triad</p>
        {GROUPS.map((g) => (
          <button
            key={g.key}
            onClick={() => setSelection({ type: "group", group: g.key })}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition",
              selection?.type === "group" && selection.group === g.key
                ? "border-gold bg-gold/15 text-primary"
                : "border-border/50 text-muted-foreground hover:border-gold/50 hover:text-primary",
            )}
          >
            {g.label}
          </button>
        ))}
        {selection && (
          <button
            onClick={() => setSelection(null)}
            className="ml-auto rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold/50 hover:text-primary"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Diagram */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <svg viewBox="0 0 400 620" className="h-auto w-full select-none">
            <defs>
              <radialGradient id="tol-aura" cx="50%" cy="18%" r="70%">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="400" height="620" fill="url(#tol-aura)" />

            {/* pillar guides */}
            <line x1="80" y1="110" x2="80" y2="440" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="10" />
            <line x1="200" y1="20" x2="200" y2="600" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="10" />
            <line x1="320" y1="110" x2="320" y2="440" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="10" />

            {/* the 22 paths */}
            {paths.map((p) => {
              const from = sephirahByKey(p.from);
              const to = sephirahByKey(p.to);
              const isSelected = highlightedPathNumbers.has(p.number);
              const dimmed = selection && selection.type !== "path" && !isSelected;
              return (
                <g key={p.number}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={p.color}
                    strokeWidth={isSelected ? 4 : 2}
                    strokeOpacity={dimmed ? 0.18 : isSelected ? 0.95 : 0.55}
                    className="cursor-pointer transition-all"
                    onClick={() => setSelection({ type: "path", number: p.number })}
                  />
                  {/* wider invisible hit-area for easier clicking */}
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="transparent"
                    strokeWidth={14}
                    className="cursor-pointer"
                    onClick={() => setSelection({ type: "path", number: p.number })}
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2}
                    textAnchor="middle"
                    className="pointer-events-none select-none fill-background/90 text-[8px] font-semibold"
                    style={{ paintOrder: "stroke", stroke: "var(--card)", strokeWidth: 2 }}
                  >
                    {p.number}
                  </text>
                </g>
              );
            })}

            {/* the 10 sephiroth */}
            {sephiroth.map((s) => {
              const isSelected = selection?.type === "sephirah" && selection.key === s.key;
              const isHighlighted = highlightedKeys.has(s.key);
              const dimmed = selection && !isHighlighted;
              return (
                <g
                  key={s.key}
                  className="cursor-pointer"
                  onClick={() => setSelection({ type: "sephirah", key: s.key })}
                >
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={isSelected ? 30 : 26}
                    fill={s.colorKingScale}
                    fillOpacity={dimmed ? 0.35 : 1}
                    stroke="var(--gold)"
                    strokeOpacity={isSelected ? 1 : 0.6}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200"
                    style={{ filter: isSelected ? "drop-shadow(0 0 8px var(--gold))" : undefined }}
                  />
                  <text
                    x={s.x}
                    y={s.y + 3}
                    textAnchor="middle"
                    className="pointer-events-none select-none text-[10px] font-bold"
                    fill={
                      ["#ffffff", "#f1f3f5", "#ffe066", "#fcc419", "#a9a9a9", "#c9a06b"].includes(s.colorKingScale)
                        ? "#1a1a1a"
                        : "#ffffff"
                    }
                  >
                    {s.number}
                  </text>
                  <text
                    x={s.x}
                    y={s.y + 42}
                    textAnchor="middle"
                    className={cn(
                      "pointer-events-none select-none font-serif text-[11px] transition-colors",
                      dimmed ? "fill-muted-foreground/30" : "fill-primary",
                    )}
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Click any sphere or path. Numbers on the lines are the 22 Paths (11–32).
          </p>
        </div>

        {/* Detail panel */}
        <div className="min-h-[22rem] rounded-xl border border-border/50 bg-background/40 p-5">
          {!selection && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif text-xl text-primary">The Qabalistic Tree of Life</p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Ten Sephiroth and twenty-two Paths, the full map used throughout Western ceremonial magick.
                Click any sphere for its complete correspondence table — deity, archangel, planet, tarot, colour,
                gem, plant, animal, virtue and vice — or click any connecting Path for its letter, tarot trump,
                and astrological attribution. Use the triad buttons above to see how groups of spheres work together.
              </p>
            </div>
          )}
          {selection?.type === "sephirah" && <SephirahDetail s={sephirahByKey(selection.key)} />}
          {selection?.type === "path" && <PathDetail p={paths.find((p) => p.number === selection.number)!} />}
          {selection?.type === "group" && <GroupDetail g={GROUPS.find((g) => g.key === selection.group)!} />}
        </div>
      </div>
    </div>
  );
}
