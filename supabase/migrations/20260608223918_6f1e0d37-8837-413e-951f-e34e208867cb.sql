
CREATE POLICY "Authed users can read materials media"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'materials-media');

CREATE POLICY "Teachers and admins can upload materials media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'materials-media'
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );

CREATE POLICY "Teachers and admins can update materials media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'materials-media'
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );

CREATE POLICY "Teachers and admins can delete materials media"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'materials-media'
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );
