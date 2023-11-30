/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://api.example.com/:path*',
          },
        ]
      },
  };
