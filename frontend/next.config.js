/** @type {import('next').NextConfig} */
// const nextConfig = {}

const nextConfig = {
  images: {
    // domains: [
    //   "img.freepik.com",
    //   "images.pexels.com",
    //   "raw.githubusercontent.com",
    //   "res.cloudinary.com",
    //   "images.unsplash.com"
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
