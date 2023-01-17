import { queries, within } from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries";
import { debug } from "./debug";
import { logShadowDOM } from "./log-shadow-dom";
import { prettyShadowDOM } from "./pretty-shadow-dom";
import { shadowScreen } from "./shadow-screen";
import { patchWrap } from "./trick-dom-testing-library";

const allQueries = {
  ...queries,
  ...shadowQueries,
};

function shadowWithin(element: HTMLElement) {
  return  within(element, allQueries);
}


export * from "./types";
export * from "./shadow-queries";

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
