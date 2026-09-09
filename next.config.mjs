/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.17",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.17:3000",
  ],
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
