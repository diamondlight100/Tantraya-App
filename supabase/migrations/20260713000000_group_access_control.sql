-- Wire the existing (but previously unused) student_groups / group_members
-- tables into real access control: a group can now have its own private
-- forum space, homework can be targeted at just that group, and materials
-- can be gated to group members only.

-- ===== HELPER =====
CREATE OR REPLACE FUNCTION public.is_group_member(_user_id UUID, _group_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.group_members WHERE user_id = _user_id AND group_id = _group_id
  )
$$;

-- ===== WIDEN GROUP MANAGEMENT TO TEACHERS TOO (was admin-only) =====
DROP POLICY IF EXISTS "admin manage groups" ON public.student_groups;
CREATE POLICY "staff manage groups" ON public.student_groups FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

DROP POLICY IF EXISTS "admin manage members" ON public.group_members;
CREATE POLICY "staff manage members" ON public.group_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

-- ===== FORUM CATEGORIES: optional group scoping =====
ALTER TABLE public.forum_categories ADD COLUMN group_id UUID REFERENCES public.student_groups(id) ON DELETE SET NULL;
CREATE INDEX forum_categories_group_idx ON public.forum_categories(group_id);

DROP POLICY IF EXISTS "all auth read forum cats" ON public.forum_categories;
CREATE POLICY "read forum cats" ON public.forum_categories FOR SELECT TO authenticated
  USING (
    group_id IS NULL
    OR public.is_group_member(auth.uid(), group_id)
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'teacher')
  );

-- forum_threads/posts were readable by any authenticated user regardless of
-- category — that has to be tightened too, or a group-only category
-- wouldn't actually be private.
DROP POLICY IF EXISTS "all auth read threads" ON public.forum_threads;
CREATE POLICY "read threads in visible categories" ON public.forum_threads FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forum_categories fc WHERE fc.id = category_id
      AND (
        fc.group_id IS NULL
        OR public.is_group_member(auth.uid(), fc.group_id)
        OR public.has_role(auth.uid(), 'admin')
        OR public.has_role(auth.uid(), 'teacher')
      )
    )
  );

DROP POLICY IF EXISTS "auth create threads" ON public.forum_threads;
CREATE POLICY "create threads in visible categories" ON public.forum_threads FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.forum_categories fc WHERE fc.id = category_id
      AND (
        fc.group_id IS NULL
        OR public.is_group_member(auth.uid(), fc.group_id)
        OR public.has_role(auth.uid(), 'admin')
        OR public.has_role(auth.uid(), 'teacher')
      )
    )
  );

DROP POLICY IF EXISTS "all auth read posts" ON public.forum_posts;
CREATE POLICY "read posts in visible categories" ON public.forum_posts FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.forum_threads ft JOIN public.forum_categories fc ON fc.id = ft.category_id
      WHERE ft.id = thread_id
      AND (
        fc.group_id IS NULL
        OR public.is_group_member(auth.uid(), fc.group_id)
        OR public.has_role(auth.uid(), 'admin')
        OR public.has_role(auth.uid(), 'teacher')
      )
    )
  );

DROP POLICY IF EXISTS "auth create posts" ON public.forum_posts;
CREATE POLICY "create posts in visible categories" ON public.forum_posts FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.forum_threads ft JOIN public.forum_categories fc ON fc.id = ft.category_id
      WHERE ft.id = thread_id
      AND (
        fc.group_id IS NULL
        OR public.is_group_member(auth.uid(), fc.group_id)
        OR public.has_role(auth.uid(), 'admin')
        OR public.has_role(auth.uid(), 'teacher')
      )
    )
  );

-- ===== HOMEWORK: optional group targeting =====
ALTER TABLE public.homework_assignments ADD COLUMN group_id UUID REFERENCES public.student_groups(id) ON DELETE SET NULL;
CREATE INDEX homework_assignments_group_idx ON public.homework_assignments(group_id);

DROP POLICY IF EXISTS "assignments read" ON public.homework_assignments;
CREATE POLICY "assignments read" ON public.homework_assignments FOR SELECT TO authenticated
  USING (
    (published = true AND (group_id IS NULL OR public.is_group_member(auth.uid(), group_id)))
    OR has_role(auth.uid(), 'teacher')
    OR has_role(auth.uid(), 'admin')
  );

-- ===== MATERIALS: optional group gating =====
ALTER TABLE public.materials ADD COLUMN group_id UUID REFERENCES public.student_groups(id) ON DELETE SET NULL;
CREATE INDEX materials_group_idx ON public.materials(group_id);

DROP POLICY IF EXISTS "Anyone authed can read published materials" ON public.materials;
CREATE POLICY "Anyone authed can read published materials" ON public.materials FOR SELECT TO authenticated
  USING (
    (published AND (group_id IS NULL OR public.is_group_member(auth.uid(), group_id)))
    OR author_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'teacher')
  );

-- ===== COURSES: optional group gating (for future course rows) =====
ALTER TABLE public.courses ADD COLUMN group_id UUID REFERENCES public.student_groups(id) ON DELETE SET NULL;
CREATE INDEX courses_group_idx ON public.courses(group_id);

DROP POLICY IF EXISTS "published courses visible" ON public.courses;
CREATE POLICY "published courses visible" ON public.courses FOR SELECT TO authenticated, anon
  USING (
    (published = true AND (group_id IS NULL OR (auth.uid() IS NOT NULL AND public.is_group_member(auth.uid(), group_id))))
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'teacher')
  );
