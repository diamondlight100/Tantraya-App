import { useMemo, useState } from "react";
import { Coins, RotateCcw, Save, Trash2, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  trigrams,
  trigramByKey,
  preHeavenCircle,
  postHeavenCircle,
  type TrigramKey,
} from "@/data/daoist/iching-trigrams";
import {
  hexagrams,
  findHexagram,
  resolveHexagrams,
  lineIsYang,
  lineIsChanging,
  type LineValue,
  type Hexagram,
} from "@/data/daoist/iching-hexagrams";
import { useIChingReadings } from "@/lib/iching-readings";

/* ═══════════════════════════ shared: line glyph ═══════════════════════════ */

function LineGlyph({
  yang,
  changing,
  width = 64,
}: {
  yang: boolean;
  changing?: boolean;
  width?: number;
}) {
  return (
    <svg width={width} height="10" viewBox={`0 0 ${width} 10`} className="shrink-0">
      {yang ? (
        <rect x="0" y="3" width={width} height="4" rx="1" className={cn(changing ? "fill-rose-500" : "fill-gold")} />
      ) : (
        <>
          <rect x="0" y="3" width={width * 0.42} height="4" rx="1" className={cn(changing ? "fill-rose-500" : "fill-gold")} />
          <rect x={width * 0.58} y="3" width={width * 0.42} height="4" rx="1" className={cn(changing ? "fill-rose-500" : "fill-gold")} />
        </>
      )}
    </svg>
  );
}

function HexagramGlyph({
  hex,
  changingPositions,
  width = 64,
}: {
  hex: Hexagram;
  changingPositions?: number[];
  width?: number;
}) {
  const upperLines = trigramByKey[hex.upper].lines;
  const lowerLines = trigramByKey[hex.lower].lines;
  const allLines = [...lowerLines, ...upperLines]; // bottom to top, index 0 = line 1
  return (
    <div className="flex flex-col-reverse gap-1.5">
      {allLines.map((v, i) => (
        <LineGlyph key={i} yang={v === 1} changing={changingPositions?.includes(i + 1)} width={width} />
      ))}
    </div>
  );
}

/* ═══════════════════════════ Trigram Explorer ═══════════════════════════ */

export function TrigramExplorer() {
  const [active, setActive] = useState<TrigramKey>("qian");
  const t = trigramByKey[active];
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Eight Trigrams · tap one</p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {trigrams.map((tr) => (
          <button
            key={tr.key}
            onClick={() => setActive(tr.key)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-2 transition",
              active === tr.key ? "border-gold bg-gold/10" : "border-border/60 hover:border-gold/50",
            )}
          >
            <span className="font-serif text-2xl text-primary">{tr.glyph}</span>
            <span className="text-[10px] text-muted-foreground">{tr.pinyin}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col-reverse gap-2 rounded-lg border border-border/60 bg-background/40 p-4">
          {t.lines.map((v, i) => (
            <LineGlyph key={i} yang={v === 1} width={72} />
          ))}
        </div>
        <div className="flex-1">
          <p className="font-serif text-2xl text-primary">
            {t.chinese} <span className="text-lg text-muted-foreground">{t.pinyin}</span>
          </p>
          <p className="text-sm text-gold">{t.english}</p>
          <div className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
            <span>Family: <span className="text-foreground/85">{t.family}</span></span>
            <span>Attribute: <span className="text-foreground/85">{t.attribute}</span></span>
            <span>Animal: <span className="text-foreground/85">{t.animal}</span></span>
            <span>Body: <span className="text-foreground/85">{t.bodyPart}</span></span>
            <span>Pre-Heaven: <span className="text-foreground/85">{t.preHeaven.position} · {t.preHeaven.number}</span></span>
            <span>Post-Heaven: <span className="text-foreground/85">{t.postHeaven.position} · {t.postHeaven.number}</span></span>
          </div>
          <p className="mt-3 rounded-lg border-l-2 border-gold/60 bg-gold/5 p-3 text-sm italic text-foreground/85">
            {t.note}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Bagua Arrangement (Pre/Post-Heaven wheel) ═══════════════════════════ */

export function BaguaArrangement() {
  const [mode, setMode] = useState<"pre" | "post">("pre");
  const [active, setActive] = useState<TrigramKey>("qian");
  const circle = mode === "pre" ? preHeavenCircle : postHeavenCircle;
  const cx = 160, cy = 160, r = 112;
  const t = trigramByKey[active];

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Bagua Arrangement</p>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("pre")}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              mode === "pre" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50",
            )}
          >
            Pre-Heaven (Fuxi)
          </button>
          <button
            onClick={() => setMode("post")}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              mode === "post" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50",
            )}
          >
            Post-Heaven (King Wen)
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:items-start">
        <svg viewBox="0 0 320 320" className="h-72 w-72 shrink-0">
          <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
          {circle.map(({ key, angleDeg }) => {
            const rad = (angleDeg * Math.PI) / 180;
            const x = cx + Math.cos(rad) * r;
            const y = cy - Math.sin(rad) * r;
            const tr = trigramByKey[key];
            const isActive = active === key;
            return (
              <g key={key} onClick={() => setActive(key)} className="cursor-pointer">
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" className="text-border" strokeWidth="0.5" opacity={isActive ? 0.6 : 0.2} />
                <circle cx={x} cy={y} r={isActive ? 26 : 20} className={cn("transition-all", isActive ? "fill-gold" : "fill-card stroke-gold/60")} strokeWidth="1.5" />
                <text x={x} y={y + 6} textAnchor="middle" className={cn("font-serif text-base", isActive ? "fill-gold-foreground" : "fill-primary")}>
                  {tr.glyph}
                </text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="4" className="fill-gold/70" />
        </svg>
        <div className="flex-1">
          <p className="font-serif text-2xl text-primary">
            {t.chinese} <span className="text-lg text-muted-foreground">{t.pinyin}</span> · {t.english}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {mode === "pre"
              ? `Pre-Heaven position: ${t.preHeaven.position}, number ${t.preHeaven.number}`
              : `Post-Heaven position: ${t.postHeaven.position}, number ${t.postHeaven.number}`}
          </p>
          <p className="mt-3 rounded-lg border-l-2 border-gold/60 bg-gold/5 p-3 text-sm italic text-foreground/85">
            {mode === "pre"
              ? "Pre-Heaven, Fuxi's arrangement: pure structural principle, opposite trigrams sit directly across the circle from each other. The blueprint, before movement."
              : "Post-Heaven, King Wen's arrangement: the working cycle, how each trigram's energy actually functions through the real seasons and directions."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Hexagram Builder ═══════════════════════════ */

export function HexagramBuilder() {
  const [values, setValues] = useState<LineValue[]>([7, 7, 7, 7, 7, 7]);

  const cycle = (v: LineValue): LineValue => {
    if (v === 7) return 9;
    if (v === 9) return 8;
    if (v === 8) return 6;
    return 7;
  };

  const result = useMemo(
    () => resolveHexagrams(values as [LineValue, LineValue, LineValue, LineValue, LineValue, LineValue]),
    [values],
  );

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Hexagram Builder · click a line to cycle its value</p>
      <div className="mt-4 flex flex-col gap-5 sm:flex-row">
        <div className="flex shrink-0 flex-col-reverse gap-2 rounded-lg border border-border/60 bg-background/40 p-4">
          {values.map((v, i) => (
            <button
              key={i}
              onClick={() => setValues((prev) => prev.map((p, pi) => (pi === i ? cycle(p) : p)))}
              className="flex items-center gap-3 rounded-md px-1 py-0.5 hover:bg-gold/10"
              title="Click to cycle: 7 (young yang) → 9 (old yang) → 8 (young yin) → 6 (old yin)"
            >
              <LineGlyph yang={lineIsYang(v)} changing={lineIsChanging(v)} width={72} />
              <span className="w-6 text-xs text-muted-foreground">{v}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-3">
          {result.primary ? (
            <div>
              <p className="font-serif text-xl text-primary">
                {result.primary.number}. {result.primary.chinese} {result.primary.pinyin} — {result.primary.english}
              </p>
              <p className="text-xs text-muted-foreground">
                {trigramByKey[result.primary.upper].english} over {trigramByKey[result.primary.lower].english}
              </p>
              <p className="mt-2 text-sm text-foreground/85">{result.primary.judgment}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No matching hexagram found.</p>
          )}

          {result.changingPositions.length > 0 && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-rose-500">
                Changing lines: {result.changingPositions.join(", ")}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
                {result.changingPositions.map((pos) => (
                  <li key={pos}>
                    <span className="text-rose-500">Line {pos}:</span> {result.primary?.lines[pos - 1]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.resulting && (
            <div className="rounded-lg border border-gold/40 bg-gold/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Resulting hexagram</p>
              <p className="mt-1 font-serif text-lg text-primary">
                {result.resulting.number}. {result.resulting.chinese} {result.resulting.pinyin} — {result.resulting.english}
              </p>
              <p className="mt-1 text-sm text-foreground/85">{result.resulting.judgment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Yarrow Stalk Walkthrough ═══════════════════════════ */

const yarrowSteps = [
  "Begin with 49 stalks in hand (one of the original 50 set aside, unused, representing the unmanifest source).",
  "Divide the 49 stalks at random into two piles, left and right hand, without counting.",
  "Set one stalk from the right-hand pile aside, held between two fingers.",
  "Count the left-hand pile off in groups of four, and set the remainder (1-4 stalks) aside.",
  "Count the right-hand pile off in groups of four, and set that remainder aside too.",
  "Combine everything just set aside, it will total either 5 or 9 stalks, this is the result of the first of three rounds for this line.",
  "Repeat the whole division two more times with the stalks that remain, each round narrowing toward either 4 or 8.",
  "The three rounds' results combine to give this line's value: 6, 7, 8, or 9. Repeat the entire process for all six lines, bottom to top.",
];

export function YarrowStalkWalkthrough() {
  const [step, setStep] = useState(0);
  const [lineValues, setLineValues] = useState<LineValue[]>([]);

  const rollYarrowLine = (): LineValue => {
    // Approximate true yarrow-stalk odds: 6 ≈ 1/16, 7 ≈ 5/16, 8 ≈ 7/16, 9 ≈ 3/16
    const r = Math.random();
    if (r < 1 / 16) return 6;
    if (r < 6 / 16) return 7;
    if (r < 13 / 16) return 8;
    return 9;
  };

  const finishLine = () => {
    setLineValues((prev) => [...prev, rollYarrowLine()]);
    setStep(0);
  };

  const reset = () => {
    setLineValues([]);
    setStep(0);
  };

  const done = lineValues.length === 6;
  const result = useMemo(
    () => (done ? resolveHexagrams(lineValues as [LineValue, LineValue, LineValue, LineValue, LineValue, LineValue]) : null),
    [done, lineValues],
  );

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Yarrow Stalk Walkthrough · line {lineValues.length + 1} of 6</p>

      {!done ? (
        <div className="mt-4">
          <div className="rounded-lg border border-border/60 bg-background/40 p-4">
            <p className="text-sm text-foreground/85">{yarrowSteps[step]}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {step < yarrowSteps.length - 1 ? (
              <Button size="sm" onClick={() => setStep((s) => s + 1)}>
                Next step <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button size="sm" onClick={finishLine}>
                Resolve this line's value
              </Button>
            )}
            {lineValues.length > 0 && (
              <Button size="sm" variant="outline" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" /> Start over
              </Button>
            )}
          </div>
          {lineValues.length > 0 && (
            <div className="mt-4 flex flex-col-reverse gap-2 rounded-lg border border-border/60 bg-background/30 p-3">
              {lineValues.map((v, i) => (
                <LineGlyph key={i} yang={lineIsYang(v)} changing={lineIsChanging(v)} width={72} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="flex flex-col-reverse gap-2 rounded-lg border border-border/60 bg-background/30 p-3">
            {lineValues.map((v, i) => (
              <LineGlyph key={i} yang={lineIsYang(v)} changing={lineIsChanging(v)} width={72} />
            ))}
          </div>
          {result?.primary && (
            <div>
              <p className="font-serif text-xl text-primary">
                {result.primary.number}. {result.primary.chinese} {result.primary.pinyin} — {result.primary.english}
              </p>
              <p className="mt-1 text-sm text-foreground/85">{result.primary.judgment}</p>
            </div>
          )}
          {result?.resulting && (
            <div className="rounded-lg border border-gold/40 bg-gold/5 p-3 text-sm text-foreground/85">
              Resulting: {result.resulting.number}. {result.resulting.chinese} {result.resulting.pinyin} — {result.resulting.english}
            </div>
          )}
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> Cast a fresh reading
          </Button>
          <p className="text-xs text-muted-foreground">
            Notice how this method's odds differ from the coin toss, yarrow favors young yin (8) most heavily, moving lines are comparatively rarer than with coins.
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ Coin Divination (real, saved readings) ═══════════════════════════ */

function tossCoinLine(): LineValue {
  // Each coin: heads = 3, tails = 2. Sum of three coins → 6, 7, 8, or 9.
  let sum = 0;
  for (let i = 0; i < 3; i++) sum += Math.random() < 0.5 ? 2 : 3;
  return sum as LineValue;
}

export function CoinDivination() {
  const { readings, save, remove, setNote } = useIChingReadings();
  const [question, setQuestion] = useState("");
  const [lineValues, setLineValues] = useState<LineValue[]>([]);
  const [tossing, setTossing] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const done = lineValues.length === 6;
  const result = useMemo(
    () => (done ? resolveHexagrams(lineValues as [LineValue, LineValue, LineValue, LineValue, LineValue, LineValue]) : null),
    [done, lineValues],
  );

  const tossNext = () => {
    if (lineValues.length >= 6) return;
    setTossing(true);
    setTimeout(() => {
      setLineValues((prev) => [...prev, tossCoinLine()]);
      setTossing(false);
    }, 350);
  };

  const reset = () => {
    setLineValues([]);
    setSavedId(null);
    setNoteDraft("");
  };

  const handleSave = () => {
    if (!result?.primary) return;
    const entry = save({
      method: "coins",
      question: question.trim() || undefined,
      lineValues,
      primaryNumber: result.primary.number,
      resultingNumber: result.resulting?.number,
      changingPositions: result.changingPositions,
      note: noteDraft.trim() || undefined,
    });
    setSavedId(entry.id);
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Three-Coin Divination</p>
        <button
          onClick={() => setShowHistory((s) => !s)}
          className="text-xs text-muted-foreground hover:text-gold"
        >
          {showHistory ? "Hide" : "View"} reading log ({readings.length})
        </button>
      </div>

      {showHistory ? (
        <div className="mt-4 space-y-2">
          {readings.length === 0 && (
            <p className="text-sm text-muted-foreground">No saved readings yet.</p>
          )}
          {readings.map((r) => (
            <div key={r.id} className="rounded-lg border border-border/60 bg-background/40 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.date).toLocaleDateString()} · {r.method}
                  </p>
                  <p className="font-serif text-base text-primary">
                    #{r.primaryNumber}
                    {r.resultingNumber ? ` → #${r.resultingNumber}` : ""}
                  </p>
                  {r.question && <p className="mt-1 text-sm italic text-foreground/85">"{r.question}"</p>}
                  {r.note && <p className="mt-1 text-xs text-foreground/70">{r.note}</p>}
                </div>
                <button onClick={() => remove(r.id)} className="text-muted-foreground hover:text-rose-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          {lineValues.length === 0 && (
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Your real question for this casting (optional, but recommended)…"
              className="w-full rounded-md border border-border/60 bg-background/60 p-3 text-sm focus:border-gold/60 focus:outline-none"
              rows={2}
            />
          )}

          <div className="mt-4 flex flex-col gap-5 sm:flex-row">
            <div className="flex shrink-0 flex-col-reverse gap-2 rounded-lg border border-border/60 bg-background/40 p-4">
              {lineValues.length === 0 && <p className="text-xs text-muted-foreground">No lines cast yet</p>}
              {lineValues.map((v, i) => (
                <LineGlyph key={i} yang={lineIsYang(v)} changing={lineIsChanging(v)} width={72} />
              ))}
            </div>

            <div className="flex-1 space-y-3">
              {!done ? (
                <Button onClick={tossNext} disabled={tossing}>
                  <Coins className="h-4 w-4" />
                  {tossing ? "Tossing…" : `Toss line ${lineValues.length + 1} of 6`}
                </Button>
              ) : (
                <>
                  {result?.primary && (
                    <div>
                      <p className="font-serif text-xl text-primary">
                        {result.primary.number}. {result.primary.chinese} {result.primary.pinyin} — {result.primary.english}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {trigramByKey[result.primary.upper].english} over {trigramByKey[result.primary.lower].english}
                      </p>
                      <p className="mt-2 text-sm text-foreground/85">{result.primary.judgment}</p>
                      <p className="mt-2 text-sm italic text-foreground/70">{result.primary.image}</p>
                    </div>
                  )}

                  {result && result.changingPositions.length > 0 && (
                    <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-rose-500">
                        Changing lines: {result.changingPositions.join(", ")}
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
                        {result.changingPositions.map((pos) => (
                          <li key={pos}>
                            <span className="text-rose-500">Line {pos}:</span> {result.primary?.lines[pos - 1]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result?.resulting && (
                    <div className="rounded-lg border border-gold/40 bg-gold/5 p-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Resulting hexagram</p>
                      <p className="mt-1 font-serif text-lg text-primary">
                        {result.resulting.number}. {result.resulting.chinese} {result.resulting.pinyin} — {result.resulting.english}
                      </p>
                      <p className="mt-1 text-sm text-foreground/85">{result.resulting.judgment}</p>
                    </div>
                  )}

                  {!savedId ? (
                    <div className="space-y-2 rounded-lg border border-border/60 bg-background/40 p-3">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add a note before saving (optional)…"
                        className="w-full rounded-md border border-border/60 bg-background/60 p-2 text-sm focus:border-gold/60 focus:outline-none"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-3.5 w-3.5" /> Save to reading log
                        </Button>
                        <Button size="sm" variant="outline" onClick={reset}>
                          <RotateCcw className="h-3.5 w-3.5" /> New casting
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-gold" />
                      <p className="text-sm text-muted-foreground">Saved to your reading log.</p>
                      <Button size="sm" variant="outline" onClick={reset}>
                        <RotateCcw className="h-3.5 w-3.5" /> New casting
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ Hexagram Atlas (browse all 64) ═══════════════════════════ */

export function HexagramAtlas() {
  const [active, setActive] = useState<number>(1);
  const h = hexagrams.find((x) => x.number === active)!;

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The 64 Hexagrams · Hexagram Atlas</p>
      <div className="mt-4 grid grid-cols-8 gap-1.5 sm:grid-cols-16">
        {hexagrams.map((hx) => (
          <button
            key={hx.number}
            onClick={() => setActive(hx.number)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md border p-1.5 transition",
              active === hx.number ? "border-gold bg-gold/10" : "border-border/60 hover:border-gold/50",
            )}
            title={`${hx.number}. ${hx.english}`}
          >
            <HexagramGlyph hex={hx} width={22} />
            <span className="text-[9px] text-muted-foreground">{hx.number}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row">
        <div className="shrink-0 rounded-lg border border-border/60 bg-background/40 p-4">
          <HexagramGlyph hex={h} width={80} />
        </div>
        <div className="flex-1">
          <p className="font-serif text-2xl text-primary">
            {h.number}. {h.chinese} <span className="text-lg text-muted-foreground">{h.pinyin}</span> — {h.english}
          </p>
          <p className="text-xs text-muted-foreground">
            {trigramByKey[h.upper].english} over {trigramByKey[h.lower].english}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {h.keywords.map((k) => (
              <span key={k} className="rounded-full border border-gold/40 bg-gold/5 px-2 py-0.5 text-[11px] text-foreground/80">
                {k}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-foreground/85">{h.judgment}</p>
          <p className="mt-2 text-sm italic text-foreground/70">{h.image}</p>
          <details className="mt-3">
            <summary className="cursor-pointer text-xs uppercase tracking-[0.25em] text-gold">All six lines</summary>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
              {h.lines.map((l, i) => (
                <li key={i}>
                  <span className="text-gold">Line {i + 1}:</span> {l}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
