# El maoísmo en China, 1949–1976 · Archivo digital

Sitio académico multipágina en HTML5, CSS3 y JavaScript puro (ES Modules). Sin frameworks ni librerías externas.

## Cómo ejecutarlo

Los módulos JavaScript y la carga de `partials/` usan `fetch`, así que **no funcionan abriendo el archivo con doble clic**. Desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

y abre `http://localhost:8000`.

## Estado de las páginas

| Página | Estado |
|---|---|
| `index.html` | Completa |
| `pages/contexto.html` | Completa |
| `pages/cronologia.html` | Completa (11 hitos, filtros, panel, teclado, enlaces profundos) |
| `pages/red-historica.html` | Completa (44 nodos, 61 relaciones, filtros, zoom y desplazamiento) |
| `pages/consecuencias.html` | Completa |
| `pages/documental.html` | **Pendiente** (esqueleto con el mismo header y footer; sin video) |
| `pages/fuentes.html` | **Pendiente** (esqueleto; el catálogo ya existe en `js/modules/timeline/timeline-data.js`) |

## Imágenes pendientes

No se incluyen fotografías. Cada hueco muestra la ruta que espera. Guarda los archivos con estos nombres y completa crédito y licencia en cada pie de foto:

- `assets/images/backgrounds/`: `hero.jpg`, `contexto-hero.jpg`, `consecuencias-hero.jpg`
- `assets/images/historical/`: `1949.jpg`, `1950.jpg`, `1953.jpg`, `1957.jpg`, `1958.jpg`, `1959.jpg`, `1966.jpg`, `1969.jpg`, `1971.jpg`, `1972.jpg`, `1976.jpg` (cronología), `china-republica.jpg`, `guerra-civil.jpg`, `proclamacion-1949.jpg`, `campanas-masas.jpg`, `industria-comunas.jpg`, `vida-social.jpg`

Mientras falten, el navegador registra un 404 por cada una en la consola: es esperado.

## Rigor histórico

- Los hechos, relaciones y citas se limitan a lo documentado; no hay cifras sin fuente.
- Las citas llevan «traducción propia» y deben contrastarse con la edición citada.
- Las referencias de `FUENTES` son obras y documentos reales, pero **sin páginas ni URL**: verifícalas antes de publicar. Ver `docs/fuentes-historicas.md`.

## Pruebas

En `tests/` hay tres comprobaciones (requieren Python con Playwright y `npm i axe-core`):

```bash
python tests/static_audit.py      # enlaces, anclas, importaciones y recursos
python -m http.server 8765 &      # servidor para las pruebas dinámicas
python tests/e2e.py               # navegación, cronología, red, lectura, móvil y escritorio
python tests/axe_audit.py         # accesibilidad (WCAG 2.1 AA)
```

Más detalle en `docs/arquitectura.md` y `docs/decisiones-tecnicas.md`.
