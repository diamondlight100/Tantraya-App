-- The Magick pathway's courses (Faery Shamanism, Lucid Dreaming, and now
-- Ancient Egyptian Magick) are built as code/data files, not database rows —
-- that's how they render correctly when opened directly. But the sidebar
-- "Courses" page reads from this table, not from the course files, so none
-- of them were ever showing up there. This adds all three as published rows.
-- Uses ON CONFLICT so it's safe to re-run and also fixes the case where a
-- row already exists but was never published.

INSERT INTO public.courses (title, slug, description, pathway, is_free, published)
VALUES
  (
    'Faery Shamanism',
    'faery-shamanism',
    'A journey into the living world between worlds — where magick breathes and the Old Ones wait. Faery lore, the Otherworld, initiatory ballads, the Green Mist, ancestral work and the practical magick of the land.',
    'magick',
    true,
    true
  ),
  (
    'Lucid Dreaming & the Yogas of Dream and Sleep',
    'lucid-dreaming',
    'A comprehensive journey through the science, history, and sacred practices of conscious dreaming — from Western neuroscience to Tibetan Dream Yoga, Taoist Sleeping Gong, and Shamanic pathways into the Otherworld.',
    'magick',
    true,
    true
  ),
  (
    'Ancient Egyptian Magick',
    'egyptian-magick',
    'A deep journey into the Mysteries of Khem — Heka and Ma''at, the cosmic architecture of temple and Duat, the Neteru and the eight-fold soul, and living ritual with Isis, Osiris, Anubis, Sekhmet, and Thoth.',
    'magick',
    true,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  published = true,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  pathway = EXCLUDED.pathway;
