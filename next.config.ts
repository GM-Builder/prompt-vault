import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack resolves the workspace root to this project
    root: path.resolve(__dirname),
  } as any,
};

export default nextConfig;
