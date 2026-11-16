// Datos de la cronología. Cada evento remite a fuentes por id (ver FUENTES).
// Antes de publicar: verificar ediciones, añadir páginas/URL y revisar cada afirmación.

export const RANGO = { inicio: 1949, fin: 1976 };

export const CATEGORIAS = [
  { id: "politica", nombre: "Política" },
  { id: "economia", nombre: "Economía" },
  { id: "sociedad", nombre: "Sociedad" },
  { id: "internacional", nombre: "Relaciones internacionales" },
];

export const FUENTES = {
  "ley-agraria-1950": { tipo: "primaria", cita: "Ley de Reforma Agraria de la República Popular China, promulgada el 28 de junio de 1950." },
  "resolucion-comunas-1958": { tipo: "primaria", cita: "Resolución del Comité Central del PCCh sobre el establecimiento de comunas populares en las zonas rurales, 29 de agosto de 1958." },
  "circular-516": { tipo: "primaria", cita: "Circular del Comité Central del PCCh del 16 de mayo de 1966." },
  "decision-16-puntos": { tipo: "primaria", cita: "Decisión del Comité Central del PCCh sobre la Gran Revolución Cultural Proletaria («Dieciséis Puntos»), 8 de agosto de 1966." },
  "comunicado-shanghai": { tipo: "primaria", cita: "Comunicado conjunto de Estados Unidos y la República Popular China (Comunicado de Shanghái), 27 de febrero de 1972." },
  "resolucion-1981": { tipo: "primaria", cita: "Resolución del Comité Central del PCCh sobre ciertas cuestiones de la historia de nuestro Partido desde la fundación de la República Popular China, 27 de junio de 1981." },
  "westad2003": { tipo: "secundaria", cita: "Westad, Odd Arne. Decisive Encounters: The Chinese Civil War, 1946–1950. Stanford: Stanford University Press, 2003." },
  "chen2001": { tipo: "secundaria", cita: "Chen Jian. Mao's China and the Cold War. Chapel Hill: University of North Carolina Press, 2001." },
  "walder2015": { tipo: "secundaria", cita: "Walder, Andrew G. China Under Mao: A Revolution Derailed. Cambridge, MA: Harvard University Press, 2015." },
  "cambridge14": { tipo: "secundaria", cita: "MacFarquhar, Roderick y John K. Fairbank (eds.). The Cambridge History of China, vol. 14: The People's Republic, Part 1: The Emergence of Revolutionary China, 1949–1965. Cambridge: Cambridge University Press, 1987." },
  "cambridge15": { tipo: "secundaria", cita: "MacFarquhar, Roderick y John K. Fairbank (eds.). The Cambridge History of China, vol. 15: The People's Republic, Part 2: Revolutions Within the Chinese Revolution, 1966–1982. Cambridge: Cambridge University Press, 1991." },
  "macfarquhar-origins1": { tipo: "secundaria", cita: "MacFarquhar, Roderick. The Origins of the Cultural Revolution, vol. 1: Contradictions Among the People, 1956–1957. Nueva York: Columbia University Press, 1974." },
  "macfarquhar-origins2": { tipo: "secundaria", cita: "MacFarquhar, Roderick. The Origins of the Cultural Revolution, vol. 2: The Great Leap Forward, 1958–1960. Nueva York: Columbia University Press, 1983." },
  "dikotter2010": { tipo: "secundaria", cita: "Dikötter, Frank. Mao's Great Famine: The History of China's Most Devastating Catastrophe, 1958–1962. Londres: Bloomsbury, 2010." },
  "macfarquhar-schoenhals2006": { tipo: "secundaria", cita: "MacFarquhar, Roderick y Michael Schoenhals. Mao's Last Revolution. Cambridge, MA: Belknap Press de Harvard University Press, 2006." },
  "macmillan2007": { tipo: "secundaria", cita: "MacMillan, Margaret. Nixon and Mao: The Week That Changed the World. Nueva York: Random House, 2007." },
};

export const EVENTOS = [
  {
    id: "1949", inicio: 1949, fecha: "1 de octubre de 1949",
    titulo: "Fundación de la República Popular China", etiqueta: "Fundación de la RPC",
    resumen: "Mao Zedong proclama en Pekín la República Popular tras la victoria comunista en la guerra civil.",
    categorias: ["politica", "internacional"],
    descripcion: [
      "El 1 de octubre de 1949, desde la puerta de Tiananmen en Pekín, Mao Zedong proclamó la República Popular China. La proclamación siguió a la victoria del Partido Comunista de China (PCCh) sobre el Guomindang en la guerra civil.",
      "El gobierno nacionalista se replegó a la isla de Taiwán a finales de ese año. El nuevo Estado quedó organizado bajo la dirección del PCCh.",
    ],
    actores: ["Mao Zedong", "Zhou Enlai (primer ministro del nuevo gobierno)", "Partido Comunista de China", "Guomindang y Chiang Kai-shek"],
    consecuencias: [
      "Se instaura un Estado dirigido por el PCCh en la China continental.",
      "El gobierno nacionalista continúa en Taiwán, origen de una disputa que sigue abierta.",
      "El nuevo Estado se alinea con la Unión Soviética, con la que firma un tratado en febrero de 1950.",
    ],
    fuentes: ["westad2003", "cambridge14"],
  },
  {
    id: "1950", inicio: 1950, fin: 1953, fecha: "1950–1953",
    titulo: "Reforma agraria y primeras transformaciones", etiqueta: "Reforma agraria",
    resumen: "Redistribución de la tierra, guerra de Corea y primeras campañas de masas.",
    categorias: ["economia", "sociedad", "internacional"],
    descripcion: [
      "En junio de 1950 se promulgó la Ley de Reforma Agraria, que dispuso la confiscación de las tierras de los terratenientes y su redistribución entre familias campesinas. El proceso se acompañó de reuniones de acusación pública y de episodios de violencia contra terratenientes; su alcance y las cifras de víctimas son objeto de debate historiográfico.",
      "En octubre de 1950 los Voluntarios del Pueblo Chino entraron en la guerra de Corea, que terminó con el armisticio de julio de 1953.",
    ],
    actores: ["Mao Zedong", "Peng Dehuai (comandante de los Voluntarios en Corea)", "Equipos de reforma agraria del PCCh", "Familias campesinas y terratenientes"],
    consecuencias: [
      "Se reorganiza la propiedad de la tierra en el campo.",
      "La participación en Corea enfrenta a China con Estados Unidos y refuerza su alianza con la Unión Soviética.",
      "Se lanzan campañas de masas, como las de los «tres anti» y los «cinco anti» (1951–1952).",
    ],
    fuentes: ["ley-agraria-1950", "chen2001", "cambridge14"],
  },
  {
    id: "1953", inicio: 1953, fin: 1957, fecha: "1953–1957",
    titulo: "Primer Plan Quinquenal", etiqueta: "Primer Plan Quinquenal",
    resumen: "Prioridad a la industria pesada, asistencia soviética y colectivización del campo.",
    categorias: ["economia"],
    descripcion: [
      "Entre 1953 y 1957 China aplicó su Primer Plan Quinquenal, con prioridad a la industria pesada y con asistencia técnica soviética.",
      "En el campo avanzó la formación de cooperativas agrícolas, y entre 1955 y 1956 la colectivización se aceleró.",
    ],
    actores: ["Mao Zedong", "Zhou Enlai", "Comisión Estatal de Planificación", "Asesores y técnicos soviéticos"],
    consecuencias: [
      "Se crea una base de industria pesada de propiedad estatal.",
      "El campo se organiza en cooperativas y luego en colectivos.",
      "Hacia 1956 la industria y el comercio privados pasan a empresas mixtas estatales-privadas.",
    ],
    fuentes: ["cambridge14", "walder2015"],
  },
  {
    id: "1957", inicio: 1957, fecha: "1957",
    titulo: "Cien Flores y Campaña Antiderechista", etiqueta: "Campaña Antiderechista",
    resumen: "Tras invitar a la crítica, el Partido reprime a quienes fueron calificados de «derechistas».",
    categorias: ["politica", "sociedad"],
    descripcion: [
      "A comienzos de 1957 el Partido invitó a intelectuales y ciudadanos a criticar a los cuadros durante la llamada campaña de las Cien Flores. Ante la dureza de las críticas, desde mediados de año se lanzó la Campaña Antiderechista contra quienes fueron calificados de «derechistas».",
      "Muchas de esas personas perdieron sus cargos o fueron enviadas a trabajar al campo o a reeducación por el trabajo.",
    ],
    actores: ["Mao Zedong", "Deng Xiaoping (secretario general del Partido, participó en la dirección de la campaña)", "Intelectuales y profesionales"],
    consecuencias: [
      "Se reduce el margen para la crítica pública.",
      "Según varios historiadores, el clima político resultante prepara el terreno del Gran Salto Adelante.",
    ],
    fuentes: ["macfarquhar-origins1", "walder2015"],
  },
  {
    id: "1958", inicio: 1958, fecha: "1958",
    titulo: "Inicio del Gran Salto Adelante", etiqueta: "Gran Salto Adelante",
    resumen: "Campaña de industrialización acelerada y comunas populares en el campo.",
    categorias: ["economia", "sociedad"],
    descripcion: [
      "En 1958 el Partido lanzó el Gran Salto Adelante, una campaña para aumentar de forma acelerada la producción industrial y agrícola. En el campo, las cooperativas se fusionaron en comunas populares, formalizadas por una resolución del Comité Central en agosto de 1958.",
      "La campaña incluyó la producción de acero en hornos locales y metas de producción fijadas desde arriba.",
    ],
    actores: ["Mao Zedong", "Liu Shaoqi (vicepresidente del Partido)", "Zhou Enlai", "Cuadros locales y campesinos de las comunas"],
    consecuencias: [
      "La vida rural se reorganiza en comunas, con trabajo y comedores colectivos.",
      "Se desorganizan la producción y la distribución de alimentos.",
      "Se crean las condiciones de la crisis de 1959–1961.",
    ],
    fuentes: ["resolucion-comunas-1958", "macfarquhar-origins2"],
  },
  {
    id: "1959", inicio: 1959, fin: 1961, fecha: "1959–1961",
    titulo: "Crisis y hambruna asociadas al Gran Salto Adelante", etiqueta: "Crisis y hambruna",
    resumen: "Escasez de alimentos de gran escala; las estimaciones de víctimas varían y se discuten.",
    categorias: ["sociedad", "economia", "politica"],
    descripcion: [
      "Entre 1959 y 1961 China sufrió una grave escasez de alimentos y una hambruna de gran escala. La historiografía la asocia a las políticas del Gran Salto Adelante, a factores climáticos y a la sobreestimación de las cosechas por parte de las autoridades locales.",
      "En la Conferencia de Lushan (julio–agosto de 1959), el ministro de Defensa Peng Dehuai criticó las políticas del Salto y fue destituido; lo sustituyó Lin Biao. Las estimaciones de muertes varían mucho según el método y el estudio, y siguen siendo objeto de debate.",
    ],
    actores: ["Mao Zedong", "Peng Dehuai", "Lin Biao", "Liu Shaoqi y Deng Xiaoping (impulsaron medidas de recuperación)", "Población rural"],
    consecuencias: [
      "Desde 1961 se aplican medidas de reajuste, incluida la flexibilización del régimen de comunas.",
      "En enero de 1962, en la Conferencia de los Siete Mil Cuadros, Mao hace una autocrítica parcial.",
      "Surgen diferencias entre Mao y otros dirigentes sobre el rumbo del país, que influirán en 1966.",
    ],
    fuentes: ["dikotter2010", "macfarquhar-origins2", "resolucion-1981"],
  },
  {
    id: "1966", inicio: 1966, fecha: "Mayo–agosto de 1966",
    titulo: "Inicio de la Revolución Cultural", etiqueta: "Revolución Cultural",
    resumen: "Movimiento político que alteró las instituciones del Partido y del Estado hasta 1976.",
    categorias: ["politica", "sociedad"],
    descripcion: [
      "En mayo de 1966 el Comité Central difundió la «Circular del 16 de mayo» y se formó el Grupo de la Revolución Cultural. En agosto, un pleno del Comité Central aprobó la decisión de los «Dieciséis Puntos» sobre la Gran Revolución Cultural Proletaria.",
      "Estudiantes organizados como Guardias Rojos atacaron a dirigentes, maestros y símbolos de la «vieja cultura»; Mao los recibió en la plaza de Tiananmen desde agosto.",
    ],
    actores: ["Mao Zedong", "Lin Biao", "Jiang Qing", "Chen Boda", "Liu Shaoqi (blanco de los ataques)", "Guardias Rojos"],
    consecuencias: [
      "Escuelas y universidades cierran durante años.",
      "Dirigentes del Partido y del Estado son destituidos, entre ellos Liu Shaoqi.",
      "Hay violencia, persecuciones y destrucción de patrimonio cultural; la magnitud de las víctimas sigue siendo estudiada.",
      "En 1981 el Partido condenó oficialmente la Revolución Cultural en una resolución.",
    ],
    fuentes: ["circular-516", "decision-16-puntos", "macfarquhar-schoenhals2006"],
  },
  {
    id: "1969", inicio: 1969, fecha: "Abril de 1969",
    titulo: "IX Congreso del Partido Comunista de China", etiqueta: "IX Congreso del PCCh",
    resumen: "Primer congreso desde 1956; Lin Biao es designado sucesor de Mao.",
    categorias: ["politica"],
    descripcion: [
      "En abril de 1969 se reunió el IX Congreso, el primero desde 1956. Aprobó un nuevo estatuto del Partido que incorporó el Pensamiento de Mao Zedong como guía y designó a Lin Biao como sucesor de Mao.",
      "El Congreso reflejó el mayor peso del Ejército Popular de Liberación en la dirección política tras los años más turbulentos de la Revolución Cultural.",
    ],
    actores: ["Mao Zedong", "Lin Biao", "Zhou Enlai", "Jiang Qing", "Ejército Popular de Liberación"],
    consecuencias: [
      "Se reconstruyen los órganos del Partido tras la fase más violenta de la Revolución Cultural.",
      "La designación de Lin Biao como sucesor sienta las bases de la crisis de 1971.",
    ],
    fuentes: ["macfarquhar-schoenhals2006", "cambridge15"],
  },
  {
    id: "1971", inicio: 1971, fecha: "13 de septiembre de 1971",
    titulo: "Muerte de Lin Biao", etiqueta: "Muerte de Lin Biao",
    resumen: "El sucesor designado de Mao muere en un accidente aéreo; sus circunstancias se discuten.",
    categorias: ["politica"],
    descripcion: [
      "El 13 de septiembre de 1971 murió Lin Biao cuando el avión en que viajaba se estrelló en Mongolia. La versión oficial sostuvo que había participado en un complot contra Mao y que huía hacia la Unión Soviética.",
      "Muchos detalles del episodio siguen siendo discutidos por la historiografía.",
    ],
    actores: ["Lin Biao", "Lin Liguo (su hijo)", "Mao Zedong", "Zhou Enlai"],
    consecuencias: [
      "Se debilita la credibilidad de la Revolución Cultural dentro del Partido.",
      "Zhou Enlai gana peso en la gestión diaria del gobierno.",
    ],
    fuentes: ["macfarquhar-schoenhals2006", "cambridge15"],
  },
  {
    id: "1972", inicio: 1972, fecha: "21–28 de febrero de 1972",
    titulo: "Visita de Richard Nixon a China", etiqueta: "Visita de Nixon",
    resumen: "Primera visita a China de un presidente estadounidense en funciones.",
    categorias: ["internacional", "politica"],
    descripcion: [
      "Entre el 21 y el 28 de febrero de 1972, el presidente de Estados Unidos, Richard Nixon, visitó China y se reunió con Mao Zedong y Zhou Enlai. Fue la primera visita de un presidente estadounidense en funciones a la República Popular.",
      "La visita concluyó con el Comunicado de Shanghái, en el que ambos países expusieron sus posiciones, incluida la cuestión de Taiwán.",
    ],
    actores: ["Richard Nixon", "Mao Zedong", "Zhou Enlai", "Henry Kissinger"],
    consecuencias: [
      "Comienza la normalización de las relaciones; las relaciones diplomáticas plenas llegan en 1979.",
      "Cambia el equilibrio de la Guerra Fría frente a la Unión Soviética.",
    ],
    fuentes: ["comunicado-shanghai", "macmillan2007"],
  },
  {
    id: "1976", inicio: 1976, fecha: "9 de septiembre de 1976",
    titulo: "Muerte de Mao Zedong", etiqueta: "Muerte de Mao",
    resumen: "Mao fallece; semanas después es detenida la «Banda de los Cuatro».",
    categorias: ["politica"],
    descripcion: [
      "Mao Zedong murió el 9 de septiembre de 1976, meses después de la muerte de Zhou Enlai (enero) y de las protestas de abril en la plaza de Tiananmen.",
      "En octubre fueron detenidos Jiang Qing y otros tres dirigentes, conocidos como la «Banda de los Cuatro», y Hua Guofeng asumió la dirección del Partido.",
    ],
    actores: ["Mao Zedong", "Hua Guofeng", "Jiang Qing, Zhang Chunqiao, Yao Wenyuan y Wang Hongwen (Banda de los Cuatro)", "Deng Xiaoping"],
    consecuencias: [
      "Suele considerarse el final de la Revolución Cultural.",
      "Se abre una lucha de poder que conduce, desde 1978, a las reformas impulsadas por Deng Xiaoping.",
      "En 1981 el Partido evaluó oficialmente la etapa maoísta en una resolución.",
    ],
    fuentes: ["resolucion-1981", "macfarquhar-schoenhals2006"],
  },
];
