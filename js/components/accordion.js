import { $$ } from "../core/utils.js";

export function initAccordions(scope = document) {
  $$("[data-accordion]", scope).forEach((acc) => {
    const exclusive = acc.hasAttribute("data-exclusive");
    const items = $$(".acc-item", acc);
    const set = (item, open) => {
      item.classList.toggle("is-open", open);
      item.querySelector(".acc-trigger").setAttribute("aria-expanded", String(open));
    };
    items.forEach((item, i) => {
      const trigger = item.querySelector(".acc-trigger");
      const panel = item.querySelector(".acc-panel");
      const id = panel.id || `acc-${Math.random().toString(36).slice(2, 8)}-${i}`;
      panel.id = id;
      trigger.setAttribute("aria-controls", id);
      set(item, item.classList.contains("is-open"));
      trigger.addEventListener("click", () => {
        const open = !item.classList.contains("is-open");
        if (open && exclusive) items.forEach((o) => o !== item && set(o, false));
        set(item, open);
      });
    });
  });
}
