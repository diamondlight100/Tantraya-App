import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { MessagesSquare, ListTree, Lock } from "lucide-react";
import { useRoles } from "@/lib/use-role";

export const Route = createFileRoute("/_app/forum/")({
  head: () => ({ meta: [{ title: "Forum · Tantraya" }] }),
  component: ForumIndex,
});

type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  pathway: string | null;
  group_id: string | null;
  thread_count: number;
};

function ForumIndex() {
  const { isTeacher } = useRoles();
  const { data: cats, refetch } = useQuery({
    queryKey: ["forum-cats-with-counts"],
    queryFn: async (): Promise<CategoryWithCount[]> => {
      const { data: categories, error } = await supabase
        .from("forum_categories")
        .select("*")
        .order("name");
      if (error) throw error;

      const counts = await Promise.all(
        (categories ?? []).map(async (c) => {
          const { count } = await supabase
            .from("forum_threads")
            .select("*", { count: "exact", head: true })
            .eq("category_id", c.id);
          return { ...c, thread_count: count ?? 0 };
        }),
      );
      return counts;
    },
  });

  useEffect(() => {
    const ch = supabase
      .channel("forum-index")
      .on("postgres_changes", { event: "*", schema: "public", table: "forum_threads" }, () =>
        refetch(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [refetch]);

  const groupCats = (cats ?? []).filter((c) => c.group_id);
  const pathwayCats = (cats ?? []).filter((c) => !c.group_id);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Forum"
        subtitle="Ask questions, share practice notes, learn together. Each pathway has its own space."
      />
      <Link
        to="/forum/activity"
        className="mb-6 flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/5 p-4 transition hover:border-gold"
      >
        <ListTree className="h-5 w-5 shrink-0 text-gold" />
        <div>
          <p className="font-serif text-lg text-primary">All Activity</p>
          <p className="text-xs text-foreground/85">
            {isTeacher
              ? "Every thread and reply across every pathway, in one feed, the fastest way to see what's happening."
              : "See recent threads and replies from across every pathway, not just one at a time."}
          </p>
        </div>
      </Link>

      {groupCats.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-gold">
            <Lock className="h-3.5 w-3.5" /> Your Groups
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {groupCats.map((c) => (
              <Link
                key={c.id}
                to="/forum/$categorySlug"
                params={{ categorySlug: c.slug }}
                className="group rounded-xl border border-gold/40 bg-gold/5 p-5 transition hover:border-gold"
              >
                <p className="text-xs uppercase tracking-wider text-gold">Private cohort</p>
                <h3 className="mt-2 font-serif text-xl text-primary">{c.name}</h3>
                {c.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                )}
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MessagesSquare className="h-3.5 w-3.5" />
                  {c.thread_count} {c.thread_count === 1 ? "thread" : "threads"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {pathwayCats.map((c) => (
          <Link
            key={c.id}
            to="/forum/$categorySlug"
            params={{ categorySlug: c.slug }}
            className="group rounded-xl border border-border/60 bg-card/70 p-5 transition hover:border-gold/40 hover:bg-card"
          >
            <p className="text-xs uppercase tracking-wider text-gold">{c.pathway ?? "general"}</p>
            <h3 className="mt-2 font-serif text-xl text-primary">{c.name}</h3>
            {c.description && <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>}
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessagesSquare className="h-3.5 w-3.5" />
              {c.thread_count} {c.thread_count === 1 ? "thread" : "threads"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
