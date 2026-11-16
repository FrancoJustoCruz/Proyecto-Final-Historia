import { $ } from "../../core/utils.js";
import { EVENTOS } from "./timeline-data.js";
import { renderFilters, renderTrack, renderCards, renderPanel } from "./timeline-render.js";

export function createTimeline() {
  const root = $("#cronologia-app");
  if (!root) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = reduce ? "auto" : "smooth";
  const panelEl = $("#chrono-panel");
  const refs = {
    fecha: $("#panel-fecha"), titulo: $("#panel-titulo"), descripcion: $("#panel-descripcion"),
    actores: $("#panel-actores"), consecuencias: $("#panel-consecuencias"), fuentes: $("#panel-fuentes"),
    foto: $("#panel-foto"), contador: $("#chrono-count"), prev: $("#chrono-prev"), next: $("#chrono-next"),
  };

  const state = { activo: null, filtro: "todos" };
  const visibles = () => EVENTOS.filter((e) => state.filtro === "todos" || e.categorias.includes(state.filtro));
  const existe = (id) => EVENTOS.some((e) => e.id === id);

  const filtros = renderFilters($("#chrono-filters"), (f) => setFiltro(f));
  const track = renderTrack($("#chrono-scroller"), EVENTOS, (id) => select(id, { scroll: "auto" }));
  const cards = renderCards($("#chrono-cards"), EVENTOS, (id) => select(id, { scroll: "always" }));

  function panelNecesitaScroll(modo) {
    if (modo === "always") return true;
    if (modo !== "auto") return false;
    return panelEl.getBoundingClientRect().top > window.innerHeight * 0.7;
  }

  function select(id, { scroll = false, hash = true } = {}) {
    if (!existe(id)) return;
    if (!visibles().some((e) => e.id === id)) applyFiltro("todos");
    const evento = EVENTOS.find((e) => e.id === id);
    const lista = visibles();
    state.activo = id;

    track.setActive(id, behavior);
    cards.setActive(id);
    renderPanel(refs, evento, lista.findIndex((e) => e.id === id), lista.length);
    if (!reduce) panelEl.animate([{ opacity: 0, transform: "translateY(.5rem)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "cubic-bezier(.22,.61,.36,1)" });
    if (hash) history.replaceState(null, "", `#${id}`);
    if (panelNecesitaScroll(scroll)) panelEl.scrollIntoView({ behavior, block: "start" });
  }

  function applyFiltro(f) {
    state.filtro = f;
    const ids = new Set(visibles().map((e) => e.id));
    filtros.setActive(f);
    track.setVisible(ids);
    cards.setVisible(ids);
  }

  function setFiltro(f) {
    applyFiltro(f);
    const lista = visibles();
    if (lista.some((e) => e.id === state.activo)) select(state.activo, { hash: false });
    else select(lista[0].id);
  }

  function step(delta) {
    const lista = visibles();
    const i = lista.findIndex((e) => e.id === state.activo);
    const destino = lista[i + delta];
    if (destino) select(destino.id);
  }

  refs.prev.addEventListener("click", () => step(-1));
  refs.next.addEventListener("click", () => step(1));
  root.addEventListener("keydown", (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    if (ev.key === "ArrowRight") { ev.preventDefault(); step(1); }
    if (ev.key === "ArrowLeft") { ev.preventDefault(); step(-1); }
  });
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (existe(id) && id !== state.activo) select(id, { scroll: "always", hash: false });
  });

  applyFiltro("todos");
  const inicial = location.hash.slice(1);
  if (existe(inicial)) select(inicial, { scroll: "always", hash: false });
  else select(EVENTOS[0].id, { hash: false });
}
