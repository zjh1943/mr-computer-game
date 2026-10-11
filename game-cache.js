/* Demand-only cache: installing this worker never downloads game assets. */
const CACHE='mr-computer-demand-20261011',PREFIX='mr-computer-';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/__')||url.pathname.includes('/api/'))return;
// Main personal homepage never serves game navigation or receives speculative assets.
if(url.pathname==='/'||url.pathname==='/index.html'||url.pathname.startsWith('/home')||url.pathname.startsWith('/assets/home/'))return;
if(!/\.(js|css|json|png|jpg|jpeg|svg|webp|wav|mp3|ogg|woff2|html)$/.test(url.pathname)&&request.mode!=='navigate')return;
event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(request);if(response.ok&&response.type!=='opaque')cache.put(request,response.clone()).catch(()=>{});return response;}catch(error){const cached=await cache.match(request);if(cached)return cached;throw error;}})());
});
