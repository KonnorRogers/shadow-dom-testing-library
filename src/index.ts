import {waitForOptions, buildQueries, screen, ByRoleMatcher, ByRoleOptions, queryAllByRole, SelectorMatcherOptions, queryAllByLabelText, Matcher, queryAllByPlaceholderText, MatcherOptions, queryAllByText, queryAllByDisplayValue, queryAllByAltText, queryAllByTitle, queryAllByTestId, queries, within} from '@testing-library/dom'
import { debug } from './debug';

export type Container = HTMLElement | Document | ShadowRoot

// Allow shallow queries to be appended to the default options of DOM testing library
export interface ShadowOptions { shallow?: boolean }
export interface ShadowByRoleOptions extends ByRoleOptions, ShadowOptions {}
export interface ShadowMatcherOptions extends MatcherOptions, ShadowOptions {}
export interface ShadowSelectorMatcherOptions extends SelectorMatcherOptions, ShadowOptions {}

// For queryBy / getBy queries
export type ShadowRoleMatcherParams = [container: HTMLElement, ...args: ScreenShadowRoleMatcherParams]
export type ShadowSelectorMatcherParams = [container: HTMLElement, ...args: ScreenShadowSelectorMatcherParams]
export type ShadowMatcherParams = [container: HTMLElement, ...args: ScreenShadowMatcherParams]

export type ScreenShadowRoleMatcherParams = [role: ByRoleMatcher, options?: ShadowByRoleOptions | undefined]
export type ScreenShadowSelectorMatcherParams = [id: Matcher, options?: ShadowSelectorMatcherOptions | undefined]
export type ScreenShadowMatcherParams = [id: Matcher, options?: ShadowMatcherOptions | undefined]

// For findBy queries
export type AsyncShadowRoleMatcherParams = [container: HTMLElement, ...args: AsyncScreenShadowRoleMatcherParams]
export type AsyncShadowSelectorMatcherParams = [container: HTMLElement, ...args: AsyncScreenShadowSelectorMatcherParams]
export type AsyncShadowMatcherParams = [container: HTMLElement, ...args: AsyncScreenShadowMatcherParams]

export type AsyncScreenShadowRoleMatcherParams = [role: ByRoleMatcher, options?: ShadowByRoleOptions | undefined, waitForOptions?: waitForOptions | undefined]
export type AsyncScreenShadowSelectorMatcherParams = [id: Matcher, options?: ShadowSelectorMatcherOptions | undefined, waitForOptions?: waitForOptions | undefined]
export type AsyncScreenShadowMatcherParams = [id: Matcher, options?: ShadowMatcherOptions | undefined, waitForOptions?: waitForOptions | undefined]


// Amazingly fun hack to trick DOM testing libraries internal type checking logic.
// https://github.com/testing-library/dom-testing-library/blob/73a5694529dbfff289f3d7a01470c45ef5c77715/src/queries/text.ts#L34-L36
// https://github.com/testing-library/dom-testing-library/blob/73a5694529dbfff289f3d7a01470c45ef5c77715/src/pretty-dom.js#L50-L54
function trickDOMTestingLibrary () {
  if (typeof ShadowRoot == "undefined") throw "Your environment does not support shadow roots."

  Object.defineProperties(ShadowRoot.prototype, {
  	matches: {
  		get () {
  			return function (this: ShadowRoot, string: string): boolean {
    			const str = string.trim()
    			if (str === "*") return true

    			return this.querySelector(string) != null ? true : false
  			}
  		}
  	},
    outerHTML: {
      get () {
        return this.innerHTML
      }
    },
  })
}

trickDOMTestingLibrary()

export function deepQuerySelector (container: Container, selectors: string, options: ShadowOptions = { shallow: false }, elements: (Element | ShadowRoot)[] = []) {
  const els = deepQuerySelectorAll(container, selectors, options, elements)

  if (Array.isArray(els) && els.length > 0) {
    return els[0]
  }

  return null
}

export function deepQuerySelectorAll (container: Container, selectors: string, options: ShadowOptions = { shallow: false }, elements: (Element | ShadowRoot)[] = []) {
  // if "document" is passed in, it will also pick up "<html>" causing the query to run twice.
  if (container instanceof Document) {
    container = document.documentElement
  }

  // Accounts for if the container houses a textNode
  // @ts-expect-error
  if (container.shadowRoot != null && container.shadowRoot.mode !== "closed") elements.push(container.shadowRoot)

  // If you pass in a shadowRoot container, you should still be able to find the text nodes.
  if (container instanceof ShadowRoot) elements.push(container)

  container.querySelectorAll(selectors).forEach((el: Element | HTMLElement) => {
    if (el.shadowRoot == null || el.shadowRoot.mode === "closed") {
      elements.push(el)
      return
    }

    // comment this to not add shadowRoots.
    // This is here because queryByRole() requires the parent element which in some cases is the shadow root.
    elements.push(el.shadowRoot)

    if (options.shallow === true) {
      el.shadowRoot.querySelectorAll(selectors).forEach((el) => elements.push(el))
      return
    }

    el.shadowRoot.querySelectorAll(selectors).forEach((el) => elements.push(el))
    deepQuerySelectorAll(el.shadowRoot, selectors, options, elements)
  })

  // We can sometimes hit duplicate nodes this way, lets stop that.
  return [...new Set(elements)]
}

// Prevent duplicate elements by using ":scope *"
const scopeQuery = ":scope *"

// Role
function queryAllByShadowRole<T extends HTMLElement = HTMLElement>(...args: ShadowRoleMatcherParams): T[] {
  let [container, role, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByRole(el as HTMLElement, role, options)).flat(Infinity))] as T[]
}

const getMultipleRoleError = (_c: Element | null, role: ByRoleMatcher) =>
  `Found multiple elements with the role of: ${role}`
const getMissingRoleError = (_c: Element | null, role: ByRoleMatcher) =>
  `Unable to find an element with the role of: ${role}`

const [
  queryByShadowRole,
  getAllByShadowRole,
  getByShadowRole,
  findAllByShadowRole,
  findByShadowRole,
] = buildQueries<ScreenShadowRoleMatcherParams>(queryAllByShadowRole, getMultipleRoleError, getMissingRoleError)


// Label Text
function queryAllByShadowLabelText<T extends HTMLElement = HTMLElement>(...args: ShadowSelectorMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByLabelText(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultipleLabelTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the label text of: ${id}`
const getMissingLabelTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the label text of: ${id}`

const [
  queryByShadowLabelText,
  getAllByShadowLabelText,
  getByShadowLabelText,
  findAllByShadowLabelText,
  findByShadowLabelText,
] = buildQueries<ScreenShadowSelectorMatcherParams>(queryAllByShadowLabelText, getMultipleLabelTextError, getMissingLabelTextError)


// Placeholder Text
function queryAllByShadowPlaceholderText<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByPlaceholderText(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultiplePlaceholderTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the placeholder text of: ${id}`
const getMissingPlaceholderTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the placeholder text of: ${id}`

const [
  queryByShadowPlaceholderText,
  getAllByShadowPlaceholderText,
  getByShadowPlaceholderText,
  findAllByShadowPlaceholderText,
  findByShadowPlaceholderText,
] = buildQueries<ScreenShadowSelectorMatcherParams>(queryAllByShadowPlaceholderText, getMultiplePlaceholderTextError, getMissingPlaceholderTextError)

// Text
function queryAllByShadowText<T extends HTMLElement = HTMLElement>(...args: ShadowSelectorMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByText(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultipleTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the text of: ${id}`
const getMissingTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the text of: ${id}`

const [
  queryByShadowText,
  getAllByShadowText,
  getByShadowText,
  findAllByShadowText,
  findByShadowText,
] = buildQueries<ScreenShadowSelectorMatcherParams>(queryAllByShadowText, getMultipleTextError, getMissingTextError)



// Display Value
function queryAllByShadowDisplayValue<T extends HTMLElement = HTMLElement>(...args: ShadowSelectorMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByDisplayValue(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultipleDisplayValueError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the display value of: ${id}`
const getMissingDisplayValueError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the display value of: ${id}`

const [
  queryByShadowDisplayValue,
  getAllByShadowDisplayValue,
  getByShadowDisplayValue,
  findAllByShadowDisplayValue,
  findByShadowDisplayValue,
] = buildQueries<ScreenShadowSelectorMatcherParams>(queryAllByShadowDisplayValue, getMultipleDisplayValueError, getMissingDisplayValueError)


// Alt Text
function queryAllByShadowAltText<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByAltText(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultipleAltTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the alt text of: ${id}`
const getMissingAltTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the alt text of: ${id}`

const [
  queryByShadowAltText,
  getAllByShadowAltText,
  getByShadowAltText,
  findAllByShadowAltText,
  findByShadowAltText,
] = buildQueries<ScreenShadowMatcherParams>(queryAllByShadowAltText, getMultipleAltTextError, getMissingAltTextError)


// Title
function queryAllByShadowTitle<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByTitle(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultipleTitleError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the title of: ${id}`
const getMissingTitleError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the title of: ${id}`

const [
  queryByShadowTitle,
  getAllByShadowTitle,
  getByShadowTitle,
  findAllByShadowTitle,
  findByShadowTitle,
] = buildQueries<ScreenShadowMatcherParams>(queryAllByShadowTitle, getMultipleTitleError, getMissingTitleError)

// Test Id
function queryAllByShadowTestId<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  let [container, id, options] = args

  if (options == null) {
    options = {}
  }

  options.suggest = false

  return [...new Set(deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByTestId(el as HTMLElement, id, options)).flat(Infinity))] as T[]
}

const getMultipleTestIdError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the test id of: ${id}`
const getMissingTestIdError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the test id of: ${id}`

const [
  queryByShadowTestId,
  getAllByShadowTestId,
  getByShadowTestId,
  findAllByShadowTestId,
  findByShadowTestId,
] = buildQueries<ScreenShadowMatcherParams>(queryAllByShadowTestId, getMultipleTestIdError, getMissingTestIdError)

// Shadows the following: https://testing-library.com/docs/queries/about/#priority
let customScreen = {
  ...screen,
  debug,
  // Role
  queryAllByShadowRole: (...args: ScreenShadowRoleMatcherParams) => queryAllByShadowRole(document.documentElement, args[0], args[1]),
  queryByShadowRole: (...args: ScreenShadowRoleMatcherParams) => queryByShadowRole(document.documentElement, args[0], args[1]),
  getAllByShadowRole: (...args: ScreenShadowRoleMatcherParams) => getAllByShadowRole(document.documentElement, args[0], args[1]),
  getByShadowRole: (...args: ScreenShadowRoleMatcherParams) => getByShadowRole(document.documentElement, args[0], args[1]),
  findAllByShadowRole: (...args: AsyncScreenShadowRoleMatcherParams) => findAllByShadowRole(document.documentElement, args[0], args[1], args[2]),
  findByShadowRole: (...args: AsyncScreenShadowRoleMatcherParams) => findByShadowRole(document.documentElement, args[0], args[1], args[2]),

  // Label Text
  queryAllByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) => queryAllByShadowLabelText(document.documentElement, args[0], args[1]),
  queryByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) => queryByShadowLabelText(document.documentElement, args[0], args[1]),
  getAllByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) => getAllByShadowLabelText(document.documentElement, args[0], args[1]),
  getByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) => getByShadowLabelText(document.documentElement, args[0], args[1]),
  findAllByShadowLabelText: (...args: AsyncScreenShadowSelectorMatcherParams) => findAllByShadowLabelText(document.documentElement, args[0], args[1], args[2]),
  findByShadowLabelText: (...args: AsyncScreenShadowSelectorMatcherParams) => findByShadowLabelText(document.documentElement, args[0], args[1], args[2]),

  // Placeholder Text
  queryAllByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) => queryAllByShadowPlaceholderText(document.documentElement, args[0], args[1]),
  queryByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) => queryByShadowPlaceholderText(document.documentElement, args[0], args[1]),
  getAllByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) => getAllByShadowPlaceholderText(document.documentElement, args[0], args[1]),
  getByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) => getByShadowPlaceholderText(document.documentElement, args[0], args[1]),
  findAllByShadowPlaceholderText: (...args: AsyncScreenShadowMatcherParams) => findAllByShadowPlaceholderText(document.documentElement, args[0], args[1], args[2]),
  findByShadowPlaceholderText: (...args: AsyncScreenShadowMatcherParams) => findByShadowPlaceholderText(document.documentElement, args[0], args[1], args[2]),

  // Text
  queryAllByShadowText: (...args: ScreenShadowSelectorMatcherParams) => queryAllByShadowText(document.documentElement, args[0], args[1]),
  queryByShadowText: (...args: ScreenShadowSelectorMatcherParams) => queryByShadowText(document.documentElement, args[0], args[1]),
  getAllByShadowText: (...args: ScreenShadowSelectorMatcherParams) => getAllByShadowText(document.documentElement, args[0], args[1]),
  getByShadowText: (...args: ScreenShadowSelectorMatcherParams) => getByShadowText(document.documentElement, args[0], args[1]),
  findAllByShadowText: (...args: AsyncScreenShadowSelectorMatcherParams) => findAllByShadowText(document.documentElement, args[0], args[1], args[2]),
  findByShadowText: (...args: AsyncScreenShadowSelectorMatcherParams) => findByShadowText(document.documentElement, args[0], args[1], args[2]),

  // Display Value
  queryAllByShadowDisplayValue: (...args: ScreenShadowMatcherParams) => queryAllByShadowDisplayValue(document.documentElement, args[0], args[1]),
  queryByShadowDisplayValue: (...args: ScreenShadowMatcherParams) => queryByShadowDisplayValue(document.documentElement, args[0], args[1]),
  getAllByShadowDisplayValue: (...args: ScreenShadowMatcherParams) => getAllByShadowDisplayValue(document.documentElement, args[0], args[1]),
  getByShadowDisplayValue: (...args: ScreenShadowMatcherParams) => getByShadowDisplayValue(document.documentElement, args[0], args[1]),
  findAllByShadowDisplayValue: (...args: AsyncScreenShadowMatcherParams) => findAllByShadowDisplayValue(document.documentElement, args[0], args[1], args[2]),
  findByShadowDisplayValue: (...args: AsyncScreenShadowMatcherParams) => findByShadowDisplayValue(document.documentElement, args[0], args[1], args[2]),

  // Alt Text
  queryAllByShadowAltText: (...args: ScreenShadowMatcherParams) => queryAllByShadowAltText(document.documentElement, args[0], args[1]),
  queryByShadowAltText: (...args: ScreenShadowMatcherParams) => queryByShadowAltText(document.documentElement, args[0], args[1]),
  getAllByShadowAltText: (...args: ScreenShadowMatcherParams) => getAllByShadowAltText(document.documentElement, args[0], args[1]),
  getByShadowAltText: (...args: ScreenShadowMatcherParams) => getByShadowAltText(document.documentElement, args[0], args[1]),
  findAllByShadowAltText: (...args: AsyncScreenShadowMatcherParams) => findAllByShadowAltText(document.documentElement, args[0], args[1], args[2]),
  findByShadowAltText: (...args: AsyncScreenShadowMatcherParams) => findByShadowAltText(document.documentElement, args[0], args[1], args[2]),

  // Title
  queryAllByShadowTitle: (...args: ScreenShadowMatcherParams) => queryAllByShadowTitle(document.documentElement, args[0], args[1]),
  queryByShadowTitle: (...args: ScreenShadowMatcherParams) => queryByShadowTitle(document.documentElement, args[0], args[1]),
  getAllByShadowTitle: (...args: ScreenShadowMatcherParams) => getAllByShadowTitle(document.documentElement, args[0], args[1]),
  getByShadowTitle: (...args: ScreenShadowMatcherParams) => getByShadowTitle(document.documentElement, args[0], args[1]),
  findAllByShadowTitle: (...args: AsyncScreenShadowMatcherParams) => findAllByShadowTitle(document.documentElement, args[0], args[1], args[2]),
  findByShadowTitle: (...args: AsyncScreenShadowMatcherParams) => findByShadowTitle(document.documentElement, args[0], args[1], args[2]),

  // Test Id
  queryAllByShadowTestId: (...args: ScreenShadowMatcherParams) => queryAllByShadowTestId(document.documentElement, args[0], args[1]),
  queryByShadowTestId: (...args: ScreenShadowMatcherParams) => queryByShadowTestId(document.documentElement, args[0], args[1]),
  getAllByShadowTestId: (...args: ScreenShadowMatcherParams) => getAllByShadowTestId(document.documentElement, args[0], args[1]),
  getByShadowTestId: (...args: ScreenShadowMatcherParams) => getByShadowTestId(document.documentElement, args[0], args[1]),
  findAllByShadowTestId: (...args: AsyncScreenShadowMatcherParams) => findAllByShadowTestId(document.documentElement, args[0], args[1], args[2]),
  findByShadowTestId: (...args: AsyncScreenShadowMatcherParams) => findByShadowTestId(document.documentElement, args[0], args[1], args[2]),
}

const allQueries = {
  ...queries,

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

function customWithin(element: HTMLElement) {
  return within(element, allQueries);
}

export {
  customScreen as screen,
  customWithin as within,
  debug,

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
}
