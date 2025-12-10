# GFED Medusa Storefront Common Library

This is the common library for the GFED Medusa Storefront stack. It contains shared components, utilities, types, and other resources.

## Installation

Install the package from npm:

```bash
pnpm add @gfed-medusa/sf-lib-common
```

For monorepo or local development, you can use the workspace directive to ensure installation of the latest version locally:

```json
{
  "dependencies": {
    "@gfed-medusa/sf-lib-common": "workspace:*"
  }
}
```

## Usage

Import components and other resources into your application:

```tsx
import { Breadcrumbs } from '@gfed-medusa/sf-lib-common/components/breadcrumbs';
import { useToggleState } from '@gfed-medusa/sf-lib-common/lib/hooks/use-toggle-state';
```

## Codegen

To generate GraphQL types, ensure that `BFF_URL` is defined in your `.env` file and then run:

```bash
pnpm codegen
```
