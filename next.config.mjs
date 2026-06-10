const toConvexUrl = value => {
  const trimmed = value?.trim()

  if (!trimmed) {
    return undefined
  }

  if (/^https?:\/\//.test(trimmed)) {
    return trimmed.replace(/\/+$/, "")
  }

  const deployment = trimmed
    .replace(/^[^:]+:/, "")
    .replace(/\.convex\.cloud$/, "")

  return deployment ? `https://${deployment}.convex.cloud` : undefined
}

/** @type {import('next').NextConfig} */
const convexUrl =
  toConvexUrl(process.env.NEXT_PUBLIC_CONVEX_URL) ||
  toConvexUrl(process.env.CONVEX_DEPLOYMENT)

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
