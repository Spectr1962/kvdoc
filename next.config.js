import withPWAPlugin from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    experimental: {
        turbo: {
            resolveAlias: {
                "~/*": "./src/*",
            },
        },
    },
};

const pwaOptions = {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
};

const withPWA = withPWAPlugin(pwaOptions);

export default withPWA(nextConfig);
