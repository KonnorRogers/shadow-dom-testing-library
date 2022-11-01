import React from "react"
import { render } from "@testing-library/react";
import { logDOM } from "../src/scratch"

// getDocument
import { screen } from "../src/index";
import { Duplicates } from "../components";

// export function prettyPrintDOM(root: Element = document.body): string {
// 	let htmlString = root.outerHTML;
// 	const nodesToProcess = [...root.children];
// 	while (nodesToProcess.length > 0) {
// 		const node = nodesToProcess.shift()!;
// 		if (node.shadowRoot !== null) {
// 			const tempNode = document.createElement("div");
// 			tempNode.innerHTML = node.outerHTML;
// 			const shadowRootPseudoNode = document.createElement("shadow-root");
// 			shadowRootPseudoNode.innerHTML = node.shadowRoot.innerHTML;
// 			tempNode.firstElementChild!.insertBefore(shadowRootPseudoNode, tempNode.firstElementChild!.firstChild);
// 			htmlString = htmlString.replace(node.outerHTML, tempNode.innerHTML);
// 		}
// 		nodesToProcess.push(...node.children);
// 	}
// 	// Remove Comment nodes
// 	htmlString = htmlString.replace(/<!--.*?-->/g, "");
// 	const dom = new JSDOM(htmlString);
// 	const copiedDocument = dom.window.document;
// 	// Remove large, invisible elements which aren't useful for debugging.
// 	copiedDocument.querySelectorAll("script, style").forEach((elem) => {
// 		elem.remove();
// 	});
// 	const DOMString = prettier.format(copiedDocument.body.innerHTML)
// 	return DOMString
// }

screen.debug = function (...args: Parameters<typeof screen.debug>) {
  let [element, maxLength, options] = args

	Array.isArray(element)
    ? element.forEach(el => logDOM(el, maxLength, options))
    : logDOM(element, maxLength, options);
}


// @see https://github.com/KonnorRogers/shadow-dom-testing-library/issues/10
test("Should only return 1 node instead of checking both", async () => {
  render(<h1>Hello</h1>);
  // https://github.com/KonnorRogers/shadow-dom-testing-library/issues/10
  expect(await screen.findByShadowText("Hello")).toBeInTheDocument();
});
  

test("Should error if two similar nodes are in shadow root", async () => {
	// render(<Duplicates />)
  render(
  	<Duplicates />
  );

	screen.debug()
})

