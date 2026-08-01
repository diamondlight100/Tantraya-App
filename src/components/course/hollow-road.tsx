import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Wind,
  DoorOpen,
  RotateCcw,
  Sparkles,
  Crown,
  Gift as GiftIcon,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";

/**
 * The Hollow Road — a solo pathworking built on Journey Four ("Faery Halls
 * and Faery Allies") and the Visionary Magick Tips already taught in the
 * Faery Shamanism course (stay on the path, don't force imagery, "I come
 * in the name of the Queen!" if challenged, the nine winds of the Thunder
 * Cross, take only what is offered, retrace every door on the way home).
 *
 * This is not a quiz layered over that material, it is that material,
 * staged as a real journey with real gates: two proper trials (the
 * Threshold Riddle and the Hall's Refusal) that must actually be passed,
 * several four-way choice points with genuine variety rather than a
 * single obvious right answer, a private "glamour" count that only the
 * student sees (no leaderboard, no visible scoring), and a Back step so
 * a wrong turn doesn't mean starting the whole road over. Nothing here
 * invents new lore, every choice and consequence is drawn from lines
 * already in the course text.
 */

type Ally = { key: string; label: string; gift: string; body: string };
const ALLIES: Ally[] = [
  {
    key: "hound",
    label: "The Hound",
    gift: "Loyalty · Guard",
    body: "Grey, silent, it has been pacing the threshold since before you arrived. It will walk behind you now, on every road, whether you call it or not.",
  },
  {
    key: "raven",
    label: "The Raven",
    gift: "Sight · Omen",
    body: "It has been watching from the oak since the first door. It will not warn you twice, but it will always warn you once.",
  },
  {
    key: "hare",
    label: "The Hare",
    gift: "Swiftness · Escape",
    body: "It circled you three times at the mound and did not run. It knows the fast way out of anywhere, including out of yourself.",
  },
  {
    key: "salmon",
    label: "The Salmon",
    gift: "Depth · Old Wisdom",
    body: "It surfaced once, in the pool by the second door, and looked at you with an eye far older than the water.",
  },
];

type GiftOption = { key: string; label: string; body: string; correct: boolean };
const GIFTS: GiftOption[] = [
  {
    key: "jewel",
    label: "A jewel, already resting in the Queen's open hand",
    body: "It is bright and it is not yours to reach for. She has not offered it. Not yet. Perhaps not ever.",
    correct: false,
  },
  {
    key: "acorn",
    label: "A plain acorn, held out toward you",
    body: "Small, ordinary, freely offered. This is the one she means for you.",
    correct: true,
  },
  {
    key: "both",
    label: "Both, quickly, before she changes her mind",
    body: "Nothing in this Hall is taken twice.",
    correct: false,
  },
  {
    key: "ask-more",
    label: "Nothing yet, ask instead what else she carries",
    body: "The Hall does not haggle. You have asked for more than was offered, and the offering closes.",
    correct: false,
  },
];

type RiddleOption = { key: string; label: string; correct: boolean; response: string };

const THRESHOLD_RIDDLE: RiddleOption[] = [
  {
    key: "name",
    label: "My name",
    correct: false,
    response: "Names are cheap coin on this road, dear one, everyone carries one. Try again.",
  },
  {
    key: "will",
    label: "My will",
    correct: true,
    response: "True. Not even a Faery Hall can take what is not first surrendered. Passage granted.",
  },
  {
    key: "iron",
    label: "The iron I carry",
    correct: false,
    response: "Iron guards the body, not the will. What you're carrying can still be taken from you asleep. Try again.",
  },
  {
    key: "fear",
    label: "My fear",
    correct: false,
    response: "Fear is the easiest thing here to take, it changes hands a hundred times an hour. Try again.",
  },
];

const REFUSAL_TRIAL: RiddleOption[] = [
  {
    key: "taste",
    label: "Taste what is offered, only a little, to be polite",
    correct: false,
    response: "A little is exactly how every account of this begins. You decline too late, and the taste stays with you longer than the visit does. Try again.",
  },
  {
    key: "refuse-plain",
    label: "Decline plainly, with thanks, and without insult",
    correct: true,
    response: "Well judged. A clean refusal offends no one here, and costs you nothing. The Hall nods and moves on.",
  },
  {
    key: "true-name",
    label: "Offer your true name, to show good faith",
    correct: false,
    response: "Good faith is not what a true name buys in this Hall. Something writes it down. Try again.",
  },
  {
    key: "match-them",
    label: "Match their courtesy with a bow low enough to touch the floor",
    correct: false,
    response: "Over-courtesy is its own kind of debt here. You have offered more than was asked, and now something is owed. Try again.",
  },
];

type Stage =
  | "ground"
  | "mound"
  | "moss-door"
  | "riddle-threshold"
  | "metal-door"
  | "hall"
  | "trial-refusal"
  | "ally"
  | "gift"
  | "retrace"
  | "close";

const DOOR_ORDER = ["metal", "oak", "moss"] as const;
const RETRACE_DOORS = ["metal", "oak", "moss", "hollow"] as const;

type Snapshot = {
  stage: Stage;
  glamour: number;
  winds: number;
  ally: Ally | null;
  gift: GiftOption | null;
  retraced: string[];
  note: string | null;
};

export function HollowRoad() {
  const [stage, setStage] = useState<Stage>("ground");
  const [glamour, setGlamour] = useState(0);
  const [winds, setWinds] = useState(0);
  const [ally, setAlly] = useState<Ally | null>(null);
  const [gift, setGift] = useState<GiftOption | null>(null);
  const [retraced, setRetraced] = useState<string[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [history, setHistory] = useState<Snapshot[]>([]);

  const restart = () => {
    setStage("ground");
    setGlamour(0);
    setWinds(0);
    setAlly(null);
    setGift(null);
    setRetraced([]);
    setNote(null);
    setHistory([]);
  };

  const snapshot = (): Snapshot => ({ stage, glamour, winds, ally, gift, retraced, note });

  const transition = (
    next: Stage,
    note: string | null,
    updates?: Partial<{ glamourDelta: number; ally: Ally | null; gift: GiftOption | null; winds: number; retraced: string[] }>,
  ) => {
    setHistory((h) => [...h, snapshot()]);
    if (updates?.ally !== undefined) setAlly(updates.ally);
    if (updates?.gift !== undefined) setGift(updates.gift);
    if (updates?.winds !== undefined) setWinds(updates.winds);
    if (updates?.retraced !== undefined) setRetraced(updates.retraced);
    if (updates?.glamourDelta) setGlamour((g) => g + updates.glamourDelta!);
    setNote(note);
    setStage(next);
  };

  const goBack = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setStage(prev.stage);
      setGlamour(prev.glamour);
      setWinds(prev.winds);
      setAlly(prev.ally);
      setGift(prev.gift);
      setRetraced(prev.retraced);
      setNote(prev.note);
      return h.slice(0, -1);
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-hidden rounded-2xl border border-gold/30 bg-card/60 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold sm:tracking-[0.35em]">
          <Sparkles className="h-3 w-3 shrink-0" /> The Hollow Road
        </p>
        <div className="flex items-center gap-3">
          {stage !== "ground" && stage !== "close" && history.length > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
            >
              <ArrowLeft className="h-3 w-3" /> back
            </button>
          )}
          <p className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:tracking-[0.3em]">
            led astray: {glamour}
          </p>
        </div>
      </div>

      {stage === "ground" && (
        <Scene
          title="Ground"
          body="Run the formulae to the Green Mist in your own time, Faery Fire, Rising Light, the Seven Directions, the Three Suns, DreamWeaving, then raise the Mist. When it is done, and only then, continue."
        >
          <NextButton onClick={() => transition("mound", null)}>The Mist is raised</NextButton>
        </Scene>
      )}

      {stage === "mound" && (
        <Scene
          title="The Mound"
          body="It rises ahead of you in the land, grass over old stone, the light around it faintly wrong, faintly kind. Something small watches from the leaves at its base and beckons you off the path toward it."
        >
          <div className="mt-4 flex flex-col gap-2">
            <ChoiceButton
              onClick={() =>
                transition(
                  "moss-door",
                  "You keep to the path, eyes forward. The mound opens ahead of you, a door soft with moss.",
                )
              }
            >
              Stay on the path, and go on
            </ChoiceButton>
            <ChoiceButton
              onClick={() =>
                transition(
                  "moss-door",
                  "You kneel, leave a small token at the mound's edge without a word, and rise again. The door opens no differently for it, but nothing follows you either.",
                )
              }
            >
              Kneel and leave a small offering of your own before going on
            </ChoiceButton>
            <ChoiceButton
              onClick={() =>
                transition(
                  "mound",
                  "You step off the path to look. The grass closes behind you, and you find yourself back at the mound's edge, having gone nowhere at all.",
                  { glamourDelta: 1 },
                )
              }
            >
              Follow it, just a few steps, to look
            </ChoiceButton>
            <ChoiceButton
              onClick={() =>
                transition(
                  "mound",
                  "You call out, asking what it is. Something answers with a name that isn't true, and the asking itself has cost you a step, you're back where you started.",
                  { glamourDelta: 1 },
                )
              }
            >
              Call out and ask its name
            </ChoiceButton>
          </div>
        </Scene>
      )}

      {stage === "moss-door" && (
        <Scene title="The Door of Moss" body="Soft, green, low to the ground. It opens without asking twice.">
          <NextButton
            onClick={() =>
              transition(
                "riddle-threshold",
                "You pass through. The tunnel climbs toward the tree line, and grey shapes move in the dark between the trunks, watching you watch them.",
              )
            }
          >
            Step through
          </NextButton>
        </Scene>
      )}

      {stage === "riddle-threshold" && (
        <RiddleScene
          icon={<HelpCircle className="h-4 w-4 text-gold" />}
          title="The Threshold Riddle"
          intro="A voice from among the grey shapes asks: 'Tell us, traveler, what is it that we cannot take from you unless you first give it away?'"
          options={THRESHOLD_RIDDLE}
          onAnswer={(opt) => {
            if (opt.correct) {
              transition(
                "metal-door",
                `${opt.response} The shapes settle back into the dark. A third door waits ahead, metal, cold to look at.`,
              );
            } else {
              transition("riddle-threshold", opt.response, { glamourDelta: 1 });
            }
          }}
        />
      )}

      {stage === "metal-door" && (
        <Scene
          title="The Door of Metal, the Thunder Cross"
          body="Nothing crosses this door unguarded. Wind the red thread sunwise, nine winds, and with each one name aloud what the cross is to refuse."
        >
          <div className="mt-5 flex flex-col items-center gap-4">
            <svg viewBox="0 0 200 200" className="h-40 w-40">
              <rect x="20" y="92" width="160" height="16" rx="6" className="fill-amber-900/70" />
              <rect x="92" y="20" width="16" height="160" rx="6" className="fill-amber-900/70" />
              {Array.from({ length: winds }).map((_, i) => {
                const r = 18 + i * 2.5;
                const angle = i * 40;
                return (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={r}
                    fill="none"
                    stroke="hsl(0 75% 45%)"
                    strokeWidth="1.2"
                    strokeDasharray="6 3"
                    transform={`rotate(${angle} 100 100)`}
                    opacity={0.85}
                  />
                );
              })}
              <circle cx="100" cy="100" r="6" className="fill-gold" />
            </svg>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{winds} / 9 winds</p>
            {winds < 9 ? (
              <button
                onClick={() => setWinds((w) => Math.min(9, w + 1))}
                className="rounded-md bg-gold px-4 py-2 text-xs uppercase tracking-widest text-gold-foreground hover:opacity-90"
              >
                <Wind className="mr-1.5 inline h-3.5 w-3.5" /> Wind, and name what it refuses
              </button>
            ) : (
              <NextButton onClick={() => transition("hall", "Bound. The metal door opens onto a hall lit by no visible flame.")}>
                Bound. Cross the threshold
              </NextButton>
            )}
          </div>
        </Scene>
      )}

      {stage === "hall" && (
        <Scene
          title="The Faery Hall"
          body="The King and Queen receive you without rising. Nothing here is hurried. Before you are asked what you have come for, a cup and a small dish are set near your hand, unremarked, as though by accident."
        >
          <NextButton onClick={() => transition("trial-refusal", null)}>Notice what has been set beside you</NextButton>
        </Scene>
      )}

      {stage === "trial-refusal" && (
        <RiddleScene
          icon={<HelpCircle className="h-4 w-4 text-gold" />}
          title="The Hall's Refusal"
          intro="Nothing has been said. Nothing has been offered aloud. But the cup is full, and it would be easy, and expected, to do something with it."
          options={REFUSAL_TRIAL}
          onAnswer={(opt) => {
            if (opt.correct) {
              transition("ally", opt.response);
            } else {
              transition("trial-refusal", opt.response, { glamourDelta: 1 });
            }
          }}
        />
      )}

      {stage === "ally" && (
        <Scene title="Choose an Ally" body="One among those who have walked beside you unseen since the mound steps forward now, waiting to be named.">
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ALLIES.map((a) => (
              <button
                key={a.key}
                onClick={() => transition("gift", null, { ally: a })}
                className="rounded-lg border border-border/60 bg-background/40 p-4 text-left transition-colors hover:border-gold/60 hover:bg-gold/5"
              >
                <p className="font-serif text-lg text-primary">{a.label}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{a.gift}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{a.body}</p>
              </button>
            ))}
          </div>
        </Scene>
      )}

      {stage === "gift" && (
        <Scene title="Receive" body="The Queen's hand opens. Take only what is offered.">
          <div className="mt-4 flex flex-col gap-2">
            {GIFTS.map((g) => (
              <ChoiceButton
                key={g.key}
                onClick={() => {
                  if (g.correct) {
                    transition("retrace", g.body, { gift: g });
                  } else {
                    transition("gift", g.body, { gift: g, glamourDelta: 1 });
                  }
                }}
              >
                {g.label}
              </ChoiceButton>
            ))}
          </div>
        </Scene>
      )}

      {stage === "retrace" && (
        <Scene
          title="Return"
          body="Every gate, in reverse, metal, then oak, then moss. Never leave a step behind on the way home. Close the doors in the order you truly passed them, and mind that not every door on this road was one of yours."
        >
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {RETRACE_DOORS.map((door) => {
              const done = retraced.includes(door);
              return (
                <button
                  key={door}
                  disabled={done}
                  onClick={() => {
                    if (door === "hollow") {
                      transition(
                        "retrace",
                        "There was no hollow door on your way in. Something has left this here for you to pick up by mistake. You leave it shut.",
                        { glamourDelta: 1 },
                      );
                      return;
                    }
                    const expected = DOOR_ORDER[retraced.length];
                    if (door !== expected) {
                      transition(
                        "retrace",
                        `Not yet, the ${expected} door is still open behind you. Close it first.`,
                        { glamourDelta: 1 },
                      );
                      return;
                    }
                    const next = [...retraced, door];
                    if (next.length === 3) {
                      transition("close", null, { retraced: next });
                    } else {
                      transition("retrace", null, { retraced: next });
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors",
                    done
                      ? "border-gold/40 bg-gold/10 text-gold"
                      : "border-border/60 hover:border-gold/60",
                  )}
                >
                  <DoorOpen className="h-3.5 w-3.5" /> {door} door
                </button>
              );
            })}
          </div>
        </Scene>
      )}

      {stage === "close" && (
        <div>
          <h3 className="font-serif text-2xl text-primary">Ground</h3>
          <p className="mt-2 text-sm text-foreground/85">
            The Green Mist is lowered. You are grounded, carrying an ally and a gift that were truly
            given.
          </p>
          <div className="mt-5 space-y-3 rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-3">
              <Crown className="h-4 w-4 text-gold" />
              <p className="text-sm">
                <span className="text-muted-foreground">Ally chosen: </span>
                <span className="text-primary">{ally?.label ?? "—"}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <GiftIcon className="h-4 w-4 text-gold" />
              <p className="text-sm">
                <span className="text-muted-foreground">Gift received: </span>
                <span className="text-primary">
                  {gift?.correct ? gift.label : "the acorn, freely offered"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-gold" />
              <p className="text-sm">
                <span className="text-muted-foreground">Times led astray: </span>
                <span className="text-primary">{glamour}</span>
              </p>
            </div>
          </div>
          <p className="mt-4 border-l-2 border-gold/60 pl-4 text-sm italic text-foreground/85">
            {glamour === 0
              ? "You never left the path, answered true at the threshold, refused what the Hall quietly offered, and took only what was truly given. That is the whole of the discernment this work asks for, not power, not speed, just staying true when something asks you not to."
              : `The path tested you ${glamour} time${glamour > 1 ? "s" : ""}, and each time it simply asked again until you answered true. That is not failure, that is exactly how this tradition expects the Otherworld to test a visitor. Notice which invitation was hardest to refuse, that is worth sitting with off the screen.`}
          </p>
          <button
            onClick={restart}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold/60 hover:text-gold"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Walk the road again
          </button>
        </div>
      )}

      {note && stage !== "close" && (
        <p className="mt-5 border-l-2 border-gold/50 pl-4 text-xs italic text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  );
}

function Scene({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-serif text-2xl text-primary">{title}</h3>
      <p className="mt-2 text-sm text-foreground/85">{body}</p>
      {children}
    </div>
  );
}

function RiddleScene({
  icon,
  title,
  intro,
  options,
  onAnswer,
}: {
  icon: React.ReactNode;
  title: string;
  intro: string;
  options: RiddleOption[];
  onAnswer: (opt: RiddleOption) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-serif text-2xl text-primary">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-foreground/85">{intro}</p>
      <div className="mt-4 flex flex-col gap-2">
        {options.map((opt) => (
          <ChoiceButton key={opt.key} onClick={() => onAnswer(opt)}>
            {opt.label}
          </ChoiceButton>
        ))}
      </div>
    </div>
  );
}

function NextButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 rounded-md bg-gold px-4 py-2 text-xs uppercase tracking-widest text-gold-foreground hover:opacity-90"
    >
      {children}
    </button>
  );
}

function ChoiceButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-gold/40 bg-gold/5 px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-gold/70 hover:bg-gold/10"
    >
      {children}
    </button>
  );
}
