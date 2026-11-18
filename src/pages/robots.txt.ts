import type { APIRoute } from 'astro';

// Allows all search engines and points them to the sitemap: /robots.txt
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
