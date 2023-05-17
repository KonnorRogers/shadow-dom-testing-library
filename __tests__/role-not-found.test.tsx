import * as React from "react"
import {
  render,
  // screen
} from "@testing-library/react"
import { screen } from "../src/index"
import { TripleShadowRoots, NestedShadowRoots } from "../components";

test("Should serialize custom elements properly", () => {
  render(
    <TripleShadowRoots>
      <NestedShadowRoots role="not-button" />
    </TripleShadowRoots>
  );
  // const btn = screen.getByShadowRole("button", { name: "Not found" })
  const btn = screen.getByRole("button")
  expect(btn).toBeInTheDocument()
});
