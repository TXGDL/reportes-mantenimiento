// Anexo 26: Mantenimiento a la planta de emergencia
(function () {
  const { ind, grp } = AX;
  AX.def(26, {
    mat: ['Llave ajustable', 'Filtro de aceite', 'Filtro de diésel', 'Filtro para aire', 'Aceite 15W40', 'Anticongelante premezclado', 'Cubeta'],
    intro: [
      'La planta de emergencia es un elemento vital dentro de la operación de la estación, ya que nos protege de fallas de CFE suministrando energía de forma constante y controlada. Esto es bastante útil ya que reduce las incidencias en nuestras señales al mínimo, dándonos soporte eléctrico cuando es necesario.',
      'Para que esta se encuentre funcionando correctamente es necesario darle mantenimiento cada cierto periodo de tiempo, en nuestro caso aproximadamente cada 6 meses. Para evitar que la planta se dañe, el personal de la estación Guadalajara realizará el mantenimiento para evitar problemas futuros con la planta.',
      'Después de la aprobación y posterior compra de los insumos, el personal de la estación realizó el reemplazo de las piezas adquiridas, con el fin de mantener la planta de emergencia en buen estado.'
    ],
    fotosIntro: [['insumos', 'Insumos comprados para el mantenimiento', 'Insumos comprados para mantenimiento de planta de emergencia']],
    pasos: [
      { t: 'Apagado de planta', x: 'Se pone el equipo en modo manual, con el objetivo de evitar algún encendido que pueda causar algún daño al personal operativo.', b: [ind('apag', [['a', 'Apagado de la planta', 'Apagado de la planta']])] },
      { t: 'Drenado de aceite', x: 'Se retiró el tornillo del drenado del cárter de la planta de emergencia y se comenzó con el drenado del aceite viejo.', b: [ind('dac', [['a', 'Drenado de aceite viejo', 'Drenado de aceite viejo']])] },
      { t: 'Drenado de anticongelante', x: 'Se procedió a drenar por completo el anticongelante para que pueda ser reemplazado.', b: [ind('dan', [['a', 'Drenado de anticongelante', 'Drenado de anticongelante']])] },
      { t: 'Llenado de aceite', x: 'Una vez que terminó de drenar el aceite, procedimos con el relleno: primero llenamos el filtro de aceite y se retiró el viejo para después colocarlo en su posición. Se revisó el nivel con la bayoneta y se dejó hasta el nivel indicado en la misma.',
        b: [ind('lac', [['f', 'Llenado de filtro de aceite', 'Llenado de filtro de aceite'], ['p', 'Llenado de aceite a la planta', 'Llenado de aceite a la planta'], ['b', 'Revisión de nivel en la bayoneta', 'Revisión de nivel en la bayoneta']])] },
      { t: 'Llenado de anticongelante', x: 'Con la planta ya sin anticongelante se cerraron los tornillos de purga y se comenzó con el llenado de anticongelante.\nSe abrió la purga de aire y se rellenó hasta el límite superior del radiador.',
        b: [ind('lan', [['l', 'Llenado de anticongelante', 'Llenado de anticongelante'], ['p', 'Purga y nivel final de anticongelante', 'Purga de anticongelante y nivel final de anticongelante']])] },
      { t: 'Cambio de filtros', x: 'Se reemplazaron los filtros de la planta de emergencia.', b: [ind('fil', [['r', 'Reemplazo de filtros', 'Reemplazo de filtros']]), grp('filn', 'Filtros nuevos colocados', 2, 'Filtro')] },
      { t: 'Limpieza y prueba', x: 'Al finalizar el mantenimiento se realizó una limpieza de la planta de emergencia para después hacer una prueba sin carga, encontrándose en perfecto funcionamiento. Se deja el transfer de la planta en automático, concluyendo con esto el mantenimiento.', b: [grp('prue', 'Limpieza de planta y selección de transfer en automático', 2, 'Foto')] }
    ],
    concl: 'El mantenimiento se realizó sin ningún problema.'
  });
})();
