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
