import {waitForOptions, buildQueries, screen, ByRoleMatcher, ByRoleOptions, queryAllByRole, SelectorMatcherOptions, queryAllByLabelText, Matcher, queryAllByPlaceholderText, MatcherOptions, queryAllByText, queryAllByDisplayValue, queryAllByAltText, queryAllByTitle, queryAllByTestId} from '@testing-library/dom'

export type Container = HTMLElement | Document | ShadowRoot

export type ShadowOptions = { shallow?: boolean }

// Allow shallow queries to be appended to the default options of DOM testing library
export type ShadowByRoleOptions = ByRoleOptions & ShadowOptions
export type ShadowMatcherOptions = MatcherOptions & ShadowOptions
export type ShadowSelectorMatcherOptions = SelectorMatcherOptions & ShadowOptions

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

    deepQuerySelectorAll(el.shadowRoot, selectors, options, elements)
  })

  return elements
}

// Prevent duplicate elements by using ":scope *"
const scopeQuery = ":scope *"

// Role
function queryAllByShadowRole<T extends HTMLElement = HTMLElement>(...args: ShadowRoleMatcherParams): T[] {
  const [container, role, options] = args

  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByRole(el as HTMLElement, role, options)).flat(Infinity) as T[]
}

const getMultipleRoleError = (_c: Element | null, role: string) =>
  `Found multiple elements with the role of: ${role}`
const getMissingRoleError = (_c: Element | null, role: string) =>
  `Unable to find an element with the role of: ${role}`

const [
  _queryByShadowRole,
  _getAllByShadowRole,
  _getByShadowRole,
  _findAllByShadowRole,
  _findByShadowRole,
] = buildQueries(queryAllByShadowRole, getMultipleRoleError, getMissingRoleError)

const queryByShadowRole = <T extends HTMLElement = HTMLElement> (...args: ShadowRoleMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowRole(...args) as T
}

const getByShadowRole = <T extends HTMLElement = HTMLElement> (...args: ShadowRoleMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowRole(...args) as T
}

const getAllByShadowRole = <T extends HTMLElement = HTMLElement> (...args: ShadowRoleMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowRole(...args) as T[]
}

const findByShadowRole = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowRoleMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowRole(...args) as Promise<T>
}

const findAllByShadowRole = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowRoleMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowRole(...args) as Promise<T[]>
}



// Label Text
function queryAllByShadowLabelText<T extends HTMLElement = HTMLElement>(...args: ShadowSelectorMatcherParams): T[] {
  const [container, id, options] = args

  const elements = deepQuerySelectorAll(container, ":scope *")

  return elements.map((el) => queryAllByLabelText(el as HTMLElement, id, options)).flat(Infinity) as T[]
}

const getMultipleLabelTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the label text of: ${id}`
const getMissingLabelTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the label text of: ${id}`

const [
  _queryByShadowLabelText,
  _getAllByShadowLabelText,
  _getByShadowLabelText,
  _findAllByShadowLabelText,
  _findByShadowLabelText,
] = buildQueries(queryAllByShadowLabelText, getMultipleLabelTextError, getMissingLabelTextError)

const queryByShadowLabelText = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowLabelText(...args) as T
}

const getByShadowLabelText = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowLabelText(...args) as T
}

const getAllByShadowLabelText = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowLabelText(...args) as T[]
}

const findByShadowLabelText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowSelectorMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowLabelText(...args) as Promise<T>
}

const findAllByShadowLabelText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowSelectorMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowLabelText(...args) as Promise<T[]>
}


// Placeholder Text
function queryAllByShadowPlaceholderText<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  const [container, id, options] = args

  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByPlaceholderText(el as HTMLElement, id, options)).flat(Infinity) as T[]
}

const getMultiplePlaceholderTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the placeholder text of: ${id}`
const getMissingPlaceholderTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the placeholder text of: ${id}`

const [
  _queryByShadowPlaceholderText,
  _getAllByShadowPlaceholderText,
  _getByShadowPlaceholderText,
  _findAllByShadowPlaceholderText,
  _findByShadowPlaceholderText,
] = buildQueries(queryAllByShadowPlaceholderText, getMultiplePlaceholderTextError, getMissingPlaceholderTextError)


const queryByShadowPlaceholderText = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowPlaceholderText(...args) as T
}

const getByShadowPlaceholderText = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowPlaceholderText(...args) as T
}

const getAllByShadowPlaceholderText = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowPlaceholderText(...args) as T[]
}

const findByShadowPlaceholderText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowPlaceholderText(...args) as Promise<T>
}

const findAllByShadowPlaceholderText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowPlaceholderText(...args) as Promise<T[]>
}


// Text
function queryAllByShadowText<T extends HTMLElement = HTMLElement>(...args: ShadowSelectorMatcherParams): T[] {
  const [container, id, options] = args

  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByText(el as HTMLElement, id, options)).flat(Infinity) as T[]
}

const getMultipleTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the text of: ${id}`
const getMissingTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the text of: ${id}`

const [
  _queryByShadowText,
  _getAllByShadowText,
  _getByShadowText,
  _findAllByShadowText,
  _findByShadowText,
] = buildQueries(queryAllByShadowText, getMultipleTextError, getMissingTextError)

const queryByShadowText = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowText(...args) as T
}

const getByShadowText = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowText(...args) as T
}

const getAllByShadowText = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowText(...args) as T[]
}

const findByShadowText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowSelectorMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowText(...args) as Promise<T>
}

const findAllByShadowText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowSelectorMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowText(...args) as Promise<T[]>
}



// Display Value
function queryAllByShadowDisplayValue<T extends HTMLElement = HTMLElement>(...args: ShadowSelectorMatcherParams): T[] {
  const [container, id, options] = args

  // @ts-expect-error
  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByDisplayValue(el, id, options)).flat(Infinity) as T[]
}

const getMultipleDisplayValueError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the display value of: ${id}`
const getMissingDisplayValueError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the display value of: ${id}`

const [
  _queryByShadowDisplayValue,
  _getAllByShadowDisplayValue,
  _getByShadowDisplayValue,
  _findAllByShadowDisplayValue,
  _findByShadowDisplayValue,
] = buildQueries(queryAllByShadowDisplayValue, getMultipleDisplayValueError, getMissingDisplayValueError)


const queryByShadowDisplayValue = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowDisplayValue(...args) as T
}

const getByShadowDisplayValue = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowDisplayValue(...args) as T
}

const getAllByShadowDisplayValue = <T extends HTMLElement = HTMLElement> (...args: ShadowSelectorMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowDisplayValue(...args) as T[]
}

const findByShadowDisplayValue = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowSelectorMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowDisplayValue(...args) as Promise<T>
}

const findAllByShadowDisplayValue = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowSelectorMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowDisplayValue(...args) as Promise<T[]>
}


// Alt Text
function queryAllByShadowAltText<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  const [container, id, options] = args
  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByAltText(el as HTMLElement, id, options)).flat(Infinity) as T[]
}

const getMultipleAltTextError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the alt text of: ${id}`
const getMissingAltTextError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the alt text of: ${id}`

const [
  _queryByShadowAltText,
  _getAllByShadowAltText,
  _getByShadowAltText,
  _findAllByShadowAltText,
  _findByShadowAltText,
] = buildQueries(queryAllByShadowAltText, getMultipleAltTextError, getMissingAltTextError)

const queryByShadowAltText = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowAltText(...args) as T
}

const getByShadowAltText = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowAltText(...args) as T
}

const getAllByShadowAltText = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowAltText(...args) as T[]
}

const findByShadowAltText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowAltText(...args) as Promise<T>
}

const findAllByShadowAltText = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowAltText(...args) as Promise<T[]>
}


// Title
function queryAllByShadowTitle<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  const [container, id, options] = args

  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByTitle(el as HTMLElement, id, options)).flat(Infinity) as T[]
}

const getMultipleTitleError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the title of: ${id}`
const getMissingTitleError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the title of: ${id}`

const [
  _queryByShadowTitle,
  _getAllByShadowTitle,
  _getByShadowTitle,
  _findAllByShadowTitle,
  _findByShadowTitle,
] = buildQueries(queryAllByShadowTitle, getMultipleTitleError, getMissingTitleError)

const queryByShadowTitle = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowTitle(...args) as T
}

const getByShadowTitle = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowTitle(...args) as T
}

const getAllByShadowTitle = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowTitle(...args) as T[]
}

const findByShadowTitle = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowTitle(...args) as Promise<T>
}

const findAllByShadowTitle = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowTitle(...args) as Promise<T[]>
}



// Test Id
function queryAllByShadowTestId<T extends HTMLElement = HTMLElement>(...args: ShadowMatcherParams): T[] {
  const [container, id, options] = args

  return deepQuerySelectorAll(container, scopeQuery, options).map((el) => queryAllByTestId(el as HTMLElement, id, options)).flat(Infinity) as T[]
}

const getMultipleTestIdError = (_c: Element | null, id: Matcher) =>
  `Found multiple elements with the test id of: ${id}`
const getMissingTestIdError = (_c: Element | null, id: Matcher) =>
  `Unable to find an element with the test id of: ${id}`

const [
  _queryByShadowTestId,
  _getAllByShadowTestId,
  _getByShadowTestId,
  _findAllByShadowTestId,
  _findByShadowTestId,
] = buildQueries(queryAllByShadowTestId, getMultipleTestIdError, getMissingTestIdError)

const queryByShadowTestId = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T | null => {
  // @ts-expect-error
  return _queryByShadowTestId(...args) as T
}

const getByShadowTestId = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T => {
  // @ts-expect-error
  return _getByShadowTestId(...args) as T
}

const getAllByShadowTestId = <T extends HTMLElement = HTMLElement> (...args: ShadowMatcherParams): T[] => {
  // @ts-expect-error
  return _getAllByShadowTestId(...args) as T[]
}

const findByShadowTestId = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T> => {
  // @ts-expect-error
  return _findByShadowTestId(...args) as Promise<T>
}

const findAllByShadowTestId = <T extends HTMLElement = HTMLElement> (...args: AsyncShadowMatcherParams): Promise<T[]> => {
  // @ts-expect-error
  return _findAllByShadowTestId(...args) as Promise<T[]>
}



// Shadows the following: https://testing-library.com/docs/queries/about/#priority
let myScreen = {
  ...screen,
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

export {
  myScreen as screen,

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
