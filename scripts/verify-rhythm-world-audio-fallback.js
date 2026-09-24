const assert = require('assert');

(async () => {
  const { createAudioBackend } = await import('../rhythm-world/audio-capabilities.js');
  const silent = createAudioBackend({}, { tempo: 96 });
  assert.equal(silent.kind, 'silent');
  await silent.unlock();
  silent.scheduleTone({ frequency: 220, beat: 0 });
  silent.stopAll();
  assert(Number.isFinite(silent.getBeatTime()));

  let resumed = 0;
  class FakeContext {
    constructor() { this.currentTime = 1; this.destination = {}; }
    resume() { resumed += 1; return Promise.resolve(); }
    createGain() { return { gain: { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
    createOscillator() { return { frequency: { value: 0 }, connect() {}, start() {}, stop() {}, type: '' }; }
  }
  const web = createAudioBackend({ AudioContext: FakeContext }, { tempo: 96 });
  assert.equal(web.kind, 'web-audio');
  await web.unlock();
  assert.equal(resumed, 1);
  console.log('audio fallback verification passed');
})().catch(error => { console.error(error); process.exit(1); });
