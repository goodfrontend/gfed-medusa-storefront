# foundation-layout

This package provides a server-renderable layout (Header, Navigation, Footer) intended to be hosted as a small server ESM bundle on a CDN for edge composition.

Exports

- `renderLayout(props: RenderProps): Promise<RenderResult>` — server API. See `types/index.d.ts` for full contract.

Build

- The package uses `tsup` to emit an ESM server bundle at `dist/server.mjs` and type declarations at `dist/index.d.ts`.

Client assets

- Client-side JS/CSS bundles should be published under `dist/client/` and referenced via `dist/manifest.json`. The edge composer will inject the correct asset URLs returned in `RenderResult.assets`.

Usage (edge composer)

1. Fetch or import the server ESM from the CDN (e.g. `/foundation-layout@<version>/server.mjs`).
2. Call `renderLayout({ locale, navData, user })` to obtain the HTML stream and `assets` list.
3. Compose the layout HTML with the MFE fragment and return a combined streaming response.

CI / publishing

- Publish `dist/` artifacts to a CDN/object storage under both a content-hash path and `/foundation-layout/latest/` for instant rollouts.
