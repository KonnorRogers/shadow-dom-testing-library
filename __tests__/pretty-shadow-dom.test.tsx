import * as React from "react"
import { render } from "@testing-library/react";
import { Button, NestedShadowRoots } from "../components";
import { prettyShadowDOM, screen } from "../src/index";

test("Should strip style and script tags", () => {
  const div = document.createElement("div");
  div.innerHTML = `
		<!-- Comment -->
		<style>style {}</style>
		<script>const script = null</script>
		<div>Hi</div>
	`;
  const str = prettyShadowDOM(div) as string;

  expect(str.includes("Comment")).toBe(false);
  expect(str.includes("style")).toBe(false);
  expect(str.includes("script")).toBe(false);
  expect(str.includes("Hi")).toBe(true);
});

test("Should test shadow roots of passing in element", async () => {
	render(<Button />)

	const button = await screen.findByShadowRole("button")

	// @ts-expect-error
	const str = prettyShadowDOM(button.getRootNode().host) as string

	expect(str.includes("shadow-root")).toBe(true)
})
