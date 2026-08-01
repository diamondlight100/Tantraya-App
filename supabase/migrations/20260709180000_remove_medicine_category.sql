-- Paul does not teach a Medicine pathway; remove the pre-seeded forum
-- category for it. The 'medicine' value stays defined in the pathway enum
-- (harmless if unused) since Postgres doesn't support cleanly dropping a
-- single enum value, but nothing in the app can select or display it anymore.

DELETE FROM public.forum_categories WHERE slug = 'medicine';
