# Coil Oauth Scripts (working title)

> Scripts for sites that use 'Sign in with Coil'

This package contains scripts that can be embedded on third party sites who use
Coil's OAuth. For example a ready-made 'Sign in with Coil' button, a script to
enable web monetization for pages that use coil OAuth, or Coil social buttons
would all be in the scope of this package.

## Web Monetization Polyfill for Sign in with Coil (needs a better name)

```html
<html>
  <head>
    ...
    <!-- the code in this head tag is what would be copied into cinnamon -->
    <script>
      if (document.monetization) {
        document.monetizationExtensionInstalled = true
      } else {
        document.monetization = document.createElement('div')
        document.monetization.state = 'stopped'
      }
    </script>
    <!-- working title -->
    <script src="https://cdn.coil.com/coil-oauth-wm.js" defer></script>
  </head>
  <body>
    ...
    <script>
      // this would get called from somewhere once the btp token is ready
      document.coilMonetizationPolyfill.init({ btpToken: 'ey....' })
    </script>
  </body>
</html>
```

## Updating BTP Token

```bash
# Substitute correct values
export COIL_USER="*****"
export COIL_PASSWORD="*****"
yarn get-btp-token
```

## Testing Script

```bash
yarn build
python -m http.server 4000
# open in an icognito window (extension disabled) http://localhost:4000/examples
```
