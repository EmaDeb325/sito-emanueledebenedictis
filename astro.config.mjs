import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pagine fuori mappa: casi, macchine e idee hanno contenuti ancora in bozza
// (non ancora riletti dal committente) e grazie e' la conferma dopo l'invio
// del modulo. Restano nel progetto, pronte a rientrare in mappa quando ci
// sara' materiale pubblicato.
const fuoriMappa = ['/casi', '/macchine', '/idee', '/grazie'];

export default defineConfig({
  site: 'https://emanueledebenedictis.com',
  integrations: [
    sitemap({
      filter: (pagina) => !fuoriMappa.some((tratto) => pagina.includes(tratto)),
    }),
  ],
});
