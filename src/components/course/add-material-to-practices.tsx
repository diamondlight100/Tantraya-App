import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Link } from "@tanstack/react-router";
import { CalendarPlus, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LinkedPractice = {
  id: string;
  name: string;
  description: string | null;
  body_layer: string;
  target_minutes: number | null;
};

const bodyOptions = [
  { v: "physical",  label: "Physical" },
  { v: "etheric",   label: "Etheric" },
  { v: "emotional", label: "Emotional" },
  { v: "mental",    label: "Mental" },
  { v: "general",   label: "Integration" },
] as const;

const bodyLabels: Record<string, string> = {
  physical: "Physical",
  etheric: "Etheric",
  emotional: "Emotional",
  mental: "Mental",
  general: "Integration",
};

/**
 * Same idea as useLinkedPractices, but for a standalone uploaded material
 * (PDF/audio/video/text) rather than a built-in course chapter, keyed by
 * material_id instead of (pathway, course_slug, lesson_slug).
 */
function useLinkedPracticesByMaterial(materialId: string) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["linked-practices-material", user?.id, materialId],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("id, name, description, body_layer, target_minutes")
        .eq("material_id", materialId)
        .eq("active", true)
        .is("removed_at", null);
      if (error) throw error;
      return (data ?? []) as LinkedPractice[];
    },
  });

  const addToSchedule = useMutation({
    mutationFn: async (input: { name: string; description: string; pathway: string; body_layer: string; target_minutes: number }) => {
      if (!user) throw new Error("Sign in to add this to your schedule.");
      const { error } = await supabase.from("practices").insert({
        user_id: user.id,
        name: input.name,
        description: input.description || null,
        body_layer: input.body_layer as "physical" | "etheric" | "emotional" | "mental" | "general",
        pathway: input.pathway as "daoist" | "buddhist" | "yogic" | "tantric" | "magick" | "bhakti" | "general",
        material_id: materialId,
        target_minutes: input.target_minutes,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["linked-practices-material", user?.id, materialId] });
      qc.invalidateQueries({ queryKey: ["practices"] });
    },
  });

  const removeFromSchedule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("practices").update({ active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["linked-practices-material", user?.id, materialId] });
      qc.invalidateQueries({ queryKey: ["practices"] });
    },
  });

  return { practices: query.data ?? [], loading: query.isLoading, signedIn: !!user, addToSchedule, removeFromSchedule };
}

/**
 * Drop into a material card/viewer. Lets the student turn whatever they're
 * reading or listening to into a scheduled practice in one tap, and shows
 * anything they've already linked to this exact document.
 */
export function AddMaterialToPractices({
  materialId,
  pathway,
  title,
  description,
  defaultBodyLayer = "general",
  defaultMinutes = 15,
}: {
  materialId: string;
  pathway: string;
  title: string;
  description?: string | null;
  defaultBodyLayer?: "physical" | "etheric" | "emotional" | "mental" | "general";
  defaultMinutes?: number;
}) {
  const { practices, loading, signedIn, addToSchedule, removeFromSchedule } = useLinkedPracticesByMaterial(materialId);
  const [selectedBody, setSelectedBody] = useState<string>(defaultBodyLayer);
  const [isAdding, setIsAdding] = useState(false);

  if (!signedIn) return null;

  return (
    <div className="mt-3 border-t border-border/40 pt-3">
      {loading ? null : practices.length > 0 && (
        <ul className="mb-2 space-y-1.5">
          {practices.map((p) => (
            <li key={p.id} className="flex items-center gap-2 rounded-md border border-gold/30 bg-gold/5 px-2.5 py-1.5">
              <span className="flex-1 truncate text-xs text-foreground">{p.name}</span>
              <span className="shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {bodyLabels[p.body_layer] ?? p.body_layer}
              </span>
              <button
                onClick={() => removeFromSchedule.mutate(p.id)}
                disabled={removeFromSchedule.isPending}
                className="shrink-0 text-muted-foreground hover:text-rose-400"
                aria-label="Remove from schedule"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {isAdding ? (
        <>
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Which body does this work on for you?
          </p>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {bodyOptions.map((b) => (
              <button
                key={b.v}
                type="button"
                onClick={() => setSelectedBody(b.v)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] transition",
                  selectedBody === b.v ? "border-gold bg-gold/10 text-primary" : "border-border/60 text-muted-foreground hover:border-gold/50",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                addToSchedule.mutate(
                  {
                    name: title,
                    description: description ?? "",
                    pathway,
                    body_layer: selectedBody,
                    target_minutes: defaultMinutes,
                  },
                  { onSuccess: () => setIsAdding(false) },
                )
              }
              disabled={addToSchedule.isPending}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-widest text-gold transition hover:bg-gold/10",
                addToSchedule.isPending && "opacity-60",
              )}
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Confirm
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="text-[10px] text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-widest text-gold transition hover:bg-gold/10"
          >
            <CalendarPlus className="h-3.5 w-3.5" />
            {practices.length > 0 ? "Add another variant" : "Add to my practices"}
          </button>
          {practices.length > 0 && (
            <Link to="/schedule" className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-gold">
              Organise by body <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
