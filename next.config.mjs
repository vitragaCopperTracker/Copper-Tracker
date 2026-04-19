// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'copperdjango-production.up.railway.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimize for Vercel deployment
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Handle potential build issues
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint 9 + eslint-config-next 16 produces a circular JSON serialization
    // error during builds. Linting still runs locally via `npm run lint`.
    ignoreDuringBuilds: true,
  },
  // Disable static optimization for dynamic pages
  output: 'standalone',
  // Add output for static export if needed
  trailingSlash: true,
  // Ensure proper handling of API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
