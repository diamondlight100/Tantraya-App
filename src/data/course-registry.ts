// Every fully-built, hardcoded interactive course in the app, in one place , 
// used by the Courses page (and the Core Curriculum page) so they can list
// everything real without needing a hand-maintained list per page.
//
// `core: true`, part of the foundational Core Curriculum.
// `course: false`, core-only; doesn't also appear on the Courses page (its
// own card there would just double up what's already inside the Core
// Curriculum folder linked at the top of that page).
// Omitting `course` defaults it to true (shown as a Course).
//
// Add a new entry here whenever a new hardcoded course route is built.

export type CourseRegistryEntry = {
  pathway: string;
  slug: string;
  title: string;
  href: string;
  core?: boolean;
  course?: boolean;
  /** Rendered under its own "Self-Study" card style instead of the normal
   *  chaptered-course card (no live progress bar / structured lessons). */
  selfStudy?: boolean;
  /** Other course_slug values (already slugified) a teacher might have used
   *  for this same course before the real slug was settled on, e.g. "eem"
   *  for eight-extraordinary-meridians. Prevents a stray tag from making an
   *  already-interactive course also show up as a "self-study" duplicate. */
  aliases?: string[];
  /** A course intro/trailer video baked straight into the course's own page
   *  (a YouTube id hardcoded in that route's data, e.g. Faery Shamanism's
   *  intro), as opposed to something uploaded through the Materials admin
   *  page. It never lives in the `materials` table, so nothing that only
   *  reads that table (the Index, search) would otherwise ever see it.
   *  Set this so the Index can list it too. */
  introVideoYoutubeId?: string;
};

export const courseRegistry: CourseRegistryEntry[] = [
  {
    pathway: "daoist",
    slug: "eight-extraordinary-meridians",
    title: "The Eight Extraordinary Meridians Qigong",
    href: "/pathways/daoist/eight-extraordinary-meridians",
    core: true,
    aliases: ["eem", "eight-meridians", "8-meridians", "8-extraordinary-meridians"],
  },
  {
    pathway: "daoist",
    slug: "iching",
    title: "The I Ching",
    href: "/pathways/daoist/iching",
    aliases: ["i-ching", "yijing", "i ching"],
  },
  {
    pathway: "daoist",
    slug: "bagua-taiji",
    title: "Baguazhang",
    href: "/pathways/daoist/bagua-taiji",
    selfStudy: true,
    aliases: ["bagua", "baguazhang", "bagua-zhang"],
  },
  {
    pathway: "buddhist",
    slug: "metta-tonglen",
    title: "Mettā & Tonglen",
    href: "/pathways/buddhist/metta-tonglen",
    core: true,
  },
  {
    pathway: "buddhist",
    slug: "phowa",
    title: "Beyond the Threshold: Phowa for Modern Times",
    href: "/pathways/buddhist/phowa",
  },
  {
    pathway: "magick",
    slug: "faery-shamanism",
    title: "Faery Shamanism",
    href: "/pathways/magick/faery-shamanism",
    introVideoYoutubeId: "Lt5UgXgcsGA",
  },
  {
    pathway: "magick",
    slug: "lucid-dreaming",
    title: "Lucid Dreaming & the Yogas of Dream and Sleep",
    href: "/pathways/magick/lucid-dreaming",
    aliases: [
      "lucid-dream",
      "lucid-dreams",
      "lucid-dreaming-course",
      "lucid-dreaming-bundle",
      "lucid-dreming",
      "lucid-dreamin",
      "dream-yoga",
      "dream-yogas",
      "yogas-of-dream-and-sleep",
      "yoga-of-dream-and-sleep",
    ],
  },
  {
    pathway: "magick",
    slug: "talismans-amulets-charms",
    title: "How to Make Talismans, Amulets and Charms",
    href: "/courses/magick/talismans-amulets-charms",
    selfStudy: true,
    aliases: [
      "talismans",
      "talisman",
      "amulets",
      "amulet",
      "charms",
      "charm",
      "talismans-charms-amulets",
      "talismans-and-amulets",
      "how-to-make-talismans",
    ],
  },
  {
    pathway: "magick",
    slug: "egyptian-magick",
    title: "Ancient Egyptian Magick",
    href: "/pathways/magick/egyptian-magick",
  },
  {
    pathway: "magick",
    slug: "spagyrics",
    title: "Alchemy: Spagyrics",
    href: "/pathways/magick/spagyrics",
    aliases: ["spagyric", "alchemy-spagyrics", "spagyrics-course"],
  },
  {
    pathway: "tantric",
    slug: "way-of-the-goddess",
    title: "The Way of the Goddess",
    href: "/pathways/tantric/way-of-the-goddess",
  },
  {
    // Not filed under any pathway on purpose: self-enquiry/Atma-Vichara
    // isn't specifically tantric, so it lives only in Core Curriculum,
    // never under the Tantric pathway hub or its course list.
    pathway: "general",
    slug: "self-enquiry",
    title: "The Way of Self-Enquiry",
    href: "/core/self-enquiry",
    core: true,
    aliases: ["self-enquiry", "atma-vichara", "the-way-of-self-enquiry"],
  },
  {
    pathway: "tantric",
    slug: "mahavidyas",
    title: "The Ten Mahavidyas",
    href: "/pathways/tantric/mahavidyas",
    // Covers both close phrase variants of the course name and materials
    // tagged with an individual goddess's name instead of the course itself
    // (e.g. a teacher typing "Kali" for a Kali-specific document), all ten
    // belong on this one course page, there's no separate per-goddess page
    // with its own materials section.
    aliases: [
      "mahavidya",
      "the-ten-mahavidyas",
      "ten-mahavidyas",
      "10-mahavidyas",
      "dasa-mahavidya",
      "dasa-mahavidyas",
      "das-mahavidya",
      "kali",
      "tara",
      "tripura-sundari",
      "tripurasundari",
      "shodashi",
      "bhuvaneshvari",
      "bhuvaneswari",
      "chinnamasta",
      "chinnamastika",
      "bhairavi",
      "dhumavati",
      "bagalamukhi",
      "bagala",
      "matangi",
      "kamala",
      "kamalatmika",
    ],
  },
  {
    pathway: "yogic",
    slug: "surya-namaskara",
    title: "Sūrya Namaskāra",
    href: "/pathways/yogic/surya-namaskara",
    core: true,
  },
  {
    pathway: "yogic",
    slug: "nadi-shodhana",
    title: "Nāḍī Śodhana",
    href: "/pathways/yogic/nadi-shodhana",
    core: true,
  },
  {
    // Filed in Core Curriculum, like self-enquiry, even though it also
    // carries the "yogic" pathway tag and gets a card on that hub page.
    pathway: "yogic",
    slug: "trataka",
    title: "Trataka: The Steady Gaze",
    href: "/core/trataka",
    core: true,
    aliases: ["trataka", "jyoti-trataka", "shambhavi-mudra", "the-steady-gaze"],
  },
  {
    pathway: "magick",
    slug: "astral-projection",
    title: "Astral Projection",
    href: "/courses/magick/astral-projection",
    selfStudy: true,
    aliases: ["astral-projections"],
  },
  {
    // Its own course, distinct from Astral Projection: projection is the
    // technique of leaving the body, Astral Magick is working ritually
    // and magically on the astral plane once there, not the same subject
    // and shouldn't share one page or one alias.
    pathway: "magick",
    slug: "astral-magick",
    title: "Astral Magick",
    href: "/courses/magick/astral-magick",
    selfStudy: true,
    aliases: ["astral-magic"],
  },
];
