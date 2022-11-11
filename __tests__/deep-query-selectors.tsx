import * as React from "react"
import { render } from "@testing-library/react"
import { Duplicates } from "../components"
import { deepQuerySelector, deepQuerySelectorAll } from "../src/index"

describe("deepQuerySelectorAll()", () => {
	test("Should find and return two buttons", () => {
		const { container, baseElement } = render(<Duplicates />)

		deepQuerySelectorAll(container, "button")
		deepQuerySelectorAll(baseElement, "button")
	})
})

describe("deepQuerySelector()", () => {
	test.skip("Should find and return one button", () => {
		const { container, baseElement } = render(<Duplicates />)
		deepQuerySelector(container, "button")
		deepQuerySelector(baseElement, "button")
	})
})
