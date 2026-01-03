import type z from 'zod';
import type { concertCreateSchema } from './concerts.schema';

export type CreateConcertPayload = z.infer<typeof concertCreateSchema>;
export type EmptyObject = Record<string, never>;
