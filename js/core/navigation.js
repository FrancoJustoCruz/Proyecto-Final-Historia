import { $, $$, getPage } from "./utils.js";

export function initNavigation() {
  const toggle = $(".nav-toggle");
  const list = $("#nav-list");
  if (!toggle || !list) return;

  const current = getPage();
  $$("[data-nav]", list).forEach((a) => {
    if (a.dataset.nav === current) a.setAttribute("aria-current", "page");
  });

  const setOpen = (open) => {
    list.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(!list.classList.contains("is-open")));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  list.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
}
