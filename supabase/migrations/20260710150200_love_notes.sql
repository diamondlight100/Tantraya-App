-- Short devotional notes, left for anyone to see — the one genuinely new
-- piece of this feature. Everyone can read all notes (it's a shared space,
-- not a private journal); only the author (or a teacher/admin) can remove
-- their own.

CREATE TABLE public.love_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.love_notes TO authenticated;
GRANT DELETE ON public.love_notes TO authenticated;
GRANT ALL ON public.love_notes TO service_role;

ALTER TABLE public.love_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone authed can read love notes" ON public.love_notes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "users can add their own love notes" ON public.love_notes
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "users and admins can delete love notes" ON public.love_notes
  FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
