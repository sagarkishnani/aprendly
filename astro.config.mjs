import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tinaDirective from './astro-tina-directive/index.mjs';
import { loadEnv } from 'vite';

const env = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), ''), ...process.env };

const base = process.env.DEPLOY_BASE || '/';
const shopEnabled = Boolean(env.WOO_STORE_URL && env.WOO_CONSUMER_KEY && env.WOO_CONSUMER_SECRET);

function includeInSitemap(page) {
  if (page.includes('/admin')) return false;
  if (!shopEnabled && page.includes('/tienda')) return false;
  return true;
}

export default defineConfig({
  site: 'https://aprendlynow.com',
  base,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    mdx(),
    tailwind(),
    react(),
    sitemap({ filter: includeInSitemap }),
    tinaDirective(),
  ],
});
