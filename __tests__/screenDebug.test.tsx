import React from "react";
import { render } from "@testing-library/react";
import {
  Duplicates,
  NestedShadowRoots,
  TripleShadowRoots,
} from "../components";
import { prettyShadowDOM, screen } from "../src/index";

beforeEach(() => {
	// jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  // // @ts-expect-error
  // console.log.mockRestore()
})

/* @see https://github.com/KonnorRogers/shadow-dom-testing-library/issues/33#issuecomment-1306593757 */
test("Should not modify the original dom", () => {
	render(<Duplicates />)
	const originalHTML = document.body.innerHTML
	expect(document.querySelector("shadow-root")).toBe(null)

	prettyShadowDOM(document.body)

	expect(document.querySelector("shadow-root")).toBe(null)
	expect(originalHTML).toEqual(document.body.innerHTML)
})

test.skip("Triple shadow roots", async () => {
  render(<TripleShadowRoots />);

  screen.debug();
});

test.skip("Double shadow root", async () => {
  render(<NestedShadowRoots />);

  screen.debug();
});

test.skip("Single shadow root", async () => {
  render(
    <Duplicates>
      <div slot="start">Start Slot</div>
      <div>Default Slot</div>
      <div slot="end">End Slot</div>
    </Duplicates>
  );

  // jest.spyOn(console, 'log').mockImplementation(() => { })

  screen.debug();

  // @TODO: this is supposed to work but doesnt...
  // https://github.com/testing-library/dom-testing-library/blob/edffb7c5ec2e4afd7f6bedf842c669ddbfb73297/src/__tests__/pretty-dom.js#L61
  //   expect(console.log).toHaveBeenCalledTimes(1)
  // 	expect(console.log.mock.calls[0][0]).toEqual(`
  // <body>
  // 	<div>
  //   	<duplicate-buttons>
  //     	<shadow-root>
  //       	<slot
  //         	name="start"
  //       	/>
  //       	<button>
  //         	Button One
  //       	</button>
  //       	<br />
  //       	<slot />
  //       	<br />
  //       	<button>
  //         	Button Two
  //       	</button>
  //       	<slot
  //         	name="end"
  //       	/>
  //     	</shadow-root>
  //     	<div
  //       	slot="start"
  //     	>
  //       	Start Slot
  //     	</div>
  //     	<div>
  //       	Default Slot
  //     	</div>
  //     	<div
  //       	slot="end"
  //     	>
  //       	End Slot
  //     	</div>
  //   	</duplicate-buttons>
  // 	</div>
  // </body>
  //  `)
  // 	jest.resetAllMocks()
});
