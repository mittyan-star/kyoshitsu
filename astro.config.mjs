import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mittyan-star.github.io/kyoshitsu/',
  base: '/kyoshitsu/',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwind()],
  },
});
