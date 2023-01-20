import { screen } from "@testing-library/dom";
import { logShadowDOM } from "./log-shadow-dom";

export function debug(...args: Parameters<typeof screen.debug>) {
  let [element, maxLength, options] = args;

  Array.isArray(element)
    ? element.forEach((el) => logShadowDOM(el, maxLength, options))
    : logShadowDOM(element, maxLength, options);
}
