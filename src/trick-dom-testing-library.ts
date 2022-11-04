declare global {
  interface ShadowRoot {
    matches?: (this: ShadowRoot, string: string) => boolean;
    outerHTML?: string;
  }
}

// Amazingly fun hack to trick DOM testing libraries internal type checking logic.
// https://github.com/testing-library/dom-testing-library/blob/73a5694529dbfff289f3d7a01470c45ef5c77715/src/queries/text.ts#L34-L36
// https://github.com/testing-library/dom-testing-library/blob/73a5694529dbfff289f3d7a01470c45ef5c77715/src/pretty-dom.js#L50-L54
export function trickDOMTestingLibrary() {
  if (typeof ShadowRoot == "undefined")
    throw "Your environment does not support shadow roots.";

  if (ShadowRoot.prototype.matches == null) {
    Object.defineProperties(ShadowRoot.prototype, {
      matches: {
        get() {
          return function (this: ShadowRoot, string: string): boolean {
            const str = string.trim();
            if (str === "*") return true;

            return this.querySelector(string) != null ? true : false;
          };
        },
      },
    });
  }

  if (ShadowRoot.prototype.outerHTML == null) {
    Object.defineProperties(ShadowRoot.prototype, {
      outerHTML: {
        get() {
          return this.innerHTML;
        },
      },
    });
  }
}
