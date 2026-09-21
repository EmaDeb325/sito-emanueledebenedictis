// Notifica su Telegram a ogni richiesta ricevuta dal modulo di /parliamone.
//
// Netlify esegue da sola questa funzione quando registra una richiesta: il nome del file
// (submission-created) e' cio' che la lega all'evento, non va cambiato.
//
// Servono due variabili d'ambiente, da impostare nel pannello Netlify
// (Project configuration > Environment variables). Non vivono nel codice:
//   TELEGRAM_BOT_TOKEN  il token che rilascia BotFather quando crei il bot
//   TELEGRAM_CHAT_ID    l'identificativo della chat dove ricevere i messaggi
//
// Se le variabili mancano, la funzione non fa nulla e lo scrive nel registro: la richiesta
// resta comunque salvata nel pannello Forms, non si perde niente.

const ETICHETTE = {
  nome: 'Nome',
  azienda: 'Azienda',
  email: 'Email',
  telefono: 'Telefono',
  attivita: 'Di cosa si occupa',
  'chi-porta-i-clienti': 'Chi porta i clienti oggi',
  'obiettivo-90-giorni': 'Cosa vuole far funzionare senza di lui',
};

// Telegram interrompe il messaggio oltre i 4096 caratteri: teniamo un margine.
const LIMITE = 3800;

const conEscape = (testo) =>
  String(testo ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export default async (req) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chat) {
    console.log('Telegram non configurato: manca TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID.');
    return new Response('Telegram non configurato', { status: 200 });
  }

  let dati = {};
  try {
    const corpo = await req.json();
    dati = corpo?.payload?.data ?? {};
  } catch (errore) {
    console.error('Richiesta non leggibile:', errore);
    return new Response('Richiesta non leggibile', { status: 200 });
  }

  const righe = ['<b>Nuova richiesta dal sito</b>', ''];

  for (const [campo, etichetta] of Object.entries(ETICHETTE)) {
    const valore = dati[campo];
    if (valore) righe.push(`<b>${etichetta}:</b> ${conEscape(valore)}`);
  }

  // Qualsiasi campo aggiunto in futuro al modulo finisce comunque nel messaggio.
  for (const [campo, valore] of Object.entries(dati)) {
    if (!(campo in ETICHETTE) && campo !== 'bot-field' && valore) {
      righe.push(`<b>${conEscape(campo)}:</b> ${conEscape(valore)}`);
    }
  }

  let testo = righe.join('\n');
  if (testo.length > LIMITE) testo = `${testo.slice(0, LIMITE)}\n\n[messaggio troncato]`;

  try {
    const risposta = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat,
        text: testo,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!risposta.ok) {
      console.error('Telegram ha rifiutato il messaggio:', risposta.status, await risposta.text());
    }
  } catch (errore) {
    console.error('Invio a Telegram fallito:', errore);
  }

  // Si risponde sempre 200: un problema di notifica non deve far fallire la richiesta,
  // che resta salvata nel pannello Forms.
  return new Response('ok', { status: 200 });
};
