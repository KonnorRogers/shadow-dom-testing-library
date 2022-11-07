import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom'
// import { jestPreviewConfigure } from 'jest-preview'
// jestPreviewConfigure({ autoPreview: true })

configure({ throwSuggestions: true })

export function setup(viOrJest) {
  if (window == null) throw Error("`window` is null. Perhaps you are not using JSDOM? Or perhaps you are calling this function before the window has been mocked by JSDOM.")

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
