import type { ReactNode } from "react";

export type RichLessonSection = { heading: string; body: string };

/**
 * A richer alternative to the Read/Practice/Quiz/Reflect tab pattern used by
 * the "flat" chunked-text courses, a hero with a per-lesson accent color,
 * a handful of prose sections, and a visually distinct practice block.
 * Built generically (accent color, hero graphic, and sections are all
 * optional/configurable) so it isn't locked to the Mahavidya course alone.
 *
 * The accent color is scoped to this component instance only, via a CSS
 * custom property on the wrapper, it never touches global theme tokens.
 */
export function RichLessonLayout({
  eyebrow,
  title,
  epithet,
  subtitle,
  accentColor,
  hero,
  sections,
  practices,
  extra,
  comingSoon,
}: {
  eyebrow?: string;
  title: string;
  epithet?: string;
  subtitle?: string;
  accentColor: string;
  hero?: ReactNode;
  sections: RichLessonSection[];
  practices?: ReactNode;
  extra?: ReactNode;
  comingSoon?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl" style={{ "--accent": accentColor } as React.CSSProperties}>
      {/* Hero */}
      <div className="mb-8 flex flex-col items-center text-center">
        {hero && <div className="mb-4 w-40 sm:w-48">{hero}</div>}
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-4xl text-primary">{title}</h1>
        {epithet && <p className="mt-1 text-sm italic text-muted-foreground">{epithet}</p>}
        {subtitle && <p className="mt-3 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {comingSoon ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
          <p className="font-serif text-2xl text-primary">No lesson content set for this entry</p>
        </div>
      ) : (
        <>
          {/* Sections */}
          <div className="space-y-5">
            {sections.map((s, i) => (
              <section
                key={i}
                className="rounded-2xl border p-6"
                style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)" }}
              >
                <h2 className="font-serif text-xl" style={{ color: "var(--accent)" }}>
                  {s.heading}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          {/* Practices, deliberately distinct from the descriptive sections above */}
          {practices && (
            <section
              className="mt-8 rounded-2xl border-2 p-6"
              style={{
                borderColor: "var(--accent)",
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
              }}
            >
              <h2 className="font-serif text-2xl text-primary">Practices</h2>
              <div className="mt-4 space-y-5">{practices}</div>
            </section>
          )}

          {extra && <div className="mt-8">{extra}</div>}
        </>
      )}
    </div>
  );
}
