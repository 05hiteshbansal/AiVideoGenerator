import { ARC_LIBRARY } from "./arclibrary.js";

export function injectArc(type = "relatable") {
  return ARC_LIBRARY[type] || ARC_LIBRARY.relatable;
}
