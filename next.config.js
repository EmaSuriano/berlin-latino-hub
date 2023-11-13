/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remove restriction of unsplash once we have our own uploader
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

module.exports = nextConfig;
