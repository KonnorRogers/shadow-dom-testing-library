import React from "react";
import { render } from "@testing-library/react";
import {
  Duplicates,
  NestedShadowRoots,
  TripleShadowRoots,
} from "../components";
import { screen } from "../src/index";

// beforeEach(() => {
//   jest.spyOn(console, "log").mockImplementation(() => {});
//   jest.spyOn(screen, "debug");
// });
//
// afterEach(() => {
//   // @ts-expect-error
//   console.log.mockRestore();
// });

// test("Triple shadow roots", async () => {
  // render(<TripleShadowRoots />);

  // screen.debug();
  // expect(console.log).toHaveBeenCalledTimes(1);
// });

test("Single shadow root", async () => {
  render(
    <Duplicates>
      <div slot="start">Start Slot</div>
      <div>Default Slot</div>
      <div slot="end">End Slot</div>
    </Duplicates>
  );

  screen.debug();

  // expect(console.log).toHaveBeenCalledTimes(1);
  //
  // // This is kind of a silly testing, but its more about making sure we properly loaded our plugin.
  // // @ts-expect-error
  // expect(console.log.mock.calls[0][0]).toMatch(/ShadowRoot/);
});
