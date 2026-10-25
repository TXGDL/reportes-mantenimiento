const CACHE = 'reportes-v0.3';
const ARCHIVOS = ['./','index.html','app.js','motor.js','datos-prueba.js','catalogo.js','manifest.webmanifest','lib/pizzip.min.js','lib/docxtemplater.min.js','lib/imagemodule.js','plantilla/plantilla_maestra_reporte.docx','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if (e.request.method === 'GET') e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
