import { z } from 'zod';

export type Concert = {
  id: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  notes: string;
};

export const formSchema = z.object({
  artist: z.string().min(1, { error: 'Artist is required' }),
  date: z
    .string()
    .min(4, { error: 'Year format is YYYY' })
    .refine(
      (val) =>
        !Number.isNaN(Number(val)) &&
        Number(val) >= 1900 &&
        Number(val) <= new Date().getFullYear(),
      {
        error: "Something doesn't seem right",
      },
    ),
  location: z.string().min(1, { error: 'Location is required' }),
  notes: z.string(),
  venue: z.string(),
});

export type ConcertFormValues = z.infer<typeof formSchema>;
