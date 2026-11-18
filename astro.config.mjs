// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO: set this to your real domain once you have one (used for SEO/canonical URLs).
  site: 'https://localtours.pages.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
