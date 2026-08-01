import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { baguaTopics, getBaguaTopic } from "@/data/daoist/bagua-taiji-course";
import { NineJointsWheel, PolarityCards, ChengLinesPath } from "@/components/course/bagua-widgets";
import { MeridianChart } from "@/components/meridian/MeridianChart";
import { chongMai } from "@/data/meridians/chong-mai";
import { JournalReflection } from "@/components/course/journal-reflection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/_app/pathways/daoist/bagua-taiji/$topicSlug")({
  loader: ({ params }) => {
    const topic = getBaguaTopic(params.topicSlug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.topic.title} · Baguazhang · Tantraya` },
          { name: "description", content: loaderData.topic.summary },
        ]
      : [],
  }),
  component: BaguaTopicPage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Topic not found.</div>
  ),
});

function Widget({ kind, topicSlug }: { kind?: string; topicSlug: string }) {
  switch (kind) {
    case "nine-joints":
      return <NineJointsWheel />;
    case "polarity-cards":
      return <PolarityCards topicSlug={topicSlug} />;
    case "cheng-lines-path":
      return <ChengLinesPath />;
    case "chong-mai":
      return (
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            The Chong Mai line, Hui Yin to Bai Hui
          </p>
          <MeridianChart meridian={chongMai} />
        </div>
      );
    default:
      return null;
  }
}

function BaguaTopicPage() {
  const { topicSlug } = Route.useParams();
  const { topic } = Route.useLoaderData();

  const idx = baguaTopics.findIndex((t) => t.slug === topicSlug);
  const prev = baguaTopics[(idx - 1 + baguaTopics.length) % baguaTopics.length];
  const next = baguaTopics[(idx + 1) % baguaTopics.length];

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/pathways/daoist/bagua-taiji"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> All gates
      </Link>

      {topic.heroImage && (
        <img
          src={topic.heroImage}
          alt={topic.title}
          className="mb-8 w-full rounded-2xl border border-border/40 object-cover"
        />
      )}

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
          Gate {topic.gate} of 8 · {topic.standsFor}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">{topic.title}</h1>
        <p className="mt-3 max-w-2xl text-base text-foreground/80">{topic.summary}</p>
      </header>

      <Accordion type="single" collapsible defaultValue="section-0" className="space-y-3">
        {topic.sections.map((s, i) => (
          <AccordionItem
            key={i}
            value={`section-${i}`}
            className="overflow-hidden rounded-2xl border border-border/60 bg-card/50 px-6 last:border-b"
          >
            <AccordionTrigger className="font-serif text-xl text-gold hover:no-underline">
              {s.heading}
            </AccordionTrigger>
            <AccordionContent>
              {s.image && (
                <img
                  src={s.image}
                  alt={s.heading}
                  className="mb-4 w-full rounded-xl border border-border/40 object-contain"
                />
              )}
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">{s.body}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {topic.widget && (
        <div className="mt-8">
          <Widget kind={topic.widget} topicSlug={topic.slug} />
        </div>
      )}

      <div className="mt-8">
        <JournalReflection
          courseSlug="bagua-taiji"
          lessonSlug={topic.slug}
          prompt={topic.reflectionPrompt}
        />
      </div>

      <nav className="mt-10 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
        <Link
          to="/pathways/daoist/bagua-taiji/$topicSlug"
          params={{ topicSlug: prev.slug }}
          className="group flex items-center gap-2 rounded-xl border border-border/60 p-4 text-left transition hover:border-gold/50"
        >
          <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Gate {prev.gate}</p>
            <p className="font-serif text-primary group-hover:text-gold">{prev.title}</p>
          </div>
        </Link>
        <Link
          to="/pathways/daoist/bagua-taiji/$topicSlug"
          params={{ topicSlug: next.slug }}
          className="group flex items-center justify-end gap-2 rounded-xl border border-border/60 p-4 text-right transition hover:border-gold/50"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Gate {next.gate}</p>
            <p className="font-serif text-primary group-hover:text-gold">{next.title}</p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>
      </nav>
    </div>
  );
}
