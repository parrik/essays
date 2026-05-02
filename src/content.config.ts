import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    // Optional override for the series-header label on the homepage
    // when this essay is the parent of a series. Lets each part have
    // its own claim-shaped title (Part I, II, III...) while the
    // series itself keeps a different umbrella name. Falls back to
    // `title` if unset.
    seriesName: z.string().optional(),
    subtitle: z.string().optional(),
    // Felt-anchored relief-line in the user's voice — body or felt-state,
    // parallel two-clause cadence. Used as the homepage subtitle and shown
    // alongside the technical subtitle at the top of the essay page. Gives
    // the reader a place to come up for air in the listing surface.
    relief: z.string().optional(),
    kicker: z.string().optional(),
    tag: z.enum(['essay', 'poster', 'short']).optional(),
    description: z.string().optional(),
    pdfUrl: z.string().optional(),
    order: z.number().optional(),
    // If set, this essay belongs to a sibling track (e.g. "out-of-band")
    // and is excluded from the main homepage; surfaces on its own index.
    track: z.string().optional(),
    // If set, this essay is a continuation of another (e.g. Part II) and
    // gets hidden from the top-level homepage list. Linked from the parent
    // essay instead. Value is the parent essay's id/slug.
    parent: z.string().optional(),
    // Freshness metadata — enables "last tended" signals without chrome.
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['seedling', 'tending', 'evergreen']).optional(),
    confidence: z.enum(['speculative', 'likely', 'certain', 'log']).optional(),
    // Optional list of playable etudes that translate the essay's claim into
    // something the reader can do, not just read. Renders as a picker card
    // under the subtitle. `etudesPrompt` is the reader-facing call to action.
    etudesPrompt: z.string().optional(),
    etudes: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          note: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { essays };
