// Preserve the original computer silhouette; vary only its screen expression.
const fs=require('node:fs'),path=require('node:path'),cast=require('../dance-cast');
const out=path.join(__dirname,'../assets/friend-like-you/source-poses');fs.mkdirSync(out,{recursive:true});
const source=fs.readFileSync(path.join(__dirname,'../assets/sprunki-kiss-local/assets',cast.computer.idle),'utf8');
const withoutFace=source.replace(/<path d="M(?:216\.85723|252\.53927|226\.45098)[\s\S]*?\/>/g,'');
const eyes={left:'<path d="M218 146l8 3-8 3M255 145l7 0"/>',down:'<path d="M217 149h10m26 0h10"/>',up:'<path d="M217 147l10-2m26 0l10 2"/>',right:'<path d="M218 145h7m30 1l-8 3 8 3"/>'};
for(const pose of Object.keys(eyes)){
 const mouth=pose==='down'?'<ellipse cx="240" cy="172" rx="10" ry="12" fill="#fff" stroke="none"/>':'<path d="M226 161h28l-14 24Z" fill="#fff" stroke="none"/>';
 const face='<g fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round">'+eyes[pose]+mouth+'</g>';
 fs.writeFileSync(path.join(out,'computer-'+pose+'.svg'),withoutFace.replace('<g fill-rule="nonzero" stroke="#000000"',face+'<g fill-rule="nonzero" stroke="#000000"'));
}
console.log('Built original-body computer expressions without lyric-screen costumes.');
