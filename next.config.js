/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['jsdom', '@mozilla/readability'],
  },
};

module.exports = nextConfig;
