const $ = id => document.getElementById(id);
const LS = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
let config = LS.get('rm_config'), sesion = LS.get('rm_sesion') || {}, reporte = LS.get('rm_reporte') || {};
let archivoListo = null, nombreArchivo = 'borrador.docx';

const PANTALLAS = ['pConfig', 'pInicio', 'pReporte', 'pCaptura', 'pSeccion', 'pResumen'];
function mostrar(id) {
  PANTALLAS.forEach(p => $(p).hidden = p !== id);
  const estacion = config && sesion.estacionId ? config.estaciones.find(e => e.id === sesion.estacionId) : null;
  $('subtitulo').textContent = sesion.usuario && estacion ? `${sesion.usuario} · Oficina ${estacion.nombre}` : 'Versión de prueba 0.6';
  $('btnCambiar').hidden = !(config && sesion.usuario);
  window.scrollTo(0, 0);
}
const opciones = (sel, items, valor) => { sel.innerHTML = ''; items.forEach(([v, t, dis]) => { const o = document.createElement('option'); o.value = v; o.textContent = t; o.disabled = !!dis; sel.appendChild(o); }); if (valor != null) sel.value = valor; };
const hoy = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

// ---------- Configuración (primer uso) ----------
function configValida(c) {
  return c && Array.isArray(c.estaciones) && c.estaciones.length && Array.isArray(c.personal) && c.personal.length &&
    c.responsable && c.responsable.personal && c.responsable.nombre_portada && c.responsable.nombre_firma && c.autoriza && c.vobo;
}
$('archivoConfig').addEventListener('change', async e => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const c = JSON.parse(await f.text());
    if (!configValida(c)) throw new Error('El archivo no tiene el formato esperado');
    config = c; LS.set('rm_config', c); $('errConfig').textContent = ''; iniciar();
  } catch (err) { $('errConfig').textContent = 'No se pudo leer la configuración: ' + err.message; }
});

// Carga desde Google Drive (primer uso y actualización)
async function traerConfigDeDrive(salida) {
  salida.textContent = 'Conectando con Google…';
  try {
    const r = await Drive.cargarConfig(LS.get('rm_config_fileid'));
    if (!configValida(r.config)) throw new Error('El archivo de Drive no tiene el formato esperado.');
    config = r.config; LS.set('rm_config', config); LS.set('rm_config_fileid', r.fileId);
    salida.textContent = ''; return true;
  } catch (e) { console.error(e); salida.textContent = ''; $('errConfig').textContent = e.message || String(e); $('estadoInicio').textContent = e.message || ''; return false; }
}
$('btnGoogle').addEventListener('click', async () => {
  $('errConfig').textContent = ''; $('btnGoogle').disabled = true;
  if (await traerConfigDeDrive($('estadoConfig'))) iniciar();
  $('btnGoogle').disabled = false;
});
$('btnActualizarConfig').addEventListener('click', async () => {
  $('btnActualizarConfig').disabled = true;
  if (await traerConfigDeDrive($('estadoInicio'))) { $('estadoInicio').textContent = 'Configuración actualizada.'; pantallaInicio(); $('estadoInicio').textContent = 'Configuración actualizada.'; }
  $('btnActualizarConfig').disabled = false;
});

// ---------- Identificación ----------
function pantallaInicio() {
  opciones($('selUsuario'), config.personal.map(p => [p, p]), sesion.usuario);
  opciones($('selEstacion'), config.estaciones.map(e => [e.id, e.nombre]), sesion.estacionId);
  mostrar('pInicio');
}
$('btnInicio').addEventListener('click', () => {
  sesion = { usuario: $('selUsuario').value, estacionId: $('selEstacion').value }; LS.set('rm_sesion', sesion);
  reporte.personas = [sesion.usuario].filter(p => p !== config.responsable.personal); LS.set('rm_reporte', reporte);
  pantallaReporte();
});
$('btnCambiar').addEventListener('click', pantallaInicio);

// ---------- Datos del reporte ----------
function pantallaReporte() {
  const disponibles = ANEXOS.map(a => [String(a.n), `Anexo ${a.n}. ${a.titulo}${a.disponible ? '' : ' (próximamente)'}`, !a.disponible]);
  opciones($('selAnexo'), disponibles, reporte.anexo || '10');
  $('inNumero').value = reporte.numero || ''; $('inFecha').value = reporte.fecha || hoy();
  $('inHoraIni').value = reporte.horaInicio || ''; $('inHoraFin').value = reporte.horaFin || '';
  const resp = config.responsable.personal, sel = new Set(reporte.personas || []);
  $('listaPersonas').innerHTML = '';
  config.personal.forEach(p => {
    const l = document.createElement('label'); l.className = 'chk';
    const c = document.createElement('input'); c.type = 'checkbox'; c.value = p;
    if (p === resp) { c.checked = true; c.disabled = true; } else c.checked = sel.has(p);
    l.appendChild(c); l.appendChild(document.createTextNode(p)); $('listaPersonas').appendChild(l);
  });
  $('avisoResp').textContent = `${resp} aparece siempre como responsable del reporte.`;
  $('errReporte').textContent = ''; mostrar('pReporte');
}
function leerFormulario() {
  reporte = {
    anexo: $('selAnexo').value, numero: $('inNumero').value.trim(), fecha: $('inFecha').value,
    horaInicio: $('inHoraIni').value, horaFin: $('inHoraFin').value,
    personas: [...$('listaPersonas').querySelectorAll('input:checked:not(:disabled)')].map(c => c.value)
  };
  LS.set('rm_reporte', reporte);
}
$('btnResumen').addEventListener('click', () => {
  leerFormulario();
  const falta = !reporte.numero ? 'el número de mantenimiento' : !reporte.fecha ? 'la fecha' : !reporte.horaInicio ? 'la hora de inicio' : !reporte.horaFin ? 'la hora de término' : '';
  if (falta) { $('errReporte').textContent = 'Falta ' + falta + '.'; return; }
  pantallaCaptura();
});
$('btnNuevo').addEventListener('click', async () => {
  if (!confirm('Se borrarán las fotos, lecturas y textos capturados de este reporte. ¿Empezar uno nuevo?')) return;
  await Fotos.borrarTodas(); borrador = null; LS.del('rm_borrador'); reporte = { personas: reporte.personas || [] }; LS.set('rm_reporte', reporte); pantallaReporte();
});
$('btnIrResumen').addEventListener('click', pantallaResumen);
$('btnVolverDatos').addEventListener('click', pantallaReporte);
$('btnSeccionListo').addEventListener('click', pantallaCaptura);

// ---------- Resumen y borrador ----------
function encabezado() {
  const est = config.estaciones.find(e => e.id === sesion.estacionId), r = config.responsable;
  const anexo = ANEXOS.find(a => String(a.n) === reporte.anexo);
  const otros = reporte.personas.filter(p => p !== r.personal);
  return {
    fecha: reporte.fecha, numero: reporte.numero, titulo: anexo.titulo.toUpperCase(),
    estacion_cabecera: est.cabecera, ciudad: est.ciudad,
    nombre: r.nombre_portada, colabora: otros.join(', ').toUpperCase(), telefono: r.telefono, correo: r.correo,
    responsables: [r.personal, ...otros],
    hora_inicio: reporte.horaInicio + ' Hrs.', hora_fin: reporte.horaFin + ' Hrs.',
    elabora_nombre: r.nombre_firma, elabora_area: 'Oficina de Estación ' + est.nombre,
    autoriza_nombre: config.autoriza.nombre, autoriza_area: config.autoriza.area,
    vobo_nombre: config.vobo.nombre, vobo_area: config.vobo.area
  };
}
function pantallaResumen() {
  const est = config.estaciones.find(e => e.id === sesion.estacionId), r = config.responsable;
  const anexo = ANEXOS.find(a => String(a.n) === reporte.anexo), otros = reporte.personas.filter(p => p !== r.personal);
  const [y, m, d] = reporte.fecha.split('-');
  const filas = [
    ['Mantenimiento', `Anexo ${anexo.n}. ${anexo.titulo}`], ['No. de mantenimiento', reporte.numero], ['Fecha', `${d}/${m}/${y}`],
    ['Horario', `${reporte.horaInicio} a ${reporte.horaFin} Hrs.`], ['Oficina de Estación', est.nombre],
    ['Responsable del reporte', r.nombre_portada], ['Colabora', otros.length ? otros.join(', ') : '(nadie más)'],
    ['Responsables del mantenimiento', [r.personal, ...otros].join(', ')],
    ['Elaboró', `${r.nombre_firma} — Oficina de Estación ${est.nombre}`],
    ['Autorizó', `${config.autoriza.nombre} — ${config.autoriza.area}`], ['Visto bueno', `${config.vobo.nombre} — ${config.vobo.area}`]
  ];
  $('datosResumen').innerHTML = ''; filas.forEach(([t, v]) => { const a = document.createElement('dt'); a.textContent = t; const b = document.createElement('dd'); b.textContent = v; $('datosResumen').append(a, b); });
  asegurarBorrador(); const t = totales();
  $('avanceResumen').textContent = `Fotos: ${t.f} de ${t.ft} · Lecturas: ${t.n} de ${t.nt}` + (t.f < t.ft || t.n < t.nt ? '. Lo que falte saldrá sin foto o con "—" en las tablas.' : '. Todo completo.');
  $('estado').textContent = ''; $('btnDescargar').hidden = true; archivoListo = null; mostrar('pResumen');
}
$('btnVolver').addEventListener('click', pantallaCaptura);

function fotoFalsa(texto, w, h, color) {
  return new Promise(res => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); x.fillStyle = color; x.fillRect(0, 0, w, h);
    x.fillStyle = '#fff'; x.font = 'bold 60px sans-serif'; x.fillText(texto, 40, 110);
    c.toBlob(async b => res({ data: new Uint8Array(await b.arrayBuffer()), w, h }), 'image/jpeg', 0.85);
  });
}
$('btnGenerar').addEventListener('click', async () => {
  const btn = $('btnGenerar'); btn.disabled = true; $('btnDescargar').hidden = true;
  try {
    $('estado').textContent = 'Armando el reporte…';
    const cuerpo = await armarCuerpo();
    if (!cuerpo.solicitud) cuerpo.solicitud = await fotoFalsa('SOLICITUD PENDIENTE DE AGREGAR', 1240, 1500, '#d8d8d8');
    const resp = await fetch('plantilla/plantilla_maestra_reporte.docx');
    if (!resp.ok) throw new Error('No se encontró la plantilla');
    const salida = Motor.generar(await resp.arrayBuffer(), Object.assign({}, encabezado(), cuerpo));
    archivoListo = new Blob([salida], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const tit = ANEXOS.find(x => String(x.n) === reporte.anexo).titulo.replace(/(^|\s)(\S)/g, (m, sp, ch) => sp + ch.toUpperCase());
    nombreArchivo = `${reporte.numero} ${tit}.docx`.replace(/[\\/:*?"<>|]/g, '');
    $('estado').textContent = '¡Listo! El reporte se generó correctamente.'; $('btnDescargar').hidden = false;
  } catch (e) { console.error(e); $('estado').textContent = 'Algo falló: ' + (e.message || e); }
  btn.disabled = false;
});
$('btnDescargar').addEventListener('click', () => {
  if (!archivoListo) return;
  const url = URL.createObjectURL(archivoListo), a = document.createElement('a');
  a.href = url; a.download = nombreArchivo; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
});

function iniciar() {
  if (!configValida(config)) { mostrar('pConfig'); return; }
  if (!sesion.usuario || !sesion.estacionId) { pantallaInicio(); return; }
  pantallaReporte();
}
iniciarCaptura();
iniciar();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
