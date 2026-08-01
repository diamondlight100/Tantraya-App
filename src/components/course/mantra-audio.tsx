import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import { toast } from "sonner";
import { Mic, Square, Play, Loader2, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MantraRecording = {
  id: string;
  user_id: string;
  mantra_key: string;
  audio_path: string;
  is_reference: boolean;
  created_at: string;
};

export function MantraAudio({ mantraKey }: { mantraKey: string }) {
  const { user } = useAuth();
  const { isTeacher } = useRoles();

  const [reference, setReference] = useState<MantraRecording | null>(null);
  const [own, setOwn] = useState<MantraRecording | null>(null);
  const [refUrl, setRefUrl] = useState<string | null>(null);
  const [ownUrl, setOwnUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [recording, setRecording] = useState(false);
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null);
  const [saving, setSaving] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("mantra_recordings")
      .select("*")
      .eq("mantra_key", mantraKey);
    const rows = (data as MantraRecording[]) ?? [];
    const ref = rows.find((r) => r.is_reference) ?? null;
    const mine = user ? rows.find((r) => r.user_id === user.id && !r.is_reference) ?? null : null;
    setReference(ref);
    setOwn(mine);
    setLoading(false);
  }

  useEffect(() => {
    load();
    setRefUrl(null);
    setOwnUrl(null);
    setPendingBlob(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mantraKey, user]);

  useEffect(() => {
    if (reference && !refUrl) {
      supabase.storage.from("mantra-audio").createSignedUrl(reference.audio_path, 60 * 60).then(({ data }) => {
        if (data?.signedUrl) setRefUrl(data.signedUrl);
      });
    }
  }, [reference, refUrl]);

  useEffect(() => {
    if (own && !ownUrl) {
      supabase.storage.from("mantra-audio").createSignedUrl(own.audio_path, 60 * 60).then(({ data }) => {
        if (data?.signedUrl) setOwnUrl(data.signedUrl);
      });
    }
  }, [own, ownUrl]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        setPendingBlob(new Blob(chunksRef.current, { type: "audio/webm" }));
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setPendingBlob(null);
    } catch {
      toast.error("Couldn't access the microphone, check your browser permissions.");
    }
  }
  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  async function save(asReference: boolean) {
    if (!user || !pendingBlob) return;
    setSaving(true);
    const path = `${user.id}/${mantraKey}-${Date.now()}.webm`;
    const { error: upErr } = await supabase.storage.from("mantra-audio").upload(path, pendingBlob);
    if (upErr) { toast.error(upErr.message); setSaving(false); return; }

    // If replacing an existing reference or own recording, remove the old row/file first.
    const existing = asReference ? reference : own;
    if (existing) {
      await supabase.storage.from("mantra-audio").remove([existing.audio_path]);
      await supabase.from("mantra_recordings").delete().eq("id", existing.id);
    }

    const { error } = await supabase.from("mantra_recordings").insert({
      user_id: user.id,
      mantra_key: mantraKey,
      audio_path: path,
      is_reference: asReference,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(asReference ? "Saved as the reference recording." : "Your recording is saved.");
    setPendingBlob(null);
    setRefUrl(null);
    setOwnUrl(null);
    load();
  }

  async function deleteOwn() {
    if (!own) return;
    await supabase.storage.from("mantra-audio").remove([own.audio_path]);
    await supabase.from("mantra_recordings").delete().eq("id", own.id);
    setOwn(null);
    setOwnUrl(null);
    toast.success("Removed.");
  }

  if (loading) {
    return <div className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading audio…</div>;
  }

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border/50 bg-background/30 p-3">
      {/* Reference recording */}
      <div className="flex items-center gap-2">
        <Star className="h-3.5 w-3.5 shrink-0 text-gold" />
        {refUrl ? (
          <audio src={refUrl} controls className="h-8 flex-1" />
        ) : (
          <p className="text-xs text-muted-foreground">
            {isTeacher ? "No reference recording yet, record one below." : "No reference recording yet."}
          </p>
        )}
      </div>

      {/* Your own attempt */}
      <div className="flex items-center gap-2">
        <Mic className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {ownUrl ? (
          <>
            <audio src={ownUrl} controls className="h-8 flex-1" />
            <button onClick={deleteOwn} className="text-muted-foreground hover:text-rose-400" title="Delete your recording">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">You haven't recorded this one yet.</p>
        )}
      </div>

      {/* Record controls */}
      {user && (
        <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-border/40 pt-2">
          {!recording && !pendingBlob && (
            <button
              onClick={startRecording}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60 hover:text-primary"
            >
              <Mic className="h-3.5 w-3.5" /> Record yourself
            </button>
          )}
          {recording && (
            <button
              onClick={stopRecording}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/60 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300"
            >
              <Square className="h-3.5 w-3.5 animate-pulse" /> Stop
            </button>
          )}
          {pendingBlob && !recording && (
            <div className="flex w-full flex-col gap-2">
              <audio src={URL.createObjectURL(pendingBlob)} controls className="h-8 w-full" />
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={saving}
                  onClick={() => save(false)}
                  className={cn("inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/60 hover:text-primary")}
                >
                  <Play className="h-3.5 w-3.5" /> Save my attempt
                </button>
                {isTeacher && (
                  <button
                    disabled={saving}
                    onClick={() => save(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 px-3 py-1.5 text-xs text-primary"
                  >
                    <Star className="h-3.5 w-3.5" /> Publish as reference
                  </button>
                )}
                <button onClick={() => setPendingBlob(null)} className="text-xs text-muted-foreground hover:text-rose-400">
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
