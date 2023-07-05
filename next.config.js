/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_API_URL: process.env.NEXT_API_URL || "http://localhost:3000/api",
  },
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
