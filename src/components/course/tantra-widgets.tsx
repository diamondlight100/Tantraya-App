import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════ Core Principles Wheel ═══════════════════════════ */

const principles = [
  {
    key: "nonduality",
    label: "Non-Duality",
    color: "from-violet-500/30 to-violet-500/5",
    ring: "ring-violet-500/60",
    body: "The material and spiritual are two faces of a single reality. Liberation comes through recognition.",
  },
  {
    key: "shakti",
    label: "Shakti",
    color: "from-rose-500/30 to-rose-500/5",
    ring: "ring-rose-500/60",
    body: "Divine feminine energy is the animating force of the cosmos, creative, transformative, and ever-present in all phenomena.",
  },
  {
    key: "interdependence",
    label: "Interdependence",
    color: "from-sky-500/30 to-sky-500/5",
    ring: "ring-sky-500/60",
    body: "Individual consciousness is inseparable from universal consciousness. Nothing exists in isolation; all things weave together.",
  },
  {
    key: "embodiment",
    label: "Sacred Embodiment",
    color: "from-emerald-500/30 to-emerald-500/5",
    ring: "ring-emerald-500/60",
    body: "The body is the vehicle for enlightenment, the microcosm that mirrors the macrocosm in every detail.",
  },
  {
    key: "sound",
    label: "Sound & Energy",
    color: "from-amber-500/30 to-amber-500/5",
    ring: "ring-amber-500/60",
    body: "Mantra, vibration, and the power of sacred sound are primary instruments for transforming consciousness and invoking the divine.",
  },
];

export function CorePrinciplesWheel() {
  const [active, setActive] = useState(0);
  const cx = 160, cy = 160, r = 108;
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Five Pillars</p>
      <div className="mt-3 flex flex-col items-center gap-4 md:flex-row md:items-start">
        <svg viewBox="0 0 320 320" className="h-64 w-64 shrink-0">
          <circle cx={cx} cy={cy} r={r + 16} fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
          {principles.map((p, i) => {
            const angle = -90 + i * (360 / principles.length);
            const rad = (angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * r;
            const y = cy + Math.sin(rad) * r;
            return (
              <g key={p.key} onClick={() => setActive(i)} className="cursor-pointer">
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" className="text-border" strokeWidth="0.5" opacity={active === i ? 0.6 : 0.2} />
                <circle cx={x} cy={y} r={active === i ? 28 : 22} className={cn("transition-all", active === i ? "fill-gold" : "fill-card stroke-gold/60")} strokeWidth="1.5" />
                <text x={x} y={y + 4} textAnchor="middle" className={cn("font-serif text-[10px]", active === i ? "fill-gold-foreground" : "fill-primary")}>
                  {p.label.split(" ")[0]}
                </text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="4" className="fill-gold/70" />
        </svg>
        <div className="flex-1">
          <p className="font-serif text-2xl text-primary">{principles[active].label}</p>
          <p className={cn("mt-3 rounded-lg border-l-2 bg-gradient-to-r p-3 text-sm italic text-foreground/85", principles[active].color)}>
            {principles[active].body}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">Tap any point on the wheel to explore each pillar.</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Timeline ═══════════════════════════ */

const eras = [
  { era: "c. 8000–3000 BCE", label: "Proto-Tantric roots", body: "Paleolithic goddess-worshipping cultures; possible Dravidian oral traditions, long before any text was written." },
  { era: "c. 3300–1300 BCE", label: "Indus Valley", body: "Harappa and Mohenjo-Daro flourish; pre-Vedic spiritual practices take root a thousand years before the Indo-Aryans arrive." },
  { era: "c. 1500–500 BCE", label: "Vedic period", body: "Composition of the Vedas. Proto-Tantric elements, Shakti, symbolism, ritual, are already embedded in the Rig Veda." },
  { era: "c. 5th–7th c. CE", label: "Tantra named", body: "Tantra emerges as a distinct, named tradition among followers of Śiva and Śakti." },
  { era: "c. 700s CE", label: "Monastic spread", body: "Tantras are studied in Hindu and Buddhist monasteries and spread across Asia into Nepal and Tibet." },
  { era: "c. 8th–11th c. CE", label: "Medieval flourishing", body: "Buddhism and Hinduism cross-pollinate; the Kubjikāmata Tantra emerges, source of the modern chakra system." },
];

export function TantraTimeline() {
  const [active, setActive] = useState(eras.length - 1);
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Timeline · tap an era</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {eras.map((e, i) => (
          <button
            key={e.era}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition",
              active === i ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50 hover:text-foreground",
            )}
          >
            {e.era}
          </button>
        ))}
      </div>
      <div className="relative mt-5">
        <div className="absolute left-0 right-0 top-2 h-px bg-border" />
        <div
          className="absolute left-0 top-2 h-px bg-gold transition-all"
          style={{ width: `${(active / (eras.length - 1)) * 100}%` }}
        />
      </div>
      <div className="mt-6">
        <p className="font-serif text-2xl text-primary">{eras[active].label}</p>
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{eras[active].era}</p>
        <p className="mt-2 text-sm text-foreground/85">{eras[active].body}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Cosmology Union (Śiva + Śakti) ═══════════════════════════ */

/* ═══════════════════════════ Path Compass ═══════════════════════════ */

const paths = [
  {
    key: "dakshina",
    label: "Dakshina Mārga",
    sub: "Right-Hand Path",
    body: "Spiritual purity, alignment with social and ritual norms, pure substances, strict moral standards, meditative focus on benevolent deities. The gradual, conservative road.",
  },
  {
    key: "vama",
    label: "Vāma Mārga",
    sub: "Left-Hand Path",
    body: "Radical defiance of convention, use of 'impure' substances, heterodox views, ecstasy and direct magick, transformative engagement with the feminine divine. The swifter, more transgressive road.",
  },
];

export function PathCompass() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Two roads, one liberation</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {paths.map((p, i) => (
          <button
            key={p.key}
            onClick={() => setActive(active === i ? null : i)}
            className={cn(
              "rounded-lg border p-4 text-left transition",
              active === i ? "border-gold bg-gold/10" : "border-border/60 hover:border-gold/50",
            )}
          >
            <p className="font-serif text-xl text-primary">{p.label}</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.sub}</p>
          </button>
        ))}
      </div>
      <p className="mt-4 min-h-[3rem] border-l-2 border-gold/60 pl-4 text-sm italic text-foreground/85">
        {active === null ? "Tap a path to read its orientation. Neither path is superior." : paths[active].body}
      </p>
    </div>
  );
}

/* ═══════════════════════════ Practice Arc Map ═══════════════════════════ */
/* This is a map, not a simulation. The three-part arc — Adhivāsa, Ascent, Descent — is
   the shape of the whole Kubjikāmata sequence; it is not something to click through in
   ninety seconds. Each phase below points to where in this course that phase is actually
   taught, chapter by chapter, at the pace a real technique needs. */

const arcSteps = [
  {
    t: "Adhivāsa",
    sub: "Preparation",
    d: "Purification, invocation of the deity, Nyāsa, the alignment of body and space with sacred energy. Nothing is rushed; everything is consecrated.",
    where: [
      { ch: "VII", label: "Nyāsa & the Five Koshas — placing mantra into the body" },
      { ch: "XI", label: "Mantra, Yantra & Mālā — consecrating the seat before practice" },
    ],
  },
  {
    t: "The Ascent",
    sub: "Awakening",
    d: "Kuṇḍalinī Śakti rises through the energy body, from root to crown, traversing each center of consciousness in succession. This is a real and potentially destabilising process built from years of the disciplines below — not something to be simulated on a screen.",
    where: [
      { ch: "VI", label: "Sacred Sound: Oṃ & the Mātṛkā — the seed-sound work each center is built from" },
      { ch: "VIII", label: "Chakra bīja toning — sounding each center in its own right" },
      { ch: "X", label: "Sound circuits — linking the centers through resonance" },
    ],
  },
  {
    t: "The Descent",
    sub: "Divinization",
    d: "Grace and bliss descend, sanctifying every cell and layer of the practitioner's being. Union of Śiva and Śakti dawns at the crown as the non-dual understanding that is Mokṣa.",
    where: [
      { ch: "VII", label: "The five Koshas — the layers grace is understood to move back through" },
      { ch: "IX", label: "Dākinī & goddess embodiment — the felt, devotional side of this return" },
    ],
  },
];

export function PracticeArcStepper() {
  const [step, setStep] = useState(0);
  const cur = arcSteps[step];
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Phase {step + 1} of {arcSteps.length}</p>
      <h4 className="mt-2 font-serif text-2xl text-primary">{cur.t}</h4>
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{cur.sub}</p>
      <p className="mt-2 text-sm text-foreground/85">{cur.d}</p>

      <div className="mt-4 rounded-lg border border-border/50 bg-background/40 p-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Where this is actually practiced in this course</p>
        <ul className="mt-2 space-y-1.5">
          {cur.where.map((w) => (
            <li key={w.ch} className="text-xs text-foreground/80">
              <span className="mr-1.5 rounded border border-gold/50 px-1 py-0.5 text-[10px] text-gold">Ch. {w.ch}</span>
              {w.label}
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-4 flex gap-1.5">
        {arcSteps.map((_, i) => (
          <li key={i} className={cn("h-1.5 flex-1 rounded-full transition-all", i <= step ? "bg-gold" : "bg-border")} />
        ))}
      </ol>

      <div className="mt-4 flex gap-2 text-xs">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-md border border-border/60 px-3 py-1.5 hover:border-gold/60 disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          onClick={() => setStep((s) => Math.min(arcSteps.length - 1, s + 1))}
          disabled={step === arcSteps.length - 1}
          className="rounded-md bg-gold px-3 py-1.5 text-gold-foreground hover:opacity-90 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
      {step === arcSteps.length - 1 && (
        <p className="mt-3 text-[11px] italic text-gold">
          This map shows the shape of the whole arc. Each phase is built slowly, in person, over the chapters above — not compressed into a single sitting.
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════ Om Visualizer ═══════════════════════════ */

const omPhases = [
  { label: "A", sub: "Creation · Brahmā", scale: 0.55 },
  { label: "U", sub: "Preservation · Viṣṇu", scale: 0.85 },
  { label: "M", sub: "Dissolution · Śiva", scale: 1.15 },
  { label: "…", sub: "Turiya · the silence beneath", scale: 0.4 },
];

export function OmVisualizer() {
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setPhase((p) => (p + 1) % omPhases.length), 2600);
    return () => clearInterval(t);
  }, [running]);

  const cur = omPhases[phase];

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">A · U · M · Silence</p>
      <div className="mt-4 flex flex-col items-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            className="absolute rounded-full bg-gradient-to-br from-gold/40 to-gold/5 border border-gold/50"
            style={{
              width: `${cur.scale * 140}px`,
              height: `${cur.scale * 140}px`,
              transition: "width 1.4s ease, height 1.4s ease",
            }}
          />
          <span className="relative font-serif text-4xl text-gold">{cur.label}</span>
        </div>
        <p className="mt-3 font-serif text-lg text-primary">{cur.sub}</p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-1.5 rounded-md bg-gold px-3 py-1.5 text-xs text-gold-foreground hover:opacity-90"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? "Pause" : "Begin cycle"}
        </button>
        <button
          onClick={() => { setRunning(false); setPhase((p) => (p + 1) % omPhases.length); }}
          className="rounded-md border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60"
        >
          Advance manually
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Mātṛkā Chant (flagship) ═══════════════════════════ */
/* Traditional A-to-Kṣa sequence, the fifty letters of the Sanskrit alphabet, each
   tagged with the chakra whose petal it sits on (Woodroffe / Serpent Power scheme).
   This is the actual practice named in the source manuscript: recite each letter
   slowly, pause, and notice where in the body or mind it seems to resonate. */

export const matrikaLetters = [
  // Vishuddha — the sixteen vowels
  { dev: "अ", iast: "A", chakra: "Viśuddha" }, { dev: "आ", iast: "Ā", chakra: "Viśuddha" },
  { dev: "इ", iast: "I", chakra: "Viśuddha" }, { dev: "ई", iast: "Ī", chakra: "Viśuddha" },
  { dev: "उ", iast: "U", chakra: "Viśuddha" }, { dev: "ऊ", iast: "Ū", chakra: "Viśuddha" },
  { dev: "ऋ", iast: "Ṛ", chakra: "Viśuddha" }, { dev: "ॠ", iast: "Ṝ", chakra: "Viśuddha" },
  { dev: "ऌ", iast: "Ḷ", chakra: "Viśuddha" }, { dev: "ॡ", iast: "Ḹ", chakra: "Viśuddha" },
  { dev: "ए", iast: "E", chakra: "Viśuddha" }, { dev: "ऐ", iast: "Ai", chakra: "Viśuddha" },
  { dev: "ओ", iast: "O", chakra: "Viśuddha" }, { dev: "औ", iast: "Au", chakra: "Viśuddha" },
  { dev: "अं", iast: "Aṃ", chakra: "Viśuddha" }, { dev: "अः", iast: "Aḥ", chakra: "Viśuddha" },
  // Anāhata — gutturals, palatals, cerebrals
  { dev: "क", iast: "Ka", chakra: "Anāhata" }, { dev: "ख", iast: "Kha", chakra: "Anāhata" },
  { dev: "ग", iast: "Ga", chakra: "Anāhata" }, { dev: "घ", iast: "Gha", chakra: "Anāhata" },
  { dev: "ङ", iast: "Ṅa", chakra: "Anāhata" },
  { dev: "च", iast: "Ca", chakra: "Anāhata" }, { dev: "छ", iast: "Cha", chakra: "Anāhata" },
  { dev: "ज", iast: "Ja", chakra: "Anāhata" }, { dev: "झ", iast: "Jha", chakra: "Anāhata" },
  { dev: "ञ", iast: "Ña", chakra: "Anāhata" },
  { dev: "ट", iast: "Ṭa", chakra: "Anāhata" }, { dev: "ठ", iast: "Ṭha", chakra: "Anāhata" },
  // Maṇipūra — cerebral/dental/labial
  { dev: "ड", iast: "Ḍa", chakra: "Maṇipūra" }, { dev: "ढ", iast: "Ḍha", chakra: "Maṇipūra" },
  { dev: "ण", iast: "Ṇa", chakra: "Maṇipūra" },
  { dev: "त", iast: "Ta", chakra: "Maṇipūra" }, { dev: "थ", iast: "Tha", chakra: "Maṇipūra" },
  { dev: "द", iast: "Da", chakra: "Maṇipūra" }, { dev: "ध", iast: "Dha", chakra: "Maṇipūra" },
  { dev: "न", iast: "Na", chakra: "Maṇipūra" },
  { dev: "प", iast: "Pa", chakra: "Maṇipūra" }, { dev: "फ", iast: "Pha", chakra: "Maṇipūra" },
  // Svādhiṣṭhāna — remaining labials and semivowels
  { dev: "ब", iast: "Ba", chakra: "Svādhiṣṭhāna" }, { dev: "भ", iast: "Bha", chakra: "Svādhiṣṭhāna" },
  { dev: "म", iast: "Ma", chakra: "Svādhiṣṭhāna" }, { dev: "य", iast: "Ya", chakra: "Svādhiṣṭhāna" },
  { dev: "र", iast: "Ra", chakra: "Svādhiṣṭhāna" }, { dev: "ल", iast: "La", chakra: "Svādhiṣṭhāna" },
  // Mūlādhāra — va and the sibilants
  { dev: "व", iast: "Va", chakra: "Mūlādhāra" }, { dev: "श", iast: "Śa", chakra: "Mūlādhāra" },
  { dev: "ष", iast: "Ṣa", chakra: "Mūlādhāra" }, { dev: "स", iast: "Sa", chakra: "Mūlādhāra" },
  // Ājñā — ha and the compound kṣa
  { dev: "ह", iast: "Ha", chakra: "Ājñā" }, { dev: "क्ष", iast: "Kṣa", chakra: "Ājñā" },
];

const chakraTone: Record<string, string> = {
  Mūlādhāra: "#b3423a", Svādhiṣṭhāna: "#c9793a", Maṇipūra: "#c9a84c",
  Anāhata: "#4f7a4a", Viśuddha: "#3a6e8c", Ājñā: "#5a4a8a",
};

export function MatrikaChant() {
  const [idx, setIdx] = useState(0);
  const [table, setTable] = useState(false);
  const letter = matrikaLetters[idx];
  const done = idx === matrikaLetters.length - 1;

  return (
    <div className="rounded-xl border border-gold/40 bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Mātṛkā Chant · A to Kṣa</p>
        <button
          onClick={() => setTable((t) => !t)}
          className="rounded-full border border-border/60 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:border-gold/60"
        >
          {table ? "Chant" : "Correspondence table"}
        </button>
      </div>

      {!table ? (
        <>
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xs text-muted-foreground">Letter {idx + 1} of {matrikaLetters.length}</p>
            <div
              className="mt-3 flex h-32 w-32 flex-col items-center justify-center rounded-full border-2"
              style={{ borderColor: chakraTone[letter.chakra], backgroundColor: `${chakraTone[letter.chakra]}22` }}
            >
              <span className="font-serif text-5xl text-foreground">{letter.dev}</span>
              <span className="mt-1 font-serif text-lg text-gold">{letter.iast}</span>
            </div>
            <p className="mt-3 text-sm" style={{ color: chakraTone[letter.chakra] }}>
              Sits on {letter.chakra}
            </p>
            <p className="mt-2 max-w-xs text-center text-xs text-muted-foreground">
              Sound it slowly, and pause. Notice where in the body or mind it seems to resonate before moving to the next.
            </p>
          </div>

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
            <div
              className="h-full bg-gradient-to-r from-gold/70 to-gold transition-all"
              style={{ width: `${((idx + 1) / matrikaLetters.length) * 100}%` }}
            />
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="rounded-md border border-border/60 px-3 py-1.5 text-xs hover:border-gold/60 disabled:opacity-40"
            >
              ← Previous
            </button>
            <button
              onClick={() => setIdx(0)}
              className="rounded-md border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60"
            >
              Restart
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(matrikaLetters.length - 1, i + 1))}
              disabled={done}
              className="rounded-md bg-gold px-3 py-1.5 text-xs text-gold-foreground hover:opacity-90 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
          {done && (
            <p className="mt-3 text-center text-[11px] italic text-gold">
              All fifty sounded. Over repeated sittings, students often report growing sensitivity to which sounds carry which states — this is the point, not speed.
            </p>
          )}
        </>
      ) : (
        <div className="mt-4 space-y-1.5 text-xs">
          {["Viśuddha", "Anāhata", "Maṇipūra", "Svādhiṣṭhāna", "Mūlādhāra", "Ājñā"].map((ch) => (
            <div key={ch} className="flex items-center gap-2 rounded-md border border-border/50 bg-background/40 p-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: chakraTone[ch] }} />
              <span className="w-24 shrink-0 font-serif text-primary">{ch}</span>
              <span className="text-muted-foreground">
                {matrikaLetters.filter((l) => l.chakra === ch).map((l) => l.iast).join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ Kara Nyāsa ═══════════════════════════ */
/* The classical six-point Ṣaḍaṅga formula used across virtually every Tantric puja
   paddhati to install mantra into the hands before deeper practice. This is the
   generic structure, not tied to any one deity's specific bīja — a specific
   sādhanā would prefix each point with that deity's own seed syllable. */

const karaPoints = [
  { key: "angustha", label: "Aṅguṣṭha", part: "Thumbs", ending: "Namaḥ", x: 50, y: 18 },
  { key: "tarjani", label: "Tarjanī", part: "Index fingers", ending: "Svāhā", x: 22, y: 30 },
  { key: "madhyama", label: "Madhyamā", part: "Middle fingers", ending: "Vaṣaṭ", x: 50, y: 60 },
  { key: "anamika", label: "Anāmikā", part: "Ring fingers", ending: "Hūṃ", x: 78, y: 30 },
  { key: "kanishtha", label: "Kaniṣṭhikā", part: "Little fingers", ending: "Vauṣaṭ", x: 15, y: 60 },
  { key: "karatala", label: "Karatala–Karapṛṣṭha", part: "Palm and back of hand", ending: "Phaṭ", x: 50, y: 88 },
];

export function KaraNyasa() {
  const [active, setActive] = useState(0);
  const p = karaPoints[active];
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Kara Nyāsa · the six-point formula</p>
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <svg viewBox="0 0 100 100" className="h-52 w-52 shrink-0">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
          {karaPoints.map((pt, i) => (
            <g key={pt.key} onClick={() => setActive(i)} className="cursor-pointer">
              <circle
                cx={pt.x} cy={pt.y} r={active === i ? 9 : 7}
                className={cn("transition-all stroke-gold/60", active === i ? "fill-gold" : "fill-card")}
                strokeWidth="1.5"
              />
              <text x={pt.x} y={pt.y + 3} textAnchor="middle" className={cn("font-serif text-[6px]", active === i ? "fill-gold-foreground" : "fill-primary")}>
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
        <div className="flex-1">
          <p className="font-serif text-2xl text-primary">{p.label}</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{p.part}</p>
          <p className="mt-3 rounded-md border border-border/60 bg-background/40 p-2 text-center font-serif text-lg text-foreground">
            Oṃ … {p.ending}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Place your own chosen mantra's seed syllable before the ending shown, and touch this point as you speak it.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {karaPoints.map((pt, i) => (
          <button
            key={pt.key}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] transition",
              active === i ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50",
            )}
          >
            {pt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════ Kosha Pyramid ═══════════════════════════ */

const koshas = [
  { key: "ananda", label: "Ānandamaya Kośa", sub: "Bliss body", width: 30, body: "The subtlest, most luminous sheath, accessed through devotion and ritual union." },
  { key: "vijnana", label: "Vijñānamaya Kośa", sub: "Wisdom & intuition", width: 46, body: "The layer of discernment and inner knowing, worked through contemplation." },
  { key: "mano", label: "Manomaya Kośa", sub: "Mental & emotional sheath", width: 62, body: "Thought and feeling, worked through mantra and visualisation." },
  { key: "prana", label: "Prāṇamaya Kośa", sub: "Vital energy & breath", width: 78, body: "The energetic layer, worked directly through prāṇāyāma and Nyāsa." },
  { key: "anna", label: "Annamaya Kośa", sub: "Physical body", width: 94, body: "The densest sheath, sustained by food, worked through posture and breath." },
];

export function KoshaPyramid() {
  const [active, setActive] = useState(4);
  const k = koshas[active];
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Tap a layer, dense to subtle</p>
      <div className="mt-4 flex flex-col items-center gap-1">
        {koshas.map((layer, i) => (
          <button
            key={layer.key}
            onClick={() => setActive(i)}
            style={{ width: `${layer.width}%` }}
            className={cn(
              "rounded-md border py-2.5 text-center text-xs transition",
              active === i ? "border-gold bg-gold/15 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/40",
            )}
          >
            {layer.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p className="font-serif text-xl text-primary">{k.label}</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{k.sub}</p>
        <p className="mt-2 text-sm text-foreground/85">{k.body}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Chakra Explorer (flagship) ═══════════════════════════ */

/* Three Mahā Vidyā seats that sit at subtle points beyond the standard seven chakras. */
const beyondSevenPoints = [
  {
    key: "dhumavati", mahavidya: "Dhūmāvatī", point: "Manas · the hidden void",
    color: "#6b6558",
    body: "Rather than a location on the spine, Dhūmāvatī's seat is the quiet void within the mind itself, mirrored in the stillness held at the heart center. She governs dissolution, emptiness, and what remains when everything else has been given up.",
  },
  {
    key: "bagalamukhi", mahavidya: "Bagalāmukhī", point: "Bindu · the upper palate",
    color: "#8a3a3a",
    body: "Seated at the Bindu, near the upper palate, Bagalāmukhī commands stillness itself: the paralysis of duality, the arrest of scattered speech and thought, and the infinite potential held in total quiet.",
  },
  {
    key: "kamalatmika", mahavidya: "Kamalātmikā", point: "Lalanā / Tālu, near the upper palate",
    color: "#c9a84c",
    body: "Kamalātmikā's seat at the Lalanā (Tālu) chakra, just above the palate, is traditionally where nectar (amṛta) is said to gather and drip, the point of both bliss and material-spiritual fulfilment.",
  },
];

export const chakraData = [
  {
    key: "sahasrara", n: "VII", name: "Sahasrāra", label: "Crown", location: "Crown of the head",
    color: "#8f78c9", bija: "Kṣaṃ + all 50 letters", dakini: null, dakiniMantra: null,
    quality: "Ultimate integration and realization",
    petals: "All 50 letters of the Sanskrit alphabet",
    mahavidya: null,
    note: "The site of union between Śiva and Śakti, the dawning of non-dual awareness and Moksha. No single Ḍākinī presides; all sound converges here.",
  },
  {
    key: "ajna", n: "VI", name: "Ājñā", label: "Third Eye", location: "Between the eyebrows",
    color: "#5a4a8a", bija: "Oṃ (traditional)", dakini: "Hākinī", dakiniMantra: null,
    quality: "Intuition and wisdom",
    petals: "Haṃ, Kṣaṃ",
    mahavidya: "Chinnamastā — the upward surge of intense spiritual awakening, and the severing of thought constructs.",
    note: "The seat of inner vision, direct knowing, and the dissolving of the duality between perceiver and perceived.",
  },
  {
    key: "vishuddha", n: "V", name: "Viśuddha", label: "Throat", location: "The throat",
    color: "#3a6e8c", bija: "Haṃ (traditional)", dakini: "Śākinī", dakiniMantra: "Oṃ Hrīṃ Klīṃ Śākiṇyai Viche",
    quality: "Pure, unmanifest speech and creativity",
    petals: "The sixteen vowels, A through Aḥ",
    mahavidya: "Mātaṅgī — the mastery of word, art, and transcendent wisdom.",
    note: "The center of truth, purification, and communication.",
  },
  {
    key: "anahata", n: "IV", name: "Anāhata", label: "Heart", location: "Heart center",
    color: "#4f7a4a", bija: "Yaṃ (traditional)", dakini: "Kākinī", dakiniMantra: "Oṃ Hrīṃ Klīṃ Kākiṇyai Viche",
    quality: "Love and compassion",
    petals: "Kaṃ, Khaṃ, Gaṃ, Ghaṃ, Ṅaṃ, Caṃ, Chaṃ, Jaṃ, Jhaṃ, Ñaṃ, Ṭaṃ, Ṭhaṃ",
    mahavidya: "Bhuvaneśvarī — the expansive space (ākāśa), the divine matrix within which the soul resides.",
    note: "A fully awakened heart radiates a presence others feel palpably.",
  },
  {
    key: "manipura", n: "III", name: "Maṇipūra", label: "Solar Plexus", location: "Navel region",
    color: "#c9a84c", bija: "Raṃ (traditional)", dakini: "Lākinī", dakiniMantra: "Oṃ Hrīṃ Klīṃ Lākiṇyai Viche",
    quality: "Transformation and personal power",
    petals: "Ḍaṃ, Ḍhaṃ, Ṇaṃ, Taṃ, Thaṃ, Daṃ, Dhaṃ, Naṃ, Paṃ, Phaṃ",
    mahavidya: "Tripura-Sundarī — inner radiance, and the supreme binding of the cosmos.",
    note: "Meditation here is traditionally linked to natural immunity, longevity, and supersensory perception.",
  },
  {
    key: "svadhisthana", n: "II", name: "Svādhiṣṭhāna", label: "Sacral", location: "Opposite the pubic bone",
    color: "#c9793a", bija: "Vaṃ", dakini: "Rākiṇī", dakiniMantra: "Oṃ Śrīṃ Klīṃ Rākiṇyai Viche",
    quality: "Flow of emotion and creativity",
    petals: "Baṃ, Bhaṃ, Maṃ, Yaṃ, Raṃ, Laṃ",
    mahavidya: "Tārā — the flow of inner sound, vital currents, the fluid movement of creative consciousness.",
    note: "Seat of the life force in its generative, expressive dimension.",
  },
  {
    key: "muladhara", n: "I", name: "Mūlādhāra", label: "Root", location: "Base of the spine / perineum",
    color: "#b3423a", bija: "Laṃ", dakini: "Ḍākinī", dakiniMantra: "Oṃ Hrīṃ Klīṃ Ḍākinyai Viche",
    quality: "Foundational earth energy",
    petals: "Vaṃ, Śaṃ, Ṣaṃ, Saṃ",
    mahavidya: "Kālī — primal grounding, time, and the foundation of raw life force and Kuṇḍalinī.",
    note: "Traditionally linked to natural health, stability, and a strengthened intellect.",
  },
];

export function ChakraExplorer() {
  const [active, setActive] = useState(chakraData.length - 1); // start at root
  const [rising, setRising] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!rising) return;
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a === 0) {
          setRising(false);
          return 0;
        }
        return a - 1;
      });
    }, 1400);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [rising]);

  const c = chakraData[active];
  const atCrown = active === 0;

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Seven Chakras</p>
        <button
          onClick={() => { setActive(chakraData.length - 1); setRising(true); }}
          className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-widest text-gold hover:bg-gold/10"
        >
          <Sparkles className="h-3 w-3" /> {rising ? "Rising…" : "Raise Kuṇḍalinī"}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row">
        {/* Vertical column */}
        <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col">
          {chakraData.map((ch, i) => (
            <button
              key={ch.key}
              onClick={() => { setRising(false); setActive(i); }}
              className="group flex items-center gap-2"
              aria-label={ch.name}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-[10px] font-serif transition-all",
                  active === i ? "scale-110 border-white/80 shadow-[0_0_16px_rgba(255,255,255,0.25)]" : "border-transparent opacity-60 group-hover:opacity-100",
                )}
                style={{ backgroundColor: ch.color }}
              >
                {ch.n}
              </span>
            </button>
          ))}
        </div>

        {/* Connecting line on larger screens is implied by column gap; detail panel: */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
            <div>
              <p className="font-serif text-2xl text-primary">{c.name}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{c.label} · {c.location}</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border/60 bg-background/40 p-2">
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Bīja mantra</p>
              <p className="mt-0.5 font-serif text-sm text-foreground">{c.bija}</p>
            </div>
            <div className="rounded-md border border-border/60 bg-background/40 p-2">
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Ḍākinī</p>
              <p className="mt-0.5 font-serif text-sm text-foreground">{c.dakini ?? ", "}</p>
            </div>
          </div>

          {c.dakiniMantra && (
            <p className="mt-2 text-[11px] italic text-muted-foreground">{c.dakiniMantra}</p>
          )}

          <div className="mt-2 rounded-md border border-border/60 bg-background/40 p-2">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Petal letters</p>
            <p className="mt-0.5 font-serif text-sm text-foreground">{c.petals}</p>
          </div>

          {c.mahavidya && (
            <div className="mt-2 rounded-md border border-gold/40 bg-gold/5 p-2">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold">Mahā Vidyā</p>
              <p className="mt-0.5 text-xs text-foreground/90">{c.mahavidya}</p>
            </div>
          )}

          <p className="mt-3 text-sm text-foreground/85">
            <span className="text-gold">{c.quality}.</span> {c.note}
          </p>

          {atCrown && !rising && active === 0 && (
            <p className="mt-3 border-l-2 border-gold pl-3 text-xs italic text-gold">
              Union of Śiva and Śakti, the non-dual nature of reality, and the dawning of Moksha.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-border/50 pt-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Beyond the Seven</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Three further Mahā Vidyā seats sit at subtle points outside the main seven-chakra column.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {beyondSevenPoints.map((p) => (
            <div key={p.key} className="rounded-lg border p-3" style={{ borderColor: `${p.color}55` }}>
              <p className="font-serif text-base text-primary">{p.mahavidya}</p>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: p.color }}>{p.point}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Dakini / Mahā Vidyā Gallery ═══════════════════════════ */

const dakiniGallery = [
  { key: "dakini", name: "Ḍākinī", tag: "Mūlādhāra", body: "Guardian of the root, presence, embodied instinct, and the ground of transformation." },
  { key: "rakini", name: "Rākiṇī", tag: "Svādhiṣṭhāna", body: "Guardian of the sacral center, creative and emotional flow." },
  { key: "lakini", name: "Lākinī", tag: "Maṇipūra", body: "Guardian of the solar plexus, personal power and transformation." },
  { key: "kakini", name: "Kākinī", tag: "Anāhata", body: "Guardian of the heart, love, compassion, and inner beauty." },
  { key: "shakini", name: "Śākinī", tag: "Viśuddha", body: "Guardian of the throat, truth, purification, and communication." },
  { key: "hakini", name: "Hākinī", tag: "Ājñā", body: "Guardian of the third eye, intuition and the dissolving of duality." },
  { key: "kali", name: "Kālī", tag: "Mahā Vidyā", body: "Goddess of time, transformation, and liberation, she destroys the ego and cuts through illusion." },
  { key: "tara", name: "Tārā", tag: "Mahā Vidyā", body: "'She who saves', associated with the North Star, guiding practitioners across the ocean of suffering." },
  { key: "durga", name: "Durgā", tag: "Devī", body: "The unconquerable goddess, riding a lion, protection, courage, destruction of inner and outer demons. Not one of the ten Mahā Vidyās, but a central Devī in her own right." },
  { key: "tripura", name: "Tripura-Sundarī", tag: "Mahā Vidyā", body: "Beauty of the three worlds, presides over the Śrī Yantra and the Śrī Vidyā tradition." },
];

export function DakiniGallery() {
  const [active, setActive] = useState(6); // Kālī by default
  const d = dakiniGallery[active];
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Tap to meet each guardian</p>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {dakiniGallery.map((g, i) => (
          <button
            key={g.key}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg border p-2 text-center transition",
              active === i ? "border-gold bg-gold/15" : "border-border/60 hover:border-gold/40",
            )}
          >
            <p className="font-serif text-[11px] leading-tight text-foreground">{g.name}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 border-l-2 border-gold/60 pl-4">
        <p className="font-serif text-xl text-primary">{d.name}</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{d.tag}</p>
        <p className="mt-1 text-sm italic text-foreground/85">{d.body}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Sound Circuits ═══════════════════════════ */

const garlandPoints = [
  { k: "Aiṃ", sub: "Tip of tongue", angle: -90 },
  { k: "Hrīṃ", sub: "Inhale to heart", angle: 0 },
  { k: "Klīṃ", sub: "Belly power", angle: 90 },
  { k: "Klīṃ / Śrīṃ", sub: "Exhale to heart & tongue", angle: 180 },
];

const directions = [
  { k: "E", label: "Sarasvatī", gift: "Wisdom, knowledge, creativity", color: "#e8e4d8", angle: 0 },
  { k: "S", label: "Yamunā", gift: "Emotional balance and grace", color: "#3a6e8c", angle: 90 },
  { k: "W", label: "Vāruṇī", gift: "Abundance, joy, fulfilment", color: "#6a4a8a", angle: 180 },
  { k: "N", label: "Kubjikā", gift: "Hidden potential, transformation", color: "#c9a84c", angle: 270 },
];

export function SoundCircuits() {
  const [mode, setMode] = useState<"garland" | "directions">("garland");
  const [active, setActive] = useState(0);
  const data = mode === "garland" ? garlandPoints : directions;
  const cx = 130, cy = 130, r = 90;

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("garland"); setActive(0); }}
          className={cn("rounded-full border px-3 py-1 text-xs", mode === "garland" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground")}
        >
          Garland of Letters
        </button>
        <button
          onClick={() => { setMode("directions"); setActive(0); }}
          className={cn("rounded-full border px-3 py-1 text-xs", mode === "directions" ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground")}
        >
          Directional Śaktis
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <svg viewBox="0 0 260 260" className="h-56 w-56 shrink-0">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" className="text-gold/30" strokeWidth="1" />
          {data.map((d, i) => {
            const rad = (d.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * r;
            const y = cy + Math.sin(rad) * r;
            const isDir = mode === "directions";
            const label = isDir ? (d as typeof directions[number]).k : (d as typeof garlandPoints[number]).k;
            return (
              <g key={label + i} onClick={() => setActive(i)} className="cursor-pointer">
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" className="text-border" strokeWidth="0.5" opacity={active === i ? 0.6 : 0.2} />
                <circle
                  cx={x} cy={y} r={active === i ? 26 : 20}
                  className={cn("transition-all stroke-gold/60")}
                  fill={isDir ? (d as typeof directions[number]).color : (active === i ? "var(--gold)" : "transparent")}
                  strokeWidth="1.5"
                />
                <text x={x} y={y + 4} textAnchor="middle" className={cn("font-serif text-[10px]", isDir ? "fill-black/70" : active === i ? "fill-gold-foreground" : "fill-primary")}>
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex-1">
          {mode === "garland" ? (
            <>
              <p className="font-serif text-2xl text-primary">{garlandPoints[active].k}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{garlandPoints[active].sub}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                Cycle through all four points on the breath: Sarasvatī initiates through sound, Lakṣmī sustains through love, Kālī completes through dissolution.
              </p>
            </>
          ) : (
            <>
              <p className="font-serif text-2xl text-primary">{directions[active].label}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{directions[active].k === "E" ? "East" : directions[active].k === "S" ? "South" : directions[active].k === "W" ? "West" : "North"}</p>
              <p className="mt-2 text-sm text-foreground/85">{directions[active].gift}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Digital Mālā (flagship) ═══════════════════════════ */

const mantraOptions = [
  { key: "shiva", label: "Śiva", mantra: "Oṃ Namaḥ Śivāya" },
  { key: "ganesha", label: "Gaṇeśa", mantra: "Oṃ Guṃ Gaṇapataye Namaḥ" },
  { key: "kali", label: "Kālī", mantra: "Oṃ Hrīṃ Kālikāyai Namaḥ" },
  { key: "sarasvati", label: "Sarasvatī", mantra: "Oṃ Aiṃ Sarasvataye Namaḥ" },
  { key: "durga", label: "Durgā", mantra: "Oṃ Dhūṃ Durgāyai Namaḥ" },
  { key: "krishna", label: "Kṛṣṇā", mantra: "Oṃ Klīṃ Kṛṣṇāyai Namaḥ" },
  { key: "hanuman", label: "Hanumān", mantra: "Oṃ Krāṃ Hanumataye Namaḥ" },
  { key: "surya", label: "Sun · Sūrya", mantra: "Oṃ Sūryāya Namaḥ" },
  { key: "chandra", label: "Moon · Candra", mantra: "Oṃ Candramase Namaḥ" },
  { key: "mangala", label: "Mars · Maṅgala", mantra: "Oṃ Maṅgalāya Namaḥ" },
  { key: "budha", label: "Mercury · Budha", mantra: "Oṃ Budhāya Namaḥ" },
  { key: "guru", label: "Jupiter · Guru", mantra: "Oṃ Gurave Namaḥ" },
  { key: "shukra", label: "Venus · Śukra", mantra: "Oṃ Śukrāya Namaḥ" },
  { key: "shani", label: "Saturn · Śani", mantra: "Oṃ Śanaiścaryāya Namaḥ" },
  { key: "custom", label: "Custom", mantra: "" },
];

const ROUND = 108;
const LS_KEY = (mantraKey: string) => `tantraya.mala.${mantraKey}.lifetime`;

function readLifetime(mantraKey: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(LS_KEY(mantraKey));
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function DigitalMala() {
  const [mantraKey, setMantraKey] = useState("shiva");
  const [customText, setCustomText] = useState("");
  const [session, setSession] = useState(0);
  const [lifetime, setLifetime] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const option = mantraOptions.find((m) => m.key === mantraKey)!;
  const displayMantra = mantraKey === "custom" ? (customText || "Your mantra") : option.mantra;

  useEffect(() => {
    setLifetime(readLifetime(mantraKey));
    setSession(0);
  }, [mantraKey]);

  const tap = () => {
    const nextSession = session + 1;
    const nextLifetime = lifetime + 1;
    setSession(nextSession);
    setLifetime(nextLifetime);
    window.localStorage.setItem(LS_KEY(mantraKey), String(nextLifetime));
    setPulse(true);
    setTimeout(() => setPulse(false), 150);
    if (nextSession % ROUND === 0) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 2500);
    }
  };

  const inRound = session % ROUND;
  const rounds = Math.floor(session / ROUND);
  const cx = 110, cy = 110, r = 92;

  return (
    <div className="rounded-xl border border-gold/40 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Digital Mālā</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mantraOptions.map((m) => (
          <button
            key={m.key}
            onClick={() => setMantraKey(m.key)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] transition",
              mantraKey === m.key ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mantraKey === "custom" && (
        <input
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Type your mantra…"
          className="mt-3 w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm focus:border-gold/60 focus:outline-none"
        />
      )}

      <p className="mt-3 text-center font-serif text-lg text-primary">{displayMantra}</p>

      <div className="mt-4 flex flex-col items-center">
        <button onClick={tap} className="relative flex h-56 w-56 items-center justify-center" aria-label="Count mantra">
          <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full -rotate-90">
            {Array.from({ length: ROUND }).map((_, i) => {
              const angle = (i / ROUND) * 2 * Math.PI;
              const x = cx + Math.cos(angle) * r;
              const y = cy + Math.sin(angle) * r;
              const lit = i < inRound || (inRound === 0 && session > 0);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === 0 ? 4.5 : 2.6}
                  className={cn("transition-colors", lit ? "fill-gold" : "fill-border")}
                />
              );
            })}
          </svg>
          <div
            className={cn(
              "flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-gold/60 bg-gradient-to-br from-gold/20 to-transparent transition-transform active:scale-95",
              pulse && "scale-105",
            )}
            style={{ transition: "transform 0.15s" }}
          >
            <span className="font-serif text-3xl text-gold">ॐ</span>
            <span className="mt-1 text-xs text-muted-foreground">tap to count</span>
          </div>
        </button>

        {justCompleted && (
          <p className="mt-2 text-xs italic text-gold">Round complete, 108 repetitions.</p>
        )}

        <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md border border-border/60 bg-background/40 p-2">
            <p className="font-serif text-lg text-primary">{inRound}</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">In round</p>
          </div>
          <div className="rounded-md border border-border/60 bg-background/40 p-2">
            <p className="font-serif text-lg text-primary">{rounds}</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Rounds today</p>
          </div>
          <div className="rounded-md border border-border/60 bg-background/40 p-2">
            <p className="font-serif text-lg text-primary">{lifetime}</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Lifetime</p>
          </div>
        </div>

        <button
          onClick={() => setSession(0)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset today's count
        </button>
      </div>
    </div>
  );
}
