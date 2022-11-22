/**
 * This is an extension of prettyDOM / logDOM that provides proper printing of shadow roots.
 * Pulled from here: https://github.com/AriPerkkio/aria-live-capture/blob/85f1e4613bec443797097320ed5f2b9f733fc729/.storybook/pretty-dom-with-shadow-dom.ts
 */
import { prettyDOM } from "@testing-library/dom";
import type { Config, NewPlugin, Printer, Refs } from "pretty-format";
import { getAllElementsAndShadowRoots } from "./deep-query-selectors";

export function prettyShadowDOM(
  ...args: Parameters<typeof prettyDOM>
): ReturnType<typeof prettyDOM> {
  const [dom, maxLength, options] = args;

  const plugin: NewPlugin = {
    test: (val: any) => {
      const bool = val?.constructor && testNode(val);
      return bool;
    },
    serialize,
  };

  return prettyDOM(dom, maxLength, {
    ...options,
    plugins: [plugin],
    filterNode: () => true,
  });
}

function escapeHTML(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Return empty string if keys is empty.
function printProps(
  keys: Array<string>,
  props: Record<string, unknown>,
  config: Config,
  indentation: string,
  depth: number,
  refs: Refs,
  printer: Printer
): string {
  const indentationNext = indentation + config.indent;
  const colors = config.colors;
  return keys
    .map((key) => {
      const value = props[key];
      let printed = printer(value, config, indentationNext, depth, refs);

      if (typeof value !== "string") {
        if (printed.indexOf("\n") !== -1) {
          printed =
            config.spacingOuter +
            indentationNext +
            printed +
            config.spacingOuter +
            indentation;
        }
        printed = "{" + printed + "}";
      }

      return (
        config.spacingInner +
        indentation +
        colors.prop.open +
        key +
        colors.prop.close +
        "=" +
        colors.value.open +
        printed +
        colors.value.close
      );
    })
    .join("");
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
const NodeTypeTextNode = 3;

// Return empty string if children is empty.
const printChildren = (
  children: Array<unknown>,
  config: Config,
  indentation: string,
  depth: number,
  refs: Refs,
  printer: Printer
): string =>
  children
    .map((child) => {
      const printedChild =
        typeof child === "string"
          ? printText(child, config)
          : printer(child, config, indentation, depth, refs);

      if (
        printedChild === "" &&
        typeof child === "object" &&
        child !== null &&
        (child as Node).nodeType !== NodeTypeTextNode
      ) {
        // A plugin serialized this Node to '' meaning we should ignore it.
        return "";
      }
      return config.spacingOuter + indentation + printedChild;
    })
    .join("");

const printText = (text: string, config: Config): string => {
  const contentColor = config.colors.content;
  return contentColor.open + escapeHTML(text) + contentColor.close;
};

const printComment = (comment: string, config: Config): string => {
  const commentColor = config.colors.comment;
  return (
    commentColor.open +
    "<!--" +
    escapeHTML(comment) +
    "-->" +
    commentColor.close
  );
};

// Separate the functions to format props, children, and element,
// so a plugin could override a particular function, if needed.
// Too bad, so sad: the traditional (but unnecessary) space
// in a self-closing tagColor requires a second test of printedProps.
const printElement = (
  type: string,
  printedProps: string,
  printedChildren: string,
  hasShadowRoot: boolean,
  config: Config,
  indentation: string
): string => {
  const tagColor = config.colors.tag;
  const shadowRootMarkup = hasShadowRoot
    ? `${config.spacingOuter + indentation}  #shadow-root`
    : "";

  return (
    tagColor.open +
    "<" +
    type +
    (printedProps &&
      tagColor.close +
        printedProps +
        config.spacingOuter +
        indentation +
        tagColor.open) +
    (printedChildren
      ? ">" +
        shadowRootMarkup +
        tagColor.close +
        printedChildren +
        config.spacingOuter +
        indentation +
        tagColor.open +
        "</" +
        type
      : (printedProps && !config.min ? "" : " ") + "/") +
    ">" +
    tagColor.close
  );
};

const printElementAsLeaf = (type: string, config: Config): string => {
  const tagColor = config.colors.tag;
  return (
    tagColor.open +
    "<" +
    type +
    tagColor.close +
    " …" +
    tagColor.open +
    " />" +
    tagColor.close
  );
};

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const FRAGMENT_NODE = 11;

const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

const testNode = (val: any) => {
  const constructorName = val.constructor.name;
  const { nodeType, tagName } = val;
  const isCustomElement =
    (typeof tagName === "string" && tagName.includes("-")) ||
    (typeof val.hasAttribute === "function" && val.hasAttribute("is"));

  return (
    (nodeType === ELEMENT_NODE &&
      (ELEMENT_REGEXP.test(constructorName) || isCustomElement)) ||
    (nodeType === TEXT_NODE && constructorName === "Text") ||
    (nodeType === COMMENT_NODE && constructorName === "Comment") ||
    (nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment")
  );
};

type HandledType = Element | Text | Comment | DocumentFragment;

function nodeIsText(node: HandledType): node is Text {
  return node.nodeType === TEXT_NODE;
}

function nodeIsComment(node: HandledType): node is Comment {
  return node.nodeType === COMMENT_NODE;
}

function nodeIsFragment(node: HandledType): node is DocumentFragment {
  return node.nodeType === FRAGMENT_NODE;
}

function serialize(
  node: HandledType,
  config: Config,
  indentation: string,
  depth: number,
  refs: Refs,
  printer: Printer
): string {
  if (nodeIsText(node)) {
    return printText(node.data, config);
  }

  if (nodeIsComment(node)) {
    return printComment(node.data, config);
  }

  const type = nodeIsFragment(node)
    ? `DocumentFragment`
    : node.tagName.toLowerCase();

  if (++depth > config.maxDepth) {
    return printElementAsLeaf(type, config);
  }

  const children = printChildren(
    getChildren(node),
    config,
    indentation + config.indent,
    depth,
    refs,
    printer
  );

  const hasShadowRoot = "shadowRoot" in node && node.shadowRoot != null;

  return printElement(
    type,
    printProps(
      nodeIsFragment(node)
        ? []
        : Array.from(node.attributes)
            .map((attr) => attr.name)
            .sort(),
      nodeIsFragment(node)
        ? {}
        : Array.from(node.attributes).reduce<Record<string, string>>(
            (props, attribute) => {
              props[attribute.name] = attribute.value;
              return props;
            },
            {}
          ),
      config,
      indentation + config.indent,
      depth,
      refs,
      printer
    ),
    children,
    hasShadowRoot,
    config,
    indentation
  );
}

function getChildren(node: Element | DocumentFragment, filterNode = () => true): Node[] {
	return getAllChildNodes(node).filter(filterNode)
}

function getAllChildNodes (node: Node | ShadowRoot | Element | DocumentFragment, finalNodes: (Node | Element)[] = []): Node[] {
	const nodes = getChildNodes(node)

	nodes.forEach((childNode) => {
		if (node == null) return

		finalNodes.push(childNode)

		if ("shadowRoot" in childNode && childNode.shadowRoot != null && childNode.shadowRoot.mode === "open") {
			getAllChildNodes(childNode.shadowRoot, finalNodes)
		}

		getAllChildNodes(childNode, finalNodes)
	})


	return finalNodes as Node[]
}

function getChildNodes (node: Element | Node): (Node | Element)[] {
	if ("children" in node) {
		return Array.prototype.slice.call(node.childNodes || node.children)
	}

	return Array.prototype.slice.call(node.childNodes)
}
