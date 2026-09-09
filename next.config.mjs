/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.17",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.17:3000",
  ],
  images: {
    formats: ["image/webp"],
    qualities: [70, 75, 80, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/shop/can-jars", destination: "/shop", permanent: true },
      { source: "/shop/glassware", destination: "/shop", permanent: true },
      { source: "/shop/scales", destination: "/shop", permanent: true },
      { source: "/shop/accessories", destination: "/shop", permanent: true },
      { source: "/shop/hookahs", destination: "/shop", permanent: true },
    ];
  },
};

export default nextConfig;
