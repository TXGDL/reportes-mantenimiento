// Anexo 18: Mantenimiento a los tanques de diésel
(function () {
  const { ind, grp } = AX;
  AX.def(18, {
    mat: ['Hidrolavadora', 'Trapos', 'Agua', 'Jabón', 'Llave inglesa ajustable', 'Pintura'],
    intro: [
      'Es fundamental garantizar un suministro suficiente de diésel en la estación para mantener operativa la planta de emergencia ante cualquier eventualidad que pueda surgir. Para ello, resulta indispensable asegurar el buen estado físico del tanque de almacenamiento y de las mangueras, elementos clave para el correcto funcionamiento del sistema de suministro de combustible.',
      'Como parte de las actividades programadas, se realizará una inspección detallada del tanque de diésel, enfocándonos en identificar posibles áreas afectadas por corrosión. En caso de encontrar zonas oxidadas, se procederá a lijarlas con abrasivo de grano fino y aplicar una capa de pintura protectora para evitar un mayor deterioro.',
      'Adicionalmente, se verificará la integridad de las líneas de flujo de combustible, incluyendo conexiones y válvulas de paso, para descartar posibles fugas o pérdidas. Finalmente, se inspeccionará el estado físico de las mangueras, evaluando su flexibilidad, sellos y presencia de grietas o desgaste, para garantizar un suministro seguro y eficiente de combustible hacia la planta de emergencia.'
    ],
    fotosIntro: [['area', 'Área del tanque de diésel', 'Área del tanque de diésel']],
    pasos: [
      { t: 'Inspección visual', x: 'Se realizó una inspección visual detallada de todos los componentes, incluyendo el estado físico del tanque, la integridad de la pintura (identificando daños o corrosión en la superficie exterior) y la revisión de las mangueras indicadoras, en caso de que estuvieran disponibles, o de los manómetros.\nSe verificaron las llaves de paso, las conexiones para descartar posibles fugas, el sistema de aterrizamiento, la señalética, los diques de contención y otros elementos relacionados.',
        b: [ind('insp', [['v', 'Inspección visual a los elementos', 'Inspección visual a los elementos'], ['t', 'Apriete de tornillos y tuercas de tierra', 'Apriete de tornillos y tuercas de tierra']])] },
      { t: 'Drenado de tanques de diésel', x: 'Se retiró el tapón inferior de los tanques de diésel y, colocando un contenedor, se extrajo (purgó) la suciedad y el agua acumulada en el interior.\nEl separador de agua también fue drenado en búsqueda de agua.',
        b: [ind('dren', [['t', 'Drenado de tanque de diésel', 'Drenado de tanque de diésel'], ['s', 'Drenado de separador de agua', 'Drenado de separador de agua']])] },
      { t: 'Limpieza', x: 'Se aspiró para retirar la mayor cantidad de basura y polvo que se encontraba en los tanques y diques.\nSe retiró el óxido de los tanques y de los conductos de comunicación con la planta de emergencia utilizando un cepillo de alambre.\nSe lavó con agua y jabón el tanque y se limpió con un trapo para eliminar el agua y el polvo de los tanques; se apretó la tornillería de los cables de aterrizamiento y, en caso de presentar oxidación, se cepilló para su retiro y se aplicó lubricante, verificando que estuvieran bien conectados. Se limpió la señalética de la planta de emergencia.',
        b: [ind('limp', [['t', 'Limpieza de tanque de diésel', 'Limpieza de tanque de diésel']])] },
      { t: 'Pintado', x: 'Se aplicó pintura en las zonas donde se retiró el óxido, para proteger el tanque y los conductos.',
        b: [ind('pint', [['t', 'Pintado del tanque', 'Pintado del tanque de diésel']])] }
    ],
    concl: 'El tanque se encuentra en buen estado, así como las tuberías, con la capa de pintura.\nLa purga mostró pocos indicios de humedad por lo que se encuentra en buen estado el diésel contenido dentro del tanque.\nLas tuberías y uniones se encontraron también en buen estado sin observar puntos de fuga de diésel.'
  });
})();
