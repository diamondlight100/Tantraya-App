-- Repair script for the "material_folders" feature.
--
-- Run this in the Supabase dashboard: your project -> SQL Editor -> paste
-- and run. It's safe to run even if everything already exists — every
-- statement either checks first or drops-then-recreates, so it won't
-- error out or duplicate anything.
--
-- Why you might need this: the app's folder create/read code has been
-- hardened to show a real error message instead of silently saying
-- "no folders" — if after updating the app you see an error toast when
-- creating or viewing folders, copy the exact message it shows you. If
-- it mentions a missing table, missing policy, or permission denied,
-- run this script to reassert the correct state, then try again.

-- 1. Make sure the table exists.
create table if not exists public.material_folders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.materials
  add column if not exists folder_id uuid references public.material_folders(id) on delete set null;

-- 2. Make sure row-level security is on (required for any policy below to
--    matter, and for Supabase to enforce them at all).
alter table public.material_folders enable row level security;

-- 3. Recreate the read policy: any signed-in user can see all folders
--    (folders are just an organizational label — the actual materials
--    inside them are still gated by the materials table's own policies).
drop policy if exists "material_folders_select" on public.material_folders;
create policy "material_folders_select"
  on public.material_folders
  for select
  to authenticated
  using (true);

-- 4. Recreate the write policies: only a teacher or admin (per the
--    has_role() function) can create, rename, or delete folders.
drop policy if exists "material_folders_insert" on public.material_folders;
create policy "material_folders_insert"
  on public.material_folders
  for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'teacher') or public.has_role(auth.uid(), 'admin'));

drop policy if exists "material_folders_update" on public.material_folders;
create policy "material_folders_update"
  on public.material_folders
  for update
  to authenticated
  using (public.has_role(auth.uid(), 'teacher') or public.has_role(auth.uid(), 'admin'));

drop policy if exists "material_folders_delete" on public.material_folders;
create policy "material_folders_delete"
  on public.material_folders
  for delete
  to authenticated
  using (public.has_role(auth.uid(), 'teacher') or public.has_role(auth.uid(), 'admin'));

-- 5. Make sure the authenticated role has the base table grants — RLS
--    policies only take effect on top of these; without them every query
--    fails at the permissions layer before RLS is even checked.
grant select, insert, update, delete on public.material_folders to authenticated;

-- 6. Quick sanity check: confirms your own account currently has the
--    teacher or admin role (needed to create/rename/delete folders).
--    Run this separately and check the result — if it returns no rows or
--    "false", your account isn't flagged as teacher/admin in user_roles,
--    which would explain "create works but nothing shows" or a silent
--    insert failure.
-- select public.has_role(auth.uid(), 'teacher') as is_teacher,
--        public.has_role(auth.uid(), 'admin') as is_admin;
