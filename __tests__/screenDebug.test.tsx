import React from "react"
import { render, getConfig, prettyDOM, PrettyDOMOptions, logDOM, prettyFormat } from "@testing-library/react";

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
	const {DOMElement, DOMCollection} = prettyFormat.plugins
	if (options == null) {
		options = {}
	}
	if (options.plugins == null) {
		options.plugins = [];
	}

	options.plugins.push(DOMCollection, DOMElement)
	console.log({options})

	Array.isArray(element)
    ? element.forEach(el => logDOM(el, maxLength, options))
    : logDOM(element, maxLength, options);

		// JASON
 //  if (Array.isArray(element)) {
	// 	element.forEach((elem) => {
	// 		screen.debug(elem);
	// 	});
	// 	return;
	// }
	// const DOMString = prettyPrintDOM(element instanceof Document ? element.body : element);
	// // Turns the string into a RegEx with the symbols escaped. It is safe to allow this message since the screen.debug() call itself is blocked via an ESLint rule.
	// _allowConsoleMessage(new RegExp(DOMString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
	// console.log(DOMString);
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

