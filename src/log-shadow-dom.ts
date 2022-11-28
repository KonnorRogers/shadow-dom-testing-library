import { logDOM } from "@testing-library/dom";
import { createDOMElementFilter, filterCommentsAndDefaultIgnoreTagsTags } from "./pretty-shadow-dom";
import type { NewPlugin } from "pretty-format";

export function logShadowDOM(
  ...args: Parameters<typeof logDOM>
): ReturnType<typeof logDOM> {
  let [dom, maxLength, options] = args;

  const plugin: NewPlugin = createDOMElementFilter(
    options?.filterNode || filterCommentsAndDefaultIgnoreTagsTags
  );

  if (options == null) options = {}

  if (options.plugins == null) options.plugins = []

  options.plugins.push(plugin)

  logDOM(dom, maxLength, options);
}
