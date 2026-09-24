import { ORIGINAL_THEME, notesForKind } from './music-score.js';
import { getCharacterSoundProfile, notesForCharacter } from './character-sound.js';
import { createAudioBackend } from './audio-capabilities.js';

export function createAudioSystem(options = {}) {
  const tempo = ORIGINAL_THEME.tempo;
  const backend = createAudioBackend(options.env || globalThis, { tempo, volume: .5 });
  const loops = new Map();
  const status = { kind: backend.kind, audible: backend.kind !== 'silent', needsGesture: false };

  async function unlock() {
    try {
      await backend.unlock();
      status.audible = backend.kind !== 'silent';
      status.needsGesture = false;
      return true;
    } catch {
      status.audible = false;
      status.needsGesture = true;
      return false;
    }
  }

  function scheduleLoop(id, notes, profile) {
    stopLoop(id);
    const beat = 60 / tempo;
    const play = async () => {
      if (!await unlock()) return;
      const next = (backend.getCurrentTime?.() || 0) + .03;
      for (const note of notes) backend.scheduleTone({
        frequency: note.frequency,
        at: next + note.beat * beat,
        duration: .22 * profile.duration,
        waveform: profile.waveform,
        gain: .038 * profile.gain
      });
    };
    play();
    loops.set(id, setInterval(play, beat * ORIGINAL_THEME.steps * 1000));
  }

  function startLoop(id, kind = 'beat') {
    const waveform = kind === 'beat' ? 'square' : kind === 'voice' ? 'sawtooth' : kind === 'melody' ? 'triangle' : kind === 'bass' ? 'sawtooth' : 'sine';
    const duration = kind === 'beat' ? .55 : kind === 'melody' || kind === 'chord' ? 1.8 : kind === 'bass' ? 1.3 : 1;
    scheduleLoop(id, notesForKind(kind), { waveform, duration, gain: kind === 'beat' ? 1.6 : kind === 'bass' ? 1.2 : .86 });
  }

  function startCharacterLoop(id, characterId) { scheduleLoop(id, notesForCharacter(characterId), getCharacterSoundProfile(characterId)); }
  function stopLoop(id) { clearInterval(loops.get(id)); loops.delete(id); }
  function stopAll() { [...loops.keys()].forEach(stopLoop); backend.stopAll(); }

  return {
    unlock, startLoop, startCharacterLoop, stopLoop, stopAll,
    startEnsemble() { ['beat', 'bass', 'chord', 'melody', 'voice', 'whistle'].forEach(kind => startLoop(`concert-${kind}`, kind)); },
    setVolumes(value) { backend.setVolume?.(value); },
    setMuted() {}, setSolo() {},
    getBeatTime() { return backend.getBeatTime(); },
    getStatus() { return { ...status }; }
  };
}
