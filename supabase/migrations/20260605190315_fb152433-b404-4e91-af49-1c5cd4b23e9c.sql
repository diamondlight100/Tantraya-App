
CREATE POLICY "anon read forum cats" ON public.forum_categories
  FOR SELECT TO anon USING (true);
GRANT SELECT ON public.forum_categories TO anon;
