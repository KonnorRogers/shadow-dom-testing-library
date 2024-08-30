# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.11.3](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.11.2...v1.11.3) (2024-08-30)


### Bug Fixes

* account for \r\n and \r line endings in pretty shadow dom ([12e927a](https://github.com/konnorrogers/shadow-dom-testing-library/commit/12e927af6bc63befd9bc6a0375b9eb0094d027de))

### [1.11.2](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.11.1...v1.11.2) (2023-12-20)


### Bug Fixes

* **types:** add generics for within queries ([#54](https://github.com/konnorrogers/shadow-dom-testing-library/issues/54)) ([f5a8bf6](https://github.com/konnorrogers/shadow-dom-testing-library/commit/f5a8bf6fb8b84fb862f6598faf0754355414f15b))

### [1.11.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.11.0...v1.11.1) (2023-12-11)


### Bug Fixes

* **types:** add TypeScript generics for queries ([#53](https://github.com/konnorrogers/shadow-dom-testing-library/issues/53)) ([c9b0172](https://github.com/konnorrogers/shadow-dom-testing-library/commit/c9b01722a862937888f646801a784c70033009fb))

## [1.11.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.10.0...v1.11.0) (2023-05-19)


### Features

* set the default `getElementError` to use prettyShadowDOM ([#48](https://github.com/konnorrogers/shadow-dom-testing-library/issues/48)) ([990872e](https://github.com/konnorrogers/shadow-dom-testing-library/commit/990872e432faa1c685b3f56df3050ce4b5d52f3a))

## [1.10.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.9.1...v1.10.0) (2023-01-20)


### Features

* allow slots to aggregate projected elements ([#46](https://github.com/konnorrogers/shadow-dom-testing-library/issues/46)) ([bdd78e1](https://github.com/konnorrogers/shadow-dom-testing-library/commit/bdd78e18cc49ec2357aa999519d8fa75fd5df5ad))

### [1.9.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.9.0...v1.9.1) (2023-01-14)


### Bug Fixes

* strip extraneous linebreaks in pretty-shadow-dom ([#45](https://github.com/konnorrogers/shadow-dom-testing-library/issues/45)) ([863475c](https://github.com/konnorrogers/shadow-dom-testing-library/commit/863475c6ecd0921917a201d1929cd274355a61bc))

## [1.9.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.8.0...v1.9.0) (2023-01-06)


### Features

* export shadowQueries ([#44](https://github.com/konnorrogers/shadow-dom-testing-library/issues/44)) ([06850fb](https://github.com/konnorrogers/shadow-dom-testing-library/commit/06850fb690986dd6f3de723825fb1f74e200d998))

## [1.8.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.7.1...v1.8.0) (2022-11-28)


### Features

* replace DOMParser with a proper printer ([#43](https://github.com/konnorrogers/shadow-dom-testing-library/issues/43)) ([ebde061](https://github.com/konnorrogers/shadow-dom-testing-library/commit/ebde061e757f506fa12e652b1d03744931a59abc))

### [1.7.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.7.0...v1.7.1) (2022-11-11)


### Bug Fixes

* deepQuerySelector types and processing shadow roots ([#41](https://github.com/konnorrogers/shadow-dom-testing-library/issues/41)) ([92934e2](https://github.com/konnorrogers/shadow-dom-testing-library/commit/92934e2c3ae4b5bbc164769e4330d0ab8c30b9b9))

## [1.7.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.6.2...v1.7.0) (2022-11-11)


### Features

* modify deepQuerySelectorAll behavior, add getAllElementsAndShadowRoots. ([#36](https://github.com/konnorrogers/shadow-dom-testing-library/issues/36)) ([697a0dc](https://github.com/konnorrogers/shadow-dom-testing-library/commit/697a0dc0d0b4ce31f051037d3d2cad1f9aab19e5))

### [1.6.2](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.6.1...v1.6.2) (2022-11-10)


### Bug Fixes

* remove jsdom so polyfills arent needed. ([#37](https://github.com/konnorrogers/shadow-dom-testing-library/issues/37)) ([a56bbb0](https://github.com/konnorrogers/shadow-dom-testing-library/commit/a56bbb016954b6d6020d11746452bc3b4c188e2b))

### [1.6.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.6.0...v1.6.1) (2022-11-08)


### Bug Fixes

* pretty-shadow-dom modifying the original element ([#35](https://github.com/konnorrogers/shadow-dom-testing-library/issues/35)) ([4ec056e](https://github.com/konnorrogers/shadow-dom-testing-library/commit/4ec056e0269767d680286c23a17a539d3aa20a8d))

## [1.6.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.5.0...v1.6.0) (2022-11-08)


### Features

* export deep query selectors ([#31](https://github.com/konnorrogers/shadow-dom-testing-library/issues/31)) ([471a686](https://github.com/konnorrogers/shadow-dom-testing-library/commit/471a6865bebc5ec3615682da4543774c2597074f))

## [1.5.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.4.1...v1.5.0) (2022-11-07)


### Features

* disable suggestions for shadow queries ([#29](https://github.com/konnorrogers/shadow-dom-testing-library/issues/29)) ([a0bc80c](https://github.com/konnorrogers/shadow-dom-testing-library/commit/a0bc80c22b78ac5063bef321ba3e4edbe1d0a97d))


### Bug Fixes

* pretty-shadow-dom not serializing shadowRoot hosts. ([#28](https://github.com/konnorrogers/shadow-dom-testing-library/issues/28)) ([88e2b6d](https://github.com/konnorrogers/shadow-dom-testing-library/commit/88e2b6deb206a82ae96346d3cbf7d5b1e17674db))

### [1.4.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.4.0...v1.4.1) (2022-11-04)


### Bug Fixes

* 'within' now pushes to host element into the array of elements ([#25](https://github.com/konnorrogers/shadow-dom-testing-library/issues/25)) ([2c73eca](https://github.com/konnorrogers/shadow-dom-testing-library/commit/2c73eca76810a6a9b38ca79f7bb7b2a39eb9c371))

## [1.4.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.3.1...v1.4.0) (2022-11-04)


### Features

* export prettyShadowDOM and logShadowDOM ([#24](https://github.com/konnorrogers/shadow-dom-testing-library/issues/24)) ([caa3976](https://github.com/konnorrogers/shadow-dom-testing-library/commit/caa3976c3912086c5b34135d2e27be21394a7082))

### [1.3.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.3.0...v1.3.1) (2022-11-02)


### Bug Fixes

* nested shadow roots in debug and in queries ([#21](https://github.com/konnorrogers/shadow-dom-testing-library/issues/21)) ([c5e10db](https://github.com/konnorrogers/shadow-dom-testing-library/commit/c5e10db04a7ca75ce649b7697c05e6f2a6b8c779))

## [1.3.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.2.0...v1.3.0) (2022-11-01)


### Features

* enable screen debug and custom element serialization ([#18](https://github.com/konnorrogers/shadow-dom-testing-library/issues/18)) ([7d71736](https://github.com/konnorrogers/shadow-dom-testing-library/commit/7d717369339c42aaed0b3fa897a14bf0e585ce70))

### Extras

* JSDOM and @testing-library/dom marked as peerDependencies. ([#18](https://github.com/konnorrogers/shadow-dom-testing-library/issues/18)) ([7d71736](https://github.com/konnorrogers/shadow-dom-testing-library/commit/7d717369339c42aaed0b3fa897a14bf0e585ce70))

## [1.2.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.8...v1.2.0) (2022-10-13)


### Features

* export `within` function with shadow queries ([#12](https://github.com/konnorrogers/shadow-dom-testing-library/issues/12)) ([3f045b4](https://github.com/konnorrogers/shadow-dom-testing-library/commit/3f045b4cf5082a41f941dff5f0708844dc71a6c8))

### [1.1.8](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.7...v1.1.8) (2022-10-13)


### Bug Fixes

* duplicate nodes should not be returned by shadow queries. ([#11](https://github.com/konnorrogers/shadow-dom-testing-library/issues/11)) ([64871a5](https://github.com/konnorrogers/shadow-dom-testing-library/commit/64871a5694007aedff28be458f9d94e89d246d16))

### [1.1.7](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.6...v1.1.7) (2022-10-11)

* Fixed metadata on npmjs.com

### [1.1.6](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.5...v1.1.6) (2022-09-30)

* Fixed metadata on npmjs.com

### Bug Fixes

* add urls to package.json ([d61cfa0](https://github.com/konnorrogers/shadow-dom-testing-library/commit/d61cfa0f9e65107fd37fd0e8cfa00e4375dcbd1d))
* add urls to package.json ([ae36ba8](https://github.com/konnorrogers/shadow-dom-testing-library/commit/ae36ba81be8e762a514632d90705463701d316c6))

### [1.1.5](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.4...v1.1.5) (2022-09-15)


### Bug Fixes

* add a CJS import path ([b4aff6b](https://github.com/konnorrogers/shadow-dom-testing-library/commit/b4aff6be7997324f31f9ee5a6e4a71c4ab2eaca6))

### [1.1.4](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.3...v1.1.4) (2022-07-15)


### Bug Fixes

* use suggest: false for shadow queries ([#5](https://github.com/konnorrogers/shadow-dom-testing-library/issues/5)) ([e6047f9](https://github.com/konnorrogers/shadow-dom-testing-library/commit/e6047f917ef533ab3e4af9af52a2a8da7eaa48bf))

### [1.1.3](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.2...v1.1.3) (2022-07-14)


### Bug Fixes

* remove console.log ([e536205](https://github.com/konnorrogers/shadow-dom-testing-library/commit/e536205442af65a3ebeabc282f68d203ce3cc4bc))

### [1.1.2](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.1...v1.1.2) (2022-07-14)


### Bug Fixes

* broken release ([8669777](https://github.com/konnorrogers/shadow-dom-testing-library/commit/866977735173784aa805bcd4e494c3d776a54e1c))

### [1.1.1](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.1.0...v1.1.1) (2022-07-14)


### Bug Fixes

* deepQuerySelectorAll now accounts for containers with shadowRoots and shadowRoot elements passed in. ([#4](https://github.com/konnorrogers/shadow-dom-testing-library/issues/4)) ([aa4eddb](https://github.com/konnorrogers/shadow-dom-testing-library/commit/aa4eddb85d7ac91cff7328c4ed9a5c00c90b3d95))

## [1.1.0](https://github.com/konnorrogers/shadow-dom-testing-library/compare/v1.0.0...v1.1.0) (2022-07-07)

### Bug Fixes

* fix issues with duplicate elements ([#1](https://github.com/konnorrogers/shadow-dom-testing-library/issues/1)) ([9136dd0](https://github.com/konnorrogers/shadow-dom-testing-library/commit/9136dd08d0531eee21eebe25aac3aa913c6db15c))
* fix issue with Typescript types ([#1](https://github.com/konnorrogers/shadow-dom-testing-library/issues/1)) ([9136dd0](https://github.com/konnorrogers/shadow-dom-testing-library/commit/9136dd08d0531eee21eebe25aac3aa913c6db15c))

## 1.0.0 (2022-07-06)
