import type { MetadataRoute } from 'next';

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
  };
}
