// Render the existing arrangements once, so playback needs one local WAV, not many decoders.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const {tracks,sections}=require('../dance-music.js');
function readWave(file){
  const b=fs.readFileSync(path.join(root,file));let fmt,data;
  for(let p=12;p+8<=b.length;){const n=b.readUInt32LE(p+4),id=b.toString('ascii',p,p+4);if(id==='fmt ')fmt=b.subarray(p+8,p+8+n);if(id==='data')data=b.subarray(p+8,p+8+n);p+=8+n+(n%2);}
  if(!fmt||!data)throw Error('Invalid WAV '+file);
  const kind=fmt.readUInt16LE(0),channels=fmt.readUInt16LE(2),bits=fmt.readUInt16LE(14),bytes=bits/8;
  if(!((kind===1&&[16,24,32].includes(bits))||(kind===3&&bits===32)))throw Error('Unsupported WAV '+file);
  const samples=new Float32Array(data.length/bytes/channels);
  for(let i=0;i<samples.length;i++)for(let c=0;c<channels;c++){const p=(i*channels+c)*bytes;samples[i]+=(kind===3?data.readFloatLE(p):bits===16?data.readInt16LE(p)/32768:bits===24?data.readIntLE(p,3)/8388608:data.readInt32LE(p)/2147483648)/channels;}
  return samples;
}
fs.mkdirSync(path.join(root,'assets/dance-audio'),{recursive:true});
for(const track of tracks.filter(t=>t.mix)){
  const rate=44100,pcm=new Float32Array(Math.round(track.duration*rate)),beat=60/track.bpm;
  const stems=track.mix.map(s=>readWave(s.audio));
  for(const section of sections)for(const voice of section.voices){const stem=track.mix[voice],source=stems[voice],from=2+section.from*beat,to=2+section.to*beat;
    for(let i=Math.ceil(from*rate);i<Math.min(pcm.length,Math.ceil(to*rate));i++){const t=i/rate,phase=((t-from)/(stem.beats*beat)%1)*source.length,k=Math.floor(phase),f=phase-k,fade=Math.min(1,(t-from)/.025,(to-t)/.06);pcm[i]+=(source[k]*(1-f)+source[(k+1)%source.length]*f)*stem.gain*Math.max(0,fade);}
  }
  let peak=0;for(const x of pcm)peak=Math.max(peak,Math.abs(x));const volume=peak>.95?.95/peak:1;
  const out=Buffer.alloc(44+pcm.length*2);out.write('RIFF');out.writeUInt32LE(out.length-8,4);out.write('WAVEfmt ',8);out.writeUInt32LE(16,16);out.writeUInt16LE(1,20);out.writeUInt16LE(1,22);out.writeUInt32LE(rate,24);out.writeUInt32LE(rate*2,28);out.writeUInt16LE(2,32);out.writeUInt16LE(16,34);out.write('data',36);out.writeUInt32LE(pcm.length*2,40);
  for(let i=0;i<pcm.length;i++)out.writeInt16LE(Math.round(pcm[i]*volume*32767),44+i*2);
  fs.writeFileSync(path.join(root,'assets/dance-audio',track.id+'.wav'),out);console.log(track.id,track.duration+'s',out.length+' bytes', 'peak='+peak.toFixed(3));
}
