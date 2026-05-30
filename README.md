# Sito personale — emanueledebenedictis.com

Sito statico (una pagina) di Emanuele De Benedictis, consulente marketing & offerte.

## Come è fatto
- `index.html` → **tutto il sito** (testi, stile e animazioni sono qui dentro)
- `netlify.toml` → configurazione di pubblicazione su Netlify
- `.gitignore` → file da non caricare online

Nessuna "build": è HTML puro, si pubblica così com'è.

## Come modificare i testi
Apri `index.html` e cerca la sezione che vuoi cambiare (sono commentate: HERO, CHI SONO, SERVIZI, ecc.).
Per cambiare i **colori**, modifica il blocco `:root` in alto nel `<style>`.

## Come pubblicare un aggiornamento (deploy automatico)
Una volta collegato GitHub a Netlify, ogni modifica va online così:

```bash
git add .
git commit -m "Descrizione della modifica"
git push
```

Netlify se ne accorge da solo e ripubblica il sito in ~1 minuto.

## Dominio
`emanueledebenedictis.com` — collegato tramite le impostazioni dominio di Netlify.
