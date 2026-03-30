import type { MetadataRoute } from 'next';

import { getBaseURL } from '@gfed-medusa/sf-lib-common/lib/utils/env';

const disallowedPaths = [
  '/account',
  '/checkout',
  '/cart',
  '/order',
  '/*/account',
  '/*/checkout',
  '/*/cart',
  '/*/order',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${getBaseURL()}/sitemap.xml`,
  };
}
