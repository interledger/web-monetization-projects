# Coil Extension

The Coil Extension is an open-source browser extension that enables [Web Monetization](https://webmonetization.org/). The extension checks each page you visit for a Web Monetization <meta> tag.

When you’re signed in to your Coil account and you visit a web monetized page, the extension streams micropayments from Coil to the payment pointer defined in the tag. Micropayments are streamed for as long as you are active on the page.

If you aren’t signed in to your Coil account, the extension still checks each page for the meta tag, but ignores the requests to stream payments.

# Benefits of an open-source extension

Transparency. Coil takes our users’ privacy very seriously. One way we respect your privacy is by not tracking your browsing history. Similarly, micropayments sent from Coil don’t include personally identifiable information. This means Web Monetized sites can’t track you based on the payments streamed on your behalf. Since our extension is open-source, you can freely inspect the code to confirm we aren’t tracking you or transmitting personally identifiable information. Check out our [Privacy Policy](https://coil.com/privacy) and our [Doubling Down on Privacy](https://coil.com/p/sharafian/Doubling-Down-on-Privacy/cD_ZiwT2J) blog post for additional information.

Providing an open-source extension also means you’re free to contribute to and build off of it.

# Web stores

The Coil Extension is supported on the following browsers and can be installed from their web stores.

- [Chrome and Brave for desktop](https://chrome.google.com/webstore/detail/coil/locbifcbeldmnphbgkdigjmkbfkhbnca)
- [Edge for desktop](https://microsoftedge.microsoft.com/addons/detail/coil/ljionajlbinlfkdnpkloejeoogfgkojm?hl=)
- [Firefox for desktop and mobile](https://addons.mozilla.org/en-US/firefox/addon/coil/?src=search)

Additionally, the Coil Extension is built into [Puma browser](https://www.pumabrowser.com/), which is available through Apple's App Store and Google Play.

# Contribute

## Requirements

NodeJS 14 or higher

## Basic instructions

The default build script packages the extension for use in Google Chrome.
To do so, run the following script:

```
./package.sh
```

This script compiles the source via webpack and packages the `dist/` into a single archive named `coil_extension.zip`.

## Build for other browsers

To package the extension for other browsers (e.g., Firefox), simply append the name of the browser after the shell command.

For example, to package for Firefox:

```
./package.sh firefox
```

The following browser aliases can be used:

- `chrome`
- `firefox`

### Developing with live reload of extension

```
yarn dev-chrome-prod
```

### Logging

Much of the logging is disabled by default for performance reasons.
The following `localStorage` entries control logging.

| Key                               | Component\[s]                   | Notes                                                                    |
| --------------------------------- | ------------------------------- | ------------------------------------------------------------------------ |
| localStorage.debug                | Background Page, Content Script | See [debug](https://github.com/visionmedia/debug#browser-support)        |
| localStorage.WM_DEBUG             | Content Script                  | Set truthy to logs all monetization events except `monetizationprogress` |
| localStorage.WM_DEBUG_PROGRESS    | Content Script                  | Set truthy to log `monetizationprogress` events                          |
| localStorage.COIL_LOGGING_ENABLED | Background Page                 | Set truthy to enable logging                                             |

### Building for other environments

During development, the extension can be built for various environments using yarn scripts. To do this, use the following commands:

```
yarn build #development
yarn build-staging #staging
yarn build-prod #production
```

By default, these scripts build the extension for Google Chrome. To build for a different browser, append the parameter as per the examples below:

```
yarn build -- firefox
yarn build-prod -- firefox
```

The browsers available to build to are the same as those described in the previous section.

### Using the Interledger Testnet

To connect to the [Interledger Testnet](https://interledger.org/setup-wallets.html) you must build the extension to use the testnet's BTP endpoint rather than Coil's:

```shell script
export BTP_ENDPOINT=btp+wss://us1.rafikilabs.com/btp
```

### Tests

Currently very light on tests. See the [tests](test) folder.

### Release checklist

See [release-checklist](./docs/release-checklist.md)

### Zipping Source Code

Some web stores require the submission of source code when uploading a new extension version.
Guidelines for the submission can be found in the [release-checklist](./docs/release-checklist.md#zipping-extension-source-files).
