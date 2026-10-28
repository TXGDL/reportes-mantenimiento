// Versión en línea primero; si no hay internet, se usa la última copia guardada
const CACHE = 'reportes-v0.7';
const ARCHIVOS = ['./','index.html','arranque.js','version.js','app.js','motor.js','anexos/anexo10.js','fotos.js','captura.js','catalogo.js','drive.js','manifest.webmanifest','lib/pizzip.min.js','lib/docxtemplater.min.js','lib/imagemodule.js','plantilla/plantilla_maestra_reporte.docx','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(ARCHIVOS.map(u => c.add(new Request(u, { cache: 'reload' })))))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await Promise.race([fetch(r, { cache: 'no-cache' }), new Promise((_, rej) => setTimeout(() => rej(new Error('lento')), 6000))]);
      if (res && res.ok) cache.put(r, res.clone());
      return res;
    } catch (err) {
      const copia = await cache.match(r, { ignoreSearch: true });
      if (copia) return copia;
      throw err;
    }
  })());
});
