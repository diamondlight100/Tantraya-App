-- Record which body layer a completion belonged to, at the moment it was
-- logged. This is deliberately denormalized (copied from practices.body_layer
-- at log time, not joined live) so a student's Five Bodies progression stays
-- intact even if they later edit, retag, or delete the practice itself.
-- Nullable: historical rows logged before this migration simply won't count
-- toward any body's progression, which is the correct, harmless fallback.

ALTER TABLE public.practice_logs
  ADD COLUMN IF NOT EXISTS body_layer public.body_layer;

CREATE INDEX IF NOT EXISTS practice_logs_body_layer_idx
  ON public.practice_logs (user_id, body_layer, log_date);
