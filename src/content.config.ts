import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Each tour is one Markdown file in src/content/tours/.
 * The file name becomes the URL: sundarbans-2-days.md -> /tours/sundarbans-2-days
 */
const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['City Tour', 'Day Trip', 'Weekend Trip']),
    price: z.number(), // per person, INR
    duration: z.string(),
    location: z.string(),
    distance: z.string().optional(), // from Kolkata
    groupSize: z.string().optional(),
    image: z.string().optional(), // path under /public, e.g. /images/sundarbans.jpg
    highlights: z.array(z.string()).default([]),
    includes: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100), // lower shows first
  }),
});

export const collections = { tours };
