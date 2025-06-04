/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc','images.unsplash.com'],
     
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
 
