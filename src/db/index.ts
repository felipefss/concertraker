import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.EXPO_PUBLIC_SUPABASE_DB_URL;

if (!connectionString) {
  throw new Error('EXPO_PUBLIC_SUPABASE_DB_URL is not defined');
}

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { casing: 'snake_case' });
