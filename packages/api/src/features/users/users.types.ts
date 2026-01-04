import type z from 'zod';
import type { userCreateSchema } from './users.schema';

export type CreateUserPayload = z.infer<typeof userCreateSchema>;
export type EmptyObject = Record<string, never>;
