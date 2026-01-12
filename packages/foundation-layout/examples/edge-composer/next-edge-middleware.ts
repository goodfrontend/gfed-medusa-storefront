import { NextRequest, NextResponse } from 'next/server';

// Example Next.js Edge middleware that composes a server-rendered layout
// fetched from a CDN and an internal MFE fragment.

export const config = {
  matcher: '/:path*',
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Fetch the MFE fragment from the origin app route (this depends on your setup).
  // Here we call the app server directly; adjust the host/origin as needed.
  const origin = req.headers.get('x-forwarded-host') || req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  const mfeUrl = `${protocol}://${origin}${url.pathname}${url.search}`;
  const mfeResp = await fetch(mfeUrl, {
    headers: { cookie: req.headers.get('cookie') || '' },
  });
  const mfeHtml = await mfeResp.text();

  // Fetch a server-rendered layout HTML from the CDN (layout publishes a render endpoint)
  // This approach avoids attempting to import remote ESM inside Next middleware.
  const layoutRenderUrl = `https://cdn.example.com/foundation-layout/latest/render?path=${encodeURIComponent(url.pathname)}`;
  const layoutResp = await fetch(layoutRenderUrl, {
    headers: { 'x-forwarded-host': origin },
  });
  if (!layoutResp.ok) {
    // If layout render fails, pass through original response
    return NextResponse.next();
  }

  const layoutHtml = await layoutResp.text();

  // Compose by replacing the placeholder main container
  const composed = layoutHtml.replace(
    /<main id="mfe-content">[\s\S]*?<\/main>/i,
    `<main id="mfe-content">${mfeHtml}</main>`
  );

  return new Response(composed, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
