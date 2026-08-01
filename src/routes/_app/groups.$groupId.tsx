import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessagesSquare, Users, UserPlus, UserMinus, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/groups/$groupId")({
  head: () => ({ meta: [{ title: "Group · Tantraya" }] }),
  component: GroupDetail,
});

type Group = { id: string; name: string; description: string | null };
type Profile = { id: string; display_name: string | null };
type ForumCategory = { id: string; slug: string; name: string };

function GroupDetail() {
  const { groupId } = Route.useParams();
  const { user } = useAuth();
  const { isTeacher } = useRoles();
  const [group, setGroup] = useState<Group | null | undefined>(undefined);
  const [memberIds, setMemberIds] = useState<Set<string>>(new Set());
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [category, setCategory] = useState<ForumCategory | null>(null);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    const [{ data: g }, { data: members }, { data: cat }] = await Promise.all([
      supabase.from("student_groups").select("*").eq("id", groupId).maybeSingle(),
      supabase.from("group_members").select("user_id").eq("group_id", groupId),
      supabase
        .from("forum_categories")
        .select("id,slug,name")
        .eq("group_id", groupId)
        .maybeSingle(),
    ]);
    setGroup((g as Group) ?? null);
    setMemberIds(new Set((members ?? []).map((m) => m.user_id)));
    setCategory((cat as ForumCategory) ?? null);
  }

  async function loadProfiles() {
    const { data } = await supabase
      .from("profiles")
      .select("id,display_name")
      .order("display_name");
    setProfiles((data as Profile[]) ?? []);
  }

  useEffect(() => {
    load();
    if (isTeacher) loadProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, isTeacher]);

  const isMember = user ? memberIds.has(user.id) : false;

  const members = useMemo(() => profiles.filter((p) => memberIds.has(p.id)), [profiles, memberIds]);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return profiles
      .filter((p) => !memberIds.has(p.id))
      .filter((p) => (p.display_name ?? "").toLowerCase().includes(q))
      .slice(0, 10);
  }, [search, profiles, memberIds]);

  async function addMember(profileId: string) {
    setBusyId(profileId);
    const { error } = await supabase
      .from("group_members")
      .insert({ group_id: groupId, user_id: profileId });
    setBusyId(null);
    if (error) return toast.error(error.message);
    setSearch("");
    load();
  }

  async function removeMember(profileId: string) {
    setBusyId(profileId);
    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", profileId);
    setBusyId(null);
    if (error) return toast.error(error.message);
    load();
  }

  if (group === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }
  if (group === null) throw notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/groups"
        className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary"
      >
        <ChevronLeft className="h-3 w-3" /> Groups
      </Link>

      <PageHeader
        title={group.name}
        subtitle={group.description ?? "A private cohort with its own forum space."}
      />

      <div className="mb-6 flex flex-wrap gap-3">
        {category ? (
          isMember || isTeacher ? (
            <Link
              to="/forum/$categorySlug"
              params={{ categorySlug: category.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/5 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-gold/10"
            >
              <MessagesSquare className="h-3.5 w-3.5 text-gold" /> Group forum
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> Forum is members-only
            </span>
          )
        ) : null}
      </div>

      {!isTeacher && !isMember && (
        <p className="mb-6 text-sm text-muted-foreground">
          You're not a member of this group yet. Ask a teacher to add you if you believe you should
          be.
        </p>
      )}

      <div className="rounded-xl border border-border/60 bg-card/70 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-serif text-lg text-primary">
          <Users className="h-4 w-4 text-gold" /> Members ({members.length})
        </h3>

        {isTeacher && (
          <div className="mb-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name to add…"
            />
            {searchResults.length > 0 && (
              <div className="mt-2 divide-y divide-border/40 rounded-lg border border-border/60">
                {searchResults.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-foreground/90">
                      {p.display_name ?? "Unnamed"}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={busyId === p.id}
                      onClick={() => addMember(p.id)}
                    >
                      <UserPlus className="mr-1 h-3.5 w-3.5" /> Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground">No members yet.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {members.map((m) => (
              <li key={m.id} className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground/90">{m.display_name ?? "Unnamed"}</span>
                {isTeacher && (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busyId === m.id}
                    onClick={() => removeMember(m.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <UserMinus className="mr-1 h-3.5 w-3.5" /> Remove
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
