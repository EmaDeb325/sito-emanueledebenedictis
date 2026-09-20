import { getCollection, type CollectionEntry } from 'astro:content';

/* Recupero e ordinamento delle raccolte in un posto solo: prima la home e
   le pagine indice ripetevano la stessa filtrata sulle bozze e lo stesso
   ordinamento, con il rischio che divergessero. */

const primi = <T>(elenco: T[], quanti?: number): T[] =>
  typeof quanti === 'number' ? elenco.slice(0, quanti) : elenco;

/** Casi pubblicati, dal primo all'ultimo secondo il campo `ordine`. */
export async function casiPubblicati(quanti?: number): Promise<CollectionEntry<'casi'>[]> {
  const casi = (await getCollection('casi', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.ordine - b.data.ordine,
  );
  return primi(casi, quanti);
}

/** Macchine pubblicate, dalla prima all'ultima secondo il campo `ordine`. */
export async function macchinePubblicate(
  quanti?: number,
): Promise<CollectionEntry<'macchine'>[]> {
  const macchine = (await getCollection('macchine', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.ordine - b.data.ordine,
  );
  return primi(macchine, quanti);
}

/** Idee pubblicate, dalla piu' recente alla piu' vecchia. */
export async function ideePubblicate(quanti?: number): Promise<CollectionEntry<'idee'>[]> {
  const idee = (await getCollection('idee', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.data.valueOf() - a.data.data.valueOf(),
  );
  return primi(idee, quanti);
}
