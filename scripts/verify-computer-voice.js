const assert=require('node:assert/strict'),{create}=require('../computer-voice.js');
function fixture(){let time=0,id=0,timers=new Map(),instances=[],answers=[],silences=0,unavailable=0,busy=false,active=true;
 class Recognition{constructor(){instances.push(this);}start(){this.onstart?.();}abort(){}result(text,final=true,index=0){this.onresult?.({resultIndex:index,results:Array.from({length:index+1},(_,i)=>Object.assign([{transcript:i===index?text:'前半句'}],{isFinal:final}))});}}
 const controller=create({Recognition,now:()=>time,setTimeout:(fn,delay)=>{timers.set(++id,{fn,time:time+delay});return id;},clearTimeout:id=>timers.delete(id),active:()=>active,busy:()=>busy,answer:text=>answers.push(text),onStatus:()=>{},onSilence:()=>silences++,onUnavailable:()=>unavailable++,cancelSpeech:()=>busy=false});
 function advance(ms){const end=time+ms;while(true){const next=[...timers].filter(([,t])=>t.time<=end).sort((a,b)=>a[1].time-b[1].time)[0];if(!next)break;time=next[1].time;timers.delete(next[0]);next[1].fn();}time=end;}
 return {controller,advance,instances,answers,get silences(){return silences;},get unavailable(){return unavailable;},set busy(v){busy=v;},set active(v){active=v;},get timers(){return timers.size;}};
}
let f=fixture();f.controller.start();assert(f.instances[0].continuous&&f.instances[0].interimResults);f.instances[0].onend();f.advance(500);assert.equal(f.instances.length,2);f.advance(29499);assert.equal(f.silences,0);f.advance(1);assert.equal(f.silences,1);assert.equal(f.timers,0);
f=fixture();f.controller.start();f.instances[0].result('你好');f.advance(1000);f.instances[0].result('你好电脑先生');f.advance(1799);assert.equal(f.answers.length,0);f.advance(1);assert.deepEqual(f.answers,['你好电脑先生']);f.busy=true;f.advance(5000);assert.equal(f.instances.length,1);f.busy=false;f.advance(250);assert.equal(f.instances.length,2);f.instances[1].result('前半句');f.instances[1].result('后半句',true,1);f.instances[1].onend();assert.equal(f.answers[1],'前半句 后半句');
f=fixture();f.controller.start();f.instances[0].result('只有临时结果',false);f.instances[0].onend();assert.deepEqual(f.answers,['只有临时结果']);f.controller.stop();f.advance(60000);assert.equal(f.silences,0);assert.equal(f.timers,0);
f=fixture();f.controller.start();const old=f.instances[0],late=old.onresult;old.onerror({error:'network'});f.advance(1200);assert.equal(f.instances.length,2);late({results:[Object.assign([{transcript:'过期结果'}],{isFinal:true})]});f.advance(2000);assert.equal(f.answers.length,0);f.instances[1].onerror({error:'not-allowed'});assert.equal(f.unavailable,1);assert(!f.controller.isEnabled());assert.equal(f.timers,0);
f=fixture();f.controller.start();f.active=false;f.advance(250);assert.equal(f.timers,0);assert(!f.controller.isEnabled());
f=fixture();f.busy=true;f.controller.start();f.advance(30000);assert.equal(f.silences,1);assert.equal(f.timers,0);
f=fixture();f.controller.start();f.advance(29000);f.instances[0].result('我说得慢一点',false);f.advance(2400);assert.equal(f.answers.length,0);assert.equal(f.silences,0);f.advance(100);assert.equal(f.answers[0],'我说得慢一点');f.controller.stop();
const fs=require('node:fs'),html=fs.readFileSync('index.html','utf8'),app=fs.readFileSync('app.js','utf8'),experience=fs.readFileSync('computer-experience.js','utf8');
assert(html.indexOf('./computer-voice.js')<html.indexOf('./computer-experience.js'));
assert(app.includes('const useSubtitle = window.ComputerExperience?.isFullChat()'));
assert(experience.includes("onSilence: finishWithoutHearing"));
assert(experience.includes("event.stopPropagation()"));
console.log('Continuous restart, long silence, interim/final deduplication, reply resumption, transient errors, stale events and cleanup passed.');
