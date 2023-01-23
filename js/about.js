// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";

window.addEventListener("load", () => {
  addOrRemoveActiveClass();
});
// ============================== handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);
