-- Lets a student pick a short, thematic flair for themselves — shown beside
-- their name in the Forum. Free-choice from a curated in-app list (see
-- src/data/flairs.ts), stored as plain text rather than an enum so new
-- flairs can be added later without a migration.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS flair text;
