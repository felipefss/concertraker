import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import { concertCreateSchema } from './concerts.schema';
import type { ConcertsRepository } from './repository/concerts.repository';

export class ConcertsHandler {
  private readonly factory = createFactory();

  constructor(private readonly repository: ConcertsRepository) {}

  createConcert() {
    return this.factory.createHandlers(
      zValidator('json', concertCreateSchema),
      async (c) => {
        const { data } = c.req.valid('json');

        try {
          const insertedId = await this.repository.createConcert({
            ...data,
            userId: 1,
          });

          return c.json({ id: insertedId }, 201);
        } catch (cause) {
          console.error(cause);
          throw new HTTPException(500, { cause });
        }
      },
    );
  }
}
