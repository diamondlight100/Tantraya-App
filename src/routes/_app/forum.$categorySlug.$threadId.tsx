import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Pin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FlairBadge } from "@/components/flair-badge";

export const Route = createFileRoute("/_app/forum/$categorySlug/$threadId")({
  head: () => ({ meta: [{ title: "Thread · Forum" }] }),
  component: ThreadPage,
});

type Author = { display_name: string | null; avatar_url: string | null; flair?: string | null } | null;
type Thread = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  pinned: boolean;
  created_at: string;
  author?: Author;
};
type Post = {
  id: string;
  body: string;
  user_id: string;
  created_at: string;
  author?: Author;
};

function ThreadPage() {
  const { categorySlug, threadId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [reply, setReply] = useState("");
  const [posting, setPosting] = useState(false);

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

  const { data: thread, refetch: refetchThread } = useQuery({
    queryKey: ["forum-thread", threadId],
    queryFn: async (): Promise<Thread | null> => {
      const { data, error } = await supabase
        .from("forum_threads")
        .select("*")
        .eq("id", threadId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const { data: prof } = await supabase
        .from("profiles")
        .select("display_name, avatar_url, flair")
        .eq("id", data.user_id)
        .maybeSingle();
      return { ...data, author: prof };
    },
  });

  const { data: posts, refetch: refetchPosts } = useQuery({
    queryKey: ["forum-posts", threadId],
    queryFn: async (): Promise<Post[]> => {
      const { data, error } = await supabase
        .from("forum_posts")
        .select("*")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      const ids = Array.from(new Set((data ?? []).map((p) => p.user_id)));
      const { data: profs } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, flair")
        .in("id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
      const map = new Map(profs?.map((p) => [p.id, p]) ?? []);
      return (data ?? []).map((p) => ({ ...p, author: map.get(p.user_id) ?? null }));
    },
  });

  useEffect(() => {
    const ch = supabase
      .channel(`forum-thread-${threadId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "forum_posts", filter: `thread_id=eq.${threadId}` },
        () => refetchPosts(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "forum_threads", filter: `id=eq.${threadId}` },
        () => refetchThread(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [threadId, refetchPosts, refetchThread]);

  async function postReply(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (reply.trim().length < 2) return toast.error("Reply is too short");
    setPosting(true);
    const { error } = await supabase
      .from("forum_posts")
      .insert({ thread_id: threadId, user_id: user.id, body: reply.trim() });
    setPosting(false);
    if (error) return toast.error(error.message);
    setReply("");
    refetchPosts();
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this reply?")) return;
    const { error } = await supabase.from("forum_posts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else refetchPosts();
  }

  async function deleteThread() {
    if (!confirm("Delete this thread and all its replies?")) return;
    const { error } = await supabase.from("forum_threads").delete().eq("id", threadId);
    if (error) return toast.error(error.message);
    navigate({ to: "/forum/$categorySlug", params: { categorySlug } });
  }

  async function togglePin() {
    if (!thread) return;
    const { error } = await supabase
      .from("forum_threads")
      .update({ pinned: !thread.pinned })
      .eq("id", threadId);
    if (error) toast.error(error.message);
    else refetchThread();
  }

  if (thread === null) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-muted-foreground">Thread not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/forum/$categorySlug"
        params={{ categorySlug }}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" /> Back to category
      </Link>

      {thread && (
        <>
          <PageHeader title={thread.title} />
          <div className="mb-6 rounded-xl border border-border/60 bg-card/70 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {thread.author?.display_name ?? "Someone"}
                {thread.author?.flair && <FlairBadge flairKey={thread.author.flair} className="mx-1.5" />}
                · {new Date(thread.created_at).toLocaleString()}
                {thread.pinned && (
                  <span className="ml-2 inline-flex items-center gap-1 text-gold">
                    <Pin className="h-3 w-3" /> Pinned
                  </span>
                )}
              </p>
              {isAdmin && (
                <div className="flex gap-1">
                  <button
                    onClick={togglePin}
                    className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-gold"
                    title={thread.pinned ? "Unpin" : "Pin"}
                  >
                    <Pin className="h-4 w-4" />
                  </button>
                  <button
                    onClick={deleteThread}
                    className="rounded p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive"
                    title="Delete thread"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="whitespace-pre-wrap text-foreground">{thread.body}</p>
          </div>
        </>
      )}

      <div className="space-y-3">
        {posts?.map((p) => (
          <div key={p.id} className="group rounded-xl border border-border/60 bg-card/50 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {p.author?.display_name ?? "Someone"}
                {p.author?.flair && <FlairBadge flairKey={p.author.flair} className="mx-1.5" />}
                · {new Date(p.created_at).toLocaleString()}
              </p>
              {(isAdmin || p.user_id === user?.id) && (
                <button
                  onClick={() => deletePost(p.id)}
                  className="rounded p-1 text-muted-foreground opacity-0 transition hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm text-foreground">{p.body}</p>
          </div>
        ))}
        {posts?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No replies yet, say something.</p>
        )}
      </div>

      {user ? (
        <form onSubmit={postReply} className="mt-6 space-y-3 rounded-xl border border-border/60 bg-card/70 p-4">
          <Textarea
            placeholder="Write a reply…"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            maxLength={5000}
            required
          />
          <Button type="submit" disabled={posting}>
            {posting ? "Posting…" : "Post reply"}
          </Button>
        </form>
      ) : (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-gold underline">
            Sign in
          </Link>{" "}
          to reply.
        </p>
      )}
    </div>
  );
}
