const assert=require('node:assert/strict');const {leadCharacter}=require('../computer-apps.js');const {tracks}=require('../dance-music.js');
assert.equal(leadCharacter(tracks.find(t=>t.mix)),'computer');assert.equal(leadCharacter(tracks.find(t=>t.id==='sprunki-friend')),'computer');assert.equal(leadCharacter(tracks.find(t=>t.id==='sprunki-song')),'simon');assert.equal(leadCharacter({cast:['pinki']}),'pinki');assert.equal(leadCharacter({}),null);
console.log('Only songs with computer vocals select the computer; other songs use their cast.');
