// Anexo 25: Mantenimiento al predio
(function () {
  const { ind } = AX;
  const area = (k, nom) => ({ t: 'Limpieza del área ' + nom, x: '', b: [ind(k, [['a', `Limpieza del área ${nom}`, `Limpieza del área ${nom}`], ['d', `Área ${nom} después de la limpieza`, `Área ${nom} después del mantenimiento`]])] });
  const P = [
    ['est', 'de estacionamiento', 'La tierra y la hojarasca suelen acumularse en el estacionamiento, así como la suciedad del perro de guardia, por lo que se realiza la limpieza del área del estacionamiento todos los lunes por la tarde, así como barrer los pasillos.'],
    ['tor', 'de la torre', 'Basura y hojarasca se suelen acumular en el área de la torre; todo esto es limpiado además del corte de pasto o, en su defecto, el corte de la maleza que crece en el área.'],
    ['vol', 'del volado', 'Basura y hojarasca se suelen acumular en el área del volado; todo esto es limpiado además del corte de pasto o, en su defecto, el corte de la maleza que crece en el área.'],
    ['cas', 'de casetas', 'La basura y la hojarasca que suele acumularse en las áreas verdes cercanas a las casetas son limpiadas. Además de esto se barren los pasillos de tierra y basura que se puedan encontrar en los mismos.']
  ];
  AX.def(25, {
    formato: 'sin_horario',
    mat: ['Machete', 'Escoba', 'Recogedor', 'Sopladora', 'Desbrozadora'],
    intro: [
      'Se llevó a cabo el mantenimiento de la infraestructura de las Estaciones de Radiodifusión, con el objetivo de conservarlas en un estado plenamente funcional. Estas actividades incluyeron inspecciones periódicas, reparaciones, limpieza, pintura y reemplazo de componentes defectuosos, asegurando la seguridad, eficiencia y comodidad de las instalaciones.',
      'Se requiere que con regularidad se le dé tratamiento al predio donde se encuentra la estación, con la finalidad de mantener en las mejores condiciones las instalaciones y prever daños causados por el crecimiento de hierbas y los animales que se puedan alojar en las mismas.',
      'Debido a que la estación cuenta con más de 1200 m², el mantenimiento se divide en 4 tareas que cubren las 4 áreas, que se realizan cada semana: los lunes el área de estacionamiento (170 m²), los martes el área de casetas (385 m²), los jueves el área del volado (274 m²) y los viernes el área de la torre (375 m²). Total = 1204 m².'
    ],
    fotosIntro: [['areas', 'Áreas de la estación', 'Áreas de la estación Guadalajara']],
    pasos: P.map(([k, nom, x]) => Object.assign(area(k, nom), { x })),
    obs: 'Mantenimiento realizado sin observaciones.',
    concl: 'Debido a que el mantenimiento se divide en subtareas, no se tiene un horario fijo para realizarlas, ya que el clima del día puede hacer modificar el horario.\nLos lunes se realiza mantenimiento del área de estacionamiento, con un tiempo promedio de 1 hora en cada mantenimiento.\nLos martes se realiza mantenimiento del área de casetas y pasillos contiguos, con un tiempo promedio de 1 hora en cada mantenimiento.\nLos jueves se realiza mantenimiento al área del volado, con un tiempo promedio de 1 hora en cada mantenimiento.\nLos viernes se realiza mantenimiento al área de la torre, con un tiempo promedio de 1 hora en cada mantenimiento.\nDespués del desmalezamiento, corte de pasto y limpieza de las 4 áreas de la estación, se encontró el predio en buen estado.\nLa duración total del mantenimiento al final del mes da una sumatoria de ___ horas en total.'
  });
})();
