import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { DrippedVideoCourse, YouTubeSegment } from "@/components/course/youtube-segment";

export const Route = createFileRoute("/_app/video-demo")({
  head: () => ({ meta: [{ title: "Video segments demo · Tantraya" }] }),
  component: VideoDemo,
});

// A public 10-minute YouTube test video, sliced into three "drip" segments.
// Replace `videoId`, `start`, `end` and copy with your own teachings.
const VIDEO = "aqz-KE-bpKQ"; // Big Buck Bunny, safe public test video

function VideoDemo() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="YouTube segments, preview"
        subtitle="One video, sliced into drip-released sections with timestamp chapters, auto-pause, and per-segment completion."
      />

      <section className="mb-12">
        <h2 className="mb-3 font-serif text-xl text-primary">Single segment with chapters</h2>
        <YouTubeSegment
          videoId={VIDEO}
          start={0}
          end={120}
          title="Opening, the journey begins"
          description="A short 2-minute opening. Click a chapter to jump; the player auto-pauses at the segment end."
          chapters={[
            { label: "Intro", start: 0 },
            { label: "First movement", start: 30 },
            { label: "Closing breath", start: 90 },
          ]}
        />
      </section>

      <section>
        <h2 className="mb-3 font-serif text-xl text-primary">Drip-fed series (one video, three parts)</h2>
        <DrippedVideoCourse
          storageKey="tantraya.demo.drip"
          segments={[
            {
              id: "part-1",
              videoId: VIDEO,
              start: 0,
              end: 120,
              title: "Part 1, Foundation",
              description: "Watch to the end, then mark complete to unlock Part 2.",
            },
            {
              id: "part-2",
              videoId: VIDEO,
              start: 120,
              end: 240,
              title: "Part 2, Deepening",
              description: "Builds on Part 1.",
            },
            {
              id: "part-3",
              videoId: VIDEO,
              start: 240,
              end: 360,
              title: "Part 3, Integration",
              description: "Closes the arc.",
            },
          ]}
        />
      </section>
    </div>
  );
}
