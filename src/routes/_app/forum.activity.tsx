import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useRoles } from "@/lib/use-role";
import { MessageSquarePlus, MessageSquareReply, Loader2, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_app/forum/activity")({
  head: () => ({ meta: [{ title: "All Activity · Forum · Tantraya" }] }),
  component: ActivityFeed,
});

type FeedItem = {
  id: string;
  kind: "thread" | "post";
  title: string;
  excerpt: string;
  authorName: string;
  categoryName: string;
  categorySlug: string;
  threadId: string;
  createdAt: string;
};

function excerptOf(text: string, len = 140) {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > len ? clean.slice(0, len) + "…" : clean;
}

function ActivityFeed() {
  const { isTeacher } = useRoles();
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [{ data: threads }, { data: posts }] = await Promise.all([
        supabase
          .from("forum_threads")
          .select("id, title, body, user_id, created_at, forum_categories(name, slug)")
          .order("created_at", { ascending: false })
          .limit(40),
        supabase
          .from("forum_posts")
          .select("id, body, user_id, created_at, thread_id, forum_threads(title, forum_categories(name, slug))")
          .order("created_at", { ascending: false })
          .limit(60),
      ]);

      const userIds = new Set<string>();
      (threads ?? []).forEach((t: any) => userIds.add(t.user_id));
      (posts ?? []).forEach((p: any) => userIds.add(p.user_id));

      const { data: profiles } = userIds.size
        ? await supabase.from("profiles").select("id, display_name").in("id", Array.from(userIds))
        : { data: [] as any[] };
      const nameOf = (id: string) => profiles?.find((p) => p.id === id)?.display_name || "A student";

      const threadItems: FeedItem[] = (threads ?? []).map((t: any) => ({
        id: `thread-${t.id}`,
        kind: "thread",
        title: t.title,
        excerpt: excerptOf(t.body || ""),
        authorName: nameOf(t.user_id),
        categoryName: t.forum_categories?.name ?? "General",
        categorySlug: t.forum_categories?.slug ?? "general",
        threadId: t.id,
        createdAt: t.created_at,
      }));

      const postItems: FeedItem[] = (posts ?? []).map((p: any) => ({
        id: `post-${p.id}`,
        kind: "post",
        title: p.forum_threads?.title ?? "a thread",
        excerpt: excerptOf(p.body || ""),
        authorName: nameOf(p.user_id),
        categoryName: p.forum_threads?.forum_categories?.name ?? "General",
        categorySlug: p.forum_threads?.forum_categories?.slug ?? "general",
        threadId: p.thread_id,
        createdAt: p.created_at,
      }));

      const merged = [...threadItems, ...postItems].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setItems(merged.slice(0, 60));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/forum" className="mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-gold hover:text-primary">
        <ChevronLeft className="h-3 w-3" /> Forum
      </Link>
      <PageHeader
        title="All Activity"
        subtitle={
          isTeacher
            ? "Every new thread and reply, across every pathway, in one place."
            : "Recent threads and replies from across every pathway."
        }
      />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-5 w-5 animate-spin text-gold" /></div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
          <p className="text-muted-foreground">No forum activity yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <Link
              key={it.id}
              to="/forum/$categorySlug/$threadId"
              params={{ categorySlug: it.categorySlug, threadId: it.threadId }}
              className="block rounded-xl border border-border/60 bg-card/50 p-4 transition hover:border-gold/50"
            >
              <div className="flex items-start gap-3">
                {it.kind === "thread" ? (
                  <MessageSquarePlus className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                ) : (
                  <MessageSquareReply className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground/90">
                    <span className="font-semibold text-primary">{it.authorName}</span>{" "}
                    {it.kind === "thread" ? "started" : "replied to"}{" "}
                    <span className="font-semibold text-primary">“{it.title}”</span>
                    <span className="ml-2 rounded-full border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {it.categoryName}
                    </span>
                  </p>
                  {it.excerpt && <p className="mt-1 text-xs text-muted-foreground">{it.excerpt}</p>}
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground/70">
                    {new Date(it.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
