
-- Drop old placeholder
DROP TABLE IF EXISTS public.homework_submissions CASCADE;

-- ============== ASSIGNMENTS ==============
CREATE TABLE public.homework_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  instructions TEXT,
  pathway pathway,
  course_slug TEXT,
  practice_slug TEXT,
  video_url TEXT,
  audio_url TEXT,
  attachment_url TEXT,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  max_points INTEGER NOT NULL DEFAULT 100,
  alchemy_marks INTEGER NOT NULL DEFAULT 5,
  due_at TIMESTAMPTZ,
  published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homework_assignments TO authenticated;
GRANT ALL ON public.homework_assignments TO service_role;
ALTER TABLE public.homework_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "assignments read"
  ON public.homework_assignments FOR SELECT TO authenticated
  USING (published = true OR has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "assignments teachers manage"
  ON public.homework_assignments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- ============== SUBMISSIONS ==============
CREATE TABLE public.homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.homework_assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  written_response TEXT,
  video_url TEXT,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  shared BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','graded')),
  submitted_at TIMESTAMPTZ,
  feedback TEXT,
  points_awarded INTEGER,
  alchemy_marks_awarded INTEGER,
  graded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (assignment_id, student_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homework_submissions TO authenticated;
GRANT ALL ON public.homework_submissions TO service_role;
ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "submissions student read own"
  ON public.homework_submissions FOR SELECT TO authenticated
  USING (
    student_id = auth.uid()
    OR has_role(auth.uid(), 'teacher')
    OR has_role(auth.uid(), 'admin')
    OR (shared = true AND status IN ('submitted','graded'))
  );
CREATE POLICY "submissions student insert own"
  ON public.homework_submissions FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());
CREATE POLICY "submissions student update own"
  ON public.homework_submissions FOR UPDATE TO authenticated
  USING (student_id = auth.uid() AND status <> 'graded')
  WITH CHECK (student_id = auth.uid());
CREATE POLICY "submissions teachers grade"
  ON public.homework_submissions FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "submissions teachers delete"
  ON public.homework_submissions FOR DELETE TO authenticated
  USING (student_id = auth.uid() OR has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- ============== AWARDS ==============
CREATE TABLE public.student_awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  awarded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  submission_id UUID REFERENCES public.homework_submissions(id) ON DELETE SET NULL,
  alchemy_marks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_awards TO authenticated;
GRANT ALL ON public.student_awards TO service_role;
ALTER TABLE public.student_awards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "awards student read own"
  ON public.student_awards FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "awards teachers grant"
  ON public.student_awards FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "awards teachers manage"
  ON public.student_awards FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "awards teachers delete"
  ON public.student_awards FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- triggers
CREATE TRIGGER homework_assignments_updated BEFORE UPDATE ON public.homework_assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER homework_submissions_updated BEFORE UPDATE ON public.homework_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- indexes
CREATE INDEX homework_submissions_assignment_idx ON public.homework_submissions(assignment_id);
CREATE INDEX homework_submissions_student_idx ON public.homework_submissions(student_id);
CREATE INDEX homework_assignments_pathway_idx ON public.homework_assignments(pathway);
CREATE INDEX student_awards_student_idx ON public.student_awards(student_id);
