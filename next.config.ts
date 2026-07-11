import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs"],
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
