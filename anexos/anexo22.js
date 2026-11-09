// Anexo 22: Mantenimiento al sistema de tierras
(function () {
  const { ind, grp } = AX;
  const regs = (id, verbo) => [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]].map(g => grp(`${id}${g[0]}`, `${verbo} de registros ${g[0]}, ${g[1]} y ${g[2]}`, 3, 'Registro', g[0]));
  AX.def(22, {
    mat: ['Desarmador', 'Cubeta', 'Cepillo de alambre', 'Agua', 'Escoba', 'Insecticida en aerosol', 'Medidor de tierras marca Megger'],
    intro: [
      'Es importante mantener la efectividad de los componentes del sistema de puesta a tierra ya que es el medio de protección ante descargas atmosféricas que protege la integridad de los equipos y el personal de la estación.',
      'Se limpiarán, se colocará abundante agua y se pondrá insecticida alrededor de los mismos como medida preventiva en contra de los insectos y arácnidos.'
    ],
    fotosIntro: [['pos', 'Posición de los registros de tierras físicas', 'Posición de los registros de tierras físicas en la estación']],
    pasos: [
      { t: 'Apertura de las tapas e inspección visual', x: 'Se retira la tapa del registro de tierra física con el desarmador, previniendo un ataque de fauna nociva, y se revisa que no se encuentre fauna nociva dentro.', b: regs('ap', 'Apertura') },
      { t: 'Limpieza', x: 'Se limpia de hojarasca y basura que se encuentre dentro del registro.\nSe limpia el sulfato en las tierras tallando con un cepillo de alambre la superficie de los metales.\nSe coloca abundante agua en el registro de tierras colocando la tapa encima.', b: regs('li', 'Limpieza') },
      { t: 'Apretado de tornillería', x: 'Se aprieta la conexión de tierra.', b: [ind('apr', [['t', 'Apretado de tornillería', 'Apretado de tornillería']])] },
      { t: 'Medición de resistividad del sistema', x: 'Se realizó la medición de resistividad del sistema de tierras con el medidor de tierras.', b: [ind('res', [['m', 'Medición de resistividad', 'Medición de resistividad']])] }
    ]
  });
})();
