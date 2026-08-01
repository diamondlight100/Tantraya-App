// A warm, singing-bowl-style bell synthesized via the Web Audio API, a
// fundamental tone plus two harmonic overtones, each with its own slow
// exponential decay. Shared by the meditation Timer, the Nadi Shodhana
// breathing widget, and the Mahavidya pause bell, so every chime in the app
// sounds like the same real bell rather than a flat computer beep.

export function getAudioContext(ref: { current: AudioContext | null }): AudioContext {
  if (!ref.current) {
    const AudioCtxCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ref.current = new AudioCtxCtor();
  }
  if (ref.current.state === "suspended") ref.current.resume();
  return ref.current;
}

/**
 * Rings a bell built around `baseFreq`, three harmonically related
 * partials (1x, 1.5x, 2x) rather than one flat sine tone, which is what
 * makes it sound like a struck bell instead of a beep.
 */
export function ringBell(ctx: AudioContext, baseFreq = 220, strength: "soft" | "full" = "full") {
  const now = ctx.currentTime;
  const partials: [ratio: number, gain: number, decay: number][] = [
    [1, strength === "full" ? 0.35 : 0.22, 4.5],
    [1.5, strength === "full" ? 0.16 : 0.1, 3.5],
    [2, strength === "full" ? 0.09 : 0.06, 2.5],
  ];

  for (const [ratio, gain, decay] of partials) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = baseFreq * ratio;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(gain, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    osc.connect(gainNode).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + decay + 0.1);
  }
}
