/* Build the bundled, offline Friend Like You stage arrangement from local character voices. */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const RATE = 22050;
const DURATION = 150;
const FRAMES = RATE * DURATION;
const mix = new Float32Array(FRAMES);

function readMono(id) {
  const wav = fs.readFileSync(path.join(ROOT, 'assets', 'dance-audio', 'normal', `${id}.wav`));
  const channels = wav.readUInt16LE(22);
  const sourceRate = wav.readUInt32LE(24);
  const bits = wav.readUInt16LE(34);
  if (bits !== 16) throw new Error(`${id}: expected 16-bit WAV`);
  const bytes = wav.readUInt32LE(40);
  const frames = bytes / (channels * 2);
  const samples = new Float32Array(frames);
  for (let frame = 0, offset = 44; frame < frames; frame++) {
    let value = 0;
    for (let channel = 0; channel < channels; channel++, offset += 2) value += wav.readInt16LE(offset) / 32768;
    samples[frame] = value / channels;
  }
  return { samples, rate: sourceRate };
}

const voices = Object.fromEntries(['mr_tree', 'computer', 'oren', 'simon', 'tunner'].map(id => [id, readMono(id)]));
const add = (index, value) => { if (index >= 0 && index < FRAMES) mix[index] += value; };

function voiceNote(id, start, duration, semitone, gain, offsetSeconds) {
  const voice = voices[id], first = Math.floor(start * RATE), count = Math.floor(duration * RATE);
  const speed = 1.2 * Math.pow(2, semitone / 12); // Original voices are 100 BPM; this stage is 120 BPM.
  const sourceStart = Math.floor((offsetSeconds % (voice.samples.length / voice.rate)) * voice.rate);
  for (let i = 0; i < count; i++) {
    const at = first + i, source = (sourceStart + Math.floor(i * voice.rate / RATE * speed)) % voice.samples.length;
    const phase = i / Math.max(1, count - 1), envelope = Math.min(1, phase * 18, (1 - phase) * 12);
    add(at, voice.samples[source] * gain * Math.max(0, envelope));
  }
}

function drum(start, kind) {
  const count = Math.floor((kind === 'kick' ? .19 : .11) * RATE), first = Math.floor(start * RATE);
  for (let i = 0; i < count; i++) {
    const t = i / RATE, envelope = Math.exp(-t * (kind === 'kick' ? 22 : 32));
    const sample = kind === 'kick'
      ? Math.sin(2 * Math.PI * (92 - t * 250) * t) * envelope * .28
      : (Math.sin(i * 1.731) + Math.sin(i * 2.417)) * envelope * .055;
    add(first + i, sample);
  }
}

function bass(start, semitone) {
  const first = Math.floor(start * RATE), count = Math.floor(.48 * RATE), frequency = 55 * Math.pow(2, semitone / 12);
  for (let i = 0; i < count; i++) { const t = i / RATE, envelope = Math.min(1, t * 20) * Math.min(1, (.5 - t) * 8); add(first + i, Math.sin(2 * Math.PI * frequency * t) * .075 * Math.max(0, envelope)); }
}

const treeMelody = [0, 3, 5, 7, 5, 3, 2, -2, 0, 2, 3, 7, 5, 3, 0, -2];
const computerMelody = [7, 5, 3, 2, 0, 2, 5, 3, 7, 8, 7, 5, 3, 2, 0, 3];
const nightMelody = [-5, -2, 0, 3, -2, 0, 5, 3, -5, 0, 2, 6, 5, 2, 0, -2];
const totalBeats = Math.floor(DURATION * 2);
for (let beat = 0; beat < totalBeats; beat++) {
  const time = beat * .5, barBeat = beat % 8, phrase = Math.floor(beat / 8);
  drum(time, barBeat % 4 === 0 ? 'kick' : 'hat');
  if (barBeat === 2 || barBeat === 6) drum(time, 'snare');
  bass(time, [0, -3, -5, -2][Math.floor(beat / 8) % 4]);
  if (time < 55) {
    const treeTurn = phrase % 2 === 0, id = treeTurn ? 'mr_tree' : 'computer', melody = treeTurn ? treeMelody : computerMelody;
    voiceNote(id, time, .46, melody[beat % melody.length], .36, beat * .37);
    if (barBeat === 7) voiceNote(treeTurn ? 'computer' : 'mr_tree', time, .46, melody[(beat + 5) % melody.length], .2, beat * .29);
  } else if (time < 115) {
    const id = phrase % 2 ? 'computer' : 'mr_tree';
    voiceNote(id, time, barBeat === 6 ? .92 : .44, nightMelody[beat % nightMelody.length], .42, beat * .31);
    if (barBeat % 4 === 3) voiceNote(id === 'computer' ? 'mr_tree' : 'computer', time, .44, -5, .2, beat * .23);
  } else {
    voiceNote('mr_tree', time, .44, treeMelody[beat % treeMelody.length], .3, beat * .37);
    voiceNote('computer', time, .44, computerMelody[beat % computerMelody.length], .32, beat * .29);
    if (barBeat % 2 === 0) voiceNote(phrase % 2 ? 'simon' : 'tunner', time, .42, 0, .14, beat * .41);
  }
}

let peak = 0;
for (const value of mix) peak = Math.max(peak, Math.abs(value));
const scale = Math.min(1.35, .91 / Math.max(.001, peak));
const pcm = Buffer.alloc(FRAMES * 2);
for (let i = 0; i < FRAMES; i++) pcm.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(mix[i] * scale * 32767))), i * 2);

const wav = Buffer.alloc(44 + pcm.length);
wav.write('RIFF', 0); wav.writeUInt32LE(36 + pcm.length, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(RATE, 24); wav.writeUInt32LE(RATE * 2, 28);
wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(pcm.length, 40); pcm.copy(wav, 44);
const output = path.join(ROOT, 'assets', 'dance-audio', 'friend-like-you-safe.wav');
fs.writeFileSync(output, wav);
console.log(`Rendered ${path.relative(ROOT, output)} (${(wav.length / 1024 / 1024).toFixed(2)} MiB, peak ${peak.toFixed(3)})`);
