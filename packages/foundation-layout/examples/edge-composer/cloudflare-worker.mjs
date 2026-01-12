// Example Cloudflare Worker edge composer
// Assumptions:
// - The foundation layout is published to a CDN at a URL that can be imported as an ESM module.
// - The MFE fragment is available from an origin endpoint (replace placeholder below).

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Example: fetch the MFE fragment (this could be an internal service or origin)
    const mfeOrigin = 'https://mfe.example.com'; // replace with real MFE origin
    const mfeResp = await fetch(`${mfeOrigin}${url.pathname}${url.search}`);
    const mfeHtml = await mfeResp.text();

    // Import the server-render bundle from the CDN (versioned or /latest)
    // Many edge runtimes (Cloudflare Workers) allow dynamic import of remote ESM URLs.
    const layoutModuleUrl =
      'https://cdn.example.com/foundation-layout/latest/server.mjs';
    const { renderLayout } = await import(layoutModuleUrl);

    // Call renderLayout with a minimal props object. In practice provide nav/user/locale.
    const result = await renderLayout({
      request: { url: request.url },
      locale: 'en',
    });

    // If streaming result provided, convert to text for simple composition.
    let layoutHtml;
    if (typeof result.htmlStream === 'string') {
      layoutHtml = result.htmlStream;
    } else {
      // Build a Response to consume the ReadableStream
      layoutHtml = await new Response(result.htmlStream).text();
    }

    // Compose: insert MFE fragment into <main id="mfe-content"> placeholder.
    const marker = '<main id="mfe-content">';
    let composed;
    if (layoutHtml.includes(marker)) {
      composed = layoutHtml.replace(
        /<main id="mfe-content">[\s\S]*?<\/main>/i,
        `<main id="mfe-content">${mfeHtml}</main>`
      );
    } else {
      // Fallback: append MFE HTML inside body
      composed = layoutHtml.replace('</body>', `${mfeHtml}</body>`);
    }

    const headers = new Headers(result.headers || {});
    headers.set('content-type', 'text/html; charset=utf-8');

    return new Response(composed, { status: result.status || 200, headers });
  },
};
