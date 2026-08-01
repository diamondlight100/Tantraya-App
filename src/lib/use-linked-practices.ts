import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export type LinkedPractice = {
  id: string;
  name: string;
  description: string | null;
  body_layer: string;
  target_minutes: number | null;
  active: boolean;
};

/**
 * Practices the current user has linked to one specific course chapter
 * (pathway + course_slug + lesson_slug), the reverse direction of the link
 * made in the Practice Organiser's "From a course" picker.
 */
export function useLinkedPractices(pathway: string, courseSlug: string, lessonSlug: string) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["linked-practices", user?.id, pathway, courseSlug, lessonSlug],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("id, name, description, body_layer, target_minutes, active")
        .eq("pathway", pathway as "daoist" | "buddhist" | "yogic" | "tantric" | "magick" | "bhakti" | "general" | "medicine")
        .eq("course_slug", courseSlug)
        .eq("lesson_slug", lessonSlug)
        .eq("active", true)
        .is("removed_at", null);
      if (error) throw error;
      return (data ?? []) as LinkedPractice[];
    },
  });

  const addToSchedule = useMutation({
    mutationFn: async (input: { name: string; description: string; body_layer: string; target_minutes: number; icon?: string }) => {
      if (!user) throw new Error("Sign in to add this to your schedule.");
      const { error } = await supabase.from("practices").insert({
        user_id: user.id,
        name: input.name,
        description: input.description || null,
        body_layer: input.body_layer as "physical" | "etheric" | "emotional" | "mental" | "general",
        pathway: pathway as "daoist" | "buddhist" | "yogic" | "tantric" | "magick" | "bhakti" | "general",
        course_slug: courseSlug,
        lesson_slug: lessonSlug,
        target_minutes: input.target_minutes,
        icon: input.icon ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["linked-practices", user?.id, pathway, courseSlug, lessonSlug] });
      qc.invalidateQueries({ queryKey: ["practices"] });
    },
  });

  const removeFromSchedule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("practices").update({ active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["linked-practices", user?.id, pathway, courseSlug, lessonSlug] });
      qc.invalidateQueries({ queryKey: ["practices"] });
    },
  });

  return {
    practices: query.data ?? [],
    loading: query.isLoading,
    signedIn: !!user,
    addToSchedule,
    removeFromSchedule,
  };
}
