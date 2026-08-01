
CREATE POLICY "homework media student own"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'homework-media' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'homework-media' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "homework media teachers read all"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'homework-media' AND (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin')));

CREATE POLICY "homework media teachers write assignments"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'homework-media' AND (storage.foldername(name))[1] = 'assignments' AND (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin')))
  WITH CHECK (bucket_id = 'homework-media' AND (storage.foldername(name))[1] = 'assignments' AND (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin')));
