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
  artist: z.string().min(1, { message: 'Artist is required' }),
  date: z
    .string()
    .refine((val) => /^\d{4}(-\d{2}(-\d{2})?)?$/.test(val), {
      message: 'Invalid date format. Use YYYY, YYYY-MM, or YYYY-MM-DD',
    })
    .refine(
      (val) => {
        const date = new Date(val);
        if (Number.isNaN(date.getTime())) return false;
        const year = parseInt(val.split('-')[0], 10);
        return year > 1950;
      },
      { message: 'Date must be after 1950' },
    )
    .refine((val) => new Date(val) < new Date(), {
      message: 'Date must be in the past',
    }),
  location: z.string().min(1, { message: 'Location is required' }),
  notes: z.string(),
  venue: z.string(),
});

export type ConcertFormValues = z.infer<typeof formSchema>;
