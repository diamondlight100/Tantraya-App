-- Fix: teachers create groups (student_groups) and the UI immediately tries to create a
-- matching private forum_categories row for that group. The "staff manage forum cats" policy
-- only allowed admin to write, so any teacher creating a group got "Group created, but its
-- forum space failed: new row violates row-level security policy for table forum_categories".
-- Bring the write policy in line with the existing read policy (which already treats teacher
-- and admin equivalently) so teachers can manage forum categories tied to their own groups.
DROP POLICY IF EXISTS "staff manage forum cats" ON public.forum_categories;
CREATE POLICY "staff manage forum cats" ON public.forum_categories
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
