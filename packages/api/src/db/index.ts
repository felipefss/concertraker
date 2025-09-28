import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!Bun.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const db = drizzle({ connection: Bun.env.DATABASE_URL, casing: 'snake_case', schema });
