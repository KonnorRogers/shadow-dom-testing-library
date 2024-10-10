import { getConfig } from '@testing-library/dom'
import {elementRoles} from 'aria-query'
import {
  computeAccessibleDescription,
  computeAccessibleName,
} from 'dom-accessibility-api'
import {prettyShadowDOM} from './pretty-shadow-dom.js'

const elementRoleList = buildElementRoleList(elementRoles)


function buildElementRoleList(elementRolesMap: typeof elementRoles) {
  function makeElementSelector({name, attributes}: { name: string, attributes: Array<Attr & { constraints?: Array<string> }> }) {
    return `${name}${[...attributes]
      .map(({name: attributeName, value, constraints = []}) => {
        const shouldNotExist = constraints.indexOf('undefined') !== -1
        const shouldBeNonEmpty = constraints.indexOf('set') !== -1
        const hasExplicitValue = typeof value !== 'undefined'

        if (hasExplicitValue) {
          return `[${attributeName}="${value}"]`
        } else if (shouldNotExist) {
          return `:not([${attributeName}])`
        } else if (shouldBeNonEmpty) {
          return `[${attributeName}]:not([${attributeName}=""])`
        }

        return `[${attributeName}]`
      })
      .join('')}`
  }

  function getSelectorSpecificity({attributes = []}) {
    return attributes.length
  }

  type Specificity = { specificity: number }

  function bySelectorSpecificity(
    {specificity: leftSpecificity}: Specificity,
    {specificity: rightSpecificity}: Specificity,
  ) {
    return rightSpecificity - leftSpecificity
  }
  const entries = [...elementRolesMap.entries()]

  function match(element: typeof entries[0][0]) {
    let attributes = (element.attributes || []) as unknown as Array<Attr>

    // https://github.com/testing-library/dom-testing-library/issues/814
    const typeTextIndex = [...attributes].findIndex(
      attribute =>
        attribute.value &&
        attribute.name === 'type' &&
        attribute.value === 'text',
    )

    if (typeTextIndex >= 0) {
      // not using splice to not mutate the attributes array
      attributes = [
        ...attributes.slice(0, typeTextIndex),
        ...attributes.slice(typeTextIndex + 1),
      ]
    }

    const el = element as unknown as Element & { name: string }
    const selector = makeElementSelector({...el, attributes})

    return (node: any) => {
      if (typeTextIndex >= 0 && node.type !== 'text') {
        return false
      }

      return node.matches(selector)
    }
  }

  // @ts-expect-error
  let result = []

  // eslint bug here:
  // eslint-disable-next-line no-unused-vars
  for (const [element, roles] of elementRolesMap.entries()) {
    result = [
      // @ts-expect-error
      ...result,
      {
        match: match(element),
        roles: Array.from(roles),
        // @ts-expect-error
        specificity: getSelectorSpecificity(element),
      },
    ]
  }

  // @ts-expect-error
  return result.sort(bySelectorSpecificity)
}

function getRoles(container: Element, {hidden = false} = {}) {
  function flattenDOM(node: Element): Array<Element> {
    return [
      node,
      // @ts-expect-error
      ...Array.from(node.children).reduce(
        // @ts-expect-error
        (acc, child) => [...acc, ...flattenDOM(child)],
        [],
      ),
    ] as Array<Element>
  }

  return flattenDOM(container)
    .filter(element => {
      return hidden === false ? isInaccessible(element) === false : true
    })
    .reduce((acc, node) => {
      let roles = []
      // TODO: This violates html-aria which does not allow any role on every element
      if (node.hasAttribute('role')) {
        roles = node.getAttribute('role').split(' ').slice(0, 1)
      } else {
        roles = getImplicitAriaRoles(node)
      }

      return roles.reduce(
        (rolesAcc, role) =>
          Array.isArray(rolesAcc[role])
            ? {...rolesAcc, [role]: [...rolesAcc[role], node]}
            : {...rolesAcc, [role]: [node]},
        acc,
      )
    }, {})
}

function prettyRoles(dom, {hidden, includeDescription}) {
  const roles = getRoles(dom, {hidden})
  // We prefer to skip generic role, we don't recommend it
  return Object.entries(roles)
    .filter(([role]) => role !== 'generic')
    .map(([role, elements]) => {
      const delimiterBar = '-'.repeat(50)
      const elementsString = elements
        .map(el => {
          const nameString = `Name "${computeAccessibleName(el, {
            computedStyleSupportsPseudoElements:
              getConfig().computedStyleSupportsPseudoElements,
          })}":\n`

          const domString = prettyShadowDOM(el.cloneNode(false))

          if (includeDescription) {
            const descriptionString = `Description "${computeAccessibleDescription(
              el,
              {
                computedStyleSupportsPseudoElements:
                  getConfig().computedStyleSupportsPseudoElements,
              },
            )}":\n`
            return `${nameString}${descriptionString}${domString}`
          }

          return `${nameString}${domString}`
        })
        .join('\n\n')

      return `${role}:\n\n${elementsString}\n\n${delimiterBar}`
    })
    .join('\n')
}

const logRoles = (dom: , {hidden = false} = {}) => console.log(prettyRoles(dom, {hidden}))


export {
  getRoles,
  logRoles,
  prettyRoles,
}
