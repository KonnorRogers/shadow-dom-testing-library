import { logDOM } from "@testing-library/dom";
import {
  createDOMElementFilter,
  filterCommentsAndDefaultIgnoreTagsTags,
} from "./pretty-shadow-dom.js";
import type { NewPlugin } from "pretty-format";
import { patchWrap } from "./trick-dom-testing-library.js";

export function logShadowDOM(
  ...args: Parameters<typeof logDOM>
): ReturnType<typeof logDOM> {
  let [dom, maxLength, options] = args;

  const plugin: NewPlugin = createDOMElementFilter(
    options?.filterNode || filterCommentsAndDefaultIgnoreTagsTags,
  );

  if (options == null) options = {};
  if (options.plugins == null) options.plugins = [];
  options.plugins.push(plugin);

  patchWrap(() => logDOM(dom, maxLength, options));
}
