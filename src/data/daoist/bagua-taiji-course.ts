// Baguazhang module (Yin/Cheng style synthesis), Daoist pathway.
// Content developed from the teacher's own outline of the syllabus — a
// rough structural sketch, not a script — and written up properly here as
// a genuine reference. It names and explains what is corrected hands-on in
// class. It does not teach the art from scratch, and it does not name
// individual outside teachers; lineages and styles are credited, people
// are not.

import basicStanceImg from "@/assets/bagua/basic-stance_1784937620670.png";
import yunShaoSequenceImg from "@/assets/bagua/yun-shao-sequence_1784937620688.png";
import motherPalmsCircleImg from "@/assets/bagua/mother-palms-circle-v2_1784938858198.png";
import swordLeapImg from "@/assets/bagua/sword-leap_1784938858197.png";
import baguaTrigramBannerImg from "@/assets/bagua/bagua-trigram-diagram_1784939679344.png";
import sinewChannelsImg from "@/assets/bagua/sinew-channels-classical_1784983254621.png";
import fasciaDissectionImg from "@/assets/bagua/fascia-dissection-modern_1784983254621.png";

export type BaguaTopicSlug =
  | "orientation"
  | "warm-ups"
  | "leg-foundations"
  | "fascia-jin-structure"
  | "coiling-palms"
  | "cheng-lines"
  | "circle-walking"
  | "xingyi-crosstraining";

export interface BaguaTopic {
  slug: BaguaTopicSlug;
  gate: number; // 1-8, position around the circle
  title: string;
  chinese?: string;
  standsFor: string; // short phrase for the hub card
  summary: string;
  heroImage?: string; // optional full-width banner image at the top of the topic page
  sections: { heading: string; body: string; image?: string }[];
  widget?: "nine-joints" | "polarity-cards" | "chong-mai" | "cheng-lines-path";
  reflectionPrompt: string;
}

export const baguaTopics: BaguaTopic[] = [
  {
    slug: "orientation",
    gate: 1,
    title: "Foundations & Orientation",
    standsFor: "Why this art, and what it isn't",
    summary:
      "How Yin and Cheng style sit together in our syllabus, where bagua is centered energetically, and the single non-negotiable safety rule everything else depends on.",
    sections: [
      {
        heading: "Two lineages, one body of training",
        body: "Our bagua training draws mainly on Yin style and Cheng style, the two great branches most schools trace themselves back to, together with material absorbed from other teachers and lineages along the way. This is a genuine synthesis rather than a single unbroken transmission: where Yin and Cheng agree, that agreement is trusted as something close to universal; where they differ, the difference is kept visible rather than smoothed over, because the difference is usually the point. A student should come away knowing which parts of what they're doing are properly Yin, which are properly Cheng, and which are this school's own working synthesis of the two — not a single undifferentiated blend presented as if it had always existed that way.",
      },
      {
        heading: "Principle before application",
        body: "Everything taught here is principle-based rather than technique-based. You will not find instructions of the form \"if someone grabs you like this, do that.\" Movement is trained to be natural, to follow the joints rather than override them, and to stay adaptable, transformative, flexible, stable, and rooted, whether the body is still or moving. This is not a rejection of the martial dimension of bagua — it is real, and worth understanding, both because it is genuinely useful for self-defense and, more importantly for this training, because knowing what a movement is actually for gives it the correct energy, yi, and intent. A palm change performed with no sense of what it could do against resistance moves differently, and less correctly, than one performed with that understanding present, even when no partner is ever involved.",
      },
      {
        heading: "Yellow Court, not lower dantien",
        body: "Where many internal arts systems build everything around the lower dantien, our bagua training centers more on the Yellow Court region and its immediate surroundings. This isn't a rejection of the lower dantien's importance so much as a difference in what bagua, specifically, is organizing the body toward. It ties directly into the Eight Extraordinary Meridians work taught elsewhere on this pathway, especially the Chong Mai, the central thrusting channel, and the Dai Mai, the belt channel — the two vessels whose geometry, a vertical axis and a horizontal binding line, most closely mirror what circle walking and spiraling movement are actually training the body to do.",
      },
      {
        heading: "The one rule that overrides everything else",
        body: "Whatever else is happening in a given movement, the feet stay flat on the ground. Not lifted on the inside edge, not rolled onto the outside edge. The instant a foot comes up on either edge, the load that should be traveling through the whole structure gets diverted into the knee ligaments instead, which are not built to take it. Every instruction elsewhere in this module about stepping, weight-shifting, or coiling assumes this rule is already being honored without needing to be restated each time.",
      },
      {
        heading: "The bagua body",
        body: "The actual outcome of this training is a body, built the same way any specialized body is built: a weight trainer develops a weight trainer's body over years of specific loading, a sprinter develops a sprinter's body over years of specific speed work. Long enough training in bagua's principles — rootedness, whole-body connection, coiling structure, adaptability, the yin/yang pairing described above — builds a bagua body: strong, rooted, fast, flexible, connected, and moving as one whole rather than as parts cooperating. Once that body is genuinely built, with every principle here fully present and operating together, any bagua movement performed from inside that body carries the same correctness, whether or not it matches a specific form learned earlier. Correctness lives in the principles being fully present in the body at the moment of movement — that's the actual standard, more than matching a remembered shape.",
      },
      {
        heading: "The internal marker, once it's earned",
        body: "Yin and yang are meant to be present together in any correctly performed movement, not as an abstract idea but as a literal, felt bodily fact: one side or aspect of the body is going in while another goes out, one part is rising while another sinks. Once a student has enough hours in the body to actually feel this pairing happening, a simple test becomes available and genuinely reliable: when a movement feels right, it is right, and when it doesn't, it isn't. This is not a shortcut offered early in training. It only becomes trustworthy after the body has enough real experience to know what \"right\" feels like from the inside, which is exactly why it comes last in this orientation rather than first.",
      },
    ],
    widget: "polarity-cards",
    reflectionPrompt:
      "Where in your own practice have you felt the \"when it feels right, it's right\" marker actually operating — a moment you knew a movement was correct before anyone corrected you?",
  },
  {
    slug: "warm-ups",
    gate: 2,
    title: "Warm-Ups: Waking the Body",
    standsFor: "Gao-style prep, Shi Ba Fa, nine joints",
    summary:
      "What happens before any bagua-specific movement begins: Gao style preparatory work, the Shi Ba Fa exercise series, and a systematic pass through the body's major rotating joints.",
    sections: [
      {
        heading: "Gao style preparation",
        body: "A substantial part of our warm-up material comes from the Gao lineage of bagua. It's used here specifically as preparation rather than as a parallel curriculum of its own — the point is to get the joints and the connective tissue doing rotational, spiraling work early, in a low-stakes context, before the same qualities are asked to appear inside the actual syllabus. A student who skips this and goes straight into the Cheng lines or circle walking is usually asking cold tissue to do something it hasn't been warmed into yet.",
      },
      {
        heading: "The Shi Ba Fa series",
        body: "The Shi Ba Fa, the \"eighteen methods,\" is trained as a set within this same preparatory phase. It sits between generic warm-up and specific bagua skill: more structured and more repeatable than loose joint work, but still functioning as preparation for what follows rather than as an end in itself.",
      },
      {
        heading: "Nine joint rotations",
        body: "The warm-up closes with a systematic pass through the body's major rotating joints, worked from the ground up so that each one is moving freely and independently before it is asked to transmit force through a coiled or spiraling line. The widget below lists a working set of nine — ankles, knees, kua, waist, shoulders, elbows, wrists, neck, and the spine as an integrated whole — as a starting reference; if the exact sequence you use in class differs, that's the version that matters, and this page should be corrected to match it rather than the other way around.",
      },
    ],
    widget: "nine-joints",
    reflectionPrompt:
      "Which joint, honestly, is the stiffest or least cooperative for you right now in warm-ups — and has that changed over the time you've trained?",
  },
  {
    slug: "leg-foundations",
    gate: 3,
    title: "Leg Foundations: The Straight Line",
    standsFor: "A year of static and straight-line work",
    summary:
      "The unglamorous phase that precedes circle walking by roughly a year: opening and closing the kua, weight shifted deliberately rather than dropped, and a real vocabulary of walking patterns trained on a straight line first.",
    sections: [
      {
        heading: "Why a year, and why first",
        body: "Circle walking is what most people picture when they think of bagua, and it's tempting to teach it early because it looks and feels like \"the real thing.\" We deliberately don't. A full year is spent on straight-line and static leg work before circle walking is introduced in earnest, because the structure circle walking depends on — an open, controlled kua, a leg that can bear weight without letting it fall, a foot that stays flat through a full range of loading — has to already exist in the body, or the circle simply reinforces whatever compensations were already there.",
      },
      {
        heading: "The kua, opening and closing",
        body: "A large part of this phase is direct kua work: learning to open it and close it as a controlled, repeatable action rather than something that happens incidentally as a side effect of stepping. Alongside this, weight shifting is trained as a deliberate, felt transfer from one leg to the other, not something that happens by letting gravity do the work. \"Falling\" the weight onto a leg — the common habit of essentially dropping into the next position — is specifically trained out here, because it produces exactly the kind of uncontrolled loading the earlier safety rule about the feet is meant to prevent.",
      },
      {
        heading: "Walking patterns",
        body: "The walking practiced in this phase has no vertical bob — no rising and falling with each step — and moves through a real range of patterns: forward, backward, at different speeds, some slow and some fast. One distinct pattern, sometimes called grasshopper stepping, has the foot step \"over\" the line at roughly a 45-degree angle rather than tracking straight along it. Training a variety of patterns here, rather than one default gait, is what gives the leg the range it will later need for the more complex footwork inside circle walking.",
      },
      {
        heading: "Feet: inside, outside, and middle",
        body: "Throughout this leg work, real attention is paid to exactly which part of the foot is loaded at each moment — the inside edge, the outside edge, or through the center — because a foot that's technically flat can still be quietly favoring one edge under load. The knees stay hooked in one consistent direction throughout and do not bounce; a bouncing knee is usually the first visible sign that weight is being dropped rather than shifted.",
      },
      {
        heading: "The basic standing position",
        body: "Every session in this phase returns to one shape, and it's worth having it fully explicit rather than assumed. The feet step first to shoulder width, then step again to the outside of those shoulder-width lines, so the finished stance is noticeably wider than the shoulders themselves. Each heel sits directly in line with the middle toe of the same foot — a straight line running through the center of the foot, with the toes turned neither outward nor the heel rolled inward. The knees relax, but relaxed here does not mean hanging loose: a gentle, continuous pressure is sent down against the ground through both legs, and it's that pressure meeting the earth, not muscular bracing in the thighs, that actually stabilizes the whole structure.\n\nOnce that base is set, the torso settles into the pelvis the way a plunger seats into its bowl — dropped straight down into the basin of the hips rather than tipped forward or back — so the torso can rise and sink as one connected unit inside the legs instead of the spine bending on its own, separately from the hips. The legs then simply respond to whatever the torso does: when the torso sits lower, the knees bend further to receive it, but the knee is never the joint that initiates the movement.\n\nThe head finishes the shape. It lifts, but the lift comes specifically from the occiput, the back of the skull, drawing gently upward — not from raising the chin. Seen from the front the two can look almost identical, a dropped chin and a lifted occiput both reading as \"level,\" which is exactly why this is one of the most common things corrected by hand in class. The felt difference is real even when the visible difference is small: one lengthens the whole spine upward from behind and keeps the cervical vertebrae alive; the other simply tips the head forward.",
        image: basicStanceImg,
      },
    ],
    reflectionPrompt:
      "Notice your weight shift the next time you walk normally, off the mat — does it fall, or does it move the way you're training it to move? And in your own basic standing position, is your head lifting from the occiput, or is the chin quietly doing the work instead?",
  },
  {
    slug: "fascia-jin-structure",
    gate: 4,
    title: "Fascia, Jin & Structure",
    standsFor: "The core internal-training chapter",
    summary:
      "The heart of the internal work: fascia trained taut like a drum skin while the muscles underneath stay relaxed, power generated from the feet upward, and the Chong Mai as the body's central organizing line.",
    sections: [
      {
        heading: "Fascia, not muscle",
        body: "The governing distinction in this whole chapter is between fascial and muscular training, and it's worth being explicit about why it matters. A muscle-led approach to internal power tends to produce strength that's strong in one direction and brittle in others, and that tires the way any muscular effort tires. Fascial, tendon, and ligament conditioning behaves differently: the tissue is trained to hold a taut, drum-skin-like tension across the whole structure while the muscles inside that structure stay comparatively relaxed, so that force can travel through the tissue itself rather than being generated fresh by muscular contraction each time. This is the single most common place this kind of training gets diluted into something else — a student working hard, sweating, and building muscular tension is not automatically doing this correctly, and may in fact be moving further from it.",
      },
      {
        heading: "Power from the feet, in order",
        body: "Jin, the kinetic force the body expresses in a movement, always originates at the feet and travels upward through the legs, torso, and arms in sequence. There is no version of correct bagua movement that generates power from the arms alone, or the torso alone, or skips the feet as the starting point. When a movement looks weak or disconnected, the feet and the ground connection are almost always where the actual problem lives, even when the visible symptom shows up somewhere higher in the body.",
      },
      {
        heading: "The Chong Mai as the central line",
        body: "The Chong Mai runs as a straight line from Hui Yin, at the perineum, to Bai Hui, at the crown, and this line is the physical and energetic axis the whole body organizes around during this training. In practice: the head gently lifts from the top of the back of the skull, keeping the cervical vertebrae alive and unlocked rather than compressed, while the pelvis drops away from the lower back so that it pulls downward. A useful way to feel this early on is to imagine holding the head in place and letting the tailbone drop further and further, as though a weight hung from it. Later in training this same stretch gives rise, on its own, to a tuck of the pelvis — but that tuck is meant to arise naturally out of sustained stretching over time, not to be imposed early as a deliberate shape, which tends to lock the lower back rather than open it.",
      },
      {
        heading: "The back rounds, the shoulders wrap",
        body: "As this line lengthens, the back rounds and the shoulders wrap inward. The chest is never given a separate instruction to \"sink\" — in this training, an inward-feeling chest is simply what naturally results once the back is rounding correctly, and treating it as its own action, done independently of the back, tends to produce a collapsed rather than a rounded posture.",
      },
      {
        heading: "An elastic body",
        body: "Once the fascia has genuinely been conditioned this way, the body starts to behave like elastic: it stretches, expands, and snaps back, rather than moving as a rigid unit or a loose one. This elastic quality is also where the tradition's language of connection to heaven and earth becomes concrete rather than poetic — the same central line running from the perineum to the crown is the line the whole body is stretching, expanding, and returning along.",
      },
      {
        heading: "Whole-body movement",
        body: "A working principle runs underneath everything above: when one part of the body moves, every part moves; when one part stops, every part stops. There is no isolated arm strike or isolated leg kick in this training — a strike lands with the entire mass of the body behind it, delivered through the same coiled, connected structure this chapter describes, rather than through the arm's local muscle alone. Because the whole body is already connected and already loaded through the fascial lines described above, there's no need to wind up before releasing force. Power can be generated and expressed in a very small amount of space, sometimes almost none at all, because the distance the force actually needs to travel is internal, through an already-connected structure, rather than external, through a large winding motion.",
      },
      {
        heading: "From big to small",
        body: "Training runs from big movements toward small ones. Early practice deliberately exaggerates range — big steps, big coiling, big amplitude in the arms — so the underlying structure and connection can be felt and corrected while there's enough room to see it happening. Over time, the same movements are trained progressively smaller, the amplitude shrinking while the internal connection and quality stay exactly the same. A student can genuinely do the small version well before being able to do the big version well, and once the whole body is truly connected, that stops mattering: when one part hits, everything hits, regardless of how much visible motion the strike actually contains.",
      },
      {
        heading: "Sinew, membrane, and the classical view",
        body: "Classical Chinese medicine has no single word that maps exactly onto \"fascia\" as the term is used in modern anatomy, but two categories sit close enough to it that the overlap is worth naming directly rather than glossed over. Jin (筋) — usually translated \"sinew\" — is the older textual category, covering tendon, ligament, and the fibrous binding tissue around muscle, explicitly distinguished in the medical canon from rou (肉), muscle flesh itself. Mo (膜), membrane, is the second: the enveloping sheets described as separating and lining the organs and the layers of the body, closer to what a modern text would call the deep and visceral fascia. Neither term was built to describe fascia as a single continuous system the way it's understood now — that unifying picture is a modern one — but both point at the same physical tissue this chapter is training, described from within a much older framework.\n\nThe twelve jingjin, the sinew channels, run alongside the twelve regular meridians in the medical canon but are structurally distinct from them. Rather than carrying qi through a line of points, they describe how tendon and connective tissue bind muscle to bone along each of the body's major working lines, gathering and knotting at the joints and terminating around the head and trunk rather than closing into circuits the way the regular meridians do. Read plainly, this is a classical map of exactly the tissue this chapter calls fascia, organized joint to joint along the same limbs this training already works.\n\nThis is also the direct ancestor of the training in front of you. The Yi Jin Jing, the \"Muscle-Tendon Change Classic,\" is a set of conditioning exercises built specifically to transform jin — to take sinew that is slack, brittle, or undeveloped and make it taut, resilient, and strong — as a category of training explicitly separate from building muscle bulk. It is worth knowing that jin the trained martial force (勁) and jin the sinew (筋) are different characters, not the same word, so no real linguistic claim is being made here — but the two sit close enough in register, both pointing at something trained through the tendon and connective tissue rather than through the muscle, that the coincidence is worth having in mind: this chapter's central distinction between fascial and muscular training is not an idea imported from outside the tradition. It is close to the tradition's own oldest distinction, described in its own terms, centuries before anyone had a microscope pointed at the tissue itself.",
        image: sinewChannelsImg,
      },
      {
        heading: "What dissection actually shows",
        body: "For most of the history of Western anatomy, fascia was treated as inert packing material — cut through and discarded on the way to the \"real\" structures underneath, the muscles and organs it was considered merely to wrap. That picture has genuinely changed, mainly since researchers began dissecting fresh, unembalmed tissue and, more recently, filming living fascia directly through endoscopic cameras rather than only studying it dead and dried. What that work actually shows is worth knowing plainly, because it is not a matter of taking the classical language on faith — it can be seen.\n\nFirst: fascia is not a set of separate wrappings around individual muscles. It is one continuous sheet running from the soles of the feet to the scalp, with every muscle's tendon anchoring into it rather than directly and exclusively onto bone. Because of this, force generated in one muscle does not stay confined to that muscle's own tendon — it transmits sideways, through the shared fascial sheet, into neighboring muscles and lines of tissue that never contracted at all. This is myofascial force transmission, and it is measurable directly in cadaver and live tissue studies. It is also, in plain terms, the physical mechanism underneath \"when one part moves, every part moves\": that is not only a felt, trained quality — a real structural pathway for it to be literally true exists in the tissue itself.\n\nSecond: living fascia, filmed rather than dried and sliced, does not look like the flat, plastic-wrap sheets shown in most anatomy diagrams. Endoscopic footage of fascia in a living body shows a fractal, honeycomb-like architecture of small polyhedral chambers, gliding and shearing against each other and reforming continuously as the body moves — a structure built to let layers slide freely across one another while staying connected the whole time, rather than a fixed membrane. This matches, closely, the elastic, expand-and-return quality this chapter already asks a student to feel, rather than a rigid casing around the muscle.\n\nThird: fascia is now understood to carry an extremely dense supply of sensory nerve endings — by some counts, more richly innervated than muscle tissue itself, second in the whole body only to skin. Training the fascia is therefore not only a matter of tissue strength or elasticity; it is training a major part of the body's own sense of its position, load, and movement in space. A body that has genuinely conditioned its fascial lines is not just structurally different — it is receiving more, and more accurate, information from itself.\n\nFourth, and closest to this chapter's own language: the tensegrity model, borrowed originally from architecture and applied to the body by later researchers, describes a structure held together by balanced, continuous tension running through its connective tissue, with the bones floating inside that tension network as compression elements rather than the tension hanging off a rigid bony frame. This is close, structurally, to the drum-skin image already used earlier in this chapter — the model of a body held taut and connected through its fascial lines rather than stacked and braced through bone and muscular effort. It is worth being honest about how far this correspondence actually goes: modern researchers mapping continuous fascial lines through the body have found lines that echo the classical sinew channels in real, striking ways, but the two maps were built independently, centuries and a different kind of instrument apart, and they are not identical. That is the actual, honest relationship between the classical and the modern picture here — a real convergence on the same tissue, arrived at by two different traditions of looking closely at the body, not one system quietly restating the other.",
        image: fasciaDissectionImg,
      },
    ],
    widget: "chong-mai",
    reflectionPrompt:
      "Can you feel the difference, in your own body right now, between a muscle straining and a fascial line being stretched taut? Describe it in your own words.",
  },
  {
    slug: "coiling-palms",
    gate: 5,
    title: "Coiling Palms & Arm Work",
    standsFor: "Once the legs are correct",
    summary:
      "Arm and hand training that only begins once the leg and fascial foundation is already in place: serving teacups, several styles of coiling palm, meteor palms, lion-rolls-ball, piercing palms — and hands trained to transform rather than stay fixed.",
    sections: [
      {
        heading: "Why the legs have to come first",
        body: "Coiling palms and the rest of the arm repertoire are introduced only once the legs are correct — not as an arbitrary sequencing rule, but because arm movement in this system is meant to be an expression of the spiraling line already established through the legs and the fascia, not an independently generated action. An arm coiling correctly in a body that hasn't done the leg and fascial work yet has nothing real underneath it to transmit; at best it looks similar without functioning the same way.",
      },
      {
        heading: "The coiling repertoire",
        body: "This includes serving teacups; several distinct coiling-palm approaches — middle, lower, and backward variations — drawn partly from our core Yin and Cheng training and partly absorbed through additional training outside those two main lineages; meteor palms; lion-rolls-ball trained in a number of directions; piercing palms; and other arm movements built on the same underlying coiling principle rather than treated as separate techniques to be memorized individually.",
      },
      {
        heading: "Hands that transform",
        body: "Some schools train the hand to be permanently rigid; others train it to be permanently soft. Neither, on its own, represents the actual skill being developed here. The hand is trained to transform — moving between hard, soft, and hard again — according to what the moment and the movement actually call for, which is the same adaptable, transformative quality named as a core principle back in Orientation, now showing up specifically at the level of the hand.",
      },
    ],
    widget: "polarity-cards",
    reflectionPrompt:
      "In your last coiling-palm practice, was your hand actually changing quality through the movement, or holding one texture throughout?",
  },
  {
    slug: "cheng-lines",
    gate: 6,
    title: "The Cheng Lines",
    standsFor: "The eight Gao-style linear palms, Kai through Fan",
    summary:
      "Kou Bu and Bai Bu — the hooking-in and swinging-out steps that every step in bagua is actually made of — and the eight named lines of the linear syllabus, Kai through Fan, that this stepping carries.",
    sections: [
      {
        heading: "Kou Bu and Bai Bu: the stepping underneath everything",
        body: "Kou Bu and Bai Bu aren't a separate category of technique sitting alongside the lines — they're what every step in bagua actually is, on the circle and on the lines alike. Kou Bu is the hooking-in step: closing, wrapping the leg inward. Bai Bu is the swinging, hooking-out step: opening, coiling the leg out. Every step taken anywhere in the system is one or the other — opening and closing, wrapping in and coiling out — whether the body is walking the circle or moving through a straight line. That's why Kou Bu and Bai Bu are trained on their own before the lines are introduced: not because they stand apart from the lines, but because they're the material the lines are built from. Once a line is in motion, the straightness a student sees in the arm, or in the direction of travel, is only ever the surface of it. Underneath, the stepping stays exactly as curved, coiling, kou-and-bai as it is on the circle — that's the real intersection in this practice: forward, linear travel carried entirely by a body that never actually stops turning. Read as hook in and hook out, the two steps demand the same live, springy, spiral tension in both directions: hooking inward has to stay just as elastic and ready to release as swinging outward. Neither direction is allowed to go dead or purely mechanical while the other stays alive — that even charge across both is the entire point of training them.",
      },
      {
        heading: "The 64-line structure",
        body: "Cheng style organizes its linear material into a system of 64 lines: eight named lines, each built from eight movements. This structure is referenced directly in our own syllabus, alongside the Gao-style material used earlier in warm-ups. It's worth knowing that this framework exists and how large it actually is, if only so a student can locate the eight lines covered live so far within the fuller map.",
      },
      {
        heading: "The eight lines, in order",
        body: "The eight lines taught live, in their Gao-style order, are: Kai Zhang (opening palm — splitting and dividing open an opponent's defense), Chuan Zhang (piercing palm — penetrating straight through a gap), Tiao Zhang (lifting palm — deflecting upward and unrooting from underneath), Dai Zhang (pulling palm — striking while dragging incoming momentum off balance), Tui Zhang (pushing palm — forward power projected through the whole body), Pi Zhang (splitting palm — a descending, axe-like drop that clears a low attack), Bao Zhang (embracing palm — closing distance, wrapping, and controlling the core), and Fan Zhang (overturning palm — a sudden reversal of direction, releasing with a twisting or spiraling strike). Each line carries its own tactical intention; naming them by that intention, rather than by number alone, is what makes the sequence legible as a system rather than a list to memorize. Every one of these eight is still walked with the same Kou Bu and Bai Bu underneath it — the line names its tactical intention, the stepping is what actually moves it.",
      },
      {
        heading: "Built from separated pieces",
        body: "Kou Bu, Bai Bu, and the single palm change are all taught broken into a number of distinct, separately-trained pieces rather than as one continuous sequence learned all at once — a matter of teaching order, not of these pieces being different things from each other. Yun Shao, bagua's own version of cloud hands, is one such piece, trained on its own before being folded back into the larger palm change it belongs to. This piece-by-piece approach mirrors the same patience already seen in the year of leg work before circle walking: components are trained to a real standard individually before being asked to flow together.",
      },
    ],
    widget: "cheng-lines-path",
    reflectionPrompt:
      "Of the eight lines, which one still feels like a memorized shape to you, and which has started to feel like a clear tactical intention? And in your stepping, is one of Kou Bu or Bai Bu noticeably less springy than the other right now?",
  },
  {
    slug: "circle-walking",
    gate: 7,
    title: "Circle Walking & Mother Palms",
    standsFor: "Taught in small increments, not early",
    summary:
      "Why circle walking, bagua's signature practice, is introduced only in small increments once the leg and structural foundation is in place — and why the focus, once it begins, stays narrow on the mother palms.",
    heroImage: baguaTrigramBannerImg,
    sections: [
      {
        heading: "Introduced little by little",
        body: "Circle walking is taught only bit by little bit, and only once the straight-line and static leg foundation described earlier has genuinely taken hold. Most schools introduce it much earlier than this, often because it's the most visually recognizable part of the art and students understandably want to get to it, but a body that hasn't built the underlying structure first tends to reinforce its existing habits inside the circle rather than develop past them. We have also, at times, taught circle walking as its own standalone unit, separate from the wider syllabus, when that has better suited a particular group's needs.",
        image: swordLeapImg,
      },
      {
        heading: "Staying with the mother palms",
        body: "Once circle walking does begin, the training deliberately stays concentrated on the mother palms rather than moving quickly outward into the wider range of palm changes bagua eventually contains. This is the same training logic that runs through the whole syllabus: depth in a small number of things, trained to an honest standard, rather than broad coverage of the art before any single piece of it is actually correct.",
        image: motherPalmsCircleImg,
      },
      {
        heading: "Yun Shao: the coiling test case",
        body: "Yun Shao, bagua's own version of cloud hands, already named back in the Cheng Lines chapter as one of the pieces trained on its own before being folded into a full palm change, is where the basic standing position from Leg Foundations gets its first real test in motion. It starts from that same wide, parallel stance: one arm extends fully to the side at shoulder height, palm turned up, thumb drawn in toward the base of the ring finger, so the whole hand holds a shape closer to a blade or a spear than an open palm. The other hand begins at the face, fingers softly curled, and coils inward and down, passing beneath the chin.\n\nNothing above the waist actually starts this movement. The turn originates in the feet and legs — the same spiraling quality already trained through Kou Bu and Bai Bu — and it's that spiral in the legs and hips that carries the torso around toward the outstretched arm. As the body arrives at the end of the turn, the coiling hand completes its own path: under the chin, across the chest, and finally arriving beneath the tricep of the arm that has stayed extended the whole time. The extended arm itself does very little; it's carried into its final position by the turn of the body underneath it, not moved there by its own effort.\n\nThat absence of independent arm volition is the actual point of the exercise. The arms are passengers on a turn generated entirely from the ground up, and Yun Shao, precisely because it's simple enough to isolate and repeat, is one of the clearest places in the whole syllabus to feel whether that's genuinely true in a given body, or whether the arm is still quietly doing its own work underneath an outward form that looks correct.",
        image: yunShaoSequenceImg,
      },
    ],
    reflectionPrompt:
      "How did your own sense of the circle change between when you first started walking it and now — what's different in the feeling of the step? And in Yun Shao, can you feel the moment your turn is genuinely being carried by the legs, versus a moment the arm is quietly moving on its own?",
  },
  {
    slug: "xingyi-crosstraining",
    gate: 8,
    title: "Xing Yi Cross-Training",
    standsFor: "Borrowed in for feel, kept minimal",
    summary:
      "A small, clearly-bounded amount of Xing Yi Quan folded into the bagua syllabus, used specifically to develop a feel for simple, direct elemental shapes and energies.",
    sections: [
      {
        heading: "A deliberately small addition",
        body: "A limited amount of Xing Yi is taught within the bagua syllabus — not as a second curriculum running alongside it, but as a focused tool for developing a feel for Xing Yi's simple elemental shapes and the more linear, direct energy they express. Its inclusion is kept in proportion to what it's actually for, rather than expanding into a fuller Xing Yi course in its own right.",
      },
      {
        heading: "Why the contrast is useful",
        body: "Bagua trains circularity, spiraling, and constant directional change as its default mode. Xing Yi's elemental shapes work in almost the opposite register: linear, direct, built on five distinct expressions of force. Training a small amount of this contrasting quality sharpens, by direct comparison, exactly what bagua itself is asking the body to do — the same way understanding what a straight line isn't can clarify what a curve actually is.",
      },
    ],
    reflectionPrompt:
      "Can you feel the contrast between a Xing Yi elemental shape and a bagua coiling movement — what specifically feels different in the quality of force?",
  },
];

export function getBaguaTopic(slug: string): BaguaTopic | undefined {
  return baguaTopics.find((t) => t.slug === slug);
}
