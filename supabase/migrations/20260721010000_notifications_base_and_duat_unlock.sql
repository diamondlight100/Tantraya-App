-- Consolidated, safe-to-re-run script for Paul's live Supabase project.
-- His DB never had the earlier notifications migration applied, so this
-- creates the base `notifications` table (and its realtime wiring) AND
-- the new duat_unlocks feature in one go. Paste this whole file into
-- Supabase Dashboard -> SQL Editor -> New query -> Run.

-- ============================================================
-- 1. Base notifications table (only created if missing)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link_to TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Make sure the type check constraint exists and includes every type the
-- app uses, including the new 'duat_unlock'. Drop first if present so this
-- can be re-run without erroring.
ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS notifications_type_check;
ALTER TABLE public.notifications ADD CONSTRAINT notifications_type_check
  CHECK (type IN ('forum_reply', 'forum_thread', 'forum_activity', 'duat_unlock'));

GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
GRANT INSERT ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users see own notifications" ON public.notifications;
CREATE POLICY "users see own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "users update own notifications" ON public.notifications;
CREATE POLICY "users update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "users delete own notifications" ON public.notifications;
CREATE POLICY "users delete own notifications" ON public.notifications
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- No INSERT policy for regular users on purpose — notifications are only
-- ever created by SECURITY DEFINER trigger functions, so students can't
-- insert fake notifications to other people.

CREATE INDEX IF NOT EXISTS notifications_user_unread_idx ON public.notifications (user_id, read, created_at DESC);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='notifications') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications';
  END IF;
END $$;

-- ============================================================
-- 2. duat_unlocks table + notify-your-fellow-students trigger
-- ============================================================
CREATE TABLE IF NOT EXISTS public.duat_unlocks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.duat_unlocks TO authenticated;
GRANT ALL ON public.duat_unlocks TO service_role;

ALTER TABLE public.duat_unlocks ENABLE ROW LEVEL SECURITY;

-- Everyone can see who else has unlocked it (needed to show "N students
-- are ready to play" style hints), but can only ever insert their own row.
DROP POLICY IF EXISTS "unlocks are visible to all students" ON public.duat_unlocks;
CREATE POLICY "unlocks are visible to all students" ON public.duat_unlocks
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "users can only record their own unlock" ON public.duat_unlocks;
CREATE POLICY "users can only record their own unlock" ON public.duat_unlocks
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.notify_on_duat_unlock()
RETURNS TRIGGER AS $$
DECLARE
  v_name TEXT;
  v_other_count INT;
BEGIN
  SELECT COALESCE(display_name, 'A fellow student') INTO v_name
  FROM public.profiles WHERE id = NEW.user_id;

  -- Tell every student who unlocked it before this one — a new opponent
  -- just became available.
  INSERT INTO public.notifications (user_id, type, title, body, link_to)
  SELECT du.user_id, 'duat_unlock', 'A new opponent for the Trial of the Duat',
         v_name || ' just unlocked the game — challenge them to a match!',
         '/pathways/magick/egyptian-magick'
  FROM public.duat_unlocks du
  WHERE du.user_id <> NEW.user_id;

  -- And tell the newly-unlocked student, if there's already anyone to
  -- play against.
  SELECT count(*) INTO v_other_count FROM public.duat_unlocks WHERE user_id <> NEW.user_id;
  IF v_other_count > 0 THEN
    INSERT INTO public.notifications (user_id, type, title, body, link_to)
    VALUES (
      NEW.user_id, 'duat_unlock', 'You can play the Trial of the Duat now',
      v_other_count || ' other student' || (CASE WHEN v_other_count = 1 THEN '' ELSE 's' END)
        || ' already unlocked it — invite one to a match.',
      '/pathways/magick/egyptian-magick'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_notify_duat_unlock ON public.duat_unlocks;
CREATE TRIGGER trg_notify_duat_unlock
  AFTER INSERT ON public.duat_unlocks
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_duat_unlock();
