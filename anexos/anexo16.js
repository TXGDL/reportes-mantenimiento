// Definición del Anexo 16: Mantenimiento al sistema de enfriamiento (canales 20 y 23)
(function () {
  const ind = (id, lista) => ({ tipo: 'fotos', id, individual: true, slots: lista.map(([k, et, pie]) => ({ id: `${id}_${k}`, etiqueta: et, pie })) });
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const dos = (id, pie, a, b) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: [{ id: `${id}_20`, etiqueta: a }, { id: `${id}_23`, etiqueta: b }] });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF[16] = {
    n: 16,
    materiales: ['Anticongelante', 'Agua destilada', 'Bomba hidráulica', 'Cubeta', 'Sopladora', 'Desarmadores', 'Guantes'],
    textos: {
      intro1: 'Se requiere que el sistema de enfriamiento esté en constante operación para así tener una mejor eficiencia del equipo transmisor, para mantenerlo en temperaturas óptimas de operación y prolongar la vida útil de los componentes electrónicos al evitar su calentamiento.\nSe verificará el funcionamiento de las bombas revisando las presiones estáticas y dinámicas, limpieza e inspección visual en busca de fuga de líquidos dentro del sistema.\nSe lavarán los intercambiadores de calor con agua y se verificará el correcto funcionamiento de los ventiladores, se revisarán también las conexiones eléctricas y de control, así como que las tuberías y conexiones hidráulicas que conforman el sistema de enfriamiento del equipo transmisor se encuentren en buenas condiciones.',
      p1: 'Se toman lecturas de ambos sistemas de enfriamiento previo al mantenimiento a realizar.',
      p2: 'Una vez que se tomaron las lecturas, se apaga el transmisor para dar paso a la desenergización del sistema de enfriamiento y bombas.',
      p3: 'Después de asegurarnos que el sistema se encuentra sin energía, procedemos a realizar una inspección visual de los componentes.',
      p4: 'El sistema de enfriamiento fue limpiado con agua y jabón de forma externa, se cepillaron las rejillas y se sopletearon las unidades de control internamente.\nLos filtros de las tuberías también fueron limpiados.',
      p5: 'El anticongelante fue recargado en ambos sistemas hasta lograr una presión estática superior a los 20 psi dentro del sistema.',
      p6: 'Una vez que terminó el mantenimiento a los transmisores y transformadores de aislamiento, se encienden en conjunto con el sistema de enfriamiento y se deja trabajando para mantenerlo en observación por algunos minutos.',
      p7: 'Después de verificar que se encuentran trabajando con normalidad las bombas, se procede a tomar lecturas de las mismas encontrando todo en orden.',
      pX: '',
      obs: 'Mantenimiento realizado sin observaciones',
      concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', p4: 'Texto del paso 4', p5: 'Texto del paso 5', p6: 'Texto del paso 6', p7: 'Texto del paso 7', pX: 'Texto de trabajos adicionales', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'), ind('f_intro', [['herr', 'Herramienta utilizada', 'Herramienta utilizada en el mantenimiento']])] }] },
    pasos: [
      paso('p1', 'Toma de lecturas de parámetros al equipo', [dos('lret', 'Valores previos de presión de retorno en ambos sistemas', 'Presión de retorno CH20', 'Presión de retorno CH23'), dos('linj', 'Valores previos de presión de inyección en ambos sistemas', 'Presión de inyección CH20', 'Presión de inyección CH23')]),
      paso('p2', 'Apagar el sistema de enfriamiento', [ind('apag', [['sis', 'Apagado del sistema (opcional)', 'Apagado del sistema de enfriamiento']])]),
      paso('p3', 'Inspección visual al sistema de enfriamiento', [ind('insp', [['sis', 'Inspección visual del sistema', 'Inspección visual del sistema']]), grp('hall', 'Hallazgos en la inspección (opcional)', 3, 'Hallazgo'), grp('rep', 'Reparaciones realizadas (opcional)', 3, 'Reparación')]),
      paso('p4', 'Limpieza del sistema de enfriamiento', [grp('limp', 'Limpieza del sistema de enfriamiento', 3, 'Limpieza'), grp('filt', 'Limpieza de filtros de tubería de anticongelante', 3, 'Filtros'), grp('estado', 'Estado del anticongelante', 2, 'Anticongelante'), grp('ph', 'Medición de pH', 2, 'pH')]),
      paso('p5', 'Recarga de glicol al sistema de enfriamiento', [grp('recarga', 'Recarga de anticongelante', 3, 'Recarga'), dos('estat', 'Presión estática del sistema de enfriamiento de canal 23 y canal 20', 'Presión estática CH23', 'Presión estática CH20')]),
      paso('p6', 'Encender el sistema de enfriamiento', [ind('enc', [['sis', 'Encendido del sistema (opcional)', 'Encendido del sistema de enfriamiento']])]),
      paso('p7', 'Toma de lecturas de parámetros al equipo', [dos('dinam', 'Presión dinámica del sistema de enfriamiento de canal 23 y canal 20', 'Presión dinámica CH23', 'Presión dinámica CH20'), dos('temp', 'Temperaturas del sistema de enfriamiento de canal 23 y canal 20', 'Temperatura CH23', 'Temperatura CH20')]),
      { id: 'pX', opcional: true, titulo: 'Trabajos adicionales (solo si los hubo)', secciones: [{ id: 'sX', titulo: 'Trabajos adicionales', bloques: [txt('pX'), grp('extra', 'Trabajos adicionales', 6, 'Foto')] }] }
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
