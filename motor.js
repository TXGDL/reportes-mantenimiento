// Motor: convierte los datos del reporte en un .docx usando la plantilla. Funciona en el navegador y en Node.
(function (root) {
  const MES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const MC  = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const MAXW = { solicitud: [15, 17] };

  // Reparte la altura libre de la página 2 entre las fotos de la introducción
  function limitesIntro(d, LIM, id) {
    const n = d.intro.fotos.length; if (!n) return;
    const textoH = d.intro.parrafos.reduce((s, t) => s + Math.ceil(t.length / 80) * 0.53 + 0.21, 0);
    const libre = 20.98 - 1.2 - textoH - n * 0.95 - 1.0;
    const por = Math.max(4, Math.min(libre / n, 10.5));
    d.intro.fotos.forEach(f => LIM.set(id(f.foto), [15.5, por]));
  }

  // Convierte los datos "amigables" en los campos que usa la plantilla
  function preparar(d, id) {
    const f = new Date(d.fecha + 'T12:00:00');
    const corta = `${f.getDate()}/${MC[f.getMonth()]}/${String(f.getFullYear()).slice(2)}`;
    let ilu = 0, tab = 0;
    const foto = b => ({ es_foto: true, imagen: id(b.foto), leyenda: `Ilustración ${++ilu} ${b.pie} (${corta})` });
    return Object.assign({}, d, {
      solicitud: d.solicitud ? id(d.solicitud) : undefined,
      fecha_larga: `${f.getDate()} de ${MES[f.getMonth()]} de ${f.getFullYear()}`,
      intro_parrafos: d.intro.parrafos.map(t => ({ texto: t })),
      intro_fotos: d.intro.fotos.map(foto),
      pasos: d.pasos.map(p => ({ titulo: p.titulo, bloques: p.bloques.map(b => {
        if (b.texto) return { es_texto: true, texto: b.texto };
        if (b.foto) return foto(b);
        const t = b.tabla, n = t.terminales.length;
        const o = { ['es_tabla' + n]: true, etiqueta: t.etiqueta, leyenda: `Tabla ${++tab}. ${b.pie} (${corta})` };
        t.terminales.forEach((x, i) => { o['t' + (i + 1)] = x; o['v' + (i + 1)] = t.valores[i]; });
        return o;
      }) }))
    });
  }

  // plantillaBuf: ArrayBuffer/Uint8Array del .docx. Las fotos son {data:Uint8Array,w,h}
  function generar(plantillaBuf, datos) {
    // El módulo de imágenes necesita que cada foto se identifique con un texto (no con un objeto)
    const IMG = new Map(), IDS = new Map();
    const id = f => { if (!IDS.has(f)) { const k = 'img' + IDS.size; IDS.set(f, k); IMG.set(k, f); } return IDS.get(f); };
    const LIM = new Map(); limitesIntro(datos, LIM, id);
    const im = new root.ImageModule({
      centered: false,
      getImage: k => IMG.get(k).data,
      getSize: (img, k, tag) => {
        const v = IMG.get(k), [mw, mh] = LIM.get(k) || MAXW[tag] || [8.5, 6.5];
        const s = Math.min(mw / 2.54 * 96 / v.w, mh / 2.54 * 96 / v.h);
        return [Math.round(v.w * s), Math.round(v.h * s)];
      }
    });
    const doc = new root.docxtemplater(new root.PizZip(plantillaBuf), { paragraphLoop: true, linebreaks: true, modules: [im] });
    doc.render(preparar(datos, id));
    return doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
  }
  root.Motor = { generar, preparar };
})(typeof window !== 'undefined' ? window : globalThis);
