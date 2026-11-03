// Guaymas · Anexo 15: Mantenimiento general al transmisor (R&S THV9evo)
(function () {
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF_EST.guaymas[15] = {
    n: 15, formatoConclusion: 'intervalo',
    materiales: ['Guantes de carnaza', 'Sopladora', 'Toalla microfibra', 'Amperímetro y voltímetro', '2 extensiones hembra', '1 extensión para clavija de tres vías', 'Cinchos del número 19 cm', 'Pinzas de corte', 'Desarmador trox N°8 y N°20'],
    textos: {
      intro1: 'El transmisor THV9evo de Rohde & Schwarz es una solución de alta eficiencia para la transmisión de señales de televisión digital. Este equipo, diseñado para operar bajo estándares como DVB-T/T2, ATSC y ISDB-T, destaca por su modularidad, bajo consumo energético y capacidades avanzadas de redundancia, lo que garantiza alta disponibilidad y confiabilidad. Características principales:\nEficiencia energética: tecnología Doherty avanzada que minimiza el consumo eléctrico.\nEscalabilidad: diseño modular que permite ajustes según los requerimientos.\nMonitoreo avanzado: sistemas de diagnóstico en tiempo real para la supervisión remota.\nFlexibilidad en operación: compatibilidad con diferentes estándares de transmisión digital.\nA pesar de su diseño robusto, el correcto mantenimiento es crucial para prolongar la vida útil del equipo y evitar interrupciones en la transmisión. A continuación, se describen las actividades realizadas durante el mantenimiento preventivo del transmisor instalado en la estación.',
      p1: 'Se retiraron las tapas del transmisor para limpiar a fondo los componentes electrónicos, eliminando el polvo acumulado.\nSe desmontaron y limpiaron los filtros frontales del transmisor, considerando que los excitadores funcionan absorbiendo aire frío del exterior y expulsando el calor generado. La limpieza de los filtros asegura una ventilación eficiente, evitando acumulación de tierra que pueda afectar el rendimiento. No hubo necesidad de agregar glicol al sistema ya que la presión estática está dentro del rango permitido, en este caso es de 1.7 psi.\nDentro de la potencia no hay reflejada, lo cual no muestra algo anormal del funcionamiento.',
      p2: 'Se tomaron evidencias de las mediciones que entrega el transformador de aislamiento, las cuales son las siguientes:',
      obs: 'Mantenimiento realizado sin observaciones.', concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'),
      { tipo: 'fotos', id: 'f_intro', individual: true, slots: [{ id: 'diag', etiqueta: 'Diagrama del transmisor', pie: 'Diagrama del transmisor THV9evo R&S' }] }] }] },
    pasos: [
      paso('p1', 'Limpieza interna del transmisor', [grp('limp', 'Limpieza del transmisor con toalla antiestática', 8, 'Limpieza')]),
      paso('p2', 'Toma de voltajes, corrientes y temperatura en la llegada de alimentación del transmisor', [grp('lec', 'Lecturas a la entrada del TR1', 3, 'Lectura')])
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
