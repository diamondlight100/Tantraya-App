
CREATE POLICY "Authed read library-media"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'library-media');

CREATE POLICY "Teachers admins insert library-media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'library-media'
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );

CREATE POLICY "Teachers admins update library-media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'library-media'
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );

CREATE POLICY "Teachers admins delete library-media"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'library-media'
    AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  );
