import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwind()],
  },
});
