// Tepic · Anexo 24: Mantenimiento al sistema sanitario (reporte 27 de Tepic)
(function () {
  const { ind, grp, def } = AX;
  def(24, {
    titulo: "MANTENIMIENTO AL SISTEMA SANITARIO", formato: "tepic", sinExtra: true,
    mat: ["Escoba", "Barreta", "Cepillo de alambre", "Franela", "Cubetas", "Agua", "Líquido enzimático", "Cubrebocas", "Guantes", "Pala", "Pico"],
    intro: ["El mantenimiento al sistema sanitario es de suma importancia realizarlo de manera periódica, ya que este mantenimiento nos permite tener el sistema sanitario en buenas condiciones, así como que este sistema dure por más tiempo en óptimas condiciones. Para llevar a cabo este mantenimiento se utiliza cubeta para retirar desechos de lodos y lavar el registro sanitario, cepillo de alambre, esmeriladora portátil, extensión eléctrica, escoba y espátula para limpiar tapas de registros, barreta para abrir tapas de registros. También se utiliza insecticida para matar arañas en el nicho del biodigestor.  Se aplica solución con enzimas para biodigestor."],
    pasos: [
    { t: "Limpieza del registro sanitario", x: "Se limpia por fuera el registro sanitario para evitar que caiga basura al interior, se retira la tapa, se limpian los marcos metálicos del registro con ayuda de un esmeril portátil y cepillo de alambre, se vierte agua pluvial y se limpia el interior del registro, se aplica un poco de solución enzimática, se vuelve a colocar la tapa del registro en su lugar.", b: [grp("g1", "Limpieza externa y apertura del registro sanitario.", 4, 'Foto'), grp("g2", "Mantenimiento del registro sanitario, limpieza interna y de la tapa.", 6, 'Foto'), grp("g3", "Registro sanitario después del mantenimiento.", 3, 'Foto')] },
    { t: "Limpieza de registro de biodigestor y de pozo de absorción", x: "Se limpia el exterior del registro de la fosa séptica, se abre para realizar inspección visual, se aplica líquido enzimático en biodigestor. Se abre el registro del pozo de absorción, se retira la tapa, se limpia la tapa y la base del registro.", b: [grp("g1", "Mantenimiento de registro de biodigestor, limpieza de registro y aplicación de enzimas.", 6, 'Foto'), grp("g2", "Mantenimiento del registro del pozo de absorción, limpieza de la base y de la tapa del registro.", 6, 'Foto')] },
    { t: "Extracción de lodos", x: "Se abre el registro de lodos. Se extraen aproximadamente 10 cubetas de 19L de material; se realiza un pequeño pozo al exterior del predio, se coloca el material extraído y se aplica cal; en algunos días que esté seco se tapará el pozo excavado.", b: [grp("g1", "Limpieza y apertura del registro de lodos.", 4, 'Foto'), grp("g2", "Extracción de lodos por parte del personal de la estación.", 6, 'Foto')] },
    { t: "Revisión de componentes del sistema sanitario", x: "Se hace revisión de las tomas sanitarias de la estación, las cuales son: Excusado, mingitorio, lavabo, regadera, lavadero y tarja.", b: [grp("g1", "Inspección visual de conexiones del sistema sanitario, todo bien.", 6, 'Foto')] }
    ],
    obs: "Mantenimiento al sistema sanitario realizado sin observaciones.", concl: ""
  }, 'tepic');
})();
