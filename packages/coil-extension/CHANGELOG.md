- <a name="coil-extension@0.0.59"></a>

# [coil-extension@0.0.59](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.58...coil-extension@0.0.59) (2021-05-09)

### New Features

- Set default view to tipping where enabled [#2717](https://github.com/coilhq/web-monetization-projects/pull/2717) [#2836](https://github.com/coilhq/web-monetization-projects/pull/2836)
- Keyboard accessible tipping buttons [#2652](https://github.com/coilhq/web-monetization-projects/pull/2652)

- <a name="coil-extension@0.0.58"></a>

### Fixes

- Use tabs permission on Firefox to fix logout issues [#2679](https://github.com/coilhq/web-monetization-projects/pull/2679)
- Omit Cookies at source as well as CF from anon tokens requests [#2814](https://github.com/coilhq/web-monetization-projects/pull/2814)[#2842](https://github.com/coilhq/web-monetization-projects/pull/2842)

# [coil-extension@0.0.58](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.57...coil-extension@0.0.58) (2021-02-25)

### Bug Fixes

- Update icon when only tipping is supported [#2635](https://github.com/coilhq/web-monetization-projects/pull/2635)
- Disallow fractional inputs [#2636](https://github.com/coilhq/web-monetization-projects/pull/2636)
- Updated messaging for limits [#2639](https://github.com/coilhq/web-monetization-projects/pull/2639)

<a name="coil-extension@0.0.57"></a>

# [coil-extension@0.0.57](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.56...coil-extension@0.0.57) (2022-02-08)

### New Features

- Add new UI & tipping closed beta

  - [#2306](https://github.com/coilhq/web-monetization-projects/pull/2306)
  - [#2484](https://github.com/coilhq/web-monetization-projects/pull/2484)
  - [#2503](https://github.com/coilhq/web-monetization-projects/pull/2503)
  - [#2432](https://github.com/coilhq/web-monetization-projects/pull/2432)
  - [#2507](https://github.com/coilhq/web-monetization-projects/pull/2507)
  - [#2508](https://github.com/coilhq/web-monetization-projects/pull/2508)
  - [#2522](https://github.com/coilhq/web-monetization-projects/pull/2508)
  - [#2551](https://github.com/coilhq/web-monetization-projects/pull/2551)
  - [#2552](https://github.com/coilhq/web-monetization-projects/pull/2552)
  - [#2535](https://github.com/coilhq/web-monetization-projects/pull/2535)
  - [#2571](https://github.com/coilhq/web-monetization-projects/pull/2571)
  - [#2568](https://github.com/coilhq/web-monetization-projects/pull/2568)
  - [#2572](https://github.com/coilhq/web-monetization-projects/pull/2572)
  - [#2578](https://github.com/coilhq/web-monetization-projects/pull/2578)
  - [#2581](https://github.com/coilhq/web-monetization-projects/pull/2581)
  - [#2582](https://github.com/coilhq/web-monetization-projects/pull/2582)
  - [#2588](https://github.com/coilhq/web-monetization-projects/pull/2588)
  - [#2593](https://github.com/coilhq/web-monetization-projects/pull/2593)
  - [#2596](https://github.com/coilhq/web-monetization-projects/pull/2596)
  - [#2592](https://github.com/coilhq/web-monetization-projects/pull/2592)
  - [#2603](https://github.com/coilhq/web-monetization-projects/pull/2603)
  - [#2605](https://github.com/coilhq/web-monetization-projects/pull/2605)

- <a name="coil-extension@0.0.56"></a>

# [coil-extension@0.0.56](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.55...coil-extension@0.0.56) (2021-07-20)

### Bug Fixes

- Fix race condition caused by concurrent startWebMonetization [#2149](https://github.com/coilhq/web-monetization-projects/pull/2149) [#2144](https://github.com/coilhq/web-monetization-projects/issues/2144)

- <a name="coil-extension@0.0.55"></a>

# [coil-extension@0.0.55](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.54...coil-extension@0.0.55) (2021-07-09)

### Bug Fixes

- Fix undefined whoami selection in token refresh query [#2118](https://github.com/coilhq/web-monetization-projects/pull/2118)

- <a name="coil-extension@0.0.54"></a>

# [coil-extension@0.0.54](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.53...coil-extension@0.0.54) (2021-07-01)

### Bug Fixes

- Add missing canTip field to combined whoami/refreshToken query [#2070](https://github.com/coilhq/web-monetization-projects/pull/2070)

<a name="coil-extension@0.0.53"></a>

# [coil-extension@0.0.53](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.52...coil-extension@0.0.53) (2021-06-18)

### Features

- Log progress events when localStorage.WM_DEBUG_PROGRESS is set [#1709](https://github.com/coilhq/web-monetization-projects/pull/1709)
- Do not log in background page unless localStorage.COIL_LOGGING_ENABLED set [#1900](https://github.com/coilhq/web-monetization-projects/pull/1900), [#1908](https://github.com/coilhq/web-monetization-projects/pull/1908)
- Support Safari via workarounds [#1927](https://github.com/coilhq/web-monetization-projects/pull/1927)

### Bug Fixes

- Use coil.com/gateway instead of coil.com/graphql [#1886](https://github.com/coilhq/web-monetization-projects/pull/1886)
- Don't emit bogus stopped event when logged out [#1964](https://github.com/coilhq/web-monetization-projects/pull/1964)
- Aggressively refresh auth tokens [#1918](https://github.com/coilhq/web-monetization-projects/pull/1918)
- Fix multiple tags upon content script init causing background payments [#2025](https://github.com/coilhq/web-monetization-projects/pull/2025)

### Tweaks

- Update popup copy/styling [#1786](https://github.com/coilhq/web-monetization-projects/pull/1786), [#1731](https://github.com/coilhq/web-monetization-projects/pull/1731), [#1816](https://github.com/coilhq/web-monetization-projects/pull/1816), [#1731](https://github.com/coilhq/web-monetization-projects/pull/1731), [#1818](https://github.com/coilhq/web-monetization-projects/pull/1818), [#1907](https://github.com/coilhq/web-monetization-projects/pull/1907)

<a name="coil-extension@0.0.52"></a>

# [coil-extension@0.0.52](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.51...coil-extension@0.0.52) (2021-02-01)

### Bug Fixes

- Trim whitespace in payment pointers [#1349](https://github.com/coilhq/web-monetization-projects/pull/1349)

### Tweaks

- Reduce <script> injected code to just one [#1254](https://github.com/coilhq/web-monetization-projects/pull/1254) [#1503](https://github.com/coilhq/web-monetization-projects/pull/1503)
- Remove 'unsafe-eval' from CSP in favor of sha256 of singular polyfill [#1542](https://github.com/coilhq/web-monetization-projects/pull/1542)
- Put all iconography elements into the icon rather than spread across icon/badge [#1529](https://github.com/coilhq/web-monetization-projects/pull/1529)

<a name="coil-extension@0.0.51"></a>

# [coil-extension@0.0.51](https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.50...coil-extension@0.0.51) (2020-07-14)

### Features

- Impl link tag [#784](https://github.com/coilhq/web-monetization-projects/pull/533)
- Propagate logout to all contexts, incl private [#781](https://github.com/coilhq/web-monetization-projects/pull/533)

### Bug Fixes

- Fix dynamically allowed but unfocused iframes getting into bad state which stalled streaming [#819](https://github.com/coilhq/web-monetization-projects/pull/819)

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
