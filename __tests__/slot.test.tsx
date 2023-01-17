import * as React from "react"
import { render } from "@testing-library/react"
import { Duplicates } from "../components"
import { screen, within } from "../src/index"

beforeEach(() => {
  Object.defineProperty(HTMLSlotElement.prototype, 'childNodes', {
	  get () {
	    return this.assignedNodes()
	  }
  })
})


test("Should aggregate content from slots", async () => {
	const el = render(
		<Duplicates>
		  <button slot="start"><img src="" /> <span>Start button</span></button>
			<a href="#">Middle Link</a>
		</Duplicates>
	)

	const startSlot = el.container.firstElementChild?.shadowRoot?.querySelector("slot[name='start']") as HTMLSlotElement
	const btn = await within(startSlot).findAllByShadowRole("button")
	const img = await within(startSlot).findByShadowRole("img")
	expect(btn.length).toEqual(1)
	expect(img).toBeInTheDocument()

	// make sure other slots dont leak in.
	expect(within(startSlot).queryByShadowRole("link")).toBeNull

	const defaultSlot = el.container.firstElementChild?.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement
	const anchor = await within(defaultSlot).findByShadowRole("link")
  expect(anchor).toBeInTheDocument()

  // Make sure default slot doesnt pick up start / end slot
	expect(within(defaultSlot).queryByShadowRole("button")).not.toBeInTheDocument()
	expect(within(defaultSlot).queryByShadowRole("img")).not.toBeInTheDocument()

	// screen.debug()
})
