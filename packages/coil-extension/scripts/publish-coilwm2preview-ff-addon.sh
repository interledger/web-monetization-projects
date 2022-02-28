#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

export WEXT_MANIFEST_SUFFIX_NO_DATE=true
export WEXT_MANIFEST_SUFFIX=WM2Preview
export WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID="coilwm2previewfirefoxextension@niq.coil.com.xpi"
NODE_ENV=production yarn build-prod firefox
echo "run shipit firefox dist"
