// Catálogo de anexos del manual de mantenimiento preventivo. "disponible" = ya tiene su procedimiento armado en la app.
const ANEXO_DEF = {};
// Procedimientos por oficina de estación: cada oficina tiene sus propios formatos
const ANEXO_DEF_EST = { guadalajara: ANEXO_DEF, guaymas: {} };
const OFICINAS = [['guadalajara', 'Guadalajara'], ['guaymas', 'Guaymas']];
const hayDef = n => !!((ANEXO_DEF_EST[(typeof sesion !== 'undefined' && sesion.estacionId) || ''] || {})[n]);
const ANEXOS = [
  { n: 10, titulo: 'Mantenimiento al transformador de aislamiento', disponible: true },
  { n: 11, titulo: 'Mantenimiento al regulador de voltaje', disponible: true },
  { n: 12, titulo: 'Mantenimiento a los equipos en el rack' },
  { n: 13, titulo: 'Mantenimiento a cables, conectores y rack' },
  { n: 14, titulo: 'Mantenimiento al deshidratador de línea', disponible: true },
  { n: 15, titulo: 'Mantenimiento general al transmisor', disponible: true },
  { n: 16, titulo: 'Mantenimiento al sistema de enfriamiento', disponible: true },
  { n: 17, titulo: 'Mantenimiento a la instalación eléctrica', disponible: true },
  { n: 18, titulo: 'Mantenimiento a los tanques de diésel' },
  { n: 19, titulo: 'Mantenimiento a las antenas parabólicas' },
  { n: 20, titulo: 'Mantenimiento a los extintores' },
  { n: 21, titulo: 'Mantenimiento a los registros eléctricos' },
  { n: 22, titulo: 'Mantenimiento al sistema de tierras' },
  { n: 23, titulo: 'Mantenimiento al sistema hidráulico y bomba' },
  { n: 24, titulo: 'Mantenimiento al sistema sanitario' },
  { n: 25, titulo: 'Mantenimiento al predio' },
  { n: 26, titulo: 'Mantenimiento a las plantas de emergencia' },
  { n: 27, titulo: 'Mantenimiento a los UPS' },
  { n: 28, titulo: 'Mantenimiento a los aires acondicionados' },
  { n: 29, titulo: 'Mantenimiento a las subestaciones eléctricas' },
  { n: 30, titulo: 'Mantenimiento de pintura interior, exterior, impermeabilizado y rotulación' },
  { n: 31, titulo: 'Mantenimiento a las torres de radiodifusión' }
];

// Programa anual de mantenimientos: [número, mes, anexo del manual]. Solo sirve para llenar los datos más rápido; todo se puede cambiar a mano.
const PROGRAMA = [
  [1,'Enero',18],[2,'Enero',19],[3,'Enero',22],[4,'Enero',25],
  [5,'Febrero',14],[6,'Febrero',17],[7,'Febrero',23],[8,'Febrero',24],
  [9,'Marzo',13],[10,'Marzo',21],[11,'Marzo',25],
  [12,'Abril',10],[13,'Abril',11],
  [14,'Mayo',14],[15,'Mayo',25],
  [16,'Junio',17],[17,'Junio',21],
  [18,'1er semestre',26],[19,'1er semestre',27],[20,'1er semestre',28],
  [21,'Julio',18],[22,'Julio',19],[23,'Julio',22],[24,'Julio',25],
  [25,'Agosto',14],[26,'Agosto',23],[27,'Agosto',24],
  [28,'Septiembre',12],[29,'Septiembre',13],[30,'Septiembre',21],[31,'Septiembre',25],
  [32,'Octubre',10],[33,'Octubre',11],[34,'Octubre',15],[35,'Octubre',16],[36,'Octubre',17],
  [37,'Noviembre',14],[38,'Noviembre',25],
  [39,'Diciembre',21],
  [40,'2do semestre',27],
  [41,'Servicio anual',20]
];
