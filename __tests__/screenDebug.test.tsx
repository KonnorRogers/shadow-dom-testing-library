import React from "react";
import { render } from "@testing-library/react";
import {
  Duplicates,
  NestedShadowRoots,
  TripleShadowRoots,
} from "../components";
import { prettyShadowDOM, screen } from "../src/index";

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
});

afterEach(() => {
  // @ts-expect-error
  console.log.mockRestore()
});

/* @see https://github.com/KonnorRogers/shadow-dom-testing-library/issues/33#issuecomment-1306593757 */
test("Should not modify the original dom", () => {
  render(<Duplicates />);
  const originalHTML = document.body.innerHTML;
  expect(document.querySelector("shadow-root")).toBe(null);

  prettyShadowDOM(document.body);

  expect(document.querySelector("shadow-root")).toBe(null);
  expect(originalHTML).toEqual(document.body.innerHTML);
});

test("Triple shadow roots", async () => {
  render(<TripleShadowRoots />);

  screen.debug();
  expect(console.log).toHaveBeenCalledTimes(1)

  // @ts-expect-error
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(`
    "[36m<body>[39m
      [36m<div>[39m
        [36m<triple-shadow-roots>[39m
          [36m<ShadowRoot>[39m
            [0m
    			[0m
            [36m<nested-shadow-roots>[39m
              [36m<ShadowRoot>[39m
                [0m
    			[0m
                [36m<duplicate-buttons>[39m
                  [36m<ShadowRoot>[39m
                    [0m
    			[0m
                    [36m<slot[39m
                      [33mname[39m=[32m\\"start\\"[39m
                    [36m/>[39m
                    [0m
    			[0m
                    [36m<button>[39m
                      [0mButton One[0m
                    [36m</button>[39m
                    [0m
    			[0m
                    [36m<br />[39m
                    [0m
    			[0m
                    [36m<slot />[39m
                    [0m
    			[0m
                    [36m<br />[39m
                    [0m
    			[0m
                    [36m<button>[39m
                      [0mButton Two[0m
                    [36m</button>[39m
                    [0m
    			[0m
                    [36m<slot[39m
                      [33mname[39m=[32m\\"end\\"[39m
                    [36m/>[39m
                    [0m
    		[0m
                  [36m</ShadowRoot>[39m
                [36m</duplicate-buttons>[39m
                [0m
    		[0m
              [36m</ShadowRoot>[39m
              [0m
    			[0m
            [36m</nested-shadow-roots>[39m
            [0m
    		[0m
          [36m</ShadowRoot>[39m
        [36m</triple-shadow-roots>[39m
      [36m</div>[39m
    [36m</body>[39m

    [2m/Users/konnorrogers/projects/oss/shadow-dom-testing-library/src/log-shadow-dom.ts:15:25[22m
      13 |
      14 |   if (options == null) options = {}
    > 15 |
         | ^
    "
  `)
});

test("Double shadow root", async () => {
  render(<NestedShadowRoots />);

  screen.debug();

  expect(console.log).toHaveBeenCalledTimes(1)

  // @ts-expect-error
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(`
    "[36m<body>[39m
      [36m<div>[39m
        [36m<nested-shadow-roots>[39m
          [36m<ShadowRoot>[39m
            [0m
    			[0m
            [36m<duplicate-buttons>[39m
              [36m<ShadowRoot>[39m
                [0m
    			[0m
                [36m<slot[39m
                  [33mname[39m=[32m\\"start\\"[39m
                [36m/>[39m
                [0m
    			[0m
                [36m<button>[39m
                  [0mButton One[0m
                [36m</button>[39m
                [0m
    			[0m
                [36m<br />[39m
                [0m
    			[0m
                [36m<slot />[39m
                [0m
    			[0m
                [36m<br />[39m
                [0m
    			[0m
                [36m<button>[39m
                  [0mButton Two[0m
                [36m</button>[39m
                [0m
    			[0m
                [36m<slot[39m
                  [33mname[39m=[32m\\"end\\"[39m
                [36m/>[39m
                [0m
    		[0m
              [36m</ShadowRoot>[39m
            [36m</duplicate-buttons>[39m
            [0m
    		[0m
          [36m</ShadowRoot>[39m
        [36m</nested-shadow-roots>[39m
      [36m</div>[39m
    [36m</body>[39m

    [2m/Users/konnorrogers/projects/oss/shadow-dom-testing-library/src/log-shadow-dom.ts:15:25[22m
      13 |
      14 |   if (options == null) options = {}
    > 15 |
         | ^
    "
  `)
});

test("Single shadow root", async () => {
  render(
    <Duplicates>
      <div slot="start">Start Slot</div>
      <div>Default Slot</div>
      <div slot="end">End Slot</div>
    </Duplicates>
  );

  screen.debug();

  expect(console.log).toHaveBeenCalledTimes(1)

  // @ts-expect-error
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(`
    "[36m<body>[39m
      [36m<div>[39m
        [36m<duplicate-buttons>[39m
          [36m<ShadowRoot>[39m
            [0m
    			[0m
            [36m<slot[39m
              [33mname[39m=[32m\\"start\\"[39m
            [36m/>[39m
            [0m
    			[0m
            [36m<button>[39m
              [0mButton One[0m
            [36m</button>[39m
            [0m
    			[0m
            [36m<br />[39m
            [0m
    			[0m
            [36m<slot />[39m
            [0m
    			[0m
            [36m<br />[39m
            [0m
    			[0m
            [36m<button>[39m
              [0mButton Two[0m
            [36m</button>[39m
            [0m
    			[0m
            [36m<slot[39m
              [33mname[39m=[32m\\"end\\"[39m
            [36m/>[39m
            [0m
    		[0m
          [36m</ShadowRoot>[39m
          [36m<div[39m
            [33mslot[39m=[32m\\"start\\"[39m
          [36m>[39m
            [0mStart Slot[0m
          [36m</div>[39m
          [36m<div>[39m
            [0mDefault Slot[0m
          [36m</div>[39m
          [36m<div[39m
            [33mslot[39m=[32m\\"end\\"[39m
          [36m>[39m
            [0mEnd Slot[0m
          [36m</div>[39m
        [36m</duplicate-buttons>[39m
      [36m</div>[39m
    [36m</body>[39m

    [2m/Users/konnorrogers/projects/oss/shadow-dom-testing-library/src/log-shadow-dom.ts:15:25[22m
      13 |
      14 |   if (options == null) options = {}
    > 15 |
         | ^
    "
  `)
});
