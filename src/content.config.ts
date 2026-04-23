import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    kicker: z.string().optional(),
    tag: z.enum(['essay', 'poster', 'short']).optional(),
    description: z.string().optional(),
    pdfUrl: z.string().optional(),
    order: z.number().optional(),
    // Freshness metadata — enables "last tended" signals without chrome.
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['seedling', 'tending', 'evergreen']).optional(),
    confidence: z.enum(['speculative', 'likely', 'certain', 'log']).optional(),
  }),
});

export const collections = { essays };
