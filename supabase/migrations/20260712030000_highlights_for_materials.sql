-- The PDF reader with highlighting/notes (library_highlights) only ever
-- worked for /library items — course "materials" (uploaded manuals, like the
-- Phowa PDF) had no real in-app reader at all, just a raw <object> embed
-- that some browsers pop out to a new tab instead of rendering inline. This
-- lets the same reader + highlight/notes system work for materials too.

ALTER TABLE public.library_highlights
  ALTER COLUMN item_id DROP NOT NULL;

ALTER TABLE public.library_highlights
  ADD COLUMN IF NOT EXISTS material_id uuid REFERENCES public.materials(id) ON DELETE CASCADE;

ALTER TABLE public.library_highlights
  ADD CONSTRAINT library_highlights_one_source CHECK (
    (item_id IS NOT NULL AND material_id IS NULL) OR
    (item_id IS NULL AND material_id IS NOT NULL)
  );

CREATE INDEX IF NOT EXISTS library_highlights_user_material_idx
  ON public.library_highlights(user_id, material_id, page_index);
