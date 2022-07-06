/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  transform: {
    // Change to "babel-jest" to use babel instead.
    // https://github.com/facebook/jest/tree/main/packages/babel-jest#setup
    "\\.[jt]sx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/?!(@harmony)",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(s[ac]ss|css|less)$": "identity-obj-proxy"
  }
};
