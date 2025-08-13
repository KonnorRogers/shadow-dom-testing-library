import { getConfig, isInaccessible } from "@testing-library/dom";
import {
  getImplicitAriaRoles,
  // @ts-expect-error
} from "@testing-library/dom/dist/role-helpers";

import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";
import { prettyShadowDOM } from "./pretty-shadow-dom";

function getRoles(container: Element, { hidden = false } = {}) {
  function getShadowChildren(node: Element, shadowChildren: Element[] = []) {
    if (!node.shadowRoot) {
      return shadowChildren;
    }

    // should we push the shadowRoot??
    // shadowChildren.push(node.shadowRoot)

    for (const child of Array.from(node.shadowRoot.children)) {
      getShadowChildren(child, shadowChildren);
      shadowChildren.push(child);
    }

    return shadowChildren;
  }
  function flattenDOM(node: Element): Element[] {
    const children = Array.from(node.children);
    const flatChildren = [...getShadowChildren(node), ...children].reduce<
      Element[]
    >((acc, child) => [...acc, ...flattenDOM(child)], []);
    return [node, ...flatChildren];
  }

  return flattenDOM(container)
    .filter((element) => {
      return hidden === false
        ? isInaccessible(element as Element) === false
        : true;
    })
    .reduce(
      (acc, node) => {
        let roles: string[] = [];
        // TODO: This violates html-aria which does not allow any role on every element
        if (node.hasAttribute("role")) {
          roles = node.getAttribute("role")!.split(" ").slice(0, 1);
        } else {
          roles = getImplicitAriaRoles(node);
        }

        return roles.reduce<any>(
          (rolesAcc, role) =>
            Array.isArray(rolesAcc[role])
              ? { ...rolesAcc, [role]: [...rolesAcc[role], node] }
              : { ...rolesAcc, [role]: [node] },
          acc,
        );
      },
      {} as Record<string, Element[]>,
    );
}

function prettyRoles(
  dom: Element,
  {
    hidden,
    includeDescription,
  }: { hidden?: boolean; includeDescription?: boolean },
) {
  const roles = getRoles(dom, { hidden });
  // We prefer to skip generic role, we don't recommend it
  return Object.entries(roles)
    .filter(([role]) => role !== "generic")
    .map(([role, elements]) => {
      const delimiterBar = "-".repeat(50);
      const elementsString = elements
        .map((el) => {
          const nameString = `Name "${computeAccessibleName(el, {
            computedStyleSupportsPseudoElements:
              getConfig().computedStyleSupportsPseudoElements,
          })}":\n`;

          // @ts-expect-error
          const domString = prettyShadowDOM(el.cloneNode(false));

          if (includeDescription) {
            const descriptionString = `Description "${computeAccessibleDescription(
              el,
              {
                computedStyleSupportsPseudoElements:
                  getConfig().computedStyleSupportsPseudoElements,
              },
            )}":\n`;
            return `${nameString}${descriptionString}${domString}`;
          }

          return `${nameString}${domString}`;
        })
        .join("\n\n");

      return `${role}:\n\n${elementsString}\n\n${delimiterBar}`;
    })
    .join("\n");
}

export const logRoles = (dom: Element, { hidden = false } = {}) =>
  console.log(prettyRoles(dom, { hidden }));
