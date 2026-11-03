// Guaymas · Anexo 17: Mantenimiento a la instalación eléctrica
(function () {
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF_EST.guaymas[17] = {
    n: 17, formatoConclusion: 'intervalo',
    materiales: ['Sopladora', 'Toalla microfibra', 'Guantes de carnaza', 'Multímetro, amperímetro y termómetro infrarrojo'],
    textos: {
      intro1: 'Mantener una instalación eléctrica en óptimas condiciones es crucial para el correcto funcionamiento de una estación retransmisora. Las fallas en el sistema eléctrico pueden interrumpir la operación y causar daños a los equipos conectados. Este mantenimiento preventivo se centró en revisar el estado general de los componentes eléctricos y los problemas detectados, como lámparas dañadas debido a la humedad, cuyo reemplazo se realizará en el siguiente mantenimiento. A continuación se muestran los diagramas unifilares que se tienen en la instalación eléctrica del sitio.',
      p1: 'Se inspeccionaron los tableros eléctricos para detectar cualquier signo de sobrecalentamiento, desgaste de componentes o conexiones flojas.\nSe revisaron las cajas de breakers para asegurar que no hubiera cortocircuitos ni signos de quemaduras.',
      p2: 'Se tomaron mediciones de voltaje regulado y no regulado en puntos clave del sistema, asegurando que estuvieran dentro de los parámetros normales.\nSe verificaron las conexiones de los interruptores y switches para detectar cualquier fluctuación anormal en el suministro eléctrico.\nDos lámparas arbotantes en el pasillo de acceso a la planta de emergencia y el cuarto de máquinas fueron identificadas como dañadas por la humedad. Se planificó su reemplazo en el próximo mantenimiento, incluyendo la instalación de tejas protectoras para prevenir daños futuros.',
      obs: 'Mantenimiento realizado sin observaciones.', concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'),
      { tipo: 'fotos', id: 'f_intro', individual: true, slots: [1, 2, 3].map(i => ({ id: `diag_${i}`, etiqueta: `Diagrama unifilar ${i}`, pie: 'Diagrama unifilar en sitio de Guaymas' })) }] }] },
    pasos: [
      paso('p1', 'Revisión visual de tableros y conexiones', [grp('insp', 'Inspección visual y limpieza de los tableros del diagrama unifilar', 5, 'Inspección')]),
      paso('p2', 'Medición de voltajes', [grp('volt', 'Toma de medición de voltaje regulado y no regulado y limpieza de tableros de la estancia', 12, 'Medición')])
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
