import { useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { pathwayLabels } from "@/lib/homework";
import { Loader2, Save, X, Eye, EyeOff } from "lucide-react";
import { courseRegistry } from "@/data/course-registry";

export type MaterialFormat = "text" | "audio" | "video" | "link" | "document" | "image";

export type MaterialRecord = {
  id: string;
  author_id: string;
  pathway: string;
  course_slug: string | null;
  folder_id: string | null;
  title: string;
  description: string | null;
  format: MaterialFormat;
  body: string | null;
  media_path: string | null;
  external_url: string | null;
  published: boolean;
  created_at: string;
  group_id: string | null;
};

export const MATERIAL_PATHWAYS = [
  "general",
  "daoist",
  "buddhist",
  "yogic",
  "tantric",
  "magick",
  "bhakti",
] as const;

/**
 * The material upload/edit form, shared between the full Materials admin
 * page and the inline "Add material" affordance in a course bundle. When
 * `lockedPathway`/`lockedCourseSlug` are passed, those fields are fixed to
 * the course the form was opened from instead of left to pick.
 */
export function MaterialUploadForm({
  existing,
  folders,
  groups,
  lockedPathway,
  lockedCourseSlug,
  onCancel,
  onSaved,
}: {
  existing: MaterialRecord | null;
  folders: { id: string; name: string }[];
  groups: { id: string; name: string }[];
  lockedPathway?: string;
  lockedCourseSlug?: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { user } = useAuth();
  const [format, setFormat] = useState<MaterialFormat>(existing?.format ?? "text");
  // For a brand new, unlocked material, a teacher can check more than one
  // pathway so the same upload doesn't have to be duplicated by hand, one
  // material row gets created per pathway checked, each independently
  // editable afterward. Editing an existing row stays single-pathway,
  // since that row already belongs to exactly one place.
  const [pathway, setPathway] = useState<string>(lockedPathway ?? existing?.pathway ?? "general");
  const [selectedPathways, setSelectedPathways] = useState<string[]>([
    lockedPathway ?? existing?.pathway ?? "general",
  ]);
  const canPickMultiplePathways = !lockedPathway && !existing;

  function togglePathway(p: string, checked: boolean) {
    setSelectedPathways((prev) => {
      if (checked) return prev.includes(p) ? prev : [...prev, p];
      const next = prev.filter((x) => x !== p);
      return next.length ? next : prev; // keep at least one selected
    });
  }
  const [courseSlug, setCourseSlug] = useState<string>(
    lockedCourseSlug ?? existing?.course_slug ?? "",
  );
  const [folderId, setFolderId] = useState<string>(existing?.folder_id ?? "none");
  const [groupId, setGroupId] = useState<string>(existing?.group_id ?? "none");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [externalUrl, setExternalUrl] = useState(existing?.external_url ?? "");
  const [mediaPath, setMediaPath] = useState<string | null>(existing?.media_path ?? null);
  const [published, setPublished] = useState(existing?.published ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file || !user) return;
    if (file.size > 500 * 1024 * 1024) {
      toast.error("File too large (max 500 MB)");
      return;
    }
    setUploading(true);
    const path = `${selectedPathways[0] ?? pathway}/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("materials-media").upload(path, file);
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    setMediaPath(path);
    setUploading(false);
    toast.success("File uploaded");
  }

  async function save() {
    if (!user) return;
    if (!title.trim()) {
      toast.error("Add a title");
      return;
    }
    if ((format === "audio" || format === "video") && !mediaPath && !externalUrl) {
      toast.error("Upload a file or paste a URL");
      return;
    }
    if (format === "document" && !mediaPath) {
      toast.error("Upload a PDF file");
      return;
    }
    if (format === "image" && !mediaPath) {
      toast.error("Upload an image");
      return;
    }
    if (format === "link" && !externalUrl) {
      toast.error("Paste a link URL");
      return;
    }
    if (format === "text" && !body.trim()) {
      toast.error("Add some text");
      return;
    }

    setSaving(true);
    const basePayload = {
      author_id: user.id,
      course_slug: courseSlug.trim() || null,
      folder_id: folderId === "none" ? null : folderId,
      group_id: groupId === "none" ? null : groupId,
      title: title.trim(),
      description: description.trim() || null,
      format,
      body: format === "text" ? body : null,
      media_path:
        format === "audio" || format === "video" || format === "document" || format === "image"
          ? mediaPath
          : null,
      external_url: format === "video" || format === "link" ? externalUrl || null : null,
      published,
    };

    // Editing an existing row, or a locked-pathway form (opened from inside
    // a single pathway/course), always writes exactly one row. A brand new
    // material from the general Materials page can be checked into several
    // pathways at once, that inserts one row per pathway checked so it
    // shows up under each one independently.
    const pathwaysToWrite = existing || lockedPathway ? [pathway] : selectedPathways;
    const { error } = existing
      ? await supabase.from("materials").update({ ...basePayload, pathway }).eq("id", existing.id)
      : await supabase
          .from("materials")
          .insert(pathwaysToWrite.map((p) => ({ ...basePayload, pathway: p })));

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(
      existing
        ? "Updated"
        : pathwaysToWrite.length > 1
          ? `Material added to ${pathwaysToWrite.length} pathways`
          : "Material added",
    );
    onSaved();
  }

  return (
    <div className="mb-8 rounded-2xl border border-gold/40 bg-card/70 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-xl text-primary">
          {existing ? "Edit material" : "Add new material"}
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Format</Label>
          <Select value={format} onValueChange={(v) => setFormat(v as MaterialFormat)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Written</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document (PDF)</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="link">External link</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {!lockedPathway && !canPickMultiplePathways && (
          <div>
            <Label>Pathway</Label>
            <Select value={pathway} onValueChange={setPathway}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MATERIAL_PATHWAYS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {pathwayLabels[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {canPickMultiplePathways && (
        <div className="mt-4">
          <Label>Pathway (check as many as you want this to appear under)</Label>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg border border-border/60 p-3 sm:grid-cols-3">
            {MATERIAL_PATHWAYS.map((p) => (
              <label key={p} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={selectedPathways.includes(p)}
                  onCheckedChange={(checked) => togglePathway(p, checked === true)}
                />
                {pathwayLabels[p]}
              </label>
            ))}
          </div>
          {selectedPathways.length > 1 && (
            <p className="mt-1 text-xs text-muted-foreground">
              This will create {selectedPathways.length} separate materials, one per pathway
              checked, each editable and deletable on its own afterward.
            </p>
          )}
        </div>
      )}

      <div className="mt-4">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Introduction to the Microcosmic Orbit"
        />
      </div>

      <div className="mt-4">
        <Label>Short description (optional)</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="One line summary"
        />
      </div>

      {!lockedCourseSlug && (
        <div className="mt-4">
          <Label>Course (optional, leave blank for pathway-wide material)</Label>
          <Input
            list="course-slug-options"
            value={courseSlug}
            onChange={(e) => setCourseSlug(e.target.value)}
            placeholder="e.g. eight-extraordinary-meridians, faery-shamanism, or core"
          />
          <datalist id="course-slug-options">
            <option value="core">Core Curriculum</option>
            {courseRegistry.map((c) => (
              <option key={`${c.pathway}::${c.slug}`} value={c.slug}>
                {c.title}
              </option>
            ))}
          </datalist>
          <p className="mt-1 text-xs text-muted-foreground">
            Must match the course's URL slug exactly (start typing to see suggestions), use{" "}
            <span className="text-gold">core</span> for Core Curriculum. A close-but-not-exact spelling
            won't show up on that course's page.
          </p>
        </div>
      )}

      <div className="mt-4">
        <Label>Folder (optional)</Label>
        <Select value={folderId} onValueChange={setFolderId}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No folder</SelectItem>
            {folders.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {folders.length === 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            No folders yet, close this form and use "Manage folders" to create one first.
          </p>
        )}
      </div>

      <div className="mt-4">
        <Label>Group (optional, restricts this material to one cohort)</Label>
        <Select value={groupId} onValueChange={setGroupId}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Everyone (published)</SelectItem>
            {groups.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {format === "text" && (
        <div className="mt-4">
          <Label>Body</Label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder="Write the teaching here…"
          />
        </div>
      )}

      {(format === "audio" || format === "video") && (
        <div className="mt-4 space-y-3">
          <div>
            <Label>Upload file ({format === "video" ? "MP4 / MOV" : "MP3 / M4A / WAV"})</Label>
            <div className="mt-1 flex items-center gap-2">
              <Input
                ref={fileRef}
                type="file"
                accept={format === "video" ? "video/*" : "audio/*"}
                onChange={handleUpload}
                disabled={uploading}
              />
              {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            {mediaPath && <p className="mt-1 text-xs text-emerald-400">✓ File uploaded</p>}
          </div>
          {format === "video" && (
            <div>
              <Label>…or paste a YouTube / Vimeo URL</Label>
              <Input
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://youtu.be/…"
              />
            </div>
          )}
        </div>
      )}

      {format === "link" && (
        <div className="mt-4">
          <Label>URL</Label>
          <Input
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>
      )}

      {format === "document" && (
        <div className="mt-4">
          <Label>Upload PDF</Label>
          <div className="mt-1 flex items-center gap-2">
            <Input
              ref={fileRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleUpload}
              disabled={uploading}
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          {mediaPath && <p className="mt-1 text-xs text-emerald-400">✓ File uploaded</p>}
        </div>
      )}

      {format === "image" && (
        <div className="mt-4">
          <Label>Upload image</Label>
          <div className="mt-1 flex items-center gap-2">
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          {mediaPath && <p className="mt-1 text-xs text-emerald-400">✓ Image uploaded</p>}
        </div>
      )}

      <div className="mt-5 flex items-center gap-3">
        <Switch checked={published} onCheckedChange={setPublished} id="pub" />
        <Label htmlFor="pub" className="flex items-center gap-2 text-sm">
          {published ? (
            <>
              <Eye className="h-3.5 w-3.5" /> Published, students can see
            </>
          ) : (
            <>
              <EyeOff className="h-3.5 w-3.5" /> Draft, only you can see
            </>
          )}
        </Label>
      </div>

      <div className="mt-6 flex gap-2">
        <Button onClick={save} disabled={saving || uploading}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {existing ? "Update material" : "Add material"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
