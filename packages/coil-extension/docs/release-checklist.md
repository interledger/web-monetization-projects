# Release Checklist

Follow these steps, for both desktop Chrome and Firefox and at least one android build before
releasing, and commit a refinement!

As we currently have little to no automated tests (or even a specification) when you fix
an issue, add a step to the testing checklist for each feature/bug added, with a link to
the issue/PR.

When releasing, we can copy this markdown into the PR for a release.

- [ ] Update the [CHANGELOG.md](../CHANGELOG.md)

- [ ] Build for prod with release settings

  - e.g. `yarn build-prod chrome -p --run-prod --devtool=none`
    - as per [package.sh](../package.sh)

- [ ] Import unpacked/temporary extension/add-on

  - For Firefox, go to `about:debugging`
    - Enable add-on debugging
    - Load Temporary Add-on...
  - For Chrome, go to `chrome://extensions` and `Load Unpacked`

- [ ] [example.com](http://example.com/) should say "This website is not supported"

  - ![image](https://user-images.githubusercontent.com/525211/66626576-f4b42280-ec22-11e9-9f77-4a95be08643e.png)

- [ ] [xrpcommunity.blog](https://xrpcommunity.blog/) should monetize

  - ![image](https://user-images.githubusercontent.com/525211/66626655-3c3aae80-ec23-11e9-981a-0e317ab80b42.png)

- [ ] [twitch.tv](https://twitch.tv/vinesauce) works

  - ![image](https://user-images.githubusercontent.com/525211/66626721-815ee080-ec23-11e9-8139-59a563822eb0.png)

- [ ] [monetized youtube video](https://www.youtube.com/watch?v=-QMbZx_w2_Y)

  - ![image](https://user-images.githubusercontent.com/525211/66626878-0a761780-ec24-11e9-8015-19bf8348807b.png)

- Coil welcome and welcome to explore pages

  - [ ] Go to coil.com, the browser action popup should show welcome to coil
    - ![image](https://user-images.githubusercontent.com/525211/66626988-6b9deb00-ec24-11e9-86c3-b55c17e891c2.png)
  - [ ] Should have a link to coil.com/explore page
  - [ ] Once on explore page should show `Start Exploring` with a rocket-ship graphic
    - ![image](https://user-images.githubusercontent.com/525211/66627053-a2740100-ec24-11e9-8759-76f40c46d6fa.png)

- [ ] Will route to \$coildomain.com/login rather than open popup if logged out

  - Log out from extension
  - Check that icon is in 'unavailable' state
    - ![image](https://user-images.githubusercontent.com/525211/66627206-2a5a0b00-ec25-11e9-9c0c-74dc34370e13.png)
  - Click on browser action
  - Check that routed to login page
    - ![image](https://user-images.githubusercontent.com/525211/66627301-6beab600-ec25-11e9-8045-a4e35686dc34.png)

- [ ] Make sure the manifest version was bumped but doesn't skip versions

- [ ] Check the monetization animation works properly

  - ![image](https://user-images.githubusercontent.com/525211/66627467-04813600-ec26-11e9-855a-517700af4e26.png)
  - Only required on desktop browsers
  - Should animate when monetized and packets received
  - Should stop animation when network disconnected
    - Note that on Firefox/MacOS the popup automatically closes when the
      tab loses focus so can use something like this in terminal:
      - `sudo sleep 10 && sudo ifconfig en0 down && sleep 10 && sudo ifconfig en0 up`

- [ ] Run the puppeteer [tests](./test.sh) (look at the [circle jobs](../../../.circleci/config.yml))

  - export BROWSER_TYPE='chrome' # or 'firefox'
  - logout test currently fails on Firefox due to puppeteer-firefox limitations

- [ ] Go to a [youtube video](https://www.youtube.com/watch?v=l1btEwwRePs),
      manually skip to near end of video, and when autoplay of a video from
      another channel starts, check that monetization has stopped.
      [#33][i33]

- [ ] Go to [xrpcommunity.blog](https://xrpcommunity.blog/) and as page
      is loading very quickly open the popup.
      It should show "This page is Web-Monetized" even before streaming
      starts. Should show 'setting up payment' then 'coil is paying creator'
      [#120][i120]

- [ ] Open the [reloading-every-15s.html](../test/fixtures/reloading-every-15s.html) file:

  - Use a localhost server so WM works (e.g. with `python -m http.server 4000`)
  - Open the developer tools console undocked so can view while **PAGE IS BACKGROUNDED**
    - Note the `Reloading page` logging
  - Open the extension background page developer tools and look at the stream logging
  - SHOULD NOT initiate a stream or SPSP request
    [#144][i144]

- [ ] Open the [event-logger.html](test/fixtures/event-logger.html) file:

  - Use a localhost server so WM works (e.g. with `python -m http.server 4000`)
  - Look for unusual timings, check that pending state is emitted nearly
    immediately after page load or meta tag added
  - Issue: [#63][ni63]
  - Fix PR: [#69][np69]

- [ ] Check started event fires when quickly switching between tabs

  - Open the [event-logger.html](test/fixtures/event-logger.html) file
  - Switch to another (non-monetized) tab. The payments stop. Quickly switch back to the first tab.
  - The payments restart. Make sure there is a monetizationstart event
  - Issue: [#105][ni105]
  - Fix PR: [#117][np117]

- [ ] Check stopped event fires with correct requestId

  - Open the [event-logger.html](test/fixtures/event-logger.html) file
  - Induce a stop/start in same js 'tick'
  - Check that the stopped event has the correct requestId
  - Issue: [#127][ni127]
  - Fix PR: [#128][np128]

- [ ] Run a local web server (e.g. with `python -m http.server 4000`) serving
      the dist folder, then open [static/popup.html](static/popup.html) in a
      normal tab and check the popup rendering in various states.

- [ ] If the browser is running on android, check that the "popup" browser action
      simply opens settings.

  - Install android-sdk on PC and Firefox on android
  - Enable developer mode on android and enable usb debugging
  - Plug in android to PC via usb
  - `adb devices # make note of device id`
  - `adb shell pm grant org.mozilla.firefox android.permission.READ_EXTERNAL_STORAGE`
  - `adb shell pm grant org.mozilla.firefox android.permission.WRITE_EXTERNAL_STORAGE`
  - Build the extension
  - `yarn web-ext run -s $PWD/dist --target=firefox-android --android-device=WUJ01PNSVY # from adb devices step`
  - Issue: [coil/coilhq#2084][ci2084]
  - Fix PRs: [#166][p166] [#295][p295]

- [ ] On MacOS Chrome check that the monetized animation is working
      on non primary monitors.

  - Issue: [#312][i312]
  - Fix PR: [#317][p317]

- [ ] Check that popup closes when another window is focused

  - Open two Browser windows, open the popup in one window
  - Focus on second window
  - Ensure that popup is closed

  - Issue: [#313][i313]
  - Fix PR: [#332][p332]

- [ ] Check SPA apps keep streaming when url changed, meta stays

  - Go to e.g. https://www.wevolver.com/
  - Change other pages which uses HTML5 history.pushState
  - Check that streaming is maintained throughout

    - if not, use browser devtools to check if meta exists
      - `document.head.querySelector('meta[name="monetization"]')`

  - Issue: [#507][i507]
  - Fix PR: [#508][p508]

- [ ] Check extension doesn't attempt to stream when unsubscribed

  - Log in with coil user that doesn't have active subscription
  - Open the developer tools and check the logging
  - SHOULD NOT even attempt to stream
  - ![image](https://user-images.githubusercontent.com/525211/66631124-c9840000-ec2f-11e9-95a4-3bebe7fdebd6.png)
  - Issue: [#213][i213]
  - Fix PR: [#222][p222]

- [ ] Check can stream immediately after subscribing
  - Likely best to test this with staging where can use a test card
  - Log in with coil user that doesn't have active subscription
  - Add a subscription (can use [testing card](https://stripe.com/docs/testing) 4242 4242 4242 4242 )
  - Go to a monetized page and check that streaming works immediately

### Zipping Extension Source Files

- [ ] Zip the source code for the extension

  - Some web stores will require the submission of source files.
  - So far, zipping the `coil-extension` folder (instead of zipping at the project root)
    has given us the least trouble with passing review.
    - For example, `zip -r coil-extension.zip coil-extension/`
  - `node_modules` should be deleted prior to zipping the source files.

[i33]: https://github.com/coilhq/web-monetization/issues/33
[i120]: https://github.com/coilhq/web-monetization/issues/120
[i144]: https://github.com/coilhq/web-monetization/issues/144
[p166]: https://github.com/coilhq/web-monetization/pull/166
[i213]: https://github.com/coilhq/web-monetization/issues/213
[p222]: https://github.com/coilhq/web-monetization/pull/222
[p295]: https://github.com/coilhq/web-monetization/pull/295
[ci2084]: https://github.com/coilhq/coil/issues/2084
[i312]: https://github.com/coilhq/web-monetization/issues/312
[p317]: https://github.com/coilhq/web-monetization/pull/317
[i313]: https://github.com/coilhq/web-monetization/issues/313
[p332]: https://github.com/coilhq/web-monetization/pull/332
[i507]: https://github.com/coilhq/web-monetization/issues/507
[p508]: https://github.com/coilhq/web-monetization/pull/508
[np28]: https://github.com/coilhq/web-monetization-projects/pull/28
[ni21]: https://github.com/coilhq/web-monetization-projects/issue/21
[ni63]: https://github.com/coilhq/web-monetization-projects/issue/63
[np69]: https://github.com/coilhq/web-monetization-projects/pull/69
[ni105]: https://github.com/coilhq/web-monetization-projects/issue/105
[np117]: https://github.com/coilhq/web-monetization-projects/pull/117
[ni127]: https://github.com/coilhq/web-monetization-projects/issue/127
[np128]: https://github.com/coilhq/web-monetization-projects/pull/128
