INSERT INTO public.forum_categories (name, slug, description, pathway)
VALUES ('Bhakti', 'bhakti', 'Devotion, kirtan, and the path of the heart', 'bhakti')
ON CONFLICT (slug) DO NOTHING;
