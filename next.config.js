/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable output file tracing to avoid heavy glob scanning during build
  // (this prevents Next from collecting build traces with micromatch)
  outputFileTracing: false,
  // ESLint configuration for builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only enable during build, not development.
    ignoreDuringBuilds: false, // Keep false to catch real errors
  },
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. We keep this false to maintain type safety.
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('undici');
    }
    return config;
  },
}

module.exports = nextConfig
