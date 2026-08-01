-- Seva (service) log: a private record of small acts of service and
-- kindness. Never shared, never ranked — visible only to the student who
-- logged it, same access pattern as the journal. Each entry is worth 1
-- karma point by default; karma converts to Alchemy at 1:5 in
-- use-overall-alchemy.ts (kept as application logic, not duplicated here,
-- so the conversion rate only ever lives in one place).

CREATE TABLE public.karma_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT,
  karma_points INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.karma_logs TO authenticated;
GRANT ALL ON public.karma_logs TO service_role;

ALTER TABLE public.karma_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own karma log" ON public.karma_logs
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
