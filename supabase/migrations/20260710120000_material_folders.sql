-- Folders let a teacher group materials however makes sense to them,
-- independent of (and on top of) the existing pathway/course tagging.
-- Kept flat (no nested subfolders) — simple, and covers the actual need.

CREATE TABLE public.material_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  pathway TEXT, -- optional: scope a folder to one pathway, or leave null for "any pathway"
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.material_folders TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.material_folders TO authenticated;
GRANT ALL ON public.material_folders TO service_role;

ALTER TABLE public.material_folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authed can read folders"
  ON public.material_folders FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Teachers and admins can create folders"
  ON public.material_folders FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Teachers and admins can update folders"
  ON public.material_folders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers and admins can delete folders"
  ON public.material_folders FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.materials
  ADD COLUMN IF NOT EXISTS folder_id UUID REFERENCES public.material_folders(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS materials_folder_idx ON public.materials (folder_id);
