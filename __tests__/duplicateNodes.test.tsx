import React from "react"
import { render } from "@testing-library/react";
import { screen } from "../src/index";

// @see https://github.com/KonnorRogers/shadow-dom-testing-library/issues/10
test("Should only return 1 node instead of checking both", async () => {
  render(<h1>Hello</h1>);
  // https://github.com/KonnorRogers/shadow-dom-testing-library/issues/10
  expect(await screen.findByShadowText("Hello")).toBeInTheDocument();
});

test("Should error if two similiar nodes actually exist", async () => {
	render(
		<>
			<h2>Hello</h2>
			<h2>Hello</h2>
		</>
	)

	expect(() => screen.getByShadowText("Hello")).toThrow(/multiple elements/i)
	await expect(() => screen.findByShadowText("Hello")).rejects.toThrow(/multiple elements/i)
})
