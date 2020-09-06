# Safari

Make sure you've updated the code signing team and using a unique, properly
namespaced bundle identifier.

### Build safari project after webpack

```
export AFTER_EMIT_SHELL_CMD="./scripts/build-safari.sh"
yarn dev-chrome-prod
```
