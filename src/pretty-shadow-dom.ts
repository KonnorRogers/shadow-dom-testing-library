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

  htmlString = processNodes(element, htmlString, Array.from(element.children));

  // Remove Comment nodes
  htmlString = htmlString.replace(/<!--.*?-->/g, "");

  // Remove extraneous whitespace as it creates bloated printing
  htmlString = htmlString.replace(/>\s+</g, "><");

  const dom = new JSDOM(htmlString);
  return dom.window.document.body;
}

function processNodes(
  element: Element | Document | ShadowRoot,
  stringBuffer: string = "",
  nodes: Array<Element | ShadowRoot> = Array.from(element.children)
) {
  while (nodes.length > 0) {
    const node = nodes.shift()!;
    if (node && "shadowRoot" in node && node.shadowRoot != null) {
      const tempNode = document.createElement("div");
      tempNode.innerHTML = node.outerHTML;

      const shadowRootPseudoNode = document.createElement("shadow-root");
      shadowRootPseudoNode.innerHTML = node.shadowRoot.innerHTML;
      tempNode.firstElementChild!.insertBefore(
        shadowRootPseudoNode,
        tempNode.firstElementChild!.firstChild
      );
      stringBuffer = stringBuffer.replace(node.outerHTML, tempNode.innerHTML);
      nodes.push(...Array.from(node.shadowRoot.children));
    }
    nodes.push(...Array.from(node.children));
  }

  return stringBuffer;
}
