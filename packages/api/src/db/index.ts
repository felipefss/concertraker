import { drizzle } from 'drizzle-orm/neon-http';

if (!Bun.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const db = drizzle({connection:Bun.env.DATABASE_URL, casing: 'snake_case'});
