import { queries, within, configure, getConfig } from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries";
import { debug } from "./debug";
import { logShadowDOM } from "./log-shadow-dom";
import { prettyShadowDOM } from "./pretty-shadow-dom";
import { shadowScreen } from "./shadow-screen";

configure({
  // https://github.com/testing-library/dom-testing-library/blob/39a64d4b862f706d09f0cd225ce9eda892f1e8d8/src/config.ts#L36-L51
  getElementError(message, container) {
    const prettifiedDOM = prettyShadowDOM(container);
    const error = new Error(
      [
        message,
        `Ignored nodes: comments, ${
          getConfig().defaultIgnore
        }\n${prettifiedDOM}`,
      ]
        .filter(Boolean)
        .join("\n\n")
    );
    error.name = "ShadowDOMTestingLibraryElementError";
    return error;
  },
});

const allQueries = {
  ...queries,
  ...shadowQueries,
};

function shadowWithin(element: HTMLElement) {
  return within(element, allQueries);
}

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
};
