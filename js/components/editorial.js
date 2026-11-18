import { $, $$, getRoot } from "../core/utils.js";
import { FUENTES } from "../modules/timeline/timeline-data.js";

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Barra de capítulos con progreso de lectura */
export function initChapterNav() {
  const links = $$("[data-chapter-link]");
  const chapters = $$(".chapter");
  const bar = $(".chapter-progress");
  if (links.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => {
          const on = a.getAttribute("href") === `#${e.target.id}`;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          if (on) a.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce() ? "auto" : "smooth" });
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    chapters.forEach((c) => io.observe(c));
  }
  if (bar) {
    const main = $("#contenido");
    const update = () => {
      const r = main.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
}

/* Entrada discreta (solo elementos fuera de pantalla al cargar) */
export function initReveal() {
  if (!("IntersectionObserver" in window)) return;
  const items = $$(".reveal").filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  items.forEach((el) => el.classList.add("is-pending"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.remove("is-pending");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

/* Fotografías: se cargan si el archivo existe; si no, queda un marcador */
export function initPlates() {
  $$(".plate-frame[data-src]").forEach((frame) => {
    const plate = frame.closest(".plate");
    const img = new Image();
    img.onload = () => {
      frame.style.backgroundImage = `url("${getRoot()}${frame.dataset.src}")`;
      frame.setAttribute("role", "img");
      frame.setAttribute("aria-label", frame.dataset.alt ?? "");
      plate.classList.add("has-img");
    };
    img.onerror = () => {
      plate.classList.add("is-missing");
      frame.setAttribute("aria-hidden", "true");
    };
    img.src = `${getRoot()}${frame.dataset.src}`;
  });
}

/* Líneas cronológicas secundarias (pestañas) */
export function initTabs() {
  $$("[data-tabs]").forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const activate = (tab, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      if (!focus) tab.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce() ? "auto" : "smooth" });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => activate(t));
      t.addEventListener("keydown", (e) => {
        const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (to == null) return;
        e.preventDefault();
        activate(tabs[(to + tabs.length) % tabs.length], true);
      });
    });
    activate(tabs.find((t) => t.getAttribute("aria-selected") === "true") ?? tabs[0]);
  });
}

/* Lectura inmersiva: el escenario fijo cambia con el texto */
export function initScrolly() {
  $$("[data-scrolly]").forEach((root) => {
    const steps = $$(".scrolly-step", root);
    const fields = {
      year: $("[data-stage-year]", root), title: $("[data-stage-title]", root),
      know: $("[data-stage-know]", root), debate: $("[data-stage-debate]", root),
    };
    const show = (step) => {
      steps.forEach((s) => s.classList.toggle("is-active", s === step));
      if (fields.year) fields.year.textContent = step.dataset.year ?? "";
      if (fields.title) fields.title.textContent = step.dataset.title ?? "";
      if (fields.know) fields.know.textContent = step.dataset.know ?? "";
      if (fields.debate) fields.debate.textContent = step.dataset.debate ?? "";
    };
    show(steps[0]);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && show(e.target));
    }, { rootMargin: "-40% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
  });
}

/* Fuentes de cada capítulo, tomadas del catálogo común */
export function initSources() {
  $$("[data-sources]").forEach((ul) => {
    ul.replaceChildren(...ul.dataset.sources.split(/\s+/).filter(Boolean).map((id) => {
      const f = FUENTES[id];
      if (!f) { console.warn(`Fuente desconocida: ${id}`); return null; }
      const li = document.createElement("li");
      li.textContent = f.cita;
      const tag = document.createElement("span");
      tag.className = "source-type";
      tag.textContent = f.tipo === "primaria" ? "Fuente primaria" : "Estudio académico";
      li.append(tag);
      return li;
    }).filter(Boolean));
  });
}

export function initEditorial() {
  initChapterNav();
  initReveal();
  initPlates();
  initTabs();
  initScrolly();
  initSources();
}
