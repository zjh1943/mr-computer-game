function createSilentBackend({ tempo }) {
  const startedAt = Date.now();
  return {
    kind: 'silent',
    async unlock() { return true; },
    scheduleTone() {},
    stop() {},
    stopAll() {},
    setVolume() {},
    getBeatTime() { return (Date.now() - startedAt) / 1000 / (60 / tempo); }
  };
}

function createWebAudioBackend(Context, { tempo, volume }) {
  let context = null, master = null, origin = 0;
  const voices = new Set();

  function ensureContext() {
    if (!context) {
      context = new Context();
      master = context.createGain();
      master.gain.value = volume;
      master.connect(context.destination);
      origin = context.currentTime;
    }
    return context;
  }

  return {
    kind: 'web-audio',
    async unlock() {
      const current = ensureContext();
      await current.resume?.();
      return true;
    },
    scheduleTone({ frequency, at, duration = .12, waveform = 'sine', gain = .08 }) {
      const current = ensureContext(), oscillator = current.createOscillator(), envelope = current.createGain();
      oscillator.type = waveform;
      oscillator.frequency.value = frequency;
      oscillator.connect(envelope);
      envelope.connect(master);
      envelope.gain.setValueAtTime(.001, at);
      envelope.gain.exponentialRampToValueAtTime(gain, at + .01);
      envelope.gain.exponentialRampToValueAtTime(.001, at + duration);
      voices.add(oscillator);
      oscillator.onended = () => voices.delete(oscillator);
      oscillator.start(at);
      oscillator.stop(at + duration + .02);
    },
    stop(voice) { try { voice?.stop?.(); } catch {} },
    stopAll() { for (const voice of voices) { try { voice.stop(); } catch {} } voices.clear(); },
    setVolume(value) { ensureContext(); master.gain.value = value; },
    getCurrentTime() { return ensureContext().currentTime; },
    getBeatTime() { return context ? (context.currentTime - origin) / (60 / tempo) : 0; }
  };
}

export function createAudioBackend(env = globalThis, { tempo = 96, volume = .5 } = {}) {
  const Context = env.AudioContext || env.webkitAudioContext;
  return Context ? createWebAudioBackend(Context, { tempo, volume }) : createSilentBackend({ tempo });
}
