// We try to load node dependencies
// let chalk = null
// let readFileSync = null
// let codeFrameColumns = null

// try {
//   const nodeRequire = module && module.require

//   readFileSync = nodeRequire.call(module, 'fs').readFileSync
//   codeFrameColumns = nodeRequire.call(
//     module,
//     '@babel/code-frame',
//   ).codeFrameColumns
//   chalk = nodeRequire.call(module, 'chalk')
// } catch {
//   // We're in a browser environment
// }

// // frame has the form "at myMethod (location/to/my/file.js:10:2)"
// function getCodeFrame(frame) {
//   const locationStart = frame.indexOf('(') + 1
//   const locationEnd = frame.indexOf(')')
//   const frameLocation = frame.slice(locationStart, locationEnd)

//   const frameLocationElements = frameLocation.split(':')
//   const [filename, line, column] = [
//     frameLocationElements[0],
//     parseInt(frameLocationElements[1], 10),
//     parseInt(frameLocationElements[2], 10),
//   ]

//   let rawFileContents = ''
//   try {
//     rawFileContents = readFileSync(filename, 'utf-8')
//   } catch {
//     return ''
//   }

//   const codeFrame = codeFrameColumns(
//     rawFileContents,
//     {
//       start: {line, column},
//     },
//     {
//       highlightCode: true,
//       linesBelow: 0,
//     },
//   )
//   return `${chalk.dim(frameLocation)}\n${codeFrame}\n`
// }

// function getUserCodeFrame() {
//   // If we couldn't load dependencies, we can't generate the user trace
//   /* istanbul ignore next */
//   if (!readFileSync || !codeFrameColumns) {
//     return ''
//   }
//   const err = new Error()
//   const firstClientCodeFrame = err.stack
//     .split('\n')
//     .slice(1) // Remove first line which has the form "Error: TypeError"
//     .find(frame => !frame.includes('node_modules/')) // Ignore frames from 3rd party libraries

//   return getCodeFrame(firstClientCodeFrame)
// }

//  
// function getDocument(): Document {
//   /* istanbul ignore if */
//   if (typeof window === 'undefined') {
//     throw new Error('Could not find default container')
//   }
//   return window.document
// }
//     

// // import createDOMElementFilter from './DOMElementFilter'
// // import {getUserCodeFrame} from './get-user-code-frame'
// // import {getDocument} from './helpers'

// const shouldHighlight = () => {
//   let colors
//   try {
//   	colors = JSON.parse(process?.env?.COLORS || "{}")
//   } catch (e) {
//     // If this throws, process?.env?.COLORS wasn't parsable. Since we only
//     // care about `true` or `false`, we can safely ignore the error.
//   }

//   if (typeof colors === 'boolean') {
//     // If `colors` is set explicitly (both `true` and `false`), use that value.
//     return colors
//   } else {
//     // If `colors` is not set, colorize if we're in node.
//     return (
//       typeof process !== 'undefined' &&
//       process.versions !== undefined &&
//       process.versions.node !== undefined
//     )
//   }
// }

// const {DOMCollection, DOMElement} = prettyFormat.plugins

// // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
// const ELEMENT_NODE = 1
// const COMMENT_NODE = 8

// // https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50
// function filterCommentsAndDefaultIgnoreTagsTags(value: HTMLElement) {
//   return (
//     value.nodeType !== COMMENT_NODE &&
//     (value.nodeType !== ELEMENT_NODE ||
//       !value.matches(getConfig().defaultIgnore))
//   )
// }

// export function prettyDOM(
//   dom?: Element | Document,
//   maxLength?: number,
//   options: PrettyDOMOptions & {filterNode?: (value: HTMLElement) => boolean} = {},
// ): string | false {
//   if (!dom) {
//     dom = getDocument().body
//   }
//   if (typeof maxLength !== 'number') {
//     maxLength = Number((typeof process !== 'undefined' && process.env.DEBUG_PRINT_LIMIT)) || 7000
//   }

//   if (maxLength === 0) {
//     return ''
//   }
//   if (dom != null && "documentElement" in dom && dom.documentElement) {
//     dom = dom.documentElement
//   }

//   let domTypeName = typeof dom as string
//   let fallback: typeof dom | {} = dom || {}
//   if (dom != null && domTypeName === 'object') {
//     domTypeName = dom.constructor.name
//   } else {
//     // To don't fall with `in` operator
//     fallback = {}
//   }
//   if (!('outerHTML' in fallback)) {
//     throw new TypeError(
//       `Expected an element or document but got ${domTypeName}`,
//     )
//   }

//   const {
//     filterNode = filterCommentsAndDefaultIgnoreTagsTags,
//     ...prettyFormatOptions
//   } = options

//   console.log(options)
//   const debugContent = prettyFormat.format(dom, {

//     // plugins: [createDOMElementFilter(filterNode), DOMCollection],
//     plugins: [DOMElement, DOMCollection],
//     printFunctionName: false,
//     highlight: shouldHighlight(),
//     ...prettyFormatOptions,
//   })

//   return maxLength !== undefined && dom && "outerHTML" in dom && dom.outerHTML.length > maxLength
//     ? `${debugContent.slice(0, maxLength)}...`
//     : debugContent
// }

// const logDOM = (...args: Parameters<typeof prettyDOM>) => {
//   const userCodeFrame = getUserCodeFrame()
//   if (userCodeFrame) {
//     console.log(`${prettyDOM(...args)}\n\n${userCodeFrame}`)
//   } else {
//     console.log(prettyDOM(...args))
//   }
// }
//
