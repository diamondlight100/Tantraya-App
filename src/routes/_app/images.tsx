import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, Folder as FolderIcon, LinkIcon, Trash2, Settings } from "lucide-react";

export const Route = createFileRoute("/_app/images")({
  head: () => ({ meta: [{ title: "Images · Tantraya" }] }),
  component: ImagesPage,
});

type ImageRow = { id: string; title: string; media_path: string; folder_id: string | null; author_id: string };
type Folder = { id: string; name: string };

function ImagesPage() {
  const { user } = useAuth();
  const { isTeacher } = useRoles();
  const [images, setImages] = useState<ImageRow[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderFilter, setFolderFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFolder, setUploadFolder] = useState("none");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("materials")
      .select("id, title, media_path, folder_id, author_id")
      .eq("format", "image")
      .eq("published", true)
      .order("created_at", { ascending: false });
    const rows = (data as ImageRow[]) ?? [];
    setImages(rows);

    const entries = await Promise.all(
      rows.map(async (r) => {
        const { data: signed } = await supabase.storage.from("materials-media").createSignedUrl(r.media_path, 60 * 60 * 6);
        return [r.id, signed?.signedUrl ?? ""] as const;
      }),
    );
    setUrls(Object.fromEntries(entries));
    setLoading(false);
  }

  async function loadFolders() {
    const { data } = await supabase.from("material_folders").select("id, name").order("name");
    setFolders((data as Folder[]) ?? []);
  }

  useEffect(() => { if (user) { load(); loadFolders(); } }, [user]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 50 * 1024 * 1024) { toast.error("Image too large (max 50 MB)"); return; }
    setUploading(true);
    const path = `image/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: upErr } = await supabase.storage.from("materials-media").upload(path, file);
    if (upErr) { toast.error(upErr.message); setUploading(false); return; }

    const { error: insErr } = await supabase.from("materials").insert({
      author_id: user.id,
      pathway: "general",
      title: uploadTitle.trim() || file.name,
      format: "image",
      media_path: path,
      folder_id: uploadFolder === "none" ? null : uploadFolder,
      published: true,
    });
    setUploading(false);
    if (insErr) { toast.error(insErr.message); return; }
    toast.success("Image uploaded");
    setUploadTitle("");
    e.target.value = "";
    load();
  }

  async function removeImage(img: ImageRow) {
    if (!confirm(`Delete "${img.title}"?`)) return;
    await supabase.storage.from("materials-media").remove([img.media_path]);
    const { error } = await supabase.from("materials").delete().eq("id", img.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  const visible = folderFilter === "all" ? images
    : folderFilter === "unfiled" ? images.filter((i) => !i.folder_id)
    : images.filter((i) => i.folder_id === folderFilter);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Images" subtitle="Your own imagery, upload here, then drop it in wherever you need it." />

      {isTeacher && (
        <div className="mb-6 rounded-xl border border-gold/40 bg-card/50 p-5">
          <p className="mb-3 font-serif text-lg text-primary">Upload an image</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Input placeholder="Title (optional)" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} />
            <Select value={uploadFolder} onValueChange={setUploadFolder}>
              <SelectTrigger><SelectValue placeholder="Folder" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No folder</SelectItem>
                {folders.map((f) => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
              {uploading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
            </div>
          </div>
          {folders.length === 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              No folders yet, create some from{" "}
              <Link to="/material" className="text-gold underline">Materials → Manage folders</Link>{" "}
              to organize images by category.
            </p>
          )}
        </div>
      )}

      {folders.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <FolderIcon className="h-4 w-4 text-muted-foreground" />
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All folders</SelectItem>
              <SelectItem value="unfiled">Unfiled</SelectItem>
              {folders.map((f) => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-5 w-5 animate-spin text-gold" /></div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
          <p className="font-serif text-xl text-primary">No images yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isTeacher ? "Upload your first one above." : "Check back soon."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/40">
              {urls[img.id] ? (
                <img src={urls[img.id]} alt={img.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center"><Loader2 className="h-4 w-4 animate-spin" /></div>
              )}
              <div className="p-2">
                <p className="truncate text-xs text-foreground/85">{img.title}</p>
                <div className="mt-1 flex items-center justify-between">
                  <button
                    onClick={() => { navigator.clipboard.writeText(urls[img.id]); toast.success("URL copied"); }}
                    className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-gold"
                  >
                    <LinkIcon className="h-3 w-3" /> Copy URL
                  </button>
                  {(isTeacher || img.author_id === user?.id) && (
                    <button onClick={() => removeImage(img)} className="text-muted-foreground hover:text-rose-400">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
