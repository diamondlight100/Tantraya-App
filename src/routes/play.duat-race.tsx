import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { DuatRaceLauncher } from "@/components/course/duat-race-online";

export const Route = createFileRoute("/play/duat-race")({
  component: DuatRaceWindow,
});

/**
 * Chrome-free, full-screen home for "The Trial of the Duat", meant to be
 * opened via a real target="_blank" link from the Egyptian Magick course
 * (see duat-race-online.tsx) rather than navigated to directly, so it
 * skips AppShell entirely and fills its own tab/window. Using a genuine
 * anchor navigation (instead of a scripted window.open()) means popup
 * blockers never intervene, real link clicks are always allowed through.
 */
function DuatRaceWindow() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    // Best-effort auto-fullscreen, the window.open() click that got us
    // here counts as user activation in most browsers, so this often
    // succeeds; if the browser blocks it, the manual button below still
    // works.
    document.documentElement.requestFullscreen?.().catch(() => {});
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="flex items-center justify-between border-b border-border/60 bg-card/40 px-4 py-2">
        <p className="font-serif text-sm text-primary">The Trial of the Duat</p>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            {isFullscreen ? "Exit full screen" : "Full screen"}
          </button>
          <button
            onClick={() => window.close()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-destructive/60 hover:text-destructive"
            title="Close window"
          >
            <X className="h-3.5 w-3.5" /> Close
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <DuatRaceLauncher standalone />
      </div>
    </div>
  );
}
