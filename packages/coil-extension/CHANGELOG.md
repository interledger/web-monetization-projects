<a name="coil-extension@0.0.50"></a>

# [coil-extension@0.0.50](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.49...coil-extension@0.0.50) (2020-05-22)

### Features

- Add support for STREAM receipts [#533](https://github.com/coilhq/web-monetization-projects/pull/533)

<a name="coil-extension@0.0.49"></a>

# [coil-extension@0.0.49](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.48...coil-extension@0.0.49) (2020-04-06)

### Features

- Add anonymous tokens service to authenticate to Coil's Web Monetization infrastructure anonymously. This prevents Web Monetization usage from being tied back to users

<a name="coil-extension@0.0.48"></a>

# [coil-extension@0.0.48](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.47...coil-extension@0.0.48) (2020-03-16)

### Features

- Support dynamic @allow attribute setting on iframes [#453](https://github.com/coilhq/web-monetization-projects/pull/453)
- Support monetization of nested iframes [c723d93c](https://github.com/coilhq/web-monetization-projects/commit/c723d93c28bceb184ffab637a5f9a8b09b4888e4)
- Remove unnecessary permissions [91faeb2e](https://github.com/coilhq/web-monetization-projects/commit/91faeb2e213aeaf50643c9e84b7598c7ff297b88)

### Bug Fixes

- Fix iframe support on Firefox [58675617](https://github.com/coilhq/web-monetization-projects/commit/fe057a44898dc7fbff5a5ad45c5f5ab458675617)

<a name="coil-extension@0.0.47"></a>

# [coil-extension@0.0.47](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.46...coil-extension@0.0.47) (2020-03-05)

### Features

- Update popup to use membership rather than subscription [#269](https://github.com/coilhq/web-monetization-projects/pull/269) [#386](https://github.com/coilhq/web-monetization-projects/pull/386)
- Add tipping beta [#438](https://github.com/coilhq/web-monetization-projects/pull/438)
- Add support for monetization of iframes [#415](https://github.com/coilhq/web-monetization-projects/pull/415)
- Update dependencies

### Bug Fixes

- Fix youtube adaptation of some videos on Firefox [#443](https://github.com/coilhq/web-monetization-projects/pull/443)

<a name="coil-extension@0.0.46"></a>

# [coil-extension@0.0.46](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.45...coil-extension@0.0.46) (2020-01-31)

### Features

- Re-enable STREAM performance optimization [#282](https://github.com/coilhq/web-monetization-projects/pull/282)
- Remove styled-components in favor of material-ui builtins for reduced bundle size [#260](https://github.com/coilhq/web-monetization-projects/pull/260)
- Update ilp-protocol-stream to version 2.3.0

### Bug Fixes

- Fix Clock Skew issue [#307](https://github.com/coilhq/web-monetization-projects/pull/307)
- Make logging from content script optional [#342](https://github.com/coilhq/web-monetization-projects/pull/342)
- Squelch (expected) background script errors shown only in FF [#288](https://github.com/coilhq/web-monetization-projects/pull/288)
- Fix extension working with staging environment [#284](https://github.com/coilhq/web-monetization-projects/pull/284)
- Remove unused HistoryDb (IndexedDB) service [#343](https://github.com/coilhq/web-monetization-projects/pull/343)
- Fix race condition causing errant stop event to be fired [#353](https://github.com/coilhq/web-monetization-projects/pull/353)

<a name="coil-extension@0.0.45"></a>

# [coil-extension@0.0.45](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.44...coil-extension@0.0.45) (2020-01-04)

### Bug Fixes

- Revert flaky STREAM performance optimization [#242](https://github.com/coilhq/web-monetization-projects/pull/242)

<a name="coil-extension@0.0.44"></a>

# [coil-extension@0.0.44](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.43...coil-extension@0.0.44) (2019-12-19)

### Features

- Optimized Youtube adaptation to workaround daily API quota [#213](https://github.com/coilhq/web-monetization-projects/pull/213) [#161](https://github.com/coilhq/web-monetization-projects/pull/161)
- Optimized STREAM performance for better time-to-monetization [#187](https://github.com/coilhq/web-monetization-projects/pull/187)
- Add finalized: boolean to monetizationstop event detail [#180](https://github.com/coilhq/web-monetization-projects/pull/180)
- Add festive iconography [#216](https://github.com/coilhq/web-monetization-projects/pull/216) [#218](https://github.com/coilhq/web-monetization-projects/pull/218)

### Bug Fixes

- Popup icon shows page is monetized even if logged out [#185](https://github.com/coilhq/web-monetization-projects/pull/185)

<a name="coil-extension@0.0.43"></a>

# [coil-extension@0.0.43](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.42...coil-extension@0.0.43) (2019-12-10)

### Bug Fixes

- Fix stuck state caused by invalid payment pointers [#155](https://github.com/coilhq/web-monetization-projects/pull/155)
- Do not emit pending event if not subscribed [#148](https://github.com/coilhq/web-monetization-projects/pull/148)

<a name="coil-extension@0.0.42"></a>

# [coil-extension@0.0.42](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.41...coil-extension@0.0.42) (2019-12-04)

### Bug Fixes

- Fix streaming issues caused by race conditions when switching tabs quickly [#90](https://github.com/coilhq/web-monetization-projects/pull/90)
- Emit stopped event with correct requestId [#128](https://github.com/coilhq/web-monetization-projects/pull/128)

<a name="coil-extension@0.0.41"></a>

# [coil-extension@0.0.41](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.40...coil-extension@0.0.41) (2019-11-13)

### Bug Fixes

- Don't retry on bad SPSP requests [#48](https://github.com/coilhq/web-monetization-projects/pull/48)
- Send initiating url from content script [#47](https://github.com/coilhq/web-monetization-projects/pull/47)
- Fix background refresh causing stream resume [#30](https://github.com/coilhq/web-monetization-projects/issues/30)
- Fix monetization immediately after subscribing [#28](https://github.com/coilhq/web-monetization-projects/pull/28)
