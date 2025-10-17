import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import { UsersDrizzleRepository } from './repository/users.repository.drizzle';
import { type UserCreateSchema, userCreateSchema } from './users.schema';

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

export const createUser = factory.createHandlers(
  useRepository,
  zValidator('json', userCreateSchema),
  async (c) => {
    const { data } = await c.req.json<UserCreateSchema>();

    const usersRepository = c.get('repository');

    try {
      const insertedId = await usersRepository.createUser(data);

      return c.json({ id: insertedId }, 201);
    } catch (cause) {
      console.error(cause);
      throw new HTTPException(500, { cause });
    }
  },
);
