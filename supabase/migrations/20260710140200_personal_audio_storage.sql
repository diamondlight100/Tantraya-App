-- Requires a new Storage bucket called "personal-audio" to be created
-- manually first (Storage → New bucket → name it exactly "personal-audio",
-- leave it private/not public) — same as the existing materials-media,
-- library-media, and homework-media buckets were created.
--
-- Unlike materials-media (teacher/admin only), this bucket is scoped so
-- every student can upload, read, and delete only their own files, kept
-- in a folder named after their own user id (e.g. "personal-audio/<uid>/...").

CREATE POLICY "users read own personal audio"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'personal-audio' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users upload own personal audio"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'personal-audio' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users delete own personal audio"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'personal-audio' AND (storage.foldername(name))[1] = auth.uid()::text);
