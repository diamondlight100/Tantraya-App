import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Volume2, Info } from "lucide-react";

/* ───────────────────────── Eight-Fold Soul Explorer ───────────────────────── */

const soulLayers = [
  { key: "kat", label: "KAT", sub: "Physical Body", body: "The physical vehicle, cared for even after death through mummification, because every other soul-component needs it as an anchor for continued existence.", color: "from-stone-500/30 to-stone-500/5", ring: "ring-stone-400/60" },
  { key: "ka", label: "KA", sub: "The Vital Double", body: "The life-force double of the person, their energetic twin, fed by offerings. In magical work, the KA is the vehicle for projecting and receiving subtle energy.", color: "from-amber-500/30 to-amber-500/5", ring: "ring-amber-500/60" },
  { key: "ba", label: "BA", sub: "The Personality Soul", body: "The aspect of the person that can travel, depicted as a human-headed bird, the soul's capacity for movement, individuality, and transformation.", color: "from-sky-500/30 to-sky-500/5", ring: "ring-sky-500/60" },
  { key: "ab", label: "AB", sub: "The Heart", body: "The seat of moral consciousness, weighed against Ma'at's feather in the Hall of Two Truths. In life, the organ of magical intention and ethical clarity.", color: "from-rose-500/30 to-rose-500/5", ring: "ring-rose-500/60" },
  { key: "sekhem", label: "SEKHEM", sub: "Life Force", body: "The ethereal vital energy, equivalent to what other traditions call prana or chi. It animates the body and empowers all magical work.", color: "from-emerald-500/30 to-emerald-500/5", ring: "ring-emerald-500/60" },
  { key: "akhu", label: "AKHU", sub: "The Luminous Spirit", body: "The \"Effective One,\" created through the successful integration of BA and KA, the immortal, shining aspect of the person that can move freely between worlds.", color: "from-violet-500/30 to-violet-500/5", ring: "ring-violet-500/60" },
];

export function EightFoldSoulExplorer() {
  const [active, setActive] = useState(0);
  const s = soulLayers[active];
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Eight-Fold Soul</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Tap each layer to read its nature. Six of the eight components are shown here.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {soulLayers.map((layer, i) => (
          <button
            key={layer.key}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg border p-2.5 text-center transition",
              i === active
                ? cn("bg-gradient-to-b ring-2", layer.color, layer.ring, "border-transparent")
                : "border-border/50 bg-secondary/30 hover:border-gold/40",
            )}
          >
            <span className="block font-serif text-sm text-primary">{layer.label}</span>
          </button>
        ))}
      </div>

      <div className={cn("mt-4 rounded-lg bg-gradient-to-b p-4", s.color)}>
        <p className="font-serif text-lg text-primary">{s.label}</p>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.sub}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.body}</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Neteru Wheel ───────────────────────── */

const neteruWheel = [
  { key: "ra", label: "Ra", sub: "Sun · Creation", body: "The sun god traversing the sky by day and the Duat by night in his solar barque, the source from which the Ennead ultimately descends.", color: "#c9a84c" },
  { key: "isis", label: "Isis", sub: "Magic · The Throne", body: "The Mistress of Magic, who obtained her power by learning Re's secret name. Healer, protector, and the supreme magical authority in the tradition.", color: "#7c5cbf" },
  { key: "osiris", label: "Osiris", sub: "Resurrection · Judgment", body: "Lord of the Underworld and the resurrection, presiding over the Hall of Two Truths after his own death and restoration by Isis.", color: "#3f6b4a" },
  { key: "set", label: "Set", sub: "Chaos · Storm", body: "God of storms, deserts, and chaos, Osiris's murderer, whose disruptive force is understood as necessary tension rather than pure evil.", color: "#b9482f" },
  { key: "horus", label: "Horus", sub: "Kingship · The Sky", body: "The falcon-headed son of Isis and Osiris, whose eye, torn out by Set and restored by Thoth, becomes the Utchat, symbol of healing and protection.", color: "#3a6ea5" },
  { key: "thoth", label: "Thoth", sub: "Wisdom · Writing", body: "Ibis-headed god of magic, writing, and the moon, the divine recorder in the Hall of Two Truths, and the source claimed by the Hermetic tradition.", color: "#5c8a8a" },
  { key: "sekhmet", label: "Sekhmet", sub: "Fire · Fierce Healing", body: "The lioness-headed \"Powerful Female\", simultaneously the most dangerous and most healing of the goddesses, daughter of Ra.", color: "#a53a3a" },
  { key: "anubis", label: "Anubis", sub: "Threshold · Embalming", body: "Jackal-headed guardian of the dead, Master of Secrets, who guides each soul through the Duat and seals sacred space in ritual.", color: "#2a2a2a" },
];

export function NeteruWheel() {
  const [active, setActive] = useState<string>("isis");
  const current = neteruWheel.find((n) => n.key === active)!;

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Neteru Wheel</p>
      <p className="mt-1 text-sm text-muted-foreground">Tap a Neter to read their nature.</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-[auto,1fr] sm:items-center">
        <svg viewBox="0 0 220 220" className="mx-auto h-60 w-60">
          {neteruWheel.map((n, i) => {
            const angle = (Math.PI * 2 * i) / neteruWheel.length - Math.PI / 2;
            const cx = 110 + 78 * Math.cos(angle);
            const cy = 110 + 78 * Math.sin(angle);
            const isActive = n.key === active;
            return (
              <g key={n.key} onClick={() => setActive(n.key)} className="cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 27 : 22}
                  fill={n.color}
                  stroke={isActive ? "var(--gold)" : "transparent"}
                  strokeWidth="2.5"
                  opacity={isActive ? 1 : 0.75}
                />
                <text
                  x={cx}
                  y={cy + 3.5}
                  textAnchor="middle"
                  className="fill-white text-[8.5px] font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
          <circle cx="110" cy="110" r="30" fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" />
        </svg>

        <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
          <p className="font-serif text-xl text-primary">{current.label}</p>
          <p className="text-[11px] uppercase tracking-widest text-gold">{current.sub}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{current.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Duat Gates Journey ───────────────────────── */

const duatGates = [
  { n: 1, title: "Gate of Khepri", body: "The scarab god of the rising sun and transformation, the threshold of becoming. Nothing that follows is possible without first passing this gate honestly." },
  { n: 2, title: "Gates of Anubis", body: "Multiple gates under Anubis's guidance, testing purity of heart and deed. This is where intention is checked against action." },
  { n: 3, title: "Gates of Thoth", body: "The gates of the ibis-headed scribe, where knowledge, truth, and magical skill are assessed, not to punish, but to confirm readiness." },
  { n: 4, title: "The Hall of Two Truths", body: "The final judgment: the heart is weighed against Ma'at's feather before Osiris and the Council of 42 Assessors. What passes emerges into the Field of Reeds." },
];

export function DuatGatesJourney() {
  const [step, setStep] = useState(0);
  const gate = duatGates[step];

  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Duat: A Guided Passage</p>
      <p className="mt-1 text-sm text-muted-foreground">Step through the four stages of the underworld journey.</p>

      <div className="mt-4 flex items-center justify-center gap-2">
        {duatGates.map((g, i) => (
          <button
            key={g.n}
            onClick={() => setStep(i)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border text-sm transition",
              i === step
                ? "border-gold bg-gold text-gold-foreground"
                : i < step
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-border text-muted-foreground",
            )}
          >
            {g.n}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-gold/30 bg-gold/5 p-4 text-center">
        <p className="font-serif text-xl text-primary">{gate.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{gate.body}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-muted-foreground hover:text-gold disabled:opacity-30"
        >
          ← Previous gate
        </button>
        <button
          onClick={() => setStep((s) => Math.min(duatGates.length - 1, s + 1))}
          disabled={step === duatGates.length - 1}
          className="text-muted-foreground hover:text-gold disabled:opacity-30"
        >
          Next gate →
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── The Gathering of Heka ───────────────────────── */

const hekaLines = [
  "Nuk tem-kephera kheer t'esefer her hart mut-f",
  "Ertau unsu en Ami nu, behennu en amiu t'at'at",
  "Ask tent na heka pen enter, Kherson se entef kherson-f,",
  "betenu er thesam, khak er sit",
  "A anen makhent ent Ra!",
  "Rut aqi-k em mehit em khent-ek Se-messert em neter-khert",
];

const hekaRendering =
  "I am the uncreated god. Before me the dwellers in chaos are dogs, their chiefs merely wolves. I gather the power from every place, from every person, faster than night itself.";

const hekaTheurgy =
  "The bold claim \u2018I am the uncreated god\u2019 is technique, not hubris. The magician identifies fully with the divine power invoked.";

type HekaAudioMaterial = { id: string; title: string; media_path: string | null };

/**
 * A stand-alone bilingual ritual card for the Chapter I practice tab.
 * Egyptian transliteration + English rendering + a short theurgic note,
 * plus an audio slot: if a teacher has uploaded a "Heka" pronunciation
 * recording to this course's materials (format: audio), it plays here;
 * otherwise a quiet placeholder points at where to add one.
 */
export function GatheringOfHeka() {
  const [audio, setAudio] = useState<HekaAudioMaterial | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("id, title, media_path")
        .eq("course_slug", "egyptian-magick")
        .eq("format", "audio")
        .ilike("title", "%heka%")
        .limit(1)
        .maybeSingle();
      if (cancelled) return;
      if (!error && data?.media_path) {
        setAudio(data as HekaAudioMaterial);
        const { data: signed } = await supabase.storage
          .from("materials")
          .createSignedUrl(data.media_path, 60 * 60 * 6);
        if (!cancelled) setAudioUrl(signed?.signedUrl ?? null);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-xl border border-gold/30 bg-gradient-to-b from-gold/5 to-transparent p-5 sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Ritual Practice</p>
      <h3 className="mt-1 font-serif text-2xl text-primary">The Gathering of Heka</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        An ancient Egyptian magical formula, spoken aloud as ritual preparation, building and
        concentrating divine force before directing it toward the working.
      </p>

      <div className="mt-5 rounded-lg border border-gold/20 bg-card/60 p-4">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">Egyptian (transliteration)</p>
        <div className="space-y-1 font-serif italic leading-relaxed text-foreground/90">
          {hekaLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border/50 bg-secondary/20 p-4">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          The English Rendering
        </p>
        <p className="leading-relaxed text-foreground/85">{hekaRendering}</p>
      </div>

      <div className="mt-4 flex gap-2.5 rounded-lg border border-gold/20 bg-gold/5 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-gold">
            Theurgic Identification
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">{hekaTheurgy}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-border/60 bg-secondary/10 p-4">
        <Volume2 className="h-4 w-4 shrink-0 text-gold" />
        {loading ? (
          <p className="text-xs text-muted-foreground">Checking for a spoken recording\u2026</p>
        ) : audioUrl ? (
          <div className="w-full">
            <p className="mb-1.5 text-xs text-muted-foreground">{audio?.title ?? "Spoken pronunciation"}</p>
            <audio src={audioUrl} controls className="w-full" />
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            No spoken pronunciation added yet. A teacher can add one under Course Materials,
            uploading an audio recording titled with \u201cHeka\u201d, and it will appear here automatically.
          </p>
        )}
      </div>
    </div>
  );
}
