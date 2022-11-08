import { Container, ShadowOptions } from "./types";

export function deepQuerySelector(
  container: Container,
  selector: string,
  options: ShadowOptions = { shallow: false },
  elementsToProcess: (Element | ShadowRoot)[] = [],
  elements: (Element)[] = []

) {
  const els = deepQuerySelectorAll(container, selector, options, elementsToProcess, elements);

  if (Array.isArray(els) && els.length > 0) {
    return els[0];
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
export function deepQuerySelectorAll(
  container: Container,
  selector: string,
  options: ShadowOptions = { shallow: false },
  elementsToProcess: (Element | ShadowRoot)[] = [],
  elements: (Element)[] = []
) {
  // if "document" is passed in, it will also pick up "<html>" causing the query to run twice.
  if (container instanceof Document) {
    container = document.documentElement;
  }

  // Make sure we're checking the container element!
  elementsToProcess.push(container);

  // Accounts for if the container houses a textNode
  if (
    container instanceof HTMLElement &&
    container.shadowRoot != null &&
    container.shadowRoot.mode !== "closed"
  ) {
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

        // comment this to not add shadowRoots.
        // This is here because queryByRole() requires the parent element which in some cases is the shadow root.
        elementsToProcess.push(el.shadowRoot);

        if (options.shallow === true) {
          el.shadowRoot
            .querySelectorAll(selector)
            .forEach((el) => {
            	elements.push(el)
          	});
          return;
        }

        el.shadowRoot
          .querySelectorAll(selector)
          .forEach((el) => {
          	elements.push(el)
          	elementsToProcess.push(el)
        	});
        deepQuerySelectorAll(el.shadowRoot, selector, options, elementsToProcess, elements);
      });
  });

  // We can sometimes hit duplicate nodes this way, lets stop that.
  return [...new Set(elements)];
}


// This could probably get really slow and memory intensive in large DOMs,
// maybe an infinite generator in the future?
export function getAllElementsAndShadowRoots(
  container: Container,
  options: ShadowOptions = { shallow: false },
  elements: (Element | ShadowRoot | Document)[] = []
) {
	const selector = "*"
  // if "document" is passed in, it will also pick up "<html>" causing the query to run twice.
  if (container instanceof Document) {
    container = document.documentElement;
  }

  const containers = [container]

  // Make sure we're checking the container element!
  elements.push(container)

  // Accounts for if the container houses a textNode
  if (
    container instanceof HTMLElement &&
    container.shadowRoot != null &&
    container.shadowRoot.mode !== "closed"
  ) {
  	elements.push(container.shadowRoot)
  	containers.push(container.shadowRoot)
  }


  containers.forEach((containerElement) => {
    containerElement
      .querySelectorAll(selector)
      .forEach((el: Element | HTMLElement) => {
        if (el.shadowRoot == null || el.shadowRoot.mode === "closed") {
          elements.push(el);
          return;
        }

        // comment this to not add shadowRoots.
        // This is here because queryByRole() requires the parent element which in some cases is the shadow root.
        elements.push(el.shadowRoot);

        if (options.shallow === true) {
          el.shadowRoot
            .querySelectorAll(selector)
            .forEach((el) => {
            	elements.push(el)
          	});
          return;
        }

        el.shadowRoot
          .querySelectorAll(selector)
          .forEach((el) => {
          	elements.push(el)
        	});
        getAllElementsAndShadowRoots(el.shadowRoot, options, elements);
      });
  });

  // We can sometimes hit duplicate nodes this way, lets stop that.
  return [...new Set(elements)];
}
