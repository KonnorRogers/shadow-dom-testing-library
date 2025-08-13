declare global {
  interface ShadowRoot {
    matches?: typeof HTMLElement.prototype.matches;
    outerHTML?: typeof HTMLElement.prototype.outerHTML;
  }
}

// Okay. For some reason shadow root patches cant be part of patchDOM. Haven't figured out why.
// Only reason I can come up with is the patchWrap() may be conflicting with internals of dom-testing-library?
// I do know calling `.getByText(el.shadowRoot)` will fail without this patch.
// outerHTML fails with some issue around "this".
// IDK...but this is weird, no its not the most responsible patch, but it works.
// Just dont go calling .matches() or .outerHTML() on shadowRoots in your code...
// This previously existed in other version of SDTL so not a huge deal.
patchShadowRoot();

// Amazingly fun hack to trick DOM testing libraries internal type checking logic.
// https://github.com/testing-library/dom-testing-library/blob/73a5694529dbfff289f3d7a01470c45ef5c77715/src/queries/text.ts#L34-L36
// https://github.com/testing-library/dom-testing-library/blob/73a5694529dbfff289f3d7a01470c45ef5c77715/src/pretty-dom.js#L50-L54
export function patchDOM() {
  // Return "dispose" callbacks to cleanup patchs
  return [patchSlotElement()];
}

function removeDOMPatch(patchRemovalFunctions: Function[]) {
  for (const fn of patchRemovalFunctions) {
    fn();
  }
}

export function patchWrap<T extends (...args: any) => any>(
  callback: T,
): ReturnType<T> {
  const patchRemovalFunctions = patchDOM();

  try {
    const val = callback();

    // We only wrap RTL functions, so I dont think anything returns a promise, but just in-case,
    // lets make sure we clean up.
    if (
      typeof val === "object" &&
      "finally" in val &&
      typeof val.finally === "function"
    ) {
      val.finally(() => removeDOMPatch(patchRemovalFunctions));
    }

    return val;
  } finally {
    removeDOMPatch(patchRemovalFunctions);
  }
}

function patchShadowRoot() {
  if (typeof ShadowRoot == "undefined")
    throw "Your environment does not support shadow roots.";

  if (ShadowRoot.prototype.matches == null) {
    Object.defineProperties(ShadowRoot.prototype, {
      matches: {
        get() {
          return function (this: ShadowRoot, string: string): boolean {
            const str = string.trim();
            if (str === "*") return true;

            return Boolean(this.querySelector(string));
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

function patchSlotElement() {
  const qsa = HTMLElement.prototype.querySelectorAll;
  const originalChildNodesDescriptor = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "childNodes",
  );
  const originalChildNodesGetter = originalChildNodesDescriptor!.get;

  /**
   * This patch allows labels to get proper textContent, and most likely other text helpers by taking either the projected nodes, or the fallback nodes.
   * https://github.com/KonnorRogers/shadow-dom-testing-library/issues/64#issuecomment-3177493042
   * https://github.com/testing-library/dom-testing-library/blob/225a3e4cfaa8f8046989d51b9051df507354b644/src/label-helpers.ts#L13-L35
   */
  Object.defineProperty(HTMLSlotElement.prototype, "childNodes", {
    get() {
      const projectedNodes: Node[] = this.assignedNodes({ flatten: true });

      // Slotted elements, use those.
      if (projectedNodes.length > 0) {
        return projectedNodes;
      }
      // if no assignedNodes, return original `childNodes`.
      return originalChildNodesGetter!.call(this);
    },
    enumerable: true,
    configurable: true,
  });

  HTMLSlotElement.prototype.querySelectorAll = function (str: string) {
    let els: Element[] = [];

    this.assignedElements({ flatten: true }).forEach((_el) => {
      const el = _el as Element;

      // Clone it and make a scratch buffer because we need to check that _el
      // meets the criteria of the querySelector before we push it to "els"
      const scratch = document.createElement("div");
      scratch.appendChild(el.cloneNode(false));

      if (scratch.querySelector(str)) {
        els.push(el);
      }

      els = els.concat(Array.from(el.querySelectorAll(str)));
    });

    // So because slots have fallback content, we want to only first query for slotted content.
    // If theres no slotted content, we fallback to using the default content.
    if (els.length == 0) {
      els = Array.from(qsa.call(this, str));
    }

    return [...new Set(els)] as unknown as ReturnType<
      typeof HTMLSlotElement.prototype.querySelectorAll
    >;
  };

  return () => {
    HTMLSlotElement.prototype.querySelectorAll = qsa;

    // There's no way to `delete` a newly defined property, so we just call the original descriptor.
    Object.defineProperty(HTMLSlotElement.prototype, "childNodes", {
      get() {
        return originalChildNodesGetter!.call(this);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
