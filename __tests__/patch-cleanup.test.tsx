import React from "react";
import { render } from "@testing-library/react";
import { screen } from "../src/index";
import { Duplicates } from "../components";

test("restores the original childNodes descriptors after a query", () => {
  const originalNodeGetter = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "childNodes",
  )!.get;

  render(<h1>Hello</h1>);
  screen.getByShadowText("Hello");

  expect(
    Object.getOwnPropertyDescriptor(Node.prototype, "childNodes")!.get,
  ).toBe(originalNodeGetter);
  expect(
    Object.getOwnPropertyDescriptor(HTMLSlotElement.prototype, "childNodes"),
  ).toBeUndefined();
});

test("does not stack childNodes wrappers across many queries", () => {
  const originalNodeGetter = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "childNodes",
  )!.get;

  render(<Duplicates />);
  for (let i = 0; i < 100; i++) {
    screen.queryAllByShadowRole("button");
  }

  expect(
    Object.getOwnPropertyDescriptor(Node.prototype, "childNodes")!.get,
  ).toBe(originalNodeGetter);
  expect(
    Object.getOwnPropertyDescriptor(HTMLSlotElement.prototype, "childNodes"),
  ).toBeUndefined();
});
