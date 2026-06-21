import type { MetadataRoute } from 'next';

const baseUrl = 'https://dubenko-olya-ph.com';

// Native Next.js robots.txt. Allows crawling, blocks admin/api routes and
// points crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/gallery', '/auth', '/api'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
