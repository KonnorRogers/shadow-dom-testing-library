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
  queryAllByShadowRole: <T extends HTMLElement>(
    ...args: ScreenShadowRoleMatcherParams
  ) =>
    shadowQueries.queryAllByShadowRole<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowRole: <T extends HTMLElement>(
    ...args: ScreenShadowRoleMatcherParams
  ) =>
    shadowQueries.queryByShadowRole<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowRole: <T extends HTMLElement>(
    ...args: ScreenShadowRoleMatcherParams
  ) =>
    shadowQueries.getAllByShadowRole<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowRole: <T extends HTMLElement>(
    ...args: ScreenShadowRoleMatcherParams
  ) =>
    shadowQueries.getByShadowRole<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowRole: <T extends HTMLElement>(
    ...args: AsyncScreenShadowRoleMatcherParams
  ) =>
    shadowQueries.findAllByShadowRole<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowRole: <T extends HTMLElement>(
    ...args: AsyncScreenShadowRoleMatcherParams
  ) =>
    shadowQueries.findByShadowRole<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Label Text
  queryAllByShadowLabelText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.queryAllByShadowLabelText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowLabelText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.queryByShadowLabelText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowLabelText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.getAllByShadowLabelText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowLabelText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.getByShadowLabelText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowLabelText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.findAllByShadowLabelText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowLabelText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.findByShadowLabelText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Placeholder Text
  queryAllByShadowPlaceholderText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryAllByShadowPlaceholderText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowPlaceholderText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryByShadowPlaceholderText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowPlaceholderText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getAllByShadowPlaceholderText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowPlaceholderText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getByShadowPlaceholderText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowPlaceholderText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findAllByShadowPlaceholderText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowPlaceholderText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findByShadowPlaceholderText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Text
  queryAllByShadowText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.queryAllByShadowText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.queryByShadowText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.getAllByShadowText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowText: <T extends HTMLElement>(
    ...args: ScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.getByShadowText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.findAllByShadowText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowSelectorMatcherParams
  ) =>
    shadowQueries.findByShadowText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Display Value
  queryAllByShadowDisplayValue: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryAllByShadowDisplayValue<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowDisplayValue: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryByShadowDisplayValue<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowDisplayValue: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getAllByShadowDisplayValue<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowDisplayValue: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getByShadowDisplayValue<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowDisplayValue: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findAllByShadowDisplayValue<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowDisplayValue: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findByShadowDisplayValue<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Alt Text
  queryAllByShadowAltText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryAllByShadowAltText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowAltText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryByShadowAltText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowAltText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getAllByShadowAltText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowAltText: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getByShadowAltText<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowAltText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findAllByShadowAltText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowAltText: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findByShadowAltText<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Title
  queryAllByShadowTitle: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryAllByShadowTitle<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowTitle: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryByShadowTitle<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowTitle: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getAllByShadowTitle<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowTitle: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getByShadowTitle<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowTitle: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findAllByShadowTitle<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowTitle: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findByShadowTitle<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),

  // Test Id
  queryAllByShadowTestId: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryAllByShadowTestId<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  queryByShadowTestId: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.queryByShadowTestId<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getAllByShadowTestId: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getAllByShadowTestId<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  getByShadowTestId: <T extends HTMLElement>(
    ...args: ScreenShadowMatcherParams
  ) =>
    shadowQueries.getByShadowTestId<T>(
      document.documentElement,
      args[0],
      args[1],
    ),
  findAllByShadowTestId: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findAllByShadowTestId<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
  findByShadowTestId: <T extends HTMLElement>(
    ...args: AsyncScreenShadowMatcherParams
  ) =>
    shadowQueries.findByShadowTestId<T>(
      document.documentElement,
      args[0],
      args[1],
      args[2],
    ),
};

export { shadowScreen };
