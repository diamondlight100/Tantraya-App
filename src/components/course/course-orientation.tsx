// Template for a course's own "Orientation" block, a short framing section
// naming the few core threads/themes that run through that specific course.
// Not every course needs one; add an `orientation` entry to a course's data
// only when there's a genuine framing worth naming (as with Faery
// Shamanism's Land / Ancestor / Otherworld). Renders identically wherever
// it's used, so any pathway's course-slug page can adopt the same pattern.
export type OrientationThread = { title: string; description: string };

export type CourseOrientationData = {
  heading: string;
  threads: OrientationThread[];
};

export function CourseOrientation({ heading, threads }: CourseOrientationData) {
  return (
    <section className="mb-8 rounded-2xl border border-border/60 bg-card/60 p-6">
      <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Orientation</p>
      <h2 className="mt-2 font-serif text-2xl text-primary">{heading}</h2>
      <div className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
        {threads.map((t) => (
          <div key={t.title}>
            <p className="font-serif text-base text-foreground">{t.title}</p>
            <p className="mt-1">{t.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
