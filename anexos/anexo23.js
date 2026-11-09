// Anexo 23: Mantenimiento al sistema hidráulico y bomba
(function () {
  const { ind } = AX;
  AX.def(23, {
    mat: ['Llave ajustable', 'Trapo', 'Trapeador', 'Desarmador', 'Jabón', 'Escoba', 'Cubeta', 'Cloro'],
    intro: [
      'Mantener en buenas condiciones el sistema hidráulico y la bomba es básico para la correcta operación del personal de la estación, es por esto que se verifica el buen funcionamiento de la bomba de agua, además de una inspección para verificar que no presente oxidación. En caso de presentar oxidación se removerá con lija fina y cepillo de alambre y, de ser necesario, se aplicará una capa de pintura esmalte.',
      'Se encenderá la bomba para realizar el llenado del tinaco y revisar su correcto funcionamiento, y se observarán los diferentes puntos donde podrían presentarse fugas. Esto es para garantizar que la calidad del agua se mantenga dentro de parámetros y criterios de salubridad que sólo se consiguen si el sistema hidráulico funciona de forma adecuada, evitando fugas, grietas, y asegurando el buen estado de las llaves y tubería.'
    ],
    fotosIntro: [['mapa', 'Mapa del sistema hidráulico', 'Mapa del sistema hidráulico']],
    pasos: [
      { t: 'Apertura (retiro) de las tapas', x: 'El mantenimiento comienza retirando las tapas de cisterna y tinaco.', b: [ind('tapas', [['t', 'Apertura de tapas de cisterna y tinaco', 'Apertura de tapas de cisterna y tinaco']])] },
      { t: 'Inspección visual', x: 'Una vez retiradas las tapas de cisterna y tinaco se realiza una inspección visual del sistema.',
        b: [ind('insp', [['c', 'Inspección de cisterna y tinaco', 'Inspección de cisterna y tinaco'], ['m', 'Inspección de mezcladora', 'Inspección de mezcladora'], ['a', 'Inspección de llave ahorradora', 'Inspección de llave ahorradora'], ['e', 'Inspección de llave externa', 'Inspección de llave externa']])] },
      { t: 'Limpieza', x: 'Se realizó la limpieza del tinaco y la cisterna. Para limpiar el tinaco se vació primero su contenido de agua a la cisterna.',
        b: [ind('limp', [['e', 'Limpieza exterior de tinaco', 'Limpieza exterior de tinaco'], ['i', 'Limpieza interior de tinaco', 'Limpieza interior de tinaco']])] },
      { t: 'Pintado', x: 'Se aplicó pintura a los marcos y tapas de registro que lo requerían.', b: [ind('pint', [['m', 'Marcos y tapa de registro de cisterna', 'Marcos y tapa de registro de cisterna']])] },
      { t: 'Encendido de la bomba', x: 'Se realizó el llenado del tinaco encendiendo la bomba de la cisterna con el electronivel, encontrando un correcto funcionamiento.', b: [ind('bomba', [['b', 'Bomba de cisterna', 'Bomba de cisterna']])] },
      { t: 'Forrado con aislante protector de la tubería', x: 'En la estación Guadalajara no es necesario el forrado protector de tuberías.' },
      { t: 'Colocar las tapas de los registros', x: 'Al finalizar el mantenimiento se colocaron las tapas de cisterna y tinaco.', b: [ind('cola', [['t', 'Colocación de tapas', 'Colocación de tapas']])] }
    ],
    concl: 'Después de realizar la limpieza podemos concluir que el sistema hidráulico y la bomba se encuentran en buen estado.'
  });
})();
