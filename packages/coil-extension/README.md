# Coil Extension

> Extension to Web-Monetize youtube creators and other sites

# Build Steps

## Requirements

- NodeJS 10 or higher

## Basic Instructions

The default build script packages the extension for use in Google Chrome.
To do so, run the following script:
`./package.sh`
This script compiles the source via webpack and packages the `dist/` into a single archive - `coil_extension.zip`.

### Building for other browsers

To package the extension for other browsers (i.e. Firefox), simply append the name of the browser after the shell command.
For instance, to package for Firefox:

```
./package.sh firefox
```

The following browser aliases may be used:

- `chrome`
- `firefox`

### Development Workflow

See the repo root [readme](../../README.md) section for info how to speed up
webpack by skipping type checking, for quick iterating.

### Developing with live reload of extension

```
LIVE_RELOAD=true yarn build-prod -- chrome --watch
```

### Building for other environments

During development, the extension can be built for various environments using yarn scripts.
To do this, the following commands can be used:

```
yarn build #development
yarn build-staging #staging
yarn build-prod #production
```

By default, these scripts build the extension for Google Chrome.
To build for a different browser, append the parameter as per the examples below:

```
yarn build -- firefox
yarn build-prod -- firefox
```

The browsers available to build to are the same as those described in the previous section.

### Tests

Currently very light on tests. See the [tests](test) folder

### Release checklist

See [release-checklist](./docs/release-checklist.md)

### Zipping Source Code

Some web stores require the submission of source code when uploading a new extension version.
Guidelines for the submission can be found in the [release-checklist](./docs/release-checklist.md#zipping-extension-source-files).
