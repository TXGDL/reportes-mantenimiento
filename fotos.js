// Fotos del reporte: se reducen de tamaño y se guardan en el celular (IndexedDB) para no perderlas si se cierra la app
const Fotos = (() => {
  let db = null; const memoria = new Map(), urls = new Map();
  const abrir = () => new Promise(res => {
    if (db !== null) return res(db);
    try {
      const r = indexedDB.open('rm_fotos', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('fotos');
      r.onsuccess = () => { db = r.result; res(db); };
      r.onerror = () => { db = false; res(db); };
    } catch (e) { db = false; res(db); }
  });
  const tx = async (modo, fn) => { const d = await abrir(); if (!d) return fn(null); return new Promise((res, rej) => { const t = d.transaction('fotos', modo), q = fn(t.objectStore('fotos')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };

  async function reducir(file, max = 1600) {
    let bmp;
    try { bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }); }
    catch (e) { bmp = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(file); }); }
    const w0 = bmp.width || bmp.naturalWidth, h0 = bmp.height || bmp.naturalHeight, k = Math.min(1, max / Math.max(w0, h0));
    const w = Math.round(w0 * k), h = Math.round(h0 * k), c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(bmp, 0, 0, w, h);
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.82));
    return { blob, w, h };
  }
  async function guardar(id, file) {
    const { blob, w, h } = await reducir(file);
    if (await abrir()) await tx('readwrite', s => s.put(blob, id)); else memoria.set(id, blob);
    if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); }
    return { w, h };
  }
  async function obtener(id) { if (!(await abrir())) return memoria.get(id) || null; return (await tx('readonly', s => s.get(id))) || null; }
  async function borrar(id) { if (await abrir()) await tx('readwrite', s => s.delete(id)); else memoria.delete(id); if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); } }
  async function borrarTodas() { if (await abrir()) await tx('readwrite', s => s.clear()); memoria.clear(); urls.forEach(u => URL.revokeObjectURL(u)); urls.clear(); }
  async function url(id) { if (urls.has(id)) return urls.get(id); const b = await obtener(id); if (!b) return null; const u = URL.createObjectURL(b); urls.set(id, u); return u; }
  return { guardar, obtener, borrar, borrarTodas, url };
})();
