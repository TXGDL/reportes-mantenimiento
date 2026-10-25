// Datos FICTICIOS para la prueba del motor (no contiene información real)
function datosPrueba(F) {
  return {
    fecha: '2026-04-02', numero: '0', titulo: 'MANTENIMIENTO AL TRANSFORMADOR DE AISLAMIENTO (PRUEBA)',
    nombre: 'NOMBRE DE PRUEBA', colabora: 'COLABORADOR DE PRUEBA', telefono: '0000000000', correo: 'PRUEBA@EJEMPLO.COM',
    intro: { parrafos: [
      'Este es un reporte de prueba generado desde la app. Sirve para comprobar que la plantilla, las fotos y las tablas se arman correctamente en el celular.',
      'Todos los nombres, teléfonos y fotos de este documento son ficticios.'],
      fotos: [{ foto: F.placa20, pie: 'Foto de ejemplo uno' }, { foto: F.placa23, pie: 'Foto de ejemplo dos' }] },
    materiales: ['Desarmador', 'Llave ajustable (inglesa)', 'Termómetro', 'Amperímetro de gancho', 'Multímetro', 'Sopladora', 'Guantes aislantes'],
    responsables: ['Persona de prueba uno', 'Persona de prueba dos'],
    pasos: [
      { titulo: 'Primer paso de ejemplo', bloques: [{ texto: 'Texto de ejemplo del primer paso.' }, { foto: F.tapa, pie: 'Foto vertical de ejemplo' }] },
      { titulo: 'Segundo paso de ejemplo', bloques: [{ texto: 'Texto de ejemplo del segundo paso.' }, { foto: F.insp, pie: 'Foto horizontal de ejemplo' }] },
      { titulo: 'Toma de lecturas de ejemplo', bloques: [
        { texto: 'Lecturas de ejemplo para comprobar las tablas.' },
        { foto: F.temp, pie: 'Toma de temperatura de ejemplo' },
        { tabla: { etiqueta: 'Temp.', terminales: ['H3','X1','H1','X2','H2','X3'], valores: ['43 ºC','40.4 ºC','40.3 ºC','41.1 ºC','43.9 ºC','48.6 ºC'] }, pie: 'Temperaturas de ejemplo' },
        { tabla: { etiqueta: 'Voltaje', terminales: ['H1 – H2','H2 – H3','H3 – H1'], valores: ['211.6 V','212.8 V','212.4 V'] }, pie: 'Voltajes de ejemplo' }] }],
    observaciones: 'Mantenimiento realizado sin observaciones', hora_inicio: '00:05 Hrs.', hora_fin: '01:13 Hrs.',
    conclusion: 'Texto de conclusión de ejemplo.',
    solicitud: F.solicitud,
    elabora_nombre: 'Nombre de prueba', elabora_area: 'Oficina de prueba',
    autoriza_nombre: 'Nombre de prueba', autoriza_area: 'Dirección de prueba',
    vobo_nombre: 'Nombre de prueba', vobo_area: 'Dirección de prueba'
  };
}
if (typeof module !== 'undefined') module.exports = { datosPrueba };
