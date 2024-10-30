const { withSentryConfig } = require("@sentry/nextjs");

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const enabled = ENVIRONMENT !== "local";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cleanDistDir: true,
  compress: true,
  optimizeFonts: true,
  swcMinify: true,
  skipMiddlewareUrlNormalize: true,
  compiler: {
    removeConsole: enabled,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    domains: [
      "seekinvest-dev-storage.s3.amazonaws.com",
      "seekinvest-uat-storage.s3.amazonaws.com",
      "seekinvest-prod-storage.s3.amazonaws.com",
      "seekinvest-assests-storage.s3.amazonaws.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-up",
        permanent: false,
      },
    ];
  },
};

// module.exports = nextConfig;

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, {
  org: "seekinvest",
  project: "seekinvest-frontend",
  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true, // Can be used to suppress logs
});
