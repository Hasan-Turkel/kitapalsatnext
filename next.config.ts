import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Cloudinary alan adını ekliyoruz
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: false, 
};

export default nextConfig;
