// Captura guiada: lista de secciones, pantalla de cada sección y armado de los datos del documento
let borrador = null;
let slotActual = null, seccionActual = null;

const defActual = () => ANEXO_DEF[reporte.anexo];
const guardarBorrador = () => LS.set('rm_borrador', borrador);
function nuevoBorrador() { borrador = { anexo: reporte.anexo, textos: Object.assign({}, defActual().textos), fotos: {}, valores: {} }; guardarBorrador(); }
function asegurarBorrador() { if (borrador === null) borrador = LS.get('rm_borrador'); if (!borrador || borrador.anexo !== reporte.anexo) nuevoBorrador(); }

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
  const f = sl.filter(s => borrador.fotos[s.id]).length, n = conNum.filter(s => (borrador.valores[s.id] || '').trim() !== '').length;
  return { f, ft: sl.length, n, nt: conNum.length, completo: f === sl.length && n === conNum.length };
}
function totales() {
  return todasLasSecciones().reduce((t, x) => { const e = estadoSeccion(x.sec); t.f += e.f; t.ft += e.ft; t.n += e.n; t.nt += e.nt; return t; }, { f: 0, ft: 0, n: 0, nt: 0 });
}

// ---------- Lista de secciones ----------
function pantallaCaptura() {
  asegurarBorrador();
  const cont = $('listaSecciones'); cont.innerHTML = '';
  todasLasSecciones().forEach(({ sec, nombre }) => {
    const e = estadoSeccion(sec), b = document.createElement('button');
    b.className = 'seccion' + (e.completo ? ' ok' : '');
    const partes = []; if (e.ft) partes.push(`${e.f}/${e.ft} fotos`); if (e.nt) partes.push(`${e.n}/${e.nt} lecturas`);
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
  sec.bloques.forEach(b => {
    if (b.tipo === 'texto') {
      const l = document.createElement('label'); l.textContent = defActual().etiquetasTextos[b.id] || 'Texto';
      const ta = document.createElement('textarea'); ta.rows = 6; ta.value = borrador.textos[b.id] || '';
      ta.addEventListener('input', () => { borrador.textos[b.id] = ta.value; guardarBorrador(); });
      const r = document.createElement('button'); r.className = 'sec chico'; r.textContent = 'Restaurar texto original';
      r.addEventListener('click', () => { ta.value = borrador.textos[b.id] = defActual().textos[b.id]; guardarBorrador(); });
      cont.append(l, ta, r);
    } else {
      if (b.titulo) { const h = document.createElement('h3'); h.textContent = b.titulo; cont.appendChild(h); }
      b.slots.forEach(s => cont.appendChild(filaFoto(s)));
    }
  });
  mostrar('pSeccion');
}
function filaFoto(s) {
  const d = document.createElement('div'); d.className = 'slot'; d.dataset.slot = s.id;
  d.innerHTML = `<div class="mini"><span>Sin foto</span></div><div class="info"><div class="et"></div><div class="num"></div>
    <div class="bots"><button class="chico cam">📷 Cámara</button><button class="chico sec gal">🖼 Galería</button></div></div>`;
  d.querySelector('.et').textContent = s.etiqueta;
  if (s.unidad) {
    const i = document.createElement('input'); i.type = 'text'; i.inputMode = 'decimal'; i.placeholder = 'Valor'; i.value = borrador.valores[s.id] || '';
    i.addEventListener('input', () => { borrador.valores[s.id] = i.value; guardarBorrador(); });
    const u = document.createElement('span'); u.textContent = ' ' + s.unidad; d.querySelector('.num').append(i, u);
  }
  d.querySelector('.cam').addEventListener('click', () => { slotActual = s.id; $('inCam').click(); });
  d.querySelector('.gal').addEventListener('click', () => { slotActual = s.id; $('inGal').click(); });
  pintarMiniatura(d, s.id); return d;
}
async function pintarMiniatura(fila, id) {
  const m = fila.querySelector('.mini'), u = borrador.fotos[id] ? await Fotos.url(id) : null;
  m.innerHTML = u ? `<img alt="">` : '<span>Sin foto</span>'; if (u) m.querySelector('img').src = u;
  fila.querySelector('.cam').textContent = u ? '📷 Repetir' : '📷 Cámara';
}
async function agregarFoto(id, file) {
  const dim = await Fotos.guardar(id, file); borrador.fotos[id] = dim; guardarBorrador();
  const fila = document.querySelector(`.slot[data-slot="${id}"]`); if (fila) pintarMiniatura(fila, id);
}
function iniciarCaptura() { ['inCam', 'inGal'].forEach(k => $(k).addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f || !slotActual) return;
  try { await agregarFoto(slotActual, f); } catch (err) { alert('No se pudo guardar la foto: ' + (err.message || err)); }
})); }

// ---------- Datos para el documento ----------
const fmtValor = (v, u) => { v = (v || '').trim().replace(',', '.'); return v ? `${v} ${u}` : '—'; };
async function armarCuerpo() {
  const d = defActual(), tx = borrador.textos, F = {};
  for (const id of Object.keys(borrador.fotos)) { const b = await Fotos.obtener(id); if (b) F[id] = { data: new Uint8Array(await b.arrayBuffer()), w: borrador.fotos[id].w, h: borrador.fotos[id].h }; }
  const presentes = sl => sl.filter(s => F[s.id]);
  const aDoc = b => {
    if (b.tipo === 'texto') return (tx[b.id] || '').trim() ? [{ texto: tx[b.id].trim() }] : [];
    if (b.individual) return presentes(b.slots).map(s => ({ foto: F[s.id], pie: s.pie }));
    const out = [], ps = presentes(b.slots);
    if (ps.length) { const v = b.valorEnPie ? (borrador.valores[b.slots[0].id] || '').trim() : ''; out.push({ fotos: ps.map(s => F[s.id]), pie: b.pie + (v ? ` (${v.replace(',', '.')} ${b.slots[0].unidad})` : '') }); }
    if (b.tabla) out.push({ tabla: { etiqueta: b.tabla.etiqueta, terminales: b.slots.map(s => s.etiqueta), valores: b.slots.map(s => fmtValor(borrador.valores[s.id], s.unidad)) }, pie: b.tabla.pie });
    return out;
  };
  const introSlots = d.intro.secciones.flatMap(s => s.bloques.filter(b => b.tipo === 'fotos').flatMap(b => b.slots));
  return {
    intro: { parrafos: ['intro1', 'intro2', 'intro3'].map(k => (tx[k] || '').trim()).filter(Boolean), fotos: presentes(introSlots).map(s => ({ foto: F[s.id], pie: s.pie })) },
    materiales: d.materiales,
    pasos: d.pasos.map(p => ({ titulo: p.titulo, bloques: p.secciones.flatMap(s => s.bloques.flatMap(aDoc)) })),
    observaciones: tx.obs, conclusion: tx.concl, solicitud: F.solicitud || null
  };
}
