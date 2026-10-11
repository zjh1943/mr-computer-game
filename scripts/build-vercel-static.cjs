const fs=require('node:fs');const path=require('node:path');const {games}=require('../home-data.js');
const root=path.resolve(__dirname,'..'),out=path.join(root,'public');
if(out!==path.join(root,'public'))throw Error('Invalid output directory');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of fs.readdirSync(root))if(/\.(html|css|js|svg)$/.test(f)&&f!=='server.js')fs.copyFileSync(path.join(root,f),path.join(out,f));
for(const d of ['assets','rhythm-world'])if(fs.existsSync(path.join(root,d)))fs.cpSync(path.join(root,d),path.join(out,d),{recursive:true});
fs.mkdirSync(path.join(out,'games'),{recursive:true});
const computer=fs.readFileSync(path.join(root,'computer.html'),'utf8');
for(const g of games){
let html;
if(['computer','world','diary'].includes(g.id)){const file=g.id==='computer'?'computer.html':g.id==='world'?'rhythm-world.html':'diary.html';html=fs.readFileSync(path.join(root,file),'utf8').replace(/<head>/i,'<head><base href="/">');}
else if(['minecraft','town'].includes(g.id))html=computer.replace('<head>','<head><base href="/">').replace('<body>','<body data-entry="'+g.id+'">').replace(/<title>.*?<\/title>/,`<title>${g.name} · 朱墨涵</title>`);
else html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${g.name} · 朱墨涵</title><link rel="stylesheet" href="/computer-apps.css"><link rel="stylesheet" href="/game-player.css"><script src="/game-player.js" defer></script></head><body data-game="${g.id}"><header><a href="https://zhumohan.com/">← 墨涵的个人主页</a><h1>${g.name}</h1><span>${g.english}</span></header><main><p id="entry-loading" role="status">正在打开${g.name}…</p><div id="standalone-game"></div></main></body></html>`;
if(!html.includes('<base'))html=html.replace('<head>','<head><base href="/">');
fs.writeFileSync(path.join(out,'games',g.domain+'.html'),html);
}
console.log('Built lightweight home and '+games.length+' independent game entry documents.');
