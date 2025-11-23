import z from 'zod';

export const concertCreateSchema = z.object({
  artist: z.string(),
  date: z.string(),
  location: z.string(),
  notes: z
    .string()
    .optional()
    .transform((val) => val ?? null),
  venue: z
    .string()
    .optional()
    .transform((val) => val ?? null),
});

export const concertUpdateSchema = z.object({
  ...concertCreateSchema.shape,
  id: z.number(),
});
