// Guaymas · Anexo 16: Mantenimiento al sistema de enfriamiento (transmisor THV9evo)
(function () {
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF_EST.guaymas[16] = {
    n: 16, formatoConclusion: 'intervalo',
    materiales: ['Multímetro, amperímetro y termómetro infrarrojo', 'Guantes de carnaza', 'Sopladora', 'Toalla microfibra', 'Brocha', '1 extensión eléctrica', '1 extensión para clavija de tres vías', 'Cinchos del número 19 cm', 'Pinzas de corte', 'Desarmador trox N°8', 'Hidrolavadora', 'Tira indicadora PH-Fix 0-14'],
    textos: {
      intro1: 'El sistema de enfriamiento compacto es fundamental para garantizar el funcionamiento eficiente y seguro del transmisor. Este sistema utiliza glicol como medio de refrigeración, circulando entre los amplificadores, las bombas internas y el intercambiador de calor. Su diseño compacto permite una gestión eficiente de la energía, ya que las bombas se activan únicamente al detectar la RF y se apagan cuando esta se desactiva. El monitoreo de las presiones estática y dinámica, así como el mantenimiento preventivo, son esenciales para asegurar su correcto desempeño y evitar fallos críticos.',
      intro2: 'Conexiones del sistema:\nVentilador 1: pin 1 (tierra) amarillo; pin 4 (comunicación) blanco.\nVentilador 2: pin 5 (tierra) verde; pin 8 (comunicación) café.\nSensor de temperatura: azul, amarillo y rojo.',
      p1: 'Se revisó la presión estática en el barómetro y la presión dinámica en el TDU antes de apagar el transmisor.\nSe confirmó que los purgadores externos estuvieran semiabiertos para liberar cualquier acumulación de aire.',
      p2: 'Se limpió a fondo el intercambiador para retirar tierra y residuos acumulados por la lluvia.\nSe prestó especial atención a los ventiladores y sus aspas, eliminando cualquier exceso de suciedad que pudiera afectar su funcionamiento.\nEn instalaciones como la de Guaymas, donde el intercambiador está en posición acostada, se asegura una ventilación adecuada para evitar retroalimentación de calor, que puede forzar el trabajo de las bombas y ventiladores.',
      p3: 'En este mantenimiento no se realizó la medición del pH del glicol (61% etilenglicol y 39% agua destilada) por ser un sistema recién instalado; se tiene contemplada la adquisición de tiras de pH para futuras pruebas y garantizar que el líquido se mantenga dentro del rango óptimo (7.8-8.3).',
      obs: 'Mantenimiento realizado sin observaciones.', concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', intro2: 'Introducción: conexiones', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'), txt('intro2'),
      { tipo: 'fotos', id: 'f_intro', individual: true, slots: [{ id: 'diag', etiqueta: 'Diagrama del sistema de enfriamiento', pie: 'Diagrama del sistema de enfriamiento del transmisor THV9evo R&S' }] }] }] },
    pasos: [
      paso('p1', 'Procedimiento de mantenimiento del sistema de enfriamiento', [grp('pres', 'Presión dinámica y estática dentro de los valores', 2, 'Presión')]),
      paso('p2', 'Limpieza del intercambiador de calor', [grp('limp', 'Limpieza de los ventiladores, eliminación de insectos y soplado de serpentín', 6, 'Limpieza')]),
      paso('p3', 'Verificación del glicol', [grp('glicol', 'Se toma muestra del glicol y comparación del mismo', 2, 'Glicol')])
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
