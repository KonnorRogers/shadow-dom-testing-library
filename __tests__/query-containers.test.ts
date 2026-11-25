import { queryAllByShadowRole, queryAllByShadowTestId } from "../src/index";

afterEach(() => {
  document.body.innerHTML = "";
});

test("a query runs once per shadow root, not once per element", () => {
  document.body.innerHTML = "<div></div>";
  const host = document.body.firstElementChild as HTMLElement;
  host.attachShadow({ mode: "open" }).innerHTML =
    "<span></span>".repeat(200) + '<b data-testid="b"></b>';

  const prototypes = [Element.prototype, DocumentFragment.prototype];
  const originals = prototypes.map((proto) => proto.querySelectorAll);
  let calls = 0;
  prototypes.forEach((proto, i) => {
    proto.querySelectorAll = function (this: ParentNode, ...args: [string]) {
      calls++;
      return originals[i].apply(this, args);
    } as typeof proto.querySelectorAll;
  });
  try {
    expect(queryAllByShadowTestId(document.body, "b")).toHaveLength(1);
  } finally {
    prototypes.forEach((proto, i) => {
      proto.querySelectorAll = originals[i];
    });
  }
  expect(calls).toBeLessThan(20);
});

test("a container inside a shadow tree finds the content slotted into it", () => {
  document.body.innerHTML = "<div><button>slotted</button></div>";
  const host = document.body.firstElementChild as HTMLElement;
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = "<p><slot></slot></p>";

  // The query types accept only elements, but a shadow root works as a container.
  expect(
    queryAllByShadowRole(root as unknown as HTMLElement, "button"),
  ).toHaveLength(1);
  expect(
    queryAllByShadowRole(root.querySelector("p") as HTMLElement, "button"),
  ).toHaveLength(1);
});

test("a container in another realm finds elements in its shadow roots", () => {
  document.body.innerHTML = "<iframe></iframe>";
  const frame = document.querySelector("iframe") as HTMLIFrameElement;
  const doc = frame.contentDocument as Document;
  doc.body.innerHTML = "<div></div>";
  (doc.body.firstElementChild as HTMLElement).attachShadow({
    mode: "open",
  }).innerHTML = '<b data-testid="b"></b>';

  expect(queryAllByShadowTestId(doc.body, "b")).toHaveLength(1);
});
