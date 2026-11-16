import { loadLayout } from "./core/loader.js";
import { initNavigation } from "./core/navigation.js";
import { getPage } from "./core/utils.js";

const pageModules = {
  home: () => import("./pages/home.js"),
  cronologia: () => import("./pages/cronologia.js"),
  // Se irán añadiendo: red-historica, documental, etc.
};

async function init() {
  await loadLayout();
  initNavigation();
  const loadPage = pageModules[getPage()];
  if (loadPage) (await loadPage()).init?.();
}

init();
