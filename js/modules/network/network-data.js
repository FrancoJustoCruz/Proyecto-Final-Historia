// Red de relaciones históricas: nodos, tipos de nodo y relaciones.
// Cada relación lleva una nota que la justifica y las fuentes (ids de FUENTES en timeline-data.js).
// Antes de publicar: contrastar cada relación con la bibliografía citada.
import { EVENTOS } from "../timeline/timeline-data.js";

export const TIPOS_NODO = {
  causa: { id: "causa", nombre: "Causas", color: "#d9a441", forma: "triangulo" },
  evento: { id: "evento", nombre: "Acontecimientos", color: "#d0423f", forma: "cuadrado" },
  actor: { id: "actor", nombre: "Actores históricos", color: "#eadfc8", forma: "circulo" },
  politica: { id: "politica", nombre: "Consecuencias políticas", color: "#6fa0c8", forma: "rombo" },
  economica: { id: "economica", nombre: "Consecuencias económicas", color: "#78ad84", forma: "hexagono" },
  social: { id: "social", nombre: "Consecuencias sociales", color: "#b98ac7", forma: "pentagono" },
};

export const TIPOS_RELACION = {
  causal: { id: "causal", nombre: "Causal", desc: "Un hecho o condición contribuyó a producir otro.", color: "#eadfc8", dash: null, flecha: true, ancho: 2 },
  politica: { id: "politica", nombre: "Política", desc: "Decisión, cargo o acción institucional de un actor o del Estado.", color: "#b8944a", dash: "8 5", flecha: true, ancho: 1.8 },
  influencia: { id: "influencia", nombre: "Influencia", desc: "Impacto ideológico, estratégico o de movilización, sin cadena causal directa.", color: "#9db8c9", dash: "2 5", flecha: true, ancho: 2.2 },
  cronologica: { id: "cronologica", nombre: "Cronológica", desc: "Sucesión o coincidencia en el tiempo; por sí sola no implica causalidad.", color: "#8d8271", dash: "3 4", flecha: false, ancho: 1.4 },
};

const T = (id) => EVENTOS.find((e) => e.id === id);
const ev = (id, tl, label) => ({ id, tipo: "evento", label, fechas: T(tl).fecha, desc: T(tl).resumen, fuentes: T(tl).fuentes, timeline: tl });
const n = (id, tipo, label, fechas, desc) => ({ id, tipo, label, fechas, desc });

export const NODOS = [
  // Causas
  n("c-guerras", "causa", "Guerras contra Japón y guerra civil (1937–1949)", "1937–1949", "El desgaste del gobierno nacionalista durante la guerra contra Japón y la victoria militar del PCCh en la guerra civil crearon las condiciones para proclamar la República Popular."),
  n("c-tierra", "causa", "Cuestión agraria y desigualdad rural", "Antes y después de 1949", "La redistribución de la tierra fue un eje del programa rural del PCCh antes y después de 1949."),
  n("c-confrontacion", "causa", "Confrontación con EE. UU. en Asia oriental", "1949–1950", "La guerra fría en Asia y la presencia de fuerzas estadounidenses cerca de la frontera china influyeron en la decisión de intervenir en Corea."),
  n("c-modelo", "causa", "Modelo soviético de planificación", "Años cincuenta", "China adoptó métodos e instituciones de planificación de la URSS y recibió asistencia técnica soviética."),
  n("c-industrializacion", "causa", "Meta de industrialización acelerada", "Hacia 1957–1958", "La dirección del Partido, con Mao a la cabeza, buscó elevar con rapidez la producción industrial y agrícola para reducir la distancia con las economías más desarrolladas."),
  n("c-disputas", "causa", "Disputas en la dirección tras el Gran Salto", "1959–1965", "La crítica de Lushan (1959) y el debate sobre cómo corregir el rumbo dejaron diferencias entre Mao y otros dirigentes, entre ellos Liu Shaoqi y Deng Xiaoping."),
  n("c-ruptura", "causa", "Deterioro de la relación con la URSS", "Fines de los años cincuenta–1969", "Las diferencias ideológicas y estratégicas con Moscú se agravaron desde fines de los años cincuenta y derivaron en choques fronterizos en 1969."),
  n("c-revisionismo", "causa", "Temor de Mao al «revisionismo»", "Años sesenta", "Mao temía que el Partido y el Estado perdieran su carácter revolucionario, una preocupación vinculada a la crítica al revisionismo soviético y a la evolución política interna."),

  // Acontecimientos (enlazados a la cronología)
  ev("ev-1949", "1949", "Fundación de la RPC (1949)"),
  ev("ev-1950", "1950", "Reforma agraria (1950–1953)"),
  { id: "ev-corea", tipo: "evento", label: "Guerra de Corea (1950–1953)", fechas: "Octubre de 1950–julio de 1953", desc: "Tropas chinas, bajo la denominación de Voluntarios del Pueblo Chino, entraron en la guerra en octubre de 1950; el armisticio se firmó en julio de 1953.", fuentes: ["chen2001"], timeline: "1950" },
  ev("ev-1953", "1953", "Primer Plan Quinquenal (1953–1957)"),
  ev("ev-1957", "1957", "Campaña Antiderechista (1957)"),
  ev("ev-1958", "1958", "Gran Salto Adelante (1958)"),
  ev("ev-1959", "1959", "Crisis y hambruna (1959–1961)"),
  ev("ev-1966", "1966", "Revolución Cultural (1966)"),
  ev("ev-1969", "1969", "IX Congreso del PCCh (1969)"),
  ev("ev-1971", "1971", "Muerte de Lin Biao (1971)"),
  ev("ev-1972", "1972", "Visita de Nixon (1972)"),
  ev("ev-1976", "1976", "Muerte de Mao (1976)"),

  // Actores
  n("a-mao", "actor", "Mao Zedong", "1893–1976", "Presidente del Partido Comunista de China y figura central de la dirección política durante todo el período."),
  n("a-zhou", "actor", "Zhou Enlai", "1898–1976", "Primer ministro de la República Popular desde 1949 hasta su muerte en enero de 1976."),
  n("a-liu", "actor", "Liu Shaoqi", "1898–1969", "Alto dirigente del Partido y presidente de la República Popular desde 1959; fue destituido y perseguido durante la Revolución Cultural."),
  n("a-deng", "actor", "Deng Xiaoping", "1904–1997", "Secretario general del Partido desde 1956; fue purgado en la Revolución Cultural y, tras la muerte de Mao, impulsó las reformas desde 1978."),
  n("a-peng", "actor", "Peng Dehuai", "1898–1974", "Mariscal y ministro de Defensa; comandó a los Voluntarios en Corea y fue destituido tras criticar el Gran Salto Adelante en Lushan (1959)."),
  n("a-lin", "actor", "Lin Biao", "1907–1971", "Mariscal; sustituyó a Peng Dehuai como ministro de Defensa en 1959 y fue designado sucesor de Mao en 1969."),
  n("a-jiang", "actor", "Jiang Qing", "1914–1991", "Esposa de Mao; tuvo un papel destacado en la Revolución Cultural y fue detenida en octubre de 1976 junto con otros dirigentes de la «Banda de los Cuatro»."),
  n("a-guardias", "actor", "Guardias Rojos", "Desde 1966", "Organizaciones de estudiantes movilizadas desde 1966 durante la Revolución Cultural."),
  n("a-nixon", "actor", "Richard Nixon", "1913–1994", "Presidente de Estados Unidos entre 1969 y 1974; visitó China en febrero de 1972."),

  // Consecuencias políticas
  n("p-estado", "politica", "Estado dirigido por el PCCh", "Desde 1949", "A partir de 1949 el Partido ejerció la dirección del Estado en la China continental."),
  n("p-purgas", "politica", "Destitución de dirigentes del Partido y del Estado", "1966–1969", "Durante la Revolución Cultural fueron destituidos y perseguidos altos cargos, entre ellos Liu Shaoqi."),
  n("p-credibilidad", "politica", "Pérdida de credibilidad de la Revolución Cultural", "Después de 1971", "El episodio de 1971 debilitó la credibilidad de la Revolución Cultural dentro del Partido."),
  n("p-apertura", "politica", "Normalización con EE. UU.", "Desde 1972", "Desde 1972 comenzó un proceso de normalización que llevó a relaciones diplomáticas plenas en 1979."),
  n("p-sucesion", "politica", "Lucha de poder y fin de la Revolución Cultural", "1976", "Tras la muerte de Mao fueron detenidos los dirigentes de la «Banda de los Cuatro» y se abrió una disputa por la dirección del Partido; suele considerarse el fin de la Revolución Cultural."),

  // Consecuencias económicas
  n("ec-tierra", "economica", "Redistribución de la tierra", "1950–1953", "La reforma agraria transfirió tierras de terratenientes a familias campesinas."),
  n("ec-industria", "economica", "Base de industria pesada estatal", "Desde 1953", "El Primer Plan Quinquenal dio prioridad a la industria pesada de propiedad estatal."),
  n("ec-colectivizacion", "economica", "Colectivización y comunas populares", "1953–1958", "Las cooperativas de los años cincuenta dieron paso a colectivos y, en 1958, a las comunas populares."),
  n("ec-desorg", "economica", "Desorganización de la producción y la distribución", "1958–1961", "El Gran Salto Adelante desorganizó la producción y la distribución de alimentos."),
  n("ec-reajuste", "economica", "Medidas de reajuste desde 1961", "Desde 1961", "Tras la crisis se flexibilizó el régimen de comunas y se aplicaron medidas de recuperación."),
  n("ec-reformas", "economica", "Reformas económicas desde 1978", "Desde 1978", "A partir de 1978 la dirección encabezada por Deng Xiaoping inició reformas que modificaron el modelo económico."),

  // Consecuencias sociales
  n("s-clases", "social", "Violencia y clasificación de clase en el campo", "1950–1953", "La reforma agraria incluyó la clasificación de la población rural en categorías de clase y episodios de violencia contra terratenientes; su magnitud es objeto de debate."),
  n("s-intelectuales", "social", "Sanciones a intelectuales", "Desde 1957", "Muchas personas calificadas de «derechistas» perdieron sus cargos o fueron enviadas a trabajar al campo o a reeducación por el trabajo."),
  n("s-hambruna", "social", "Mortalidad masiva por hambruna", "1959–1961", "La hambruna causó una mortalidad muy elevada; las estimaciones varían mucho según el método y son objeto de debate."),
  n("s-persecucion", "social", "Persecuciones, cierre de escuelas y daño al patrimonio", "1966–1976", "La Revolución Cultural trajo violencia y persecuciones, el cierre de escuelas y universidades durante años y la destrucción de patrimonio cultural."),
];

const r = (origen, destino, tipo, nota, fuentes) => ({ origen, destino, tipo, nota, fuentes });

export const RELACIONES = [
  // Causas → acontecimientos y consecuencias
  r("c-guerras", "ev-1949", "causal", "El desgaste del gobierno nacionalista y la victoria del PCCh en la guerra civil llevaron a la proclamación de 1949.", ["westad2003"]),
  r("ev-1949", "p-estado", "causal", "La proclamación instauró un Estado dirigido por el PCCh en la China continental.", ["cambridge14"]),
  r("ev-1949", "ev-1950", "politica", "El nuevo Estado promulgó la ley agraria de 1950 y organizó la reforma a escala nacional.", ["cambridge14"]),
  r("c-tierra", "ev-1950", "causal", "La redistribución de la tierra, eje del programa rural del PCCh, se concretó en la Ley de Reforma Agraria de 1950.", ["ley-agraria-1950", "walder2015"]),
  r("ev-1950", "ec-tierra", "causal", "La reforma transfirió tierras de terratenientes a familias campesinas.", ["ley-agraria-1950", "cambridge14"]),
  r("ev-1950", "s-clases", "causal", "El proceso incluyó la clasificación de clase de la población rural y violencia contra terratenientes; la magnitud se debate.", ["walder2015", "cambridge14"]),
  r("c-confrontacion", "ev-corea", "causal", "La confrontación con EE. UU. en Asia oriental pesó en la decisión de intervenir en Corea en octubre de 1950.", ["chen2001"]),
  r("ev-corea", "ev-1950", "cronologica", "Ambos procesos coincidieron entre 1950 y 1953. No hay causalidad directa entre ellos; la movilización por la guerra acompañó a las campañas internas.", ["chen2001"]),
  r("c-modelo", "ev-1953", "causal", "El Plan adoptó métodos de planificación soviéticos y contó con asistencia técnica de la URSS.", ["cambridge14"]),
  r("ev-1953", "ec-industria", "causal", "El Plan dio prioridad a la industria pesada de propiedad estatal.", ["cambridge14"]),
  r("ev-1953", "ec-colectivizacion", "politica", "La colectivización avanzó en el mismo período y se aceleró en 1955–1956 por decisión política de la dirección.", ["walder2015", "cambridge14"]),
  r("ev-1953", "ev-1958", "cronologica", "El Gran Salto Adelante se lanzó al concluir el Primer Plan Quinquenal. La sucesión no basta, por sí sola, para explicar el cambio de rumbo.", ["cambridge14"]),
  r("ev-1957", "s-intelectuales", "causal", "La campaña sancionó a quienes fueron calificados de «derechistas».", ["macfarquhar-origins1"]),
  r("ev-1957", "ev-1958", "influencia", "Según varios historiadores, el clima político tras 1957 redujo la crítica interna y facilitó el lanzamiento del Salto.", ["macfarquhar-origins2"]),
  r("c-industrializacion", "ev-1958", "causal", "La meta de elevar con rapidez la producción motivó el lanzamiento del Gran Salto Adelante.", ["macfarquhar-origins2"]),
  r("ev-1958", "ec-colectivizacion", "causal", "En agosto de 1958 una resolución del Comité Central formalizó las comunas populares.", ["resolucion-comunas-1958"]),
  r("ev-1958", "ec-desorg", "causal", "Las metas fijadas desde arriba y la reorganización del campo desorganizaron la producción y la distribución.", ["macfarquhar-origins2", "dikotter2010"]),
  r("ev-1958", "ev-1959", "causal", "La hambruna se asocia a las políticas del Salto, junto con factores climáticos y la sobreestimación de cosechas.", ["dikotter2010"]),
  r("ev-1959", "s-hambruna", "causal", "La crisis alimentaria derivó en una mortalidad muy elevada; las estimaciones varían según el estudio.", ["dikotter2010"]),
  r("ev-1959", "ec-reajuste", "causal", "Desde 1961 se aplicaron medidas de reajuste como respuesta a la crisis.", ["macfarquhar-origins3"]),
  r("ev-1959", "c-disputas", "causal", "La crítica de Lushan y la evaluación de la crisis dejaron diferencias en la dirección.", ["macfarquhar-origins2", "macfarquhar-origins3"]),
  r("c-disputas", "ev-1966", "causal", "Las diferencias sobre el rumbo tras el Salto forman parte de los antecedentes políticos de 1966.", ["macfarquhar-origins3"]),
  r("c-ruptura", "c-revisionismo", "influencia", "La crítica al «revisionismo» soviético alimentó el temor de Mao a una deriva similar en China.", ["chen2001"]),
  r("c-revisionismo", "ev-1966", "causal", "El temor a perder el carácter revolucionario del Partido figura entre las motivaciones de Mao para lanzar el movimiento.", ["macfarquhar-schoenhals2006"]),
  r("ev-1966", "p-purgas", "causal", "El movimiento llevó a la destitución de altos dirigentes, entre ellos Liu Shaoqi.", ["macfarquhar-schoenhals2006", "decision-16-puntos"]),
  r("ev-1966", "s-persecucion", "causal", "Violencia, persecuciones, cierre de escuelas y destrucción de patrimonio acompañaron al movimiento.", ["macfarquhar-schoenhals2006", "decision-16-puntos"]),
  r("ev-1966", "ev-1969", "politica", "El IX Congreso reconstruyó los órganos del Partido tras la fase más violenta del movimiento.", ["cambridge15"]),
  r("ev-1969", "ev-1971", "politica", "La designación de Lin Biao como sucesor lo sitúa en el centro de la crisis de 1971; los detalles del episodio se discuten.", ["macfarquhar-schoenhals2006"]),
  r("ev-1971", "p-credibilidad", "causal", "El episodio debilitó la credibilidad de la Revolución Cultural dentro del Partido.", ["macfarquhar-schoenhals2006"]),
  r("c-ruptura", "ev-1972", "causal", "La tensión con la URSS, con choques fronterizos en 1969, impulsó el acercamiento de Pekín a Washington.", ["chen2001", "macmillan2007"]),
  r("ev-1972", "p-apertura", "causal", "La visita abrió la normalización de relaciones, que culminó en 1979.", ["comunicado-shanghai", "macmillan2007"]),
  r("ev-1976", "p-sucesion", "causal", "La muerte de Mao precedió a la detención de la «Banda de los Cuatro» y a una disputa por la dirección.", ["macfarquhar-schoenhals2006"]),
  r("p-sucesion", "ec-reformas", "causal", "La derrota de la «Banda de los Cuatro» y el ascenso de Deng Xiaoping abrieron el camino a las reformas desde 1978.", ["cambridge15", "resolucion-1981"]),

  // Actores
  r("a-mao", "ev-1949", "politica", "Proclamó la República Popular el 1 de octubre de 1949.", ["cambridge14"]),
  r("a-zhou", "ev-1949", "politica", "Fue el primer ministro del nuevo gobierno.", ["cambridge14"]),
  r("a-zhou", "ev-1953", "politica", "Como primer ministro, encabezó el gobierno que aplicó el Plan.", ["cambridge14"]),
  r("a-mao", "ev-corea", "politica", "La decisión de intervenir se adoptó bajo su dirección.", ["chen2001"]),
  r("a-peng", "ev-corea", "politica", "Comandó a los Voluntarios del Pueblo Chino.", ["chen2001"]),
  r("a-mao", "ev-1957", "politica", "Impulsó el giro desde la invitación a la crítica hacia la campaña contra los «derechistas».", ["macfarquhar-origins1"]),
  r("a-deng", "ev-1957", "politica", "Como secretario general, participó en la dirección de la campaña.", ["macfarquhar-origins1"]),
  r("a-mao", "ev-1958", "politica", "Fue el principal impulsor del Gran Salto Adelante.", ["macfarquhar-origins2"]),
  r("a-peng", "ev-1959", "politica", "Criticó las políticas del Salto en Lushan y fue destituido.", ["macfarquhar-origins2"]),
  r("a-lin", "ev-1959", "politica", "Sustituyó a Peng Dehuai como ministro de Defensa.", ["macfarquhar-origins2"]),
  r("a-liu", "ec-reajuste", "influencia", "Junto con Deng Xiaoping, impulsó medidas de recuperación tras la crisis.", ["macfarquhar-origins3"]),
  r("a-deng", "ec-reajuste", "influencia", "Junto con Liu Shaoqi, impulsó medidas de recuperación tras la crisis.", ["macfarquhar-origins3"]),
  r("a-mao", "ev-1966", "politica", "Fue el principal impulsor de la Revolución Cultural.", ["macfarquhar-schoenhals2006"]),
  r("a-lin", "ev-1966", "politica", "Respaldó a Mao durante el movimiento.", ["macfarquhar-schoenhals2006"]),
  r("a-jiang", "ev-1966", "politica", "Integró el Grupo de la Revolución Cultural.", ["macfarquhar-schoenhals2006"]),
  r("a-guardias", "ev-1966", "politica", "Estudiantes organizados como Guardias Rojos atacaron a dirigentes, maestros y símbolos de la «vieja cultura».", ["macfarquhar-schoenhals2006"]),
  r("a-mao", "a-guardias", "influencia", "Los respaldó públicamente y los recibió en la plaza de Tiananmen desde agosto de 1966.", ["macfarquhar-schoenhals2006"]),
  r("a-liu", "p-purgas", "politica", "Fue uno de los dirigentes destituidos y perseguidos.", ["macfarquhar-schoenhals2006"]),
  r("a-lin", "ev-1969", "politica", "El Congreso lo designó sucesor de Mao.", ["cambridge15"]),
  r("a-mao", "ev-1969", "politica", "Presidió el Congreso que incorporó su pensamiento al estatuto del Partido.", ["cambridge15"]),
  r("a-lin", "ev-1971", "politica", "Murió el 13 de septiembre de 1971 en un accidente aéreo.", ["macfarquhar-schoenhals2006"]),
  r("a-mao", "ev-1971", "politica", "Según la versión oficial, el supuesto complot de Lin Biao iba dirigido contra él.", ["macfarquhar-schoenhals2006"]),
  r("a-nixon", "ev-1972", "politica", "Visitó China entre el 21 y el 28 de febrero de 1972.", ["comunicado-shanghai", "macmillan2007"]),
  r("a-mao", "ev-1972", "politica", "Recibió a Nixon durante su visita.", ["macmillan2007"]),
  r("a-zhou", "ev-1972", "politica", "Participó en las negociaciones que condujeron al Comunicado de Shanghái.", ["comunicado-shanghai", "macmillan2007"]),
  r("a-mao", "ev-1976", "politica", "Murió el 9 de septiembre de 1976.", ["resolucion-1981"]),
  r("a-jiang", "ev-1976", "politica", "Fue detenida en octubre de 1976 junto con otros tres dirigentes.", ["macfarquhar-schoenhals2006"]),
  r("a-deng", "ec-reformas", "politica", "Encabezó las reformas iniciadas en 1978.", ["cambridge15"]),
];
