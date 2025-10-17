import z from 'zod';

export const userCreateSchema = z.object({
  data: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    image_url: z.url().optional(),
  }),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
