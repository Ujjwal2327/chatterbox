/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*", "localhost", "chatterbox-7n4n.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"lh3.googleusercontent.com"',
      },
      {
        protocol: "https",
        hostname: '"chatterbox-7n4n.onrender.com"',
      },
    ],
  },
};

module.exports = nextConfig;
