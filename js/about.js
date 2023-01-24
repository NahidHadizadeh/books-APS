// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";

window.addEventListener("load", () => {
  addOrRemoveActiveClass();
});
// ============================== handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);

// =========================== hidden search form
const searchForm = document.querySelector(".form-search");
searchForm.classList.remove("d-flex");
searchForm.style.display = "none";
