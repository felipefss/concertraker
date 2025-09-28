import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEON_PROJECT_ID: z.string(),
  NEON_API_KEY: z.string(),
  DATABASE_URL: z.url(),
});

const _env = envSchema.safeParse(Bun.env);

if (!_env.success) {
  console.error(z.treeifyError(_env.error));
  throw new Error('Invalid environment variables');
}

console.log('db ul', _env.data.DATABASE_URL);

export const env = _env.data;
