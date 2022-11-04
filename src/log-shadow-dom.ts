import { logDOM } from "@testing-library/dom";
import { toJSDOM } from "./pretty-shadow-dom";

export function logShadowDOM(
  ...args: Parameters<typeof logDOM>
): ReturnType<typeof logDOM> {
  const [dom, maxLength, options] = args;

  logDOM(toJSDOM(dom), maxLength, options);
}
