import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import type { UsersRepository } from './repository/users.repository';
import { userCreateSchema } from './users.schema';

export class UsersHandler {
  private readonly factory = createFactory();

  constructor(private readonly repository: UsersRepository) {}

  createUser() {
    return this.factory.createHandlers(
      zValidator('json', userCreateSchema),
      async (c) => {
        const { data } = c.req.valid('json');

        try {
          const insertedId = await this.repository.createUser(data);

          return c.json({ id: insertedId }, 201);
        } catch (cause) {
          console.error(cause);
          throw new HTTPException(500, { cause });
        }
      },
    );
  }
}
