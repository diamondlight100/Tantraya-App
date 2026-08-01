import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { courseRegistry } from "@/data/course-registry";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";

export const Route = createFileRoute("/_app/core/")({
  head: () => ({ meta: [{ title: "Core Curriculum · Tantraya" }] }),
  component: CoreCurriculum,
});

function CoreCurriculum() {
  // Deliberately flat, not grouped by pathway: on their own pathway pages
  // and the Courses page these still show their real pathway (Self-Enquiry
  // is filed under "tantric" there, etc.), but here on Core Curriculum
  // they're all just "core curriculum" — labeling them by pathway here
  // both misrepresents ones that don't cleanly belong to one tradition
  // (e.g. Self-Enquiry) and makes the page look like only a few pathways
  // are represented, which isn't the point of this page.
  const items = courseRegistry.filter((c) => c.core);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Core Curriculum"
        subtitle="The foundational practices every student walks through, regardless of pathway."
      />
      <CourseMaterialsBundle
        pathway="general"
        courseSlug="core"
        courseSlugAliases={["core-curriculum", "corecurriculum"]}
        title="Core Curriculum"
        label="Core Materials"
        cover={
          <div className="flex h-full w-full items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Library className="h-6 w-6 text-gold" />
          </div>
        }
      />
      <div className="grid gap-5">
        {items.map((c) => (
          <a
            key={`${c.pathway}::${c.slug}`}
            href={c.href}
            className="group block rounded-xl border border-gold/40 bg-gold/5 p-6 transition hover:border-gold"
          >
            <h3 className="font-serif text-3xl text-primary group-hover:text-gold">{c.title}</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Open →</p>
          </a>
        ))}
      </div>
    </div>
  );
}
