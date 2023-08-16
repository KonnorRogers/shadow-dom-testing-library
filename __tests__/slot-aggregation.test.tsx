import * as React from "react";
import { render } from "@testing-library/react";
import { Duplicates, Select } from "../components";
import { within } from "../src/index";

test("Should aggregate content from slots", async () => {
  const el = render(
    <Duplicates>
      <button slot="start">
        <img src="" /> <span>Start button</span>
      </button>
      <a href="#">Middle Link</a>
    </Duplicates>,
  );

  const startSlot = el.container.firstElementChild?.shadowRoot?.querySelector(
    "slot[name='start']",
  ) as HTMLSlotElement;
  const btn = await within(startSlot).findAllByShadowRole("button");
  expect(btn.length).toEqual(1);
  const img = await within(startSlot).findByShadowRole("img");
  expect(img).toBeInTheDocument();

  // make sure other slots dont leak in.
  expect(within(startSlot).queryByShadowRole("link")).toBeNull;

  const defaultSlot = el.container.firstElementChild?.shadowRoot?.querySelector(
    "slot:not([name])",
  ) as HTMLSlotElement;
  const anchor = await within(defaultSlot).findByShadowRole("link");
  expect(anchor).toBeInTheDocument();

  // Make sure default slot doesnt pick up start / end slot
  expect(
    within(defaultSlot).queryByShadowRole("button"),
  ).not.toBeInTheDocument();
  expect(within(defaultSlot).queryByShadowRole("img")).not.toBeInTheDocument();

  // Make sure our patch of Slots doesn't leak.
  expect(startSlot.querySelectorAll("*")).toHaveLength(0);
});

test("slot aggregation should use slotted content instead of default content", () => {
  const el = render(
    <Select label="My Other Label">
      <span slot="label">My Label</span>
    </Select>,
  );

  const labelSlot = el.container.firstElementChild?.shadowRoot?.querySelector(
    "slot[name='label']",
  ) as HTMLSlotElement;

  expect(within(labelSlot).queryByText("My Label")).toBeTruthy;
});

test("slot aggregation should use default items when not given slotted content", () => {
  const el = render(<Select label="My Label"></Select>);

  const labelSlot = el.container.firstElementChild?.shadowRoot?.querySelector(
    "slot[name='label']",
  ) as HTMLSlotElement;

  expect(within(labelSlot).queryByText("My Label")).toBeTruthy;
});
