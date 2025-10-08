import { createFactory } from 'hono/factory';
import type { UserData } from './repository/users.repository';
import { UsersDrizzleRepository } from './repository/users.repository.drizzle';
import { UsersUseCase } from './users.use-case';

type Env = {
  Variables: {
    useCase: UsersUseCase;
  };
};

const factory = createFactory<Env>();

const useRepository = factory.createMiddleware(async (c, next) => {
  c.set('useCase', new UsersUseCase(new UsersDrizzleRepository()));
  await next();
});

export const createUser = factory.createHandlers(useRepository, async (c) => {
  const { data } = await c.req.json<{ data: UserData }>();

  const usersUseCase = c.get('useCase');
  const insertedId = await usersUseCase.create(data);

  c.status(insertedId === -1 ? 500 : 201);
  return c.json({ id: insertedId });
});
