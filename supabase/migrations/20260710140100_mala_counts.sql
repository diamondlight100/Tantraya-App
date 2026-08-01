-- Mala counter — a simple daily tally, private per student, for keeping
-- track of chanting practice over time. One row per user per day.

CREATE TABLE public.mala_counts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  count_date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, count_date)
);

GRANT SELECT, INSERT, UPDATE ON public.mala_counts TO authenticated;
GRANT ALL ON public.mala_counts TO service_role;

ALTER TABLE public.mala_counts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own mala counts" ON public.mala_counts
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER trg_mala_counts_updated BEFORE UPDATE ON public.mala_counts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
