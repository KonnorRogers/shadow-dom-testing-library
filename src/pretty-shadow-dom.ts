import { prettyDOM, getConfig } from "@testing-library/dom";
import type { Config, NewPlugin, Printer, Refs } from "pretty-format";

function removeDuplicateNewLines(str: string) {
  return str.replaceAll(/^\s*\n$/gm, "")
}

export function prettyShadowDOM(
  ...args: Parameters<typeof prettyDOM>
): ReturnType<typeof prettyDOM> {
  let [dom, maxLength, options] = args;

  const plugin: NewPlugin = createDOMElementFilter(
    options?.filterNode || filterCommentsAndDefaultIgnoreTagsTags
  );

  if (options == null) options = {};
  if (options.plugins == null) options.plugins = [];

  options.plugins.push(plugin);

  const res = prettyDOM(dom, maxLength, {
    ...options,
    plugins: [plugin],
  });

  if (res === false) return res

  return removeDuplicateNewLines(res)
}

function escapeHTML(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function filterCommentsAndDefaultIgnoreTagsTags(value: Node) {
  return (
    value.nodeType !== COMMENT_NODE &&
    (value.nodeType !== ELEMENT_NODE ||
      // @ts-expect-error
      !value.matches(getConfig().defaultIgnore))
  );
}

// Return empty string if keys is empty.
const printProps = (
  keys: Array<string>,
  props: Record<string, unknown>,
  config: Config,
  indentation: string,
  depth: number,
  refs: Refs,
  printer: Printer
): string => {
  const indentationNext = indentation + config.indent;
  const colors = config.colors;

  return removeDuplicateNewLines(keys
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
    .join(""))
};

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
  removeDuplicateNewLines(children
    .map((child) => {
      const printedChild =
        typeof child === "string"
          ? printText(child, config)
          : printer(child, config, indentation, depth, refs);

      if (
        printedChild === "" &&
        typeof child === "object" &&
        child != null &&
        (child as Node).nodeType !== NodeTypeTextNode
      ) {
        // A plugin serialized this Node to '' meaning we should ignore it.
        return "";
      }
      return config.spacingOuter + indentation + printedChild;
    })
    .join(""))

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
  config: Config,
  indentation: string
): string => {
  const tagColor = config.colors.tag;

  return removeDuplicateNewLines(
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
  )
};

const printElementAsLeaf = (type: string, config: Config): string => {
  const tagColor = config.colors.tag;
  return removeDuplicateNewLines(
    tagColor.open +
    "<" +
    type +
    tagColor.close +
    " …" +
    tagColor.open +
    " />" +
    tagColor.close
  )
};

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const FRAGMENT_NODE = 11;

const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

const testNode = (val: any) => {
  const constructorName = val?.constructor?.name || "";
  const { nodeType, tagName } = val;
  const isCustomElement =
    (typeof tagName === "string" && tagName.includes("-")) ||
    (typeof val.hasAttribute === "function" && val.hasAttribute("is")) ||
    val instanceof HTMLElement;

  return (
    (nodeType === ELEMENT_NODE &&
      (ELEMENT_REGEXP.test(constructorName) || isCustomElement)) ||
    (nodeType === TEXT_NODE && constructorName === "Text") ||
    (nodeType === COMMENT_NODE && constructorName === "Comment") ||
    // Don't check constructorName === "DocumentFragment" because it excludes ShadowRoot.
    ( nodeType === FRAGMENT_NODE )
  );
};

export const test: NewPlugin["test"] = (val: any) =>
  val?.constructor?.name && testNode(val);

type HandledType = Element | Text | Comment | DocumentFragment;

function nodeIsText(node: HandledType): node is Text {
  return node.nodeType === TEXT_NODE;
}

function nodeIsComment(node: HandledType): node is Comment {
  return node.nodeType === COMMENT_NODE;
}

function nodeIsFragment(
  node: HandledType
): node is DocumentFragment | ShadowRoot {
  return node.nodeType === FRAGMENT_NODE;
}

export function createDOMElementFilter(
  filterNode: (node: Node) => boolean
): NewPlugin {
  function getChildren(
    node: Element | DocumentFragment | ShadowRoot
  ): (Node | Element | ShadowRoot)[] {
    const children: (Node | Element | ShadowRoot)[] =
      Array.prototype.slice.call(node.childNodes || node.children);

    if (
      "shadowRoot" in node &&
      node.shadowRoot != null &&
      node.shadowRoot.mode !== "closed"
    ) {
      children.unshift(node.shadowRoot);
    }

    return children.filter(filterNode);
  }

  return {
    test: (val: any) => val?.constructor && testNode(val),
    serialize: (
      node: HandledType,
      config: Config,
      indentation: string,
      depth: number,
      refs: Refs,
      printer: Printer
    ) => {
      if (nodeIsText(node)) {
        return printText(node.data, config);
      }

      if (nodeIsComment(node)) {
        return printComment(node.data, config);
      }

      let type = "DocumentFragment";

      if ("tagName" in node && node.tagName) {
        type = node.tagName.toLowerCase();
      } else if (node instanceof ShadowRoot) {
        type = "ShadowRoot";
      }

      if (++depth > config.maxDepth) {
        return printElementAsLeaf(type, config);
      }

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
        printChildren(
          getChildren(node) as unknown[],
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        config,
        indentation
      );
    },
  };
}
