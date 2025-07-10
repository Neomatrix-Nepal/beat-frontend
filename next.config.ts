/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc','images.unsplash.com','localhost',],
     
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
 
