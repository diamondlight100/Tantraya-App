-- Each student's own private "cosmic filing cabinet" attached to the
-- Qabalistic Tree of Life widget (Magick pathway). Every Sephirah (keter,
-- chokmah, binah, chesed, geburah, tiphareth, netzach, hod, yesod,
-- malkuth) gets a small personal library space where a student can drop in
-- their own notes, links, or files, alongside the teacher-provided
-- correspondence material that's already shown there. Entirely private:
-- not even a teacher or admin can read another user's tree items, same
-- privacy model as personal_altar_images / love_notes.
--
-- Requires a new Storage bucket called "personal-tree" to be created
-- manually first (Storage → New bucket → name it exactly "personal-tree",
-- leave it private/not public) — same as the existing personal-altar and
-- personal-audio buckets. Only needed if students want to upload a file
-- (image/audio/video/document); plain notes and links don't touch storage.

CREATE TABLE public.personal_tree_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sephirah TEXT NOT NULL, -- key from src/data/magick/tree-of-life.ts, e.g. "tiphareth"
  format TEXT NOT NULL CHECK (format IN ('note', 'link', 'image', 'audio', 'video', 'document')),
  title TEXT NOT NULL,
  body TEXT,              -- note text
  external_url TEXT,       -- link format
  media_path TEXT,          -- image/audio/video/document format, in the personal-tree bucket
  display_order INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX personal_tree_items_user_sephirah_idx
  ON public.personal_tree_items (user_id, sephirah);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.personal_tree_items TO authenticated;
GRANT ALL ON public.personal_tree_items TO service_role;

ALTER TABLE public.personal_tree_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage only their own tree items"
  ON public.personal_tree_items FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Storage: private bucket, one folder per user (personal-tree/<uid>/...),
-- same pattern as personal-altar/personal-audio.

CREATE POLICY "users read own personal tree files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'personal-tree' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users upload own personal tree files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'personal-tree' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users delete own personal tree files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'personal-tree' AND (storage.foldername(name))[1] = auth.uid()::text);
