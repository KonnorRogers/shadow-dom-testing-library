import * as React from "react";
import { configure, render } from "@testing-library/react";
// import { configure } from "@testing-library/dom";
import { screen } from "../src/index";
import { NestedShadowRoots } from "../components";

configure({
  testIdAttribute: "data-cy",
});

// const Component = () => <div><template shadowrootmode="open"><div data-cy="my-component"></div></template></div>

it("Should support custom data attributes for test id", async () => {
  render(<NestedShadowRoots />);
  expect(screen.getByShadowTestId("duplicate-buttons")).toBeInTheDocument();
});
