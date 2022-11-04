import { ByRoleOptions, MatcherOptions, SelectorMatcherOptions, ByRoleMatcher, Matcher, waitForOptions } from "@testing-library/dom"

export type Container = HTMLElement | Document | ShadowRoot;

// Allow shallow queries to be appended to the default options of DOM testing library
export interface ShadowOptions {
  shallow?: boolean;
}
export interface ShadowByRoleOptions extends ByRoleOptions, ShadowOptions {}
export interface ShadowMatcherOptions extends MatcherOptions, ShadowOptions {}
export interface ShadowSelectorMatcherOptions
  extends SelectorMatcherOptions,
    ShadowOptions {}

// For queryBy / getBy queries
export type ShadowRoleMatcherParams = [
  container: HTMLElement,
  ...args: ScreenShadowRoleMatcherParams
];
export type ShadowSelectorMatcherParams = [
  container: HTMLElement,
  ...args: ScreenShadowSelectorMatcherParams
];
export type ShadowMatcherParams = [
  container: HTMLElement,
  ...args: ScreenShadowMatcherParams
];

export type ScreenShadowRoleMatcherParams = [
  role: ByRoleMatcher,
  options?: ShadowByRoleOptions | undefined
];
export type ScreenShadowSelectorMatcherParams = [
  id: Matcher,
  options?: ShadowSelectorMatcherOptions | undefined
];
export type ScreenShadowMatcherParams = [
  id: Matcher,
  options?: ShadowMatcherOptions | undefined
];

// For findBy queries
export type AsyncShadowRoleMatcherParams = [
  container: HTMLElement,
  ...args: AsyncScreenShadowRoleMatcherParams
];
export type AsyncShadowSelectorMatcherParams = [
  container: HTMLElement,
  ...args: AsyncScreenShadowSelectorMatcherParams
];
export type AsyncShadowMatcherParams = [
  container: HTMLElement,
  ...args: AsyncScreenShadowMatcherParams
];

export type AsyncScreenShadowRoleMatcherParams = [
  role: ByRoleMatcher,
  options?: ShadowByRoleOptions | undefined,
  waitForOptions?: waitForOptions | undefined
];
export type AsyncScreenShadowSelectorMatcherParams = [
  id: Matcher,
  options?: ShadowSelectorMatcherOptions | undefined,
  waitForOptions?: waitForOptions | undefined
];
export type AsyncScreenShadowMatcherParams = [
  id: Matcher,
  options?: ShadowMatcherOptions | undefined,
  waitForOptions?: waitForOptions | undefined
];

