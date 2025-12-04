import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        category: z.enum(['graphic', 'motion', 'web']),
        videoId: z.string().optional(), // YouTube video ID for motion graphics
        liveUrl: z.string().url().optional(), // URL for live web projects
        tags: z.array(z.string()).default([]),
    }),
});

const blog = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        author: z.string().default('Eddie'),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = { projects, blog };
