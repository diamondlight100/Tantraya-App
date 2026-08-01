// Buddhist figures, bodhisattvas, yidams, and buddhas, worked with in the
// Buddhist pathway. Structured the same way as the Ten Mahavidyas.

export type DeityPractice = {
  title: string;
  detail: string;
};

export type BuddhistDeity = {
  slug: string;
  order: number;
  name: string;
  epithet?: string;
  nameMeaning: string;
  accentColor: string;
  image: string;
  atAGlance: string | null;
  myth: string | null;
  symbolism: string | null;
  energy: string | null;
  forPractitioner: string | null;
  practices: DeityPractice[] | null;
};

export const buddhistDeities: BuddhistDeity[] = [
  {
    slug: "green-tara",
    order: 1,
    name: "Green Tara",
    epithet: "Saviouress, swift to act",
    nameMeaning: '"She who guides across", the bodhisattva of compassion moving as action rather than as a wish.',
    accentColor: "#3F7A57",
    image: "/buddhist/deities/green-tara.jpg",
    atAGlance:
      "Green-skinned, seated with her right leg extended and foot resting on a small lotus, ready to rise and act rather than seated in full lotus stillness. One hand at her heart in the gesture of giving refuge, the other in the gesture of granting boons, holding the stems of two blue lotuses at her shoulders. Among the most widely practised figures in Tibetan Buddhism, invoked especially for swift, practical help in genuine difficulty.",
    myth: "The most common origin story tells of a princess named Yeshe Dawa, Moon of Wisdom, who lived many aeons ago and generated bodhichitta, the aspiration to reach enlightenment for the sake of all beings, with unusual depth and sincerity. Monks around her suggested that once she had accumulated enough merit, she should pray to be reborn as a man in order to continue toward buddhahood, since it was assumed at the time that only a male body could reach full enlightenment.\n\nShe refused. She stated directly that there was no inherent maleness or femaleness in enlightenment itself, that the distinction existed only in the confused minds of those who believed it mattered, and she vowed to keep taking female rebirth, life after life, until she attained buddhahood as a woman, and to continue working for the benefit of beings in female form even after that. She kept the vow. Tara is understood as the fulfilment of exactly that promise, an enlightened being who deliberately continues to appear in female form as a direct rejection of the idea that gender is any obstacle to complete realization.",
    symbolism:
      "Her extended leg and half-rising posture are read very literally in Tibetan iconographic tradition, she is not depicted at rest the way many meditational buddhas are. She is shown in the instant before standing, already moving toward whoever has called her, which is exactly consistent with her reputation as the swiftest of all bodhisattvas to respond to a sincere request for help. Practitioners frequently describe turning to her specifically in moments of real danger or fear, travel, illness, financial crisis, natural disaster, rather than reserving her for slow, contemplative practice alone.\n\nThe blue lotuses she holds, utpala, are associated with purity that arises directly out of difficult conditions, the same image the lotus carries throughout Buddhist and Hindu iconography, rooted in mud, untouched by it. Her green colour is tied in Tibetan medical and elemental symbolism to the wind element, associated with action, movement, and the rapid accomplishing of activity, distinct from the more still, contemplative associations carried by other colours in the same system.",
    energy:
      "Green Tara belongs to the enlightened activity family within Vajrayana practice, the aspect of realization concerned specifically with getting things done in the world rather than with contemplative stillness alone. She is frequently paired with, and sometimes considered a direct emanation of, Avalokiteshvara, the bodhisattva of compassion, her activity read as compassion given hands and feet, compassion that moves rather than compassion that simply feels for another's suffering from a distance.\n\nHer practice is unusually accessible by Vajrayana standards, requiring comparatively little formal preliminary training compared to many other yidam practices, which is part of why she has become one of the most widely practised figures across every Tibetan lineage regardless of sectarian affiliation. This accessibility is not a sign of lesser depth. It reflects her specific function, she is meant to be called on directly and often, in real difficulty, by practitioners at every level of training.",
    forPractitioner:
      "Green Tara's practice tends to matter most exactly when things are genuinely difficult, as something you actually reach for under real pressure. The invitation is to notice where you're facing a real difficulty right now, however large or small, and to practice calling on swift, active help rather than either struggling through it entirely alone or waiting passively for circumstances to resolve on their own.",
    practices: [
      {
        title: "The refuge gesture in real difficulty",
        detail:
          "The next time you face something genuinely stressful, pause and physically bring one hand to your heart in the gesture of refuge, and ask directly for help, whether from Tara, from your own deeper resource, or simply from the part of you capable of clear action. Notice what shifts in your body when you actually ask rather than white-knuckling through alone.",
      },
      {
        title: "Tara mantra",
        detail:
          "Recite om tare tuttare ture svaha for a set period each day, ideally at a consistent time, letting the repetition become a steady, portable anchor you can return to whenever the day gets difficult.",
      },
      {
        title: "Swift, decisive action",
        detail:
          "Identify one thing you've been putting off out of fear or hesitation, and take direct, swift action on it, in the spirit of Tara's extended leg, already moving rather than waiting for perfect conditions.",
      },
      {
        title: "Compassion in motion",
        detail:
          "Notice someone in genuine need and act on their behalf promptly rather than only feeling sympathy for them. Let compassion actually move through you into a concrete, timely action rather than remaining a private feeling.",
      },
      {
        title: "The vow of continued return",
        detail:
          "Reflect on Yeshe Dawa's vow to keep returning in whatever form serves beings best, and consider where in your own life you've assumed a certain form or role is required before you can be of real use to others. Notice whether that assumption is actually true.",
      },
    ],
  },
  {
    slug: "padmasambhava",
    order: 2,
    name: "Padmasambhava",
    epithet: "Guru Rinpoche, the Lotus-Born",
    nameMeaning: "The founder-figure of Tibetan Vajrayana, the one who bound the land's own forces into protectors of the dharma.",
    accentColor: "#B5651D",
    image: "/buddhist/deities/padmasambhava.jpg",
    atAGlance:
      "Shown seated, holding a vajra in his right hand at his heart and a skull-cup containing a vase of long life in his left, a khatvanga staff, marked with three severed heads, resting in the crook of his left arm. Wears a lotus-petal hat and layered robes marking him as both a fully realized tantric master and a subduer of hostile forces. Regarded by the Nyingma lineage of Tibetan Buddhism as a second Buddha, the one who established Vajrayana in Tibet.",
    myth: "According to the most widely told account, he did not arrive in the world through ordinary birth. He appeared, already an eight-year-old child, seated on a lotus blossom in the middle of Lake Dhanakosha, discovered there by King Indrabhuti, who raised him as his own. This miraculous, motherless birth is central to how he is understood, a being who arrives already accomplished rather than one who develops toward realization gradually the way ordinary practitioners must.\n\nHis defining historical work happened in Tibet in the eighth century, invited by King Trisong Detsen to help establish Buddhism in a land where the native Bon religion and its associated spirits and deities actively resisted the new teaching. Padmasambhava travelled through Tibet subduing hostile local spirits and deities one by one, binding each under oath to protect the dharma rather than obstruct it, not destroying them, converting former obstacles into permanent guardians of the teaching. This is why so many of Tibet's fiercest protector deities are described as bound by Guru Rinpoche's own oath rather than simply invented by Buddhist teachers from nothing. He is also credited with concealing termas, hidden teachings, throughout the Tibetan landscape and within the minds of future disciples, to be revealed at exactly the right future moment by qualified tertons, treasure-revealers, when the world was ready to receive them.",
    symbolism:
      "The vajra held at his heart marks him as a fully realized tantric adept, the indestructible, diamond-like nature of enlightened mind made into a physical implement. The skull-cup and vase of long life point at his mastery over death itself, tradition holds that he never died in the ordinary sense but departed for the Copper-Coloured Mountain, a pure realm, still active and reachable by sincere practitioners today rather than a historical figure confined to the past.\n\nThe khatvanga staff he carries, marked with three skulls representing the transformation of the three poisons, ignorance, attachment, and aversion, into wisdom, is traditionally associated with his consort Yeshe Tsogyal, and points at a central feature of his teaching, that realization in the Vajrayana approach happens through direct transformation of what's already present in ordinary experience. His eight recognized manifestations, taken on at different points to meet different circumstances, from a wrathful subduer of demons to a serene teacher of monks, show the same principle from another angle, a single realization expressing itself through whatever form the moment actually requires.",
    energy:
      "Padmasambhava occupies a unique place in Tibetan Buddhism as the figure who made the entire tradition possible in that specific land, and Guru Yoga, a practice of visualizing him directly above or in front of oneself and requesting his blessing, is among the most widely practised devotional exercises across every Nyingma and many non-Nyingma lineages alike. He represents a specific kind of power that differs from the more purely meditative buddhas, the capacity to meet genuine resistance, hostile forces, difficult circumstances, and outright obstruction, directly and transform it rather than needing calm, favourable conditions before the work can begin.\n\nHis subduing of Tibet's local deities is frequently read, beyond its literal historical meaning, as a template for inner practice, that whatever resists your own practice, doubt, distraction, old fear, old grievance, can be met the same way he met Tibet's hostile spirits, through a firm, skilled binding rather than violent suppression, that turns the obstacle itself into something that now serves your practice rather than blocks it.",
    forPractitioner:
      "Working with Padmasambhava is about meeting whatever is currently resisting your own growth directly rather than avoiding it or waiting for it to pass on its own. His example suggests that obstacles, inner or outer, are rarely something to simply eliminate. They're something to engage with skilfully, converting their force into something that now works for you rather than against you, the exact method he used on the very land his teaching first took root in.",
    practices: [
      {
        title: "Naming the obstacle",
        detail:
          "Identify precisely what is currently obstructing your own practice or growth, a habit, a fear, a specific person or circumstance, and instead of trying to eliminate it outright, ask what it would mean to bind it under a different purpose, to have it serve your growth rather than block it.",
      },
      {
        title: "Guru Yoga",
        detail:
          "Spend a session visualizing Padmasambhava seated above the crown of your head or directly in front of you, radiant and present, and request his blessing sincerely, allowing whatever arises, calm, clarity, resolve, to settle into you as though received directly from him.",
      },
      {
        title: "The vajra mind",
        detail:
          "In the days ahead, when you notice fear, doubt, or hesitation arising, bring to mind the image of the vajra at his heart, indestructible, unshaken, and ask what it would mean to meet the same situation from that same unshakeable ground.",
      },
      {
        title: "Vajra Guru mantra",
        detail:
          "Recite om ah hum vajra guru padma siddhi hum for a set period daily, letting the mantra become a steady point of contact with the same quality of unwavering presence the practice is meant to cultivate.",
      },
      {
        title: "Hidden treasure",
        detail:
          "Reflect on the idea of terma, teachings hidden until the right moment, and consider what wisdom or capacity you already carry within yourself that hasn't yet been revealed or drawn on, because the right circumstance for it hasn't yet arrived, or because you haven't yet looked for it directly.",
      },
    ],
  },
  {
    slug: "medicine-buddha",
    order: 3,
    name: "Medicine Buddha",
    epithet: "Bhaiṣajyaguru, the Buddha of Healing",
    nameMeaning: '"Guru of remedies", lapis-blue, holding the myrobalan fruit, the archetype of healing turned into a full path.',
    accentColor: "#1E3A5F",
    image: "/buddhist/deities/medicine-buddha.jpg",
    atAGlance:
      "Deep lapis-lazuli blue in colour, seated in the meditation posture of a fully awakened buddha, right hand extended downward in the gesture of supreme generosity, holding the stem of a myrobalan plant, the fruit traditionally used in Tibetan and Ayurvedic medicine to treat nearly every ailment. Left hand rests in the lap holding a begging bowl filled with healing nectar. One of the seven, or in some enumerations eight, medicine buddhas, but overwhelmingly the one invoked in ordinary practice.",
    myth: "According to the sutra devoted to him, in a past life as a bodhisattva he made twelve great vows before attaining buddhahood, and it is these vows, more than any single dramatic episode, that define who he is and what he does. Among them: that his own body would blaze with light capable of illuminating countless world systems, that he would provide whatever beings genuinely lack, food, clothing, medicine, and that any being who heard his name with sincere faith would be freed from disease, poverty, and untimely death. He did not simply promise healing in some vague future life. He built the entire structure of his path around the specific, concrete relief of suffering in this one.\n\nUnlike more dramatic mythic figures whose stories involve battle, sacrifice, or miraculous birth, Medicine Buddha's defining story is essentially a vow taken with total seriousness and then completely fulfilled, which is itself the point. His power comes from the fact that he actually did what he said he would do, rather than from any single spectacular episode.",
    symbolism:
      "The myrobalan fruit he holds is not a symbolic afterthought. It's one of the most used medicinal plants in the Tibetan pharmacopoeia, credited with the ability to treat an unusually wide range of ailments, and its presence in his hand signals directly that his domain is genuine, practical medicine, not abstract spiritual healing alone, body and mind treated as inseparable rather than as two separate concerns requiring two separate approaches.\n\nHis deep blue colour, the colour of lapis lazuli, is associated in Tibetan symbolism with purity, depth, and the vast, clear sky, a colour that suggests something both precious and completely without stain. The begging bowl of nectar in his lap points at his capacity to actually transmit healing rather than merely diagnose or describe it, nectar here standing for a substance that heals simply by being received.",
    energy:
      "Medicine Buddha practice sits at an unusually direct intersection of spiritual and physical concern within Vajrayana Buddhism, and it is one of the most commonly requested practices for the genuinely sick, whether the illness is one's own or that of someone close. His mantra, tayata om bekandze bekandze maha bekandze radza samudgate svaha, is recited widely across every Tibetan lineage specifically over food, water, and medicine before it's given to someone unwell, treating the mantra itself as a direct healing transmission rather than only a devotional gesture.\n\nHis twelve vows collectively describe a vision of healing that goes well past physical disease, freedom from poverty, from bad company, from wrong livelihood, from fear, are all included in his stated aims, treating suffering as a single interconnected field rather than a set of unrelated problems each needing its own separate remedy. Working with him seriously asks a practitioner to hold healing at exactly that scale, body, circumstance, and mind treated as genuinely continuous with one another rather than managed in isolation.",
    forPractitioner:
      "Medicine Buddha practice is straightforward in its aim even where the material behind it is deep: bring direct attention to whatever in you, or in someone close to you, actually needs healing right now, physical, emotional, or circumstantial, and work with it directly rather than around it. Medicine Buddha's practice rewards this kind of concrete, specific attention far more than vague, general aspiration toward wellness.",
    practices: [
      {
        title: "Medicine Buddha mantra over what you consume",
        detail:
          "Recite his mantra quietly over your food, water, or any medicine you take, treating the moment of preparation as part of the healing itself rather than a separate, unrelated step.",
      },
      {
        title: "Naming what needs healing",
        detail:
          "Identify specifically, in writing if it helps, what in you or someone close to you genuinely needs healing right now, physical, emotional, or circumstantial, and hold that specific need in mind during your practice rather than a generic wish for wellbeing.",
      },
      {
        title: "The twelve vows as a mirror",
        detail:
          "Read through Medicine Buddha's twelve vows slowly, one a day if it suits you, and ask honestly where you might extend the same quality of vow, concrete, specific, and fully intended to be carried out, into your own life or your own care for others.",
      },
      {
        title: "Radiating light",
        detail:
          "In meditation, visualize deep blue light radiating outward from your own heart center, reaching a specific person or situation that needs healing, and hold the image steadily rather than letting it stay abstract or unfocused.",
      },
      {
        title: "Practical medicine as practice",
        detail:
          "Notice where you've been neglecting practical, physical self-care, sleep, food, rest, movement, and treat attending to it as spiritual practice in its own right.",
      },
    ],
  },
  {
    slug: "vajrakilaya",
    order: 4,
    name: "Vajrakilaya",
    epithet: "Dorje Phurba, wrathful remover of obstacles",
    nameMeaning: '"Adamantine spike", the three-bladed ritual dagger given wrathful form, cutting through obstruction at the root.',
    accentColor: "#6B1E1E",
    image: "/buddhist/deities/vajrakilaya.jpg",
    atAGlance:
      "Wrathful, dark blue or black, three faces and six arms, standing amid flames in the midst of a charnel ground, wielding the phurba, the three-bladed ritual dagger that is both his weapon and his own body. Wears a crown of skulls, a tiger-skin skirt, and a garland of freshly severed heads, embracing his consort Diptachakra. One of the most important wrathful yidams in the Nyingma tradition, practised specifically for the removal of serious obstacles.",
    myth: "Vajrakilaya's origin is closely tied to Padmasambhava's own subjugation of hostile forces in Tibet and to an earlier account of the buddhas of the ten directions, faced with beings so steeped in violence and negativity that no peaceful teaching could reach them, manifesting collectively as a single wrathful deity capable of meeting that negativity on its own terms rather than trying to approach it gently from outside. Padmasambhava himself is recorded as having practised Vajrakilaya intensively at the cave of Yangleshöd in Nepal, and it was this practice, according to the tradition, that gave him the power he later used to bind Tibet's hostile spirits into dharma protectors.\n\nThe phurba itself has its own mythic history predating its adoption into Buddhist practice, understood in some tellings as a ritual implement that existed already among earlier shamanic and Bon traditions, and taken up and transformed by Padmasambhava and the tradition that followed him into a fully Buddhist tool, another instance of the same pattern that runs through so much of his work, meeting what already exists in a place and turning it directly toward the dharma rather than discarding it.",
    symbolism:
      "The phurba, the three-bladed dagger that gives the deity his name, is not merely a weapon he holds. In the fullest understanding of the practice, the deity and the phurba are the same thing, a single point of concentrated, wrathful clarity capable of piercing directly through obstacles that no gentler method can move. The three blades are read as representing the transformation of the three poisons, ignorance, attachment, and aversion, into the three forms of enlightened activity, the same transformation the khatvanga's three skulls represent in Padmasambhava's own iconography.\n\nHis wrathful appearance, flames, skulls, a charnel ground setting, is not a sign of malevolence directed at beings. Wrathful deities throughout Vajrayana iconography represent compassion in its most forceful, unyielding expression, the same compassion Green Tara embodies in swift, gentle action here appears as something closer to an unstoppable force, necessary precisely because some obstacles, inner and outer, simply do not yield to anything softer. His union with his consort represents the inseparability of skillful means and wisdom, method and insight functioning as a single act rather than two separate qualities working in sequence.",
    energy:
      "Vajrakilaya practice is reserved in traditional settings for students who have received proper empowerment and instruction, given the intensity of what it works with, and it is invoked specifically at moments of serious obstruction, whether that obstruction is external circumstance, illness, or deep, entrenched inner patterns that ordinary practice hasn't managed to shift. His function within the wider system of practice is precise: he does not pacify obstacles the way a peaceful deity might, gradually dissolving them through patience and gentle transformation. He cuts through them directly, at the root, in a single decisive action.\n\nThis is a genuinely different register of practice than most of what a student encounters early in Vajrayana training, and it exists for a reason, some knots really do need to be cut rather than slowly untangled, and pretending otherwise, out of a general preference for gentleness, can leave a serious obstacle in place far longer than necessary. Working with him, even at a distance, through study and respectful contemplation rather than full practice, is a useful corrective to the common assumption that every spiritual problem responds best to the softest available method.",
    forPractitioner:
      "Without formal empowerment, engagement with Vajrakilaya should stay at the level of respectful study and reflection rather than attempting the full practice itself. The value available at this level is real: noticing where in your own life you've been trying to gently coax loose an obstacle that actually needs to be cut through directly, decisively, and without further delay, and considering honestly whether continued gentleness in that specific case is patience or simply avoidance dressed up as patience.",
    practices: [
      {
        title: "Naming what needs cutting",
        detail:
          "Identify one obstacle, habit, or entrenched pattern in your life that you've been trying to soften or work around gradually, and ask honestly whether it actually requires a single, decisive, direct action instead. Consider what that action would look like even if you're not ready to take it yet.",
      },
      {
        title: "Contemplating wrathful compassion",
        detail:
          "Sit with the idea that ferocity and compassion are not opposites, and consider a time in your own life when the kindest available action was actually a firm, uncompromising one rather than a gentle one. Notice what made that firmness compassionate rather than merely harsh.",
      },
      {
        title: "The three poisons, examined",
        detail:
          "Notice, over the days ahead, moments where ignorance, attachment, or aversion visibly drives your own reactions, and simply name each one clearly as it arises, without judgment, as a preliminary to the deeper transformation the phurba represents.",
      },
      {
        title: "Respectful distance",
        detail:
          "Study his iconography and mythology directly without attempting formal practice, treating the encounter itself, flames, skulls, the three-bladed dagger, as a teaching about intensity and directness rather than something to imitate without proper preparation.",
      },
      {
        title: "Decisive completion",
        detail:
          "Choose one small task or decision you've been circling around indefinitely, and complete it decisively, in a single clean action rather than another round of gradual, half-committed effort.",
      },
    ],
  },
];

export const buddhistDeityBySlug = (slug: string) => buddhistDeities.find((d) => d.slug === slug);
