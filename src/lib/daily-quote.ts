import { dailyQuotes, type DailyQuote } from "@/data/daily-quotes";

// Same one for everyone on a given calendar day, deterministic so it does
// not reshuffle on every reload, changes at midnight local time.
function seededIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
}

export function quoteOfTheDay(date: Date = new Date()): DailyQuote {
  const key = date.toISOString().slice(0, 10);
  return dailyQuotes[seededIndex(key, dailyQuotes.length)];
}
