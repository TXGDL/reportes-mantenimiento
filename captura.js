// Captura guiada: lista de secciones, pantalla de cada sección y armado de los datos del documento
let borrador = null;
let slotActual = null, seccionActual = null;

const defActual = () => (ANEXO_DEF_EST[sesion.estacionId] || {})[reporte.anexo];
const guardarBorrador = () => LS.set('rm_borrador', borrador);
function nuevoBorrador() { borrador = { anexo: reporte.anexo, textos: Object.assign({}, defActual().textos), fotos: {}, valores: {}, na: {}, naFoto: {} }; guardarBorrador(); }
function asegurarBorrador() { if (borrador === null) borrador = LS.get('rm_borrador'); if (!borrador || borrador.anexo !== reporte.anexo) nuevoBorrador(); if (!borrador.na) borrador.na = {}; if (!borrador.naFoto) borrador.naFoto = {}; }
const esPaso = sec => defActual().pasos.some(p => p.secciones.includes(sec));
const esNA = sec => !!(borrador.na && borrador.na[sec.id]);

function todasLasSecciones() {
  const d = defActual(), L = [];
  d.intro.secciones.forEach(s => L.push({ sec: s, nombre: s.titulo }));
  d.pasos.forEach((p, i) => p.secciones.forEach(s => L.push({ sec: s, nombre: `Paso ${i + 1}. ${p.secciones.length > 1 ? s.titulo : p.titulo}` })));
  d.cierre.secciones.forEach(s => L.push({ sec: s, nombre: s.titulo }));
  return L;
}
const slotsDe = sec => sec.bloques.filter(b => b.tipo === 'fotos').flatMap(b => b.slots);
function estadoSeccion(sec) {
  const sl = slotsDe(sec), conNum = sl.filter(s => s.unidad);
  const f = sl.filter(s => borrador.fotos[s.id] || borrador.naFoto[s.id]).length, n = conNum.filter(s => borrador.naFoto[s.id] || (borrador.valores[s.id] || '').trim() !== '').length;
  // Paso opcional (trabajos adicionales): se completa con "No aplica" o con al menos una foto o texto
  const opc = defActual().pasos.some(p => p.opcional && p.secciones.includes(sec));
  if (opc && !esNA(sec) && (f > 0 || sec.bloques.some(b => b.tipo === 'texto' && (borrador.textos[b.id] || '').trim()))) return { f, ft: f, n, nt: n, na: false, completo: true };
  const na = esNA(sec);
  return { f, ft: sl.length, n, nt: conNum.length, na, completo: na || (f === sl.length && n === conNum.length) };
}
function totales() {
  return todasLasSecciones().reduce((t, x) => { const e = estadoSeccion(x.sec); if (e.na) return t; t.f += e.f; t.ft += e.ft; t.n += e.n; t.nt += e.nt; return t; }, { f: 0, ft: 0, n: 0, nt: 0 });
}

// ---------- Lista de secciones ----------
function pantallaCaptura() {
  asegurarBorrador();
  const cont = $('listaSecciones'); cont.innerHTML = '';
  todasLasSecciones().forEach(({ sec, nombre }) => {
    const e = estadoSeccion(sec), b = document.createElement('button');
    b.className = 'seccion' + (e.completo ? ' ok' : '');
    const partes = []; if (e.na) partes.push('No aplica'); else if (e.ft) partes.push(`${e.f}/${e.ft} fotos`); if (!e.na && e.nt) partes.push(`${e.n}/${e.nt} lecturas`);
    b.innerHTML = `<span class="marca">${e.completo ? '✓' : '○'}</span><span class="nom"></span><small></small>`;
    b.querySelector('.nom').textContent = nombre; b.querySelector('small').textContent = partes.join(' · ');
    b.addEventListener('click', () => pantallaSeccion(sec, nombre)); cont.appendChild(b);
  });
  const t = totales();
  $('progreso').textContent = `Fotos: ${t.f} de ${t.ft} · Lecturas: ${t.n} de ${t.nt}`;
  mostrar('pCaptura');
}

// ---------- Una sección ----------
function pantallaSeccion(sec, nombre) {
  seccionActual = { sec, nombre }; $('tituloSeccion').textContent = nombre;
  const cont = $('cuerpoSeccion'); cont.innerHTML = '';
  let leyenda = null;
  const pintarLeyenda = () => {
    if (!leyenda) return;
    const on = esNA(sec); leyenda.hidden = !on; if (!on) return;
    const esOpc = defActual().pasos.some(p => p.opcional && p.secciones.includes(sec));
    const igual = sec.bloques.filter(b => b.tipo === 'texto').every(b => (borrador.textos[b.id] || '').trim() === (defActual().textos[b.id] || '').trim());
    leyenda.className = 'aviso-na' + (igual && !esOpc ? ' alerta' : '');
    leyenda.textContent = igual
      ? esOpc ? '' : '⚠ Justifica en el texto de este paso por qué no se realizó o no hay fotografías (ahora tiene el texto original). Ese texto es el que saldrá en el reporte.'
      : '✓ Este paso saldrá en el reporte solo con tu texto, sin fotografías.';
    leyenda.hidden = !leyenda.textContent;
  };
  if (esPaso(sec)) {
    const l = document.createElement('label'); l.className = 'chk na';
    const c = document.createElement('input'); c.type = 'checkbox'; c.checked = esNA(sec);
    c.addEventListener('change', () => {
      borrador.na[sec.id] = c.checked; if (!c.checked) delete borrador.na[sec.id]; guardarBorrador(); pintarLeyenda();
      if (c.checked) aviso('Escribe en el texto por qué no se realizó este paso.', 5000);
    });
    l.append(c, document.createTextNode(' No aplica / no se realizó este paso'));
    leyenda = document.createElement('div'); leyenda.className = 'aviso-na'; leyenda.hidden = true;
    cont.append(l, leyenda);
  }
  sec.bloques.forEach(b => {
    if (b.tipo === 'texto') {
      const l = document.createElement('label'); l.textContent = defActual().etiquetasTextos[b.id] || 'Texto';
      const ta = document.createElement('textarea'); ta.rows = 6; ta.value = borrador.textos[b.id] || '';
      ta.addEventListener('input', () => { borrador.textos[b.id] = ta.value; guardarBorrador(); pintarLeyenda(); });
      const r = document.createElement('button'); r.className = 'sec chico'; r.textContent = 'Restaurar texto original';
      r.addEventListener('click', () => { ta.value = borrador.textos[b.id] = defActual().textos[b.id]; guardarBorrador(); pintarLeyenda(); });
      cont.append(l, ta, r);
    } else {
      if (b.titulo) { const h = document.createElement('h3'); h.textContent = b.titulo; cont.appendChild(h); }
      b.slots.forEach(s => cont.appendChild(filaFoto(s)));
    }
  });
  pintarLeyenda(); mostrar('pSeccion');
}
function filaFoto(s) {
  const d = document.createElement('div'); d.className = 'slot'; d.dataset.slot = s.id;
  const botones = s.origen === 'drive'
    ? '<button class="chico drv">📁 Elegir de Drive</button><button class="chico sec gal">📱 Del celular</button>'
    : '<button class="chico cam">📷 Cámara</button><button class="chico sec gal">🖼 Galería</button>';
  d.innerHTML = `<div class="mini"><span>Sin foto</span></div><div class="info"><div class="et"></div><div class="num"></div>
    <div class="hint"></div><div class="bots">${botones}</div>
    <div class="bots giro"><button class="chico sec izq" aria-label="Girar a la izquierda" disabled>↺ Girar</button><button class="chico sec der" aria-label="Girar a la derecha" disabled>Girar ↻</button><button class="chico sec bor" aria-label="Borrar la foto" disabled>🗑 Borrar</button><button class="chico sec nafoto">🚫 No aplica</button></div></div>`;
  d.querySelector('.et').textContent = s.etiqueta;
  if (s.unidad) {
    const i = document.createElement('input'); i.type = 'text'; i.inputMode = 'decimal'; i.placeholder = 'Valor'; i.value = borrador.valores[s.id] || '';
    i.addEventListener('input', () => { borrador.valores[s.id] = i.value; guardarBorrador(); });
    const u = document.createElement('span'); u.textContent = ' ' + s.unidad; d.querySelector('.num').append(i, u);
  }
  if (s.origen === 'drive') {
    d.querySelector('.hint').textContent = pistaSolicitud(s);
    d.querySelector('.drv').addEventListener('click', () => elegirDeDrive(s));
  } else d.querySelector('.cam').addEventListener('click', () => { slotActual = s.id; LS.set('rm_slot', s.id); $('inCam').click(); });
  d.querySelector('.gal').addEventListener('click', () => { slotActual = s.id; LS.set('rm_slot', s.id); $('inGal').click(); });
  d.querySelector('.izq').addEventListener('click', () => girarFoto(s.id, -90));
  d.querySelector('.der').addEventListener('click', () => girarFoto(s.id, 90));
  d.querySelector('.bor').addEventListener('click', () => borrarFoto(s.id));
  d.querySelector('.nafoto').addEventListener('click', () => {
    if (borrador.fotos[s.id]) return;
    if (borrador.naFoto[s.id]) delete borrador.naFoto[s.id]; else borrador.naFoto[s.id] = true;
    guardarBorrador(); pintarMiniatura(d, s.id);
  });
  d.querySelector('.mini').addEventListener('click', () => { if (borrador.fotos[s.id]) abrirVisor(s.id); });
  pintarMiniatura(d, s.id); return d;
}
async function pintarMiniatura(fila, id) {
  const m = fila.querySelector('.mini'), u = borrador.fotos[id] ? await Fotos.url(id) : null, na = !u && !!borrador.naFoto[id];
  m.innerHTML = u ? `<img alt="">` : (na ? '<span>No aplica</span>' : '<span>Sin foto</span>');
  fila.classList.toggle('na', na);
  const nb = fila.querySelector('.nafoto'); if (nb) { nb.textContent = na ? '↩ Quitar “No aplica”' : '🚫 No aplica'; nb.disabled = !!u; } if (u) m.querySelector('img').src = u;
  const cam = fila.querySelector('.cam'); if (cam) cam.textContent = u ? '📷 Repetir' : '📷 Cámara';
  const drv = fila.querySelector('.drv'); if (drv) drv.textContent = u ? '📁 Cambiar' : '📁 Elegir de Drive';
  const hint = fila.querySelector('.hint'); if (hint && u && borrador.fotos[id].nombre) hint.textContent = 'Elegida: ' + borrador.fotos[id].nombre; fila.querySelectorAll('.giro button:not(.nafoto)').forEach(b => b.disabled = !u);
  if (!u && hint) { const sd = slotPorId(id); if (sd && sd.origen === 'drive') hint.textContent = pistaSolicitud(sd); }
}
const slotPorId = id => todasLasSecciones().flatMap(x => slotsDe(x.sec)).find(s => s.id === id);
async function agregarFoto(id, file) {
  const def = slotPorId(id), dim = def && def.original ? await Fotos.guardarOriginal(id, await Fotos.leerBytes(file), file.type) : await Fotos.guardar(id, file); borrador.fotos[id] = dim; delete borrador.naFoto[id]; guardarBorrador();
  const fila = document.querySelector(`.slot[data-slot="${id}"]`); if (fila) pintarMiniatura(fila, id);
}
  // ---------- Elegir un archivo desde Drive (solicitud) ----------
const MESES_CARPETA = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
const baseSolicitudes = () => (config && config.solicitudes && config.solicitudes.carpetaBaseId) || '';
function carpetasSolicitud() {
  const base = baseSolicitudes(), rec = LS.get('rm_carpeta_sol'), L = [];
  if (!base) return null;                                   // sin carpeta base configurada: se busca en todo el Drive
  if (rec && rec !== base) L.push({ id: rec, etiqueta: 'Carpeta reciente' });
  L.push({ id: base, etiqueta: 'Reportes' }); return L;
}
function pistaSolicitud(s) {
  const n = reporte.numero || '', f = reporte.fecha;
  if (!baseSolicitudes() || !f) return `En Drive busca: ${s.buscar} ${n}`.trim();
  const [y, m] = f.split('-');
  return `Abre ${y} › mantenimientos › ${m} ${MESES_CARPETA[Number(m) - 1]} y elige: ${s.buscar} ${n}`.trim();
}
async function elegirDeDrive(s) {
  try {
    aviso('Abriendo Drive…', 8000);
    const r = await Drive.elegirArchivo({ consulta: `${s.buscar || ''} ${reporte.numero || ''}`.trim(), titulo: s.etiqueta, carpetas: carpetasSolicitud() });
    if (r.carpetaId) LS.set('rm_carpeta_sol', r.carpetaId);       // la próxima vez abre directo en esta carpeta
    aviso('Guardando la imagen…', 60000);
    const dim = await Fotos.guardarOriginal(s.id, r.bytes, r.tipo);
    borrador.fotos[s.id] = Object.assign({}, dim, { nombre: r.nombre }); delete borrador.naFoto[s.id]; guardarBorrador();
    const fila = document.querySelector(`.slot[data-slot="${s.id}"]`); if (fila) pintarMiniatura(fila, s.id);
    aviso('Listo ✓ ' + r.nombre, 3500);
  } catch (err) { console.error(err); aviso((err && err.message) || String(err), 12000, true); }
}
// ---------- Girar y ver en grande ----------
let visorId = null;
async function borrarFoto(id) {
  if (!borrador.fotos[id] || !confirm('¿Borrar esta foto?')) return;
  try { await Fotos.borrar(id); } catch (e) { console.error(e); }
  delete borrador.fotos[id]; guardarBorrador();
  if (visorId === id) cerrarVisor();
  const fila = document.querySelector(`.slot[data-slot="${id}"]`); if (fila) pintarMiniatura(fila, id);
  aviso('Foto borrada', 2500);
}
async function girarFoto(id, g) {
  const dim = await Fotos.girar(id, g); if (!dim) return;
  borrador.fotos[id] = Object.assign({}, borrador.fotos[id], dim); guardarBorrador();
  const fila = document.querySelector(`.slot[data-slot="${id}"]`); if (fila) pintarMiniatura(fila, id);
  if (visorId === id) $('visorImg').src = await Fotos.url(id);
}
async function abrirVisor(id) { visorId = id; $('visorImg').src = await Fotos.url(id); $('visor').hidden = false; }
function cerrarVisor() { $('visor').hidden = true; visorId = null; }

function iniciarCaptura() {
  $('vIzq').addEventListener('click', () => girarFoto(visorId, -90)); $('vDer').addEventListener('click', () => girarFoto(visorId, 90)); $('vCerrar').addEventListener('click', cerrarVisor);
  ['inCam', 'inGal'].forEach(k => $(k).addEventListener('change', async e => {
    const f = e.target.files && e.target.files[0], slot = slotActual || LS.get('rm_slot');
    if (!f) return;
    if (!slot) { aviso('Toca de nuevo el botón de la cámara o la galería del espacio donde va la foto.', 6000, true); e.target.value = ''; return; }
    try {
      aviso('Guardando foto…', 60000);
      await agregarFoto(slot, f);          // primero se lee y guarda; el selector se reinicia hasta el final
      aviso('Foto guardada ✓', 2500);
    } catch (err) {
      console.error(err);
      aviso('No se pudo guardar la foto: ' + (err && err.name ? err.name + ': ' : '') + ((err && err.message) || err), 15000, true);
    } finally { e.target.value = ''; }
  }));
}

// ---------- Datos para el documento ----------
const fmtValor = (v, u) => { v = (v || '').trim().replace(',', '.'); return v ? `${v}\u00a0${u}` : '—'; };
async function armarCuerpo() {
  const d = defActual(), tx = borrador.textos, F = {};
  for (const id of Object.keys(borrador.fotos)) { const b = await Fotos.obtener(id); if (b) F[id] = { data: new Uint8Array(await b.arrayBuffer()), w: borrador.fotos[id].w, h: borrador.fotos[id].h }; }
  const presentes = sl => sl.filter(s => F[s.id]);
  // Imágenes fijas de la introducción (vienen incluidas en la app)
  const fijas = [];
  for (const x of (d.intro.fijas || [])) { try { const r = await fetch(x.src); if (r.ok) fijas.push({ foto: { data: new Uint8Array(await r.arrayBuffer()), w: x.w, h: x.h }, pie: x.pie }); } catch (e) {} }
  const aDoc = b => {
    if (b.tipo === 'texto') return (tx[b.id] || '').trim() ? [{ texto: tx[b.id].trim() }] : [];
    if (b.individual) return presentes(b.slots).map(s => ({ foto: F[s.id], pie: s.pie }));
    const out = [], ps = presentes(b.slots);
    if (ps.length) { const v = b.valorEnPie ? (borrador.valores[b.slots[0].id] || '').trim() : ''; out.push({ fotos: ps.map(s => F[s.id]), pie: b.pie + (v ? ` (${v.replace(',', '.')} ${b.slots[0].unidad})` : '') }); }
    if (b.tabla) out.push({ tabla: { etiqueta: b.tabla.etiqueta, terminales: b.slots.map(s => s.etiqueta), valores: b.slots.map(s => borrador.naFoto[s.id] ? 'N/A' : fmtValor(borrador.valores[s.id], s.unidad)) }, pie: b.tabla.pie });
    return out;
  };
  const introSlots = d.intro.secciones.flatMap(s => s.bloques.filter(b => b.tipo === 'fotos').flatMap(b => b.slots));
  return {
    intro: { parrafos: ['intro1', 'intro2', 'intro3'].map(k => (tx[k] || '').trim()).filter(Boolean), fotos: [...fijas, ...presentes(introSlots).map(s => ({ foto: F[s.id], pie: s.pie }))] },
    materiales: d.materiales,
    pasos: d.pasos.map(p => ({ titulo: p.titulo, bloques: p.secciones.flatMap(s => s.bloques.flatMap(b => esNA(s) && b.tipo !== 'texto' ? [] : aDoc(b))), opcional: p.opcional })).filter(p => !p.opcional || p.bloques.length),
    observaciones: tx.obs, conclusion: tx.concl, solicitud: F.solicitud || null
  };
}
