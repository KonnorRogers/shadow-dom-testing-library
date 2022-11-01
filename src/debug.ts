import { screen } from "@testing-library/dom";
import { prettyShadowDOM } from "../src/prettyShadowDOM";

export function debug(...args: Parameters<typeof screen.debug>) {
	let [element, maxLength, options] = args

	Array.isArray(element)
		? element.forEach(el => prettyShadowDOM(el, maxLength, options))
		: prettyShadowDOM(element, maxLength, options);
}

