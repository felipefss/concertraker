import z from 'zod';

export const userCreateSchema = z.object({
  data: z.object({
    first_name: z.string(),
    id: z.string(),
    image_url: z.url().optional(),
    last_name: z.string(),
  }),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
