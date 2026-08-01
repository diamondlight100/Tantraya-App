import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Compass, BookOpen, Users, Calendar, NotebookPen } from "lucide-react";
import tantrayaLogo from "@/assets/branding/tantraya-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tantraya, Tools for Transformation" },
      {
        name: "description",
        content: "Student portal for Tantraya. Courses, practices, journal, community.",
      },
    ],
  }),
  component: Landing,
});

const pillars = [
  { icon: Compass, title: "Pathways", text: "Daoist · Buddhist · Tantric · Magick" },
  { icon: BookOpen, title: "Courses & Material", text: "Written, audio and video teachings" },
  { icon: NotebookPen, title: "Journal & Reflection", text: "Guided prompts, mood, goals" },
  { icon: Calendar, title: "Practice Schedule", text: "Design your daily Sādhanā by body" },
  { icon: Users, title: "Community & Forum", text: "Cohorts, intakes, shared inquiry" },
];

function Landing() {
  return (
    <main className="min-h-dvh">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
          <img
            src={tantrayaLogo}
            alt="Tantraya, Tools for Transformation"
            className="mx-auto mb-8 h-40 w-40 sm:h-52 sm:w-52"
          />
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Tantraya</p>
          <h1 className="mt-6 font-serif text-5xl text-primary sm:text-7xl">
            Tools for Transformation
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A living portal for students of the path, synthesizing Tantra, Buddhism, Daoism,
            shamanism, and Western magick into a coherent practice.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/dashboard">Enter the Portal</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-primary sm:text-4xl">Inside the Portal</h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to walk the path with depth and consistency.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur transition hover:border-gold/40 hover:bg-card"
            >
              <Icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-serif text-xl text-primary">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        Tantraya · Sacred Valley of Peru
      </footer>
    </main>
  );
}
