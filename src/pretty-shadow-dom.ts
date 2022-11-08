import "./jsdom-setup";
import { prettyDOM } from "@testing-library/dom";
import { JSDOM } from "jsdom";

/**
 * This is an extension of prettyDOM / logDOM that provides proper printing of shadow roots.
 */
export function prettyShadowDOM(
  ...args: Parameters<typeof prettyDOM>
): ReturnType<typeof prettyDOM> {
  const [element, maxLength, options] = args;
  return prettyDOM(toJSDOM(element), maxLength, options);
}

export function toJSDOM(element?: Element | Document | undefined): HTMLElement {
  if (element == null) element = document.documentElement;

  let htmlString: string = "";

  if ("outerHTML" in element) {
    htmlString = element.outerHTML;
  }

  htmlString = processNodes(element, htmlString);

  // Remove Comment nodes
  htmlString = htmlString.replace(/<!--.*?-->/g, "");

  // Remove extraneous whitespace as it creates bloated printing
  htmlString = htmlString.replace(/>\s+</g, "><");

  const dom = new JSDOM(htmlString);

  if (
    element instanceof Document ||
    element instanceof HTMLHtmlElement ||
    element instanceof HTMLBodyElement
  ) {
    return dom.window.document.body;
  }

  return dom.window.document.body.firstElementChild as HTMLElement;
}

function processNodes(
  element: Element | Document | ShadowRoot,
  stringBuffer: string = "",
  nodes: Array<Element | ShadowRoot | Document> = Array.from(element.children)
) {
  if ("shadowRoot" in element && element.shadowRoot != null) {
    nodes.unshift(element.shadowRoot);
  }

  nodes.unshift(element);

  while (nodes.length > 0) {
    const node = nodes.shift()!;
    if (node && "shadowRoot" in node && node.shadowRoot != null) {
      const outerHTML = node.outerHTML;

      const shadowRootPseudoNode = document.createElement("shadow-root");
      shadowRootPseudoNode.innerHTML = node.shadowRoot.innerHTML;

			const clonedNode = node.cloneNode(true) as Element
      clonedNode.insertAdjacentElement("afterbegin", shadowRootPseudoNode);

      stringBuffer = stringBuffer.replace(outerHTML, clonedNode.outerHTML);

      stringBuffer = stringBuffer.replace(outerHTML, node.outerHTML);
      nodes.push(...Array.from(node.shadowRoot.children));
    }
    nodes.push(...Array.from(node.children));
  }

  return stringBuffer;
}
