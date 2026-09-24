"""Build complete normal A/B phrases and mix the reference game's three music stems."""
import sys,pathlib,json,math
ROOT=pathlib.Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'outputs/audio-tools'))
import soundfile as sf
import numpy as np
p=json.loads((ROOT/'assets/sprunki-kiss-local/assets/project.json').read_text())
ids=['oren','raddy','clukr','funbot','vineria','gray','brud','garnold','lime','sky','mr_sun','durple','mr_tree','simon','tunner','computer','wenda','pinki','jevin','black']
cast={};folder=ROOT/'assets/dance-audio/normal';folder.mkdir(exist_ok=True)
for id,t in zip(ids,p['targets'][1:21]):
 normal=[c for c in t['costumes'] if c['name']=='idle' or __import__('re').fullmatch(r'anim\d*',c['name'])]
 item={'name':'电脑先生' if id=='computer' else {'mr_sun':'Mr. Sun','mr_tree':'Mr. Tree','funbot':'Fun Bot','lime':'OWAKCX'}.get(id,id.title()),'idle':normal[0]['md5ext'],'frames':[c['md5ext'] for c in normal[1:]]}
 if id=='black':item['silent']=True;cast[id]=item;continue
 half=9.6 if id in ['pinki','jevin'] else 4.8;rate=48000;pcm=np.zeros(round(half*2*rate),np.float32)
 for i,s in enumerate(t['sounds'][:2]):
  samples,sr=sf.read(ROOT/'assets/sprunki-kiss-local/assets'/s['md5ext'],dtype='float32',always_2d=True);samples=samples.mean(axis=1)
  if sr!=rate:samples=np.interp(np.arange(round(len(samples)*rate/sr))*sr/rate,np.arange(len(samples)),samples).astype(np.float32)
  at=round(i*half*rate);size=min(len(samples),len(pcm)-at);pcm[at:at+size]+=samples[:size]
 peak=float(np.max(np.abs(pcm)));pcm/=max(1,peak/.96)
 sf.write(folder/(id+'.wav'),pcm,rate,subtype='PCM_16')
 item.update(audio='./assets/dance-audio/normal/'+id+'.wav',beats=round(half*2/.6),gain=.23 if id=='computer' else .17,sourceSounds=[s['md5ext'] for s in t['sounds'][:2]])
 cast[id]=item
(ROOT/'dance-cast.js').write_text('/* Normal-mode characters and complete A/B audio phrases; Black cannot trigger horror. */\n(()=>{const cast='+json.dumps(cast,separators=(',',':'),ensure_ascii=False)+';if(typeof module!=="undefined")module.exports=cast;else window.DanceCast=cast;})();\n',encoding='utf8')
for slug in ['colorful-bunch','colorful-bunch-(bf-mix)']:
 stems=[];rate=None
 for name in ['Inst','Voices-Opponent','Voices-Player']:
  a,sr=sf.read(ROOT/'outputs/reference-audio'/slug/(name+'.ogg'),dtype='float32',always_2d=True)
  assert rate in [None,sr];rate=sr
  if a.shape[1]==1:a=np.repeat(a,2,axis=1)
  stems.append(a)
 mixed=np.zeros((max(len(a) for a in stems),2),np.float32)
 for a in stems:mixed[:len(a)]+=a
 peak=float(np.max(np.abs(mixed)));mixed/=max(1,peak/.96)
 with sf.SoundFile(ROOT/'assets/dance-reference'/(slug+'.ogg'),'w',samplerate=rate,channels=2,format='OGG',subtype='VORBIS') as output:
  for start in range(0,len(mixed),16384):output.write(mixed[start:start+16384])
 print(slug,'duration',len(mixed)/rate,'peak',peak,flush=True)
