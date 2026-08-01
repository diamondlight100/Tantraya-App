import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Pin, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { FlairBadge } from "@/components/flair-badge";

export const Route = createFileRoute("/_app/forum/$categorySlug/")({
  head: ({ params }) => ({ meta: [{ title: `${params.categorySlug} · Forum` }] }),
  component: CategoryPage,
});

type ThreadRow = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  category_id: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  author?: { display_name: string | null; avatar_url: string | null; flair?: string | null } | null;
  reply_count?: number;
};

function CategoryPage() {
  const { categorySlug } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setIsAdmin(!!data?.some((r) => r.role === "admin" || r.role === "teacher"));
      });
  }, [user]);

  const { data: category } = useQuery({
    queryKey: ["forum-cat", categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .eq("slug", categorySlug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: threads, refetch } = useQuery({
    enabled: !!category?.id,
    queryKey: ["forum-threads", category?.id],
    queryFn: async (): Promise<ThreadRow[]> => {
      const { data, error } = await supabase
        .from("forum_threads")
        .select("*")
        .eq("category_id", category!.id)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;

      const authorIds = Array.from(new Set((data ?? []).map((t) => t.user_id)));
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, flair")
        .in("id", authorIds.length ? authorIds : ["00000000-0000-0000-0000-000000000000"]);
      const map = new Map(profiles?.map((p) => [p.id, p]) ?? []);

      const withCounts = await Promise.all(
        (data ?? []).map(async (t) => {
          const { count } = await supabase
            .from("forum_posts")
            .select("*", { count: "exact", head: true })
            .eq("thread_id", t.id);
          return { ...t, author: map.get(t.user_id) ?? null, reply_count: count ?? 0 };
        }),
      );
      return withCounts;
    },
  });

  useEffect(() => {
    if (!category?.id) return;
    const ch = supabase
      .channel(`forum-cat-${category.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "forum_threads", filter: `category_id=eq.${category.id}` },
        () => refetch(),
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "forum_posts" }, () => refetch())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [category?.id, refetch]);

  async function createThread(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !category) return;
    if (title.trim().length < 3) return toast.error("Title must be at least 3 characters");
    if (body.trim().length < 5) return toast.error("Please write a bit more");
    setSubmitting(true);
    const { data, error } = await supabase
      .from("forum_threads")
      .insert({ title: title.trim(), body: body.trim(), user_id: user.id, category_id: category.id })
      .select()
      .single();
    setSubmitting(false);
    if (error) return toast.error(error.message);
    setTitle("");
    setBody("");
    setComposerOpen(false);
    navigate({ to: "/forum/$categorySlug/$threadId", params: { categorySlug, threadId: data.id } });
  }

  async function deleteThread(id: string) {
    if (!confirm("Delete this thread and all its replies?")) return;
    const { error } = await supabase.from("forum_threads").delete().eq("id", id);
    if (error) toast.error(error.message);
    else refetch();
  }

  async function togglePin(t: ThreadRow) {
    const { error } = await supabase
      .from("forum_threads")
      .update({ pinned: !t.pinned })
      .eq("id", t.id);
    if (error) toast.error(error.message);
    else refetch();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/forum" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> All categories
      </Link>
      <PageHeader title={category?.name ?? "Loading…"} subtitle={category?.description ?? undefined} />

      {user && (
        <div className="mb-6">
          {!composerOpen ? (
            <Button onClick={() => setComposerOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> New thread
            </Button>
          ) : (
            <form onSubmit={createThread} className="space-y-3 rounded-xl border border-border/60 bg-card/70 p-5">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                required
              />
              <Textarea
                placeholder="What's on your mind?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                maxLength={5000}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Posting…" : "Post thread"}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setComposerOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="space-y-3">
        {threads?.length === 0 && (
          <p className="rounded-xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
            No threads yet. Be the first to start a conversation.
          </p>
        )}
        {threads?.map((t) => (
          <div key={t.id} className="group rounded-xl border border-border/60 bg-card/70 p-4 transition hover:border-gold/40">
            <div className="flex items-start justify-between gap-3">
              <Link
                to="/forum/$categorySlug/$threadId"
                params={{ categorySlug, threadId: t.id }}
                className="flex-1"
              >
                <div className="flex items-center gap-2">
                  {t.pinned && <Pin className="h-3.5 w-3.5 text-gold" />}
                  <h3 className="font-serif text-lg text-primary group-hover:text-gold">{t.title}</h3>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.author?.display_name ?? "Someone"}
                  {t.author?.flair && <FlairBadge flairKey={t.author.flair} className="mx-1.5" />}
                  · {new Date(t.created_at).toLocaleDateString()} ·{" "}
                  {t.reply_count} {t.reply_count === 1 ? "reply" : "replies"}
                </p>
              </Link>
              {isAdmin && (
                <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    onClick={() => togglePin(t)}
                    title={t.pinned ? "Unpin" : "Pin"}
                    className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-gold"
                  >
                    <Pin className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteThread(t.id)}
                    title="Delete"
                    className="rounded p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
