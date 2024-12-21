import { z } from 'zod';

const createBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    iPublished: z.boolean().default(true),
  }),
});
const updateBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    content: z.string({ required_error: 'Content is required' }).optional(),
    iPublished: z.boolean().default(true).optional(),
  }),
});

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
