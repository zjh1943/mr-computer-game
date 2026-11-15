const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
(async()=>{
 const draws=[];
 const window={DanceReferenceData:{characters:{gray:{image:'gray.png',cell:[10,10],columns:2,animations:{idle:{frames:[0],fps:12,loop:false},singLEFT:{frames:[0,1],fps:24,loop:true}}}}}};
 const scope={window,Image:class{decode(){return Promise.resolve();}}};
 vm.runInNewContext(fs.readFileSync('dance-reference.js','utf8'),scope);
 await window.DanceReference.prepare(['gray']);
 const canvas={width:10,height:10,dataset:{},getContext:()=>({clearRect(){},drawImage(...args){draws.push(args[1]);}})};
 window.DanceReference.draw(canvas,'gray','singLEFT',.06);
 window.DanceReference.draw(canvas,'gray','singLEFT',.12);
 assert.deepEqual(draws,[10],'hold the final sung frame instead of repeatedly flipping a two-frame character');
 console.log('Gray singing animation holds steady after its first motion.');
})().catch(error=>{console.error(error);process.exitCode=1;});
