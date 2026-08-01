-- Teacher/admin read access for student practice analytics.
--
-- The Students overview page needs to show, per student: overall Alchemy
-- progress, current streak, last practice date, and karma points, without
-- exposing minute-by-minute practice detail beyond what's already visible
-- via practice_logs rows (title/date/completed — no journal content, no
-- private notes). These are additive SELECT-only policies; existing
-- "manage own" policies for students are untouched.

-- practices: teacher/admin can read all students' practice definitions
-- (name, body_layer, schedule) needed to compute perfect-day bonuses and
-- show what a student is actually enrolled in doing.
CREATE POLICY "teachers admins read all practices"
  ON public.practices FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- practice_logs: teacher/admin can read all students' completion logs
-- (needed for streak, last-practice-date, and Alchemy mark computation).
CREATE POLICY "teachers admins read all practice logs"
  ON public.practice_logs FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- karma_logs: teacher/admin can read all students' karma point totals
-- (feeds into the same overall Alchemy total shown to the student).
CREATE POLICY "teachers admins read all karma logs"
  ON public.karma_logs FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- user_roles: teacher/admin need to read the full roster to know who the
-- students actually are (previously only self-readable).
CREATE POLICY "teachers admins read all user roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
