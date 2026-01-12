# Edge Composer examples

This folder contains two example approaches for composing a server-rendered shared layout (published to a CDN) with an MFE fragment at the edge.

1. `cloudflare-worker.mjs`

- Cloudflare Worker style example that dynamically imports a CDN-hosted ESM server bundle (`server.mjs`) which exports `renderLayout`.
- It fetches an MFE fragment from an origin service and composes the layout HTML by inserting the fragment into `<main id="mfe-content">`.

2. `next-edge-middleware.ts`

- Next.js Edge middleware example that fetches a server-rendered HTML endpoint from the CDN (e.g. `/render`) instead of importing remote ESM.
- This is safer for Next's edge environment; the CDN is responsible for running `renderLayout` and returning ready HTML.

Notes and choices:

- If your edge runtime supports dynamic import from remote URLs (Cloudflare Workers), prefer the `cloudflare-worker.mjs` approach for direct module usage and streaming.
- If your edge runtime (e.g. Next middleware) cannot import remote ESM, publish a small `render` endpoint alongside the bundle that invokes `renderLayout` server-side and returns HTML; the middleware fetches that endpoint and composes.
- For streaming composition, extend the examples to operate on ReadableStreams and pipe fragments into the final stream.

Replace placeholder CDN and MFE URLs with your actual endpoints before using in production.
