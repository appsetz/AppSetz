/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable output file tracing to avoid heavy glob scanning during build
  // (this prevents Next from collecting build traces with micromatch)
  outputFileTracing: false,
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
