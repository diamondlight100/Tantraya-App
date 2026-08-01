import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─────────────────────────── YouTube IFrame loader ─────────────────────────── */
// Singleton loader for the YouTube IFrame API so multiple segments share one script.

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytReady: Promise<void> | null = null;
function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytReady) return ytReady;
  ytReady = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prior?.();
      resolve();
    };
  });
  return ytReady;
}

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

/* ─────────────────────────── YouTubeSegment ─────────────────────────── */

export type SegmentChapter = {
  label: string;
  start: number; // seconds within `videoId`
  end?: number;  // optional hard stop
};

export function YouTubeSegment({
  videoId,
  start = 0,
  end,
  title,
  description,
  chapters,
  locked,
  completed,
  onComplete,
}: {
  videoId: string;
  start?: number;
  end?: number;
  title?: string;
  description?: string;
  chapters?: SegmentChapter[];
  locked?: boolean;
  completed?: boolean;
  onComplete?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const tickRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(start);
  const [ready, setReady] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  // Build / destroy player
  useEffect(() => {
    if (locked) return;
    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (cancelled || !hostRef.current) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId,
        playerVars: {
          start: Math.floor(start),
          end: end ? Math.floor(end) : undefined,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setPlaying(true);
            if (e.data === 2 || e.data === 0) setPlaying(false);
            if (e.data === 0) setReachedEnd(true);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      if (tickRef.current) window.clearInterval(tickRef.current);
      try { playerRef.current?.destroy?.(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, start, end, locked]);

  // Time ticker, autopause at `end`
  useEffect(() => {
    if (!ready || !playing) return;
    tickRef.current = window.setInterval(() => {
      const t = playerRef.current?.getCurrentTime?.() ?? 0;
      setCurrent(t);
      if (end && t >= end) {
        try { playerRef.current?.pauseVideo?.(); } catch {}
        try { playerRef.current?.seekTo?.(end, true); } catch {}
        setReachedEnd(true);
      }
    }, 500);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [ready, playing, end]);

  const total = (end ?? Math.max(current + 1, start + 60)) - start;
  const elapsed = Math.max(0, Math.min(total, current - start));
  const pct = Math.round((elapsed / total) * 100);

  const play = () => playerRef.current?.playVideo?.();
  const pause = () => playerRef.current?.pauseVideo?.();
  const restart = () => {
    playerRef.current?.seekTo?.(start, true);
    setReachedEnd(false);
    playerRef.current?.playVideo?.();
  };
  const seek = (t: number) => {
    playerRef.current?.seekTo?.(t, true);
    setReachedEnd(false);
    playerRef.current?.playVideo?.();
  };

  if (locked) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-8 text-center">
        <Lock className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-3 font-serif text-lg text-primary">{title ?? "Locked segment"}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Complete the previous segment to unlock.
        </p>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-card/50">
      {(title || description) && (
        <header className="border-b border-border/60 p-4 sm:p-5">
          {title && <h4 className="font-serif text-lg text-primary">{title}</h4>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </header>
      )}

      <div className="relative aspect-video w-full bg-black">
        <div ref={hostRef} className="absolute inset-0 h-full w-full" />
      </div>

      {/* Progress + controls */}
      <div className="p-4 sm:p-5">
        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
          <div
            className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={playing ? pause : play} disabled={!ready}>
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button size="sm" variant="ghost" onClick={restart} disabled={!ready}>
              <RotateCcw className="h-3.5 w-3.5" /> Restart segment
            </Button>
          </div>
          <span className="tabular-nums">
            {fmt(elapsed)} / {fmt(total)}
          </span>
        </div>

        {chapters && chapters.length > 0 && (
          <ul className="mt-4 space-y-1">
            {chapters.map((ch) => {
              const active = current >= ch.start && (!ch.end || current < ch.end);
              return (
                <li key={ch.label}>
                  <button
                    onClick={() => seek(ch.start)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition",
                      active
                        ? "bg-gold/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                    )}
                  >
                    <span>{ch.label}</span>
                    <span className="tabular-nums opacity-70">{fmt(ch.start)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {onComplete && (
          <div className="mt-5 flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
            <p className="text-xs text-muted-foreground">
              {reachedEnd
                ? "Segment finished, mark it complete to unlock the next."
                : "Watch to the end of this segment, then mark complete."}
            </p>
            <Button
              size="sm"
              variant={completed ? "outline" : "default"}
              onClick={onComplete}
              disabled={!completed && !reachedEnd}
            >
              {completed ? (
                <><CheckCircle2 className="h-4 w-4" /> Completed</>
              ) : (
                <><Circle className="h-4 w-4" /> Mark complete</>
              )}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

/* ─────────────────────────── DrippedVideoCourse ─────────────────────────── */
// Series of segments where each unlocks the next as it's marked complete.
// Progress is stored under `storageKey` in localStorage.

export type DripSegment = Omit<
  React.ComponentProps<typeof YouTubeSegment>,
  "locked" | "completed" | "onComplete"
> & { id: string };

export function DrippedVideoCourse({
  segments,
  storageKey,
}: {
  segments: DripSegment[];
  storageKey: string;
}) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const mark = (id: string) => {
    setDone((d) => {
      const next = { ...d, [id]: !d[id] };
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const completedCount = segments.filter((s) => done[s.id]).length;
  const pct = Math.round((completedCount / segments.length) * 100);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-gold/30 bg-card/40 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="text-gold">Series progress</span>
          <span>{completedCount} / {segments.length}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
          <div
            className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {segments.map((seg, i) => {
        const prev = segments[i - 1];
        const locked = i > 0 && !done[prev.id];
        return (
          <YouTubeSegment
            key={seg.id}
            {...seg}
            locked={locked}
            completed={!!done[seg.id]}
            onComplete={() => mark(seg.id)}
          />
        );
      })}
    </div>
  );
}
