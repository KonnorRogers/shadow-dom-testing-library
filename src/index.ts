import { queries, within, configure, getConfig } from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries";
import { debug } from "./debug";
import { logShadowDOM } from "./log-shadow-dom";
import { prettyShadowDOM } from "./pretty-shadow-dom";
import { shadowScreen } from "./shadow-screen";
import { patchWrap } from "./trick-dom-testing-library";

configure({
  getElementError (message, container) {
    const prettifiedDOM = prettyShadowDOM(container)
    const error = new Error(
      [
        message,
        `Ignored nodes: comments, ${getConfig().defaultIgnore}\n${prettifiedDOM}`,
      ]
        .filter(Boolean)
        .join('\n\n'),
    )
    error.name = 'ShadowDOMTestingLibraryElementError'
    return error
  }
})

const allQueries = {
  ...queries,
  ...shadowQueries,
};

function shadowWithin(element: HTMLElement) {
  return within(element, allQueries);
}

export * from "./types";
export * from "./shadow-queries";

export {
  createDOMElementFilter
} from "./pretty-shadow-dom"

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
