"""Copy original health-icon strips; source scripts are never executed."""
import pathlib, zipfile, json
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
file=ROOT/'dance-reference-data.js'
text=file.read_text(encoding='utf8')
data=json.loads(text.split('const data=',1)[1].split(';if(typeof module',1)[0])
archive=zipfile.ZipFile(ROOT/'outputs/sprunki-reference.zip')
base='(V2.1.0) Yet Another Sprunki FNF Mod/'
out=ROOT/'assets/dance-reference/health-icons';out.mkdir(exist_ok=True)
for id,art in data['characters'].items():
    config=json.loads(archive.read(base+'mods/Sprunki/characters/'+id+'.json'))
    name=config.get('healthicon')
    candidates=[base+'mods/Sprunki/images/icons/icon-'+name+'.png',base+'assets/shared/images/icons/icon-'+name+'.png']
    source=next((path for path in candidates if path in archive.namelist()),None)
    if not source:raise ValueError('Missing source icon: '+id)
    destination=out/(name+'.png');destination.write_bytes(archive.read(source))
    width,height=Image.open(archive.open(source)).size
    art['icon']={'image':'./'+destination.relative_to(ROOT).as_posix(),'frames':max(1,width//height)}
file.write_text('/* Source credits: assets/dance-reference/README.md. */\n(()=>{const data='+json.dumps(data,separators=(',',':'))+';if(typeof module!=="undefined")module.exports=data;else window.DanceReferenceData=data;})();\n',encoding='utf8')
print('Imported source health icons for',len(data['characters']),'characters.')
