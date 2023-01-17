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

  // @ts-expect-error
  HTMLSlotElement.prototype.querySelectorAll = function (str: string) {
    const qsa = HTMLElement.prototype.querySelectorAll
    let els = Array.from(qsa.call(this, str))

    this.assignedNodes({ flatten: true }).forEach((_el) => {
      const el = _el as Element
      els.push(el)
      els = els.concat(Array.from(el.querySelectorAll(str)))
    })

    return [...new Set(els)]
  }
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
	expect(btn.length).toEqual(1)
	const img = await within(startSlot).findByShadowRole("img")
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
