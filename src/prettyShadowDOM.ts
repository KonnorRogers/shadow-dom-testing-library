import "./jsdom-setup"
import { logDOM, prettyDOM } from "@testing-library/dom";
import { JSDOM } from "jsdom";
import { deepQuerySelectorAll } from ".";

/**
 * This is an extension of prettyDOM / logDOM that provides proper printing of shadow roots.
 */
export function prettyShadowDOM(...args: Parameters<typeof prettyDOM>): void {
  let [element, maxLength, options] = args;
  if (element == null) element = document.documentElement;

  let htmlString: string = "";

  if ("outerHTML" in element) {
    htmlString = element.outerHTML;
  }

	htmlString = processNodes(element, htmlString, Array.from(element.children))

  // Remove Comment nodes
  htmlString = htmlString.replace(/<!--.*?-->/g, "");

  // Remove extraneous whitespace as it creates bloated printing
  htmlString = htmlString.replace(/>\s+</g, "><");

  const dom = new JSDOM(htmlString);
  const copiedDocument = dom.window.document;

  /**
   * Remove large, invisible elements which aren't useful for debugging.
   * Maybe allow introduce a new field called: options.ignoredNodes? options.ignoreQuery? options.filterQuery?
   * Usually this is handled by a "filterNode" which isnt a string.
   * https://github.com/testing-library/dom-testing-library/blob/edffb7c5ec2e4afd7f6bedf842c669ddbfb73297/src/pretty-dom.js#L35-L42
   * https://github.com/testing-library/dom-testing-library/blob/edffb7c5ec2e4afd7f6bedf842c669ddbfb73297/src/pretty-dom.js#L74
   */
  copiedDocument.querySelectorAll("script, style").forEach((elem) => {
    elem.remove();
  });

  logDOM(copiedDocument.body, maxLength, options);
}

function processNodes (element: Element | Document | ShadowRoot, stringBuffer: string = "", nodes: Array<Element | ShadowRoot> = Array.from(element.children)) {
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

  return stringBuffer
}
