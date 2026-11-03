// Guaymas · Anexo 10: Mantenimiento al transformador de aislamiento
(function () {
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF_EST.guaymas[10] = {
    n: 10, formatoConclusion: 'intervalo',
    materiales: ['Guantes de carnaza', 'Sopladora', 'Toalla microfibra', 'Multímetro, amperímetro y termómetro infrarrojo', 'Matraca y juego de dados'],
    textos: {
      intro1: 'El transformador de aislamiento es un componente esencial en la distribución de energía eléctrica, proporcionando aislamiento entre el suministro de energía y los equipos conectados. Esto ayuda a prevenir choques eléctricos y protege los dispositivos sensibles de las fluctuaciones de voltaje. En este caso, se realizó un mantenimiento a un transformador de 25 KVA con conexiones específicas que aseguran una operación estable a 220/127 V y una frecuencia de 60 Hz. El objetivo principal fue garantizar la integridad del transformador y su correcto funcionamiento mediante inspecciones, limpiezas y mediciones del equipo.',
      p1: 'Se inspeccionó el gabinete exterior, verificando la integridad del material y la ausencia de corrosión o deformaciones.\nLas terminales y conectores fueron revisados para detectar signos de desgaste, corrosión o conexiones flojas.\nSe inspeccionó el aislamiento para identificar posibles grietas, manchas o signos de envejecimiento.',
      p2: 'Los cables de alimentación y terminales de salida se comprobaron para asegurar que no hubiera conexiones sueltas o dañadas. Las conexiones a tierra fueron revisadas para garantizar un aterrizaje seguro y efectivo.\nLimpieza: se utilizó aire comprimido y paños secos para eliminar el polvo y residuos acumulados en la superficie del transformador. Se prestó especial atención a las rejillas de ventilación para evitar bloqueos que pudieran causar sobrecalentamiento.',
      p3: 'Se comprobó que el entorno de la caseta estuviera libre de animales y en condiciones limpias, asegurando que el transformador no estuviera expuesto a contaminantes.\nToma de mediciones: se midieron los voltajes en cada devanado (primario y secundario) para verificar que estuvieran dentro de los rangos operativos. Las corrientes fueron medidas bajo condiciones de carga para confirmar un funcionamiento normal sin indicios de sobrecalentamiento.',
      obs: 'Mantenimiento realizado sin observaciones.', concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'),
      { tipo: 'fotos', id: 'f_intro', individual: true, slots: [{ id: 'placa', etiqueta: 'Transformador de aislamiento 25 KVA', pie: 'Transformador de aislamiento 25 KVA' }] }] }] },
    pasos: [
      paso('p1', 'Inspección visual', [grp('insp', 'Inspección visual del transformador de aislamiento', 4, 'Inspección')]),
      paso('p2', 'Verificación de conexiones y limpieza', [grp('limp', 'Limpieza del transformador de aislamiento', 4, 'Limpieza')]),
      paso('p3', 'Verificación de condiciones especiales y toma de mediciones', [grp('med', 'Lecturas a la entrada y salida del transformador', 8, 'Lectura')])
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
