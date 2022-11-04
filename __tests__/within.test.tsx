import * as React from "react";
import { MySelect, Select } from "../components";
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
      </Select>
    );

    const shadowSelect = await screen.findByShadowRole("combobox", {
      name: selectLabel,
    });

    // @ts-expect-error
    const select = shadowSelect.getRootNode().host as MySelect;

    const option = within(select).getByShadowRole("option", {
      name: optionLabel,
    });
    expect(option).toBeInTheDocument();
  });
});
