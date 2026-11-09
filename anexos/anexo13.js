// Anexo 13: Mantenimiento a cables, conectores y rack
(function () {
  const { grp } = AX;
  AX.def(13, {
    mat: ['Desarmador', 'Multímetro', 'Brocha', 'Etiquetadora'],
    intro: [
      'Como parte del mantenimiento semestral programado, se debe llevar a cabo la revisión y limpieza de los elementos de interconexión de los equipos en operación. Este procedimiento es fundamental para asegurar que cables de red, RF, video, audio, alimentación eléctrica, así como sus conectores (splitters, adaptadores, cargas, etc.), se encuentren en óptimas condiciones, permitiendo así una comunicación y funcionamiento eficiente entre los distintos sistemas.',
      'Asimismo, se inspeccionó el estado físico del rack y sus componentes, asegurando que estén libres de polvo, correctamente organizados y plenamente operativos, con el objetivo de evitar fallas que puedan comprometer la continuidad de la transmisión.'
    ],
    pasos: [
      { t: 'Verificación de los cables y conectores de los equipos en rack', x: 'Se comienza el mantenimiento con la evaluación del estado físico de los equipos; se tomaron lecturas de parámetros en aquellos con cambio de cable o conector.', b: [grp('rev', 'Revisión de cableado y conectores', 10, 'Equipo')] },
      { t: 'Inspección visual a las etiquetas de los cables', x: 'Se revisó el etiquetado de los cables y equipos en los racks de la estación, encontrándose en buen estado; también se colocaron etiquetas donde no se tenían.', b: [grp('etq', 'Etiquetado de equipos', 8, 'Equipo'), grp('etc', 'Etiquetado de cableado', 8, 'Cable')] },
      { t: 'Sustitución a cables y conectores', x: 'Debido a que los cables se encontraron en buen estado y no han presentado ningún problema, se dejaron en su respectivo lugar evitando con esto afectaciones a la señal.', b: [grp('sus', 'Sustitución de cables y conectores', 2, 'Foto')] },
      { t: 'Retiro de cable sobrante o en desuso', x: 'Se retiraron cables sobrantes que se encuentran en desuso de los racks.', b: [grp('ret', 'Retirado de cable sobrante', 2, 'Foto')] },
      { t: 'Peinado de cable', x: 'Se utilizaron cinchos para el estructurado de cables, con la finalidad de observar, ubicar y maniobrar cada cable dándoles soporte para sostenerlos.', b: [grp('pei', 'Peinado de cables', 6, 'Foto')] },
      { t: 'Revisión del rack', x: 'Para finalizar el mantenimiento, se revisó el estado físico del rack, encontrándolo en buen estado, ya que los elementos que lo componen (ventilación, iluminación, puertas, aterrizaje a tierra, etc.) se encuentran en óptimas condiciones y no se requiere cambiar ningún elemento de momento. Se coloca WD40 en las bisagras del rack.', b: [grp('rack', 'Revisión de elementos del rack', 8, 'Foto')] }
    ],
    concl: 'Todos los cables, conectores y rack se encuentran en buen estado.'
  });
})();
