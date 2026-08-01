-- Mantra recordings — supports two things on the Mantra page:
--   1. A teacher's (Paul's) recording of a mantra, published as the public
--      reference recording every student hears when they open that mantra.
--   2. Any student's (or Paul's) own attempt, private to them, so they can
--      record themselves and compare against the reference.
--
-- Requires a new Storage bucket called "mantra-audio" to be created
-- manually first (Storage → New bucket → name it exactly "mantra-audio",
-- leave it private/not public) — same as personal-audio, materials-media,
-- library-media, and homework-media were.

CREATE TABLE public.mantra_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mantra_key TEXT NOT NULL,
  audio_path TEXT NOT NULL,
  is_reference BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.mantra_recordings TO authenticated;
GRANT ALL ON public.mantra_recordings TO service_role;

ALTER TABLE public.mantra_recordings ENABLE ROW LEVEL SECURITY;

CREATE INDEX mantra_recordings_key_idx ON public.mantra_recordings (mantra_key);

-- Read: your own rows, or anyone's row marked as the public reference.
CREATE POLICY "read own or reference mantra recordings"
  ON public.mantra_recordings FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_reference = true);

-- Insert: always allowed for your own user_id; but only a teacher/admin
-- may mark their own recording as the reference one.
CREATE POLICY "insert own mantra recordings"
  ON public.mantra_recordings FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      is_reference = false
      OR EXISTS (
        SELECT 1 FROM public.user_roles ur
        WHERE ur.user_id = auth.uid() AND ur.role IN ('teacher', 'admin')
      )
    )
  );

-- Delete: only your own rows.
CREATE POLICY "delete own mantra recordings"
  ON public.mantra_recordings FOR DELETE TO authenticated
  USING (user_id = auth.uid());


-- Storage policies for the "mantra-audio" bucket.
-- Each user uploads into their own folder, e.g. mantra-audio/<uid>/<mantra_key>-<ts>.webm
-- Anyone can read a path if it's their own folder, OR if that exact path is
-- referenced by a mantra_recordings row marked is_reference = true.

CREATE POLICY "users read own mantra audio"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'mantra-audio'
    AND (
      (storage.foldername(name))[1] = auth.uid()::text
      OR EXISTS (
        SELECT 1 FROM public.mantra_recordings mr
        WHERE mr.audio_path = name AND mr.is_reference = true
      )
    )
  );

CREATE POLICY "users upload own mantra audio"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'mantra-audio' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users delete own mantra audio"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'mantra-audio' AND (storage.foldername(name))[1] = auth.uid()::text);
