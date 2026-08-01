// Curated seva (service) prompts, small, real, undramatic acts of
// generosity and kindness. Intentionally not grand or performative.

export const sevaSuggestions: string[] = [
  "Do the washing up if you see it in the sink, whether it's yours or not.",
  "Help someone who's struggling with their shopping bags, or at the checkout.",
  "Let someone go ahead of you in a queue, without being asked.",
  "Give your full, undistracted attention to someone who wants to talk.",
  "Leave a space, a room, or a shared area a little better than you found it.",
  "Offer your seat, your shade, or your shelter to someone who needs it more.",
  "Say something genuinely kind to someone who seems to be having a hard day.",
  "Forgive a small annoyance before it has the chance to become a grudge.",
  "Cook or share food with someone who might not have made time to eat well.",
  "Check in on someone you haven't heard from in a while, with no agenda.",
  "Pick up litter that isn't yours, without needing anyone to notice.",
  "Let go of being right, in a small disagreement that doesn't matter.",
  "Give a genuine compliment to a stranger.",
  "Do a task for someone in your household that isn't \"your job.\"",
  "Sit with someone in a difficult feeling, without trying to fix it.",
  "Offer patience to someone moving slower than you'd like, a queue, traffic, a child, an elder.",
  "Give your seat on public transport.",
  "Water a plant, feed an animal, or tend to something living that isn't yours to tend to.",
  "Send a message of appreciation to someone who doesn't know they're appreciated.",
  "Let someone merge, pass, or go first, on the road, on foot, or in conversation.",
];

export function randomSevaSuggestion(): string {
  return sevaSuggestions[Math.floor(Math.random() * sevaSuggestions.length)];
}
