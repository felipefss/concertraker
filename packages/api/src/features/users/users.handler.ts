import { createFactory } from 'hono/factory';
import type { UserData } from './repository/users.repository';
import { UsersDrizzleRepository } from './repository/users.repository.drizzle';

const factory = createFactory();

export const createUser = factory.createHandlers(async (c) => {
  const data = await c.req.json<UserData>();

  const usersRepository = new UsersDrizzleRepository();
  const resp = await usersRepository.create(data);

  return c.status(201);
});
