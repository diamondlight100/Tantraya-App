
CREATE TABLE public.library_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id uuid NOT NULL REFERENCES public.library_items(id) ON DELETE CASCADE,
  page_index integer NOT NULL DEFAULT 0,
  quote text NOT NULL,
  note text,
  color text NOT NULL DEFAULT 'yellow',
  areas jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.library_highlights TO authenticated;
GRANT ALL ON public.library_highlights TO service_role;

ALTER TABLE public.library_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own highlights"
  ON public.library_highlights FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER update_library_highlights_updated_at
  BEFORE UPDATE ON public.library_highlights
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX library_highlights_user_item_idx
  ON public.library_highlights(user_id, item_id, page_index);
