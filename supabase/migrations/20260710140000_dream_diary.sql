-- Dream Diary — private per student, same access pattern as the journal.
-- Two tables: the dream entries themselves (written or recorded), and
-- "dream signs" — short highlighted phrases the student has tagged as
-- recurring markers that tell them they're dreaming. These accumulate into
-- a personal dream-sign library over time.

CREATE TABLE public.dream_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  audio_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.dream_entries TO authenticated;
GRANT ALL ON public.dream_entries TO service_role;

ALTER TABLE public.dream_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own dream entries" ON public.dream_entries
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());


CREATE TABLE public.dream_signs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dream_entry_id UUID NOT NULL REFERENCES public.dream_entries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phrase TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other' CHECK (category IN ('awareness', 'action', 'form', 'context', 'other')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.dream_signs TO authenticated;
GRANT ALL ON public.dream_signs TO service_role;

ALTER TABLE public.dream_signs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own dream signs" ON public.dream_signs
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX dream_signs_user_phrase_idx ON public.dream_signs (user_id, phrase);
