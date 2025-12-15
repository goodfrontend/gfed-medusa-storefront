# GFED Medusa Storefront Checkout Library

This is the checkout library for the GFED Medusa Storefront stack. It contains components, utilities, types, and other resources specific to the carts, orders, and checkout pages.

## Installation

Install the package from npm:

```bash
pnpm add @gfed-medusa/sf-lib-checkout
```

For monorepo or local development, you can use the workspace directive to ensure installation of the latest version locally:

```json
{
  "dependencies": {
    "@gfed-medusa/sf-lib-checkout": "workspace:*"
  }
}
```

## Usage

Import components, templates, and other resources into your application:

```tsx
import { CartItemSelect } from '@gfed-medusa/sf-lib-checkout/components/cart-item-select';
import { Items } from '@gfed-medusa/sf-lib-checkout/templates/cart/items';
import { repeat } from '@gfed-medusa/sf-lib-home/lib/util/repeat';
```

## Codegen

To generate GraphQL types, ensure that `BFF_URL` is defined in your `.env` file and then run:

```bash
pnpm codegen
```
