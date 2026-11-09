// Carga los archivos de la app siempre frescos (con sello de hora) para no quedarse con una versión vieja
(function () {
  const t = Date.now();
  const L = ['version.js', 'lib/pizzip.min.js', 'lib/docxtemplater.min.js', 'lib/imagemodule.js', 'motor.js', 'catalogo.js', 'anexos/anexo10.js', 'anexos/anexo11.js', 'anexos/anexo14.js','anexos/anexo15.js', 'anexos/anexo16.js', 'anexos/anexo17.js', 'anexos/guaymas/anexo10.js', 'anexos/guaymas/anexo11.js', 'anexos/guaymas/anexo15.js', 'anexos/guaymas/anexo16.js', 'anexos/guaymas/anexo17.js', 'fotos.js', 'drive.js', 'captura.js', 'app.js'];
  L.forEach(s => { const e = document.createElement('script'); e.src = s + (s.indexOf('lib/') === 0 ? '' : '?t=' + t); e.async = false; document.body.appendChild(e); });
})();
