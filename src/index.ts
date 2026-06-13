import { configure, getConfig } from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries";
import { debug } from "./debug";
import { logShadowDOM } from "./log-shadow-dom";
import { prettyShadowDOM } from "./pretty-shadow-dom";
import { shadowScreen } from "./shadow-screen";
import { shadowWithin } from "./shadow-within";
import { logRoles } from "./log-roles";

export function getElementError(
  ...params: Parameters<ReturnType<typeof getConfig>["getElementError"]>
) {
  const [message, container] = params;
  const prettifiedDOM = prettyShadowDOM(container);
  const error = new Error(
    [
      message,
      `Ignored nodes: comments, ${getConfig().defaultIgnore}\n${prettifiedDOM}`,
    ]
      .filter(Boolean)
      .join("\n\n"),
  );
  error.name = "ShadowDOMTestingLibraryElementError";
  return error;
}

// side-effectful configure. Assume people want to use our getElementError, but export getConfig / configure in case of mismatched dependencies or similar. Easy hook to allow configuring.
configure({
  getElementError,
});

export { getConfig, configure };

export * from "./types";
export * from "./shadow-queries";

export { createDOMElementFilter } from "./pretty-shadow-dom";

export {
  deepQuerySelector,
  deepQuerySelectorAll,
  getAllElementsAndShadowRoots,
} from "./deep-query-selectors";

export {
  shadowScreen as screen,
  shadowWithin as within,
  shadowQueries,
  debug,
  logShadowDOM,
  prettyShadowDOM,
  logRoles,
};
