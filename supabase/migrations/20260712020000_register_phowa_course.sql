-- The Phowa course (Buddhist pathway) is built as a code/data file, not a
-- database row — same pattern as the Magick pathway courses. The sidebar
-- "Courses" page reads from this table, not from the course files, so it
-- needs a published row to show up there. Uses ON CONFLICT so it's safe to
-- re-run.

INSERT INTO public.courses (title, slug, description, pathway, is_free, published)
VALUES
  (
    'Beyond the Threshold: Phowa for Modern Times',
    'phowa',
    'Phowa — the transference of consciousness at the moment of death — adapted for practitioners of any background. Seventeen chapters move from the subtle body and ethical ground through every stage of the practice, closing with the complete sequence, a printable Conscious Transition card, and further reading.',
    'buddhist',
    true,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  published = true,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  pathway = EXCLUDED.pathway;
