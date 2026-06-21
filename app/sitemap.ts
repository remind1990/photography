import type { MetadataRoute } from 'next';

const baseUrl = 'https://dubenko-olya-ph.com';

// Native Next.js sitemap. Lists every public route explicitly so it works even
// though pages render dynamically (next-sitemap produced an empty index here).
// Admin routes (/gallery, /auth) are intentionally excluded — they're noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/services/family-photoshoot', priority: 0.8 },
    { path: '/services/individual-portraits', priority: 0.8 },
    { path: '/portfolio', priority: 0.7 },
    { path: '/about', priority: 0.6 },
    { path: '/contacts', priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
