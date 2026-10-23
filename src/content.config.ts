import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Product privacy policies: src/content/privacy/<app-slug>.md */
const privacy = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/privacy' }),
  schema: z.object({
    app: z.string(),
    effective: z.coerce.date(),
    summary: z.string(),
  }),
});

/** Product news and release notes: src/content/updates/<yyyy-mm-dd>-<slug>.md */
const updates = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    app: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { privacy, updates };
