// Mantra page, content for the Tantric pathway.
// Covers Ganesh, Shiva, Lakshmi, Durga, Saraswati, Hanuman, and the Ten
// Mahavidyas. For each deity: a bīja (seed) mantra, a gāyatrī, the simple
// "Om ... Namaha" salutation, the more energetic "Om ... Svāhā" offering
// form, and 1–3 further mantras specific to that deity.
//
// A note on accuracy and lineage: mantra forms genuinely vary between
// sampradāyas, texts, and oral lineages, spellings, syllable counts, and
// even which bīja is "primary" differ from one tantra or guru-paramparā to
// another. Where a mantra is traditionally restricted to direct initiation
// (most notably the full Śrīvidyā Ṣoḍaśī/Pañcadaśākṣarī of Tripura
// Sundari), that is flagged rather than printed, consistent with how the
// tradition itself treats it, not an omission. Everything else here is
// mantra material that is openly published and commonly taught.

export type MantraRole = "bija" | "gayatri" | "namaha" | "swaha" | "extra";

export type MantraEntry = {
  key: string;
  role: MantraRole;
  label: string;
  devanagari?: string;
  transliteration: string;
  meaning: string;
  note?: string;
};

export type MantraDeity = {
  slug: string;
  name: string;
  epithet?: string;
  accentColor: string;
  mantras: MantraEntry[];
};

export const mantraDeities: MantraDeity[] = [
  // ---------------------------------------------------------------- Ganesh
  {
    slug: "ganesh",
    name: "Ganesh",
    epithet: "Gaṇapati",
    accentColor: "#B5652C",
    mantras: [
      {
        key: "ganesh-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "गं",
        transliteration: "Gaṃ",
        meaning:
          "The seed-sound of Ganesh himself, a single dense syllable carrying his whole field: removal of obstruction, grounded intelligence, the first offering before any working begins.",
      },
      {
        key: "ganesh-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्ति प्रचोदयात्",
        transliteration: "Oṃ Ekadantāya Vidmahe Vakratuṇḍāya Dhīmahi Tanno Danti Prachodayāt",
        meaning:
          "We come to know the One-Tusked, we meditate on the Curved-Trunked, may that Tusked One awaken and guide our understanding.",
      },
      {
        key: "ganesh-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ गं गणपतये नमः",
        transliteration: "Oṃ Gaṃ Gaṇapataye Namaḥ",
        meaning: "Salutation to Ganapati, lord of the gaṇas, the ordinary devotional form, used before any practice or undertaking.",
      },
      {
        key: "ganesh-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ गं गणपतये स्वाहा",
        transliteration: "Oṃ Gaṃ Gaṇapataye Svāhā",
        meaning:
          "The offering form, \"well given\", used when the mantra accompanies an actual oblation (fire, food, water) rather than simple salutation.",
      },
      {
        key: "ganesh-vakratunda",
        role: "extra",
        label: "Vakratuṇḍa verse",
        devanagari:
          "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
        transliteration:
          "Vakra-tuṇḍa Mahā-kāya Sūrya-koṭi Sama-prabha, Nirvighnaṃ Kuru Me Deva Sarva-kāryeṣu Sarvadā",
        meaning:
          "O curved-trunked, great-bodied one, radiant as a million suns. Make all my undertakings free of obstacles, always. The standard verse to open any ritual, class, or working.",
      },
      {
        key: "ganesh-tantric",
        role: "extra",
        label: "Extended tantric form",
        devanagari: "ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा",
        transliteration: "Oṃ Śrīṃ Hrīṃ Klīṃ Glauṃ Gaṃ Gaṇapataye Vara Varada Sarva Janaṃ Me Vaśamānaya Svāhā",
        meaning:
          "A stacked-bīja elaboration of the root mantra, used in more involved sādhanā for drawing favorable conditions and cooperation from others.",
      },
    ],
  },
  // ----------------------------------------------------------------- Shiva
  {
    slug: "shiva",
    name: "Shiva",
    accentColor: "#3F5B6B",
    mantras: [
      {
        key: "shiva-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "हौं",
        transliteration: "Hauṃ",
        meaning:
          "Shiva's seed syllable, pure, unmodified consciousness, prior to any form. Often visualized as arising in the crown or the throat.",
      },
      {
        key: "shiva-gayatri",
        role: "gayatri",
        label: "Gāyatrī (Rudra Gāyatrī)",
        devanagari: "ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि तन्नो रुद्रः प्रचोदयात्",
        transliteration: "Oṃ Tatpuruṣāya Vidmahe Mahādevāya Dhīmahi Tanno Rudraḥ Prachodayāt",
        meaning: "We come to know that Supreme Being, we meditate on the Great God, may Rudra awaken and guide us.",
      },
      {
        key: "shiva-namaha",
        role: "namaha",
        label: "Om … Namaha (Pañcākṣara)",
        devanagari: "ॐ नमः शिवाय",
        transliteration: "Oṃ Namaḥ Śivāya",
        meaning:
          "The five-syllable mantra (Na-Ma-Śi-Vā-Ya), one of the oldest and most complete mantras in the tradition on its own; also the base namaha form for Shiva.",
      },
      {
        key: "shiva-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ शिवाय स्वाहा",
        transliteration: "Oṃ Śivāya Svāhā",
        meaning: "The offering form, used when this mantra accompanies fire, water, or food offered directly to Shiva.",
      },
      {
        key: "shiva-mahamrityunjaya",
        role: "extra",
        label: "Mahāmṛtyuñjaya mantra",
        devanagari:
          "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
        transliteration:
          "Oṃ Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭi-vardhanam, Urvārukam-iva Bandhanān Mṛtyor-mukṣīya Māmṛtāt",
        meaning:
          "We worship the three-eyed one, fragrant, nourisher of all, as the cucumber is freed from the vine, may we be freed from death into immortality. The great mantra of healing and conscious liberation from fear of death.",
      },
      {
        key: "shiva-karpuragauram",
        role: "extra",
        label: "Karpūra Gauraṃ (āratī verse)",
        devanagari: "कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्। सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥",
        transliteration:
          "Karpūra-gauraṃ Karuṇā-avatāraṃ Saṃsāra-sāraṃ Bhujagendra-hāram, Sadā-vasantaṃ Hṛdayāravinde Bhavaṃ Bhavānī-sahitaṃ Namāmi",
        meaning:
          "White as camphor, an incarnation of compassion, the essence of the world, garlanded with serpents, ever dwelling in the lotus of the heart, I bow to Shiva together with Bhavānī. The classic verse sung at the close of a Shiva ārati.",
      },
    ],
  },
  // -------------------------------------------------------------- Lakshmi
  {
    slug: "lakshmi",
    name: "Lakshmi",
    epithet: "Mahālakṣmī",
    accentColor: "#B08A3E",
    mantras: [
      {
        key: "lakshmi-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "श्रीं",
        transliteration: "Śrīṃ",
        meaning: "The seed of abundance itself, auspiciousness, radiance, and prosperity in the widest sense, material and otherwise.",
      },
      {
        key: "lakshmi-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ महादेव्यै च विद्महे विष्णुपत्न्यै च धीमहि तन्नो लक्ष्मीः प्रचोदयात्",
        transliteration: "Oṃ Mahādevyai Cha Vidmahe Viṣṇu-patnyai Cha Dhīmahi Tanno Lakṣmīḥ Prachodayāt",
        meaning: "We come to know the Great Goddess, we meditate on the consort of Vishnu, may Lakshmi awaken and guide us.",
      },
      {
        key: "lakshmi-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ श्रीं महालक्ष्म्यै नमः",
        transliteration: "Oṃ Śrīṃ Mahālakṣmyai Namaḥ",
        meaning: "Salutation to the Great Goddess of abundance, the simple, everyday devotional form.",
      },
      {
        key: "lakshmi-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ श्रीं महालक्ष्म्यै स्वाहा",
        transliteration: "Oṃ Śrīṃ Mahālakṣmyai Svāhā",
        meaning: "The offering form, used with an actual oblation.",
      },
      {
        key: "lakshmi-kamale",
        role: "extra",
        label: "Kamale Kamalālaye mantra",
        devanagari: "ॐ ह्रीं श्रीं क्लीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं ॐ महालक्ष्म्यै नमः",
        transliteration: "Oṃ Hrīṃ Śrīṃ Klīṃ Kamale Kamalālaye Prasīda Prasīda Śrīṃ Hrīṃ Oṃ Mahālakṣmyai Namaḥ",
        meaning:
          "O Lotus One who dwells upon the lotus, be gracious, be gracious, a fuller tantric elaboration used in Lakshmi sādhanā and Diwali worship.",
      },
      {
        key: "lakshmi-sri-suktam",
        role: "extra",
        label: "Śrī Sūktam, opening verse",
        devanagari: "हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्। चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
        transliteration: "Hiraṇya-varṇāṃ Hariṇīṃ Suvarṇa-rajata-srajām, Candrāṃ Hiraṇmayīṃ Lakṣmīṃ Jātavedo Ma Āvaha",
        meaning:
          "The opening verse of the Vedic Śrī Sūktam, golden-complexioned, radiant, garlanded in gold and silver, moon-like, O Fire, bring that golden Lakshmi to me. Predates the classical tantric forms; still the root text of Lakshmi worship.",
      },
    ],
  },
  // --------------------------------------------------------------- Durga
  {
    slug: "durga",
    name: "Durga",
    accentColor: "#8C2F2F",
    mantras: [
      {
        key: "durga-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "दुं",
        transliteration: "Duṃ",
        meaning: "The seed of Durga, protection, the force that cuts through what cannot be reasoned with.",
      },
      {
        key: "durga-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ कात्यायनाय विद्महे कन्याकुमारी धीमहि तन्नो दुर्गिः प्रचोदयात्",
        transliteration: "Oṃ Kātyāyanāya Vidmahe Kanyā-kumārī Dhīmahi Tanno Durgiḥ Prachodayāt",
        meaning: "We come to know Kātyāyanī, we meditate on the eternal virgin, may Durga awaken and guide us.",
      },
      {
        key: "durga-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ दुं दुर्गायै नमः",
        transliteration: "Oṃ Duṃ Durgāyai Namaḥ",
        meaning: "Salutation to Durga, everyday devotional form, appropriate for daily practice.",
      },
      {
        key: "durga-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ दुं दुर्गायै स्वाहा",
        transliteration: "Oṃ Duṃ Durgāyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "durga-navarna",
        role: "extra",
        label: "Navārṇa mantra",
        devanagari: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
        transliteration: "Oṃ Aiṃ Hrīṃ Klīṃ Chāmuṇḍāyai Vichche",
        meaning:
          "The nine-syllable mantra at the heart of the Durgā Saptaśatī / Devī Māhātmya, the three bīja of will, sustaining, and dissolving power, offered to Chāmuṇḍā, the fierce aspect of Durga who ends Chanda and Munda.",
        note: "This mantra is properly framed by initiation and the surrounding recitation of the Devī Māhātmya. It is very commonly chanted on its own, but its full context matters.",
      },
      {
        key: "durga-sarva-mangala",
        role: "extra",
        label: "Sarva Maṅgala Māṅgalye",
        devanagari: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
        transliteration:
          "Sarva-maṅgala-māṅgalye Śive Sarvārtha-sādhike, Śaraṇye Tryambake Gauri Nārāyaṇi Namo'stu Te",
        meaning:
          "Auspiciousness of all auspiciousness, benevolent one who accomplishes every purpose, refuge, three-eyed Gaurī, Nārāyaṇī, salutation to you. A closing verse of the Devī Māhātmya, chanted at the end of Durga worship.",
      },
    ],
  },
  // ------------------------------------------------------------ Saraswati
  {
    slug: "saraswati",
    name: "Saraswati",
    accentColor: "#5C7A8A",
    mantras: [
      {
        key: "saraswati-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "ऐं",
        transliteration: "Aiṃ",
        meaning: "The seed of speech, learning, and creative intelligence, the sound most associated with Saraswati specifically.",
      },
      {
        key: "saraswati-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ सरस्वत्यै विद्महे ब्रह्मपुत्र्यै धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Sarasvatyai Vidmahe Brahma-putryai Dhīmahi Tanno Devī Prachodayāt",
        meaning: "We come to know Saraswati, we meditate on the daughter of Brahma, may that Goddess awaken and guide us.",
      },
      {
        key: "saraswati-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ ऐं सरस्वत्यै नमः",
        transliteration: "Oṃ Aiṃ Sarasvatyai Namaḥ",
        meaning: "Salutation to Saraswati, used before study, teaching, writing, or any creative practice.",
      },
      {
        key: "saraswati-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ ऐं सरस्वत्यै स्वाहा",
        transliteration: "Oṃ Aiṃ Sarasvatyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "saraswati-vandana",
        role: "extra",
        label: "Saraswatī Vandanā, opening verse",
        devanagari: "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता। या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥",
        transliteration:
          "Yā Kundendu-tuṣāra-hāra-dhavalā Yā Śubhra-vastrāvṛtā, Yā Vīṇā-vara-daṇḍa-maṇḍita-karā Yā Śveta-padmāsanā",
        meaning:
          "She who is white as the jasmine, the moon, or frost, who is clothed in white, whose hand is adorned with the fine staff of the vīṇā, who sits on a white lotus, the classical invocation, sung before teaching begins.",
      },
    ],
  },
  // ------------------------------------------------------------- Hanuman
  {
    slug: "hanuman",
    name: "Hanuman",
    accentColor: "#B5432C",
    mantras: [
      {
        key: "hanuman-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "हुं",
        transliteration: "Huṃ",
        meaning:
          "Hanuman's seed-force, power, protection, and unwavering devotion condensed into one syllable. (Lineages vary here more than most; some transmissions use a stacked seed such as Hrāṃ-Hrīṃ-Hrūṃ instead, see the extended form below.)",
      },
      {
        key: "hanuman-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ आञ्जनेयाय विद्महे वायुपुत्राय धीमहि तन्नो हनुमान् प्रचोदयात्",
        transliteration: "Oṃ Āñjaneyāya Vidmahe Vāyu-putrāya Dhīmahi Tanno Hanumān Prachodayāt",
        meaning: "We come to know the son of Añjanā, we meditate on the son of the Wind, may Hanuman awaken and guide us.",
      },
      {
        key: "hanuman-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ हनुमते नमः",
        transliteration: "Oṃ Hanumate Namaḥ",
        meaning: "Salutation to Hanuman, everyday devotional form, for protection, courage, and steadiness of mind.",
      },
      {
        key: "hanuman-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ नमो हनुमते स्वाहा",
        transliteration: "Oṃ Namo Hanumate Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "hanuman-sankata-mochan",
        role: "extra",
        label: "Extended (Saṅkaṭamocana) form",
        devanagari: "ॐ ह्रां ह्रीं ह्रूं ह्रैं ह्रौं हः हनुमते नमः",
        transliteration: "Oṃ Hrāṃ Hrīṃ Hrūṃ Hraiṃ Hrauṃ Hraḥ Hanumate Namaḥ",
        meaning:
          "A stacked-bīja tantric elaboration used specifically for removing serious obstacles (saṅkaṭa) and finding courage under real pressure.",
      },
      {
        key: "hanuman-chalisa-doha",
        role: "extra",
        label: "Hanumān Cālīsā, opening dohā",
        devanagari: "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि। बरनउं रघुबर बिमल जसु जो दायकु फल चारि॥",
        transliteration:
          "Śrī Guru Charana Saroja Raja Nija Manu Mukuru Sudhāri, Baranaun Raghubara Bimala Jasu Jo Dāyaku Phala Chāri",
        meaning:
          "Having cleansed the mirror of my mind with the dust of my Guru's lotus feet, I describe the pure glory of Rama, which grants the four fruits of life. The opening couplet before the Chalisa itself, a devotional bridge into the fuller text.",
      },
    ],
  },
  // ==================================================================
  // The Ten Mahavidyas
  // ==================================================================
  {
    slug: "kali",
    name: "Kali",
    accentColor: "#332F42",
    mantras: [
      {
        key: "kali-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "क्रीं",
        transliteration: "Krīṃ",
        meaning: "Kali's seed-sound, the force of time and dissolution, compressed into a single strike of sound.",
      },
      {
        key: "kali-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ कालिकायै विद्महे श्मशानवासिन्यै धीमहि तन्नो घोरे प्रचोदयात्",
        transliteration: "Oṃ Kālikāyai Vidmahe Śmaśāna-vāsinyai Dhīmahi Tanno Ghore Prachodayāt",
        meaning:
          "We come to know Kālikā, we meditate on she who dwells in the cremation ground, may the Terrible One awaken and guide us.",
      },
      {
        key: "kali-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ क्रीं कालिकायै नमः",
        transliteration: "Oṃ Krīṃ Kālikāyai Namaḥ",
        meaning: "Salutation to Kali, the accessible daily devotional form.",
      },
      {
        key: "kali-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ क्रीं कालिकायै स्वाहा",
        transliteration: "Oṃ Krīṃ Kālikāyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "kali-dakshina",
        role: "extra",
        label: "Dakṣiṇā Kālikā mūla mantra",
        devanagari: "ॐ क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं दक्षिणे कालिके क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं स्वाहा",
        transliteration: "Oṃ Krīṃ Krīṃ Krīṃ Hūṃ Hūṃ Hrīṃ Hrīṃ Dakṣiṇe Kālike Krīṃ Krīṃ Krīṃ Hūṃ Hūṃ Hrīṃ Hrīṃ Svāhā",
        meaning:
          "The thirteen-syllable mūla mantra of Dakṣiṇā Kālī, widely published (Mahānirvāṇa Tantra lineage) but traditionally taken up as a japa practice under a teacher's guidance rather than casual repetition, the density of stacked bīja here is deliberate.",
        note: "Approach with real orientation and seriousness.",
      },
    ],
  },
  {
    slug: "tara",
    name: "Tara",
    accentColor: "#5B7C93",
    mantras: [
      {
        key: "tara-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "स्त्रीं",
        transliteration: "Strīṃ",
        meaning: "Tara's seed-sound, the sharp, sudden clarity that guides across a threshold or a fear.",
      },
      {
        key: "tara-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ तारायै विद्महे उग्रतारायै धीमहि तन्नो तारा प्रचोदयात्",
        transliteration: "Oṃ Tārāyai Vidmahe Ugra-tārāyai Dhīmahi Tanno Tārā Prachodayāt",
        meaning: "We come to know Tara, we meditate on the Fierce Tara, may that Star-Guide awaken and guide us.",
      },
      {
        key: "tara-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ स्त्रीं तारायै नमः",
        transliteration: "Oṃ Strīṃ Tārāyai Namaḥ",
        meaning: "Salutation to Tara, the accessible daily devotional form.",
      },
      {
        key: "tara-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ स्त्रीं तारायै स्वाहा",
        transliteration: "Oṃ Strīṃ Tārāyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "tara-mula",
        role: "extra",
        label: "Mūla mantra",
        devanagari: "ॐ ह्रीं स्त्रीं हूं फट्",
        transliteration: "Oṃ Hrīṃ Strīṃ Hūṃ Phaṭ",
        meaning:
          "The compact root mantra of Hindu Tantric Tara, wrathful, protective, cutting through confusion and paralysis with speed.",
      },
      {
        key: "tara-tibetan-note",
        role: "extra",
        label: "A note on the Buddhist Tara mantra",
        transliteration: "Oṃ Tāre Tuttāre Ture Svāhā",
        meaning:
          "Worth knowing rather than conflating: this is the Tibetan Buddhist mantra of Green Tara, from a related but distinct lineage. Same name, genuinely different transmission, the two Taras share a family resemblance, though the mantra and sādhanā differ.",
      },
    ],
  },
  {
    slug: "tripura-sundari",
    name: "Tripura Sundari",
    epithet: "Ṣoḍaśī",
    accentColor: "#C7A0A0",
    mantras: [
      {
        key: "tripura-bija",
        role: "bija",
        label: "Bīja (introductory)",
        devanagari: "ऐं",
        transliteration: "Aiṃ",
        meaning:
          "Vāgbhava, the \"speech-born\" seed, the opening bīja of the Śrīvidyā tradition. Her complete Pañcadaśākṣarī (fifteen-syllable) and Ṣoḍaśī (sixteen-syllable) mūla mantras are built from three such bīja-clusters.",
        note:
          "The full Pañcadaśākṣarī / Ṣoḍaśī mantra is traditionally transmitted only through direct Śrīvidyā dīkṣā from a qualified guru. It is deliberately not printed here. That boundary is part of the tradition's own structure.",
      },
      {
        key: "tripura-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ त्रिपुरसुन्दर्यै च विद्महे कामेश्वर्यै च धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Tripura-sundaryai Cha Vidmahe Kāmeśvaryai Cha Dhīmahi Tanno Devī Prachodayāt",
        meaning: "We come to know Tripura Sundari, we meditate on the Mistress of Desire, may that Goddess awaken and guide us.",
      },
      {
        key: "tripura-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ ऐं ह्रीं श्रीं त्रिपुरसुन्दर्यै नमः",
        transliteration: "Oṃ Aiṃ Hrīṃ Śrīṃ Tripura-sundaryai Namaḥ",
        meaning: "An openly-shared devotional salutation using her three general bīja, distinct from the guarded initiatory mūla mantra above.",
      },
      {
        key: "tripura-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ ऐं ह्रीं श्रीं त्रिपुरसुन्दर्यै स्वाहा",
        transliteration: "Oṃ Aiṃ Hrīṃ Śrīṃ Tripura-sundaryai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "tripura-bala",
        role: "extra",
        label: "Bālā Tripura Sundari mantra",
        devanagari: "ऐं क्लीं सौः",
        transliteration: "Aiṃ Klīṃ Sauḥ",
        meaning:
          "The mantra of Bālā, the \"child\" form of Tripura Sundari, three seeds, openly taught (unlike her adult Pañcadaśākṣarī), traditionally the doorway a practitioner is given before, or instead of, full Śrīvidyā initiation.",
      },
      {
        key: "tripura-shrimatre",
        role: "extra",
        label: "Śrī Mātre Namaḥ",
        devanagari: "ॐ श्री मात्रे नमः",
        transliteration: "Oṃ Śrī Mātre Namaḥ",
        meaning:
          "\"Salutation to the Auspicious Mother\", the opening line of the Lalitā Sahasranāma, universally chanted before her thousand names, and safe to use as a simple daily invocation.",
      },
    ],
  },
  {
    slug: "bhuvaneshvari",
    name: "Bhuvaneshvari",
    accentColor: "#7A8C6B",
    mantras: [
      {
        key: "bhuvaneshvari-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "ह्रीं",
        transliteration: "Hrīṃ",
        meaning: "The māyā bīja, space itself as container, the field within which every form arises. Bhuvaneshvari's own primary seed.",
      },
      {
        key: "bhuvaneshvari-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ भुवनेश्वर्यै विद्महे महेश्वर्यै धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Bhuvaneśvaryai Vidmahe Maheśvaryai Dhīmahi Tanno Devī Prachodayāt",
        meaning: "We come to know the Queen of the Worlds, we meditate on the Great Sovereign, may that Goddess awaken and guide us.",
      },
      {
        key: "bhuvaneshvari-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ ह्रीं भुवनेश्वर्यै नमः",
        transliteration: "Oṃ Hrīṃ Bhuvaneśvaryai Namaḥ",
        meaning: "Salutation to the Queen of Space, the accessible daily devotional form.",
      },
      {
        key: "bhuvaneshvari-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ ह्रीं भुवनेश्वर्यै स्वाहा",
        transliteration: "Oṃ Hrīṃ Bhuvaneśvaryai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "bhuvaneshvari-extended",
        role: "extra",
        label: "Extended tantric form",
        devanagari: "ॐ ह्रीं श्रीं ह्रीं भुवनेश्वर्यै नमः",
        transliteration: "Oṃ Hrīṃ Śrīṃ Hrīṃ Bhuvaneśvaryai Namaḥ",
        meaning:
          "A stacked-bīja elaboration used in longer sādhanā, framing the Hrīṃ that opens and closes it around Śrīṃ, space wrapped around abundance.",
      },
    ],
  },
  {
    slug: "bhairavi",
    name: "Bhairavi",
    epithet: "Tripura Bhairavi",
    accentColor: "#6B2F3A",
    mantras: [
      {
        key: "bhairavi-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "ह्स्रैं",
        transliteration: "Hsraiṃ",
        meaning:
          "Bhairavi's own compound seed, several traditions render her full mūla mantra as an extended chain built on this bīja (e.g. \"Hsraiṃ Hasakalarīṃ Hasakahalahrīṃ Sakalahrīṃ Sauḥ\"). Given as a name and starting point rather than a full prescription here.",
      },
      {
        key: "bhairavi-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ भैरव्यै च विद्महे भीमनयनायै च धीमहि तन्नो भैरवी प्रचोदयात्",
        transliteration: "Oṃ Bhairavyai Cha Vidmahe Bhīma-nayanāyai Cha Dhīmahi Tanno Bhairavī Prachodayāt",
        meaning: "We come to know Bhairavi, we meditate on she of the terrible eye, may Bhairavi awaken and guide us.",
      },
      {
        key: "bhairavi-namaha",
        role: "namaha",
        label: "Om … Namaha (accessible form)",
        devanagari: "ॐ ह्रीं भैरव्यै नमः",
        transliteration: "Oṃ Hrīṃ Bhairavyai Namaḥ",
        meaning:
          "A simplified, openly-used devotional salutation with her general bīja Hrīṃ, the fuller compound mūla mantra above is generally reserved for direct initiatory transmission.",
      },
      {
        key: "bhairavi-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ ह्रीं भैरव्यै स्वाहा",
        transliteration: "Oṃ Hrīṃ Bhairavyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
    ],
  },
  {
    slug: "chinnamasta",
    name: "Chinnamasta",
    accentColor: "#8C1F1F",
    mantras: [
      {
        key: "chinnamasta-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "श्रीं",
        transliteration: "Śrīṃ",
        meaning:
          "The seed that opens her mūla mantra, paired here with Hrīṃ, Klīṃ, and Aiṃ in her full form below; abundance, dissolution, and desire compressed together, exactly as her image holds them.",
      },
      {
        key: "chinnamasta-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ वज्रवैरोचन्यै विद्महे छिन्नमस्तायै धीमहि तन्नो छिन्नमस्ता प्रचोदयात्",
        transliteration: "Oṃ Vajra-vairochanyai Vidmahe Chinnamastāyai Dhīmahi Tanno Chinnamastā Prachodayāt",
        meaning: "We come to know Vajra Vairochani, we meditate on the Self-Severed One, may Chinnamasta awaken and guide us.",
      },
      {
        key: "chinnamasta-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ श्रीं ह्रीं क्लीं छिन्नमस्तायै नमः",
        transliteration: "Oṃ Śrīṃ Hrīṃ Klīṃ Chinnamastāyai Namaḥ",
        meaning: "Salutation using her three primary bīja, an accessible devotional form.",
      },
      {
        key: "chinnamasta-mula",
        role: "extra",
        label: "Mūla mantra",
        devanagari: "श्रीं ह्रीं क्लीं ऐं वज्रवैरोचनीयै हूं हूं फट् स्वाहा",
        transliteration: "Śrīṃ Hrīṃ Klīṃ Aiṃ Vajra-vairochanīyai Hūṃ Hūṃ Phaṭ Svāhā",
        meaning:
          "Her full published root mantra, four bīja, her epithet, and a double Hūṃ-Phaṭ close. This is intense practice: self-offering, the cutting of ego and attachment. Best undertaken with real orientation and, ideally, guidance.",
        note: "Widely published, genuinely advanced. Approach deliberately.",
      },
    ],
  },
  {
    slug: "dhumavati",
    name: "Dhumavati",
    accentColor: "#5A5347",
    mantras: [
      {
        key: "dhumavati-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "धूं",
        transliteration: "Dhūṃ",
        meaning: "The seed of smoke itself, what is left when the fire has gone out; the widow, the unwanted, what nobody else will sit with.",
      },
      {
        key: "dhumavati-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ धूमावत्यै च विद्महे सर्वसिद्धिप्रदायै च धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Dhūmāvatyai Cha Vidmahe Sarva-siddhi-pradāyai Cha Dhīmahi Tanno Devī Prachodayāt",
        meaning: "We come to know Dhumavati, we meditate on she who grants every siddhi, may that Goddess awaken and guide us.",
      },
      {
        key: "dhumavati-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ धूं धूमावत्यै नमः",
        transliteration: "Oṃ Dhūṃ Dhūmāvatyai Namaḥ",
        meaning: "Salutation to Dhumavati, the accessible daily devotional form.",
      },
      {
        key: "dhumavati-swaha",
        role: "swaha",
        label: "Om … Svāhā (mūla)",
        devanagari: "ॐ धूं धूं धूमावती देव्यै स्वाहा",
        transliteration: "Oṃ Dhūṃ Dhūṃ Dhūmāvatī Devyai Svāhā",
        meaning: "Her most commonly published mūla mantra, the doubled Dhūṃ is characteristic and used across most lineages.",
      },
      {
        key: "dhumavati-thah",
        role: "extra",
        label: "Alternate close (a fiercer variant)",
        devanagari: "धूं धूं धूमावती ठः ठः",
        transliteration: "Dhūṃ Dhūṃ Dhūmāvatī Ṭhaḥ Ṭhaḥ",
        meaning:
          "A variant closing found in some lineages, ending on the sharper Ṭhaḥ rather than Svāhā, worth knowing rather than treating one form as the single correct one; this is a goddess whose worship genuinely resists standardization.",
      },
    ],
  },
  {
    slug: "bagalamukhi",
    name: "Bagalamukhi",
    accentColor: "#C79B2E",
    mantras: [
      {
        key: "bagalamukhi-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "ह्लीं",
        transliteration: "Hlīṃ",
        meaning: "The stambhana bīja, the force of stilling, binding, holding something in place before it can act.",
      },
      {
        key: "bagalamukhi-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ बगलामुख्यै च विद्महे स्तम्भिन्यै च धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Bagalāmukhyai Cha Vidmahe Stambhinyai Cha Dhīmahi Tanno Devī Prachodayāt",
        meaning: "We come to know Bagalamukhi, we meditate on the Stiller, may that Goddess awaken and guide us.",
      },
      {
        key: "bagalamukhi-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ ह्लीं बगलामुख्यै नमः",
        transliteration: "Oṃ Hlīṃ Bagalāmukhyai Namaḥ",
        meaning: "Salutation to Bagalamukhi, accessible daily devotional form.",
      },
      {
        key: "bagalamukhi-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ ह्लीं बगलामुख्यै स्वाहा",
        transliteration: "Oṃ Hlīṃ Bagalāmukhyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "bagalamukhi-stambhana",
        role: "extra",
        label: "Stambhana mūla mantra",
        devanagari:
          "ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा",
        transliteration:
          "Oṃ Hlīṃ Bagalāmukhi Sarva-duṣṭānāṃ Vācham Mukham Padam Stambhaya Jihvām Kīlaya Buddhiṃ Vināśaya Hlīṃ Oṃ Svāhā",
        meaning:
          "Her signature mūla mantra, \"still the speech, the mouth, the step of all who mean harm; nail their tongue, dissolve their false understanding.\" A precision instrument, traditionally used to neutralize deception, slander, or a specific hostile intent, not for generalized domination of others. Ethical use matters here as much as correct pronunciation.",
      },
    ],
  },
  {
    slug: "matangi",
    name: "Matangi",
    accentColor: "#4A5C3A",
    mantras: [
      {
        key: "matangi-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "ह्रीं",
        transliteration: "Hrīṃ",
        meaning: "Paired with Klīṃ in her mūla mantra below, Matangi's own seed of speech and enchantment, the Chandala outsider's sound.",
      },
      {
        key: "matangi-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ मातङ्ग्यै च विद्महे उच्छिष्टचाण्डालिन्यै च धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Mātaṅgyai Cha Vidmahe Ucchiṣṭa-chāṇḍālinyai Cha Dhīmahi Tanno Devī Prachodayāt",
        meaning:
          "We come to know Matangi, we meditate on she of the leftover offerings, the outcaste one, may that Goddess awaken and guide us.",
      },
      {
        key: "matangi-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ ह्रीं क्लीं मातङ्ग्यै नमः",
        transliteration: "Oṃ Hrīṃ Klīṃ Mātaṅgyai Namaḥ",
        meaning: "Salutation to Matangi, accessible daily devotional form.",
      },
      {
        key: "matangi-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ ह्रीं क्लीं मातङ्ग्यै स्वाहा",
        transliteration: "Oṃ Hrīṃ Klīṃ Mātaṅgyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "matangi-mula",
        role: "extra",
        label: "Mūla mantra",
        devanagari: "ॐ ह्रीं क्लीं हूं मातङ्ग्यै फट् स्वाहा",
        transliteration: "Oṃ Hrīṃ Klīṃ Hūṃ Mātaṅgyai Phaṭ Svāhā",
        meaning:
          "Her fuller published root mantra, an especially good companion practice for anyone working with voice, music, teaching, or any art that lives through what's normally considered impure or leftover material.",
      },
    ],
  },
  {
    slug: "kamala",
    name: "Kamala",
    accentColor: "#C77B3E",
    mantras: [
      {
        key: "kamala-bija",
        role: "bija",
        label: "Bīja (seed) mantra",
        devanagari: "श्रीं",
        transliteration: "Śrīṃ",
        meaning: "Shared with Lakshmi, of whom Kamala is a Mahavidya form, the lotus goddess seated on the lotus, abundance without grasping.",
      },
      {
        key: "kamala-gayatri",
        role: "gayatri",
        label: "Gāyatrī",
        devanagari: "ॐ कमलात्मिकायै विद्महे पद्महस्तायै धीमहि तन्नो देवी प्रचोदयात्",
        transliteration: "Oṃ Kamalātmikāyai Vidmahe Padma-hastāyai Dhīmahi Tanno Devī Prachodayāt",
        meaning: "We come to know she whose very nature is the lotus, we meditate on she who holds the lotus, may that Goddess awaken and guide us.",
      },
      {
        key: "kamala-namaha",
        role: "namaha",
        label: "Om … Namaha",
        devanagari: "ॐ श्रीं कमलात्मिकायै नमः",
        transliteration: "Oṃ Śrīṃ Kamalātmikāyai Namaḥ",
        meaning: "Salutation to Kamala, accessible daily devotional form.",
      },
      {
        key: "kamala-swaha",
        role: "swaha",
        label: "Om … Svāhā",
        devanagari: "ॐ श्रीं कमलात्मिकायै स्वाहा",
        transliteration: "Oṃ Śrīṃ Kamalātmikāyai Svāhā",
        meaning: "Offering form, for use with an actual oblation.",
      },
      {
        key: "kamala-shared",
        role: "extra",
        label: "Shared Lakshmi elaboration",
        devanagari: "ॐ ह्रीं श्रीं क्लीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं ॐ महालक्ष्म्यै नमः",
        transliteration: "Oṃ Hrīṃ Śrīṃ Klīṃ Kamale Kamalālaye Prasīda Prasīda Śrīṃ Hrīṃ Oṃ Mahālakṣmyai Namaḥ",
        meaning:
          "The same fuller mantra used for Lakshmi worship, given here for continuity, the two are worshipped through the same root sound-material, which is worth showing directly rather than treating as separate systems.",
      },
    ],
  },
];

export function findMantraDeity(slug: string): MantraDeity | undefined {
  return mantraDeities.find((d) => d.slug === slug);
}
