import { createFactory } from 'hono/factory';
import type { UserData } from './repository/users.repository';
import { UsersDrizzleRepository } from './repository/users.repository.drizzle';

type Env = {
  Variables: {
    repository: UsersDrizzleRepository;
  };
};

const factory = createFactory<Env>();

const useRepository = factory.createMiddleware(async (c, next) => {
  c.set('repository', new UsersDrizzleRepository());
  await next();
});

export const createUser = factory.createHandlers(useRepository, async (c) => {
  const { data } = await c.req.json<{ data: UserData }>();

  const usersRepository = c.get('repository');
  const insertedId = await usersRepository.create(data);

  c.status(insertedId === -1 ? 500 : 201);
  return c.json({ id: insertedId });
});
