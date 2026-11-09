// Versión en línea primero; si no hay internet, se usa la última copia guardada
const CACHE = 'reportes-v0.26';
const ARCHIVOS = ['./','index.html','arranque.js','version.js','app.js','motor.js','anexos/anexo10.js','anexos/anexo11.js','img/deshidratador_diagrama.png','img/antenas_ubicacion.jpg','anexos/ayuda.js','anexos/anexo13.js','anexos/anexo18.js','anexos/anexo19.js','anexos/anexo21.js','anexos/anexo22.js','anexos/anexo23.js','anexos/anexo24.js','anexos/anexo25.js','anexos/anexo26.js','anexos/anexo28.js','anexos/anexo14.js','anexos/anexo15.js','anexos/anexo16.js','anexos/anexo17.js','anexos/guaymas/anexo10.js','anexos/guaymas/anexo11.js','anexos/guaymas/anexo15.js','anexos/guaymas/anexo16.js','anexos/guaymas/anexo17.js','fotos.js','captura.js','catalogo.js','drive.js','manifest.webmanifest','lib/pizzip.min.js','lib/docxtemplater.min.js','lib/imagemodule.js','lib/pdf.min.js','lib/pdf.worker.min.js','plantilla/plantilla_maestra_reporte.docx','icons/icon-192.png','icons/icon-512.png'];
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
