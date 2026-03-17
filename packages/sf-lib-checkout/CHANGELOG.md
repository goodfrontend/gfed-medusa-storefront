# @gfed-medusa/sf-lib-checkout

## 3.2.1

### Patch Changes

- c06e2d6: remove Stripe double click flow by combining session init and review navigation
- 7256e7e: clear cart cookie during place-order redirect to keep confirmation cart state in sync

## 3.2.0

### Minor Changes

- 7471d51: checkout payment/redirect and hydration fixes, and Stripe build env wiring

### Patch Changes

- Updated dependencies [5a0007c]
  - @gfed-medusa/sf-lib-common@3.3.5

## 3.1.2

### Patch Changes

- 2cf94b0: Add --env flag to package build script with tsdown
- Updated dependencies [2cf94b0]
  - @gfed-medusa/sf-lib-common@3.3.4
  - @gfed-medusa/sf-lib-ui@1.2.3

## 3.1.1

### Patch Changes

- e894a49: Resolve cart components flicker

## 3.1.0

### Minor Changes

- 8dc1d6d: stripe payment checkout flow update

### Patch Changes

- Updated dependencies [21dd56b]
- Updated dependencies [8dc1d6d]
  - @gfed-medusa/sf-lib-common@3.2.0

## 3.0.1

### Patch Changes

- f0ca4f7: Separate each application's graphql endpoint to not overwhelm the home service
- Updated dependencies [f0ca4f7]
  - @gfed-medusa/sf-lib-common@3.1.1

## 3.0.0

### Major Changes

- 4a735aa: migrate payment, shipping, and orders queries to bff

### Patch Changes

- Updated dependencies [4a735aa]
  - @gfed-medusa/sf-lib-common@3.0.0

## 2.3.1

### Patch Changes

- e325359: use region query from bff
- Updated dependencies [e325359]
  - @gfed-medusa/sf-lib-common@2.5.0

## 2.3.0

### Minor Changes

- 1a92686: Fix for UI and auth issues

### Patch Changes

- Updated dependencies [1a92686]
  - @gfed-medusa/sf-lib-common@2.4.0

## 2.2.1

### Patch Changes

- 6bc23db: Fix update region not working in horizontal components
- Updated dependencies [6bc23db]
  - @gfed-medusa/sf-lib-common@2.3.1

## 2.2.0

### Minor Changes

- 0f6431e: Fix state issue between host and horizontal components

### Patch Changes

- Updated dependencies [af95df4]
- Updated dependencies [0f6431e]
  - @gfed-medusa/sf-lib-common@2.3.0

## 2.1.1

### Patch Changes

- e495a0d: Separate functions and data in the storefront context
- Updated dependencies [e495a0d]
  - @gfed-medusa/sf-lib-common@2.2.1
  - @gfed-medusa/sf-lib-ui@1.2.1

## 2.1.0

### Minor Changes

- ed898a1: Fix issues with storefront context

### Patch Changes

- Updated dependencies [ed898a1]
  - @gfed-medusa/sf-lib-common@2.2.0
  - @gfed-medusa/sf-lib-ui@1.2.0
