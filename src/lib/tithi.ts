// Birth tithi calculation for the Nitya Devi reading (Shri Vidya).
//
// Tithi is the angular distance between the Moon and the Sun, divided into thirty
// 12-degree segments across a lunar month:
//
//   tithi_angle  = (moon_ecliptic_longitude - sun_ecliptic_longitude) mod 360
//   tithi_number = floor(tithi_angle / 12) + 1   // 1..30
//
// This does NOT require an ayanamsa (sidereal offset): tithi is a difference between two
// longitudes, and the ayanamsa constant cancels out of that subtraction whether tropical or
// sidereal positions are used. So a tropical-only ephemeris is sufficient, no Swiss Ephemeris
// or data files needed. astronomy-engine (already used elsewhere in this app, see
// planetary-hours.ts) gives real geocentric ecliptic longitudes for Sun and Moon directly.
import * as Astronomy from "astronomy-engine";

// EclipticLongitude() is heliocentric and throws for the Sun itself (heliocentric is
// undefined for a body relative to itself); SunPosition() gives the correct geocentric
// apparent longitude in that case. Same pattern as planetary-hours.ts.
function geocentricEclipticLongitude(body: Astronomy.Body, at: Date): number {
  if (body === Astronomy.Body.Sun) {
    return Astronomy.SunPosition(at).elon;
  }
  return Astronomy.EclipticLongitude(body, at);
}

export type Paksha = "Shukla" | "Krishna";
export type Aspect = "Prakashamsha" | "Vimarshamsha";

export type TithiResult = {
  tithiNumber: number; // 1..30
  paksha: Paksha;
  /** Position within the 15-day half: 1..15. 15 in Shukla = Purnima, 15 in Krishna = Amavasya. */
  positionInPaksha: number;
  aspect: Aspect | null; // null for the Tripura Sundari positions (Purnima/Amavasya)
  isPurnima: boolean;
  isAmavasya: boolean;
};

/** Computes the tithi for a given moment in time (already resolved to a UTC Date). */
export function getTithi(at: Date): TithiResult {
  const sunLon = geocentricEclipticLongitude(Astronomy.Body.Sun, at);
  const moonLon = geocentricEclipticLongitude(Astronomy.Body.Moon, at);
  const angle = ((moonLon - sunLon) % 360 + 360) % 360;
  const tithiNumber = Math.floor(angle / 12) + 1; // 1..30, guard the 360.0 edge below
  const clamped = Math.min(30, Math.max(1, tithiNumber));

  const isPurnima = clamped === 15;
  const isAmavasya = clamped === 30;
  const paksha: Paksha = clamped <= 15 ? "Shukla" : "Krishna";
  const positionInPaksha = clamped <= 15 ? clamped : clamped - 15;
  const aspect: Aspect | null = isPurnima || isAmavasya ? null : paksha === "Shukla" ? "Prakashamsha" : "Vimarshamsha";

  return { tithiNumber: clamped, paksha, positionInPaksha, aspect, isPurnima, isAmavasya };
}

/**
 * Resolves a birth date/time entered in a given IANA time zone to a UTC Date suitable for
 * the ephemeris calculation. If no time is given, local noon is used as a reasonable
 * default (tithi can change partway through a day, so noon keeps the estimate honest
 * without claiming more precision than was actually provided).
 */
export function resolveBirthMoment(dateStr: string, timeStr: string | null, timeZone: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = (timeStr ?? "12:00").split(":").map(Number);

  // Build a UTC guess, then correct for the target zone's actual offset at that moment
  // (handles DST correctly since we ask Intl for the offset at this specific date).
  const guessUtc = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, hh ?? 12, mm ?? 0, 0));
  const offsetMinutes = getTimeZoneOffsetMinutes(guessUtc, timeZone);
  return new Date(guessUtc.getTime() - offsetMinutes * 60_000);
}

function getTimeZoneOffsetMinutes(at: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(at).map((p) => [p.type, p.value]));
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return (asUtc - at.getTime()) / 60_000;
}
