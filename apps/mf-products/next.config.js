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
        allowedOrigins: ["localhost:3024", "localhost:8080"]
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
};

export default nextConfig;
