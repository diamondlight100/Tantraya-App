import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { ArrowLeft, BookOpen, Wrench, Leaf, FlaskConical, Droplets, Library } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpagyricsWidget } from "@/components/course/spagyrics-widget";
import { RelatedPractices } from "@/components/course/related-practices";
import { CourseMaterialsBundle } from "@/components/course/course-materials-bundle";
import {
  spagyricsIntro,
  EQUIPMENT,
  PLANET_HERBS,
  PROCESS_STEPS,
  HOW_TO_TAKE,
  OPTIONAL_PRACTICES,
} from "@/data/magick/spagyrics";

export const Route = createFileRoute("/_app/pathways/magick/spagyrics")({
  head: () => ({ meta: [{ title: "Alchemy: Spagyrics · Magick Pathway · Tantraya" }] }),
  component: SpagyricsPage,
});

const STAGE_LABEL: Record<string, string> = {
  separation: "Stage One — Separation & Distillation",
  calcination: "Stage Two — Calcination",
  cohobation: "Stage Three — Cohobation",
};

function ImageThumb({ imgKey }: { imgKey: string }) {
  return (
    <img
      src={`/magick/spagyrics/${imgKey}.jpg`}
      alt=""
      className="h-24 w-24 shrink-0 rounded-md border border-border/50 object-cover sm:h-28 sm:w-28"
      loading="lazy"
    />
  );
}

function SpagyricsPage() {
  const stages: ("separation" | "calcination" | "cohobation")[] = ["separation", "calcination", "cohobation"];

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/pathways/magick/hub"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to the Magick Pathway
      </Link>

      <PageHeader
        title="Alchemy: Spagyrics"
        subtitle="The Great Work in miniature, on a stovetop. Extracting a plant's Mercury, Sulphur, and Salt, and recombining them into a single, more potent planetary medicine."
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BookOpen className="mr-1 h-3.5 w-3.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="equipment">
            <Wrench className="mr-1 h-3.5 w-3.5" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="herbs">
            <Leaf className="mr-1 h-3.5 w-3.5" />
            Herbs
          </TabsTrigger>
          <TabsTrigger value="process">
            <FlaskConical className="mr-1 h-3.5 w-3.5" />
            Process
          </TabsTrigger>
          <TabsTrigger value="taking">
            <Droplets className="mr-1 h-3.5 w-3.5" />
            Taking It
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6 space-y-8">
          <p className="text-sm leading-relaxed text-foreground/85">{spagyricsIntro}</p>

          <CourseMaterialsBundle
            pathway="magick"
            courseSlug="spagyrics"
            title="Alchemy: Spagyrics"
            cover={
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                <Library className="h-6 w-6 text-gold" />
              </div>
            }
          />

          <div>
            <h2 className="mb-4 font-serif text-2xl text-primary">The Seven Operations & the Three Essentials</h2>
            <SpagyricsWidget />
          </div>

          <div className="rounded-xl border border-border/50 bg-card/40 p-5 text-sm text-muted-foreground">
            <p>
              A note on sources and scope: the seven Operations, their order, and the four colour phases of the
              Magnum Opus are all well attested across the alchemical literature, but which Operations belong to
              which colour phase, and which Operation (if any) belongs to which planet, was never standardized by
              a single central authority and varies between authors. The grouping used here follows one commonly
              cited scheme. Rather than force a planet onto each Operation, the seven classical planets are given
              their own dedicated correspondences on the Herbs tab instead, where the tradition is on much firmer
              ground.
            </p>
          </div>

          <div className="rounded-lg border border-gold/40 bg-secondary/20 p-4 text-sm">
            <Link to="/pathways/magick/hours" className="font-medium text-foreground/90 hover:text-gold">
              Check the Magical Hours tool →
            </Link>
            <p className="mt-1 text-muted-foreground">
              Time a calcination or distillation to the hour of the planet governing that Operation or herb.
            </p>
          </div>
        </TabsContent>

        {/* Equipment */}
        <TabsContent value="equipment" className="mt-6">
          <h2 className="mb-4 font-serif text-2xl text-primary">Equipment</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {EQUIPMENT.map((item) => (
              <div key={item.name} className="rounded-lg border border-border/50 bg-card/50 p-4">
                <p className="font-serif text-base text-primary">{item.name}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.use}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Herbs by planet */}
        <TabsContent value="herbs" className="mt-6">
          <h2 className="mb-4 font-serif text-2xl text-primary">Herbs for Each Planet</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            The seven classical planets, their days, their qualities, and five herbs suited to a Spagyric for each,
            chosen with an eye toward what's actually safe to tincture and take as a dose.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PLANET_HERBS.map((p) => (
              <div key={p.planet} className="rounded-xl border border-gold/30 bg-card/50 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-lg text-gold">
                    {p.symbol}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-primary leading-tight">{p.planet}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.day}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/85">{p.qualities}</p>
                <ul className="mt-3 space-y-1.5 border-t border-border/40 pt-3">
                  {p.herbs.map((h) => (
                    <li key={h.name} className="text-sm">
                      <span className="text-primary">{h.name}</span>{" "}
                      <span className="text-muted-foreground">— {h.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Process */}
        <TabsContent value="process" className="mt-6">
          <h2 className="mb-4 font-serif text-2xl text-primary">Making a Spagyric, Step by Step</h2>
          <div className="space-y-8">
            {stages.map((stage) => (
              <div key={stage}>
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">{STAGE_LABEL[stage]}</p>
                <div className="space-y-4">
                  {PROCESS_STEPS.filter((s) => s.stage === stage).map((s) => (
                    <div key={s.key} className="rounded-lg border border-border/50 bg-card/40 p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 font-serif text-2xl text-gold">{s.order}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-serif text-lg text-primary">{s.title}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/85">{s.body}</p>
                        </div>
                      </div>
                      {s.images && s.images.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 pl-9">
                          {s.images.map((imgKey) => (
                            <ImageThumb key={imgKey} imgKey={imgKey} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* How to Take + Optional practices */}
        <TabsContent value="taking" className="mt-6 space-y-10">
          <div>
            <h2 className="mb-4 font-serif text-2xl text-primary">How to Take a Spagyric</h2>
            <div className="rounded-xl border border-gold/30 bg-card/50 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-foreground/85">{HOW_TO_TAKE.intro}</p>
              <ol className="mt-4 space-y-2.5">
                {HOW_TO_TAKE.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-serif text-gold">{i + 1}.</span>
                    <span className="text-foreground/85">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-lg border border-border/50 bg-secondary/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Dosing</p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{HOW_TO_TAKE.dosing}</p>
              </div>
              <div className="mt-3 rounded-lg border border-border/50 bg-secondary/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Safety</p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{HOW_TO_TAKE.safety}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-primary">Optional Practices</h2>
            <div className="space-y-5">
              {OPTIONAL_PRACTICES.map((p) => (
                <div key={p.key} className="rounded-xl border border-border/50 bg-card/40 p-5 sm:p-6">
                  <h3 className="font-serif text-xl text-primary">{p.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.subtitle}</p>
                  <div className="mt-3 space-y-2.5">
                    {p.body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-foreground/85">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RelatedPractices
            pathway="magick"
            courseSlug="spagyrics"
            lessonSlug="overview"
            defaultName="Spagyric dosing rite"
            defaultDescription="Taking a finished planetary Spagyric with full attention and intention."
            defaultBodyLayer="mental"
            defaultMinutes={10}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
