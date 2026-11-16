"""Import only normal Rainbrawl performances; source ZIP scripts are never executed."""
import pathlib,zipfile,json,io,math,xml.etree.ElementTree as ET
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
z=zipfile.ZipFile(ROOT/'outputs/sprunki-reference.zip')
base='(V2.1.0) Yet Another Sprunki FNF Mod/mods/Sprunki/'
out=ROOT/'assets/dance-reference';out.mkdir(exist_ok=True)
file=ROOT/'dance-reference-data.js';text=file.read_text(encoding='utf8');manifest=json.loads(text.split('const data=',1)[1].split(';if(typeof module',1)[0])
CUT=228
slugs=['rainbrawl']
sources={};ids=set()
for slug in slugs:
 j=json.loads(z.read(base+f'data/{slug}/{slug}.json'))
 if isinstance(j.get('song'),dict):j=j['song']
 events=json.loads(z.read(base+f'data/{slug}/events.json'))['events']
 ids.update([j['player1'],j['player2']])
 for t,items in events:
  if t>=CUT*1000:continue
  for item in items:
   if item[0]=='Change Character' and item[2] not in ['null','marvin talk']:ids.add(item[2])
 sources[slug]=(j,events)
ids=sorted(ids-set(manifest['characters']))
for id in ids:
 conf=json.loads(z.read(base+'characters/'+id+'.json'))
 raw=Image.open(io.BytesIO(z.read(base+'images/'+conf['image']+'.png'))).convert('RGBA')
 allframes=[dict(e.attrib) for e in ET.fromstring(z.read(base+'images/'+conf['image']+'.xml'))]
 animations={}; used=[]
 for anim in conf['animations']:
  key=anim['anim']
  if key!='idle' and not key.startswith('sing') and key not in ['hello','would','some','us','fun','look','long rise','short rise']:continue
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

for slug,(j,raw_events) in sources.items():
 initial={'player':j['player1'],'dad':j['player2'],'gf':None}
 events=[]
 side={'bf':'player','0':'player','1':'dad','2':'gf'}
 for t,items in raw_events:
  if t>=CUT*1000:continue
  for item in items:
   if item[0]=='Change Character' and item[2] in manifest['characters']:
    events.append({'time':t/1000,'side':side.get(item[1],item[1]),'character':item[2]})
   elif item[0]=='Play Animation' and item[1] in ['look','long rise','short rise']:
    events.append({'time':t/1000,'side':side.get(item[2],item[2]),'animation':item[1]})
 notes=[];camera=[];at=0;bpm=j['bpm']
 for section in j['notes']:
  if section.get('changeBPM'):bpm=section['bpm']
  end=at+section.get('sectionBeats',section.get('lengthInSteps',16)/4)*60/bpm
  if at<CUT:
   roles=['player'] if section['mustHitSection'] else ['dad']
   camera.append({'from':round(at,5),'to':round(min(CUT,end),5),'roles':roles})
  at=end
  for raw in section['sectionNotes']:
   if raw[1]<0 or raw[0]>=CUT*1000:continue
   player=int(raw[1])<4
   typ=raw[3] if len(raw)>3 else ''
   notes.append({'time':round(raw[0]/1000,5),'lane':int(raw[1])%4,'side':'player' if player else 'dad','hit':player,'hold':round(min(raw[2]/1000,CUT-raw[0]/1000),5),'animate':typ!='No Animation'})
 notes.sort(key=lambda n:n['time'])
 stems=[]
 for name in ['Inst','Voices-Player','Voices-Opponent']:
  dest=out/'stems'/slug/(name+'.ogg');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(z.read(base+f'songs/{slug}/{name}.ogg'));stems.append('./'+dest.relative_to(ROOT).as_posix())
 track={'id':'reference-'+slug,'name':('Rainbrawl · Pico Mix' if 'pico' in slug else 'Rainbrawl'),'artist':'Just_Camilo · Sprunki × Abgerny','bpm':j['bpm'],'duration':CUT,'playbackDuration':CUT,'reference':True,'chartFormat':j['format'],'initial':initial,'lead':initial['player'],'cast':[initial['dad']],'notes':notes,'cameraSections':camera,'events':sorted(events,key=lambda e:e['time']),'audioStems':stems,'source':'https://gamebanana.com/mods/585004','videoSource':'https://www.youtube.com/watch?v=-EKwJC2lmdc&t=269s','edition':'正常演出段'}
 manifest['tracks']=[t for t in manifest['tracks'] if t['id']!=track['id']]+[track]
 audit=ROOT/'outputs/dance-source-charts';audit.mkdir(exist_ok=True);(audit/(slug+'.json')).write_text(json.dumps(j),encoding='utf8')
 print(slug,len(notes),'notes',len(events),'events',flush=True)
file.write_text('/* Source credits: assets/dance-reference/README.md. */\n(()=>{const data='+json.dumps(manifest,separators=(',',':'))+';if(typeof module!=="undefined")module.exports=data;else window.DanceReferenceData=data;})();\n',encoding='utf8')

# Preserve only the normal stage layers and animation atlases.
stage=out/'rainbrawl';stage.mkdir(exist_ok=True)
for name in ['1','2','4','5','6','division','mard_moss','milly_scorpy_fred']:
 (stage/(name+'.png')).write_bytes(z.read(base+'images/rainbrawl bg/'+name+'.png'))
 if name in ['division','mard_moss','milly_scorpy_fred']:
  frames=[dict(e.attrib) for e in ET.fromstring(z.read(base+'images/rainbrawl bg/'+name+'.xml'))]
  (stage/(name+'.json')).write_text(json.dumps(frames),encoding='utf8')
