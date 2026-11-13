(()=>{
const {games,ageAt,gameUrl}=HomeData;
function updateAge(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=t=>parts.find(p=>p.type===t).value;document.querySelectorAll('[data-age]').forEach(el=>el.textContent=ageAt(`${get('year')}-${get('month')}-${get('day')}`));}
updateAge();setInterval(updateAge,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateAge();});
for(const [i,game]of games.entries()){
const card=document.createElement('a');card.className=`game-card theme-${game.icon}`;card.href=gameUrl(game);card.target='_blank';card.rel='noopener noreferrer';
card.innerHTML=`<div class="game-art" aria-hidden="true"><span class="card-number">WORLD ${String(i+1).padStart(2,'0')}</span>${["minecraft","minecraft3d"].includes(game.id)?`<img class="cover-image" src="/assets/home/minecraft.webp" alt="" loading="lazy" width="570" height="321">`:["world","dance"].includes(game.id)?`<img class="cover-image" src="/assets/home/sprunki.webp" alt="" loading="lazy" width="570" height="321">`:`<svg viewBox="0 0 120 90"><use href="./home-art.svg#${game.icon}"/></svg>`}<span class="art-label">${game.english}</span></div><div class="game-copy"><span class="card-tag">${game.tag}</span><h3>${game.name}</h3><p>${game.description}</p><span class="card-go">开始探索 ↗</span></div>`;document.querySelector('#game-grid').append(card);
}
document.querySelector('#computer-link').href=gameUrl(games[0]);
if('serviceWorker'in navigator)navigator.serviceWorker.getRegistrations().then(regs=>regs.filter(r=>new URL(r.scope).pathname==='/'&&/game-cache\.js/.test(r.active?.scriptURL||'')).forEach(r=>r.unregister())).catch(()=>{});
const commentStyles=document.createElement('link');commentStyles.rel='stylesheet';commentStyles.href='./comments.css';document.head.append(commentStyles);
const commentScript=document.createElement('script');commentScript.src='./comments.js';commentScript.defer=true;document.head.append(commentScript);
const commentWall=document.createElement('section');commentWall.id='comment-wall';commentWall.className='section comment-wall';commentWall.innerHTML='<div class="section-label">04 / PIXEL GUESTBOOK</div><div class="section-heading"><div><h2>留下一个<span class="green-word">像素脚印。</span></h2><p>说说你玩了什么、发现了什么，给小世界点个赞吧。</p></div><a class="comment-board-link" href="./comments.html">查看留言看板 ↗</a></div><form class="comment-form" data-comment-form><label>你的名字<input name="name" maxlength="18" placeholder="例如：小冒险家" required></label><label>你的留言<textarea name="text" maxlength="120" placeholder="我最喜欢……" required></textarea></label><button class="primary-button" type="submit">发布留言</button></form><p class="comment-status" data-comment-status role="status"></p><div class="comment-list" data-comment-list aria-live="polite"></div>';
document.querySelector('main')?.append(commentWall);
})();
