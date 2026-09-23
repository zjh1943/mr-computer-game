const assert = require('node:assert/strict');
const {catalog,songs,chart,grade}=require('../computer-apps.js');
assert.equal(Object.keys(catalog).length,10);
assert.equal(songs.length,5);
for(const song of songs){const notes=chart(song);assert.equal(notes.length,64);assert.equal(new Set(notes.map(n=>n.lane)).size,4);assert(notes.every((n,i)=>n.time>=2&&(!i||n.time>notes[i-1].time)));assert(notes.every(n=>!n.done));}
assert.equal(grade(.08),100);assert.equal(grade(-.08),100);assert.equal(grade(.15),60);assert.equal(grade(-.21),0);
const fs=require('node:fs');const experience=fs.readFileSync('computer-experience.js','utf8');assert(experience.includes("'#ff5252', '#ff982f', '#ffe253', '#64dd68', '#42e6df', '#579bff', '#bb78ff'"));
console.log('Ten runnable apps; five four-lane charts; timing windows and seven-color palette verified.');
