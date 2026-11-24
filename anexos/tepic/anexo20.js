// Tepic · Anexo 20: Mantenimiento a los extintores (reporte 44 de Tepic)
(function () {
  const { ind, grp, def } = AX;
  def(20, {
    titulo: "MANTENIMIENTO A LOS EXTINTORES", formato: "sin_horario", sinExtra: true,
    mat: ["Extintores", "Compañía externa para recarga de extintores", "Franela"],
    intro: ["La normatividad de protección civil exige un correcto funcionamiento de los sistemas de emergencia, debido a esto es obligatorio que los extintores se encuentren cargados y en buen estado para estar preparado para cualquier siniestro. Para este mantenimiento se requiere que un proveedor externo certificado, realice el abastecimiento de los extintores, verifique el buen funcionamiento y que cumplan con la normatividad actual."],
    pasos: [
    { t: "Traslado de los extintores para su recarga y mantenimiento", x: "Se procede a retirar los extintores de sus posiciones en la estación y se trasladan al negocio para su recarga y mantenimiento.", b: [ind("g1", [['1', 'Foto', "Se retiran los extintores de su lugar para transportarlos al negocio; se llevan 4 extintores de CO2, 2 extintores de HFC y 1 extintor de PQS para su recarga y mantenimiento."]])] },
    { t: "Recolección y regreso de los extintores tras su mantenimiento a la estación", x: "Se recogen los extintores una vez que se recibe el aviso de que la recarga y mantenimiento ha concluido. Se trasladan a la estación y se colocan en su lugar.", b: [grp("g1", "Se recogen los extintores después de la recarga y mantenimiento.", 4, 'Foto')] },
    { t: "Limpieza de extintores y señalética", x: "Se limpian los extintores y letreros de estos con ayuda de una franela para así mantenerlos en buenas condiciones en caso de necesitarlos.", b: [grp("g1", "Limpieza del extintor de HFC del cuarto de operación.", 4, 'Foto'), grp("g2", "Limpieza del extintor de HFC del cuarto de transmisión.", 4, 'Foto'), grp("g3", "Limpieza del extintor de HFC del cuarto del regulador.", 4, 'Foto'), grp("g4", "Limpieza del extintor de CO2 de la bodega.", 4, 'Foto'), grp("g5", "Limpieza del extintor de PQS de la bodega, se trasladará a cuartos eléctricos.", 4, 'Foto'), grp("g6", "Limpieza de extintor de CO2 de la cocina.", 4, 'Foto'), grp("g7", "Limpieza del extintor de CO2 del comedor.", 4, 'Foto'), grp("g8", "Limpieza del extintor de CO2 de la sala.", 4, 'Foto')] }
    ],
    obs: "Mantenimiento a los extintores realizado sin observaciones.", concl: "El objetivo del mantenimiento se cumplió ya que se aseguró que los extintores estén en un estado óptimo por si se necesita utilizarlos."
  }, 'tepic');
})();
