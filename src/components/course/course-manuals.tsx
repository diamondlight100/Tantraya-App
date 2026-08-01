import { useEffect, useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { matchesCourse } from "@/lib/course-match";
import { courseRegistry } from "@/data/course-registry";

type CourseManual = {
  id: string;
  title: string;
  description: string | null;
  media_path: string | null;
  course_slug: string | null;
};

/**
 * Shows any published "document" (PDF) materials tagged with this course , 
 * e.g. a course manual uploaded via the Materials page. Matching is done
 * with `matchesCourse` (exact slug, registered alias, or a loose word-based
 * title match) rather than a strict DB-level equality check, since teachers
 * type the course field freehand and rarely match the exact slug every
 * time. Renders nothing if there's nothing to show, so it's always safe to
 * include.
 */
export function CourseManuals({
  pathway,
  courseSlug,
  courseTitle,
  courseSlugAliases,
}: {
  pathway: string;
  courseSlug: string;
  /** The course's real display title, enabling loose word-based matching. */
  courseTitle?: string;
  /** Other course_slug values known to mean this same course. */
  courseSlugAliases?: string[];
}) {
  const [manuals, setManuals] = useState<CourseManual[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("materials")
        .select("id, title, description, media_path, course_slug")
        .eq("pathway", pathway)
        .eq("format", "document")
        .eq("published", true)
        .order("created_at", { ascending: true });

      if (cancelled) return;
      const registryEntry = courseRegistry.find((c) => c.slug === courseSlug);
      const course = {
        slug: courseSlug,
        title: courseTitle ?? registryEntry?.title,
        aliases: [...(registryEntry?.aliases ?? []), ...(courseSlugAliases ?? [])],
      };
      const rows = ((data ?? []) as CourseManual[]).filter(
        (m) => m.course_slug && matchesCourse(m.course_slug, course),
      );
      setManuals(rows);

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
      if (!cancelled) setUrls(Object.fromEntries(entries));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [pathway, courseSlug]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking for a course manual…
      </div>
    );
  }

  if (manuals.length === 0) return null;

  return (
    <section className="rounded-2xl border border-gold/40 bg-gold/5 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Course manual</p>
      <div className="mt-3 space-y-3">
        {manuals.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
            <div className="min-w-0">
              <h3 className="font-serif text-lg text-primary">{m.title}</h3>
              {m.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">{m.description}</p>
              )}
            </div>
            {urls[m.id] && (
              <div className="flex shrink-0 gap-2">
                <a
                  href={urls[m.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-gold/15"
                >
                  <FileText className="h-3.5 w-3.5" /> View
                </a>
                <a
                  href={urls[m.id]}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
