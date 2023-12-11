import * as React from "react";
import { Duplicates, MySelect, Select, TripleShadowRoots } from "../components";
import { render } from "@testing-library/react";
import { screen, within } from "../src/index";

describe("within", () => {
  it("Should allow you to select from both shadow and light dom", async () => {
    const selectLabel = "Select something";
    const optionLabel = "Option one";

    render(
      <Select label={selectLabel}>
        <option>{optionLabel}</option>
        <option>Option two</option>
      </Select>,
    );

    const shadowSelect = await screen.findByShadowRole("combobox");

    // @ts-expect-error
    const select = shadowSelect.getRootNode().host as MySelect;

    const option = within(select).getByShadowRole("option", {
      name: optionLabel,
    });

    expect(option).toBeInTheDocument();
  });

  it("Should find the nested button", async () => {
    render(<Duplicates />);
    const btns = await within(
      document.querySelector("duplicate-buttons") as HTMLElement,
    ).findAllByShadowRole("button");
    expect(btns).toHaveLength(2);
    btns.forEach((btn) => expect(btn).toBeInstanceOf(HTMLButtonElement));
  });
});
