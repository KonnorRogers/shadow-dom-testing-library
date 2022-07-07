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
export default () => <sl-button>I get wrapped by a button in the shadowRoot!</sl-button>

// my-button.test.jsx
import { render } from "@testing-library/react"
import { screen } from "shadow-dom-testing-library"
import Button from "./my-button"

test("Find the button in the shadow root", async () => {
  render(<Button />)
  const btn = await screen.findByShadowRole("button")
  expect(btn).toBeInTheDocument()
})
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
  render(<Button />
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
import { deepQuerySelector, deepQuerySelectorAll } from "shadow-dom-testing-library"

const elements = deepQuerySelectorAll(document, "my-button")
const element = deepQuerySelector(document, "my-button", { shallow: true })
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
function SimpleButton () {
  const [count, setCount] = React.useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}


import { screen } from "shadow-dom-testing-library"

test("Regular buttons should also work with shadow query", async () => {
  render(<SimpleButton />)
  fireEvent.click(await screen.findByRole('button'))
  const el = await screen.findByText(/1/)
  expect(el).toBeInTheDocument()
})
```
