import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useRoles } from "@/lib/use-role";
import { cn } from "@/lib/utils";
import {
  FileText,
  Music,
  Video as VideoIcon,
  Link as LinkIcon,
  Download,
  Loader2,
  Settings,
  BookOpen,
  FolderOpen,
  Plus,
  X,
  Pencil,
  FolderMinus,
  Trash2,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { AddMaterialToPractices } from "@/components/course/add-material-to-practices";
import { ManualReader } from "@/components/course/manual-reader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MaterialUploadForm } from "@/components/course/material-upload-form";
import { slugify } from "@/lib/slugify";
import { courseRegistry } from "@/data/course-registry";
import { matchesCourse } from "@/lib/course-match";

type Format = "text" | "audio" | "video" | "link" | "document" | "image";

type Material = {
  id: string;
  author_id: string;
  pathway: string;
  title: string;
  description: string | null;
  format: Format;
  body: string | null;
  media_path: string | null;
  external_url: string | null;
  folder_id: string | null;
  course_slug: string | null;
  published: boolean;
  group_id: string | null;
  created_at: string;
};

type FolderInfo = { id: string; name: string };
type MaterialGroup = { title: string; slugs: string[] };

function formatIcon(f: Format) {
  if (f === "text") return <FileText className="h-4 w-4" />;
  if (f === "audio") return <Music className="h-4 w-4" />;
  if (f === "video") return <VideoIcon className="h-4 w-4" />;
  if (f === "document") return <Download className="h-4 w-4" />;
  if (f === "image") return <ImageIcon className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
}

function YouTubeEmbed({ url }: { url: string }) {
  const idMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  const id = idMatch?.[1];
  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gold underline"
      >
        Watch video
      </a>
    );
  }
  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
        title="video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function MaterialTile({
  m,
  url,
  pathway,
  onRead,
  isTeacher,
  showRemoveFromCourse,
  onEdit,
  onRemoveFromCourse,
  onDelete,
}: {
  m: Material;
  url: string | undefined;
  pathway: string;
  onRead: () => void;
  isTeacher?: boolean;
  /** Only true when this tile is rendered inside a course-scoped view, a
   *  pathway-wide (no courseSlug) listing has no course to remove it from. */
  showRemoveFromCourse?: boolean;
  onEdit?: () => void;
  onRemoveFromCourse?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-gold">
          {formatIcon(m.format)} {m.format}
        </span>
        {isTeacher && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              title="Edit"
              onClick={onEdit}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-gold/10 hover:text-gold"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            {showRemoveFromCourse && (
              <button
                type="button"
                title="Remove from this course (keeps it in the Materials library)"
                onClick={onRemoveFromCourse}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-gold/10 hover:text-gold"
              >
                <FolderMinus className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              type="button"
              title="Delete everywhere"
              onClick={onDelete}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
      <h3 className="mt-1 font-serif text-lg text-primary">{m.title}</h3>
      {m.description && <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>}

      <div className="mt-4">
        {m.format === "video" && url && (
          <div className="space-y-2">
            <video src={url} controls className="w-full rounded-lg bg-black" />
            <a
              href={url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        )}
        {m.format === "video" && !url && m.external_url && <YouTubeEmbed url={m.external_url} />}
        {m.format === "audio" && url && (
          <div className="space-y-2">
            <audio src={url} controls className="w-full" />
            <a
              href={url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        )}
        {m.format === "link" && m.external_url && (
          <a
            href={m.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold underline"
          >
            <LinkIcon className="h-3.5 w-3.5" /> Open link
          </a>
        )}
        {m.format === "document" && url && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onRead}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-gold/15"
            >
              <BookOpen className="h-3.5 w-3.5" /> Read
            </button>
            <a
              href={url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        )}
        {m.format === "text" && m.body && (
          <p className="whitespace-pre-wrap text-sm text-foreground/85 line-clamp-6">{m.body}</p>
        )}
        {m.format === "image" && url && (
          <img src={url} alt={m.title} className="w-full rounded-lg object-cover" />
        )}
      </div>

      {/* Images are reference illustrations, not something a student "does" , 
       *  so unlike text/audio/video/document/link material, they don't get
       *  an "Add to my practice" action. */}
      {m.format !== "image" && (
        <AddMaterialToPractices
          materialId={m.id}
          pathway={pathway}
          title={m.title}
          description={m.description}
          defaultBodyLayer={
            m.format === "audio" ? "etheric" : m.format === "video" ? "mental" : "general"
          }
        />
      )}
    </div>
  );
}

/**
 * Shows published material tagged with this pathway, the read-only,
 * student-facing equivalent of the Materials admin page. Pass `courseSlug`
 * to scope to one course (matching either an explicit course_slug tag or a
 * folder named after the course). Omit it for the pathway-wide view, which
 * excludes anything already tied to a course, that material has its own
 * home on the course's page and shouldn't also clutter the pathway list.
 *
 * Materials filed into a folder are grouped under that folder's name;
 * unfiled materials render in a flat list below any folders. Pass
 * `groupByType` (used inside a course's materials bundle) to instead group
 * everything under Reading / Audio / Video headings, regardless of folder.
 */
export function PathwayMaterials({
  pathway,
  courseSlug,
  courseSlugAliases,
  courseTitle,
  groupByType = false,
  materialGroups,
  otherGroupTitle = "Other material",
  includeCourseTagged = false,
}: {
  pathway: string;
  courseSlug?: string;
  /** Extra slugified variants that should also count as this course, for
   *  when a teacher tags material with a close-but-not-exact course field
   *  (e.g. "core-curriculum" instead of "core"). */
  courseSlugAliases?: string[];
  /** The course's real display title, enables a loose word-based match
   *  (tolerant of partial titles, reordering, singular/plural) against a
   *  freehand course_slug/folder-name tag, in addition to exact slug and
   *  alias matches. Without this, a teacher typing e.g. "the ten
   *  mahavidyas" or "mahavidya" instead of the exact slug "mahavidyas"
   *  would silently show "no materials yet". */
  courseTitle?: string;
  groupByType?: boolean;
  materialGroups?: MaterialGroup[];
  /** Heading for material that doesn't match any group in `materialGroups`.
   *  Defaults to a generic label, pass something course-specific when a
   *  page's groups are known to cover a particular subject (e.g. the
   *  Mahavidyas page passes its own here) so the leftover bucket never
   *  reads as belonging to a different page's material by mistake. */
  otherGroupTitle?: string;
  /** Pathway-wide view only (no `courseSlug`): normally this hides anything
   *  already tagged to a course, since it has a home on that course's own
   *  page. Pass true to show everything for the pathway instead, every
   *  course-tagged item included, typically paired with `materialGroups`
   *  so it still reads as organized by course rather than a flat dump. */
  includeCourseTagged?: boolean;
}) {
  const { isTeacher } = useRoles();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [readingId, setReadingId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [openMaterialGroups, setOpenMaterialGroups] = useState<Record<string, boolean>>({});

  async function removeFromCourse(m: Material) {
    if (!confirm(`Remove "${m.title}" from this course? It stays in the Materials library.`)) {
      return;
    }
    const { error } = await supabase
      .from("materials")
      .update({ course_slug: null, folder_id: null })
      .eq("id", m.id);
    if (error) {
      toast.error(`Couldn't remove from course: ${error.message}`);
      return;
    }
    toast.success("Removed from this course");
    load();
  }

  async function deleteMaterial(m: Material) {
    if (!confirm(`Delete "${m.title}" everywhere? This can't be undone.`)) return;
    const { error } = await supabase.from("materials").delete().eq("id", m.id);
    if (error) {
      toast.error(`Couldn't delete: ${error.message}`);
      return;
    }
    toast.success("Deleted");
    load();
  }

  async function load() {
    setLoading(true);
    // When scoped to a course, a teacher may have organized its documents
    // either by tagging them with this exact course_slug, or simply by
    // filing them into a folder named after the course, both should
    // count, so this fetches every pathway material and folder, then
    // matches in JS rather than filtering course_slug at the DB level.
    const [{ data }, { data: folderRows, error: folderError }] = await Promise.all([
      supabase
        .from("materials")
        .select(
          "id, author_id, pathway, title, description, format, body, media_path, external_url, folder_id, course_slug, published, group_id, created_at",
        )
        .eq("pathway", pathway)
        .eq("published", true)
        .order("created_at", { ascending: false }),
      supabase.from("material_folders").select("id, name"),
    ]);

    if (folderError) {
      // Don't let a failed folder read silently look like "no folders" , 
      // materials still load and render unfiled, but this surfaces the
      // real cause in the console for debugging instead of hiding it.
      console.error("Failed to load material folders:", folderError.message);
    }

    const allFolders = (folderRows as FolderInfo[]) ?? [];
    const allRows = (data as Material[]) ?? [];

    let rows: Material[];
    if (courseSlug) {
      const course = { slug: courseSlug, title: courseTitle, aliases: courseSlugAliases };
      const matchingFolderIds = new Set(
        allFolders.filter((f) => matchesCourse(f.name, course)).map((f) => f.id),
      );
      // Teachers type the course field freehand ("Astral Projection", "the
      // ten mahavidyas", "mahavidya"), so this can't be a plain exact-string
      // match, matchesCourse normalizes slugs, checks courseSlugAliases
      // ("core-curriculum" tagged instead of "core"), and falls back to a
      // loose word-based match against the course's real title so close
      // variants and singular/plural drift don't silently drop material
      // into "no materials yet".
      rows = allRows.filter(
        (m) =>
          (m.course_slug && matchesCourse(m.course_slug, course)) ||
          (m.folder_id && matchingFolderIds.has(m.folder_id)) ||
          // Fall back to matching the material's own title against the
          // course's title. Needed for materials tagged with a shared,
          // non-descriptive course_slug like "core" (used only to surface
          // them on the Core Curriculum page) — without this, a course
          // page has no way to pull in just its one document without an
          // alias so broad it also matches every other course's material
          // sharing that same tag (e.g. "core" matching Pranayama,
          // Trataka, and Tonglen on the Self-Enquiry course page).
          matchesCourse(m.title, course),
      );
    } else if (includeCourseTagged) {
      // Show everything for this pathway, course-tagged material included,
      // used where the pathway hub wants to be the one place that lists
      // every document (paired with `materialGroups` so it still reads as
      // organized by course rather than a flat dump).
      rows = allRows;
    } else {
      // Pathway-wide view: anything tied to a course (by explicit tag, or
      // by sitting in a folder named after one) already has a home on
      // that course's own page, don't show it again here too.
      const courseSlugsHere = new Set([
        ...courseRegistry.filter((c) => c.pathway === pathway).map((c) => c.slug),
        ...allRows.filter((m) => m.course_slug).map((m) => slugify(m.course_slug as string)),
      ]);
      const courseFolderIds = new Set(
        allFolders.filter((f) => courseSlugsHere.has(slugify(f.name))).map((f) => f.id),
      );
      rows = allRows.filter(
        (m) => !m.course_slug && !(m.folder_id && courseFolderIds.has(m.folder_id)),
      );
    }
    setMaterials(rows);
    setFolders(allFolders);

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
    setUrls(Object.fromEntries(entries));
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathway, courseSlug]);

  useEffect(() => {
    if (!isTeacher) return;
    supabase
      .from("student_groups")
      .select("id,name")
      .order("name")
      .then(({ data }) => setGroups(data ?? []));
  }, [isTeacher]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading material…
      </div>
    );
  }

  const byFolder: Record<string, Material[]> = {};
  const unfiled: Material[] = [];
  for (const m of materials) {
    if (m.folder_id) {
      (byFolder[m.folder_id] ??= []).push(m);
    } else {
      unfiled.push(m);
    }
  }
  const usedFolders = folders.filter((f) => byFolder[f.id]?.length);

  const reading = materials.filter(
    (m) => m.format === "text" || m.format === "document" || m.format === "link",
  );
  const audioItems = materials.filter((m) => m.format === "audio");
  const videoItems = materials.filter((m) => m.format === "video");

  const folderNameById = new Map(folders.map((f) => [f.id, f.name]));
  const groupedMaterialIds = new Set<string>();
  const groupedMaterials = (materialGroups ?? []).map((group) => {
    const course = { slug: group.slugs[0] ?? group.title, title: group.title, aliases: group.slugs };
    const items = materials.filter((m) => {
      const folderName = m.folder_id ? folderNameById.get(m.folder_id) : undefined;
      const fields = [m.course_slug, folderName, m.title].filter(Boolean) as string[];
      return fields.some((field) => matchesCourse(field, course));
    });
    items.forEach((m) => groupedMaterialIds.add(m.id));
    return { ...group, items };
  });
  const otherGroupedMaterials = materialGroups
    ? materials.filter((m) => !groupedMaterialIds.has(m.id))
    : [];

  function tile(m: Material) {
    return (
      <MaterialTile
        key={m.id}
        m={m}
        url={urls[m.id]}
        pathway={pathway}
        onRead={() => setReadingId(m.id)}
        isTeacher={isTeacher}
        showRemoveFromCourse={!!courseSlug}
        onEdit={() => setEditingMaterial(m)}
        onRemoveFromCourse={() => removeFromCourse(m)}
        onDelete={() => deleteMaterial(m)}
      />
    );
  }

  return (
    <div>
      {isTeacher && (
        <div className="mb-4 flex flex-wrap justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowUpload((v) => !v)}>
            {showUpload ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {showUpload ? "Close" : "Add material"}
          </Button>
          <Link
            to="/material"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60 hover:text-gold"
          >
            <Settings className="h-3.5 w-3.5" /> Manage material
          </Link>
        </div>
      )}

      {isTeacher && showUpload && (
        <MaterialUploadForm
          existing={null}
          folders={folders}
          groups={groups}
          lockedPathway={pathway}
          lockedCourseSlug={courseSlug}
          onCancel={() => setShowUpload(false)}
          onSaved={() => {
            setShowUpload(false);
            load();
          }}
        />
      )}

      {materials.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
          <p className="font-serif text-xl text-primary">Nothing here yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isTeacher
              ? "Add material for this pathway from the Materials page."
              : "Material for this pathway is on the way."}
          </p>
        </div>
      ) : materialGroups ? (
        <div className="space-y-3">
          {groupedMaterials.map((group) => {
            const isOpen = !!openMaterialGroups[group.title];
            return (
              <div key={group.title} className="rounded-xl border border-border/60 bg-card/40">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMaterialGroups((prev) => ({ ...prev, [group.title]: !prev[group.title] }))
                  }
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                    <FolderOpen className="h-4 w-4 text-gold" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-primary">{group.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {group.items.length} item{group.items.length === 1 ? "" : "s"} gathered here
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gold" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gold" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-border/40 p-4 pt-4">
                    {group.items.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">{group.items.map(tile)}</div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nothing in this folder yet.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {otherGroupedMaterials.length > 0 && (
            <div className="rounded-xl border border-border/60 bg-card/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                  <BookOpen className="h-4 w-4 text-gold" />
                </span>
                <h3 className="font-serif text-lg text-primary">{otherGroupTitle}</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">{otherGroupedMaterials.map(tile)}</div>
            </div>
          )}
        </div>
      ) : groupByType ? (
        <div className="space-y-3">
          {[
            { key: "reading", label: "Reading", icon: <BookOpen className="h-4 w-4 text-gold" />, items: reading },
            { key: "audio", label: "Audio", icon: <Music className="h-4 w-4 text-gold" />, items: audioItems },
            { key: "video", label: "Video", icon: <VideoIcon className="h-4 w-4 text-gold" />, items: videoItems },
          ]
            .filter((section) => section.items.length > 0)
            .map((section) => {
              const isOpen = !!openMaterialGroups[section.key];
              return (
                <div key={section.key} className="rounded-xl border border-border/60 bg-card/40">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMaterialGroups((prev) => ({ ...prev, [section.key]: !prev[section.key] }))
                    }
                    className="flex w-full items-center gap-3 p-4 text-left"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                      {section.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-primary">{section.label}</h3>
                      <p className="text-xs text-muted-foreground">
                        {section.items.length} item{section.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-gold" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gold" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="border-t border-border/40 p-4 pt-4">
                      <div className="grid gap-4 md:grid-cols-2">{section.items.map(tile)}</div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="space-y-3">
          {usedFolders.map((folder) => {
            const isOpen = !!openMaterialGroups[folder.id];
            const items = byFolder[folder.id];
            return (
              <div key={folder.id} className="rounded-xl border border-border/60 bg-card/40">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMaterialGroups((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }))
                  }
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                    <FolderOpen className="h-4 w-4 text-gold" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-primary">{folder.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {items.length} item{items.length === 1 ? "" : "s"} gathered here
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gold" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gold" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-border/40 p-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">{items.map(tile)}</div>
                  </div>
                )}
              </div>
            );
          })}

          {unfiled.length > 0 && (
            <div className="rounded-xl border border-border/60 bg-card/40">
              {usedFolders.length > 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    setOpenMaterialGroups((prev) => ({ ...prev, __unfiled: !prev.__unfiled }))
                  }
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                    <BookOpen className="h-4 w-4 text-gold" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-primary">Other material</h3>
                    <p className="text-xs text-muted-foreground">
                      {unfiled.length} item{unfiled.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  {openMaterialGroups.__unfiled ? (
                    <ChevronUp className="h-4 w-4 text-gold" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gold" />
                  )}
                </button>
              ) : null}
              {(usedFolders.length === 0 || openMaterialGroups.__unfiled) && (
                <div className={cn(usedFolders.length > 0 && "border-t border-border/40 p-4 pt-4", usedFolders.length === 0 && "p-4")}>
                  <div className="grid gap-4 md:grid-cols-2">{unfiled.map(tile)}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

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

      <Dialog open={!!editingMaterial} onOpenChange={(v) => !v && setEditingMaterial(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit material</DialogTitle>
          </DialogHeader>
          {editingMaterial && (
            <MaterialUploadForm
              existing={editingMaterial}
              folders={folders}
              groups={groups}
              lockedPathway={pathway}
              onCancel={() => setEditingMaterial(null)}
              onSaved={() => {
                setEditingMaterial(null);
                load();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
