// The Way of Self-Enquiry, chapter content. Condensed and closely
// paraphrased from Tantraya's own study document "The Way of Self-Enquiry:
// Atma-Vichara, A Journey to the Source". The voice stays direct, plain,
// and non-devotional, the way the source document is already written:
// no flowery language, no borrowed Advaita jargon left unexplained.

export type SelfEnquiryChapter = {
  slug: string;
  n: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  widget?: "enquiry-cycle" | "obstacle-redirect" | "daily-prompt";
  practice: { steps: { title: string; detail: string; seconds?: number }[] };
  quiz: { q: string; options: string[]; answer: number; explain: string }[];
  journalPrompts: string[];
};

export const selfEnquiryChapters: SelfEnquiryChapter[] = [
  {
    slug: "what-self-enquiry-is",
    n: "I",
    title: "What Self-Enquiry Is",
    subtitle: "Atma-Vichara, and why appearance alone doesn't liberate",
    intro:
      "Self-enquiry, Atma-Vichara, is the practice of turning attention back on itself to find its own source, rather than out toward one more object, thought, or experience. The question at its center, 'Who am I?', is not a riddle to be solved once and filed away. It's asked, and re-asked, as a direct look, until looking itself changes what's seen.",
    sections: [
      {
        heading: "What the practice offers",
        body: "What self-enquiry offers is Moksha, liberation from samsara's cycle of suffering. Through persistent practice, the false identification with the body, mind, and personal history is worn through, and what remains is recognized as having been the actual ground all along, not something gained from outside.",
      },
      {
        heading: "Appearance is not the same as substance",
        body: "A dream can be completely convincing from inside it: it looks real, feels real, leads to consequences that feel real, right up until you wake. The appearance is completely convincing, which is exactly the point: convincing appearance and actual substance are two different things, and confusing them is the whole trap. A thought, a sensation, the appearance of a room, a face, a memory, is not a separate, external thing being witnessed by you from a distance. Mistaking the appearance of experience for something solid, including the appearance of a personal self, is the error self-enquiry is built to correct.",
      },
      {
        heading: "Why a dramatic experience doesn't automatically liberate",
        body: "A vision, a bliss state, an altered state, a peak ceremonial experience, can all be intensely convincing, and still change nothing fundamental, because the appearance of an experience, however dramatic, does not by itself hand over the seeing that would actually end the confusion. One reason appearance doesn't automatically liberate is that the mind meeting the appearance is itself still operating from inside the same confusion. A visionary opening and an ordinary Tuesday afternoon carry exactly the same weight here: neither has any more substance than the other. Both are appearance. What matters is not the intensity of what appears, but whether the looking itself has actually shifted.",
      },
      {
        heading: "Conditioning and the question of free will",
        body: "This holds even for the decisions that feel most personal and deliberate, the ones that feel most like 'me' choosing. Career, relationship, belief, the sense of freely choosing any of it is itself part of what gets examined, not exempted from the enquiry because it feels close to home. Self-enquiry doesn't ask you to first resolve the philosophical question of free will. It asks you to turn attention toward whoever it is that seems to be choosing, and look directly, rather than argue it out in the abstract.",
      },
    ],
    widget: undefined,
    practice: {
      steps: [
        { title: "Settle", detail: "Sit, let the breath find its own rhythm, no counting, no shaping it.", seconds: 45 },
        { title: "Recall a convincing appearance", detail: "Bring to mind one experience, ordinary or dramatic, that felt completely real and solid while it was happening.", seconds: 60 },
        { title: "Ask what actually changed", detail: "Be honest: did that experience, however intense, actually end any confusion, or just add one more convincing appearance to the pile?", seconds: 60 },
        { title: "Turn toward the one asking", detail: "Notice, briefly, whoever it is doing this noticing right now, before moving on.", seconds: 45 },
      ],
    },
    quiz: [
      {
        q: "What does self-enquiry, Atma-Vichara, ultimately offer, according to this document?",
        options: ["A more peaceful mood", "Moksha, liberation from samsara's cycle of suffering", "Better decision-making", "A permanent blissful experience"],
        answer: 1,
        explain: "The document names the aim directly as Moksha, liberation from the cycle of suffering, not an improved mood or a permanent special experience.",
      },
      {
        q: "Why doesn't a dramatic or visionary experience automatically liberate?",
        options: ["Because it isn't dramatic enough", "Because convincing appearance and actual substance are two different things, and the mind meeting it is still confused", "Because visions are always false", "Because liberation requires years of study first"],
        answer: 1,
        explain: "A dream is completely convincing from inside it, right up until waking. Appearance, however dramatic, isn't automatically the same as the seeing that ends confusion.",
      },
      {
        q: "How does self-enquiry approach the question of free will and personal choice?",
        options: ["It insists free will is real and personal, full stop", "It insists free will is an illusion and choice is meaningless", "It turns attention toward whoever seems to be choosing, and looks directly, rather than settling the question in the abstract first", "It avoids the topic entirely as irrelevant"],
        answer: 2,
        explain: "Even decisions that feel most personal are part of what gets examined. The practice looks directly at the one who seems to choose, rather than resolving free will philosophically first.",
      },
    ],
    journalPrompts: [
      "Name one experience in your own life, ceremonial or ordinary, that felt completely solid and real while it was happening. What, if anything, actually changed afterward?",
      "Where do you notice yourself treating a strong appearance (a mood, a vision, a belief about yourself) as though it were simply true, without examining it?",
      "What is your own history with this question 'Who am I?' before this course, if any?",
    ],
  },

  {
    slug: "the-witness-is-a-stage",
    n: "II",
    title: "The Witness Is a Stage, Not a Destination",
    subtitle: "Installing a witness, and why stopping there is a subtler trap",
    intro:
      "Self-enquiry begins by installing a witness: learning to stand back from the parade of thought, sensation, and feeling instead of being completely absorbed in it. This is a genuine and necessary first move. The danger is stopping there, and mistaking that vantage point for the destination itself.",
    sections: [
      {
        heading: "Standing back from the parade",
        body: "Ordinarily, the ground awareness itself is completely missed, because attention is fully absorbed in whatever arises. Learning to witness, to stand back and simply watch thought, sensation, and feeling pass, is how that ground first becomes noticeable at all. It is a real and necessary stage.",
      },
      {
        heading: "The trap hiding inside the witness",
        body: "If the witness is taken as the final destination, the result is a new, subtler duality: a real, changeless watcher over here, and a false, lesser world of objects over there. That is not liberation, it is a refined version of the same separation the practice is meant to dissolve, now wearing liberation's clothing.",
      },
      {
        heading: "Three tenets",
        body: "We draw from and extrapolate on a framework offered in three tenets: Brahman satyam, jagat mithya, jivo brahmaiva na aparah. Brahman is real; the world, as an independent, separate object, is not what it appears to be; and the individual self, looked at closely enough, turns out never to have been other than that same reality. What is witnessed is not a separate object being watched by a superior awareness standing apart from it, but awareness itself, taking these shapes, the way water takes the shape of a wave without ever stopping being water.",
      },
      {
        heading: "No escape, no elsewhere",
        body: "There is no separate, better place to relocate to, no purer inner room behind the witness where the real you is finally safe. The world, the body, the very witnessing itself, is not other than the awareness perceiving it. That recognition, not a refined inner witness held onto indefinitely, is the direction this practice actually points.",
      },
    ],
    widget: undefined,
    practice: {
      steps: [
        { title: "Settle", detail: "Sit and let attention gather without forcing it.", seconds: 45 },
        { title: "Stand back and witness", detail: "Let thoughts, sensations, and feelings simply pass, watching without engaging or pushing them away.", seconds: 90 },
        { title: "Notice the watcher itself", detail: "Now turn attention onto the watching itself. Is there really a separate watcher standing apart from what's watched, or is that a subtle assumption?", seconds: 90 },
        { title: "Let the separation soften", detail: "Don't force a conclusion. Just notice what happens when the assumed distance between watcher and watched is looked at directly.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "What is 'installing a witness' meant to be, according to this chapter?",
        options: ["The final destination of the practice", "A genuine and necessary first stage, not the end point", "An unnecessary step that can be skipped", "A purely intellectual exercise"],
        answer: 1,
        explain: "Standing back into a witness position is how the ground of awareness first becomes noticeable. It's a real, necessary stage, but not the destination.",
      },
      {
        q: "What happens if the witness is mistaken for the final goal?",
        options: ["Full liberation is achieved", "A new, subtler duality is created: a real watcher here, a lesser world of objects there", "The practice simply stops working", "Nothing, it's a harmless resting point"],
        answer: 1,
        explain: "Taking the witness as the destination just builds a refined version of the same separation the practice was meant to dissolve.",
      },
      {
        q: "What do the three tenets (Brahman satyam, jagat mithya, jivo brahmaiva na aparah) point toward?",
        options: ["The world is evil and must be renounced", "The individual self, looked at closely, turns out never to have been other than the one reality witnessing through it", "Only advanced yogis can understand awareness", "The witness should be maintained forever as the safest position"],
        answer: 1,
        explain: "Brahman is real, the world isn't a separate independent object the way it appears, and the individual self is never actually other than that same reality.",
      },
    ],
    journalPrompts: [
      "Where in your own practice or teaching have you noticed the temptation to treat 'witnessing' or 'being present' as the finish line?",
      "What would it actually mean, for you personally, that there is no separate elsewhere to escape to?",
      "Describe, in your own words and without borrowed jargon, the difference between watching a thought and being that thought.",
    ],
  },

  {
    slug: "the-mechanic-who-am-i",
    n: "III",
    title: "The Mechanic: Who Am I?",
    subtitle: "Not a mantra, not a philosophy, a direct four-step look",
    intro:
      "'Who am I?' is not a mantra to repeat and not a philosophical question to debate. It's a mechanic: a thought is noticed, traced back to whoever it arose for, and then held as a direct question aimed at that very 'I', not at an idea of it.",
    sections: [
      {
        heading: "The four-step mechanic",
        body: "The move is always the same, regardless of what's arisen. First, notice whatever is actually present: a thought, a feeling, a sensation. Second, ask directly, 'to whom has this arisen?' Third, register the honest answer: 'to me.' Fourth, hold the question 'Who am I?' aimed at that 'me' itself, not as a phrase repeated, but as a direct look into what that 'I' actually is when you go looking for it. Then, when the mind moves again, the cycle repeats.",
      },
      {
        heading: "It is not a mantra",
        body: "A mantra is repeated as a sound or phrase, its meaning secondary to its repetition. 'Who am I?' works the opposite way: repeated without the direct look, it becomes empty, just more mental noise. The words matter only as a pointer toward an actual, felt investigation, not as a phrase to chant.",
      },
      {
        heading: "It is not a philosophy debate",
        body: "Thinking about who you are, building a theory of self, arguing positions, is not the practice. That's the mind staying in familiar territory, generating more thought about the self instead of looking directly at the felt sense of 'I' itself. The instant the question turns into an argument, the practice has stopped, even though it looks like deep thinking.",
      },
      {
        heading: "Common misconceptions",
        body: "It's not a one-time question with a final answer that, once found, ends the practice. It's not a relaxation technique, though it can feel calming. It's not primarily an emotional or cathartic release, though feeling can arise and pass through it. And it doesn't require a special state, a quiet room, or years of preliminary training before it can be done for real. It's usable right now, on whatever is actually present.",
      },
    ],
    widget: "enquiry-cycle",
    practice: {
      steps: [
        { title: "Run the mechanic below", detail: "Use the Enquiry Cycle tool. It runs the actual four-step practice on a loop, live, for the session length you choose. There's nothing else to do here but sit with it.", seconds: 0 },
      ],
    },
    quiz: [
      {
        q: "What are the four steps of the core mechanic?",
        options: ["Breathe, count, release, repeat", "Notice what's present, ask 'to whom has this arisen', answer 'to me', hold 'Who am I?'", "Sit, visualize, chant, dissolve", "Observe, label, judge, let go"],
        answer: 1,
        explain: "The mechanic is: notice what's arisen, ask to whom, answer 'to me', then hold 'Who am I?' as a direct look at that 'me'.",
      },
      {
        q: "Why is 'Who am I?' not a mantra?",
        options: ["Because it has no real meaning", "Because a mantra's meaning is secondary to repetition, while this question only works as a direct, felt look, not a repeated phrase", "Because mantras must be in Sanskrit", "Because it's too short to be a mantra"],
        answer: 1,
        explain: "Repeated without the direct look, the question becomes empty noise. Its words are a pointer to an actual investigation, not a sound to chant.",
      },
      {
        q: "What happens when 'Who am I?' turns into a philosophical debate about the nature of self?",
        options: ["That is exactly the intended practice", "The practice has stopped, even though it may look like deep thinking", "It speeds up realization", "It's a required preliminary stage"],
        answer: 1,
        explain: "Arguing positions and building theories keeps the mind in familiar territory, generating thought about the self instead of directly looking at the felt sense of 'I'.",
      },
    ],
    journalPrompts: [
      "Run the Enquiry Cycle once, then write down, without editing, what actually happened when you held 'Who am I?', not what you think should have happened.",
      "Which of the common misconceptions listed here did you personally believe about this practice before reading this chapter?",
      "Notice one moment today where a strong thought or feeling arose. Trace it: to whom did it arise? What happened when you actually asked?",
    ],
  },

  {
    slug: "obstacles-and-ego-dissolution",
    n: "IV",
    title: "Obstacles and the Dissolution of the Ego",
    subtitle: "What actually gets in the way, and what to do about it",
    intro:
      "The path isn't smooth, and it isn't meant to be. Real obstacles show up predictably, and the ego doesn't dissolve in one clean break, it comes apart in recognizable phases. Knowing both in advance keeps you steady when they show up.",
    sections: [
      {
        heading: "Preparatory qualities that make the practice workable",
        body: "Before the mechanic itself, certain qualities make it actually workable: a sattvic lifestyle, ethical conduct, and above all mumukshutva, a genuine, burning yearning for liberation. Without that yearning, the practice tends to stay a technique performed rather than a real investigation followed through.",
      },
      {
        heading: "The obstacles",
        body: "Mental distraction, especially early on, where the mind simply won't settle. Intellectualization, turning the question into a debate instead of a direct look. Resistance or procrastination, when uncomfortable material surfaces and part of you wants to stop. Spiritual ego, where progress starts to feel like something 'I' achieved. Fear of ego dissolution, a real fear of losing control or of some kind of annihilation. A dark stretch of desolation or upheaval as old structures loosen before anything clearer arrives. Expecting a specific dramatic experience, bliss or vastness, that isn't showing up. And doubt about the method itself. Each has a direct redirect, not a reason to stop. Use the tool below when one of these actually shows up.",
      },
      {
        heading: "Recognizable phases of ego dissolution",
        body: "In practice, this tends to move through recognizable phases: deliberate self-attention during formal sessions, then longer stretches where the questioning quality carries over into ordinary activity even without deliberately starting it, and eventually something that operates on its own, in joy or in sorrow, without needing to be picked up and put down. What begins as a deliberate question, asked and re-asked, gradually becomes a natural, standing orientation rather than an effortful act.",
      },
      {
        heading: "What is actually being lost",
        body: "Surrender here is an active recognition of a greater reality beyond the separate self, not passive resignation. What dissolves through this process is the illusion of a separate, bounded self standing apart from everything else, not awareness itself, and not you. The fear that shows up around this point is real, but it's fear of losing something that was never what it appeared to be in the first place.",
      },
    ],
    widget: "obstacle-redirect",
    practice: {
      steps: [
        { title: "Name your current obstacle", detail: "Be honest about which obstacle from this chapter is actually showing up for you right now, if any.", seconds: 60 },
        { title: "Use the redirect tool below", detail: "Tap it in the Obstacle → Redirect tool and apply the exact redirect, not a general idea of 'trying harder'.", seconds: 0 },
        { title: "Return to the mechanic", detail: "Bring attention back to 'to whom has this obstacle arisen', applying the same mechanic to the obstacle itself.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "What is mumukshutva, and why does it matter here?",
        options: ["A breathing technique", "A genuine, burning yearning for liberation, without which the practice tends to stay a technique rather than a real investigation", "A type of mantra", "A dietary restriction"],
        answer: 1,
        explain: "Mumukshutva, the yearning for liberation, is named as perhaps the most crucial qualification for the practice to actually work.",
      },
      {
        q: "What's the redirect for 'spiritual ego', where progress starts to feel like something 'I' achieved?",
        options: ["Stop practicing until it passes", "Apply the question to this too: who is the one who progressed?", "Congratulate yourself and move to a harder practice", "Ignore it, it isn't a real obstacle"],
        answer: 1,
        explain: "Spiritual ego gets the same treatment as any other arising: turn the enquiry directly onto the sense of having progressed.",
      },
      {
        q: "What actually dissolves as ego dissolution proceeds?",
        options: ["Awareness itself", "The illusion of a separate, bounded self, not awareness and not you", "The physical body", "All emotion permanently"],
        answer: 1,
        explain: "What dissolves is the illusion of separateness, not awareness itself. The fear around this is real, but it's fear of losing something that was never solid to begin with.",
      },
    ],
    journalPrompts: [
      "Which single obstacle from this chapter do you recognize most in your own history with practice, tantric or otherwise?",
      "Describe, honestly, any fear that comes up for you around the idea of ego dissolution. What exactly do you picture losing?",
      "Where have you noticed the shift from a deliberate, effortful question toward something that runs more on its own, even briefly?",
    ],
  },

  {
    slug: "formal-constant-solitary-practice",
    n: "V",
    title: "Formal, Constant, and Solitary Practice",
    subtitle: "Bringing the enquiry into sitting, daily life, and being alone",
    intro:
      "Self-enquiry isn't confined to a cushion. It has a formal sitting form, a constant form that runs through ordinary activity, and a solitary form for when no formal context is available at all. Together they turn the practice into a thread running through the whole of a life, not a session bracketed off from it.",
    sections: [
      {
        heading: "Formal practice",
        body: "Formal sitting is where the mechanic is learned properly: a dedicated stretch of time, no other task competing for attention, running the notice, to-whom, to-me, who-am-I cycle deliberately and repeatedly. This is the training ground where the motion becomes familiar enough to carry elsewhere.",
      },
      {
        heading: "Constant enquiry",
        body: "Once the mechanic is familiar, it can be applied anywhere, at any time, not just in formal sessions: while showering, eating, walking, in conversation, whenever a strong emotion or thought hits. The question doesn't need a special setting. 'Who tastes this food? Who is walking? To whom does this feeling occur?' The point isn't to stop living to ask it, it's to let the asking run alongside living itself.",
      },
      {
        heading: "Solitary practice",
        body: "Practiced alone, without a teacher or group present in the moment, self-enquiry still works, because the mechanic doesn't depend on anyone else's presence. Solitary practice asks for the same honesty and the same willingness to actually look, without anyone checking your answers. Journaling afterward, rather than during, tends to keep the looking direct rather than turning it into a performance for the page.",
      },
      {
        heading: "Self-enquiry as a unifying thread",
        body: "Across formal sitting, constant enquiry through the day, and solitary practice alone, the same single mechanic runs underneath: notice, trace to whom, answer to me, hold who am I. What changes is only the setting it's run in, not the practice itself. Held this way, it stops being one more thing to schedule and becomes a way of meeting whatever is already happening.",
      },
    ],
    widget: "daily-prompt",
    practice: {
      steps: [
        { title: "Draw a daily prompt", detail: "Use the tool below to draw one prompt for actual daily-life use, not the whole list at once.", seconds: 0 },
        { title: "Carry it, don't schedule it", detail: "Use the drawn prompt the next time the relevant moment actually happens today, not later as a separate session.", seconds: 60 },
        { title: "Note what happened, briefly", detail: "After using it once, notice what actually shifted, if anything, without needing it to be dramatic.", seconds: 60 },
      ],
    },
    quiz: [
      {
        q: "What is formal practice mainly for?",
        options: ["Impressing a teacher", "Learning the mechanic properly, in a dedicated stretch of time with no competing task", "Only for beginners who will later abandon it", "Reciting scripture"],
        answer: 1,
        explain: "Formal sitting is the training ground: a dedicated stretch of time to run the mechanic deliberately until it becomes familiar enough to carry elsewhere.",
      },
      {
        q: "What is constant enquiry?",
        options: ["Repeating 'Who am I?' out loud all day", "Applying the same mechanic during ordinary activity, showering, eating, walking, conversation, without needing a special setting", "A stricter, longer version of formal sitting", "Enquiry practiced only during ceremonies"],
        answer: 1,
        explain: "Constant enquiry carries the same mechanic into daily activity: the question doesn't need a special setting, it runs alongside living itself.",
      },
      {
        q: "What does this document suggest about journaling during solitary practice?",
        options: ["Journal during the enquiry itself for accuracy", "Journal afterward rather than during, to keep the looking direct rather than a performance for the page", "Never journal about this practice", "Only journal in Sanskrit"],
        answer: 1,
        explain: "Journaling after, rather than during, tends to preserve the directness of the looking instead of turning it into writing for an audience.",
      },
    ],
    journalPrompts: [
      "Which of the three modes, formal, constant, or solitary, do you already practice most naturally, and which is weakest for you right now?",
      "Pick one ordinary daily activity you'll attach constant enquiry to for the next week. Name it specifically.",
      "Looking back across all five chapters, what has actually shifted in how you hold the question 'Who am I?', if anything, and what hasn't moved at all yet?",
    ],
  },
];
