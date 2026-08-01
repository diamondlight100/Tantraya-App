import { lazy, Suspense } from "react";
import { ClientOnly } from "@/components/client-only";

// Same lazy-load reasoning as the /library reader: pdfjs-dist can't run in
// the Workers server bundle, so this import must never be evaluated there.
const PdfReader = lazy(() =>
  import("@/components/library/pdf-reader").then((m) => ({ default: m.PdfReader })),
);

const loadingFallback = (
  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
    Loading reader…
  </div>
);

/**
 * The real in-app PDF reader (highlighting, notes, stays on the page) for
 * any uploaded material, replaces raw <object>/<iframe> embeds and plain
 * "View" links, which some browsers pop out to a new tab instead of
 * rendering inline.
 */
export function ManualReader({
  url,
  materialId,
  title,
  className = "h-[80vh] overflow-hidden rounded-xl border border-border/60 bg-black",
}: {
  url: string;
  materialId: string;
  title: string;
  /** Override the default fixed-height block, e.g. `h-full` when the parent (a dialog) already controls height. */
  className?: string;
}) {
  return (
    <div className={className}>
      <ClientOnly fallback={loadingFallback}>
        {() => (
          <Suspense fallback={loadingFallback}>
            <PdfReader fileUrl={url} materialId={materialId} bookTitle={title} />
          </Suspense>
        )}
      </ClientOnly>
    </div>
  );
}
