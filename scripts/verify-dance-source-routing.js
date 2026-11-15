// Run after extracting the three original charts to outputs/dance-source-charts.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const data=require('../dance-reference-data');
const {battleChart}=require('../computer-apps');
for(const [slug,file] of [
  ['colorful-bunch','colorful-bunch.json'],
  ['colorful-bunch-(bf-mix)','colorful-bunch-(bf-mix).json'],
  ['colorful-bunch-erect','colorful-bunch-erect-erect.json']
]){
  let raw=JSON.parse(fs.readFileSync(`outputs/dance-source-charts/${file}`));
  raw=typeof raw.song==='object'?raw.song:raw;
  const song=data.tracks.find(track=>track.id==='reference-'+slug),expected=[];
  for(const section of raw.notes)for(const note of section.sectionNotes){
    if(note[1]<0)continue;
    const hit=raw.format==='psych_v1_convert'?note[1]<4:!!section.mustHitSection!==(note[1]>=4);
    const gf=note[3]==='GF Sing'||(section.gfSection&&hit===!!section.mustHitSection);
    expected.push({time:note[0]/1000,lane:note[1]%4,side:gf?'gf':hit?'player':'dad',hit});
  }
  assert.equal(song.notes.length,expected.length);
  for(const lane of [0,1,2,3])for(const side of ['player','dad','gf'])for(const hit of [true,false]){
    const select=list=>list.filter(n=>n.lane===lane&&n.side===side&&n.hit===hit).map(n=>n.time).sort((a,b)=>a-b);
    const actual=select(song.notes),source=select(expected);
    assert.equal(actual.length,source.length,`${slug}: ${side}/${lane}/${hit}`);
    // The importer rounds seconds to five decimals, using Python's tie rounding.
    source.forEach((time,index)=>assert(Math.abs(actual[index]-time)<.000011));
  }
  const split=battleChart(song);
  assert(split.player.every(note=>note.hit===true));
  assert(split.opponent.every(note=>note.hit===false));
  console.log(`${song.name}: ${expected.length} original notes verified against source; ${split.player.length} player, ${split.opponent.length} opponent.`);
}
