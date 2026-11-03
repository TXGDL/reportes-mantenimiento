// Guaymas · Anexo 11: Mantenimiento al regulador de voltaje
(function () {
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF_EST.guaymas[11] = {
    n: 11, formatoConclusion: 'intervalo',
    materiales: ['Guantes de carnaza', 'Sopladora', 'Toalla microfibra', 'Multímetro, amperímetro y termómetro infrarrojo'],
    textos: {
      intro1: 'El regulador de voltaje trifásico New Line modelo 753-220, con capacidad de 75 KVA, es un dispositivo diseñado para estabilizar el suministro eléctrico ante variaciones de voltaje, protegiendo los equipos conectados contra sobrecargas o caídas de tensión. Su funcionamiento se basa en un sistema de control automático que ajusta el voltaje de salida para mantenerlo constante, con una precisión del ±1%. Entre sus características destacan:\nCapacidad trifásica: ideal para aplicaciones industriales y comerciales.\nRango de entrada amplio: diseñado para operar con variaciones de hasta ±30% en el voltaje de entrada.\nProtección integrada: soporta sobrecargas temporales y protege contra cortocircuitos.\nDurabilidad: componentes diseñados para una vida útil superior a 25 años bajo condiciones adecuadas.\nPese a su robustez y funcionalidad, al momento de la entrega del equipo no se incluyó el manual de usuario ni diagramas de conexión, lo que dificulta su uso óptimo. Este reporte describe las actividades de mantenimiento preventivo realizadas y resalta la importancia de obtener la documentación faltante.',
      p1: 'Se desconectó la corriente del interruptor SW1 y se esperaron 5 minutos para garantizar la descarga completa de las bobinas antes de intervenir en el equipo.\nSe realizó un apriete de los bornes de entrada y salida en los cables calibre 1/0 para asegurar una conexión adecuada y prevenir falsos contactos; de igual manera se realizó el apriete de la conexión a tierra.',
      p2: 'Se sopletearon las ranuras y los componentes internos para remover polvo y residuos acumulados, para mejora de la eficiencia térmica del equipo.',
      p3: 'Tras reinstalar las tapas de protección, el regulador se puso en marcha. Se midieron los valores de voltaje y corriente, verificando la estabilidad de la salida y confirmando el correcto funcionamiento.',
      obs: 'Mantenimiento realizado sin observaciones.', concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'),
      { tipo: 'fotos', id: 'f_intro', individual: true, slots: [{ id: 'diag', etiqueta: 'Diagrama del regulador', pie: 'Diagrama del regulador New Line' }] }] }] },
    pasos: [
      paso('p1', 'Revisión y ajuste de conexiones', [grp('ajuste', 'Limpieza y revisión del regulador de voltaje. Escobillas en buen estado', 9, 'Revisión')]),
      paso('p2', 'Limpieza de componentes internos', [grp('limp', 'Limpieza de devanados', 3, 'Limpieza')]),
      paso('p3', 'Reensamblaje y pruebas', [grp('lect', 'Lecturas a la entrada y salida del regulador', 4, 'Lectura')])
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
