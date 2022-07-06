import {buildQueries, screen, ByRoleMatcher, ByRoleOptions, queryAllByRole, SelectorMatcherOptions, queryAllByLabelText, Matcher, queryAllByPlaceholderText, MatcherOptions, queryAllByText, queryAllByDisplayValue, queryAllByAltText, queryAllByTitle, queryAllByTestId} from '@testing-library/dom'

export type Container = HTMLElement | Document | ShadowRoot
export type ShadowOptions = { shallow: boolean }
export type ShadowByRoleOptions = ByRoleOptions & ShadowOptions
export type ShadowMatcherOptions = MatcherOptions & ShadowOptions
export type ShadowSelectorMatcherOptions = SelectorMatcherOptions & ShadowOptions

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

// Role
function queryAllByShadowRole<T extends HTMLElement = HTMLElement>(container: HTMLElement, role: ByRoleMatcher, options?: ShadowByRoleOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByRole(el, role, options)).flat(Infinity) as T[]
}

const getMultipleRoleError = (_c: Element | null, role: string) =>
  `Found multiple elements with the role of: ${role}`
const getMissingRoleError = (_c: Element | null, role: string) =>
  `Unable to find an element with the role of: ${role}`

const [
  queryByShadowRole,
  getAllByShadowRole,
  getByShadowRole,
  findAllByShadowRole,
  findByShadowRole,
] = buildQueries(queryAllByShadowRole, getMultipleRoleError, getMissingRoleError)



// Label Text
function queryAllByShadowLabelText<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowSelectorMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByLabelText(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowLabelText, getMultipleLabelTextError, getMissingLabelTextError)



// Placeholder Text
function queryAllByShadowPlaceholderText<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByPlaceholderText(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowPlaceholderText, getMultiplePlaceholderTextError, getMissingPlaceholderTextError)



// Text
function queryAllByShadowText<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowSelectorMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByText(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowText, getMultipleTextError, getMissingTextError)



// Display Value
function queryAllByShadowDisplayValue<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByDisplayValue(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowDisplayValue, getMultipleDisplayValueError, getMissingDisplayValueError)



// Alt Text
function queryAllByShadowAltText<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByAltText(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowAltText, getMultipleAltTextError, getMissingAltTextError)


// Title
function queryAllByShadowTitle<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByTitle(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowTitle, getMultipleTitleError, getMissingTitleError)

// Test Id
function queryAllByShadowTestId<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: Matcher, options?: ShadowMatcherOptions | undefined): T[] {
  const elements = deepQuerySelectorAll(container, "*")

  // @ts-expect-error
  return elements.map((el) => queryAllByTestId(el, id, options)).flat(Infinity) as T[]
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
] = buildQueries(queryAllByShadowTestId, getMultipleTestIdError, getMissingTestIdError)

// Shadows the following: https://testing-library.com/docs/queries/about/#priority
let myScreen = {
  ...screen,
  // Role
  queryAllByShadowRole: (role: ByRoleMatcher, options?: ShadowMatcherOptions | undefined) => queryAllByShadowRole(document.documentElement, role, options),

  // Pretty sure this is a typing issue with the buildQueries generator.

  // @ts-expect-error
  queryByShadowRole: (role: ByRoleMatcher, options?: ShadowMatcherOptions | undefined) => queryByShadowRole(document.documentElement, role, options),
  // @ts-expect-error
  getAllByShadowRole: (role: ByRoleMatcher, options?: ShadowMatcherOptions | undefined) => getAllByShadowRole(document.documentElement, role, options),
  // @ts-expect-error
  getByShadowRole: (role: ByRoleMatcher, options?: ShadowMatcherOptions | undefined) => getByShadowRole(document.documentElement, role, options),
  // TS expects "role" to be a "string" and not a roleMatcher.
  // @ts-expect-error
  findAllByShadowRole: (role: ByRoleMatcher, ...args: any[]) => findAllByShadowRole(document.documentElement, role, ...args),
  // @ts-expect-error
  findByShadowRole: (role: ByRoleMatcher, ...args: any[]) => findByShadowRole(document.documentElement, role, ...args),

  // Label Text
  queryAllByShadowLabelText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => queryAllByShadowLabelText(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowLabelText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => queryByShadowLabelText(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowLabelText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => getAllByShadowLabelText(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowLabelText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => getByShadowLabelText(document.documentElement, id, options),
  findAllByShadowLabelText: (id: Matcher, ...args: any[]) => findAllByShadowLabelText(document.documentElement, id, ...args),
  findByShadowLabelText: (id: Matcher, ...args: any[]) => findByShadowLabelText(document.documentElement, id, ...args),

  // Placeholder Text
  queryAllByShadowPlaceholderText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryAllByShadowPlaceholderText(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowPlaceholderText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryByShadowPlaceholderText(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowPlaceholderText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getAllByShadowPlaceholderText(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowPlaceholderText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getByShadowPlaceholderText(document.documentElement, id, options),
  findAllByShadowPlaceholderText: (id: Matcher, ...args: any[]) => findAllByShadowPlaceholderText(document.documentElement, id, ...args),
  findByShadowPlaceholderText: (id: Matcher, ...args: any[]) => findByShadowPlaceholderText(document.documentElement, id, ...args),

  // Text
  queryAllByShadowText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => queryAllByShadowText(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => queryByShadowText(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => getAllByShadowText(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowText: (id: Matcher, options?: ShadowSelectorMatcherOptions | undefined) => getByShadowText(document.documentElement, id, options),
  findAllByShadowText: (id: Matcher, ...args: any[]) => findAllByShadowText(document.documentElement, id, ...args),
  findByShadowText: (id: Matcher, ...args: any[]) => findByShadowText(document.documentElement, id, ...args),

  // Display Value
  queryAllByShadowDisplayValue: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryAllByShadowDisplayValue(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowDisplayValue: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryByShadowDisplayValue(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowDisplayValue: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getAllByShadowDisplayValue(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowDisplayValue: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getByShadowDisplayValue(document.documentElement, id, options),
  findAllByShadowDisplayValue: (id: Matcher, ...args: any[]) => findAllByShadowDisplayValue(document.documentElement, id, ...args),
  findByShadowDisplayValue: (id: Matcher, ...args: any[]) => findByShadowDisplayValue(document.documentElement, id, ...args),

  // Alt Text
  queryAllByShadowAltText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryAllByShadowAltText(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowAltText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryByShadowAltText(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowAltText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getAllByShadowAltText(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowAltText: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getByShadowAltText(document.documentElement, id, options),
  findAllByShadowAltText: (id: Matcher, ...args: any[]) => findAllByShadowAltText(document.documentElement, id, ...args),
  findByShadowAltText: (id: Matcher, ...args: any[]) => findByShadowAltText(document.documentElement, id, ...args),

  // Title
  queryAllByShadowTitle: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryAllByShadowTitle(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowTitle: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryByShadowTitle(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowTitle: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getAllByShadowTitle(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowTitle: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getByShadowTitle(document.documentElement, id, options),
  findAllByShadowTitle: (id: Matcher, ...args: any[]) => findAllByShadowTitle(document.documentElement, id, ...args),
  findByShadowTitle: (id: Matcher, ...args: any[]) => findByShadowTitle(document.documentElement, id, ...args),

  // Test Id
  queryAllByShadowTestId: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryAllByShadowTestId(document.documentElement, id, options),
  // @ts-expect-error
  queryByShadowTestId: (id: Matcher, options?: ShadowMatcherOptions | undefined) => queryByShadowTestId(document.documentElement, id, options),
  // @ts-expect-error
  getAllByShadowTestId: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getAllByShadowTestId(document.documentElement, id, options),
  // @ts-expect-error
  getByShadowTestId: (id: Matcher, options?: ShadowMatcherOptions | undefined) => getByShadowTestId(document.documentElement, id, options),
  findAllByShadowTestId: (id: Matcher, ...args: any[]) => findAllByShadowTestId(document.documentElement, id, ...args),
  findByShadowTestId: (id: Matcher, ...args: any[]) => findByShadowTestId(document.documentElement, id, ...args),
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
