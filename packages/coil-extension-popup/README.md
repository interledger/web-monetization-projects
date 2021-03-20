# Tipping UI prototype

This repo is for prototyping the new tipping UI, that will live in the extension during the tipping closed beta.

## Developing

The prototype was scaffolded using create react app. You can use the following scripts when developing:

```bash
# Start the dev server at localhost:3000
yarn start

# Build for production
yarn build

# Lint the code with eslint
yarn lint

# Format with prettier
yarn format
```

**Note:** We used `lint-staged` to ensure that code is linted and formatted on commit, so there is no need to manually lint/format.

### Directory structure

All code for the prototype is written in the `src` directory.

The `src/components` directory hosts the code that will be moved over to the extension, except for the code in `src/components/_PrototypeOnly`.

## Deploying

This repo is linked to the [tipping-ui-prototype vercel project](https://vercel.com/coilhq/tipping-ui-prototype). Therefore the prototype will be automatically deployed whenever new code is pushed to a branch.

### Production deployment

The production deployment will be used by others to test the prototype.

- Domain: [tipping-ui-prototype.vercel.app](https://tipping-ui-prototype.vercel.app/)
- Deployment: To update the production deployment, push to the `main` branch.

### Preview deployments

Preview deployments allow developers to test their changes (Or pull requests) in a live environment before merging with `main`.

- Domain: tipping-ui-prototype-git-`branch-name`-coilhq.vercel.app

- Deployment: Push code to any branch with `branch-name`.
