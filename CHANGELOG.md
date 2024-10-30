# Stripes-react-hotkeys

## [3.2.1](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.2.1) (2024-10-30)

* Migrate way from `findDOMNode`. Refs STCOM-1285.

## [3.1.0](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.1.0) (2024-08-29)

* `contains` should by null-safe. Refs STRIPES-772.
* Remove `react-hot-loader` cruft. Refs STRIPES-788.
* Remove explicit TypeScript declaration. Refs STRIPES-900.
* Export TypeScript typings. Refs STRIPES-928.
* Current `karma` avoids CVE-2021-23495, CVE-2022-0437.

## [3.0.8](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.0.8) (2020-12-01)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v3.0.7...v3.0.8)

* check for contained document.activeElement on mount.

## [3.0.7](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.0.7) (2020-06-05)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v3.0.6...v3.0.7)

* pin `keyboardjs` to `~2.5` because `2.6.0` contains breaking changes.

## [3.0.6](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.0.6) (2020-03-13)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v3.0.5...v3.0.6)

* Fixed issue with handlers being called multiple times after re-renders due to updates within the parent component.

## [3.0.5](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.0.5) (2020-03-03)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v3.0.2...v3.0.5)

* fixed accumulation of listeners.
* fixed multiple calls to handlers.
* fixed appropriate cascade of handlers/hotkeys.

## [3.0.2](https://github.com/folio-org/stripes-react-hotkeys/tree/v3.0.2) (2020-02-12)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v2.0.0...v3.0.2)

* Shuffled off old dependencies on create-react-class and use of mixins.
* Replaced mousetrap dependency with keyboardjs

## [2.0.0](https://github.com/folio-org/stripes-react-hotkeys/tree/v2.0.0) (2018-11-09)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v1.1.0...v2.0.0)

* Breaking version for updated published artifacts.
* `focus` prop now accepts a function so that the execution of a handler can be decided at run-time.

## [1.1.0](https://github.com/folio-org/stripes-react-hotkeys/tree/v1.1.0) (2018-09-12)
[Full Changelog](https://github.com/folio-org/stripes-react-hotkeys/compare/v1.0.0...v1.1.0)

* Move react to peerDependencies

## 1.0.0 (2017-07-31)

* Initial commit!
