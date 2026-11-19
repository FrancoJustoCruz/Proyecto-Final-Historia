// Cuestionario con retroalimentación histórica.
import { PREGUNTAS, CATEGORIAS_QUIZ } from "./quiz-data.js";
import { FUENTES } from "../timeline/timeline-data.js";

const root = () => document.body.dataset.root ?? "";

function isValidNode(x) {
  return x !== null && x !== undefined && x !== false;
}

function el(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") node.className = String(v);
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  const cleanKids = kids
    .flat(Infinity)
    .filter(isValidNode)
    .map((item) => (typeof item === "string" || typeof item === "number" ? document.createTextNode(String(item)) : item));
  node.append(...cleanKids);
  return node;
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createQuiz() {
  const app = document.getElementById("quiz-app");
  if (!app) return;

  let state = null;

  function start(preguntas = PREGUNTAS) {
    const base = Array.isArray(preguntas) && preguntas.length ? preguntas : PREGUNTAS;
    state = {
      preguntas: shuffle(base).map((q) => ({
        ...q,
        opciones: shuffle(q.opciones.map((texto, i) => ({ texto, ok: i === q.correcta }))),
      })),
      i: 0,
      respondidas: [],
      bloqueada: false,
    };
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.preguntas[state.i];
    const total = state.preguntas.length;
    state.bloqueada = false;

    const progreso = el(
      "div",
      {
        class: "quiz-progress",
        role: "progressbar",
        "aria-valuemin": "1",
        "aria-valuemax": String(total),
        "aria-valuenow": String(state.i + 1),
        "aria-label": "Progreso del cuestionario",
      },
      el("span", { style: `width:${((state.i + 1) / total) * 100}%` })
    );

    const lista = el(
      "div",
      { class: "quiz-options", role: "group", "aria-labelledby": "quiz-pregunta" },
      q.opciones.map((op, idx) =>
        el(
          "button",
          { type: "button", class: "quiz-option", "data-index": String(idx), onclick: () => answer(idx) },
          el("span", { class: "quiz-key", "aria-hidden": "true" }, String(idx + 1)),
          el("span", { class: "quiz-option-text" }, op.texto)
        )
      )
    );

    app.replaceChildren(
      el(
        "div",
        { class: "quiz-meta" },
        el("span", { class: "quiz-count" }, `Pregunta ${state.i + 1} de ${total}`),
        el("span", { class: "quiz-cat" }, CATEGORIAS_QUIZ[q.categoria] ?? q.categoria)
      ),
      progreso,
      el("h2", { id: "quiz-pregunta", class: "quiz-question", tabindex: "-1" }, q.pregunta),
      lista,
      el("div", { id: "quiz-feedback", class: "quiz-feedback", role: "status", "aria-live": "polite" })
    );
    $focus("#quiz-pregunta");
  }

  function $focus(sel) {
    const n = app.querySelector(sel);
    if (n) n.focus({ preventScroll: false });
  }

  function answer(idx) {
    if (state.bloqueada) return;
    state.bloqueada = true;

    const q = state.preguntas[state.i];
    const acierto = q.opciones[idx].ok;
    state.respondidas.push({ q, acierto });

    app.querySelectorAll(".quiz-option").forEach((btn, i) => {
      const op = q.opciones[i];
      btn.setAttribute("aria-disabled", "true");
      if (op.ok) {
        btn.classList.add("is-correct");
        btn.append(el("span", { class: "quiz-mark" }, "✓ Correcta"));
      } else if (i === idx) {
        btn.classList.add("is-wrong");
        btn.append(el("span", { class: "quiz-mark" }, "✗ Tu respuesta"));
      }
    });

    renderFeedback(q, acierto);
  }

  function renderFeedback(q, acierto) {
    const box = document.getElementById("quiz-feedback");
    if (!box) return;
    const ultima = state.i === state.preguntas.length - 1;

    const listaFuentes = Array.isArray(q.fuentes)
      ? q.fuentes
          .filter((id) => typeof FUENTES === "object" && FUENTES !== null && FUENTES[id] && FUENTES[id].cita)
          .map((id) => el("li", {}, FUENTES[id].cita))
      : [];

    const hrefDestino = q.evento
      ? `${root()}pages/cronologia.html#${q.evento}`
      : q.repasar && q.repasar.href
        ? `${root()}${q.repasar.href}`
        : null;

    const textoDestino = q.evento
      ? "Ver en la cronología →"
      : q.repasar && q.repasar.texto
        ? `${q.repasar.texto} →`
        : null;

    const botonSeccion =
      hrefDestino && textoDestino
        ? el("a", { class: "quiz-btn-light", href: hrefDestino }, textoDestino)
        : null;

    const botonSiguiente = el(
      "button",
      { type: "button", class: "btn quiz-next-btn", id: "quiz-next", onclick: next },
      ultima ? "Ver resultados" : "Siguiente pregunta"
    );

    const barraInferior = el(
      "div",
      { class: "quiz-feedback-footer" },
      el("div", { class: "quiz-footer-left" }, botonSeccion),
      el("div", { class: "quiz-footer-right" }, botonSiguiente)
    );

    const hijos = [
      el("h3", {}, acierto ? "Correcto" : "No es la respuesta correcta"),
      el("p", {}, q.explicacion || ""),
    ];

    if (listaFuentes.length > 0) {
      hijos.push(
        el(
          "div",
          { class: "quiz-sources" },
          el("h4", {}, "Fuentes que respaldan esta explicación"),
          el("ul", {}, listaFuentes)
        )
      );
    }

    hijos.push(barraInferior);

    box.className = `quiz-feedback ${acierto ? "is-ok" : "is-bad"}`;
    box.replaceChildren(...hijos);
    document.getElementById("quiz-next")?.focus();
  }

  function next() {
    if (state.i < state.preguntas.length - 1) {
      state.i++;
      renderQuestion();
    } else {
      renderResult();
    }
  }

  function renderResult() {
    const total = state.respondidas.length;
    const aciertos = state.respondidas.filter((r) => r.acierto).length;
    const fallos = state.respondidas.filter((r) => !r.acierto);
    const ratio = total > 0 ? aciertos / total : 0;
    const nivel =
      ratio >= 0.9
        ? "Dominas el proceso histórico."
        : ratio >= 0.6
          ? "Buena comprensión; repasa los puntos señalados."
          : "Conviene recorrer de nuevo la cronología y las secciones del archivo.";

    const porCat = {};
    state.respondidas.forEach(({ q, acierto }) => {
      porCat[q.categoria] ??= { ok: 0, total: 0 };
      porCat[q.categoria].total++;
      if (acierto) porCat[q.categoria].ok++;
    });

    const itemsRepaso = fallos
      .map(({ q }) => {
        const href = q.evento
          ? `${root()}pages/cronologia.html#${q.evento}`
          : q.repasar && q.repasar.href
            ? `${root()}${q.repasar.href}`
            : null;
        const label = q.evento ? "Ir a la cronología" : q.repasar?.texto || "Revisar tema";
        return el(
          "li",
          {},
          el("span", {}, q.pregunta),
          href ? el("a", { href }, label) : null
        );
      });

    app.replaceChildren(
      el(
        "div",
        { class: "quiz-result" },
        el("p", { class: "quiz-score" }, `${aciertos} / ${total}`),
        el("h2", { tabindex: "-1", id: "quiz-resultado" }, nivel),
        el(
          "ul",
          { class: "quiz-cats" },
          Object.entries(porCat).map(([cat, r]) =>
            el("li", {}, el("span", {}, CATEGORIAS_QUIZ[cat] ?? cat), el("strong", {}, `${r.ok}/${r.total}`))
          )
        ),
        fallos.length
          ? el(
              "div",
              { class: "quiz-review" },
              el("h3", {}, "Qué repasar"),
              el("ul", {}, itemsRepaso)
            )
          : el("p", { class: "muted" }, "No hay nada que repasar: respondiste todo correctamente."),
        el(
          "div",
          { class: "quiz-actions" },
          el("button", { type: "button", class: "btn", onclick: () => start() }, "Intentarlo de nuevo"),
          fallos.length
            ? el(
                "button",
                {
                  type: "button",
                  class: "btn btn--ghost",
                  onclick: () =>
                    start(fallos.map((f) => PREGUNTAS.find((p) => p.id === f.q.id)).filter(Boolean)),
                },
                "Repetir solo las falladas"
              )
            : null
        )
      )
    );
    $focus("#quiz-resultado");
  }

  document.addEventListener("keydown", (e) => {
    if (!state || e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^[1-4]$/.test(e.key) && !state.bloqueada && app.querySelector(".quiz-option")) {
      const idx = Number(e.key) - 1;
      if (idx < state.preguntas[state.i].opciones.length) answer(idx);
    }
  });

  start();
}