import { $, getRoot } from "./utils.js";

async function inject(slotId, file) {
  const slot = $(slotId);
  if (!slot) return;
  const root = getRoot();
  try {
    const res = await fetch(`${root}partials/${file}`);
    if (!res.ok) throw new Error(res.status);
    slot.innerHTML = (await res.text()).replaceAll("{{root}}", root);
  } catch (err) {
    console.error(`No se pudo cargar ${file}:`, err);
  }
}

export async function loadLayout() {
  await Promise.all([inject("#site-header", "header.html"), inject("#site-footer", "footer.html")]);
}
