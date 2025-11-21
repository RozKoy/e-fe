import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `/be/proxy/:path*`,
            },
        ];
    },
};

export default nextConfig;
