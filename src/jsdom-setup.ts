import { TextEncoder, TextDecoder } from "util";

/** This is a hack for using JSDOM + Jest. Vitest is unaffected by this. */
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global["TextDecoder"];

