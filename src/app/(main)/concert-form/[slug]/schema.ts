import { z } from 'zod';

export const concertSchema = z.object({
  id: z.string().uuid().optional(),
  artist: z.string(),
  location: z.string(),
  venue: z.string(),
  year: z
    .string()
    .length(4, 'Please provide a 4-digit year')
    .transform((yearStr) => new Date(`${yearStr}-01-01`).toISOString()),
  notes: z
    .string()
    .optional()
    .transform((notesStr) => notesStr ?? null),
});

export type FormModel = z.infer<typeof concertSchema>;
