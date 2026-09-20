# Sito personale · emanueledebenedictis.com

Sito di Emanuele De Benedictis, consulente marketing e offerte per piccole e medie imprese
(brand Bizcom). Generato con **Astro 5**: non è più un unico `index.html`, ogni pagina e ogni
contenuto vive nel proprio file.

## Repository pubblico

Questo repository è **pubblico**. Prima di aggiungere o modificare qualcosa, controlla che non
contenga nomi di clienti, cifre (prezzi, fatturati, budget) o materiale strategico interno. I
casi si raccontano per categoria di attività, mai con il nome dell'azienda.

## Come è fatto

- `src/pages/`: le pagine del sito, una per file (`index.astro`, `metodo.astro`,
  `chi-sono.astro`, `parliamone.astro`, `grazie.astro`), più le cartelle `casi/`, `macchine/` e
  `idee/`, ognuna con un indice e una pagina di dettaglio `[...slug].astro` generata dal
  contenuto.
- `src/layouts/Base.astro`: struttura comune a tutte le pagine (head, header, footer, menu).
- `src/components/`: pezzi riusabili: `Sezione.astro`, le card, l'hero, il flusso contenuti.
- `src/content/`: i contenuti in Markdown, divisi in tre raccolte: `idee/`, `casi/`,
  `macchine/`. Lo schema di ciascuna raccolta, cioè i campi che il frontmatter deve avere, è
  definito in `src/content.config.ts`.
- `src/styles/global.css`: variabili di tema, tipografia e classi comuni (`.card`, `.btn`,
  `.griglia`, `.intro`, `.tenue`, ecc.).
- `public/`: file statici pubblicati tali e quali (immagini, `robots.txt`): ogni file qui
  dentro è raggiungibile all'indirizzo `/nome-file`.
- `netlify.toml`: configurazione di pubblicazione, comando di build e header di sicurezza.

## Come aggiungere un contenuto

1. Crea un file Markdown nella cartella giusta: `src/content/idee/`, `src/content/casi/` o
   `src/content/macchine/`. Il nome del file diventa l'indirizzo della pagina (esempio:
   `src/content/idee/nome-idea.md` diventa `/idee/nome-idea`).
2. Scrivi il frontmatter con i campi richiesti dallo schema di quella raccolta (vedi
   `src/content.config.ts`): titolo o nome, testi descrittivi, eventuali link a video,
   `ordine` per la posizione nell'elenco.
3. Lascia `draft: true` finché il contenuto non è stato riletto e approvato. Le pagine con
   `draft: true` non compaiono negli elenchi e non generano una pagina di dettaglio.
4. Quando il contenuto è pronto per andare online, cambia `draft: true` in `draft: false` e
   rifai la build.

## Come si pubblica

```bash
npm run build
```

genera il sito statico nella cartella `dist/` (esclusa dal repository: la crea Netlify a ogni
pubblicazione). In locale, `npm run dev` avvia il sito su `http://localhost:4321` con
ricaricamento automatico; `npm run preview` serve la build già generata; `npm run check`
controlla i tipi.

Per pubblicare un aggiornamento:

```bash
git add .
git commit -m "Descrizione della modifica"
git push
```

Netlify è collegato al repository: rileva il push, esegue `npm run build` (comando e cartella
sono in `netlify.toml`) e pubblica il contenuto di `dist/` in circa un minuto. Non serve
caricare nulla a mano.

## Dominio

`emanueledebenedictis.com`, collegato tramite le impostazioni dominio di Netlify.
