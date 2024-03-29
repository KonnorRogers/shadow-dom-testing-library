# Why?

Currently, DOM-testing-library does not support checking
shadow roots for elements. This can be troublesome when
you're looking for something with a `"button"` that's
nested inside a shadowRoot.

<https://github.com/testing-library/dom-testing-library/issues/413>

## Prior art

<https://github.com/Westbrook/dom-testing-library>

`testing-library__dom` is a hard fork of DOM testing
library which presents its own set of challenges.
shadow-dom-testing-library looks to augment the existing
functionality.

## Preinstallation

Make sure you are using a library which supports rendering
shadow roots. For Jest users, this means ensuring you have
JSDOM >= 16.2 and Jest >= 26.2

## Installation

```bash
npm install -D shadow-dom-testing-library
```

## Example usage

```js
// my-button.jsx
export default () => (
  <sl-button>I get wrapped by a button in the shadowRoot!</sl-button>
);

// my-button.test.jsx
import { render } from "@testing-library/react";
import { screen } from "shadow-dom-testing-library";
import Button from "./my-button";

test("Find the button in the shadow root", async () => {
  render(<Button />);
  const btn = await screen.findByShadowRole("button");
  expect(btn).toBeInTheDocument();
});
```

## API

All queries found here: <https://testing-library.com/docs/queries/about/#priority>
are implemented with a "Shadow" prefix prior to the query
type.

### API examples

```js
import { render } from "@testing-library/react"
import { getByShadowRole, findByShadowLabelText, queryAllByShadowTitle } from "shadow-dom-testing-library"

test("Find the button", () => {
  const { container } = render(<Button />)

  getByShadowRole(container, "button")
  await findByShadowLabelText(container, /Car Manufacturer/i)
  queryAllByShadowTitle(container, "delete")
})
```

### Usage with screen

Shadow dom testing library ships its own "screen" that
you're familiar with. It has all the `<ByShadow>` functions prebound
to the document.

```jsx
import { render } from "@testing-library/react"
import { screen } from "shadow-dom-testing-library"

test("Lets test some rendering", () => {
  render(<Button />)
  screen.getByShadowRole("button")
  await screen.findByShadowLabelText(/Car Manufacturer/i)
  screen.queryAllByShadowTitle("delete")
})
```

In addition, every `<ByShadow>` function also accepts a
"shallow" option. The shallow option means to only go 1
shadowRoot deep. Perhaps in the future a "recurseDepth"
will be implemented to specify shadowRoot depth recursion.

```jsx
import { render } from "@testing-library/react"
import { screen, getByShadowRole } from "shadow-dom-testing-library"

test("Lets test some rendering", () => {
  render(<Button />)
  getByShadowRole(document, "button", { shallow: true })
  await screen.findByShadowLabelText(/Car Manufacturer/i, { shallow: true })
  screen.queryAllByShadowTitle("delete", { shallow: true })
})
```

### Additional APIs

Shadow DOM testing library also ships its own
`"deepQuerySelector"` and `"deepQuerySelectorAll"` functions
for if you need more fine-grained access to the DOM.

```js
import {
  deepQuerySelector,
  deepQuerySelectorAll,
} from "shadow-dom-testing-library";

const elements = deepQuerySelectorAll(document, "my-button");
const element = deepQuerySelector(document, "my-button", { shallow: true });
```

A `within` function is exported to provide the `<ByShadow>` queries
bound to a particular container element.

```jsx
import { render } from "@testing-library/react";
import { screen, within } from "shadow-dom-testing-library";

test("Lets test some rendering", () => {
  render(<ComplicatedControl />);
  const fieldGroup = screen.getByShadowRole("group");

  const nameInput = within(fieldGroup).getByShadowRole("textbox", {
    name: "foobar",
  });
});
```

## Caution

Be careful with the shadowQueries and deepQueries. These
functions recurse through every shadow root which can
easily lead to unintended elements being found in your
tests.

Also, this library is very new, use with caution. Feel free
to report any issues.

## Performance

Recursing through the Shadow DOM can be expensive if you
render a large number of elements in an element. Benchmarks
have not been measured, but it will easily be much worse
than a regular `querySelector` call.

## Additional notes

`Shadow` queries will work for both Light DOM and for
Shadow DOM elements. For example you can search for a
"button" in the Light DOM.

### Example of light dom query

```jsx
function SimpleButton() {
  const [count, setCount] = React.useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

import { screen } from "shadow-dom-testing-library";

test("Regular buttons should also work with shadow query", async () => {
  render(<SimpleButton />);
  fireEvent.click(await screen.findByRole("button"));
  const el = await screen.findByText(/1/);
  expect(el).toBeInTheDocument();
});
```

## Debug

Shadow-dom-testing-library supports serializing shadow
doms. To do so, it ships its own "debug" function attached
to the screen.

### Examples using Debug

```js
import { screen, render } from "shadow-dom-testing-library";
test("Debug", () => {
  render(<my-element />);

  screen.debug();
});

// Calling debug directly
import { debug, render } from "shadow-dom-testing-library";
test("Debug", () => {
  render(<my-element />);

  debug();
});

// Changing indentation
import { screen, render } from "shadow-dom-testing-library";
test("Debug", () => {
  render(<my-element />);

  debug(document.documentElement, undefined, { indent: 4 });
});

// Changing max depth
import { screen, render } from "shadow-dom-testing-library";
test("Debug", () => {
  render(<my-element />);

  debug(document.documentElement, undefined, {
    // default is 7000.
    maxDepth: 100,
  });
});
```

## logShadowDOM

This is the equivalent of `logDOM` from "@testing-library/dom"

`logShadowDOM` will log to the console the state of the DOM
and internally calls `prettyShadowDOM`. This is called via `screen.debug()`

### Example of logShadowDOM

```js
import { logShadowDOM } from "shadow-dom-testing-library";

logShadowDOM(element, maxLength, options); // void; calls console.log()
```

## prettyShadowDOM

This is the equivalent of `prettyDOM` from "@testing-library/dom". This is called by `logShadowDOM`.
`prettyShadowDOM` returns `string | false` and does not automatically log to the console.
This is useful for custom error messages for elements.

### Example of prettyShadowDOM

```js
import { prettyShadowDOM } from "shadow-dom-testing-library";

prettyShadowDOM(element, maxLength, options); // => string | false
```

## ShadowQueries

Perhaps you don't want the extended screen. That's fine. To
import just the shadowQueries you can do so like this:

```js
import { shadowQueries } from "shadow-dom-testing-library";

test("findByShadowRole", async () => {
  render(<Button />);
  const btn = await shadowQueries.findByShadowRole("button");
  expect(btn).toBeInTheDocument();
});
```

You could also use this method to extend your own screen.

```js
import { shadowQueries } from "shadow-dom-testing-library";
import { screen as DOMScreen } from "@testing-library/dom";

const screen = {
  ...DOMScreen,
  ...shadowQueries,
};

screen.getByShadowRole("button");
```

## Usage with TypeScript

```ts
import { screen, shadowQueries } from "shadow-dom-testing-library";

const btn = await screen.findByShadowRole<HTMLButtonElement>("button");
const btn = shadowQueries.getByShadowRole<HTMLButtonElement>("button");
```
