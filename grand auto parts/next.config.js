/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  cleanDistDir: true,
  optimizeFonts: true,
  skipMiddlewareUrlNormalize: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["techlabs.us-southeast-1.linodeobjects.com"],
  },
};

module.exports = nextConfig;
