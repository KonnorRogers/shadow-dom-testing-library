import { logDOM } from "@testing-library/dom";

export function logShadowDOM(
  ...args: Parameters<typeof logDOM>
): ReturnType<typeof logDOM> {
  const [dom, maxLength, options] = args;

  logDOM(dom, maxLength, options);
}
