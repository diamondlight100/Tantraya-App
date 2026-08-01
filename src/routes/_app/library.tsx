import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { PDFDocument } from "pdf-lib";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
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
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientOnly } from "@/components/client-only";

// @react-pdf-viewer/core pulls in pdfjs-dist, which tries to resolve the
// Node `canvas` package when it detects a server-like environment (which
// Cloudflare Workers' nodejs_compat flag makes it think it's in). That
// package isn't installed and can't run in Workers anyway. This is a
// browser-only reader, so keep it fully out of the server bundle: lazy-load
// it, and only ever mount it inside <ClientOnly>.
const PdfReader = lazy(() =>
  import("@/components/library/pdf-reader").then((m) => ({ default: m.PdfReader })),
);
import {
  BookOpen,
  FileText,
  Music,
  Video as VideoIcon,
  Link as LinkIcon,
  Search,
  Loader2,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  Download,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/_app/library")({
  head: () => ({ meta: [{ title: "Library · Tantraya" }] }),
  component: LibraryPage,
});

type Format = "pdf" | "ebook" | "audio" | "video" | "link";

type Item = {
  id: string;
  author_id: string;
  section: string;
  format: Format;
  title: string;
  book_author: string | null;
  description: string | null;
  media_path: string | null;
  external_url: string | null;
  file_size: number | null;
  published: boolean;
  created_at: string;
};

const PRESET_SECTIONS = [
  "General",
  "Daoist",
  "Buddhist",
  "Yogic",
  "Tantric",
  "Magick",
  "Bhakti",
  "Healing & Health",
  "Philosophy",
  "Poetry",
];

function formatIcon(f: Format) {
  if (f === "pdf" || f === "ebook") return <BookOpen className="h-4 w-4" />;
  if (f === "audio") return <Music className="h-4 w-4" />;
  if (f === "video") return <VideoIcon className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
}

function fmtBytes(n: number | null) {
  if (!n) return "";
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function LibraryPage() {
  const { user } = useAuth();
  const { isTeacher } = useRoles();
  const [items, setItems] = useState<Item[]>([]);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [section, setSection] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("library_items")
      .select("*")
      .order("title", { ascending: true });
    if (error) toast.error(error.message);
    setItems((data ?? []) as Item[]);
    setLoading(false);
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function getSignedUrl(it: Item) {
    if (!it.media_path) return null;
    if (signedUrls[it.id]) return signedUrls[it.id];
    const { data } = await supabase.storage
      .from("library-media")
      .createSignedUrl(it.media_path, 60 * 60 * 6);
    if (data?.signedUrl) {
      setSignedUrls((p) => ({ ...p, [it.id]: data.signedUrl }));
      return data.signedUrl;
    }
    return null;
  }

  const sections = useMemo(() => {
    const set = new Set<string>(PRESET_SECTIONS);
    items.forEach((i) => set.add(i.section));
    return Array.from(set).sort();
  }, [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => i.published || i.author_id === user?.id)
      .filter((i) => section === "All" || i.section === section)
      .filter((i) => {
        if (!q) return true;
        return (
          i.title.toLowerCase().includes(q) ||
          (i.book_author ?? "").toLowerCase().includes(q) ||
          (i.description ?? "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
  }, [items, section, query, user]);

  // Group alphabetically by first letter
  const grouped = useMemo(() => {
    const g: Record<string, Item[]> = {};
    for (const i of visible) {
      const letter = (i.title[0] ?? "?").toUpperCase().match(/[A-Z]/)
        ? i.title[0].toUpperCase()
        : "#";
      (g[letter] ??= []).push(i);
    }
    return Object.entries(g).sort(([a], [b]) => a.localeCompare(b));
  }, [visible]);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Library"
        subtitle="E-books, PDFs, audio teachings and films, organised by section, searchable by title or author."
      />

      {isTeacher && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Teacher view, drop a PDF and the title & author auto-fill from the file.
          </p>
          <Button
            onClick={() => {
              setEditing(null);
              setShowUpload((v) => !v);
            }}
          >
            {showUpload ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showUpload ? "Close" : "Add to library"}
          </Button>
        </div>
      )}

      {isTeacher && (showUpload || editing) && (
        <UploadForm
          existing={editing}
          sections={sections}
          onCancel={() => {
            setShowUpload(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowUpload(false);
            setEditing(null);
            load();
          }}
        />
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or author…"
            className="pl-9"
          />
        </div>
        <div className="min-w-[180px]">
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All sections</SelectItem>
              {sections.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <p className="mt-3 font-serif text-xl text-primary">No items yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isTeacher
              ? "Upload your first PDF or e-book to seed the library."
              : "The library is growing, check back soon."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([letter, list]) => (
            <section key={letter}>
              <h2 className="mb-3 border-b border-border/40 pb-1 font-serif text-2xl text-gold">
                {letter}
              </h2>
              <ul className="grid gap-2">
                {list.map((it) => (
                  <LibraryRow
                    key={it.id}
                    item={it}
                    canEdit={isTeacher || it.author_id === user?.id}
                    onEdit={() => {
                      setShowUpload(false);
                      setEditing(it);
                    }}
                    onOpen={() => getSignedUrl(it)}
                    onDeleted={load}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

    </div>
  );
}

function LibraryRow({
  item,
  canEdit,
  onEdit,
  onOpen,
  onDeleted,
}: {
  item: Item;
  canEdit: boolean;
  onEdit: () => void;
  onOpen: () => Promise<string | null>;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState<null | "read" | "dl">(null);
  const [readerUrl, setReaderUrl] = useState<string | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);

  function safeFilename() {
    const base = item.title.replace(/[^\w\-. ]+/g, "_").trim() || "file";
    const ext =
      item.media_path?.match(/\.([a-z0-9]+)$/i)?.[1] ??
      (item.format === "pdf" ? "pdf" : item.format === "ebook" ? "epub" : "");
    return ext ? `${base}.${ext}` : base;
  }

  async function read() {
    if (item.external_url) {
      window.open(item.external_url, "_blank", "noopener");
      return;
    }
    setBusy("read");
    const url = await onOpen();
    setBusy(null);
    if (!url) {
      toast.error("Could not open file");
      return;
    }
    setReaderUrl(url);
    setReaderOpen(true);
  }

  async function download() {
    if (!item.media_path) {
      if (item.external_url) window.open(item.external_url, "_blank", "noopener");
      return;
    }
    setBusy("dl");
    const { data, error } = await supabase.storage
      .from("library-media")
      .createSignedUrl(item.media_path, 60 * 60, { download: safeFilename() });
    setBusy(null);
    if (error || !data?.signedUrl) {
      toast.error("Could not prepare download");
      return;
    }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = safeFilename();
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function remove() {
    if (!confirm(`Delete "${item.title}"?`)) return;
    if (item.media_path) {
      await supabase.storage.from("library-media").remove([item.media_path]);
    }
    const { error } = await supabase.from("library_items").delete().eq("id", item.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Removed");
      onDeleted();
    }
  }

  const isMedia = item.format !== "link" && !!item.media_path;

  return (
    <>
      <li className="flex flex-wrap items-center gap-3 rounded-lg border border-border/50 bg-card/40 px-4 py-3 hover:border-gold/40">
        <span className="text-gold">{formatIcon(item.format)}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="truncate font-serif text-base text-primary">{item.title}</p>
            {item.book_author && (
              <span className="text-xs text-muted-foreground">by {item.book_author}</span>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>{item.section}</span>
            <span>· {item.format}</span>
            {item.file_size && <span>· {fmtBytes(item.file_size)}</span>}
            {!item.published && (
              <span className="inline-flex items-center gap-1">
                <EyeOff className="h-3 w-3" /> draft
              </span>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Button size="sm" variant="outline" onClick={read} disabled={busy !== null}>
            {busy === "read" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : item.external_url ? (
              <ExternalLink className="h-3 w-3" />
            ) : (
              <BookOpen className="h-3 w-3" />
            )}
            {item.external_url ? "Open" : "Read"}
          </Button>
          {isMedia && (
            <Button size="sm" variant="ghost" onClick={download} disabled={busy !== null}>
              {busy === "dl" ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Download className="h-3 w-3" />
              )}
              Download
            </Button>
          )}
          {canEdit && (
            <>
              <Button size="icon" variant="ghost" onClick={onEdit}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={remove}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </li>

      <Dialog open={readerOpen} onOpenChange={setReaderOpen}>
        <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="border-b border-border/60 p-4">
            <DialogTitle className="font-serif text-lg text-primary">
              {item.title}
              {item.book_author && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  by {item.book_author}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden bg-black/40">
            {readerUrl && item.format === "pdf" && (
              <ClientOnly
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading reader…
                  </div>
                }
              >
                {() => (
                  <Suspense
                    fallback={
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Loading reader…
                      </div>
                    }
                  >
                    <PdfReader
                      fileUrl={readerUrl}
                      itemId={item.id}
                      bookTitle={item.title}
                      bookAuthor={item.book_author}
                    />
                  </Suspense>
                )}
              </ClientOnly>
            )}
            {readerUrl && item.format === "ebook" && (
              <iframe src={readerUrl} title={item.title} className="h-full w-full" />
            )}
            {readerUrl && item.format === "video" && (
              <video src={readerUrl} controls className="h-full w-full" />
            )}
            {readerUrl && item.format === "audio" && (
              <div className="flex h-full items-center justify-center p-8">
                <audio src={readerUrl} controls className="w-full max-w-xl" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-border/60 p-3">
            <Button variant="outline" size="sm" onClick={download} disabled={busy !== null}>
              <Download className="h-3 w-3" /> Download
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setReaderOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function UploadForm({
  existing,
  sections,
  onCancel,
  onSaved,
}: {
  existing: Item | null;
  sections: string[];
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { user } = useAuth();
  const [format, setFormat] = useState<Format>(existing?.format ?? "pdf");
  const [section, setSection] = useState<string>(existing?.section ?? "General");
  const [customSection, setCustomSection] = useState("");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [bookAuthor, setBookAuthor] = useState(existing?.book_author ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [mediaPath, setMediaPath] = useState<string | null>(existing?.media_path ?? null);
  const [fileSize, setFileSize] = useState<number | null>(existing?.file_size ?? null);
  const [externalUrl, setExternalUrl] = useState(existing?.external_url ?? "");
  const [published, setPublished] = useState(existing?.published ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const acceptByFormat: Record<Format, string> = {
    pdf: "application/pdf",
    ebook: ".epub,.mobi,application/epub+zip",
    audio: "audio/*",
    video: "video/*",
    link: "",
  };

  function titleFromFilename(name: string) {
    return name
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  async function readPdfMeta(file: File) {
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
      return { title: pdf.getTitle() ?? "", author: pdf.getAuthor() ?? "" };
    } catch {
      return { title: "", author: "" };
    }
  }

  async function handleFile() {
    const file = fileRef.current?.files?.[0];
    if (!file || !user) return;
    if (file.size > 500 * 1024 * 1024) {
      toast.error("File too large (max 500 MB)");
      return;
    }

    // Auto-fill title/author from PDF metadata (or filename)
    if (format === "pdf") {
      const meta = await readPdfMeta(file);
      if (!title) setTitle(meta.title || titleFromFilename(file.name));
      if (!bookAuthor && meta.author) setBookAuthor(meta.author);
    } else if (!title) {
      setTitle(titleFromFilename(file.name));
    }

    setUploading(true);
    const safe = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${(section || "General").toLowerCase().replace(/\s+/g, "-")}/${user.id}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("library-media").upload(path, file, {
      contentType: file.type || undefined,
    });
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    setMediaPath(path);
    setFileSize(file.size);
    setUploading(false);
    toast.success("File uploaded, review the details and save");
  }

  async function save() {
    if (!user) return;
    const finalSection = (customSection.trim() || section || "General").trim();
    if (!title.trim()) {
      toast.error("Add a title");
      return;
    }
    if (format !== "link" && !mediaPath && !existing) {
      toast.error("Upload a file first");
      return;
    }
    if (format === "link" && !externalUrl) {
      toast.error("Add a link URL");
      return;
    }

    setSaving(true);
    const payload = {
      author_id: user.id,
      section: finalSection,
      format,
      title: title.trim(),
      book_author: bookAuthor.trim() || null,
      description: description.trim() || null,
      media_path: format === "link" ? null : mediaPath,
      external_url: format === "link" ? externalUrl.trim() : null,
      file_size: fileSize,
      published,
    };
    const { error } = existing
      ? await supabase.from("library_items").update(payload).eq("id", existing.id)
      : await supabase.from("library_items").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(existing ? "Updated" : "Added to library");
    onSaved();
  }

  return (
    <div className="mb-8 rounded-2xl border border-gold/40 bg-card/70 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-xl text-primary">
          {existing ? "Edit library item" : "Add to library"}
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label>Format</Label>
          <Select value={format} onValueChange={(v) => setFormat(v as Format)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="ebook">E-book (epub/mobi)</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="link">External link</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Section</Label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sections.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>…or new section</Label>
          <Input
            value={customSection}
            onChange={(e) => setCustomSection(e.target.value)}
            placeholder="e.g. Kabbalah"
          />
        </div>
      </div>

      {format !== "link" && (
        <div className="mt-4">
          <Label>Upload file</Label>
          <div className="mt-1 flex items-center gap-2">
            <Input
              ref={fileRef}
              type="file"
              accept={acceptByFormat[format]}
              onChange={handleFile}
              disabled={uploading}
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          {mediaPath && (
            <p className="mt-1 text-xs text-emerald-400">
              ✓ Uploaded {fileSize ? `(${fmtBytes(fileSize)})` : ""}
            </p>
          )}
          {format === "pdf" && (
            <p className="mt-1 text-xs text-muted-foreground">
              Title and author will be read from the PDF when possible.
            </p>
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

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book or piece title"
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            placeholder="Author's name"
          />
        </div>
      </div>

      <div className="mt-4">
        <Label>Description (optional)</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="A short note for students"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Switch checked={published} onCheckedChange={setPublished} id="lib-pub" />
        <Label htmlFor="lib-pub" className="flex items-center gap-2 text-sm">
          {published ? (
            <>
              <Eye className="h-3.5 w-3.5" /> Visible to students
            </>
          ) : (
            <>
              <EyeOff className="h-3.5 w-3.5" /> Draft
            </>
          )}
        </Label>
      </div>

      <div className="mt-6 flex gap-2">
        <Button onClick={save} disabled={saving || uploading}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {existing ? "Update" : "Save to library"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
