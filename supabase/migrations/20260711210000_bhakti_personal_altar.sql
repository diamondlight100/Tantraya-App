-- A private, personal counterpart to the shared Bhakti altar. The shared
-- altar (public.materials, pathway "bhakti") stays teacher-uploaded and
-- visible to everyone. This table is the opposite: any user can add their
-- own images here, and only they can ever see, reorder, or remove them —
-- not even a teacher or admin can read another user's personal altar.
--
-- Requires a new Storage bucket called "personal-altar" to be created
-- manually first (Storage → New bucket → name it exactly "personal-altar",
-- leave it private/not public) — same as the existing personal-audio bucket.

CREATE TABLE public.personal_altar_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  media_path TEXT NOT NULL,
  display_order INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.personal_altar_images TO authenticated;
GRANT ALL ON public.personal_altar_images TO service_role;

ALTER TABLE public.personal_altar_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage only their own personal altar images"
  ON public.personal_altar_images FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Storage: private bucket, one folder per user (personal-altar/<uid>/...),
-- same pattern as the existing personal-audio bucket.

CREATE POLICY "users read own personal altar images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'personal-altar' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users upload own personal altar images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'personal-altar' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users delete own personal altar images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'personal-altar' AND (storage.foldername(name))[1] = auth.uid()::text);
