// Definición del Anexo 15: Mantenimiento general al transmisor
(function () {
  const ind = (id, lista) => ({ tipo: 'fotos', id, individual: true, slots: lista.map(([k, et, pie]) => ({ id: `${id}_${k}`, etiqueta: et, pie })) });
  const grp = (id, pie, n, et) => ({ tipo: 'fotos', id, titulo: pie, pie, tabla: null, slots: Array.from({ length: n }, (_, i) => ({ id: `${id}_${i + 1}`, etiqueta: `${et} ${i + 1}` })) });
  const txt = id => ({ tipo: 'texto', id });
  const paso = (id, titulo, bloques) => ({ id, titulo, secciones: [{ id: 's' + id, titulo, bloques: [txt(id), ...bloques] }] });
  ANEXO_DEF[15] = {
    n: 15,
    materiales: ['Desarmadores', 'Aspiradora', 'Soplador', 'Trapo de microfibra', 'Medidor de potencia'],
    textos: {
      intro1: 'Debido a que es el equipo principal en la transmisión de TDT, es necesario mantener la eficiencia y óptima operación de este, por lo que se requiere que los componentes estén en buen estado, así como los periféricos y aditamentos adicionales que lo componen.',
      intro2: 'Se verificará el apriete de toda la tornillería y borneras del transmisor, incluyendo los tornillos de aseguramiento de los equipos.\nSe limpiarán internamente las secciones del transmisor, como lo son Excitadores, PDU y TCU.\nNo se retirarán los módulos P.A. ni I.P.A. debido a que podríamos provocar una fuga de glicol por lo envejecidas que se encuentran las válvulas check de los mismos, por lo que solo se limpiarán externamente.',
      intro3: 'Debido a que son muy similares, este mismo procedimiento se aplica a los transmisores con los que cuenta la estación.',
      p1: 'Antes de iniciar el apagado, se procede a tomar lecturas de los parámetros del transmisor.',
      p2: 'Después de la toma de lecturas, se procede a apagar el transmisor, para poder comenzar con la limpieza y los mantenimientos.',
      p3: 'Se retira la energía del transmisor para comenzar con el mantenimiento.',
      p4: 'Cada módulo del transmisor es limpiado de polvo.',
      p5: 'Una vez terminada la limpieza, se revisan las tarjetas electrónicas encontrando todo en orden.',
      p6: 'Se retiran los módulos excitadores para una mejor limpieza y se recolocan en su lugar después de la misma.',
      p7: 'Se realiza la limpieza al resto del transmisor. Previo a energizar, se procede al apriete de tornillería y bornes del transmisor.',
      p8: 'Una vez terminado el apriete de tornillería, se procede a energizar el transmisor.',
      p9: 'Se deja el transmisor a su potencia de operación nominal y se toman lecturas con el wattmetro, verificando que coincidan las potencias mostradas por el transmisor con las medidas por el wattmetro.',
      p10: 'Una vez confirmada la correcta operación del transmisor, se deja la señal al aire, terminando con esto el mantenimiento.',
      pX: '',
      obs: 'Mantenimiento realizado sin observaciones',
      concl: ''
    },
    etiquetasTextos: { intro1: 'Introducción', intro2: 'Introducción: alcance', intro3: 'Introducción: transmisores', p1: 'Texto del paso 1', p2: 'Texto del paso 2', p3: 'Texto del paso 3', p4: 'Texto del paso 4', p5: 'Texto del paso 5', p6: 'Texto del paso 6', p7: 'Texto del paso 7', p8: 'Texto del paso 8', p9: 'Texto del paso 9', p10: 'Texto del paso 10', pX: 'Texto de trabajos adicionales', obs: 'Observaciones', concl: 'Conclusión (opcional)' },
    intro: { secciones: [{ id: 'intro', titulo: 'Introducción', bloques: [txt('intro1'), txt('intro2'), txt('intro3'),
      ind('f_intro', [['vista', 'Vista frontal del transmisor', 'Vista frontal del transmisor']])] }] },
    pasos: [
      paso('p1', 'Toma de lecturas de parámetros al equipo', [ind('lec0', [['tcu', 'Pantalla del transmisor (antes del apagado)', 'Toma de lecturas del transmisor']])]),
      paso('p2', 'Apagar la transmisión de la señal al aire', [ind('apag', [['tx', 'Apagado del transmisor', 'Apagado del transmisor']])]),
      paso('p3', 'Desenergizado del transmisor', [ind('desen', [['br', 'Interruptor desenergizado', 'Desenergizado del transmisor']])]),
      paso('p4', 'Limpieza de los módulos de amplificación de potencia (PDU, IPA y PA)', [grp('limpm', 'Limpieza de módulos del transmisor', 2, 'Limpieza')]),
      paso('p5', 'Inspección de tarjetas eléctricas', [grp('tarj', 'Inspección de las tarjetas electrónicas', 2, 'Tarjetas')]),
      paso('p6', 'Limpieza de módulos excitadores', [grp('exc', 'Limpieza de módulos excitadores', 2, 'Excitadores')]),
      paso('p7', 'Limpieza del transmisor y apriete de tornillería', [grp('limpt', 'Limpieza del transmisor', 2, 'Limpieza'), grp('apr', 'Apriete de tornillería', 2, 'Apriete')]),
      paso('p8', 'Energizar el transmisor', [ind('en', [['br', 'Interruptor energizado', 'Energizado del transmisor']])]),
      paso('p9', 'Toma de lecturas de parámetros al equipo', [grp('lec', 'Toma de lecturas', 3, 'Lectura')]),
      paso('p10', 'Encender la transmisión de la señal al aire', [ind('aire', [['tx', 'Transmisor encendido', 'Transmisor encendido, señal al aire']])]),
      { id: 'pX', opcional: true, titulo: 'Trabajos adicionales / hallazgos (solo si los hubo)', secciones: [{ id: 'sX', titulo: 'Trabajos adicionales', bloques: [txt('pX'), grp('extra', 'Trabajos adicionales', 6, 'Foto')] }] }
    ],
    cierre: { secciones: [
      { id: 'concl', titulo: 'Conclusiones', bloques: [txt('obs'), txt('concl')] },
      { id: 'anexos', titulo: 'Anexo: solicitud de mantenimiento', bloques: [{ tipo: 'fotos', id: 'f_sol', individual: true, slots: [{ id: 'solicitud', etiqueta: 'Solicitud de mantenimiento preventivo', pie: '', origen: 'drive', original: true, buscar: 'Solicitud' }] }] }
    ] }
  };
})();
