import * as React from "react";
import { prettyDOM, render } from "@testing-library/react";
import { Button, Duplicates, TripleShadowRoots } from "../components";
import { prettyShadowDOM, screen } from "../src/index";

/* @see https://github.com/KonnorRogers/shadow-dom-testing-library/issues/33#issuecomment-1306593757 */
test("Should not modify the original dom", () => {
  render(<Duplicates />);
  const originalHTML = document.body.innerHTML;
  expect(document.querySelector("shadow-root")).toBe(null);

  prettyShadowDOM(document.body);

  expect(document.querySelector("shadow-root")).toBe(null);
  expect(originalHTML).toEqual(document.body.innerHTML);
});

test("Should strip style and script tags", () => {
  const div = document.createElement("div");

  const comment = document.createComment("Comment");
  const style = document.createElement("style");
  style.innerHTML = `style {}`;
  const script = document.createElement("script");
  script.innerHTML = `const script = null`;
  const otherDiv = document.createElement("div");
  otherDiv.innerHTML = "Hi";

  div.append(comment, style, script, otherDiv);

  const str = prettyDOM(div) as string;

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

  expect(str.includes("my-button")).toBe(true);
  expect(str.includes("ShadowRoot")).toBe(true);
  expect(str.includes("body")).toBe(false);
  expect(str.includes("div")).toBe(false);

  expect(str).toMatchInlineSnapshot(`
    "[36m<my-button>[39m
      [36m<ShadowRoot>[39m
        [36m<button>[39m
          [36m<slot />[39m
        [36m</button>[39m
      [36m</ShadowRoot>[39m
      [0m0[0m
    [36m</my-button>[39m"
  `);
});

test("Should render body if passed in", () => {
  render(<Button />);

  const str = prettyShadowDOM(document.body) as string;

  expect(str.includes("my-button")).toBe(true);
  expect(str.includes("ShadowRoot")).toBe(true);
  expect(str.includes("body")).toBe(true);

  expect(str).toMatchInlineSnapshot(`
    "[36m<body>[39m
      [36m<div>[39m
        [36m<my-button>[39m
          [36m<ShadowRoot>[39m
            [36m<button>[39m
              [36m<slot />[39m
            [36m</button>[39m
          [36m</ShadowRoot>[39m
          [0m0[0m
        [36m</my-button>[39m
      [36m</div>[39m
    [36m</body>[39m"
  `);
});

test("Should render HTML tag if passed in", () => {
  render(<Button />);

  const str = prettyShadowDOM() as string;

  expect(str.includes("my-button")).toBe(true);
  expect(str.includes("ShadowRoot")).toBe(true);
  expect(str.includes("body")).toBe(true);

  expect(str).toMatchInlineSnapshot(`
    "[36m<body>[39m
      [36m<div>[39m
        [36m<my-button>[39m
          [36m<ShadowRoot>[39m
            [36m<button>[39m
              [36m<slot />[39m
            [36m</button>[39m
          [36m</ShadowRoot>[39m
          [0m0[0m
        [36m</my-button>[39m
      [36m</div>[39m
    [36m</body>[39m"
  `);
});

test("It should render 3 shadow root instances", () => {
  render(<TripleShadowRoots />);
  const str = prettyShadowDOM() as string;

  expect(str.includes("ShadowRoot")).toBe(true);

  expect(str).toMatchInlineSnapshot(`
    "[36m<body>[39m
      [36m<div>[39m
        [36m<triple-shadow-roots>[39m
          [36m<ShadowRoot>[39m[0m
            [36m<nested-shadow-roots>[39m
              [36m<ShadowRoot>[39m[0m
                [36m<duplicate-buttons>[39m
                  [36m<ShadowRoot>[39m[0m
                    [36m<slot[39m
                      [33mname[39m=[32m\\"start\\"[39m
                    [36m/>[39m[0m
                    [36m<button>[39m
                      [0mButton One[0m
                    [36m</button>[39m[0m
                    [36m<br />[39m[0m
                    [36m<slot />[39m[0m
                    [36m<br />[39m[0m
                    [36m<button>[39m
                      [0mButton Two[0m
                    [36m</button>[39m[0m
                    [36m<slot[39m
                      [33mname[39m=[32m\\"end\\"[39m
                    [36m/>[39m[0m
                  [36m</ShadowRoot>[39m
                [36m</duplicate-buttons>[39m[0m
                [36m<slot />[39m[0m
              [36m</ShadowRoot>[39m[0m
            [36m</nested-shadow-roots>[39m[0m
          [36m</ShadowRoot>[39m
        [36m</triple-shadow-roots>[39m
      [36m</div>[39m
    [36m</body>[39m"
  `);
});
