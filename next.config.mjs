import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns replaces the deprecated `domains` option.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    // Cache optimized images on Vercel's CDN for 30 days so the image
    // optimizer rarely re-fetches the originals from Firebase Storage. This
    // cuts Firebase egress (the main remaining quota drain). Safe here because
    // every uploaded photo gets a unique URL (Date.now() + token), so a long
    // cache never serves a stale image.
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      // The portfolio is now the home page (/); keep old links working.
      { source: '/portfolio', destination: '/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
