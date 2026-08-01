-- Soft-delete for practices: "Remove from schedule" should hide a practice
-- from the schedule/practice pages without destroying its completion
-- history (practice_logs cascade-deletes on a hard delete of practices,
-- which the student may not want). removed_at distinguishes "removed"
-- (hidden everywhere) from active=false ("paused", still visible/resumable).
alter table public.practices
  add column if not exists removed_at timestamptz;
