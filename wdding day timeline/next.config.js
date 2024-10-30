//@ts-check
const { v4 } = require('uuid');

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  generateBuildId: v4,
  optimizeFonts: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'd9uuelwafzfdr.cloudfront.net',
      'd1ef44yjeb6boi.cloudfront.net',
      'd19hziy80jx3f0.cloudfront.net',
      'd2qhufg0zx5qpi.cloudfront.net',
      'weddingdaytimelinedev-serverless-storage.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
