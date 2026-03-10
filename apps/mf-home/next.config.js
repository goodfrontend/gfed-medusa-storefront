/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  assetPrefix: '/home-assets',
  output: 'standalone',
  experimental: {
    serverActions: {
      ...(process.env.NODE_ENV === 'production'
        ? {
            allowedOrigins: ['justgood.win'],
          }
        : {
            allowedOrigins: [
              'localhost:3024',
              'localhost:8080',
              'localhost:8787',
            ],
          }),
    },
  },
  images: {
    loader: 'custom',
    loaderFile: './imagekit-loader.js',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
};

export default nextConfig;
