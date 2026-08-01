// A simple, reasonably accurate moon phase calculation based on days since
// a known new moon reference point and the mean synodic month length.
// Good enough for a personal practice journal, not for anything requiring
// second-level astronomical precision.

export type MoonPhaseKey =
  | "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous"
  | "full" | "waning-gibbous" | "last-quarter" | "waning-crescent";

export const moonPhases: { key: MoonPhaseKey; label: string; glyph: string }[] = [
  { key: "new",              label: "New Moon",          glyph: "🌑" },
  { key: "waxing-crescent",  label: "Waxing Crescent",   glyph: "🌒" },
  { key: "first-quarter",    label: "First Quarter",     glyph: "🌓" },
  { key: "waxing-gibbous",   label: "Waxing Gibbous",    glyph: "🌔" },
  { key: "full",             label: "Full Moon",         glyph: "🌕" },
  { key: "waning-gibbous",   label: "Waning Gibbous",    glyph: "🌖" },
  { key: "last-quarter",     label: "Last Quarter",      glyph: "🌗" },
  { key: "waning-crescent",  label: "Waning Crescent",   glyph: "🌘" },
];

const SYNODIC_MONTH = 29.530588853;
// A known new moon: 6 Jan 2000, 18:14 UTC.
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);

export function moonPhaseForDate(date: Date): MoonPhaseKey {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  const cycles = days / SYNODIC_MONTH;
  const position = cycles - Math.floor(cycles); // 0..1 through the current cycle
  const index = Math.round(position * 8) % 8;
  return moonPhases[index].key;
}

export function moonPhaseInfo(key: MoonPhaseKey | string | null | undefined) {
  return moonPhases.find((m) => m.key === key) ?? null;
}
