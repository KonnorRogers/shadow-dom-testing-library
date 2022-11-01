import { vi } from 'vitest'
import { setup } from './setup.js'

setup(vi)

globalThis.jest = globalThis.vi
