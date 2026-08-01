INSERT INTO public.forum_categories (name, slug, description, pathway)
VALUES ('Yogic Path', 'yogic', 'Āsana, prāṇāyāma, the eight limbs, the yoga of the body and breath', 'yogic')
ON CONFLICT (slug) DO NOTHING;
