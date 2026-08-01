
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.guard_thread_pin() FROM PUBLIC, anon, authenticated;
ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER;
