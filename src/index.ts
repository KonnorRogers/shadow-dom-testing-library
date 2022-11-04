import {
  queries,
  within,
} from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries"
import { debug } from "./debug";
import { logShadowDOM } from "./log-shadow-dom"
import { prettyShadowDOM } from "./pretty-shadow-dom"
import { shadowScreen } from "./shadow-screen"
import { trickDOMTestingLibrary } from "./trick-dom-testing-library";

trickDOMTestingLibrary();

const allQueries = {
  ...queries,
  ...shadowQueries
};

function shadowWithin(element: HTMLElement) {
  return within(element, allQueries);
}

export * from "./types"
export * from "./shadow-queries";

export {
  shadowScreen as screen,
  shadowWithin as within,
  debug,
  logShadowDOM,
	prettyShadowDOM
};
