-- Mala counter: let the student choose what one tap represents (1, 108, or
-- 1008 recitations), instead of forcing a literal tap-per-mantra. One
-- settings row per user, separate from the daily count table.
CREATE TABLE public.mala_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tap_value INT NOT NULL DEFAULT 1 CHECK (tap_value IN (1, 108, 1008)),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.mala_settings TO authenticated;
GRANT ALL ON public.mala_settings TO service_role;

ALTER TABLE public.mala_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own mala settings" ON public.mala_settings
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER trg_mala_settings_updated BEFORE UPDATE ON public.mala_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Dream Diary depth: fields drawn straight from the Lucid Dreaming pathway
-- (Dreamsign Awareness Scale, the six induction techniques, stabilization
-- techniques, and the shamanic/cross-cultural notion of the "big dream"),
-- all optional so the diary stays fast to use for a plain dream too.
ALTER TABLE public.dream_entries
  ADD COLUMN dream_type TEXT CHECK (dream_type IN ('ordinary', 'big_dream', 'nightmare', 'recurring', 'precognitive', 'healing', 'lucid')),
  ADD COLUMN lucidity_level INT CHECK (lucidity_level BETWEEN 0 AND 4),
  ADD COLUMN induction_technique TEXT CHECK (induction_technique IN ('dild', 'mild', 'wild', 'fild', 'sild', 'ess', 'none')),
  ADD COLUMN stabilization_technique TEXT CHECK (stabilization_technique IN ('hand_check', 'spinning', 'rubbing_hands', 'verbal_command', 'math', 'falling_backward', 'none')),
  ADD COLUMN emotional_tone INT CHECK (emotional_tone BETWEEN 1 AND 10),
  ADD COLUMN hours_before_waking NUMERIC;
