const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),path=require('node:path');
const {danceVisualProfile,referencePerformerRole,noteInputSide}=require('../../computer-apps');
test('Black solo animates the visible singer while input remains on the player bank',()=>{
 const note={side:'player',hit:true};assert.equal(referencePerformerRole({friendLikeYou:true},{dad:'black'},note),'dad');assert.equal(noteInputSide(note),'player');
 assert.equal(referencePerformerRole({friendLikeYou:true},{dad:'mr_tree'},note),'player');
 assert.equal(referencePerformerRole({reference:true},{dad:'black'},note),'player');
});
test('Friend arrows have a full-size song profile',()=>{const v=danceVisualProfile({friendLikeYou:true});assert(v.maxArrowSize>=88);assert(v.arrowScale>=.8);});
test('Friend player poses follow the arrow direction',()=>{
 const apps=fs.readFileSync(path.join(__dirname,'../../computer-apps.js'),'utf8');
 assert.match(apps,/orientedLane\(figure\.dataset\.side,lane,selected\?\.friendLikeYou\|\|selected\?\.id==='reference-rainbrawl'\)/);
});
test('Friend solo arrows end before the finale starts',()=>{
 const friend=require('../../dance-music').tracks.find(track=>track.friendLikeYou);
 const finale=friend.notes.filter(note=>note.side==='player'&&note.time>=friend.phases.finaleStart);
 assert.deepEqual(finale.slice(0,4).map(note=>note.lane),[0,1,2,3]);
 assert.equal(finale[3].time,Number((friend.phases.finaleStart+1).toFixed(5)));
});
const asset=(name)=>fs.readFileSync(path.join(__dirname,'../../assets/friend-like-you/video-poses',name+'.png'));
test('all source-video character poses, companions and icons are complete transparent PNG assets',()=>{
 const names=['mr-tree','computer','black'].flatMap(id=>['idle','left','down','up','right'].map(p=>id+'-'+p)).concat(['durple-idle','wenda-idle','vineria-idle','jevin-idle','oren-idle','icon-mr-tree','icon-computer','black-entry']);
 for(const name of names){const png=asset(name);assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a',name);assert(png.readUInt32BE(16)>0&&png.readUInt32BE(20)>0,name);assert.equal(png[25],6,name+' must preserve alpha');}
 for(const phase of ['day','black','finale'])assert(fs.existsSync(path.join(__dirname,'../../assets/friend-like-you/vector/stage-'+phase+'.svg')));
});
test('the monitor head and stationary table cover exactly one full source sprite',()=>{
 const whole=asset('computer-down'),body=asset('computer-body');
 for(const pose of ['idle','left','down','up','right']){const head=asset('computer-'+pose+'-head');assert.equal(head.readUInt32BE(16),whole.readUInt32BE(16));assert.equal(head.readUInt32BE(20)+body.readUInt32BE(20),whole.readUInt32BE(20));}
});
