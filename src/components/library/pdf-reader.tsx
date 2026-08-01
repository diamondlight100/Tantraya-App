import { useEffect, useMemo, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import {
  highlightPlugin,
  HighlightArea,
  RenderHighlightContentProps,
  RenderHighlightsProps,
  RenderHighlightTargetProps,
  Trigger,
} from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Highlighter, StickyNote, Trash2 } from "lucide-react";

const COLORS: Record<string, string> = {
  yellow: "rgba(255, 226, 76, 0.45)",
  green: "rgba(132, 220, 132, 0.45)",
  pink: "rgba(255, 153, 204, 0.45)",
  blue: "rgba(132, 188, 255, 0.45)",
};

export type HighlightRow = {
  id: string;
  user_id: string;
  item_id: string | null;
  material_id: string | null;
  page_index: number;
  quote: string;
  note: string | null;
  color: string;
  areas: HighlightArea[] | null;
  created_at: string;
};

/**
 * `itemId` (a /library book) and `materialId` (an uploaded course manual)
 * are alternatives, pass exactly one. Both share the same highlight/notes
 * table (library_highlights), just keyed by whichever column applies.
 */
export function PdfReader({
  fileUrl,
  itemId,
  materialId,
}: {
  fileUrl: string;
  itemId?: string;
  materialId?: string;
  bookTitle: string;
  bookAuthor?: string | null;
}) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<HighlightRow[]>([]);
  const sourceColumn = itemId ? "item_id" : "material_id";
  const sourceId = itemId ?? materialId!;
  const sourceField = itemId ? { item_id: itemId } : { material_id: materialId! };

  async function load() {
    if (!user) return;
    const { data } = await supabase
      .from("library_highlights")
      .select("*")
      .eq(sourceColumn, sourceId)
      .eq("user_id", user.id)
      .order("page_index", { ascending: true });
    setNotes((data ?? []) as HighlightRow[]);
  }
  useEffect(() => {
    load();
  }, [user, sourceColumn, sourceId]);

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 6,
        display: "flex",
        gap: 4,
        padding: 4,
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        zIndex: 50,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <Button
        size="sm"
        variant="ghost"
        title="Highlight"
        onClick={async () => {
          if (!user) return;
          const { error } = await supabase.from("library_highlights").insert({
            user_id: user.id,
            ...sourceField,
            page_index: props.highlightAreas[0]?.pageIndex ?? 0,
            quote: props.selectedText,
            color: "yellow",
            areas: props.highlightAreas as any,
          });
          if (error) toast.error(error.message);
          else {
            toast.success("Highlighted");
            load();
            props.cancel();
          }
        }}
      >
        <Highlighter className="h-3.5 w-3.5" />
      </Button>
      <Button size="sm" variant="ghost" title="Add note" onClick={props.toggle}>
        <StickyNote className="h-3.5 w-3.5" />
      </Button>
    </div>
  );

  const renderHighlightContent = (props: RenderHighlightContentProps) => {
    const [text, setText] = useState("");
    return (
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 8,
          padding: 12,
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 50,
          width: 280,
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your note…"
          rows={4}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={props.cancel}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              if (!user) return;
              const { error } = await supabase.from("library_highlights").insert({
                user_id: user.id,
                ...sourceField,
                page_index: props.highlightAreas[0]?.pageIndex ?? 0,
                quote: props.selectedText,
                note: text || null,
                color: "yellow",
                areas: props.highlightAreas as any,
              });
              if (error) toast.error(error.message);
              else {
                toast.success("Saved");
                load();
                props.cancel();
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };

  const renderHighlights = (props: RenderHighlightsProps) => (
    <>
      {notes.flatMap((n) =>
        (n.areas ?? [])
          .filter((a) => a.pageIndex === props.pageIndex)
          .map((a, i) => (
            <div
              key={`${n.id}-${i}`}
              title={n.note ?? n.quote}
              style={{
                ...props.getCssProperties(a, props.rotation),
                background: COLORS[n.color] ?? COLORS.yellow,
                cursor: "pointer",
                mixBlendMode: "multiply",
              }}
            />
          )),
      )}
    </>
  );

  const hlPlugin = useMemo(
    () =>
      highlightPlugin({
        trigger: Trigger.TextSelection,
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights,
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }),
    [notes],
  );

  async function deleteNote(id: string) {
    const { error } = await supabase.from("library_highlights").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  }

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 overflow-hidden bg-neutral-900">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="h-full">
            <Viewer fileUrl={fileUrl} plugins={[hlPlugin]} theme="dark" />
          </div>
        </Worker>
      </div>

      <aside className="hidden w-80 shrink-0 flex-col border-l border-border/60 bg-card/40 md:flex">
        <div className="border-b border-border/60 p-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Notes & highlights
          </p>
          <p className="font-serif text-sm text-primary">{notes.length} saved</p>
        </div>

        <div className="flex-1 overflow-auto p-3">
          {notes.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Select any text in the book to highlight or add a personal note. If you have
              questions, ask in the forum.
            </p>
          ) : (
            <ul className="space-y-3">
              {notes.map((n) => (
                <li key={n.id} className="rounded-md border border-border/60 bg-background/40 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Page {n.page_index + 1}
                    </p>
                    <Button size="icon" variant="ghost" onClick={() => deleteNote(n.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <blockquote className="mt-1 border-l-2 border-gold/60 pl-2 text-xs italic text-foreground/80 line-clamp-4">
                    {n.quote}
                  </blockquote>
                  {n.note && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/90">{n.note}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
