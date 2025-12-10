# GFED Medusa Storefront Home Library

This is the home library for the GFED Medusa Storefront stack. It contains components, utilities, types, and other resources specific to the home page.

## Installation

Install the package from npm:

```bash
pnpm add @gfed-medusa/sf-lib-home
```

For monorepo or local development, you can use the workspace directive to ensure installation of the latest version locally:

```json
{
  "dependencies": {
    "@gfed-medusa/sf-lib-home": "workspace:*"
  }
}
```

## Usage

Import components and other resources into your application:

```tsx
import { FeaturedProducts } from '@gfed-medusa/sf-lib-home/components/featured-products';
import { Hero } from '@gfed-medusa/sf-lib-home/components/hero';
import { ProductRail } from '@gfed-medusa/sf-lib-home/components/product-rail';
```
