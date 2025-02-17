/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/docs',
  transpilePackages: ['@workspace/ui', '@bprogress/next'],
};

export default nextConfig;
