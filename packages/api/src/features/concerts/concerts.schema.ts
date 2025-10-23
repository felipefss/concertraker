import z from 'zod';

export const concertCreateSchema = z.object({
  data: z.object({
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
  }),
});

export type ConcertCreateSchema = z.infer<typeof concertCreateSchema>;
