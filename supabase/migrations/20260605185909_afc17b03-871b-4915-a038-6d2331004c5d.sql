
ALTER TABLE public.forum_threads
  ADD COLUMN IF NOT EXISTS pinned boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.forum_posts
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_forum_threads_updated ON public.forum_threads;
CREATE TRIGGER trg_forum_threads_updated BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_forum_posts_updated ON public.forum_posts;
CREATE TRIGGER trg_forum_posts_updated BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Only admins/teachers can pin (regular owners can still edit body via existing policy,
-- but we restrict pinning by adding a stricter check via a trigger).
CREATE OR REPLACE FUNCTION public.guard_thread_pin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.pinned IS DISTINCT FROM OLD.pinned
     AND NOT public.has_role(auth.uid(), 'admin')
     AND NOT public.has_role(auth.uid(), 'teacher') THEN
    RAISE EXCEPTION 'Only admins or teachers can pin threads';
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_forum_threads_guard_pin ON public.forum_threads;
CREATE TRIGGER trg_forum_threads_guard_pin BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.guard_thread_pin();

-- Realtime
ALTER TABLE public.forum_threads REPLICA IDENTITY FULL;
ALTER TABLE public.forum_posts REPLICA IDENTITY FULL;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='forum_threads') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_threads';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='forum_posts') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_posts';
  END IF;
END $$;
