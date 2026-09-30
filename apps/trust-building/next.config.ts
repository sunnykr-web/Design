import type { NextConfig } from 'next';

// STATIC_EXPORT=1 builds a plain static site into out/ (used for shareable previews).
const staticExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
