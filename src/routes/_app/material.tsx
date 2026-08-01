import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { pathwayLabels } from "@/lib/homework";
import {
  FileText,
  Music,
  Video as VideoIcon,
  Link as LinkIcon,
  Loader2,
  Plus,
  Trash2,
  EyeOff,
  Pencil,
  Save,
  X,
  Download,
  Folder as FolderIcon,
  Image as ImageIcon,
} from "lucide-react";
import {
  MaterialUploadForm,
  MATERIAL_PATHWAYS,
  type MaterialFormat,
  type MaterialRecord,
} from "@/components/course/material-upload-form";
import { AddMaterialToPractices } from "@/components/course/add-material-to-practices";

export const Route = createFileRoute("/_app/material")({
  head: () => ({ meta: [{ title: "Material · Tantraya" }] }),
  component: MaterialPage,
});

type Format = MaterialFormat;
type Material = MaterialRecord;

type Folder = {
  id: string;
  author_id: string;
  name: string;
  pathway: string | null;
};

const PATHWAYS = MATERIAL_PATHWAYS;

function formatIcon(f: Format) {
  if (f === "text") return <FileText className="h-4 w-4" />;
  if (f === "audio") return <Music className="h-4 w-4" />;
  if (f === "video") return <VideoIcon className="h-4 w-4" />;
  if (f === "document") return <Download className="h-4 w-4" />;
  if (f === "image") return <ImageIcon className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
}

function MaterialPage() {
  const { user } = useAuth();
  const { isTeacher } = useRoles();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<string>("all");
  const [folderFilter, setFolderFilter] = useState<string>("all");
  const [showUpload, setShowUpload] = useState(false);
  const [editing, setEditing] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  async function loadFolders() {
    const { data, error } = await supabase.from("material_folders").select("*").order("name");
    if (error) {
      // Was failing completely silently before, a teacher creating a
      // folder would see it vanish with no explanation. Surface it now so
      // an actual RLS/schema problem is visible instead of just "no
      // folders yet".
      toast.error(`Couldn't load folders: ${error.message}`);
      return;
    }
    setFolders((data as Folder[]) ?? []);
  }

  async function loadGroups() {
    const { data } = await supabase.from("student_groups").select("id,name").order("name");
    setGroups(data ?? []);
  }

  async function createFolder() {
    if (!user || !newFolderName.trim()) return;
    const { data, error } = await supabase
      .from("material_folders")
      .insert({
        author_id: user.id,
        name: newFolderName.trim(),
      })
      .select()
      .single();
    if (error) {
      toast.error(`Couldn't create folder: ${error.message}`);
      return;
    }
    // Add the row we got straight back from the insert instead of relying
    // solely on a follow-up reload, if the reload's SELECT ever silently
    // fails for any reason, the folder that was just created wouldn't
    // disappear from view because of it.
    if (data) {
      setFolders((prev) =>
        [...prev, data as Folder].sort((a, b) => a.name.localeCompare(b.name)),
      );
    }
    setNewFolderName("");
    toast.success("Folder created");
    loadFolders();
  }

  async function renameFolder(id: string) {
    if (!renameValue.trim()) return;
    const { error } = await supabase
      .from("material_folders")
      .update({ name: renameValue.trim() })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRenamingFolder(null);
    loadFolders();
  }

  async function deleteFolder(id: string) {
    if (
      !confirm(
        "Delete this folder? Materials inside it won't be deleted, they'll just become unfiled.",
      )
    )
      return;
    const { error } = await supabase.from("material_folders").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (folderFilter === id) setFolderFilter("all");
    loadFolders();
    load();
  }

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    const rows = (data ?? []) as Material[];
    setMaterials(rows);
    // resolve signed urls for media
    const needs = rows.filter((m) => m.media_path);
    const map: Record<string, string> = {};
    await Promise.all(
      needs.map(async (m) => {
        const { data: s } = await supabase.storage
          .from("materials-media")
          .createSignedUrl(m.media_path!, 60 * 60 * 6);
        if (s?.signedUrl) map[m.id] = s.signedUrl;
      }),
    );
    setSignedUrls(map);
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      load();
      loadFolders();
      loadGroups();
    }
  }, [user]);

  const visible = materials.filter((m) => {
    if (!m.published && m.author_id !== user?.id) return false;
    if (tab !== "all" && m.pathway !== tab) return false;
    if (folderFilter === "unfiled" && m.folder_id) return false;
    if (folderFilter !== "all" && folderFilter !== "unfiled" && m.folder_id !== folderFilter)
      return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Educational Material"
        subtitle="Written teachings, audio sessions and videos, organised by pathway."
      />

      {isTeacher && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            You're signed in as a teacher, upload material below.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFolderManager((v) => !v)}>
              <FolderIcon className="h-4 w-4" />{" "}
              {showFolderManager ? "Close folders" : "Manage folders"}
            </Button>
            <Button
              onClick={() => {
                setEditing(null);
                setShowUpload((v) => !v);
              }}
            >
              {showUpload ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {showUpload ? "Close" : "New material"}
            </Button>
          </div>
        </div>
      )}

      {isTeacher && showFolderManager && (
        <div className="mb-6 rounded-xl border border-gold/40 bg-card/50 p-5">
          <p className="mb-3 font-serif text-lg text-primary">Folders</p>
          <div className="mb-4 flex gap-2">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder name…"
              onKeyDown={(e) => e.key === "Enter" && createFolder()}
            />
            <Button onClick={createFolder}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          {folders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No folders yet, add one above.</p>
          ) : (
            <div className="space-y-2">
              {folders.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/40 p-2.5"
                >
                  {renamingFolder === f.id ? (
                    <div className="flex flex-1 gap-2">
                      <Input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && renameFolder(f.id)}
                        autoFocus
                      />
                      <Button size="sm" onClick={() => renameFolder(f.id)}>
                        <Save className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setRenamingFolder(null)}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="flex items-center gap-2 text-sm text-foreground/90">
                        <FolderIcon className="h-4 w-4 text-gold" /> {f.name}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setRenamingFolder(f.id);
                            setRenameValue(f.name);
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteFolder(f.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isTeacher && (showUpload || editing) && (
        <MaterialUploadForm
          existing={editing}
          folders={folders}
          groups={groups}
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

      {folders.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <FolderIcon className="h-4 w-4 text-muted-foreground" />
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All folders</SelectItem>
              <SelectItem value="unfiled">Unfiled</SelectItem>
              {folders.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Tabs value={tab} onValueChange={setTab} className="mt-2">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {PATHWAYS.map((p) => (
            <TabsTrigger key={p} value={p}>
              {pathwayLabels[p]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-6">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
              <p className="font-serif text-xl text-primary">Nothing here yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {isTeacher
                  ? "Add the first piece of material for this pathway."
                  : "Material for this pathway is on the way."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {visible.map((m) => (
                <MaterialCard
                  key={m.id}
                  m={m}
                  url={signedUrls[m.id]}
                  folderName={folders.find((f) => f.id === m.folder_id)?.name}
                  groupName={groups.find((g) => g.id === m.group_id)?.name}
                  canEdit={isTeacher || m.author_id === user?.id}
                  onEdit={() => {
                    setShowUpload(false);
                    setEditing(m);
                  }}
                  onDeleted={load}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MaterialCard({
  m,
  url,
  folderName,
  groupName,
  canEdit,
  onEdit,
  onDeleted,
}: {
  m: Material;
  url: string | undefined;
  folderName?: string;
  groupName?: string;
  canEdit: boolean;
  onEdit: () => void;
  onDeleted: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  async function remove() {
    if (!confirm(`Delete "${m.title}"?`)) return;
    if (m.media_path) {
      await supabase.storage.from("materials-media").remove([m.media_path]);
    }
    const { error } = await supabase.from("materials").delete().eq("id", m.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      onDeleted();
    }
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-gold">
              {formatIcon(m.format)} {m.format}
            </span>
            <span>· {pathwayLabels[m.pathway] ?? m.pathway}</span>
            {folderName && (
              <span className="inline-flex items-center gap-1">
                · <FolderIcon className="h-3 w-3" /> {folderName}
              </span>
            )}
            {groupName && (
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold">
                {groupName} only
              </span>
            )}
            {!m.published && (
              <span className="inline-flex items-center gap-1">
                <EyeOff className="h-3 w-3" /> Draft
              </span>
            )}
          </div>
          <h3 className="mt-1 font-serif text-lg text-primary">{m.title}</h3>
          {m.description && <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>}
        </div>
        {canEdit && (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={remove}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4">
        {m.format === "video" && url && (
          <video src={url} controls className="w-full rounded-lg bg-black" />
        )}
        {m.format === "video" && !url && m.external_url && <YouTubeEmbed url={m.external_url} />}
        {m.format === "audio" && url && <audio src={url} controls className="w-full" />}
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
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-gold/15"
            >
              <FileText className="h-3.5 w-3.5" /> View
            </a>
            <a
              href={url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        )}
        {m.format === "image" && url && (
          <div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={url} alt={m.title} className="max-h-64 w-full rounded-lg object-cover" />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Image URL copied, paste it wherever you're adding it in");
              }}
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold"
            >
              <LinkIcon className="h-3.5 w-3.5" /> Copy image URL
            </button>
          </div>
        )}
        {m.format === "text" && m.body && (
          <div className="text-sm text-foreground/85">
            <div className={expanded ? "whitespace-pre-wrap" : "whitespace-pre-wrap line-clamp-6"}>
              {m.body}
            </div>
            {m.body.length > 400 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 text-xs text-gold underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}
      </div>

      <AddMaterialToPractices
        materialId={m.id}
        pathway={m.pathway ?? "general"}
        title={m.title}
        description={m.description}
        defaultMinutes={15}
      />

      <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Added {new Date(m.created_at).toLocaleDateString()}
      </p>
    </div>
  );
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
