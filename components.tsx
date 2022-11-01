import * as React from "react"

/* Web Components */
class MyButton extends HTMLElement {
	connectedCallback () {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<button><slot></slot></button>`;
  }
}

class MyTextArea extends HTMLElement {
	_label: string = ""

	get label () {
		return this._label
	}

	set label (value: string) {
		this._label = value

		this.render()
	}

	connectedCallback () {
    this.attachShadow({mode: 'open'});
    this._label = String(this.getAttribute("label"))
    this.render()
	}

	render () {
		if (this.isConnected === false) return ""
		if (this.shadowRoot == null) return ""

    this.shadowRoot.innerHTML = `
			<label for="textarea">${this.label}</label>

			<textarea id="textarea"><slot></slot></textarea>
		`;
	}
}

class MyImage extends HTMLElement {
	_src: string = ""
	_alt: string = ""

	get src () {
		return this._src
	}

	set src (value: string) {
		this._src = value

		this.render()
	}

	get alt () {
		return this._alt
	}

	set alt (value: string) {
		this._alt = value
		this.render()
	}

	connectedCallback () {
    this.attachShadow({mode: 'open'});
    this._alt = String(this.getAttribute("alt"))
    this._src = String(this.getAttribute("src"))
    // Leaving the alt attribute on confuses dom-testing-library
    this.removeAttribute("src")
    this.removeAttribute("alt")
    this.render()
	}

	render () {
		if (this.shadowRoot == null) return ""
		if (this.isConnected === false) return ""

    this.shadowRoot.innerHTML = `
			<img src="${this.src}" alt="${this.alt}">
		`;
	}
}

class DuplicateButtons extends HTMLElement {
	connectedCallback () {
    this.attachShadow({mode: 'open'});
    this.render()
	}

	render () {
		if (this.shadowRoot == null) return ""
		if (this.isConnected === false) return ""

    this.shadowRoot.innerHTML = `
			<slot name="start"></slot>
			<button>Button One</button>
			<br>
			<slot></slot>
			<br>
			<button>Button Two</button>
			<slot name="end"></slot>
		`;
	}
}

/* Custom element declarations */
type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };
type CustomElement<T, K extends string = string> = Partial<T & React.DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;

window.customElements.define("my-button", class extends MyButton {})
window.customElements.define("my-image", class extends MyImage {})
window.customElements.define("my-text-area", class extends MyTextArea {})
window.customElements.define("duplicate-buttons", class extends DuplicateButtons {})

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['my-button']: CustomElement<MyButton>;
      ['my-image']: CustomElement<MyImage>;
      ['my-text-area']: CustomElement<MyTextArea>;
      ['duplicate-buttons']: CustomElement<DuplicateButtons>;
    }
  }
}


/* React Components */
export function SimpleButton () {
  const [count, setCount] = React.useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

export function Button() {
  const [count, setCount] = React.useState(0)

  return (
    <my-button onClick={() => setCount(count + 1)}>
      {count}
    </my-button>
  );
}


export const TextArea = () => <my-text-area label="Comments" />

export const AnimatedImage = () => (
  <my-image
    src="https://shoelace.style/assets/images/walk.gif"
    alt="Animation of untied shoes walking on pavement"
  />
);

export const Duplicates = (props: Record<string, any>) => <duplicate-buttons {...props} />
