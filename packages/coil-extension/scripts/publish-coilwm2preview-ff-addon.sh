#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

echo $PWD
export WEXT_MANIFEST_VERSION="$COIL_DEV_VERSION"
export WEXT_MANIFEST_SUFFIX_NO_DATE=true
export WEXT_MANIFEST_SUFFIX=WM2Preview
export WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID="coilwm2previewfirefoxextension@niq.coil.com.xpi"
NODE_ENV=production yarn build-prod firefox

# See: https://github.com/mozilla/web-ext/issues/1773 re: ETIMEOUT
yarn web-ext sign --timeout 300000 --source-dir dist \
    --api-key $WEXT_SHIPIT_FIREFOX_JWT_ISSUER \
    --api-secret $WEXT_SHIPIT_FIREFOX_JWT_SECRET
