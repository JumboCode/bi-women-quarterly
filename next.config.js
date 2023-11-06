/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const nextConfig = {
    webpack: config => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false,
            http2: false,
            dns: false,
            child_process: false
        };

        return config;
    },
    reactStrictMode: true
};

module.exports = nextConfig;
