import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Plus, X, Lock } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slugify";

export const Route = createFileRoute("/_app/groups/")({
  head: () => ({ meta: [{ title: "Groups · Tantraya" }] }),
  component: GroupsIndex,
});

type Group = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

function GroupsIndex() {
  const { user } = useAuth();
  const { isTeacher } = useRoles();
  const [groups, setGroups] = useState<Group[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [myGroupIds, setMyGroupIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const [{ data: g }, { data: members }] = await Promise.all([
      supabase.from("student_groups").select("*").order("name"),
      supabase.from("group_members").select("group_id,user_id"),
    ]);
    setGroups((g as Group[]) ?? []);
    const counts: Record<string, number> = {};
    const mine = new Set<string>();
    (members ?? []).forEach((m) => {
      counts[m.group_id] = (counts[m.group_id] ?? 0) + 1;
      if (user && m.user_id === user.id) mine.add(m.group_id);
    });
    setMemberCounts(counts);
    setMyGroupIds(mine);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function createGroup() {
    if (!user || !name.trim()) {
      toast.error("Add a name");
      return;
    }
    setSaving(true);
    const { data: group, error } = await supabase
      .from("student_groups")
      .insert({ name: name.trim(), description: description.trim() || null })
      .select()
      .single();
    if (error || !group) {
      setSaving(false);
      toast.error(error?.message ?? "Could not create group");
      return;
    }
    const slug = `${slugify(name)}-${group.id.slice(0, 8)}`;
    const { error: catError } = await supabase.from("forum_categories").insert({
      name: name.trim(),
      slug,
      description: `Private forum for ${name.trim()}`,
      pathway: null,
      group_id: group.id,
    });
    setSaving(false);
    if (catError) {
      toast.error(`Group created, but its forum space failed: ${catError.message}`);
    } else {
      toast.success("Group created, with its own private forum space");
    }
    setName("");
    setDescription("");
    setShowCreate(false);
    load();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Groups"
        subtitle="Private cohorts, each with their own forum space, and homework or material that can be targeted just to them."
      />

      {isTeacher && (
        <div className="mb-6">
          {!showCreate ? (
            <Button
              onClick={() => setShowCreate(true)}
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Plus className="mr-1.5 h-4 w-4" /> New group
            </Button>
          ) : (
            <div className="rounded-2xl border border-gold/40 bg-card/70 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-xl text-primary">New group</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCreate(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mahavidya Cohort 2026"
                  />
                </div>
                <div>
                  <Label>Description (optional)</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="What this cohort is for"
                  />
                </div>
                <Button
                  onClick={createGroup}
                  disabled={saving}
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  {saving ? "Creating…" : "Create group"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <p className="mt-4 text-muted-foreground">
            No groups yet.
            {isTeacher ? " Create one above." : " Ask a teacher to add you to one."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((g) => {
            const isMember = myGroupIds.has(g.id);
            return (
              <Link
                key={g.id}
                to="/groups/$groupId"
                params={{ groupId: g.id }}
                className="group rounded-xl border border-border/60 bg-card/70 p-5 transition hover:border-gold/50"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
                    <Lock className="h-3 w-3" /> Private cohort
                  </span>
                  {isMember && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                      Member
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-xl text-primary group-hover:text-gold">
                  {g.name}
                </h3>
                {g.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>
                )}
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {memberCounts[g.id] ?? 0} {memberCounts[g.id] === 1 ? "member" : "members"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
