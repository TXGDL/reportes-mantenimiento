// Carga los archivos de la app siempre frescos (con sello de hora) para no quedarse con una versión vieja
(function () {
  const t = Date.now();
  const L = ['version.js', 'lib/pizzip.min.js', 'lib/docxtemplater.min.js', 'lib/imagemodule.js', 'motor.js', 'catalogo.js', 'anexos/anexo10.js', 'fotos.js', 'drive.js', 'captura.js', 'app.js'];
  L.forEach(s => { const e = document.createElement('script'); e.src = s + (s.indexOf('lib/') === 0 ? '' : '?t=' + t); e.async = false; document.body.appendChild(e); });
})();
