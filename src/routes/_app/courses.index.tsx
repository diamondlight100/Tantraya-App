import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { courseRegistry } from "@/data/course-registry";
import { slugify, titleCaseSlug } from "@/lib/slugify";
import { groupByPathway } from "@/lib/pathway-order";
import { pathwayLabels } from "@/lib/homework";

const pathwayRoute: Record<string, string> = {
  daoist: "/pathways/daoist/$courseSlug",
  magick: "/pathways/magick/$courseSlug",
  buddhist: "/pathways/buddhist/$courseSlug",
};

// A course_slug that's really just the pathway's own name (a teacher tagging
// general pathway material rather than naming an actual course) shouldn't
// surface as a fake "course" of its own.
const pathwayAliases: Record<string, string[]> = {
  daoist: ["daoist", "daoism", "dao", "tao", "taoism", "taoist"],
  buddhist: ["buddhist", "buddhism", "buddha"],
  yogic: ["yogic", "yoga"],
  tantric: ["tantric", "tantra"],
  magick: ["magick", "magic"],
  bhakti: ["bhakti"],
  general: ["general"],
};

// Loose title match for dedup, titles drift over time ("Eight Extraordinary
// Meridians Qigong" vs. "The Eight Extraordinary Meridians Qigong"), so an
// exact-lowercase comparison alone misses near-duplicates like that.
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/^(the|a|an)\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleWords(title: string): string[] {
  return normalizeTitle(title)
    .split(" ")
    .filter((w) => w.length > 2); // drop "of", "an", "&" leftovers etc.
}

// Naive singular/plural equivalence, "mahavidya" vs "mahavidyas" is the
// same word, just typed without the trailing "s".
function wordMatches(a: string, b: string): boolean {
  return a === b || a + "s" === b || b + "s" === a;
}

function wordInList(word: string, list: string[]): boolean {
  return list.some((w) => wordMatches(word, w));
}

type KnownCourse = { slug: string; title: string };

// Deliberately pathway-independent: a course that got tagged under the wrong
// pathway, with a partial/reordered title, or singular/plural ("mahavidya"
// vs "mahavidyas"), is still the same real course and must not resurface as
// a fake duplicate. A plain substring check isn't enough, "Eight
// Meridians" is NOT a substring of "Eight Extraordinary Meridians Qigong"
// (the word "Extraordinary" sits in between) even though it's obviously the
// same course, so this checks whether every significant word of one title
// appears (allowing for singular/plural) in the other instead.
function isKnownCourse(
  candidateSlug: string,
  candidateTitle: string,
  known: KnownCourse[],
): boolean {
  const candWords = titleWords(candidateTitle);
  return known.some((k) => {
    if (candidateSlug === k.slug) return true;
    const knownWords = titleWords(k.title);
    if (candWords.length > 0 && candWords.every((w) => wordInList(w, knownWords))) return true;
    if (knownWords.length > 0 && knownWords.every((w) => wordInList(w, candWords))) return true;
    return false;
  });
}

type DynamicCourse = { pathway: string; slug: string; title: string };

async function loadDynamicCourses(known: KnownCourse[]): Promise<DynamicCourse[]> {
  // Only materials explicitly tagged with a course slug count as "a course" , 
  // a folder alone doesn't, since folders are often just a general filing
  // category (e.g. "Tantra") rather than one specific course, and using them
  // for this produced confusing, made-up-looking course cards.
  const { data: materials } = await supabase
    .from("materials")
    .select("pathway, course_slug")
    .eq("published", true)
    .not("course_slug", "is", null);

  const byKey = new Map<string, DynamicCourse>();
  for (const m of materials ?? []) {
    if (!m.course_slug) continue;
    // Normalize the tag first, "Lucid Dreaming" and "lucid-dreaming" are
    // the same course, they just weren't typed identically.
    const slug = slugify(m.course_slug);
    if (!slug || pathwayAliases[m.pathway]?.includes(slug)) continue;
    // Keyed by slug alone (not pathway::slug), the same course tagged under
    // two different pathways by mistake is still one course, and must only
    // show once on the Courses page, not once per pathway it was tagged in.
    if (byKey.has(slug)) continue;
    const title = titleCaseSlug(slug);
    if (isKnownCourse(slug, title, known)) continue;
    byKey.set(slug, { pathway: m.pathway, slug, title });
  }

  return [...byKey.values()].sort((a, b) => a.title.localeCompare(b.title));
}

export const Route = createFileRoute("/_app/courses/")({
  head: () => ({ meta: [{ title: "Courses · Tantraya" }] }),
  component: Courses,
});

function Courses() {
  const { data: dbCourses, isLoading: dbLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // A course flagged `core: true` also belongs to its own pathway (e.g. the
  // Eight Extraordinary Meridians is real Daoist material, Mettā & Tonglen
  // is real Buddhist material), so it's intentionally listed twice: once
  // here under its pathway, once more inside the Core Curriculum folder
  // (core.tsx, which filters on the same flag). The only thing that must
  // never double up is the *actual* Core Curriculum "section" itself, which
  // is why anything tagged pathway "general" (e.g. Self-Enquiry, filed under
  // no specific pathway on purpose) still gets dropped from `cards` below.
  const interactiveRegistry = courseRegistry.filter(
    (c) => c.course !== false && !c.selfStudy,
  );
  const selfStudyRegistry = courseRegistry.filter((c) => c.selfStudy);

  // Dedup considers every registered course, including core-only ones (e.g.
  // Mettā & Tonglen), those still shouldn't also show up as a "self-study"
  // duplicate just because something's tagged with a matching slug or a
  // partial title. Known aliases (e.g. "eem") count as the course's own slug
  // too. Deliberately pathway-independent (see isKnownCourse), a course
  // mistagged under the wrong pathway is still that same course.
  const registryKnown: KnownCourse[] = courseRegistry.flatMap((c) => [
    { slug: c.slug, title: c.title },
    ...(c.aliases ?? []).map((a) => ({ slug: a, title: c.title })),
  ]);

  // "Core" (or any material simply tagged with the pathway's own name, see
  // pathwayAliases) is the Core Curriculum, already linked in its own
  // Foundation block above, it must never also resurface as a generic
  // "Self-Study" course card, that's the exact duplicate/confusing-link bug
  // this guards against.
  registryKnown.push({ slug: "core", title: "Core Curriculum" });

  // The old `courses` table predates the hardcoded course pages and still has
  // rows for some of them, sometimes with a stale slug that no longer
  // matches the real route (e.g. "eem" vs. "eight-extraordinary-meridians").
  const dedupedDbCourses = (dbCourses ?? []).filter(
    (c) => !isKnownCourse(c.slug, c.title, registryKnown),
  );

  const allKnown: KnownCourse[] = [
    ...registryKnown,
    ...dedupedDbCourses.map((c) => ({ slug: c.slug, title: c.title })),
  ];

  const { data: dynamicCourses, isLoading: dynamicLoading } = useQuery({
    queryKey: [
      "dynamic-courses",
      allKnown
        .map((k) => `${k.slug}::${k.title}`)
        .sort()
        .join(","),
    ],
    queryFn: () => loadDynamicCourses(allKnown),
    enabled: !dbLoading,
  });

  const loading = dbLoading || dynamicLoading;

  // One combined list, grouped by pathway below, so "Buddhist", "Daoist" etc.
  // each show together instead of interleaved in fetch order, self-study
  // entries group under their real tagged pathway too, same as everything
  // else. Every card carries an accurate Interactive/Self-Study eyebrow , 
  // accurate because, post-dedup, a course can never appear as both.
  const cards: { pathway: string; key: string; node: ReactNode }[] = [];

  for (const c of interactiveRegistry) {
    cards.push({
      pathway: c.pathway,
      key: `registry::${c.pathway}::${c.slug}`,
      node: (
        <a
          href={c.href}
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Interactive</span>
          <h3 className="mt-2 font-serif text-3xl text-primary group-hover:text-gold">{c.title}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Open course →</p>
        </a>
      ),
    });
  }

  for (const c of selfStudyRegistry) {
    cards.push({
      pathway: c.pathway,
      key: `registry-self-study::${c.pathway}::${c.slug}`,
      node: (
        <Link
          to="/courses/$pathway/$slug"
          params={{ pathway: c.pathway, slug: c.slug }}
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Self-Study</span>
          <h3 className="mt-2 font-serif text-3xl text-primary group-hover:text-gold">{c.title}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Open course →</p>
        </Link>
      ),
    });
  }

  for (const c of dedupedDbCourses) {
    const to = pathwayRoute[c.pathway];
    const inner = (
      <>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Interactive</span>
        <h3 className="mt-2 font-serif text-3xl text-primary group-hover:text-gold">{c.title}</h3>
        {to && <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Open course →</p>}
      </>
    );
    cards.push({
      pathway: c.pathway,
      key: `db::${c.id}`,
      node: to ? (
        <Link
          to={to}
          params={{ courseSlug: c.slug }}
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          {inner}
        </Link>
      ) : (
        <article className="rounded-xl border border-border/60 bg-card/70 p-6">{inner}</article>
      ),
    });
  }

  for (const c of dynamicCourses ?? []) {
    cards.push({
      pathway: c.pathway,
      key: `dynamic::${c.pathway}::${c.slug}`,
      node: (
        <Link
          to="/courses/$pathway/$slug"
          params={{ pathway: c.pathway, slug: c.slug }}
          className="group block rounded-xl border border-border/60 bg-card/70 p-6 transition hover:border-gold/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Self-Study</span>
          <h3 className="mt-2 font-serif text-3xl text-primary group-hover:text-gold">{c.title}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Open course →</p>
        </Link>
      ),
    });
  }

  // Safety net: db-sourced/dynamic courses aren't hand-curated like the
  // registry above, so guard here too — nothing tagged pathway "general"
  // (i.e. Core) should ever get its own section on this page.
  const grouped = groupByPathway(cards.filter((c) => c.pathway !== "general"));

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Courses" subtitle="Every course, across every pathway." />

      <div className="mb-10">
        <Link
          to="/core"
          className="group block rounded-xl border border-gold/50 bg-card/70 p-6 transition hover:border-gold"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Foundation</span>
          <h3 className="mt-2 font-serif text-3xl text-primary group-hover:text-gold">Core Curriculum</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Eight Extraordinary Meridians, Mettā &amp; Tonglen, Sūrya Namaskāra, Nāḍī Śodhana, and other
            foundational material shared across every pathway.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">Open →</p>
        </Link>
      </div>

      {loading && <p className="text-muted-foreground">Loading…</p>}

      <div className="space-y-10">
        {grouped.map(([pathway, items]) => (
          <section key={pathway}>
            <h2 className="mb-4 font-serif text-2xl text-primary">
              {pathwayLabels[pathway] ?? pathway}
            </h2>
            <div className="grid gap-5">
              {items.map((c) => (
                <div key={c.key} className="contents">
                  {c.node}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {!loading && cards.length === 0 && (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
          <p className="font-serif text-2xl text-primary">No courses published yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            When teachers publish, they will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
