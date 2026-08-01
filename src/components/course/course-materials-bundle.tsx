import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { PathwayMaterials } from "@/components/course/pathway-materials";
import { courseRegistry } from "@/data/course-registry";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/**
 * The course's materials, presented as one collected package rather than a
 * pile of documents laid out flat, a graphic "cover" (a yantra, a glyph,
 * whatever fits the course) and title up front. Clicking it opens the full
 * materials list in a modal rather than expanding inline, so browsing a
 * long document list never pushes the rest of the course page down (it
 * used to, making pages very long to scroll back out of once opened).
 * Placed lower than the course's primary media tiles so it reads as a
 * secondary, easy-to-find resource rather than the first/main thing on the
 * page, still visible enough that a student won't miss that there's more
 * here.
 */
export function CourseMaterialsBundle({
  pathway,
  courseSlug,
  courseSlugAliases,
  title,
  cover,
  defaultOpen = false,
  label = "Course materials",
  materialGroups,
  otherGroupTitle,
}: {
  pathway: string;
  courseSlug: string;
  /** Close-variant slugs that should also count as this course, guards
   *  against a teacher typing e.g. "core-curriculum" instead of "core" in
   *  the Materials admin page's freehand Course field. */
  courseSlugAliases?: string[];
  title: string;
  cover: ReactNode;
  defaultOpen?: boolean;
  label?: string;
  materialGroups?: { title: string; slugs: string[] }[];
  /** Heading for material that matches none of `materialGroups`, passed
   *  through to `PathwayMaterials`. */
  otherGroupTitle?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  // Auto-pick up this course's registered aliases (e.g. the goddess names
  // that also mean "mahavidyas", or "eem" for eight-extraordinary-
  // meridians) so every course page benefits without each one having to
  // wire them in by hand, an explicitly passed `courseSlugAliases` prop
  // still wins/extends this.
  const registryAliases = courseRegistry.find((c) => c.slug === courseSlug)?.aliases;
  const effectiveAliases = [...(registryAliases ?? []), ...(courseSlugAliases ?? [])];

  return (
    <section className="mb-8 rounded-xl border border-gold/30 bg-card/40 p-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-4 text-left"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center">{cover}</div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{label}</p>
          <h3 className="mt-0.5 font-serif text-lg text-primary">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Click to open.
          </p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto sm:rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-primary">{title}</DialogTitle>
          </DialogHeader>
          <PathwayMaterials
            pathway={pathway}
            courseSlug={courseSlug}
            courseSlugAliases={effectiveAliases}
            courseTitle={title}
            groupByType={!materialGroups}
            materialGroups={materialGroups}
            {...(otherGroupTitle ? { otherGroupTitle } : {})}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
