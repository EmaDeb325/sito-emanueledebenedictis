import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://emanueledebenedictis.com',
  integrations: [
    sitemap({
      // /grazie e' la conferma dopo l'invio del modulo: fuori dalla mappa,
      // e con noindex nella pagina stessa.
      filter: (pagina) => !pagina.includes('/grazie'),
    }),
  ],
});
