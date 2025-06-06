/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        // Match images from encrypted-tbn0.gstatic.com with any extension
        protocol: 'https', // Explicitly specify protocol for clarity
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        // Match images from e7.pngegg.com with any extension
        protocol: 'https', // Explicitly specify protocol for clarity
        hostname: 'e7.pngegg.com',
      },
      {
        // Match images from e7.pngegg.com with any extension
        protocol: 'https', // Explicitly specify protocol for clarity
        hostname: 'd26m3nkliijtj5.cloudfront.net',
      },
    ],
  }
};
export default nextConfig;
