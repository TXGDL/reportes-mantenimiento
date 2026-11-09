// Anexo 28: Mantenimiento a los aires acondicionados
(function () {
  const { grp } = AX;
  AX.def(28, {
    mat: ['Desarmadores', 'Cubeta', 'Sopladora', 'Escoba', 'Multímetro', 'Hidrolavadora'],
    intro: [
      'Los aires acondicionados deben ser revisados y limpiados minuciosamente cada 6 meses, como medida preventiva, para prolongar al máximo posible la vida útil de las unidades, tanto evaporadoras como compresoras.',
      'Se desarmarán las unidades (compresoras y evaporadoras) y se limpiarán las partes para después unirlas una vez se hayan realizado los trabajos de limpieza.',
      'Además de esto se deben revisar los valores de presión del gas refrigerante, así como voltajes y corrientes de las unidades para verificar el correcto funcionamiento de los mismos.'
    ],
    pasos: [
      { t: 'Limpieza de unidades compresoras', x: 'Se inicia el mantenimiento apagando los aires para realizar la limpieza de las unidades compresoras.', b: [grp('comp', 'Limpieza de unidades compresoras', 8, 'Foto')] },
      { t: 'Limpieza de unidades evaporadoras', x: 'Una vez que ambas unidades compresoras fueron limpiadas se arman para dar paso a la limpieza de las unidades evaporadoras.\nSe desarman y se limpian por separado las piezas de las mismas. Esto se realizó en las unidades de 3 Ton, 5 Ton y 1.5 Ton.', b: [grp('fil', 'Limpieza de filtros', 5, 'Filtro'), grp('evap', 'Limpieza de unidades evaporadoras', 6, 'Foto')] },
      { t: 'Mediciones de unidades compresoras', x: 'Después de la limpieza de las unidades compresoras y evaporadoras se ensamblan y se miden los voltajes y corrientes, verificando el correcto funcionamiento después del mantenimiento.', b: [grp('m15', 'Medición de voltajes de aire de 1.5 Ton', 2, 'Foto'), grp('m3', 'Medición de voltajes de aires de 3 Ton', 4, 'Foto'), grp('m5', 'Medición de voltajes de aire de 5 Ton', 2, 'Foto')] }
    ]
  });
})();
