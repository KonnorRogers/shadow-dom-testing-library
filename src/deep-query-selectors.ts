import { Container, ShadowOptions } from "./types";

export function deepQuerySelector(
  container: Container,
  selectors: string,
  options: ShadowOptions = { shallow: false },
  elements: (Element | ShadowRoot)[] = []
) {
  const els = deepQuerySelectorAll(container, selectors, options, elements);

  if (Array.isArray(els) && els.length > 0) {
    return els[0];
  }

  return null;
}

export function deepQuerySelectorAll(
  container: Container,
  selectors: string,
  options: ShadowOptions = { shallow: false },
  elements: (Element | ShadowRoot)[] = []
) {
  // if "document" is passed in, it will also pick up "<html>" causing the query to run twice.
  if (container instanceof Document) {
    container = document.documentElement;
  }

	// Make sure we're checking the container element!
  elements.push(container);

  // Accounts for if the container houses a textNode
  if (container instanceof HTMLElement && container.shadowRoot != null && container.shadowRoot.mode !== "closed") {
    elements.push(container.shadowRoot);
  }

  container.querySelectorAll(selectors).forEach((el: Element | HTMLElement) => {
    if (el.shadowRoot == null || el.shadowRoot.mode === "closed") {
      elements.push(el);
      return;
    }

    // comment this to not add shadowRoots.
    // This is here because queryByRole() requires the parent element which in some cases is the shadow root.
    elements.push(el.shadowRoot);

    if (options.shallow === true) {
      el.shadowRoot
        .querySelectorAll(selectors)
        .forEach((el) => elements.push(el));
      return;
    }

    el.shadowRoot
      .querySelectorAll(selectors)
      .forEach((el) => elements.push(el));
    deepQuerySelectorAll(el.shadowRoot, selectors, options, elements);
  });

  // We can sometimes hit duplicate nodes this way, lets stop that.
  return [...new Set(elements)];
}

