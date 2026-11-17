import { $ } from "../../core/utils.js";
import { NODOS, RELACIONES, TIPOS_NODO, TIPOS_RELACION } from "./network-data.js";
import { computeLayout } from "./network-layout.js";
import { buildGraph, setPositions, renderCategoryFilters, renderLegend, renderPanelEmpty, renderPanelNode } from "./network-render.js";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function createNetwork() {
  const stage = $("#net-stage"), svg = $("#net-svg"), panel = $("#net-panel");
  if (!stage || !svg || !panel) return;

  const state = { sel: null, hover: null, cats: new Set(Object.keys(TIPOS_NODO)), rels: new Set(Object.keys(TIPOS_RELACION)), layout: null };
  const view = { x: 0, y: 0, k: 1 };
  const porId = new Map(NODOS.map((n) => [n.id, n]));
  const graph = buildGraph(svg, NODOS, RELACIONES);
  const filtros = renderCategoryFilters($("#net-filters"), NODOS, toggleCat);
  const leyenda = renderLegend($("#net-legend-items"), toggleRel);
  const status = $("#net-status");

  /* ----- Vista (pan / zoom) ----- */
  const applyView = () => graph.viewport.setAttribute("transform", `translate(${view.x} ${view.y}) scale(${view.k})`);

  function zoomAt(cx, cy, factor) {
    const k = clamp(view.k * factor, 0.25, 2.5), f = k / view.k;
    view.x = cx - (cx - view.x) * f;
    view.y = cy - (cy - view.y) * f;
    view.k = k;
    applyView();
  }

  function fit(initial = false) {
    const { width, height } = state.layout;
    const W = stage.clientWidth, H = stage.clientHeight;
    const k = initial ? clamp(Math.min(W / width, H / height), 0.7, 1) : clamp(Math.min(W / width, H / height), 0.25, 1.2);
    view.k = k;
    view.x = Math.max(0, (W - width * k) / 2);
    view.y = Math.max(0, (H - height * k) / 2);
    applyView();
  }

  function panTo(id) {
    const p = state.layout.pos.get(id);
    if (!p) return;
    const W = stage.clientWidth, H = stage.clientHeight;
    const sx = view.x + p.x * view.k, sy = view.y + p.y * view.k;
    if (sx < 60 || sx > W - 160 || sy < 40 || sy > H - 40) {
      view.x = W / 2 - p.x * view.k - 60;
      view.y = H / 2 - p.y * view.k;
      applyView();
    }
  }

  /* ----- Visibilidad y disposición ----- */
  function relayout(fitView = true) {
    const visibles = NODOS.filter((n) => state.cats.has(n.tipo));
    const ids = new Set(visibles.map((n) => n.id));
    state.layout = computeLayout(visibles, RELACIONES);
    setPositions(graph, state.layout.pos);
    graph.nodeEls.forEach((el, id) => el.classList.toggle("is-hidden", !ids.has(id)));
    let aristas = 0;
    graph.edgeEls.forEach(({ el, rel }) => {
      const ok = ids.has(rel.origen) && ids.has(rel.destino) && state.rels.has(rel.tipo);
      el.classList.toggle("is-hidden", !ok);
      if (ok) aristas++;
    });
    filtros.setState(state.cats);
    leyenda.setState(state.rels);
    status.textContent = `Mostrando ${visibles.length} nodos y ${aristas} conexiones.`;
    if (state.sel && !ids.has(state.sel)) select(null, { hash: true });
    else if (state.sel) select(state.sel, { hash: false });
    else applyFocus();
    if (fitView) fit(true);
  }

  /* ----- Enfoque y selección ----- */
  function applyFocus() {
    const id = state.sel ?? state.hover;
    svg.classList.toggle("has-focus", Boolean(id));
    const linked = new Set(id ? [id] : []);
    graph.edgeEls.forEach(({ el, rel }) => {
      const on = Boolean(id) && (rel.origen === id || rel.destino === id) && !el.classList.contains("is-hidden");
      el.classList.toggle("is-linked", on);
      if (on) { linked.add(rel.origen); linked.add(rel.destino); }
    });
    graph.nodeEls.forEach((el, nid) => {
      el.classList.toggle("is-linked", linked.has(nid));
      el.classList.toggle("is-selected", nid === state.sel);
    });
  }

  function conexionesDe(id) {
    const visibles = (nid) => state.cats.has(porId.get(nid).tipo);
    return RELACIONES.filter((r) => (r.origen === id || r.destino === id) && state.rels.has(r.tipo))
      .map((rel) => ({ rel, dir: rel.origen === id ? "sale" : "entra", otro: porId.get(rel.origen === id ? rel.destino : rel.origen) }))
      .filter((c) => visibles(c.otro.id));
  }

  function select(id, { hash = true, center = false } = {}) {
    state.sel = id;
    applyFocus();
    if (id) {
      const nodo = porId.get(id);
      const conexiones = conexionesDe(id);
      const fuentes = [...new Set([...(nodo.fuentes ?? []), ...RELACIONES.filter((r) => r.origen === id || r.destino === id).flatMap((r) => r.fuentes)])];
      renderPanelNode(panel, { nodo, conexiones, fuentes }, (nid) => select(nid, { center: true }));
      if (center) panTo(id);
    } else renderPanelEmpty(panel);
    if (hash) history.replaceState(null, "", id ? `#${id}` : location.pathname + location.search);
  }

  /* ----- Filtros ----- */
  function toggleCat(id) {
    if (state.cats.has(id)) { if (state.cats.size > 1) state.cats.delete(id); }
    else state.cats.add(id);
    relayout();
  }
  function toggleRel(id) {
    if (state.rels.has(id)) { if (state.rels.size > 1) state.rels.delete(id); }
    else state.rels.add(id);
    relayout(false);
  }
  function soloEventosActores() {
    state.cats = new Set(["evento", "actor"]);
    relayout();
  }
  function reset() {
    state.cats = new Set(Object.keys(TIPOS_NODO));
    state.rels = new Set(Object.keys(TIPOS_RELACION));
    state.hover = null;
    state.sel = null;
    relayout();
    select(null);
  }

  /* ----- Interacción con el gráfico ----- */
  svg.addEventListener("click", (e) => {
    const n = e.target.closest(".net-node");
    if (n) select(n.dataset.id);
  });
  svg.addEventListener("keydown", (e) => {
    const n = e.target.closest?.(".net-node");
    if (n && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(n.dataset.id); }
  });
  svg.addEventListener("mouseover", (e) => {
    const n = e.target.closest(".net-node");
    const id = n && !n.classList.contains("is-hidden") ? n.dataset.id : null;
    if (id !== state.hover) { state.hover = id; applyFocus(); }
  });
  svg.addEventListener("mouseleave", () => { state.hover = null; applyFocus(); });
  stage.addEventListener("keydown", (e) => { if (e.key === "Escape") select(null); });

  const pointers = new Map();
  let pan = null, pinch = null;
  svg.addEventListener("pointerdown", (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) };
      pan = null;
    } else if (!e.target.closest(".net-node")) {
      pan = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
      svg.setPointerCapture(e.pointerId);
      stage.classList.add("is-panning");
    }
  });
  svg.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = stage.getBoundingClientRect();
      zoomAt((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, d / pinch.d);
      pinch.d = d;
    } else if (pan && pan.id === e.pointerId) {
      const dx = e.clientX - pan.x, dy = e.clientY - pan.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) pan.moved = true;
      view.x += dx; view.y += dy;
      pan.x = e.clientX; pan.y = e.clientY;
      applyView();
    }
  });
  const endPointer = (e) => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pan && pan.id === e.pointerId) {
      if (!pan.moved && e.type === "pointerup") select(null);
      pan = null;
      stage.classList.remove("is-panning");
    }
  };
  svg.addEventListener("pointerup", endPointer);
  svg.addEventListener("pointercancel", endPointer);
  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive: false });

  const centro = (f) => zoomAt(stage.clientWidth / 2, stage.clientHeight / 2, f);
  $("#net-zoom-in").addEventListener("click", () => centro(1.25));
  $("#net-zoom-out").addEventListener("click", () => centro(1 / 1.25));
  $("#net-fit").addEventListener("click", () => fit(false));
  $("#net-preset").addEventListener("click", soloEventosActores);
  $("#net-reset").addEventListener("click", reset);
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (porId.has(id) && id !== state.sel) select(id, { hash: false, center: true });
  });

  relayout();
  const inicial = location.hash.slice(1);
  if (porId.has(inicial)) select(inicial, { hash: false, center: true });
  else select(null, { hash: false });
}
