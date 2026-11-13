# Arquitectura y estructura HTML

## 1. Arquitectura general de la página

La página web está desarrollada utilizando HTML5 semántico, CSS3 y JavaScript puro. Su arquitectura se organiza en tres elementos principales:

* **Header:** contiene la identidad del proyecto y la navegación principal.
* **Main:** alberga las siete secciones que conforman el contenido histórico e interactivo.
* **Footer:** contiene los créditos, información del equipo y elementos de cierre del proyecto.

La estructura busca mantener una organización clara, facilitar el mantenimiento del código y permitir la integración de componentes interactivos.

## 2. Secciones de la página

La página está dividida en siete secciones principales:

### 2.1. Inicio

Presenta el proyecto mediante el título, el período histórico estudiado (1949-1976), los integrantes del equipo y la pregunta central de investigación:

¿Hasta qué punto el maoísmo transformó la sociedad, la economía y la política de China entre 1949 y 1976, y cuáles fueron los costos humanos y sociales de esa transformación?

### 2.2. Contexto histórico

Expone los antecedentes y principales acontecimientos del maoísmo en China, incluyendo la fundación de la República Popular China, la consolidación del poder de Mao Zedong y las principales transformaciones políticas, económicas y sociales.

### 2.3. Red de relaciones históricas

Contiene el espacio destinado a representar las conexiones entre las causas, los acontecimientos, los actores históricos y las consecuencias del maoísmo.

Su implementación interactiva se realiza mediante JavaScript.

### 2.4. Producción audiovisual

Incorpora el documental original elaborado por el equipo mediante el elemento multimedia nativo de HTML5. También contempla información descriptiva y recursos complementarios del video.

### 2.5. Línea de tiempo

Presenta cronológicamente los acontecimientos más relevantes del período 1949-1976. Su contenido se encuentra preparado para una implementación dinámica mediante JavaScript.

### 2.6. Conclusiones

Desarrolla una interpretación histórica sobre el alcance de las transformaciones impulsadas por el maoísmo, considerando sus dimensiones políticas, económicas y sociales, así como sus costos humanos.

### 2.7. Fuentes bibliográficas

Reúne las referencias documentales, académicas e institucionales utilizadas para elaborar el contenido histórico de la página.

## 3. Estructura de archivos

El proyecto utiliza la siguiente organización:

```text
maoismo-china/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── main.js
│   ├── timeline.js
│   └── network.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── video/
│
└── README.md
```

Cada directorio tiene una responsabilidad específica:

| Archivo o directorio | Responsabilidad                            |
| -------------------- | ------------------------------------------ |
| index.html           | Estructura y contenido de la página.       |
| css/styles.css       | Diseño visual y adaptación responsive.     |
| js/main.js           | Funcionalidades generales.                 |
| js/timeline.js       | Lógica de la línea de tiempo.              |
| js/network.js        | Lógica de la red de relaciones históricas. |
| assets/images/       | Imágenes y material gráfico.               |
| assets/icons/        | Iconos utilizados en la interfaz.          |
| assets/video/        | Recursos audiovisuales.                    |
| README.md            | Documentación técnica del proyecto.        |

## 4. Decisiones técnicas

Durante la planificación y desarrollo se establecieron las siguientes decisiones:

| Aspecto                | Tecnología o criterio                                       |
| ---------------------- | ----------------------------------------------------------- |
| Lenguaje de estructura | HTML5                                                       |
| Lenguaje de estilos    | CSS3                                                        |
| Interactividad         | JavaScript puro                                             |
| Frameworks             | No se utilizan frameworks externos.                         |
| Semántica              | Elementos semánticos de HTML5.                              |
| Navegación             | Enlaces internos entre secciones.                           |
| Multimedia             | Elementos nativos de HTML5.                                 |
| Accesibilidad          | Atributos descriptivos y navegación accesible.              |
| Adaptabilidad          | Diseño responsive.                                          |
| Organización           | Separación entre estructura, presentación y comportamiento. |

Se prioriza una implementación ligera, comprensible y mantenible, evitando dependencias innecesarias.

## 5. Orden de desarrollo

El desarrollo del proyecto se organiza en las siguientes etapas:

1. **Arquitectura HTML:** definición de la estructura general del documento y sus secciones.
2. **Navegación:** organización de la cabecera y los enlaces internos.
3. **Contenido histórico:** incorporación de los textos y recursos de investigación.
4. **Componentes interactivos:** preparación e implementación de la red de relaciones históricas y la línea de tiempo.
5. **Producción audiovisual:** integración del documental elaborado por el equipo.
6. **Conclusiones y bibliografía:** incorporación del análisis final y las referencias documentales.
7. **Revisión técnica:** comprobación de la semántica, accesibilidad, funcionamiento y organización del código.

Esta organización permite desarrollar cada componente de manera independiente y facilita su posterior integración en la página web.

