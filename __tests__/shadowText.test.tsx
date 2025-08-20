import { configure, findByText } from "@testing-library/dom";
import { findByShadowText, screen } from "../src/index";
import { html, fixture, nextFrame, aTimeout } from "@open-wc/testing-helpers";

// Will define <my-button>
import "../components"

export class ShadowText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot && this.shadowRoot.appendChild(this.templateContent);
  }

  get templateContent() {
    return this.template.content.cloneNode(true);
  }

  get template() {
    const template = document.createElement("template");
    template.innerHTML = "Hi there";
    return template;
  }
}

customElements.define("shadow-text", ShadowText);

describe("ShadowText()", () => {
  it("should work with all queries", async () => {
    // suggestions call "getAttribute" which wont work here.
    configure({
      throwSuggestions: false,
    });

    const el = (await fixture(
      html`<shadow-text></shadow-text>`,
    )) as HTMLElement;
    await nextFrame();

    // Test that the base library works with the shadowRoot.
    // @ts-expect-error
    await findByText(el.shadowRoot, "Hi there");

    // @ts-expect-error
    await findByShadowText(el.shadowRoot, "Hi there");
    await findByShadowText(el, "Hi there");
    await screen.findByShadowText("Hi there");

    configure({
      throwSuggestions: true,
    });
  });

  it("should not suggest light dom queries", async () => {
    const el = (await fixture(
      html`<shadow-text></shadow-text>`,
    )) as HTMLElement;
    await nextFrame();

    await screen.findByShadowText("Hi there");
    screen.getByShadowText("Hi there");
  });

  it("Should not detect the same nodes twice", async () => {
    const el = (await fixture(html`
      <my-button>Click Me</my-button>
    `) as HTMLElement)
    await aTimeout(1)

    const els = await screen.findAllByShadowText("Click Me")

    expect(els.length).toEqual(1)
  })
});
