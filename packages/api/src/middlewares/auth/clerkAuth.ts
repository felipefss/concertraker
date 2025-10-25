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

type Env = {
  Variables: {
    clerkUserId: string;
    userId: number;
  };
};

const fetchUser = createMiddleware<Env>(async (c, next) => {
  const clerkClient = c.get('clerk');
  const clerkUserId = c.get('clerkUserId');

  try {
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    // biome-ignore lint/style/noNonNullAssertion: <All users should have email addresses>
    const primaryEmail = clerkUser.emailAddresses[0]!.emailAddress;

    const usersRepository = new UsersDrizzleRepository();
    const user = await usersRepository.getUserByEmail(primaryEmail);

    if (!user) {
      throw new Error(`User ${clerkUserId} not found`);
    }

    c.set('userId', user.id);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Unauthorized' }, 401);
  }

  await next();
});

export const clerkAuth = every(clerkMiddleware(), isAuthenticated, fetchUser);
