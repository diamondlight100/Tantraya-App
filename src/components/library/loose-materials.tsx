import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { courseRegistry } from "@/data/course-registry";
import { slugify } from "@/lib/slugify";
import {
  FileText,
  Music,
  Video as VideoIcon,
  Link as LinkIcon,
  Download,
  Loader2,
  BookOpen,
} from "lucide-react";
import { ManualReader } from "@/components/course/manual-reader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Format = "text" | "audio" | "video" | "link" | "document";

type Material = {
  id: string;
  pathway: string;
  title: string;
  description: string | null;
  format: Format;
  body: string | null;
  media_path: string | null;
  external_url: string | null;
};

function formatIcon(f: Format) {
  if (f === "text") return <FileText className="h-4 w-4" />;
  if (f === "audio") return <Music className="h-4 w-4" />;
  if (f === "video") return <VideoIcon className="h-4 w-4" />;
  if (f === "document") return <Download className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
}

/**
 * Every published, non-image material that isn't tied to a course (no
 * course_slug, not filed in a folder named after one), e.g. a lone PDF like
 * Yoga Nidra with nowhere else to live yet. Shown here in addition to (not
 * instead of) its pathway page, grouped by pathway.
 */
export function LooseMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [readingId, setReadingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data }, { data: folderRows }] = await Promise.all([
        supabase
          .from("materials")
          .select(
            "id, pathway, title, description, format, body, media_path, external_url, course_slug, folder_id",
          )
          .eq("published", true)
          .neq("format", "image"),
        supabase.from("material_folders").select("id, name"),
      ]);
      if (cancelled) return;

      const allRows = data ?? [];
      const folders = folderRows ?? [];
      const courseSlugs = new Set([
        ...courseRegistry.map((c) => c.slug),
        ...allRows.filter((m) => m.course_slug).map((m) => m.course_slug as string),
      ]);
      const courseFolderIds = new Set(
        folders.filter((f) => courseSlugs.has(slugify(f.name))).map((f) => f.id),
      );
      const rows = allRows.filter(
        (m) => !m.course_slug && !(m.folder_id && courseFolderIds.has(m.folder_id)),
      ) as Material[];
      setMaterials(rows);

      const entries = await Promise.all(
        rows
          .filter((m) => m.media_path)
          .map(async (m) => {
            const { data: signed } = await supabase.storage
              .from("materials-media")
              .createSignedUrl(m.media_path!, 60 * 60 * 6);
            return [m.id, signed?.signedUrl ?? ""] as const;
          }),
      );
      if (!cancelled) {
        setUrls(Object.fromEntries(entries));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    );
  }

  if (materials.length === 0) return null;

  const byPathway: Record<string, Material[]> = {};
  for (const m of materials) (byPathway[m.pathway] ??= []).push(m);

  return (
    <div className="mb-12">
      <h2 className="mb-1 border-b border-border/40 pb-1 font-serif text-2xl text-gold">
        From your teachers
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Uploaded material not yet part of a course.
      </p>
      <div className="space-y-6">
        {Object.entries(byPathway).map(([pathway, rows]) => (
          <div key={pathway}>
            <p className="mb-2 text-xs uppercase tracking-wider text-gold">{pathway}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {rows.map((m) => {
                const url = urls[m.id];
                return (
                  <div key={m.id} className="rounded-xl border border-border/60 bg-card/50 p-4">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                      {formatIcon(m.format)} {m.format}
                    </div>
                    <h3 className="mt-1 font-serif text-base text-primary">{m.title}</h3>
                    {m.description && (
                      <p className="mt-1 text-xs text-muted-foreground">{m.description}</p>
                    )}
                    <div className="mt-3">
                      {m.format === "video" && url && (
                        <video src={url} controls className="w-full rounded-lg bg-black" />
                      )}
                      {m.format === "audio" && url && (
                        <audio src={url} controls className="w-full" />
                      )}
                      {m.format === "link" && m.external_url && (
                        <a
                          href={m.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gold underline"
                        >
                          <LinkIcon className="h-3 w-3" /> Open link
                        </a>
                      )}
                      {m.format === "document" && url && (
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setReadingId(m.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1.5 text-[11px] uppercase tracking-widest text-primary hover:bg-gold/15"
                          >
                            <BookOpen className="h-3 w-3" /> Read
                          </button>
                          <a
                            href={url}
                            download
                            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
                          >
                            <Download className="h-3 w-3" /> Download
                          </a>
                        </div>
                      )}
                      {m.format === "text" && m.body && (
                        <p className="whitespace-pre-wrap text-xs text-foreground/85 line-clamp-4">
                          {m.body}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!readingId} onOpenChange={(v) => !v && setReadingId(null)}>
        <DialogContent className="flex h-[96vh] w-[96vw] max-w-[96vw] flex-col gap-0 p-0">
          {readingId &&
            (() => {
              const reading = materials.find((m) => m.id === readingId);
              const readingUrl = readingId ? urls[readingId] : undefined;
              if (!reading || !readingUrl) return null;
              return (
                <>
                  <DialogHeader className="border-b border-border/60 p-4">
                    <DialogTitle className="font-serif">{reading.title}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden bg-black/40">
                    <ManualReader
                      url={readingUrl}
                      materialId={reading.id}
                      title={reading.title}
                      className="h-full"
                    />
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
