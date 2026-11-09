// Anexo 21: Mantenimiento a los registros eléctricos
(function () {
  const { grp } = AX;
  const par = (id, verbo) => [[1, 2], [3, 4], [5, 6]].map(g => grp(`${id}${g[0]}`, `${verbo} de registros #${g[0]} y #${g[1]}`, 2, 'Registro', g[0]));
  AX.def(21, {
    mat: ['Desarmador', 'Palanca de hierro', 'Aspiradora', 'Sopladora', 'Escoba', 'Insecticida'],
    intro: [
      'Se requiere garantizar la seguridad de las conexiones eléctricas aislándolas del exterior y protegiéndolas de manipulaciones accidentales indeseadas, así como de la humedad exterior y plagas que puedan afectar a las mismas.',
      'Se extraerá basura e insectos muertos de los registros eléctricos, así como cualquier elemento extraño que pudiera estar dentro de las tuberías. Se verificará que los cables estén en buenas condiciones y no presenten sulfato en las conexiones. También se verificará que las tapas de concreto no estén fisuradas. En caso de registros inundados se procederá a drenarlos.'
    ],
    fotosIntro: [['mapa', 'Mapa de registros eléctricos de la estación', 'Mapa de registros eléctricos de la estación']],
    pasos: [
      { t: 'Revisión de tapas y remoción de las mismas', x: 'Se inicia el mantenimiento con la inspección del interior de los registros eléctricos, revisando las tapas y retirándolas para ver el interior del registro.', b: par('tap', 'Remoción de tapas') },
      { t: 'Limpieza de registros eléctricos', x: 'Se revisa la integridad del cableado de los registros observando todo el registro, moviendo con cuidado algunos cables en caso de ser necesario.\nSe retira polvo y basura, así como insectos que hayan caído dentro de los registros.', b: par('lim', 'Limpieza') },
      { t: 'Pintado de herrería', x: 'Se limpió y se pintó la herrería de los registros que presentaban mayor desgaste, en particular los expuestos al clima.', b: [grp('pin', 'Pintado de registros', 6, 'Registro')] },
      { t: 'Colocación de insecticida', x: 'Para finalizar el mantenimiento se colocó insecticida en todos los marcos para prevenir la entrada de fauna nociva a los registros eléctricos.', b: par('ins', 'Colocación de insecticida en') },
      { t: 'Colocar las tapas', x: 'Al finalizar el mantenimiento se cerraron las tapas de los registros y se limpiaron.', b: [grp('cola', 'Colocación de tapas de registros', 6, 'Registro')] }
    ],
    concl: 'Ningún registro se encuentra inundado.\nCableado encontrado en buen estado.'
  });
})();
