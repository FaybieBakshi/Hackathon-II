/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable server actions if needed
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    allowedDevOrigins: ['172.16.0.2'],
  },
};

export default nextConfig;
