import * as React from "react"
import {
  render,
  // screen
} from "@testing-library/react"
import { screen } from "../src/index"
import { TripleShadowRoots } from "../components";

test("Should serialize custom elements properly", () => {
  render(<TripleShadowRoots />);
  // const btn = screen.getByShadowText("button")
  const btn = screen.getByRole("button")
  expect(btn).toBeInTheDocument()
});
