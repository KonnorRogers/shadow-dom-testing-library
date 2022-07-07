import '@testing-library/jest-dom'
// import { jestPreviewConfigure } from 'jest-preview'
// jestPreviewConfigure({ autoPreview: true })

export function setup(viOrJest) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: viOrJest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: viOrJest.fn(), // deprecated
      removeListener: viOrJest.fn(), // deprecated
      addEventListener: viOrJest.fn(),
      removeEventListener: viOrJest.fn(),
      dispatchEvent: viOrJest.fn(),
    })),
  });

  globalThis.ResizeObserver = class ResizeObserver {
    observe () { viOrJest.fn() }
    unobserve () { viOrJest.fn() }
    disconnect () { viOrJest.fn() }
  }
}
