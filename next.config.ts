import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                port: "8000",
                protocol: "http",
                hostname: "localhost",
                pathname: "/uploads/**",
            },
        ],
    },
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
