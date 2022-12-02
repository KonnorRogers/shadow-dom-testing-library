import { findByText, render } from "@testing-library/react"
import * as React from "react"
import { Duplicates } from "../components"
import { within } from "../src/index"

test("Should aggregate content from slots", async () => {
	const el = render(
		<Duplicates>
			<button slot="start">Start button</button>
		</Duplicates>
	)

	const startSlot = el.container.firstElementChild?.shadowRoot?.querySelector("slot[name='start']") as HTMLSlotElement

	const btn = await within(startSlot).findByShadowRole("button")

	expect(btn).toBeInTheDocument()
})
