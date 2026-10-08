import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server's own name is localhost; browsers on 127.0.0.1 must still
  // be allowed to load the dev client, or clicks never hydrate.
  allowedDevOrigins: ["127.0.0.1", "**.trycloudflare.com"],
};

export default nextConfig;
