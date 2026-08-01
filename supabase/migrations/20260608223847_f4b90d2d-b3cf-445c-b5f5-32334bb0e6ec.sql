
CREATE TABLE public.materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pathway text NOT NULL DEFAULT 'general',
  course_slug text,
  title text NOT NULL,
  description text,
  format text NOT NULL CHECK (format IN ('text','audio','video','link')),
  body text,
  media_path text,
  external_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.materials TO authenticated;
GRANT ALL ON public.materials TO service_role;

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authed can read published materials"
  ON public.materials FOR SELECT TO authenticated
  USING (published OR author_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Teachers and admins can insert materials"
  ON public.materials FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );

CREATE POLICY "Authors, teachers, admins can update materials"
  ON public.materials FOR UPDATE TO authenticated
  USING (
    author_id = auth.uid()
    OR public.has_role(auth.uid(),'admin')
    OR public.has_role(auth.uid(),'teacher')
  );

CREATE POLICY "Authors and admins can delete materials"
  ON public.materials FOR DELETE TO authenticated
  USING (author_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON public.materials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX materials_pathway_idx ON public.materials(pathway, created_at DESC);
