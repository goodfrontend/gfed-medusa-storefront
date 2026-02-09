import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CACHE_TAG_PREFIX = 'mf-home';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const cacheTags = [
    CACHE_TAG_PREFIX,
    `${CACHE_TAG_PREFIX}:${request.nextUrl.pathname}`,
  ];

  response.headers.set('Cache-Tag', cacheTags.join(','));

  return response;
}
