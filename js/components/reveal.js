import { $$ } from "../core/utils.js";

// Entrada discreta: solo se ocultan los elementos que quedan fuera de pantalla al cargar.
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
