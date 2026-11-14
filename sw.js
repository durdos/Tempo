/* Tempo : garde l'app en mémoire pour qu'elle s'ouvre vite, même sans réseau */
const V='tempo-64';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  /* la page : le réseau d'abord (pour avoir la dernière version), la copie si le réseau traîne ou manque */
  if(r.mode==='navigate'){
    e.respondWith((async()=>{
      const c=await caches.open(V);
      /* toutes les adresses de l'app (/Tempo/seances, /Tempo/calories…) ouvrent la même page */
      const net=fetch(new Request('./index.html',{cache:'no-store',credentials:'same-origin'})).then(res=>{if(res.ok)c.put('./index.html',res.clone());return res});
      const slow=new Promise(ok=>setTimeout(ok,2500)).then(()=>c.match('./index.html'));
      try{return await Promise.race([net,slow.then(x=>x||net)])}catch(err){return (await c.match('./index.html'))||Response.error()}
    })());
    return;
  }
  /* icônes, manifeste, polices : la copie d'abord */
  if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r);if(hit)return hit;const res=await fetch(r);if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}));
  }
});
