# GFED Medusa Storefront

This is a Turborepo monorepo containing the GFED Medusa storefront source code. This monorepo uses `pnpm` package manager.

## Pre-requisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (v20+)
- [pnpm](https://pnpm.io/installation)

## What's inside?

This monorepo includes the following packages/apps:

### Apps

- `@apps/mf-home`: a [Next.js](https://nextjs.org/) app containing the storefront's content pages
- `@apps/mf-products`: a [Next.js](https://nextjs.org/) app containing the storefront's product detail pages and listing pages
- `@apps/mf-account`: a [Next.js](https://nextjs.org/) app containing the storefront's account and user pages
- `@apps/mf-checkout`: a [Next.js](https://nextjs.org/) app containing the storefront's basket and checkout pages
- `@apps/storybook`: a Storybook application for documenting and testing components
- `@apps/sanity-studio`: a Sanity Studio instance for managing content in the GFED Medusa Storefront

### Packages

- `@gfed-medusa/lib-ui`: a React `shadcn` component library shared by all microfrontend applications
- `@gfed-medusa/lib-common`: a Next.js library containing components and common resources shared by all microfrontend applications
- `@gfed-medusa/lib-home`: a Next.js component library for `@apps/mf-home`
- `@gfed-medusa/lib-products`: a Next.js component library for `@apps/mf-products`
- `@gfed-medusa/lib-account`: a Next.js component library for `@apps/mf-account`
- `@gfed-medusa/lib-checkout`: a Next.js component library for `@apps/mf-checkout`
- `@packages/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@packages/jest-config`: `prettier` configurations used throughout the monorepo
- `@packages/prettier-config`: `prettier` configurations used throughout the monorepo
- `@packages/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```zsh
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```zsh
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=@apps/mf-home

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
pnpm exec turbo build --filter=@apps/mf-home
```

### Develop

To develop all apps and packages, run the following command:

```zsh
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```zsh
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=@apps/mf-home

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
pnpm exec turbo dev --filter=@apps/mf-home
```
