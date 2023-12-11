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
  AllByRole,
  AllByText,
  AllByBoundAttribute,
  GetByRole,
  QueryByRole,
  FindByRole,
  FindAllByRole,
  QueryByText,
  GetByText,
  FindAllByText,
  FindByText,
  QueryByBoundAttribute,
  GetByBoundAttribute,
  FindAllByBoundAttribute,
  FindByBoundAttribute,
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
): ReturnType<AllByRole<T>> {
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
  _queryByShadowRole,
  _getAllByShadowRole,
  _getByShadowRole,
  _findAllByShadowRole,
  _findByShadowRole,
] = toShadowQueries(
  buildQueries<ScreenShadowRoleMatcherParams>(
    queryAllByShadowRole,
    getMultipleRoleError,
    getMissingRoleError,
  ),
);

const queryByShadowRole = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowRole>
) => _queryByShadowRole(...args) as ReturnType<QueryByRole<T>>;
const getAllByShadowRole = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowRole>
) => _getAllByShadowRole(...args) as Array<ReturnType<GetByRole<T>>>;
const getByShadowRole = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowRole>
) => _getByShadowRole(...args) as ReturnType<GetByRole<T>>;
const findAllByShadowRole = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowRole>
) => _findAllByShadowRole(...args) as ReturnType<FindAllByRole<T>>;
const findByShadowRole = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowRole>
) => _findByShadowRole(...args) as ReturnType<FindByRole<T>>;

// Label Text
function queryAllByShadowLabelText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowSelectorMatcherParams
): ReturnType<AllByText<T>> {
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
  _queryByShadowLabelText,
  _getAllByShadowLabelText,
  _getByShadowLabelText,
  _findAllByShadowLabelText,
  _findByShadowLabelText,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowLabelText,
    getMultipleLabelTextError,
    getMissingLabelTextError,
  ),
);

const queryByShadowLabelText = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowLabelText>
) => _queryByShadowLabelText(...args) as ReturnType<QueryByText<T>>;
const getAllByShadowLabelText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowLabelText>
) => _getAllByShadowLabelText(...args) as Array<ReturnType<GetByText<T>>>;
const getByShadowLabelText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowLabelText>
) => _getByShadowLabelText(...args) as ReturnType<GetByText<T>>;
const findAllByShadowLabelText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowLabelText>
) => _findAllByShadowLabelText(...args) as ReturnType<FindAllByText<T>>;
const findByShadowLabelText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowLabelText>
) => _findByShadowLabelText(...args) as ReturnType<FindByText<T>>;

// Placeholder Text
function queryAllByShadowPlaceholderText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): ReturnType<AllByText<T>> {
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
  _queryByShadowPlaceholderText,
  _getAllByShadowPlaceholderText,
  _getByShadowPlaceholderText,
  _findAllByShadowPlaceholderText,
  _findByShadowPlaceholderText,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowPlaceholderText,
    getMultiplePlaceholderTextError,
    getMissingPlaceholderTextError,
  ),
);

const queryByShadowPlaceholderText = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowPlaceholderText>
) => _queryByShadowPlaceholderText(...args) as ReturnType<QueryByText<T>>;
const getAllByShadowPlaceholderText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowPlaceholderText>
) => _getAllByShadowPlaceholderText(...args) as Array<ReturnType<GetByText<T>>>;
const getByShadowPlaceholderText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowPlaceholderText>
) => _getByShadowPlaceholderText(...args) as ReturnType<GetByText<T>>;
const findAllByShadowPlaceholderText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowPlaceholderText>
) => _findAllByShadowPlaceholderText(...args) as ReturnType<FindAllByText<T>>;
const findByShadowPlaceholderText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowPlaceholderText>
) => _findByShadowPlaceholderText(...args) as ReturnType<FindByText<T>>;

// Text
function queryAllByShadowText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowSelectorMatcherParams
): ReturnType<AllByText<T>> {
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
  _queryByShadowText,
  _getAllByShadowText,
  _getByShadowText,
  _findAllByShadowText,
  _findByShadowText,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowText,
    getMultipleTextError,
    getMissingTextError,
  ),
);

const queryByShadowText = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowText>
) => _queryByShadowText(...args) as ReturnType<QueryByText<T>>;
const getAllByShadowText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowText>
) => _getAllByShadowText(...args) as Array<ReturnType<GetByText<T>>>;
const getByShadowText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowText>
) => _getByShadowText(...args) as ReturnType<GetByText<T>>;
const findAllByShadowText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowText>
) => _findAllByShadowText(...args) as ReturnType<FindAllByText<T>>;
const findByShadowText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowText>
) => _findByShadowText(...args) as ReturnType<FindByText<T>>;

// Display Value
function queryAllByShadowDisplayValue<T extends HTMLElement = HTMLElement>(
  ...args: ShadowSelectorMatcherParams
): ReturnType<AllByBoundAttribute<T>> {
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
  _queryByShadowDisplayValue,
  _getAllByShadowDisplayValue,
  _getByShadowDisplayValue,
  _findAllByShadowDisplayValue,
  _findByShadowDisplayValue,
] = toShadowQueries(
  buildQueries<ScreenShadowSelectorMatcherParams>(
    queryAllByShadowDisplayValue,
    getMultipleDisplayValueError,
    getMissingDisplayValueError,
  ),
);

const queryByShadowDisplayValue = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowDisplayValue>
) =>
  _queryByShadowDisplayValue(...args) as ReturnType<QueryByBoundAttribute<T>>;
const getAllByShadowDisplayValue = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowDisplayValue>
) =>
  _getAllByShadowDisplayValue(...args) as Array<
    ReturnType<GetByBoundAttribute<T>>
  >;
const getByShadowDisplayValue = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowDisplayValue>
) => _getByShadowDisplayValue(...args) as ReturnType<GetByBoundAttribute<T>>;
const findAllByShadowDisplayValue = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowDisplayValue>
) =>
  _findAllByShadowDisplayValue(...args) as ReturnType<
    FindAllByBoundAttribute<T>
  >;
const findByShadowDisplayValue = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowDisplayValue>
) => _findByShadowDisplayValue(...args) as ReturnType<FindByBoundAttribute<T>>;

// Alt Text
function queryAllByShadowAltText<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): ReturnType<AllByText<T>> {
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
  _queryByShadowAltText,
  _getAllByShadowAltText,
  _getByShadowAltText,
  _findAllByShadowAltText,
  _findByShadowAltText,
] = toShadowQueries(
  buildQueries<ScreenShadowMatcherParams>(
    queryAllByShadowAltText,
    getMultipleAltTextError,
    getMissingAltTextError,
  ),
);

const queryByShadowAltText = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowAltText>
) => _queryByShadowAltText(...args) as ReturnType<QueryByText<T>>;
const getAllByShadowAltText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowAltText>
) => _getAllByShadowAltText(...args) as Array<ReturnType<GetByText<T>>>;
const getByShadowAltText = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowAltText>
) => _getByShadowAltText(...args) as ReturnType<GetByText<T>>;
const findAllByShadowAltText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowAltText>
) => _findAllByShadowAltText(...args) as ReturnType<FindAllByText<T>>;
const findByShadowAltText = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowAltText>
) => _findByShadowAltText(...args) as ReturnType<FindByText<T>>;

// Title
function queryAllByShadowTitle<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): ReturnType<AllByBoundAttribute<T>> {
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
  _queryByShadowTitle,
  _getAllByShadowTitle,
  _getByShadowTitle,
  _findAllByShadowTitle,
  _findByShadowTitle,
] = toShadowQueries(
  buildQueries<ScreenShadowMatcherParams>(
    queryAllByShadowTitle,
    getMultipleTitleError,
    getMissingTitleError,
  ),
);

const queryByShadowTitle = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowTitle>
) => _queryByShadowTitle(...args) as ReturnType<QueryByBoundAttribute<T>>;
const getAllByShadowTitle = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowTitle>
) => _getAllByShadowTitle(...args) as Array<ReturnType<GetByBoundAttribute<T>>>;
const getByShadowTitle = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowTitle>
) => _getByShadowTitle(...args) as ReturnType<GetByBoundAttribute<T>>;
const findAllByShadowTitle = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowTitle>
) => _findAllByShadowTitle(...args) as ReturnType<FindAllByBoundAttribute<T>>;
const findByShadowTitle = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowTitle>
) => _findByShadowTitle(...args) as ReturnType<FindByBoundAttribute<T>>;

// Test Id
function queryAllByShadowTestId<T extends HTMLElement = HTMLElement>(
  ...args: ShadowMatcherParams
): ReturnType<AllByBoundAttribute<T>> {
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
  _queryByShadowTestId,
  _getAllByShadowTestId,
  _getByShadowTestId,
  _findAllByShadowTestId,
  _findByShadowTestId,
] = toShadowQueries(
  buildQueries<ScreenShadowMatcherParams>(
    queryAllByShadowTestId,
    getMultipleTestIdError,
    getMissingTestIdError,
  ),
);

const queryByShadowTestId = <T extends HTMLElement>(
  ...args: Parameters<typeof _queryByShadowTestId>
) => _queryByShadowTestId(...args) as ReturnType<QueryByBoundAttribute<T>>;
const getAllByShadowTestId = <T extends HTMLElement>(
  ...args: Parameters<typeof _getAllByShadowTestId>
) =>
  _getAllByShadowTestId(...args) as Array<ReturnType<GetByBoundAttribute<T>>>;
const getByShadowTestId = <T extends HTMLElement>(
  ...args: Parameters<typeof _getByShadowTestId>
) => _getByShadowTestId(...args) as ReturnType<GetByBoundAttribute<T>>;
const findAllByShadowTestId = <T extends HTMLElement>(
  ...args: Parameters<typeof _findAllByShadowTestId>
) => _findAllByShadowTestId(...args) as ReturnType<FindAllByBoundAttribute<T>>;
const findByShadowTestId = <T extends HTMLElement>(
  ...args: Parameters<typeof _findByShadowTestId>
) => _findByShadowTestId(...args) as ReturnType<FindByBoundAttribute<T>>;

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
