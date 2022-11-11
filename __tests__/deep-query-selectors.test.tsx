import * as React from "react";
import { render } from "@testing-library/react";
import { Duplicates, TripleShadowRoots } from "../components";
import { deepQuerySelector, deepQuerySelectorAll } from "../src/index";

describe("deepQuerySelector()", () => {
  test("Should find and return the first button.", () => {
    const { container, baseElement } = render(<Duplicates />);

    const btn = document
      .querySelector("duplicate-buttons")
      ?.shadowRoot?.querySelector("button");
    const secondButton = document
      .querySelector("duplicate-buttons")
      ?.shadowRoot?.querySelectorAll("button")[1];

    expect(deepQuerySelector(container, "button")).toBeInstanceOf(
      HTMLButtonElement
    );
    expect(deepQuerySelector(container, "button")).toBe(btn);
    expect(deepQuerySelector(container, "button")).not.toBe(secondButton);

    expect(deepQuerySelector(baseElement, "button")).toBeInstanceOf(
      HTMLButtonElement
    );
    expect(deepQuerySelector(baseElement, "button")).toBe(btn);
    expect(deepQuerySelector(baseElement, "button")).not.toBe(secondButton);
  });

  test("Should find and return the 3rd level button element", () => {
    const { container, baseElement } = render(<TripleShadowRoots />);
    let el = deepQuerySelector(container, "button");
    expect(el).toBeInstanceOf(HTMLButtonElement);
    el = deepQuerySelector(baseElement, "button");
    expect(el).toBeInstanceOf(HTMLButtonElement);
  });

  test("Should not find and 3rd level button element when shallow is true", () => {
    const { container, baseElement } = render(<TripleShadowRoots />);
    let el = deepQuerySelector(container, "button", { shallow: true });
    expect(el).not.toBeInstanceOf(HTMLButtonElement);
    el = deepQuerySelector(baseElement, "button", { shallow: true });
    expect(el).not.toBeInstanceOf(HTMLButtonElement);
  });
});

describe("deepQuerySelectorAll()", () => {
  test("Should find and return both buttons", () => {
    const { container, baseElement } = render(<Duplicates />);

    let btns = deepQuerySelectorAll(container, "button");
    expect(btns).toHaveLength(2);
    btns.forEach((btn) => expect(btn).toBeInstanceOf(HTMLButtonElement));

    btns = deepQuerySelectorAll(baseElement, "button");
    expect(btns).toHaveLength(2);
    btns.forEach((btn) => expect(btn).toBeInstanceOf(HTMLButtonElement));

    btns = deepQuerySelectorAll(document.querySelector("duplicate-buttons") as HTMLElement, "button");
    expect(btns).toHaveLength(2);
    btns.forEach((btn) => expect(btn).toBeInstanceOf(HTMLButtonElement));
  });
});
