// The 64 Hexagrams, King Wen sequence and numbering (the traditional
// ordering itself is ancient, public-domain structure, not any modern
// translator's copyrighted wording). All judgment, image, and line texts
// below are original composition, written in an image-first, oracular,
// Daoist-shamanic register (in the interpretive lineage of Stephen Karcher
// and Benebell Wen) rather than the Wilhelm/Baynes Confucian-psychological
// voice. Nothing here is moralizing or prescriptive, it describes a
// living situation and lets the image do the teaching.
//
// Lines are stored bottom to top (position 1 = bottom/first line drawn,
// position 6 = top/last line drawn), matching how a hexagram is actually
// built in divination.

import { type TrigramKey, trigramByBits } from "./iching-trigrams";

export type Hexagram = {
  number: number;
  chinese: string;
  pinyin: string;
  english: string;
  upper: TrigramKey;
  lower: TrigramKey;
  keywords: string[];
  judgment: string;
  image: string;
  /** bottom to top, index 0 = line 1 */
  lines: [string, string, string, string, string, string];
};

export const hexagrams: Hexagram[] = [
  {
    number: 1, chinese: "乾", pinyin: "Qián", english: "The Creative",
    upper: "qian", lower: "qian",
    keywords: ["Force", "Origin", "Unopposed initiative"],
    judgment: "Pure yang, six unbroken lines, force meeting no resistance because there is nothing yet to resist it. This is the moment of undiluted beginning, act now while the way is genuinely open, but know that six dragons flying at once cannot be sustained forever.",
    image: "Heaven in motion, one turning force without pause. The sign is self-renewing strength, a wheel that keeps its own momentum.",
    lines: [
      "The dragon is hidden below the ground. The force is real but not yet timed, wait, do not act from an idea whose hour has not come.",
      "The dragon appears in the field. It is visible now, worth seeking counsel and allies who can see it too, but it has not yet taken the sky.",
      "All day the sign of strength is active, watchful even at night as if in danger. Effort at its peak still needs vigilance.",
      "The dragon leaps, or hesitates over the deep. This is the crossing point, the leap that is right for this moment will not be wrong for trying it.",
      "The dragon flies in the heavens. Full power meeting full opportunity, the ideal position, seek the counsel of one who can match it.",
      "The dragon overreaches, flown too high. Force without a field to act in becomes its own undoing, arrogance follows unchecked power.",
    ],
  },
  {
    number: 2, chinese: "坤", pinyin: "Kūn", english: "The Receptive",
    upper: "kun", lower: "kun",
    keywords: ["Field", "Devotion", "Yielding strength"],
    judgment: "Pure yin, the mare that carries the rider without resisting the road. Gain by following rather than leading, the one who tries to go first here loses the way, the one who follows finds a companion and a home.",
    image: "Earth's nature is devotion, boundless capacity that carries all things without picking favourites. Thick as the earth, virtue that supports without demanding credit.",
    lines: [
      "Frost underfoot, the first sign that solid ice is coming. Read small cold signs early, what begins in yin builds by its own accumulating logic.",
      "Straight, square, great, no need to force it, nothing here fails to further. Aligned receptivity accomplishes without contriving anything.",
      "Hidden lines, capacity kept in reserve. Serve a higher affair without claiming the completion as your own, the achievement ripens later.",
      "A tied sack, bound and closed. A time to withdraw visible activity entirely, neither blame nor praise reach the one who withholds now.",
      "A yellow lower garment, the color of earth worn close to the body. Central, genuine, unshowy excellence, supreme good fortune found in modesty done well.",
      "Dragons fight in the wild field, their blood dark and yellow mixed. Pure yin pushed to its limit meets yang and the two clash, a warning against yin that forgets its own nature and tries to rule alone.",
    ],
  },
  {
    number: 3, chinese: "屯", pinyin: "Zhūn", english: "Difficulty at the Beginning",
    upper: "kan", lower: "zhen",
    keywords: ["Sprouting", "Birth pains", "Chaotic beginning"],
    judgment: "Water above Thunder, a seed pushing up through packed, wet soil. Great progress and success are truly possible, but not yet, not by forcing straight ahead, help is needed and this is exactly the hour to seek it.",
    image: "Clouds and thunder before the rain breaks. The noble one sorts the threads of a tangled situation rather than cutting them.",
    lines: [
      "Hesitation and circling, unable to advance. Better to hold ground and gather good help than push into a birth that isn't ready.",
      "Difficulties pile up, a suitor is refused ten years before finally being right. Delay here is not failure, the timing simply is not yet true.",
      "Chasing deer without a guide, only led deeper into the forest. Abandon the chase, continuing without proper support only wastes what's left.",
      "Riding, then dismounting to seek a match. Going forward brings good fortune, nothing here fails to further once the right ally is asked.",
      "Difficulty even in giving out what is stored. Small steadfastness brings luck, sudden large action now will not hold.",
      "Riding, weeping bloody tears. The birth-crisis has gone on too long unaided, exhaustion at the edge of the struggle, a hard lesson in asking sooner.",
    ],
  },
  {
    number: 4, chinese: "蒙", pinyin: "Méng", english: "Youthful Folly",
    upper: "gen", lower: "kan",
    keywords: ["Inexperience", "Not-knowing", "Teachable moment"],
    judgment: "Mountain over Water, a spring at the base of a peak. It is not I who seeks the young fool, the young fool seeks me, the first sincere question is answered, repeated testing insults the oracle and gets silence.",
    image: "A spring emerging at the foot of the mountain. The noble one makes character firm by the energy of the deed, education through doing.",
    lines: [
      "Folly needs discipline to develop, use the punishment that fits to remove shackles, going further after this would bring humiliation. The first correction matters more than the tenth.",
      "Bear with fools in kindness, good fortune. Take a wife, good fortune, the son can now manage the household. Patience with the untrained produces a real successor.",
      "Do not take the maiden who throws herself at whoever has money, nothing to be gained here. Attraction without discernment is not a teacher, only a trap dressed as opportunity.",
      "Entangled folly brings humiliation. Isolated from any real guide, ignorance hardens into something that shames itself further the longer it stays unaddressed.",
      "Childlike folly brings good fortune. Genuine, undefended not-knowing, offered honestly to a real teacher, is the most teachable state there is.",
      "Punish folly, but not by turning to violence, only by guarding well against what would harm from without. Discipline that protects rather than attacks is what actually corrects.",
    ],
  },
  {
    number: 5, chinese: "需", pinyin: "Xū", english: "Waiting",
    upper: "kan", lower: "qian",
    keywords: ["Nourishment", "Patience", "Waiting for the true moment"],
    judgment: "Water above Heaven, the danger not yet reached, clouds gathered but rain not fallen. Sincerity brings shining success, perseverance brings good fortune, it is worth crossing the great water, but only after the waiting has been done in full, well fed and genuinely ready.",
    image: "Clouds rise up to heaven, the image of waiting. The noble one eats, drinks, and is genuinely at peace, waiting is a practice.",
    lines: [
      "Waiting in the meadow, far from danger. Use this time for what is constant and unremarkable, no blame in resting where the ground is still safe.",
      "Waiting on the sand, closer to the water. Idle talk starts to arrive, in the end, good fortune, stay steady through the gossip that always comes before real risk.",
      "Waiting in the mud, danger draws near from outside. Bring on the robbers by careless exposure, this is the closest edge, extra care changes the outcome.",
      "Waiting in blood, coming out from the pit. The danger has actually arrived, listen, and a way through does open, even from inside the wound.",
      "Waiting at wine and food, quiet and steady. Perseverance brings good fortune, the wait is not wasted, this is the moment the nourishment was for.",
      "Falling into the pit, but three uninvited guests arrive. Unlooked-for help meets one who receives them with genuine respect, in the end good fortune, even from the pit.",
    ],
  },
  {
    number: 6, chinese: "訟", pinyin: "Sòng", english: "Conflict",
    upper: "qian", lower: "kan",
    keywords: ["Dispute", "Contested claim", "Know when to stop"],
    judgment: "Heaven above Water, moving in opposite directions, contradiction built into the structure itself. There is real cause here, but caution throughout brings good fortune, going all the way to a fight brings misfortune, better to see a great man.",
    image: "Heaven and Water travel apart from the very start. The noble one, at the outset of any undertaking, takes careful thought about how it might end in dispute.",
    lines: [
      "Not perpetuating an old grievance, small blame, but in the end good fortune. Let a minor complaint stay minor, dropping it early costs less than it looks like it costs.",
      "Cannot win the contest, retreat, escape, no blame reaches the small group of three hundred households. Knowing when a fight cannot be won and stepping back keeps the community safe.",
      "Living on old virtue, perseverance, danger, in the end good fortune. Should one serve the king's affairs, seek no personal credit for it. Steadiness through an old, unresolved tension pays off, quietly.",
      "Cannot win the contest, turns back, changes course, finds peace in what's constant, good fortune. Reversing a losing position is the actual skill here.",
      "Contending, supreme good fortune. The rightly placed judge settles the matter cleanly, this is the position from which real resolution becomes possible.",
      "Given a ceremonial sash, stripped of it three times before the morning ends. Winning the contest itself becomes the very thing that unravels the win, total victory in conflict rarely holds.",
    ],
  },
  {
    number: 7, chinese: "師", pinyin: "Shī", english: "The Army",
    upper: "kun", lower: "kan",
    keywords: ["Disciplined mass", "Legitimate authority", "Collective effort"],
    judgment: "Earth above Water, the multitude, danger contained within by discipline. Perseverance, and a strong, experienced person to lead, brings good fortune, no blame, but the cause must be genuinely just, mass movement without a righteous aim only compounds harm.",
    image: "In the middle of the Earth is Water, the army hidden within the mass. The noble one, following this, increases the masses by generosity toward the people.",
    lines: [
      "An army sets out with proper order, otherwise, good fortune turns to misfortune regardless of the outcome. Discipline at the very start decides everything that follows.",
      "In the middle of the army, the king bestows a triple honor. A leader trusted at the center of the action, holding real authority earns real result.",
      "Perhaps the army carries corpses in a wagon, misfortune. Command divided or corrupted at the center spoils the whole effort, no matter its scale.",
      "The army retreats, no blame. Knowing when to fall back, rather than force a doomed advance, is itself a form of skillful command.",
      "Game in the field, worth catching, no blame, let the eldest lead the army. If younger sons carry corpses in the wagon, even a just cause turns to misfortune, put real experience in front.",
      "The great ruler issues commands, founding states and receiving fiefs, but inferior people should not be employed. Reward the disciplined at the end of the campaign, do not hand real power to those who only followed for gain.",
    ],
  },
  {
    number: 8, chinese: "比", pinyin: "Bǐ", english: "Holding Together",
    upper: "kan", lower: "kun",
    keywords: ["Alliance", "Union", "Choosing the center"],
    judgment: "Water above Earth, seeping into every low place, union without a gap. Good fortune, but examine yourself again as through oracle, sincerity, constancy, and lasting steadiness, and there is no blame, those still hesitant arrive late and find the door already closing.",
    image: "Water rests upon the Earth, union. The ancient kings, following this, established the myriad states and cultivated friendly relations with the feudal lords, holding together by genuine bond.",
    lines: [
      "Held together with sincerity, no blame. Sincerity like a full earthen bowl, in the end other good fortune arrives from unexpected quarters. A genuine bond made early draws more to it.",
      "Held together from within, perseverance brings good fortune. Union that begins from one's own center holds real weight.",
      "Held together with the wrong people. Alliance made from desperation or convenience, rather than real resonance, is its own quiet harm.",
      "Held together with those outside, perseverance brings good fortune. Loyalty extended upward, to a worthy center beyond the immediate circle, is rewarded.",
      "Manifest union, the king uses only three drivers in the hunt, lets the game escape in front, the townspeople are not warned, good fortune. True leadership draws by open example, never by trapping or coercing loyalty.",
      "No head to the union, misfortune. Alliance without any real, trusted center at all cannot hold, this is dispersal wearing the mask of togetherness.",
    ],
  },
  {
    number: 9, chinese: "小畜", pinyin: "Xiǎo Chù", english: "Small Taming",
    upper: "xun", lower: "qian",
    keywords: ["Gentle restraint", "Small accumulation", "Dense clouds, no rain yet"],
    judgment: "Wind above Heaven, gentle restraint holding back great force, small means checking large power. Success, dense clouds gather from the west but no rain falls yet, the great advance is checked, only by patient, small, repeated gentleness.",
    image: "Wind moves across Heaven, the image of small taming. The noble one refines the outward manifestation of inner virtue, small daily cultivation is the actual method here.",
    lines: [
      "Return to one's own path, what trouble could there be, good fortune. Coming back to your own course, rather than forcing another's, is quietly correct.",
      "Led back by another, good fortune. Being drawn back to the true path by companionship also brings genuine benefit.",
      "The cart's axle straps snap, husband and wife look away from each other. Small restraint pushed too far strains what should be a mutual bond, tension shows in the closest relationship first.",
      "Sincerity, blood vanishes, fear goes, no blame. Genuine trust dissolves a dangerous situation before it fully arrives, danger met with real sincerity simply passes.",
      "Sincerity linked together, rich through one's neighbor. Wealth and strength shared, rather than hoarded alone, is what actually accumulates here.",
      "The rain has fallen, the movement rests, the wife's constancy is a real danger, like the moon nearly full. The noble one who advances now meets misfortune. Small taming has reached its limit, further pushing risks exactly what was so carefully held back.",
    ],
  },
  {
    number: 10, chinese: "履", pinyin: "Lǚ", english: "Treading",
    upper: "qian", lower: "dui",
    keywords: ["Careful conduct", "Treading on the tiger's tail", "Correct step"],
    judgment: "Heaven above Lake, the small and joyous treads carefully behind the great and strong. Treading on the tiger's tail, it does not bite, success, this is a situation of real danger handled by correct, unhurried, respectful conduct.",
    image: "Heaven above, the Lake below, the distinction of high and low. The noble one discriminates between high and low, and thereby gives stability to the aims of the people, correct conduct maintains real order.",
    lines: [
      "Simple treading, going forward, no blame. Plain, unadorned, sincere conduct simply moves ahead without complication.",
      "Treading a smooth, level path, the hermit's steadiness, perseverance brings good fortune. Quiet, private constancy on an easy road is its own genuine success.",
      "A one-eyed man can see, a lame man can walk, but treads on the tiger's tail and is bitten, misfortune, like a warrior serving a great ruler poorly matched to the task. Overreaching one's actual capacity onto a dangerous ground brings real harm.",
      "Treads on the tiger's tail, cautious and watchful, in the end good fortune. Danger met with real vigilance rather than bravado passes safely.",
      "Resolute treading, perseverance brings awareness of danger. Firm, correct conduct in a position of real power still needs the humility to see the risk clearly.",
      "Look at the way trodden, examine the omens, if it is complete and good, great good fortune. Looking back at the whole path walked, once conduct has been consistent throughout, brings the fullest form of good fortune available here.",
    ],
  },
  {
    number: 11, chinese: "泰", pinyin: "Tài", english: "Peace",
    upper: "kun", lower: "qian",
    keywords: ["Harmony", "Heaven and Earth in true exchange", "Flourishing"],
    judgment: "Earth above Heaven, but Heaven's energy rises and Earth's descends, true exchange. The small departs, the great arrives, good fortune and success, this is the hexagram of a genuinely open, communicating, flourishing time.",
    image: "Heaven and Earth unite, the image of Peace. The ruler, in accordance with this, divides and completes the course of Heaven and Earth, and assists the people, real peace requires active tending.",
    lines: [
      "Pulling up intertwined grass roots, each brings its own kind along, advancing brings good fortune. Genuine collective momentum, one aligned effort drawing others with it, is the actual mechanism of Peace's start.",
      "Bearing with the uncultivated, fording the river without a boat, not neglecting the distant, without factions, thereby one finds true support in walking the middle way. Real breadth of character sustains a time of flourishing.",
      "No plain that does not slope, no departure without a return. Perseverance in difficulty, no blame, do not worry over the truth of it, enjoy the good fortune already present in your food. Peace always tilts back toward difficulty eventually, steadiness through the turn matters more than anxiety about it.",
      "Fluttering down, not boasting of wealth, calling to one's neighbors with real sincerity. Humility and honest connection is what actually keeps peace circulating between people.",
      "The sovereign gives his daughter in marriage, this brings blessing and truly great good fortune. Real high status offered in genuine, humble alliance, rather than kept apart, is the height of what this hexagram intends.",
      "The wall falls back into the moat it was raised from, do not use the army now, announce the command only within your own town, perseverance brings humiliation. Peace at its very end reverses on its own, forcing outward action here only compounds the coming reversal.",
    ],
  },
  {
    number: 12, chinese: "否", pinyin: "Pǐ", english: "Standstill",
    upper: "qian", lower: "kun",
    keywords: ["Stagnation", "Blocked exchange", "Withdrawal is correct"],
    judgment: "Heaven above Earth, but their energies separate rather than meet, no true exchange, only appearance of order. This does not further the perseverance of the noble one, the great departs, the small arrives, this is a genuine standstill, and the honest response is to withdraw rather than to keep pushing at a wall.",
    image: "Heaven and Earth do not unite, the image of Standstill. The noble one restrains personal virtue to avoid the difficulty, and does not seek honor or wealth through it, invisibility is a real strategy here.",
    lines: [
      "Pulling up intertwined grass roots, each brings its own kind along, perseverance brings good fortune and success. Even in blockage, aligning with others of like mind and holding steady still opens a way forward.",
      "Bearing and enduring, good fortune for lesser people, the great man bears the standstill through, success. A person of real substance can hold their own integrity intact even while stagnation surrounds the general situation.",
      "Bearing shame in silence. To feel the standstill and stay quiet within it, without acting from that shame, is itself the necessary discipline of this line.",
      "There is a mandate, no blame, companions share in the blessing. Acting from a genuine, higher charge, rather than personal ambition, begins to move things even inside a standstill.",
      "The standstill comes to rest, good fortune for the great man. Tie it, tie it, to a cluster of mulberry shoots. Real stability returns for one who has held integrity through the blockage, but the gain must still be secured carefully.",
      "The standstill is overthrown, first standstill, then joy. What has been blocked genuinely turns over at its natural limit, the pressure that built the stagnation is what eventually breaks it open.",
    ],
  },
  {
    number: 13, chinese: "同人", pinyin: "Tóng Rén", english: "Fellowship with Others",
    upper: "qian", lower: "li",
    keywords: ["Community of purpose", "Open kinship", "Shared vision"],
    judgment: "Heaven above Fire, fire's flame naturally reaches toward heaven, true likeness of direction. Fellowship with others out in the open country brings success, worth crossing the great water, but real fellowship needs the perseverance of the noble one, shared purpose.",
    image: "Heaven together with Fire, the image of Fellowship. The noble one organizes the clans and distinguishes things by categories, true fellowship still requires clear distinction.",
    lines: [
      "Fellowship with others at the very gate, no blame. Community formed openly, at the threshold, before any faction has hardened, carries no fault.",
      "Fellowship with others limited to the clan alone, humiliation. Community narrowed only to one's own kin or in-group is a shrinking.",
      "Hiding weapons in the thicket, climbing the high hill, for three years does not rise up. Hidden rivalry and suspicion inside a fellowship stalls real movement for a long stretch, distrust this deep does not resolve quickly.",
      "Mounting the wall, unable to attack, good fortune. Aggression considered and then actually restrained, rather than acted on, is what allows this fellowship to hold.",
      "Fellowship, first weeping and lamenting, then laughing, after a great struggle allies finally meet. True kinship that survives real conflict and separation to reunite is the deepest form this hexagram offers.",
      "Fellowship with others out in the meadow, no cause for regret. A wide, unforced, unattached form of common cause, held lightly, needs no remorse even if it stays incomplete.",
    ],
  },
  {
    number: 14, chinese: "大有", pinyin: "Dà Yǒu", english: "Great Possession",
    upper: "li", lower: "qian",
    keywords: ["Abundance rightly held", "Fire over Heaven", "Wealth in service of clarity"],
    judgment: "Fire above Heaven, the sun at its highest, illuminating everything at once. Supreme success, great possession here means great abundance genuinely and rightly held, not hoarded, one strong yielding line at the top gathers and governs the strength of all the others.",
    image: "Fire high above Heaven, the image of Great Possession. The noble one curbs evil and promotes good, obeying the benevolent will of Heaven, real abundance is stewarded.",
    lines: [
      "No relationship yet with what harms, no fault in this, if aware of the difficulty ahead there is no blame. Early abundance untouched by corruption stays clean only through continued awareness.",
      "A great wagon for loading, there is somewhere to go, no blame. Real capacity to carry a heavy load has been earned and is put to genuine use, without fault.",
      "A duke presents an offering to the Son of Heaven, a small man cannot do this. Abundance shared upward, offered rather than kept, is what a person of real character does with great possession, a lesser character could not manage the gesture.",
      "He keeps his wealth in due proportion, no blame. Restraint and proportion, even amid genuine abundance, is what protects it from becoming its own downfall.",
      "His sincerity is reciprocated in dignified friendship, good fortune. Real trust, extended with dignity from a position of abundance, is met in kind, and this is the ideal expression of the hexagram.",
      "Blessed by Heaven itself, good fortune, nothing that does not further. Great possession, held with real integrity all the way to its height, receives an unearned, extra blessing on top of what was already earned.",
    ],
  },
  {
    number: 15, chinese: "謙", pinyin: "Qiān", english: "Modesty",
    upper: "kun", lower: "gen",
    keywords: ["Real humility", "Mountain hidden under Earth", "Quiet excellence"],
    judgment: "Earth above Mountain, true greatness has folded itself down beneath the ordinary ground. Success, the noble one carries things through, this hexagram has no unfavorable line anywhere in it, genuine modesty is the one virtue that never turns against itself.",
    image: "Within the Earth, a Mountain, the image of Modesty. The noble one reduces what is too much and augments what is too little, weighing things and making them equal, real modesty actively redistributes, it does not just abstain.",
    lines: [
      "A truly modest person of real worth, may cross the great water, good fortune. Genuine, unaffected humility carries its own quiet power to succeed even at real risk.",
      "Modesty that expresses itself, perseverance brings good fortune. Not hidden but visibly, consistently lived, this steady modesty is trusted precisely because it is not performed.",
      "A person of real merit stays genuinely modest, the multitudes rely on him, good fortune to the end. Real accomplishment, held without arrogance, becomes the very thing others can lean on.",
      "Nothing that does not further the display of modesty in action. There is no wrong moment to act from real humility, only ways of doing it more or less skillfully.",
      "Not boasting of wealth before one's neighbors, it furthers one to attack with force. Modesty does not mean passivity in the face of real transgression, correcting harm firmly is still consistent with genuine humility.",
      "Modesty that expresses itself, it furthers one to move troops to chastise one's own city and one's own states. Even correction of what is nearest and dearest must still be carried out modestly, discipline applied to one's own house first.",
    ],
  },
  {
    number: 16, chinese: "豫", pinyin: "Yù", english: "Enthusiasm",
    upper: "zhen", lower: "kun",
    keywords: ["Aligned momentum", "Thunder over Earth", "Right timing of joy"],
    judgment: "Thunder above Earth, movement that arises naturally from a settled ground and startles it into life. It furthers one to install helpers and set armies marching, real enthusiasm, aligned with genuine timing, moves multitudes without needing to force any of them.",
    image: "Thunder comes resounding out of the Earth, the image of Enthusiasm. The ancient kings, in accordance with this, made music to honor virtue, and offered it with full ceremony to the Supreme Ancestor, real enthusiasm is given form and ceremony.",
    lines: [
      "Enthusiasm that announces itself loudly to gain attention, misfortune. Joy performed outward for recognition, rather than felt, exhausts itself and disappoints.",
      "Firm as a rock, not a whole day is needed, perseverance brings good fortune. Discernment sharp enough to see a shift the instant it begins, and act on it at once, is the real skill of this line.",
      "Enthusiasm looking upward for its cause, regret, delay also brings regret. Waiting on someone else's joy or approval to feel one's own aliveness leads only to regret either way.",
      "The source of enthusiasm, great gains are realized, have no doubt, friends gather around like a hairpin gathers hair. Genuine, generative joy at the center draws real, lasting community to it without needing to chase anyone.",
      "Constant illness, yet remains alive. A chronic, low-grade difficulty persists through this whole phase but does not actually end anything, endurance itself becomes the practice here.",
      "Deluded enthusiasm, but if change comes after completion, no blame. Even joy taken too far and gone slightly astray can still be corrected, so long as the correction is made once the excess is seen clearly.",
    ],
  },
  {
    number: 17, chinese: "隨", pinyin: "Suí", english: "Following",
    upper: "dui", lower: "zhen",
    keywords: ["Right adaptation", "Lake over Thunder", "Willing accompaniment"],
    judgment: "Lake above Thunder, movement that settles happily into stillness at the right time, and rises again when needed. Supreme success, perseverance, no blame, the real art of Following is knowing genuinely when to go along and when to lead.",
    image: "Thunder in the middle of the Lake, the image of Following. The noble one, at nightfall, goes indoors to rest, real following includes following the rhythm of one's own natural cycles.",
    lines: [
      "The governing element is changing, perseverance brings good fortune, going out and mixing with others brings real results. Being open to genuine change of direction, and engaging honestly with new company, is where Following actually begins.",
      "Clinging to the little boy, losing the strong man. Attaching to whatever is nearest or most flattering, rather than to what is actually substantial, is a real loss disguised as gain.",
      "Clinging to the strong man, losing the little boy, what one seeks is found by this, it furthers one to abide in constancy. Choosing genuine substance over easy comfort is the correct trade, and it does bring what was actually sought.",
      "Following brings real results, but perseverance amid this brings misfortune, having sincerity, walking in the light, no blame. Success gained through Following can start to serve one's own ambition quietly, only ongoing sincerity and clear conduct keep it honest.",
      "Sincere in the good, good fortune. Genuine, unforced integrity, simply followed through consistently, is already enough here.",
      "He is held with binding ties, and then firmly fettered, the king uses him to make offering on the Western Mountain. Complete, total, willing commitment at the very height of Following becomes fit for the most sacred use.",
    ],
  },
  {
    number: 18, chinese: "蠱", pinyin: "Gǔ", english: "Work on What Has Been Spoiled",
    upper: "gen", lower: "xun",
    keywords: ["Repair", "Corruption inherited", "Restoring what decayed"],
    judgment: "Mountain over Wind, the wind trapped and stagnating beneath the mountain until it turns rank. Supreme success, worth crossing the great water, three days before the starting point and three days after, real repair of an old corruption needs full deliberation on both sides of the act.",
    image: "Wind at the base of the Mountain, the image of Decay. The noble one stirs up the people and strengthens their spirit, real repair works through people.",
    lines: [
      "Setting right what the father has spoiled, if there is a child, no blame to the departed father, danger, but in the end good fortune. Taking up an inherited corruption honestly and correcting it clears the name of the one who caused it too.",
      "Setting right what the mother has spoiled, one must not be too persevering about it. Correcting a fault inherited through a gentler, more central line calls for tact rather than force.",
      "Setting right what the father has spoiled, slight cause for regret, but no great blame. Some remaining friction in the correction is normal, and does not undo the real good of the repair.",
      "Tolerating what the father has spoiled, in the future one meets with humiliation. Delaying an obvious, needed correction only pushes the real cost further down the line.",
      "Setting right what the father has spoiled, one meets with praise. Correction carried out with genuine skill and care earns real recognition.",
      "Does not serve kings and princes, sets higher, personal values above worldly service. Some corruption is old and large enough that the correct response is to step outside the whole system rather than reform it from within.",
    ],
  },
  {
    number: 19, chinese: "臨", pinyin: "Lín", english: "Approach",
    upper: "kun", lower: "dui",
    keywords: ["Advancing influence", "Earth over Lake", "Growing authority"],
    judgment: "Earth above Lake, a great, gentle authority drawing near and rising in strength. Supreme success, perseverance, but when the eighth month comes there will be misfortune, a season of growing, benevolent influence has real limits, and its own natural turning point.",
    image: "The Earth above the Lake, the image of Approach. The noble one is inexhaustible in teaching, and boundless in nurturing and sustaining the people, genuine authority here is expressed through care.",
    lines: [
      "Joint approach, perseverance brings good fortune. Aligned, cooperative advance, undertaken together with others of like purpose, is genuinely strong at this early stage.",
      "Joint approach, good fortune, nothing that does not further. Continued mutual, cooperative advance remains sound and beneficial as it deepens.",
      "Comfortable approach, nothing furthers, but if one becomes anxious about it and corrects, no blame. Approaching from complacency or self-satisfaction is hollow, real correction of this attitude, once noticed, removes the fault.",
      "Complete approach, no blame. A fully genuine, wholehearted advance, offered without reservation, is entirely without fault.",
      "Wise approach, this is fitting for a great ruler, good fortune. Discerning, intelligent influence, applied from real authority, is the ideal expression of this whole hexagram.",
      "Generous approach, good fortune, no blame. Approach carried out with real magnanimity, at its highest reach, still brings good result and no fault.",
    ],
  },
  {
    number: 20, chinese: "觀", pinyin: "Guān", english: "Contemplation",
    upper: "xun", lower: "kun",
    keywords: ["Witnessing", "Wind over Earth", "The view from above"],
    judgment: "Wind above Earth, moving over the whole ground and seeing everything it touches. Washing the hands but not yet offering the sacrifice, sincerity and dignity command real respect, this hexagram is about the power of genuine, undistracted attention, before any action is taken from it.",
    image: "Wind moves over the Earth, the image of Contemplation. The ancient kings, in accordance with this, visited the regions of the world, contemplated the people, and instituted their teachings, real seeing must precede real teaching.",
    lines: [
      "Boy-like contemplation, no blame for an inferior person, humiliation for the noble one. A narrow, naive view is forgivable in one still learning, but a real limitation in one who should already see further.",
      "Contemplation through a crack in the door, favorable for the perseverance of a woman. A narrow, partial view can still be genuinely useful within a properly limited context, but should not be mistaken for the whole picture.",
      "Contemplation of my own life, decides whether to advance or retreat. Honest self-examination, rather than watching others, is the accurate way to decide one's next real move.",
      "Contemplation of the light of the kingdom, it furthers one to be the guest of a king. Seeing clearly into the real state of the wider world, from a position close to real authority, is genuinely valuable counsel.",
      "Contemplation of my own life, the noble one is without blame. Ongoing, honest self-review, by someone already of real character, keeps that character sound.",
      "Contemplation of his life, the noble one is without blame. Full witnessing of one's whole conduct, viewed as if from outside, at the height of maturity, remains free of fault.",
    ],
  },
  {
    number: 21, chinese: "噬嗑", pinyin: "Shì Kè", english: "Biting Through",
    upper: "li", lower: "zhen",
    keywords: ["Cutting the obstacle", "Fire over Thunder", "Decisive judgment"],
    judgment: "Fire above Thunder, clarity and movement combined into decisive, cutting force. Success, it furthers one to let judgment be exercised, there is a hard obstacle wedged between what should meet cleanly, and only firm, clear biting through actually removes it.",
    image: "Thunder and Lightning, the image of Biting Through. The ancient kings, in accordance with this, made firm the laws through clearly defined penalties, real justice requires clarity of both rule and consequence.",
    lines: [
      "Feet in the stocks, toes disappear, no blame. A small, early restraint stops a minor fault before it can grow into a real, larger obstruction.",
      "Bites through soft flesh, nose disappears, no blame. A correction meeting little real resistance goes deep quickly, the discomfort of it is not itself a fault.",
      "Bites on old dried meat, meets something poisonous, slight humiliation, no great blame. Correcting an old, deeply set problem brings some real unpleasantness along with it, but the correction is still worth completing.",
      "Bites on dried gristly meat, obtains metal arrows, it furthers one to be mindful of difficulty and to persevere, good fortune. A tough, resistant obstacle yields a real, useful gain to whoever sees it through with care and persistence.",
      "Bites on dried lean meat, obtains yellow gold, perseverance amid danger, no blame. Correction from a position of real central authority meets real resistance but succeeds, so long as the danger involved is not underestimated.",
      "The neck fastened in the wooden cangue, ears disappear, misfortune. Refusing correction until it grows large enough to become a serious, disfiguring punishment, real harm follows a fault left unaddressed too long.",
    ],
  },
  {
    number: 22, chinese: "賁", pinyin: "Bì", english: "Grace",
    upper: "gen", lower: "li",
    keywords: ["Adornment", "Mountain over Fire", "Beauty in service of substance"],
    judgment: "Mountain over Fire, fire's light illuminating the still, solid form of the mountain. Success in small matters, it furthers one to have somewhere to go, real grace enhances what is already substantial, it does not, on its own, carry the largest undertakings.",
    image: "Fire at the foot of the Mountain, the image of Grace. The noble one makes things clear in ordinary civil affairs, but ventures no rash decisions in matters of real consequence, adornment has its right place, and its right limits.",
    lines: [
      "Lending grace to the toes, leaves the carriage and walks. Choosing the more modest, honest path over the impressive one, even in a small matter, is a genuine act of grace here.",
      "Lending grace to the beard. Adornment that only follows and depends on what is already substantial beneath it has no independent strength of its own.",
      "Graceful and moist, constant perseverance brings good fortune. A real, sustained radiance, well cared for, holds its good fortune only through ongoing steadiness.",
      "Grace or simplicity, a white horse comes as if on wings. What first looks like an intrusion or a threat, once seen clearly, turns out to be a genuine, welcome connection.",
      "Grace in hills and gardens, the roll of silk is meager, humiliation, but in the end good fortune. A modest, natural adornment may look poor by worldly measure, but proves genuinely right in the end.",
      "White, plain grace, no blame. The very highest form of adornment is no longer decoration at all, but pure, unadorned substance, this is grace returning to simplicity.",
    ],
  },
  {
    number: 23, chinese: "剝", pinyin: "Bō", english: "Splitting Apart",
    upper: "gen", lower: "kun",
    keywords: ["Decay from below", "Mountain resting on Earth", "Do not act, wait"],
    judgment: "Mountain over Earth, a mountain's mass eroding, crumbling down into the earth beneath it. Not favorable to go anywhere, five yin lines are steadily consuming the one yang line at the top, this is a genuine, structural decline, and the only sound response is to hold still and not resist it directly.",
    image: "The Mountain rests upon the Earth, the image of Splitting Apart. Those above can be at rest only if they give generous substance to those below, decline like this is prevented by real generosity long before it starts.",
    lines: [
      "The bed is split apart at its legs, disaster to correctness. Decay beginning at the very foundation invalidates anything built on top of it, this is not yet the moment to hold ground firmly.",
      "The bed is split apart at its edge, disaster to correctness. The decay has climbed higher, still not the time to stand and resist directly.",
      "Splitting apart, but among them, no blame. Even inside a general decline, one part can stay genuinely apart from the corruption and remain faultless.",
      "The bed is split apart, reaching the skin, misfortune. The decay has now reached what is nearest and most personal, real misfortune, the decline can no longer be held at a distance.",
      "A string of fish, favor comes through the palace ladies, nothing that does not further. Leadership at this late stage that organizes what remains, in an orderly line, and secures favor through the right channel, still finds real benefit.",
      "A large fruit uneaten, the noble one obtains a carriage, the small man's house is split apart. Decay reaches its absolute limit and one seed survives it, from that single surviving seed the whole cycle begins again.",
    ],
  },
  {
    number: 24, chinese: "復", pinyin: "Fù", english: "Return",
    upper: "kun", lower: "zhen",
    keywords: ["The turning point", "Thunder hidden in Earth", "One line returns"],
    judgment: "Earth above Thunder, the single yang line stirring again deep beneath a field of yin. Success, going out and coming in without error, friends come without blame, the way returns on the seventh day, this is the genuine turning point, the first true movement back toward what was lost.",
    image: "Thunder within the Earth, the image of Return. The ancient kings, at the winter solstice, closed the passes, merchants and travelers did not go about, real return is honored by rest.",
    lines: [
      "Return from a short distance, no need for remorse, great good fortune. Correcting course the moment a small mistake is noticed, before it compounds, is the cleanest form of Return.",
      "Quiet, good return, good fortune. A calm, unforced turning back, done in genuine humility, is entirely sound.",
      "Repeated return, danger, no blame. Turning back and drifting off course again and again is precarious, but the repeated correcting itself is not a fault.",
      "Walking in the middle of others, alone one returns. Real return can mean parting from the group one was following, to come back to one's own genuine path.",
      "Generous return, no cause for regret. A full, wholehearted, mature return, undertaken without reservation, leaves nothing to regret.",
      "Missing the return, misfortune, misfortune from within and without, using this for military action ends in great defeat, for the ruler of a state, disaster, for ten years unable to attack again. Missing the true turning point entirely, and continuing on regardless, brings a very long, structural consequence.",
    ],
  },
  {
    number: 25, chinese: "無妄", pinyin: "Wú Wàng", english: "Innocence / Without Entanglement",
    upper: "qian", lower: "zhen",
    keywords: ["Unforced naturalness", "Heaven over Thunder", "Freedom from scheming"],
    judgment: "Heaven above Thunder, movement that arises spontaneously under Heaven's own unforced order. Supreme success, perseverance, if one is not correct, there is misfortune, this is a call to act from what is genuinely natural and unschemed.",
    image: "Under Heaven, Thunder rolls, all things reach their true, natural condition. The ancient kings, rich in virtue and in harmony with this time, nourished all beings, real innocence still requires active, careful stewardship.",
    lines: [
      "Innocent action, going forward brings good fortune. Movement free of scheming or ulterior motive is sound simply by being what it is.",
      "Without expectation of reward, one need not plow to reap, nor clear ground to have fields ready for the third year, then it furthers to go anywhere. Effort done for its own genuine sake, without calculating the harvest in advance, is oddly what actually secures the harvest.",
      "Unexpected calamity, the ox that was tethered is taken by a passerby, to the innkeeper's loss. Misfortune can genuinely arrive from outside without any real fault of one's own, this is simply part of an unforced world.",
      "One who can be constant meets with no blame. Steadiness, held without straining, is the entirely sufficient response in this position.",
      "Do not medicate an illness that came without real cause, and there will be joy. An affliction that arose without genuine fault often clears on its own better than through anxious intervention.",
      "Innocent action brings misfortune, nothing furthers. Even genuinely unforced action has a wrong moment, when the situation itself is exhausted, further action of any kind, however sincere, does not help.",
    ],
  },
  {
    number: 26, chinese: "大畜", pinyin: "Dà Chù", english: "Great Taming",
    upper: "gen", lower: "qian",
    keywords: ["Great accumulation", "Mountain over Heaven", "Restrained power stored"],
    judgment: "Mountain over Heaven, immense force held and contained by a still, solid boundary. Perseverance furthers, not eating at home brings good fortune, it furthers one to cross the great water, real power held back deliberately, rather than spent, builds a genuinely great store of capacity.",
    image: "Heaven within the Mountain, the image of Great Taming. The noble one acquaints himself with many sayings and deeds of the past, in order to strengthen his character, restraint is fed by real study.",
    lines: [
      "Danger present, it furthers one to stop. Real restraint at the very start, recognizing genuine danger and simply not moving, is the correct action.",
      "The axle-straps are removed from the cart. Restraint here is not fully one's own decision, external circumstance itself is what holds the movement back for now.",
      "A good horse, follows the leader, difficulty and danger, perseverance, daily practice of charioteering and defense, it furthers one to have somewhere to go. Real capability now, well trained and disciplined, is ready to be used, with continued care and preparation.",
      "The headboard of a young bull, great good fortune. A restraint applied early, before real power has fully matured, contains it gently and effectively, without needless struggle.",
      "The tusks of a gelded boar, good fortune. Restraint applied at the actual root of a force, rather than fighting its visible expression, is the more skillful approach.",
      "One attains the way of Heaven itself, success. Taming carried all the way through to its completion opens directly onto real, unobstructed movement, the stored force is finally released rightly.",
    ],
  },
  {
    number: 27, chinese: "頤", pinyin: "Yí", english: "Nourishment",
    upper: "gen", lower: "zhen",
    keywords: ["The jaws", "Mountain over Thunder", "What and how one feeds"],
    judgment: "Mountain over Thunder, still above, moving below, the image of a jaw opening and closing. Perseverance brings good fortune, observe what nourishment is sought and by what means, this hexagram asks a direct, practical question, what are you actually feeding, and how.",
    image: "At the foot of the Mountain, Thunder, the image of Nourishment. The noble one is careful of words and moderate in eating and drinking, both what enters through the mouth and what leaves it are forms of real nourishment.",
    lines: [
      "You let your own sacred tortoise go and watch me with the corners of your mouth wide open, misfortune. Neglecting one's own genuine spiritual sustenance while envying someone else's is a real loss, disguised as mere hunger.",
      "Turning to the summit for nourishment, departing from the proper path, seeking nourishment from the hill, going brings misfortune. Reaching upward for support one should really be providing for oneself, or seeking it from an unfitting source, leads astray.",
      "Turning away from nourishment, perseverance brings misfortune, do not act this way for ten years, nothing furthers. Rejecting real, needed sustenance out of some misguided principle causes a long, self-inflicted deprivation.",
      "Turning to the summit for nourishment, good fortune, tiger-like staring, desire following upon desire, no blame. Looking with the sharp, wide-eyed intensity of a tiger toward a genuine higher source of sustenance is entirely sound here.",
      "Turning away from the proper path, perseverance brings good fortune, do not cross the great water. Remaining in a stable, if imperfect, arrangement is wiser than a large, risky venture right now.",
      "The source of nourishment, awareness of the danger brings good fortune, it furthers one to cross the great water. Recognizing oneself as an actual source others feed from, and holding that role with proper care, is powerful enough to support even a great undertaking.",
    ],
  },
  {
    number: 28, chinese: "大過", pinyin: "Dà Guò", english: "Great Exceeding",
    upper: "dui", lower: "xun",
    keywords: ["Ridgepole sagging", "Lake over Wind", "Extraordinary pressure"],
    judgment: "Lake above Wind, so much weight at the center that the ridgepole itself begins to sag. The ridgepole sags, it furthers one to have somewhere to go, success, this is an extraordinary, unbalanced time, real, unusual measures are called for.",
    image: "The Lake rises over the trees, the image of Great Exceeding. The noble one, thus, stands alone without fear, and if he must renounce the world, he does so without sadness, real integrity in an extraordinary time may mean standing apart.",
    lines: [
      "Spreading white rushes beneath the offering, no blame. Extra, careful preparation beneath a load that is genuinely too heavy is what keeps this early stage safe.",
      "A dry poplar sprouts new shoots at the root, an older man takes a young wife, nothing that does not further. An unlikely late renewal, joining an aged, weakening structure to fresh, vital energy, genuinely works here.",
      "The ridgepole sags to the point of breaking, misfortune. Pressure at the center, left completely unsupported, genuinely does break under a great enough exceeding.",
      "The ridgepole is braced up, good fortune, but there is cause for shame if there are other entanglements. Real, deliberate reinforcement corrects the sagging, so long as it isn't compromised by dividing attention or loyalty elsewhere.",
      "A withered poplar puts forth flowers, an old woman takes a young husband, no blame, no praise. A late, showy renewal at the very top may look impressive but is not genuinely fruitful or lasting, neither fault nor real merit here.",
      "Crossing through great water over one's head, misfortune, no blame. Total commitment to an extraordinary, dangerous crossing may genuinely fail, but the wholehearted willingness to attempt it, for the right cause, is not itself a fault.",
    ],
  },
  {
    number: 29, chinese: "坎", pinyin: "Kǎn", english: "The Abysmal, Water",
    upper: "kan", lower: "kan",
    keywords: ["Repeated danger", "Water doubled", "Moving through"],
    judgment: "Water repeated, one danger after another, a gorge within a gorge. If genuinely sincere, one has success in the heart, and what one does succeeds, this hexagram does not promise the danger removed, it promises that the current inside it knows its own way through.",
    image: "Water flows on uninterrupted and reaches its goal, the image of the Abysmal repeated. The noble one walks in lasting virtue and carries on the business of teaching, real steadiness through repeated danger comes from a practice already deeply established.",
    lines: [
      "Repetition of the Abysmal, in the pit within the pit, misfortune. Falling into a danger while already inside a danger, without any real foothold yet, is a genuinely low point.",
      "The abyss is dangerous, one strives to attain only small things. In real danger, seeking only modest, achievable gains, rather than a full escape all at once, is the sound approach.",
      "Coming and going, abyss upon abyss, danger everywhere, resting a moment in the pit, do not act this way. When danger surrounds every direction of movement, better to genuinely pause and not act at all than to thrash further into it.",
      "A jug of wine and a bowl of rice with it, earthenware vessels simply handed in through the window, in the end no blame. Simple, unadorned sincerity offered directly, without ceremony, is enough to pass safely even here.",
      "The abyss is filled only to the rim, no blame. Danger contained right at its natural limit, no more and no less, is managed correctly.",
      "Bound with cords and ropes, shut in behind thorny prison walls, for three years does not find the way, misfortune. Real danger, met with neither sincerity nor skill, can genuinely entrap a person for a very long time.",
    ],
  },
  {
    number: 30, chinese: "離", pinyin: "Lí", english: "The Clinging, Fire",
    upper: "li", lower: "li",
    keywords: ["Radiant clarity", "Fire doubled", "Dependent brightness"],
    judgment: "Fire repeated, brightness that must cling to something in order to burn at all. Perseverance brings success, the care of a cow brings good fortune, this clarity is genuinely brilliant, but it needs the right, gentle discipline to sustain it, or it consumes what it depends on.",
    image: "That which is bright rises twice, fire repeated, the image of the Clinging Flame. The great man, with this brightness, illuminates the four quarters of the world, real clarity is used to reveal.",
    lines: [
      "The footsteps criss-cross, treated with real seriousness there is no blame. Confusion at the very start, met with genuine care rather than dismissed, does not become a fault.",
      "Yellow light, supreme good fortune. Brightness held at the true center, neither excessive nor dim, is the ideal expression of this hexagram.",
      "The light of the setting sun, either they beat the pot and sing or lament the oncoming old age, misfortune. Clarity at its natural close can be met with real acceptance or with real resistance, only the resistance actually brings misfortune.",
      "Sudden as a comet, flaming up, dying down, thrown away. A brightness that flares from nowhere without real, established root burns fast and is discarded just as quickly.",
      "Tears flow in floods, sighing and lamenting, good fortune. Genuine, unguarded grief openly expressed, rather than held rigid, actually clears the way to real good fortune here.",
      "The king uses this one to march out and correct, it is fitting to strike down the leaders and take captive the followers, no blame. Real clarity used at the height of its power to correct what is genuinely wrong, while sparing what only followed, is exactly right.",
    ],
  },
  {
    number: 31, chinese: "咸", pinyin: "Xián", english: "Influence",
    upper: "dui", lower: "gen",
    keywords: ["Mutual attraction", "Lake over Mountain", "Wooing, resonance"],
    judgment: "Lake above Mountain, the still peak drawing the open water toward it, and being touched by it in turn. Success, perseverance furthers, taking a maiden brings good fortune, this is genuine, mutual resonance, the young man humbling himself before the young woman, influence that moves both ways at once.",
    image: "A Lake on the Mountain, the image of Influence. The noble one encourages people to approach by remaining open and receptive to them, real influence begins with genuine openness.",
    lines: [
      "Influence shows in the big toe. A response felt at the very first, smallest point of contact, before any real movement has yet begun.",
      "Influence shows in the calves, misfortune, tarrying brings good fortune. Acting on an early, restless impulse toward movement here brings misfortune, patience instead is what actually serves.",
      "Influence shows in the thighs, holds to that which follows, going forward brings humiliation. Being pulled along only by what is nearby and convenient, rather than choosing one's own genuine direction, is a real weakness here.",
      "Perseverance brings good fortune, remorse disappears, restless, uncertain thoughts go to and fro, friends follow your thinking. Steady constancy resolves an inner uncertainty about attraction, and genuine connection follows naturally from wherever real attention settles.",
      "Influence shows in the back of the neck, no remorse. Response felt at a place beyond conscious control shows how deep and total this resonance actually is, without regret.",
      "Influence shows in the jaws, cheeks, and tongue. Influence that has moved all the way up to mere talk has become superficial, real resonance has already done its work lower down.",
    ],
  },
  {
    number: 32, chinese: "恆", pinyin: "Héng", english: "Duration",
    upper: "zhen", lower: "xun",
    keywords: ["Constancy in motion", "Thunder over Wind", "Lasting through change"],
    judgment: "Thunder above Wind, movement and gentle penetration paired so that each renews the other continuously. Success, no blame, perseverance furthers, it furthers one to have somewhere to go, real duration is a stable pattern that keeps actively moving.",
    image: "Thunder and Wind, the image of Duration. The noble one stands firm and does not change direction, real constancy is an active, standing firmness.",
    lines: [
      "Seeking duration too hastily, perseverance brings misfortune, nothing that furthers. Demanding depth or permanence from a bond before it has had time to actually root brings only misfortune.",
      "Remorse disappears. Simply enduring through an early discomfort, without forcing a resolution, is enough for it to pass on its own.",
      "One does not give duration to one's character, disgrace will surely follow, perseverance brings humiliation. Inconsistency at the core of one's own conduct is a genuine fault that no outer circumstance can fix.",
      "No game in the field. Seeking a real result in a place where the effort simply does not belong will not find one, however long it continues.",
      "Giving duration to one's character through perseverance, good fortune for a woman, misfortune for a man. What counts as fitting constancy differs by role and position, one same steadiness is not equally right for every situation.",
      "Restlessness as an enduring condition, misfortune. Constant agitation, mistaken for constancy simply because it never stops, is itself the fault.",
    ],
  },
  {
    number: 33, chinese: "遯", pinyin: "Dùn", english: "Retreat",
    upper: "qian", lower: "gen",
    keywords: ["Withdrawal in strength", "Heaven over Mountain", "Timely disengagement"],
    judgment: "Heaven above Mountain, Heaven retreating upward, away from the fixed peak beneath it. Success, small things still further through perseverance, this is a strong, deliberate withdrawal made while there is still real strength left to withdraw with.",
    image: "Heaven above, the Mountain below, the image of Retreat. The noble one keeps the inferior at a distance, with real reserve, disengagement here is dignified.",
    lines: [
      "At the tail in retreat, danger, do not undertake anything. Being last to withdraw, right at the vulnerable rear, means the wisest move is simply to stay still and not act at all.",
      "Holds him fast with yellow oxhide, no one can loosen it. A bond of real, central sincerity is what actually keeps something secure through a time of general withdrawal.",
      "A halted retreat is dangerous, but leads to good fortune for retainers and women. Hesitating over a withdrawal that should be made brings real risk, though it can still serve those in more dependent positions.",
      "Voluntary retreat, good fortune for the noble one, humiliation for the inferior person. Choosing to withdraw freely, from real strength rather than being forced to, is the mark of the noble one here.",
      "Friendly retreat, perseverance brings good fortune. A withdrawal made with real goodwill intact, rather than bitterness, is the most soundly correct form of this hexagram.",
      "Cheerful retreat, nothing that does not further. Disengaging with a genuinely light, unburdened heart is the fullest, most complete expression of Retreat.",
    ],
  },
  {
    number: 34, chinese: "大壯", pinyin: "Dà Zhuàng", english: "Great Power",
    upper: "zhen", lower: "qian",
    keywords: ["Vigor rising", "Thunder over Heaven", "Strength needing discipline"],
    judgment: "Thunder above Heaven, immense creative force paired with sudden, arousing movement. Perseverance furthers, great power here is real and considerable, but its real test is whether it stays disciplined, strength without correctness becomes its own danger.",
    image: "Thunder high up in Heaven, the image of Great Power. The noble one does not tread upon a path that is not in accordance with real propriety, true power is defined by what it refuses to do, as much as by what it does.",
    lines: [
      "Power in the toes, going forward brings misfortune, this is quite certainly true. Acting on raw strength at its very first, crudest stage, before it has any real discipline, is bound to fail.",
      "Perseverance brings good fortune. Steady, correct use of real strength, even in the middle of its rise, holds sound.",
      "The inferior person uses power, the noble one does not, perseverance amid danger, a goat butts against a hedge and gets its horns entangled. Force used carelessly or aggressively runs itself straight into its own obstruction, restraint of that same power is what real character does instead.",
      "Perseverance brings good fortune, remorse disappears, the hedge opens, no entanglement, power depends on the strength of the axle of a big cart. Real, well-founded strength, applied correctly, finally moves forward cleanly, without the earlier entanglement.",
      "Loses the goat with ease, no remorse. Letting go of a minor, stubborn resistance without a fight, from a position of genuine strength, costs nothing real.",
      "A goat butts against a hedge, cannot go backward, cannot go forward, nothing furthers, but if one notes the difficulty, this brings good fortune. Power pushed to a genuine impasse in both directions is only resolved by honestly recognizing the impasse itself.",
    ],
  },
  {
    number: 35, chinese: "晉", pinyin: "Jìn", english: "Progress",
    upper: "li", lower: "kun",
    keywords: ["Rising like the sun", "Fire over Earth", "Recognized advance"],
    judgment: "Fire above Earth, the sun rising clear over the whole ground, visible to all. The powerful prince is honored with horses in large numbers, and receives audience three times in a single day, real progress here is public, recognized, and welcomed.",
    image: "The sun rises over the Earth, the image of Progress. The noble one, of themselves, brightens their own bright virtue, real progress in the world begins from a brightness already cultivated within.",
    lines: [
      "Progressing, but turned back, perseverance brings good fortune, if no confidence is placed in you yet, remain calm, no blame. An early advance that meets resistance or distrust is not a real failure, calm patience is the correct response.",
      "Progressing, but in sorrow, perseverance brings good fortune, one receives this great blessing from one's grandmother. Advance can carry real grief with it and still be sound, unexpected support arrives from an old, unlikely source.",
      "All are in accord, remorse disappears. Genuine consensus and shared trust dissolves whatever hesitation remained about this advance.",
      "Progress like a hamster, perseverance brings danger. Advancing greedily, grabbing at gain the way a hamster hoards, is precarious even if it looks successful.",
      "Remorse disappears, take no account of loss or gain, undertakings bring good fortune, nothing that does not further. Letting go of anxious calculation about outcome altogether is, itself, what allows real, unobstructed advance here.",
      "Horns are used only to chastise one's own city, danger, but good fortune, no blame, perseverance brings humiliation. At its very height, progress must turn its force inward, toward correcting oneself, using it outward on others now brings real trouble.",
    ],
  },
  {
    number: 36, chinese: "明夷", pinyin: "Míng Yí", english: "Darkening of the Light",
    upper: "kun", lower: "li",
    keywords: ["Concealed brightness", "Earth over Fire", "Wounded clarity, protected"],
    judgment: "Earth above Fire, the light buried under the ground rather than shining freely above it. It furthers one to be persevering in adversity, this is a time when clarity must be deliberately hidden to survive, and inner steadiness, kept quiet, is the real strength here.",
    image: "The light has sunk into the Earth, the image of Darkening of the Light. The noble one leads the multitude, veiling their own brightness, and yet remains genuinely clear-sighted, real discernment does not need to be displayed to still be fully present.",
    lines: [
      "Darkening of the light during flight, drooping the wings, the noble one does not eat for three days, going has a purpose, the host has words about it. Withdrawing quietly and enduring real hardship, when advance is genuinely unsafe, still moves toward a real purpose even amid criticism.",
      "Darkening of the light, wounded in the left thigh, uses the strength of a horse for rescue, good fortune. A real wound sustained in a dark time is survivable, if one uses whatever practical strength is at hand to move to safety.",
      "Darkening of the light during the hunt in the south, its great leader is captured, one must not expect too quick a solution. Even a real, decisive strike against a dark, oppressive force still needs patience before its full result shows.",
      "Entering the left side of the belly, one attains the true intention of the darkening of the light, leaving the gate and courtyard. Deep, intimate understanding of exactly how a dark situation truly works, gained from close inside it, allows a real, clean way to leave it.",
      "Darkening of the light as with Prince Ji, perseverance furthers. Preserving one's own inner integrity fully intact, while outwardly appearing to comply with a dark time, is the model this line offers.",
      "Not light but darkness, first climbed up to Heaven, later plunged into the depths of the Earth. Oppressive darkness pushed to its own total extreme collapses under its own excess, this is its natural, structural end.",
    ],
  },
  {
    number: 37, chinese: "家人", pinyin: "Jiā Rén", english: "The Family",
    upper: "xun", lower: "li",
    keywords: ["The household", "Wind over Fire", "Right roles, real warmth"],
    judgment: "Wind above Fire, wind fed and shaped by the fire beneath it, each sustaining the other. The perseverance of the woman furthers, this hexagram concerns the right order and genuine warmth of an inner circle, a household, a school, a lineage, held together by clear roles and real care.",
    image: "Wind comes forth from Fire, the image of the Family. The noble one has real substance in their words and real duration in their conduct, a household is held together by consistency.",
    lines: [
      "Firm seclusion within the family, remorse disappears. Clear boundaries established early, within a close circle, prevent later regret rather than causing it.",
      "She should not follow her whims, she attends within to the food, perseverance brings good fortune. Attending faithfully to one's own real, chosen responsibility within the family, rather than to outside distractions, is what actually sustains it.",
      "The family scolds harshly, remorse for such severity, but good fortune, the women and children are too playful, in the end this leads to humiliation. Discipline held firmly but too harshly still lands better than a household left with no real boundaries at all.",
      "A truly wealthy family, great good fortune. A household whose resources and warmth are genuinely, actively shared is at real good fortune.",
      "The king approaches his family with real love, no cause for concern, good fortune. Leadership within a family that leads through genuine warmth, rather than command, needs no anxious oversight.",
      "His true, sincere character commands genuine respect, in the end good fortune. Authority within a household earned by real, lived character, rather than by title, is what ultimately holds it together well.",
    ],
  },
  {
    number: 38, chinese: "睽", pinyin: "Kuí", english: "Opposition",
    upper: "li", lower: "dui",
    keywords: ["Estrangement", "Fire over Lake", "Divergent movement, small matters still work"],
    judgment: "Fire above Lake, fire rising, water settling, two things moving structurally apart from each other. In small matters, good fortune, this is a real estrangement, but it is not total war, small, careful actions can still genuinely succeed even while the larger opposition remains.",
    image: "Above, Fire, below, the Lake, the image of Opposition. The noble one, amid all fellowship, still recognizes real individual difference, genuine unity does not actually require sameness.",
    lines: [
      "Remorse disappears, if you lose your horse, do not run after it, it comes back of itself, when you see evil people, guard against blame by staying calm. Some estrangements resolve themselves without chasing them, and staying composed near real hostility avoids adding fault to the situation.",
      "One meets one's lord in a narrow street, no blame. An unplanned, informal meeting, in a moment of real opposition, can still restore a genuine connection without any fault.",
      "One sees the wagon dragged back, the oxen halted, a man's hair and nose cut off, no good beginning but a good end. Real hardship and even humiliation mark the start of this line, but it does still resolve well by its end.",
      "Isolated through opposition, one meets a like-minded man, one works together in real good faith, danger, but no blame. Genuine estrangement can still be relieved by meeting one true ally, even amid real risk.",
      "Remorse disappears, the companion bites his way through the wrappings, going forth brings no blame. What looked like an obstacle, examined closely, turns out to be an ally working to reach you.",
      "Isolated through opposition, one sees mud and pigs, and a wagon full of devils, first draws the bow, then sets it down again, this is no robber, this is a suitor, going forth and meeting rain brings good fortune. Extreme suspicion and misreading of a real ally as a threat, once corrected, resolves into good fortune, the storm itself is what finally clears the misunderstanding.",
    ],
  },
  {
    number: 39, chinese: "蹇", pinyin: "Jiǎn", english: "Obstruction",
    upper: "kan", lower: "gen",
    keywords: ["Real difficulty ahead", "Water over Mountain", "Turn inward, seek help"],
    judgment: "Water above Mountain, a dangerous river running right where a mountain path is trying to cross it. The southwest furthers, the northeast does not further, it furthers one to see a great man, perseverance brings good fortune, real obstruction here is not overcome by force, only by turning toward easier ground and genuine help.",
    image: "Water on the Mountain, the image of Obstruction. The noble one turns their attention within and cultivates their own real character, an outward block is often best met by real inward work first.",
    lines: [
      "Going leads to obstruction, coming meets with praise. Advancing directly into a difficulty gains nothing, holding back and consolidating is what actually earns respect here.",
      "The king's servant struggles with obstruction upon obstruction, but not for their own sake. Facing hardship after hardship in genuine service to a larger cause, rather than personal ambition, has its own real integrity.",
      "Going leads to obstruction, one comes back. Advancing further only compounds this particular difficulty, returning is the sound move.",
      "Going leads to obstruction, coming leads to real union with others. Retreating from the direct path opens the way instead to genuine, useful connection.",
      "In the middle of great obstruction, friends come to help. At the real center of a hard difficulty, help does genuinely arrive, from those drawn by loyalty rather than obligation.",
      "Going leads to obstruction, coming leads to great things, good fortune, it furthers one to see a great man. What began as a hard block, once turned around toward real counsel and support, opens into something genuinely large and good.",
    ],
  },
  {
    number: 40, chinese: "解", pinyin: "Xiè", english: "Deliverance",
    upper: "zhen", lower: "kan",
    keywords: ["Release of tension", "Thunder over Water", "The knot loosens"],
    judgment: "Thunder above Water, the storm's tension finally breaking, the pressure of the gorge released. The southwest furthers, if there is nowhere to go, return brings good fortune, if there is somewhere to go, hasten, this is a real release, act now, promptly, while the knot is actually loosening.",
    image: "Thunder and Rain arise together, the image of Deliverance. The noble one pardons mistakes and forgives real wrongdoing, a genuine release often needs to include real, deliberate forgiveness to complete itself.",
    lines: [
      "Without blame. At the very start of real release, simply doing nothing extra and letting the tension continue to loosen is entirely sound.",
      "One catches three foxes in the field, and receives a yellow arrow, perseverance brings good fortune. Clearing out several small, hidden sources of remaining difficulty, with real, central discernment, is rewarded here.",
      "Carrying a burden on the back, yet riding in a carriage, this induces robbers to arrive, perseverance brings humiliation. Holding onto a low position while displaying high status invites a real, natural predation, a mismatch that brings its own trouble.",
      "Deliver yourself from your big toe, then the companion comes, and you can trust him. Releasing a small, nagging attachment first is what actually allows a genuine, trustworthy connection to arrive.",
      "The noble one alone effects deliverance, this brings good fortune, in this way the noble one shows the inferior person that he means it seriously. A visible, decisive act of real release by someone of genuine character convinces others the change is real.",
      "The prince shoots at a hawk on a high wall, hits it, everything serves to further. A last, real, remaining obstruction, dealt with cleanly at the height of this deliverance, benefits everything that follows it.",
    ],
  },
  {
    number: 41, chinese: "損", pinyin: "Sǔn", english: "Decrease",
    upper: "gen", lower: "dui",
    keywords: ["Reduction below, gain above", "Mountain over Lake", "Willing sacrifice"],
    judgment: "Mountain above Lake, the lake's water rising to feed the mountain, decreasing itself to increase what is above. With real sincerity, supreme good fortune, no blame, it furthers one to have somewhere to go, this decrease, rightly directed, is investment.",
    image: "At the foot of the Mountain, the Lake, the image of Decrease. The noble one controls their own anger and restrains their own desires, real decrease begins with what one chooses to give up in oneself first.",
    lines: [
      "Bring your own affairs to a close quickly, go, no blame, but consider carefully how much you decrease yourself for another. Even a real, well-intentioned sacrifice needs honest measure, so it strengthens rather than depletes.",
      "Perseverance furthers, to undertake something brings misfortune, without decreasing oneself one is able to bring increase to others. Sometimes the real, correct way to help is to hold one's own ground firmly.",
      "When three people travel together, their number is decreased by one, when one travels alone, he finds a companion. A group can dilute what is genuinely needed, while one person, alone and clear, actually attracts the right real partner.",
      "Decreasing one's faults, causes joyful haste, no blame. Correcting a real fault promptly, and with genuine relief rather than resentment, is entirely without blame.",
      "Someone actually increases him, ten pairs of tortoise shells cannot oppose it, supreme good fortune. A real, unearned abundance arrives here so decisively that nothing could reasonably contest or refuse it.",
      "Without decreasing oneself, one increases others, no blame, perseverance brings good fortune, it furthers one to have somewhere to go, one obtains helpers with no fixed abode of their own. At the height of this hexagram, real generosity flows outward without any real cost to oneself, and draws devoted, unattached support.",
    ],
  },
  {
    number: 42, chinese: "益", pinyin: "Yì", english: "Increase",
    upper: "xun", lower: "zhen",
    keywords: ["Gain from above given below", "Wind over Thunder", "Timely abundance"],
    judgment: "Wind above Thunder, both moving in the same true direction, each strengthening the other's force. It furthers one to undertake something, it furthers one to cross the great water, this is a genuinely favorable time for real increase, particularly increase that flows from higher position down to those in real need.",
    image: "Wind and Thunder, the image of Increase. The noble one, seeing real good, moves toward it, having real faults, corrects them at once, increase includes the willingness to actually act on what one already recognizes as true.",
    lines: [
      "It furthers one to accomplish great deeds, supreme good fortune, no blame. Real capacity and real opportunity meet cleanly here, best used at once for something genuinely significant.",
      "Someone actually increases him, ten pairs of tortoise shells cannot oppose it, constant perseverance brings good fortune, the king presents him to God, good fortune. An unearned, decisive increase arrives, and offering the gain onward, toward something larger than oneself, keeps its good fortune whole.",
      "One is increased through unfortunate events, no blame, if genuinely sincere and walking in the middle way, one reports this with the seal of a duke. Even hardship can carry a real, hidden increase within it, provided it is met honestly and reported without exaggeration or concealment.",
      "Walking in the middle, one reports to the prince, and he follows, it furthers one to be used in the removal of the capital's affairs. Genuine, tactful counsel from the middle position is heard and acted on, useful especially for a major, structural change.",
      "With real sincerity in your heart, do not question it, supreme good fortune, with real sincerity, virtue is recognized as your own. Deep, unfeigned sincerity requires no external proof, its own good fortune is simply self-evident.",
      "No one actually increases him, indeed, someone even strikes him, he does not keep his resolve constant, misfortune. Increase attempted from pure self-interest, without any real constancy behind it, meets active resistance rather than gain.",
    ],
  },
  {
    number: 43, chinese: "夬", pinyin: "Guài", english: "Breakthrough",
    upper: "dui", lower: "qian",
    keywords: ["Resolute decision", "Lake over Heaven", "The last obstruction removed"],
    judgment: "Lake above Heaven, water pooled right at the top, about to break and pour down freely. One must resolutely make the matter known at the king's court, in real truth and with a warning, danger, announce it in your own city, it does not further to resort to arms, this is the moment to speak the truth clearly and decisively, without turning to force.",
    image: "The Lake has risen up to Heaven, the image of Breakthrough. The noble one dispenses riches downward to those below, and refrains from resting on their own virtue, real resolution is completed by generosity.",
    lines: [
      "Powerful in the forward-striding toes, going and not succeeding brings blame. Pushing ahead too soon, before real support and timing are behind you, brings real fault.",
      "A cry of alarm, arms at evening and at night, fear nothing. Real vigilance, sustained even through the ordinary hours, is what actually keeps this position genuinely safe.",
      "To be powerful in the cheekbones brings misfortune, the noble one is firmly resolved, walking alone, meets with rain, becomes wet, is despised, no blame. Visible, showy resolve invites real criticism, while a quiet, unwavering inner resolve, even if misunderstood, remains without fault.",
      "There is no skin on his thighs, his walk is impeded, if he were to be led like a sheep, remorse would disappear, but hearing these words, he will not believe them. Resistance to following a wiser lead, even when clearly better for oneself, causes a real, avoidable difficulty.",
      "Weeds are removed with utter resolution, walking in the middle, no blame. Genuine, thorough resolve, exercised from a real position of balance, is entirely correct here.",
      "No cry, in the end misfortune. A resolution reached with no real, open acknowledgment, kept silent right at the final moment, undermines the whole breakthrough.",
    ],
  },
  {
    number: 44, chinese: "姤", pinyin: "Gòu", english: "Coming to Meet",
    upper: "qian", lower: "xun",
    keywords: ["Unplanned encounter", "Heaven over Wind", "A single yin returns"],
    judgment: "Heaven above Wind, wind moving invisibly under the whole of heaven, touching everything without being asked. The maiden is powerful, one should not marry such a maiden, this is a real, unplanned encounter, powerful and significant, but not yet one to bind oneself to permanently.",
    image: "Under Heaven, Wind, the image of Coming to Meet. The prince, acting in accordance with this, disseminates his commands and proclaims them to the four quarters, a real, unplanned meeting still needs to be met with clear, open communication.",
    lines: [
      "Checked with a golden brake, perseverance brings good fortune, if one lets it go somewhere, one meets with misfortune, even a lean pig has it in him to rage around. A small but genuine new influence needs to be firmly restrained right at its start, or its real, disruptive power will grow.",
      "There is a fish in the bag, no blame, it does not further to invite guests. Contained, this new influence brings no fault, but it is not yet the moment to widen its reach or invite more into it.",
      "There is no skin on his thighs, his walk is impeded, danger, but no great blame. Real hesitation and discomfort mark this position, but the situation itself does not carry serious fault.",
      "No fish in the bag, this leads to misfortune. What should have been contained has slipped away unnoticed, this real absence itself becomes the misfortune.",
      "A melon covered with willow leaves, hidden lines, then it drops down to me from Heaven. Real, unexpected fortune can arrive from what looks, on the surface, like an ordinary, minor thing.",
      "He comes to meet with his horns, humiliation, no blame. Meeting with excessive force or defensiveness, right at the very end of this encounter, is an awkward outcome, but not truly at fault.",
    ],
  },
  {
    number: 45, chinese: "萃", pinyin: "Cuì", english: "Gathering Together",
    upper: "dui", lower: "kun",
    keywords: ["Real assembly", "Lake over Earth", "Convening under a true center"],
    judgment: "Lake above Earth, water gathering into a basin, drawn there by the shape of the ground itself. Success, the king approaches his temple, it furthers one to see the great man, success, perseverance furthers, real gathering needs a genuine, worthy center to convene around, and the proper ceremony to hold it.",
    image: "The Lake rises up over the Earth, the image of Gathering. The noble one renews their weapons and implements, to be prepared against the unforeseen, a real gathering must also prepare.",
    lines: [
      "If genuinely sincere, but not to the end, there will sometimes be confusion, sometimes gathering, if you call out, then after one grasp of the hand you can laugh again, do not fear, going brings no blame. Wavering sincerity at the start of a gathering can be resolved simply by openly reaching out, real connection restores itself quickly once it is called for honestly.",
      "Being led, good fortune, no blame, if genuinely sincere, it furthers one to bring even a small offering. Allowing oneself to be genuinely drawn along, and offering something real even if modest, is entirely sound.",
      "Gathering together amid sighs, nothing that would further, going brings no blame, slight humiliation. Frustration at not yet being included does not itself bar a real, if imperfect, path forward.",
      "Great good fortune, no blame. A position of real influence, used to genuinely serve and secure the larger gathering, is fully sound here.",
      "In gathering together one holds a real, true position, no blame, if there are still some who are not genuinely sincere, an enduring effort of leadership will win them over too. Authentic authority at the center of a gathering can still, with real, sustained effort, bring the remaining doubters in.",
      "Lamenting and sighing, floods of tears, no blame. Real grief at feeling excluded, even at the very edge of the gathering, is not itself a fault, only the unresolved feeling of it.",
    ],
  },
  {
    number: 46, chinese: "升", pinyin: "Shēng", english: "Pushing Upward",
    upper: "kun", lower: "xun",
    keywords: ["Gradual, genuine ascent", "Earth over Wind", "Growth like a tree"],
    judgment: "Earth above Wind, a shoot pushing gently and steadily upward through the very ground above it. Supreme success, one must see the great man, fear not, departure toward the south brings good fortune, this is real, organic growth, slow but structurally sound, worth pursuing with genuine confidence.",
    image: "Within the Earth, Wood grows, the image of Pushing Upward. The noble one, of devoted character, accumulates the small in order to achieve the high and great, real ascent is built from many small, consistent increments.",
    lines: [
      "Pushing upward that meets with real confidence, great good fortune. Genuine trust at the very outset of a slow ascent secures the whole of it.",
      "If genuinely sincere, it furthers one to bring even a small offering, no blame. A modest, honest gesture, offered with real sincerity, is entirely sufficient to keep this ascent sound.",
      "One pushes upward into an empty city. Real advance meeting no resistance at all moves forward easily, though it is worth noticing whether the ease itself has real substance behind it.",
      "The king offers him Mount Chi, good fortune, no blame. Genuine recognition granted at a significant, sacred place marks a real, secure stage of this ascent.",
      "Perseverance brings good fortune, one pushes upward by steps. Real advancement continues securely so long as it is taken one true, deliberate step at a time.",
      "Pushing upward in darkness, this furthers through ceaseless perseverance. Real ascent can continue even without visible confirmation, if one's own inner constancy simply does not waver.",
    ],
  },
  {
    number: 47, chinese: "困", pinyin: "Kùn", english: "Oppression / Exhaustion",
    upper: "dui", lower: "kan",
    keywords: ["Constrained resources", "Lake over Water", "Inner strength amid real limitation"],
    judgment: "Lake above Water, the lake's own water has drained down through into the gorge, leaving itself dry. Success, perseverance, the great man brings about good fortune, no blame, when one has real words to say, they are not believed, this is a time of genuine external constraint, met best by an unshaken, quiet inner strength.",
    image: "There is no water in the Lake, the image of Exhaustion. The noble one stakes their own life to fulfill their true purpose, real oppression tests exactly how deep one's own commitment actually goes.",
    lines: [
      "One sits oppressed under a bare tree, and strays into a gloomy valley, for three years one does not see one's true way. Real oppression met with resignation rather than resourcefulness leaves one genuinely lost for a long time.",
      "One is oppressed while at meat and drink, the scarlet knee-bands are just arriving, it furthers one to offer sacrifice, to advance brings misfortune, no blame. Even amid real, immediate abundance, a deeper constraint remains, patience and genuine humility, rather than a forceful advance, is what's actually needed.",
      "One is oppressed by stone, one leans on thorns and thistles, one enters one's own house and does not see one's wife, misfortune. Grasping at something unstable for support in real difficulty leaves one genuinely without the comfort or partnership one most needs.",
      "One comes very quietly, oppressed in a golden carriage, humiliation, but the end is reached. Deliverance from real constraint can arrive slowly and without fanfare, even burdened still by outward appearances, and does genuinely arrive.",
      "One's nose and feet are cut off, oppression at the hands of the man with the purple knee-bands, joy comes softly, it furthers one to make offerings and libations. Real, painful constraint at the hands of an unworthy authority is eased through patient ritual and quiet inner devotion.",
      "One is oppressed by creeping vines, one moves uncertain and says, movement brings regret, if one feels regret over this and goes forth, good fortune. Even entangled at the very furthest reach of real oppression, honest recognition of the need to move, and then genuinely moving, brings good fortune.",
    ],
  },
  {
    number: 48, chinese: "井", pinyin: "Jǐng", english: "The Well",
    upper: "kan", lower: "xun",
    keywords: ["The unchanging source", "Water over Wind", "What nourishes stays in place"],
    judgment: "Water above Wind, water drawn steadily up out of the ground by a rope lowered again and again. The town may be changed, but the well cannot be changed, it neither decreases nor increases, this is the image of a real, unmoving source, one that serves everyone who comes to it, whoever they are.",
    image: "Water over Wood, the image of the Well. The noble one encourages the people at their work, and exhorts them to help one another, a real, shared source calls people to actually tend and share it.",
    lines: [
      "One does not drink the mud of the well, no animals come to an old well. A source left unused and neglected for too long stops actually serving anyone, even itself.",
      "At the wellspring, one shoots fish, the jug is broken and leaks. Real, natural nourishment goes to waste when the means of drawing on it is itself flawed or neglected.",
      "The well is cleaned, but no one drinks from it, this is my heart's sorrow, for one might draw from it, if the king were clear-minded, good fortune would come to all. A genuinely good, restored source that goes unused because no one in real authority notices it is a real, quiet grief.",
      "The well is being lined, no blame. Practical, ongoing maintenance of a real source, even when it produces nothing visible yet, is entirely sound.",
      "In the well there is a clear, cold spring, one may actually drink from it. A source now fully restored and genuinely pure is ready, at last, to actually nourish.",
      "One draws from the well without hindrance, it is reliable, supreme good fortune. A source fully open and freely available to all who come is the complete, ideal fulfillment of this hexagram.",
    ],
  },
  {
    number: 49, chinese: "革", pinyin: "Gé", english: "Revolution",
    upper: "dui", lower: "li",
    keywords: ["Real transformation", "Lake over Fire", "Change trusted only in its own time"],
    judgment: "Lake above Fire, water and fire directly opposing and consuming each other until something entirely new results. On your own day, you are believed, supreme success, perseverance furthers, remorse disappears, real revolution needs its moment fully ripe, and needs to be trusted by others, before it can actually hold.",
    image: "Fire in the middle of the Lake, the image of Revolution. The noble one sets the calendar in order and makes the seasons clear, real change must still establish a real, trustworthy new order once the old one is gone.",
    lines: [
      "Wrapped in the hide of a yellow ox. At the very start of change, real restraint, holding still rather than moving, is what actually keeps this early stage secure.",
      "When one's own day comes, one may create revolution, to go forward brings good fortune, no blame. Once real timing and trust are both present, moving decisively toward change is entirely sound.",
      "Going forward brings misfortune, perseverance brings danger, when talk of revolution has gone the rounds three times, one may commit oneself, and one is believed. Rushing into declared change before it has been genuinely deliberated invites real trouble, patience through the full discussion earns real trust.",
      "Remorse disappears, one is believed, changing the mandate brings good fortune. Once genuine trust in the change is fully secured, a true, structural shift can now proceed with good result.",
      "The great man changes like a tiger, even before the oracle is consulted there is real confidence. A truly great change, enacted by one of real character, is so evidently right that it needs no further confirmation.",
      "The noble one changes like a panther, the inferior person changes only their face, to go forward brings misfortune, to remain persevering in a correct course brings good fortune. Real, deep change transforms a person's whole conduct, superficial change only alters appearance, only the deep kind actually holds.",
    ],
  },
  {
    number: 50, chinese: "鼎", pinyin: "Dǐng", english: "The Cauldron",
    upper: "li", lower: "xun",
    keywords: ["Real transformation, cooked", "Fire over Wind", "Vessel of sacred nourishment"],
    judgment: "Fire above Wind, fire fed steadily by wind from below, the classic image of the sacrificial cauldron actually cooking. Supreme good fortune, success, this hexagram concerns the vessel itself, the actual container that transforms raw material into real, refined nourishment, worth caring for as much as its contents.",
    image: "Fire over Wood, the image of the Cauldron. The noble one consolidates their own true destiny by making their position correct, real transformation depends on the integrity of the vessel doing the transforming.",
    lines: [
      "A cauldron with legs turned upward, it furthers one to remove real stagnation, one takes a concubine for the sake of her son, no blame. Even something upended and seemingly wrong can still serve a real, practical purpose, if it clears out what was blocking it.",
      "There is real food in the cauldron, my comrades are envious, but they cannot harm me, good fortune. Genuine, well-earned substance draws envy from others, but envy alone cannot actually touch what is real and rightly held.",
      "The handle of the cauldron is altered, one is impeded in one's way of life, the fat of the pheasant is not eaten, once the rain falls, remorse is spent, good fortune comes in the end. Real access to what one has actually earned can be temporarily blocked by circumstance, patience through the block brings the good fortune eventually anyway.",
      "The legs of the cauldron are broken, the prince's meal is spilled, his person is soiled, misfortune. Taking on more real responsibility than one's own strength or character can actually bear leads to a visible, disgraceful failure.",
      "The cauldron has yellow handles, golden carrying rings, perseverance furthers. A real, well-made vessel, strong at its central point of connection, is soundly secure.",
      "The cauldron has rings of jade, great good fortune, nothing that does not further. At its very completion, this vessel of real transformation becomes something refined and genuinely precious, fully and completely good.",
    ],
  },
  {
    number: 51, chinese: "震", pinyin: "Zhèn", english: "The Arousing, Thunder",
    upper: "zhen", lower: "zhen",
    keywords: ["Shock doubled", "Thunder repeated", "The startle that returns composure"],
    judgment: "Thunder repeated, shock rolling out and then rolling out again right behind it. Success, shock comes, oh, oh, laughing words, ha, ha, afterward, the shock terrifies for a hundred miles, but he does not let fall the sacrificial spoon and chalice, real shock, met without dropping what matters most, restores composure right after it passes.",
    image: "Thunder repeated, the image of Shock. The noble one, in real fear and trembling, sets their own life in order and examines themselves, genuine shock, taken seriously, is used as an occasion for real self-examination.",
    lines: [
      "Shock comes, oh, oh, then laughing words, ha, ha, good fortune. Facing the very first startle directly, and finding real composure again right after, is entirely sound.",
      "Shock comes, bringing danger, a hundred thousand cowries are lost, one climbs the nine hills, do not go in pursuit, in seven days one gets them back. A real loss under shock, met by retreating to safety rather than chasing it, restores itself naturally within its own true time.",
      "Shock comes and makes one distraught, if shock spurs one to action, one remains free of real misfortune. Startled disorientation, if it is actually used to move rather than freeze, does not become a lasting misfortune.",
      "Shock is mired. Real, prolonged shock without any composure returning at all leaves one genuinely stuck.",
      "Shock goes hither and thither, danger, however, nothing at all is lost, yet there are real things to be done. Repeated shock from multiple directions, though it feels precarious, does not actually cost anything of real substance, if one keeps attending to what still needs doing.",
      "Shock brings ruin and distress, terrified, seeing eyes roll, going forth brings misfortune, if shock comes upon his own house rather than upon his neighbor's, no blame, marriage talk brings adverse comment. Shock that finally, and rightly, strikes one's own affairs directly, rather than merely watching a neighbor's trouble, is not itself a fault, even amid genuine, visible distress.",
    ],
  },
  {
    number: 52, chinese: "艮", pinyin: "Gèn", english: "Keeping Still, Mountain",
    upper: "gen", lower: "gen",
    keywords: ["Stillness doubled", "Mountain repeated", "True rest, undisturbed"],
    judgment: "Mountain repeated, one immovable form resting directly on another. Keeping the back still, so that one no longer feels one's own body, one goes into one's courtyard and does not see one's own people there, no blame, this is stillness so complete it moves past even ordinary self-consciousness, a genuine, restorative rest.",
    image: "Mountains standing close together, the image of Keeping Still. The noble one does not let their thoughts go beyond their own actual situation, real stillness is thought that stays where the body already is.",
    lines: [
      "Keeping one's toes still, no blame, perseverance furthers over the long term. Stopping any movement right at its very first impulse is the easiest, most sound way to secure real stillness.",
      "Keeping one's calves still, one cannot rescue the one whom one follows, one's own heart is not glad. Wanting to stop movement one is not actually free to stop yet brings a real, felt frustration.",
      "Keeping one's hips still, making the sacrum stiff, dangerous, the heart suffocates. Forcing stillness onto a part of the body or life that actually needs to move creates a real, uncomfortable rigidity.",
      "Keeping one's trunk still, no blame. Real, whole-body stillness, held at the actual center of oneself, is entirely sound.",
      "Keeping one's jaws still, the words have real order, remorse disappears. Even speech, when genuinely restrained and ordered rather than let run loose, contributes to this stillness rather than breaking it.",
      "Noble-hearted keeping still, good fortune. Stillness reached at last with real integrity and genuine maturity is the fullest, best expression of this whole hexagram.",
    ],
  },
  {
    number: 53, chinese: "漸", pinyin: "Jiàn", english: "Gradual Progress",
    upper: "xun", lower: "gen",
    keywords: ["Slow, correct development", "Wind over Mountain", "The wild goose's flight"],
    judgment: "Wind over Mountain, the wind's patient, gradual work upon the mountain's fixed, still form. The maiden is given in marriage, good fortune, perseverance furthers, this hexagram concerns real development that must, by its own genuine nature, unfold slowly, correctly, step by step, like a wild goose's migration.",
    image: "On the Mountain, a tree grows gradually, the image of Development. The noble one abides in real virtue and improves the customs of the people, gradual progress here works through consistent, patient presence.",
    lines: [
      "The wild goose gradually draws near the shore, the young son is in danger, there is talk, no blame. A real, early step into new, unfamiliar ground carries some genuine risk and criticism, but is not actually at fault.",
      "The wild goose gradually draws near the cliff, eating and drinking in peace and concord, good fortune. Real progress reaching a position of genuine safety and shared contentment is soundly good.",
      "The wild goose gradually draws near the plateau, the man goes forth and does not return, the woman carries a child but does not bring it to term, misfortune, it furthers one to fight off robbers. Advance made too far, too fast, out past what is genuinely sustainable, results in a real loss, active defense of what remains is what is actually needed now.",
      "The wild goose gradually draws near the tree, perhaps it will find a flat branch, no blame. Even an unlikely or improvised resting place, found through real adaptability, keeps this gradual advance safely on course.",
      "The wild goose gradually draws near the summit, for three years the woman has no child, in the end nothing can hinder her, good fortune. Real progress delayed for a long stretch, through no true fault, eventually and reliably completes itself regardless.",
      "The wild goose gradually draws near the cloud heights, its feathers can be used for the sacred dance, good fortune. Gradual, patient development, carried all the way through to its natural height, becomes something genuinely fit for real, sacred use.",
    ],
  },
  {
    number: 54, chinese: "歸妹", pinyin: "Guī Mèi", english: "The Marrying Maiden",
    upper: "zhen", lower: "dui",
    keywords: ["The subordinate union", "Thunder over Lake", "Right conduct in an unequal bond"],
    judgment: "Thunder above Lake, movement stirring an open, joyous surface into real, if uneven, relationship. Undertakings bring misfortune, nothing that furthers, this hexagram concerns a real bond entered from a genuinely subordinate or secondary position, and it warns that acting from ambition, rather than right conduct, inside such a bond, brings real trouble.",
    image: "Thunder over the Lake, the image of the Marrying Maiden. The noble one understands the transient in the light of the real, enduring end, a bond entered under real constraint is still worth conducting rightly, for the sake of what it can genuinely become.",
    lines: [
      "The marrying maiden as a concubine, a lame man who is still able to tread, undertakings bring good fortune. Entering a genuinely secondary role with modesty and real acceptance, rather than resentment, can still bring good result.",
      "A one-eyed man who is still able to see, it furthers one who has been wronged to persevere in seclusion. Limited real standing within a bond is still made workable through quiet, patient constancy.",
      "The marrying maiden as a slave, she marries as a concubine instead. Entering a bond from a position lower than one deserves invites a settling for less than genuinely possible.",
      "The marrying maiden delays the appointed time, a later marriage comes in due time. Real patience, waiting for a genuinely proper union rather than a hasty one, is rewarded in its own true time.",
      "The sovereign gives his daughter in marriage, her own embroidered garments were less fine than those of the serving maid, the moon that is nearly full brings good fortune. Real, high substance held with real modesty, rather than outward show, is what actually brings good fortune here.",
      "The woman holds a basket, but there are no real fruits in it, the man stabs the sheep, but there is no real blood, nothing that furthers. A union performed only in empty ritual, with no genuine substance actually behind it, furthers nothing at all.",
    ],
  },
  {
    number: 55, chinese: "豐", pinyin: "Fēng", english: "Abundance",
    upper: "zhen", lower: "li",
    keywords: ["Peak fullness", "Thunder over Fire", "The sun at its zenith, briefly"],
    judgment: "Thunder above Fire, brightness and sudden movement together, a moment of real, dazzling fullness. Success, the king attains this abundance, be without real sorrow, it befits the sun at midday, this is a genuine peak, brilliant but naturally brief, worth using fully while it lasts rather than mourning its passing in advance.",
    image: "Both Thunder and Lightning arrive, the image of Abundance. The noble one decides real lawsuits and carries out real punishments, at a peak of real clarity and power, this is the moment to actually settle what has waited.",
    lines: [
      "Meeting one's true master, though for ten days, no blame, going forth meets with real recognition. A real, if brief, meeting with a genuine equal or ally, early in this peak, is met with true appreciation.",
      "The curtain is of such fullness that the polestar can be seen at noon, going forth brings real suspicion and hatred, if one arouses him through genuine sincerity, good fortune comes. Excess brightness can, oddly, obscure true sight, real sincerity, rather than more display, is what actually cuts through this at its height.",
      "The underbrush is of such fullness that small stars can be seen at noon, he breaks his right arm, no blame. At the true center of abundance, real injury or loss can occur without carrying any lasting fault, if the abundance itself remains genuinely sound.",
      "The curtain is of such fullness that the polestar can be seen at noon, he meets his true equal, good fortune. Meeting a real, genuine peer right at the height of abundance is the ideal, fullest expression of this position.",
      "Lines are coming, blessing and fame draw near, good fortune. Real, well-earned recognition and lasting good fortune arrive together at this stage.",
      "His house is in a state of abundance, he screens off his own family, he peers through the gate and no one else is there, for three years he sees nobody, misfortune. Abundance hoarded and shut away from real relationship, rather than shared, becomes its own kind of genuine isolation and loss.",
    ],
  },
  {
    number: 56, chinese: "旅", pinyin: "Lǚ", english: "The Wanderer",
    upper: "li", lower: "gen",
    keywords: ["The traveler", "Fire over Mountain", "Belonging nowhere, briefly"],
    judgment: "Fire above Mountain, the fire moving on, never staying fixed to the still mountain beneath it. Success in small matters, perseverance brings good fortune to the wanderer, this is real, temporary displacement, and the guidance is modesty, caution, and clarity, since a stranger has no real standing of their own to fall back on.",
    image: "Fire on the Mountain, the image of the Wanderer. The noble one is clear-minded and cautious in imposing real punishments, and does not protract real lawsuits, a stranger's real position calls for restraint.",
    lines: [
      "If the wanderer busies themselves with petty, real matters, they bring upon themselves real misfortune. Wasting a stranger's limited real standing on small, needless concerns invites real trouble.",
      "The wanderer comes to an inn, he has his real property with him, he obtains the loyalty of a young servant, perseverance. A modest, secure place to actually stay, with enough real resource and one genuine, faithful ally, is the sound position of a wanderer.",
      "The wanderer's inn burns down, he loses the loyalty of his young servant, perseverance brings danger. Overreaching a wanderer's real, limited standing, acting as though truly settled, risks losing both shelter and support.",
      "The wanderer rests in a real shelter, he obtains his property and an axe, my heart is not glad. Even reasonable, practical security for a wanderer does not remove the real, underlying unease of not yet truly belonging.",
      "He shoots a pheasant, it drops at the first arrow, in the end this brings both praise and real office. A single, real, well-aimed act of genuine skill can, for a wanderer, still earn real recognition and standing.",
      "The bird's nest burns down, the wanderer laughs at first, then must needs lament and weep, through carelessness he loses his ox, misfortune. Overconfidence at the very peak of a wanderer's temporary fortune, forgetting the real fragility of the position, brings a real loss.",
    ],
  },
  {
    number: 57, chinese: "巽", pinyin: "Xùn", english: "The Gentle, Wind",
    upper: "xun", lower: "xun",
    keywords: ["Penetration doubled", "Wind repeated", "Influence through persistence"],
    judgment: "Wind repeated, one gentle, penetrating current moving continuously through another. Success through what is small, it furthers one to have somewhere to go, it furthers one to see the great man, real gentleness here works precisely because it never stops, patient repetition is the whole method.",
    image: "Winds following one upon the other, the image of the Gentle. The noble one spreads their real commands abroad and carries out real, repeated undertakings, genuine influence is renewed continuously.",
    lines: [
      "In advancing and in retreating, the perseverance of a real soldier furthers. Some early hesitation about direction is genuinely settled by disciplined, repeated resolve rather than by a single decisive act.",
      "Real penetration under the bed, priests and magicians are used in great number, good fortune, no blame. Reaching a deep, hidden concern requires real, sustained, perhaps unusual effort, and this thoroughness is entirely sound.",
      "Repeated penetration, this brings real humiliation. Gentle influence pushed anxiously, again and again past its natural point, becomes its own real source of shame.",
      "Remorse disappears, during the hunt three kinds of game are caught. Genuine, patient, repeated effort, applied correctly, does eventually yield a real, varied gain.",
      "Perseverance brings good fortune, remorse disappears, nothing that does not further, no beginning, but an end, before the change, three days, after the change, three days, good fortune. A real, needed correction, given proper deliberation on both sides of the shift, brings genuine good fortune despite an uncertain start.",
      "Real penetration under the bed, he loses his property and his axe, perseverance brings misfortune. Gentle influence pursued so obsessively it undermines one's own real, practical foundation is no longer gentle at all, and becomes a real loss.",
    ],
  },
  {
    number: 58, chinese: "兌", pinyin: "Duì", english: "The Joyous, Lake",
    upper: "dui", lower: "dui",
    keywords: ["Joy doubled", "Lake repeated", "Genuine, shared pleasure"],
    judgment: "Lake repeated, one open, reflective surface meeting another. Success, perseverance furthers, real joy here is genuine only when it is shared and mutual, joy taken alone, or joy used to flatter, is not the true joy this hexagram actually points to.",
    image: "Lakes resting one upon the other, the image of the Joyous. The noble one joins with friends for real discussion and practice, genuine joy, at its best, is a shared, active exchange.",
    lines: [
      "Real, harmonious joy, good fortune. Joy that is genuinely at peace within itself, without needing anything external to complete it, is entirely sound.",
      "Real, sincere joy, good fortune, remorse disappears. Joy grounded in real, honest connection resolves whatever hesitation remained.",
      "Coming joy, misfortune. Joy that is chased or courted from outside oneself, rather than arising from real sincerity, brings genuine misfortune.",
      "Joy that is weighed and considered is not at peace, after ridding oneself of real mistakes, there is real cause for joy. Discernment about which pleasures are genuinely worth having, even if uncomfortable at first, leads to a more real, lasting joy.",
      "Real sincerity toward what is corrupting, danger. Trust extended toward something genuinely harmful or degrading, simply because it brings pleasure, is a real hazard.",
      "Joy that draws one on. Being pulled along by pleasure past its own natural, sound limit is a caution worth heeding at the very end of this hexagram.",
    ],
  },
  {
    number: 59, chinese: "渙", pinyin: "Huàn", english: "Dispersion",
    upper: "xun", lower: "kan",
    keywords: ["Dissolving what has hardened", "Wind over Water", "Scattering a blockage"],
    judgment: "Wind above Water, wind moving across a still, frozen surface until it breaks and scatters. Success, the king approaches his temple, it furthers one to cross the great water, perseverance furthers, this is a real dissolving of something that had become too rigid, too separate, the movement to be made is toward real, sacred reconnection.",
    image: "The Wind drives over the Water, the image of Dispersion. The ancient kings offered sacrifice to God and built temples, real dispersion of a hardened block is met by consciously rebuilding a shared, sacred center.",
    lines: [
      "One brings assistance with the strength of a real horse, good fortune. Acting early, with real, immediate support, addresses a coming dispersion before it fully sets in.",
      "At the dissolution, he hurries to that which supports him, remorse disappears. Genuinely reaching for real, available support, right as fragmentation begins, prevents lasting regret.",
      "He dissolves his own self, no remorse. Real willingness to let go of personal, separate interest, right at the heart of a scattering situation, is what actually reunites it.",
      "He dissolves his own bond with his group, supreme good fortune, dispersion leads in turn to accumulation, this is something ordinary people do not think of. A real, larger unity sometimes requires dissolving a smaller, narrower faction first, an insight not obvious to conventional thinking.",
      "His loud cries are as dissolving as sweat, dissolution, a king abides without blame. Real, decisive communication from genuine authority, given at the height of dispersion, is what finally dissolves the danger without fault.",
      "He dissolves his own blood, departing, keeping at a real distance, going out, no blame. Removing oneself fully, and with real, deliberate distance, from what has become genuinely harmful, is entirely sound at this final stage.",
    ],
  },
  {
    number: 60, chinese: "節", pinyin: "Jié", english: "Limitation",
    upper: "kan", lower: "dui",
    keywords: ["Right measure", "Water over Lake", "The banks that give a river its course"],
    judgment: "Water above Lake, the lake's real capacity giving the water flowing into it its actual shape and limit. Success, galling limitation must not be persevered in, real limitation here is the actual structure, like a riverbank, that lets something genuinely flow at all.",
    image: "Water over the Lake, the image of Limitation. The noble one creates real number and measure, and examines the nature of virtue and correct conduct, real limitation is what actually gives virtue its clear, workable form.",
    lines: [
      "Not going out of the door and the courtyard, no blame. Recognizing early, correctly, when real restraint is what the moment calls for is entirely sound.",
      "Not going out of the gate and the courtyard, misfortune. The very same restraint, held past the point it is actually needed, becomes a real, self-defeating error instead.",
      "He who knows no limitation will have cause to lament, no blame. A real lack of discipline brings its own natural, corrective grief, this in itself, honestly met, is not further at fault.",
      "Contented limitation, success. Real limitation, accepted willingly rather than resented, brings genuine, sound success.",
      "Sweet, real limitation brings good fortune, going forth brings esteem. Limitation held with real ease and grace, rather than bitterness, is met with real, active respect.",
      "Galling limitation, perseverance brings misfortune, remorse disappears. Limitation pushed to a harsh, punishing extreme is genuinely unsound, though the discomfort of recognizing this at least resolves the underlying regret.",
    ],
  },
  {
    number: 61, chinese: "中孚", pinyin: "Zhōng Fú", english: "Inner Truth",
    upper: "xun", lower: "dui",
    keywords: ["Sincerity that moves even stone", "Wind over Lake", "The center genuinely open"],
    judgment: "Wind above Lake, moving invisibly over an open surface and stirring it from within. Pigs and fishes, good fortune, it furthers one to cross the great water, perseverance furthers, real inner truth reaches even what is normally unreachable, dumb creatures and hard obstacles alike, because it is genuinely, quietly whole at its own center.",
    image: "Wind over the Lake, the image of Inner Truth. The noble one discusses real criminal cases with care, in order to delay the death sentence, real sincerity extends compassion even into judgment.",
    lines: [
      "Being prepared brings good fortune, if there are secret designs, this is disquieting. A real, settled inner readiness is sound, but any hidden, divided motive underneath it disturbs the whole truth of the position.",
      "A crane calling in the shade, its young answers it, I have a good goblet, I will share it with you. Real, genuine resonance calls out and is answered in kind, and what is genuinely good is naturally, freely shared.",
      "He finds a companion, now he beats the drum, now he stops, now he sobs, now he sings. Real, deep connection can move through a whole range of genuine feeling, without any of it undoing the truth of the bond itself.",
      "The moon nearly full, the team horse goes astray, no blame. Even a position near real completion can still lose a partner or a piece along the way, without this being any true fault.",
      "He possesses real, truthful sincerity, he ties people to himself, no blame. Genuine sincerity, held at the very center of real influence, is what actually and rightly binds others to it.",
      "Cockcrow penetrating to Heaven, perseverance brings misfortune. A sincerity so loudly performed it becomes mere noise, no longer genuinely felt, is a real caution at the very height of this hexagram.",
    ],
  },
  {
    number: 62, chinese: "小過", pinyin: "Xiǎo Guò", english: "Small Exceeding",
    upper: "zhen", lower: "gen",
    keywords: ["Small, careful excess", "Thunder over Mountain", "The flying bird stays low"],
    judgment: "Thunder above Mountain, movement rolling out just above a fixed peak, near the ground rather than far above it. Success, perseverance furthers, small things may be done, great things should not be done, the flying bird brings the message, it is well to remain below, this is a real time for modest, careful exceeding.",
    image: "Thunder on the Mountain, the image of Small Exceeding. The noble one, in ordinary conduct, gives more real weight to reverence, in bereavement, more real weight to sorrow, in expenditure, more real weight to thrift, small excess, well placed, is where genuine care actually shows.",
    lines: [
      "The bird meets with real misfortune through flying too high. Ambition that overreaches this genuinely modest moment invites its own real, avoidable trouble.",
      "She passes by her real ancestor and meets her ancestress, he does not reach his real prince and meets the official, no blame. Reaching a somewhat lesser, still genuine, and appropriate target, rather than the greatest possible one, is entirely sound right now.",
      "If one is not exceedingly careful, somebody may come from behind and strike him, misfortune. Even a small excess, if approached carelessly rather than with real vigilance, exposes one to real, avoidable harm.",
      "No blame, he meets him without exceeding, going brings danger, one must be on one's guard, do not act, be persistently persevering. Real restraint, avoiding any further excess right now, is what keeps this position safe, ongoing caution is the right practice.",
      "Dense clouds, no rain from our western region, the prince shoots and hits him who is in the cave. Even real, focused effort at this stage produces something more contained than hoped, a modest, precise gain rather than an abundant one.",
      "He does not meet him, he passes by him, the flying bird leaves him, misfortune, this means real disaster and injury. Excess taken well past its own natural, small measure, all the way to the point of missing what actually mattered, becomes genuinely harmful.",
    ],
  },
  {
    number: 63, chinese: "既濟", pinyin: "Jì Jì", english: "After Completion",
    upper: "kan", lower: "li",
    keywords: ["Everything settled, and already turning", "Water over Fire", "Vigilance at the peak"],
    judgment: "Water above Fire, the two elements met in their exact right balance, water actually able to cook what fire heats. Success in small matters, perseverance furthers, at the start good fortune, at the end disorder, this is a genuine, real completion, but it is precisely the moment order is most complete that decline quietly begins, vigilance now matters more than celebration.",
    image: "Water over Fire, the image of the condition After Completion. The noble one takes real thought of possible misfortune, and guards against it in advance, real completion is best honored by continued care.",
    lines: [
      "He brakes his wheels, he gets his tail in the water, no blame. Real, deliberate caution right at the start of a completed situation, even if it slows things down, prevents an avoidable difficulty.",
      "The woman loses the curtain of her carriage, do not run after it, on the seventh day you will get it back. A small, real loss at this stage resolves itself naturally within its own true time, chasing it only wastes real effort.",
      "The Illustrious Ancestor attacks the Devil's Country, after three years he conquers it, inferior people should not be employed. A real, hard-won, and drawn-out victory still requires trustworthy, capable people to actually hold and use it well afterward.",
      "The finest clothes turn to rags, be cautious all day long. Even real prosperity, fully achieved, needs constant, quiet vigilance to keep from unraveling.",
      "The neighbor in the east who slaughters an ox does not attain as much real happiness as the neighbor in the west with his small offering of thanksgiving. A smaller, genuinely sincere act of gratitude actually outweighs a grander, more showy one at this stage.",
      "He gets his head in the water, danger. At the very end of a real completion, even a small further step taken carelessly reintroduces genuine risk, this hexagram's core warning, made explicit at its close.",
    ],
  },
  {
    number: 64, chinese: "未濟", pinyin: "Wèi Jì", english: "Before Completion",
    upper: "li", lower: "kan",
    keywords: ["Not yet finished", "Fire over Water", "The crossing still to be made"],
    judgment: "Fire above Water, the two elements now out of true alignment, fire's heat rising away from water rather than meeting it. Success, but if the little fox, after nearly completing the crossing, gets its tail wet, there is nothing that would further, this is a genuine, real threshold, not yet crossed, and the caution here is against carelessness right at the very final step.",
    image: "Fire over Water, the image of the condition Before Completion. The noble one is careful in the real discrimination of things, so that each finds its true place, an unfinished situation is set right by real, patient discernment.",
    lines: [
      "He gets his tail wet, humiliation. Acting before real readiness, right at the very start of a genuine, unfinished crossing, brings an avoidable, small disgrace.",
      "He brakes his wheels, perseverance brings good fortune. Deliberate, real restraint, even amid the pull to move faster, is the sound approach here.",
      "Before completion, to attack brings misfortune, it furthers one to cross the great water. Real, hasty aggression at this stage does not serve, though the larger, careful crossing itself is still genuinely worth attempting.",
      "Perseverance brings good fortune, remorse disappears, shock, thus to discipline the Devil's Country, for three years, great rewards are bestowed on the great state. Sustained real effort, however long and demanding, does complete itself and bring a genuine, substantial reward in the end.",
      "Perseverance brings good fortune, no remorse, the light of the noble one is real and true, good fortune. Genuine, sustained integrity, held all the way through this unfinished crossing, is rewarded with real, true good fortune.",
      "There is real, true sincerity while drinking wine, no blame, but if one wets one's head, one loses it, in the way that is right. Genuine, well-earned celebration at the very end of a long crossing is entirely sound, so long as it does not, at the very last moment, tip over into losing what was actually gained.",
    ],
  },
];

// King Wen number lookup by upper+lower trigram key, derived at runtime
// from the array above (King Wen order isn't algorithmically derivable
// from binary line values, so this reverse map is built from the
// authored sequence rather than computed independently).
export const hexagramByTrigrams: Record<string, Hexagram> = Object.fromEntries(
  hexagrams.map((h) => [`${h.upper}-${h.lower}`, h]),
);

export function findHexagram(upper: TrigramKey, lower: TrigramKey): Hexagram | undefined {
  return hexagramByTrigrams[`${upper}-${lower}`];
}

export function hexagramByNumber(n: number): Hexagram | undefined {
  return hexagrams.find((h) => h.number === n);
}

// Six line values (bottom to top), each 6, 7, 8, or 9 in the traditional
// numbering: 6 = old yin (changing, 0), 7 = young yang (stable, 1),
// 8 = young yin (stable, 0), 9 = old yang (changing, 1).
export type LineValue = 6 | 7 | 8 | 9;

export function lineIsYang(v: LineValue): boolean {
  return v === 7 || v === 9;
}

export function lineIsChanging(v: LineValue): boolean {
  return v === 6 || v === 9;
}

/** Resolve six cast line values into the primary hexagram, the resulting
 *  (changed) hexagram if any lines are moving, and which line positions
 *  (1-6, bottom to top) are changing. */
export function resolveHexagrams(values: [LineValue, LineValue, LineValue, LineValue, LineValue, LineValue]) {
  const bits = values.map((v) => (lineIsYang(v) ? "1" : "0"));
  const upperBits = bits.slice(3, 6).join("");
  const lowerBits = bits.slice(0, 3).join("");
  const upper = trigramByBits(upperBits);
  const lower = trigramByBits(lowerBits);
  const primary = upper && lower ? findHexagram(upper.key, lower.key) : undefined;

  const changingPositions = values
    .map((v, i) => (lineIsChanging(v) ? i + 1 : 0))
    .filter((n) => n > 0);

  let resulting: Hexagram | undefined;
  if (changingPositions.length > 0) {
    const changedBits = bits.map((b, i) =>
      lineIsChanging(values[i]) ? (b === "1" ? "0" : "1") : b,
    );
    const cUpper = trigramByBits(changedBits.slice(3, 6).join(""));
    const cLower = trigramByBits(changedBits.slice(0, 3).join(""));
    resulting = cUpper && cLower ? findHexagram(cUpper.key, cLower.key) : undefined;
  }

  return { primary, resulting, changingPositions };
}
