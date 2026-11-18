
import { loadLayout } from "./core/loader.js";
import { initNavigation } from "./core/navigation.js";
import { getPage } from "./core/utils.js";

const pageModules = {
  home: () => import("./pages/home.js"),
  contexto: () => import("./pages/contexto.js"),
  cronologia: () => import("./pages/cronologia.js"),
  "red-historica": () => import("./pages/red-historica.js"),
  documental: () => import("./pages/documental.js"),
  consecuencias: () => import("./pages/consecuencias.js"),
};

async function init() {
  try {
    await loadLayout();
    initNavigation();

    const currentPage = getPage();
    const loadPage = pageModules[currentPage];

    if (!loadPage) {
      console.warn(`No existe un módulo registrado para: ${currentPage}`);
      return;
    }

    const pageModule = await loadPage();

    if (typeof pageModule.init === "function") {
      pageModule.init();
    }
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
}

init();
