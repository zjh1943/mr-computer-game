"""Import an allowlisted normal-mode reference pack; never execute archive scripts."""
import sys, pathlib, zipfile, json, io, re, math, xml.etree.ElementTree as ET
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
z=zipfile.ZipFile(ROOT/'outputs/sprunki-reference.zip')
base='(V2.1.0) Yet Another Sprunki FNF Mod/mods/Sprunki/'
out=ROOT/'assets/dance-reference';out.mkdir(exist_ok=True)
ids=['oren','raddy','clukr','funbot','vineria','gray','brud','garnold','lime','sky','mr_sun','durple','mr_tree','simon','tunner','computer','wenda','pinki','jevin','boyfriend']
manifest={'characters':{},'tracks':[]}
for id in ids:
 conf=json.loads(z.read(base+'characters/'+id+'.json'))
 raw=Image.open(io.BytesIO(z.read(base+'images/'+conf['image']+'.png'))).convert('RGBA')
 allframes=[dict(e.attrib) for e in ET.fromstring(z.read(base+'images/'+conf['image']+'.xml'))]
 animations={}; used=[]
 for anim in conf['animations']:
  key=anim['anim']
  if key!='idle' and not key.startswith('sing') and key not in ['hello','would','some','us','fun']:continue
  frames=sorted([f for f in allframes if f['name'].startswith(anim['name'])],key=lambda f:f['name'])
  if anim.get('indices'):frames=[frames[i] for i in anim['indices'] if i<len(frames)]
  if not frames:continue
  for f in frames:
   if f not in used:used.append(f)
  animations[key]={'frames':[used.index(f) for f in frames],'fps':anim['fps'],'loop':anim.get('loop',False)}
 if not used:raise ValueError('Empty character '+id)
 bounds=[]
 for f in used:
  x,y,w,h=[int(f[k]) for k in ['x','y','width','height']];bb=raw.crop((x,y,x+w,y+h)).getbbox() or (0,0,w,h);f['alpha']=bb;ox=-int(f.get('frameX',0));oy=-int(f.get('frameY',0));bounds.append((bb[0]+ox,bb[1]+oy,bb[2]+ox,bb[3]+oy))
 left=min(b[0] for b in bounds);top=min(b[1] for b in bounds);right=max(b[2] for b in bounds);bottom=max(b[3] for b in bounds);maxw=right-left;maxh=bottom-top
 cw,ch,cols=256,360,8;scale=min((cw-8)/maxw,(ch-8)/maxh)
 sheet=Image.new('RGBA',(cw*cols,ch*math.ceil(len(used)/cols)))
 for i,f in enumerate(used):
  x,y,w,h=[int(f[k]) for k in ['x','y','width','height']]
  bb=f['alpha'];crop=raw.crop((x+bb[0],y+bb[1],x+bb[2],y+bb[3]));crop=crop.resize((max(1,round((bb[2]-bb[0])*scale)),max(1,round((bb[3]-bb[1])*scale))),Image.Resampling.LANCZOS)
  fw,fh=int(f.get('frameWidth',w)),int(f.get('frameHeight',h));fx,fy=-int(f.get('frameX',0)),-int(f.get('frameY',0))
  dx=round((cw-maxw*scale)/2+(fx+bb[0]-left)*scale);dy=round(ch-4-maxh*scale+(fy+bb[1]-top)*scale)
  sheet.alpha_composite(crop,(i%cols*cw+dx,i//cols*ch+dy))
 path=out/(id+'.png');sheet.save(path,optimize=True)
 manifest['characters'][id]={'image':'./assets/dance-reference/'+id+'.png','cell':[cw,ch],'columns':cols,'animations':animations,'flip':bool(conf.get('flip_x',False))}
 print(id,len(used),path.stat().st_size,flush=True)
for n in range(1,5):
 data=z.read(base+'images/backdrop/'+str(n)+'.png');(out/('background-'+str(n)+'.png')).write_bytes(data)
 print('bg',n,Image.open(io.BytesIO(data)).size)
for slug,title in [('colorful-bunch','Colorful Bunch'),('colorful-bunch-(bf-mix)','Colorful Bunch · BF Mix')]:
 j=json.loads(z.read(base+'data/'+slug+'/'+slug+'.json'));j=j['song'] if isinstance(j.get('song'),dict) else j
 def char(id):return {'simon-opponent':'simon'}.get(id,id) if id in ids or id=='simon-opponent' else None
 initial={'player':char(j['player1']),'dad':char(j['player2']),'gf':char(j.get('gfVersion'))}
 notes=[]
 for section in j['notes']:
  for n in section['sectionNotes']:
   if n[1]<0:continue
   player=bool(section['mustHitSection'])^(int(n[1])>=4);typ=n[3] if len(n)>3 else ''
   side='gf' if typ=='GF Sing' else ('player' if player else 'dad')
   notes.append({'time':round(n[0]/1000,5),'lane':int(n[1])%4,'side':side,'hit':player,'hold':round(n[2]/1000,5),'animate':typ!='No Animation'})
 notes.sort(key=lambda n:n['time'])
 events=[]
 for t,items in j.get('events',[]):
  for event in items:
   if event[0]=='Change Character':events.append({'time':t/1000,'side':{'bf':'player','0':'player','1':'dad','2':'gf'}.get(event[1],event[1]),'character':char(event[2])})
   elif event[0]=='Play Animation' and event[1] in ['hello','would','some','us','fun']:events.append({'time':t/1000,'side':{'bf':'player'}.get(event[2],event[2]),'animation':event[1]})
 manifest['tracks'].append({'id':'reference-'+slug,'name':title,'artist':'Just_Camilo'+(' / Chadowsky' if 'bf-mix' in slug else ''),'bpm':j['bpm'],'duration':math.ceil(notes[-1]['time']+4),'reference':True,'audioFile':'./assets/dance-reference/'+slug+'.ogg','cast':[initial['dad'],initial['gf']],'lead':initial['player'],'initial':initial,'notes':notes,'events':sorted(events,key=lambda e:e['time']),'source':'https://gamebanana.com/mods/585004'})
 # Audio sources are retained outside the published tree until rendered together.
 dest=ROOT/'outputs/reference-audio'/slug;dest.mkdir(parents=True,exist_ok=True)
 for stem in ['Inst','Voices-Opponent','Voices-Player']:(dest/(stem+'.ogg')).write_bytes(z.read(base+'songs/'+slug+'/'+stem+'.ogg'))
(ROOT/'dance-reference-data.js').write_text('/* Normal-mode source: Just_Camilo, Yet Another Sprunki FNF Mod. See assets/dance-reference/README.md. */\n(()=>{const data='+json.dumps(manifest,separators=(',',':'))+';if(typeof module!=="undefined")module.exports=data;else window.DanceReferenceData=data;})();\n',encoding='utf8')
