// Motor: convierte los datos del reporte en un .docx usando la plantilla. Funciona en el navegador y en Node.
(function (root) {
  const MES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const MC  = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const MAXW = { solicitud: [16.5, 18] };

  // Reparte la altura libre de la página 2 entre las fotos de la introducción
  function limitesIntro(d, LIM, id) {
    const n = d.intro.fotos.length; if (!n) return;
    const textoH = d.intro.parrafos.reduce((s, t) => s + Math.ceil(t.length / 80) * 0.53 + 0.21, 0);
    const libre = 20.98 - 1.2 - textoH - n * 0.95 - 1.0;
    const por = Math.max(4, Math.min(libre / n, 10.5));
    d.intro.fotos.forEach(f => LIM.set(id(f.foto), [15.5, por]));
  }

  const dosd = n => String(n).padStart(2, '0');
  function hora12(h) { const [H, M] = h.split(':').map(Number); return `${dosd(H % 12 || 12)}:${dosd(M)} ${H < 12 ? 'a.m.' : 'p.m.'}`; }
  function intervalo(hi, hf) {
    let m = (Number(hf.slice(0, 2)) * 60 + Number(hf.slice(3, 5))) - (Number(hi.slice(0, 2)) * 60 + Number(hi.slice(3, 5)));
    if (m < 0) m += 1440;
    const h = Math.floor(m / 60), mm = m % 60;
    return `${h} ${h === 1 ? 'hora' : 'horas'} con ${dosd(mm)} minutos`;
  }
  // Líneas de la sección CONCLUSIONES (cada estación tiene su formato)
  function conclusiones(d) {
    const L = [], obs = String(d.observaciones || '').trim(), cc = String(d.conclusion || '').trim();
    if (obs) L.push(obs);
    if (d.formato_concl === 'intervalo') {
      const t = String(d.titulo_corto || '').trim();
      L.push('Tiempo del ' + (t || 'mantenimiento'));
      L.push('Hora inicio de mantenimiento: ' + hora12(d.hi_raw));
      L.push('Hora final de mantenimiento: ' + hora12(d.hf_raw));
      L.push('Intervalo de mantenimiento: ' + intervalo(d.hi_raw, d.hf_raw));
    } else L.push(`El mantenimiento inició a las ${d.hora_inicio} y terminó a las ${d.hora_fin}`);
    if (cc) L.push(cc);
    return L.join('\n');
  }

  // Convierte los datos "amigables" en los campos que usa la plantilla
  function preparar(d, id, LIM) {
    const f = new Date(d.fecha + 'T12:00:00');
    const corta = `${f.getDate()}/${MC[f.getMonth()]}/${String(f.getFullYear()).slice(2)}`;
    let ilu = 0, tab = 0;
    const foto = b => ({ es_foto: true, con_leyenda: true, imagen: id(b.foto), leyenda: `Ilustración ${++ilu} ${b.pie} (${corta})` });
    return Object.assign({}, d, {
      concl_texto: conclusiones(d),
      solicitud: d.solicitud ? id(d.solicitud) : undefined,
      fecha_larga: `${f.getDate()} de ${MES[f.getMonth()]} de ${f.getFullYear()}`,
      intro_parrafos: d.intro.parrafos.map(t => ({ texto: t })),
      intro_fotos: d.intro.fotos.map(foto),
      pasos: d.pasos.map(p => ({ titulo: p.titulo, bloques: p.bloques.flatMap(b => {
        if (b.texto) return [{ es_texto: true, texto: b.texto }];
        if (b.foto) return [foto(b)];
        if (b.fotos) {                       // varias fotos con una sola leyenda, hasta 3 por fila
          const fs = b.fotos.filter(Boolean), filas = [];
          for (let i = 0; i < fs.length; i += 3) filas.push(fs.slice(i, i + 3));
          return filas.map((r, i) => {
            const ultima = i === filas.length - 1;
            const o = { con_leyenda: ultima, leyenda: ultima ? `Ilustración ${++ilu} ${b.pie} (${corta})` : '' };
            r.forEach(f => LIM.set(id(f), [5.0, 6.5]));
            if (r.length === 1) { o.es_foto = true; o.imagen = id(r[0]); }
            else { o[r.length === 2 ? 'es_fila2' : 'es_fila3'] = true; r.forEach((f, k) => o['f' + (k + 1)] = id(f)); }
            return o;
          });
        }
        const t = b.tabla, n = t.terminales.length;
        const o = { ['es_tabla' + n]: true, etiqueta: t.etiqueta, leyenda: `Tabla ${++tab}. ${b.pie} (${corta})` };
        t.terminales.forEach((x, i) => { o['t' + (i + 1)] = x; o['v' + (i + 1)] = t.valores[i]; });
        return [o];
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
    doc.render(preparar(datos, id, LIM));
    return doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
  }
  root.Motor = { generar, preparar };
})(typeof window !== 'undefined' ? window : globalThis);
