/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },

  images: {
    unoptimized: true,
    domains: [
      "infinitecraftebd8f4f246864185ab0814e651a9bdd2133909-dev.s3.us-east-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
