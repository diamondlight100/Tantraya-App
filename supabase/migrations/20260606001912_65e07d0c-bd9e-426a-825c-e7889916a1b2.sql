GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;

INSERT INTO public.courses (slug, title, description, pathway, is_free, price_cents, published) VALUES
('eem', 'Eight Extraordinary Meridians Qigong', 'A complete journey through the eight extraordinary meridians — the deep reservoirs of the body''s vital energy. Theory, practice, and inner alchemy across thirteen lessons.', 'daoist', false, 0, true),
('faery-shamanism', 'Faery Shamanism', 'A journey into the living world between worlds — where magick breathes and the Old Ones wait. Faery lore, the Otherworld, initiatory ballads, the Green Mist, ancestral work and the practical magick of the land.', 'magick', false, 0, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  pathway = EXCLUDED.pathway,
  published = EXCLUDED.published;