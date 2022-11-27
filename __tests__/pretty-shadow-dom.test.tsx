import * as React from "react";
import { prettyDOM, render } from "@testing-library/react";
import { Button, TripleShadowRoots } from "../components";
import { prettyShadowDOM, screen } from "../src/index";

test("Should strip style and script tags", () => {
  const div = document.createElement("div");

  const comment = document.createComment("Comment")
  const style = document.createElement("style")
  style.innerHTML = `style {}`
  const script = document.createElement("script")
  script.innerHTML = `const script = null`
  const otherDiv = document.createElement("div")
  otherDiv.innerHTML = "Hi"

  div.append(comment, style, script, otherDiv)

  const str = prettyDOM(div) as string;

  // console.log(str)

  expect(str.includes("Comment")).toBe(false);
  expect(str.includes("style")).toBe(false);
  expect(str.includes("script")).toBe(false);
  expect(str.includes("Hi")).toBe(true);
});

test("Should test shadow roots of passing in element", async () => {
  render(<Button />);

  const button = await screen.findByShadowRole("button");

  // @ts-expect-error
  let str = prettyShadowDOM(button.getRootNode().host) as string;

  // console.log(str)

  expect(str.includes("my-button")).toBe(true);
  expect(str.includes("ShadowRoot")).toBe(true);
  expect(str.includes("body")).toBe(false);
  expect(str.includes("div")).toBe(false);
});

test("Should render body if passed in", () => {
  render(<Button />);

  const str = prettyShadowDOM(document.body) as string;

	// console.log(str)
  expect(str.includes("my-button")).toBe(true);
  expect(str.includes("ShadowRoot")).toBe(true);
  expect(str.includes("body")).toBe(true);
});

test("Should render HTML tag if passed in", () => {
  render(<Button />);

  const str = prettyShadowDOM() as string;

  expect(str.includes("my-button")).toBe(true);
  expect(str.includes("ShadowRoot")).toBe(true);
  expect(str.includes("body")).toBe(true);
});

test("It should render 3 shadow root instances", () => {
	render(<TripleShadowRoots />)
  const str = prettyShadowDOM() as string

  // console.log(str)
  expect(str.includes("ShadowRoot")).toBe(true);
})
