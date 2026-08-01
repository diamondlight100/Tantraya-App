import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { MeridianChart } from "@/components/meridian/MeridianChart";
import { renMai } from "@/data/meridians/ren-mai";
import { duMai } from "@/data/meridians/du-mai";
import { daiMai } from "@/data/meridians/dai-mai";
import { chongMai } from "@/data/meridians/chong-mai";
import { yangQiaoMai } from "@/data/meridians/yang-qiao-mai";
import { yinQiaoMai } from "@/data/meridians/yin-qiao-mai";
import { yangWeiMai } from "@/data/meridians/yang-wei-mai";
import { yinWeiMai } from "@/data/meridians/yin-wei-mai";
import { RelatedPractices } from "@/components/course/related-practices";

const meridians = {
  "ren-mai": renMai,
  "du-mai": duMai,
  "dai-mai": daiMai,
  "chong-mai": chongMai,
  "yang-qiao-mai": yangQiaoMai,
  "yin-qiao-mai": yinQiaoMai,
  "yang-wei-mai": yangWeiMai,
  "yin-wei-mai": yinWeiMai,
} as const;

export const Route = createFileRoute(
  "/_app/pathways/daoist/$courseSlug/meridians/$meridianSlug",
)({
  loader: ({ params }) => {
    const m = meridians[params.meridianSlug as keyof typeof meridians];
    if (!m) throw notFound();
    return { meridian: m };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.meridian.name} (${loaderData.meridian.english}) · Interactive chart`,
          },
          { name: "description", content: loaderData.meridian.summary.slice(0, 150) },
        ]
      : [],
  }),
  component: MeridianPage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Meridian not found.</div>
  ),
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">
      Something went wrong loading this chart.
    </div>
  ),
});

function MeridianPage() {
  const { courseSlug, meridianSlug } = Route.useParams();
  const { meridian } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Link
        to="/pathways/daoist/$courseSlug"
        params={{ courseSlug }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Course overview
      </Link>

      <header>
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
          Meridian atlas
        </p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">
          {meridian.name}{" "}
          <span className="text-2xl font-normal text-muted-foreground">
            · {meridian.english}
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meridian.chinese} · {meridian.points.length} points
        </p>
        <p className="mt-4 max-w-3xl text-base text-foreground/80">
          {meridian.summary}
        </p>
      </header>

      <MeridianChart meridian={meridian} />

      <RelatedPractices
        pathway="daoist"
        courseSlug={`${courseSlug}-meridians`}
        lessonSlug={meridianSlug}
        defaultName={`${meridian.name} (${meridian.english}) practice`}
        defaultDescription={meridian.summary}
        defaultBodyLayer="etheric"
        defaultMinutes={15}
      />

      <p className="border-l-2 border-border/60 pl-3 text-xs text-muted-foreground">
        Point information condensed from Deadman, Al-Khafaji & Baker, <em>A Manual
        of Acupuncture</em>, and the WHO Standard Acupuncture Point Locations.
        Educational reference, not a substitute for trained clinical practice.
      </p>
    </div>
  );
}
