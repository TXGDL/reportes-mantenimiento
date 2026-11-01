// Definición del Anexo 11: Mantenimiento al regulador de voltaje
(function () {
  const FASES = ['Fase A', 'Fase B', 'Fase C'];
  const ind = (id, lista) => ({ tipo: 'fotos', id, individual: true, slots: lista.map(([k, et, pie]) => ({ id: `${id}_${k}`, etiqueta: et, pie })) });
  const grp = (id, titulo, pie, n, et) => ({ tipo: 'fotos', id, titulo, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const lect = (tipo, titulo, unidad, etq, pie, pTabla) => ({ tipo: 'fotos', id: tipo, titulo, pie,
    slots: FASES.map((f, i) => ({ id: `${tipo}_${i}`, etiqueta: f, unidad })), tabla: { etiqueta: etq, pie: pTabla } });
  const txt = id => ({ tipo: 'texto', id });
  ANEXO_DEF[11] = {
    n: 11,
    materiales: ['Desarmadores', 'Aspiradora', 'Soplador', 'Trapo de microfibra', 'Amperímetro de gancho', 'Multímetro'],
    textos: {
      intro1: 'Como parte del mantenimiento mayor a los equipos de transmisión de nuestra estación y siendo una sección esencial en la alimentación de nuestros transmisores, se realiza el mantenimiento al regulador de voltaje.',
      p1: 'Se retira la tapa protectora del regulador de voltaje para poder observar internamente sus componentes.',
      p2: 'Se realiza una inspección visual de todos los componentes internos del regulador (cables, tornillería, zapatas, prisioneros, toroides, capacitores, carboncillos, entre otros) encontrándose en buen estado.',
      p3: 'Se aspira y se sopletea el interior del regulador para retirar el polvo y la basura, y se limpia el exterior con un paño de microfibra.',
      p4: 'Se verifica el apriete de las terminales del regulador sin forzar los tornillos ni las tuercas.',
      p5: 'Una vez terminadas la limpieza y el apriete, se toman las lecturas de corriente, voltaje, temperatura y corriente de fuga del regulador.',
      p6: 'Una vez terminado el mantenimiento se coloca la tapa protectora del regulador.',
      pX: '',
      obs: 'Mantenimiento realizado sin observaciones',
      concl: 'El regulador de voltaje se encuentra en buen estado y en operación.'
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', p4: 'Texto del paso 4', p5: 'Texto del paso 5', p6: 'Texto del paso 6', pX: 'Texto de trabajos adicionales', obs: 'Observaciones', concl: 'Conclusión' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'),
      ind('f_intro', [['diag', 'Diagrama eléctrico de la estación', 'Diagrama eléctrico de la estación'], ['herr', 'Herramientas usadas', 'Herramientas usadas en este mantenimiento']])] }] },
    pasos: [
      { id: 'p1', titulo: 'Apertura (retiro) de la tapa protectora del regulador', secciones: [{ id: 's1', titulo: 'Retiro de la tapa', bloques: [txt('p1'), ind('ap', [['reg', 'Regulador con la tapa retirada', 'Regulador de voltaje con la tapa retirada']])] }] },
      { id: 'p2', titulo: 'Inspección visual al equipo', secciones: [{ id: 's2', titulo: 'Inspección visual', bloques: [txt('p2'), grp('insp', 'Inspección', 'Inspección visual del regulador', 3, 'Inspección'), ind('carb', [['carb', 'Revisión de carboncillos', 'Revisión de carboncillos']])] }] },
      { id: 'p3', titulo: 'Limpieza al equipo', secciones: [{ id: 's3', titulo: 'Limpieza', bloques: [txt('p3'), grp('limp', 'Limpieza', 'Limpieza del regulador', 3, 'Limpieza')] }] },
      { id: 'p4', titulo: 'Apretado de las terminales del equipo', secciones: [{ id: 's4', titulo: 'Apriete de terminales', bloques: [txt('p4'), grp('apr', 'Apriete', 'Apriete de terminales del regulador', 3, 'Apriete')] }] },
      { id: 'p5', titulo: 'Toma de lecturas de parámetros al equipo', secciones: [{ id: 's5', titulo: 'Lecturas del regulador', bloques: [txt('p5'),
        lect('corr', 'Corrientes (amperímetro de gancho)', 'A', 'Corriente', 'Medición de corrientes del regulador', 'Corrientes del regulador'),
        lect('volt', 'Voltajes (multímetro)', 'V', 'Voltaje', 'Medición de voltajes del regulador', 'Voltajes del regulador'),
        lect('temp', 'Temperaturas', 'ºC', 'Temperatura', 'Medición de temperaturas del regulador', 'Temperaturas del regulador'),
        { tipo: 'fotos', id: 'fuga', titulo: 'Corriente de fuga', pie: 'Medición de corriente de fuga del regulador', valorEnPie: true, slots: [{ id: 'fuga_0', etiqueta: 'Corriente de fuga', unidad: 'A' }], tabla: null }] }] },
      { id: 'p6', titulo: 'Colocar la tapa protectora del equipo', secciones: [{ id: 's6', titulo: 'Cierre de tapa', bloques: [txt('p6'), ind('cierre', [['tapa', 'Tapa colocada', 'Colocación de la tapa del regulador']])] }] },
      { id: 'pX', opcional: true, titulo: 'Trabajos adicionales / hallazgos (solo si los hubo)', secciones: [{ id: 'sX', titulo: 'Trabajos adicionales', bloques: [txt('pX'), grp('extra', 'Adicional', 'Trabajos adicionales', 6, 'Foto')] }] }
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
