/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.pravatar.cc",
      "images.unsplash.com",
      "localhost",
      "beats.neomatrix.live",
      "bsvzmwz3-8000.inc1.devtunnels.ms"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
