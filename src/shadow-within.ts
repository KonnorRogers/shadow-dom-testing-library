import { queries, within } from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries";

const allQueries = {
  ...queries,
  ...shadowQueries,
};

export function shadowWithin(element: HTMLElement) {
  const withinObj = within(element, allQueries);

  // This is a gross and ugly hack. However, the `allQueries` function from RTL doesn't
  // preserve generics, so we generate the within object, and then overwrite the "shadow" functions to properly
  // support generics.
  const shadowWithinObj = {
    // Role
    queryAllByShadowRole: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowRole>
    ) =>
      withinObj.queryAllByShadowRole(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowRole<T>
      >,
    queryByShadowRole: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowRole>
    ) =>
      withinObj.queryByShadowRole(...args) as ReturnType<
        typeof shadowQueries.queryByShadowRole<T>
      >,
    getAllByShadowRole: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowRole>
    ) =>
      withinObj.getAllByShadowRole(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowRole<T>
      >,
    getByShadowRole: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowRole>
    ) =>
      withinObj.getByShadowRole(...args) as ReturnType<
        typeof shadowQueries.getByShadowRole<T>
      >,
    findAllByShadowRole: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowRole>
    ) =>
      withinObj.findAllByShadowRole(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowRole<T>
      >,
    findByShadowRole: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowRole>
    ) =>
      withinObj.findByShadowRole(...args) as ReturnType<
        typeof shadowQueries.findByShadowRole<T>
      >,

    // Label Text
    queryAllByShadowLabelText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowLabelText>
    ) =>
      withinObj.queryAllByShadowLabelText(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowLabelText<T>
      >,
    queryByShadowLabelText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowLabelText>
    ) =>
      withinObj.queryByShadowLabelText(...args) as ReturnType<
        typeof shadowQueries.queryByShadowLabelText<T>
      >,
    getAllByShadowLabelText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowLabelText>
    ) =>
      withinObj.getAllByShadowLabelText(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowLabelText<T>
      >,
    getByShadowLabelText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowLabelText>
    ) =>
      withinObj.getByShadowLabelText(...args) as ReturnType<
        typeof shadowQueries.getByShadowLabelText<T>
      >,
    findAllByShadowLabelText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowLabelText>
    ) =>
      withinObj.findAllByShadowLabelText(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowLabelText<T>
      >,
    findByShadowLabelText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowLabelText>
    ) =>
      withinObj.findByShadowLabelText(...args) as ReturnType<
        typeof shadowQueries.findByShadowLabelText<T>
      >,

    // Placeholder Text
    queryAllByShadowPlaceholderText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowPlaceholderText>
    ) =>
      withinObj.queryAllByShadowPlaceholderText(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowPlaceholderText<T>
      >,
    queryByShadowPlaceholderText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowPlaceholderText>
    ) =>
      withinObj.queryByShadowPlaceholderText(...args) as ReturnType<
        typeof shadowQueries.queryByShadowPlaceholderText<T>
      >,
    getAllByShadowPlaceholderText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowPlaceholderText>
    ) =>
      withinObj.getAllByShadowPlaceholderText(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowPlaceholderText<T>
      >,
    getByShadowPlaceholderText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowPlaceholderText>
    ) =>
      withinObj.getByShadowPlaceholderText(...args) as ReturnType<
        typeof shadowQueries.getByShadowPlaceholderText<T>
      >,
    findAllByShadowPlaceholderText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowPlaceholderText>
    ) =>
      withinObj.findAllByShadowPlaceholderText(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowPlaceholderText<T>
      >,
    findByShadowPlaceholderText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowPlaceholderText>
    ) =>
      withinObj.findByShadowPlaceholderText(...args) as ReturnType<
        typeof shadowQueries.findByShadowPlaceholderText<T>
      >,

    // Text
    queryAllByShadowText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowText>
    ) =>
      withinObj.queryAllByShadowText(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowText<T>
      >,
    queryByShadowText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowText>
    ) =>
      withinObj.queryByShadowText(...args) as ReturnType<
        typeof shadowQueries.queryByShadowText<T>
      >,
    getAllByShadowText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowText>
    ) =>
      withinObj.getAllByShadowText(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowText<T>
      >,
    getByShadowText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowText>
    ) =>
      withinObj.getByShadowText(...args) as ReturnType<
        typeof shadowQueries.getByShadowText<T>
      >,
    findAllByShadowText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowText>
    ) =>
      withinObj.findAllByShadowText(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowText<T>
      >,
    findByShadowText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowText>
    ) =>
      withinObj.findByShadowText(...args) as ReturnType<
        typeof shadowQueries.findByShadowText<T>
      >,

    // Display Value
    queryAllByShadowDisplayValue: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowDisplayValue>
    ) =>
      withinObj.queryAllByShadowDisplayValue(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowDisplayValue<T>
      >,
    queryByShadowDisplayValue: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowDisplayValue>
    ) =>
      withinObj.queryByShadowDisplayValue(...args) as ReturnType<
        typeof shadowQueries.queryByShadowDisplayValue<T>
      >,
    getAllByShadowDisplayValue: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowDisplayValue>
    ) =>
      withinObj.getAllByShadowDisplayValue(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowDisplayValue<T>
      >,
    getByShadowDisplayValue: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowDisplayValue>
    ) =>
      withinObj.getByShadowDisplayValue(...args) as ReturnType<
        typeof shadowQueries.getByShadowDisplayValue<T>
      >,
    findAllByShadowDisplayValue: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowDisplayValue>
    ) =>
      withinObj.findAllByShadowDisplayValue(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowDisplayValue<T>
      >,
    findByShadowDisplayValue: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowDisplayValue>
    ) =>
      withinObj.findByShadowDisplayValue(...args) as ReturnType<
        typeof shadowQueries.findByShadowDisplayValue<T>
      >,

    // Alt Text
    queryAllByShadowAltText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowAltText>
    ) =>
      withinObj.queryAllByShadowAltText(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowAltText<T>
      >,
    queryByShadowAltText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowAltText>
    ) =>
      withinObj.queryByShadowAltText(...args) as ReturnType<
        typeof shadowQueries.queryByShadowAltText<T>
      >,
    getAllByShadowAltText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowAltText>
    ) =>
      withinObj.getAllByShadowAltText(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowAltText<T>
      >,
    getByShadowAltText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowAltText>
    ) =>
      withinObj.getByShadowAltText(...args) as ReturnType<
        typeof shadowQueries.getByShadowAltText<T>
      >,
    findAllByShadowAltText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowAltText>
    ) =>
      withinObj.findAllByShadowAltText(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowAltText<T>
      >,
    findByShadowAltText: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowAltText>
    ) =>
      withinObj.findByShadowAltText(...args) as ReturnType<
        typeof shadowQueries.findByShadowAltText<T>
      >,

    // Title
    queryAllByShadowTitle: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowTitle>
    ) =>
      withinObj.queryAllByShadowTitle(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowTitle<T>
      >,
    queryByShadowTitle: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowTitle>
    ) =>
      withinObj.queryByShadowTitle(...args) as ReturnType<
        typeof shadowQueries.queryByShadowTitle<T>
      >,
    getAllByShadowTitle: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowTitle>
    ) =>
      withinObj.getAllByShadowTitle(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowTitle<T>
      >,
    getByShadowTitle: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowTitle>
    ) =>
      withinObj.getByShadowTitle(...args) as ReturnType<
        typeof shadowQueries.getByShadowTitle<T>
      >,
    findAllByShadowTitle: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowTitle>
    ) =>
      withinObj.findAllByShadowTitle(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowTitle<T>
      >,
    findByShadowTitle: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowTitle>
    ) =>
      withinObj.findByShadowTitle(...args) as ReturnType<
        typeof shadowQueries.findByShadowTitle<T>
      >,

    // Test Id
    queryAllByShadowTestId: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryAllByShadowTestId>
    ) =>
      withinObj.queryAllByShadowTestId(...args) as ReturnType<
        typeof shadowQueries.queryAllByShadowTestId<T>
      >,
    queryByShadowTestId: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.queryByShadowTestId>
    ) =>
      withinObj.queryByShadowTestId(...args) as ReturnType<
        typeof shadowQueries.queryByShadowTestId<T>
      >,
    getAllByShadowTestId: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getAllByShadowTestId>
    ) =>
      withinObj.getAllByShadowTestId(...args) as ReturnType<
        typeof shadowQueries.getAllByShadowTestId<T>
      >,
    getByShadowTestId: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.getByShadowTestId>
    ) =>
      withinObj.getByShadowTestId(...args) as ReturnType<
        typeof shadowQueries.getByShadowTestId<T>
      >,
    findAllByShadowTestId: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findAllByShadowTestId>
    ) =>
      withinObj.findAllByShadowTestId(...args) as ReturnType<
        typeof shadowQueries.findAllByShadowTestId<T>
      >,
    findByShadowTestId: <T extends HTMLElement>(
      ...args: Parameters<typeof withinObj.findByShadowTestId>
    ) =>
      withinObj.findByShadowTestId(...args) as ReturnType<
        typeof shadowQueries.findByShadowTestId<T>
      >,
  };

  // return withinFn

  const finalObj = {
    ...withinObj,
    ...shadowWithinObj,
  };

  return finalObj;
}
