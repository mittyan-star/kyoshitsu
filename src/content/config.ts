import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string(),
    registrationUrl: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
  events,
};
