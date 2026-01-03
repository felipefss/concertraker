import { clerkClient, getAuth } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';
import logger from '@/lib/logger';
import { UsersDrizzleRepository } from '../../features/users/repository/users.repository.drizzle';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = getAuth(req);

  if (!auth?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.clerkUserId = auth.userId;

  next();
};

export const fetchUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clerkUserId = req.clerkUserId as string;

  try {
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    // biome-ignore lint/style/noNonNullAssertion: <All users should have email addresses>
    const primaryEmail = clerkUser.emailAddresses[0]!.emailAddress;

    const usersRepository = new UsersDrizzleRepository();
    const user = await usersRepository.getUserByEmail(primaryEmail);

    if (!user) {
      logger.error(`User ${clerkUserId} not found`);
      return res.sendStatus(500);
    }

    req.userId = user.id;
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

export const clerkAuth = [isAuthenticated, fetchUser];
