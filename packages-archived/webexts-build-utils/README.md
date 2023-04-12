# Web Extensions Build Utils

For some reason you can't actually require anything from this module
using ts-loader with transpileOnly:true if you also require `makeWebpackConfig`
directly via TypeScript.

So do not place utils in here!

It also bundles two shell scripts:

1. [build.sh](./scripts/build.sh)
2. [package.sh](./scripts/package.sh)
