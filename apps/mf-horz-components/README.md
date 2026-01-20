# Medusa Storefront Header Microfrontend

This is a specialized microfrontend app designed to provide "True SSR" (SEO-Ready) header fragments.

It consists of:

1.  **Hono Server**: Serves the SSR HTML fragment (`/fragment/header`) and JSON data (`/api/header-data`).
2.  **Vite Client**: Builds a standalone bundle (`header-bundle.js`) that defines a Custom Element `<mfe-header>`.

## Architecture

The host application (e.g., Cloudflare Worker or Next.js middleware) fetches the HTML from this service and injects it into the page response. The client bundle then loads and "takes over" the static HTML, adding interactivity.

## Setup

1.  Install dependencies:

    ```bash
    pnpm install
    ```

2.  Start the development server:
    ```bash
    pnpm dev
    ```
    This starts both the Hono server (port 3001) and the Vite build watcher.

## Endpoints

- `GET http://localhost:3001/fragment/header`: Returns the raw HTML of the header (SSR).
- `GET http://localhost:3001/api/header-data`: Returns the initial state JSON.
- `GET http://localhost:3001/dist/header-bundle.js`: The client-side React bundle.

## Usage in Host App

See the project root documentation or the "SEO-Ready Header" guide for how to configure the Cloudflare Worker/Injector to consume these endpoints.
