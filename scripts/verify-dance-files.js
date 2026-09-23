const assert=require('node:assert/strict'),fs=require('node:fs');
const {tracks,parseLyrics,captionAt}=require('../dance-music');
for(const t of tracks.filter(t=>t.mix)){
  const b=fs.readFileSync(t.audioFile);assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.readUInt32LE(40)/b.readUInt32LE(28),t.duration);
  let energy=0;for(let p=44+44100*4;p<b.length;p+=200)energy+=Math.abs(b.readInt16LE(p));assert.ok(energy>10000,'music cannot be silent');
  assert.equal(b.readUInt16LE(22),1);
}
const cues=parseLyrics('[00:01.50]hello\n[00:03][00:05.2]world\n[00:07.00]');
assert.equal(captionAt(cues,0),'');assert.equal(captionAt(cues,1.6),'hello');assert.equal(captionAt(cues,5.3),'world');assert.equal(captionAt(cues,7),'');assert.equal(captionAt(cues,20),'');
for(const file of ['computer-directions.png','cast-directions.png'])assert.ok(fs.statSync('assets/dance-poses/'+file).size>10000);
console.log('Local WAV duration, non-silent samples, lyric timing, pose assets passed');
