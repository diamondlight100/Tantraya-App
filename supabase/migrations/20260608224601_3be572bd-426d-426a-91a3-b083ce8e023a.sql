
CREATE TABLE public.library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section text NOT NULL DEFAULT 'General',
  format text NOT NULL CHECK (format IN ('pdf','ebook','audio','video','link')),
  title text NOT NULL,
  book_author text,
  description text,
  media_path text,
  external_url text,
  file_size bigint,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.library_items TO authenticated;
GRANT ALL ON public.library_items TO service_role;

ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authed users can read published library items"
  ON public.library_items FOR SELECT TO authenticated
  USING (published OR author_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Teachers and admins can insert library items"
  ON public.library_items FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );

CREATE POLICY "Authors, teachers, admins can update library items"
  ON public.library_items FOR UPDATE TO authenticated
  USING (
    author_id = auth.uid()
    OR public.has_role(auth.uid(),'admin')
    OR public.has_role(auth.uid(),'teacher')
  );

CREATE POLICY "Authors and admins can delete library items"
  ON public.library_items FOR DELETE TO authenticated
  USING (author_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TRIGGER update_library_items_updated_at
  BEFORE UPDATE ON public.library_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX library_items_section_idx ON public.library_items(section, title);
CREATE INDEX library_items_title_idx ON public.library_items(title);
