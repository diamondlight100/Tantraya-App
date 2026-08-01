
ALTER TABLE public.practices
  ADD COLUMN IF NOT EXISTS preferred_time TIME,
  ADD COLUMN IF NOT EXISTS icon TEXT;
