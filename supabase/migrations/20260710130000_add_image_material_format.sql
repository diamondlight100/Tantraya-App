ALTER TABLE public.materials DROP CONSTRAINT IF EXISTS materials_format_check;
ALTER TABLE public.materials ADD CONSTRAINT materials_format_check
  CHECK (format IN ('text','audio','video','link','document','image'));
