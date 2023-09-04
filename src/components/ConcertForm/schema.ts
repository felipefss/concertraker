import { z } from 'zod';

const requiredErrorMessage = { required_error: 'This field is required' };

export const concertSchema = z.object({
  id: z.string().optional(),
  artist: z.string(requiredErrorMessage),
  location: z.string(requiredErrorMessage),
  venue: z.string(requiredErrorMessage),
  date: z
    .string(requiredErrorMessage)
    .length(4, 'Please provide a 4-digit year')
    .transform((yearStr) => new Date(`${yearStr}-01-01`).toISOString()),
  notes: z
    .string()
    .nullish()
    .transform((notesStr) => notesStr ?? null),
});

export type FormModel = z.infer<typeof concertSchema>;
