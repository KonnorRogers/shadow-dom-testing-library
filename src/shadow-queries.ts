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
  configure,
  BuiltQueryMethods,
} from "@testing-library/dom";

import { deepQuerySelectorAll } from "./deep-query-selectors";
import {
  ScreenShadowMatcherParams,
  ScreenShadowRoleMatcherParams,
  ScreenShadowSelectorMatcherParams,
  ShadowMatcherParams,
  ShadowRoleMatcherParams,
  ShadowSelectorMatcherParams,
} from "./types";

const scopeQuery = "*";

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByRole(el as HTMLElement, role, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowRoleMatcherParams>(
  queryAllByShadowRole,
  getMultipleRoleError,
  getMissingRoleError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
})


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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByLabelText(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowSelectorMatcherParams>(
  queryAllByShadowLabelText,
  getMultipleLabelTextError,
  getMissingLabelTextError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
})

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByPlaceholderText(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowSelectorMatcherParams>(
  queryAllByShadowPlaceholderText,
  getMultiplePlaceholderTextError,
  getMissingPlaceholderTextError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
});

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByText(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowSelectorMatcherParams>(
  queryAllByShadowText,
  getMultipleTextError,
  getMissingTextError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false

		return fn(arg1, arg2, options, ...rest)
	})
});

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByDisplayValue(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowSelectorMatcherParams>(
  queryAllByShadowDisplayValue,
  getMultipleDisplayValueError,
  getMissingDisplayValueError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
});

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByAltText(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowMatcherParams>(
  queryAllByShadowAltText,
  getMultipleAltTextError,
  getMissingAltTextError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
});

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByTitle(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowMatcherParams>(
  queryAllByShadowTitle,
  getMultipleTitleError,
  getMissingTitleError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
});

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
      deepQuerySelectorAll(container, scopeQuery, options)
        .map((el) => queryAllByTestId(el as HTMLElement, id, options))
        .flat(Infinity)
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
] = buildQueries<ScreenShadowMatcherParams>(
  queryAllByShadowTestId,
  getMultipleTestIdError,
  getMissingTestIdError
).map((fn) => {
	return ((...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
		let [arg1, arg2, options, ...rest] = args

		if (options == null) {
			options = {}
		}

		options.suggest = false
		return fn(arg1, arg2, options, ...rest)
	})
});

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
