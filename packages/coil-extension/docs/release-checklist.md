# Release Checklist

Follow these steps, for both desktop Chrome and Firefox and at least one android build before
releasing, and commit a refinement!

As we currently have little to no automated tests (or even a specification) when you fix
an issue, add a step to the testing checklist for each feature/bug added, with a link to
the issue/PR.

When releasing, we can copy this markdown into the PR for a release.

## Chores

- [ ] Make sure the manifest version was bumped (TODO: versions may be skipped, due to bad builds)

- [ ] Update the [apktool.yml](../six-apktool-decoded/apktool.yml) versionCode/versionName
      and commit it to the repository.

- [ ] Update the [CHANGELOG.md](../CHANGELOG.md)

  - You can compare with latest commit before tagging via something like:
    `https://github.com/coilhq/web-monetization-projects/compare/coil-extension@0.0.56...main`
    (substitute release branch name for "main")

### Zipping Extension Source Files

- [ ] Zip the source code for the extension

  - Some web stores will require the submission of source files.
  - So far, zipping the `coil-extension` folder (instead of zipping at the project root)
    has given us the least trouble with passing review.
    - For example, `zip -r coil-extension.zip coil-extension/`
  - `node_modules` should be deleted prior to zipping the source files.

## $Platform $Browser \$Version

Copy below for each platform/browser/version tested, filtering steps where it
makes sense.

- [ ] Build for prod with release settings

  - e.g. `pnpm build-prod chrome -p --run-prod --devtool=none`
    - as per [package.sh](../package.sh)

- [ ] Import unpacked/temporary extension/add-on

  - For Firefox, go to `about:debugging`
    - Enable add-on debugging
    - Load Temporary Add-on...
  - For Chrome or MS Edge, go to `chrome://extensions` (or `edge://extensions`) and `Load Unpacked`
  - Use `adb` to install Samsung Internet Extensions
    - be sure to kill the browser and delete shared settings to be sure correct addon is tested
    - see code in `scripts/reinstall-six.sh`

- [ ] Ensure that you are [logged in with a user with valid subscription](https://coil.com/settings/membership)

  - ![image](https://user-images.githubusercontent.com/525211/71150879-28d04300-2265-11ea-96da-7d720c101575.png)
    (or trial)

- [ ] [example.com](http://example.com/) should say "Streaming not enabled"

  - ![image](https://user-images.githubusercontent.com/525211/154630950-e179eb7c-cf62-4a8c-b1b5-aa033f1ff57f.png)

- [ ] [xrptipbot.com](https://www.xrptipbot.com/) should monetize

  - ![image](https://user-images.githubusercontent.com/525211/154631133-1be5f080-858f-4984-9548-1b5b405471b7.png)

-
- [ ] [twitch.tv](https://twitch.tv/vinesauce) works

  - <img width="355" alt="image" src="https://user-images.githubusercontent.com/525211/167336900-740809a6-4134-4f33-8f33-e3d45bd30f25.png">

- [ ] [monetized youtube video](https://www.youtube.com/watch?v=8EKg_rBWZdc)

  - <img width="411" alt="image" src="https://user-images.githubusercontent.com/525211/167337147-6b8c430f-fbcc-4a34-ac42-550cb56b0632.png">

- Coil welcome and welcome to explore pages

  - [ ] Go to coil.com, the browser action popup should show "Welcome, $username"
    - <img width="336" alt="image" src="https://user-images.githubusercontent.com/525211/167337854-ba1dcb84-ec9d-434b-8e5e-1bb0b047efbc.png">
  - [ ] Should have a link to coil.com/discover page
  - [ ] Once on discover page should show `Discover Now` with a rocket-ship graphic
    - ![image](https://user-images.githubusercontent.com/525211/126276807-f39ac03f-6c2b-419c-8a79-e2f2859b44a9.png)

- [ ] Check the monetization animation works properly

  - <img width="355" alt="image" src="https://user-images.githubusercontent.com/525211/167338973-a4726572-dca9-4c46-ac67-e5d8457c34f2.png">
  - Only required on desktop browsers
  - Should animate when monetized and packets received
  - Should stop animation when network disconnected
    - Note that on Firefox/MacOS the popup automatically closes when the
      tab loses focus so can use something like this in terminal:
      - `sudo sleep 10 && sudo ifconfig en0 down && sleep 10 && sudo ifconfig en0 up`

- [ ] Check monetization works consistently

  - In the same tab, go to http://www.travisvcrist.com/gatehub
    - refresh and make sure streaming works 10 times in a row
      - should not get 'stuck' in 'setting up payment' state
  - Issue: [coil/coilhq#3038][ci3038]
  - Fix PRs: [#242][np242]

- [ ] Will route to \$coildomain.com/login rather than open popup if logged out

  - Log out from \$coildomain.com
  - Check that icon is in 'unavailable' state
    - ![image](https://user-images.githubusercontent.com/525211/126277431-a7ae73a2-14a6-41b4-90f4-69f2b9be6df5.png)
  - Click on browser action
  - Check that routed to login page
    - ![image](https://user-images.githubusercontent.com/525211/126277570-77da3644-9950-465d-bac0-4afbd33a70e4.png)

- [ ] Run the puppeteer [tests](./test.sh) (look at the [circle jobs](../../../.circleci/config.yml))

  - export BROWSER_TYPE='chrome' # or 'firefox'

- [ ] Go to a [youtube video](https://www.youtube.com/watch?v=l1btEwwRePs),
      manually skip to near end of video, and when autoplay of a video from
      another channel starts, check that monetization has stopped.

  - Issues: [#33][i33]
  - PRs: [#213][np213]

- [ ] Go to [xrptipbot.com](https://www.xrptipbot.com/) and as page
      is loading very quickly open the popup.
      It should show "Thank you" even before streaming
      starts. The animation should play when the streaming starts and
      the outlined circle should become solid green in the toolbar icon.
      [#120][i120]

- [ ] Open the [reloading-every-15s.html](http://localhost:4000/reloading-every-15s.html) file:

  - Use a localhost server so WM works (e.g. with `pnpm serve:fixtures`)
  - Open the developer tools console undocked so can view while **PAGE IS BACKGROUNDED**
    - Note the `Reloading page` logging
  - Open the extension background page developer tools and look at the stream logging
  - SHOULD NOT initiate a stream or SPSP request
    [#144][i144]

- [ ] Open the [event-logger.html](../test/fixtures/event-logger.html) file:

  - Use a localhost server so WM works (e.g. with `python -m http.server 4000`)
  - Look for unusual timings, check that pending state is emitted nearly
    immediately after page load or meta tag added
  - Issue: [#63][ni63]
  - Fix PR: [#69][np69]

- [ ] Check started event fires when quickly switching between tabs

  - Open the [event-logger.html](../test/fixtures/event-logger.html) file
  - Switch to another (non-monetized) tab. The payments stop. Quickly switch back to the first tab.
  - The payments restart. Make sure there is a monetizationstart event
  - Issue: [#105][ni105]
  - Fix PR: [#117][np117]

- [ ] Check stopped event fires with correct requestId

  - Open the [event-logger.html](../test/fixtures/event-logger.html) file
  - Induce a stop/start in same js 'tick' (tack on #induce to end of url)
  - Check that the stopped event has the correct requestId
  - Issue: [#127][ni127]
  - Fix PR: [#128][np128]

- [ ] Check tip event fires when clicked on in the popup

  - Open the [event-logger.html](../test/fixtures/event-logger.html) file
  - Open the extension popup and click on "Send \$1!" in the tipping tab
  - Check that the tip event occurs

- [ ] Run a local web server (with `pnpm run serve:dist`) serving
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
  - `pnpm web-ext run -s $PWD/dist --target=firefox-android --android-device=WUJ01PNSVY # from adb devices step`
  - Issue: [coil/coilhq#2084][ci2084]
  - Fix PRs: [#166][p166] [#295][p295]

- [ ] On MacOS Chromium browsers (Chrome/Edge) check that the monetized animation is working
      on non primary monitors.

  - Issue: [#312][i312]
  - Fix PR: [#317][p317]

- [ ] Check that popup closes when another window is focused

  - Open two Browser windows, open the popup in one window
  - Focus on second window
  - Ensure that popup is closed

  - Issue: [#313][i313]
  - Fix PR: [#332][p332]

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

- [ ] Check no stop event is fired when logged out

  - Open and console and set `localStorage.WM_DEBUG = true`
  - Go to a web monetized page when logged out
  - Check that no events are logged

  - Issue: [#1947][ni1947]
  - Fix PR: [#1964][np1964]

- [ ] When built for mv3, check that resumeWebMonetization works after killing worker (use chrome://serviceworker-internals)

  - Fix PR: [#3286][np3286]

- [ ] Check that the polyfill is injected properly in incognito tabs

### Iframe testing

1. - [ ] Open a terminal
2. - [ ] Start server (via `pnpm serve:fixtures-iframes` )
3. - [ ] Open http://localhost:4000/top-nested-allowed-iframe.html in browser
4. Open developer tools and look at the structure of the dom

- Use expand recursively feature
  - ![image](https://user-images.githubusercontent.com/525211/76400168-71098800-63b2-11ea-8069-5ee7b8b0707a.png)

5. - [ ] With the console set `localStorage.WM_DEBUG = true`

#### Test 1: basic monetization

1. Load the page
2. - [ ] Look for 4 monetizationpending events and 4 corresponding (same requestId) monetizationstart events logged in the console.

![image](https://user-images.githubusercontent.com/525211/76397844-6a791180-63ae-11ea-8f1c-72ef3a6183fb.png)

#### Test 2: refresh page / turn off / turn on

1. - [ ] [re]load the page
2. - [ ] Open developer tools and turn "off" monetization via editing allow attribute of top level iframes
   - ![image](https://user-images.githubusercontent.com/525211/76398261-28040480-63af-11ea-85cb-396960ced1bb.png)
   - Popup icon (and background page logging) should show no monetization:
     - [ ] ![image](https://user-images.githubusercontent.com/525211/76398281-305c3f80-63af-11ea-857c-6ab6b409daa5.png)
   - Corresponding monetization events should be logged:
     - [ ] ![image](https://user-images.githubusercontent.com/525211/76398873-3999dc00-63b0-11ea-8ee6-7ca45d8b44f0.png)

3. turn "on" monetization via editing allow attribute of top level iframes
   - ![image](https://user-images.githubusercontent.com/525211/76398370-57b30c80-63af-11ea-86a8-133271e46b91.png)
   - [ ] Popup icon (and background page logging) should show monetization
     - ![image](https://user-images.githubusercontent.com/525211/76398417-6d283680-63af-11ea-88e6-c4b0ed5c35f7.png)
   - [ ] Corresponding monetization events should be logged:
     - ![image](https://user-images.githubusercontent.com/525211/76399026-841b5880-63b0-11ea-8b0b-c0ecbff13bee.png)

#### Test 3: refresh page / turn off / background tab / turn on / foreground tab

- As above but while the tab is backgrounded, after turning on each top level iframe a sequence of pending -> stopped events should be fired:
  - [ ] ![image](https://user-images.githubusercontent.com/525211/76399956-1a03b300-63b2-11ea-9b77-671e94a1bf16.png)

#### Test 4: nested

- As per test 2
- Turn off one top level and then turn off the nested frames in top level that is allowed
- [ ] allow _one_ nested iframe and check for indications of monetization

[i33]: https://github.com/coilhq/web-monetization/issues/33
[i120]: https://github.com/coilhq/web-monetization/issues/120
[i144]: https://github.com/coilhq/web-monetization/issues/144
[p166]: https://github.com/coilhq/web-monetization/pull/166
[i213]: https://github.com/coilhq/web-monetization/issues/213
[p222]: https://github.com/coilhq/web-monetization/pull/222
[p295]: https://github.com/coilhq/web-monetization/pull/295
[ci2084]: https://github.com/coilhq/coil/issues/2084
[ci3038]: https://github.com/coilhq/coil/issues/3038
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
[ni184]: https://github.com/coilhq/web-monetization-projects/issue/184
[np185]: https://github.com/coilhq/web-monetization-projects/pull/185
[np213]: https://github.com/coilhq/web-monetization-projects/pull/213
[np242]: https://github.com/coilhq/web-monetization-projects/pull/242
[np1964]: https://github.com/coilhq/web-monetization-projects/pull/1964
[ni1947]: https://github.com/coilhq/web-monetization-projects/issue/1947
[p3286]: https://github.com/coilhq/web-monetization/pull/3286
