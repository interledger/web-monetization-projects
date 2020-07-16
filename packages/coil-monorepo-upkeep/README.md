# Coil Monorepo Upkeep

### Commands

- yarn upkeep
- yarn upkeep:new-package
- yarn upkeep:check-updates

### yarn upkeep

This ensures the package configuration follows a convention by scripting the updates
of various files like:

- jest.config.js
- tsconfig.build.json
- package.json
  - various `scripts` such as
    - yarn build:ts
    - yarn format
    - etc
- etc
