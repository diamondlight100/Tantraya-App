-- Digital offerings on the Bhakti altar (incense / flower). Purely a private
-- log of what someone has offered, so it can never be read by anyone else,
-- not even a teacher or admin — same pattern as love_notes after it was
-- locked down to private-only.

CREATE TABLE public.bhakti_offerings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('incense', 'flower')),
  prasad_kind TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.bhakti_offerings TO authenticated;
GRANT ALL ON public.bhakti_offerings TO service_role;

ALTER TABLE public.bhakti_offerings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can add their own offerings" ON public.bhakti_offerings
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "users can read only their own offerings" ON public.bhakti_offerings
  FOR SELECT TO authenticated USING (user_id = auth.uid());
