import {
  buildQueries,
  ByRoleMatcher,
  queryAllByRole,
  queryAllByLabelText,
  Matcher,
  queryAllByPlaceholderText,
  queryAllByText,
  queryAllByDisplayValue,
  queryAllByAltText,
  queryAllByTitle,
  queryAllByTestId,
} from "@testing-library/dom";

import { getAllElementsAndShadowRoots } from "./deep-query-selectors";
import { patchWrap } from "./trick-dom-testing-library";
import {
  ScreenShadowMatcherParams,
  ScreenShadowRoleMatcherParams,
  ScreenShadowSelectorMatcherParams,
  ShadowMatcherParams,
  ShadowRoleMatcherParams,
  ShadowSelectorMatcherParams,
} from "./types";

function toShadowQueries<T extends Function[]>(queries: T): T {
  return queries.map((query): Function => {
    return (...args: any[]): unknown => {
      let [arg1, arg2, options, ...rest] = args;
      if (options == null) options = {};
      options.suggest = false;
      return query(arg1, arg2, options, ...rest);
    };
  }) as T;
}

// Role
function queryAllByShadowRole<T extends HTMLElement = HTMLElement>(
  ...args: ShadowRoleMatcherParams
): T[] {
  let [container, role, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByRole(el as HTMLElement, role, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleRoleError = (_c: Element | null, role: ByRoleMatcher) =>
  `Found multiple elements with the role of: ${role}`;
const getMissingRoleError = (_c: Element | null, role: ByRoleMatcher) =>
  `Unable to find an element with the role of: ${role}`;

const [
  queryByShadowRole,
  getAllByShadowRole,
  getByShadowRole,
  findAllByShadowRole,
  findByShadowRole,
] = toShadowQueries(
  buildQueries<ScreenShadowRoleMatcherParams>(
    queryAllByShadowRole,
    getMultipleRoleError,
    getMissingRoleError,
  ),
);

// Label Text
function queryAllByShadowLabelText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowSelectorMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByLabelText(el as HTMLElement, id, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleLabelTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the label text of: ${id}`;
const getMissingLabelTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the label text of: ${id}`;

const [
  queryByShadowLabelText,
  getAllByShadowLabelText,
  getByShadowLabelText,
  findAllByShadowLabelText,
  findByShadowLabelText,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowLabelText,
    getMultipleLabelTextError,
    getMissingLabelTextError,
  ),
);

// Placeholder Text
function queryAllByShadowPlaceholderText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) =>
            queryAllByPlaceholderText(el as HTMLElement, id, options),
          )
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultiplePlaceholderTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the placeholder text of: ${id}`;
const getMissingPlaceholderTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the placeholder text of: ${id}`;

const [
  queryByShadowPlaceholderText,
  getAllByShadowPlaceholderText,
  getByShadowPlaceholderText,
  findAllByShadowPlaceholderText,
  findByShadowPlaceholderText,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowPlaceholderText,
    getMultiplePlaceholderTextError,
    getMissingPlaceholderTextError,
  ),
);

// Text
function queryAllByShadowText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowSelectorMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByText(el as HTMLElement, id, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the text of: ${id}`;
const getMissingTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the text of: ${id}`;

const [
  queryByShadowText,
  getAllByShadowText,
  getByShadowText,
  findAllByShadowText,
  findByShadowText,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowText,
    getMultipleTextError,
    getMissingTextError,
  ),
);

// Display Value
function queryAllByShadowDisplayValue<T extends HTMLElement = HTMLElement>(
  ...args: ShadowSelectorMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByDisplayValue(el as HTMLElement, id, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleDisplayValueError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the display value of: ${id}`;
const getMissingDisplayValueError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the display value of: ${id}`;

const [
  queryByShadowDisplayValue,
  getAllByShadowDisplayValue,
  getByShadowDisplayValue,
  findAllByShadowDisplayValue,
  findByShadowDisplayValue,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowDisplayValue,
    getMultipleDisplayValueError,
    getMissingDisplayValueError,
  ),
);

// Alt Text
function queryAllByShadowAltText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByAltText(el as HTMLElement, id, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleAltTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the alt text of: ${id}`;
const getMissingAltTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the alt text of: ${id}`;

const [
  queryByShadowAltText,
  getAllByShadowAltText,
  getByShadowAltText,
  findAllByShadowAltText,
  findByShadowAltText,
] = toShadowQueries(
  buildQueries<ScreenShadowMatcherParams>(
    queryAllByShadowAltText,
    getMultipleAltTextError,
    getMissingAltTextError,
  ),
);

// Title
function queryAllByShadowTitle<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByTitle(el as HTMLElement, id, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleTitleError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the title of: ${id}`;
const getMissingTitleError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the title of: ${id}`;

const [
  queryByShadowTitle,
  getAllByShadowTitle,
  getByShadowTitle,
  findAllByShadowTitle,
  findByShadowTitle,
] = toShadowQueries(
  buildQueries<ScreenShadowMatcherParams>(
    queryAllByShadowTitle,
    getMultipleTitleError,
    getMissingTitleError,
  ),
);

// Test Id
function queryAllByShadowTestId<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): T[] {
  let [container, id, options] = args;

  if (options == null) {
    options = {};
  }

  options.suggest = false;

  return [
    ...new Set(
      patchWrap(() =>
        getAllElementsAndShadowRoots(container, options)
          .map((el) => queryAllByTestId(el as HTMLElement, id, options))
          .flat(Infinity),
      ),
    ),
  ] as T[];
}

const getMultipleTestIdError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the test id of: ${id}`;
const getMissingTestIdError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the test id of: ${id}`;

const [
  queryByShadowTestId,
  getAllByShadowTestId,
  getByShadowTestId,
  findAllByShadowTestId,
  findByShadowTestId,
] = toShadowQueries(
  buildQueries<ScreenShadowMatcherParams>(
    queryAllByShadowTestId,
    getMultipleTestIdError,
    getMissingTestIdError,
  ),
);

export {
  // Role
  queryAllByShadowRole,
  queryByShadowRole,
  getAllByShadowRole,
  getByShadowRole,
  findAllByShadowRole,
  findByShadowRole,

  // Label Text
  queryAllByShadowLabelText,
  queryByShadowLabelText,
  getAllByShadowLabelText,
  getByShadowLabelText,
  findAllByShadowLabelText,
  findByShadowLabelText,

  // Placeholder Text
  queryAllByShadowPlaceholderText,
  queryByShadowPlaceholderText,
  getAllByShadowPlaceholderText,
  getByShadowPlaceholderText,
  findAllByShadowPlaceholderText,
  findByShadowPlaceholderText,

  // Text
  queryAllByShadowText,
  queryByShadowText,
  getAllByShadowText,
  getByShadowText,
  findAllByShadowText,
  findByShadowText,

  // Display Value
  queryAllByShadowDisplayValue,
  queryByShadowDisplayValue,
  getAllByShadowDisplayValue,
  getByShadowDisplayValue,
  findAllByShadowDisplayValue,
  findByShadowDisplayValue,

  // Alt Text
  queryAllByShadowAltText,
  queryByShadowAltText,
  getAllByShadowAltText,
  getByShadowAltText,
  findAllByShadowAltText,
  findByShadowAltText,

  // Title
  queryAllByShadowTitle,
  queryByShadowTitle,
  getAllByShadowTitle,
  getByShadowTitle,
  findAllByShadowTitle,
  findByShadowTitle,

  // Test Id
  queryAllByShadowTestId,
  queryByShadowTestId,
  getAllByShadowTestId,
  getByShadowTestId,
  findAllByShadowTestId,
  findByShadowTestId,
};
