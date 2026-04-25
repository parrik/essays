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
    // If set, this essay is a continuation of another (e.g. Part II) and
    // gets hidden from the top-level homepage list. Linked from the parent
    // essay instead. Value is the parent essay's id/slug.
    parent: z.string().optional(),
    // Freshness metadata — enables "last tended" signals without chrome.
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['seedling', 'tending', 'evergreen']).optional(),
    confidence: z.enum(['speculative', 'likely', 'certain', 'log']).optional(),
  }),
});

export const collections = { essays };
