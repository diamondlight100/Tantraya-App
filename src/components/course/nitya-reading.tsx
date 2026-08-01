import { useMemo, useState } from "react";
import { Moon, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { CITIES, DEFAULT_CITY_ID } from "@/data/magick/cities";
import { getTithi, resolveBirthMoment } from "@/lib/tithi";
import { nityaByPosition, TRIPURA_SUNDARI_NITYA } from "@/data/tantric/nityas";

/**
 * "Your Nitya" — a birth tithi reading built on Shri Vidya's sixteen Nityas. Small in
 * scope by design: one calculation, sixteen fixed outcomes, no ongoing chart, no other
 * planets. See the build spec for the full rationale. Lives as a hidden easter-egg extra,
 * unlocked once "The Way of the Goddess" is fully complete, a private gift at the end of
 * the course rather than an advertised feature.
 */

function formatBirthDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0));
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(dt);
}

export function NityaReading() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cityId, setCityId] = useState(DEFAULT_CITY_ID);
  const [submitted, setSubmitted] = useState(false);

  const city = useMemo(() => CITIES.find((c) => c.id === cityId) ?? CITIES[0], [cityId]);

  const grouped = useMemo(() => {
    const byCountry = new Map<string, typeof CITIES>();
    for (const c of CITIES) {
      const list = byCountry.get(c.country) ?? [];
      list.push(c);
      byCountry.set(c.country, list);
    }
    return byCountry;
  }, []);

  const result = useMemo(() => {
    if (!submitted || !date) return null;
    const moment = resolveBirthMoment(date, time || null, city.timeZone);
    return getTithi(moment);
  }, [submitted, date, time, city]);

  const reset = () => {
    setSubmitted(false);
    setDate("");
    setTime("");
  };

  if (result) {
    const isTripura = result.isPurnima || result.isAmavasya;
    const nitya = !isTripura ? nityaByPosition(result.positionInPaksha) : null;

    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Moon className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your Nitya</p>
            <h2 className="font-serif text-2xl text-primary">A Birth Tithi Reading</h2>
          </div>
        </div>

        {/* Opening: personalized framing, generated from input, not written per-Nitya */}
        <div className="rounded-xl border border-border/60 bg-card/40 p-5 text-sm text-foreground/85">
          <p>
            Every lunar month divides into thirty tithis, lunar days, fifteen waxing (Shukla Paksha) and
            fifteen waning (Krishna Paksha). In Shri Vidya tantra, each of the fifteen positions in that
            cycle is ruled by a Nitya, an "Eternal One," a partial form of Lalita Tripura Sundari herself,
            the source the other fifteen emanate from. Full moon and new moon both belong to her directly.
            Each Nitya rules her tithi twice a month, once waxing (her Prakashamsha, or outward, aspect) and
            once waning (her Vimarshamsha, or inward, aspect).
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/40 pt-4 text-xs sm:grid-cols-4">
            <div>
              <p className="uppercase tracking-[0.2em] text-muted-foreground">Born</p>
              <p className="mt-1 text-foreground">{formatBirthDate(date)}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] text-muted-foreground">Tithi</p>
              <p className="mt-1 text-foreground">{result.tithiNumber} / 30</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] text-muted-foreground">Paksha</p>
              <p className="mt-1 text-foreground">{result.paksha}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] text-muted-foreground">Aspect</p>
              <p className="mt-1 text-foreground">{result.aspect ?? "—"}</p>
            </div>
          </div>
          {!time && (
            <p className="mt-3 text-[11px] italic text-muted-foreground">
              No birth time was given, so this uses local noon on your birth date as a reasonable estimate.
              Tithi can change partway through a day, an exact birth time would sharpen this.
            </p>
          )}
        </div>

        {/* The Nitya profile itself */}
        {isTripura ? (
          <div className="mt-6 rounded-xl border border-gold/40 bg-gold/5 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{TRIPURA_SUNDARI_NITYA.tithiLabel}</p>
            <h3 className="mt-2 font-serif text-3xl text-primary">{TRIPURA_SUNDARI_NITYA.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{TRIPURA_SUNDARI_NITYA.meaning}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{TRIPURA_SUNDARI_NITYA.nature}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              <span className="text-primary">
                {result.isPurnima ? "For those born on Purnima: " : "For those born on Amavasya: "}
              </span>
              {result.isPurnima ? TRIPURA_SUNDARI_NITYA.radiantAspect : TRIPURA_SUNDARI_NITYA.hiddenAspect}
            </p>
            <blockquote className="mt-5 border-l-2 border-gold/60 pl-4 text-sm italic text-foreground/80">
              Aim Hrim Shrim &mdash; the root sounds of Shri Vidya itself, from which every Nitya mantra
              opens.
            </blockquote>
            <Link
              to="/pathways/tantric/mahavidyas/$goddessSlug"
              params={{ goddessSlug: "tripura-sundari" }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold hover:text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" /> Open her full workbook
            </Link>
          </div>
        ) : nitya ? (
          <div className="mt-6 rounded-xl border border-gold/40 bg-gold/5 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{nitya.tithiLabel}</p>
            <h3 className="mt-2 font-serif text-3xl text-primary">{nitya.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Meaning: {nitya.meaning}
              {nitya.alsoIdentifiedWith && <> &middot; Sometimes identified with {nitya.alsoIdentifiedWith}</>}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{nitya.nature}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              <span className="text-primary">For those born under her: </span>
              {nitya.forThoseBornUnder}
            </p>
            <blockquote className="mt-5 border-l-2 border-gold/60 pl-4 text-sm italic text-foreground/80">
              Aim Hrim Shrim &mdash; the root sounds of Shri Vidya itself, from which every Nitya mantra
              opens, before continuing to name {nitya.name} directly.
            </blockquote>
            <div className="mt-5 rounded-lg border border-border/60 bg-background/40 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">A simple practice</p>
              <p className="mt-1.5 text-sm text-foreground/85">{nitya.practice}</p>
            </div>
          </div>
        ) : null}

        {/* Closing invitation: consistent across all sixteen */}
        <p className="mt-6 border-l-2 border-border/60 pl-4 text-sm italic text-muted-foreground">
          Sit with the practice above for a few days rather than moving straight past it. This reading isn't
          a one-time thing to glance at and forget, you're welcome to come back to it any time you want to
          remember which face of the Goddess met you first.
        </p>

        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Read again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <Moon className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">A quiet gift</p>
          <h2 className="font-serif text-2xl text-primary">Your Nitya</h2>
        </div>
      </div>
      <p className="text-sm text-foreground/80">
        You've completed the course. Before you go, here is one thing to carry with you: the lunar day you
        were born on, and the goddess of Shri Vidya who rules it.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (date) setSubmitted(true);
        }}
        className="mt-6 space-y-4"
      >
        <div>
          <Label htmlFor="nitya-date">Birth date</Label>
          <Input id="nitya-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="nitya-time">Birth time (optional, sharpens the reading)</Label>
          <Input id="nitya-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label>Birth location (used only to convert your time correctly)</Label>
          <Select value={cityId} onValueChange={setCityId}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue placeholder="Choose the closest city" />
            </SelectTrigger>
            <SelectContent>
              {[...grouped.entries()].map(([country, cities]) => (
                <SelectGroup key={country}>
                  <SelectLabel>{country}</SelectLabel>
                  {cities.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={!date} className="w-full">
          Reveal my Nitya
        </Button>
      </form>
    </div>
  );
}
