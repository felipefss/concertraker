import { defineConfig } from 'drizzle-kit';
import { env } from './env/env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/**/*.sql.ts',
  out: './migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
