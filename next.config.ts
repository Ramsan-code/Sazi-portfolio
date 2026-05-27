import type { NextConfig } from "next";

// Loader path from orchids-visual-edits
const loaderPath = require.resolve("orchids-visual-edits/loader.js");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ only allow Cloudinary
      },
    ],
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [loaderPath],
      },
    },
  },
};

export default nextConfig;
