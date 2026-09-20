import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://emanueledebenedictis.com',
  integrations: [sitemap()],
});
