/** @type {import('next').NextConfig} */
const configuredConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim()
const convexDeployment = process.env.CONVEX_DEPLOYMENT?.split(":").pop()?.trim()
const convexUrl =
  configuredConvexUrl ||
  (convexDeployment ? `https://${convexDeployment}.convex.cloud` : undefined)

const nextConfig = {
  env: {
    NEXT_PUBLIC_CONVEX_URL: convexUrl
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev"
      }
    ]
  }
}

export default nextConfig
