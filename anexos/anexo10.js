// Definición del Anexo 10: Mantenimiento al transformador de aislamiento (canales 20 y 23)
(function () {
  const CANALES = ['20', '23'];
  const T6 = ['H3', 'X1', 'H1', 'X2', 'H2', 'X3'], PRIM = ['H1 – H2', 'H2 – H3', 'H3 – H1'], SEC = ['X1 – X2', 'X2 – X3', 'X3 – X1'];
  const lecturas = (c, tipo, titulo, terms, unidad, etq, pieFotos, pieTabla) => ({
    tipo: 'fotos', id: `${tipo}${c}`, titulo, pie: pieFotos,
    slots: terms.map((t, i) => ({ id: `${tipo}${c}_${i}`, etiqueta: t, unidad })),
    tabla: pieTabla ? { etiqueta: etq, pie: pieTabla } : null
  });
  const lecturasCanal = c => [
    lecturas(c, 'temp', 'Temperaturas (termómetro infrarrojo)', T6, 'ºC', 'Temp.', `Toma de temperatura a transformador CH${c}`, `Temperatura a transformador CH${c}`),
    lecturas(c, 'corr', 'Corrientes (amperímetro de gancho)', T6, 'A', 'Corriente', `Toma de corrientes a transformador CH${c}`, `Corrientes de transformador CH${c}`),
    { tipo: 'fotos', id: `fuga${c}`, titulo: 'Corriente de fuga', pie: `Toma de corriente de fuga CH${c}`, valorEnPie: true,
      slots: [{ id: `fuga${c}_0`, etiqueta: 'Corriente de fuga', unidad: 'A' }], tabla: null },
    lecturas(c, 'prim', 'Voltajes del primario (multímetro)', PRIM, 'V', 'Voltaje', `Toma de voltajes del primario CH${c}`, `Voltajes del primario de transformador CH${c}`),
    lecturas(c, 'sec', 'Voltajes del secundario (multímetro)', SEC, 'V', 'Voltaje', `Toma de voltajes del secundario CH${c}`, `Voltajes del secundario de transformador CH${c}`)
  ];
  const porCanal = (idBase, prefijo, pie) => ({ tipo: 'fotos', id: idBase, individual: true,
    slots: CANALES.map(c => ({ id: `${idBase}_${c}`, etiqueta: `Transformador CH${c}`, pie: `${pie} CH${c}` })) });

  ANEXO_DEF[10] = {
    n: 10,
    materiales: ['Desarmador', 'Llave ajustable (inglesa)', 'Termómetro', 'Amperímetro de gancho', 'Multímetro', 'Sopladora', 'Guantes aislantes'],
    textos: {
      intro1: 'Como parte del mantenimiento periódico a los equipos de transmisión de nuestra estación y siendo una sección esencial en la alimentación de nuestros transmisores, se realiza el mantenimiento al transformador de aislamiento.',
      intro2: 'El transformador de canal 20 cuenta con un transformador seco de arreglo delta estrella de 3 fases, es de 75kva a 60hz.',
      intro3: 'El transformador de canal 23 cuenta con un transformador seco de arreglo delta estrella de 3 fases, es de 30kva a 60hz.',
      p1: 'El mantenimiento inicia con el retiro de las tapas protectoras de los transformadores de aislamiento de ambos canales, tanto de CH20 como de CH23, para poder observar internamente los componentes que se encuentran en ellos.',
      p2: 'Una vez que las tapas de los transformadores de aislamiento fueron retiradas, se realizó una inspección visual a ambos equipos encontrando todos los elementos en orden.',
      p3: 'Después de verificar visualmente que todo estuviera en orden, se procedió a limpiar con la sopladora para remover el polvo o pequeña basura que haya entrado al mismo.',
      p4: 'Terminando la limpieza de los equipos, se desconectó la corriente, se verificó que no tuvieran corriente y se procedió a realizar el apriete de la tornillería de los transformadores de aislamiento.',
      p5: 'Una vez terminados la limpieza y el apriete de terminales, se revisó que no hubiera quedado ninguna herramienta o tornillo que pudiera dañar los equipos. Al confirmar que no quedó nada, se regresó la energía para encender los transmisores y se dejaron trabajando media hora. Después de media hora de trabajo, se comenzaron las mediciones de voltajes, corrientes y temperaturas de cada transformador de aislamiento.',
      p6: 'Una vez terminada la toma de lecturas de los equipos, se cerraron las tapas de ambos transformadores de aislamiento, concluyendo con esto el mantenimiento a los transformadores de aislamiento de ambos canales.',
      obs: 'Mantenimiento realizado sin observaciones',
      concl: 'Las temperaturas, los voltajes y corrientes se encuentran en valores normales, por lo que se decidió cerrar las tapas de ambos transformadores y se dejaron en operación.'
    },
    etiquetasTextos: { intro1: 'Introducción', intro2: 'Introducción: canal 20', intro3: 'Introducción: canal 23', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', p4: 'Texto del paso 4', p5: 'Texto del paso 5', p6: 'Texto del paso 6', obs: 'Observaciones', concl: 'Conclusión' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción y placas', bloques: [
      { tipo: 'texto', id: 'intro1' }, { tipo: 'texto', id: 'intro2' }, { tipo: 'texto', id: 'intro3' },
      { tipo: 'fotos', id: 'f_intro', individual: true, slots: CANALES.map(c => ({ id: `placa${c}`, etiqueta: `Placa del transformador CH${c}`, pie: `Información de transformador de aislamiento canal ${c}` })) }
    ] }] },
    pasos: [
      { id: 'p1', titulo: 'Apertura (retiro) de la tapa protectora del transformador', secciones: [{ id: 's1', titulo: 'Retiro de la tapa', bloques: [
        { tipo: 'texto', id: 'p1' }, { tipo: 'fotos', id: 'f1', individual: true, slots: [{ id: 'tapas_0', etiqueta: 'Tapas retiradas (ambos transformadores)', pie: 'Se retira la tapa protectora de ambos transformadores' }] }] }] },
      { id: 'p2', titulo: 'Inspección visual al equipo', secciones: [{ id: 's2', titulo: 'Inspección visual', bloques: [{ tipo: 'texto', id: 'p2' }, porCanal('insp', 'p2', 'Inspección visual del transformador')] }] },
      { id: 'p3', titulo: 'Limpieza al equipo', secciones: [{ id: 's3', titulo: 'Limpieza', bloques: [{ tipo: 'texto', id: 'p3' }, porCanal('limp', 'p3', 'Limpieza del transformador')] }] },
      { id: 'p4', titulo: 'Apretado de las terminales del equipo', secciones: [{ id: 's4', titulo: 'Apriete de terminales', bloques: [{ tipo: 'texto', id: 'p4' }, porCanal('apr', 'p4', 'Apriete de terminales del transformador')] }] },
      { id: 'p5', titulo: 'Toma de lecturas de parámetros al equipo', secciones: [
        { id: 's5_20', titulo: 'Lecturas del transformador CH20', bloques: [{ tipo: 'texto', id: 'p5' }, ...lecturasCanal('20')] },
        { id: 's5_23', titulo: 'Lecturas del transformador CH23', bloques: lecturasCanal('23') }] },
      { id: 'p6', titulo: 'Colocar la tapa protectora del equipo', secciones: [{ id: 's6', titulo: 'Cierre de tapas', bloques: [
        { tipo: 'texto', id: 'p6' }, { tipo: 'fotos', id: 'f6', individual: true, slots: [{ id: 'cierre_0', etiqueta: 'Tapas colocadas', pie: 'Colocación de tapas después del mantenimiento' }] }] }] }
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [{ tipo: 'texto', id: 'obs' }, { tipo: 'texto', id: 'concl' }] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Foto de la solicitud de mantenimiento preventivo', pie: '' }] }] }
    ] }
  };
})();
