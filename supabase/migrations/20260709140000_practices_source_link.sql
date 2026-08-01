-- Let a practice link back to the course/chapter or uploaded material it came
-- from, so the Practice Organiser and the course/material pages can reference
-- each other both ways ("linked" badge on the practice, "in your schedule" on
-- the source). All three columns are optional — freestanding custom practices
-- keep working exactly as before.

ALTER TABLE public.practices
  ADD COLUMN IF NOT EXISTS course_slug text,
  ADD COLUMN IF NOT EXISTS lesson_slug text,
  ADD COLUMN IF NOT EXISTS material_id uuid REFERENCES public.materials(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS practices_course_lesson_idx
  ON public.practices (pathway, course_slug, lesson_slug);

CREATE INDEX IF NOT EXISTS practices_material_idx
  ON public.practices (material_id);
