-- Online play for "The Trial of the Duat" (Egyptian Magick board game).
-- One row per game. State is the full serialized game engine state (jsonb) —
-- client-authoritative: whichever player just acted writes the new state,
-- the other player's browser picks it up via Realtime. A short `code` is
-- how a second player finds the game (shared as an invite code/link).

CREATE TABLE public.duat_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  host_team TEXT NOT NULL DEFAULT 'osiris' CHECK (host_team IN ('osiris', 'set')),
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'finished')),
  state JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.duat_games TO authenticated;
GRANT ALL ON public.duat_games TO service_role;

ALTER TABLE public.duat_games ENABLE ROW LEVEL SECURITY;

-- Participants can always see their own game. A waiting game with no guest
-- yet is also visible to anyone (so a friend can look it up by code to join —
-- the code itself is the shared secret, not the row id).
CREATE POLICY "participants or joinable games are visible" ON public.duat_games
  FOR SELECT TO authenticated
  USING (host_id = auth.uid() OR guest_id = auth.uid() OR (status = 'waiting' AND guest_id IS NULL));

CREATE POLICY "authenticated users can create a game as host" ON public.duat_games
  FOR INSERT TO authenticated
  WITH CHECK (host_id = auth.uid());

-- Two separate permissive UPDATE policies (Postgres ORs them together):
--  1) an existing participant can push new game state.
--  2) anyone can claim an open seat on a waiting game (this is "joining").
CREATE POLICY "participants can update game state" ON public.duat_games
  FOR UPDATE TO authenticated
  USING (host_id = auth.uid() OR guest_id = auth.uid())
  WITH CHECK (host_id = auth.uid() OR guest_id = auth.uid());

CREATE POLICY "anyone can join an open waiting game" ON public.duat_games
  FOR UPDATE TO authenticated
  USING (status = 'waiting' AND guest_id IS NULL)
  WITH CHECK (guest_id = auth.uid());

CREATE INDEX duat_games_code_idx ON public.duat_games (code);
CREATE INDEX duat_games_participants_idx ON public.duat_games (host_id, guest_id, status);

CREATE TRIGGER trg_duat_games_updated BEFORE UPDATE ON public.duat_games
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='duat_games') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.duat_games';
  END IF;
END $$;
