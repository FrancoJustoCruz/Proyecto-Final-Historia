# Decisiones técnicas

- **Sin frameworks.** HTML, CSS y JS puro con ES Modules; SVG para la red.
- **Header y footer como parciales.** Evita repetir el menú en cada página. Los contenedores `#site-header` y `#site-footer` usan `display: contents` para que el header `sticky` se mantenga fijo (si el contenedor conserva su propia caja, el header deja de pegarse).
- **Rutas con `data-root`.** Cada página indica su profundidad; las imágenes y parciales se resuelven con ese prefijo.
- **Datos separados de la lógica.** Eventos, nodos, relaciones y fuentes viven en archivos de datos; añadir contenido no exige tocar el código de render.
- **Disposición de la red como función pura** (`network-layout.js`): columnas por categoría, eventos en orden cronológico y el resto por baricentro. Se recalcula al filtrar.
- **Relaciones con justificación.** Cada conexión lleva nota y fuentes; el tipo «cronológica» se usa solo cuando hay una sucesión documentada y no afirma causalidad.
- **Desplazamientos controlados.** Las pestañas y la barra de capítulos desplazan solo su contenedor horizontal, nunca la página.
- **Accesibilidad.** Enlace de salto, `main` único, pestañas con navegación por teclado, acordeones con `aria-expanded`, nodos de la red enfocables, `prefers-reduced-motion` respetado y contraste AA verificado con axe.
- **Rejillas móviles con `minmax(0, 1fr)`.** Evita que un hijo con contenido ancho (por ejemplo una tira de pestañas) ensanche toda la página.
- **Fuentes tipográficas** desde Google Fonts con alternativas del sistema. Si quieres funcionar sin conexión, descarga las fuentes a `assets/fonts/` y sustituye el `@import` de `css/base/typography.css`.
