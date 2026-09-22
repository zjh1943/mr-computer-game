const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {tracks}=require('../dance-music.js');
for(const t of tracks)for(const c of t.cast)assert(fs.existsSync('assets/sprunki-2d/'+c+'.png'));
for(const t of tracks.filter(t=>t.audio)){assert(fs.existsSync(t.audio));const data=fs.readFileSync(t.audio);assert.equal(data.toString('ascii',0,4),'RIFF');assert(t.bpm>40&&t.bpm<240);assert(t.duration>30);}
(async()=>{
 let id=0,plays=0,destroyed=0,states=[],blocked=0,errors=[],loading=0;const timers=new Map(),players=[];
 const host={isConnected:true,replaceChildren(){},append(){}};
 const scope={setTimeout:(f,ms)=>{timers.set(++id,{f,ms});return id},clearTimeout:i=>timers.delete(i),document:{createElement:()=>({})},location:{origin:'http://localhost'},window:{YT:{Player:class{constructor(h,o){this.options=o;players.push(this)}destroy(){destroyed++}playVideo(){plays++}unMute(){}getCurrentTime(){return 12}}}}};
 vm.runInNewContext(fs.readFileSync('dance-music.js','utf8'),scope);
 const events={state:s=>states.push(s),blocked:()=>blocked++,error:e=>errors.push(e),loading:()=>loading++};
 const control=await scope.window.DanceMusic.open(host,tracks.find(t=>t.video),events);
 const first=players[0],e=first.options.events;e.onReady({target:first});assert.equal(plays,1);e.onStateChange({data:1,target:first});assert.equal(timers.size,0);
 e.onStateChange({data:3,target:first});const timeout=[...timers.values()][0];timeout.f();assert.equal(players.length,2);assert.equal(loading,1);assert.equal(players[1].options.playerVars.start,12);
 e.onStateChange({data:1,target:first});assert.deepEqual(states,[1,3],'Old players must not update a new session');
 players[1].options.events.onAutoplayBlocked();assert.equal(blocked,1);control.playVideo();assert.equal(plays,2);
 players[1].options.events.onError({data:150});assert.equal(errors.length,1);control.destroy();control.destroy();assert.equal(destroyed,2);
 players[1].options.events.onStateChange({data:1,target:players[1]});assert.deepEqual(states,[1,3]);
 host.isConnected=false;assert.equal(await scope.window.DanceMusic.open(host,tracks.find(t=>t.video),events),null);
 console.log('Music retry, resume position, autoplay recovery, stale events and cleanup passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
