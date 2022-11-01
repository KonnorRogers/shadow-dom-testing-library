import { getConfig, PrettyDOMOptions, prettyFormat } from '@testing-library/dom'

import { getUserCodeFrame } from "./get-user-code-frame"
import createDOMElementFilter from './dom-element-filter'

function getDocument(): Document {
  if (typeof window === 'undefined') {
    throw new Error('Could not find default container')
  }
  return window.document
}

 const shouldHighlight = () => {
   let colors
   try {
   	colors = JSON.parse(process?.env?.COLORS || "{}")
   } catch (e) {
     // If this throws, process?.env?.COLORS wasn't parsable. Since we only
     // care about `true` or `false`, we can safely ignore the error.
   }

   if (typeof colors === 'boolean') {
     // If `colors` is set explicitly (both `true` and `false`), use that value.
     return colors
   } else {
     // If `colors` is not set, colorize if we're in node.
     return (
       typeof process !== 'undefined' &&
       process.versions !== undefined &&
       process.versions.node !== undefined
     )
   }
 }

 // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
 const ELEMENT_NODE = 1
 const COMMENT_NODE = 8

 // https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50
 function filterCommentsAndDefaultIgnoreTagsTags(value: Element) {
   return (
     value.nodeType !== COMMENT_NODE &&
     (value.nodeType !== ELEMENT_NODE ||
       !value.matches(getConfig().defaultIgnore))
   )
 }

 function prettyDOM(
   dom?: Element | Document,
   maxLength?: number,
   options: PrettyDOMOptions & {filterNode?: (value: Element) => boolean} = {},
 ): string | false {
   if (!dom) {
     dom = getDocument().body
   }
   if (typeof maxLength !== 'number') {
     maxLength = Number((typeof process !== 'undefined' && process.env.DEBUG_PRINT_LIMIT)) || 7000
   }

   if (maxLength === 0) {
     return ''
   }
   if (dom != null && "documentElement" in dom && dom.documentElement) {
     dom = dom.documentElement
   }

   let domTypeName = typeof dom as string
   let fallback: typeof dom | {} = dom || {}
   if (dom != null && domTypeName === 'object') {
     domTypeName = dom.constructor.name
   } else {
     // To don't fall with `in` operator
     fallback = {}
   }
   if (!('outerHTML' in fallback)) {
     throw new TypeError(
       `Expected an element or document but got ${domTypeName}`,
     )
   }

   const {
     filterNode = filterCommentsAndDefaultIgnoreTagsTags,
     ...prettyFormatOptions
   } = options

   const debugContent = prettyFormat.format(dom, {

     plugins: [createDOMElementFilter(filterNode), prettyFormat.plugins.DOMCollection],
     printFunctionName: false,
     highlight: shouldHighlight(),
     ...prettyFormatOptions,
   })

   return maxLength !== undefined && dom && "outerHTML" in dom && dom.outerHTML.length > maxLength
     ? `${debugContent.slice(0, maxLength)}...`
     : debugContent
 }

 const logDOM = (...args: Parameters<typeof prettyDOM>) => {
   const userCodeFrame = getUserCodeFrame()
   if (userCodeFrame) {
     console.log(`${prettyDOM(...args)}\n\n${userCodeFrame}`)
   } else {
     console.log(prettyDOM(...args))
   }
 }

export { logDOM, prettyDOM }
