import { patchWrap } from "./trick-dom-testing-library";
import { Container, ShadowOptions } from "./types";

function fixOptions(options: ShadowOptions) {
  if (options.shallow != null) {
    console.warn(
      `The "shallow" option will be removed in the next major release. Please use "{depth: 1}" to maintain the same functionality.`,
    );

    if (options.shallow === true) {
      options.depth = 1;
    }
  }

  if (!options.depth) {
    options.depth = Infinity;
  }

  return options;
}

export function deepQuerySelector<T extends HTMLElement>(
  container: Container,
  selector: string,
  options: ShadowOptions = { shallow: false, depth: Infinity },
): T | null {
  options = fixOptions(options);

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
  options: ShadowOptions = { shallow: false, depth: Infinity },
): T[] {
  options = fixOptions(options);

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
  options: ShadowOptions = { shallow: false, depth: Infinity },
) {
  options = fixOptions(options);
  const selector = "*";

  return recurse(container, selector, options);
}

function recurse(
  container: Container,
  selector: string,
  options: ShadowOptions = { shallow: false, depth: Infinity },
  elementsToProcess: (Element | ShadowRoot | Document)[] = [],
  elements: (Element | ShadowRoot | Document)[] = [],
  currentDepth = 1,
) {
  // if "document" is passed in, it will also pick up "<html>" causing the query to run twice.
  if (container instanceof Document) {
    container = document.documentElement;
  }

  // I haven't figured this one out, but for some reason when using the buildQueries
  // from DOM-testing-library, not reassigning here causes an infinite loop.
  // I've even tried calling "elementsToProcess.includes / .find" with no luck.
  elementsToProcess = [container];
  elements.push(container); // Make sure we're checking the container element!

  // Accounts for if the container houses a textNode
  if (
    container instanceof HTMLElement &&
    container.shadowRoot != null &&
    container.shadowRoot.mode !== "closed"
  ) {
    elements.push(container.shadowRoot);
    elementsToProcess.push(container.shadowRoot);
  }

  elementsToProcess.forEach((containerElement) => {
    containerElement
      .querySelectorAll(selector)
      .forEach((el: Element | HTMLElement) => {
        if (el.shadowRoot == null || el.shadowRoot.mode === "closed") {
          elements.push(el);
          return;
        }

        // This is here because queryByRole() requires the parent element which in some cases is the shadow root.
        elements.push(el.shadowRoot);

        if (options.depth && options.depth <= currentDepth) {
          el.shadowRoot.querySelectorAll(selector).forEach((el) => {
            elements.push(el);
          });
          return;
        }

        currentDepth++;

        el.shadowRoot.querySelectorAll(selector).forEach((el) => {
          elements.push(el);
          elementsToProcess.push(el);
        });
        recurse(
          el.shadowRoot,
          selector,
          options,
          elementsToProcess,
          elements,
          currentDepth,
        );
      });
  });

  // We can sometimes hit duplicate nodes this way, lets stop that.
  return [...new Set(elements)];
}
