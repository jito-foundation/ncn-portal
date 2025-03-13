import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirect root to /docs, can remove if a landing page is added
      {
        source: '/',
        destination: '/docs',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
