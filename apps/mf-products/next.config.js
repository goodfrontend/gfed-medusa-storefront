const checkEnvVariables = require('./check-env-variables');

if (process.env.npm_lifecycle_event === 'build') {
  checkEnvVariables();
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '/p',
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['jsdom', 'canvas', 'isomorphic-dompurify'],
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

module.exports = nextConfig;
