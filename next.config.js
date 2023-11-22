/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remove restriction of unsplash once we have our own uploader
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" },{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

module.exports = nextConfig;
