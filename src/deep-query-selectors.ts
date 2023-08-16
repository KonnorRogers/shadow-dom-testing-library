import { findAllElements } from "shadow-dom-walk";
import { patchWrap } from "./trick-dom-testing-library";
import { Container, ShadowOptions } from "./types";

export function deepQuerySelector<T extends HTMLElement>(
  container: Container,
  selector: string,
  options: ShadowOptions = { shallow: false, maxDepth: Infinity }
): T | null {
  const els = deepQuerySelectorAll(container, selector, options);

  if (Array.isArray(els) && els.length > 0) {
    return els[0] as T | null;
  }

  return null;
}

/**
 * `deepQuerySelector` behaves like a normal querySelector except it will recurse into the container ShadowRoot
 * and shadowRoot of children. It will not return shadow roots.
 *
 * @example
 *   // <my-element>
 *   //   #shadowRoot <slot name="blah"></slot>
 *   //   <div></div>
 *   // </my-element>
 *   deepQuerySelectorAll(myElement, "*") // => [slot, div]
 *   deepQuerySelectorAll(myElement, "slot[name='blah']") // => [slot]
 */
export function deepQuerySelectorAll<T extends HTMLElement>(
  container: Container,
  selector: string,
  options: ShadowOptions = { shallow: false, maxDepth: Infinity }
): T[] {
  return patchWrap(() => {
    const elements = getAllElementsAndShadowRoots(container, options);

    const queriedElements = elements
      .map((el) => Array.from(el.querySelectorAll<T>(selector)))
      .flat(Infinity) as T[];
    return [...new Set(queriedElements)];
  });
}

// This could probably get really slow and memory intensive in large DOMs,
// maybe an infinite generator in the future?
export function getAllElementsAndShadowRoots(
  container: Container,
  options: ShadowOptions = { shallow: false, maxDepth: Infinity }
) {
  if (options.shallow === true) {
    console.warn("The 'shallow' option will go away in v2.0.0 of SDTL. The replacement will be 'maxDepth: 1'")
    options.maxDepth = 1
  }

  return findAllElements(container, options.maxDepth)
}
