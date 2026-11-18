import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Lists every page so search engines can find them: /sitemap.xml
export const GET: APIRoute = async ({ site }) => {
  const tours = await getCollection('tours');
  const paths = ['/', '/tours/', '/about/', '/contact/', ...tours.map((t) => `/tours/${t.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
