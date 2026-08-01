-- Lets a journal entry be tagged back to the course/lesson it came from —
-- needed for the Mahavidya course's "reflect on this" buttons (pre-tag a new
-- entry to the goddess and practice it was written from) and its "look back
-- across all your entries for this course" views. Same naming convention as
-- practices.course_slug / practices.lesson_slug.

ALTER TABLE public.journal_entries
  ADD COLUMN IF NOT EXISTS course_slug TEXT,
  ADD COLUMN IF NOT EXISTS lesson_slug TEXT;

CREATE INDEX IF NOT EXISTS journal_entries_course_idx
  ON public.journal_entries(user_id, course_slug, lesson_slug, created_at);
