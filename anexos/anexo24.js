// Anexo 24: Mantenimiento al sistema sanitario
(function () {
  const { ind } = AX;
  AX.def(24, {
    mat: ['Desarmador', 'Cubeta', 'Palanca de hierro', 'Escoba', 'Insecticida en aerosol', 'Desbrozadora', 'Rastrillo'],
    intro: [
      'Para mantener el sistema sanitario en buenas condiciones es importante revisar de manera periódica los niveles del biodigestor, así como los niveles del pozo de absorción, esto debido a que los residuos sólidos podrían bloquear la salida de líquidos, generando problemas posteriores en el biodigestor, incluso se puede llegar a generar presión interna por los gases de la descomposición, lo cual podría dañar el sistema ya que no están diseñados para esto.',
      'En el mantenimiento se abrirá la válvula que se encuentra en el registro de los lodos a un costado del biodigestor; al abrirla deberemos capturar en una cubeta los lodos arrojados por el mismo. Una vez que salga por la válvula solo líquido se cerrará. Los lodos en la cubeta se arrojarán al pozo de absorción. Se revisará el nivel del pozo de absorción.'
    ],
    pasos: [
      { t: 'Apertura (retiro) de las tapas', x: 'Se comienza el mantenimiento con la apertura de las tapas.', b: [ind('tapas', [['b', 'Apertura de biodigestor', 'Apertura de biodigestor']])] },
      { t: 'Inspección visual', x: 'Se realiza una inspección visual de los componentes del sistema sanitario (lavamanos, escusado, mingitorio, coladeras, tarja de cocina, registro de desagüe, fosa séptica, etc.), encontrándose en buen estado.\nSe revisó el interior del biodigestor encontrándose con un nivel de líquido bajo, por lo que confirmamos que se encuentra en buen estado.',
        b: [ind('insp', [['lc', 'Lavamanos de cocina', 'Inspección de lavamanos de cocina'], ['lb', 'Lavabo de baño', 'Inspección de lavabo de baño'], ['s1', 'Sanitario 1', 'Inspección del sanitario'], ['s2', 'Sanitario 2', 'Inspección del sanitario'], ['ll', 'Llave exterior', 'Inspección de llave exterior'], ['po', 'Pozo de absorción', 'Pozo de absorción'], ['bi', 'Interior de biodigestor', 'Interior de biodigestor']])] },
      { t: 'Limpieza', x: 'Después de la inspección visual se procedió a realizar la limpieza de los elementos que conforman el sistema sanitario.\nSe realiza la apertura de la válvula del registro de lodos y se vacía el contenido en el pozo de absorción.\nSe limpiaron los lavamanos y lavabo que se encuentran dentro de la caseta de transmisiones.\nSe midió el nivel de líquido en el pozo de absorción, comprobando que se encuentra por debajo del 50%, lo cual evidencia que se encuentra en buen estado.',
        b: [ind('limp', [['rl', 'Registro de lodos', 'Limpieza de registro de lodos'], ['lv', 'Limpieza de lavabo', 'Limpieza de lavabo'], ['lm', 'Limpieza de lavamanos de baño', 'Limpieza de lavamanos de baño'], ['sa', 'Limpieza de sanitario', 'Limpieza de sanitario'], ['pa', 'Corte de pasto del pozo de absorción', 'Corte de pasto del área de pozo de absorción'], ['n1', 'Medición del nivel del pozo (1)', 'Medición de la altura de líquido del pozo de absorción'], ['n2', 'Medición del nivel del pozo (2)', 'Medición de la altura de líquido del pozo de absorción']])] },
      { t: 'Pintura', x: 'Se aplicó pintura a la herrería que lo requería.', b: [ind('pint', [['t', 'Pintura de tapa de biodigestor', 'Pintura de tapa de biodigestor']])] },
      { t: 'Aplicación de líquido enzimático', x: 'Se aplicó líquido enzimático al sistema sanitario.', b: [ind('enz', [['e', 'Aplicación de líquido enzimático', 'Aplicación de líquido enzimático']])] },
      { t: 'Colocar las tapas de los registros', x: 'Al finalizar el mantenimiento se cerraron las tapas de los registros.', b: [ind('cola', [['t', 'Colocación de tapas', 'Colocación de tapas']])] }
    ],
    concl: 'Después de realizar la limpieza podemos concluir que el sistema sanitario se encuentra en buen estado.'
  });
})();
