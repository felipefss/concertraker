import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import authMiddleware from '@/middlewares/auth';
import { concertCreateSchema, concertUpdateSchema } from './concerts.schema';
import type { ConcertsRepository } from './repository/concerts.repository';

type Env = {
  Variables: {
    userId: number;
  };
};

export class ConcertsHandler {
  private readonly factory = createFactory<Env>();

  constructor(private readonly repository: ConcertsRepository) {}

  createConcert() {
    return this.factory.createHandlers(
      authMiddleware,
      zValidator('json', concertCreateSchema),
      async (c) => {
        const data = c.req.valid('json');
        const userId = c.get('userId');

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
    return this.factory.createHandlers(authMiddleware, async (c) => {
      const id = c.req.param('id');
      const userId = c.get('userId');

      try {
        if (id) {
          const parsedId = Number(id);

          if (Number.isNaN(parsedId)) {
            return c.json({ error: 'Invalid id' }, 400);
          }

          const concert = await this.repository.getConcert(userId, parsedId);

          if (!concert) {
            return c.notFound();
          }

          return c.json({ concert });
        }

        const concerts = await this.repository.getConcerts(userId);

        return c.json({ concerts });
      } catch (cause) {
        console.error(cause);
        throw new HTTPException(500, { cause });
      }
    });
  }

  updateConcert() {
    return this.factory.createHandlers(
      authMiddleware,
      zValidator('json', concertUpdateSchema),
      async (c) => {
        const data = c.req.valid('json');
        const userId = c.get('userId');

        try {
          await this.repository.updateConcert({ ...data, userId });
        } catch (cause) {
          console.error(cause);
          throw new HTTPException(500, { cause });
        }

        return c.json({}, 200);
      },
    );
  }

  deleteConcert() {
    return this.factory.createHandlers(authMiddleware, async (c) => {
      const id = c.req.param('id');
      const userId = c.get('userId');

      try {
        const parsedId = Number(id);

        if (Number.isNaN(parsedId)) {
          return c.json({ error: 'Invalid id' }, 400);
        }

        await this.repository.deleteConcert(userId, parsedId);
      } catch (cause) {
        console.error(cause);
        throw new HTTPException(500, { cause });
      }

      return c.json({}, 200);
    });
  }
}
