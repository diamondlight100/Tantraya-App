import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Flame,
  Music2,
  Loader2,
  Send,
  UploadCloud,
  GripVertical,
  Trash2,
  Lock,
  Flower2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PathwayMaterials } from "@/components/course/pathway-materials";
import { pickPrasad, type Prasad } from "@/data/prasad";

export const Route = createFileRoute("/_app/bhakti")({
  head: () => ({ meta: [{ title: "Bhakti · Tantraya" }] }),
  component: BhaktiPage,
});

const MAX_SLOTS = 24;
const MAX_PERSONAL_SLOTS = 12;

type ImageItem = { id: string; title: string; media_path: string; display_order: number | null };
type AudioItem = { id: string; title: string; description: string | null; media_path: string };
type LoveNote = { id: string; note: string; created_at: string; user_id: string };

function BhaktiPage() {
  const { user } = useAuth();
  const { isTeacher } = useRoles();

  // Shared altar (teacher-uploaded, visible to everyone)
  const [images, setImages] = useState<ImageItem[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dragItem = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Personal altar (anyone's own images, visible only to them)
  const [personalImages, setPersonalImages] = useState<ImageItem[]>([]);
  const [personalImageUrls, setPersonalImageUrls] = useState<Record<string, string>>({});
  const [personalDragOver, setPersonalDragOver] = useState(false);
  const [personalUploading, setPersonalUploading] = useState(false);
  const personalDragItem = useRef<string | null>(null);
  const personalFileInputRef = useRef<HTMLInputElement>(null);

  // Love letters (private journal)
  const [notes, setNotes] = useState<LoveNote[]>([]);
  const [noteText, setNoteText] = useState("");
  const [posting, setPosting] = useState(false);

  // Offering → prasad
  const [offeringKind, setOfferingKind] = useState<"incense" | "flower" | null>(null);
  const [prasad, setPrasad] = useState<Prasad | null>(null);
  const [prasadImage, setPrasadImage] = useState<ImageItem | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [{ data: imgs }, { data: auds }, { data: n }, { data: personal }] = await Promise.all([
      supabase
        .from("materials")
        .select("id, title, media_path, display_order")
        .eq("pathway", "bhakti")
        .eq("format", "image")
        .eq("published", true)
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("materials")
        .select("id, title, description, media_path")
        .eq("pathway", "bhakti")
        .eq("format", "audio")
        .eq("published", true)
        .order("created_at", { ascending: false }),
      user
        ? supabase
            .from("love_notes")
            .select("id, note, created_at, user_id")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
        : Promise.resolve({ data: [] as LoveNote[] }),
      user
        ? supabase
            .from("personal_altar_images")
            .select("id, title, media_path, display_order")
            .eq("user_id", user.id)
            .order("display_order", { ascending: true, nullsFirst: false })
            .order("created_at", { ascending: false })
        : Promise.resolve({ data: [] as ImageItem[] }),
    ]);

    const imgRows = (imgs as ImageItem[]) ?? [];
    const audRows = (auds as AudioItem[]) ?? [];
    const personalRows = (personal as ImageItem[]) ?? [];
    setImages(imgRows);
    setAudios(audRows);
    setNotes((n as LoveNote[]) ?? []);
    setPersonalImages(personalRows);

    const [imgEntries, audEntries, personalEntries] = await Promise.all([
      Promise.all(
        imgRows.map(async (r) => {
          const { data } = await supabase.storage
            .from("materials-media")
            .createSignedUrl(r.media_path, 60 * 60 * 6);
          return [r.id, data?.signedUrl ?? ""] as const;
        }),
      ),
      Promise.all(
        audRows.map(async (r) => {
          const { data } = await supabase.storage
            .from("materials-media")
            .createSignedUrl(r.media_path, 60 * 60 * 6);
          return [r.id, data?.signedUrl ?? ""] as const;
        }),
      ),
      Promise.all(
        personalRows.map(async (r) => {
          const { data } = await supabase.storage
            .from("personal-altar")
            .createSignedUrl(r.media_path, 60 * 60 * 6);
          return [r.id, data?.signedUrl ?? ""] as const;
        }),
      ),
    ]);
    setImageUrls(Object.fromEntries(imgEntries));
    setAudioUrls(Object.fromEntries(audEntries));
    setPersonalImageUrls(Object.fromEntries(personalEntries));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [user?.id]);

  // ── Shared altar (teacher only) ──────────────────────────────
  async function uploadFiles(files: FileList | File[]) {
    if (!user || !isTeacher) return;
    const fileArr = Array.from(files);
    const imageFilesCount = fileArr.filter((f) => f.type.startsWith("image/")).length;
    if (images.length + imageFilesCount > MAX_SLOTS) {
      toast.error(`The altar only holds ${MAX_SLOTS} images at once, remove some first.`);
      return;
    }
    setUploading(true);
    let maxOrder = images.reduce((m, i) => Math.max(m, i.display_order ?? 0), 0);
    let succeeded = 0;
    let failed = 0;

    for (const file of fileArr) {
      const isImage = file.type.startsWith("image/");
      const isAudio = file.type.startsWith("audio/");
      if (!isImage && !isAudio) {
        toast.error(`${file.name}: only images and audio belong here`);
        failed++;
        continue;
      }
      const path = `bhakti/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: upErr } = await supabase.storage.from("materials-media").upload(path, file);
      if (upErr) {
        toast.error(`${file.name}: ${upErr.message}`);
        failed++;
        continue;
      }

      maxOrder += 1;
      const { error: insErr } = await supabase.from("materials").insert({
        author_id: user.id,
        pathway: "bhakti",
        title: file.name.replace(/\.[^.]+$/, ""),
        format: isImage ? "image" : "audio",
        media_path: path,
        display_order: isImage ? maxOrder : null,
        published: true,
      });
      if (insErr) {
        toast.error(`${file.name}: ${insErr.message}`);
        failed++;
        continue;
      }
      succeeded++;
    }
    setUploading(false);
    if (succeeded > 0) toast.success(`${succeeded} added to the altar.`);
    if (failed > 0 && succeeded === 0) toast.error("Nothing was saved, see the error above.");
    load();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (!isTeacher) return;
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  }

  async function reorder(fromId: string, toId: string) {
    const fromIdx = images.findIndex((i) => i.id === fromId);
    const toIdx = images.findIndex((i) => i.id === toId);
    if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;
    const next = [...images];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setImages(next);
    await Promise.all(
      next.map((img, idx) =>
        supabase
          .from("materials")
          .update({ display_order: idx + 1 })
          .eq("id", img.id),
      ),
    );
  }

  async function removeImage(id: string) {
    if (!confirm("Remove this image from the altar?")) return;
    const { error } = await supabase.from("materials").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    load();
  }

  // ── Personal altar (anyone, private) ─────────────────────────
  async function uploadPersonalFiles(files: FileList | File[]) {
    if (!user) return;
    const fileArr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArr.length === 0) {
      toast.error("Only images belong in your personal altar.");
      return;
    }
    if (personalImages.length + fileArr.length > MAX_PERSONAL_SLOTS) {
      toast.error(
        `Your altar only holds ${MAX_PERSONAL_SLOTS} images at once, remove some first.`,
      );
      return;
    }
    setPersonalUploading(true);
    let maxOrder = personalImages.reduce((m, i) => Math.max(m, i.display_order ?? 0), 0);
    let succeeded = 0;
    let failed = 0;

    for (const file of fileArr) {
      const path = `${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: upErr } = await supabase.storage.from("personal-altar").upload(path, file);
      if (upErr) {
        toast.error(`${file.name}: ${upErr.message}`);
        failed++;
        continue;
      }

      maxOrder += 1;
      const { error: insErr } = await supabase.from("personal_altar_images").insert({
        user_id: user.id,
        title: file.name.replace(/\.[^.]+$/, ""),
        media_path: path,
        display_order: maxOrder,
      });
      if (insErr) {
        toast.error(`${file.name}: ${insErr.message}`);
        failed++;
        continue;
      }
      succeeded++;
    }
    setPersonalUploading(false);
    if (succeeded > 0) toast.success(`${succeeded} added to your altar.`);
    if (failed > 0 && succeeded === 0) toast.error("Nothing was saved, see the error above.");
    load();
  }

  function handlePersonalDrop(e: React.DragEvent) {
    e.preventDefault();
    setPersonalDragOver(false);
    if (!user) return;
    if (e.dataTransfer.files?.length) uploadPersonalFiles(e.dataTransfer.files);
  }

  async function reorderPersonal(fromId: string, toId: string) {
    const fromIdx = personalImages.findIndex((i) => i.id === fromId);
    const toIdx = personalImages.findIndex((i) => i.id === toId);
    if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;
    const next = [...personalImages];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setPersonalImages(next);
    await Promise.all(
      next.map((img, idx) =>
        supabase
          .from("personal_altar_images")
          .update({ display_order: idx + 1 })
          .eq("id", img.id),
      ),
    );
  }

  async function removePersonalImage(id: string) {
    if (!confirm("Remove this image from your altar?")) return;
    const { error } = await supabase.from("personal_altar_images").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    load();
  }

  // ── Love letters ──────────────────────────────────────────────
  async function postNote() {
    if (!user || !noteText.trim()) return;
    setPosting(true);
    const { error } = await supabase.from("love_notes").insert({
      user_id: user.id,
      note: noteText.trim(),
    });
    setPosting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setNoteText("");
    toast.success("Left with love.");
    load();
  }

  // ── Offer incense / a flower, receive prasad ─────────────────
  function makeOffering(kind: "incense" | "flower") {
    if (offeringKind) return;
    setOfferingKind(kind);
    setPrasad(null);
    setPrasadImage(null);
    window.setTimeout(() => {
      const next = pickPrasad(images.length > 0);
      setPrasad(next);
      if (next.kind === "image" && images.length > 0) {
        setPrasadImage(images[Math.floor(Math.random() * images.length)]);
      }
      if (next.kind === "sound" && bellAudioRef.current) {
        bellAudioRef.current.currentTime = 0;
        bellAudioRef.current.play().catch(() => {});
      }
      setOfferingKind(null);
      if (user) {
        supabase
          .from("bhakti_offerings" as any)
          .insert({ user_id: user.id, kind, prasad_kind: next.kind } as any)
          .then(() => {});
      }
    }, 1400);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-2 flex items-center justify-center gap-2 text-gold">
        <Flame className="h-5 w-5" />
      </div>
      <PageHeader
        title="Bhakti"
        subtitle="A space for the heart, those we love, the songs that open it, and whatever wants to be offered."
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      ) : (
        <>
          {/* The shared altar */}
          <section
            onDragOver={(e) => {
              e.preventDefault();
              if (isTeacher && images.length < MAX_SLOTS) setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              "mb-12 rounded-2xl border-2 border-dashed p-6 transition",
              dragOver ? "border-gold bg-gold/10" : "border-transparent",
            )}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                Those we love
                {images.length > 0 && (
                  <span className="ml-2 normal-case tracking-normal text-muted-foreground">
                    {images.length} of {MAX_SLOTS} offerings
                  </span>
                )}
              </p>
              {isTeacher && images.length < MAX_SLOTS && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-gold"
                >
                  {uploading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <UploadCloud className="h-3 w-3" />
                  )}
                  {uploading ? "Adding…" : "Add an offering"}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,audio/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && uploadFiles(e.target.files)}
              />
            </div>

            {isTeacher && images.length === 0 && audios.length === 0 && (
              <p className="mb-6 text-center text-xs text-muted-foreground">
                Nothing here yet, drag an image anywhere onto this space, or use "Add an offering"
                above.
              </p>
            )}
            {isTeacher && images.length >= MAX_SLOTS && (
              <p className="mb-4 text-center text-xs text-muted-foreground">
                The altar is full for now ({MAX_SLOTS} of {MAX_SLOTS}), remove one to add another.
              </p>
            )}

            {images.length > 0 && (
              <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    draggable={isTeacher}
                    onDragStart={() => {
                      dragItem.current = img.id;
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragItem.current) reorder(dragItem.current, img.id);
                    }}
                    className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gold/30 bg-card/40 shadow-sm transition hover:border-gold/60"
                  >
                    {imageUrls[img.id] && (
                      <img
                        src={imageUrls[img.id]}
                        alt={img.title}
                        className="w-full object-cover"
                      />
                    )}
                    <p className="p-2 text-center font-serif text-sm text-primary">{img.title}</p>
                    {isTeacher && (
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                        <span className="cursor-grab rounded-full bg-background/70 p-1.5 text-foreground/80">
                          <GripVertical className="h-3.5 w-3.5" />
                        </span>
                        <button
                          onClick={() => removeImage(img.id)}
                          className="rounded-full bg-background/70 p-1.5 text-foreground/80 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!isTeacher && images.length === 0 && audios.length === 0 && (
              <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
                <p className="font-serif text-xl text-primary">Quiet, for now</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Images and kirtan are on the way.
                </p>
              </div>
            )}
          </section>

          {/* Bhajans / Kirtan */}
          {audios.length > 0 && (
            <section className="mb-12">
              <p className="mb-4 text-center text-[10px] uppercase tracking-[0.35em] text-gold">
                Songs that open the heart
              </p>
              <div className="mx-auto max-w-2xl space-y-3">
                {audios.map((a) => (
                  <div key={a.id} className="rounded-xl border border-border/60 bg-card/50 p-4">
                    <p className="flex items-center gap-2 font-serif text-lg text-primary">
                      <Music2 className="h-4 w-4 text-gold" /> {a.title}
                    </p>
                    {a.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                    )}
                    {audioUrls[a.id] && (
                      <audio src={audioUrls[a.id]} controls className="mt-3 w-full" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Offer incense / a flower, receive prasad */}
          <section className="mb-12">
            <p className="mb-5 text-center text-[10px] uppercase tracking-[0.35em] text-gold">
              Offer Something
            </p>

            <audio ref={bellAudioRef} src="/sounds/temple-bell.mp3" preload="auto" />

            <div className="mx-auto flex max-w-md items-center justify-center gap-4">
              <button
                onClick={() => makeOffering("incense")}
                disabled={!!offeringKind}
                className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-gold/30 bg-card/40 px-4 py-6 text-center transition hover:border-gold/60 hover:bg-gold/5 disabled:opacity-60"
              >
                <Flame
                  className={cn(
                    "h-6 w-6 text-gold",
                    offeringKind === "incense" && "animate-pulse",
                  )}
                />
                <span className="text-sm text-primary">
                  {offeringKind === "incense" ? "Offering…" : "Offer incense"}
                </span>
              </button>
              <button
                onClick={() => makeOffering("flower")}
                disabled={!!offeringKind}
                className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-gold/30 bg-card/40 px-4 py-6 text-center transition hover:border-gold/60 hover:bg-gold/5 disabled:opacity-60"
              >
                <Flower2
                  className={cn(
                    "h-6 w-6 text-gold",
                    offeringKind === "flower" && "animate-spin [animation-duration:2s]",
                  )}
                />
                <span className="text-sm text-primary">
                  {offeringKind === "flower" ? "Offering…" : "Offer a flower"}
                </span>
              </button>
            </div>

            {prasad && (
              <div className="mx-auto mt-6 max-w-lg animate-in fade-in zoom-in-95 duration-500">
                {prasad.kind === "poem" && (
                  <div className="rounded-2xl border border-gold/40 bg-gold/5 p-6 text-center">
                    <p className="font-serif text-lg italic text-primary">"{prasad.text}"</p>
                    <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {prasad.attribution}
                    </p>
                  </div>
                )}
                {prasad.kind === "blessing" && (
                  <div className="rounded-2xl border border-gold/40 bg-gold/5 p-6 text-center">
                    <p className="font-serif text-lg text-primary">{prasad.text}</p>
                  </div>
                )}
                {prasad.kind === "sound" && (
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold/40 bg-gradient-to-b from-gold/15 to-transparent p-6 text-center">
                    <Sparkles className="h-6 w-6 animate-pulse text-gold" />
                    <p className="font-serif text-lg text-primary">{prasad.text}</p>
                  </div>
                )}
                {prasad.kind === "image" && prasadImage && (
                  <div className="overflow-hidden rounded-2xl border border-gold/40 bg-card/40 text-center shadow-sm">
                    {imageUrls[prasadImage.id] && (
                      <img
                        src={imageUrls[prasadImage.id]}
                        alt={prasadImage.title}
                        className="w-full object-cover"
                      />
                    )}
                    <p className="p-3 font-serif text-sm text-primary">{prasadImage.title}</p>
                  </div>
                )}
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Prasad, received back.
                </p>
              </div>
            )}
          </section>

          {/* Your own altar, private to you */}
          {user && (
            <section
              onDragOver={(e) => {
                e.preventDefault();
                if (personalImages.length < MAX_PERSONAL_SLOTS) setPersonalDragOver(true);
              }}
              onDragLeave={() => setPersonalDragOver(false)}
              onDrop={handlePersonalDrop}
              className={cn(
                "mb-12 rounded-2xl border-2 border-dashed p-6 transition",
                personalDragOver ? "border-gold bg-gold/10" : "border-transparent",
              )}
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.35em] text-gold">
                  <Lock className="h-3 w-3" /> Your Own Altar
                  {personalImages.length > 0 && (
                    <span className="ml-1 normal-case tracking-normal text-muted-foreground">
                      {personalImages.length} of {MAX_PERSONAL_SLOTS}
                    </span>
                  )}
                </p>
                {personalImages.length < MAX_PERSONAL_SLOTS && (
                  <button
                    onClick={() => personalFileInputRef.current?.click()}
                    disabled={personalUploading}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-gold"
                  >
                    {personalUploading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <UploadCloud className="h-3 w-3" />
                    )}
                    {personalUploading ? "Adding…" : "Add your own"}
                  </button>
                )}
                <input
                  ref={personalFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && uploadPersonalFiles(e.target.files)}
                />
              </div>

              <p className="mb-4 text-center text-[11px] text-muted-foreground">
                Private to you, no one else, not even a teacher or admin, can see these.
              </p>

              {personalImages.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground">
                  Nothing here yet, drag an image anywhere onto this space, or use "Add your own"
                  above.
                </p>
              ) : (
                <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
                  {personalImages.map((img) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={() => {
                        personalDragItem.current = img.id;
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (personalDragItem.current)
                          reorderPersonal(personalDragItem.current, img.id);
                      }}
                      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gold/30 bg-card/40 shadow-sm transition hover:border-gold/60"
                    >
                      {personalImageUrls[img.id] && (
                        <img
                          src={personalImageUrls[img.id]}
                          alt={img.title}
                          className="w-full object-cover"
                        />
                      )}
                      <p className="p-2 text-center font-serif text-sm text-primary">{img.title}</p>
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                        <span className="cursor-grab rounded-full bg-background/70 p-1.5 text-foreground/80">
                          <GripVertical className="h-3.5 w-3.5" />
                        </span>
                        <button
                          onClick={() => removePersonalImage(img.id)}
                          className="rounded-full bg-background/70 p-1.5 text-foreground/80 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Love letters to the Divine */}
          <section>
            <p className="mb-4 text-center text-[10px] uppercase tracking-[0.35em] text-gold">
              Love Letters to the Divine
            </p>

            <div className="mx-auto max-w-xl rounded-2xl border border-gold/40 bg-gold/5 p-5">
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Whatever wants to be said…"
                rows={3}
              />
              <div className="mt-3 flex items-center justify-end">
                <Button
                  onClick={postNote}
                  disabled={posting || !noteText.trim()}
                  size="sm"
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  <Send className="h-3.5 w-3.5" /> {posting ? "Leaving…" : "Leave it"}
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-foreground/80">
                Private to you, no one else, not even a teacher or admin, can read your letters.
              </p>
            </div>

            {notes.length > 0 && (
              <div className="mx-auto mt-8 max-w-3xl columns-1 gap-4 sm:columns-2 md:columns-3">
                {notes.map((n) => (
                  <div
                    key={n.id}
                    className="mb-4 break-inside-avoid rounded-xl border border-border/50 bg-card/40 p-4"
                  >
                    <p className="whitespace-pre-wrap text-sm italic text-foreground/85">
                      "{n.note}"
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {new Date(n.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      <h2 className="mb-4 mt-10 font-serif text-2xl text-primary">Materials</h2>
      <PathwayMaterials pathway="bhakti" />
    </div>
  );
}
