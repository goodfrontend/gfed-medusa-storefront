/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  assetPrefix: '/products-assets',
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  serverExternalPackages: ['jsdom', 'canvas', 'isomorphic-dompurify'],
  experimental: {
    serverActions: {
      ...(process.env.NODE_ENV === 'production' ? {
        allowedOrigins: ["justgood.win"]
        } : {
        allowedOrigins: ["localhost:3024"]
                })
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:countryCode/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, max-age=2400, stale-while-revalidate=1800',
          },
        ],
      },
      {
        // Static files
        source: '/:assetsPath/_next/static/:path*',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
