import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const comuni = {
  draft: z.boolean().default(true),
  ordine: z.number().default(99),
};

const idee = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/idee' }),
  schema: z.object({
    titolo: z.string(),
    sommario: z.string(),
    data: z.date(),
    tag: z.array(z.string()).default([]),
    youtube: z.string().url().optional(),
    reel: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    ...comuni,
  }),
});

const casi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casi' }),
  schema: z.object({
    categoria: z.string(),
    situazione: z.string(),
    costruito: z.string(),
    risultato: z.string(),
    rimasto: z.string(),
    stato: z.enum(['in-corso', 'concluso']),
    ...comuni,
  }),
});

const macchine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/macchine' }),
  schema: z.object({
    nome: z.string(),
    cosaFa: z.string(),
    aChiServe: z.string(),
    video: z.string().url().optional(),
    ...comuni,
  }),
});

export const collections = { idee, casi, macchine };
