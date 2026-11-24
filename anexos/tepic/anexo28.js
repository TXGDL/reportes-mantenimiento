// Tepic · Anexo 28: Mantenimiento a los aires acondicionados de la estación (reporte 20 de Tepic)
(function () {
  const { ind, grp, def } = AX;
  def(28, {
    titulo: "MANTENIMIENTO A LOS AIRES ACONDICIONADOS DE LA ESTACIÓN", formato: "tepic", sinExtra: true,
    mat: ["Hidrolavadora", "Manguera", "Agua", "Extensión eléctrica", "Coil cleaner", "Foam cleaner", "Franelas", "Sopladora", "Escalera", "Atomizadores", "Brocha"],
    intro: ["Se requiere un sistema de refrigeración en perfecto funcionamiento en la sala de transmisión, debido a que ahí se cuenta con los equipos con los que se transmiten las señales de televisión, los cuales, generan calor y para asegurar un funcionamiento ininterrumpido por calentamiento, la caseta debe estar a una temperatura de alrededor de 20 °C. Para este fin, se debe realizar el mantenimiento menor y evitar alguna falla súbita de los equipos de aire y que esto ocasione calentamiento en los equipos de transmisión."],
    pasos: [
    { t: "Mantenimiento a los evaporadores", x: "Se abren los evaporadores, se limpian con franela por dentro y por fuera, se retiran los filtros para lavarlos por fuera, se limpia el interior con sopladora, se aplica coil cleaner para limpieza del equipo, por último, se vuelve a armar el equipo.", b: [grp("g1", "Limpieza de filtros de los evaporadores con agua y jabón.", 6, 'Foto'), grp("g2", "Limpieza de los evaporadores.", 6, 'Foto'), grp("g3", "Colocación de los filtros ya lavados y secos.", 6, 'Foto')] },
    { t: "Mantenimiento de condensadores", x: "Se aplica foam cleaner al serpentín y se lavan todas las unidades condensadoras con la hidrolavadora.", b: [grp("g1", "Mantenimiento de condensadores. Se bajan alimentadores eléctricos y se aplica producto químico para limpiar.", 6, 'Foto'), grp("g2", "Se utiliza la hidrolavadora para el mantenimiento de los condensadores.", 6, 'Foto'), grp("g3", "Lavado de condensadores con la hidrolavadora.", 6, 'Foto'), grp("g4", "Por último, se limpian los condensadores con franela.", 6, 'Foto')] }
    ],
    obs: "Mantenimiento menor a los climas de la estación realizado sin observaciones.", concl: "El objetivo del mantenimiento se cumplió al realizar la limpieza de los equipos, alargando así el tiempo de vida de los aires, lo cual, a su vez, asegura un funcionamiento ininterrumpido de los equipos de transmisión al tener una temperatura idónea de trabajo."
  }, 'tepic');
})();
