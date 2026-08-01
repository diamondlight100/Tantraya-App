-- Lets an assignment ask for something other than written text: a video
-- response, an audio response, a straightforward practice log ("do N reps /
-- M minutes of X"), or leave it open to the student's choice. All additive
-- and nullable/defaulted, so every existing assignment keeps behaving
-- exactly as a 'written' one always has.

ALTER TABLE public.homework_assignments
  ADD COLUMN IF NOT EXISTS response_type text NOT NULL DEFAULT 'written',
  ADD COLUMN IF NOT EXISTS target_minutes integer,
  ADD COLUMN IF NOT EXISTS target_reps integer;

ALTER TABLE public.homework_assignments DROP CONSTRAINT IF EXISTS homework_assignments_response_type_check;
ALTER TABLE public.homework_assignments ADD CONSTRAINT homework_assignments_response_type_check
  CHECK (response_type IN ('written', 'video', 'audio', 'practice', 'any'));

-- Student side: an audio response (parallel to the existing video_url), and
-- a simple honesty-based self-report for practice-style assignments.
ALTER TABLE public.homework_submissions
  ADD COLUMN IF NOT EXISTS audio_url text,
  ADD COLUMN IF NOT EXISTS practice_minutes_logged integer,
  ADD COLUMN IF NOT EXISTS practice_reps_logged integer,
  ADD COLUMN IF NOT EXISTS feedback_video_url text;
