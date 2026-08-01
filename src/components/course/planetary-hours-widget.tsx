import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CITIES, DEFAULT_CITY_ID } from "@/data/magick/cities";
import {
  getPlanetaryDay,
  getCurrentHour,
  findNextHourFor,
  getPlanetPositions,
  getMoonPhase,
  formatInZone,
  PLANET_META,
  CHALDEAN_ORDER,
  type PlanetKey,
  type HourSlot,
  type City,
} from "@/lib/planetary-hours";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

function PlanetGlyph({ planet, className }: { planet: PlanetKey; className?: string }) {
  const meta = PLANET_META[planet];
  return (
    <span
      className={cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm", className)}
      style={{ color: meta.color, background: `${meta.color}1a` }}
    >
      {meta.symbol}
    </span>
  );
}

function fmtDuration(ms: number): string {
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function HourRow({
  hour,
  city,
  isNow,
}: {
  hour: HourSlot;
  city: City;
  isNow: boolean;
}) {
  const meta = PLANET_META[hour.planet];
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition",
        isNow ? "border-gold/70 bg-gold/10" : "border-border/40 bg-card/40",
      )}
    >
      <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{hour.index}</span>
      <PlanetGlyph planet={hour.planet} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground/90">{meta.name}</span>
          <span className="text-xs text-muted-foreground">· Angel {hour.angel}</span>
          {isNow && (
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gold">Now</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatInZone(hour.start, city.timeZone)} – {formatInZone(hour.end, city.timeZone)}
          <span className="ml-1.5">({fmtDuration(hour.end.getTime() - hour.start.getTime())})</span>
        </div>
      </div>
    </div>
  );
}

export function PlanetaryHoursWidget() {
  const [cityId, setCityId] = useState(DEFAULT_CITY_ID);
  const [now, setNow] = useState(() => new Date());
  const [pickedPlanet, setPickedPlanet] = useState<PlanetKey | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const city = useMemo(() => CITIES.find((c) => c.id === cityId) ?? CITIES[0], [cityId]);

  const day = useMemo(() => getPlanetaryDay(now, city), [now, city]);
  const currentHour = useMemo(() => getCurrentHour(day, now), [day, now]);
  const positions = useMemo(() => getPlanetPositions(now), [now]);
  const moon = useMemo(() => getMoonPhase(now), [now]);

  const nextForPicked = useMemo(() => {
    if (!pickedPlanet) return null;
    return findNextHourFor(pickedPlanet, city, now);
  }, [pickedPlanet, city, now]);

  const citiesByCountry = useMemo(() => {
    const map = new Map<string, City[]>();
    for (const c of CITIES) {
      const arr = map.get(c.country) ?? [];
      arr.push(c);
      map.set(c.country, arr);
    }
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* City picker + current hour */}
      <div className="rounded-xl border border-gold/40 bg-card/70 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Right now</p>
            <h3 className="font-serif text-2xl text-primary">
              {day.weekdayName} · ruled by {PLANET_META[day.dayRuler].name} {PLANET_META[day.dayRuler].symbol}
            </h3>
          </div>
          <Select value={cityId} onValueChange={setCityId}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              {[...citiesByCountry.entries()].map(([country, cities]) => (
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

        {currentHour ? (
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-gold/50 bg-gold/10 p-4">
            <PlanetGlyph planet={currentHour.planet} className="h-10 w-10 text-xl" />
            <div>
              <p className="font-serif text-xl text-primary">
                Hour of {PLANET_META[currentHour.planet].name} · Angel {currentHour.angel}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentHour.isDay ? "Day" : "Night"} hour {currentHour.hourOfPart} of 12 · until{" "}
                {formatInZone(currentHour.end, city.timeZone)} ({city.name} time)
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Could not resolve the current hour for this location.</p>
        )}

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-3">
          <span>Sunrise: {formatInZone(day.sunrise, city.timeZone)}</span>
          <span>Sunset: {formatInZone(day.sunset, city.timeZone)}</span>
          <span>Next sunrise: {formatInZone(day.nextSunrise, city.timeZone)}</span>
        </div>
      </div>

      {/* Pick a planet, see when its hour next falls */}
      <div className="rounded-xl border border-border/50 bg-card/60 p-5">
        <h3 className="font-serif text-xl text-primary">Pick an hour you want</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a planet and see exactly when its next hour begins in {city.name}.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHALDEAN_ORDER.map((p) => (
            <button
              key={p}
              onClick={() => setPickedPlanet(p)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition",
                pickedPlanet === p ? "border-gold/70 bg-gold/15 text-gold" : "border-border/50 hover:border-gold/50",
              )}
            >
              <PlanetGlyph planet={p} className="h-5 w-5 text-xs" />
              {PLANET_META[p].name}
            </button>
          ))}
        </div>
        {pickedPlanet && nextForPicked && (
          <div className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm">
            <span className="font-medium text-foreground/90">
              Next hour of {PLANET_META[pickedPlanet].name} (Angel {nextForPicked.angel}):
            </span>{" "}
            <span className="text-gold">
              {formatInZone(nextForPicked.start, city.timeZone, { weekday: "short", month: "short", day: "numeric" })} –{" "}
              {formatInZone(nextForPicked.end, city.timeZone)}
            </span>
          </div>
        )}
      </div>

      {/* Full day/night hour list */}
      <div className="rounded-xl border border-border/50 bg-card/60 p-5">
        <h3 className="font-serif text-xl text-primary">All 24 hours of the day</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Hours 1–12 run sunrise to sunset (day hours); 13–24 run sunset to the next sunrise (night hours). Each is
          unequal in length and rescales every day with real sunrise/sunset for {city.name}.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Day hours</p>
            <div className="space-y-1.5">
              {day.hours.slice(0, 12).map((h) => (
                <HourRow key={h.index} hour={h} city={city} isNow={currentHour?.index === h.index} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Night hours</p>
            <div className="space-y-1.5">
              {day.hours.slice(12).map((h) => (
                <HourRow key={h.index} hour={h} city={city} isNow={currentHour?.index === h.index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ephemeris */}
      <div className="rounded-xl border border-border/50 bg-card/60 p-5">
        <h3 className="font-serif text-xl text-primary">What the planets are doing right now</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Real geocentric positions (tropical zodiac), calculated for this exact moment — not a fixed table.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {positions.map((pos) => {
            const meta = PLANET_META[pos.planet];
            return (
              <div key={pos.planet} className="flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2">
                <PlanetGlyph planet={pos.planet} />
                <div className="flex-1 text-sm">
                  <span className="font-medium text-foreground/90">{meta.name}</span>{" "}
                  <span className="text-muted-foreground">
                    {pos.degreeInSign.toFixed(1)}° {pos.sign}
                  </span>
                  {pos.retrograde && (
                    <span className="ml-2 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-destructive">
                      Retrograde
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2 text-sm">
          <span className="font-medium text-foreground/90">Moon phase: </span>
          <span className="text-muted-foreground">
            {moon.phaseName} · {(moon.illumination * 100).toFixed(0)}% illuminated
          </span>
        </div>
      </div>
    </div>
  );
}
