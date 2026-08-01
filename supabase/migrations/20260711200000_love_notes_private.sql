-- Love letters to the Divine are private journal entries, not a shared
-- community wall. Replaces the old "anyone authed can read" policy (which
-- let every user read every other user's notes) with one that only lets
-- someone read their own.

DROP POLICY IF EXISTS "anyone authed can read love notes" ON public.love_notes;

CREATE POLICY "users can read only their own love notes" ON public.love_notes
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());
