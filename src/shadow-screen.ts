import { debug } from "./debug";
import { screen } from "@testing-library/dom";

import * as shadowQueries from "./shadow-queries";
import {
  AsyncScreenShadowMatcherParams,
  AsyncScreenShadowRoleMatcherParams,
  AsyncScreenShadowSelectorMatcherParams,
  ScreenShadowMatcherParams,
  ScreenShadowRoleMatcherParams,
  ScreenShadowSelectorMatcherParams,
} from "./types";

// Shadows the following: https://testing-library.com/docs/queries/about/#priority
const shadowScreen = {
  ...screen,
  debug,
  // Role
  queryAllByShadowRole: (...args: ScreenShadowRoleMatcherParams) =>
    shadowQueries.queryAllByShadowRole(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowRole: (...args: ScreenShadowRoleMatcherParams) =>
    shadowQueries.queryByShadowRole(document.documentElement, args[0], args[1]),
  getAllByShadowRole: (...args: ScreenShadowRoleMatcherParams) =>
    shadowQueries.getAllByShadowRole(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowRole: (...args: ScreenShadowRoleMatcherParams) =>
    shadowQueries.getByShadowRole(document.documentElement, args[0], args[1]),
  findAllByShadowRole: (...args: AsyncScreenShadowRoleMatcherParams) =>
    shadowQueries.findAllByShadowRole(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowRole: (...args: AsyncScreenShadowRoleMatcherParams) =>
    shadowQueries.findByShadowRole(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Label Text
  queryAllByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.queryAllByShadowLabelText(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.queryByShadowLabelText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getAllByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.getAllByShadowLabelText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowLabelText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.getByShadowLabelText(
      document.documentElement,
      args[0],
      args[1]
    ),
  findAllByShadowLabelText: (...args: AsyncScreenShadowSelectorMatcherParams) =>
    shadowQueries.findAllByShadowLabelText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowLabelText: (...args: AsyncScreenShadowSelectorMatcherParams) =>
    shadowQueries.findByShadowLabelText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Placeholder Text
  queryAllByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryAllByShadowPlaceholderText(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryByShadowPlaceholderText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getAllByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getAllByShadowPlaceholderText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowPlaceholderText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getByShadowPlaceholderText(
      document.documentElement,
      args[0],
      args[1]
    ),
  findAllByShadowPlaceholderText: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findAllByShadowPlaceholderText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowPlaceholderText: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findByShadowPlaceholderText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Text
  queryAllByShadowText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.queryAllByShadowText(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.queryByShadowText(document.documentElement, args[0], args[1]),
  getAllByShadowText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.getAllByShadowText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowText: (...args: ScreenShadowSelectorMatcherParams) =>
    shadowQueries.getByShadowText(document.documentElement, args[0], args[1]),
  findAllByShadowText: (...args: AsyncScreenShadowSelectorMatcherParams) =>
    shadowQueries.findAllByShadowText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowText: (...args: AsyncScreenShadowSelectorMatcherParams) =>
    shadowQueries.findByShadowText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Display Value
  queryAllByShadowDisplayValue: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryAllByShadowDisplayValue(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowDisplayValue: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryByShadowDisplayValue(
      document.documentElement,
      args[0],
      args[1]
    ),
  getAllByShadowDisplayValue: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getAllByShadowDisplayValue(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowDisplayValue: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getByShadowDisplayValue(
      document.documentElement,
      args[0],
      args[1]
    ),
  findAllByShadowDisplayValue: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findAllByShadowDisplayValue(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowDisplayValue: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findByShadowDisplayValue(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Alt Text
  queryAllByShadowAltText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryAllByShadowAltText(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowAltText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryByShadowAltText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getAllByShadowAltText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getAllByShadowAltText(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowAltText: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getByShadowAltText(
      document.documentElement,
      args[0],
      args[1]
    ),
  findAllByShadowAltText: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findAllByShadowAltText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowAltText: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findByShadowAltText(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Title
  queryAllByShadowTitle: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryAllByShadowTitle(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowTitle: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryByShadowTitle(
      document.documentElement,
      args[0],
      args[1]
    ),
  getAllByShadowTitle: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getAllByShadowTitle(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowTitle: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getByShadowTitle(document.documentElement, args[0], args[1]),
  findAllByShadowTitle: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findAllByShadowTitle(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowTitle: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findByShadowTitle(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),

  // Test Id
  queryAllByShadowTestId: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryAllByShadowTestId(
      document.documentElement,
      args[0],
      args[1]
    ),
  queryByShadowTestId: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.queryByShadowTestId(
      document.documentElement,
      args[0],
      args[1]
    ),
  getAllByShadowTestId: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getAllByShadowTestId(
      document.documentElement,
      args[0],
      args[1]
    ),
  getByShadowTestId: (...args: ScreenShadowMatcherParams) =>
    shadowQueries.getByShadowTestId(document.documentElement, args[0], args[1]),
  findAllByShadowTestId: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findAllByShadowTestId(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
  findByShadowTestId: (...args: AsyncScreenShadowMatcherParams) =>
    shadowQueries.findByShadowTestId(
      document.documentElement,
      args[0],
      args[1],
      args[2]
    ),
};

export { shadowScreen };
