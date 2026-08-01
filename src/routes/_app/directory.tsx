import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  Music,
  Video as VideoIcon,
  Search,
  Loader2,
  ExternalLink,
  Compass,
  GraduationCap,
} from "lucide-react";
import { pathwayLabels } from "@/lib/homework";
import { courseRegistry } from "@/data/course-registry";
import { matchesCourse } from "@/lib/course-match";

export const Route = createFileRoute("/_app/directory")({
  head: () => ({ meta: [{ title: "Index · Tantraya" }] }),
  component: DirectoryPage,
});

type Format = "text" | "audio" | "video" | "link" | "document" | "image";

type MaterialRow = {
  id: string;
  pathway: string;
  course_slug: string | null;
  title: string;
  description: string | null;
  format: Format;
  media_path: string | null;
  external_url: string | null;
};

// Where to send someone when a piece of material doesn't resolve to a
// specific hardcoded course, one static page per pathway (bhakti lives at
// the top level rather than under /pathways, everything else doesn't).
const PATHWAY_HREF: Record<string, string> = {
  general: "/core",
  daoist: "/pathways/daoist",
  buddhist: "/pathways/buddhist",
  yogic: "/pathways/yogic",
  tantric: "/pathways/tantric",
  magick: "/pathways/magick",
  bhakti: "/bhakti",
};

// Course intro/trailer videos baked straight into a course's own page
// (a hardcoded YouTube id, e.g. Faery Shamanism's intro) never live in the
// `materials` table, so they'd otherwise be invisible here no matter how
// many real materials get uploaded. Turn each one into a synthetic row
// with the same shape so it slots into Documents/Audio/Video and search
// exactly like an uploaded material would.
const introVideoRows: MaterialRow[] = courseRegistry
  .filter((c) => c.introVideoYoutubeId)
  .map((c) => ({
    id: `intro-${c.slug}`,
    pathway: c.pathway,
    course_slug: c.slug,
    title: `${c.title} — Course Intro`,
    description: "The intro video on this course's own page.",
    format: "video" as Format,
    media_path: null,
    external_url: `https://www.youtube.com/watch?v=${c.introVideoYoutubeId}`,
  }));

// Best in-app destination for a piece of material: the specific course
// page it belongs to if its course_slug resolves to one of the hardcoded
// courses, otherwise that pathway's own landing page (which lists whatever
// materials are tagged to it directly).
function resolveHref(m: MaterialRow): string {
  if (m.course_slug) {
    const course = courseRegistry.find(
      (c) => c.pathway === m.pathway && matchesCourse(m.course_slug!, c),
    );
    if (course) return course.href;
    // Several courses share one non-descriptive course_slug tag (e.g.
    // "core", used only to surface a batch of documents on the Core
    // Curriculum page) so an exact/alias slug match alone can't tell them
    // apart. Fall back to matching the material's own title against each
    // course's real title (same loose word-based match used to scope a
    // course's own materials bundle), so e.g. "The Way of Self-Enquiry"
    // still lands on its own course page instead of the generic pathway
    // landing page just because its course_slug is the shared "core" tag.
    const byTitle = courseRegistry.find(
      (c) => c.pathway === m.pathway && matchesCourse(m.title, c),
    );
    if (byTitle) return byTitle.href;
  }
  return PATHWAY_HREF[m.pathway] ?? "/material";
}

function formatIcon(f: Format) {
  if (f === "audio") return <Music className="h-4 w-4" />;
  if (f === "video") return <VideoIcon className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function MaterialRowItem({ m }: { m: MaterialRow }) {
  const [opening, setOpening] = useState(false);
  const href = resolveHref(m);

  async function openFile() {
    if (m.external_url) {
      window.open(m.external_url, "_blank", "noopener,noreferrer");
      return;
    }
    if (!m.media_path) return;
    setOpening(true);
    const { data } = await supabase.storage
      .from("materials-media")
      .createSignedUrl(m.media_path, 60 * 60 * 6);
    setOpening(false);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/50 bg-card/50 p-4">
      <div className="min-w-0 flex items-start gap-3">
        <span className="mt-0.5 text-gold">{formatIcon(m.format)}</span>
        <div className="min-w-0">
          <Link to={href} className="font-serif text-base text-primary hover:text-gold">
            {m.title}
          </Link>
          {m.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{m.description}</p>
          )}
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
            {pathwayLabels[m.pathway] ?? m.pathway}
            {m.course_slug ? ` · ${m.course_slug}` : ""}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          to={href}
          className="rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold/60 hover:text-primary"
        >
          Go to it in the app
        </Link>
        {(m.external_url || m.media_path) && (
          <button
            onClick={openFile}
            disabled={opening}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs text-primary transition hover:bg-gold/15 disabled:opacity-50"
          >
            {opening ? <Loader2 className="h-3 w-3 animate-spin" /> : <ExternalLink className="h-3 w-3" />}
            Open file
          </button>
        )}
      </div>
    </div>
  );
}

// A handful of the same document deliberately live under two different
// pathway/course tags (e.g. a core-curriculum copy of "A Guide to Pranayama"
// alongside its Yogic-pathway copy) so each place a student browses from,
// Core Curriculum or the Yogic pathway, has its own copy to open. That's
// wanted. What's not wanted is the Index listing both as if they were two
// different documents, so only one (whichever is tagged to a real,
// specific course rather than the generic "core" bucket) is kept here.
function normalizeTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

function dedupeForIndex(rows: MaterialRow[]): MaterialRow[] {
  const groups = new Map<string, MaterialRow[]>();
  for (const m of rows) {
    const key = normalizeTitle(m.title);
    const group = groups.get(key);
    if (group) group.push(m);
    else groups.set(key, [m]);
  }
  const result: MaterialRow[] = [];
  for (const group of groups.values()) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }
    // Prefer the copy tagged to a specific course over the generic
    // "core" bucket copy; otherwise just keep the first.
    const specific = group.find((m) => m.course_slug?.toLowerCase() !== "core");
    result.push(specific ?? group[0]);
  }
  return result;
}

// Bonus/supplementary handouts (trackers, bingo cards, workbook extras…)
// belong on their own course pages, not cluttering the Index's alphabetical
// list of "real" documents.
function isBonusOrSupplementary(title: string): boolean {
  return /\bbonus\b|\bsupplementary\b/i.test(title);
}

function DirectoryPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("materials")
        .select("id, pathway, course_slug, title, description, format, media_path, external_url")
        .eq("published", true)
        .in("format", ["document", "audio", "video"])
        .order("title", { ascending: true });
      const raw = [...((data ?? []) as MaterialRow[]), ...introVideoRows].filter(
        (m) => !isBonusOrSupplementary(m.title),
      );
      const combined = dedupeForIndex(raw).sort((a, b) => a.title.localeCompare(b.title));
      setMaterials(combined);
      setLoading(false);
    })();
  }, [user]);

  const documents = useMemo(() => materials.filter((m) => m.format === "document"), [materials]);
  const audio = useMemo(() => materials.filter((m) => m.format === "audio"), [materials]);
  const video = useMemo(() => materials.filter((m) => m.format === "video"), [materials]);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const courseHits = useMemo(() => {
    if (!searching) return [];
    return courseRegistry.filter(
      (c) =>
        c.course !== false &&
        (c.title.toLowerCase().includes(q) ||
          c.slug.includes(q) ||
          (c.aliases ?? []).some((a) => a.toLowerCase().includes(q))),
    );
  }, [q, searching]);

  const pathwayHits = useMemo(() => {
    if (!searching) return [];
    return Object.entries(pathwayLabels).filter(([, label]) => label.toLowerCase().includes(q));
  }, [q, searching]);

  const materialHits = useMemo(() => {
    if (!searching) return [];
    return materials.filter(
      (m) => m.title.toLowerCase().includes(q) || (m.description ?? "").toLowerCase().includes(q),
    );
  }, [q, searching, materials]);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Index"
        subtitle="Every document, audio, and video in the app in one place, filterable by pathway, plus search across all of it."
      />

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pathways, courses, and materials…"
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading the index…
        </div>
      ) : searching ? (
        <div className="space-y-6">
          {courseHits.length === 0 &&
            pathwayHits.length === 0 &&
            materialHits.length === 0 && (
              <p className="text-sm text-muted-foreground">Nothing matches "{query}".</p>
            )}

          {pathwayHits.length > 0 && (
            <section>
              <p className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-gold">
                <Compass className="h-3.5 w-3.5" /> Pathways
              </p>
              <div className="space-y-2">
                {pathwayHits.map(([key, label]) => (
                  <Link
                    key={key}
                    to={PATHWAY_HREF[key] ?? "/pathways"}
                    className="block rounded-xl border border-border/50 bg-card/50 p-4 font-serif text-base text-primary hover:border-gold/50 hover:text-gold"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {courseHits.length > 0 && (
            <section>
              <p className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-gold">
                <GraduationCap className="h-3.5 w-3.5" /> Courses
              </p>
              <div className="space-y-2">
                {courseHits.map((c) => (
                  <Link
                    key={c.href}
                    to={c.href}
                    className="block rounded-xl border border-border/50 bg-card/50 p-4"
                  >
                    <span className="font-serif text-base text-primary hover:text-gold">{c.title}</span>
                    <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
                      {pathwayLabels[c.pathway] ?? c.pathway}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {materialHits.length > 0 && (
            <section>
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">Documents, audio & video</p>
              <div className="space-y-2">
                {materialHits.map((m) => (
                  <MaterialRowItem key={m.id} m={m} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <Tabs defaultValue="documents">
          <TabsList>
            <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
            <TabsTrigger value="audio">Audio ({audio.length})</TabsTrigger>
            <TabsTrigger value="video">Video ({video.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="mt-4 space-y-2">
            {documents.length === 0 && <p className="text-sm text-muted-foreground">No documents published yet.</p>}
            {documents.map((m) => (
              <MaterialRowItem key={m.id} m={m} />
            ))}
          </TabsContent>

          <TabsContent value="audio" className="mt-4 space-y-2">
            {audio.length === 0 && <p className="text-sm text-muted-foreground">No audio published yet.</p>}
            {audio.map((m) => (
              <MaterialRowItem key={m.id} m={m} />
            ))}
          </TabsContent>

          <TabsContent value="video" className="mt-4 space-y-2">
            {video.length === 0 && <p className="text-sm text-muted-foreground">No video published yet.</p>}
            {video.map((m) => (
              <MaterialRowItem key={m.id} m={m} />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
