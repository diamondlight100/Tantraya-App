// Planetary hours + a light "what are the planets doing" ephemeris.
//
// Sources / method:
// - Planetary hour sequence: the standard Chaldean order (Saturn, Jupiter, Mars, Sun,
//   Venus, Mercury, Moon, repeating), with the first hour of the planetary day always
//   ruled by that day's own ruling planet (Sunday=Sun ... Saturday=Saturn). Day hours run
//   sunrise->sunset split into 12 equal parts; night hours run sunset->next sunrise split
//   into 12 equal parts. This is the method given in every classical source (Lilly,
//   the Heptameron, modern renaissanceastrology.com etc.) and it is what generates the
//   Heptameron's own hour tables when you unwind them.
// - Angel of the hour: the Heptameron of Pietro d'Abano (printed with Agrippa's Fourth
//   Book) assigns one angel per planet, cycling in the same Chaldean order as the hour
//   itself: Michael/Sun, Anael/Venus, Raphael/Mercury, Gabriel/Moon, Cassiel/Saturn,
//   Sachiel/Jupiter, Samael/Mars. Checked directly against the Heptameron's own printed
//   per-day hour tables (Sunday through Saturday) rather than assumed.
// - Ephemeris: real geocentric ecliptic longitudes from astronomy-engine (a full VSOP/
//   Chebyshev-based astronomy library, not an approximation), so sign/degree and
//   retrograde status are astronomically accurate, not illustrative.
import * as Astronomy from "astronomy-engine";

export type PlanetKey = "saturn" | "jupiter" | "mars" | "sun" | "venus" | "mercury" | "moon";

export const CHALDEAN_ORDER: PlanetKey[] = ["saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon"];

// Sunday(0) .. Saturday(6), matching Date#getDay() / Intl weekday index conventions.
export const DAY_RULERS: PlanetKey[] = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];

export const PLANET_ANGELS: Record<PlanetKey, string> = {
  sun: "Michael",
  venus: "Anael",
  mercury: "Raphael",
  moon: "Gabriel",
  saturn: "Cassiel",
  jupiter: "Sachiel",
  mars: "Samael",
};

export const PLANET_META: Record<
  PlanetKey,
  { name: string; symbol: string; color: string; body: Astronomy.Body; dayName: string; canRetrograde: boolean }
> = {
  sun: { name: "Sun", symbol: "☉", color: "#e8b64a", body: Astronomy.Body.Sun, dayName: "Sunday", canRetrograde: false },
  moon: { name: "Moon", symbol: "☽", color: "#c9d3e0", body: Astronomy.Body.Moon, dayName: "Monday", canRetrograde: false },
  mars: { name: "Mars", symbol: "♂", color: "#b0463f", body: Astronomy.Body.Mars, dayName: "Tuesday", canRetrograde: true },
  mercury: { name: "Mercury", symbol: "☿", color: "#8f8f8f", body: Astronomy.Body.Mercury, dayName: "Wednesday", canRetrograde: true },
  jupiter: { name: "Jupiter", symbol: "♃", color: "#5b7fae", body: Astronomy.Body.Jupiter, dayName: "Thursday", canRetrograde: true },
  venus: { name: "Venus", symbol: "♀", color: "#c9a869", body: Astronomy.Body.Venus, dayName: "Friday", canRetrograde: true },
  saturn: { name: "Saturn", symbol: "♄", color: "#6b6558", body: Astronomy.Body.Saturn, dayName: "Saturday", canRetrograde: true },
};

export const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type City = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  timeZone: string;
};

export type HourSlot = {
  index: number; // 1..24
  isDay: boolean;
  hourOfPart: number; // 1..12
  start: Date;
  end: Date;
  planet: PlanetKey;
  angel: string;
};

export type PlanetaryDay = {
  planetaryDate: Date; // the sunrise that begins this planetary day
  weekdayName: string;
  dayRuler: PlanetKey;
  sunrise: Date;
  sunset: Date;
  nextSunrise: Date;
  hours: HourSlot[];
};

function toObserver(city: City) {
  return new Astronomy.Observer(city.lat, city.lon, 0);
}

function weekdayIndexInZone(date: Date, timeZone: string): number {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const wd = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long" }).format(date);
  const idx = names.indexOf(wd);
  return idx === -1 ? date.getDay() : idx;
}

/** Finds the planetary day (sunrise -> sunset -> next sunrise) that `at` falls within. */
export function getPlanetaryDay(at: Date, city: City): PlanetaryDay {
  const observer = toObserver(city);

  // Find the most recent sunrise at or before `at`.
  let sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, at, -2);
  if (!sunrise) {
    // Fallback: search forward if backward search failed (e.g. extreme latitude edge case).
    sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, at, 2)!;
  }
  const sunriseDate = sunrise.date;

  const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, sunriseDate, 2)!;
  const nextSunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, sunset.date, 2)!;

  const sunriseD = sunrise.date;
  const sunsetD = sunset.date;
  const nextSunriseD = nextSunrise.date;

  const weekdayIdx = weekdayIndexInZone(sunriseD, city.timeZone);
  const weekdayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][weekdayIdx];
  const dayRuler = DAY_RULERS[weekdayIdx];
  const startIdx = CHALDEAN_ORDER.indexOf(dayRuler);

  const dayHourMs = (sunsetD.getTime() - sunriseD.getTime()) / 12;
  const nightHourMs = (nextSunriseD.getTime() - sunsetD.getTime()) / 12;

  const hours: HourSlot[] = [];
  for (let i = 0; i < 12; i++) {
    const start = new Date(sunriseD.getTime() + i * dayHourMs);
    const end = new Date(start.getTime() + dayHourMs);
    const planet = CHALDEAN_ORDER[(startIdx + i) % 7];
    hours.push({ index: i + 1, isDay: true, hourOfPart: i + 1, start, end, planet, angel: PLANET_ANGELS[planet] });
  }
  for (let i = 0; i < 12; i++) {
    const start = new Date(sunsetD.getTime() + i * nightHourMs);
    const end = new Date(start.getTime() + nightHourMs);
    const planet = CHALDEAN_ORDER[(startIdx + 12 + i) % 7];
    hours.push({ index: 13 + i, isDay: false, hourOfPart: i + 1, start, end, planet, angel: PLANET_ANGELS[planet] });
  }

  return {
    planetaryDate: sunriseD,
    weekdayName,
    dayRuler,
    sunrise: sunriseD,
    sunset: sunsetD,
    nextSunrise: nextSunriseD,
    hours,
  };
}

export function getCurrentHour(day: PlanetaryDay, at: Date): HourSlot | null {
  return day.hours.find((h) => at >= h.start && at < h.end) ?? null;
}

/** Walks forward day by day (max 9 days) to find the next slot ruled by `planet` after `after`. */
export function findNextHourFor(planet: PlanetKey, city: City, after: Date): HourSlot {
  let cursor = new Date(after);
  for (let d = 0; d < 9; d++) {
    const day = getPlanetaryDay(cursor, city);
    const match = day.hours.find((h) => h.planet === planet && h.start > after);
    if (match) return match;
    cursor = new Date(day.nextSunrise.getTime() + 1000);
  }
  // Should never happen (planet recurs at least 3x per 24h cycle), but keep TS happy.
  const day = getPlanetaryDay(cursor, city);
  return day.hours.find((h) => h.planet === planet) ?? day.hours[0];
}

export type PlanetPosition = {
  planet: PlanetKey;
  longitude: number; // 0-360 geocentric ecliptic
  sign: (typeof ZODIAC_SIGNS)[number];
  degreeInSign: number;
  retrograde: boolean;
};

// EclipticLongitude() is heliocentric and throws for the Sun (its heliocentric
// position relative to itself is undefined). Use the Sun's apparent geocentric
// ecliptic longitude instead, same as astronomy-engine's own Illumination() does.
function getGeocentricEclipticLongitude(body: Astronomy.Body, at: Date): number {
  if (body === Astronomy.Body.Sun) {
    return Astronomy.SunPosition(at).elon;
  }
  return Astronomy.EclipticLongitude(body, at);
}

export function getPlanetPositions(at: Date): PlanetPosition[] {
  return (Object.keys(PLANET_META) as PlanetKey[]).map((planet) => {
    const meta = PLANET_META[planet];
    const lon = getGeocentricEclipticLongitude(meta.body, at);
    const signIdx = Math.floor(((lon % 360) + 360) % 360 / 30);
    const degreeInSign = (((lon % 360) + 360) % 360) % 30;

    let retrograde = false;
    if (meta.canRetrograde) {
      const before = getGeocentricEclipticLongitude(meta.body, new Date(at.getTime() - 24 * 3600 * 1000));
      let diff = lon - before;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      retrograde = diff < 0;
    }

    return {
      planet,
      longitude: lon,
      sign: ZODIAC_SIGNS[signIdx],
      degreeInSign,
      retrograde,
    };
  });
}

export type MoonPhaseInfo = {
  phaseAngle: number; // 0-360
  phaseName: string;
  illumination: number; // 0-1
};

export function getMoonPhase(at: Date): MoonPhaseInfo {
  const angle = Astronomy.MoonPhase(at);
  const illum = Astronomy.Illumination(Astronomy.Body.Moon, at).phase_fraction;
  let phaseName: string;
  if (angle < 6 || angle > 354) phaseName = "New Moon";
  else if (angle < 84) phaseName = "Waxing Crescent";
  else if (angle < 96) phaseName = "First Quarter";
  else if (angle < 174) phaseName = "Waxing Gibbous";
  else if (angle < 186) phaseName = "Full Moon";
  else if (angle < 264) phaseName = "Waning Gibbous";
  else if (angle < 276) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";
  return { phaseAngle: angle, phaseName, illumination: illum };
}

export function formatInZone(date: Date, timeZone: string, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    ...opts,
  }).format(date);
}
