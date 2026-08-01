// The Ten Mahavidyas, course content.
// Source: converted from Paul's planned Mahavidya book series and expanded
// with full teaching material for all ten.

export type YantraSpec = {
  /** Petal count for the surrounding lotus ring, 0 means no ring (Dhumavati is deliberately unornamented). */
  petals: number;
  triangle: "up" | "down";
  /** A thin enclosing square (bhupura), used for Bhuvaneshvari, "queen of space/container". */
  enclosure?: boolean;
};

export type MahavidyaPractice = {
  title: string;
  detail: string;
};

export type Mahavidya = {
  slug: string;
  order: number;
  name: string;
  epithet?: string;
  nameMeaning: string;
  accentColor: string;
  yantra: YantraSpec;
  atAGlance: string | null;
  myth: string | null;
  symbolism: string | null;
  energy: string | null;
  forPractitioner: string | null;
  practices: MahavidyaPractice[] | null;
};

export const mahavidyas: Mahavidya[] = [
  {
    slug: "kali",
    order: 1,
    name: "Kali",
    nameMeaning: "From kala, time, she who moves through and dissolves everything time touches.",
    accentColor: "#332F42",
    yantra: { petals: 8, triangle: "down" },
    atAGlance:
      "First of the Mahavidyas and, in most lineages, the ground all the others rise from. Black or deep blue skin, wild loose hair, three red eyes, a lolling tongue, a garland of fifty skulls representing the Sanskrit alphabet, a skirt of severed arms. Four arms carry a sword, a freshly severed head, and two hands making the gestures of fearlessness and blessing. She stands or dances on the prone body of Shiva, in the cremation ground, digambari, sky-clad.",
    myth: "The Devi Mahatmya gives her the most direct origin of any Mahavidya. Durga, locked in battle with the demons Chanda and Munda and their master Shumbha, grows so furious that Kali springs directly from her forehead, black-skinned, skeletal, wielding a sword and a noose, riding into the war to finish what fury alone could accomplish. She beheads Chanda and Munda on the spot and carries their heads back to Durga, who names her Chamunda in honour of the kill.\n\nLater in the same battle, facing the demon Raktabija, whose blood grows a new copy of him wherever it touches the ground, Kali is the one who solves what no other weapon can. She opens her mouth wide and drinks his blood before it reaches the earth, drains him dry, and swallows the last of him whole. There is a second, quieter story about her origin, that she is what Parvati looks like when she strips away her fair, gentle outer skin, that Kali was always underneath, and what people call Parvati is closer to a costume laid over her.\n\nThe image of her standing on Shiva has its own story. Kali, drunk on the blood of battle, dances so wildly that the world itself begins to shake apart. The gods, terrified, beg Shiva to intervene. He lies down directly in her path. In most tellings she doesn't notice him until her foot lands on his chest, and only then, catching herself mid-motion, does her tongue shoot out in shock and shame at having stepped on her own husband. That gesture, caught between destruction and sudden self-recognition, is the single most reproduced image of her in the world.",
    symbolism:
      "Her name comes from kala, time, with the feminine ending making her its personification, she who moves through and eventually dissolves everything time touches, no exceptions granted. The skirt of severed arms and the garland of skulls are read the same way in most serious commentary, arms stand for action and its accumulated consequence, karma, and the fifty skulls carry the fifty letters of the Sanskrit alphabet, the raw sound-units everything nameable is built from. She wears the entire apparatus of individual action and individual identity as ornament, worn loosely, held with no attachment.\n\nThe tongue is read several ways depending on lineage, shame at stepping on Shiva in the popular story, but older tantric commentary reads it as her drinking the blood of ego and time itself, rajas, restless energy, caught mid-motion on a body that has gone still, sattva. Standing on Shiva is not a woman standing over a subdued man in the way it can look at a casual glance. Shiva is consciousness, still, inactive, unchanging, the ground everything else moves across. Kali is shakti, active, moving, the force that does everything that happens on that ground. Without her nothing happens at all. Without him she has no ground to happen on. The image is a single unit: consciousness and its active force, inseparable.\n\nHer nakedness is the same instruction stated a different way. She wears nothing because time and death strip away every covering eventually, wealth, reputation, the body itself, and she is simply what is left once every covering has already been removed. Facing her honestly means facing that fact directly rather than working around it.",
    energy:
      "Kali is the Mahavidya most people meet first and understand least, because the initial impression, blood, skulls, a sword, a battlefield, reads as pure destruction to anyone encountering her without context. In the tantric view her destruction is never random or cruel. It is the specific force that ends what has finished serving its purpose, dissolves the false in favour of what's real underneath it, and clears ground so something else can grow there. She governs time in the most literal sense, the force that ages every cell in your body right now, that will eventually end this conversation, this course, this life, and every life after it. Most spiritual approaches try to soften that fact or explain it away. Kali asks you to look straight at it instead.\n\nHer mantra, kring, is considered one of the most direct bija sounds in the entire tantric system, associated in Kali Kula lineages with the raw, undifferentiated potential just before it takes any shape at all. Ramakrishna, perhaps the most famous devotee of Kali the tradition has produced, described approaching her as Ma, mother, rather than as a distant terrifying force, insisting that the same figure who destroys is also the one who feeds, holds, and loves without condition. Both are true at once and neither cancels the other. That is a genuinely difficult thing to actually integrate rather than simply agree with as an idea, and it is the central work of practicing with her at all.\n\nCremation ground practice, shmashana sadhana, is historically associated with her more than with any other deity in the Hindu tantric field. Sitting in a place built entirely around death, meditating there, sometimes through the night, is meant to strip the practitioner of exactly the comforting distance most people keep between themselves and their own mortality. What burns there each day is not an abstraction. It forces the question every serious practitioner eventually has to sit with honestly: what in me is actually permanent, and what have I simply assumed was permanent because I never tested it against anything real.",
    forPractitioner:
      "Working with Kali tends to bring up whatever a student has been quietly avoiding, an ending they haven't accepted, a fear of death they've managed by not thinking about it, an identity they've built that depends on things staying the way they currently are. Gentle reassurance would undercut the entire point of working with her. The invitation is to let her show you exactly where you're still pretending something is solid that time is already dissolving, and to meet that directly instead of turning away from it one more time. What tends to follow honest contact with her can look like despair briefly, but it settles into something closer to a clean, sober freedom that comes from no longer spending energy propping up what was never going to last regardless.",
    practices: [
      {
        title: "Direct death contemplation",
        detail:
          "Spend fifteen minutes in genuine stillness contemplating your own death directly, not as an abstract certainty everyone accepts intellectually, but as a specific, real event that will happen to you. Where. When. What it will feel like. What you'll leave unfinished. Let the discomfort arrive fully instead of managing it or moving past it quickly.",
      },
      {
        title: "The list of endings",
        detail:
          "Write down every ending you're currently resisting, a relationship that has already run its course, a version of yourself you're still performing out of habit, a project or identity that no longer fits. For each, ask honestly whether you're keeping it alive out of genuine value or simple fear of the empty space it would leave behind.",
      },
      {
        title: "Kring japa",
        detail:
          "Spend a session repeating the bija kring quietly, on the breath, without needing to understand it intellectually first. Notice what arises as you continue, restlessness, resistance, unexpected calm. Let the sound do its work rather than analyzing it as you go.",
      },
      {
        title: "Facing the mirror unadorned",
        detail:
          "Sit in front of a mirror without any of your usual self-presentation, no phone nearby, no performance for anyone, including yourself. Look directly at your own face and ask what remains when everything you use to define yourself, your work, your relationships, your reputation, is set aside for these few minutes.",
      },
      {
        title: "Severing an attachment in miniature",
        detail:
          "Choose one small, safe attachment, a habit, a possession, a routine, and deliberately let it go for a sustained stretch of days. Notice the grief, irritation, or relief that surfaces, and treat whatever comes up as real information about how you actually relate to loss.",
      },
      {
        title: "Standing on stillness",
        detail:
          "In meditation, work directly with the Shiva-Kali image: let your body remain as still and quiet as possible, Shiva, while allowing your breath and awareness to move freely on top of that stillness, Kali. Notice how one supports the other rather than competing with it.",
      },
    ],
  },
  {
    slug: "tara",
    order: 2,
    name: "Tara",
    nameMeaning: '"She who guides across", the star that leads a traveler through the dark.',
    accentColor: "#5B7C93",
    yantra: { petals: 8, triangle: "up" },
    atAGlance:
      "Second of the Mahavidyas. Blue-skinned, often shown standing on a corpse or on Shiva as Shava (Shiva in his inert, corpse-like aspect), with a garland of skulls, a crescent moon in her hair, and in her most ferocious form, Ugra Tara, four arms holding a sword, a skull-cup, a blue lotus, and scissors. Sometimes shown nursing Shiva at her breast. Closely related to, but distinct from, the Buddhist Tara who guides travellers across danger.",
    myth: "Her defining story sits inside the churning of the ocean of milk, the same event that produces Kamala later in this sequence. As gods and demons pull the serpent Vasuki back and forth to churn the cosmic ocean, the first thing to rise from the depths is Halahala, a poison so total it threatens to destroy every world at once. Shiva, the only one capable of holding what nothing else can contain, swallows the poison to save creation, and it lodges in his throat, turning it permanently blue, which is why he is called Nilakantha, blue-throated. But even Shiva, holding the poison, begins to lose consciousness under its weight.\n\nTara appears at exactly this moment. In the most common telling she takes the barely conscious Shiva onto her lap and offers him her breast, and as he nurses, her milk draws the worst of the poison's effect out of him, calming and stabilizing what even his own power alone couldn't fully hold. It is an unusual image in the tantric canon, tenderness and terror occupying the same frame without contradiction, a fierce, blue-skinned, sword-bearing goddess acting as mother in the moment the universe itself nearly didn't survive.",
    symbolism:
      "Her name, from the Sanskrit root meaning to cross or to carry across, tells you what she governs before any iconography does. She is invoked specifically at points of crossing, the passage through a genuine crisis, a difficult birth, an ocean voyage, a threshold between one state of being and another that cannot simply be avoided or waited out. Where Kali dissolves what has already finished, Tara is called on while you are still in the middle of the danger, still crossing.\n\nThe blue skin links her directly to Shiva's blue throat in the poison story, she carries the same colour as the substance that nearly ended everything, having taken it in and held it without being destroyed by it. The scissors carried in her Ugra form cut through obstacles and delusion directly rather than working around them. The skull-cup she holds is read by most serious commentators as her capacity to hold and metabolize exactly what would poison an ordinary consciousness, the same function she performed for Shiva in the myth, made into a permanent attribute rather than a single historical act.",
    energy:
      "Within the tantric classification of the Mahavidyas, Tara occupies the position just after Kali for a specific reason, she takes the raw dissolving power Kali represents and gives it direction and protective function. Where Kali's energy can feel like pure exposure to time and death with nothing offered in return, Tara's energy is the same intensity turned toward guidance, toward getting a struggling consciousness safely through what it's facing rather than simply confronting it with the fact of its own impermanence.\n\nShe is closely associated in several lineages with Nilasaraswati, blue Saraswati, linking her to speech, discrimination, and the sharp clarity of mind needed to actually navigate a crisis rather than be overwhelmed by it. This is worth sitting with directly: her power is precise and intelligent, exactly calibrated to the danger at hand, the same quality of mind that lets a skilled physician stay calm and clear while treating a genuine emergency. Tantric practitioners in the Kali Kula lineages that include her often describe her as the compassionate face of the same current Kali represents in its rawest form, the fierceness is not softened, it is simply now working in your favour rather than only exposing you.",
    forPractitioner:
      "Tara tends to arrive during, or shortly before, an actual crossing, a genuine transition a student is in the middle of rather than simply contemplating from a safe distance. Call on her clear, protective, unsentimental strength while you are still in the difficulty itself, rather than waiting until you feel ready or until the danger has passed. Trust that the same intensity that can look frightening from the outside is, from the inside, precisely what carries a person through.",
    practices: [
      {
        title: "Working with a live crossing",
        detail:
          "Identify a genuine transition you are currently in the middle of, not finished, not yet begun, actually underway. Sit with it directly and ask what would change if you approached it the way Tara approaches Shiva in the myth, calm, capable, and unafraid of what you're holding.",
      },
      {
        title: "Metabolizing what's difficult",
        detail:
          "Notice something in your life you've been trying to avoid, suppress, or push away rather than actually process. Practice holding it consciously instead, the way Tara holds the poison, not swallowing it whole and pretending it isn't there, but staying present with it long enough that it stops being purely toxic.",
      },
      {
        title: "The sharp mind in crisis",
        detail:
          "The next time something genuinely stressful happens, notice your habitual reaction, panic, avoidance, freezing, and practice consciously bringing in discrimination instead, asking clearly what actually needs to happen next rather than what your fear wants you to do.",
      },
      {
        title: "Tara mantra as anchor",
        detail:
          "Use her mantra, om tare tuttare ture svaha, as a grounding tool specifically during moments of real difficulty, not as a general practice detached from context, but as something you reach for right when you need steadiness most.",
      },
      {
        title: "Nursing what's suffering",
        detail:
          "Practice a version of what Tara does for Shiva, offer direct, uncomplicated comfort to something or someone in genuine distress, without trying to fix, analyze, or hurry them through it. Notice what it costs you to simply stay present and soothing rather than solving.",
      },
    ],
  },
  {
    slug: "tripura-sundari",
    order: 3,
    name: "Tripura Sundari",
    epithet: "Shodashi",
    nameMeaning: '"The beauty of the three worlds", waking, dream, and deep sleep, all at once.',
    accentColor: "#C7A0A0",
    yantra: { petals: 12, triangle: "up" },
    atAGlance:
      "Third of the Mahavidyas, and the one worshipped most extensively as a complete tradition in her own right, Sri Vidya. Shown as an eternally sixteen-year-old girl, radiant, red-complexioned, seated on a throne supported by or resting atop Shiva, holding a noose, a goad, a bow of sugarcane, and five flower arrows. Her yantra, the Sri Yantra, nine interlocking triangles around a central point, is among the most widely reproduced sacred geometries in the world.",
    myth: "Her most direct origin story places her at the same event that gives rise to Bhairavi and several other fierce Mahavidyas, the aftermath of Sati's death at Daksha's sacrifice, where Sati's grief and fury manifest as the full circle of the ten Mahavidyas surrounding Shiva. But Tripura Sundari's deeper mythology sits less in a single dramatic episode and more in the Srividya tradition's account of her as Lalita, \"she who plays,\" who arises specifically to destroy the demon Bhandasura, a being born from the ashes of Kama, the god of desire, after Kama was earlier burned to nothing by Shiva's third eye.\n\nBhandasura's threat was a kind of totalizing control that suppressed desire, beauty, and pleasure themselves across creation, far beyond ordinary physical strength. Lalita rises from the sacrificial fire the gods perform to counter him, fully adorned, sixteen years old, radiant beyond description, and defeats him through the sheer overwhelming completeness of her own beauty and sovereignty, showing that what Bhandasura tried to suppress cannot actually be destroyed, only temporarily hidden.",
    symbolism:
      "Her name means the beauty of the three cities or the three worlds, and different commentaries read those three worlds differently, waking, dream, and deep sleep as three states of ordinary consciousness, or the three worlds of gross, subtle, and causal existence. Either reading points at the same thing: she is beauty and sovereignty present simultaneously across every level of experience there is.\n\nHer eternal youth, always exactly sixteen, is read in Srividya commentary as pointing to something outside time's usual effect, a beauty that isn't subject to the aging and decay every other form eventually undergoes, because it was never a property of the physical body to begin with. The bow of sugarcane and the five flower arrows are the weapons of Kama, desire, that she carries as her own, showing that desire itself, properly understood and rightly held, is a legitimate instrument of the sacred when it's in the right hands. The noose and goad she shares with Bhuvaneshvari, drawing things into form and directing them once they're there, but where Bhuvaneshvari's version of that power is spacious and maternal, Tripura Sundari's is refined, aesthetic, luminous.",
    energy:
      "Tripura Sundari sits at the exact centre of the Sri Yantra, the point called the bindu, surrounded by nine interlocking triangles, four pointing upward representing Shiva, five pointing downward representing Shakti, the whole diagram read as the entire universe of form condensing toward, or expanding from, a single dimensionless point. She is worshipped through Sri Vidya, one of the most systematized and intellectually rigorous tantric traditions that survives today, built around her fifteen-syllable mantra, the Panchadashi, and its sixteen-syllable extension, the Shodashi, which is where her alternate name comes from.\n\nWhere most of the fiercer Mahavidyas work by confronting a practitioner with what they avoid, death, loss, invisibility, disgust, Tripura Sundari works through refinement, beauty consciously recognized and consciously held rather than grasped at or feared. This is a genuinely different path than most tantric practice assumes, which tends to treat asceticism and denial as the more serious road. Sri Vidya treats aesthetic and sensory delight, rightly understood, as a direct route to the same recognition the harder paths are also aiming at, that consciousness itself is what's actually beautiful, and the world's beauty is simply that same consciousness showing itself through form.",
    forPractitioner:
      "Working with Tripura Sundari is less about confronting something difficult and more about training yourself to actually see and hold beauty without immediately grasping at it, using it, or turning away from it out of guilt or unworthiness. Many people, especially those with more ascetic training, find this genuinely harder than confronting fear or death, because it asks you to fully receive pleasure and beauty without either indulging compulsively or retreating into denial. Tripura Sundari asks for a very particular kind of maturity, the capacity to be fully present with delight while remaining sovereign over it rather than owned by it.",
    practices: [
      {
        title: "Conscious beauty",
        detail:
          "Choose one experience of beauty each day, a piece of music, a face, a flower, a sunset, and give it your full, undistracted attention for several minutes. Notice the difference between simply consuming beauty quickly and actually staying with it long enough to feel what it does in you.",
      },
      {
        title: "Sri Yantra contemplation",
        detail:
          "Sit with an image of the Sri Yantra and let your eyes rest on the central point, the bindu, while the surrounding triangles remain in soft peripheral awareness. Notice the pull toward the centre and what it feels like to let your attention settle there rather than scanning the whole design.",
      },
      {
        title: "Desire examined honestly",
        detail:
          "When desire arises today, whatever kind, pause before acting on or suppressing it, and ask directly what it actually wants and whether meeting it would serve you or simply distract you. Practice neither indulging automatically nor denying automatically.",
      },
      {
        title: "Adornment as offering",
        detail:
          "Dress, groom, or prepare your space with unusual care today, as a deliberate offering to the beauty of the moment itself, for no one's benefit but its own. Notice how this differs from dressing to be seen or approved of.",
      },
      {
        title: "Sixteen-syllable practice",
        detail:
          "If you have received initiation into the Panchadashi or Shodashi mantra, use it as your primary practice with her. If not, work instead with her bija, hrim, repeating it quietly while holding the intention of recognizing beauty and sovereignty as inseparable from consciousness itself.",
      },
    ],
  },
  {
    slug: "bhuvaneshvari",
    order: 4,
    name: "Bhuvaneshvari",
    epithet: "Queen of Space",
    nameMeaning:
      'From bhuvana (world, realm) and ishvari (queen, sovereign), "Queen of the Worlds," or she whose body is the world.',
    accentColor: "#C2836A",
    yantra: { petals: 8, triangle: "up", enclosure: true },
    atAGlance:
      "Fourth of the Mahavidyas. Golden or fair complexion, calm and maternal expression, seated on a lotus or throne. Four arms: two hold a noose (pasha) and a goad (ankusha), the other two make gestures of blessing and fearlessness.",
    myth: "Bhuvaneshvari doesn't have the kind of vivid, standalone story that Bagalamukhi or Dhumavati have. Like the other Mahavidyas, she's said to emerge from Sati's fury surrounding Shiva at the time of Daksha's sacrifice, taking her place among the ten directions that encircle him. Beyond that, her significance sits mainly in doctrine rather than narrative, worth knowing honestly rather than papering over with an origin story that isn't really hers.",
    symbolism:
      "Her two main implements, the noose and the goad, are worth understanding together rather than separately. The noose binds. It's the action of drawing something into form, pulling the unformed into shape, the way creation itself gathers what's formless into something that can be recognized as a world. The goad, an instrument used to direct an elephant, guides what's already been drawn into being, shaping it, keeping it moving in a given direction, giving it order rather than leaving it inert. Between them, the two objects describe the whole of what she does: bringing the world into existence, and holding it in a coherent shape once it's there.\n\nHer other two hands, open in blessing and fearlessness, matter as much as the noose and goad. Whatever binding and directing she does happens without violence or threat. She isn't imposing order on a reluctant universe. She's simply providing the space and structure within which anything can exist at all, closer to a container than a ruler in the way most people imagine rulership.",
    energy:
      "The clearest way to understand her is by contrast with Kali. Kali is kala, time, the force that moves through everything and dissolves it. Bhuvaneshvari is akasha, space, the field within which time itself moves. Time acts. Space simply allows action to happen inside it, without being changed by what happens there. This is a genuinely different kind of power than most of the other Mahavidyas represent, and it's worth sitting with the difference rather than collapsing her into a version of \"gentle Kali.\"\n\nThe Rudrayamala Tantra ties her specifically to chit-akasha, the space of consciousness itself: the field of awareness in which every thought, perception, and experience arises and passes. She's also connected to the five gross elements, pancha-mahabhuta, as the substratum from which those elements differentiate, the field prior to earth, water, fire, air, and space taking on their separate identities. In Shakta traditions she's frequently placed alongside Tripura Sundari: where Tripura Sundari is the light of consciousness itself, Bhuvaneshvari is the space that consciousness unfolds within. Two ways of pointing at something very close to the same thing.",
    forPractitioner:
      "The most important thing to understand about Bhuvaneshvari's power is that it isn't something you generate. You don't build space, or earn it, or work your way toward it. It's already what's here, prior to anything you do inside it. Practicing with her is about noticing the space that was already present before you started trying to fill it, fix it, or control what's happening within it. That's a different kind of effort than most spiritual practice asks for, and it can take real attention just to see what it's even pointing at.",
    practices: [
      {
        title: "Space as container",
        detail:
          "In any room, pay attention to the space rather than the objects in it. Notice that it's the space that lets objects have form and definition, the unbound space is what defines the bound form. See the space as the container, and see her as the room in which all things appear. You can practice the same thing with a glass of water or a bowl of food: the shape holds the contents, but it's the space inside the container that actually allows anything to fill it.",
      },
      {
        title: "Widening awareness",
        detail:
          "Practice using your peripheral vision instead of looking directly at things, widen your field of awareness as far as it will go. Try this looking at the sky, in daylight and at night, letting your attention stretch to encompass the whole visual field rather than any one point in it.",
      },
      {
        title: "Space and thought",
        detail:
          'Watch your mind and notice that thoughts, images, and ideas all appear within a boundless mental space. Pay more attention to the space the thoughts appear in than to the thoughts themselves. The same applies to emotion, instead of "I am angry," notice that anger arises within space, within awareness, and that the space holds all of it, good or bad, without being changed by any of it.',
      },
      {
        title: "Releasing contraction",
        detail:
          "Notice contraction wherever it shows up, especially in conflict or anything that's causing you to tighten. Practice relaxing the shoulders, calming the breath, unwinding the body, and ask directly: how can I create more space here? Extend this into allowing things to be as they are, in difficult or uncomfortable situations you'd normally try to manage or fix, practice acceptance instead of correcting, editing, or optimizing. Stop tightening when things don't go the way you want. Let things be exactly as they are.",
      },
      {
        title: "Space in speech",
        detail:
          "Practice slowing down or stopping yourself from filling every silence. Notice the moments you rush to fill quiet with words, and ask yourself honestly why.",
      },
      {
        title: "Space for others",
        detail:
          "Be hospitable and spacious with the people around you. Don't close others down or try to control them. Stay open and receptive. Make room, physically and psychologically, for people to be exactly as they are. Ask yourself whether others can be in your presence without feeling compressed. Listen without interrupting. Hold what others are feeling without trying to fix it. Stay open.",
      },
    ],
  },
  {
    slug: "chinnamasta",
    order: 5,
    name: "Chinnamasta",
    nameMeaning: '"She whose head is severed", self-sacrifice as the source of what feeds others.',
    accentColor: "#A8503F",
    yantra: { petals: 6, triangle: "down" },
    atAGlance:
      "Fifth of the Mahavidyas and, for most people encountering her image for the first time, the most viscerally shocking. Stands naked on a copulating couple, holding her own severed head in one hand while three streams of blood arc from her neck, one into her own mouth and one each into the mouths of her two attendants, Dakini and Varnini, who flank her. Red-skinned, garlanded with a snake, standing in cremation ground fire.",
    myth: "The most widespread account places her origin at a river, where the goddess Parvati, or in some tellings Chandika, goes to bathe with her two attendants. Her attendants grow hungry and ask her for food. She tells them to wait until they've finished bathing, but their hunger grows so intense that their bodies begin to darken. Moved by their need before her own hesitation, Parvati severs her own head with her fingernail, or with her own sword in other versions, and her decapitated body continues to stand upright as three streams of blood shoot from the neck, one feeding each attendant and one feeding herself, so that all three are fed at once by the same act.\n\nThe couple she stands on is usually identified as Kama and Rati, desire and its consort, shown in union beneath her feet. This detail is essential rather than incidental, her entire act, the ultimate self-giving, unfolds directly on top of and in continuity with the ongoing, unstoppable current of desire and creative union that runs through all existence. She is not opposed to that current. She stands on it, drawing her own power directly from it while severing herself from the ordinary attachment to identity that usually goes along with it.",
    symbolism:
      "Chinnamasta means simply she whose head is severed, and the image resists every softening interpretation people sometimes reach for. Rather than a metaphor gently pointing at ego death from a safe distance, it is the most direct possible depiction of total self-sacrifice, the practitioner giving everything, down to the very seat of identity and thought, so that others can be fed. The three streams of blood, feeding Dakini, Varnini, and herself equally, show that this giving is not martyrdom or self-erasure in the sense of diminishing herself. She feeds herself from the same act that feeds them, losing nothing essential even as she gives everything visible away.\n\nHer standing on Kama and Rati identifies her directly with kundalini, the coiled creative and sexual energy at the base of the spine, and with the sushumna, the central channel it rises through. The three streams of blood are read by most serious tantric commentators as the three primary nadis, ida, pingala, and sushumna, the left, right, and central subtle channels running along the spine, blood standing here for the raw life-force, prana, that moves through them. Her severed head, held aloft rather than fallen, shows consciousness continuing to witness and direct that flow even once it has been separated from its usual seat in the body's uppermost point.",
    energy:
      "Chinnamasta is one of the most explicitly kundalini-centred Mahavidyas in the entire group, and serious practitioners generally approach her only after real groundwork in more foundational practice, because what she represents is genuinely intense, direct contact with the raw movement of sexual and vital energy up through the central channel, without the usual buffers most people keep between themselves and that force. She is closely associated with the sun and with solar fire, tejas, the same fierce, illuminating heat that in yogic physiology is said to burn through the knots, granthis, that ordinarily keep energy locked in place at different points along the spine.\n\nHer connection to sexuality is neither prudish avoidance nor simple indulgence. She stands directly on Kama and Rati rather than beside them or above them, in full continuity with desire's current rather than separated from it, drawing her power from the same source while remaining entirely undistracted by attachment to it. This is a genuinely advanced integration, the capacity to be in full contact with the most powerful creative force a human being carries while giving everything else away without hesitation or holding back. Practitioners who work seriously with her often describe the encounter as less about death in the ordinary sense and more about discovering what continues, what keeps witnessing and giving, once every ordinary support for identity has been removed.",
    forPractitioner:
      "Chinnamasta is not a goddess to approach casually, and if you're newer to serious practice, working with her gently and symbolically, rather than attempting anything involving actual energetic intensity, is the wiser course. What she asks of a student who is ready is total, unhesitating generosity, the willingness to give from your own core, your own life-force, without needing anything held back for yourself, while trusting that the same act which empties you also continues to feed you. The practices below are deliberately measured rather than literal, working with the principle she embodies without asking anyone to take on more than they're actually prepared for.",
    practices: [
      {
        title: "Total giving in miniature",
        detail:
          "Choose something today that costs you something real to give, time, attention, energy, comfort, and give it completely, without holding part of it back for yourself and without needing anything in return. Notice whether you actually feel diminished afterward, or something closer to what the myth describes.",
      },
      {
        title: "Breath and the central channel",
        detail:
          "In seated meditation, bring attention to the spine as a single central channel and practice breathing as though awareness itself moves directly up and down it, rather than diffusely through the whole body. Keep the session short and gentle; this is preparation, nothing more.",
      },
      {
        title: "Feeding what's hungry",
        detail:
          "Notice someone in your life who is genuinely in need, of attention, of comfort, of practical help, and meet that need directly and promptly rather than waiting until it's convenient for you, the way Parvati's attendants weren't asked to simply wait any longer.",
      },
      {
        title: "Facing what you'd rather not see",
        detail:
          "Sit with the raw image of her severed head and the blood feeding all three figures without turning away from its intensity. Let yourself feel the shock of it directly rather than intellectualizing it immediately, and notice what settles once you've actually stayed with the discomfort.",
      },
      {
        title: "Desire without distraction",
        detail:
          "Notice a moment of genuine desire, sexual, creative, or otherwise, and practice staying fully present with its energy without either acting on it compulsively or suppressing it. Ask what it would mean to draw power from that current without losing yourself in it.",
      },
    ],
  },
  {
    slug: "bhairavi",
    order: 6,
    name: "Bhairavi",
    nameMeaning: "The fierce feminine counterpart of Bhairava, Shiva in his most terrifying form.",
    accentColor: "#7A3E3E",
    yantra: { petals: 10, triangle: "down" },
    atAGlance:
      "Sixth of the Mahavidyas, the direct feminine counterpart of Bhairava, the fierce, terrifying aspect Shiva takes on as lord of the cremation ground. Red-complexioned, three-eyed, garlanded with skulls, seated or standing on a corpse, often shown holding a skull-cup, a sword, and gestures of blessing and fearlessness despite her ferocity. Closely tied to cremation ground worship and to the panchamakara, the five substances used in certain tantric rites.",
    myth: "Bhairavi's mythology runs closely alongside Bhairava's, the form Shiva takes when he beheads Brahma's fifth head for its arrogance and is then cursed to wander as an ascetic carrying the skull as a begging bowl until his sin is purged. Bhairavi is understood in most Shakta readings as the shakti, the active power, rather than as a separate story on its own, without which Bhairava's own ferocity would have no force behind it, the same relationship that runs through every Shiva-Shakti pairing in this system, one supplying stillness and ground, the other supplying the actual capacity to act.\n\nIn the wider Mahavidya cycle she is counted among the goddesses who rise from Sati's fury at Daksha's sacrifice, taking her place as the fierce, cremation-ground-dwelling face of that same anger. Some tantric texts identify her directly with Tripura Bhairavi, linking her to the same Sri Vidya current that produces Tripura Sundari, but expressed here in her rawest, least ornamented form rather than the refined, youthful one.",
    symbolism:
      "Where Kali's ferocity centres on time and dissolution, and Chinnamasta's centres on self-sacrifice, Bhairavi's centres specifically on terror itself as a direct gateway to transformation. She does not ask a practitioner to work around fear, manage it from a safe distance, or wait until it passes. She puts the practitioner directly in contact with what is genuinely terrifying, the corpse she stands on, the raw violence of the cremation ground, the naked fact of death as an ongoing physical process rather than a distant idea, and treats that direct contact as the actual method rather than an obstacle to it.\n\nHer association with the panchamakara, wine, meat, fish, parched grain, and sexual union, used in certain left-hand tantric rites, points at the same underlying instruction from a different angle. These are substances and acts that mainstream Brahminical practice treats as impure or forbidden. Working with them consciously, under proper guidance, is meant to demonstrate directly that purity and impurity are categories imposed by convention rather than by the substances themselves, and that a practitioner who can meet what's forbidden without craving or aversion has genuinely gone past the duality most spiritual practice never actually escapes, it just avoids testing it.",
    energy:
      "Bhairavi governs a category of power that is easy to misunderstand from the outside as simple violence or transgression for its own sake. What she actually represents is the raw, untamed current of shakti before it has been shaped, refined, or made socially acceptable, the same energy that later, in figures like Tripura Sundari, appears beautiful and ordered, but here still in its unrefined, overwhelming state. Working with her is less about acquiring a specific skill and more about building the capacity to stay present in the face of intensity that would ordinarily make most people flee or shut down.\n\nHer connection to Bhairava, and through him to the cremation ground ascetic traditions of the Aghori and related lineages, places her firmly within the branch of tantra that works directly with what is feared, avoided, or considered impure, rather than through gradual purification alone. This is not the whole of tantra, and it is not for everyone, but it represents a genuinely important current within it, the recognition that some knots in a person only release when confronted directly rather than slowly worked around, and that a guide willing to hold that kind of direct confrontation safely is doing something real and necessary.",
    forPractitioner:
      "Working with Bhairavi tends to surface whatever a student finds most viscerally frightening or most instinctively labels as impure or forbidden. Rather than analyzing that reaction from a comfortable distance, the practice is to actually stay present with it directly, under safe and controlled conditions, long enough to see what's really there once the automatic flinch has passed. This is demanding work, and it should be approached with real groundwork already in place rather than as a first encounter with tantric practice. Done honestly, it tends to loosen a kind of fear that intellectual understanding alone rarely touches.",
    practices: [
      {
        title: "Sitting with genuine fear",
        detail:
          "Identify something that produces a real, physical fear response in you and spend deliberate time in its presence, safely and with full consent to the exercise. This might mean visiting a cemetery at night, sitting with disturbing imagery, or simply staying with a genuinely frightening thought without pushing it away. Notice what actually happens in your body as you stay rather than flee.",
      },
      {
        title: "Examining the forbidden",
        detail:
          "Notice something you consider impure, disgusting, or off-limits, and ask honestly where that judgment came from, whether it's your own direct experience or an inherited convention you've never actually tested. This is not permission to act recklessly, it's an invitation to look clearly at the source of the reaction itself.",
      },
      {
        title: "The corpse meditation",
        detail:
          "Visualize your own body as a corpse in the early stages of decay, as vividly and specifically as you can manage, and stay with the image rather than moving quickly past it. Notice what in you resists the image, and what, if anything, settles the longer you remain with it.",
      },
      {
        title: "Working with raw intensity",
        detail:
          "The next time strong, unrefined emotion arises in you, rage, terror, raw grief, practice staying with the sensation directly in the body rather than immediately narrating, explaining, or managing it. Let it be as loud and unfiltered as it actually is for a few minutes before you do anything else with it.",
      },
      {
        title: "Bhairavi mantra",
        detail:
          "Work with her bija, hrim, or her fuller mantra if you have received it, specifically before or during any of the exercises above, using the sound as an anchor that lets you stay present with intensity rather than being swept away by it.",
      },
    ],
  },
  {
    slug: "dhumavati",
    order: 7,
    name: "Dhumavati",
    nameMeaning:
      '"She who is made of smoke", from dhuma, smoke, and vati, one who carries or possesses.',
    accentColor: "#9C9A92",
    yantra: { petals: 0, triangle: "down" },
    atAGlance:
      "Seventh of the Mahavidyas. Shown as an old, thin widow with pale or ashen skin, unkempt hair, no jewellery or ornament, dressed in plain or worn cloth. Rides in a crowless chariot or carries a crow emblem, and holds a winnowing basket. Trembling, restless in posture. Deliberately unattractive by every convention Hindu iconography usually follows.",
    myth: "Two accounts of her origin exist side by side, and both are worth knowing.\n\nThe first: when Sati burned herself alive at her father Daksha's sacrifice, rather than see her husband Shiva excluded and dishonoured, what rose from that fire wasn't a form but smoke, grief with no shape left to hold it. Dhumavati is what remained of Sati after everything that could burn had burned. She is sometimes described simply as \"all that is left of Sati.\"\n\nThe second account is stranger. Sati, overcome with hunger while Shiva sat deep in meditation, asked him repeatedly for food. He kept telling her to wait. Eventually her hunger became so total that she swallowed Shiva himself. Smoke began rising from within her, Shiva's own ascetic fire, still burning even inside her. Shiva asked to be released, and, ashamed at what she'd done, she brought him back up. He then told her that having consumed her own husband, she would take the form of a widow from that point on.",
    symbolism:
      "Nothing about Dhumavati is designed to be wanted. Every other Mahavidya carries some version of beauty, wealth, fierce power, or intensity that draws the eye toward her. Dhumavati is built the opposite way, old, ashen, unadorned, trembling, without a single ornament, and that is the entire point rather than an accident of the tradition or a mark of lesser status. She removes anything a practitioner might reach for out of attraction, so that what's left has to be met on its own terms.\n\nThe widow status carries real weight in the culture this material comes from, where a widow historically had no husband to derive status or security from and no expectation of remarriage. Read that way, Dhumavati isn't a diminished figure. She's a figure standing entirely outside the structure that normally defines and protects a woman in that world, outside relationship, outside role, outside the usual sources of safety. Some traditions describe her directly as Shakti without Shiva: the feminine, generative power of the universe, present even when the force it's usually paired with and defined against is entirely absent.\n\nThe winnowing basket she carries is a farming tool used to separate grain from husk by throwing both into the air and letting the wind carry off what isn't needed. It's a precise image for what working with her actually asks of a student: seeing clearly what's substantial and what was never anything more than covering. The crow, considered inauspicious in ordinary Hindu symbolism and closely tied to death ritual and ancestor offerings, appears here too, she associates freely with exactly what most worship tries to keep at a comfortable distance.",
    energy:
      "Within the tantric classification of six ritual actions a practitioner can direct outward, pacifying, attracting, immobilizing, dividing, uprooting, and destroying, Dhumavati is specifically linked to uprooting, uchatana: the removal of something from where it's taken root. Where Bagalamukhi's stambhana freezes something in place, Dhumavati's domain takes it out entirely, leaving nothing behind for it to grow back from.\n\nWhat makes her genuinely difficult, and genuinely valuable, is that she doesn't resolve into anything comforting. Most spiritual material, even material that deals honestly with loss or fear, tends to arrive somewhere reassuring by the end, a lesson learned, a meaning found, a silver lining. Dhumavati offers none of that. She is what's left when meaning-making has stopped working and you're simply sitting with what's actually there. That's a real capacity, and a rare one, and it's the specific thing working with her is meant to develop.",
    forPractitioner:
      "Most people spend a great deal of energy avoiding exactly what Dhumavati represents, being unseen, growing old, losing what they've built an identity around, feeling disgust without immediately explaining it away. Working with her doesn't ask you to fix, transform, or find meaning in any of that. It asks you to be in direct contact with it without flinching or reaching for a story that makes it easier. That's a genuinely different kind of practice than most of the other Mahavidyas ask for, and it tends to be the one students find hardest, and often, afterward, the one they value most.",
    practices: [
      {
        title: "Decay",
        detail:
          "Cut open an apple and a banana and observe them decaying over the following week. Visit a cemetery and spend time there contemplating death, decay, and impermanence directly. While there, visualize your own body going through the stages of decay after death, in detail, as something felt rather than a passing image.",
      },
      {
        title: "Invisibility",
        detail:
          "For a sustained stretch of days, stop trying to impress anyone in any way. No posting online, no image-management, skip the nice clothes, dress plainly or in something worn. Let others speak first. Walk without trying to be noticed. Notice the fear of not being recognized, and notice the ego as it goes unfed.",
      },
      {
        title: 'Working without "I"',
        detail:
          'For a sustained stretch of days, outside of work, avoid using the word "I" or its variants, me, mine. This is harder than it sounds. Notice how much of your speech is built around yourself, and notice how much quieter you become once that\'s no longer available to you.',
      },
      {
        title: "Disgust",
        detail:
          "Look directly at something you find disgusting and trace the feeling to its root, what is it, actually. Try this with something else and see whether the root is the same or different depending on the object. Separately, look at photos of people widely considered attractive when they were young, then look at photos or video of the same people much older. Watch your own reactions carefully as you do, what changes, and what does that change tell you.",
      },
    ],
  },
  {
    slug: "bagalamukhi",
    order: 8,
    name: "Bagalamukhi",
    epithet: "Pitambara Devi",
    nameMeaning:
      "From bagala, likely a variation of the Sanskrit valga (bridle, the strap used to control a horse), and mukhi (face), pointing toward control and restraint.",
    accentColor: "#AD8A3E",
    yantra: { petals: 8, triangle: "up" },
    atAGlance:
      'Eighth of the ten Mahavidyas. Also known as Pitambara Devi, "the one dressed in yellow." Associated with the colour yellow throughout her worship: turmeric, yellow cloth, yellow flowers. Shown seated on a golden throne, golden-skinned, usually two-armed, one hand raised with a club, the other pulling the tongue of a demon at her feet.',
    myth: "In the Satya Yuga, a storm arose that threatened to destroy the world. Vishnu performed austerities at Haridra Sarovar, the Lake of Turmeric, asking the Goddess for help. She rose from the golden waters of the lake as Bagalamukhi and stopped the storm.\n\nA second story tells of a demon named Madan, granted a power of speech so absolute that anything he said became true, and who used it to spread chaos. Bagalamukhi stopped him by seizing his tongue, ending his power at its root rather than answering each thing he said after he'd already said it.",
    symbolism:
      "The raised club and the seized tongue together show her method: she doesn't meet force with greater force applied after the fact. She goes to where the force originates and holds it there. This is stambhana, freezing or immobilizing something at its source.\n\nHer stillness is worth noticing. Most Mahavidyas are shown mid-motion, dancing, fierce, in some state of transformation. Bagalamukhi is seated, calm, three-eyed, unmoving. Older texts describe her enthroned in the middle of an ocean. The ocean is what's already in motion, everywhere, constantly. She sits in the centre of it without being moved by it. That's the image to hold: a goddess who is simply not carried by what carries everything else.",
    energy:
      "Tantra classifies six specific ritual actions a practitioner can direct outward, known as the shatkarma: shanti (pacifying), vashikarana (attracting or bringing under influence), stambhana (immobilizing), vidveshana (creating division), uchatana (uprooting), and marana (destroying). Bagalamukhi governs stambhana specifically. Of the six, it's the only one that doesn't destroy, remove, or redirect anything. It simply stops something exactly where it is.\n\nShe carries another epithet worth sitting with: sarva-vipreeta-karini, she who turns everything into its opposite. This is a different power than stopping. Stopping is a freeze. Reversal is a flip, the same force, redirected back the way it came. In the myth, Madan's own gift of speech is what destroys him once his tongue is taken; his power didn't disappear, it turned back on its source. That's worth remembering when you apply this internally. The anger you interrupt doesn't vanish. Interrupted at its root, it can turn into something usable, clarity, discernment, rather than simply being suppressed and left to resurface later in a different shape.\n\nHer connection to the tongue points further than literal speech. In tantric thought, speech has four levels, moving from subtlest to grossest: para, the undifferentiated impulse before it has any shape at all; pashyanti, the first stirring of intention; madhyama, the formulation of that intention into something like thought or inner language; and vaikhari, the spoken word itself, the only level anyone else ever hears. By the time you notice yourself speaking, or thinking in words, you're already four steps downstream from where the impulse actually began. Bagalamukhi's power to seize the tongue is traditionally read as authority over speech, but the deeper application is authority over that entire chain, the capacity to reach further upstream than most people ever look, toward para and pashyanti, before the impulse has finished becoming a thought, let alone a sentence.",
    forPractitioner:
      "This isn't a power you call on only when facing an external opponent, though that's the traditional application. Internally, the \"enemy\" is whatever has already started moving in you before you've agreed to it, a reactive thought, a defensive reply forming before the other person has finished speaking, a craving that's already pulling you toward the fridge or the phone. Stambhana, worked with internally, is the capacity to catch that movement early, ideally before it's even fully a thought, and hold it there long enough that you get to decide what happens next instead of the momentum deciding for you.\n\nYou'll likely notice this power is available in the narrow space right before something happens: right before you speak, right before you reach for something, right before you send the message you're already regretting. Most people never see that space, because by the time they notice what's happening, they're already several steps into vaikhari, already speaking, already reaching, already reacting. The work with her is learning to find that gap earlier than usual, and to stay in it a little longer than is comfortable.",
    practices: [
      {
        title: "Working with speech",
        detail:
          "Before speaking, ask whether what you're about to say needs to be said. Notice explanations, repetitions, and filling silence out of discomfort rather than because you have something to say. If you catch the impulse before the words are out, let it stay unspoken and see what that's like.",
      },
      {
        title: "Working with reaction",
        detail:
          "When something irritating happens, wait before responding to it, thirty seconds is enough. Don't suppress what you're feeling and don't analyze it, just stay with it without adding anything to it. Notice whether it changes on its own once you stop feeding it.",
      },
      {
        title: "Working with desire and habit",
        detail:
          "When a small urge shows up, checking your phone, wanting a snack, wanting to interrupt, wait a full minute before acting on it. This isn't about denying yourself. It's about finding out what an impulse actually does when you don't act on it immediately.",
      },
      {
        title: "Working with stillness",
        detail:
          "A few times a day, stop completely for three minutes. No task, no phone. Notice what keeps moving even when your body doesn't, usually thought, usually planning or replaying. This is generally the clearest way to see how much of your mental activity runs on its own, independent of anything you're actually doing.",
      },
      {
        title: "Working with choice",
        detail:
          "Periodically through the day, ask directly: did I choose that, or did habit? Apply it to speech, to reactions, to small decisions. You won't get a clean answer every time. The value is in asking the question at all.",
      },
    ],
  },
  {
    slug: "matangi",
    order: 9,
    name: "Matangi",
    nameMeaning: "The outcaste goddess of speech, sound, and forbidden offerings.",
    accentColor: "#647A57",
    yantra: { petals: 10, triangle: "up" },
    atAGlance:
      "Ninth of the Mahavidyas, dark green or blue-black complexioned, seated on a jewelled throne, holding a vina, a noose, a goad, and a sword, sometimes shown with a parrot nearby. Worshipped specifically with leftover food, ucchishta, and offerings that have already been used or partially consumed, a direct and deliberate reversal of ordinary Hindu purity conventions around ritual offering.",
    myth: "Her most direct origin story places her within the same aftermath of Sati's death that produces several of the fiercer Mahavidyas, but her defining episode is a separate one involving Vishnu and Krishna. In one telling, Krishna, while eating, is approached by his wives, and the food that falls from his mouth as scraps, ucchishta, becomes the seed from which Matangi arises, a goddess made explicitly from what convention treats as impure leftovers rather than from a clean or auspicious source.\n\nA second story ties her to the sage Matanga, after whom she is named, an outcaste or low-born ascetic in various tellings who performed such intense tapasya, austerity, that a goddess arose specifically to reward and embody the power he'd generated, taking on his name and his outsider status as her own defining feature rather than something to be hidden or overcome. Both stories point at the same underlying claim, that what caste society and ritual convention treat as low, discarded, or impure is not actually outside the sacred. It is simply where a certain kind of power has been deliberately hidden from view.",
    symbolism:
      "Matangi is frequently described as the tantric or outcaste counterpart to Saraswati, both goddesses of speech, learning, music, and the arts, but where Saraswati is worshipped with the cleanest, most auspicious offerings a household can produce, Matangi is worshipped with exactly the opposite, food that's already been eaten from, objects considered polluted, substances and gestures that mainstream ritual practice goes out of its way to avoid. Rather than incidental transgression for shock value, this is a precise doctrinal statement that the sacred does not actually stop where social convention says it stops, and that treating any category of person, substance, or offering as permanently outside the sacred is itself a limitation on the practitioner rather than a fact about reality.\n\nHer vina identifies her directly with music and refined sound, the same domain Saraswati governs, showing that this outsider status doesn't diminish her connection to beauty, art, and eloquence, it sits alongside it without contradiction. The parrot, a bird that mimics human speech without necessarily understanding it, is read by some commentators as a caution about hollow repetition, knowledge or ritual performed by rote without the direct realization behind it, a caution particularly apt for a goddess whose entire teaching concerns cutting through convention to what's actually real underneath it.",
    energy:
      "Matangi governs a very specific and often overlooked kind of tantric work, the reclamation of whatever a person or a whole culture has decided is unworthy, contaminated, or beneath consideration, and the recognition that real power and real sacredness are often hiding in exactly that discarded material rather than in whatever's already been polished and approved. She is directly associated with vak, speech, and specifically with the kind of speech that hasn't been filtered, sanitized, or made presentable, the honest, unedited voice that most social training teaches people to suppress in favour of something more acceptable.\n\nWorking with her tends to bring up wherever a student has internalized a sense of being unworthy, impure, or outside what's acceptable, whether that's rooted in family history, social status, a mistake they've never forgiven themselves for, or simply a part of their own nature they've learned to hide from others. Her teaching is not that these things should be paraded or indulged carelessly. It's that they need to be met honestly rather than kept permanently exiled, because whatever stays exiled tends to keep exerting a hidden pull on a person's energy regardless of how well it's hidden from view.",
    forPractitioner:
      "Working with Matangi asks you to look honestly at whatever you've learned to treat as shameful, impure, or unworthy in yourself, and to consider whether that judgment is actually true or simply inherited from people and systems that had their own reasons for drawing the line where they did. This isn't licence to act without discernment, Matangi's path has real discipline behind it even as it inverts ordinary convention. It's an invitation to stop keeping parts of yourself permanently in exile and to find out what becomes available once they're brought back into the light and met directly.",
    practices: [
      {
        title: "Reclaiming the discarded",
        detail:
          "Identify something in yourself you've treated as shameful, embarrassing, or unworthy of attention, and spend time with it directly rather than pushing it further away. Ask honestly whether the judgment against it is actually yours, examined and chosen, or simply inherited from somewhere else.",
      },
      {
        title: "Unfiltered speech",
        detail:
          "In a safe, private setting, practice speaking a genuine thought or feeling exactly as it actually is, without editing it for palatability first. Notice how much of your ordinary speech is shaped by anticipated judgment rather than by what's actually true for you.",
      },
      {
        title: "Working with what's left over",
        detail:
          "Pay deliberate attention today to what you normally discard without a second thought, leftover food, unfinished tasks, discarded ideas, and consider whether something usable or valuable is being thrown away along with what's genuinely spent.",
      },
      {
        title: "Sound and music as offering",
        detail:
          "Spend time with music or chant purely for its own sake, as a direct offering of attention, the way Matangi's vina is treated as sacred rather than merely decorative.",
      },
      {
        title: "Meeting the outsider",
        detail:
          "Notice your reaction to someone considered low-status, unclean, or beneath ordinary regard in whatever social context you find yourself in, and practice meeting them with the same regard you'd offer anyone else. Notice what resistance comes up and where it comes from.",
      },
    ],
  },
  {
    slug: "kamala",
    order: 10,
    name: "Kamala",
    epithet: "Kamalatmika",
    nameMeaning: '"She of the lotus", also "she who dwells in the lotus."',
    accentColor: "#C9AC72",
    yantra: { petals: 16, triangle: "up" },
    atAGlance:
      "Tenth and final of the Mahavidyas. Golden complexion, seated in lotus posture on a lotus flower, four arms, two holding lotuses, two making gestures of blessing and reassurance. Shown being bathed by elephants pouring nectar over her. Closely identified with Sri-Lakshmi. Within the Mahavidya group she's understood as the tantric form of the same goddess.",
    myth: "Her defining story is the churning of the ocean of milk, in which gods and demons work together to draw the nectar of immortality up from the depths of the cosmic ocean. Among what rises from that churning is Lakshmi herself, seated on a lotus, radiant and fully formed. Elephants stand at her sides pouring water and nectar over her, an image of pure abundance, given rather than earned or fought for, arriving as a natural consequence of the ocean being stirred rather than as a reward for any particular effort.",
    symbolism:
      "The lotus carries two meanings that matter here. It's rooted in mud, yet its flower stays untouched by what it grows out of, an image of something remaining clean and whole while still fully embedded in ordinary, often difficult, conditions. This is worth sitting with, because it's not the same as rising above the world or leaving it behind. The lotus doesn't escape the mud. It grows directly out of it and stays connected to it, while the part that opens to the light carries none of it.\n\nThe elephants pouring nectar over her point at something else, that real abundance moves toward her without being summoned or forced. She doesn't reach for the nectar. It's simply given. This is a very different image of wealth than most people carry, where getting more of anything requires effort, competition, or worry about scarcity.",
    energy:
      "Kamala's placement as the tenth and final Mahavidya is not explained in the source texts, and there's genuine disagreement among those who study this material about what it means. One reading treats her placement as minor. She's the most widely worshipped of the ten outside the Mahavidya context (most people who worship her know her as Lakshmi, with no awareness of the Mahavidya framework at all), and some scholars have suggested her inclusion here is a later, looser fit compared to goddesses like Dhumavati or Bagalamukhi, who exist almost nowhere outside this particular group.\n\nA more useful reading, for our purposes, treats her position as completion rather than afterthought. The nine Mahavidyas before her move through radical territory, death, fear, sacrifice, loss, the interruption of momentum, invisibility. Kamala is where the practitioner arrives after all of that: back in ordinary life, holding money, beauty, pleasure, and comfort again, but no longer holding them the way they did before. She isn't the starting point of the path, where someone believes wealth and beauty are the whole of what matters. She's closer to what it looks like to hold those same things afterward, once you've been through everything the other nine put you through. The lotus growing out of mud is the same image again: she is rooted in the material world, but something in how she holds it has changed.",
    forPractitioner:
      "This changes what her domain, wealth, actually means. It was never really about money. It's about your relationship to value in general: whether you can recognize what you already have, whether you can give and receive without contracting, and whether what you call wealth is actually serving you or simply keeping old fears quiet. The practices below work directly with that.",
    practices: [
      {
        title: "Recognizing wealth beyond money",
        detail:
          "Complete the sentence \"a wealthy person is...\" ten times and notice which themes keep repeating. Through the day, ask what forms of wealth are already present that money can't buy, health, friendship, silence, clean water, trust, knowledge, beauty, freedom, time. Ask which of these you already have, which you've ignored, and which you consistently undervalue.",
      },
      {
        title: "Working with scarcity fear",
        detail:
          "When anxiety comes up around money, food, time, attention, or relationships, ask what you're afraid won't be enough. Then ask whether the fear is happening now, or whether it's an inherited habit you're running on autopilot. Sit with a few direct questions: if I were abundant, what would I have that I don't now? What do I think is missing? Would having it actually fill anything that isn't already present in me? What would change, and what wouldn't?",
      },
      {
        title: "Examining desire",
        detail:
          "Every time a desire appears today, no matter how small, write it down. Then classify it, need, comfort, pleasure, vanity, fear, or genuine calling. Notice how few desires actually come from real need.",
      },
      {
        title: "Ethics of exchange",
        detail:
          "Reflect on your financial exchanges today, or recent ones. Ask of each: was this honest, was this generous, was this exploitative, was this fearful, was this in alignment. Also sit with the wider question, how should wealth move through a good person?",
      },
      {
        title: "Giving",
        detail:
          "Give something today that isn't only money, attention, encouragement, food, time, knowledge, forgiveness, labour. Notice what happens internally as you give. If resistance shows up, ask what you're resisting and why you're contracting.",
      },
      {
        title: "Receiving",
        detail:
          "Practice receiving well today, compliments, help, kindness, food, opportunities, affection, without deflecting, apologizing, feeling you need to earn it, or minimizing it. Notice why receiving is harder than giving.",
      },
      {
        title: "What's freely given",
        detail:
          "Spend some time contemplating everything that arrives without payment, sunlight, breath, rain, birdsong, gravity, intelligence, consciousness, love, the possibility of waking up at all. If all of this is already freely given, what does true wealth actually mean? Consider how you can participate in and appreciate this abundance rather than simply consuming it.",
      },
    ],
  },
];

export const mahavidyaBySlug = (slug: string) => mahavidyas.find((m) => m.slug === slug);
