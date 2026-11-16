const assert = require('node:assert/strict');
const { prepareStems } = require('../../dance-music');

(async () => {
  assert.equal(typeof prepareStems, 'function', 'reference stems need one scheduled audio clock');
  const previousFetch = global.fetch;
  const sources = [], gains = [];
  global.fetch = async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
  const ctx = {
    currentTime: 10, destination: {},
    decodeAudioData: async () => ({ duration: 30 }),
    createBufferSource() {
      const source = { connect() { return this; }, disconnect() {}, start(at) { this.at = at; }, stop(at) { this.stopped = true; this.stopAt=at; } };
      sources.push(source); return source;
    },
    createGain() {
      const gain = { value: 1, setValueAtTime(value) { this.value = value; }, linearRampToValueAtTime(value,at){this.ramp={value,at};} };
      gains.push(gain); return { gain, connect() { return this; }, disconnect() {} };
    }
  };
  try {
    const schedule = await prepareStems(ctx, { audioStems: ['Inst.ogg', 'Voices-Player.ogg', 'Voices-Opponent.ogg'] });
    const playback = schedule(11.25);
    assert.deepEqual(sources.map(s => s.at), [11.25, 11.25, 11.25]);
    playback.setVoice('opponent', false);
    assert.deepEqual(gains.map(g => g.value), [1, 1, 0], 'mute by stem identity, independent of file order');
    playback.setVoice('opponent', true);
    assert.equal(gains[2].value, 1);
    let ended = 0; playback.onended = () => ended++;
    sources[0].onended(); assert.equal(ended, 1);
    playback.stop(); assert(sources.every(s => s.stopped));
    assert.equal(sources[0].onended, null, 'stopping must not finish a replacement song');
    const cutSchedule=await prepareStems(ctx,{audioStems:['Inst.ogg','Voices-Player.ogg','Voices-Opponent.ogg'],playbackDuration:20});
    const cut=cutSchedule(12);
    assert.deepEqual(sources.slice(3).map(s=>s.stopAt),[32,32,32],'all channels end at the normal-edition boundary');
    assert(gains.slice(3).every(g=>g.ramp.at===32&&g.ramp.value===0));cut.stop();
    console.log('Stem start times, voice identity and cleanup verified.');
  } finally { global.fetch = previousFetch; }
})().catch(error => { console.error(error); process.exitCode = 1; });
