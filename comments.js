(()=>{
  const STORAGE_KEY='mohan-comment-wall-v1';
  const starter=[
    {id:'seed-build',name:'方块建造师',text:'我喜欢这里的方块世界！',likes:6,createdAt:'2026-11-01T08:00:00.000Z'},
    {id:'seed-beat',name:'节拍小队',text:'跳舞游戏的箭头好有意思。',likes:4,createdAt:'2026-11-02T09:00:00.000Z'},
    {id:'seed-sky',name:'云朵朋友',text:'期待下一个新游戏！',likes:3,createdAt:'2026-11-03T10:00:00.000Z'}
  ];
  const read=()=>{try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');return Array.isArray(value)?value:starter;}catch{return starter;}};
  const write=list=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(list));return true;}catch{return false;}};
  const escape=value=>String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const stamp=value=>new Intl.DateTimeFormat('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
  function render(){const list=read().slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));const summary=document.querySelector('[data-comment-summary]');if(summary)summary.textContent=`共有 ${list.length} 条留言 · ${list.reduce((total,item)=>total+(Number(item.likes)||0),0)} 个赞`;
    document.querySelectorAll('[data-comment-list]').forEach(box=>{const compact=!box.classList.contains('comment-list-all'),items=compact?list.slice(0,3):list;box.replaceChildren();items.forEach(item=>{const article=document.createElement('article');article.className='comment-card';article.innerHTML=`<header><strong>${escape(item.name)}</strong><time datetime="${item.createdAt}">${stamp(item.createdAt)}</time></header><p>${escape(item.text)}</p><button type="button" data-like="${item.id}" aria-label="给${escape(item.name)}的留言点赞">♥ <span>${Number(item.likes)||0}</span></button>`;box.append(article);});if(!items.length)box.innerHTML='<p class="comment-empty">还没有留言，做第一个留下脚印的人吧！</p>';});}
  function like(id){const list=read(),item=list.find(entry=>entry.id===id);if(!item)return;item.likes=(Number(item.likes)||0)+1;write(list);render();}
  document.addEventListener('click',event=>{const button=event.target.closest('[data-like]');if(button)like(button.dataset.like);});
  document.querySelectorAll('[data-comment-form]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const formData=new FormData(form),name=String(formData.get('name')||'').trim(),text=String(formData.get('text')||'').trim(),status=form.parentElement.querySelector('[data-comment-status]');if(!name||!text){if(status)status.textContent='请先写名字和留言。';return;}const list=read();list.push({id:`comment-${Date.now()}`,name:name.slice(0,18),text:text.slice(0,120),likes:0,createdAt:new Date().toISOString()});if(!write(list)){if(status)status.textContent='这台设备暂时不能保存留言。';return;}form.reset();if(status)status.textContent='留言已经放进像素留言看板！';render();}));
  render();
})();
