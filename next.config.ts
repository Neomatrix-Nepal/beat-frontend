/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      'localhost',
      'beats.neomatrix.live', // 👈 Add this line
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
