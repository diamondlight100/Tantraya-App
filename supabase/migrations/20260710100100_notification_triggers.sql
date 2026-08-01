-- Fires on every new reply (forum_posts row).
CREATE OR REPLACE FUNCTION public.notify_on_forum_post()
RETURNS TRIGGER AS $$
DECLARE
  v_thread_author UUID;
  v_thread_title TEXT;
  v_category_slug TEXT;
BEGIN
  SELECT t.user_id, t.title, c.slug
    INTO v_thread_author, v_thread_title, v_category_slug
  FROM public.forum_threads t
  JOIN public.forum_categories c ON c.id = t.category_id
  WHERE t.id = NEW.thread_id;

  -- The thread's own author, if someone else replied and hasn't opted out.
  IF v_thread_author IS NOT NULL AND v_thread_author <> NEW.user_id THEN
    IF COALESCE(
      (SELECT forum_notifications_enabled FROM public.notification_preferences WHERE user_id = v_thread_author),
      true
    ) THEN
      INSERT INTO public.notifications (user_id, type, title, body, link_to)
      VALUES (
        v_thread_author, 'forum_reply', 'New reply to your thread', v_thread_title,
        '/forum/' || v_category_slug || '/' || NEW.thread_id
      );
    END IF;
  END IF;

  -- Every teacher/admin, except the poster, unless they've opted out.
  INSERT INTO public.notifications (user_id, type, title, body, link_to)
  SELECT ur.user_id, 'forum_activity', 'New forum reply', v_thread_title,
         '/forum/' || v_category_slug || '/' || NEW.thread_id
  FROM public.user_roles ur
  WHERE ur.role IN ('admin', 'teacher')
    AND ur.user_id <> NEW.user_id
    AND COALESCE(
      (SELECT forum_notifications_enabled FROM public.notification_preferences WHERE user_id = ur.user_id),
      true
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trg_notify_forum_post
  AFTER INSERT ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_forum_post();


-- Fires on every new thread — teachers/admins only, since a brand-new
-- thread has no "watchers" of its own yet.
CREATE OR REPLACE FUNCTION public.notify_on_forum_thread()
RETURNS TRIGGER AS $$
DECLARE
  v_category_slug TEXT;
BEGIN
  SELECT slug INTO v_category_slug FROM public.forum_categories WHERE id = NEW.category_id;

  INSERT INTO public.notifications (user_id, type, title, body, link_to)
  SELECT ur.user_id, 'forum_thread', 'New forum thread', NEW.title,
         '/forum/' || v_category_slug || '/' || NEW.id
  FROM public.user_roles ur
  WHERE ur.role IN ('admin', 'teacher')
    AND ur.user_id <> NEW.user_id
    AND COALESCE(
      (SELECT forum_notifications_enabled FROM public.notification_preferences WHERE user_id = ur.user_id),
      true
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trg_notify_forum_thread
  AFTER INSERT ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_forum_thread();
