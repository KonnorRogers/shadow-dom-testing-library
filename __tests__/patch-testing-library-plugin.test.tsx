import * as React from "react"
import {
  render,
  // screen
} from "@testing-library/react"
import { screen } from "../src/index"
import { TripleShadowRoots, Duplicates } from "../components";

test("Should serialize custom elements properly", () => {
  render(
    <TripleShadowRoots>
      <button>Button</button>
      <Duplicates />
    </TripleShadowRoots>
  );
  const btn = screen.getByShadowRole("button", { name: "Not found" })
  // const btn = screen.getByRole("button", { name: "Not found" })
  expect(btn).toBeInTheDocument()
});
