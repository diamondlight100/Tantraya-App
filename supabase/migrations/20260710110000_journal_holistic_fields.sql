-- Optional holistic check-in fields for journal entries. Everything here is
-- nullable — students fill in only what feels useful, over time building a
-- picture of what actually affects their practice, mood, and body.

ALTER TABLE public.journal_entries
  ADD COLUMN IF NOT EXISTS moon_phase TEXT,
  ADD COLUMN IF NOT EXISTS sleep_hours NUMERIC,
  ADD COLUMN IF NOT EXISTS sleep_quality INT,
  ADD COLUMN IF NOT EXISTS hydration INT,
  ADD COLUMN IF NOT EXISTS diet TEXT,
  ADD COLUMN IF NOT EXISTS energy_level INT,
  ADD COLUMN IF NOT EXISTS mental_clarity INT,
  ADD COLUMN IF NOT EXISTS stress_level INT,
  ADD COLUMN IF NOT EXISTS practice_minutes INT,
  ADD COLUMN IF NOT EXISTS weather TEXT;
