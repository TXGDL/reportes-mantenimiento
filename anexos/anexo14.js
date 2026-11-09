// Definición del Anexo 14: Mantenimiento al deshidratador de línea (Guadalajara)
(function () {
  const ind = (id, lista) => ({ tipo: 'fotos', id, individual: true, slots: lista.map(([k, et, pie]) => ({ id: `${id}_${k}`, etiqueta: et, pie })) });
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF[14] = {
    n: 14,
    materiales: ['Desarmador', 'Llave ajustable (inglesa)', 'Toalla interdoblada de papel', 'Brocha', 'Trapo húmedo'],
    textos: {
      intro1: 'La línea de cobre corrugada debe mantenerse permanentemente con presión en su interior para evitar que la humedad ingrese y provoque problemas de oxidación y potencia reflejada.\nEl deshidratador de línea suministra la presión a la línea y retira la humedad de la misma, manteniéndola en óptimas condiciones para trabajar. Es por esto que se debe revisar el equipo de manera periódica para asegurar la correcta transmisión de nuestras señales.',
      p1: 'Se tomaron lecturas de los parámetros del equipo, obtenidas del display, observando correcto funcionamiento.',
      p2: 'Se cierra la válvula de la manguera de paso del aire hacia la línea.',
      p3: 'Se retira el cable de alimentación de AC y se apaga el switch.',
      p4: 'Se retira la tornillería de la tapa del deshidratador.',
      p5: 'Se realiza inspección visual de los componentes internos del equipo: filtros de aire, filtros de humedad y compresor, encontrándose en buen estado.',
      p6: 'Se retiran los filtros de humedad y se limpian los protectores. Se pusieron a secar los filtros y una vez secos se colocaron en su lugar para después poner los protectores plásticos.\nSe limpió de polvo el interior del deshidratador con la sopladora.\nEl compresor también fue revisado en su integridad, así como el filtro de aire, encontrándose en buen estado.\nSe limpiaron las partes de la carcasa con un trapo, removiendo el polvo de las mismas.',
      p7: 'Una vez terminada la limpieza se colocaron las tapas y la tornillería del equipo.',
      p8: 'Con las tapas puestas se procedió a abrir la válvula de paso del aire hacia la línea.',
      p9: 'Para finalizar se procedió a reconectar el cable de alimentación y presionar el switch de encendido del equipo.',
      p10: 'Se dejó trabajar el equipo unos minutos, observando un correcto funcionamiento del mismo.',
      pX: '',
      obs: 'Mantenimiento realizado sin observaciones',
      concl: 'En términos generales el equipo se puede apreciar en buen estado, observando un correcto funcionamiento del deshidratador.'
    },
    etiquetasTextos: { intro1: 'Introducción', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', p4: 'Texto del paso 4', p5: 'Texto del paso 5', p6: 'Texto del paso 6', p7: 'Texto del paso 7', p8: 'Texto del paso 8', p9: 'Texto del paso 9', p10: 'Texto del paso 10', pX: 'Texto de trabajos adicionales', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    // Imagen fija: va siempre en la introducción, el operador no la sube ni la borra
    intro: { fijas: [{ src: 'img/deshidratador_diagrama.png', w: 829, h: 638, pie: 'Diagrama interno del equipo deshidratador de línea' }],
      secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1')] }] },
    pasos: [
      paso('p1', 'Toma de lecturas de parámetros al equipo', [ind('lec1', [['d', 'Display con los parámetros (inicial)', 'Toma de lecturas inicial']])]),
      paso('p2', 'Cierre de válvula de la manguera de paso del aire hacia la línea', [ind('cierre', [['v', 'Válvula cerrada', 'Cierre de válvula de paso']])]),
      paso('p3', 'Desenergizar el equipo', [ind('desen', [['c', 'Cable de alimentación retirado', 'Retirado del cable de energía']])]),
      paso('p4', 'Apertura (retiro) de la tapa protectora', [ind('tapa', [['a', 'Tapa protectora retirada', 'Apertura de la tapa protectora']])]),
      paso('p5', 'Inspección visual al equipo', [ind('insp', [['i', 'Inspección visual', 'Inspección visual al equipo']])]),
      paso('p6', 'Limpieza del deshidratador', [ind('limp', [['fil', 'Filtros de humedad', 'Limpieza de filtros de humedad'], ['col', 'Colocación de filtros', 'Colocación de filtros'], ['pol', 'Limpieza de polvo del interior', 'Limpieza de polvo del deshidratador']]),
        grp('comp', 'Revisión del compresor', 2, 'Compresor'), ind('carc', [['c', 'Limpieza de la carcasa', 'Limpieza de la carcasa']])]),
      paso('p7', 'Colocar la tapa protectora del equipo', [ind('cola', [['t', 'Tapa y tornillería colocadas', 'Colocación de tapa y tornillería']])]),
      paso('p8', 'Abrir la válvula de la manguera de paso del aire hacia la línea', [ind('abre', [['v', 'Válvula abierta', 'Apertura de válvula de paso']])]),
      paso('p9', 'Energizar el deshidratador', [ind('ener', [['e', 'Equipo energizado', 'Energizado del equipo']])]),
      paso('p10', 'Toma de lecturas de parámetros al equipo', [ind('lec2', [['d', 'Display con los parámetros (final)', 'Display mostrando parámetros']])]),
      { id: 'pX', opcional: true, titulo: 'Trabajos adicionales / hallazgos (solo si los hubo)', secciones: [{ id: 'sX', titulo: 'Trabajos adicionales', bloques: [txt('pX'), grp('extra', 'Adicional', 6, 'Foto')] }] }
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
