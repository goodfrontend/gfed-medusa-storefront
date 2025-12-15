# GFED Medusa Storefront Products Library

This library contains products-related components, utilities, types, and data-fetching functions for the GFED Medusa Storefront stack.

## Installation

Install the package from npm:

```bash
pnpm add @gfed-medusa/sf-lib-products
```

For monorepo or local development, use the workspace directive:

```json
{
  "dependencies": {
    "@gfed-medusa/sf-lib-products": "workspace:*"
  }
}
```

## Usage

Import components and resources into your application:

```tsx
import { ProductActions } from '@gfed-medusa/sf-lib-products/components/product-actions';
import { ProductPreview } from '@gfed-medusa/sf-lib-products/components/product-preview';
import { listProducts } from '@gfed-medusa/sf-lib-products/lib/data/products';
```

## Codegen

To generate GraphQL types, ensure that `BFF_URL` is defined in your `.env` file and then run:

```bash
pnpm codegen
```
