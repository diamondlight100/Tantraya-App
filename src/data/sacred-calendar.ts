// Sacred calendar: important observance days across the traditions represented in Tantraya.
// Dates are fixed for 2026 (most are lunar/lunisolar and shift year to year — this list is
// re-verified and updated annually; see date source note per entry where it matters).
// Tradition tags let the widget badge/filter by lineage.

export type SacredTradition = "tantric" | "yogic" | "buddhist" | "daoist" | "shamanic";

export interface SacredCalendarDay {
  slug: string;
  name: string;
  sanskritOrNative?: string;
  date: string; // YYYY-MM-DD, 2026
  tradition: SacredTradition[];
  deity?: string;
  summary: string;
  practiceNote: string;
}

export const sacredCalendar2026: SacredCalendarDay[] = [
  {
    slug: "makar-sankranti",
    name: "Makar Sankranti",
    date: "2026-01-14",
    tradition: ["tantric", "yogic"],
    summary:
      "The sun's entry into Capricorn (Makara), marking the start of its northward course, Uttarayana. Considered one of the few dates fixed to the solar rather than lunar calendar.",
    practiceNote:
      "Traditionally held as auspicious for beginning new sadhana, dana (giving), and for sun-facing practice. A good marker for reviewing intentions set at the turn of the year.",
  },
  {
    slug: "ratanti-kali-puja",
    name: "Ratanti Kali Puja",
    sanskritOrNative: "काली",
    date: "2026-01-17",
    tradition: ["tantric"],
    deity: "Kali",
    summary:
      "A Krishna-paksha Kali puja falling on the chaturdashi before Magh amavasya, held in especially high regard in Bengal and Assam Shakta lineages, distinct from the main autumn Kali Puja.",
    practiceNote:
      "Night puja, japa, and homa to Kali are traditional. A natural date for intensified Mahavidya sadhana or a dedicated night-sit.",
  },
  {
    slug: "vasant-panchami",
    name: "Vasant Panchami",
    sanskritOrNative: "वसन्त पञ्चमी",
    date: "2026-01-23",
    tradition: ["tantric", "yogic"],
    deity: "Saraswati",
    summary:
      "Saraswati's day — goddess of speech, learning, music, and discrimination — marking the start of spring in the North Indian calendar.",
    practiceNote:
      "Traditional day to begin study, initiate children into letters, worship instruments and books, and open new practice or teaching cycles under Saraswati's blessing.",
  },
  {
    slug: "losar",
    name: "Losar (Tibetan New Year)",
    sanskritOrNative: "ལོ་གསར",
    date: "2026-02-18",
    tradition: ["buddhist"],
    summary:
      "Tibetan New Year, opening a lunar year of purification, protector offerings, and renewal, observed with three days of ritual, feasting, and monastic ceremony.",
    practiceNote:
      "A natural point for closing out unfinished practice commitments from the old year and setting fresh ones — many practitioners do protector pujas in the days just before.",
  },
  {
    slug: "maha-shivaratri",
    name: "Maha Shivaratri",
    sanskritOrNative: "महाशिवरात्रि",
    date: "2026-02-15",
    tradition: ["tantric", "yogic"],
    deity: "Shiva",
    summary:
      "The 'Great Night of Shiva' — the darkest night of the lunar month, held as the night Shiva performs the tandava and the veil between practitioner and the source is thinnest.",
    practiceNote:
      "The single most important night-vigil date on the tantric/yogic calendar: waking practice through the night, japa, abhisheka, and meditation are traditional rather than sleep.",
  },
  {
    slug: "gorakhnath-jayanti",
    name: "Gorakhnath Jayanti",
    sanskritOrNative: "गोरखनाथ जयंती",
    date: "2026-02-15",
    tradition: ["tantric", "yogic"],
    deity: "Gorakhnath",
    summary:
      "Birth anniversary of Guru Gorakhnath, founder-systematizer of the Nath sampradaya and a central figure behind Hatha Yoga's transmission, honored on Maha Shivaratri in most Nath lineages.",
    practiceNote:
      "A fitting day to honor the Nath lineage specifically within a Shivaratri vigil — asana, pranayama, and kaya-sadhana practices trace their transmission to this line.",
  },
  {
    slug: "tara-jayanti",
    name: "Tara Jayanti",
    sanskritOrNative: "तारा जयंती",
    date: "2026-03-26",
    tradition: ["tantric"],
    deity: "Tara",
    summary:
      "Birth/manifestation day of Tara, second of the Ten Mahavidyas, the guide across danger and the ocean of samsara, worshipped in both Hindu Shakta and Vajrayana Buddhist forms.",
    practiceNote:
      "Good day for dedicated Tara japa or nyasa, and to reflect on the two faces of Tara worshipped in this school — the fierce Mahavidya and the compassionate Buddhist Green/White Tara.",
  },
  {
    slug: "saga-dawa-duchen",
    name: "Saga Dawa Düchen",
    sanskritOrNative: "ས་ག་ཟླ་བ",
    date: "2026-05-31",
    tradition: ["buddhist"],
    summary:
      "Full moon marking the Buddha's birth, enlightenment, and parinirvana in the Tibetan tradition — the single most merit-multiplying day of the Tibetan lunar year, falling in the 'month of merit', Saga Dawa.",
    practiceNote:
      "Merit generated through practice, generosity, and precept-keeping is traditionally held to be multiplied many times over during this month, peaking on the full moon itself.",
  },
  {
    slug: "buddha-purnima",
    name: "Buddha Purnima (Vesak)",
    sanskritOrNative: "बुद्ध पूर्णिमा",
    date: "2026-05-31",
    tradition: ["buddhist"],
    summary:
      "South and Southeast Asian Theravada observance of the Buddha's birth, enlightenment, and parinirvana, falling on the same full moon as Saga Dawa this year.",
    practiceNote:
      "A day for sila (precepts), dana, and extended sitting — many students mark it with a full day of practice rather than a single session.",
  },
  {
    slug: "guru-purnima",
    name: "Guru Purnima",
    sanskritOrNative: "गुरु पूर्णिमा",
    date: "2026-07-29",
    tradition: ["tantric", "yogic", "buddhist"],
    summary:
      "Full moon honoring the guru principle across yogic, tantric, and Buddhist lineages alike, traditionally linked to Vyasa and, in Buddhist contexts, to the Buddha's first turning of the wheel of dharma.",
    practiceNote:
      "The traditional day to renew devotion to one's lineage and teachers, make offerings, and reflect on what has actually been transmitted and integrated over the past year.",
  },
  {
    slug: "krishna-janmashtami",
    name: "Krishna Janmashtami",
    sanskritOrNative: "कृष्ण जन्माष्टमी",
    date: "2026-09-04",
    tradition: ["tantric", "yogic"],
    deity: "Krishna",
    summary:
      "Birth of Krishna, celebrated with a midnight vigil, fasting through the day, and devotional practice culminating at the hour of his traditional birth.",
    practiceNote:
      "Fasting followed by a midnight puja/kirtan is the classical form — a good template for any single-deity vigil day in this school's calendar.",
  },
  {
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    sanskritOrNative: "गणेश चतुर्थी",
    date: "2026-09-14",
    tradition: ["tantric", "yogic"],
    deity: "Ganesh",
    summary:
      "Ganesh's birthday, opening ten days of public and home worship of the remover of obstacles, closing with visarjan (immersion) of his image.",
    practiceNote:
      "Traditional day to renew Ganesh nyasa/mantra practice at the start of any new undertaking — fitting for launching a course, retreat cycle, or personal project.",
  },
  {
    slug: "navratri-durga-puja",
    name: "Navaratri / Durga Puja",
    sanskritOrNative: "नवरात्रि",
    date: "2026-10-11",
    tradition: ["tantric"],
    deity: "Durga",
    summary:
      "Nine nights dedicated to the nine forms of Durga, building to Vijayadashami — the single largest devotional cycle on the Shakta calendar, running Oct 11–20, 2026.",
    practiceNote:
      "Each night is traditionally assigned to one form of the Navadurga — a strong container for a nine-day intensive of Devi sadhana, one form per night.",
  },
  {
    slug: "vijayadashami",
    name: "Vijayadashami (Dussehra)",
    sanskritOrNative: "विजयादशमी",
    date: "2026-10-20",
    tradition: ["tantric"],
    deity: "Durga",
    summary:
      "The tenth day, closing Navaratri, marking Durga's victory over Mahishasura and Rama's victory over Ravana — a festival of consecrated new beginnings.",
    practiceNote:
      "Traditionally the day to begin new study (vidyarambha) and consecrate new tools, texts, or instruments used in practice.",
  },
  {
    slug: "kali-puja-diwali",
    name: "Kali Puja & Diwali",
    sanskritOrNative: "काली पूजा · दीपावली",
    date: "2026-11-08",
    tradition: ["tantric"],
    deity: "Kali",
    summary:
      "Bengal's Kali Puja falls on the same amavasya night as Diwali/Lakshmi Puja — the darkest night of the year given over to Kali in the east of India, and to Lakshmi elsewhere.",
    practiceNote:
      "The paradigmatic night for Kali sadhana — worship performed in darkness, at the new moon, oriented toward the ground of being rather than its display.",
  },
  {
    slug: "guru-nanak-jayanti",
    name: "Guru Nanak Jayanti",
    sanskritOrNative: "गुरु नानक जयंती",
    date: "2026-11-24",
    tradition: ["yogic"],
    summary:
      "Birth anniversary of Guru Nanak, founder of the Sikh tradition, whose bhakti and nirguna teachings intersect closely with the broader North Indian yogic and Nath currents.",
    practiceNote:
      "Included here for the students working across bhakti and Nath material — a day of kirtan and reflection on the guru-disciple relationship in its devotional form.",
  },
  {
    slug: "jade-emperor-birthday",
    name: "Jade Emperor's Birthday",
    sanskritOrNative: "玉皇上帝聖誕",
    date: "2026-02-21",
    tradition: ["daoist"],
    summary:
      "Birthday of the Jade Emperor, the supreme deity of the traditional Daoist celestial bureaucracy, marked at midnight with incense, offerings, and thanksgiving.",
    practiceNote:
      "Traditional day for renewing vows and offerings to the celestial officials — a fitting anchor point for any yearly Daoist ritual calendar in this school.",
  },
  {
    slug: "qingming",
    name: "Qingming (Tomb-Sweeping Day)",
    sanskritOrNative: "清明節",
    date: "2026-04-05",
    tradition: ["daoist"],
    summary:
      "The 'clear and bright' solar term, when ancestors' graves are tended and offerings made — one of the few Daoist/Chinese observances fixed to the solar calendar rather than the lunar one.",
    practiceNote:
      "A natural day for ancestor work, and, in a shamanic frame, for tending the lineage of the dead more broadly, not only blood ancestors.",
  },
  {
    slug: "zhongyuan-jie",
    name: "Zhongyuan Jie (Ghost Festival)",
    sanskritOrNative: "中元節",
    date: "2026-08-27",
    tradition: ["daoist"],
    summary:
      "The Daoist Ghost Festival, mid-point of the seventh lunar month, when the gates between worlds are held open and offerings are made to wandering spirits and ancestors alike.",
    practiceNote:
      "Traditional night for ancestor and spirit offerings — of interest to students working the shamanic and Daoist material side by side.",
  },
  {
    slug: "laozi-birthday",
    name: "Birthday of Laozi",
    sanskritOrNative: "老子聖誕",
    date: "2026-03-07",
    tradition: ["daoist"],
    summary:
      "Traditional birthday of Laozi, attributed founder of Daoism and author of the Daodejing, observed on the 15th day of the second lunar month.",
    practiceNote:
      "A day to return to the Daodejing directly rather than secondary material — reading a chapter aloud before sitting is a simple, traditional way to mark it.",
  },
];

export function upcomingSacredDays(from: Date = new Date(), count = 5): SacredCalendarDay[] {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const withDates = sacredCalendar2026
    .map((d) => ({ ...d, _d: new Date(`${d.date}T00:00:00`) }))
    .sort((a, b) => a._d.getTime() - b._d.getTime());

  const upcoming = withDates.filter((d) => d._d.getTime() >= today.getTime());
  const list = upcoming.length > 0 ? upcoming : withDates; // year wrapped past Dec — fall back to full list
  return list.slice(0, count).map(({ _d: _drop, ...rest }) => rest);
}

export function sacredDayToday(from: Date = new Date()): SacredCalendarDay | undefined {
  const today = from.toISOString().slice(0, 10);
  return sacredCalendar2026.find((d) => d.date === today);
}
