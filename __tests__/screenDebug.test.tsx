import React from "react";
import { getUserCodeFrame } from "@testing-library/dom/dist/get-user-code-frame"
import { render } from "@testing-library/react";
import {
  Duplicates,
  NestedShadowRoots,
  TripleShadowRoots,
} from "../components";
import { screen } from "../src/index";


beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.mocked(getUserCodeFrame).mockImplementation(
      () => `"/home/konnor/projects/sample-error/error-example.js:7:14
        5 |         document.createTextNode('Hello World!')
        6 |       )
      > 7 |       screen.debug()
          |              ^
      "
    `
  )
});

afterEach(() => {
  // @ts-expect-error
  console.log.mockRestore()
});

test("Triple shadow roots", async () => {
  render(<TripleShadowRoots />);

  screen.debug();
  expect(console.log).toHaveBeenCalledTimes(1)

  // @ts-expect-error
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot()
});

test("Double shadow root", async () => {
  render(<NestedShadowRoots />);

  screen.debug();

  expect(console.log).toHaveBeenCalledTimes(1)

  // @ts-expect-error
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot()
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
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot()
});
