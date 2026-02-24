import { NextRequest, NextResponse } from 'next/server';

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'us';
const CACHE_TAG_PREFIX = 'mf-products';

type BffRegion = {
  id: string;
  name: string;
  countries: { iso2: string; name: string }[];
};

const regionMapCache = {
  regionMap: new Map<string, BffRegion>(),
  regionMapUpdated: Date.now(),
};

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (!BFF_URL) {
    throw new Error(
      'Middleware.ts: Error fetching regions. Did you set up NEXT_PUBLIC_BFF_URL?'
    );
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const response = await fetch(`${BFF_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{ regions { id name countries { iso2 name } } }`,
      }),
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: 'force-cache',
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    const regions: BffRegion[] = json?.data?.regions ?? [];

    if (!regions.length) {
      throw new Error(
        'No regions found. Please set up regions in your Medusa Admin.'
      );
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso2 ?? '', region);
      });
    });

    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, BffRegion>
) {
  try {
    let countryCode;

    const vercelCountryCode = request.headers
      .get('x-vercel-ip-country')
      ?.toLowerCase();

    const urlCountryCode = request.nextUrl.pathname
      .split('/')[1]
      ?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode;
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode;
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION;
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value;
    }

    return countryCode;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Middleware.ts: Error getting the country code.');
    }
  }
}

export async function middleware(request: NextRequest) {
  let redirectUrl = request.nextUrl.href;

  const requestHeaders = new Headers(request.headers);

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const cacheTags = [
    CACHE_TAG_PREFIX,
    `${CACHE_TAG_PREFIX}:${request.nextUrl.pathname}`,
  ];

  response.headers.set('X-Cache-Tag', cacheTags.join(','));

  const cacheIdCookie = request.cookies.get('_medusa_cache_id');
  const cacheId = cacheIdCookie?.value || crypto.randomUUID();

  const regionMap = await getRegionMap(cacheId);
  const countryCode = regionMap && (await getCountryCode(request, regionMap));

  const urlHasCountryCode =
    countryCode &&
    request.nextUrl.pathname.split('/')[1]?.includes(countryCode);

  if (urlHasCountryCode && cacheIdCookie) {
    return response;
  }

  if (urlHasCountryCode && !cacheIdCookie) {
    response.cookies.set('_medusa_cache_id', cacheId, {
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  if (request.nextUrl.pathname.includes('.')) {
    return response;
  }

  const redirectPath =
    request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname;
  const queryString = request.nextUrl.search ? request.nextUrl.search : '';

  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`;

    response = NextResponse.redirect(`${redirectUrl}`, 307);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)',
  ],
};
