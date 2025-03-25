import {
  __esm
} from "./chunk-LK32TJAX.js";

// node_modules/dom-helpers/esm/hasClass.js
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
var init_hasClass = __esm({
  "node_modules/dom-helpers/esm/hasClass.js"() {
  }
});

// node_modules/dom-helpers/esm/addClass.js
function addClass(element, className) {
  if (element.classList) element.classList.add(className);
  else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
  else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
var init_addClass = __esm({
  "node_modules/dom-helpers/esm/addClass.js"() {
    init_hasClass();
  }
});

// node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}
var init_removeClass = __esm({
  "node_modules/dom-helpers/esm/removeClass.js"() {
  }
});

export {
  hasClass,
  init_hasClass,
  addClass,
  init_addClass,
  removeClass,
  init_removeClass
};
//# sourceMappingURL=chunk-XSYAKRO2.js.map
