const $ = id => document.getElementById(id);

// Crea una foto ficticia de color (en la app real vendrá de la cámara)
function fotoFalsa(texto, w, h, color) {
  return new Promise(res => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); x.fillStyle = color; x.fillRect(0, 0, w, h);
    x.fillStyle = '#fff'; x.font = 'bold 60px sans-serif'; x.fillText(texto, 40, 110);
    c.toBlob(async b => res({ data: new Uint8Array(await b.arrayBuffer()), w, h }), 'image/jpeg', 0.85);
  });
}

let archivoListo = null;

$('btnGenerar').addEventListener('click', async () => {
  const btn = $('btnGenerar'); btn.disabled = true; $('btnDescargar').hidden = true;
  try {
    $('estado').textContent = 'Preparando fotos de ejemplo…';
    const F = {
      placa20: await fotoFalsa('FOTO 1', 1600, 1200, '#46709f'), placa23: await fotoFalsa('FOTO 2', 1600, 1200, '#5a8264'),
      tapa: await fotoFalsa('FOTO VERTICAL', 1200, 1600, '#96645a'), insp: await fotoFalsa('FOTO 3', 1600, 1200, '#78598c'),
      temp: await fotoFalsa('FOTO 4', 1600, 1200, '#aa5050'), solicitud: await fotoFalsa('SOLICITUD (EJEMPLO)', 1240, 1500, '#c8c8c8'),
      firma: await fotoFalsa('FIRMA', 600, 200, '#999999')
    };
    $('estado').textContent = 'Armando el reporte…';
    const resp = await fetch('plantilla/plantilla_maestra_reporte.docx');
    if (!resp.ok) throw new Error('No se encontró la plantilla');
    const salida = Motor.generar(await resp.arrayBuffer(), datosPrueba(F));
    archivoListo = new Blob([salida], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    $('estado').textContent = '¡Listo! El reporte de prueba se generó correctamente.';
    $('btnDescargar').hidden = false;
  } catch (e) {
    console.error(e); $('estado').textContent = 'Algo falló: ' + (e.message || e);
  }
  btn.disabled = false;
});

$('btnDescargar').addEventListener('click', () => {
  if (!archivoListo) return;
  const url = URL.createObjectURL(archivoListo);
  const a = document.createElement('a'); a.href = url; a.download = 'reporte_prueba.docx';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
