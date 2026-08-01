export type CosmologyHotspot = {
  id: string;
  label: string;
  /** Position of the hotspot marker as a percentage of the map image's width/height. */
  x: number;
  y: number;
  body: string;
};

export const tantricCosmologyIntro =
  "At the centre, two interlocking triangles around a point: Śiva and Śakti, beneath and prior to the thirty-six tattvas ringing outward from it. Tap any marker on the map to open that part of the teaching.";

export const tantricCosmologyHotspots: CosmologyHotspot[] = [
  {
    id: "embrace",
    label: "Śiva and Śakti: the first ripple",
    x: 50,
    y: 47.8,
    body: "Everything that moves is Śakti, the Goddess as pure activity. The Ground in which every movement arises is Śiva, awareness aware of its own stillness. The two are spoken of separately only for the sake of speaking; what actually is, always, is both together, with no gap between them. The Spanda tradition names the subtlest possible movement within this stillness as the first ripple, the primordial throb by which the still Ground first stirs as its own Energy — still happening, complete in itself at every scale, the way a hologram's smallest fragment carries the whole image.",
  },
  {
    id: "tattvas",
    label: "The thirty-six tattvas",
    x: 75,
    y: 29,
    body: "The five Śuddha Tattvas — Śiva, Śakti, Sadāśiva, Īśvara, Śuddhavidyā — are recognition itself unfolding in stages. Māyā and her five kañcukas then cloak that recognition without severing it: Kalā limits infinite creativity into partial capacity, Vidyā limits omniscience into partial knowledge, Rāga turns fullness into desire, Kāla divides simultaneity into before and after, and Niyati limits total freedom into this, here, now — this six-fold band is where we first encounter the realm of manifested reality. The twenty-five Aśuddha Tattvas that follow are the whole of what we ordinarily call a person and a world: Puruṣa and Prakṛti, the inner instrument, the senses, the organs of action, the subtle tanmātras, and the five gross elements in which all of this becomes a solid, walkable world.",
  },
  {
    id: "kala",
    label: "Kālī as Time, Śiva as the Eternal",
    x: 50,
    y: 16.5,
    body: "Kālī takes her name from Kāla, time itself, danced as movement without pause, devouring and creating, on a ground that does not move. That ground is Śiva, the Eternal, uncaught by time or space because both arise from the deeper embrace this map describes. Kālī's dance and Śiva's stillness are this same Śiva-Śakti embrace at its most visible: the Goddess as all activity, the Ground that holds it and is never exhausted by any of it.",
  },
  {
    id: "shiva",
    label: "Neither inside nor outside",
    x: 50,
    y: 80,
    body: "Does the world sit inside Śiva, the way a room sits inside a house? Containment is a spatial relation, and Śiva is prior to space. Yet nothing exists apart from this Ground for even an instant, so it is not simply outside either. Both are true together, and even that combined answer still turns the matter into a position to be settled. What remains, once every position has been passed through, is the embrace itself, prior to inside and outside, holding both possible answers the way Śiva holds Śakti's movement and his own stillness, at once.",
  },
  {
    id: "desire",
    label: "Desire, and the whole at every point",
    x: 88.5,
    y: 47.8,
    body: "Desire here is not suppressed, nor indulged as an end in itself. It is recognised as Śiva and Śakti's desire for each other, playing out through every desiring body and mind — the pull toward another, toward beauty, toward union, is this same magnetism, worn by two apparently separate beings who are, underneath, the single embrace at the centre of this map. Worked with directly, that intensity becomes a doorway, Śiva and Śakti recognising each other, again, through you. And this recognition is never partial: every tattva, every breath, every point on this map carries the entire pattern within it. The centre is not more real than the rim, because there is no smaller version of Śiva-Śakti than the whole.",
  },
];
