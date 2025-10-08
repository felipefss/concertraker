import { createFactory } from 'hono/factory';
import type { UserData } from './repository/users.repository';
import { UsersDrizzleRepository } from './repository/users.repository.drizzle';

const factory = createFactory();

export const createUser = factory.createHandlers(async (c) => {
  const { data } = await c.req.json<{ data: UserData }>();

  const usersRepository = new UsersDrizzleRepository();
  const insertedId = await usersRepository.create(data);

  c.status(insertedId === -1 ? 500 : 201);
  return c.json({ id: insertedId });
});
