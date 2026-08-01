// Ancient Egyptian Magick, course content
// Source: Ancient-Egyptian-Magick.pdf (Tantraya Center)
// Reuses the same chapter shape as the Faery Shamanism course so it plugs
// straight into the existing reader (Read / Practice / Quiz / Reflect tabs).

import type { FaeryChapter } from "./faery-shamanism";

export type PracticeVisual =
  | "breath"
  | "compass"
  | "flame"
  | "water"
  | "scale"
  | "glyph"
  | "star"
  | "seal"
  | "heart"
  | "light"
  | "gate"
  | "spiral"
  | "spine";

export type BodyCenter = "crown" | "third-eye" | "skull" | "throat" | "heart" | "base";

export type PracticePhase = "Prepare" | "Invoke" | "Working" | "Integrate" | "Close";

export type EgyptianChapter = Omit<FaeryChapter, "widget" | "practice"> & {
  widget?: "neteru-wheel" | "duat-gates" | "eight-fold-soul" | "gathering-of-heka";
  practice: {
    intro?: string;
    closingLine?: string;
    steps: {
      title: string;
      detail: string;
      seconds?: number;
      visual?: PracticeVisual;
      center?: BodyCenter;
      phase?: PracticePhase;
    }[];
  };
};

export const egyptianChapters: EgyptianChapter[] = [
  {
    slug: "heka-and-maat",
    n: "I",
    title: "Heka, Ma'at, and the Living Tradition",
    subtitle: "The force before the gods, and the truth that holds the world together",
    intro:
      "Ancient Egyptian civilization lasted over three thousand years, longer than any other high culture in recorded history. What we call \"Egyptian magick\" is a living current that absorbed, evolved, and reinterpreted itself across dynasties, from the Pyramid Texts of the Old Kingdom to the Greek Magical Papyri of the Roman period. Before any ritual, symbol, or god, there is Heka, the force beneath it all.",
    sections: [
      {
        heading: "Before the Gods, There Was Heka",
        body: "The Egyptians had no single word for \"magic\" as we use it. Their closest equivalent was Heka, simultaneously a cosmic force, a deity, and a practical technology. Heka existed before the other gods, present at the birth of creation itself. From the Coffin Texts: \"To me belonged the universe before you gods had come into being. You have come afterwards because I am HEKA.\" To practice Egyptian magick is to consciously work with this force, the same power a priest drew on in temple ritual and a magician drew on in a spell of healing. There was no meaningful separation between the two.",
      },
      {
        heading: "Ma'at and Hu: Truth and the Creative Word",
        body: "Ma'at is truth, justice, balance, and cosmic order, the principle without which the sun could not rise. Her single ostrich feather is the weight against which every heart is measured in the afterlife. Working magick without Ma'at is considered structurally unstable: a magician crooked in their dealings with the world will find their magical work crooked too. Hu is the divine creative word, the spoken utterance that brings form out of formlessness. Ptah created the universe through \"the thoughts of his heart and the words from his mouth.\" When a Heka spell is spoken correctly, proper names, proper intonation, proper inner state, the magician participates in that same original act of creation.",
      },
      {
        heading: "A Tradition Held Lightly Across Time",
        body: "Practices from the Old Kingdom and the Ptolemaic Period belong to the same essential current, even when surface details differ. The Pyramid Texts (c. 2400 B.C.E.) are the oldest religious corpus in the world. The Coffin Texts democratized the afterlife formulae in the Middle Kingdom. The Book of Coming Forth by Day, often called the Book of the Dead, is a New Kingdom compilation. The Greek Magical Papyri preserve Egyptian formulae in syncretic form from the Ptolemaic and Roman periods. Each layer is valuable; each speaks to the same underlying current from a different angle.",
      },
    ],
    widget: "gathering-of-heka",
    practice: {
      intro: "A short working to feel Heka as already present, then weigh your own heart against Ma'at. Find a quiet seat.",
      closingLine: "Heka settles back into stillness, present, waiting, until you call on it again.",
      steps: [
        { title: "Settle and breathe", detail: "Sit comfortably, spine easy. Three slow breaths, letting the outer day fall away.", seconds: 30, phase: "Prepare", visual: "breath" },
        { title: "Feel for Heka", detail: "Heka is not summoned from outside. It is recognised as already present, older than the gods themselves. Sense the field of aliveness in your own chest and hands.", seconds: 60, phase: "Invoke", visual: "light" },
        { title: "Speak a word with intention", detail: "Choose one true, simple word (your own name, or \"peace\", or \"clarity\"). Speak it aloud once, slowly, feeling it as an act of creation rather than description.", seconds: 45, phase: "Working", visual: "glyph" },
        { title: "Weigh your own heart", detail: "Silently ask: where in my life today was I out of right relationship, with myself, with another, with the truth? No judgment, just an honest look, as Ma'at asks.", seconds: 60, phase: "Integrate", visual: "scale" },
        { title: "Close", detail: "One more breath. Let Heka settle back into stillness until it's called on again.", seconds: 20, phase: "Close", visual: "seal" },
      ],
    },
    quiz: [
      { q: "What was the Egyptians' own word for the force we call \"magic\"?", options: ["Ma'at", "Heka", "Hu", "Sekhem"], answer: 1, explain: "Heka is simultaneously a deity and the primordial creative force underlying all magical and divine action." },
      { q: "According to the Coffin Texts, when did Heka come into being relative to the gods?", options: ["After the gods, as their servant", "At the same moment as the gods", "Before the gods", "Heka has no origin story"], answer: 2, explain: "Heka speaks in Spell 261: \"You have come afterwards because I am HEKA.\"" },
      { q: "What did priest and magician have in common in ancient Egypt?", options: ["Nothing. They were rival, opposed roles", "They drew on the same powers and addressed the same divine beings", "Only priests could legally perform ritual", "Magicians worked at night, priests by day"], answer: 1, explain: "There was no meaningful separation between religion and magick in ancient Egypt, both were acts of Heka." },
      { q: "What happens to the magical work of someone who is 'crooked' in their dealings with the world?", options: ["Nothing, ethics and magick are unrelated", "Their magical work becomes crooked too", "They lose the favour of Ra only", "It only matters after death"], answer: 1, explain: "Working with Ma'at is magical as much as it is ethical, misalignment with truth destabilises the working itself." },
    ],
    journalPrompts: [
      "Where in your life right now are you out of right relationship with the truth, with yourself, with someone else, or with a situation you've been avoiding naming clearly?",
      "Heka is described as present before you consciously invoke it. Where have you felt a force like this, already there, waiting to be recognised rather than summoned?",
    ],
  },
  {
    slug: "cosmic-architecture",
    n: "II",
    title: "The Cosmic Architecture",
    subtitle: "The Four Worlds, the Duat, and the temple as a working instrument",
    intro:
      "The Egyptians conceived of the universe as a layered, living structure, and understood their temples as precisely engineered instruments for working with that structure. Every ritual, every deity, every symbol finds its place within this larger cosmological map.",
    sections: [
      {
        heading: "The Four Worlds",
        body: "Nuit, the star goddess, arches overhead, her star-covered body forming the vault of the sky, swallowing Re each evening and birthing him each dawn. Shu, the air, holds her aloft, the breath of life separating sky from earth. Geb, the earth god, is the ground itself, his laughter causes earthquakes. Beneath all of this lies the Duat, the underworld, traversed nightly by Re in his solar barque. Surrounding everything are the waters of Nun, the primordial chaos from which creation emerged and to which it would return if ritual ever stopped renewing the world.",
      },
      {
        heading: "The Duat: A Navigable Territory",
        body: "The Duat was not a vague afterlife concept. It was understood as a specific, mapped territory with thirteen principal gates, each guarded by specific powers requiring specific magical knowledge to pass. The Gate of Khepri, the scarab of the rising sun, marks the threshold of becoming. The Gates of Anubis test purity of heart and deed. The Gates of Thoth assess knowledge and magical skill. The soul's journey ends at the Hall of Two Truths, the final judgment, where the heart is weighed against Ma'at's feather before Osiris and the Council of 42 Assessors. This was understood as transformation, not punishment: the soul that passed emerged into the Field of Reeds, able to continue learning and growing.",
      },
      {
        heading: "Temples as Working Instruments",
        body: "The Great Pyramid of Giza was a cosmological instrument as much as a tomb, its three pyramids mirroring the three stars of Orion's Belt, the constellation of Osiris himself. The Temple of Karnak was oriented so precisely that on the Summer Solstice sunrise, light travels the full length of the temple to illuminate the inner sanctuary. Egyptian temples were also acoustically engineered: the corridor at Luxor produces a standing wave tuned to roughly 8 Hz, close to the resonant frequency of the human body. None of this was decorative. Alignment, geometry, sound, water, and intention were understood as the seven keys that together open a working portal between worlds, and every one of them is available to you in your own space, however modest.",
      },
    ],
    widget: "duat-gates",
    practice: {
      intro: "Orient your space the way an Egyptian temple was oriented, through the four directions, back to a still centre.",
      closingLine: "Alignment amplifies everything else you do. Your space is now a small, working portal.",
      steps: [
        { title: "Face East", detail: "Stand or sit facing East, the direction of the rising sun and Horus. If you don't know true East, use a compass or your phone.", seconds: 30, phase: "Prepare", visual: "compass" },
        { title: "Ground the four directions", detail: "Turn slowly through East, South, West, North, naming each aloud and pausing to feel its quality: rising (East), fire (South), water (West), earth (North).", seconds: 90, phase: "Working", visual: "compass" },
        { title: "Return to centre", detail: "Face East again. Feel yourself as the still point at the centre of the four directions, the position from which every Egyptian temple was oriented.", seconds: 45, phase: "Integrate", visual: "star" },
        { title: "Set an intention for your space", detail: "Silently name what you want your own working space to be a portal for, right now.", seconds: 30, phase: "Close", visual: "seal" },
      ],
    },
    quiz: [
      { q: "Which Egyptian sky goddess swallows the sun each evening and gives birth to it each dawn?", options: ["Ma'at", "Nuit", "Isis", "Sekhmet"], answer: 1, explain: "Nuit's star-covered body forms the vault of the sky in Egyptian cosmology." },
      { q: "How many principal gates did the soul pass through in the Duat?", options: ["7", "9", "13", "42"], answer: 2, explain: "Thirteen gates, each guarded by specific powers requiring specific magical knowledge." },
      { q: "What did the Egyptians understand the Giza pyramids to mirror in the sky?", options: ["The constellation Draco", "The three stars of Orion's Belt", "The North Star", "The Pleiades"], answer: 1, explain: "The three pyramids mirror Sah, Orion's Belt, the celestial embodiment of Osiris." },
      { q: "What frequency does the acoustic corridor at the Temple of Luxor reportedly resonate at, close to the resonant frequency of the human body?", options: ["Roughly 8 Hz", "Roughly 80 Hz", "Roughly 800 Hz", "It has no measurable resonance"], answer: 0, explain: "Archaeoacoustic studies found the corridor tuned to approximately 8 Hz." },
    ],
    journalPrompts: [
      "If your own home or working space were oriented like a temple, what direction would you want your altar or desk to face, and why?",
      "The Duat's gates are described as transformation. Is there a threshold in your own life right now that might be better understood as a gate to pass through rather than an obstacle?",
    ],
  },
  {
    slug: "the-neteru",
    n: "III",
    title: "The Neteru: Gods, Family, and Cosmic Order",
    subtitle: "Living, contactable powers, not abstractions",
    intro:
      "It is not possible to practise Egyptian magick without working with the Neteru, the divine powers we translate, somewhat inadequately, as \"gods.\" They are not abstract principles. They are living, contactable intelligences who respond to invocation and interact with those who approach with proper knowledge and respect.",
    sections: [
      {
        heading: "Multiple Forms, One Being",
        body: "Each Neter could manifest in human, animal, and hybrid theriomorphic forms, facets of the same underlying intelligence rather than contradictions. Sekhmet as a lioness-headed woman expresses fierce solar power; the same goddess invoked as Hathor expresses her gentler, healing aspect. The forms are different doors into the same room.",
      },
      {
        heading: "The Great Ennead of Heliopolis",
        body: "The most widely venerated family of gods begins with Atum, the self-created one, who produced Shu (air) and Tefnut (moisture) from himself. Shu and Tefnut in turn produced Geb (earth) and Nuit (sky), parents whose love was so complete that Shu had to be placed between them to make room for the world. Their four children, Osiris, Isis, Set, and Nephthys, enact the drama of death, resurrection, betrayal, and magical power that runs through the entire tradition. Horus the Elder completes the family as the eternal principle of kingship.",
      },
      {
        heading: "Other Groupings: Ogdoad, Memphis Triad, Sons of Horus",
        body: "At Hermopolis, the Ogdoad names eight primordial powers who existed before creation, four male-female pairs representing the qualities of Nun's primordial chaos: the waters (Nu and Naunet), infinite space (Hehu and Hehut), darkness (Kekui and Kekuet), and stillness (Qerh and Qehet). At Memphis, the triad of Ptah, Sekhmet, and their son Nefertem gave the entire land its Greek name, Aegyptos, from Hwt-ka-Ptah. And guarding the four cardinal directions, the Sons of Horus, Imsety (South, Fire), Hapi (North, Earth), Duamutef (East, Air), and Qebehsenuef (West, Water), are called upon at the opening of the quarters in temple ritual.",
      },
    ],
    widget: "eight-fold-soul",
    practice: {
      intro: "Call the four Sons of Horus as living watchtowers around you, then return to the still point at the centre.",
      closingLine: "You are held at the centre of all four watchtowers, East, South, West, and North all standing guard.",
      steps: [
        { title: "Settle", detail: "Sit quietly. Let your breath find its own rhythm.", seconds: 30, phase: "Prepare", visual: "breath" },
        { title: "Open the East, Duamutef", detail: "Face East. Sense sharp perception and the rising power of a new day.", seconds: 40, phase: "Invoke", visual: "compass" },
        { title: "Open the South, Imsety", detail: "Turn to face South. Sense warmth, feeling, the fierce heat of the southern sun.", seconds: 40, phase: "Working", visual: "flame" },
        { title: "Open the West, Qebehsenuef", detail: "Turn to face West. Sense depth, endings, oceanic consciousness.", seconds: 40, phase: "Working", visual: "water" },
        { title: "Open the North, Hapi", detail: "Turn to face North. Sense stability, groundedness, the enduring and eternal.", seconds: 40, phase: "Working", visual: "glyph" },
        { title: "Return to centre", detail: "Face your original direction. Feel yourself held at the centre of all four watchtowers.", seconds: 30, phase: "Integrate", visual: "star" },
      ],
    },
    quiz: [
      { q: "Why isn't it a contradiction for Sekhmet to also be invoked as Hathor?", options: ["They are unrelated goddesses who share a name", "Multiple forms express different facets of the same divine intelligence", "Hathor replaced Sekhmet in later periods", "It is considered a scribal error in the texts"], answer: 1, explain: "The Neteru's human, animal, and hybrid forms were understood to express different aspects of one being." },
      { q: "Who are the parents of Osiris, Isis, Set, and Nephthys in the Great Ennead?", options: ["Atum and Nuit", "Shu and Tefnut", "Geb and Nuit", "Ptah and Sekhmet"], answer: 2, explain: "Geb (earth) and Nuit (sky) are the great parents whose four children enact the central drama of the Ennead." },
      { q: "The Ogdoad of Hermopolis consists of how many primordial powers?", options: ["Four", "Eight", "Nine", "Forty-two"], answer: 1, explain: "Eight powers in four male-female pairs, representing the qualities of the primordial chaos of Nun." },
      { q: "Which Son of Horus guards the East and the element of Air?", options: ["Imsety", "Hapi", "Duamutef", "Qebehsenuef"], answer: 2, explain: "Duamutef, jackal-headed, guards the East and Air, bringing sharp perception and the rising power of the new day." },
    ],
    journalPrompts: [
      "Which Neter, from what you've read so far, do you feel most drawn to work with, and what in you is that pull actually about?",
      "The four Sons of Horus each carry a direction and an element. Which direction's quality (East/Air, South/Fire, West/Water, North/Earth) do you most need more of in your life right now?",
    ],
  },
  {
    slug: "eight-fold-soul-and-symbols",
    n: "IV",
    title: "The Eight-Fold Soul & Sacred Correspondences",
    subtitle: "The layered self, and the vocabulary of number, colour, and symbol",
    intro:
      "One of the most sophisticated aspects of Egyptian magical philosophy is its understanding of the human being as a multi-layered composite, each layer with its own nature and destiny. Alongside this anatomy sits a precise vocabulary of number, colour, and symbol, the working language every ritual in this course draws on.",
    sections: [
      {
        heading: "The Eight-Fold Soul",
        body: "KAT is the physical body, cared for even after death because the other components need it as an anchor. KA is the vital double, the energetic twin, fed by offerings and used in magical work as the vehicle for projecting and receiving subtle energy. BA is the personality soul, depicted as a human-headed bird, the capacity for movement and individual consciousness. AB is the heart, the seat of moral consciousness, weighed against Ma'at's feather. SEKHEM is raw life force, equivalent to prana or chi. AKHU, the \"Effective One,\" is the immortal luminous spirit created through the successful integration of BA and KA, the fully transformed soul that moves freely between worlds.",
      },
      {
        heading: "Sacred Numbers and the 42 Confessions",
        body: "Every number carried magical weight: One is Atum before creation; Two is the division of unity into opposites; Four is the cardinal directions and the Sons of Horus; Seven recurs throughout Osiris's mythology; Forty-two is the number of Assessors in the Hall of Two Truths, before whom the soul made the 42 Negative Confessions, active magical assertions of innocence, not passive claims, that shaped the soul's post-mortem reality. Read as a practitioner, the confessions function as an examination of conscience and a template for a magical life lived in alignment with Ma'at.",
      },
      {
        heading: "Sacred Colours and Symbols",
        body: "Colour was never decorative: Black (Khem) is fertile Nile silt and resurrection; Blue (Irtyu) is the transcendent heavens and rebirth; Green (Wadj) is life and vegetation; Red (Desher) is chaos and fierce protective power; White (Hedj) is ritual purity; Gold (Nebu) is the incorruptible flesh of the gods. Four symbols anchor most practical work: the Ankh, the key of life; the Djed Pillar, the spine of Osiris and axis of stability; the Uraeus, the rearing cobra of awakened power at the brow; and the Utchat, the Eye of Horus, for healing and protection.",
      },
    ],
    widget: "eight-fold-soul",
    practice: {
      intro: "A journey down through all eight layers of the soul, from the physical body to the fully integrated luminous spirit.",
      closingLine: "BA and KA rest woven together as AKHU, one unified, luminous being.",
      steps: [
        { title: "KAT, the body", detail: "Feel the weight and shape of your physical body in the chair or on the ground. This is the anchor everything else rests on.", seconds: 40, phase: "Prepare", visual: "breath" },
        { title: "KA, the vital double", detail: "Sense a subtle duplicate of your body, slightly outside your skin, made of the same living energy.", seconds: 40, phase: "Invoke", visual: "spiral" },
        { title: "BA, the personality", detail: "Feel your individual personality, your particular way of moving through the world, as something that could travel independently.", seconds: 40, phase: "Working", visual: "star" },
        { title: "AB, the heart", detail: "Bring attention to your heart centre. Ask it honestly: what is true right now?", seconds: 40, phase: "Working", visual: "heart" },
        { title: "SEKHEM, life force", detail: "Feel raw vital energy moving through your limbs, independent of thought.", seconds: 40, phase: "Working", visual: "flame" },
        { title: "AKHU, the luminous spirit", detail: "Imagine BA and KA weaving together into one shining, unified light. Rest in that integration.", seconds: 50, phase: "Integrate", visual: "light" },
      ],
    },
    quiz: [
      { q: "Which soul-component is depicted as a human-headed bird capable of travel?", options: ["KAT", "KA", "BA", "SEKHEM"], answer: 2, explain: "The BA is the personality soul, shown as a human-headed bird, the aspect capable of independent movement." },
      { q: "What is created through the successful integration of the BA and KA?", options: ["AB", "SEKHEM", "AKHU", "KAT"], answer: 2, explain: "The AKHU, or \"Effective One,\" is the immortal luminous spirit formed by the union of BA and KA." },
      { q: "The 42 Negative Confessions were spoken before whom?", options: ["The 42 Assessors in the Hall of Two Truths", "Thoth alone", "The living pharaoh", "The Ogdoad"], answer: 0, explain: "Each confession was addressed to one of the 42 divine Assessors of the Hall of Two Truths." },
      { q: "Which colour is associated with fertile Nile silt, the preserved mummy, and resurrection?", options: ["Red, Desher", "Black, Khem", "Blue, Irtyu", "Gold, Nebu"], answer: 1, explain: "Black (Khem), the word Egypt itself derives from, signifies the fertile black earth and the power of resurrection." },
    ],
    journalPrompts: [
      "Of the eight soul-components, which one do you feel most in touch with day to day, and which feels most neglected?",
      "Choose one of the 42 Negative Confessions (even a modernised version, like \"I have not caused fear\") and sit with it honestly for a moment. Where does it land?",
    ],
  },
  {
    slug: "isis",
    n: "V",
    title: "Isis: Mistress of Magic",
    subtitle: "The Throne, the star Sothis, and the supreme magical authority",
    intro:
      "Isis, Aset, the Throne, does not merely sit upon the throne of power; she is the throne. Kingship itself is legitimised through her. Beyond her roles as protective mother and loyal wife, she is above all the Mistress of Magic, the supreme magical authority in the entire tradition.",
    sections: [
      {
        heading: "The Throne and the Star",
        body: "Isis was depicted as a beautiful woman wearing a throne headdress, frequently with great wings spread wide to shelter the dead and the vulnerable. She became strongly associated with the Moon in the New Kingdom, but her earlier and deeper stellar association is with Sothis, the star Sirius, whose heliacal rising announced the annual Nile flood and the Egyptian new year. This links her to cyclic renewal and the life-giving flood that made the black earth fertile.",
      },
      {
        heading: "How She Earned Her Title",
        body: "According to myth, Isis obtained her supreme magical authority by tricking Re into revealing his secret true name to her. In the Egyptian understanding, to know a being's true name is to hold power over that being. By learning Re's name, Isis obtained power over the sun itself, which is why her invocations and healing formulae carry such particular force in the tradition.",
      },
      {
        heading: "Spells of Healing and Restoration",
        body: "Her magical literature spans from the Old Kingdom Pyramid Texts to the Greek Magical Papyri of the late antique period, and her spells most often address healing, protection, and restoration, reflecting her mythological role reassembling and restoring Osiris after his murder. A spell against poison invokes her directly: \"It is Isis who makes fall the poison upon the Earth. Ra lives and the poison dies.\" Such spells can be applied to any form of toxic influence, literal, emotional, or otherwise, with the understanding that even the most destructive force is divine energy in the wrong relationship, to be redirected rather than simply destroyed.",
      },
    ],
    practice: {
      intro: "An invocation to Isis, Mistress of Magic, for healing directed at yourself or another.",
      closingLine: "The temple closes gently around you. Isis's healing continues quietly beneath the surface.",
      steps: [
        { title: "Open the temple", detail: "Settle your space. Cleanse it mentally. Imagine light moving through the room, corner to corner.", seconds: 45, phase: "Prepare", visual: "light" },
        { title: "Invoke Isis", detail: "Arms raised, say inwardly or aloud: \"Oh Isis, daughter of Nuit, Mistress of Magic, Star of oceans deep. You are the healer of souls, eternal mother to the children of the Earth.\"", seconds: 60, phase: "Invoke", visual: "star" },
        { title: "Chant", detail: "Repeat quietly, several times: \"Hekau, Hekau, Hail Isis.\"", seconds: 60, phase: "Working", visual: "glyph" },
        { title: "Direct a healing intention", detail: "Bring to mind anyone (including yourself) who needs healing. Hold the intention simply, without forcing.", seconds: 60, phase: "Working", visual: "heart" },
        { title: "Thank and close", detail: "Thank Isis. Let your arms lower. Feel the temple close gently around you.", seconds: 30, phase: "Close", visual: "seal" },
      ],
    },
    quiz: [
      { q: "What does the name \"Isis\" (Aset) actually mean?", options: ["Moon", "The Throne", "Great Mother", "Star of the Sea"], answer: 1, explain: "Isis means \"The Throne\", she does not merely sit on the throne of power, she is the throne, legitimising kingship itself." },
      { q: "How did Isis obtain her supreme magical authority according to myth?", options: ["She was born with it", "She defeated Set in single combat", "She tricked Re into revealing his secret true name", "Osiris granted it to her upon their marriage"], answer: 2, explain: "Knowledge of a being's true name gave power over that being, Isis obtained power over the sun itself by learning Re's name." },
      { q: "Which star is most strongly associated with Isis in her earlier mythology?", options: ["Polaris", "Sirius (Sothis)", "The Pole Star Thuban", "Betelgeuse"], answer: 1, explain: "Isis's identification with Sothis (Sirius) connects her to the Nile flood and the Egyptian new year." },
    ],
    journalPrompts: [
      "Isis's spell against poison reframes even destructive force as \"divine energy in a wrong relationship.\" Is there something in your own life that might be better redirected than fought outright?",
      "What would it mean, practically, to spend three months in a working relationship with Isis specifically, the way the tradition recommends depth with one deity over superficiality with many?",
    ],
  },
  {
    slug: "anubis-and-osiris",
    n: "VI",
    title: "Anubis and Osiris: Guardians of the Threshold",
    subtitle: "The jackal lord of the dead, and the risen lord of resurrection",
    intro:
      "Anubis opens and seals the sacred space; Osiris presides over what happens once the soul is inside it. Together they hold the threshold between the living world and the world of judgment and transformation.",
    sections: [
      {
        heading: "Anubis, Master of Secrets",
        body: "Depicted as a jackal-headed man or a reclining black jackal, Anubis's black colouring links him to the fertile black silt of the Nile flood, to the colour of the preserved mummy, and therefore to resurrection. As Lord of Embalming, he guided each soul through the initial stages of the Duat to the Hall of Two Truths. His titles, Hery Seshta, Master of Secrets, and Wer-Hekau, Mighty One of Magic, describe his working role: he is invoked at the opening and closing of every temple working, the Walker between Worlds who can hold and seal sacred space against intrusion.",
      },
      {
        heading: "Osiris, Lord of the Resurrection",
        body: "Originally a vegetation god who gave humanity corn, wine, and the arts of cultivation, Osiris was transformed by his murder at Set's hands into the Lord of the Underworld. His body was cut into fourteen parts, two sevens, and there are forty-two gates in the underworld, six sevens, each requiring its own declaration of innocence. He is depicted mummified, bound, carrying the crook and flail, his skin black for the Nile silt or green for the vegetation that follows the flood. The Osiris position used in modern magical practice, arms crossed over the chest, carries this entire mythological weight of loss, judgment, and resurrection in a single gesture.",
      },
      {
        heading: "The Ceremony of Purification",
        body: "Before any significant magical work, purification clears and realigns the subtle bodies, KA, BA, and SEKHEM, so they are fit vessels for the energies being invoked. The traditional ceremony moves through five stages: preparing natron-mirroring waters, facing East and drawing a protective circle, washing while invoking Osiris to take what is unclean, visualising Thoth carrying a shadow-self to the Underworld while taking a fourfold breath, and finally invoking Re to breathe purifying light into every part of the being.",
      },
    ],
    widget: "duat-gates",
    practice: {
      intro: "The traditional Ceremony of Purification, realigning KA, BA, and SEKHEM before significant work.",
      closingLine: "By this light, your light is purified. You are a clean vessel, ready for what comes next.",
      steps: [
        { title: "Prepare the waters", detail: "Dissolve a pinch of bicarbonate of soda in a bowl of clean water, echoing the sacred natron of Egyptian purification.", seconds: 30, phase: "Prepare", visual: "water" },
        { title: "Face East and draw the circle", detail: "Face East. Walk five paces forward in your mind's eye and trace a circle of protection around your space, moving clockwise, four times.", seconds: 45, phase: "Invoke", visual: "compass" },
        { title: "Wash and invoke Osiris", detail: "Touch the water to your hands or face. Say inwardly: \"Oh Great and Mighty Ausar, take from me all that is unclean.\"", seconds: 45, phase: "Working", visual: "water" },
        { title: "Visualise Thoth and breathe fourfold", detail: "See Thoth carry a shadow of yourself to Osiris in the Underworld. Breathe in for 4, hold for 4, out for 4, hold for 4, four full rounds.", seconds: 80, phase: "Working", visual: "breath" },
        { title: "Receive the light of Re", detail: "Imagine a ray of sunlight entering your crown and filling your whole body. Say inwardly: \"By this light my light is purified.\"", seconds: 60, phase: "Integrate", visual: "light" },
      ],
    },
    quiz: [
      { q: "What do Anubis's titles Hery Seshta and Wer-Hekau mean?", options: ["Lord of the Dead and King of Jackals", "Master of Secrets and Mighty One of Magic", "Guardian of Bones and Keeper of Tombs", "First Embalmer and Second Judge"], answer: 1, explain: "These titles describe his working role, the one who guards magical knowledge and holds power to open and seal sacred space." },
      { q: "Into how many parts was Osiris's body cut by Set?", options: ["Seven", "Fourteen", "Forty-two", "Nine"], answer: 1, explain: "Fourteen parts, two sevens, reflecting the sacred number seven that recurs throughout his mythology." },
      { q: "What does the 'Osiris position' (arms crossed over the chest) represent in modern magical practice?", options: ["Simple relaxation", "The full mythological weight of loss, judgment, and resurrection in one gesture", "A sign of surrender only", "A purely aesthetic pose with no meaning"], answer: 1, explain: "The crossed-arm position carries Osiris's entire story, death, judgment, and eventual resurrection, condensed into a single physical gesture." },
      { q: "In the Ceremony of Purification, which deity is visualised carrying a shadow of the practitioner to the Underworld?", options: ["Anubis", "Ra", "Thoth", "Sekhmet"], answer: 2, explain: "Thoth is visualised taking a shadow-self to Osiris, immediately followed by a fourfold breath." },
    ],
    journalPrompts: [
      "Anubis is described as the one who holds and seals sacred space. Where in your life do you need better boundaries, a stronger sense of what's let in and what isn't?",
      "Osiris's transformation from a god of growth into a judge of the dead came through genuine loss. What has a real loss in your own life ultimately transformed you into?",
    ],
  },
  {
    slug: "sekhmet-and-thoth",
    n: "VII",
    title: "Sekhmet and Thoth: Fire and Wisdom",
    subtitle: "The fierce healer, and the god of magic, writing, and the moon",
    intro:
      "Sekhmet and Thoth represent two poles of magical power that every practitioner eventually needs: raw transformative fire, and precise, patient wisdom. Neither works well without the other.",
    sections: [
      {
        heading: "Sekhmet, Lady of the Flame",
        body: "Her name means \"The Powerful Female\", the personification of the fierce, consuming heat of the midday sun, depicted as a lioness-headed woman with a solar disk and uraeus crown. Sent by Re to punish humanity, she nearly destroyed all human life until the gods flooded the fields with red-dyed beer she mistook for blood, drank, and fell into a drunken sleep. This story captures her dual nature: simultaneously the most dangerous and the most healing of the goddesses. Her priests were among Egypt's most noted healers, and the Seven Arrows she could hurl to bring disease could equally be turned to ward off attack. She is closely linked to Hathor as a complementary, gentler aspect of the same feminine power.",
      },
      {
        heading: "Thoth, God of Magic, Writing, and the Moon",
        body: "Djehuty, meaning Leader, gave humanity beer, bread, writing, and the sacred arts of magic and medicine. Depicted as an ibis-headed man or sometimes a baboon, he was patron of scribes and noted above all for truth and integrity: \"straight and true like Thoth\" described absolute reliability. He is the divine recorder in the Hall of Two Truths, writing the verdict of the heart-weighing, intimately involved in every soul's journey. In some tellings it is Thoth, not Ptah, who creates the universe by speaking, an expression of Hu, the creative word. The entire Hermetic tradition, which shaped all of Western esotericism, claims Thoth as its ultimate source in the form of Hermes Trismegistus.",
      },
      {
        heading: "Working with Both",
        body: "The mantra SA SEKHEM SAHU, drawn from Robert Masters' psychospiritual work with Sekhmet, is chanted seven times to open a healing session and seven times again at its close, a wave of fierce warmth and clarity is the traditional sign her presence has arrived. Thoth, by contrast, is approached through the pathworking: an inner journey to the legendary Hall of Records said to lie beneath the Sphinx, maintained by Thoth as a repository of ancient wisdom. Whether this library is literal or imaginal, the tradition holds that the journey to it is a genuine initiation in its own right.",
      },
    ],
    practice: {
      intro: "A pathworking to the legendary Hall of Records beneath the Sphinx, guided by Thoth.",
      closingLine: "Whatever you received is worth keeping. Write it down before the outer day claims it back.",
      steps: [
        { title: "Prepare", detail: "Relax, set your intention, and hold the image of Thoth, ibis-headed, holding a reed pen, in your mind's eye.", seconds: 30, phase: "Prepare", visual: "glyph" },
        { title: "Seven breaths", detail: "Take seven slow breaths, each a little longer and deeper than the last.", seconds: 60, phase: "Invoke", visual: "breath" },
        { title: "Approach the Sphinx", detail: "See yourself on the Giza plateau at night, stars overhead. Walk toward the Sphinx. Ask Thoth inwardly to guide you to the Hall of Records.", seconds: 60, phase: "Working", visual: "gate" },
        { title: "Descend", detail: "If passage is granted, a doorway opens between the paws. Descend into a vast library of glowing scrolls. Spend a few quiet moments receiving whatever comes.", seconds: 90, phase: "Working", visual: "spiral" },
        { title: "Return and journal", detail: "Rise back the way you came. Return fully to your body and the room. Write down immediately whatever you remember, without editing.", seconds: 30, phase: "Integrate", visual: "glyph" },
      ],
    },
    quiz: [
      { q: "What stopped Sekhmet's near-destruction of humanity, according to myth?", options: ["Ra commanded her to stop directly", "The gods flooded the fields with red-dyed beer she mistook for blood", "Thoth intervened with a spell", "She was defeated in battle by Horus"], answer: 1, explain: "She drank the beer, believing it blood, and fell into a drunken sleep, ending the slaughter." },
      { q: "What does Thoth's Egyptian name Djehuty mean?", options: ["Wisdom", "Leader", "Scribe", "Moon-Father"], answer: 1, explain: "Djehuty is usually translated as 'Leader.'" },
      { q: "Which Western esoteric tradition claims Thoth as its ultimate source, as Hermes Trismegistus?", options: ["Kabbalah", "The Hermetic tradition", "Alchemy alone", "Tarot"], answer: 1, explain: "The Hermetic tradition, which shaped all of Western esotericism, claims Thoth as Hermes Trismegistus, 'Thrice-Great Hermes.'" },
      { q: "How many times is the mantra SA SEKHEM SAHU traditionally chanted to open a healing session?", options: ["Three", "Five", "Seven", "Forty-two"], answer: 2, explain: "Seven times to open, and seven times again at the close of the working." },
    ],
    journalPrompts: [
      "Where in your life could you use more of Sekhmet's fierce, transformative fire, and where might that same fire, unchecked, actually cause harm?",
      "If you could ask Thoth one question in the Hall of Records, what would it be?",
    ],
  },
  {
    slug: "djed-pillar",
    n: "VIII",
    title: "The Djed Pillar: Raising the Inner Column",
    subtitle: "Stability, the spine of Osiris, and a practical energy-body technique",
    intro:
      "The Djed is the hieroglyph for stability, understood as the spine of Osiris himself, the axis mundi uniting earth and sky. Raising the Djed pillar in ritual re-enacts Osiris's resurrection and activates the body's own energy centres in a distinctly Egyptian technique.",
    sections: [
      {
        heading: "The Symbol",
        body: "Originally perhaps a pillar of bound corn sheaves, the Djed came to represent Osiris's spine, the axis around which the whole body of magical work stands or falls. It is almost always shown alongside the Ankh (life) and the Was sceptre (dominion): together, the three symbols summarise the entire promise of the tradition, a stable, living channel through which divine authority can flow.",
      },
      {
        heading: "Names That Open and Names That Seal",
        body: "The Djed Pillar Empowerment activates six energy centres along the spine, each governed by a pair of divine names: one name that vibrates the centre open, and a second, confirming name that seals and stabilises what has opened. This mirrors a principle found across many energy-body traditions, that opening without sealing leaves a structure unstable, and that the discipline of closing what you open is not optional.",
      },
      {
        heading: "Working Slowly",
        body: "The tradition is explicit that this working rewards patience: spend several minutes at each centre before moving to the next, rather than rushing the sequence. The final stage, grounding the base centre and then breathing green light up through all centres to the crown, repeated ten times, is the moment the Djed is fully \"raised,\" mirroring Osiris's own resurrection from stillness into upright, living power.",
      },
    ],
    practice: {
      intro: "The Djed Pillar Empowerment, six energy centres, each opened by one name and sealed by another. Work slowly.",
      closingLine: "RISE. Your own spine stands raised, a stable, living channel, the way Osiris rose before you.",
      steps: [
        { title: "Crown, PEREMU / AHA-SEKHET", detail: "See a closed white lotus above your head. Silently repeat PEREMU until it opens and spins. Then repeat AHA-SEKHET to seal it.", seconds: 90, phase: "Invoke", visual: "spine", center: "crown" },
        { title: "Third Eye, METRUI / TERI-ASI", detail: "Same process at the third eye: METRUI to open, TERI-ASI to seal.", seconds: 90, phase: "Working", visual: "spine", center: "third-eye" },
        { title: "Back of Head, MATHENU / PAN-ARI", detail: "Same process at the base of the skull: MATHENU to open, PAN-ARI to seal.", seconds: 90, phase: "Working", visual: "spine", center: "skull" },
        { title: "Throat, MENU / HEQ NETERU F", detail: "Activate the throat with MENU, then seal with HEQ NETERU F.", seconds: 60, phase: "Working", visual: "spine", center: "throat" },
        { title: "Heart, NEB ER TCHER / NEB AATTI", detail: "Open the heart with NEB ER TCHER, confirm with NEB AATTI.", seconds: 60, phase: "Working", visual: "spine", center: "heart" },
        { title: "Base and Rise", detail: "Ground and seal the base with HETEP TA / SEKHTI. Then say \"RISE!\" and breathe green light up through every centre to the crown, ten times.", seconds: 120, phase: "Integrate", visual: "spine", center: "base" },
      ],
    },
    quiz: [
      { q: "What does the Djed Pillar represent in Egyptian symbolism?", options: ["The rays of the sun", "The spine of Osiris and the axis mundi", "A ceremonial weapon", "The boundary of a temple"], answer: 1, explain: "The Djed represents stability and is understood as the spine of Osiris, uniting earth and sky." },
      { q: "In the Djed Pillar Empowerment, what is the purpose of the second, 'confirming' name at each centre?", options: ["It has no real function, purely traditional", "It seals and stabilises the centre after it opens", "It cancels the first name's effect", "It is only used at the final centre"], answer: 1, explain: "Each centre uses one name to open and a second to seal, opening without sealing is considered incomplete and unstable." },
      { q: "Which two symbols is the Djed most often depicted alongside?", options: ["The Was sceptre and the Ankh", "The Uraeus and the Utchat", "The sistrum and the naos", "The scarab and the feather"], answer: 0, explain: "Ankh (life), Djed (stability), and Was (dominion) together summarise the tradition's core promise." },
    ],
    journalPrompts: [
      "Where in your life have you opened something, a project, a relationship, an emotional process, without ever properly sealing or closing it?",
      "What would it feel like, physically, to have your own 'spine', your sense of stable, upright authority, fully raised the way the Djed Pillar is raised?",
    ],
  },
  {
    slug: "the-living-stream",
    n: "IX",
    title: "The Living Stream",
    subtitle: "Closing the course, and where to go from here",
    intro:
      "The tradition of Egyptian magick has flowed continuously for more than five thousand years, absorbing Greek and Roman influence without losing its essential character, feeding into the Hermetic current that shaped all of Western esotericism. It is available to anyone willing to approach it with both scholarly seriousness and genuine engagement.",
    sections: [
      {
        heading: "Not Personal Power Alone",
        body: "Every ritual performed with correct knowledge and genuine intent was understood to add its power to the maintenance of Ma'at, the cosmic order that keeps the universe from sliding back into the chaos of Nun. This is the Egyptian magician's ultimate motivation: not personal power in isolation, but the contribution of individual work to the health and beauty of the whole.",
      },
      {
        heading: "Four Ways to Continue",
        body: "Build your cosmological foundation, return to the Four Worlds, the Neteru groupings, and the soul anatomy until they are genuinely familiar; a magician who doesn't know the map is navigating blind. Establish a regular purification practice; over time, what takes thirty minutes at first may take five minutes later. Develop a working relationship with one deity for at least three months rather than spreading thin across many, depth with one is more valuable than superficiality with several. And orient and align your working space physically, however modest, toward true cardinal directions, because physical alignment amplifies everything else you do.",
      },
      {
        heading: "The Closing Words",
        body: "\"I am Nu. I draw air, sustenance and light from the holy Presence, from He who traverses the World in his fiery barge. From the utmost limits of Heaven, to the Depths of Geb below, to the outer limits of Our Lady of the Stars, may the Purity of the Breath of Ra find place within me.\" Go well in your work. May Heka be with you, may Ma'at guide you, and may the light of Ra illuminate every chamber of your being.",
      },
    ],
    practice: {
      intro: "A closing working for the whole course, recall the journey, and choose one thing to actually keep doing.",
      closingLine: "May Heka be with you, may Ma'at guide you, and may the light of Ra illuminate every chamber of your being.",
      steps: [
        { title: "Sit quietly", detail: "No preparation needed. Just arrive.", seconds: 20, phase: "Prepare", visual: "breath" },
        { title: "Breathe in light", detail: "Imagine a ray of light entering through the crown of your head, filling your whole body slowly from crown to feet.", seconds: 60, phase: "Invoke", visual: "light" },
        { title: "Recall the whole journey", detail: "Let images from this entire course pass through your mind without dwelling on any one, Heka, the Duat, the Neteru, Isis, the Djed rising.", seconds: 60, phase: "Working", visual: "star" },
        { title: "Set one commitment", detail: "Choose one single practice from this course you will actually return to in the next week. Just one.", seconds: 45, phase: "Integrate", visual: "glyph" },
        { title: "Close", detail: "Speak or think: \"May Heka be with me, may Ma'at guide me.\" Let the working close naturally.", seconds: 20, phase: "Close", visual: "seal" },
      ],
    },
    quiz: [
      { q: "According to the closing teaching, what is the Egyptian magician's ultimate motivation?", options: ["Personal power above all else", "Contributing to the maintenance of Ma'at and the health of the whole", "Wealth and social status", "Fame among other practitioners"], answer: 1, explain: "Every correctly performed ritual was understood to add its power to maintaining cosmic order." },
      { q: "How long does the tradition recommend working with one deity before moving to another?", options: ["One week", "One month", "At least three months", "There is no recommended timeframe"], answer: 2, explain: "The text specifically recommends at least three months of exclusive work, depth with one over superficiality with many." },
      { q: "Which major Western esoteric current did Egyptian magick feed into, shaping alchemy, astrology, and ceremonial magic?", options: ["The Hermetic tradition", "Theosophy", "Wicca", "Rosicrucianism exclusively"], answer: 0, explain: "The Hermetic tradition, sourced to Thoth as Hermes Trismegistus, shaped all of subsequent Western esotericism." },
    ],
    journalPrompts: [
      "Of everything in this course, which single practice do you actually intend to keep doing a month from now, and what would make that realistic?",
      "Looking back over the whole course, what has shifted in how you think about magick, ritual, or the relationship between the sacred and the practical?",
    ],
  },
];
