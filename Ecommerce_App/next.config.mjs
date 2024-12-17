/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["clothing-images-ecom.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/.*/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;