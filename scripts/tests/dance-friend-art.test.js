const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),path=require('node:path');
const {danceVisualProfile,referencePerformerRole,noteInputSide}=require('../../computer-apps');
test('Black solo animates the visible singer while input remains on the player bank',()=>{
 const note={side:'player',hit:true};assert.equal(referencePerformerRole({friendLikeYou:true},{dad:'black'},note),'dad');assert.equal(noteInputSide(note),'player');
 assert.equal(referencePerformerRole({friendLikeYou:true},{dad:'mr_tree'},note),'player');
 assert.equal(referencePerformerRole({reference:true},{dad:'black'},note),'player');
});
test('Friend arrows have a full-size song profile',()=>{const v=danceVisualProfile({friendLikeYou:true});assert(v.maxArrowSize>=88);assert(v.arrowScale>=.8);});
test('all Friend poses and three matching backgrounds are available as flat vectors',()=>{
 for(const actor of ['mr-tree','computer','black'])for(const pose of ['idle','left','down','up','right']){const s=fs.readFileSync(path.join(__dirname,'../../assets/friend-like-you/vector',actor+'-'+pose+'.svg'),'utf8');assert(s.startsWith('<svg'));assert(!s.includes('<script'));}
 for(const phase of ['day','black','finale'])assert(fs.existsSync(path.join(__dirname,'../../assets/friend-like-you/vector/stage-'+phase+'.svg')));
});
