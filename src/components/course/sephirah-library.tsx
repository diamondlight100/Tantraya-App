import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BookMarked,
  Loader2,
  Plus,
  Trash2,
  Link as LinkIcon,
  StickyNote,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Music2,
  Video,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Format = "note" | "link" | "image" | "audio" | "video" | "document";

type TreeItem = {
  id: string;
  sephirah: string;
  format: Format;
  title: string;
  body: string | null;
  external_url: string | null;
  media_path: string | null;
  created_at: string;
};

const FORMAT_ICON: Record<Format, typeof StickyNote> = {
  note: StickyNote,
  link: LinkIcon,
  image: ImageIcon,
  audio: Music2,
  video: Video,
  document: FileText,
};

function fileFormat(file: File): Format {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "document";
}

/**
 * A student's own private "cosmic filing cabinet" attached to one Sephirah.
 * Sits underneath the teacher-provided correspondence table on the Tree of
 * Life widget — every student builds their own version of the Tree here,
 * adding their own notes, links, and files to whichever spheres they want,
 * entirely private to them (mirrors the personal altar in Bhakti).
 */
export function SephirahLibrary({ sephirah, sephirahName }: { sephirah: string; sephirahName: string }) {
  const { user } = useAuth();
  const [items, setItems] = useState<TreeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [mode, setMode] = useState<"note" | "link" | "file" | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});

  async function load() {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("personal_tree_items")
      .select("id, sephirah, format, title, body, external_url, media_path, created_at")
      .eq("user_id", user.id)
      .eq("sephirah", sephirah)
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    const rows = (data as TreeItem[]) ?? [];
    setItems(rows);
    const mediaRows = rows.filter((r) => r.media_path);
    if (mediaRows.length) {
      const entries = await Promise.all(
        mediaRows.map(async (r) => {
          const { data: signed } = await supabase.storage
            .from("personal-tree")
            .createSignedUrl(r.media_path!, 3600);
          return [r.id, signed?.signedUrl ?? ""] as const;
        }),
      );
      setUrls(Object.fromEntries(entries));
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, sephirah]);

  function resetForm() {
    setMode(null);
    setTitle("");
    setBody("");
    setUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function saveNote() {
    if (!user || !title.trim()) {
      toast.error("Give it a title first.");
      return;
    }
    setAdding(true);
    const { error } = await supabase.from("personal_tree_items").insert({
      user_id: user.id,
      sephirah,
      format: "note",
      title: title.trim(),
      body: body.trim() || null,
    });
    setAdding(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    resetForm();
    load();
  }

  async function saveLink() {
    if (!user || !title.trim() || !url.trim()) {
      toast.error("A link needs a title and a URL.");
      return;
    }
    setAdding(true);
    const { error } = await supabase.from("personal_tree_items").insert({
      user_id: user.id,
      sephirah,
      format: "link",
      title: title.trim(),
      external_url: url.trim(),
    });
    setAdding(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    resetForm();
    load();
  }

  async function saveFile() {
    const file = fileInputRef.current?.files?.[0];
    if (!user || !file) {
      toast.error("Choose a file first.");
      return;
    }
    setAdding(true);
    const path = `${user.id}/${sephirah}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: upErr } = await supabase.storage.from("personal-tree").upload(path, file);
    if (upErr) {
      toast.error(upErr.message);
      setAdding(false);
      return;
    }
    const { error: insErr } = await supabase.from("personal_tree_items").insert({
      user_id: user.id,
      sephirah,
      format: fileFormat(file),
      title: title.trim() || file.name.replace(/\.[^.]+$/, ""),
      media_path: path,
    });
    setAdding(false);
    if (insErr) {
      toast.error(insErr.message);
      return;
    }
    resetForm();
    load();
  }

  async function removeItem(item: TreeItem) {
    if (!confirm(`Remove "${item.title}" from your ${sephirahName} library?`)) return;
    if (item.media_path) await supabase.storage.from("personal-tree").remove([item.media_path]);
    const { error } = await supabase.from("personal_tree_items").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    load();
  }

  if (!user) return null;

  return (
    <div className="mt-5 rounded-xl border border-gold/25 bg-secondary/10 p-4">
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-gold">
          <BookMarked className="h-3.5 w-3.5" /> Your {sephirahName} library
        </p>
        {!mode && (
          <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => setMode("note")}>
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Your own notes, links, and files for this sphere — private, only you can see this.
      </p>

      {mode && (
        <div className="mt-3 space-y-2 rounded-lg border border-border/50 bg-background/50 p-3">
          <div className="flex gap-1.5">
            {(["note", "link", "file"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] capitalize transition",
                  mode === m
                    ? "border-gold bg-gold/15 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-gold/40",
                )}
              >
                {m}
              </button>
            ))}
          </div>

          {mode !== "file" && (
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 text-sm"
            />
          )}

          {mode === "note" && (
            <Textarea
              placeholder="Your notes on this sphere..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="text-sm"
            />
          )}

          {mode === "link" && (
            <Input
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-8 text-sm"
            />
          )}

          {mode === "file" && (
            <>
              <Input
                placeholder="Title (optional, defaults to file name)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-8 text-sm"
              />
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border/60 px-3 py-3 text-xs text-muted-foreground hover:border-gold/50">
                <UploadCloud className="h-4 w-4" />
                Choose an image, audio, video, or document
                <input ref={fileInputRef} type="file" className="hidden" />
              </label>
            </>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              className="h-7 gap-1 text-xs"
              disabled={adding}
              onClick={mode === "note" ? saveNote : mode === "link" ? saveLink : saveFile}
            >
              {adding && <Loader2 className="h-3 w-3 animate-spin" />} Save
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="mt-3 space-y-1.5">
        {loading && <p className="text-xs text-muted-foreground">Loading…</p>}
        {!loading && items.length === 0 && !mode && (
          <p className="text-xs italic text-muted-foreground">Nothing added yet.</p>
        )}
        {items.map((item) => {
          const Icon = FORMAT_ICON[item.format];
          return (
            <div
              key={item.id}
              className="flex items-start gap-2 rounded-md border border-border/40 bg-card/40 px-2.5 py-2 text-sm"
            >
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
              <div className="min-w-0 flex-1">
                {item.format === "link" && item.external_url ? (
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground/90 hover:text-primary hover:underline"
                  >
                    {item.title} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="font-medium text-foreground/90">{item.title}</p>
                )}
                {item.body && <p className="mt-0.5 whitespace-pre-wrap text-xs text-muted-foreground">{item.body}</p>}
                {item.media_path && urls[item.id] && (
                  <>
                    {item.format === "image" && (
                      <img src={urls[item.id]} alt={item.title} className="mt-1.5 max-h-40 rounded-md border border-border/40" />
                    )}
                    {item.format === "audio" && (
                      <audio controls src={urls[item.id]} className="mt-1.5 h-8 w-full" />
                    )}
                    {item.format === "video" && (
                      <video controls src={urls[item.id]} className="mt-1.5 max-h-48 rounded-md" />
                    )}
                    {item.format === "document" && (
                      <a
                        href={urls[item.id]}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-gold hover:underline"
                      >
                        <FileText className="h-3 w-3" /> Open file
                      </a>
                    )}
                  </>
                )}
              </div>
              <button
                onClick={() => removeItem(item)}
                className="shrink-0 text-muted-foreground/60 hover:text-destructive"
                title="Remove"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
