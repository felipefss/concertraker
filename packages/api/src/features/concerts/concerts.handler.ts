import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import authMiddleware from '@/middlewares/auth';
import { concertCreateSchema } from './concerts.schema';
import type { ConcertsRepository } from './repository/concerts.repository';

type Env = {
  Variables: {
    userId: number;
  };
};

const userId = 1;

export class ConcertsHandler {
  private readonly factory = createFactory<Env>();

  constructor(private readonly repository: ConcertsRepository) {}

  createConcert() {
    return this.factory.createHandlers(
      zValidator('json', concertCreateSchema),
      async (c) => {
        const { data } = c.req.valid('json');

        try {
          const insertedId = await this.repository.createConcert({
            ...data,
            userId,
          });

          return c.json({ id: insertedId }, 201);
        } catch (cause) {
          console.error(cause);
          throw new HTTPException(500, { cause });
        }
      },
    );
  }

  getConcerts() {
    return this.factory.createHandlers(async (c) => {
      try {
        const concerts = await this.repository.getConcerts(userId);

        return c.json({ concerts });
      } catch (cause) {
        console.error(cause);
        throw new HTTPException(500, { cause });
      }
    });
  }
}
