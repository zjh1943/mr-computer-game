const assert=require('node:assert/strict'),fs=require('node:fs');
const {tracks,parseLyrics,captionAt}=require('../dance-music');
for(const c of Object.values(require('../dance-cast')).filter(c=>c.audio)){const b=fs.readFileSync(c.audio);assert.equal(b.toString('ascii',0,4),'RIFF');let energy=0;for(let p=44+48000*2;p<b.length;p+=200)energy+=Math.abs(b.readInt16LE(p));assert(energy>10000,'complete voice cannot be silent');}
const cues=parseLyrics('[00:01.50]hello\n[00:03][00:05.2]world\n[00:07.00]');
assert.equal(captionAt(cues,0),'');assert.equal(captionAt(cues,1.6),'hello');assert.equal(captionAt(cues,5.3),'world');assert.equal(captionAt(cues,7),'');assert.equal(captionAt(cues,20),'');
for(const file of ['computer-directions.png','cast-directions.png'])assert.ok(fs.statSync('assets/dance-poses/'+file).size>10000);
console.log('Local WAV duration, non-silent samples, lyric timing, pose assets passed');
