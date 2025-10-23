import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { every } from 'hono/combine';
import { createMiddleware } from 'hono/factory';
import { UsersDrizzleRepository } from '@/features/users/repository/users.repository.drizzle';

const isAuthenticated = createMiddleware(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('clerkUserId', auth.userId);
  await next();
});

const fetchUser = createMiddleware(async (c, next) => {
  const clerkClient = c.get('clerk');
  const userId = c.get('clerkUserId');

  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    // biome-ignore lint/style/noNonNullAssertion: <All users should have email addresses>
    const primaryEmail = clerkUser.emailAddresses[0]!.emailAddress;

    const usersRepository = new UsersDrizzleRepository();
    // biome-ignore lint/style/noNonNullAssertion: <User should exist at this point>
    const user = await usersRepository.getUserByEmail(primaryEmail)!;

    c.set('userId', user?.id);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Unauthorized' }, 401);
  }

  await next();
});

export const clerkAuth = every(clerkMiddleware(), isAuthenticated, fetchUser);
