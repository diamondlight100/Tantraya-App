import { useEffect, useState } from "react";
import { Printer, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const KEY = "tantraya.phowa.transitionCard";

type CardDetails = {
  name: string;
  focus: string;
  teacher: string;
  teacherContact: string;
  fellow: string;
  fellowContact: string;
};

const empty: CardDetails = {
  name: "",
  focus: "",
  teacher: "",
  teacherContact: "",
  fellow: "",
  fellowContact: "",
};

function load(): CardDetails {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

/**
 * The Phowa "Conscious Transition" card, fill in your details, save them
 * (localStorage, this device only), then print or save as PDF to carry with
 * your ID. `.print-only` (see styles.css) isolates just the card at print
 * time, hiding the rest of the app shell and course content.
 */
export function TransitionCard() {
  const [details, setDetails] = useState<CardDetails>(empty);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDetails(load());
  }, []);

  function set<K extends keyof CardDetails>(key: K, value: string) {
    setDetails((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  function save() {
    window.localStorage.setItem(KEY, JSON.stringify(details));
    setSaved(true);
  }

  return (
    <div className="rounded-xl border border-gold/40 bg-card/70 p-5">
      <h4 className="font-serif text-xl text-primary">Conscious Transition Card</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill this in, save it, then print it and keep it with your identification. Tell someone
        close to you what it is and where to find it.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label>Your name</Label>
          <Input value={details.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <Label>Your chosen spiritual focus</Label>
          <Input value={details.focus} onChange={(e) => set("focus", e.target.value)} />
        </div>
        <div>
          <Label>Spiritual teacher</Label>
          <Input value={details.teacher} onChange={(e) => set("teacher", e.target.value)} />
        </div>
        <div>
          <Label>Teacher contact</Label>
          <Input
            value={details.teacherContact}
            onChange={(e) => set("teacherContact", e.target.value)}
          />
        </div>
        <div>
          <Label>Fellow practitioner</Label>
          <Input value={details.fellow} onChange={(e) => set("fellow", e.target.value)} />
        </div>
        <div>
          <Label>Fellow contact</Label>
          <Input
            value={details.fellowContact}
            onChange={(e) => set("fellowContact", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={save}>
          <Save className="h-4 w-4" /> {saved ? "Saved" : "Save details"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> Print / Save as PDF
        </Button>
      </div>

      {/* Screen preview, identical content to the print-only version below,
          kept in sync from the same `details` state. */}
      <CardFace details={details} className="mt-5" />

      <div className="print-only hidden">
        <CardFace details={details} className="mx-auto max-w-xl" />
      </div>
    </div>
  );
}

function CardFace({ details, className = "" }: { details: CardDetails; className?: string }) {
  return (
    <div className={`rounded-2xl border-2 border-gold bg-card p-7 font-serif ${className}`}>
      <h3 className="text-center text-lg tracking-wide text-primary">
        Conscious Transition Practice
      </h3>
      <p className="mt-4 text-sm text-foreground/90">
        To the person who finds me if I am deceased:
      </p>
      <p className="mt-3 text-sm text-foreground/90">
        I am a practitioner of Phowa (Conscious Transition) at the moment, and the moments after , 
        physical death. For a practitioner of Phowa, death is an extraordinary opportunity, and
        nothing to be mourned.
      </p>
      <p className="mt-3 text-sm text-foreground/90">
        Your assistance in the moments after my death would be a profound act of compassion. If
        possible, please:
      </p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
        <li>
          Gently position my body sitting upright, or on my right side if sitting is not possible.
        </li>
        <li>
          Speak clearly near my right ear: "Remember your practice of Conscious Transition.
          Visualize your chosen spiritual focus above your crown. Let your consciousness rise
          through your central channel. Project through your crown and merge with your spiritual
          focus." Repeat this a number of times.
        </li>
        <li>
          Lightly touch or tap the crown of my head as a physical reminder to leave the body through
          the crown center.
        </li>
        <li>
          Maintain a peaceful, reverent atmosphere for at least 30 minutes if circumstances allow.
        </li>
      </ol>
      <div className="mt-5 space-y-1.5 text-sm">
        <Row k="Name" v={details.name} />
        <Row k="Chosen spiritual focus" v={details.focus} />
        <Row k="Spiritual teacher" v={joinContact(details.teacher, details.teacherContact)} />
        <Row k="Fellow practitioner" v={joinContact(details.fellow, details.fellowContact)} />
      </div>
      <p className="mt-5 text-center text-sm italic text-muted-foreground">
        Thank you for this final act of kindness. May all beings transition with awareness and
        peace.
      </p>
    </div>
  );
}

function joinContact(name: string, contact: string) {
  if (!name && !contact) return ", ";
  return contact ? `${name || ", "} (${contact})` : name || ", ";
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2 border-b border-dotted border-border/60 pb-1">
      <span className="min-w-[150px] text-muted-foreground">{k}:</span>
      <span className="text-foreground">{v || ", "}</span>
    </div>
  );
}
