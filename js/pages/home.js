import { $, $$ } from "../core/utils.js";

function initHeaderState() {
  const header = $(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initProgress() {
  const bar = $(".scroll-progress");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initReveal() {
  const items = $$(".reveal").filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if (!("IntersectionObserver" in window)) return;
  items.forEach((el) => el.classList.add("is-pending"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("is-pending");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
}

function initSideDots() {
  const dots = $$("[data-dot]");
  if (!dots.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      dots.forEach((d) => d.classList.toggle("is-active", d.dataset.dot === entry.target.id));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  dots.forEach((d) => {
    const section = document.getElementById(d.dataset.dot);
    if (section) io.observe(section);
  });
}

export function init() {
  initHeaderState();
  initProgress();
  initReveal();
  initSideDots();
}
