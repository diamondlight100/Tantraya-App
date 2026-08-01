import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { useNotifications } from "@/lib/use-notifications";
import { MessageSquare, MessagesSquare, CheckCheck, Loader2, Swords } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Tantraya" }] }),
  component: NotificationsPage,
});

function icon(type: string) {
  if (type === "forum_reply") return MessageSquare;
  if (type === "duat_unlock") return Swords;
  return MessagesSquare;
}

function NotificationsPage() {
  const { notifications, unreadCount, loading, markRead, markAllRead } = useNotifications();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Notifications"
          subtitle={unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up."}
        />
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60 hover:text-gold"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-5 w-5 animate-spin text-gold" /></div>
      ) : notifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
          <p className="font-serif text-xl text-primary">Nothing yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Replies to your threads, and any forum activity, will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = icon(n.type);
            const inner = (
              <div
                className={`flex items-start gap-3 rounded-xl border p-4 transition ${
                  n.read ? "border-border/50 bg-card/30" : "border-gold/40 bg-gold/5"
                }`}
              >
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${n.read ? "text-muted-foreground" : "text-gold"}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm ${n.read ? "text-foreground/80" : "text-primary font-semibold"}`}>{n.title}</p>
                  {n.body && <p className="mt-0.5 truncate text-xs text-muted-foreground">{n.body}</p>}
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground/70">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
                {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />}
              </div>
            );
            return n.link_to ? (
              <a key={n.id} href={n.link_to} onClick={() => !n.read && markRead(n.id)}>
                {inner}
              </a>
            ) : (
              <button key={n.id} onClick={() => !n.read && markRead(n.id)} className="w-full text-left">
                {inner}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
