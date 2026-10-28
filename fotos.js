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

  // Copia los bytes de inmediato: en iPhone el archivo puede dejar de ser legible en cuanto se reinicia el selector
  const leerBytes = file => file.arrayBuffer ? file.arrayBuffer() : new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error || new Error('No se pudo leer la foto')); r.readAsArrayBuffer(file); });
  async function decodificar(blob) {
    try { return await createImageBitmap(blob, { imageOrientation: 'from-image' }); } catch (e1) {}
    try { return await createImageBitmap(blob); } catch (e2) {}
    const url = URL.createObjectURL(blob);
    try { return await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('No se pudo abrir la imagen')); i.src = url; }); }
    finally { setTimeout(() => URL.revokeObjectURL(url), 5000); }
  }
  async function reducir(bytes, tipo, max = 1600) {
    const bmp = await decodificar(new Blob([bytes], { type: tipo || 'image/jpeg' }));
    const w0 = bmp.width || bmp.naturalWidth, h0 = bmp.height || bmp.naturalHeight, k = Math.min(1, max / Math.max(w0, h0));
    const w = Math.max(1, Math.round(w0 * k)), h = Math.max(1, Math.round(h0 * k)), c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(bmp, 0, 0, w, h);
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.82));
    if (!blob || !blob.size) throw new Error('El teléfono no pudo procesar la foto');
    return { blob, w, h };
  }
  // Se guarda como bytes (no como Blob): es lo más confiable en Safari/iPhone
  async function poner(id, blob) {
    const buf = await blob.arrayBuffer();
    if (await abrir()) await tx('readwrite', s => s.put({ buf, tipo: blob.type || 'image/jpeg' }, id)); else memoria.set(id, blob);
  }
  async function guardar(id, file) {
    const bytes = await leerBytes(file);
    if (!bytes || !bytes.byteLength) throw new Error('La foto llegó vacía');
    const { blob, w, h } = await reducir(bytes, file.type);
    await poner(id, blob);
    if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); }
    const verif = await obtener(id); if (!verif || !verif.size) throw new Error('La foto no quedó guardada en el teléfono');
    return { w, h };
  }
  async function obtener(id) {
    if (!(await abrir())) return memoria.get(id) || null;
    const v = await tx('readonly', s => s.get(id)); if (!v) return null;
    return v instanceof Blob ? v : new Blob([v.buf], { type: v.tipo || 'image/jpeg' });   // acepta también fotos guardadas con versiones anteriores
  }
  async function borrar(id) { if (await abrir()) await tx('readwrite', s => s.delete(id)); else memoria.delete(id); if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); } }
  async function borrarTodas() { if (await abrir()) await tx('readwrite', s => s.clear()); memoria.clear(); urls.forEach(u => URL.revokeObjectURL(u)); urls.clear(); }
  // Gira la foto guardada (90 = derecha, -90 = izquierda) y devuelve sus nuevas medidas
  async function girar(id, grados) {
    const b = await obtener(id); if (!b) return null;
    const bmp = await decodificar(b), g = ((grados % 360) + 360) % 360, cambia = g === 90 || g === 270;
    const c = document.createElement('canvas'); c.width = cambia ? bmp.height : bmp.width; c.height = cambia ? bmp.width : bmp.height;
    const x = c.getContext('2d'); x.translate(c.width / 2, c.height / 2); x.rotate(g * Math.PI / 180); x.drawImage(bmp, -bmp.width / 2, -bmp.height / 2);
    const nb = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.88));
    await poner(id, nb);
    if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); }
    return { w: c.width, h: c.height };
  }
  async function url(id) { if (urls.has(id)) return urls.get(id); const b = await obtener(id); if (!b) return null; const u = URL.createObjectURL(b); urls.set(id, u); return u; }
  return { guardar, obtener, borrar, borrarTodas, girar, url };
})();
