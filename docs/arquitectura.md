# Arquitectura

## Estructura

```
index.html · pages/*.html        Páginas (contenido estático + módulos por página)
partials/header.html · footer.html   Header y footer compartidos (se inyectan con fetch)
css/base/        variables, reset, tipografía, animaciones compartidas
css/layout/      grid y superficies, header, navegación, footer
css/components/  botones y chips, tarjetas, línea secundaria, editorial (Contexto y Consecuencias)
css/pages/       estilos propios de cada página
js/core/         utils (selectores, h), loader (partials), navigation (menú y estado del header)
js/components/   accordion, editorial (capítulos, pestañas, lectura inmersiva, fuentes), reveal
js/modules/timeline/   datos, render y lógica de la cronología
js/modules/network/    datos, disposición (funciones puras), render SVG y lógica de la red
js/pages/        punto de entrada de cada página
js/main.js       carga el layout y el módulo de la página según data-page
```

## Flujo de arranque

1. Cada HTML declara `data-page` y `data-root` (`""` en la raíz, `"../"` en `pages/`).
2. `main.js` inyecta header y footer (`loader.js`), activa el menú (`navigation.js`) y carga `js/pages/<data-page>.js`.
3. El módulo de página llama a `init()`.

## Datos compartidos

`timeline-data.js` es la fuente única de **eventos**, **categorías** y **fuentes** (`FUENTES`). La red reutiliza los eventos y todas las páginas muestran sus referencias desde ese catálogo (`data-sources="id1 id2"`).

## Dependencias entre páginas

- Inicio, Contexto, Consecuencias y Red enlazan a la cronología con `cronologia.html#<id>`; la red acepta `red-historica.html#<id-de-nodo>`.
- Contexto y Consecuencias comparten `components/editorial.css` y `components/editorial.js`.
- Documental y Fuentes están pendientes; hoy usan `interior.css`.
