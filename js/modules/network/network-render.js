import { h } from "../timeline/timeline-render.js";
import { FUENTES } from "../timeline/timeline-data.js";
import { TIPOS_NODO, TIPOS_RELACION } from "./network-data.js";
import { LABEL_X, NODE_R, edgePath, shapePath, wrapLabel } from "./network-layout.js";

const SVG_NS = "http://www.w3.org/2000/svg";
function s(tag, attrs = {}, ...children) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null && v !== false) node.setAttribute(k, v);
  node.append(...children.flat().filter((c) => c != null));
  return node;
}

/* ---------- Grafo ---------- */
export function buildGraph(svg, nodos, relaciones) {
  const porId = new Map(nodos.map((n) => [n.id, n]));
  const defs = s("defs");
  Object.values(TIPOS_RELACION).forEach((t) => {
    if (!t.flecha) return;
    defs.append(s("marker", { id: `arrow-${t.id}`, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 9, markerHeight: 9, markerUnits: "userSpaceOnUse", orient: "auto" },
      s("path", { d: "M0 0 L10 5 L0 10 z", fill: t.color })));
  });

  const edgesG = s("g", { class: "net-edges" });
  const nodesG = s("g", { class: "net-nodes" });
  const viewport = s("g", { class: "net-viewport" }, edgesG, nodesG);
  svg.replaceChildren(defs, viewport);

  const edgeEls = relaciones.map((rel) => {
    const t = TIPOS_RELACION[rel.tipo];
    const flecha = t.flecha ? "→" : "↔";
    const el = s("path", {
      class: `net-edge rel-${rel.tipo}`, fill: "none", stroke: t.color, "stroke-width": t.ancho,
      "stroke-dasharray": t.dash, "stroke-linecap": "round", "marker-end": t.flecha ? `url(#arrow-${t.id})` : null,
    }, s("title", {}, `${t.nombre}: ${porId.get(rel.origen).label} ${flecha} ${porId.get(rel.destino).label}. ${rel.nota}`));
    edgesG.append(el);
    return { el, rel };
  });

  const nodeEls = new Map();
  nodos.forEach((n) => {
    const t = TIPOS_NODO[n.tipo];
    const lines = wrapLabel(n.label);
    const text = s("text", { class: "net-label", x: LABEL_X, y: 0 });
    lines.forEach((line, i) => text.append(s("tspan", { x: LABEL_X, dy: i === 0 ? `${0.35 - (lines.length - 1) * 0.55}em` : "1.1em" }, line)));
    const g = s("g", { class: "net-node", "data-id": n.id, tabindex: 0, role: "button", "aria-label": `${t.nombre}: ${n.label}` },
      s("circle", { class: "net-ring", r: NODE_R + 8 }),
      s("path", { class: "net-shape", d: shapePath(t.forma), fill: t.color }),
      s("rect", { class: "net-label-bg", rx: 3 }),
      text);
    nodesG.append(g);
    nodeEls.set(n.id, g);
  });

  const graph = { viewport, nodeEls, edgeEls };
  sizeLabelPlates(graph);
  document.fonts?.ready.then(() => sizeLabelPlates(graph));
  return graph;
}

// Placa opaca tras cada etiqueta: las líneas pasan por detrás y el texto se lee.
export function sizeLabelPlates(graph) {
  graph.nodeEls.forEach((g) => {
    const text = g.querySelector(".net-label"), bg = g.querySelector(".net-label-bg");
    try {
      const b = text.getBBox();
      if (!b.width) return;
      bg.setAttribute("x", b.x - 5);
      bg.setAttribute("y", b.y - 2);
      bg.setAttribute("width", b.width + 10);
      bg.setAttribute("height", b.height + 4);
    } catch { /* sin layout disponible */ }
  });
}

export function setPositions(graph, pos) {
  graph.nodeEls.forEach((el, id) => {
    const p = pos.get(id);
    if (p) el.setAttribute("transform", `translate(${p.x} ${p.y})`);
  });
  graph.edgeEls.forEach(({ el, rel }) => {
    const a = pos.get(rel.origen), b = pos.get(rel.destino);
    if (a && b) el.setAttribute("d", edgePath(a, b, NODE_R, TIPOS_RELACION[rel.tipo].flecha));
  });
}

/* ---------- Filtros y leyenda ---------- */
function swatch(forma, color) {
  return s("svg", { class: "swatch", viewBox: "-16 -16 32 32", width: 22, height: 22, "aria-hidden": "true" },
    s("path", { d: shapePath(forma, 11), fill: color }));
}

export function renderCategoryFilters(container, nodos, onToggle) {
  const botones = new Map();
  Object.values(TIPOS_NODO).forEach((t) => {
    const total = nodos.filter((n) => n.tipo === t.id).length;
    const b = h("button", { class: "chip chip--cat", type: "button", "aria-pressed": "true" }, swatch(t.forma, t.color), `${t.nombre} `, h("span", { class: "chip-count", text: total }));
    b.addEventListener("click", () => onToggle(t.id));
    botones.set(t.id, b);
  });
  container.replaceChildren(...botones.values());
  return { setState(set) { botones.forEach((b, id) => b.setAttribute("aria-pressed", String(set.has(id)))); } };
}

export function renderLegend(container, onToggle) {
  const botones = new Map();
  Object.values(TIPOS_RELACION).forEach((t) => {
    const linea = s("svg", { class: "legend-line", viewBox: "0 0 48 10", width: 48, height: 10, "aria-hidden": "true" },
      s("line", { x1: 2, y1: 5, x2: t.flecha ? 40 : 46, y2: 5, stroke: t.color, "stroke-width": t.ancho, "stroke-dasharray": t.dash, "stroke-linecap": "round" }),
      t.flecha ? s("path", { d: "M38 1 L47 5 L38 9 z", fill: t.color }) : null);
    const b = h("button", { class: "legend-item", type: "button", "aria-pressed": "true" },
      linea, h("span", {}, h("strong", { text: t.nombre }), h("span", { class: "legend-desc", text: t.desc })));
    b.addEventListener("click", () => onToggle(t.id));
    botones.set(t.id, b);
  });
  container.replaceChildren(...botones.values());
  return { setState(set) { botones.forEach((b, id) => b.setAttribute("aria-pressed", String(set.has(id)))); } };
}

/* ---------- Panel contextual ---------- */
export function renderPanelEmpty(panel) {
  panel.replaceChildren(
    h("h2", { text: "Selecciona un nodo" }),
    h("p", { text: "Al elegir una causa, un acontecimiento, un actor o una consecuencia verás su descripción, sus conexiones y las fuentes que respaldan cada relación." }),
    h("p", { class: "muted", text: "Las conexiones se destacan en la red; el resto se atenúa." }));
}

export function renderPanelNode(panel, { nodo, conexiones, fuentes }, onGo) {
  const t = TIPOS_NODO[nodo.tipo];
  const grupos = Object.values(TIPOS_RELACION).map((rt) => ({ rt, lista: conexiones.filter((c) => c.rel.tipo === rt.id) })).filter((g) => g.lista.length);

  panel.replaceChildren(
    h("p", { class: "net-tag" }, swatch(t.forma, t.color), t.nombre),
    h("h2", { text: nodo.label }),
    nodo.fechas ? h("p", { class: "net-dates", text: nodo.fechas }) : null,
    h("p", { text: nodo.desc }),
    nodo.timeline ? h("a", { class: "btn btn--ghost net-link", href: `cronologia.html#${nodo.timeline}`, text: "Ver en la cronología" }) : null,
    h("section", { class: "net-conns" },
      h("h3", { text: `Conexiones (${conexiones.length})` }),
      conexiones.length ? grupos.map(({ rt, lista }) => h("div", { class: "conn-group" },
        h("h4", { text: rt.nombre }),
        h("ul", {}, lista.map(({ otro, dir, rel }) => {
          const b = h("button", { type: "button", class: "conn" },
            h("span", { class: "conn-name", text: `${rt.flecha ? (dir === "sale" ? "→" : "←") : "↔"} ${otro.label}` }),
            h("span", { class: "conn-note", text: rel.nota }));
          b.addEventListener("click", () => onGo(otro.id));
          return h("li", {}, b);
        })))) : h("p", { class: "muted", text: "Sin conexiones visibles con los filtros actuales." })),
    fuentes.length ? h("section", { class: "net-sources" },
      h("h3", { text: "Fuentes" }),
      h("ul", {}, fuentes.map((id) => h("li", { text: FUENTES[id].cita })))) : null);
}
