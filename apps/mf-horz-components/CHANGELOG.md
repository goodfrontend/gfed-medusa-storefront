# @gfed-medusa/mf-horz-components

## 1.12.0

### Minor Changes

- b9de764: Removed user id in personalization system

### Patch Changes

- Updated dependencies [b9de764]
  - @gfed-medusa/sf-lib-products@1.12.0
  - @gfed-medusa/sf-lib-common@3.11.0

## 1.11.0

### Minor Changes

- 59b232b: Make jg_device_id cookie be set in server

### Patch Changes

- Updated dependencies [59b232b]
  - @gfed-medusa/sf-lib-common@3.10.0

## 1.10.0

### Minor Changes

- e1d8f3e: Implement full homepage personalization

### Patch Changes

- Updated dependencies [e1d8f3e]
  - @gfed-medusa/sf-lib-products@1.11.0
  - @gfed-medusa/sf-lib-common@3.9.0

## 1.9.1

### Patch Changes

- 3b6308c: Minor refactor based on BFF changes.
- Updated dependencies [3b6308c]
  - @gfed-medusa/sf-lib-products@1.10.1
  - @gfed-medusa/sf-lib-common@3.8.1

## 1.9.0

### Minor Changes

- 479fd52: Content Personalization with AI

### Patch Changes

- Updated dependencies [479fd52]
  - @gfed-medusa/sf-lib-products@1.10.0
  - @gfed-medusa/sf-lib-common@3.8.0

## 1.8.3

### Patch Changes

- 8327e1d: Make updating jg_segment cookie in a single source of truth
- Updated dependencies [8327e1d]
  - @gfed-medusa/sf-lib-products@1.9.5

## 1.8.2

### Patch Changes

- 6d1e0ee: Fix cookie attributes of jg_segment cookie
- Updated dependencies [6d1e0ee]
  - @gfed-medusa/sf-lib-products@1.9.4
  - @gfed-medusa/sf-lib-common@3.7.4

## 1.8.1

### Patch Changes

- f06b662: Fix compat
- Updated dependencies [f06b662]
  - @gfed-medusa/sf-lib-products@1.9.3
  - @gfed-medusa/sf-lib-common@3.7.3

## 1.8.0

### Minor Changes

- 7363f3f: Content personalization implementation

### Patch Changes

- Updated dependencies [7363f3f]
  - @gfed-medusa/sf-lib-common@3.6.0

## 1.7.0

### Minor Changes

- 1fc7fb8: Refactor pdp product price to be SSRd

### Patch Changes

- Updated dependencies [1fc7fb8]
  - @gfed-medusa/sf-lib-products@1.8.0
  - @gfed-medusa/sf-lib-common@3.5.0

## 1.6.0

### Minor Changes

- fad5528: Fresh cart implementation and injection of cart/horz components to cached response
- 0d68c77: improve footer mobile ui display

### Patch Changes

- Updated dependencies [fad5528]
- Updated dependencies [b095935]
  - @gfed-medusa/sf-lib-common@3.4.0
  - @gfed-medusa/sf-lib-ui@1.3.0

## 1.5.5

### Patch Changes

- 97fa7bb: resolove issues in product cards, footer, mobile actions, and checkout fields
- b9cf115: update cart drawer styles for new dialog system
- dd05dbf: resolve "powered by" text not showing in footer
- Updated dependencies [97fa7bb]
  - @gfed-medusa/sf-lib-common@3.3.8
  - @gfed-medusa/sf-lib-ui@1.2.4

## 1.5.4

### Patch Changes

- af3bd3a: Remove @source from global.css of each MFE

## 1.5.3

### Patch Changes

- cf073e6: Storefront rebranding
- a338bca: - Add poweredBy component in search modal
  - Replace text nav with icons when in mobile view
- Updated dependencies [36e87d3]
- Updated dependencies [a338bca]
  - @gfed-medusa/sf-lib-common@3.3.7

## 1.5.2

### Patch Changes

- 063fa36: Add recent/popular search terms in search modal
- Updated dependencies [063fa36]
  - @gfed-medusa/sf-lib-common@3.3.6

## 1.5.1

### Patch Changes

- e28687f: horz components data fetching perf improvements
- Updated dependencies [2cf94b0]
  - @gfed-medusa/sf-lib-common@3.3.4
  - @gfed-medusa/sf-lib-ui@1.2.3

## 1.5.0

### Minor Changes

- 1a07c1b: Implement image kit loader for image optimization

### Patch Changes

- Updated dependencies [1a07c1b]
  - @gfed-medusa/sf-lib-common@3.3.0

## 1.4.7

### Patch Changes

- Implement algolia client-side and apply ssearch optimizations

## 1.4.6

### Patch Changes

- 83800ef: update collections fetching in home and footer
- Updated dependencies [83800ef]
  - @gfed-medusa/sf-lib-common@3.1.3

## 1.4.5

### Patch Changes

- fc8a61c: optimize collections query in home
- Updated dependencies [fc8a61c]
  - @gfed-medusa/sf-lib-common@3.1.2

## 1.4.4

### Patch Changes

- f0ca4f7: Separate each application's graphql endpoint to not overwhelm the home service
- Updated dependencies [f0ca4f7]
  - @gfed-medusa/sf-lib-common@3.1.1

## 1.4.2

### Patch Changes

- 4042626: apply sorting and filtering to collections in home page and footer

## 1.4.1

### Patch Changes

- Check cartState for mini cart popup

## 1.4.0

### Minor Changes

- Added /api/customer to retrieve customer information
- Added a login link on the header instead of an account page link
- fd809eb: remove test content and resolve css issues

### Patch Changes

- Updated dependencies
  - @gfed-medusa/sf-lib-common@3.1.0

## 1.3.2

### Patch Changes

- c294e90: Storefront UI issues
- Updated dependencies [c294e90]
  - @gfed-medusa/sf-lib-common@3.0.1

## 1.3.1

### Patch Changes

- Updated dependencies [4a735aa]
  - @gfed-medusa/sf-lib-common@3.0.0

## 1.3.0

### Minor Changes

- 1a92686: Fix for UI and auth issues

### Patch Changes

- Updated dependencies [1a92686]
  - @gfed-medusa/sf-lib-common@2.4.0

## 1.2.0

### Minor Changes

- 0f6431e: Fix state issue between host and horizontal components

### Patch Changes

- Updated dependencies [af95df4]
- Updated dependencies [0f6431e]
  - @gfed-medusa/sf-lib-common@2.3.0

## 1.1.1

### Patch Changes

- e495a0d: Separate functions and data in the storefront context
- Updated dependencies [e495a0d]
  - @gfed-medusa/sf-lib-common@2.2.1
  - @gfed-medusa/sf-lib-ui@1.2.1

## 1.1.0

### Minor Changes

- ed898a1: Fix issues with storefront context

### Patch Changes

- Updated dependencies [ed898a1]
  - @gfed-medusa/sf-lib-common@2.2.0
  - @gfed-medusa/sf-lib-ui@1.2.0
