import { useCallback, useEffect, useState } from "react";
import type { LineValue } from "@/data/daoist/iching-hexagrams";

/**
 * Dedicated local reading-history log for the I Ching divination tool,
 * localStorage backed, same pattern as course-progress.ts. Kept separate
 * from the app's generic Supabase-backed Journal (journal.tsx), which is
 * built around mood/dream/prompt entries and doesn't fit a structured
 * hexagram-casting record. Each reading is a full, permanent entry in a
 * student's own private oracle log on this device.
 */

const KEY = "tantraya.iching.readings";

export type SavedReading = {
  id: string;
  date: string; // ISO
  method: "coins" | "yarrow";
  question?: string;
  lineValues: LineValue[]; // bottom to top
  primaryNumber?: number;
  resultingNumber?: number;
  changingPositions: number[];
  note?: string;
};

function read(): SavedReading[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedReading[]) : [];
  } catch {
    return [];
  }
}

function write(list: SavedReading[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function useIChingReadings() {
  const [readings, setReadings] = useState<SavedReading[]>([]);

  useEffect(() => {
    setReadings(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setReadings(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const save = useCallback((entry: Omit<SavedReading, "id" | "date">) => {
    const full: SavedReading = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
    };
    setReadings((prev) => {
      const next = [full, ...prev];
      write(next);
      return next;
    });
    return full;
  }, []);

  const remove = useCallback((id: string) => {
    setReadings((prev) => {
      const next = prev.filter((r) => r.id !== id);
      write(next);
      return next;
    });
  }, []);

  const setNote = useCallback((id: string, note: string) => {
    setReadings((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, note } : r));
      write(next);
      return next;
    });
  }, []);

  return { readings, save, remove, setNote };
}
