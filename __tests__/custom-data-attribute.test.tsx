import * as React from "react";
import { configure, render } from "@testing-library/react";
// import { configure } from "@testing-library/dom";
import {screen} from "../src/index"

configure({
  testIdAttribute: "data-cy"
})

const Component = () => <div data-cy="my-component"></div>


it("Should support custom data attributes for test id", async () => {
  render(<Component />)
  expect(screen.getByShadowTestId("my-component")).toBeInTheDocument()
})
