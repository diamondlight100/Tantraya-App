export type TantraChapter = {
  slug: string;
  n: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  widget?:
    | "core-principles"
    | "timeline"
    | "path-compass"
    | "practice-arc"
    | "om-visualizer"
    | "kosha-pyramid"
    | "chakra-explorer"
    | "dakini-gallery"
    | "sound-circuits"
    | "digital-mala"
    | "matrika-chant"
    | "kara-nyasa";
  practice?: { steps: { title: string; detail: string; seconds?: number }[] };
  quiz: { q: string; options: string[]; answer: number; explain: string }[];
  journalPrompts: string[];
};

export const tantraChapters: TantraChapter[] = [
  {
    slug: "what-is-tantra",
    n: "I",
    title: "What Is Tantra?",
    subtitle: "Definition, misconception, and the five core principles",
    intro:
      "Tantra means 'to expand', from the root tan, and 'instrument' or 'loom', the suffix -tra. It is literally a tool for weaving body, energy, mind, and cosmos into one fabric. Before anything else, it helps to clear the ground of what Tantra is not.",
    sections: [
      {
        heading: "A vast, woven constellation",
        body: "Tantra is not one unified school but a vast constellation of traditions, rituals, philosophies, and techniques aimed at expanding consciousness and recognising the interconnectedness of all things. Each lineage carries its own texts, teachers, and methods, but nearly all of them share this instinct: liberation is reached by working directly with the body, the senses, and the world as they actually are, rather than by renouncing or transcending them.",
      },
      {
        heading: "Clearing the misconception",
        body: "In the popular imagination Tantra is reduced to sexual practice. Some left-hand path lineages do use physical intimacy as a vehicle, but this is a small corner of a much larger territory. At its core, Tantra treats the whole of existence, body, breath, sound, relationship, land, as sacred ground for practice.",
      },
      {
        heading: "Five pillars",
        body: "Non-duality (matter and spirit are two faces of one reality), Shakti (divine feminine energy as the animating force of the cosmos), Interdependence (nothing exists in isolation), Sacred Embodiment (the body as the very vehicle of awakening), and Sound & Energy (mantra and vibration as primary instruments of transformation). Together these five pillars form a worldview that is radically inclusive.",
      },
    ],
    widget: "core-principles",
    quiz: [
      {
        q: "What does the Sanskrit root of 'Tantra' literally mean?",
        options: ["To renounce", "To expand or weave", "To purify", "To ascend"],
        answer: 1,
        explain: "Tan (to expand/weave) + -tra (instrument), Tantra is an instrument for weaving consciousness.",
      },
      {
        q: "Which best describes the popular misconception about Tantra?",
        options: [
          "That it is exclusively sexual practice",
          "That it is only found in Nepal",
          "That it has no written texts",
          "That it requires no teacher",
        ],
        answer: 0,
        explain: "Sexual ritual belongs to a small subset of left-hand path traditions, a minority within Tantra as a whole.",
      },
      {
        q: "Which of the five core principles concerns the body?",
        options: ["Non-Duality", "Interdependence", "Sacred Embodiment", "Sound and Energy"],
        answer: 2,
        explain: "Sacred Embodiment holds that the body itself is the vehicle for awakening, worked with directly rather than transcended.",
      },
    ],
    journalPrompts: [
      "Where did your own picture of 'what Tantra is' come from, before today?",
      "Which of the five pillars is already active in your teaching or your own daily practice?",
      "What would it mean to treat one ordinary task today as sacred ground?",
    ],
  },

  {
    slug: "timeline-of-tantra",
    n: "II",
    title: "The Timeline of Tantra",
    subtitle: "From Paleolithic goddess cultures to the medieval flourishing",
    intro:
      "The first surviving Tantric texts date to the 5th–7th centuries CE, but the roots reach far deeper, possibly into Paleolithic goddess worship and shamanic practice, tens of thousands of years before a single word was written down.",
    sections: [
      {
        heading: "Six eras",
        body: "Proto-Tantric oral tradition (c. 8000–3000 BCE) gives way to the Indus Valley Civilization (c. 3300–1300 BCE), then the Vedic period and the Rig Veda (c. 1500–500 BCE). Tantra emerges as a named, distinct tradition among followers of Śiva and Śakti around the 5th–7th century CE, spreads into Buddhist and Hindu monasteries and on into Nepal and Tibet by the 700s CE, and reaches a medieval flourishing in the 8th–11th centuries CE, the era of the Kubjikāmata Tantra.",
      },
      {
        heading: "The Dravidian question",
        body: "Harappa and Mohenjo-Daro existed at least a thousand years before the Indo-Aryans arrived. Some scholars trace Tantra's non-Vedic elements, shamanism, ancestor worship, the microcosm/macrocosm principle, to this older Dravidian substrate, later absorbed and transformed as Indo-Aryan and indigenous streams met.",
      },
      {
        heading: "Why the origins are hard to pin down",
        body: "Four honest obstacles face any historian here: few pre-classical texts survived; the tradition was intentionally oral for much of its life, so its oldest layers are simply invisible to textual history; it freely absorbed Vedic, Dravidian, Buddhist, and folk elements, resisting any single point of origin; and Brahmanical orthodoxy often treated it as heretical, shaping what was ever written down at all. Tantric concepts already appear inside the Rig Veda, suggesting a 'proto-Tantra' that may be ten thousand years old or more.",
      },
    ],
    widget: "timeline",
    quiz: [
      {
        q: "When do the first surviving named Tantric texts appear?",
        options: ["8000 BCE", "1500 BCE", "5th–7th century CE", "19th century CE"],
        answer: 2,
        explain: "Tantra emerges as a distinct, named tradition among Śiva/Śakti followers around the 5th–7th century CE.",
      },
      {
        q: "What is the 'Dravidian question' in Tantric history?",
        options: [
          "Whether Tantra has any texts at all",
          "Whether pre-Vedic Dravidian culture shaped core Tantric principles",
          "Whether Tantra spread to Tibet",
          "Whether the Vedas predate Tantra",
        ],
        answer: 1,
        explain: "It concerns whether Tantra's non-Vedic elements trace to the older Dravidian civilizations of the Indus Valley.",
      },
      {
        q: "Why is Tantra's true age so difficult to establish?",
        options: [
          "It has always been purely written",
          "It was preserved primarily through oral transmission",
          "No scholars have studied it",
          "It only began in the 20th century",
        ],
        answer: 1,
        explain: "Oral transmission means the oldest layers leave no textual trace, absence of early texts doesn't imply a late origin.",
      },
    ],
    journalPrompts: [
      "Does knowing Tantra may be far older than its written record change how you hold it?",
      "What in your own lineage of learning has been passed by voice rather than by book?",
      "Which era on the timeline are you most curious to learn more about?",
    ],
  },

  {
    slug: "scripture-and-cosmology",
    n: "III",
    title: "Scripture and Cosmology",
    subtitle: "Vedas to Tantras, and the formula Śiva + Śakti = Reality",
    intro:
      "Tantra didn't emerge in isolation. It grew from a long arc of Hindu scripture, and it offers its own distinct cosmology for how consciousness and energy give rise to the world we experience.",
    sections: [
      {
        heading: "The road of scripture",
        body: "The Vedas (oral hymns, c. 1500 BCE) gave rise to the Upanishads (philosophical treatises, c. 800–200 BCE), which internalised Vedic ritual into inquiry. The Puranas made spiritual truth accessible through story. The Agamas, Jñāna, Caryā, Kriyā, and Yoga, systematised ritual theology as revealed scripture (śruti), received by sages in meditation. The Tantras, from the 8th century CE, pushed all of this in a radical, experiential direction.",
      },
      {
        heading: "Seeds in the Upanishads",
        body: "Though primarily Vedantic, the Upanishads already contain early hints of what Tantra would later expand: Shakti, meditation, symbolism, Kundalini and the chakras, ritual, non-dualism, and Turiya, the 'Fourth' state of awareness beyond waking, dreaming, and deep sleep.",
      },
      {
        heading: "The core formula",
        body: "Tantric cosmology can be distilled into a single equation: Consciousness (Śiva) + Energy (Śakti) = Reality. Śiva is pure, unmanifest awareness, present everywhere but inactive without Śakti, the creative force that moves the universe. Nothing is inert; everything pulses with divine energy. The practitioner's own body is a microcosm of this cosmic interplay, which is precisely why embodied ritual, mantra, and sensation matter so much: working with the microcosm is working with the macrocosm. Matter itself is sacred, the very body of the Goddess, so liberation comes through the transformation of what is here.",
      },
    ],
    quiz: [
      {
        q: "Which scriptural layer are the Agamas considered?",
        options: ["Later commentary", "Revealed scripture (śruti)", "Folk tales only", "Post-Tantric additions"],
        answer: 1,
        explain: "The Agamas are considered śruti, communicated by the divine to sages in contemplative states.",
      },
      {
        q: "What is the Tantric cosmological formula?",
        options: [
          "Māyā + Brahman = Moksha",
          "Consciousness (Śiva) + Energy (Śakti) = Reality",
          "Prakriti − Purusha = Liberation",
          "Ātman = Turiya",
        ],
        answer: 1,
        explain: "Śiva (unmanifest consciousness) united with Śakti (dynamic energy) produces manifest reality.",
      },
      {
        q: "Why does Tantra treat the body as important to spiritual work?",
        options: [
          "It is considered an illusion to escape",
          "It is a microcosm mirroring the macrocosm",
          "It has no relevance to liberation",
          "Only the mind matters",
        ],
        answer: 1,
        explain: "Because the body mirrors cosmic reality, working with it directly is working with the whole cosmos.",
      },
    ],
    journalPrompts: [
      "Where in your day do you notice stillness (Śiva) and movement (Śakti) most clearly?",
      "What would change if you treated your body as sacred rather than as a tool?",
      "Which piece of scripture history surprised you most?",
    ],
  },

  {
    slug: "two-paths",
    n: "IV",
    title: "Two Paths, Many Schools",
    subtitle: "Dakshina Marga, Vama Marga, and the major lineages",
    intro:
      "Within Tantra runs a significant fork: the Dakshina Marga (Right-Hand Path) and the Vama Marga (Left-Hand Path). Neither is superior. They are different philosophical orientations toward the same liberation.",
    sections: [
      {
        heading: "Dakshina Marga, the Right-Hand Path",
        body: "Oriented toward spiritual purity and alignment with social and ritual norms. It favours pure substances, strict moral discipline, and meditative focus on benevolent deities. This is the more conservative, gradual road.",
      },
      {
        heading: "Vama Marga, the Left-Hand Path",
        body: "A radical defiance of ordinary norms, using substances and experiences conventionally considered 'impure', embracing heterodox views, ecstasy, and direct engagement with the transformative feminine divine. This is the swifter, more transgressive road, historically requiring careful guidance.",
      },
      {
        heading: "Lineages and living texts",
        body: "Two broad lineages run through the tradition: the Shaiva (paths associated with Śiva, meditation, energy work, unity with divine consciousness) and the Shakta (traditions honouring the Divine Feminine directly, empowerment and the nurturing, creative aspects of the cosmic mother). Texts are grouped by function: Mantra Tantras, Yantra Tantras, and Sādhana Tantras give method; Śākta and Śaiva Tantras give theology. Landmark works include the Mahānirvāṇa Tantra, the Kulārṇava Tantra, the Tantrasāra, and the Kāmākhya Tantra.",
      },
    ],
    widget: "path-compass",
    quiz: [
      {
        q: "What characterises the Dakshina Marga?",
        options: [
          "Radical defiance of norms",
          "Spiritual purity and alignment with convention",
          "Exclusive use of impure substances",
          "Rejection of all deities",
        ],
        answer: 1,
        explain: "The Right-Hand Path favours purity, moral discipline, and benevolent-deity meditation.",
      },
      {
        q: "Which lineage centres on the Divine Feminine directly?",
        options: ["Shaiva", "Shakta", "Vedantic", "Agamic"],
        answer: 1,
        explain: "The Shakta lineage honours Shakti, the Divine Feminine, as the central object of worship and empowerment.",
      },
      {
        q: "According to the text, which path is spiritually superior?",
        options: ["Dakshina Marga", "Vama Marga", "Neither, both are legitimate routes", "Whichever a teacher prefers"],
        answer: 2,
        explain: "The tradition holds that neither path is inherently superior; both are time-honoured routes to liberation.",
      },
    ],
    journalPrompts: [
      "Which path resonates more with your own understanding of spirituality, and why?",
      "Where in your life have you already used 'meeting it directly' as a transformation strategy?",
      "What guidance or boundaries would you want in place before exploring the Left-Hand Path?",
    ],
  },

  {
    slug: "kubjikamata-and-practice-arc",
    n: "V",
    title: "The Kubjikāmata Tantra & the Practice Arc",
    subtitle: "The source of the modern chakra system, and its three-part sequence",
    intro:
      "The Kubjikāmata Tantra is an 11th-century Sanskrit scroll, 'the teaching of the coiled Goddess Kubjikā', and it is the primary historical source for the chakra system as it's understood in the West today, first introduced by Arthur Avalon in the early twentieth century.",
    sections: [
      {
        heading: "A living scroll",
        body: "Many chakra systems circulated through the Tantric world, but the one codified in the Kubjikāmata Tantra became the standard after roughly the 11th century, and the Śrī Vidyā tradition largely originates from this text. It centres on the fierce goddess Kubjikā, 'the coiled one', embodying Shakti in union with Śiva, and provides the framework for Kaula Siddhi, the highest spiritual achievement.",
      },
      {
        heading: "The three-part arc",
        body: "Tantric practice generally moves through preparation, awakening, and divinization. Adhivāsa (preparatory practice) purifies the seat, invokes the deity, and aligns body and space through Nyāsa. The Ascent awakens the chakras as Kuṇḍalinī Śakti rises through the energy body from root to crown. The Descent divinises the body as grace and bliss return downward, sanctifying every layer of being. Union of Śiva and Śakti in the Sahasrāra brings the non-dual understanding that is Moksha.",
      },
      {
        heading: "Tantra beside Yoga",
        body: "Yoga and Tantra are close kin but differ in emphasis. Yoga aims at union of the individual self with universal consciousness, often through renunciation of worldly pleasure. Tantra aims at liberation through transformation of all aspects of existence, treating the material world as sacred and integrating rather than renouncing it. Where Yoga uses āsana, prāṇāyāma, and meditation, Tantra adds yantra, mandala, deity-invoking mantra, and ritual offering.",
      },
    ],
    widget: "practice-arc",
    quiz: [
      {
        q: "What is the Kubjikāmata Tantra historically significant for?",
        options: [
          "Being the newest Tantric text",
          "Being the primary source of the modern Western chakra system",
          "Rejecting the chakra system entirely",
          "Being written in the 20th century",
        ],
        answer: 1,
        explain: "It's the 11th-century source Arthur Avalon drew on when introducing the chakra system to the West.",
      },
      {
        q: "What are the three parts of the practice arc it teaches?",
        options: [
          "Breath, posture, mantra",
          "Preparation, Ascent, Descent",
          "Purity, ecstasy, silence",
          "Vedas, Puranas, Tantras",
        ],
        answer: 1,
        explain: "Adhivāsa (preparation), the Ascent of Kuṇḍalinī, and the Descent of grace and divinization.",
      },
      {
        q: "How does Tantra's view of the material world differ from classical Yoga's?",
        options: [
          "Tantra also renounces it",
          "Tantra treats it as sacred and integrates it",
          "Yoga treats it as sacred, Tantra rejects it",
          "There is no difference",
        ],
        answer: 1,
        explain: "Tantra treats matter as the body of the Goddess; Yoga tends toward detachment from prakriti.",
      },
    ],
    journalPrompts: [
      "What would a genuine 'preparation' phase look like before your own practice, beyond the chapters that teach it directly?",
      "Where does the language of 'ascent' and 'descent' show up already in how you think about your own energy, even before any formal Kuṇḍalinī work?",
      "How does 'transformation, not renunciation' land in your own relationship to pleasure and the senses?",
    ],
  },

  {
    slug: "sacred-sound",
    n: "VI",
    title: "Sacred Sound: Oṃ and the Mātṛkā",
    subtitle: "The Prāṇava, Turiya, and the Sanskrit alphabet as living Shakti",
    intro:
      "Oṃ, also called the Prāṇava, the Primordial Sound, is the seed syllable said to contain every possible sound distilled into a single resonance. From it unfolds a whole science of sacred sound.",
    sections: [
      {
        heading: "A-U-M and the silence beneath",
        body: "The three sounds of Oṃ correspond to Brahmā–Viṣṇu–Śiva (creation–preservation–dissolution), to the three guṇas, and to waking, dreaming, and deep dreamless sleep. Turiya, 'the Fourth', is the state of pure awareness beyond and underlying all three: the silence within which A-U-M arises and dissolves. Śabdabrahman names the deeper claim: ultimate reality is itself sonic, and sound is its most accessible form. Even Gaṇeśa, remover of obstacles, is identified with Oṃ as gatekeeper of the sacred threshold.",
      },
      {
        heading: "The Mātṛkā, letters as goddesses",
        body: "The Mātṛkās are the feminine divine energies represented by the letters of the Sanskrit alphabet, each carrying its own vibration. Mantra is understood as the Mātṛkā in combination; their shared basic energy is Shakti. Because the letters are said to live encoded within the chakras and the subtle body, reciting the alphabet with attention is itself a form of chakra activation.",
      },
      {
        heading: "Vowels and consonants",
        body: "The vowels carry unmanifest energy, pure potential, speech before it takes form, with each one holding its own cosmological correspondence, from A (the root of creation) to O/Au (the union of opposites and ultimate self-realisation). The consonants carry manifest energy, mapped to the five elements: Ka to fire, Ga to earth, Ca to wind, Ṭa to sky, Pa to water. Learning to hear the elements inside ordinary consonants is itself a quiet form of meditation.",
      },
    ],
    widget: "matrika-chant",
    practice: { steps: [] },
    quiz: [
      {
        q: "What is Turiya?",
        options: [
          "The loudest part of Oṃ",
          "A fourth state of pure awareness underlying waking, dreaming, and sleep",
          "Another name for Kali",
          "The Sanskrit alphabet",
        ],
        answer: 1,
        explain: "Turiya is the silent, ever-present ground from which the three ordinary states, and A-U-M, arise.",
      },
      {
        q: "What does Śabdabrahman claim about sound?",
        options: [
          "Sound is only decorative in ritual",
          "Sound is a symbol pointing at Brahman, nothing more",
          "Sound, in its subtlest form, IS Brahman",
          "Sound has no spiritual significance",
        ],
        answer: 2,
        explain: "Śabdabrahman holds that ultimate reality is fundamentally sonic, sound as Brahman's most accessible form.",
      },
      {
        q: "What do the Mātṛkās represent?",
        options: [
          "Historical Tantric teachers",
          "Feminine divine energies embodied in the Sanskrit letters",
          "A category of yantra",
          "The four directions",
        ],
        answer: 1,
        explain: "Each Sanskrit letter is understood as a Mātṛkā, a living, vibrational form of Shakti.",
      },
    ],
    journalPrompts: [
      "Chanting through the fifty letters, which sound produced the clearest sensation, and where did you feel it?",
      "Does 'sound as reality itself' change how you'll approach mantra practice?",
      "Which single Sanskrit sound, if any, already felt familiar in your body before today?",
    ],
  },

  {
    slug: "nyasa-and-koshas",
    n: "VII",
    title: "Nyāsa & the Five Koshas",
    subtitle: "Placing the sonic powers of Shakti, and the sheaths of the self",
    intro:
      "Nyāsa, from the root as, 'to cast' or 'to place', is the practice of installing mantra and sacred energy into the body, turning the practitioner into a living sacred space. The Koshas map what that space is actually made of.",
    sections: [
      {
        heading: "Placing the sacred",
        body: "Several forms of Nyāsa exist, Bīja Nyāsa (seed syllables), Mantra Nyāsa (full mantric installation), Kara Nyāsa (placing the six chakra seed mantras into the hands), Cakra Nyāsa (placement into the chakras), and Deity Nyāsa. A common four-part sequence runs: install the seed mantras into the hands, call in a field of directional protection, align posture with the sacred sounds, and finally purify the seat itself. Three elements run through every form, prāṇa (pranic activation), mantra (spoken, whispered, or silent), and touch (energy transmitted hand to body).",
      },
      {
        heading: "The five sheaths",
        body: "The Koshas describe successive layers of the self, from densest to most subtle. Annamaya Kośa is the physical body, sustained by food. Prāṇamaya Kośa is vital energy and breath. Manomaya Kośa is the mental and emotional sheath. Vijñānamaya Kośa is wisdom and intuition. Ānandamaya Kośa is the bliss body, the subtlest and most luminous layer.",
      },
      {
        heading: "Working every layer at once",
        body: "Tantric practice doesn't move through the Koshas one at a time and then stop, it engages all five simultaneously: the physical through posture and breath, the energetic through prāṇāyāma and Nyāsa, the mental through mantra and visualisation, the wisdom-layer through contemplation, and the bliss-layer through devotion and ritual union.",
      },
    ],
    widget: "kara-nyasa",
    practice: { steps: [] },
    quiz: [
      {
        q: "What does the word Nyāsa literally mean?",
        options: ["To renounce", "To place or cast", "To burn", "To count"],
        answer: 1,
        explain: "From the root as ('to cast'), Nyāsa is the intentional placing of mantra and energy into the body.",
      },
      {
        q: "Which Kosha is the subtlest, most luminous layer?",
        options: ["Annamaya Kośa", "Manomaya Kośa", "Vijñānamaya Kośa", "Ānandamaya Kośa"],
        answer: 3,
        explain: "Ānandamaya Kośa, the bliss body, sits at the apex, closest to pure awareness.",
      },
      {
        q: "How many Koshas does Tantric practice work with at once?",
        options: ["One at a time, sequentially", "All five simultaneously", "Only the physical", "Only the bliss body"],
        answer: 1,
        explain: "Tantra engages the physical, energetic, mental, wisdom, and bliss layers together.",
      },
    ],
    journalPrompts: [
      "Working through the six points, did any one place feel more alive or more resistant than the others?",
      "What would it feel like to treat your hands as tools of transmission, the way Nyāsa does?",
      "Which of the five Koshas did you find easiest to sense today? Which was hardest?",
    ],
  },

  {
    slug: "seven-chakras",
    n: "VIII",
    title: "The Seven Chakras, Full Reference",
    subtitle: "Location, bīja mantra, Ḍākinī, and the rise of Kuṇḍalinī",
    intro:
      "The seven-chakra system, codified in the Kubjikāmata Tantra and standardised through Śrī Vidyā, is the structural map of the subtle body used across most contemporary Tantric and yogic practice. Explore each center below, then trace the rise of Kuṇḍalinī through all seven.",
    sections: [
      {
        heading: "A center of consciousness",
        body: "Each chakra is associated with a location in the body, a bīja (seed) mantra, a set of Sanskrit letters on its petals, a presiding Ḍākinī, and, in several cases, a Mahā Vidyā, a wisdom goddess. Use the explorer below to move through Mūlādhāra at the base of the spine all the way to Sahasrāra at the crown.",
      },
      {
        heading: "Kuṇḍalinī Śakti, the coiled power",
        body: "Kuṇḍalinī is the latent divine energy said to rest coiled at the Mūlādhāra, Kubjikā herself means 'the coiled one'. Its awakening and ascent through each chakra in turn is the central transformational mechanism of the Kubjikāmata Tantra. This unfolds gradually, over years of practice, guided by specific ritual, mantra, and meditation.",
      },
      {
        heading: "Union at the crown",
        body: "The final destination is the Sahasrāra Chakra, where Śiva (pure consciousness) and Śakti (dynamic energy) unite, the dawning of non-dual awareness and the liberation called Moksha. Traditional teaching also links sustained meditation on each individual chakra to specific capacities, offered here as traditional framing rather than medical claim.",
      },
      {
        heading: "Signs of genuine movement",
        body: "When Kuṇḍalinī genuinely begins to move, students often report spontaneous heat or coolness travelling along the spine, involuntary movements (kriyās), an altered sense of time, and waves of bliss or grief that ask to be released rather than analysed. A steadier, more diagnostic sign than any of these in the moment is what happens between sessions: a growing clarity of mind that persists off the cushion, not only during practice.",
      },
    ],
    widget: "chakra-explorer",
    quiz: [
      {
        q: "Where does Kuṇḍalinī Śakti traditionally rest before it is awakened?",
        options: ["Sahasrāra, at the crown", "Anāhata, at the heart", "Mūlādhāra, at the base of the spine", "Ājñā, at the third eye"],
        answer: 2,
        explain: "Kuṇḍalinī rests coiled at the Mūlādhāra until its ascent is awakened.",
      },
      {
        q: "What event is said to happen at the Sahasrāra?",
        options: [
          "The awakening of the Fetch",
          "The union of Śiva and Śakti, and the dawning of Moksha",
          "The purification of the seat",
          "The first appearance of Kuṇḍalinī",
        ],
        answer: 1,
        explain: "The Sahasrāra is where consciousness and energy unite in non-dual realisation.",
      },
      {
        q: "What does each chakra carry, according to the reference system?",
        options: [
          "Only a colour",
          "A location, bīja mantra, petal letters, and a presiding Ḍākinī",
          "Only a Mahā Vidyā",
          "Nothing beyond a name",
        ],
        answer: 1,
        explain: "Each center is a full constellation: place, seed sound, letters, and a guiding Ḍākinī.",
      },
    ],
    journalPrompts: [
      "Which chakra did you linger at longest in the explorer, and what drew you there?",
      "Did any center feel unusually quiet or unusually loud in your own body?",
      "What would a year of steady practice at just one chakra look like for you?",
    ],
  },

  {
    slug: "dakinis-and-goddesses",
    n: "IX",
    title: "Ḍākinīs, Mahā Vidyās & Iconography",
    subtitle: "Guardians, wisdom goddesses, and how to read a sacred image",
    intro:
      "Beyond the seven chakra Ḍākinīs, Tantra reveres a wider court of goddesses, the Mahā Vidyās, the 'Great Wisdoms', each a different face of ultimate reality, and each iconographic detail a precise teaching rather than decoration.",
    sections: [
      {
        heading: "Ḍākinīs vs. Devatās",
        body: "Devatās are approached for philosophical depth and stability through contemplative practice. Ḍākinīs are pursued for radical personal transformation, addressing energy blockages, facilitating spontaneous awakening, and providing direct, embodied spiritual intervention. Their fierce appearance is the compassionate face of radical liberation.",
      },
      {
        heading: "The Mahā Vidyās",
        body: "Ten tantric goddesses, each a distinct modality of awakening. Kālī offers the liberation found in time and darkness. Tārā, 'she who saves', guides practitioners across the ocean of suffering with fierce compassion. Durgā, riding a lion, embodies the collective power of all deities, invoked for protection and courage. Tripura-Sundarī presides over the Śrī Yantra and the Śrī Vidyā tradition, the beauty of pure consciousness itself. Others named in the chakra system include Bhuvaneśvarī, Bhogavatī, Rudriṇī, Lalitā, Chaṇḍikā, and Dhūmāvatī, the goddess of dissolution and emptiness.",
      },
      {
        heading: "Reading iconography",
        body: "Nothing in a goddess image is decorative. A skull cup speaks to impermanence; a lotus, to purity rising from ordinary mud; a weapon, to the cutting of ignorance; an open palm (Varada Mudrā), to the bestowal of grace. Visualising a deity in full detail is a practice of identification. You are recognising her presence already inside your own consciousness, not imagining her from outside.",
      },
    ],
    widget: "dakini-gallery",
    practice: {
      steps: [
        { title: "Choose one", detail: "Pick one goddess from the gallery that draws your attention without deliberating.", seconds: 20 },
        { title: "See her fully", detail: "Hold her described attributes in mind, colour, object, posture, one at a time.", seconds: 60 },
        { title: "Ask what she cuts through", detail: "Consider what in your life her particular quality would transform or clear.", seconds: 60 },
        { title: "Let the image rest", detail: "Release the visualisation and sit in the quality she represents, without the image.", seconds: 45 },
      ],
    },
    quiz: [
      {
        q: "What is the key difference between seeking a Devatā and seeking a Ḍākinī?",
        options: [
          "Devatās are sought for radical transformation, Ḍākinīs for stability",
          "Ḍākinīs are sought for radical transformation, Devatās for philosophical stability",
          "There is no difference",
          "Only Ḍākinīs have iconography",
        ],
        answer: 1,
        explain: "Devatās give structured, contemplative depth; Ḍākinīs offer direct, embodied transformation.",
      },
      {
        q: "Which goddess presides over the Śrī Yantra and Śrī Vidyā tradition?",
        options: ["Kālī", "Tārā", "Tripura-Sundarī", "Durgā"],
        answer: 2,
        explain: "Tripura-Sundarī, 'beauty of the three worlds', presides over Śrī Vidyā and the Śrī Yantra.",
      },
      {
        q: "In goddess iconography, what does a skull cup typically represent?",
        options: ["Wealth", "Impermanence and the transmission of awakened mind", "Fertility", "Nothing, purely decorative"],
        answer: 1,
        explain: "Iconographic details are theological statements, a skull cup speaks directly to impermanence.",
      },
    ],
    journalPrompts: [
      "Which goddess did you choose in the practice, and what surprised you about the choice?",
      "What is one thing in your life that needs 'fierce compassion' rather than gentleness right now?",
      "Try describing yourself, once, in iconographic terms, what would you be holding, and why?",
    ],
  },

  {
    slug: "sound-circuits",
    n: "X",
    title: "Two Sound Circuits",
    subtitle: "The Garland of Letters, and the Directional Śaktis",
    intro:
      "Two elegant sound-based practices link breath, embodied location, and divine invocation into a single continuous circuit, one moving vertically through the body, the other outward through the four directions.",
    sections: [
      {
        heading: "The Garland of Letters",
        body: "Three seed syllables, each tied to a great goddess, circulate through the body on the breath: Aiṃ at the tip of the tongue, Hrīṃ drawn inward to the heart on the inhale, Klīṃ at the belly as power gathers, and Klīṃ/Śrīṃ released back out to heart and tongue on the exhale. The three goddesses invoked, Sarasvatī (wisdom and creative speech), Lakṣmī (grace, beauty, abundance), and Kālī (transformation and liberation), form a complete arc: Sarasvatī initiates through sound, Lakṣmī sustains through love, Kālī completes through dissolution.",
      },
      {
        heading: "The Directional Śaktis",
        body: "This practice invokes the four cardinal directions, each presided over by its own Śakti: Sarasvatī in the East (wisdom, knowledge, creativity, visualised as pure white light), Yamunā in the South (emotional balance and grace, soothing blue light), Vāruṇī in the West (abundance and fulfilment, deep purple light), and Kubjikā in the North (hidden potential and transformation, golden light). Orienting sacred space in all four directions creates a living mandala within which deeper work can unfold safely.",
      },
      {
        heading: "Why circuits matter",
        body: "Both practices share a structure: sound moves through a defined path, vertical through the subtle body, or radial through the compass, rather than sitting static in one place. This circulatory quality is itself part of the teaching: Shakti is never still. It flows, and the practitioner's job is to become a clear channel for that flow rather than a container that holds it in place.",
      },
    ],
    widget: "sound-circuits",
    practice: {
      steps: [
        { title: "Aiṃ, tongue", detail: "Rest the sound Aiṃ lightly at the tip of the tongue.", seconds: 30 },
        { title: "Hrīṃ, inhale to heart", detail: "Draw Hrīṃ inward on the inhale, arriving at the heart.", seconds: 30 },
        { title: "Klīṃ, belly power", detail: "Let Klīṃ settle and gather at the belly.", seconds: 30 },
        { title: "Klīṃ/Śrīṃ, exhale out", detail: "Release back out through heart and tongue on the exhale.", seconds: 30 },
        { title: "Repeat the circuit", detail: "Cycle through the four points three more times, letting it become fluid.", seconds: 90 },
      ],
    },
    quiz: [
      {
        q: "In the Garland of Letters, where does Klīṃ settle?",
        options: ["The tip of the tongue", "The belly", "The crown", "The feet"],
        answer: 1,
        explain: "Klīṃ gathers as power at the belly, between the inward Hrīṃ and the outward release.",
      },
      {
        q: "Which Śakti presides over the North in the Directional practice?",
        options: ["Sarasvatī", "Yamunā", "Vāruṇī", "Kubjikā"],
        answer: 3,
        explain: "Kubjikā presides over the North, representing hidden potential and transformation.",
      },
      {
        q: "What structural quality do both sound circuits share?",
        options: [
          "They are both entirely silent",
          "Sound moves through a defined path rather than sitting static",
          "They both use only one syllable",
          "They require no breath coordination",
        ],
        answer: 1,
        explain: "Both circuits move sound along a path, vertical or radial, reflecting Shakti's flowing nature.",
      },
    ],
    journalPrompts: [
      "Which of the four directions did you feel most readily, and which was hardest to sense?",
      "Did the vertical circuit (Garland) or the radial one (Directions) feel more natural in your body?",
      "Where else in your life could 'becoming a channel' serve you better than 'holding on'?",
    ],
  },

  {
    slug: "mantra-yantra-mala",
    n: "XI",
    title: "Mantra, Yantra & the Mālā",
    subtitle: "Japa practice, working with a yantra, and your digital mālā",
    intro:
      "Mantra-japa is the recitation of mantra while gazing at a yantra, and just as a mantra is understood to be the deity itself rather than a symbol of it, so too is the yantra: the deity herself in geometric form.",
    sections: [
      {
        heading: "Working with yantra and mālā",
        body: "A yantra can be 'brought to life' through Prāṇa Pratiṣṭhā, installation of the life-force, though it can still be used to good effect without this ceremony. Once alive, it is treated as a living presence, regularly fed through offerings. A mālā, prayer bead string, is traditionally chosen by material to suit the deity: rudraksha for Śiva, black onyx or bone for Kālī. Traditionally the mālā never touches the index finger, which represents the ego; beads are rolled between thumb and the middle knuckle of the middle finger instead.",
      },
      {
        heading: "Open and closed practices",
        body: "Some mantras are 'closed' or 'sealed', requiring initiation (dīkṣā) from a qualified teacher before their fuller power is said to flow. Others are 'open', freely usable by any sincere practitioner. Open practices are a genuine and honourable entry point; many practitioners build a deep, transformative relationship with an openly received mantra long before ever encountering formal initiation.",
      },
      {
        heading: "Purifying the seat",
        body: "Before any sitting, the Kubjikā tradition prescribes a short ritual to consecrate the physical seat: cleanse the space, sprinkle tīrtha (sacred water), lay a clean cloth or mat, mark it with kumkum or a traced symbol, invoke the deity, and finally sit, visualising yourself, briefly, as an embodiment of the goddess whose throne you now occupy. Cleansing the space is cleansing the mind; recognising the divine in the seat is recognising the divine in yourself.",
      },
    ],
    widget: "digital-mala",
    practice: {
      steps: [
        { title: "Cleanse the space", detail: "Clear and tidy the small area where you'll sit. This is the first act of the seat-purification.", seconds: 30 },
        { title: "Sprinkle and lay the seat", detail: "Sprinkle a little water (tīrtha) where you'll sit, then lay a clean cloth or mat over it.", seconds: 30 },
        { title: "Mark and invoke", detail: "Mark the seat with kumkum or a traced symbol if you have one, then briefly invoke the deity of your chosen mantra.", seconds: 40 },
        { title: "Choose the mantra", detail: "Pick one open mantra and commit to it for the whole session, don't change it mid-round.", seconds: 20 },
        { title: "Run one full mālā round", detail: "Use the digital mālā below to count one complete round, 108 beads, letting each repetition settle before the next. This step ends when the round ends, not when a clock does." },
        { title: "Close with stillness", detail: "When the round completes, sit without counting for a few breaths before rising.", seconds: 45 },
      ],
    },
    quiz: [
      {
        q: "What is the relationship between a yantra and its deity, in Tantric understanding?",
        options: [
          "The yantra is a decorative symbol only",
          "The yantra IS the deity in geometric form",
          "The yantra replaces the need for mantra",
          "Yantras have no ritual use",
        ],
        answer: 1,
        explain: "Just as mantra is the deity in sound, the yantra is the deity in geometric form.",
      },
      {
        q: "According to tradition, which finger should never touch the mālā beads?",
        options: ["The thumb", "The middle finger", "The index finger", "The little finger"],
        answer: 2,
        explain: "The index finger represents the ego and is traditionally kept away from the beads.",
      },
      {
        q: "What distinguishes an 'open' mantra from a 'closed' one?",
        options: [
          "Open mantras require formal initiation, closed ones don't",
          "Closed mantras traditionally require initiation (dīkṣā); open ones are freely usable",
          "There is no real distinction",
          "Closed mantras cannot be chanted aloud",
        ],
        answer: 1,
        explain: "Closed/sealed mantras are said to require a teacher's transmission; open mantras are an honest entry point for anyone.",
      },
    ],
    journalPrompts: [
      "Which mantra did you choose for your mālā practice, and what drew you to it?",
      "How did counting change the quality of your attention compared to uncounted repetition?",
      "What would a daily japa practice, however short, look like in your actual schedule?",
    ],
  },
];
