# GFED Medusa Storefront Account Library

This package contains all account related components, types, and other resources shared across the GFED Medusa Storefront ecosystem.
It is primarily consumed by the `mf-account`, but can also be used by other frontend MFEs.

## Installation

Install the package from npm:

```bash
pnpm add @gfed-medusa/sf-lib-account
```

For monorepo or local development, you can use the workspace directive to ensure installation of the latest version locally:

```json
{
  "dependencies": {
    "@gfed-medusa/sf-lib-account": "workspace:*"
  }
}
```

## Usage

Import components and other resources into your application:

```tsx
import { AccountInfo } from '@gfed-medusa/sf-lib-account/components/account-info';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-account/lib/data/customer';
```

## Codegen

To generate GraphQL types, ensure that `BFF_URL` is defined in your `.env` file and then run:

```bash
pnpm codegen
```
