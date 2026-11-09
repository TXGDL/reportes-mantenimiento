// Anexo 19: Mantenimiento a las antenas parabólicas
(function () {
  const { ind, lec } = AX;
  const COLS = ['Receptor', 'Nivel de recepción', 'Nivel de RF / Pwr'];
  const REC = [['i1', 'Ipump 374475'], ['i2', 'Ipump 374471'], ['i3', 'Ipump 374480'], ['i4', 'Ipump 374477'], ['i5', 'Ipump 377449'], ['eb', 'Enensys BKP'], ['ep', 'Enensys PRN']];
  AX.def(19, {
    mat: ['Hidrolavadora', 'Trapos', 'Agua', 'Jabón', 'Cepillo de ixtle', 'Cinta aislante', 'Llave inglesa ajustable', 'Cepillo de alambre'],
    intro: [
      'Las estaciones de radiodifusión están equipadas con antenas parabólicas cuya función principal es recibir ondas electromagnéticas provenientes de satélites. El diseño parabólico de estas antenas permite que su superficie reflectante concentre las ondas electromagnéticas en el foco, donde se encuentra el LNB (Low Noise Block). Este dispositivo transforma las señales electromagnéticas en señales eléctricas y ajusta sus altas frecuencias a niveles óptimos, permitiendo su transmisión eficiente a través de cables coaxiales hacia los receptores satelitales para su adecuado procesamiento.',
      'Para garantizar una recepción de calidad y el correcto funcionamiento de todos los componentes de las antenas parabólicas, es fundamental realizar un mantenimiento preventivo regular. Este mantenimiento asegura que los niveles de recepción se mantengan óptimos y que los elementos críticos, como el LNB, los cables y la estructura de la antena, permanezcan en buen estado. Se ha establecido que el mantenimiento de las antenas parabólicas debe llevarse a cabo de manera semestral, con el objetivo de prevenir fallas y asegurar la continuidad operativa de las estaciones de radiodifusión.'
    ],
    // Imagen fija: gráfica de la ubicación de las antenas, siempre es la misma
    fijas: [{ src: 'img/antenas_ubicacion.jpg', w: 1735, h: 1000, pie: 'Ubicación de las antenas en la estación' }],
    pasos: [
      { t: 'Toma de lecturas de parámetros al equipo (antes del mantenimiento)', x: 'Se tomaron lecturas de niveles de Eb/No de los receptores, tomadas de los indicadores del equipo receptor, y se compararon con los valores obtenidos con las lecturas tomadas durante días anteriores.',
        b: [lec('prev', 'Niveles de recepción previo a mantenimiento', COLS, REC)] },
      { t: 'Inspección visual', x: 'Se realizó la inspección visual de todos los componentes: los pétalos de la antena, la estructura metálica que sostiene a la antena, los LNB, el cable de RF, conectores, supresores de picos y ductería (paso de cableado) de la antena, el aterrizamiento de la antena, la base de concreto, retenidas, etc., encontrando todo en orden.',
        b: [ind('insp', [['m', 'Antena de malla', 'Antena de malla'], ['s', 'Antenas sólidas', 'Antenas sólidas']])] },
      { t: 'Cambio de cinta aislante en conexiones de coaxial', x: 'Se cambió la cinta aislante en las conexiones de cable coaxial.',
        b: [ind('cinta', [['c', 'Cambio de cinta aislante', 'Cambio de cinta aislante en conexiones de coaxial']])] },
      { t: 'Apriete de tornillería', x: 'Se apretó la tornillería de las antenas y los tornillos de tierra.',
        b: [ind('apr', [['m', 'Tornillería antena de malla', 'Apriete de tornillería antena de malla'], ['s', 'Tornillería antena sólida', 'Apriete de tornillería antena sólida'], ['t', 'Tornillos de tierra', 'Apriete de tornillos de tierra de las antenas']])] },
      { t: 'Limpieza de antenas', x: 'Se realizó la limpieza de las antenas.',
        b: [ind('limp', [['s', 'Limpieza de antenas sólidas', 'Limpieza de antenas sólidas'], ['m', 'Limpieza de antena de malla', 'Limpieza de antena de malla']])] },
      { t: 'Toma de lecturas de parámetros al equipo (después del mantenimiento)', x: 'Se tomaron nuevamente las lecturas de niveles de Eb/No y RF de los receptores.',
        b: [lec('post', 'Niveles de recepción posterior a mantenimiento', COLS, REC)] }
    ],
    concl: 'Las antenas se encuentran funcionando correctamente.'
  });
})();
