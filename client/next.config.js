/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '"lh3.googleusercontent.com"',
      },
    ],
  },
};

module.exports = nextConfig;
