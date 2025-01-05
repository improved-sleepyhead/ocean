/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "files.edgestore.dev"
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
