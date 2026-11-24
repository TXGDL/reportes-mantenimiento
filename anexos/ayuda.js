// Constructor compacto de procedimientos (Guadalajara). Cada anexo solo declara sus textos, pasos y fotos.
const AX = (() => {
  const ind = (id, lista) => ({ tipo: 'fotos', id, individual: true, slots: lista.map(([k, et, pie]) => ({ id: `${id}_${k}`, etiqueta: et, pie })) });
  const grp = (id, pie, n, et, ini = 1) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${ini + i}` })) });
  // Tabla de lecturas con una fila por equipo y dos valores por fila (sin fotos)
  const lec = (id, pie, cols, filas) => ({ tipo: 'lecturas', id, pie, cols, filas });
  const txt = id => ({ tipo: 'texto', id });
  function def(n, c, est) {
    const textos = {}, et = {};
    c.intro.forEach((t, i) => { textos['intro' + (i + 1)] = t; et['intro' + (i + 1)] = 'Introducción' + (c.intro.length > 1 ? ' ' + (i + 1) : ''); });
    const pasos = c.pasos.map((p, i) => {
      const id = 'p' + (i + 1); textos[id] = p.x; et[id] = 'Texto del paso ' + (i + 1);
      return { id, titulo: p.t, opcional: p.o || undefined, secciones: [{ id: 's' + id, titulo: p.t, bloques: [txt(id), ...(p.b || [])] }] };
    });
    if (!c.sinExtra) { textos.pX = ''; et.pX = 'Texto de trabajos adicionales'; }
    if (!c.sinExtra) pasos.push({ id: 'pX', opcional: true, titulo: 'Trabajos adicionales / hallazgos (solo si los hubo)', secciones: [{ id: 'sX', titulo: 'Trabajos adicionales', bloques: [txt('pX'), grp('extra', 'Adicional', 6, 'Foto')] }] });
    textos.obs = c.obs || 'Mantenimiento realizado sin observaciones'; textos.concl = c.concl || '';
    et.obs = 'Observaciones'; et.concl = 'Conclusión (opcional)';
    const bI = c.intro.map((_, i) => txt('intro' + (i + 1)));
    if (c.fotosIntro) bI.push({ tipo: 'fotos', id: 'f_intro', individual: true, slots: c.fotosIntro.map(([k, e, pie]) => ({ id: k, etiqueta: e, pie })) });
    (est ? ANEXO_DEF_EST[est] : ANEXO_DEF)[n] = {
      n, titulo: c.titulo, formatoConclusion: c.formato || 'normal', materiales: c.mat, textos, etiquetasTextos: et,
      intro: { fijas: c.fijas, secciones: [{ id: 'intro', titulo: 'Introducción', bloques: bI }] }, pasos,
      cierre: { secciones: [
        { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
        { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
      ] }
    };
  }
  return { ind, grp, lec, def };
})();
