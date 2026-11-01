// Definición del Anexo 17: Mantenimiento a la instalación eléctrica (tableros regulado y no regulado, contactos)
(function () {
  const FASES = ['Fase A', 'Fase B', 'Fase C'];
  const lect = (z, nz, tipo, titulo, unidad, etq, pFotos, pTabla) => ({
    tipo: 'fotos', id: `${tipo}_${z}`, titulo, pie: `${pFotos} ${nz}`,
    slots: FASES.map((f, i) => ({ id: `${tipo}_${z}_${i}`, etiqueta: f, unidad })),
    tabla: { etiqueta: etq, pie: `${pTabla} ${nz}` }
  });
  const lecturasTablero = (z, nz) => [
    lect(z, nz, 'corr', 'Corrientes (amperímetro de gancho)', 'A', 'Corriente', 'Medición de corrientes de', 'Corrientes de'),
    lect(z, nz, 'volt', 'Voltajes (multímetro)', 'V', 'Voltaje', 'Medición de voltajes de', 'Voltajes de'),
    lect(z, nz, 'temp', 'Temperaturas (termómetro láser)', 'ºC', 'Temperatura', 'Medición de temperaturas de', 'Temperaturas de'),
    { tipo: 'fotos', id: `fuga_${z}`, titulo: 'Corriente de fuga', pie: `Medición de corriente de fuga de ${nz}`, valorEnPie: true,
      slots: [{ id: `fuga_${z}_0`, etiqueta: 'Corriente de fuga', unidad: 'A' }], tabla: null }
  ];
  const ind = (id, lista) => ({ tipo: 'fotos', id, individual: true, slots: lista.map(([k, et, pie]) => ({ id: `${id}_${k}`, etiqueta: et, pie })) });
  const zonas = (id, verbo) => ind(id, [
    ['cont', 'Contactos eléctricos', `${verbo} contactos eléctricos`],
    ['reg', 'Tablero regulado', `${verbo} tablero regulado`],
    ['nreg', 'Tablero no regulado', `${verbo} tablero no regulado`]
  ]);

  ANEXO_DEF[17] = {
    n: 17,
    materiales: ['Desarmadores', 'Guantes de carnaza', 'Multímetro', 'Amperímetro de gancho', 'Deshumidificante', 'Termómetro láser', 'Sopladora de aire'],
    textos: {
      intro1: 'El mantenimiento del sistema eléctrico consta de la revisión del cableado eléctrico y de asegurarse de que las conexiones estén bien apretadas; de requerirse, se realiza el reapriete de dichas conexiones en todos los tableros eléctricos. Posteriormente se realiza la limpieza del tablero correspondiente. Para esta actividad se tiene una ventana de mantenimiento sin energía eléctrica. Una vez realizado lo anterior y después de la energización del sistema, se procede a tomar lecturas de voltaje y corriente en los tableros, verificando que no exista desbalance en los consumos de corriente.',
      p1: 'Antes de iniciar el mantenimiento se fueron apagando las pastillas de los contactos que se iban a revisar, para evitar descargas al personal. Después se removió la tornillería de tableros, supresores y breakers.',
      p2: 'Se realiza inspección visual a todos los componentes internos, encontrándose en buen estado.',
      p3: 'Después de la inspección visual de todos los componentes, se procedió a realizar el apriete de toda la tornillería y borneras de la instalación eléctrica.',
      p4: 'Una vez apretada la tornillería y las borneras, se pasó a limpiar la instalación. Se aprovechó la apertura de los tableros para reemplazar el deshumidificante de ambos tableros.',
      p5: 'Al terminar la limpieza se pasó a tomar lecturas de la instalación eléctrica.',
      p6: 'Se revisó el etiquetado de tableros, breakers, cables y demás, encontrándose en orden.',
      p7: 'Una vez terminado el mantenimiento se procedió a cerrar las tapas.',
      obs: 'Mantenimiento realizado sin observaciones',
      concl: 'La instalación eléctrica se encuentra en buen estado.'
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', p4: 'Texto del paso 4', p5: 'Texto del paso 5', p6: 'Texto del paso 6', p7: 'Texto del paso 7', obs: 'Observaciones', concl: 'Conclusión' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [
      { tipo: 'texto', id: 'intro1' },
      ind('f_intro', [['diag', 'Diagrama eléctrico de la estación', 'Diagrama eléctrico de la estación'], ['herr', 'Herramientas usadas', 'Herramientas usadas en este mantenimiento']])
    ] }] },
    pasos: [
      { id: 'p1', titulo: 'Apertura de las tapas de los tableros, supresores de picos, breakers, entre otros', secciones: [{ id: 's1', titulo: 'Apertura de tapas', bloques: [
        { tipo: 'texto', id: 'p1' },
        ind('ap', [['past', 'Apagado de pastillas', 'Apagado de pastillas'], ['cont', 'Tapas de contactos', 'Remoción de tapas de contactos eléctricos'], ['reg', 'Tapas de tablero regulado', 'Remoción de tapas de tablero regulado'], ['nreg', 'Tapas de tablero no regulado', 'Remoción de tapas de tablero no regulado']])] }] },
      { id: 'p2', titulo: 'Inspección visual', secciones: [{ id: 's2', titulo: 'Inspección visual', bloques: [{ tipo: 'texto', id: 'p2' }, zonas('insp', 'Inspección de')] }] },
      { id: 'p3', titulo: 'Apretado de terminales', secciones: [{ id: 's3', titulo: 'Apriete de terminales', bloques: [{ tipo: 'texto', id: 'p3' },
        ind('apr', [['cont', 'Contactos eléctricos', 'Apriete de terminales en contactos eléctricos'], ['reg', 'Tablero regulado', 'Apriete de terminales en tablero regulado'], ['nreg', 'Tablero no regulado', 'Apriete de terminales en tablero no regulado'], ['nreg2', 'Tablero no regulado (otra foto, opcional)', 'Apriete de terminales en tablero no regulado']])] }] },
      { id: 'p4', titulo: 'Limpieza de la instalación', secciones: [{ id: 's4', titulo: 'Limpieza', bloques: [{ tipo: 'texto', id: 'p4' },
        ind('limp', [['cont', 'Contactos eléctricos', 'Limpieza del interior de contactos eléctricos'], ['reg', 'Tablero regulado', 'Limpieza del interior de tablero regulado'], ['nreg', 'Tablero no regulado', 'Limpieza del interior de tablero no regulado'], ['desh', 'Reemplazo de deshumidificante', 'Reemplazo de deshumidificante']])] }] },
      { id: 'p5', titulo: 'Toma de lecturas de la instalación eléctrica', secciones: [
        { id: 's5_reg', titulo: 'Lecturas del tablero regulado', bloques: [{ tipo: 'texto', id: 'p5' }, ...lecturasTablero('reg', 'tablero regulado')] },
        { id: 's5_nreg', titulo: 'Lecturas del tablero no regulado', bloques: lecturasTablero('nreg', 'tablero no regulado') },
        { id: 's5_cont', titulo: 'Voltaje en contactos', bloques: [{ tipo: 'fotos', id: 'volt_cont', titulo: 'Voltaje en contactos', pie: 'Medición de voltaje en contactos', tabla: null,
          slots: [{ id: 'volt_cont_0', etiqueta: 'Contacto 1' }, { id: 'volt_cont_1', etiqueta: 'Contacto 2' }] }] }] },
      { id: 'p6', titulo: 'Etiquetado de tableros, breakers, cables y demás', secciones: [{ id: 's6', titulo: 'Etiquetado', bloques: [{ tipo: 'texto', id: 'p6' },
        { tipo: 'fotos', id: 'etiq', titulo: 'Etiquetado', pie: 'Revisión de etiquetado', tabla: null, slots: [1, 2, 3, 4].map(i => ({ id: `etiq_${i}`, etiqueta: `Etiquetado ${i}` })) }] }] },
      { id: 'p7', titulo: 'Colocar las tapas de los tableros, supresores de picos, breakers, entre otros', secciones: [{ id: 's7', titulo: 'Cierre de tapas', bloques: [{ tipo: 'texto', id: 'p7' },
        { tipo: 'fotos', id: 'cierre', titulo: 'Cierre de tapas', pie: 'Cierre de tapas', tabla: null, slots: [1, 2, 3].map(i => ({ id: `cierre_${i}`, etiqueta: `Tapas colocadas ${i}` })) }] }] }
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [{ tipo: 'texto', id: 'obs' }, { tipo: 'texto', id: 'concl' }] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
